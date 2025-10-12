# Menggunakan node versi stabil
FROM node:22-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json dan package-lock.json
COPY package*.json ./

RUN unlink package-lock.json
# Install dependencies
RUN rm -rf node_modules && npm install --omit=dev

# Copy semua file
COPY . .

# Build aplikasi dengan verbose output
RUN npm run build --verbose

# Install PM2 globally
RUN npm install pm2 -g

# Jalankan dengan PM2
# CMD ["pm2-runtime","start", "ecosystem.config.js"]
# CMD ["node", "./.output/server/index.mjs"]

CMD ["npx", "pm2-runtime", "./.output/server/index.mjs"]
