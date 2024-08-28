FROM node:slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY source /app/ 

EXPOSE 3306
EXPOSE 3000

CMD [ "node", "server.js" ] 