# Stage build
FROM oven/bun:1 AS build
WORKDIR /app

# Copy dependency metadata
COPY package.json bun.lockb* ./

# Install deps (tanpa build native)
RUN bun install --frozen-lockfile --ignore-scripts

# Copy source code
COPY . .

# Build project (misal Nuxt, Next, dll)
RUN bun run build

# Stage production
FROM oven/bun:1 AS production
WORKDIR /app

# Copy hasil build aja
COPY --from=build /app/.output /app

EXPOSE 3000
ENTRYPOINT [ "bun", "run", "/app/server/index.mjs" ]
