# 🔐 Access Requests — Request Guide

Tags: #access #ticket #onboarding #salesforce #dims #marketplace

← [[🏠 HOME]]

---

> As a new intern, you need to request several accesses before you can start working. This guide summarizes what accesses exist, how to request them, and who authorizes them.

---

## Access Summary

| System | Who authorizes | How to request | Urgency |
|---|---|---|---|
| **DIMS** (sNetTerm) | IT / Infosec | Support ticket (assign to infosec) | 🔴 Critical |
| **Network Drives** | Infosec | Support ticket (assign to infosec) | 🔴 Critical |
| **Salesforce** | Fernando Blengio | Direct request | 🔴 Critical |
| **Marketplace** | Manager | Direct request | 🟡 Required |
| **Marketplace Demo (ZZZ Corp)** | Fernando Blengio | Direct request | 🟡 For testing |
| **Q-Lookup** | Fernando Blengio | Direct request | 🔴 Critical for Change Owner |
| **PAT System** | Manager | Direct request | 🔴 For case closure & CPT |

---

## Access 1 — DIMS (sNetTerm)

**What it is:** SSH access to CompuCom's central backend system.

**Without this:** You cannot query or modify the status of any order.

**How to request:**

> 📋 **Copy and paste — only modify your name and user:**

**Ticket title:**
```
DIMS Access Request - [Your Name]
```

**Ticket body:**
```
Hi,

I am a new intern on the Product Assistance Team (PAT).
I need access to DIMS (sNetTerm) to perform my daily tasks.

Please assign to infosec.
My user is: [your_user]
My manager is: [manager_name]

Thank you.
```

→ See [[⚙️ DIMS - Installation]] to configure sNetTerm once you have access.

---

## Access 2 — Network Drives

**What they are:** Shared network paths required for advanced DIMS operations (cost changes, QC, production).

**How to request:**

### Using the Connect Portal

1. Access the following link: [Connect Portal](https://connect.compucom.com/)

![[assets/doc-connect-portal.png]]

2. Scroll down and search for **"Contact Support"**

3. A window will appear — select **"Open a Ticket"**

![[assets/doc-connect-open-ticket.png]]

4. Fill in the information requesting **"Network Drive Access"** and click **"On My Computer"**

![[assets/doc-connect-network-drive.png]]

> 📋 **Copy and paste for the description field:**

```
\\spw099nas02g\ClickOnePD
\\spw099nas02v\ClickOneQC
\\sp099nas01r\Applications\UNIX\Applications\DIMS\costchanges

Please assign to infosec, my user is [your_user]
```

![[assets/ticket-network-drive-access.jpeg]]

---

## Access 3 — Salesforce

**What it is:** Access to the CRM platform where all PAT cases are managed.

**How to get it:** Request directly from **Fernando Blengio**. He will submit the access request on your behalf.

> 🚨 **NOTE:** The user must log into MKP (Marketplace) first before Salesforce access works. If the user doesn't appear in Salesforce "Contacts," they haven't logged into MKP yet.

---

## Access 4 — Q-Lookup

**What it is:** Shared Excel database mapping every client to their queue (CC#). Essential for the Change Owner process.

**How to get it:** Request directly from **Fernando Blengio** or your manager.

→ See [[📋 Salesforce - Change Owner Queue (Salesforce)]] for how Q-Lookup is used.

---

## Access 5 — PAT System

**What it is:** Platform to manage SKU catalogs and pricing rules (CPT).

**Link:** https://pat.compucom.local/common/site/signin.aspx

**How to get it:** Sign in with your CompuCom credentials — no special request needed.

→ See [[🔧 PAT - Overview]] for PAT login and CPT overview.

---

## See Also

- [[⚙️ DIMS - Installation]] — sNetTerm setup after access is granted
- [[👥 Team Contacts]] — Who to contact for each access
- [[📋 Salesforce - Change Owner Queue (Salesforce)]] — Requires Q-Lookup access
