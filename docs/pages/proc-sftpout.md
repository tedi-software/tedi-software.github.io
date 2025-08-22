---
layout: page
title: sftpout
parent: Processors
permalink: /processors/sftpout
description: "Manage secure file transfers effortlessly with TEDI utilizing the SFTP protocol for reliable and protected data exchange in your integrations"
---

# sftpout Processor
{: .fs-7 }

**`sftpin`** is a processor used to deliver files via the *sftp* protocol.


---

**Common Settings**
{: .fs-4 }


| **Setting**                   | **Description**           | **Data Type** | **Default**    |
|:------------------------------|:--------------------------|:--------------|:---------------|
| `service.type=sftpout`         | indicates the type of processor | string | n/a |


---

**FTP Server Info**
{: .fs-4 }


| **Settings**                   | **Description**          |
|:------------------------------|:--------------------------|
| `ftp.server.name`             | the target ftp server's hostname |
| `ftp.server.port`             | the target ftp server's port number |
| `ftp.server.public.key`       | configure the sftp server's public key either directly here (file name) or in `known_hosts` |
| `ftp.server.dir`              | the directory to upload files to (assumes / if empty) |

---

**Mutual Exclusion / Locking**
{: .fs-4 }

If you run multiple threads or TEDI processes, you'll need to use *global locking* to ensure each file is handled independently and in isolation.

| **Settings**                   | **Description**          |
|:------------------------------|:--------------------------|
| `use.locks`                   | acquire a lock prior to processing a file |
| `kvs.name`                    | which key value store to use as a global lock (configured in nats_kvs.properties) |


---

**State Management**
{: .fs-4 }

State management is used to track the state of a single file as it is being processed by TEDI.

The fundamental purpose being to ensure that TEDI finishes writing the file before the destination system begins reading it.

There are two methods to keep state:
* by renaming the file
* by using a *status* file



| **Settings**                   | **Description**          |
|:------------------------------|:--------------------------|
| `overwrite.files`                  |  if the file already exists, overwrite it |
|**Renaming**|
| `file.state.rename.enabled `       | use the file name itself to manage state |
| `file.state.rename.formatter`      | how to rename the file to indicate it's actively being processed  (i.e. mark in-process)|
| **Status Files** |
| `file.state.status.file.enabled`   | use a status file to manage state |
| `file.state.status.file.formatter` | define the name of the status file |
| `file.state.data.file.formatter`   | define the name of the file to upload (PUT) |


---


**Authentication**
{: .fs-4 }

TEDI supports the following methods for authentication with sftp servers:
* basic auth / username password
* username / key

| **Settings**                   | **Description**          |
|:------------------------------|:--------------------------|
| `sftp.client.auth`            | [ basic \| ssh-key ] |
| **Basic Auth** | 
| `basic.auth.username`         | client username |
| `basic.auth.password`         | client password |
| `basic.auth.system.key.alias` | the system key used to encrypt the password |
| **Key Auth** | 
| `key.auth.username`           | client username |
| `key.auth.client.private.key` | private key file name; note: rsa is the only supported key type (you must convert openssh format to pem) |

---

**SSH Settings**
{: .fs-4 }

TEDI supports customization to the following SSH settings.

| **Settings**                   | **Description**          |
|:------------------------------|:--------------------------|
| `ssh.validate.server.host.key` | true or false. note: false is insecure (no trust verification) |
| `ssh.key.exchange.algos`       | comma-delimited array or leave empty to accept Golang defaults |
| `ssh.ciphers`                  | comma-delimited array or leave empty to accept Golang defaults |
| `ssh.macs`                     | comma-delimited array or leave empty to accept Golang defaults |
| `ssh.host.key.algos`           | comma-delimited array or leave empty to accept Golang defaults |
| `ssh.connection.timeout`       | max time to wait to establish a connection (e.g. 1m, 30s) |
| `ssh.debug`                    | true or false. set to enable verbose connection logging (for troubleshooting) |

```sh
# -----------------------------------------------------------------------------
# - ssh.key.exchange.algos: curve25519-sha256
#                           curve25519-sha256@libssh.org
#                           ecdh-sha2-nistp256
#                           ecdh-sha2-nistp384
#                           ecdh-sha2-nistp521
#                           diffie-hellman-group14-sha256
#                           diffie-hellman-group14-sha1
# - ssh.ciphers:            aes128-gcm@openssh.com
#                           chacha20Poly1305ID
#                           aes128-ctr
#                           aes192-ctr
#                           aes256-ctr
# - ssh.macs:               hmac-sha2-256-etm@openssh.com
#                           hmac-sha2-256
#                           hmac-sha1
#                           hmac-sha1-96
# - ssh.host.key.algos:     rsa-sha2-512-cert-v01@openssh.com
#                           rsa-sha2-256-cert-v01@openssh.com
#                           ssh-rsa-cert-v01@openssh.com
#                           ssh-dss-cert-v01@openssh.com
#                           ecdsa-sha2-nistp256-cert-v01@openssh.com
#                           ecdsa-sha2-nistp384-cert-v01@openssh.com
#                           ecdsa-sha2-nistp521-cert-v01@openssh.com
#                           ssh-ed25519-cert-v01@openssh.com
#                           ecdsa-sha2-nistp256
#                           ecdsa-sha2-nistp384
#                           ecdsa-sha2-nistp521
#                           rsa-sha2-512
#                           rsa-sha2-256
#                           ssh-rsa
#                           ssh-dss
#                           ssh-ed25519
#
#  leave empty to accept defaults (above)
# -----------------------------------------------------------------------------
```

---

**File Name Formatter**
{: .fs-4 }

File Name Formatter is used to perform a set of operations on a file name.

You would employ these operations in the event you need to transform a file name to meet to a specific format required by the destination system you are integrating with.


| **Operators**                   | **Description**          |
|:------------------------------|:--------------------------|
| `{COPY}`                      | no-op - copy the full name of the input file including extension (but not the path if there is one) |
| `{PATH}`                      | copy the path of the file (if there is one) |
| `{BASENAME}`                  | copy the basename of the file excluding the extension |
| `{UUID}`                      | add a UUID to the filename (likely for uniqueness) |
| `{DATE:date-format}`          | add a date to the file (format must be specified) - spaces are converted to underscores |
| `{EXT:COPY}`                  | copy the original extension |
| `{EXT:REMOVE}`                | remove the extension after formatting is complete |
| `{SUBSTRING:[N:N]}`           | substring a portion of the file name |


**Example**

```sh
input:     /tmp/files/inbound/xfiles.txt
formatter: {PATH}{BASENAME}_{UUID}.{DATE:2006-01-02 00:00:00}_in.{EXT:COPY}.new
output:    /tmp/files/inbound/xfiles_550e8400-e29b-41d4-a716-446655440000_2021-06-14_12:00:01_in.txt.new
```