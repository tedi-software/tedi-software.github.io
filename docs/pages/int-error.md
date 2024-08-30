---
layout: page
title: Error Properties
parent: Building Integrations
permalink: /integrations/errors
nav_order: 7
---

### Error Property Files
{: .fs-7 }

**`inc_error.properties`** is an idiom you can adopt to configure all of the common **error** settings across your workflows instead of configuring on a per processor basis - which you can do if you choose.

---

**Settings**
{: .fs-4 }


| **Setting**                   | **Description**          |
|:------------------------------|:--------------------------|
| `error.limits.max`            | number of errors allowed per interval before the service disables itself |
| `error.limits.interval`       | length of time interval (15m, 1h, etc). |

---

TEDI has a simplistic approach to error handling and retries; conceptually it works this way:

* try something
* on failure, pause before retrying
* if retries are exhausted, bail

```
while tries < max-tries {
    result = execute(...)

    if result != success
        random pause [0,n)

    if tries > max-tries
        bail "all attempts failed"
}
```
