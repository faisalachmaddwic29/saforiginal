FROM node:22-alpine

WORKDIR /usr/src/app

# Set heap lebih besar
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Install build tools supaya native module bisa compile
RUN apk add --no-cache python3 make g++ libc6-compat bash git

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies
RUN rm -rf node_modules && npm install --legacy-peer-deps

# Copy seluruh source
COPY . .

# Build Nuxt
RUN npm run build --verbose

# Install PM2
RUN npm install -g pm2

# Jalankan Nuxt server
CMD ["pm2-runtime", "./.output/server/index.mjs"]
