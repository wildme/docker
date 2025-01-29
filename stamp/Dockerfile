FROM node:18.20.6-alpine3.20 AS react
WORKDIR /tmp/stamp
RUN wget https://github.com/wildme/stamp/tarball/master -O - | tar xz --strip-components=1
RUN npm install --production --silent
RUN npm run build --silent

FROM node:18.20-alpine3.20 AS express
EXPOSE 3000
EXPOSE 3080
WORKDIR /stamp
RUN npm install -g pm2 --silent
RUN wget https://github.com/wildme/server-stamp/tarball/main -O - | tar xz --strip-components=1
RUN npm install --production --silent
COPY --from=react /tmp/stamp/build ./build
COPY ecosystem.config.js ./
ENTRYPOINT ["pm2-runtime", "ecosystem.config.js"]
