# syntax=docker/dockerfile:1.5

# ======================
# BUILD STAGE
# ======================
FROM oven/bun:1 AS build
WORKDIR /app

COPY bun.lockb package.json ./

# Install deps (HARUS tanpa --ignore-scripts)
RUN --mount=type=cache,target=/root/.bun \
    bun install --frozen-lockfile && bun rebuild

COPY . .

RUN bun run build


# ======================
# PRODUCTION STAGE
# ======================
FROM oven/bun:1 AS production
WORKDIR /app

COPY --from=build /app/.output /app/.output

EXPOSE 3001

CMD ["bun", "/app/.output/server/index.mjs"]
