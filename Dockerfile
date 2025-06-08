FROM node:20-bullseye

# Install native build tools untuk native modules seperti oxc-parser
RUN apt-get update && apt-get install -y python3 make g++

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --verbose

RUN npm install -g pm2

CMD ["npx", "pm2-runtime", "./.output/server/index.mjs"]
