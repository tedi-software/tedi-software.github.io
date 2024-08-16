---
layout: page
title: httpout
parent: Processors
nav_order: 8
---

### httpout Processor
{: .fs-7 }

**`httpout`** is the processor used to make http requests.

---

**Common Settings**
{: .fs-4 }


| **Setting**                   | **Description**           |
|:------------------------------|:--------------------------|
| `http.scheme`                 | set the scheme: http or https |
| `http.hostname`               | destination hostname |
| `http.port`                   | destination port |
| `http.method `                | http verb [get,put,post,delete] |
| `http.url`                    | destination URL |
| `http.suppress.status.codes`  | list of (non-2xx) response codes that will not raise an alert |
| `http.fatal.status.codes`     | list of response codes that are non-retryable |
| `http.connection.timeout`     | max time to wait to establish the connection (10s, 30s, etc) |
| `http.max.connections`        | max allowable open connections to the destination host:port |
| `http.read.timeout`           | max time to wait before timing out the read |
| `http.write.timeout`          | max time to wait for the full request to be written |
| `http.absolute.timeout`       | absolute max time to wait for the entire request / response to complete |
| `http.tls.version`            | tls version to use |
| `http.tls.cipher.suites`      | tls cipher suites - leave empty to use golang defaults |
| `http.tls.curve.preferences`  | tls curve preferences - leave empty to use golang defaults |
| `http.tls.insecureskipverify` | skip destination certificate verification |
| `http.return.response`        | return the response to the caller (or simply ignore it) |
| `http.return.headers`         | list of headers from the response to return to the caller |


--

**Headers**
{: .fs-4 }

You can set the headers on the request in multiple ways. The syntax to set a list of headers is as follows: `{integer}.{setting}`

| **Headers**                   | **Description**           |
|:------------------------------|:--------------------------|
| `http.header.name`            | the name of the http header |
| `http.header.value`           | the default value for the header if the caller does not set it |
| `http.header.source`          | where to source the header value (see below)| 
| `http.header.required`        | ensures the value is set otherwise tosses an exception; default=false |
| `http.header.canonicalize`    | canonicalize header names, e.g. content-type -> Content-Type; default=false |


For example, to configure three headers, two with static values and one dynamic, would look like:

```sh
0.http.header.name      = "content-type"
0.http.header.source    = "static"
0.http.header.value     = "application/xml"

1.http.header.name      = "content-encoding"
1.http.header.source    = "static"
1.http.header.value     = "identity"

2.http.header.name      = "x-request-id"
2.http.header.source    = "goodybag"
2.http.header.required  = true
```

---

**Name Source Value**
{: .fs-4 }

`name` `source` `values` is used to tell TEDI how to dynamically set headers, path parameters, and query parameters.

| **Source**                    | **Description**           |
|:------------------------------|:--------------------------|
| `static`                      | use this to set constants |
| `goodybag`                    | fetch the value out of the integration metadata  |
| `jpath`                       | jpath expression to extract a field from a JSON document  |
| `xpath`                       | xpath expression to extract a field from a XML document  |

---

**Path Parameters**
{: .fs-4 }

To use and configure path parameters, you can set the name, source, and value.

To indicate a segment in the URL is a path parameter use this syntax: `/seg1/seg2/{name-of-the-path-parameter}`.


| **Setting**                   | **Description**           |
|:------------------------------|:--------------------------|
| `http.path.param.name`        | the name of the path parameter - this must match and {segment name} in the URL |
| `http.path.param.value`       | the static value or expresssion |
| `http.path.param.source`      | where to source the value from |


For example, if your URL was `/sales/invoice/{id}/{date}`, you could configure like so:

```sh
0.http.path.param.name      = "id"
0.http.path.param.source    = "goodybag"
0.http.path.param.required  = true

1.http.path.param.name      = "date"
1.http.path.param.source    = "jpath"
1.http.path.param.value     = "$..invoice[0].date"
1.http.path.param.required  = true
```

---

**Query Parameters**
{: .fs-4 }

Query parameters can also be configure in a like manner as headers and path parameters.

| **Setting**                   | **Description**           |
|:------------------------------|:--------------------------|
| `http.query.param.name`       | the name of the query parameter |
| `http.query.param.value`      | the static value or expresssion |
| `http.query.param.source`     | where to source the value from |


For example, if your URL was `/sales/invoice/{id}/{date}?{x}`, you could configure like so:

```sh
0.http.query.param.name      = "x"
0.http.query.param.value     = "new"
0.http.query.param.source    = "static"
```

---

**Authentication**
{: .fs-4 }

TEDI supports the following auth schemes for http:
* **none**
* **basic auth**
* **certificate**
* **jws (jwt)**
* **http signature**

