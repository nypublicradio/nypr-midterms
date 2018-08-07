FROM node:8

RUN mkdir /code
WORKDIR /code

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . ./

RUN apt-get update && apt-get install -y unzip

CMD node fastboot