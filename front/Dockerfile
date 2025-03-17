FROM node

WORKDIR /web

COPY package*.json /web

COPY . .

RUN npm install

EXPOSE 5173

CMD [ "npm", "run", "dev", "--host" ]