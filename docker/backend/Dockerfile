# Development Stage
FROM node:18 AS development
WORKDIR /srv/backend

# Install packages
COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm install

# Copy source files
COPY backend .

EXPOSE 4000
CMD ["npm", "run", "start:dev"]

# Build Stage
FROM development AS build
RUN npm run build

# Production Stage
FROM node:18 AS production
WORKDIR /srv/backend
ENV NODE_ENV=production

# Only install runtime dependencies
COPY --from=build /srv/backend/package.json /srv/backend/package-lock.json ./
RUN npm install

# Copy built assets from build stage
COPY --from=build /srv/backend/dist /srv/backend/dist
COPY --from=build /srv/backend/migrations /srv/backend/migrations
COPY --from=build /srv/backend/seeds /srv/backend/seeds

EXPOSE 4000
CMD ["npm", "run", "start:prod"]
