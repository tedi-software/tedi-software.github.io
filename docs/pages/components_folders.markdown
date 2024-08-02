---
layout: page
title: Folder Layout
parent: TEDI Components
nav_order: 1
---

### Folder Layout
{: .fs-7 }

TEDI is organized into the following folders and requires they exist:

```sh
tedi
├── bin
│   ├── start.sh
│   ├── stop.sh
├── block
├── conf
│   ├── account.properties
│   ├── alert.properties
│   ├── certmanager.properties
│   ├── docker-compose.yml
│   ├── http.properties
│   ├── keymanager.properties
│   ├── logger.properties
│   ├── nats.properties
│   ├── nats_connections.properties
│   ├── nats_kvs.properties
│   ├── purging.properties
│   ├── server.properties
│   └── sql.datasources.properties
├── data
├── keys
├── logs
├── services
├── system
└── utils
```

### **bin**
{: .fs-5 }

the `bin` directory stores files that are executable.

for example, scripts to bootstrap TEDI, the TEDI binaries, etc.


### **block**
{: .fs-5 }

the `block` directory is used to store block files. Block files are a means to quickly disable an integration(s) from running.

For example, if you create an integration named `toybox.logistics` and you wanted to temporarily disable that integration, you could create a file called `toybox.logistics.block` and that would disable the service until removed.

### **conf**
{: .fs-5 }

The `conf` directory is where TEDI stores its configuration files. The individual files, and the purpose of them, will be covered in another section.

### **data**
{: .fs-5 }

The `data` directory is where TEDI writes content it operates on during an integration workflow.

### **keys**
{: .fs-5 }

The `keys` directory is where TEDI expects certificates, keys (for encryption, etc), and ca-trustbundles.


### **logs**
{: .fs-5 }

The `logs` directory is where TEDI stores its logs. 

### **services**
{: .fs-5 }

The `services` directory is where you will configure all of your integration workflows.

### **system**
{: .fs-5 }

The `system` directory stores various configuration items for TEDI.


### **utils**
{: .fs-5 }

The `utils` directory stores various helper utilities for TEDI.