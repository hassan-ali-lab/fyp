# FYP Project

1. Start Ganache (GUI or CLI) <code>ganache-cli -p 7545</code>
2. compile and migrate contracts
   <code>#!/usr/bin/env bash
   truffle compile # compile contracts means generate build folder with contracts json files
   truffle migrate --reset # migrate contracts means deploy contracts to ganache-cli
   sleep 1 # wait for ganache-cli to start
   rm -rf ./src/build # remove build folder from src folder
   mv -f ./build ./src/build # move build folder to src folder so that react can access it
   </code>
3. use <code>npm start</code> to start the react app
4. use private key from ganache-cli to login to metamask
5. use private key for service account
