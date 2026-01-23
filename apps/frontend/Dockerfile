# STAGE 1: Build the React/Vue/Static app
FROM node:18-slim AS build-step
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ . 
RUN npm run build 

# STAGE 2: Serve with Nginx
FROM nginx:alpine

# 1. Update Nginx to listen on 8080 (Cloud Run's default)
RUN sed -i 's/listen\(.*\)80;/listen 8080;/g' /etc/nginx/conf.d/default.conf

# 2. Copy your custom config (Ensure this config also uses 8080!)
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# 3. Copy ONLY the built static files from Stage 1
# Note: Change 'dist' to 'build' if you are using Create React App
COPY --from=build-step /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]