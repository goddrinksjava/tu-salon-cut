FROM node:17-alpine

# Create app directory
WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . .
RUN npm install

EXPOSE 3000
EXPOSE 4000

CMD ["npm", "run", "start:dev"]