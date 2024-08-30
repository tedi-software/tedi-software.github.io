---
layout: page
title: Account Properties
parent: TEDI Components
permalink: /components/accounts
nav_order: 3
---

### Account Properties
{: .fs-7 }

The `account.properties` configuration is used to define Users in TEDI and their respective auth schemes (JWT, Basic, etc). 

You must define `roles` and `users`. All integrations will have an administrative API and thru **Users** and **Roles** you will grant explicit access to team members.


**Roles**
{: .fs-4 }

Roles are used to govern which services and APIs a user has access to.

Users must belong to roles that you define. When you create your integrations, those integrations will have their own set of administrative APIs as well as governance around who has access to invoke an API as part of an integration.

A User may belong to more than one Role. To specify multiples roles, use a comma-delimited string.

```sh
0.role.name = admin
1.role.name = qae

```

{: .important-title }
> Roles
>
> Use Roles to apply the principle of least priviledge.
>

---

**Users**
{: .fs-4 }

Users have a few basic properties:
* the user's name
* which roles they belong to 
* when the user expires
* auth scheme: basic, jwt, http-signature, certificate


You must use [crypto-buddy]({{site.baseurl}}/tools/tools_cryptobuddy) to hash and encode secrets and passwords. 

{: .highlight }
> A User can only have one auth mechanic.

**Basic Auth**
{: .fs-4 }

For basic auth, TEDI will never know what the actually password is. TEDI only stores a hash of the password.

You can also store multiple passwords for a User; the purpose being to help password rotation.

To inidicate basic auth as the auth scheme, set `auth.scheme=basic`

```sh
0.user.name = tedi-1
0.user.roles = "admin"
0.user.expires = "2022-01-28"
0.user.auth.scheme = basic
0.0.basic.auth.pass = "$argon2id$v=19$m=64,t=1000,p=4$879sd8f7s9df87987f987f9s8d7f9s8d7f9sd87f9sd87f9s7dfs"
0.0.basic.auth.pass.encoding = hex
0.1.basic.auth.pass = "$argon2id$v=19$m=64,t=1000,p=4$89798f6s8df698s6d8f6s98d6f9s8d69s8df9s86d9f868d6f8sx"
0.1.basic.auth.pass.encoding = hex
```

---

**Http Signatures**
{: .fs-4 }

To use http-signatures, set the `auth.scheme=httpsig`.

TEDI supports symmetric and asymmetric keys.

```sh
1.user.name = tedi-2
1.user.roles = "qae"
1.user.expires = "2022-01-26"
1.user.auth.scheme = httpsig
1.0.httpsig.debug = true
1.0.httpsig.key.name = key-name.key
1.0.httpsig.key.id = keyid
1.0.httpsig.date.validate=true
1.0.httpsig.date.disclose.range=true
1.0.httpsig.date.response.code=412
1.0.httpsig.date.range.duration=10m
```

---

**JWT**
{: .fs-4 }

TEDI supports symmetric and asymmetric keys.

```sh
2.user.name = tedi-3
2.user.roles = "admin"
2.user.expires = "2022-01-26"
2.user.auth.scheme = jws
2.0.jws.debug = true
2.0.jws.algo = RS256
2.0.jws.header.kid = tedi-keyid
2.0.jws.key.name = key.pub
2.0.jws.claim.exp.required = true
2.0.jws.claim.exp.clock.drift=300000
2.0.jws.claim.aud = tedi
2.0.jws.claim.iss = tedi
2.0.jws.claim.sub = tedi
2.0.jws.claim.jti = tedi
2.0.jws.claim.0.name = "xform"
2.0.jws.claim.0.value = "internal"
```

**Certificate**
{: .fs-4 }

```sh
4.user.name = tedi-4
4.user.roles = "admin,qae"
4.user.expires = "2022-01-26"
4.user.auth.scheme = cert
4.0.cert.name = "public-cert-name.pem"
```
