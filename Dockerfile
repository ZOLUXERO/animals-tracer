FROM node:20.14.0-alpine3.20 as build

WORKDIR /usr/src/app

COPY . .

EXPOSE 3000

CMD npx prisma migrate dev --name init && npm start
