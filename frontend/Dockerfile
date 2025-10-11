FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build --prod

FROM nginx:1.25
COPY --from=build /app/dist/frontend /usr/share/nginx/html
EXPOSE 80
