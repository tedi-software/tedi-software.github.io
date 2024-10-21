---
layout: page
title: sqlin
parent: Processors
permalink: /processors/sqlin
nav_order: 14
description: "TEDI can easily integrate with your databases - Oracle, MSFT SQL Server, MySQL, PostgreSQL"
---

# sqlin Processor
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
| `batch.grouping.enabled`       | enable batching <br> note: if disabled, each document created will contain up to `batch.max.records` |
| `batch.max.records`            | max number of records per batch |
| `batch.grouping.column.name`   | the grouping colummn |
| `batch.grouping.allow.breaks`  | break the group into another document if the number of records surpasses `batch.max.records` |

---

**Table Columns**

**`sqlin`** has a dependency on specific columns existing in the table for various purposes, e.g. for batching, keeping state, etc.

| **Column Name**                 | **Description**           | **Required**| **Requres Index** |
|:--------------------------------|:--------------------------|:------------|:------------|
|  **tedi_status**                | used to keep state during processing | yes | yes |
|  **tedi_publish_dt**            | TEDI will update this column with the date is successfully processed the record(s). | yes | yes |
|  **tedi_row_id**                | primary key - uniquely identifies each record | yes | yes |
|  **tedi_group_id**              | ties of set of records together for batching | no | yes |

---

**Statements**

**`sqlin`** uses a number of SQL statements when integrating with databases.

| **Statement**                   | **Description**           |
|:--------------------------------|:--------------------------|
|  **pre-read**                   | used to mark (udpate) a set of records for processing |
|  **read**                       | reads the records (select) marked during the pre-read step |
|  **post-read**                  | marks the records success or fail if delivering the records was a success |
|  **abandon check**              | checks for records left in the pre-read state |
|  **delete**                     | used to delete records from one or more tables that were successfully received and no longer needed |

---

**Pre-Read**

| **Settings**                   | **Description**           |
|:-------------------------------|:--------------------------|
| `pre.read.update.timeout`       | sql statement timeout |
| `pre.read.update.sql`           | the sql statement to execute |



```sh
pre.read.update.sql = "UPDATE pub_single_out "                                          \
                      "SET tedi_status = :p1"                                           \
                      ", tedi_publish_dt = TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS')"   \
                      " WHERE tedi_status = 'new'"                                      \
                      " AND rownum < 10"
```

---

**Read**

| **Settings**                   | **Description**           |
|:-------------------------------|:--------------------------|
| `read.timeout`                 | sql statement timeout |
| `read.ignore.nulls`            | skip columns with null values |
| `read.trim.space`              | trim whitespace for values |
| `read.sql`                     | the sql statement to execute |

```sh
read.sql = "SELECT tedi_publish_dt"   \
           ", tedi_row_id"            \
           ", a_decimal"              \
           ", a_string"               \
           ", a_datetime"             \
           " FROM pub_single_out"     \
           " WHERE tedi_status = :p1"
```

---

**Post-Read**

| **Settings**                   | **Description**           |
|:-------------------------------|:--------------------------|
| `post.read.update.success.status`   | value to set `tedi_status` on success |
| `post.read.update.error.status`     | value to set `tedi_status` on failure |
| `post.read.update.batch.size`       | max number of records to update at one time |
| `post.read.update.key.columns`      | the key columns for the table |
| `post.read.update.sql`             | the sql statement to execute |

```sh
post.read.update.sql = "UPDATE pub_single_out "    \
                       " SET tedi_status = :p1"    \
                       " WHERE tedi_status = :p2"
```

---

**Abandon Check**

| **Settings**                   | **Description**           |
|:-------------------------------|:--------------------------|
| `abandon.check.enabled`        | enable or disable the check |
| `abandon.check.timeout`        | sql statement timeout |
| `abandon.check.interval`       | how often to run  |
| `abandon.check.sql`            | the sql statement to execute |

```sh
abandon.check.sql = "UPDATE spub_single_out "             \
                    " SET tedi_status = 'unknown'"     \
                    " WHERE tedi_publish_dt < :p1"       \
                    " AND tedi_status LIKE 'tedi-%'"
```

---

**Delete**

In the event you have multiple tables, and without RI, you can configure multiple delete statements.

| **Settings**                   | **Description**           |
|:-------------------------------|:--------------------------|
| `delete.enabled`               | enable or disable the purging of records completely |
| `delete.interval`              | how often to run  |
| `{integer}.delete.timeout`     | sql statement timeout |
| `{integer}.delete.enabled`     | enable/disable individual statements |
| `{integer}.delete.sql`         | the delete statement to execute |

```sh
0.delete.sql = "DELETE FROM tedi.pub_single_out"     \
               " WHERE tedi_status = 'success'"      \
               " AND tedi_publish_dt < TO_CHAR(SYSDATE-1, 'YYYY-MM-DD HH24:MI:SS')"
```