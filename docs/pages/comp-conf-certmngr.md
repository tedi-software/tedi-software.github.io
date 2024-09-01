---
layout: page
title: CertManager Properties
parent: TEDI Components
permalink: /components/certmngr
nav_order: 5
---

# CertManager Properties
{: .fs-7 }

**`certmanager.properties`** is used to configure certificates (x509 keypairs), ca-trustbundles, and various TLS settings for secure connections in TEDI.

---

**TLS Settings**
{: .fs-4 }

TEDI will default to reasonable settings for your TLS connections, but you can customize the protocol, cipher suites, and other settings for your connections directly:


| **Setting**                    | **Description**          |
|:------------------------------|:--------------------------|
| `tls`                         | enables or disables TLS |
| `tls.min.version`             | the minimum tls protocol TEDI will used/accept for connections. |
| `tls.cipher.suites`           | list of preferred cipher suites; leave empty to use Golang defaults |
| `tls.curve.preferences`       | tls curve preferences;  leave empty to use Golang defaults |
| `tls.verify`                  | controls whether a client verifies the server's certificate chain and host name (mtls) |
| `debug`                       | enables verbose logging to TLS connections |
| `tls.ocsp`                    | placeholder for cert revocation checking |


---

{: .important }
> Certificates MUST be PEM encoded.

---

**Trust Bundles**
{: .fs-4 }

To configure certificates that TEDI should trust, i.e. ca-trustbundles, you can configure a list of certificates for TEDI to read.

Certificates are loaded from `tedi/keys/`. 

---

**Root Certs / Trust Anchors**
{: .fs-4 }

You can configure individual root certificates or each entry can be a file with multiple root CAs. 

note: the value corresponds to a file on a disk.

```sh
0.root.ca=root-cert-0.pem
1.root.ca=root-cert-1.pem
2.root.ca=root-cert-2.pem
```

{: .note }
> if you do not set any root certificates, the systems roots will be used.

---

**Intermediate Certs**
{: .fs-4 }

You can also configure individual intermediates certificates.

```sh
0.intermediate.cert="..."
...
9.intermediate.cert="..."

```

---

**Cert Auth (mTLS)**
{: .fs-4 }

list of certificates TEDI explicity trusts - corresponds to `cert.pinning` and for cert-based authentication (mTLS).


```sh
0.trust.cert=cert-0.pem
1.trust.cert=cert-1.pem
```

---

**Certificate Pinning**
{: .fs-4 }

If desired, you can pin to certificates. TEDI pins to the public-key of the target certificate.

```sh
cert.pinning = [true|false]
```

{: .highlight }
> Cert pinning is a global setting. Once enabled, you must explicity trust every certificate.

---

**Certs for Certificate Authentication**
{: .fs-4 }

Configure one or more key pairs for client cert auth.

```sh
0.cert.name=cert-1.pem
0.cert.key.name=cert-1.key
0.cert.key.passphrase="$aes-256-cbc$hex$abasldkfsldfkjsldfi23423523i52h2i3h52i3"
0.cert.key.system.key.alias=tedi-mp-1
```

{: .important }
> The private keys for certificates must be encrypted. Use crypto-buddy to encrypt and encode.

