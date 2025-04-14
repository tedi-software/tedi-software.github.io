---
layout: page
title: Decode X.509 Certificates
parent: How-To Guides
permalink: /how-to/tls-cert-decoder
description: Use this tool to decode PEM-encoded X.509 certificates.
nav_order: 9
---

# Decode X.509 Certificates
{: .fs-7 }

Decode and inspect a TLS or SSL certificate right in your browser. 

---

{: .highlight }
> **Private and secure:** Your certificate never leaves your device.

---

 **All X.509 certs will:**
* Start with -----BEGIN CERTIFICATE-----
* Contain valid base64
* Decode to a valid ASN.1 sequence
* End with -----END CERTIFICATE-----

---

**Paste** your **PEM-encoded** certificate below and get a full breakdown.

<textarea id="certInput"
  rows="12"
  class="w-100 mb-3"
  placeholder="-----BEGIN CERTIFICATE-----&#10;MIIBlzCCATGgAwIBAgI...&#10;-----END CERTIFICATE-----"
  style="width:100%; font-family: monospace; color: #789; border: 1px solid #ccc; padding: 0.75rem; border-radius: 4px;">
</textarea>

[Decode Certificate](#){: .btn .btn-blue .fs-5 .mb-4 .mb-md-0 .mr-2 #decode-btn }



<pre class="p-3 rounded border text-sm" style="font-family: monospace; color: #789; background-color: #e9ecef; border-color: #ccc; white-space: pre-wrap; overflow-x: auto;">
  <code id="certOutput" ></code>
</pre>

<script src="/assets/js/tls-cert-common.js"></script>
<script src="/assets/js/tls-cert-decoder.js"></script>

---

**To try via OpenSSL commands on your local machine:** 
```sh
# read from a file 
openssl x509 -in your-cert.pem -text -noout

# read from stdin
cat your-cert.pem  | openssl x509  -text -noout
```
