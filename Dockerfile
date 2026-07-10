FROM nginx:alpine

# Remove default configuration and copy custom one
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static assets
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/
COPY welfare_data.json /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

EXPOSE 8400

CMD ["nginx", "-g", "daemon off;"]
