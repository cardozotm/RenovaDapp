#!/bin/bash

mkdir -p /cb-docker/mnt/eosio/data
mkdir -p /cb-docker/mnt/eosio/contracts

docker-compose up --build -d

sleep 30

docker exec eosio sh -c 'cp -R /contracts-all/* /contracts/ && rm -rf /contracts-all'

