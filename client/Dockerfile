FROM node:18-alpine AS builder

WORKDIR /app

COPY client/package.json package.json
COPY client/package-lock.json package-lock.json

RUN npm install --omit=dev

COPY client/. .

RUN npm run build

FROM nginx:alpine

COPY client/nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /var/log/app_engine

RUN mkdir -p /usr/share/nginx/www/_ah && \
    echo "healthy" > /usr/share/nginx/www/_ah/health

WORKDIR /usr/share/nginx/www/html

RUN rm -rf *

WORKDIR /usr/share/nginx/www

COPY --from=builder /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
