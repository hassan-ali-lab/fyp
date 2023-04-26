truffle compile
truffle migrate --reset
del -r ./src/build
mv -f ./build ./src/build
