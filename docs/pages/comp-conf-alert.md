---
layout: page
title: Alert Properties
parent: TEDI Components
permalink: /components/alerts
nav_order: 4
---

# Alert Properties
{: .fs-7 }

The `alert.properties` is used to configure the alerting mechanics for TEDI when errors arise.

---

**Email Settings**
{: .fs-4 }

TEDI needs to know your smtp settings in order to send emails.

```sh
email.enabled = [true|false]
email.smtp.host = hostname
email.smtp.port = port-number
email.tls.enabled = [true|false]
```

{: .note }
> TEDI does not impose username / password for smtp connections.

---

**Server Alert**
{: .fs-4 }

You can configure TEDI to alert when internal errors occur.

For example, to configure an email alert:

```sh
alert.handler.email.enabled   = [true|false]
alert.handler.email.from      = your-exchange-user@your-domain.com
alert.handler.email.to        = ops@your-domain.com, ops-escalations@your-domain.com
alert.handler.email.cc        = 
alert.handler.email.bcc       = 
alert.handler.email.subject   = "TEDI internal server failure"
alert.handler.email.body      = "An error has occurred in TEDI.                          \n" \
                                "                                                        \n" \
                                "  operational support contacts: tier1@your-domain.com   \n" \
                                "  additional support contacts: dl-ops@your-domain.com   \n" \
                                "\n\n\n"
```
