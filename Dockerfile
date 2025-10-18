# Stage build
FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile --ignore-scripts
COPY . .
RUN bun run build

# Stage production
FROM oven/bun:1 AS production
WORKDIR /app
COPY --from=build /app/.output /app

# Install pm2 globally (pakai npm karena pm2 belum native di bun)
RUN bun install -g pm2

EXPOSE 3001
CMD ["pm2-runtime", "/app/server/index.mjs"]
