###################
# BUILD FOR PRODUCTION
###################

FROM node:18.16.0-alpine As build
RUN apk add openssl openssl-dev libc6-compat && rm -rf /var/cache/apk/*
RUN apk add --update --no-cache openssl1.1-compat

WORKDIR /usr/src/parrotback

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./

RUN npm pkg delete scripts.prepare

RUN yarn

COPY --chown=node:node . .

RUN npx prisma generate
RUN npm run build

RUN npm pkg delete scripts.prepare

ENV NODE_ENV production

RUN yarn install --prod

USER node

###################
# PRODUCTION
###################

FROM node:18.16.0-alpine As production
#ARG SSL_PEM_CONTENT

RUN apk add openssl openssl-dev libc6-compat && rm -rf /var/cache/apk/*
RUN apk add --update --no-cache openssl1.1-compat

COPY --chown=node:node --from=build /usr/src/parrotback/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/parrotback/dist ./dist
COPY --chown=node:node ./prisma ./prisma
#RUN echo $SSL_PEM_CONTENT > ./prisma/database.crt.pem

RUN npx prisma generate

RUN npm install pm2 -g

CMD ["pm2-runtime", "dist/main.js"]
