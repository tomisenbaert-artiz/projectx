# Stage 1: Build
FROM node:18-slim AS build
# Added libvips-dev for Sharp support
RUN apt-get update && apt-get install -y build-essential gcc autoconf automake libpng-dev zlib1g-dev libvips-dev libtool make
WORKDIR /opt/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Final runtime
FROM node:18-slim
# Install ONLY the runtime library for images
RUN apt-get update && apt-get install -y libvips-dev && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/app

# Copy ONLY what is needed to run
COPY --from=build /opt/app/package.json ./
COPY --from=build /opt/app/package-lock.json ./
COPY --from=build /opt/app/node_modules ./node_modules
COPY --from=build /opt/app/public ./public
COPY --from=build /opt/app/dist ./dist
# (If using Strapi v4, the build output is in /build, v5 is in /dist)

EXPOSE 1337
ENV NODE_ENV=production

# Use the direct path to the start script for faster execution
CMD ["npm", "run", "start"]