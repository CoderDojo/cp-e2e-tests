WORKDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";

trap 'echo KILL SELENIUM; kill $SPID' EXIT

FILE=$(ls "$WORKDIR/jar" | grep "selenium")

EXIST=$(ps aux | grep "selenium")
if [[ "$EXIST" == *"selenium-server-standalone"* ]]; then
	echo "USE EXISTING SELENIUM"
	IFS=' ' read -ra PARAMS <<< "$EXIST"
	SPID="${PARAMS[1]}"
else
	echo "SPAWN NEW SELENIUM"
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

echo
echo
echo "RUN NIGHTWATCH"
$WORKDIR/node_modules/.bin/nightwatch