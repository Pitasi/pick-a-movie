FROM golang:1.16-alpine as build
WORKDIR /src

COPY go.mod go.sum ./
RUN go mod download
RUN go get -u github.com/swaggo/swag/cmd/swag

COPY . .

RUN swag init

RUN go build -o ./backend

FROM alpine

COPY --from=build /src/backend /usr/bin/backend
ENV DB_HOST="db"

EXPOSE 1337 1337

ENTRYPOINT ["/usr/bin/backend"]