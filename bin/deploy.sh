#!/usr/bin/env bash

SYSTEM=`uname -s`
if [ $SYSTEM = "Darwin" ] ; then
    APPDIR="$HOME/Library/Application Support"
elif [ $SYSTEM = "Linux" ] ; then
    APPDIR="$HOME/.config"
else
    echo "Unsupported system"
    exit -1
fi

cd `dirname $0`

pm2 delete all

echo "clean up old data"
rm -rf ../nodes/*
rm -rf "$APPDIR"/wallet*
rm -rf "$APPDIR"/dag-pizza-explorer
rm -rf "$APPDIR"/dag-pizza-hub

echo "copy wallet to appdir"
cp -a ../wallets/wallet* "$APPDIR"

echo "update config file"
cp -f ../config/hub-conf.js ../src/dag-pizza-hub/conf.js
cp -f ../config/chef-conf.js ../src/dag-pizza-chef/conf.js
cp -f ../config/explorer-conf.js ../src/dag-pizza-explorer/conf.js

echo "update start script"
cp -f ../config/chef-headless-start.js ../src/dag-pizza-chef/node_modules/dag-pizza-headless/start.js
cp -f ../config/chef-start.js ../src/dag-pizza-chef/start.js

echo "update constants"
cp -f ../config/constants.js ../src/dag-pizza-chef/node_modules/dag-pizza-dough/constants.js
cp -f ../config/constants.js ../src/dag-pizza-hub/node_modules/dag-pizza-dough/constants.js
cp -f ../config/constants.js ../src/dag-pizza-explorer/node_modules/dag-pizza-dough/constants.js

cp -f ../config/constants.js ../genesis/node_modules/dag-pizza-dough/constants.js

for i in {1..12}
do
    echo "deploy chef$i"
    cp -a ../src/dag-pizza-chef/ ../nodes/chef$i
    if [ $SYSTEM = "Darwin" ] ; then
        sed -i "" "s/dag-pizza-chef/wallet-chef$i/g" ../nodes/chef$i/package.json  
    else
        sed -i "s/dag-pizza-chef/wallet-chef$i/g" ../nodes/chef$i/package.json  
    fi
done

cp -a ../src/dag-pizza-explorer/ ../nodes/explorer
cp -a ../src/dag-pizza-hub/ ../nodes/hub

echo deploy finshed

#! run ./start.sh!
