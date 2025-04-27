---
layout: page
title: Cryptography Primer
parent: How-To Guides
permalink: /how-to/cryptography-primer
description: Cryptography primer covering signing, encryption, decryption, and hashing. Learn the essential algorithms like RSA, AES, Ed25519, and SHA-256
nav_order: 9
---

# Cryptography Primer
{: .fs-7 }

This page provides a brief, practical overview of common cryptographic operations: **Signing**, **Encryption/Decryption**, and **Hashing**, and related concepts. 
It summarizes key algorithms and their typical use cases to help you choose the right tool for your application.


## **TL;DR**
{: .fs-5 }
- Use **AES** to encrypt documents and large data.
- Use **RSA** to encrypt small secrets like passwords or symmetric keys.

> **Note:** RSA can only encrypt messages smaller than the key size, which is why it's mostly used to encrypt passwords. AES has no such size limitation, making it the standard choice for encrypting larger files.

---

**Max Text Input Lengths by RSA Key Size**

| RSA Key Size | Max Plaintext Size (Bytes) | Notes |
| :--------------- | :------------ | :---- |
| 1024 bits | ~86 bytes | Very small; deprecated; insecure, not recommended for new systems.
| 2048 bits | ~190 bytes | Standard modern minimum.
| 4096 bits | ~446 bytes | High security, but heavy and slow.
| 8192 bits | ~958 bytes | Overkill for most applications; Very very slow.


---

## **Signing**
{: .fs-5 }

Signing ensures **authenticity** and **integrity** of data. A private key is used to generate a signature, which can be verified by others using the corresponding public key.



| Algorithm        | Type         | Notes |
| :--------------- | :------------ | :---- |
| **RSA-PSS**       | Asymmetric    | Modern RSA signing standard; uses randomized padding for stronger security. |
| **ECDSA (P-256, P-384)** | Asymmetric    | Efficient elliptic curve signatures; smaller keys, fast operations. |
| **Ed25519**       | Asymmetric    | Highly secure, extremely fast, and simple to implement; preferred for new applications. |
| **HMAC (with SHA-256, SHA-512)** | Symmetric    | Combines a shared secret and a hash function to authenticate messages; simple and very widely used. |


### **Signature**
{: .fs-4 }
```sh
Signature = PrivateKey.Sign(Hash(Message))

Meaning:
- Hash the message (typically with a cryptographic hash like SHA-256).
- Use the private key to mathematically "sign" that hash.
- The output is the signature — a small, fixed-size value that can later be verified.

```

| Algorithm | Signing Process
| :--------------- | :------------ |
| RSA-PSS | Hash the message with SHA-256.<br> Apply RSA private key operation (modular exponentiation) with PSS padding. <br>Output the signature bytes.
| ECDSA (P-256, P-384) | Hash the message. <br> Use elliptic curve math to generate two values, r and s. <br>Output (r, s) as the signature.
| Ed25519 | Hash the message and some private key material together. <br>Perform fast elliptic curve operations. <br> Output a compact 64-byte signature.

### **Summary**
{: .fs-4 }
* Signing = Hash + Private key operation.
* Different math depending on RSA vs ECDSA vs Ed25519.
* Public key is used for verifying later.


### **Note on HMAC**
{: .fs-4 }

**HMAC (Hash-based Message Authentication Code)** provides message authentication using a shared secret and a cryptographic hash function.  
It is simple, efficient, and extremely common in secure API communication and token systems.

- HMAC is **not** encryption.
- HMAC is **not** a digital signature (no public/private key distinction).
- Best suited for situations where both parties share a secure secret in advance.

Example use cases:
- Authenticating API requests (e.g., AWS request signing).
- Verifying tokens (e.g., JWTs using `HS256`).
- Securing communications in trusted environments.


---

## **Encryption and Decryption**
{: .fs-5 }

Encryption protects **confidentiality** by transforming readable data (plaintext) into unreadable data (ciphertext), while decryption reverses the process.

| Algorithm        | Type         | Mode / Usage | Notes |
| :--------------- | :------------ | :----------- | :---- |
| **AES-CBC**       | Symmetric     | Block cipher | Requires a random IV; vulnerable if padding is not handled carefully. |
| **AES-GCM**       | Symmetric     | Authenticated encryption | Encrypts and authenticates data in one step; recommended for most uses. |
| **RSA-OAEP**      | Asymmetric    | Key encryption | Encrypts small pieces of data (like symmetric keys); uses padding to prevent attacks. |
| **Hybrid Encryption** (RSA-OAEP + AES-GCM) | Both | Encrypts keys with RSA, data with AES | Standard secure pattern for encrypting large messages or files. |

---

## **Hashing**
{: .fs-5 }

Hashing transforms arbitrary input into a fixed-size output (hash). Cryptographic hashes ensure **data integrity** and are critical for verifying information.

| Algorithm        | Type               | Notes |
| :--------------- | :------------------ | :---- |
| **SHA-256**       | Cryptographic hash  | Widely used, secure, 256-bit output. |
| **SHA-512**       | Cryptographic hash  | Similar to SHA-256 but with 512-bit output; good for high-security needs. |
| **Blake2b**       | Cryptographic hash  | Faster than SHA-2 while remaining highly secure. |
| **Argon2id**      | Password hashing    | Specialized for safely hashing passwords; resistant to GPU attacks and highly tunable. |


## **Notes**
{: .fs-5 }

- **Symmetric algorithms** (like AES) use the same key for encryption and decryption.
- **Asymmetric algorithms** (like RSA, ECDSA) use key pairs: one private, one public.
- **Authenticated encryption** (like AES-GCM) protects both the *confidentiality* and *integrity* of data.
- **Password hashing** (like Argon2id) is purposefully slow to protect against brute-force attacks.

---

## **Recommended Choices**
{: .fs-5 }

If you're starting a new project:
- **Signing**: Prefer **Ed25519** or **ECDSA (P-256)**.
- **Encryption**: Prefer **AES-GCM** for symmetric encryption; **Hybrid RSA-OAEP + AES-GCM** for asymmetric use cases.
- **Hashing**: Use **SHA-256** or **Blake2b** for general purposes; **Argon2id** for password storage.

---


## **Key Derivation Functions (KDFs)**
{: .fs-5 }

Key Derivation Functions (KDFs) transform passwords or other low-entropy inputs into strong cryptographic keys.  
They add computational cost to resist brute-force attacks.

| Algorithm        | Purpose | Notes |
| :--------------- | :------- | :---- |
| **PBKDF2**        | Password-to-key | Widely used, configurable iteration count. |
| **scrypt**        | Password-to-key | Adds memory hardness to resist hardware attacks. |
| **Argon2id**      | Password-to-key | Modern KDF; balances resistance to CPU and GPU attacks; recommended. |

> **Note:** Password hashing algorithms like **Argon2id** are specialized KDFs designed for authentication systems.

---

## **Salts, Nonces, and IVs**
{: .fs-5 }

Salts and nonces add **randomness** to cryptographic operations to ensure uniqueness and protect against attacks.

| Term   | Purpose | Notes |
| :----- | :------- | :---- |
| **Salt**  | Hashing | Random value added to input before hashing to prevent rainbow table attacks. |
| **Nonce** | Encryption | "Number used once" — ensures uniqueness in encryption (e.g., AES-GCM). |
| **IV (Initialization Vector)** | Encryption | Random data used to initialize block cipher modes like AES-CBC. |

---

## **Digital Certificates and Public Key Infrastructure (PKI)**
{: .fs-5 }


In real-world systems, public keys are often distributed inside **digital certificates** to establish trust between parties.

| Concept       | Purpose | Notes |
| :-------------| :------- | :---- |
| **X.509 Certificate** | Public key + identity | Binds a public key to an identity (e.g., HTTPS websites). |
| **Certificate Authority (CA)** | Trust anchor | Third party that verifies and signs certificates, enabling trust at scale. |

> **Note:** Certificates are foundational for systems like **TLS/SSL**, securing internet communications.

## **Notes**
{: .fs-5 }

- **Symmetric algorithms** (like AES) use the same key for encryption and decryption.
- **Asymmetric algorithms** (like RSA, ECDSA) use key pairs: one private, one public.
- **Authenticated encryption** (like AES-GCM) protects both the *confidentiality* and *integrity* of data.
- **Password hashing and KDFs** (like Argon2id) are critical for safely handling user passwords.
- **Salts**, **nonces**, and **IVs** ensure randomization and uniqueness in cryptographic processes.
- **Certificates** are used to bind public keys to identities and enable secure communication at scale.

---

## **Recommended Choices**

If you're starting a new project:
- **Signing**: Prefer **Ed25519** or **ECDSA (P-256)**.
- **Encryption**: Prefer **AES-GCM** for symmetric encryption; **Hybrid RSA-OAEP + AES-GCM** for asymmetric encryption.
- **Hashing**: Use **SHA-256** or **Blake2b** for general hashing; **Argon2id** for password storage and key derivation.

---
