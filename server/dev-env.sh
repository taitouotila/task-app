if [ $1 = "up" ]; then
    docker-compose -f db/docker-compose-db.yml up -d
fi

if [ $1 = "down" ]; then
    docker-compose -f db/docker-compose-db.yml down
fi
