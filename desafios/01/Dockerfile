FROM golang:1.15

WORKDIR /go/src
COPY . .

ENV PATH="/go/bin:${PATH}"
ENV GO111MODULE=on
ENV CGO_ENABLED=1

EXPOSE 8080

RUN apt-get update && \
  apt-get install build-essential -y

RUN GOOS=linux go build main.go

CMD ["./main"]