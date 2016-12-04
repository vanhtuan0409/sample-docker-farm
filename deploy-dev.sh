#!/bin/bash

# Print help
function print_help {
  echo "Usage:  buildapp [options] [arguments]
        Script for deploy app in development enviroment
Options:
  -t, --tag:    Add tag for built image
  -c, --client  Port of client
  -a, --api     Port of api
  -d, --detach  Run container in detach mode
  -h, --help    Print help"
}

# Default arguments
tag="latest"
client_port=3000
api_port=8080
service=""
detach=false

# Parse arguments
while [ "$1" != "" ]; do
  case $1 in
    "-t" | "--tag")
      shift
      tag=$1
      ;;
    "-c" | "--client")
      shift
      client_port=$1
      ;;
    "-a" | "--api")
      shift
      api_port=$1
      ;;
    "-h" | "--help")
      print_help
      exit
      ;;
    "-d" | "--detach")
      detach=true
      ;;
    "gateway" | "client" | "server")
      service=$1
      ;;
    *)
      echo "Parse arguments error"
      exit
  esac
  shift
done

export TAG=$tag
export CLIENT_PORT=$client_port
export API_PORT=$api_port
export NODE_ENV=development

# Run docker
if [ $detach = true ]; then
  docker-compose up $service -d
else
  docker-compose up $service
fi

unset TAG
unset CLIENT_PORT
unset API_PORT
unset NODE_ENV

echo "----------------------------"
echo "Container tag is: $tag"
echo "Client port is: $client_port"
echo "Api port is: $api_port"
if [[ -z $service ]]; then
  echo "Service: [client, server, gateway]"
else
  echo "Service: $service"
fi