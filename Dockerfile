# # Stage build
# FROM oven/bun:1 AS build
# WORKDIR /app
# COPY package.json bun.lockb* ./
# RUN bun install --frozen-lockfile --ignore-scripts
# COPY . .
# RUN bun run build

# # Stage production
# FROM oven/bun:1 AS production
# WORKDIR /app
# COPY --from=build /app/.output /app

# # Install pm2 globally (pakai npm karena pm2 belum native di bun)
# RUN bun install -g pm2

# EXPOSE 3001
# CMD ["pm2-runtime", "/app/server/index.mjs"]


# ==========================
# Stage 1: Build
# ==========================
FROM oven/bun:1 AS build

WORKDIR /app

# Lebih aman untuk cache layer bun.lockb opsional
COPY bun.lockb* package.json ./

# Gunakan cache untuk bun agar lebih efisien
RUN --mount=type=cache,target=/root/.bun bun install --frozen-lockfile --ignore-scripts

COPY . .

# Batasi thread dan memory usage saat build (hindari OOM)
ENV NODE_OPTIONS="--max-old-space-size=2048"
RUN bun run build

# ==========================
# Stage 2: Production
# ==========================
FROM oven/bun:1 AS production

WORKDIR /app

# Copy hasil build saja
COPY --from=build /app/.output /app

# Install PM2 via npm (lebih stabil)
RUN apt-get update && apt-get install -y npm && npm install -g pm2 && apt-get clean && rm -rf /var/lib/apt/lists/*

# Jalankan pakai pm2-runtime
CMD ["pm2-runtime", "/app/server/index.mjs"]
