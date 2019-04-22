# common base image for development and production
FROM node:10-alpine AS base
ENV APP_HOME /app
WORKDIR ${APP_HOME}

# dev image contains everything needed for testing, development and building
FROM base AS development
COPY package.json yarn.lock ./

# first set aside prod dependencies so we can copy in to the prod image
RUN yarn install --pure-lockfile --production
RUN cp -R node_modules /tmp/node_modules

# install all dependencies and add source code
RUN yarn install --pure-lockfile
COPY . .

# builder runs unit tests and linter, then builds production code
FROM development as builder
RUN yarn lint
RUN yarn build
# RUN yarn babel ./src --out-dir ./dist --copy-files

# release includes bare minimum required to run the app, copied from builder
FROM base AS release
COPY --from=builder /tmp/node_modules ./node_modules
COPY --from=builder /app/dist ./
COPY --from=builder /app/package.json ./

CMD ["node", "index.js"]
