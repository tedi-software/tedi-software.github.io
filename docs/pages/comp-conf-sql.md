---
layout: page
title: SQL Datasource Properties
parent: TEDI Components
permalink: /components/datasources
nav_order: 13
---

### SQL DataSource Properties
{: .fs-7 }

**`sql.datasources.properties`** is used to configure database connection strings and other properties (RDBMS / SQL) 

TEDI supports the following databases:
* MSFT SQL Server
* Oracle
* MySQL
* PostgreSQL

As longs as a database library supports `database/sql`, TEDI can be easily modified to use it.

---

**Settings**
{: .fs-4 }


| **Setting**                    | **Description**          |
|:------------------------------|:--------------------------|
| `datasource.name`             | for SQL-based integrations, this is the name you will configure the service with so it knows which database connection to use.  |
| `datasource.driver.id`        | version of the underlying library to use |

---

To configure the datasources, use the following syntax: `{integer}.{setting}`.

```sh
0.datasource.name                              = "mysql-dev"
0.datasource.debug                             = true
0.datasource.driver.id                         = "mysql.4.1+"
0.datasource.username                          = your-db-username
0.datasource.auth                              = basic
0.datasource.basic.auth.username               = your-db-username
0.datasource.basic.auth.password               = your-crypto-buddy-encrypted-password
0.datasource.basic.auth.system.key.alias       = your-system-key-alias
0.datasource.connection.url                    = "tcp(127.0.0.1:3306)/tedi"
0.datasource.autoCommit                        = false
0.datasource.readOnly                          = false
0.datasource.properties                        = ""
0.datasource.connection.dial.timeout           = 30s
0.datasource.connection.read.timeout           = 30s
0.datasource.connection.write.timeout          = 30s
0.datasource.connection.ping.timeout           = 5s
0.datasource.connection.max.idle.time          = 5m
0.datasource.connection.max.lifetime           = 5m
0.datasource.connection.max.idle.connections   = 10
0.datasource.connection.max.open.connections   = 0
0.datasource.connection.tls.enabled            = true
0.datasource.connection.tls.version            = tls1.2
0.datasource.connection.tls.cipher.suites      =
0.datasource.connection.tls.curve.preferences  =
0.datasource.connection.tls.insecureskipverify = false
...
```