FROM node:12.18.3

RUN npm install -g nodemon

RUN mkdir -p /app/shihchungyu/server
WORKDIR /app/shihchungyu/server

COPY package.json ./
COPY package-lock.json ./
RUN npm install && mv /app/shihchungyu/server/node_modules /node_modules

COPY . /app/shihchungyu/server

CMD ["npm", "start"]
