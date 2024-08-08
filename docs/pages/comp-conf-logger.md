---
layout: page
title: Logger Properties
parent: TEDI Components
nav_order: 8
---

### Logger Properties
{: .fs-7 }

**`logger.properties`** is used to configure logging in TEDI.

---

**Log Settings**
{: .fs-4 }

You can customize the logging with the following settings:

| **Setting**                    | **Description**          |
|:------------------------------|:--------------------------|
| `tlog.log.dir`                | directory to write the log files |
| `tlog.log.base.file.name`     | log filename prefix |
| `tlog.log.base.file.ext`      | log filename extension |
| `tlog.file.log.enabled`       | enable or disable file logging |
| `tlog.stdout.enabled`         | write the log to stdout |
| `tlog.rotate.log`             | enable or disable log rotation |
| `tlog.rotate.max.file.size`   | if log rotation is enabled, indicates the max file size in megabytes |
| `tlog.level`                  | the level at which you want to log (DEBG,INFO,WARN,EROR,FATL) |
| `tlog.pattern`                | you can customize the logging pattern by indicating your own |

{: .note }
> TEDI always opens a new log at startup.
