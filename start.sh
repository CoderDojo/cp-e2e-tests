#!/bin/bash
WORKDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
trap 'echo KILL SELENIUM; kill $SPID' EXIT

IP="$1"
PORT="$2"

EXIST=$(ps aux | grep "selenium")
if [[ "$EXIST" == *"selenium-server-standalone"* ]]; then
	echo "USE EXISTING SELENIUM"
	IFS=' ' read -ra PARAMS <<< "$EXIST"
	SPID="${PARAMS[1]}"
else
	echo "SPAWN NEW SELENIUM"
	FILE=$(ls "$WORKDIR/jar" | grep "selenium")
	nohup "java" "-jar" "$WORKDIR/jar/$FILE" >"$WORKDIR/report/selenium.log" 2>&1 & echo "$!" >"$WORKDIR/report/selenium.pid" &
	SPID=$(cat $WORKDIR/report/selenium.pid)
fi
echo "SELENIUM PID IS $SPID"

echo
echo "WAITING FOR SELENIUM"
CONNECTED=""
while [[ $CONNECTED != *"succeed"* ]]; do
	CONNECTED="$(nc -z -v 127.0.0.1 4444 2>&1)"

	printf '.'
	sleep 0.1
done
printf ' SUCCESS'

if [[ "$IP" == "" ]]; then IP="localhost"; fi
if [[ "$PORT" == "" ]]; then PORT="8000"; fi

export ENV_IP="$IP"
export ENV_PORT="$PORT"

echo
echo
echo "RUN NIGHTWATCH"
$WORKDIR/node_modules/.bin/nightwatch