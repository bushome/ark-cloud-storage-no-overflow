import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { plainToInstance } from 'class-transformer';
import { ValidationError, validateSync } from 'class-validator';
import { getAppRootDir } from './app-root';
import { AppConfigDto } from './dto/app-config.dto';

/**
 * Loads and validates config.json.
 *
 * - Missing file -> not an error. `plainToInstance` still constructs
 *   AppConfigDto (invoking every nested DTO's own field defaults), so the
 *   result is exactly the documented zero-config solo-player default.
 * - Present but only partially filled in -> class-transformer instantiates
 *   each nested DTO via its own defaults first, then overlays whatever keys
 *   *are* present in that block, so e.g. `{ "Inventory": { "BatchWindowMs": 250 } }`
 *   alone is enough; you don't need to restate the rest of the file.
 * - Present but invalid (bad JSON, wrong types, missing required MySQL.*
 *   fields when UseMySQL is true, etc.) -> throws with every violation
 *   listed, instead of surfacing a raw Prisma/DB connection error later.
 *
 * Defaults to <app root>/config.json — see app-root.ts for why that's not
 * process.cwd().
 */
export function loadConfig(configPath: string = join(getAppRootDir(), 'config.json')): AppConfigDto {
  let raw: Record<string, unknown> = {};

  if (existsSync(configPath)) {
    let text: string;
    try {
      text = readFileSync(configPath, 'utf-8');
    } catch (err) {
      throw new Error(`Could not read config.json at ${configPath}: ${(err as Error).message}`);
    }

    try {
      raw = JSON.parse(text);
    } catch (err) {
      throw new Error(`config.json at ${configPath} is not valid JSON: ${(err as Error).message}`);
    }
  }

  const config = plainToInstance(AppConfigDto, raw);

  const errors = validateSync(config, {
    whitelist: true,
    forbidNonWhitelisted: false,
  });

  if (errors.length > 0) {
    const messages = errors.flatMap((error) => flattenValidationError(error));
    throw new Error(
      [
        `config.json failed validation (${configPath}):`,
        ...messages.map((m) => `  - ${m}`),
      ].join('\n'),
    );
  }

  return config;
}

function flattenValidationError(error: ValidationError, pathPrefix = ''): string[] {
  const path = pathPrefix ? `${pathPrefix}.${error.property}` : error.property;
  const ownMessages = Object.values(error.constraints ?? {}).map((message) => `${path}: ${message}`);
  const childMessages = (error.children ?? []).flatMap((child) => flattenValidationError(child, path));
  return [...ownMessages, ...childMessages];
}