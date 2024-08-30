---
layout: page
title: Alert Properties
parent: Building Integrations
permalink: /integrations/alert
nav_order: 5
---

### Alert Property Files
{: .fs-7 }

**`inc_alert.properties`** is an idiom you can adopt to configure all of the **alert** settings across your workflows instead of configuring on a per processor basis - which you can do if you choose.

**Settings**
{: .fs-4 }

You can configure your service to alert when an internal errors occur.

| **Setting**                    | **Description**          |
|:------------------------------|:--------------------------|
| `alert.limits.max`            | number of error notifications allowed per interval |
| `alert.limits.interval`       | length of time internval (10m, 1h, etc) |


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