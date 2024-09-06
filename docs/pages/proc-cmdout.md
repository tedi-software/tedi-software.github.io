---
layout: page
title: cmdout
parent: Processors
permalink: /processors/cmdout
nav_order: 6
---

# cmdout Processor
{: .fs-7 }


**`cmdout`** is the processor you can use to run an external command or program. This processor will take the output of the external call and use it as the input to the next processor in your workflow. The input can be read thru stdin or a via a file.


{: .important}
> **Adding Your Own Custom Logic**
>
> `cmdout` is one of two ways to provide your own custom code in an integration. The other is `cmdin`.

---

**Settings**
{: .fs-4 }


| **Setting**                   | **Description**           |
|:------------------------------|:--------------------------|
| `bin`                         | /the/full/path/to/the/program/to/call/program-to-invoke |
| `args`                        | arguments to pass to the external call (comma delimited, no spaces)|
| `timeout`                     | how long to wait for the external call to complete (e.g. 2m)|

---

{: .warning }
> On a timeout, the processor will run SIG KILL on the external command - this is to ensure the processor does not hang indefinately. Be sure to account for this if there's state being managed by the external program.