---
layout: page
title: xslt
parent: Processors
permalink: /processors/xslt
nav_order: 16
description: "With TEDI software you can use xslt in your integrations to perform data transformations"
---

# xslt Processor
{: .fs-7 }


There are two types of xslt processors you can use to perform xslt transformations.

* `libxslt`
* `xsltproc`

---

**`libxslt`** performs an xslt transformation via the c library *libxslt*.

**libxslt Settings**
{: .fs-4 }


| **Setting**                   | **Description**           |
|:------------------------------|:--------------------------|
| `service.type=libxslt`        | set the processor to use libxslt |
| `stylesheet`                  | the xslt stylesheet to perform the xml transformation |
| `timeout`                     | max time allowed to perform the transform |

---

**`xsltproc`** performs an xslt transformation via the *xsltproc* program.

**xsltproc Settings**
{: .fs-4 }


| **Setting**                   | **Description**           |
|:------------------------------|:--------------------------|
| `service.type=xsltproc`       | set the processor to use xsltproc |
| `stylesheet`                  | the xslt stylesheet to perform the xml transformation |
| `timeout`                     | max time allowed to perform the transform |
| `bin`                         | full path to the xsltproc program |
| `options`                     | xsltproc options|
| `file.args`                   | xsltproc file arguments |
