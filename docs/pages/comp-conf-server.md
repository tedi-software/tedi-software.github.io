---
layout: page
title: Server Properties
parent: TEDI Components
permalink: /components/server
nav_order: 12
---

### Server Properties
{: .fs-7 }

**`server.properties`** is used to configure a few basic global features in TEDI.

---

**Settings**
{: .fs-4 }


| **Setting**                    | **Description**          |
|:------------------------------|:--------------------------|
| `server.shutdown.wait.time`   | on shutdown, the duration to wait before services begin canceling themselves. This is to ensure the server stops within a reasonable amount of time while trying to allow anything in flight to finish. |
| `server.show.banner`          | show TEDI banner in the logs at startup |
| `known.hosts.file`            | stores the public keys of all of the servers that you connect to over ssh (SFTP). This settings expects the path to the actual file, e.g. /path/to/known_hosts |

