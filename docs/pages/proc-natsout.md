---
layout: page
title: natsout
parent: Processors
permalink: /processors/natsout
nav_order: 10
description: "Integrate TEDI with NATS to serve as an internal broker or enable enterprise mesh messaging, enhancing communication and scalability across your systems"
---

# natsout Processor
{: .fs-7 }

The `natsout` processor is used to publish messages to NATS via Core or JetStream.


---

**Settings**
{: .fs-4 }



| **Setting**                   | **Description**           |
|:------------------------------|:--------------------------|
| `service.type=natsout`        | set the processor type |
| `conn.name`                   | the name of the nats connection to use |
| `create.stream`               | at startup, create (or update) the stream if it doesn't exist |
| `js.prefix`                   | set the js prefix |
| `log.headers`                 | list of headers from a message to log. use `*` to log them all |
| `message.subject.source`      | see below  |
| `message.subject.value`       | used in conjuction with `message.subject.source` |
| `message.header.name`         | set the header name|
| `message.header.value`        | set the header value |
| `message.header.source`       | indicate where the value of the header originates |

---

**Subject and Header Source & Value**
{: .fs-4 }

`source` and `value` are used to tell TEDI how to dynamically set the subject of a message as well as headers.

| **Source**                    | **Description**           |
|:------------------------------|:--------------------------|
| `static`                      | use this to set constants |
| `goodybag`                    | fetch the value out of the integration metadata  |
| `jpath`                       | jpath expression to extract a field from a JSON document  |
| `xpath`                       | xpath expression to extract a field from a XML document  |

---

For example, to set  a static subject:

```sh
message.subject.value   = "tedi2"
message.subject.source  = "static"
```

Or, to set one or more headers:

```sh
0.message.header.name    = "content-type"
0.message.header.value   = "application/xml"
0.message.header.source  = "static"

1.message.header.name    = "content-encoding"
1.message.header.value   = "identity"
1.message.header.source  = "static"

2.message.header.name    = "accept-encoding"
2.message.header.value   = "identity"
2.message.header.source  = "static"

3.message.header.name    = "id"
3.message.header.value   = "//menu/id/text()"
3.message.header.source  = "jpath"
3.message.header.required = true
```
