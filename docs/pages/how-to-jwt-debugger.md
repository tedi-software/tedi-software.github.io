---
layout: page
title: JWT Debugger
parent: How-To Guides
permalink: /how-to/jwt-debugger
description: Inspect, verify, and create JSON Web Tokens securely using all the following algorithms RSA, RSAPSS, HMAC, EC. Multi-algo, security-grade JWT debugger.
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

## **Token & Key Format Summary**
{: .fs-5 }

| **Format** | **Name**              | **Purpose**                                         | **Used For**                                   | **Format Type**              | **Popularity**  |
|:-----------|:----------------------|:----------------------------------------------------|:-----------------------------------------------|:-----------------------------|:----------------|
| `JWT`      | JSON Web Token        | Signed (and optionally encrypted) claims            | ID tokens, access tokens, stateless sessions   | Compact, signed data format  | very high     |
| `JWE`      | JSON Web Encryption   | Encrypted JWT (confidential claims)                 | Privacy-sensitive data, secure token transport | Encrypted token format       | niche         |
| `JWKS`     | JSON Web Key Set      | Public key distribution format                      | RS256/PS256 token verification                 | JSON container for keys      | medium        |


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
                    placeholder="Paste or generate JWT...">
                </textarea>
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
                </div>
            </td>
        </tr>
        <tr>
            <td style="vertical-align: top; height: 100%;">
                <div style="display: flex; flex-direction: column; height: 100%;">
                    <label class="mb-1 font-weight-bold">Algorithm</label>
                    <select id="jwtAlgorithm" class="w-100 mb-2">
                        <option value="HS256" selected>HS256 [HMAC+SHA-256]</option>
                        <option value="HS384">HS384 [HMAC+SHA-384]</option>
                        <option value="HS512">HS512 [HMAC+SHA-512]</option>
                        <option value="RS256">RS256 [RSA+SHA-256]</option>
                        <option value="RS384">RS384 [RSA+SHA-384]</option>
                        <option value="RS512">RS512 [RSA+SHA-512]</option>
                        <option value="ES256">ES256 [ECDSA+SHA-256)</option>
                        <option value="ES384">ES384 [ECDSA+SHA-384]</option>
                        <option value="ES512">ES512 [ECDSA+SHA-512]</option>
                        <option value="PS256">PS256 [RSAPSS+SHA-256]</option>
                        <option value="PS384">PS384 [RSAPSS+SHA-384]</option>
                        <option value="PS512">PS512 [RSAPSS+SHA-512]</option>
                    </select>
                </div>
            </td>
            <td style="vertical-align: bottom; height: 100%;">
                <div style="display: flex; flex-direction: column; height: 100%;">
                    <label class="mb-1 font-weight-bold">Secret (for HS)</label>
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
            <td style="vertical-align: bottom; height: 100%;">
                <div style="display: flex; flex-direction: column; height: 100%;">
                    <label class="mb-1 font-weight-bold">Public Key (RS|ES|PS)</label>
                    <textarea id="jwtPublicKeyInput"
                        class="w-100 mb-2"
                        style="flex: 1; min-height: 200px; resize: vertical; font-family: monospace; color: #789;"
                        placeholder='{"alg":"HS256","typ":"JWT"}'>
                    </textarea>
                </div>
            </td>
            <td style="vertical-align: bottom; height: 100%;">
                <div style="display: flex; flex-direction: column; height: 100%;">
                    <label class="mb-1 font-weight-bold">Private Key (RS|ES|PS)</label>
                    <textarea id="jwtPrivateKeyInput"
                        class="w-100 mb-2"
                        style="flex: 1; min-height: 200px; resize: vertical; font-family: monospace; color: #789;"
                        placeholder='{"sub":"1234567890","name":"John Doe"}'>
                    </textarea>
                </div>
            </td>
            
        </tr>
        <tr>
            <td><label class="mb-1 font-weight-bold">* Public and Private keys must be in PEM format.</label></td>
        </tr>
    <tr>
        <td colspan="2">
            <div class="mt-2">
            <button id="decode-jwt" class="btn btn-blue mr-2">Decode</button>
            <button id="verify-jwt" class="btn btn-purple mr-2">Verify</button>
            <button id="encode-jwt" class="btn btn-green mr-2">Encode</button>
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
