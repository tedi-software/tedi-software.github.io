---
layout: page
title: Configuring TEDI
parent: TEDI Components
nav_order: 2
---

### Configuring TEDI
{: .fs-7 }

The `conf` directory is where TEDI stores its configuration files for various features and functions.

```sh
tedi/conf
├── account.properties
├── alert.properties
├── certmanager.properties
├── http.properties
├── keymanager.properties
├── logger.properties
├── nats.properties
├── nats_connections.properties
├── nats_kvs.properties
├── purging.properties
├── server.properties
└── sql.datasources.properties
```


### **Config Files**
{: .fs-5 }

| **Config**                        | **Description**               |
|:------------------------------|:--------------------------|
| `account.properties`          | used to define Users in TEDI and their respective auth schemes (JWT, Basic, etc). <br>For example, a User is requird in order to invoke HTTP  APIs.    |
| `alert.properties`            | used to configure the various alert mechanics in TEDI.|
| `certmanager.properties`      | used to configure certificates (x509) for identity and trust (ca-trustbundles). |
| `http.properties`             | defines the tls protocol and ciphers to use for inbound http requests and logging (access logs).  |
| `keymanager.properties`       | used to set the keys TEDI will use for various encryption/decryption operations. |
| `logger.properties`           | used to configure log settings for TEDI.  |
| `nats.properties`             | parent file for all NATS settings.  |
| `nats_connections.properties` | defines the connection settings for NATS. |
| `nats_kvs.properties`         | defines the nats key-store value settings used with NATS.  |
| `purging.properties`          | configures how often content is purged.  |
| `server.properties`           | configures various TEDI settings.  |
| `sql.datasources.properties`  | defines the database connection strings TEDI uses.  |