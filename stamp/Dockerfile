FROM node:16-alpine3.15 AS react
WORKDIR /tmp/stamp
RUN wget https://github.com/wildme/stamp/tarball/master -O - | tar xz --strip-components=1
RUN npm install --silent
RUN npm run build --silent

FROM node:16-alpine3.15 AS express
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
ENV NODE_OPTIONS=--tls-min-v1.0
ENV STAMP_EXPRESS_PORT=3000
ENV STAMP_EXPRESS_STATIC_DIR='build'
ENV STAMP_EXPRESS_UPLOAD_DIR='files'
ENV STAMP_MONGODB='mongodb://address:27017/stamp'
ENV STAMP_LANG='en-En'
ENV STAMP_MAX_FILESIZE=5000000
ENV STAMP_JWT_ACCESS_SECRET='very-long-secret-1'
ENV STAMP_JWT_REFRESH_SECRET='very-long-secret-2'
ENV STAMP_JWT_COOKIE_AGE=28800000
ENV STAMP_JWT_ACCESS_EXP=600
ENV STAMP_JWT_REFRESH_EXP=28800
ENV STAMP_EXPRESS_SMTP_HOST="smtp_host_address"
ENV STAMP_EXPRESS_SMTP_PORT=587
ENV STAMP_EXPRESS_SMTP_SECURE=0
ENV STAMP_EXPRESS_SMTP_REJECT_UNAUTH=0
ENV STAMP_EXPRESS_SMTP_FROM="email"
ENV STAMP_EXPRESS_SMTP_USER="username"
ENV STAMP_EXPRESS_SMTP_PASS="password"
CMD ["pm2-runtime", "ecosystem.config.js"]
