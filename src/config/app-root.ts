import { dirname, isAbsolute, join } from 'path';

/**
 * Directory containing the running entry script (main.js) today, or the
 * running executable's own directory once SEA-packaged.
 *
 * Deliberately NOT process.cwd() — a launcher that `cd`s elsewhere before
 * running `node main.js` (or a shortcut/Task Scheduler entry with a
 * different "Start in" folder) would otherwise make every relative path in
 * this app depend on how it happens to be launched, rather than where its
 * own files actually live. require.main.filename is the entry script
 * actually invoked; process.execPath is the running exe's own path. Both
 * are stable regardless of cwd — process.cwd() is wrong for both cases.
 *
 * require.main branch: for `node dist/main.js`, require.main.filename
 * resolves to `.../dist/main.js`, one level below the true app root
 * (config.json, generated/, watchdog/ all sit above dist/). Hence
 * dirname(dirname(...)) — climbing two levels, not one. See the
 * 2026-09-04 Config.json Path Resolution fix in CLAUDE.md for the bug
 * this corrected (config.json had been silently living inside dist/ and
 * getting wiped on every rebuild).
 *
 * SEA branch: inside a packaged single-executable, require.main doesn't
 * exist the same way — there's no separate entry-script file on disk to
 * point at. process.execPath resolves to the exe's own path, and the exe
 * sits directly at the deployment root (no dist/ layer to climb out of),
 * so a single dirname() is correct here — NOT dirname(dirname(...)).
 * Don't copy the require.main branch's double-dirname reflexively; the
 * two correct answers differ specifically because of that dist/ layer
 * difference between the two deployment shapes.
 */
export function getAppRootDir(): string {
  if (require.main) {
    return dirname(dirname(require.main.filename));
  }
  return dirname(process.execPath);
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