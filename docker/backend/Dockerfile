# Build Stage
FROM node:18
ENV NODE_ENV=production
WORKDIR /srv/backend

# Install packages
COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm install

# Copy source files
COPY backend .

EXPOSE 4000
ENTRYPOINT ["npm", "run", "start:prod"]
