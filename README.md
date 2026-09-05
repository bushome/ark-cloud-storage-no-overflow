# Ark Cloud Storage API - No-Overflow Enforcement

This is a variant of Florian Kostenzer's, <https://github.com/123FLO321>, work for the backend API <https://github.com/ark-cloud-storage/api> of their Cloud Storage mod <https://www.curseforge.com/ark-survival-ascended/mods/cloud-storage> on Curse Forge for the game Ark: Survival Ascended.

## API Variant Differences

The main difference with this API variant is how it handles resource balances committed to the database.

Instead of allowing a storage container to go into a **negative balance** and requiring you to re-deposit the overdrawn resources before that container can be used for crafting again, this variant behaves much more like **ARK's original storage system**.

The API **will not allow a negative balance to be written**. If a request attempts to use more resources than are currently available, the request will fail.

Basically, once you're out, you're out. No getting resources on "credit" with zero down and zero interest. Go Farmy Farmy like the rest of us.....slacker....kidding...not really. :P

There's also a fix for a cross-cluster auth race that's still present in the upstream repo (`auth.guard.ts`, in their `gurad` folder typo and all) — `clusterId` was being stashed via `Reflect`/`SetMetadata` on a shared handler function instead of per-request state, which is exactly the kind of thing that gets weird under concurrent load from multiple clusters hitting the same instance. Fixed here.

# Backend Performance Changes

There have also been several backend performance improvements. And will list the change for the negative write stop as well.....

### inventory.service.ts

- Negative writes: Prisma upsert increment, can go below 0 -> Raw UPDATE … WHERE amount >= cost.

- Crafting traffic: One DB write per websocket update -> configurable coalesce write queue per clusterId:ownerId:resourceId (100ms by default, tune with `Inventory.BatchWindowMs` in `config.json`). Batch jobbing. Crafts (IE withdraw requests) and deposits also never overlap on the same row.

  Widening this reduces (but doesn't eliminate) duplication overage under heavy concurrent load — it's a tuning knob, not a fix, and legitimate crafts start stalling if you push it too far. Values above ~250ms required manual craft restarts in my own testing.

- Post-write amount: Prisma returns the row -> read from cached memory variable, no SELECT. If the cache already knows there isn't enough, the craft fails immediately with Insufficient resources and does not touch MySQL. A deposit flushes any pending batch first, then increments. The cache is set from the upsert row, so the box can accept items while stations are still requesting.

- Successful deducts use updateMany (amount >= cost) plus findUnique in a transaction and emit that committed amount.

- Failures throw so the gateway can reply to the caller.

- Also fixed a bug where the in-memory resource cache never resynced with the DB after a failed deduction — was causing balances to drift from what was actually committed.

### inventory.gateway.ts

- Errors go only to the socket that sent update.

- Closed sockets are not written; empty cluster sets are removed.

### Database connection: now via config.json, not .env (READ THIS IF UPGRADING)

**Breaking change if you're upgrading from an earlier version of this variant.** The running app no longer reads `DATABASE_URL`, or any `.env` file at all — `.env` and `@nestjs/config` have been removed from the project entirely. All runtime configuration, including database connection details, now comes from `config.json`.

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

**If you skip this, the app won't error on `MySQL` — it'll quietly default to a local SQLite file instead of your MySQL database.** That's intentional zero-config behavior for solo players (see below), but it means an existing MySQL self-hoster who forgets this step after upgrading won't get an obvious failure, just a quietly empty new database. Double-check this file is actually in place before you trust an upgrade. Note that `MySQL.User`, `MySQL.Password`, `MySQL.Database`, and at least one `Auth.RegisterClusters` entry are hard-required with no safe default if `UseMySQL: true` — the app will fail validation loudly on boot if these are missing, rather than silently proceeding.

`ConnectionLimit` is the direct replacement for the old `.env`/`DATABASE_URL`'s `?connection_limit=N` — same pool-size knob, own field now. It's optional: leave it out and the `mariadb` driver's own default (10) applies instead. Large clusters will likely want it set explicitly — `50` is what this project's own production cluster runs with, given multiple crafting stations hitting the same box concurrently.

**Note for `prisma generate`/schema tooling specifically**: unlike the running app, the Prisma CLI itself doesn't require a `DATABASE_URL` or `.env` file to be present at all — `npm run prisma:generate` works cleanly with neither, confirmed directly.

### New: SQLite as an alternative to MySQL

Alongside MySQL/MariaDB, this variant can now run on a local SQLite file instead — no external database server needed. Useful for solo/single-player use, or just trying this out without standing up MySQL first.

If `config.json` is missing entirely, this is the default: a SQLite file gets created at `./data/cloudstorage.db` (relative to wherever `main.js` actually is), and there's nothing else to configure. To use MySQL instead, see the `config.json` example above (`"UseMySQL": true` plus your connection details) — the reverse also holds, `"UseMySQL": false` (or no `config.json` at all) gets you SQLite.

`Server.Port`, cluster auto-registration (`Auth.RegisterClusters`), batch-window tuning (`Inventory.BatchWindowMs`), audit-log settings (`AuditLog.RetentionDays`, `AuditLog.DiscordWebhook`), and verbose logging (`Logging.Verbose`) are all fully wired to `config.json` now — no `.env` fallback exists anywhere in the running app. Optional settings fall back to sensible built-in defaults if omitted; DB credentials and at least one bootstrap cluster are hard-required with no safe default.

### Database engine: Prisma driver adapters (no more native binary)

The Prisma client now runs on `@prisma/adapter-mariadb` (MySQL/MariaDB) and `@prisma/adapter-better-sqlite3` (SQLite) with `engineType = "client"` set in the schema's generator block, instead of Prisma's default native query-engine binary.

Why this matters: that native binary (`query_engine-*.dll.node` on Windows) is a platform-specific compiled file that has to get regenerated in place every time you run `prisma generate` — and it can fail with a file-locking error if the app's still running when you try. Its per-platform nature was also a real headache for the drop-in-exe goal mentioned at the bottom of this readme. Switching to the driver adapter gets rid of the binary entirely; the query engine now runs as plain TypeScript/WASM.

*The above are just the basics I'm starting with....check the change notes on releases for functional changes going foreward. Anything else I haven't touched is just a re-upload of Florian's work and will have no differences from the originals as seen from their repo.*

## Deduction Audit Log

There's also a new audit-log system that isn't in upstream at all: every deduction attempt (success or fail) gets logged, along with a per-resource "theoretical max consumption rate" ceiling. A scheduled job checks recent activity against that ceiling and can fire a Discord webhook (`AuditLog.DiscordWebhook` in `config.json`, optional — if you don't set it, findings still show up in the app's own log) if something blows past what's physically possible for a single crafting structure to produce, even accounting for crafting-skill stat, ClockFace multipliers, and buffs.

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

- **Cloud/synced storage widens the underlying race window compared to vanilla or other mods' dedicated storage.** In testing, vanilla dedicated storage boxes and Cyber Structures ( that's just the additional non-vanilla mod dedistorage asset I had available that wasn't cloud connected. No claims against or for using any other variants for proofing ) storage both stayed around a small (~2%) baseline overage from the ARK-side race regardless of setup, while cloud storage boxes scaled up noticeably higher with more concurrent stations and shorter batch windows. Widening the batch window helps somewhat but plateaus and starts causing legitimate crafts to stall, so it's a tuning knob, not a fix.

- The mod developer is aware of both of these and is working on backend/mod-side changes of his own — I'm holding off on a bigger rework here (audit log redesign, revisiting the clamp behavior) until that lands.

# Summary

When multiple resource requests come in from multiple crafting stations, for example, the requests are now **aggregated** rather than sending a large number of individual line-item update requests at the same time.

The API also uses resource amounts that are already known and stored **in memory**, rather than performing a `SELECT` query against the database for every update operation. This should reduce the amount of work being pushed onto the database engine and lowering latency since it's using an already known value rather then having to retrieve it from the database each time.

Though a database engine such as **MariaDB** can certainly handle a lot of transactions, the volume can add up quickly on a larger server clusters. More so if you are passing multiple clusters through the same instance.

For example, if you have:

- **50–70 active players per server**
- **12+ servers**
- Multiple players simultaneously crafting, depositing, and withdrawing resources
- Other plugins also querying the database

Those requests can add up to a significant amount of database traffic. Once you have enough concurrent activity, you may start seeing performance issues or increased server lag, particularly when large numbers of players are interacting with storage containers and crafting systems at the same time.

So, the goal....change it so it behaves like base ark's storage system and not "overdraw" your balance....work on improvements that would scale for larger clusters to keep it more performant.

## INSTALLATION

See wiki -> <https://github.com/bushome/ark-cloud-storage-no-overflow/wiki> for full platform-specific install instructions (Windows/IISNode, Linux/Unix, Docker).

After pulling this variant's changes, there's a couple extra steps beyond the base install:

1. Run the included `migration.sql` against your database (same as the base install process).
2. `npm install` — pulls in the new dependencies (`@nestjs/schedule`, `@prisma/adapter-mariadb`, `@prisma/adapter-better-sqlite3`).
3. `npm run prisma:generate` — generates **both** the MySQL and SQLite Prisma clients (this variant needs both regardless of which one you actually run, since they're two separate generated clients under the hood). No `.env` or `DATABASE_URL` needed for this step.
4. Configure `config.json` next to the compiled app — see "Database connection: now via config.json, not .env" above for the full example. At minimum, if using MySQL, you need `MySQL.User`/`Password`/`Database` and at least one `Auth.RegisterClusters` entry; `Inventory.BatchWindowMs`, `AuditLog.RetentionDays`, and `AuditLog.DiscordWebhook` are all optional and fall back to defaults if omitted. **If you skip this file entirely you'll get SQLite instead**, silently — no error, just not your MySQL database.

**Don't run `npx prisma migrate dev`.** This project applies schema changes via `migration.sql` directly rather than through Prisma's own migration history — running `migrate dev` against an existing install will report schema drift and offer to reset your database. Decline it; it isn't necessary and you will lose your data.

A precompiled, ready-to-run distributable (no build step required) is available in this repo's `Deployables/NodeJS/` folder for the MySQL/cluster-operator case — just needs `config.json` filled in with your connection details, same as any other install. A true single-file Windows executable (no Node.js install required at all) is also confirmed working end-to-end for the MySQL/cluster-operator target, packaged via Node's own Single Executable Applications feature — not yet the default recommended install path while some packaging/cutover details get finalized, but functional today if you want to try it. A solo-player/SQLite-specific drop-in executable (fully self-contained, zero setup) is planned but not yet built — SQLite's native database driver can't be bundled the same way, so that one needs a different packaging approach that's still in the design stage.
