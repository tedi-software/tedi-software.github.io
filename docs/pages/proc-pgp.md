---
layout: page
title: pgp
parent: Processors
permalink: /processors/pgp
nav_order: 11
description: "TEDI handles file encryption using Pretty Good Privacy (PGP) to ensure secure data protection and privacy in processing while integrating between services"
---

# pgp Processor
{: .fs-7 }

The `pgp` processor is used to encrypt or decrypt files with the gpg *(The GNU Privacy Guard - gpg2)* command-line utility.


---

**Settings**
{: .fs-4 }


| **Setting**                   | **Description**           |
|:------------------------------|:--------------------------|
| `service.type=pgp`            | set the processor type |
| `pgp.bin`                     | path to gpg program |
| `pgp.secring.password`        | encrypted secret keyring password|
| `pgp.home.dir`                | the home directory for gpg |
| `pgp.args.{integer}`          | list of arguments to pass gpg program for both encrypt and decrypt operations|

---

**Encryption**

Here's how to configure options to encrypt a file.

```sh
pgp.args.0    = "--always-trust"
pgp.args.1    = "--batch"
pgp.args.2    = "--no-greeting"
pgp.args.3    = "--no-secmem-warning"
pgp.args.4    = "--pinentry-mode loopback"
pgp.args.5    = "--yes"
pgp.args.6    = "--armor"
pgp.args.7    = "--recipient tedi"
pgp.args.8    = "--verbose"
pgp.args.9    = "--textmode"
pgp.args.10   = "--passphrase-fd 0"
pgp.args.11   = "--local-user tedi"
pgp.args.12   = "--encrypt"
pgp.args.13   = "--sign"
```

---

**Decryption**

Similarly, to decrypt a file:

```sh
pgp.args.0    = "--always-trust"
pgp.args.1    = "--batch"
pgp.args.2    = "--no-greeting"
pgp.args.3    = "--no-secmem-warning"
pgp.args.4    = "--pinentry-mode loopback"
pgp.args.5    = "--yes"
pgp.args.6    = "--armor"
pgp.args.7    = "--recipient tedi"
pgp.args.8    = "--verbose"
pgp.args.9    = "--textmode"
pgp.args.10   = "--passphrase-fd 0"
pgp.args.11   = "--local-user tedi"
pgp.args.12   = "--decrypt"
pgp.args.13   = "--verify"
```