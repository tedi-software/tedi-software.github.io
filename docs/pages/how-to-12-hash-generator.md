---
layout: page
title: Hash Generator
parent: How-To Guides
permalink: /how-to/hash-generator
description: Hash a string with SHA-1, SHA-256, SHA-384, and SHA-512. See how different algorithms produce different results.
nav_order: 12
---


# Hash Generator
{: .fs-7 }

Use this tool to hash (also called digest) any string using multiple cryptographic hash algorithms.

---

{: .highlight }
> **Private and Secure:** Fully client-side — nothing leaves your browser !

---

## **What is Hashing?**
{: .fs-5 }

**Hashing** is a process of transforming any input data (text, files, etc.) into a fixed-length string of characters, which appears random.  
This output is called a **hash** or **digest**.

A hash function has key properties:

- **Deterministic:** The same input always produces the same output.
- **Fast to compute:** Hashing large data is efficient.
- **Irreversible:** It is practically impossible to reverse-engineer the original input from its hash.
- **Collision-resistant:** It is extremely unlikely that two different inputs will produce the same hash.

Hashing is a foundational building block in security systems and software engineering. It is used in:

- Password storage
- Digital signatures
- Data integrity checks
- TLS/SSL handshakes
- File verification (checksums)

---

## **Text to Hash**
{: .fs-5 }
<textarea id="hashInput" class="w-100 mb-2" style="width: 100%; min-height: 100px; font-family: monospace; color: #789;" placeholder="Enter text to hash..."></textarea>

<div class="mt-2">
  <button id="hashButton" class="btn btn-green">Generate Hashes</button>
  <label class="mb-1 font-weight-bold"><b>     Output Encoding:  </b></label>
  <input type="radio" id="outputBase64" name="outputEncoding" value="base64" class="ml-2" checked/>
  <label for="outputBase64">Base64</label>
  <input type="radio" id="outputHex" name="outputEncoding" value="hex" />
  <label for="outputHex">Hex</label>
</div>

---

## **Hash Results**
{: .fs-5 }
<table class="w-100 mt-4">
  <thead>
    <tr>
      <th>Algorithm</th>
      <th>Bits</th>
      <th>Hash</th>
    </tr>
  </thead>
  <tbody id="hashResults">
    <!-- Results will go here -->
  </tbody>
</table>

---

{: .warning }
> **MD5 and SHA-1** are insecure for cryptographic use.
> Use SHA-256, SHA-384, or SHA-512 whenever possible.


---


## **Quick-take overview**
{: .fs-5 }

* **Legacy / broken:** `MD5` and `SHA-1` are no longer collision-resistant—avoid except for non-security fingerprints.  
* **Current workhorses:** `SHA-2` (`SHA-256`/`384`/`512`) remains the FIPS-approved default and has no known practical weaknesses.  
* **Future-proof picks:** `SHA-3` (sponge construction) and `BLAKE3` (tree construction) both resist length-extension, run in constant time, and scale well on modern CPUs.  
* **When you need speed:** `BLAKE3` ≫ `BLAKE2` ≳ `SHA-2` > `SHA-3` in raw throughput on mainstream hardware.  
* **Keyed or variable-length output:** Use `HMAC-SHA-256` for classic MACs, or the XOF modes `SHAKE` / `BLAKE3` when you need arbitrary-length digests.

---

## **Comparison table**
{: .fs-5 }

| Algorithm            | Year&nbsp;(std.)    | Digest size(s) | Construction / Family | Security status (2025)        | Typical strengths / uses                              |
|:----------------------|:---------------------|:----------------|:-----------------------|:-------------------------------|:-------------------------------------------------------|
| `MD5`              | 1992 (RFC 1321)     | 128 bit        | Merkle–Damgård (MD)   | **Broken** – practical collisions | Legacy file checksums only                            |
| `SHA-1`            | 1995 (FIPS 180-1)   | 160 bit        | Merkle–Damgård (SHA-0 tweak) | **Broken** – chosen-prefix collisions | Legacy Git objects & old certs (discouraged)          |
| `SHA-224 / 256`    | 2002 (FIPS 180-4)   | 224 / 256 bit  | SHA-2 (32-bit core)   | **Strong** – no attacks < 2¹¹² / 2¹²⁸ | TLS, code signing, JWTs, blockchains                  |
| `SHA-384 / 512`    | 2002 (FIPS 180-4)   | 384 / 512 bit  | SHA-2 (64-bit core)   | **Strong** – cost ≥ 2¹⁹² / 2²⁵⁶   | Large-file checksums, digital signatures              |
| `SHA-512/256`      | 2008 (FIPS 180-4)   | 256 bit        | SHA-2 (64-bit core)   | **Strong** – faster on 64-bit CPUs | Drop-in upgrade for SHA-256 on servers                |
| `SHA3-256 / 512`   | 2015 (FIPS 202)     | 256 / 512 bit  | Keccak sponge         | **Strong** – different design, side-channel hardened | Post-quantum research, FIPS alternative               |
| `SHAKE128 / 256`   | 2015 (FIPS 202)     | **XOF** (any)  | Keccak sponge (XOF)   | **Strong** – variable-length output | KDFs, domain separation, PQ crypto schemes            |
| `BLAKE2s / BLAKE2b`| 2013 (RFC 7693)     | 256 / 512 bit  | ChaCha-like / HAIFA   | **Strong** – well-studied       | Argon2, libsodium, fast file integrity checks         |
| `BLAKE3`           | 2020 (IETF draft)   | **XOF** (default 256 bit) | Merkle tree, SIMD    | **Strong** – wide margin, fastest | Ultra-fast checksums, embedded & mobile devices       |
| `RIPEMD-160`       | 1996 (ISO 10118-3)  | 160 bit        | MD-style              | **Safe** but aging             | Bitcoin addresses, P2P legacy systems                 |
| `Whirlpool`        | 2000 (ISO 10118-3)  | 512 bit        | Wide-block (AES-like) | **Safe** – niche adoption       | European standards compliance                         |

> **Legend:** *“Strong”* = no practical pre-image or collision attacks known.  
> **XOF** = extendable-output function (digest can be any length).

---

## **Recommended defaults**
{: .fs-5 }

| Scenario                          | Good choice                | Why                                              |
|----------------------------------|----------------------------|--------------------------------------------------|
| FIPS-required environments       | **SHA-256** or **SHA-512** | Broadest library / hardware support              |
| General-purpose apps (no FIPS)   | **BLAKE3**                 | Fastest, keyed & XOF modes built-in              |
| Long-term / post-quantum cautious| **SHA3-256** or **SHAKE256** | New design, higher analysis margin               |
| Message authentication           | **HMAC-SHA-256** (classic) or **KMAC128** (SHA-3) | Proven security proofs                            |
| Password hashing / KDF           | **Argon2id** (BLAKE2 core) | Memory-hard, GPU-resistant                       |



<script src="https://cdn.jsdelivr.net/npm/jsrsasign@10.8.6"></script>
<script src="/assets/js/hash-generator.js" type="module"></script>
