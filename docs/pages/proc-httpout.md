---
layout: page
title: httpout
parent: Processors
permalink: /processors/httpout
description: "Create integrations in TEDI to send outgoing HTTP requests, seamlessly connecting with external systems and facilitating efficient data exchange with vendors"
---

# httpout Processor
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


---

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

| **Auth**                      | **Description**           |
|:------------------------------|:--------------------------|
| `http.client.auth = basic`    | basic auth |
| `http.client.auth = cert`     | certificate auth |
| `http.client.auth = jws`      | json web signature (jwt) auth |
| `http.client.auth = httpsig`  | http signature auth |
| `http.client.auth = bearer`   | bearer token |

---

**Basic Auth**

| **Setting**                    | **Description**           |
|:-------------------------------|:--------------------------|
| `http.client.auth = basic`     | use basic authorization |
| `basic.auth.username`          | username |
| `basic.auth.password`          | encrypted password |
| `basic.auth.system.key.alias`  | system key used to encrypt and encode the password |


---

**HTTP Signature**

| **Setting**                    | **Description**           |
|:-------------------------------|:--------------------------|
| `http.client.auth = httpsig`   | use http signature authorization |
| `httpsig.debug`                | enables verbose logging |
| `httpsig.key.name`             | physical key name |
| `httpsig.key.id `              | maps to the keyId in the signature |
| `httpsig.digest.algo`          | one-way hash algo to use, e.g. sha-256 |
| `httpsig.signing.algo`         | hash algo to use for signing, e.g. hmac-sha256 |
| `httpsig.headers`              | headers use to create the signature,  e.g. (request-target),Date,Digest. <br>note - anything beyond "(request-target),date, digest" must come from an actual header set in the request |


---

**Json Web Signature (JWT)**

TEDI supports JWT authentication in the form of JWS. You can use symmetric or asymmetric keys.

| **Setting**                    | **Description**           |
|:-------------------------------|:--------------------------|
| `http.client.auth = jws`       | use jws signature authorization |
| **RSA Settings**                                                              |
| `jws.algo`                     | RS256\| RS384\| RS512\| PS256\| PS384\| PS512\| HS256\| HS384\| HS512 |
| `jws.private.key.name`         | the file name of the private key (pem encoded) |
| `jws.public.key.name`          | the file name of the x509 certificate (pem encoded) |
| `jws.header.kid`               | the key id |
| **HMAC Settings**                                                              |
| `jws.algo`                     | HS256 |
| `jws.key.name`                 | the file name of the key |
| `jws.header.kid`               | the key id |
| **Claims**                                                                     |
| `jws.claim.{integer}.name`     | name of the static claim - you can have any number you like |
| `jws.claim.{integer}.value`    | value of the static claim |
| `jws.claim.iss`                | jwt issuer |
| `jws.claim.aud`                | jwt audience |
| `jws.claim.sub`                | jwt subject/user |
| `jws.claim.exp`                | jwt expiration - duration jwt is valid for (now + exp) |
| `jws.claim.jti`                | jwt unique identifier - default: RequestId |


---

**Certificate**

| **Setting**                    | **Description**           |
|:-------------------------------|:--------------------------|
| `http.client.auth = cert`      | use x509 cert authorization |
| `cert.name`                    | file name of the cert (cert must be pem encoded) |