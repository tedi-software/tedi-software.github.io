---
layout: page
title: KeyManager Properties
parent: TEDI Components
permalink: /components/keymngr
nav_order: 7
---

### KeyManager Properties
{: .fs-7 }

**`keymanager.properties`** is used to configure keys for encryption and decryption operations.

---

**Basic Settings**
{: .fs-4 }

| **Setting**                    | **Description**          |
|:------------------------------|:--------------------------|
| `allow.unecrypted.keys`        | unused  |
| `debug`                        | log key aliases and their values at startup |

{: .warning }
> Use `debug` judiciously - never enable in Production as it will log your secrets.

---

**System Keys**
{: .fs-4 }

System keys are the master passwords you use to encrypt all of your passwords, etc in your configuration files. They must be [base64 \| hex] encoded AES Keys [16\|24\|32 bytes].

System keys must be passed into TEDI at startup either thru stdin or environment variables.

You must use [crypto-buddy]({{site.baseurl}}/tools) to generate, then encrypt and encode your system keys.

System keys are referenced in TEDI via an alias, so regardless if you read from stdin or from environment variables, you need to map you system keys to an alias and then reference the alias in your configurations so TEDI knows which system key to use to decrypt the target secret.


{: .note }
> You don't have to store the encoded secrets in your configurations. You can inject them at runtime thru environment variables if you prefer.

{: .highlight }
> TEDI keeps the system keys encrypted in memory.

**Reading from stdin**

To read from stdin, set `system.key.read.from.stdin=true`.

TEDI expects the system keys to be read from stdin in this format: `{keyname}={value};`

```sh
syskey-1=your-secret-1; syskey-2=your-secret-2; syskey-3=your-secret-3
```

{: .important }
> Do not include spaces in your system key names.

**Environment Variables**

If you prefer to set your system keys via environment variables, you need to configure you system keys to an alias and then map to the environment variable.

First disable stdin, `system.key.read.from.stdin=false`, then create the mappings as below.

```sh
0.system.key.alias=tedi_mp_20211230_01
0.system.key.envvar.name=SYSKEY-1

1.system.key.alias=tedi_mp_20211230_02
1.system.key.envvar.name=SYSKEY-2

2.system.key.alias=tedi_mp_20211230_03
2.system.key.envvar.name=SYSKEY-3
```

The above aliases using a simple naming convention: `tedi_mp_{creation-date}`. TEDI does not enforce or have any functionality built into the alias other than as a lookup value.

You don't have to have more than one, but when you need to rotate the secret, the scope of the change would be limited to those integrations that have the dependency on that one system key, so it's good practice to have more than one.

{: .note }
> You should adopt a naming convention for your aliases and stick to it.

---

**RSA & AES Keys**
{: .fs-4 }

TEDI will use `RSA` and `AES` keys frequently. TEDI expects these secrets to be available on the local disk.

To configure TEDI to load keys from disk, you need to specify a few settings per key:


| Type | **Setting**                    | **Description**          | 
|:-----|:------------------------------|:--------------------------|
| RSA  | `rsa.private.key.name `        | the name of the rsa key file on disk |
|      | `rsa.private.key.passphrase`   | the encrypted & encoded key passphrase |
|      | `rsa.private.key.system.key.alias`   | the system key used to encrypt the passphrase |
|      | `rsa.public.key.name`          | the corresponding public key file |
| AES  | `aes.key.name`                 | the name of the key you will use a reference elsewhere |
|      | `aes.key.passphrase`           | the encrypted & encoded key |
|      | `aes.key.system.key.alias`     | the system key used to encrypt the passphrase |



**Example Configuration**
{: .fs-2 }

As noted above, be sure to adopt a key name convention so you don't get confused when you're building your integrations.

```sh
# configure RSA
0.rsa.private.key.name = rsa-key_20220423.key
0.rsa.private.key.passphrase = "$aes-256-cbc$hex$d8fsd8fs8dfhe8fs8dfsd8fs9df89sdfsdf"
0.rsa.private.key.system.key.alias = tedi_mp_20211230_01
0.rsa.public.key.name = key_20220423.pub

# configure AES
0.aes.key.name = aes-key_20220423.key
0.aes.key.passphrase = "$aes-256-ctr$hex$sdfasdfasf8u9e8u9w8uf9w8fus98ud8e"
0.aes.key.system.key.alias = tedi_mp_20211230_02

```

{: .important }
> RSA keys must be PKCS1 formatted and PEM encoded
>
> AES keys do not live in separate physical files as do RSA keys
