---
layout: page
title: HTTP Signature Debugger
parent: How-To Guides
permalink: /how-to/http-signature-debugger
description: Inspect, verify, and create HTTP Signatures securely right in your browser for secure API requests using HMAC or RSA.
nav_order: 13
---

# HTTP Signature Debugger & Verifier
{: .fs-7 }

Use this tool to decode or generate [HTTP Signatures](https://datatracker.ietf.org/doc/html/draft-cavage-http-signatures-12) for secure API requests.

Paste your HTTP Signature below to decode and verify it.  

Or, create a new one by editing the fields and providing a secret.

---

{: .highlight }
> **Private and Secure:** Fully client-side — nothing leaves your browser !

---

**note**
{: .fs-4 }

With HTTP Signature Authentication, the sender chooses which headers to sign, e.g:
```sh
headers="(request-target) date digest"
```

Those header values from the HTTP request become the signing string:
```sh
(request-target): get /api/data
date: Tue, 12 Mar 2024 18:30:00 GMT
digest: sha-256=47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=
```

The receiver must extract the same headers from the HTTP Request and rebuild the string-to-sign in order to verify the signature.

Since this page doesn't accept HTTP requests, the values must be manually input.

This tool assumes you always want to set the digest header.

---

{: .highlight }
> **Try it Out!**

**Example Inputs**
```text
method          : POST
path            : /tedi/sqlintest/admin/reload
date            : Sun, 20 Apr 2025 03:02:55 GMT
digest          : sha-256=I3Xi+Yq9OwkHopQFCtdg8bjiBtJr7W2GVEsXJgaL/Wk=
headers-to-sign : (request-target) date digest
key-id          : tedi-20201211
hmac-secret     : supersecret123
body            : {"message" : "Hello HTTP Signature!"}
Authorization   : Signature keyId="tedi-20201211",algorithm="hmac-sha256",headers="(request-target) date digest",signature="9MPjOlvtnTi0l5OB3aoHUjHO1z7AdfhVak5HtTXWffY="

```
---

<table class="w-100">
<tbody>

<!-- CREATE SIGNATURE -->
<tr>
    <td colspan="2">
        <h4><b>Create Signature</b></h4>
    </td>
</tr>
<tr>
    <td colspan="1">
        <div style="display: flex; flex-direction: column;">
            <label class="mb-1 font-weight-bold"><b>HTTP Method</b></label>
            <select id="httpMethod" class="w-100 mb-2">
                <option value="get" selected>GET</option>
                <option value="post">POST</option>
                <option value="put">PUT</option>
                <option value="delete">DELETE</option>
                <option value="patch">PATCH</option>
                <option value="head">HEAD</option>
            </select>
            <label class="mb-1 font-weight-bold"><b>HTTP Path</b></label>
            <input id="httpUrl" class="w-100 mb-2" style="font-family: monospace; color: #789" />
            <label class="mb-1 font-weight-bold" ><b>Date (optional)</b></label>
            <div class="d-flex gap-2 mb-2">
                <input id="httpDate" type="text" class="form-control" style="font-family: monospace; color: #789"  placeholder="e.g. Sun, 05 Jan 2014 21:31:40 GMT" />
                <button id="autoDateBtn" class="btn btn-sm btn-outline">Now()</button>
            </div>
            <label class="mb-1 font-weight-bold"><b>Digest Header (optional)</b></label>
            <div class="d-flex gap-2 mb-2">
                <input id="httpDigest" type="text"  style="font-family: monospace; color: #789"  class="form-control" />
                <button id="computeDigestBtn" class="btn btn-sm btn-outline">Compute</button>
            </div>
            <label class="mb-1 font-weight-bold"><b>HTTP host (optional)</b></label>
            <input id="httpHost" class="w-100 mb-2" style="font-family: monospace; color: #789" placeholder="target-hostname.com"/>
            <div id="customHeaderInputs" class="mb-3">
            </div>
            <button id="addHeaderBtn" class="btn btn-outline btn-sm mb-3">+ Add Header</button>
            <label class="mb-1 font-weight-bold"><b>Body (optional)</b></label>
            <textarea id="httpBody" class="w-100 mb-2" style="min-height: 100px; font-family: monospace; color: #789;"></textarea>
            <label><input type="checkbox" id="digestAppendNewline" checked/> Append newline before hashing body</label>
        </div>
`  </td>
   <td colspan="1">
    <div style="display: flex; flex-direction: column;">
        <label class="mb-1 font-weight-bold"><b>Headers to Sign</b></label>
        <input id="httpSigHeaders" type="text" class="w-100 mb-2" placeholder="(request-target) host date digest x-api-key"/>
        <label class="mb-1 font-weight-bold"><b>Key ID</b></label>
        <input id="httpSigKeyId" type="text" class="w-100 mb-2" style="font-family: monospace; color: #789"/>
        <label class="mb-1 font-weight-bold"><b>Algorithm</b></label>
        <select id="Algorithm" class="w-100 mb-2">
            <option value="hmac-sha256" selected>hmac-sha256</option>
            <option value="rsa-sha256">rsa-sha256</option>
        </select>
        <label class="mb-1 font-weight-bold"><b>Secret (for HMAC)</b></label>
        <input id="httpSigSecret" type="text" class="w-100 mb-2" style="font-family: monospace; color: #789" />
        <label class="mb-1 font-weight-bold"><b>Private Key (for RSA)</b></label>
        <textarea id="httpSigPrivateKey" class="w-100 mb-2" style="min-height: 100px; font-family: monospace; color: #789;" placeholder="-----BEGIN PRIVATE KEY-----"></textarea>
        <label class="mb-1 font-weight-bold"><b>Public Key (for verification)</b></label>
        <textarea id="httpSigPublicKey" class="w-100 mb-2" style="min-height: 100px; font-family: monospace; color: #789;" placeholder="-----BEGIN PUBLIC KEY-----"></textarea>
    </div>
   </td>
</tr>
<!-- SIGNATURE PREVIEW OUTPUT -->
<tr>
    <td colspan="2">
    <div style="display: flex; flex-direction: column;">
        <label class="mb-1 font-weight-bold"><b>Generated Signature (Authorization Header)</b></label>
        <textarea id="httpSigOutput" class="w-100 mb-2" style="min-height: 100px; font-family: monospace; color: #789;"></textarea>
        <label class="mb-1 font-weight-bold">Signing String</label>
        <pre id="httpSigPreview" class="p-2 bg-light border rounded text-sm" style="white-space: pre-wrap;"></pre>
    </div>
    </td>
</tr>
<!-- VERIFY SIGNATURE -->
<tr>
    <td colspan="2">
        <div style="display: flex; flex-direction: column;">
            <h4 class="mt-4">Verify Signature</h4>
            <label class="mb-1 font-weight-bold">Paste Authorization Header</label>
            <textarea id="httpSigInput" class="w-100 mb-2" style="width: 100%; min-height: 100px; font-family: monospace; color: #789;" placeholder='Paste your signature and it will be verified against the above inputs'></textarea>
        </div>
    </td>
</tr>
<tr>
    <td colspan="2">
        <div class="mt-2">
            <button id="encode-http-sig" class="btn btn-green mr-2">Create</button>
            <button id="decode-http-sig" class="btn btn-blue mr-2">Decode</button>
            <button id="verify-http-sig" class="btn btn-purple mr-2">Verify</button>
        </div>
    </td>
</tr>
<tr>
    <td colspan="2">
    <div id="httpSigStatus" class="font-weight-bold mt-3 text-sm"></div>
    </td>
</tr>
  </tbody>
</table>


<script src="https://cdn.jsdelivr.net/npm/jsrsasign@10.8.6"></script>
<script type="module" src="/assets/js/http-signature-debugger.js" ></script>
