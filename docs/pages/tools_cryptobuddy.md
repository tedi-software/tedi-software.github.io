---
layout: page
title: Crypto-Buddy
parent: Tools
permalink: /tools/cryptobuddy
nav_order: 1
description: "TEDI framework tool to encrypt and decrypt keys and passwords in your integration workflows"
---


# Crypto-Buddy
{: .fs-7 }

**`Crypto-Buddy`** is a command line (cli) tool for you to encrypt and decrypt keys and passwords.

---

**Usage**

```sh
usage: cryptobuddy [<flags>] <command> [<args> ...]

Flags:
  -h, --help            Show context-sensitive help (also try --help-long and --help-man).
  -c, --cipher=CIPHER   cipher name to use, e.g. aes-128-ctr
  -e, --encoding="hex"  base64 or hex(default) encode the key bytes

Commands:
  help [<command>...]
    Show help.


  aes encrypt --cipher=CIPHER --text=TEXT [<flags>]
    encrypt text

    -c, --cipher=CIPHER   cipher name to use, e.g. aes-128-ctr
    -t, --text=TEXT       plain text to encrypt
    -k, --key=KEY         aes 128,192,256 bit hex-encoded key
    -i, --iv=IV           initialization vector - must be hex-encoded
    -e, --encoding="hex"  base64 or hex(default) encode the key bytes

  aes decrypt --key=KEY --message=MESSAGE
    decrypt text

    -k, --key=KEY          aes 128,192,256 bit hex-encoded key
    -m, --message=MESSAGE  encoded message format

  aes key --cipher=CIPHER [<flags>]
    creates an aes key

    -c, --cipher=CIPHER   cipher name to use, e.g. aes-128-ctr
    -e, --encoding="hex"  base64 or hex(default) encode the key bytes

  aes iv --cipher=CIPHER [<flags>]
    create an initialization vector (iv)

    -c, --cipher=CIPHER   cipher name to use, e.g. aes-128-ctr
    -e, --encoding="hex"  base64 or hex(default) encode the key bytes

  argon2id hash --memory=MEMORY --time=TIME --threads=THREADS --keyLen=KEYLEN [<flags>]
    hash a password

    -m, --memory=MEMORY      memory
    -t, --time=TIME          time
    -p, --threads=THREADS    threads
    -k, --keyLen=KEYLEN      threads
    -e, --encoding=ENCODING  encoding
    -a, --password=PASSWORD  the password to hash
    -b, --prompt-password    read password from stdin

  argon2id verify --pass=PASS --message=MESSAGE [<flags>]
    verify a password

    -a, --pass=PASS          plain text password
    -b, --message=MESSAGE    encoded message
    -e, --encoding=ENCODING  encoding type
```

---

{: .note}
> TEDI itself does not have a direct dependency on Crypto-Buddy.

---

**Create a New Key**
{: .fs-4 }

```sh
> ./crypto_buddy aes key -c aes-256-gcm -e hex
key: 6c68470a7cd089381a006865d1f8cde5ece5ad5301faaff3bc01bcc4bf19c98b
```

---

**Encrypt**
{: .fs-4 }

Using the key created above, use it to encrypt a password. The output will be an encoded string. 

```sh
\> ./crypto_buddy aes encrypt                                                 \
          -c aes-256-gcm                                                      \
          -k 6c68470a7cd089381a006865d1f8cde5ece5ad5301faaff3bc01bcc4bf19c98b \
          --text 'fat cats gobble dogs and eat bats'

$aes-256-gcm$hex$7aeefe6389bc163187716269$c21071c9f1404afb2f7e9975fb6a00db53b442be8a07ec26979c4c2cdb56c15bf97afee3558d25b15b60564eb8bb8ce83e
```

---

**Decrypt**
{: .fs-4 }

To decrypt, pass in the original key along with the encoded text from the encrypt operation.

```sh
\> ./crypto_buddy aes decrypt \
            -k 6c68470a7cd089381a006865d1f8cde5ece5ad5301faaff3bc01bcc4bf19c98b 
            -m '$aes-256-gcm$hex$7aeefe6389bc163187716269$c21071c9f1404afb2f7e9975fb6a00db53b442be8a07ec26979c4c2cdb56c15bf97afee3558d25b15b60564eb8bb8ce83e'

text: fat cats gobble dogs and eat bats
```