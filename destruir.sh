#! /bin/bash

docker-compose down

docker rmi vaca/human-api
docker rmi vaca/device-api
docker rmi vaca/virtual-device