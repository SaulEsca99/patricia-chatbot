# ⚙️ DIMS — Installation & Configuration

Tags: #dims #snetterm #installation #setup

← [[🏠 HOME]] | [[⚙️ DIMS - Overview]]

---

## Overview

To work with DIMS, you need to install **sNetTerm** — a terminal application that connects to the DIMS server via SSH. This guide walks you through the full installation and configuration process.

> ⚠️ **Prerequisite:** You must have a DIMS access request approved before configuring. See [[🔐 Access Requests]].

---

## Step 1 — Open Company Portal

From the Windows Start menu or search bar, type **Company Portal**.

![[assets/doc-company-portal-search.png]]

Once the Company Portal application appears, select the application icon or click **Open**.

![[assets/doc-company-portal-open.png]]

---

## Step 2 — Install sNetTerm

After opening Company Portal, navigate to **Apps** → **All** to display the full list of available applications. In the search bar, type **InterSoftSNetTerm4.1.0.2010** and select the application.

![[assets/doc-snetterm-search.png]]

Proceed to install the application:

![[assets/doc-snetterm-installing.png]]

Once installation is complete, locate the application using the search bar or Start menu:

![[assets/doc-snetterm-installed.png]]

Click the application or select **Open**. This will launch the sNetTerm interface where we begin DIMS configuration.

---

## Step 3 — Configure sNetTerm for DIMS

Once inside the application, navigate to **Profile Manager** and select the **DIMS** option.

![[assets/doc-snetterm-profile-manager.png]]

Enter your CompuCom credentials using the fields below:

| Field | Value |
|---|---|
| **Host** | DIMS |
| **Port** | 22 |
| **Type** | Dual Use |
| **Connection/Protocol Type** | SSH-2 |
| **Interface Type** | Network |
| **Emulation** | VT220 |
| **Key Definitions** | VT220 |
| **User** | your.user |
| **Password** | your.password |

![[assets/doc-dims-credentials.png]]

> 🚨 **NOTE:** To access and work within DIMS, you must request system access. A support ticket must be submitted. See [[🔐 Access Requests]].

---

## See Also

- [[⚙️ DIMS - Overview]] — What is DIMS
- [[⚙️ DIMS - Commands]] — All DIMS commands
- [[🔐 Access Requests]] — How to request DIMS access (ticket format included)
