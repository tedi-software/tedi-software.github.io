---
layout: page
title: HTTP Properties
parent: TEDI Components
permalink: /components/http
nav_order: 6
---

# HTTP Properties
{: .fs-7 }

**`http.properties`** is used to configure the HTTP listener for TEDI.

---

**Basic Settings**
{: .fs-4 }

| **Setting**                    | **Description**          |
|:------------------------------|:--------------------------|
| `host`                         | http server hostname |
| `port`                         | the port to listen on |
| `client.auth`                  | unused |
| `compression`                  | enable compression |
| `shutdown.max.wait.ms`         | at shutdown, max wait time in milliseconds for all in-flight requests to finish before the listener is closed |
| `debug`                        | enables verbose http logging |

---

**TLS Settings**
{: .fs-4 }

TEDI will default to reasonable settings for your inboud TLS connections, but you can customize the protocol, cipher suites, and other settings for your connections directly:


| **Setting**                    | **Description**          |
|:------------------------------|:--------------------------|
| `tls`                         | enables or disables TLS |
| `tls.min.version`             | the minimum tls protocol TEDI will used/accept for connections. |
| `tls.cipher.suites`           | list of preferred cipher suites; leave empty to use Golang defaults |
| `tls.curve.preferences`       | tls curve preferences;  leave empty to use Golang defaults |
| `debug`                       | enables verbose logging to TLS connections |
| `tls.ocsp`                    | placeholder for cert revocation checking |
| `tls.cert`                    | x.509 certificate to present to clients |
| `tls.key`                     | key backing x.509 certificate |
| `tls.ca`                      | unused |
| `mtls.enabled`                | require mTLS for inbound http connections |

---

**Log Settings**
{: .fs-4 }

The HTTP server has its own set of logs. You can customize the logging with the following settings:

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