FROM node:16.13.2-alpine
WORKDIR /app

ADD package.json package.json
ADD package-lock.json package-lock.json

RUN npm ci

ADD lib lib

CMD [ "npm", "run", "start" ]
