# ----------------------
#   FRONTEND (Angular)
# ----------------------
FROM node:20 AS build
WORKDIR /app

# Installer dépendances
COPY package*.json ./
RUN npm install

# Copier tout et builder Angular
COPY . .
RUN npm run build --prod

# ----------------------
#   SERVEUR NGINX
# ----------------------
FROM nginx:alpine
COPY --from=build /app/dist/* /usr/share/nginx/html
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
