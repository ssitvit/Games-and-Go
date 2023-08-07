FROM node:14-alpine

WORKDIR /Games-and-Go

COPY ./package*.json /Games-and-Go

RUN npm install

COPY . /Games-and-Go

CMD ["npm","start"]