# ===============================
# Stage 1: Build Stage
# ===============================
FROM node:22-bullseye-slim AS builder

# Working directory
WORKDIR /usr/src/app

# Set Node heap memory lebih besar
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies termasuk optional dependencies
RUN npm ci --legacy-peer-deps

# Copy semua source code
COPY . .

# Build Nuxt app
RUN npm run build --verbose

# ===============================
# Stage 2: Runtime Stage
# ===============================
FROM node:22-bullseye-slim AS runtime

WORKDIR /usr/src/app

# Hanya copy hasil build dari stage builder
COPY --from=builder /usr/src/app/.output .output
COPY --from=builder /usr/src/app/node_modules node_modules
COPY --from=builder /usr/src/app/package.json .

# Install PM2 global untuk production
RUN npm install -g pm2

# Expose port jika perlu
EXPOSE 3000

# Run Nuxt server
CMD ["pm2-runtime", "./.output/server/index.mjs"]
