# Build Image
FROM node:lts-alpine AS build

RUN apk add --no-cache git

ENV NODE_ENV=build

USER node
WORKDIR /home/node

COPY --chown=node:node ./package.json ./package.json
COPY --chown=node:node ./package-lock.json ./package-lock.json
COPY --chown=node:node ./prisma ./prisma
RUN npm clean-install
# Generates BOTH clients (generated/mysql-client + generated/sqlite-client) —
# see prisma:generate script in package.json. Replaces the old single
# `npx prisma generate` call, which only handled one schema.
RUN npm run prisma:generate

COPY --chown=node:node ./src ./src
COPY --chown=node:node ./tsconfig.json ./tsconfig.json
COPY --chown=node:node ./tsconfig.build.json ./tsconfig.build.json
RUN npm run build && \
    npm prune --production

# Run Image
FROM node:lts-alpine

ENV NODE_ENV=production

USER node
WORKDIR /home/node

COPY --from=build --chown=node:node /home/node/package*.json ./
COPY --from=build --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=build --chown=node:node /home/node/dist ./dist/
COPY --from=build --chown=node:node /home/node/prisma ./prisma/
# Required at runtime — Prisma's generated client output lives outside
# node_modules for this fork's dual-schema setup (see CLAUDE.md). Without
# this, the container has no Prisma client and fails on first DB call.
COPY --from=build --chown=node:node /home/node/generated ./generated/

# config.json is intentionally NOT copied into the image — it's expected to
# be bind-mounted at runtime (see docker-compose.yml) so credentials never
# get baked into the image layer.

# Uses the app's own GET /health route (real DB round-trip via
# dedicatedStorage.count()), same endpoint the Windows watchdog polls.
# Docker's restart policy (see compose file) handles both crash and
# unhealthy-hang cases here — the standalone watchdog script is not used
# inside the container, since Docker already supervises the process.
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD node -e "require('http').get('http://127.0.0.1:3000/health', r => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

CMD ["node", "dist/main"]
