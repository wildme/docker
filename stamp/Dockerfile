FROM node:12.22.11-alpine3.14 AS react
WORKDIR /tmp/stamp
RUN wget https://github.com/wildme/stamp/tarball/master -O - | tar xz --strip-components=1
RUN npm install --silent
RUN npm run build --silent

FROM node:12.22.11-alpine3.14 AS express
EXPOSE 3000
RUN npm install -g pm2 --silent
RUN addgroup --gid 1001 stamp
RUN adduser --disabled-password --gecos "" --ingroup stamp stamp
USER stamp
WORKDIR /stamp
RUN wget https://github.com/wildme/server-stamp/tarball/master -O - | tar xz --strip-components=1
RUN npm install --silent
COPY --from=react /tmp/stamp/build ./build
COPY ecosystem.config.js ./
ENV STAMP_EXPRESS_PORT=3000
ENV STAMP_EXPRESS_STATIC_DIR='build'
ENV STAMP_EXPRESS_UPLOAD_DIR='files'
ENV STAMP_MONGODB='mongodb://192.168.88.123:27017/stamp'
ENV STAMP_LANG='ru-RU'
ENV STAMP_MAX_FILESIZE=5000000
ENV STAMP_JWT_ACCESS_SECRET='x+IQq4_jrNzutS2Gx21L14gXTuhXLSx%PEZdbqESLg3B'
ENV STAMP_JWT_REFRESH_SECRET='svQv62z9Bv$fQ2YfCIXhs1rs1V_0bwX_q57Vg0KMRVSq'
ENV STAMP_JWT_COOKIE_AGE=28800000
ENV STAMP_JWT_ACCESS_EXP=600
ENV STAMP_JWT_REFRESH_EXP=28800
CMD ["pm2-runtime", "ecosystem.config.js"]
