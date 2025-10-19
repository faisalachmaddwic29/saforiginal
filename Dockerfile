# Gunakan versi stabil Node.js LTS
FROM node:22-bullseye-slim

# Set working directory
WORKDIR /usr/src/app

# Set Node heap memory lebih besar (misal 4GB)
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Copy dependency files dulu supaya bisa cache layer npm install
COPY package.json package-lock.json ./

# Install dependencies
RUN rm -rf node_modules && npm install --legacy-peer-deps

# Copy semua file project setelah install dependencies
COPY . .

# Build aplikasi Nuxt
RUN npm run build --verbose

# Install PM2 runtime secara global
RUN npm install -g pm2

# Jalankan aplikasi dengan PM2
CMD ["pm2-runtime", "./.output/server/index.mjs"]
