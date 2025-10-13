# Étape 1 : Build Angular
FROM node:20 AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --prod

# Étape 2 : Serve le build Angular
FROM node:20-alpine
WORKDIR /app
# Copier le contenu du dossier browser pour servir la SPA
COPY --from=build-stage /app/dist/frontend/browser /app
RUN npm install -g serve
EXPOSE 5000
CMD ["serve", "-s", ".", "-l", "5000"]
