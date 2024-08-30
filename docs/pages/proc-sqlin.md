---
layout: page
title: sqlin
parent: Processors
permalink: /processors/sqlin
nav_order: 14
---

### sqlin Processor
{: .fs-7 }

**`sqlin`** is a controller processor used to read records from a database.


---

**Common Settings**
{: .fs-4 }


| **Setting**                   | **Description**           | **Data Type** | **Default**    |
|:------------------------------|:--------------------------|:--------------|:---------------|
| `service.type=sqlin`          | indicates the type of processor | string | n/a |
| `schedule`                    | how often to check for new records | string | n/a |
| `datasource.name`             | name of the database connection to use | string | n/a |
| `max.docs.per.deliver`        | max docs to deliver in parallel | string | n/a |
| `doc.format`                  | xml or json | string | n/a |

---

**Batching Records**
{: .fs-4 }

In most cases, you will want to group your records into discrete batches.


| **Settings**                   | **Description**           |
|:-------------------------------|:--------------------------|
| `batch.max.records`            | the target ftp server's hostname |
| `batch.grouping.enabled`       | the target ftp server's port number |
| `batch.grouping.column.name`   | the target ftp server's port number |
| `batch.grouping.allow.breaks`  | the target ftp server's port number |

---

