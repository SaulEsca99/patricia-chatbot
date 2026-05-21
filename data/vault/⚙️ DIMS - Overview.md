# ⚙️ DIMS — Overview

Tags: #dims #backend #system #environments

← [[🏠 HOME]]

---

## What is DIMS?

**DIMS** is CompuCom's central backend system. It is the core of all operations: order status, billing/collections, SKUs, box groups, and more are all managed here.

> 💡 **Analogy:** If the Marketplace is the storefront the customer sees, DIMS is the warehouse and control system behind everything.

> ⚠️ **Important context:** DIMS is a legacy system — it's very old and not sustainable long-term. CompuCom has an active migration plan to replace it with modern technology (Python + Bitstream). That's why it's critical for interns to understand DIMS end-to-end before it changes.

---

## What Does DIMS Manage?

| What it manages | Detail |
|---|---|
| **Order status** | What phase the order is in |
| **Billing/Collections** | Invoicing and payments |
| **Box Group** | Which warehouse group the order belongs to |
| **SKU** | Unique identifier for each product |
| **Service Order (SO)** | Unique reference number per order |

---

## System Environments

DIMS has two main environments:

| Environment | Name | Purpose |
|---|---|---|
| **Production** | DIMS / ZZZ Corp | Real business environment. All real customer order data lives here. **Any changes here are real.** |
| **Testing/UAT** | QCDIMS / UAT | User Acceptance Testing. Test environment to validate before going to production. Use this to test without affecting real data. |

> ⚠️ **Fundamental rule:** Always verify which environment you're in before making changes. In production, mistakes are hard to reverse.

---

## Service Orders — Types and Identifiers

When an order is generated, DIMS assigns a **Service Order (SO)**. The number structure varies by origin:

| Platform of Origin | Structure | Example |
|---|---|---|
| **Marketplace** | S + 7 digits | `S1234567` |
| **Source** | C + 7 digits | `C1234567` |
| **Ariba (SAP)** | A + 7 digits | `A1234567` |
| **EDI** | E + 7 digits | `E1234567` |
| **DIMS direct** | 8 digits | `12345678` |
| **PAT Orders** | P + 7 digits | `P0173504` |

> 🧠 **Memory tip:** The first letter tells you where the order came from.
> - **S** = Marketplace (Store)
> - **C** = Code/Source
> - **A** = Ariba (SAP)
> - **E** = EDI
> - **P** = PAT / Internal
> - Numbers only = Created directly in DIMS

---

## Warehouse Codes

| Code | Warehouse |
|---|---|
| **102** | Warehouse US (United States) |
| **122** | Warehouse Canada |
| **143** | Virtual Warehouse (Direct from vendor — Drop Ship) |

→ See [[⚙️ DIMS - Order Types]] for full details on warehouse orders vs drop ship.

---

## Date Format

> ⚠️ **Important:** The system uses **US format** (MM/DD/YYYY)

Example: `05/15/2024` = May 15, 2024

---

## Ticket Priority Levels

When reporting issues in DIMS, these levels are used:

| Priority | Name | Example | Urgency |
|---|---|---|---|
| **P1** | CRITICAL | Entire system is down | 🔴 Immediate |
| **P2** | High | A specific DIMS area is not working | 🟠 High |
| **P3** | Medium | Urgent but not critical | 🟡 Medium |
| **P4** | Low | No nearby deadline | 🟢 Low |
| **P5** | No urgency | Can be resolved when there's time | ⚪ Minimal |

> 💡 **Practical note:** Most day-to-day tickets use **P3**.

---

## DIMS Status Dashboard

To check the current status of the DIMS system in real time:

**URL:** https://compucomcorp-my.sharepoint.com/:x:/g/personal/mp216004_compucom_com/IQD_gl4qip3AT66mnyPLniS5AWt-TtOox8QWaGSQeipjTq4

> 💡 Requires being on the corporate network or active VPN.

---

## Fulfillment Process (How an order gets delivered)

```
Customer purchases on Marketplace
        ↓
System generates Service Order (SO) in DIMS
        ↓
Warehouse assigned (102 US / 122 CAN / 143 Drop Ship)
        ↓
Address verification (Geocoding)
        ↓
Released for fulfillment
        ↓
Product shipped to customer
```

---

## See Also

- [[⚙️ DIMS - Installation]] — How to install sNetTerm
- [[⚙️ DIMS - Commands]] — All DIMS commands
- [[⚙️ DIMS - Order Types]] — Order types, CSP, fulfillment
- [[🔐 Access Requests]] — How to request DIMS access
