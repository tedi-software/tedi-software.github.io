---
layout: page
title: Purging Properties
parent: TEDI Components
nav_order: 11
---

### Purging Properties
{: .fs-7 }

**`purging.properties`** is used to configure how frequently local content is purged from TEDI.

---

**Log Settings**
{: .fs-4 }


| **Setting**                    | **Description**          |
|:------------------------------|:--------------------------|
| `purger.schedule`             | how often to scan and purge content. The age of the content is one in the same with frequency. If you run every 10-minutes, TEDI will purge content older than 10-minutes. If you run hourly, TEDI purges content older than an hour and so on and so forth. |
| `purger.debug`                | enable verbose logging |