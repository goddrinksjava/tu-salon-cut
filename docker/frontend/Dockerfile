# Build Stage
FROM node:18 AS build
WORKDIR /srv/frontend

# Install packages
COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install

# Copy source files
COPY frontend .
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
COPY --from=build /srv/frontend/public /srv/frontend/public

EXPOSE 3000
ENTRYPOINT ["npm", "run", "start:prod"]
