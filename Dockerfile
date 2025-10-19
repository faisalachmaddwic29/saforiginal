# Gunakan versi stabil
FROM node:22-alpine

# Set working directory
WORKDIR /usr/src/app

# Set Node heap memory lebih besar (misal 4GB)
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies
RUN rm -rf node_modules && npm install --legacy-peer-deps

# Copy semua file setelah install dependencies
COPY . .

# Build aplikasi
RUN npm run build --verbose

# Install PM2 runtime secara global
RUN npm install -g pm2

# Jalankan aplikasi menggunakan PM2
CMD ["pm2-runtime", "./.output/server/index.mjs"]
