#!/bin/bash

if [ -z "$1" ]; then
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        IP=$(ip route | grep default | awk '{print $3}' | xargs)
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        IP=$(netstat -rn | grep default | awk '{print $2}' | xargs)
    elif [[ "$OSTYPE" == "cygwin" || "$OSTYPE" == "msys" ]]; then
        IP=$(ipconfig.exe | grep -E -B 2 "Default Gateway(.*)[0-9]+" | grep 'IPv4 Address' | cut -d ':' -f2 | xargs)
    else
        echo "Unsupported OS $OSTYPE, please use ip override"
        exit 1
    fi
else
    if [[ $1 = "-h" || $1 = "--help" ]]; then
        echo "Usage: frida.sh [ip] [port]"
        echo "       ip - IP override, if omitted uses your private IPv4"
        echo "       port - Port override, uses 9339 if omitted"
        exit 0
    fi
    IP=$1
fi

PORT=${2:-9339}

APP_PATH="com.supercell.everdale"
ACTIVITY="com.supercell.valleysandvillages.GameApp"
adb shell am start -n "$APP_PATH/$ACTIVITY"

adb forward tcp:27042 tcp:27042
ADDRESS="{\"ip\":\"$IP\",\"port\":\"$PORT\"}"
frida -p $(adb shell pidof com.supercell.everdale) -H 127.0.0.1:27042 -l script.js -P "$ADDRESS"