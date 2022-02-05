digz - DayZ server query library
---
digz is a DayZ Standalone server query library. It is a fork of node-gamedig, but focus on providing a simpler DayZ server output.

digz is available as a node.js module, as well as a
[command line executable](#usage-from-command-line).

Usage from Node.js
---

```shell
npm install digz
```

```javascript
const digz = require('digz')
digz.query({
  host: '168.100.162.110',
  port: '2303',
  requestRules: true
}).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log('Server is offline')
})
```

### Query Options

**Typical**

* **host**: string - Hostname or IP of the game server
* **port**: number (optional) - Connection port or query port for the game server. Some
games utilize a separate "query" port. If specifying the game port does not seem to work as expected, passing in
this query port may work instead. (defaults to protocol default port)

**Advanced**

* **maxAttempts**: number - Number of attempts to query server in case of failure. (default 1)
* **socketTimeout**: number - Milliseconds to wait for a single packet. Beware that increasing this
 will cause many queries to take longer even if the server is online. (default 2000)
* **attemptTimeout**: number - Milliseconds allowed for an entire query attempt. This timeout is not commonly hit,
 as the socketTimeout typically fires first. (default 10000)
* **givenPortOnly**: boolean - Only attempt to query server on given port. (default false)
* **debug**: boolean - Enables massive amounts of debug logging to stdout. (default false)

### Return Value

The returned state object will contain the following keys:

* **name**: string - Server name
* **map**: string - Current server game map
* **password**: boolean - If a password is required
* **maxplayers**: number
* **players**: array of objects
  * **name**: string - If the player's name is unknown, the string will be empty.
  * **raw**: object - Additional information about the player if available (unstable)
    * The content of this field MAY change on a per-protocol basis between digz patch releases (although not typical).
* **bots**: array of objects - Same schema as `players`
* **connect**: string
  * This will typically include the game's `ip:port`
  * The port will reflect the server's game port, even if your request specified the game's query port in the request.
  * For some games, this may be a server ID or connection url if an IP:Port is not appropriate for end-users.
* **ping**: number
  * Round trip time to the server (in milliseconds).
  * Note that this is not the RTT of an ICMP echo, as ICMP packets are often blocked by NATs and node
    has poor support for raw sockets.
  * This value is derived from the RTT of one of the query packets, which is usually quite accurate, but may add a bit due to server lag.
* **raw**: freeform object (unstable)
  * Contains all information received from the server in a disorganized format.
  * The content of this field MAY change on a per-protocol basis between digz patch releases (although not typical).



### <a name="valve"></a>Valve Protocol
For many valve games, additional 'rules' may be fetched into the unstable `raw` field by passing the additional
option: `requestRules: true`. Beware that this may increase query time.

Common Issues
---

### Firewalls block incoming UDP
*(replit / docker / some VPS providers)*

Most game query protocols require a UDP request and response. This means that in some environments, digz may not be able to receive the reponse required due to environmental restrictions.

Some examples include:
* Docker containers
  * You may need to run the container in `--network host` mode so that digz can bind a UDP listen port.
  * Alternatively, you can forward a single UDP port to your container, and force digz to listen on that port using the
  instructions in the section down below.
* replit
  * Most online IDEs run in an isolated container, which will never receive UDP responses from outside networks.
* Various VPS / server providers
  * Even if your server provider doesn't explicitly block incoming UDP packets, some server hosts block other server hosts from connecting to them for DDOS-mitigation and anti-botting purposes.

### digz doesn't work in the browser
digz cannot operate within a browser. This means you cannot package it as part of your webpack / browserify / rollup / parcel package.
Even if you were able to get it packaged into a bundle, unfortunately no browsers support the UDP protocols required to query server status
from most game servers. As an alternative, we'd recommend using digz on your server-side, then expose your own API to your webapp's frontend
displaying the status information. If your application is thin (with no constant server component), you may wish to investigate a server-less lambda provider.

### Specifying a listen UDP port override
In some very rare scenarios, you may need to bind / listen on a fixed local UDP port. The is usually not needed except behind
some extremely strict firewalls, or within a docker container (where you only wish to forward a single UDP port).
To use a fixed listen udp port, construct a new Digz object like this:
```
const digz = new Digz({
  listenUdpPort: 13337
});
digz.query(...)
```

Usage from Command Line
---

Want to integrate server queries from a batch script or other programming language?
You'll still need npm to install digz:
```shell
npm install digz -g
```

After installing digz globally, you can call digz via the command line:
```shell
digz 168.100.162.110:2303 --pretty --requestRules
```

The output of the command will be in JSON format. Additional advanced parameters can be passed in
as well: `--debug`, `--pretty`, `--socketTimeout 5000`, `--requestRules`, etc.
