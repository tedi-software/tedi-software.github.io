---
layout: page
title: Service Properties
parent: Building Integrations
nav_order: 4
---

### Service Property Files
{: .fs-7 }

**`service.properties`** are to use build workflows in TEDI.

TEDI defines a *workflow* as a series of independent *processors* acting in concert to receive and deliver data.

A **processor** is an independent module that represents sending or receiving data via a protocol like https, reading/writing records to a database, or interfacing with a message bus (e.g NATS, Kafka, etc.).

{: .highlight }
> TEDI is innately event-driven. An integration is either driven by a triggering event, like receiving an http request or a timer that fires off at predefined intervals.

To build an integration, you will define a workflow in a file called `service.properties` - which is the entry point for all integrations.

At startup, TEDI will scan all the directories under tedi/services/ looking for `service.properties` files. When it finds one, it will load all the listed services, create a workflow, and begin executing it. This in effect means that in a single TEDI process, you can run a single service (integration), a set of related services, or as many as you like; there's no limit to the number of services you can run. This also means that if you want to prevent an integration from running, you can simply rename the `service.properties` to something like `ignore_service.properties` and TEDI will not load that service effectively ignoring it.



{: .note }
> TEDI is designed to run one or more integrations in parallel.

---

**Service Properties Syntax**
{: .fs-4 }

To create a workflow, create `service.properties` and define the execution order of your processors.

For example:

```sh
0.service = ./cmdin.properties   # this will execute first (this must be a controller type processor)
1.service = ./xslt.properties    # the output from the first processor becomes the input to this processor...and so on
2.service = ./cmdout.properties  # the final state of this processor is what TEDI will use to determine if delivery of the data was successful.
```

For more nested collections, TEDI will augment the syntax and add more integer segments: `{integer}.{integer}.key`

{: .important}
> Every workflow must start with a *controller* processor

---
