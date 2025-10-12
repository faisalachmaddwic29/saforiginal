# Gunakan base image Node.js versi stabil (alpine lebih ringan)
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

# Salin package.json dan lock file saja dulu untuk caching layer yang efisien
COPY package*.json ./

# Hapus lock file lama jika perlu (misal supaya install clean)
RUN rm -f package-lock.json

# Install dependency secara clean (tanpa devDependencies)
RUN npm ci --omit=dev || npm install --omit=dev --legacy-peer-deps

# Copy semua file proyek
COPY . .

# Build Nuxt (output akan di .output/)
RUN npm run build

# ============================
# Stage 2: Runtime environment
# ============================
FROM node:22-alpine AS runner

WORKDIR /usr/src/app

# Install PM2 globally untuk manajemen proses
RUN npm install -g pm2

# Copy hasil build dan dependency yang sudah diinstall dari tahap sebelumnya
COPY --from=builder /usr/src/app ./

# Expose port default Nuxt
EXPOSE 3000

# Jalankan aplikasi menggunakan PM2 runtime (lebih stabil untuk container)
CMD ["pm2-runtime", "./.output/server/index.mjs"]
