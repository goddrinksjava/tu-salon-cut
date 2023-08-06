FROM node:lts-alpine
ADD backend /home/node/app/backend
WORKDIR /home/node/app/backend
ENV NODE_ENV=production
RUN npm install
RUN npm run build
CMD ["npm", "run", "start:prod"]
