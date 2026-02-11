# Stage 1: Build the Strapi admin panel
FROM node:18-slim AS build
RUN apt-get update && apt-get install -y build-essential gcc autoconf automake libpng-dev zlib1g-dev libtool make
WORKDIR /opt/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Final runtime image
FROM node:18-slim
RUN apt-get update && apt-get install -y libpng-dev
WORKDIR /opt/app
COPY --from=build /opt/app ./
EXPOSE 1337
ENV NODE_ENV=production
CMD ["npm", "run", "start"]