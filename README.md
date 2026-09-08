```
  /$$$$$$  /$$                           /$$        /$$$$$$  /$$$$$$$  /$$$$$$
 /$$__  $$| $$                          | $$       /$$__  $$| $$__  $$|_  $$_/
| $$  \__/| $$  /$$$$$$  /$$   /$$  /$$$$$$$      | $$  \ $$| $$  \ $$  | $$  
| $$      | $$ /$$__  $$| $$  | $$ /$$__  $$      | $$$$$$$$| $$$$$$$/  | $$  
| $$      | $$| $$  \ $$| $$  | $$| $$  | $$      | $$__  $$| $$____/   | $$  
| $$    $$| $$| $$  | $$| $$  | $$| $$  | $$      | $$  | $$| $$        | $$  
|  $$$$$$/| $$|  $$$$$$/|  $$$$$$/|  $$$$$$$      | $$  | $$| $$       /$$$$$$
 \______/ |__/ \______/  \______/  \_______/      |__/  |__/|__/      |______/
 
                  /$$   /$$                   /$$   /$$                    
                 | $$$ | $$                  | $$$ | $$                    
                 | $$$$| $$  /$$$$$$         | $$$$| $$  /$$$$$$   /$$$$$$ 
                 | $$ $$ $$ /$$__  $$ /$$$$$$| $$ $$ $$ /$$__  $$ /$$__  $$
                 | $$  $$$$| $$  \ $$|______/| $$  $$$$| $$$$$$$$| $$  \ $$
                 | $$\  $$$| $$  | $$        | $$\  $$$| $$_____/| $$  | $$
                 | $$ \  $$|  $$$$$$/        | $$ \  $$|  $$$$$$$|  $$$$$$$
                 |__/  \__/ \______/         |__/  \__/ \_______/ \____  $$
                                                                  /$$  \ $$
                                                                 |  $$$$$$/
                                                                  \______/   
```


# Ark Ascended Cloud Storage API - No-Negatives Enforcement

This is a variant of Florian Kostenzer's, <https://github.com/123FLO321>, work for the backend API <https://github.com/ark-cloud-storage/api> of their Cloud Storage mod <https://www.curseforge.com/ark-survival-ascended/mods/cloud-storage> on Curse Forge for the game Ark: Survival Ascended.

BEFORE ANYTHING ELSE KEEP IN MIND THIS IS NOT OFFICIALLY SUPPORTED BY THE ORIGINAL AUTHOR. YOU ACCEPT ANY AND ALL RISK USING ANY PART OF THIS PROJECT FOR YOUR USE. THAT SAID, READ BELOW.....

## At a Glance

| | Upstream | This Fork |
|---|---|---|
| Negative balances | Allowed, requires re-deposit before crafting resumes | Clamped to zero, matching vanilla ARK — see tradeoffs below |
| Cross-cluster auth race | Present (`SetMetadata`/`Reflect` on shared handler state) | Fixed (per-connection state) — reported upstream, not yet in their public repo |
| Deduction handling | One unconditional `upsert` per WebSocket message | Per-resource locking, configurable batch coalescing, in-memory fast-fail cache, atomic `amount >= cost` gate |
| Duplication-race mitigation | None | Atomic gate holds overage at exactly 0%, confirmed under real stress testing on both supported database backends |
| Audit/dupe logging | None | Full deduction audit log + rate-ceiling burst detection (MySQL target only) |
| Config | `.env` / `DATABASE_URL` | `config.json`, validated |
| Database backends | MySQL/MariaDB only | MySQL/MariaDB or SQLite, selected at runtime |
| Prisma engine | Native query-engine binary | Driver adapters, no native binary |
| SQLite crash resilience | N/A | WAL mode, scheduled backups, boot-time integrity check + auto-restore |
| Deployment options | Docker | Docker, Windows standalone exe (MySQL + SQLite targets), plain Node.js |
| Crash supervision | None | Watchdog process with automatic restart |
| Lost-character recovery | Manual | Standalone cross-platform tool included |

Full detail and reasoning for each of these — including the honest tradeoffs — below.

## API Variant Differences

This project exists because of scale. A database engine like **MariaDB** can handle a lot of transactions, but the volume adds up fast on a large cluster — think **50–70 active players per server across 12+ servers**, with multiple players simultaneously crafting, depositing, and withdrawing resources, plus other plugins also querying the same database. Once you have enough concurrent activity, that traffic can start causing real performance issues and server lag, particularly around storage containers and crafting systems. The changes below aim to change that: behave like base ARK's storage system rather than allowing an "overdrawn" balance, and scale better for larger clusters in the process.

The main functional difference with this API variant is how it handles resource balances committed to the database.

Instead of allowing a storage container to go into a **negative balance** and requiring you to re-deposit the overdrawn resources before that container can be used for crafting again, this variant behaves much more like **ARK's original storage system**.

The API **will not allow a negative balance to be written**. If a request attempts to use more resources than are currently available, the request will fail.

Basically, once you're out, you're out. No getting resources on "credit" with zero down and zero interest. Go Farmy Farmy like the rest of us.....slacker....kidding...not really. :P

There's also a fix for a cross-cluster auth race that's still present in the upstream repo (`auth.guard.ts`, in their `gurad` folder typo and all) — `clusterId` was being stashed via `Reflect`/`SetMetadata` on a shared handler function instead of per-request state, which is exactly the kind of thing that gets weird under concurrent load from multiple clusters hitting the same instance. Fixed here and fixed upstream in production just hasn't hit the public facing repo yet.

# Backend Performance Changes

There have also been several backend performance improvements. And will list the change for the negative write stop as well.....

### inventory.service.ts

- Negative writes: Prisma upsert increment, can go below 0 -> Raw UPDATE … WHERE amount >= cost.

- Crafting traffic: One DB write per websocket update -> configurable coalesce write queue per clusterId:ownerId:resourceId (100ms by default, tune with `Inventory.BatchWindowMs` in `config.json`). Batch jobbing. Crafts (IE withdraw requests) and deposits also never overlap on the same row.

  Widening this does **not** reduce or eliminate duplication overage — that protection comes entirely from the atomic deduction gate (`amount >= cost`, checked inside a transaction), which holds overage at exactly zero regardless of this setting. All widening the window does is trade responsiveness for a slightly wider staleness margin, with legitimate crafts starting to stall/flicker past ~250ms in testing (confirmed via a batch-window sweep across 100/250/500/1000ms) — no corresponding benefit. Leave this at the 100ms default unless you have a specific latency reason to change it.

- Post-write amount: Prisma returns the row -> read from cached memory variable, no SELECT. If the cache already knows there isn't enough, the craft fails immediately with Insufficient resources and does not touch MySQL. A deposit flushes any pending batch first, then increments. The cache is set from the upsert row, so the box can accept items while stations are still requesting.

- Successful deducts use updateMany (amount >= cost) plus findUnique in a transaction and emit that committed amount.

- Failures throw so the gateway can reply to the caller.

- Also fixed a bug where the in-memory resource cache never resynced with the DB after a failed deduction — was causing balances to drift from what was actually committed.

### inventory.gateway.ts

- Errors go only to the socket that sent update.

- Closed sockets are not written; empty cluster sets are removed.

### Configuration: config.json

This variant is configured entirely via `config.json` — no `.env` file, no `DATABASE_URL`, no `@nestjs/config` dependency anywhere in the project. If you're coming from upstream's `.env`-based setup, this is the one thing to unlearn; everything below assumes `config.json` from the start.

Drop a `config.json` next to the compiled app (`dist/main.js`) with your MySQL connection details:

```json
{
  "UseMySQL": true,
  "MySQL": {
    "Host": "your-db-host",
    "Port": 3306,
    "User": "your-db-user",
    "Password": "your-db-password",
    "Database": "your-db-name",
    "ConnectionLimit": 50
  },
  "Auth": {
    "RegisterClusters": [
      { "ClusterId": "your-cluster-id", "Secret": "your-cluster-secret" }
    ]
  }
}
```

There are two different "missing config" situations worth keeping separate here:

- **No `config.json` at all, or `UseMySQL` left `false`/unset**: the app quietly defaults to a local SQLite file instead of erroring. That's intentional zero-config behavior for solo players (see below) — but it also means an existing MySQL self-hoster who simply forgets to drop this file in won't get an obvious failure on boot, just a quietly empty new SQLite database sitting where they expected MySQL. Worth double-checking this file is actually in place before you trust a fresh install.
- **`UseMySQL: true`, but `MySQL.User`/`MySQL.Password`/`MySQL.Database` missing**: the opposite behavior — the app fails validation loudly on boot rather than silently proceeding with blank credentials. `Auth.RegisterClusters` has no such requirement and can be left empty entirely — see the SQLite section below and the Installation steps for how to register a cluster with zero pre-configuration.

**This SQLite-fallback behavior is specific to the plain Node.js app (and Docker, which runs the same source) — it does not apply to the packaged cluster-operator/MySQL standalone executable.** That build deliberately can't load SQLite's native binding at all (Node's Single Executable Applications feature can only resolve genuine built-ins through its bundled `require()`, not native addons), so if that exe ever reaches the SQLite code path — meaning `config.json` is missing, or present without `UseMySQL: true` — it fails outright rather than quietly falling back. If you're running that executable, `config.json` with `UseMySQL: true` isn't just recommended, it's required.

`ConnectionLimit` is this project's own pool-size knob — the equivalent of upstream's `?connection_limit=N` on `DATABASE_URL`, if you're coming from there. It's optional: leave it out and the `mariadb` driver's own default (10) applies instead. Large clusters will likely want it set explicitly — `50` is what this project's own production cluster runs with, given multiple crafting stations hitting the same box concurrently.

**Note for `prisma generate`/schema tooling specifically**: the Prisma CLI itself doesn't need a `DATABASE_URL` or `.env` file either — `npm run prisma:generate` works cleanly with neither, confirmed directly.

### New: SQLite as an alternative to MySQL

Alongside MySQL/MariaDB, this variant can now run on a local SQLite file instead — no external database server needed. Useful for solo/single-player use, or just trying this out without standing up MySQL first.

If `config.json` is missing entirely, this is the default: a SQLite file gets created at `./data/cloudstorage.db` (relative to wherever `main.js` actually is), and there's nothing else to configure. To use MySQL instead, see the `config.json` example above (`"UseMySQL": true` plus your connection details) — the reverse also holds, `"UseMySQL": false` (or no `config.json` at all) gets you SQLite.

`Server.Port`, cluster auto-registration (`Auth.RegisterClusters`), batch-window tuning (`Inventory.BatchWindowMs`), audit-log settings (`AuditLog.RetentionDays`, `AuditLog.DiscordWebhook`), and verbose logging (`Logging.Verbose`) are all fully wired to `config.json` now, with sensible built-in defaults if omitted (see the config.json section above for the one exception, MySQL's connection credentials). `Auth.RegisterClusters` can be left empty entirely — register a cluster after boot instead via `POST /auth/register`.

### Database engine: Prisma driver adapters (no more native binary)

The Prisma client now runs on `@prisma/adapter-mariadb` (MySQL/MariaDB) and `@prisma/adapter-libsql` (SQLite) with `engineType = "client"` set in the schema's generator block, instead of Prisma's default native query-engine binary.

Why this matters: that native binary (`query_engine-*.dll.node` on Windows) is a platform-specific compiled file that has to get regenerated in place every time you run `prisma generate` — and it can fail with a file-locking error if the app's still running when you try. Its per-platform nature was also a real headache for the drop-in-exe goal mentioned at the bottom of this readme. Switching to the driver adapter gets rid of the binary entirely; the query engine now runs as plain TypeScript/WASM.

## Deduction Audit Log

There's also a new audit-log system that isn't in upstream at all: every deduction attempt (success or fail) gets logged, along with a per-resource "theoretical max consumption rate" ceiling. A scheduled job checks recent activity against that ceiling and can fire a Discord webhook (`AuditLog.DiscordWebhook` in `config.json`, optional — if you don't set it, findings still show up in the app's own log) if something blows past what's physically possible for a single crafting structure to produce, even accounting for crafting-skill stat, ClockFace multipliers, and buffs.

One early false-positive got caught and fixed: a single large bulk-transfer withdrawal (like Cyber Structures' pull-all tool restocking several resources at once) could look like it blew past the ceiling on its own, even though it's one atomic transaction, not a sustained crafting burst. The check now also requires at least 3 separate withdrawal events within the same window before it'll flag anything — a one-shot bulk pull, however large, won't trip it. This system is specific to the MySQL/cluster-operator path — a solo-player SQLite instance doesn't include these tables at all, since there's no multi-player scenario for it to detect anything against.

## Decay-Database Reconciliation (Optional Add-On)

If you're also running a decay-tracking plugin/database to manage base decay timing, you can use a SQL trigger to automatically clear a tribe's cloud storage once their base has fully decayed out from inactivity — otherwise those rows just sit there indefinitely with nothing to claim them.

Since decay databases typically key players by EOSID rather than the Unreal Engine PlayerID this project's `dedicatedStorage` table uses, you'll need some bridging data that records both IDs together for the same player — a kill-rewards plugin, a points/stats plugin, anything that logs both `EosId` and `PlayerId` in the same row works. Below is an example trigger built against Lethal's Decay and a kill-rewards plugin bridging table; adapt the table/column names to whatever you're actually running.

```sql
DELIMITER $$

CREATE TRIGGER trg_decay_clear_cloudstorage
AFTER UPDATE ON decayasa.lethaldecay_tribes
FOR EACH ROW
BEGIN
    IF NEW.decayday = -2 AND OLD.decayday <> -2 THEN
        DELETE FROM clouddb.dedicatedStorage
        WHERE ownerId IN (
            SELECT DISTINCT PlayerId
            FROM asapointrewards.pointsreward
            WHERE EosId = NEW.EOS_ID
        );
    END IF;
END$$

DELIMITER ;
```

Notes:

- Fires only on the transition *into* `-2` (guarded by `OLD.decayday <> -2`), so it won't repeatedly re-run against a tribe that's already been marked decayed.
- Deletes across **all** `clusterId`s for that `ownerId`, not just the map that decayed — since Lethal's Decay is itself cluster-aware (a tribe only reaches `-2` once every connected map agrees they're inactive), a decayed tribe's cloud storage should be cleared cluster-wide.
- If no bridging row exists for a given `EOS_ID` (e.g. a player who quit before generating any qualifying event), the delete simply matches zero rows — safe no-op.
- This requires cross-database visibility from whichever MySQL/MariaDB user runs the trigger (i.e. your decay DB, your bridging-plugin DB, and `clouddb` all need to be reachable from the same instance/credentials).
- Swap in your actual decay database/table name, bridging table/columns, and cloud storage database name (`clouddb` here matches this project's own database target) before using this.

## Known Limitations / Tradeoffs

Full transparency on a couple of things worth knowing before you deploy this:

- **The no-negative-balance change is a tradeoff, not a pure safety win.** ARK has a genuine engine-level race condition (confirmed by the mod's actual developer) where multiple crafting structures pulling from the same dedicated storage at the same time can produce more crafted output than resources actually available — this happens client/engine-side before any sync message ever reaches this API, so it's not something either version of the backend can fix directly. Upstream's negative-balance approach at least leaves a trace (a negative DB value) pointing at which player/box was involved. This variant clamps to zero instead, which matches vanilla ARK behavior but means there's no leftover negative number to flag who triggered it.

- **Why I added the clamp in the first place:** per the developer, crafting stations should only ever react to a *reported* balance, and vanilla dedicated storage is supposed to clamp that reported value to zero regardless of the true underlying number — meaning allowing negative balances internally shouldn't even matter for stopping crafting as the value is supposed to be reported anything ≤ 0 as 0. That's not what I saw in testing, though. A gunpowder-crafting stress test starting from 5000 of each resource kept crafting running well past zero, with the underlying negative balance ballooning rapidly to well over -180,000 in short order once it passed the zero point. When I brought this up with the dev, he said that shouldn't be possible per his own last check with vanilla structures — we agreed it's plausible a more recent ARK patch changed how that leftover/reported value gets read since he last verified it. Either way, that runaway behavior is exactly why this variant refuses to let a box go negative at all rather than relying on ARK to clamp it for you. It's a safety net, not a fix for the race.

- **Update (post-v93.15 patch): this project's own mitigation now holds overage at zero, while native/unsynced storage got significantly worse.** The paragraph above described pre-patch behavior, where cloud-synced storage widened the race window compared to vanilla or other mods' dedicated storage. That's no longer the picture. Following ARK's v93.15 patch, retesting showed the *native, unsynced* race got substantially worse — vanilla and Cyber Structures dedicated storage both now show clean-run overage in the ~15-20% range (roughly 8-10x the old ~2% baseline), with no meaningful difference between them. Meanwhile, the cloud-synced, API-routed path — the one actively protected by this project's atomic `updateMany(amount >= cost)` gate plus per-resource serialization — held at **exactly the expected amount, zero overage**, confirmed identical whether running as the packaged SEA executable or plain `node dist/main.js`. In short: as of the current ARK patch, this project's mitigation is doing real, measurable work, and running without it (vanilla/other dedicated storage) is now considerably riskier than it was when the paragraph above was originally written.

- The mod developer is aware of both of these. Whatever engine-side changes he ships in the future can be incorporated then, but nothing about this project's current mitigation depends on that happening first — the atomic deduction gate already holds overage at exactly zero regardless of how the underlying engine race behaves. No further rework (audit-log redesign, revisiting the clamp behavior) is currently planned on that basis.

## INSTALLATION

See wiki -> <https://github.com/bushome/ark-cloud-storage-no-overflow/wiki> for full platform-specific install instructions (Windows/IISNode, Linux/Unix, Docker).

After pulling this variant's changes, there's a couple extra steps beyond the base install:

1. **MySQL/MariaDB only**: run the included `migration.sql` against your database (same as the base install process). **Not needed for SQLite** — the SQLite path automatically creates its own schema on first boot if the database file is fresh/empty.
2. `npm install` — pulls in the new dependencies (`@nestjs/schedule`, `@prisma/adapter-mariadb`, `@prisma/adapter-libsql`, `@libsql/client`).
3. `npm run prisma:generate` — generates **both** the MySQL and SQLite Prisma clients (this variant needs both regardless of which one you actually run, since they're two separate generated clients under the hood). No `.env` or `DATABASE_URL` needed for this step.
4. Configure `config.json` next to the compiled app — see "Database connection: now via config.json, not .env" above for the full example. If using MySQL, you need `MySQL.User`/`Password`/`Database` filled in; those have no safe default and validation will fail loudly if missing. `Auth.RegisterClusters` is genuinely optional — leave it empty (or skip `config.json` entirely) and register a cluster after first boot instead via `POST /auth/register`; `Inventory.BatchWindowMs`, `AuditLog.RetentionDays`, and `AuditLog.DiscordWebhook` are all optional too and fall back to defaults if omitted.

**Don't run `npx prisma migrate dev`.** This project applies schema changes via `migration.sql` directly rather than through Prisma's own migration history — running `migrate dev` against an existing install will report schema drift and offer to reset your database. Decline it; it isn't necessary and you will lose your data.

A precompiled distributable is available in this repo's `Deployables/NodeJS/` folder — `dist/`, `generated/`, and `watchdog/` are already built, so no `npm run build` or `prisma generate` step is needed. **`node_modules` is deliberately not included and must be installed fresh on whatever machine actually runs it** (`npm install`, using the `package.json`/`package-lock.json` also included in the folder) — this project's SQLite backend (`@libsql/client`) resolves a different native binary per OS (`@libsql/win32-x64-msvc` on Windows, `@libsql/linux-x64-gnu`/`-musl` on Linux), and `npm install` only fetches the one matching whatever OS you actually run it on. A `node_modules` built on one OS and copied to another will silently be missing the SQLite binary the other OS needs — this only matters if you're running `UseMySQL: false`; the MySQL/MariaDB driver is pure JS and has no such issue. Once `npm install` has been run on the target machine, just fill in `config.json` with your connection details, same as any other install.

Beyond that, this project now ships two standalone Windows executables, both built and verified end-to-end, not just proof-of-concept:

- **Cluster operator / MySQL**: a true single-file executable via Node's own Single Executable Applications feature, paired with a small watchdog process that automatically relaunches it if it ever crashes. This is confirmed running in production on this project's own 12+ server cluster.
- **Solo player / SQLite**: a self-extracting launcher (embedded portable Node runtime, no separate Node.js install needed) that generates its own cluster credentials on first run and prints a ready-to-paste config block into your console every time you launch it. Includes automatic rolling backups and corruption recovery for its own database — see the wiki for details.

Pre-packaged downloads for all four install paths (Docker, MySQL/MariaDB standalone exe, plain NodeJS, and SQLite/solo-player standalone exe) are available under this repo's Releases — see the wiki for the platform-specific walkthrough for each.

Also included in every download: `clouddb-remap-player`, a standalone recovery tool (Windows and Linux binaries both included) for relinking a player's stored resources to a new PlayerId after a lost/replaced character — see the [Recovering a Lost or New Character wiki page]([https://github.com/bushome/ark-cloud-storage-no-overflow/wiki/Recovering-a-Lost-or-New-Character](https://github.com/bushome/ark-cloud-storage-no-overflow/wiki/Recovering%E2%80%90a%E2%80%90Lost%E2%80%90or%E2%80%90New%E2%80%90Character)) for full usage.
