FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Set the working directory
WORKDIR /app/src

EXPOSE 5000

CMD ["npm","run","dev"]