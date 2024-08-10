---
layout: page
title: NATS KVS Properties
parent: TEDI Components
nav_order: 10
---

### NATS KVS Properties
{: .fs-7 }

**`nats_kvs.properties`** is used to configure global locking used by SFTP-based integrations

---

**Settings**
{: .fs-4 }


| **Setting**                    | **Description**          |
|:------------------------------|:--------------------------|
| `kvs.name`                    | name of the key-value store |
| `kvs.ttl`                     | age of lock |
| `kvs.placement.cluster`       | NATS JetStream placement |
| `kvs.placement.tags`          | NATS JetStream tags |
| `kvs.replicas `               | NATS JetStream replica acount |
| `kvs.storage.type`            | NATS JetStream storage type |
| `kvs.conn.name`               | name of the NATS connection to use |


---

**Configuration**
{: .fs-4 }

To configure the kvs, use the following syntax: `{integer}.{setting}`

```sh
# global lock for SFTP services
0.kvs.name              = global-lock
0.kvs.ttl               = 5m
0.kvs.placement.cluster = local
0.kvs.placement.tags    = ""
0.kvs.replicas          = 3
0.kvs.storage.type      = file
0.kvs.conn.name         = local-USR-0000-1

# sftp inbound - record of last time a purge ran
1.kvs.name              = ftp-purge
1.kvs.ttl               = 365d
1.kvs.placement.cluster = local
1.kvs.placement.tags    = ""
1.kvs.replicas          = 3
1.kvs.storage.type      = file
1.kvs.conn.name         = local-USR-0000-1

# sftp inbound - record of last time the abandon-check ran
2.kvs.name              = ftp-abandon-check
2.kvs.ttl               = 365d
2.kvs.placement.cluster = local
2.kvs.placement.tags    = ""
2.kvs.replicas          = 3
2.kvs.storage.type      = file
2.kvs.conn.name         = local-USR-0000-1
```