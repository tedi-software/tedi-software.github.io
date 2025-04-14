---
layout: page
title: JWT Debugger
parent: How-To Guides
permalink: /how-to/jwt-debugger
description: Inspect, verify, and create JSON Web Tokens securely in your browser — no server required.
nav_order: 12
---

# JWT Debugger & Verifier
{: .fs-7 }

Paste your JWT below to decode and verify it.  

Or, create a new one by editing the header and payload and providing a secret.

---

{: .highlight }
> **Private and Secure:** Fully client-side — nothing leaves your browser !


---

<table class="w-100">
  <thead>
    <tr>
      <th style="width: 50%;"> Encoded JWT</th>
      <th style="width: 50%;"> Decoded (Editable)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td style="vertical-align: top;">
    <textarea id="jwtInput"
        style="width: 100%; height: 100%; min-height: 460px; font-family: monospace; color: #789"
        class="mb-2"
        placeholder="Paste or generate JWT..."></textarea>
    </td>
    <td style="vertical-align: top; height: 100%;">
    <div style="display: flex; flex-direction: column; height: 100%;">
        <label class="mb-1 font-weight-bold">Header</label>
        <textarea id="jwtHeaderInput"
        class="w-100 mb-2"
        style="flex: 1; min-height: 200px; resize: vertical; font-family: monospace; color: #789;"
        placeholder='{"alg":"HS256","typ":"JWT"}'></textarea>

        <label class="mb-1 font-weight-bold">Payload</label>
        <textarea id="jwtPayloadInput"
            class="w-100 mb-2"
            style="flex: 1; min-height: 200px; resize: vertical; font-family: monospace; color: #789;"
            placeholder='{"sub":"1234567890","name":"John Doe"}'>
        </textarea>

        <label class="mb-1 font-weight-bold">Secret (for HS256)</label>
        <input id="jwtSecretInput"
        type="text"
        class="w-100 mb-2"
        style="font-family: monospace; color: #789" placeholder="your-secret-key" />

        <label class="mb-1 font-weight-bold">Secret Encoding</label>
        <select id="secretEncoding" class="mb-2">
            <option value="utf8">UTF-8</option>
            <option value="b64">Base64</option>
            <option value="hex">Hex</option>
        </select>
    </div>
    </td>
    </tr>
    <tr>
        <td colspan="2">
            <div class="mt-2">
            <button id="decode-jwt" class="btn btn-blue mr-2">Decode</button>
            <button id="verify-jwt" class="btn btn-yellow mr-2">Verify Signature</button>
            <button id="encode-jwt" class="btn btn-green mr-2">Encode JWT</button>
            </div>
        </td>
    </tr>
        <tr>
        <td colspan="2">
            <div id="jwtVerifyStatus" class="font-weight-bold mt-3 text-sm"></div>
        </td>
    </tr>
  </tbody>
</table>

<script src="https://cdn.jsdelivr.net/npm/jsrsasign@10.8.6"></script>
<script src="/assets/js/jwt-debugger.js"></script>
