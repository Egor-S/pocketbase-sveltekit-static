FROM alpine:latest as downloader
ARG VERSION=0.19.4
ARG ARCH=linux_amd64
RUN wget https://github.com/pocketbase/pocketbase/releases/download/v${VERSION}/pocketbase_${VERSION}_${ARCH}.zip \
    && unzip pocketbase_${VERSION}_${ARCH}.zip -d /tmp/ \
    && chmod +x /tmp/pocketbase

FROM alpine:latest as base
WORKDIR /app
RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*
COPY --from=downloader /tmp/pocketbase /app/pocketbase
EXPOSE 8090
CMD ["./pocketbase", "serve", "--http=0.0.0.0:8090"]

FROM base as prod
COPY ./pocketbase/pb_hooks /app/pb_hooks
COPY ./pocketbase/pb_migrations /app/pb_migrations
# COPY --from=frontend /app/build /app/pb_public
