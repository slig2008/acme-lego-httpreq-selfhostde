FROM node:20-alpine3.18 as base

ENV NODE_ENV=production

FROM base AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --production --silent

FROM base
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY . .

EXPOSE 3000

HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 1

USER node

CMD ["npm", "start"]