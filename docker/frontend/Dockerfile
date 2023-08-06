FROM node:lts-alpine
ADD frontend /home/node/app/frontend
WORKDIR /home/node/app/frontend
ENV NODE_ENV=production
RUN npm install
RUN npm run build
CMD ["npm", "run", "start:prod"]
