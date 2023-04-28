del -r src/build
truffle compile
truffle migrate --reset
mv build src/build
