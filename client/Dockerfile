FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install --omit=dev

COPY . .

ARG SERVER_HOST

ENV REACT_APP_SERVER_HOST=${SERVER_HOST}

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /var/log/app_engine

RUN mkdir -p /usr/share/nginx/www/_ah && \
    echo "healthy" > /usr/share/nginx/www/_ah/health

WORKDIR /usr/share/nginx/www/html

RUN rm -rf *

WORKDIR /usr/share/nginx/www

COPY --from=builder /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
