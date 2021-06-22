FROM node:12-alpine AS build

WORKDIR /srv
COPY package*.json /srv/
RUN npm ci
COPY tsconfig.json /srv/
COPY src /srv/src/
RUN npm run build

CMD [ "npm", "start" ]