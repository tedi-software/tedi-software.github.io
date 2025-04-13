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

Inspect a TLS or SSL certificate right in your browser. 

---

{: .highlight }
> 🛡️ **Private and secure:** Your certificate never leaves your device.

---

Paste your PEM-encoded certificate below and get a full breakdown.
<textarea id="certInput"
  rows="12"
  placeholder="-----BEGIN CERTIFICATE-----&#10;...&#10;-----END CERTIFICATE-----"
  class="w-100 mb-3"
  style="width:100%; font-family: monospace; border: 1px solid #ccc; padding: 0.75rem; border-radius: 4px;">
</textarea>


[Decode Certificate](#){: .btn .btn-blue .fs-5 .mb-4 .mb-md-0 .mr-2 #decode-btn }

<pre id="certOutput"
  class="bg-grey-lt-100 p-3 rounded border text-sm"
  style="white-space: pre-wrap; overflow-x: auto;">
</pre>

<script src="/assets/js/tls-cert-decoder.js"></script>

---

**To try via OpenSSL commands on your local machine:** 
```sh
# read from a file 
openssl x509 -in your-cert.pem -text -noout

# read from stdin
cat your-cert.pem  | openssl x509  -text -noout
```
