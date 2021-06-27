FROM golang:1.16-alpine as build
WORKDIR /src

COPY . .

RUN go mod download

RUN go get -u github.com/swaggo/swag/cmd/swag
RUN swag init

RUN go build -o ./backend

FROM alpine

COPY --from=build /src/backend /usr/bin/backend
ENV DB_HOST="db"

EXPOSE 1337 1337

ENTRYPOINT ["/usr/bin/backend"]