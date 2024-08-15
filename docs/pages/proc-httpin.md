---
layout: page
title: httpin
parent: Processors
nav_order: 7
---

### httpin Processor
{: .fs-7 }

**`httpin`** is a controller processor used to receive inbound http requests (inbound relative to TEDI).

This configuration represents a ***single*** HTTP API/interface. You can have more than one HTTP method/verb per URL - TEDI will verify there's no overlap, it just needs to live in its own config.

---

**Settings**
{: .fs-4 }


| **Common Setting**            | **Description**           |
|:------------------------------|:--------------------------|
| `service.type=httpin`         | indicates the type of processor |
| `roles`                       | list of Roles (defined in `accounts.properties`) that have access to this API |
| `admin.api.auth.scheme`       | administrative API auth scheme|
| `http.method`                 | http verb [post,put,get,delete]|
| `http.url.path`               | PATH is given to clients calling your API |
| `http.url.pattern`            | PATTERN is used internally for routing; it must be a regular expression that uniquely identifies one target endpoint. TEDI will detect overlaps and not allow them |
| `http.suppress.status.codes`  | comma-delimited list of non-2xx response codes that will not cause an alert [-1,400,404,408,503,504]  |
| `http.return.response`        | indicates a body is expected to be returned to the caller |
| `http.return.headers`        | list of headers from the response to return to the caller - this is to tie into an httpout response if there was one to main continuity |

--

**Headers**
{: .fs-4 }

You can enforce headers on the inbound http requests. The syntax to set a list of headers is as follows: `{integer}.{setting}`

| **Headers**                   | **Description**           |
|:------------------------------|:--------------------------|
| `http.header.name`            | the name of the http header |
| `http.header.default`         | the default value for the header if the caller does not set it |
| `http.header.required`        | header must be present and have a value (if default not provided) |


For example, to configure three required headers would look like:

```sh
0.http.header.name      = "content-type"
0.http.header.default   = "application/xml"
0.http.header.required  = true

1.http.header.name      = "content-encoding"
1.http.header.default   = "identity"
1.http.header.required  = true

2.http.header.name      = "x-request-id"
2.http.header.default   = ""
2.http.header.required  = true

```

---

**Path Parameters**
{: .fs-4 }

To use and configure path parameters, you can set the name, default value, and whether or not its required.

To indicate a segment in the URL is a path parameter use this syntax: `{name-of-the-path-parameter}`.


| **Headers**                   | **Description**           |
|:------------------------------|:--------------------------|
| `http.path.param.name`        | the name of the path parameter |
| `http.path.param.default`     | the default value if not set by the caller |
| `http.path.param.required`    | whether parameter is required |


For example, if your URL was `/sales/invoice/{id}/{date}`, you could configure like so:

```sh
0.http.path.param.name    = "id"
0.http.path.param.default   = ""
0.http.path.param.required  = true

0.http.path.param.name    = "date"
0.http.path.param.default   = ""
0.http.path.param.required  = true
```

---

**Query Parameters**
{: .fs-4 }

Query parameters can also be configure in a like manner as headers and path parameters.

| **Headers**                   | **Description**           |
|:------------------------------|:--------------------------|
| `http.query.param.name`        | the name of the query parameter |
| `http.query.param.default`     | the default value for the query parameter if not set by the caller |
| `http.query.param.required`    | whether the query parameter is required and must be set by the caller |


For example, if your URL was `/sales/invoice/{id}/{date}?{x}`, you could configure like so:

```sh
0.http.query.param.name      = "x"
0.http.query.param.default   = ""
0.http.query.param.required  = true
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

To set the scheme:

| **Settings**                   | **Description**           |
|:------------------------------|:--------------------------|
| `auth.scheme`                 | sets the authentication scheme to use for http |

