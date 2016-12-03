FROM node:6.9
ARG port=3001

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

EXPOSE $PORT
CMD npm run start