---
layout: page
title: Sign and Verify Tester
parent: How-To Guides
permalink: /how-to/signing
description: Digitally sign and verify messages using RSA, Ed25519, ECDSA, or HMAC symmetric cryptography.
nav_order: 10
---

# Signing and Verifying
{: .fs-7 }

This page allows you to digitally **sign** messages and **verify** signatures using both **asymmetric** (RSA, Ed25519, ECDSA) and **symmetric** (HMAC) cryptographic algorithms.

- **Asymmetric signing** uses public/private keypairs
- **Symmetric signing (HMAC)** uses a shared secret
- Supports **RSA-PSS**, **Ed25519**, **ECDSA (P-256, P-384)**, and **HMAC (SHA-256, SHA-512)**

Features:

- Select signing algorithm
- Input private/public keys (asymmetric) or secret (symmetric)
- Sign and verify messages easily
- All signatures are shown in **Base64** format

---

{: .highlight }
> **Private and Secure:** Fully client-side — your keys and messages never leave your browser!

---

{: .note }
> **Need a Keypair?**  
> You can generate RSA, Ed25519, or ECDSA keypairs on our [Keypair Generation page](/how-to/keypair-generator)


---

<!-- Flex container for Input and Options -->
<div style="display: flex; flex-wrap: wrap; gap: 0; border: 1px solid #ccc; border-radius: 5px; overflow: hidden; min-height: 600px;">

  <!-- Input/Output Column -->
  <div style="flex: 1; min-width: 300px; border-right: 1px solid #ccc; display: flex; flex-direction: column;">
    <div style="background: #f7f7f7; padding: 0.75rem; text-align: center; font-weight: bold; border-bottom: 1px solid #ccc;">
      Input / Output
    </div>
    <div style="padding: 1rem; flex: 1; display: flex; flex-direction: column;">

      <label class="mb-1 font-weight-bold"><b>Message</b></label>
      <textarea id="signMessageInput" class="w-100 mb-2" style="width: 100%; height: 200px; font-family: monospace; color: #789;" placeholder="Enter message to sign or verify..."></textarea>

      <label class="mb-1 font-weight-bold"><b>Signature (Base64)</b></label>
      <textarea id="signatureOutput" class="w-100 mt-2" readonly style="width: 100%; height: 150px; font-family: monospace; color: #789;" placeholder="Generated signature will appear here..."></textarea>

    </div>
  </div>

  <!-- Keys and Options Column -->
  <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column;">
    <div style="background: #f7f7f7; padding: 0.75rem; text-align: center; font-weight: bold; border-bottom: 1px solid #ccc;">
      Keys and Options
    </div>
    <div style="padding: 1rem; flex: 1; display: flex; flex-direction: column;">

      <div class="mt-2">
        <label class="mb-1 font-weight-bold"><b>Operation:</b></label><br>
        <input type="radio" id="signOp" name="signVerifyMode" value="sign" checked class="ml-2" />
        <label for="signOp">Sign</label><br>
        <input type="radio" id="verifyOp" name="signVerifyMode" value="verify" class="ml-2" />
        <label for="verifyOp">Verify</label>
      </div>

      <div class="mt-3">
        <label class="mb-1 font-weight-bold"><b>Algorithm:</b></label>
        <select id="signAlgorithmSelect" class="w-100 mb-2">
          <option value="RSA-PSS">RSA-PSS</option>
          <option value="Ed25519">Ed25519</option>
          <option value="ECDSA">ECDSA</option>
          <option value="HMAC-SHA256">HMAC-SHA256</option>
          <option value="HMAC-SHA512">HMAC-SHA512</option>
        </select>
      </div>

      <div id="asymmetricKeyFields">
        <label class="mb-1 font-weight-bold"><b>Public Key (PEM)</b></label>
        <textarea id="publicKeyInput" class="w-100 mb-2" style="width: 100%; min-height: 150px; font-family: monospace; color: #789;" placeholder="Enter public key here..."></textarea>

        <label class="mb-1 font-weight-bold"><b>Private Key (PEM)</b></label>
        <textarea id="privateKeyInput" class="w-100 mb-2" style="width: 100%; min-height: 150px; font-family: monospace; color: #789;" placeholder="Enter private key here..."></textarea>
      </div>

      <div id="symmetricKeyField" style="display: none;">
        <label class="mb-1 font-weight-bold"><b>Secret Key</b></label>
        <input type="text" id="hmacSecretInput" class="w-100 mb-2" style="font-family: monospace; color: #789;" placeholder="Enter shared secret...">
      </div>

    </div>
  </div>

</div>

<!-- Action Button Full Width -->
<div style="margin-top: 1rem; text-align: center;">
  <button id="signVerifyActionBtn" class="btn btn-blue">Run Sign/Verify</button>
</div>

<!-- Status Message -->
<p id="signStatusMessage" style="margin-top: 1rem; text-align: center; color: gray;"></p>


---

## **Supported Signing Algorithms**
{: .fs-5 }

| Algorithm | Type | Use Case | Notes |
|:----------|:-----|:---------|:------|
| **RSA-PSS** | Asymmetric | Digital signatures, document signing | Modern secure RSA-based signing (uses randomized padding) |
| **Ed25519** | Asymmetric | High-speed signatures, modern apps | Very fast, very secure; great for APIs, tokens, blockchain |
| **ECDSA** | Asymmetric | Mobile, IoT, web tokens | Efficient curve-based signatures; P-256 and P-384 supported |
| **HMAC-SHA256** | Symmetric | API request signing, token auth | Shared secret signing; simple, fast, widely used |
| **HMAC-SHA512** | Symmetric | Long-term key signing, stronger API auth | Same as HMAC-SHA256 but stronger output (512 bits) |

---

**Notes:**
- **Asymmetric signing** uses a private key for signing and a public key for verification.
- **Symmetric signing (HMAC)** uses a single shared secret for both signing and verifying.
- **RSA-PSS** and **Ed25519** are highly recommended for modern cryptographic signatures.
- **HMAC** is extremely common for internal systems, webhooks, and API authentication.

---


---

<script src="https://cdn.jsdelivr.net/npm/jsrsasign@10.8.6"></script>
<script src="/assets/js/sign-verify.js" type="module"></script>
