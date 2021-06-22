FROM node:12-alpine AS build

WORKDIR /srv
COPY package*.json /srv/
RUN npm ci
COPY tsconfig.json /srv/
COPY src /srv/src/
RUN npm run build

FROM alpine:3
RUN apk add nodejs --no-cache
RUN apk add --no-cache \
        python3 \
        py3-pip \
    && pip3 install --upgrade pip \
    && pip3 install \
        awscli \
    && rm -rf /var/cache/apk/*
WORKDIR /srv
COPY --from=build /srv/node_modules /srv/node_modules
COPY --from=build /srv/dist /srv/
ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
    AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY\
    AWS_DEFAULT_REGION=$REGION
CMD node .