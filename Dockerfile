FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev || npm install --omit=dev
COPY . .
RUN npm run build || true
ENV PORT=8787
EXPOSE 8787
CMD ["node", "server/src/index.js"]
