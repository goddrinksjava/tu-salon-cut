# Build Stage
FROM node:18 AS build
WORKDIR /srv/tu-salon-cut

# Install packages
WORKDIR /srv/tu-salon-cut/backend
COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm install

WORKDIR /srv/tu-salon-cut/frontend
COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install

ENV NODE_ENV=development

EXPOSE 4000 3000
ENTRYPOINT ["sleep", "infinity"]
