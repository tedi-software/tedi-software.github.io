---
layout: page
title: Inspect Private Keys
parent: How-To Guides
permalink: /how-to/private-key-inspector
description: Parse RSA private keys and extract public keys in PEM, DER, or Base64 formats — all client-side.
nav_order: 14
parent: How-To Guides
---

# Private Key Inspector
{: .fs-7 }

Inspect and extract information from RSA private keys in your browser. You can also extract and convert the associated public key.

---

{: .highlight }
> **Private and secure:** Your keys never leave your device !

---

* Accepts RSA keys in PEM / DER (Base64 or Hex)
* Inspects key length and exponent
* Extracts public key in:
   *  PEM
   *  DER (Base64)
   *  DER (Hex)
* Converts between:
  *  PKCS#1 (RSA PRIVATE KEY)
  *  PKCS#8 (PRIVATE KEY)


---

**Paste** your private key below.
{: .fs-4 }

<textarea id="keyInput"
  rows="12"
  class="w-100 mb-3"
  placeholder="-----BEGIN PRIVATE KEY-----&#10;..."
  style="width:100%; font-family: monospace; color: #789; border: 1px solid #ccc; padding: 0.75rem; border-radius: 4px;">
</textarea>

---

<div class="mb-2">
  <strong>Public Key Output Format:</strong>
  <label><input type="radio" name="keyOutputFormat" value="pem" checked> PEM (default)</label>
  <label class="ml-3"><input type="radio" name="keyOutputFormat" value="base64"> DER (Base64)</label>
  <label class="ml-3"><input type="radio" name="keyOutputFormat" value="hex"> DER (Hex)</label>
</div>

[Inspect Key](#){: .btn .btn-blue .mr-2 #inspect-key }
[Extract Public Key](#){: .btn .btn-green .mr-2 #extract-pubkey }
[Reset](#){: .btn .btn-outline #reset-btn }

---

<pre class="p-3 rounded border text-sm" style="background-color: #e9ecef; border-color: #ccc; white-space: pre-wrap; overflow-x: auto;">
  <code id="keyOutput" class="language-json"></code>
</pre>

--- 

<script src="/assets/js/tls-cert-common.js"></script>
<script src="/assets/js/private-key-inspector.js"></script>
