FROM node:12.18.2 as build

ARG REACT_APP_SERVICES_HOST=/services/m

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

RUN yarn install
COPY . .
RUN yarn build


FROM nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist/* /usr/share/nginx/html