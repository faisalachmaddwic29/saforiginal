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

# Set working directory
WORKDIR /usr/src/app

# Install PM2 globally
RUN npm install pm2 -g

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


# Create logs directory untuk PM2
RUN mkdir -p logs

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/ || exit 1

# Jalankan dengan PM2 menggunakan ecosystem.config.js
CMD ["pm2-runtime", "start", "ecosystem.config.js"]