FROM node:18.16.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN npm i

COPY . ./

CMD ["npm", "start"]