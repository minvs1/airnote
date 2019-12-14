FROM node:12.13.1

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "start" ]
