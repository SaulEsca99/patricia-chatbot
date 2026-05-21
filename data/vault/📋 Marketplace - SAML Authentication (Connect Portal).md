# 📋 Marketplace — SAML Authentication (SSO)

Tags: #marketplace #process #saml #sso #authentication #ticket

← [[🏠 HOME]] | [[🛒 Marketplace - Overview]]

---

## What is SAML?

**SAML (Security Assertion Markup Language)** is the protocol that enables **Single Sign-On (SSO)** — users from a client company can log into CompuCom's Marketplace **using their own corporate credentials** (e.g.: their corporate Windows account), without needing a separate password.

> 💡 **Example:** Instead of every Cisco employee remembering a marketplace.compucom.com password, they simply use their Cisco credentials. SAML makes that bridge.

---

## Authentication Types

| Type | For whom | How it works |
|---|---|---|
| **OTP** (One-Time Password) | Infrequent users, small groups | They receive a temporary code each time they want to log in |
| **SSO** (Single Sign-On / SAML) | Large employee groups | They log in with their corporate credentials — no additional password |
| **Whitelist** | Known, fixed users | Their IP or user is on a whitelist — direct access without authentication |

---

## When Do You Receive a SAML Case?

- A client reports that **their employees can't log into** the Marketplace
- A client **changed their corporate identity system** (e.g.: Active Directory migration) and needs to update SAML metadata
- A new company wants to **configure SSO** for the first time on the Marketplace

---

## SAML Structure in CompuCom

Each client has in the system:
- A **Sales Account** or **Hub** — their main Marketplace account
- One or more **SSO Domains** — the authentication rules configured for that client

---

## Step by Step

### STEP 1 — Initial Client Verification

1. Open the case in Salesforce
2. Identify the client's **Sales Account or Hub**
3. Review what **SSO Domains** are currently configured

---

### STEP 2 — Ask the Client About Their Metadata

The most common issue is that the client **changed their identity provider** (e.g.: from ADFS to Azure AD) and needs to update their metadata in CompuCom.

Ask the client:
- Did you change your SSO metadata recently?
- If yes → request the **updated metadata URL**

---

### STEP 3 — Create Ticket for Priyanka Musuku

> 📋 **Copy and paste — modify the client data:**

**Ticket title:**
```
SAML SSO Update - [Client Name / Account Name]
```

**Ticket body:**
```
Hi Priyanka,

Customer [CLIENT NAME] is experiencing SSO login issues on the Marketplace.

Account/Hub: [ACCOUNT NAME]
SSO Domain: [SSO DOMAIN]
New Metadata URL: [METADATA URL]

Please update the SAML configuration.

Thank you.
```

**Assigned to:** Priyanka Musuku (lead developer)

---

### STEP 4 — Wait for FR_ (Feature Request)

The development team will review the ticket and create an **FR_** (Feature Request) as a formal response to track the change.

---

### STEP 5 — Update the SSO Domain

Once you receive the approved FR_:
1. Open the client's **SSO Domain**
2. Update the **SAML SSO configuration** with the new metadata URL
3. Confirm to the client that the change has been applied

---

## Flow Diagram

```
Case: client can't log into Marketplace (SSO error)
        ↓
Verify Sales Account and SSO Domains
        ↓
Did metadata change?
  Yes → request new metadata URL
  No  → review current SSO Domain config
        ↓
Create ticket → send to Priyanka Musuku
  "SAML SSO Update - [Client]"
        ↓
Wait for FR_ (Feature Request)
        ↓
Open SSO Domain → update SAML config with new metadata
        ↓
Confirm to client
        ↓
✅ SSO working correctly
```

---

## Contacts for This Process

| Person | Role | When to contact |
|---|---|---|
| **Priyanka Musuku** | Lead SAML developer | For SSO/SAML configuration tickets |
| **Rythem Datta** | Support developer | If Priyanka is unavailable |

→ See [[👥 Team Contacts]] for emails and contact info

---

## See Also

- [[🛒 Marketplace - Overview]] — How the Marketplace works
- [[👥 Team Contacts]] — Full contact info for Priyanka and Rythem
- [[🔐 Access Requests]] — How to create tickets correctly
