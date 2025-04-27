---
layout: page
title: Keypair Generator
parent: How-To Guides
permalink: /how-to/keypair-generator
description: Generate public and private keypairs for RSA, Ed25519, and ECDSA algorithms.
nav_order: 13
---

# Keypair Generation
{: .fs-7 }

This page allows you to generate cryptographic public/private keypairs for several popular algorithms.  

- **RSA keypairs** for asymmetric encryption and signatures
- **Ed25519 keypairs** for fast, secure digital signatures
- **ECDSA keypairs** on curves P-256 and P-384

Features:

- Choose between **RSA**, **Ed25519**, and **ECDSA** keypair generation
- Select **key size** (RSA) or **elliptic curve** (ECDSA)
- View both **public** and **private** keys side-by-side
- Fully **browser-based** key generation

---

{: .highlight }
> **Private and Secure:** Fully client-side — your keys are never sent anywhere.

---

<!-- Options Block (Full Width) -->
<div style="border: 1px solid #ccc; border-radius: 5px; padding: 1rem; margin-bottom: 1rem;">

  <div style="margin-bottom: 1rem;">
    <label class="mb-1 font-weight-bold"><b>Algorithm:</b></label>
    <select id="algorithmSelect" class="w-100">
      <option value="RSA">RSA</option>
      <option value="Ed25519">Ed25519</option>
      <option value="ECDSA">ECDSA</option>
    </select>
  </div>

  <div id="rsaOptions" style="margin-bottom: 1rem; display: none;">
    <label class="mb-1 font-weight-bold"><b>RSA Key Size:</b></label>
    <select id="rsaKeySize" class="w-100">
      <option value="2048">2048 bits</option>
      <option value="3072">3072 bits</option>
      <option value="4096">4096 bits</option>
    </select>
  </div>

  <div id="ecdsaOptions" style="margin-bottom: 1rem; display: none;">
    <label class="mb-1 font-weight-bold"><b>ECDSA Curve:</b></label>
    <select id="ecdsaCurve" class="w-100">
      <option value="P-256">P-256</option>
      <option value="P-384">P-384</option>
    </select>
  </div>

</div>

<!-- Key Output (Side-by-Side) -->
<div id="keys" style="display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 1rem;">
  <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column;">
    <label class="mb-1 font-weight-bold"><b>Public Key (PEM)</b></label>
    <textarea id="publicKeyOutput" class="w-100" readonly style="height: 250px; font-family: monospace; color: #789;"></textarea>
  </div>
  <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column;">
    <label class="mb-1 font-weight-bold"><b>Private Key (PEM)</b></label>
    <textarea id="privateKeyOutput" class="w-100" readonly style="height: 250px; font-family: monospace; color: #789;"></textarea>
  </div>
</div>

<!-- Action Button Full Width -->
<div style="text-align: center; margin-top: 1rem;">
  <button id="generateKeypairBtn" class="btn btn-blue">Generate Keypair</button>
</div>

<!-- Status Message -->
<p id="statusMessage" style="margin-top: 1rem; text-align: center; color: gray;"></p>

---

## **Supported Key Types**
{: .fs-5 }

| Algorithm | Type | Key Sizes / Curves | Use Case | Recommended For | Notes |
|:----------|:-----|:-------------------|:---------|:----------------|:------|
| **RSA** | Asymmetric | 2048, 3072, 4096 bits | Encryption and Signing | TLS certificates, email encryption, VPNs | Versatile but slower; large keys |
| **Ed25519** | Asymmetric | Fixed curve | Signing only | Modern apps, secure APIs, blockchain | Very fast, highly secure; preferred for new projects |
| **ECDSA** | Asymmetric | P-256, P-384 curves | Signing only | Mobile apps, IoT devices, authentication tokens | Efficient signatures with small keys |

---

**Notes:**
- **RSA** supports both encryption and signing, but is slower and produces larger keys compared to elliptic curve algorithms.
- **Ed25519** is strongly recommended for new signature systems — fast, simple, and secure.
- **ECDSA** is excellent for systems where key size and bandwidth matter (e.g., mobile, IoT).


---

<script src="https://cdn.jsdelivr.net/npm/jsrsasign@10.8.6"></script>
<script src="/assets/js/keypair-generator.js" type="module"></script>
