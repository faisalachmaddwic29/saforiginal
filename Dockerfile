# Gunakan Alpine tapi lengkap build tools
FROM node:22-alpine

# Set working directory
WORKDIR /usr/src/app

# Set Node heap memory lebih besar (misal 4GB)
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Install build tools supaya native modules bisa compile
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    bash \
    libc6-compat \
    git \
    && python3 -m ensurepip \
    && pip3 install --no-cache --upgrade pip

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies
RUN rm -rf node_modules && npm install --legacy-peer-deps

# Copy semua file setelah install dependencies
COPY . .

# Build aplikasi Nuxt
RUN npm run build --verbose

# Install PM2 runtime secara global
RUN npm install -g pm2

# Jalankan aplikasi menggunakan PM2
CMD ["pm2-runtime", "./.output/server/index.mjs"]
