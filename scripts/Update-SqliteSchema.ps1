<#
.SYNOPSIS
  Regenerates prisma/schema.sqlite.prisma from prisma/schema.mysql.prisma,
  then generates the SQLite Prisma client.
.DESCRIPTION
  Prisma ties one generated client to exactly one datasource `provider`, so
  supporting both MySQL and SQLite at runtime means maintaining two schema
  files with the same models. This script only swaps the generator output
  path and the datasource provider/url — it does NOT rewrite model bodies.
  After running this, diff schema.sqlite.prisma by hand for any MySQL-only
  native-type attributes (@db.Text, @db.VarChar(n), @db.TinyInt, etc.) —
  these are invalid under the sqlite provider and must be removed or
  adjusted manually; there's no safe automatic translation for all of them.

  PRISMA_GENERATE_SQLITE_URL is a build-time-only placeholder required by
  Prisma's schema syntax (datasource blocks must resolve an env() call) —
  it is NOT read by the running app, which gets its real SQLite file path
  from config.json's SQLite.File field. Do not confuse this with a real
  runtime connection string.
.EXAMPLE
  powershell -ExecutionPolicy Bypass -File scripts/Update-SqliteSchema.ps1
#>
$ErrorActionPreference = "Stop"
$sourcePath = Join-Path $PSScriptRoot "..\prisma\schema.mysql.prisma"
$destPath   = Join-Path $PSScriptRoot "..\prisma\schema.sqlite.prisma"

if (-not (Test-Path $sourcePath)) {
    throw "Expected $sourcePath to exist. Rename prisma/schema.prisma to prisma/schema.mysql.prisma first (and update the two prisma:generate:* scripts in package.json if you haven't already)."
}

$content = Get-Content -Path $sourcePath -Raw
$content = $content -replace 'provider\s*=\s*"mysql"', 'provider = "sqlite"'
$content = $content -replace 'output\s*=\s*"\.\./generated/mysql-client"', 'output = "../generated/sqlite-client"'
$content = $content -replace 'url\s*=\s*env\("DATABASE_URL"\)', 'url = env("PRISMA_GENERATE_SQLITE_URL")'
Set-Content -Path $destPath -Value $content -NoNewline
Write-Host "Wrote $destPath" -ForegroundColor Green
Write-Host ""
Write-Host "Diff schema.sqlite.prisma against schema.mysql.prisma and remove/adjust" -ForegroundColor Yellow
Write-Host "any @db.* MySQL-native-type attributes before generating." -ForegroundColor Yellow
Write-Host ""

$env:PRISMA_GENERATE_SQLITE_URL = "file:./dummy.db"
Write-Host "Generating SQLite Prisma client..." -ForegroundColor Cyan
npx prisma generate --schema=prisma/schema.sqlite.prisma