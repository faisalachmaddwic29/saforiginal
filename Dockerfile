# Gunakan Node versi stabil berbasis Debian (glibc)
FROM node:22-slim

# Set working directory
WORKDIR /usr/src/app

# Set Node heap memory lebih besar (misal 4GB)
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies (tidak perlu hapus node_modules karena fresh image)
RUN npm ci --legacy-peer-deps

# Copy semua source code
COPY . .

# Build Nuxt app
RUN npm run build --verbose

# Install PM2 runtime secara global
RUN npm install -g pm2

# Jalankan aplikasi dengan PM2
CMD ["pm2-runtime", "./.output/server/index.mjs"]
