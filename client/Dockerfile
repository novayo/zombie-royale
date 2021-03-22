FROM node:12.18.3

RUN mkdir -p /app/shihchungyu/client
WORKDIR /app/shihchungyu/client

COPY package.json /app/shihchungyu/client
COPY package-lock.json /app/shihchungyu/client

RUN npm install

COPY . /app/shihchungyu/client

CMD ["npm", "start"]