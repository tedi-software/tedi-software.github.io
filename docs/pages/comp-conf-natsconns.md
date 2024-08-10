---
layout: page
title: NATS Connection Properties
parent: TEDI Components
nav_order: 9
---

### NATS Connection Properties
{: .fs-7 }

**`nats_connections.properties`** is used to configure one or more NATS connections for TEDI to use.

---

**Settings**
{: .fs-4 }


| **Setting**                    | **Description**          |
|:------------------------------|:--------------------------|
| `conn.name`                       | referring name of the connection to be used to configure which connection to use in your integration |
| `conn.server.urls`                | comma delimited list of host:port combos |
| `conn.server.randomize`           | randomize the host:port combos on connect |
| `conn.verbose`                    | enable or disable file logging |
| `conn.dial.timeout`               | max time to wait to connect |
| `conn.flush.timeout`              | max time to wait to flush message buffers |
| `conn.jetstream.enabled`          | enable or disable use of JetStream |
| `conn.jetstream.prefixes`         | array of  JetStream contexts to create for the given connection |
| `conn.inbox.prefix`               | inbox prefix override |
| `conn.max.reconnects`             | max times to auto reattempt a broken connection |
| `conn.reconnect.wait`             | time to wait between reconnect attempts |
| `conn.ping.interval`              | how frequently the client pings the server when the connection is idle |
| `conn.max.pings.outstanding`      | controls how many unanswered pings are acceptable before marking the connection unhealthy |
| `conn.publish.timeout`            | max time to wait for a publish to complete|
| `conn.drain.timeout `             | max time to wait for drain to complete |
| `conn.no.echo`                    | unused |
| `conn.tls.enabled`                | enable or disables TLS |
| `conn.tls.version`                | the minimum tls protocol for connections|
| `conn.tls.cipher.suites`          | list of preferred cipher suites; leave empty to use Golang defaults |
| `conn.tls.curve.preferences`      | tls curve preferences;  leave empty to use Golang defaults |
| `conn.tls.insecure.skip.verify`   | skip x509 hostname verification during tls-negotiations (do not enable in production environments)|
| `conn.auth.jwt.user.encoded.nkey` | encrypted and encoded user nkey credential |
| `conn.auth.jwt.system.key.alias`  | system key used to encrypt nkey |
| `conn.auth.jwt.user.jwt.file`     | user credential jwt (name of the file that includes the jwt)|

**Configuration**
{: .fs-4 }

To configure the connections, use the following syntax: `{integer}.{setting}`

```sh
0.conn.name                        = conn-1
0.conn.server.urls                 = "localhost:4222,localhost:4223,localhost:4224"
...
...

1.conn.name                        = conn-2
1.conn.server.urls                 = "localhost:4225,localhost:4226,localhost:4227"
...
```