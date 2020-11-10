FROM node:14-alpine

WORKDIR /srv

RUN apk add imagemagick
RUN apk add ffmpeg

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

CMD yarn "$(if [ "$NODE_ENV" = "production" ] ; then echo "start" ; else echo "dev" ; fi)"
