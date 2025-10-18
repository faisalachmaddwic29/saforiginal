# Stage builder
FROM node:22-slim AS builder
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

# Install semua dependency (tanpa dev)
RUN --mount=type=cache,target=/root/.npm \
    npm install --omit=dev --legacy-peer-deps || \
    (rm -rf node_modules package-lock.json && npm install --omit=dev --legacy-peer-deps)

COPY . .

RUN npm run build

# Stage runtime
FROM node:22-slim AS runtime
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/.output ./.output
COPY --from=builder /usr/src/app/package*.json ./

RUN npm install -g pm2

CMD ["pm2-runtime", "./.output/server/index.mjs"]
