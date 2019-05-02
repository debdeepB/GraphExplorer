FROM python:2.7-alpine


RUN apk update \
    && apk add -y --no-install-recommends \
        postgresql-client \
    && rm -rf /var/lib/apt/lists/*

RUN apk add build-base

RUN apk add postgresql-dev

WORKDIR /app/backend
COPY requirements.txt /app/backend
RUN pip install pip --upgrade
RUN pip install setuptools --upgrade
RUN pip install -r requirements.txt

EXPOSE 8000
