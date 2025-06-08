FROM node:20-alpine

# Install native build tools
RUN apk add --no-cache python3 make g++

WORKDIR /usr/src/app

COPY package*.json ./

RUN rm -rf node_modules && npm install

COPY . .
RUN npm run build --verbose

RUN npm install -g pm2

CMD ["npx", "pm2-runtime", "./.output/server/index.mjs"]
