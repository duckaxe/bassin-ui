FROM alpine:3.22

RUN mkdir -p /ui

COPY web/ /ui/
