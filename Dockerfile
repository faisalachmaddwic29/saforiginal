# Gunakan Node Debian stable slim
FROM node:22-bullseye-slim

# Set working directory
WORKDIR /usr/src/app

# Set Node heap lebih besar (misal 4GB) untuk Nuxt build besar
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy semua source code
COPY . .

# Build Nuxt app
RUN npm run build --verbose

# Install PM2 globally untuk runtime
RUN npm install -g pm2

# Jalankan server Nuxt via PM2
CMD ["pm2-runtime", "./.output/server/index.mjs"]
