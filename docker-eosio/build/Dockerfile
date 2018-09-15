FROM eosio/eos:v1.2.5

RUN mkdir /contracts-all \
&& cp -R /contracts/* /contracts-all/

#CMD nodeos -e -p eosio --plugin eosio::wallet_api_plugin --plugin eosio::wallet_plugin --plugin eosio::producer_plugin --plugin eosio::history_plugin --plugin eosio::chain_api_plugin --plugin eosio::history_api_plugin --plugin eosio::http_plugin -d /mnt/dev/data --config-dir /mnt/dev/config --http-server-address=0.0.0.0:8888 --access-control-allow-origin=* --contracts-console

# SECUNDARIO
#CMD nodeos -e -p eosio --plugin eosio::wallet_api_plugin --plugin eosio::wallet_plugin --plugin eosio::producer_plugin --plugin eosio::history_plugin --plugin eosio::chain_api_plugin --plugin eosio::history_api_plugin --contracts-console

# PRIMARIO
#CMD nodeos -e -p eosio --plugin eosio::wallet_api_plugin --plugin eosio::wallet_plugin --plugin eosio::producer_plugin --plugin eosio::history_plugin --plugin eosio::chain_api_plugin --plugin eosio::history_api_plugin --plugin eosio::http_plugin --http-server-address=0.0.0.0:8888 --access-control-allow-origin=* --contracts-console

#CMD nodeos -e -p eosio --plugin eosio::wallet_api_plugin --plugin eosio::wallet_plugin --plugin eosio::producer_plugin --plugin eosio::history_plugin --plugin eosio::chain_api_plugin --plugin eosio::history_api_plugin --plugin eosio::http_plugin --http-server-address=0.0.0.0:8888 --access-control-allow-origin=* -d /mnt/dev/data --config-dir /mnt/dev/config --contracts-console 

#--replay-blockchain

#CMD ["nodeos", "-e", "-p", "eosio", "--plugin", "eosio::wallet_api_plugin", "--plugin", "eosio::wallet_plugin", "--plugin", "eosio::producer_plugin", "--plugin", "eosio::history_plugin", "--plugin", "eosio::chain_api_plugin", "--plugin", "eosio::history_api_plugin", "--plugin", "eosio::http_plugin", "--http-server-address=0.0.0.0:8888", "--access-control-allow-origin=*", "--contracts-console"]

#CMD ["nodeos", "-e", "-p", "eosio", "--plugin", "eosio::wallet_api_plugin", "--plugin", "eosio::wallet_plugin", "--plugin", "eosio::producer_plugin", "--plugin", "eosio::history_plugin", "--plugin", "eosio::chain_api_plugin", "--plugin", "eosio::history_api_plugin", "--plugin", "eosio::http_plugin", "--http-server-address=0.0.0.0:8888", "--access-control-allow-origin=*", "-d", "/mnt/dev/data", "--config-dir", "/mnt/dev/config", "--contracts-console"]

# ATUAL #################

#CMD ["nodeos", "-e", "-p", "eosio", "--plugin", "eosio::wallet_api_plugin", "--plugin", "eosio::wallet_plugin", "--plugin", "eosio::producer_plugin", "--plugin", "eosio::history_plugin", "--plugin", "eosio::chain_api_plugin", "--plugin", "eosio::history_api_plugin", "--plugin", "eosio::http_plugin", "--plugin", "eosio::net_plugin", "--http-server-address=0.0.0.0:8888", "--access-control-allow-origin=*", "-d", "/mnt/dev/data", "--config-dir", "/mnt/dev/config", "--http-validate-host=false", "--contracts-console"]

###########################

RUN apt-get update -y \ 
&& apt-get install nodejs -y 

CMD ["nodeos", "-e", "-d", "/mnt/dev/data", "--config-dir", "/mnt/dev/config"]
#CMD ["nodeos", "-e", "-d", "/mnt/dev/data", "--config-dir", "/mnt/dev/config", "--hard-replay-blockchain"]
#CMD ["nodeos", "-e", "-d", "/mnt/dev/data", "--config-dir", "/mnt/dev/config", "--genesis-json", "/mnt/dev/config/genesis.json"]

