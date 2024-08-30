---
layout: page
title: Purging Properties
parent: TEDI Components
permalink: /components/purge
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
| `purger.schedule`             | how often to scan for content to purge. The age of the content is dictated by the individual processors. |
| `purger.debug`                | enable verbose logging |