---
layout: page
title: sqlout
parent: Processors
permalink: /processors/sqlout
nav_order: 15
---

# sqlout Processor
{: .fs-7 }

**`sqlout`** is a processor used to write records to a database.


---

**Common Settings**
{: .fs-4 }


| **Setting**                   | **Description**           | **Data Type** | **Default**    |
|:------------------------------|:--------------------------|:--------------|:---------------|
| `service.type=sqlout`          | indicates the type of processor | string | n/a |
| `schedule`                    | how often to check for new records | string | n/a |
| `datasource.name`             | name of the database connection to use | string | n/a |
| `max.docs.per.deliver`        | max docs to deliver in parallel | string | n/a |
| `doc.format`                  | xml or json | string | n/a |
