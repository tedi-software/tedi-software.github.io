---
layout: page
title: Encrypt and Decrypt Tester
parent: How-To Guides
permalink: /how-to/encryption
description: Encrypt and decrypt text using symmetric (AES) or asymmetric (RSA) cryptography.
nav_order: 11
---

# Encryption and Decryption
{: .fs-7 }

This page provides a developer-friendly playground for encrypting and decrypting data using both symmetric (AES) and asymmetric (RSA) cryptographic algorithms. 

- **Symmetric encryption** (AES) allows encrypting data with a shared secret password, offering fast and secure encryption for general purposes.
- **Asymmetric encryption** (RSA-OAEP) enables secure data exchange using a public/private keypair, ideal for scenarios where secret sharing is not practical.

Features:

- Choose between **Encrypt** and **Decrypt** operations
- Select **Symmetric (AES)** or **Asymmetric (RSA-OAEP)** modes
- Support for multiple **AES algorithms and key sizes**
- Auto-generate secure random **Initialization Vectors (IVs)** for AES
- Auto-generate secure **RSA keypairs** for RSA usage
- Output encoding in **Hex** or **Base64**
- All operations are **fully client-side** — nothing leaves your browser

---


{: .highlight }
> **Private and Secure:** Fully client-side — nothing leaves your browser!

---

<!-- Flex container for Input and Options -->
<div style="display: flex; flex-wrap: wrap; gap: 0; border: 1px solid #ccc; border-radius: 5px; overflow: hidden; min-height: 600px;">

  <!-- Input/Output Column -->
  <div style="flex: 1; min-width: 300px; border-right: 1px solid #ccc; display: flex; flex-direction: column;">
    <div style="background: #f7f7f7; padding: 0.75rem; text-align: center; font-weight: bold; border-bottom: 1px solid #ccc;">
      Input / Output
    </div>
    <div style="padding: 1rem; flex: 1; display: flex; flex-direction: column;">
      <label class="mb-1 font-weight-bold"><b>Input</b></label>
      <textarea id="cryptoInput" class="w-100 mb-2" style="width: 100%; height: 300px; font-family: monospace; color: #789;" placeholder="Enter plaintext or ciphertext..."></textarea>
      <label class="mb-1 font-weight-bold"><b>Output (read-only)</b></label>
      <textarea id="cryptoOutput" class="w-100 mt-2" readonly style="width: 100%; height: 300px; font-family: monospace; color: #789;"></textarea>
    </div>
  </div>

  <!-- Options Column -->
  <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column;">
    <div style="background: #f7f7f7; padding: 0.75rem; text-align: center; font-weight: bold; border-bottom: 1px solid #ccc;">
      Options
    </div>
    <div style="padding: 1rem; flex: 1; display: flex; flex-direction: column;">
      <div class="mt-2">
        <label class="mb-1 font-weight-bold"><b>Operation:</b></label><br>
        <input type="radio" id="encrypt" name="operation" value="encrypt" checked class="ml-2" />
        <label for="encrypt">Encrypt</label><br>
        <input type="radio" id="decrypt" name="operation" value="decrypt" class="ml-2" />
        <label for="decrypt">Decrypt</label>
      </div>
      <div class="mt-2">
        <label class="mb-1 font-weight-bold"><b>Mode:</b></label><br>
        <input type="radio" id="symmetric" name="mode" value="symmetric" checked class="ml-2" />
        <label for="symmetric">Symmetric (AES)</label><br>
        <input type="radio" id="asymmetric" name="mode" value="asymmetric" class="ml-2" />
        <label for="asymmetric">Asymmetric (RSA)</label>
      </div>
      <div class="mt-2">
        <label class="mb-1 font-weight-bold"><b>Output Encoding:</b></label><br>
        <input type="radio" id="outputHex" name="outputEncoding" value="hex" checked class="ml-2" />
        <label for="outputHex">Hex</label><br>
        <input type="radio" id="outputBase64" name="outputEncoding" value="base64" class="ml-2" />
        <label for="outputBase64">Base64</label>
      </div>
      <div class="mt-2">
        <label class="mb-1 font-weight-bold"><b>Algorithm:</b></label>
        <select id="cryptoAlgorithm" class="w-100 mb-2">
            <option value="AES-128-CBC">AES-128-CBC</option>
            <option value="AES-192-CBC">AES-192-CBC</option>
            <option value="AES-256-CBC">AES-256-CBC</option>
            <option value="AES-256-GCM">AES-256-GCM (WebCrypto)</option>
          <option value="AES-256-GCM">AES-256-GCM (WebCrypto)</option>
          <option value="RSA-OAEP">RSA-OAEP</option>
        </select>
      </div>
      <!-- AES Fields -->
      <div id="aesKeyFields" style="display: flex; flex-direction: column;">
        <label class="mb-1 font-weight-bold"><b>Key (Password)</b></label>
        <input type="text" id="aesSecret" class="w-100 mb-2" placeholder="Enter AES password..." style="font-family: monospace; color: #789;" />
        <br>
        <label class="mb-1 font-weight-bold"><b>IV (Initialization Vector) (required for AES)</b></label>
        <textarea id="cryptoIV" class="w-100 mb-2" style="width: 100%; min-height: 50px;" placeholder="Hex-encoded IV..."></textarea>
        <button id="generateIVBtn" type="button" class="btn btn-purple">Generate Random IV</button>
      </div>
      <!-- RSA Fields (hidden by default) -->
      <div id="rsaKeyFields" style="display: none; flex-direction: column;">
        <label class="mb-1 font-weight-bold"><b>RSA Public Key (PEM)</b></label>
        <textarea id="rsaPublicKey" class="w-100 mb-2" style="width: 100%; min-height: 175px; font-family: monospace; color: #789;" placeholder="Enter RSA Public Key..."></textarea>
        <label class="mb-1 font-weight-bold"><b>RSA Private Key (PEM)</b></label>
        <textarea id="rsaPrivateKey" class="w-100 mb-2" style="width: 100%; min-height: 175px; font-family: monospace; color: #789;" placeholder="Enter RSA Private Key..."></textarea>
        <button id="generateRSAKeyBtn" type="button" class="btn btn-purple mt-2">Generate RSA Keypair</button>
      </div>
    </div>
  </div>
</div>

<!-- Action Button Full Width Section -->
<div style="margin-top: 1rem; text-align: center;">
  <button id="cryptoAction" class="btn btn-blue">Run Encryption/Decryption</button>
</div>

---

## **Supported Modes and Algorithms**

| Mode | Algorithm | Description | Recommendation |
|:-----|:----------|:------------|:---------------|
| Symmetric (AES) | AES-128-CBC | Classic AES encryption with 128-bit key and CBC mode (requires IV and padding) | Recommended for general use |
| Symmetric (AES) | AES-192-CBC | AES encryption with 192-bit key and CBC mode (rarely used) | Optional (advanced only); less common |
| Symmetric (AES) | AES-256-CBC | AES encryption with 256-bit key and CBC mode | Stronger security if needed |
| Symmetric (AES) | AES-256-GCM | Modern AES encryption with 256-bit key and Galois/Counter Mode (authenticated encryption) | **Best for production** |
| Asymmetric (RSA) | RSA-OAEP | RSA encryption with Optimal Asymmetric Encryption Padding | Recommended for public key encryption |

**Notes:**
- **AES-GCM** is preferred for modern applications because it provides **confidentiality** and **integrity** in one operation (authenticated encryption).
- **AES-CBC** remains useful for file encryption, legacy systems, and simpler symmetric use cases but must be combined with a secure random IV.
- **RSA-OAEP** ensures robust encryption security and protects against chosen-ciphertext attacks; it is the standard for RSA encryption today.
- **AES-192-CBC** is supported but rarely needed; most systems choose between 128-bit and 256-bit keys directly.

---

## **AES-256 for Data-at-Rest: Practical Usage and Modern Best Practices**

| Aspect | CBC Mode | GCM Mode |
|:-------|:---------|:---------|
| Real-world usage | Historically common (especially in disk encryption, file systems) | Increasingly preferred for new systems and services |
| Padding required | Yes (PKCS#7 padding) | No padding needed |
| Provides data integrity (authenticated encryption) | No (requires manual HMAC) | Yes (built-in authentication) |
| Recommended today for new systems? | Sometimes (with MAC) | Strongly recommended |
| Susceptible to IV reuse issues | Yes (causes prefix leaks) | Yes (but also breaks integrity if reused) |
| Ease of implementation | Moderate (must manage MACs separately) | Easier (encrypt and authenticate in one step) |

---

## **Real-World Usage Examples**

| System / Service | AES Mode Used | Notes |
|:-----------------|:--------------|:------|
| Early Microsoft BitLocker (Vista/Win7) | AES-128/256-CBC (with external MAC) | Historical CBC usage in early full disk encryption |
| Modern BitLocker (Win10/Win11) | AES-256-XTS | XTS is a special secure disk mode derived from CBC |
| AWS S3 (KMS managed keys) | AES-256-GCM | Authenticated encryption preferred for object storage |
| Google Cloud Storage | AES-256-CBC (internal) | Plus additional integrity protections around the encrypted blob |
| Linux dm-crypt / LUKS2 | AES-256-XTS | Default for modern Linux disk encryption |


**Notes:**
- **AES-GCM** is the best option for encrypting sensitive data at rest because it ensures **confidentiality and integrity** together.
- If using **AES-CBC**, you must combine it with an authenticated hash (like **HMAC-SHA-256**) to avoid silent corruption risks.
- For large files or disk encryption, **AES-XTS** is often used instead of pure CBC.

---

<script src="https://cdn.jsdelivr.net/npm/jsrsasign@10.8.6"></script>
<script src="https://cdn.jsdelivr.net/npm/crypto-js@4.1.1/crypto-js.min.js"></script>
<script src="/assets/js/encryption.js" type="module"></script>
