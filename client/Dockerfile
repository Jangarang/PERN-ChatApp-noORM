FROM node:18

WORKDIR /app/client

# Copy package.json and install dependencies first (to cache them)
COPY package*.json ./
RUN NPM install

# Copy rest of your code 
COPY . .

# Expose a port 
EXPOSE 5173 

CMD ["npm","run","dev"] 