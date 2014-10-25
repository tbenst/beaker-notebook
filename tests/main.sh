# export display so firefox knows where to show
# since we are in headless mode
export DISPLAY=:99.0

# start xdisplay
Xvfb :99 -shmem -screen 0 1368x768x16 &
fluxbox &
x11vnc -shared -display :99 -bg -nopw -listen 0.0.0.0 -forever -logappend /var/log/x11vnc.log -xkb

BUNSEN_HOSTNAME=${BUNSEN_HOSTNAME-localhost}

# wait for app to be ready
bunsen_url=http://u:p@${GATEWAY_PORT_80_TCP_ADDR}:${GATEWAY_PORT_80_TCP_PORT}
until $(curl -o /dev/null -s --head --fail -H "Host:${BUNSEN_HOSTNAME}" $bunsen_url); do
  echo "waiting for bunsen at ${bunsen_url} ..."
  sleep 1
done

# run the test
java -jar selenium.jar &
npm start
