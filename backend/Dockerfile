FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

# ENTRYPOINT ["nodemon", "/usr/src/app/index.ts"]
CMD ["npm","run","dev"]