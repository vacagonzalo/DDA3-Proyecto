#! /bin/bash

chmod +x destruir.sh

docker build -t vaca/human-api ./human-api/

docker build -t vaca/device-api ./device-api/

docker build -t vaca/virtual-device ./virtual-device/

docker-compose up -d

printf "wait for 5 seconds..."

sleep 5

docker-compose exec human-api sh -c "npx sequelize-cli db:migrate"

docker-compose exec human-api sh -c "npx sequelize-cli db:seed:all"

cd frontend

chmod +x serve.sh

./serve.sh