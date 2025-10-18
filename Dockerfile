# ============================
# Stage builder
# ============================
FROM node:22-slim AS builder
WORKDIR /usr/src/app

# Install tools buat build native addons (wajib untuk oxc-parser, sharp, dll)
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Copy dependencies
COPY package*.json ./

# Install deps dengan cache dan perbaikan bug npm optional dependencies
RUN --mount=type=cache,target=/root/.npm \
    npm install --omit=dev --legacy-peer-deps || \
    (rm -rf node_modules package-lock.json && npm install --omit=dev --legacy-peer-deps)

# Copy semua source code
COPY . .

# Build Nuxt app
RUN npm run build

# ============================
# Stage runtime
# ============================
FROM node:22-slim AS runtime
WORKDIR /usr/src/app

# Copy hasil build dari builder
COPY --from=builder /usr/src/app/.output ./.output
COPY --from=builder /usr/src/app/package*.json ./

# Install hanya PM2
RUN npm install -g pm2

# Jalankan aplikasi Nuxt via PM2
CMD ["pm2-runtime", "./.output/server/index.mjs"]
