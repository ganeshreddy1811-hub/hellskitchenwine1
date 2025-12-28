FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Cloud Run will inject PORT=8080
EXPOSE 5173

CMD ["node", "server.js"]
