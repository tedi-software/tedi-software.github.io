---
layout: page
title: Service Properties
parent: Building Integrations
permalink: /integrations/services
nav_order: 4
---

# Service Property Files
{: .fs-7 }

**`service.properties`** are to use build workflows in TEDI.

TEDI defines a ***workflow*** as a series of independent ***processors*** acting in concert to receive and deliver data.

A **processor** is an independent module that implements how data is either received or delivered via a protocol like https, reading/writing records to a database, or interfacing with a message bus (e.g NATS, Kafka, etc.).

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

{: .important}
> Every workflow must start with a *controller* processor

---

**Controller Processors**
{: .fs-4 }

A *controller* processor is one that is either timer-based or raised by an external event like receiving an HTTP request.

The ***controller* processor** is specialized processor that manages the overall state of the workflow. 

{: .note}
> You can chain together multiple processors to form a complex workflow, but not all processors can act independently.


Here's a list of processors that TEDI currently supports.

**Processor Types**

* `in` = input
* `out` = output


| **Processor**       | **Controller**  | **Trigger**    | **Description**            |
|:--------------------|:----------------|:--------------|:-----------------------------------
| `cmdin`             | yes             | timer         |`cmdin` "command input" allows you to execute code outside of TEDI and use the output of the external function to be the input to the workflow. |
| `cmdout`            | no              | n/a           | `cmdout` "command output" allows you to have your own custom deliver-side logic. The result of the external call indicates success or failure. |
| `httpin`            | yes             | http request  | `httpin` "http input" is used to receive inbound http requests (inbound relative to TEDI). |
| `httpout`           | no              | n/a           | `httpout` "http output" is used to make http requests (outbound from TEDI). |
| `libxslt`           | no              | n/a           | `libxslt` is used to perform xslt transformations via *libxslt* library. |
| `natsin_pull`       | yes             | timer         | `natsin_pull` "nats input PULL" is used to fetch messages from NATS JetStream in a pull-based manner. |
| `natsin_push`       | yes             | request       | `natsin_push` "nats input PUSH" is used to for NATS Core request/reply messaging.  |
| `natsout`           | no              | n/a           | `natsout` "nats output" is used to publish messages to NATS (Core or JetStream). |
| `pgp`               | no              | n/a           | `pgp` is a processor wrapped around the "pgp" software used to encrypt or decrypt data. |
| `sftpin`            | yes             | timer         | `sftpin` "sftp input" is used to receive files via the sftp protocol. |
| `sftpout`           | no              | n/a           | `sftpout` "sftp output" is to deliver files via the sftp protocol. |
| `sqlin`             | yes             | timer           | `sqlin` "sql input" is used to receive (read) records from a database. |
| `sqlout`            | no              | n/a           | `sqlout` "sql output" is used to deliver (write) records to a database.  |
| `xsltproc`          | no              | n/a           | `xsltproc` is used to perform xslt transformations via the *xsltproc* application. |



{: .highlight}
> A **processor** falls into three basic categories: 
> 
> 1. **Receive:** the first processor in your workflow; acts as a controller; provides the input
> 2. **Intermediate:** intermediate processor that performs some function on the content, e.g. pgp, xslt, etc.
> 3. **Deliver:** the last processor in your workflow; performs final delivery of content

---

**Common Configuration Idioms**

One of the patterns you should readily adopt to keep your configs nice and tidy is to re-use common configurations across your processors.

* inc_alert.properties - common alert settings
* inc_common.properties - basic interface attributes
* inc_error.properties - how to handle errors 

You can define the `inc_` "include" files once and then pull them in your processor properties via the `.include` syntax.