#syntax=docker/dockerfile:1

# sveltekit stage is platform independent
FROM --platform=$BUILDPLATFORM node:25-alpine AS sveltekit
WORKDIR /app
COPY sveltekit/package.json sveltekit/package-lock.json ./
RUN npm install
COPY sveltekit ./
RUN npm run build

# pin stage platform and use golang's toolchain
FROM --platform=$BUILDPLATFORM golang:1.27-alpine AS pocketbase
WORKDIR /app
COPY pocketbase/go.mod pocketbase/go.sum ./
RUN go mod download
COPY pocketbase ./
COPY --from=sveltekit /app/build /app/pb_public
RUN CGO_ENABLED=0 GOOS=$TARGETOS GOARCH=$TARGETARCH go build -o pocketbase main.go

FROM alpine:3.22
WORKDIR /app
RUN apk --update add ca-certificates
COPY --from=pocketbase /app/pocketbase /app/pocketbase
EXPOSE 8090
CMD ["./pocketbase", "serve", "--http=0.0.0.0:8090"]
