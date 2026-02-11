# Use the lightweight Nginx Alpine image
FROM nginx:alpine

# Copy your custom config from the /nginx directory
# (Note: In your Cloud Build step, we will set the context to the root)
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy your static frontend files
COPY frontend/ /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]