# digz library

DayZ server query library, with DZSA Tools fallback request. It is built on top of [node-gamedig](https://github.com/gamedig/node-gamedig/), but focus on providing a simpler DayZ server output.

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
  port: '2303'
}).then((response) => {
  console.log('Server data:', response)
}).catch((error) => {
  console.log('Server is offline')
})
```

Query parameters
---

| Parameter | Type | Default |   |
|:---|:---|:---|:---|
| **host** | string | - | Required. Hostname or IP of the server. |
| **port** | number | - | Required. Connection port or query port for the server. Make sure it's the query port and not the game port. |
| **pretty** | boolean | false | Hostname or IP of the server. |
| **maxAttempts** | number | 1 | Number of attempts to query server in case of failure. |
| **socketTimeout** | number | 2000 | Milliseconds to wait for a single packet. Beware that increasing this will cause many queries to take longer even if the server is online. |
| **attemptTimeout** | number | 10000 | Milliseconds allowed for an entire query attempt. This timeout is not commonly hit, as the socketTimeout typically fires first. |
| **givenPortOnly** | boolean | false | Only attempt to query server on given port. |
| **debug** | boolean | false | Enables massive amounts of debug logging to stdout. |
| **pingOnly** | boolean | false | Only gets ping in the response. |


Response
---

The returned state object will contain the following keys:

| Key | Type |  |
|:---|:---|:---|
| **name** | string | Server name. |
| **map** | string | Map name. |
| **connect** | string | IP:PORT to connect. |
| **ping** | number | Round trip time to the server in milliseconds. |
| **password** | boolean | If password is required. |
| **numplayers** | number | Number of players connected. |
| **maxplayers** | number | Maximum number of connected players. |
| **queue** | number | Number of players in queue. |
| **official** | boolean | If server is official or not. |
| **version** | string | Game version the server is running. |
| **firstPerson** | boolean | If server is first person only. |
| **dlcEnabled** | boolean | If server needs Livonia DLC. |
| **dayAcceleration** | number | In-game day time acceleration. |
| **nightAcceleration** | number | In-game night time acceleration. |
| **time** | string | Current server day time. |
| **mods** | array | Title and Steam Workshop ID. |

Usage from Command Line
---

Install digz globally if you need to integrate server queries from a batch script or other programming language:
```shell
npm install digz -g
```
```shell
digz 168.100.162.110:2303 --pretty
```

The output of the command will be in JSON format. Additional optional parameters can be passed in as well. Ex: `--pretty`, `--socketTimeout 5000`, etc.

node-gamedig
---

This library is built on top of [node-gamedig](https://github.com/gamedig/node-gamedig/), a more broad game server library. This wouldn't be possible if it wasn't for all their hard work. I decided to put this togeter, because DayZ has it's own misteries and needs a little more love to have fallback options and a simpler query response.

License
---
Released under the [MIT license](LICENSE).