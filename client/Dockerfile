FROM node:6.9
ARG port=3000

MAINTAINER tuanvuong <vanhtuan0409@gmail.com>

# Enviroment variable
ENV APP=/usr/app PORT=$port
RUN echo $PORT

# Creatw working directory
RUN mkdir -p $APP
WORKDIR $APP

# Copy file
ADD package.json $APP
RUN npm install
ADD . $APP
RUN npm run build

EXPOSE $PORT
CMD npm run start