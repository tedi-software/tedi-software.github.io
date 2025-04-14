---
layout: page
title: Convert Certificate Formats
parent: How-To Guides
permalink: /how-to/tls-cert-converter
description: Convert X.509 certificates between PEM, DER, and Base64 formats directly in your browser. No server required.
nav_order: 10
---

# Certificate Format Converter
{: .fs-7 }

Convert X.509 certificates between formats like PEM, DER (binary), and Base64 — securely and locally in your browser.

---

{: .highlight }
> **Private and secure:** Your certificate never leaves your device.

---

## Paste Certificate
{: .fs-7 }

<div class="mb-2">
  <strong>Input Format:</strong>
  <label><input type="radio" name="certFormat" value="pem" checked> PEM (default)</label>
  <label class="ml-3"><input type="radio" name="certFormat" value="der"> DER (Base64)</label>
  <label class="ml-3"><input type="radio" name="certFormat" value="hex"> DER (Hex)</label>
</div>

<textarea id="certInput"
  rows="12"
  class="w-100 mb-3"
  placeholder="-----BEGIN CERTIFICATE-----&#10;MIIB...&#10;-----END CERTIFICATE-----"
  style="width:100%; font-family: monospace; color: #789; background-color: #fff; border: 1px solid #ccc; padding: 0.75rem; border-radius: 4px;">
</textarea>

[PEM](#){: .btn .btn-purple .mr-2 #convert-pem }
[DER](#){: .btn .btn-blue .mr-2 #convert-der }
[Base64](#){: .btn .btn-green .mr-2 #convert-base64 }
[Reset](#){: .btn .btn-outline #reset-btn }


---

<pre class="p-3 rounded border text-sm" style="background-color: #e9ecef; border-color: #ccc; white-space: pre-wrap; overflow-x: auto;">
  <code id="certOutput" class="language-none"></code>
</pre>

<script src="/assets/js/tls-cert-common.js"></script>
<script src="/assets/js/tls-cert-converter.js"></script>
