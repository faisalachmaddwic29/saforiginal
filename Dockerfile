# syntax=docker/dockerfile:1.4

# =========================================================
# 🧩 Stage 1: Build stage
# =========================================================
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

# Optional: bersihin cache builder sebelum build baru
RUN docker builder prune -af > /dev/null 2>&1 || true

# Copy package files dulu biar cache layer efisien
COPY package*.json ./

# Pakai cache untuk npm agar build cepat
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev --legacy-peer-deps

# Copy semua source code
COPY . .

# Build Nuxt (atau Next, tergantung project kamu)
RUN npm run build --verbose


# =========================================================
# 🧩 Stage 2: Runtime stage (image final)
# =========================================================
FROM node:22-alpine

WORKDIR /usr/src/app

# Install PM2 runtime
RUN npm install -g pm2

# Copy hasil build dari stage sebelumnya
COPY --from=builder /usr/src/app/.output ./.output
COPY --from=builder /usr/src/app/package*.json ./

# Jalankan app pakai PM2 runtime
CMD ["pm2-runtime", "./server/index.mjs"]
