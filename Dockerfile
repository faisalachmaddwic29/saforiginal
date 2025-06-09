# # Menggunakan node versi stabil
# FROM node:22

# # Set working directory
# WORKDIR /usr/src/app

# # Copy package.json dan package-lock.json
# COPY package*.json ./

# RUN unlink package-lock.json
# # # Install dependencies
# # RUN rm -rf node_modules && npm install

# # Install dependencies
# RUN npm install

# # Copy semua file
# COPY . .

# # Build aplikasi dengan verbose output
# RUN npm run build --verbose

# # Install PM2 globally
# RUN npm install pm2 -g

# # Jalankan dengan PM2
# # CMD ["pm2-runtime","start", "ecosystem.config.js"]
# # CMD ["node", "./.output/server/index.mjs"]

# CMD ["npx", "pm2-runtime", "./.output/server/index.mjs"]


# Menggunakan node versi stabil
FROM node:22-alpine

# Install curl untuk health check
RUN apk add --no-cache curl

# Set working directory
WORKDIR /usr/src/app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Remove existing lock file dan install dependencies
RUN rm -rf package-lock.json node_modules && npm install

# Copy semua file
COPY . .

# Build aplikasi
RUN npm run build

# Remove devDependencies after build to reduce image size
RUN npm prune --production

# Install PM2 globally setelah prune
RUN npm install pm2 -g

# Create logs directory untuk PM2
RUN mkdir -p logs

# Expose port
EXPOSE 3001

# Health check dengan timeout yang lebih panjang
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:3001/ || exit 1

# Jalankan dengan PM2 menggunakan ecosystem.config.js
# Tetap running as root (tidak recommended tapi bisa)
CMD ["pm2-runtime", "start", "ecosystem.config.js"]