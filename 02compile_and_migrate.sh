#!/usr/bin/env bash
truffle compile           # compile contracts means generate build folder with contracts json files
truffle migrate --reset   # migrate contracts means deploy contracts to ganache-cli
sleep 1                   # wait for ganache-cli to start
rm -rf ./src/build        # remove build folder from src folder
mv -f ./build ./src/build # move build folder to src folder so that react can access it
