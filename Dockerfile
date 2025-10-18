# Stage builder
FROM node:22-alpine AS builder
WORKDIR /usr/src/app

# Bersihkan cache build lama di CI/CD
# (ini dilakukan di luar Dockerfile, bukan di sini!)
# docker builder prune -af > /dev/null 2>&1 || true

# Copy dependency files
COPY package*.json ./

# Gunakan cache npm agar build lebih cepat
RUN --mount=type=cache,target=/root/.npm \
    npm install --omit=dev --legacy-peer-deps

# Copy semua source
COPY . .

# Build aplikasi
RUN npm run build

# Stage runtime
FROM node:22-alpine AS runtime
WORKDIR /usr/src/app

# Copy hasil build dari builder
COPY --from=builder /usr/src/app/.output ./.output
COPY --from=builder /usr/src/app/package*.json ./

RUN npm install -g pm2

CMD ["pm2-runtime", "./.output/server/index.mjs"]
