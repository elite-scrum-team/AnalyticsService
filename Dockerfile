FROM node:10.10-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production -no-audit

COPY . .

EXPOSE 80
CMD [ "npm", "start" ]
