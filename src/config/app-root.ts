import { dirname, isAbsolute, join } from 'path';

/**
 * Directory containing the running entry script (main.js) today.
 *
 * Deliberately NOT process.cwd() — a launcher that `cd`s elsewhere before
 * running `node main.js` (or a shortcut/Task Scheduler entry with a
 * different "Start in" folder) would otherwise make every relative path in
 * this app depend on how it happens to be launched, rather than where its
 * own files actually live. require.main.filename is the entry script
 * actually invoked, so its directory is stable regardless of cwd.
 *
 * NOTE: this covers today's plain `node main.js` execution only. Once SEA
 * packaging happens, require.main won't exist the same way inside a
 * packaged single-executable (there's no separate entry-script file on disk
 * to point at anymore) — revisit this using process.execPath's directory
 * instead at that point. Don't conflate the two; process.cwd() is wrong for
 * both cases, but the two correct answers differ.
 */
export function getAppRootDir(): string {
  return require.main ? dirname(require.main.filename) : process.cwd();
}

/**
 * Resolves a possibly-relative path (from config.json — SQLite.File,
 * config.json's own default location, etc.) against the app root directory
 * rather than cwd. Absolute paths pass through unchanged, so a user who
 * deliberately configures an absolute path isn't affected by any of this.
 */
export function resolveAppPath(maybeRelativePath: string): string {
  return isAbsolute(maybeRelativePath)
    ? maybeRelativePath
    : join(getAppRootDir(), maybeRelativePath);
}