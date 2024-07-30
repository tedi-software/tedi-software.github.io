---
layout: page
title: Architectural Landscape
permalink: /landscape/
nav_order: 3
---

### Architectural Landscape
{: .fs-7 }

---

<img src="../../assets/images/adiag.png" alt="Tedi" height="1920" width="1080">


Event Driven Architecture
{: .label .label-blue } 
Central Intermediary
{: .label .label-green }
Middleware
{: .label .label-yellow }
Integration
{: .label .label-red }

---


## **Deployment**
{: .fs-5 }

TEDI is effectively a hub-n-spoke architectural model and inherintly employs an event driven architecture. It can act as a central intermediary unto itself or
can run standalone within each of your engineering teams who themselves run TEDI to integrate.

TEDI is functionally a layer-7 application, so for your network ingress and egress stacks, you'll still want to use traditional firewalls and WAFs (web application firewall) in front of it.

## **TEDI as a Platform**
{: .fs-5 }

Middleware is supposed to plumb together software applications in a transparent way. The Producer and Consumer of data should be unaware, *and without care*, that the data is being transported from them or to them, in some manner that 
they don't have to manage themselves.

TEDI is the vehicle by which to move data from one point to another complete with configurable retry mechanics, comprehensive logging, and alerting.