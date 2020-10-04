#! /bin/bash

chmod +x destruir.sh

docker build -t vaca/human-api ./human-api/

docker-compose up -d

docker-compose exec human-api sh -c "npx sequelize-cli db:migrate"

docker-compose exec human-api sh -c "npx sequelize-cli db:seed:all"