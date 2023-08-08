# Development Stage
FROM node:18 AS development
WORKDIR /srv/frontend

# Install packages
COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install

# Copy source files
COPY frontend .

EXPOSE 3000
CMD ["npm", "run", "start:dev"]

# Build Stage
FROM development AS build
RUN npm run build

# Production Stage
FROM node:18 AS production
WORKDIR /srv/frontend
ENV NODE_ENV=production

# Only install runtime dependencies
COPY --from=build /srv/frontend/package.json /srv/frontend/package-lock.json ./
RUN npm install

# Copy built assets from development stage
COPY --from=build /srv/frontend/.next /srv/frontend/.next

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
