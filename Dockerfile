FROM alpine:3.22

RUN mkdir -p /www

COPY www/ /www/
