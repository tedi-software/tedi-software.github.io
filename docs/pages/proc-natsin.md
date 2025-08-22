---
layout: page
title: natsin
parent: Processors
permalink: /processors/natsin
description: "Seamlessly integrate TEDI with NATS for high-performance eventing and messaging. Subscribe to either NATS Core and JetStream for scalable real-time processing"
---

# natsin Processor
{: .fs-7 }

The `natsin` processor is used to subscribe to messages from NATS.

There are two types of `natsin` processors:

* `natsin_pull` - used for JetStream to *pull* messages from a Stream via a Consumer.
* `natsin_push` - used for both Core and Jetstream to have messages *pushed*.

---

**natsin_pull Settings**
{: .fs-4 }


| **Setting**                   | **Description**           |
|:------------------------------|:--------------------------|
| `service.type=natsin_pull`    | set the processor type |
| `schedule`                    | how often to check for new messages |
| `conn.name`                   | the name of the nats connection to use |
| `create.stream`               | at startup, create (or update) the stream if it doesn't exist |
| `create.consumer`             | at startup, create (or update) the consumer if it doesn't exist |
| `js.prefix`                   | set the js prefix |
| `log.headers`                 | list of headers from a message to log. use `*` to log them all |
| `message.filter`              | boolean statement to filter messages based on header values - see below for example |


---

**Example message.filter**

```sh
message.filter = "content-source = 'sales'"     \
                 " AND content-type = 'order'"  \
                 " AND Field01 = 'invoice'"     \
                 " AND Field02 != 'NA'"         \
                 " AND Field03 != 'N'"          \
                 " AND Field04 in ('x', 'y', 'z')"
```

---

**natsin_push Settings**
{: .fs-4 }

`natsin_push` can be used for JetStream as well as Core for request/reply messaging.

| **Setting**                   | **Description**           |
|:------------------------------|:--------------------------|
| `service.type=natsin_push`    | set the processor type |
| `schedule`                    | how often to check for new messages |
| `conn.name`                   | the name of the nats connection to use |
| `create.stream`               | at startup, create (or update) the stream if it doesn't exist |
| `create.consumer`             | at startup, create (or update) the consumer if it doesn't exist |
| `js.prefix`                   | set the js prefix |
| `log.headers`                 | list of headers from a message to log. use `*` to log them all |
| `message.filter`              | boolean statement to filter messages based on header values - see below for example |

---


**Create Streams and Consumers at Dynamically Runtime**

You can have TEDI automatically create the Streams and Consumers for you.

| **Stream Setting**            | **Description**           |
|:------------------------------|:--------------------------|
| `js.stream.name`                 | the name of the stream |
| `js.stream.description`          | short description |
| `js.stream.subjects`             | filter subjects |
| `js.stream.retention`            | retention policy |
| `js.stream.max_consumers`        | limit consumers |
| `js.stream.max_msgs`             | limit messages |
| `js.stream.max_bytes`            | limit Stream size|
| `js.stream.discard_policy`       | set the discard policy |
| `js.stream.max_age`              | age of the messages |
| `js.stream.max_msgs_per_subject` | limit messages by subject |
| `js.stream.max_msg_size`         | limit message size |
| `js.stream.storage`              | storage type |
| `js.stream.num_replicas`         | replica count |
| `js.stream.no_ack`               | do not require a message acknowledgements |
| `js.stream.duplicate_window`     | dupe checking |
| `js.stream.placement.cluster`    | cluster name to place stream |
| `js.stream.placement.tags`       | set cluster placement tags|

---

| **Consumer Setting**            | **Description**           |
|:------------------------------|:--------------------------|
| `js.consumer.stream_name`           | name of the Stream|
| `js.consumer.durable_name`          | name of the Consumer |
| `js.consumer.description`           | short description |
| `js.consumer.deliver_policy`        | set the deliver policy |
| `js.consumer.opt_start_seq`         | set the starting sequence number |
| `js.consumer.opt_start_time_layout` | start-time date format |
| `js.consumer.opt_start_time_value`  | start date/time |
| `js.consumer.ack_policy`            | set the ack policy |
| `js.consumer.ack_wait`              | max time to wait for acks |
| `js.consumer.max_deliver`           | max deliver attempts |
| `js.consumer.replay_policy`         | set the replay policy |
| `js.consumer.filter_subject`        | set the filter subjects |
| `js.consumer.sample_freq`           | telemetry sampling frequency|
| `js.consumer.max_waiting`           | defines the max inflight pull requests |
| `js.consumer.max_ack_pending`       | max outstanding acks |
| `js.consumer.headers_only`          | will instruct the consumer to only deliver headers and no payloads |
| `js.consumer.max_batch`             | sets the max messages per fetch |
| `js.consumer.max_expires`           | sets the maximum pull consumer request expiration that a Fetch() can request (using the Fetch's timeout value) |
| `js.consumer.max_bytes`             | sets the maximum pull consumer request bytes that a Fetch() can receive |