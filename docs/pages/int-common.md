---
layout: page
title: Common Properties
parent: Building Integrations
nav_order: 6
---

### Common Property Files
{: .fs-7 }

**`inc_common.properties`** is an idiom you can adopt to configure all of the common settings across your workflows instead of configuring on a per processor basis - which you can do if you choose.

---

**Common Settings**
{: .fs-4 }


| **Setting**                    | **Description**          |
|:------------------------------|:--------------------------|
| `service.name`                | the name of your integration - this will appear in logs when your integration runs, e.g. "starting `service.name`", "finished processing `service.name`". |
| `data.charset`                | the character set to use for data in your integration - defaults to `utf-8`. |
| `data.source`                 | the origin of the data for your integration - could be a business process or something related to a business process, etc. |
| `data.type`                   | this is the functional type of data in the integration: invoice, sales data, inventory, etc. |
| `debug.mode`                  | set the debug mode - see **Debug Modes** below. |
| `environment`                 | TEDI is environment agnostic, but if you send your logs from all of your environments to the same log-aggregator, you can use `environment` to differentiate the logs entries. |
| `storage.type`                | file or memory. see **Storage Types** below. |
| `storage.retention`           | if using `storage.type=file`, `storage.retention` controls how long to persist the data on disk prior to purging. |

---

**Debug Modes**
{: .fs-4 }

Debug modes are used to mainly aid troubleshooting.

| **Setting**                    | **Description**          |
|:------------------------------|:--------------------------|
| `discard`                     | the integration will run, but silently discards the received content. Use this settings when you want to effectively disable the integration. |
| `verbose`                     | increase logging output. |
| `logAndDiscard`               | like `discard`, but will log the content first and then discard it. |
| `logAndContinue`              | like `logAndDiscard` except the integration will continue to excute. |

---

**Storage Types**
{: .fs-4 }

The storage type controls where TEDI writes content: in memory or to disk.

| **Setting**                    | **Description**          |
|:------------------------------|:--------------------------|
| `memory`                      | TEDI will not persist any content to disk. All data in transit will be completely persisted to memory - nothing will be written to disk. |
| `file`                        | Will persist the content to disk. Use `file` when you're dealing with big files or when you regularly need to view the content for production support, etc. that moved thru TEDI. |