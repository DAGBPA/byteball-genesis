#!/bin/bash

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

rm "$APPDIR"/dag-pizza-hub/dagpizza*
rm "$APPDIR"/dag-pizza-explorer/dagpizza*

rm "$APPDIR"/wallet-genesis/dagpizza*

for i in {1..12}
do
    rm "$APPDIR"/wallet-chef$i/dagpizza*
done

echo All database has been deleted
