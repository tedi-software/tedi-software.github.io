---
layout: page
title: Architectural Landscape
permalink: /landscape/
nav_order: 2
description: "TEDI's agile architecture supports A2A and B2B systems integration with popular protocols, connectors, and workflows for seamless enterprise data flow automation"
---

# Architectural Landscape
{: .fs-7 }

---

TEDI’s flexibility, scalability, and capability to adapt to various integration scenarios, making it an effective solution for modern enterprise environments.

The landscape page provides a comprehensive view of the TEDI software ecosystem, highlighting its architecture and the various components that facilitate enterprise systems integration (ESI). It outlines the key functionalities and integrations available within the TEDI framework, showcasing how it supports both application-to-application (A2A) and business-to-business (B2B) integrations.

Key elements featured include:

* **Central Integration Hub (TEDI)**: Serves as the core of the architecture, managing data flow and communication between different systems.
* **Protocols and Connectors**: Demonstrates the range of supported protocols, including SFTP, HTTPS, and database connections, enabling diverse integrations.
* **Processors and Workflows**: Details how TEDI handles data transformations and orchestrates processes to streamline integration tasks.

---



## **Conceptual Architecture**
{: .fs-5 }
<img src="../../assets/images/tedi_enterprise_small.png" alt="Tedi" height="901" width="781">

Conceptual
{: .label .label-yellow } 
Composable Architecture
{: .label .label-blue } 
Microservices
{: .label .label-green }
AI Agent Integration
{: .label .label-blue }

---

## **System Architecture**
{: .fs-5 }
<img src="../../assets/images/adiag.png" alt="Tedi" height="1920" width="1080">


Event Driven Architecture
{: .label .label-blue } 
Central Intermediary
{: .label .label-green }
Middleware
{: .label .label-yellow }
System Integration
{: .label .label-red }
AI Agent Integration
{: .label .label-blue }

---



## **Deployment**
{: .fs-5 }

TEDI is effectively a hub-n-spoke architectural model and inherintly employs an event driven architecture. It can act as a central intermediary unto itself or
can run standalone within each of your engineering teams who themselves run TEDI to integrate.

TEDI is functionally a layer-7 application, so for your network ingress and egress stacks, you'll still want to use traditional firewalls and WAFs (web application firewall) in front of it.

---

## **TEDI as a Platform**
{: .fs-5 }

Middleware is supposed to plumb together software applications in a transparent way. The Producer and Consumer of data should be unaware, *and without care*, that the data is being transported from them or to them, in some manner that 
they don't have to manage themselves.

TEDI is the vehicle by which to move data from one point to another complete with configurable retry mechanics, comprehensive logging, and alerting.
