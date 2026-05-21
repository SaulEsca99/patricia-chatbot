# ⚙️ DIMS — Order Types

Tags: #dims #orders #warehouse #csp #dropship #ariba #edi #marketplace #fulfillment

← [[🏠 HOME]] | [[⚙️ DIMS - Overview]]

---

## What is an Order?

![[assets/orden-concepto-que-es.jpeg]]

An **order** is a formal request from a customer to purchase products or services, which is entered into the system to be processed, fulfilled, and invoiced. It is the basic unit of work that the PAT team handles every day.

---

## Order Lifecycle

![[assets/orden-ciclo-de-vida.jpeg]]

Every order goes through 4 phases:

| Phase | What it means |
|---|---|
| **Order Created** | The customer places the purchase and the system generates an order number (Service Order) |
| **Classified** | The system classifies the order by source, type, and assigned warehouse |
| **Processed** | The internal team validates and prepares the order (address verification, pricing, inventory) |
| **Fulfilled** | The product physically reaches the customer |

> 💡 **What the PAT team does:** We resolve issues that stop an order at any of these 4 phases — Electronic Holds, address errors, blocked orders, etc.

---

## Why Order Type Identification Matters

![[assets/orden-tipos-importancia.jpeg]]

Misidentifying an order type can cause:
- **Fulfillment delays** — the order doesn't advance because it's misclassified
- **Incorrect pricing** — wrong billing to the customer
- **Billing disputes** — the customer receives an incorrect invoice and files a claim
- **Shipping errors** — the product goes to the wrong address or warehouse
- **Customer dissatisfaction**
- **Additional manual corrections through Credit & Rebill** — extra work to fix

---

## PART 1 — Where Does the Order Come From? (Source Type)

The first classifier is the **origin**: who generated the order and from which system?

### How to Identify in DIMS

![[assets/dims-como-identificar-origen.jpeg]]

To identify the source of an order:
1. Enter **ESS 1** (advanced edit/query mode)
2. Search for the order with `F`
3. Go to the **header** section
4. Check the **Reference** field — the first letter tells you everything

---

### 🔵 "A" Orders — Ariba (SAP)

![[assets/orden-tipo-ariba-dims.jpeg]]

**What is Ariba?** SAP Ariba is a platform used by large enterprises to centralize and automate all their purchases with different vendors. CompuCom is one of those vendors. When a customer uses Ariba to buy, the order arrives automatically in DIMS.

| Field | Detail |
|---|---|
| **Reference in DIMS** | Starts with `A` → e.g.: `A4423614` |
| **Reviewed as** | Revised PO (Purchase Order) |
| **Created by** | The customer from their Ariba portal |
| **Standardized info** | Yes — buyer data is always normalized |

---

### 🟢 "E" Orders — EDI (Electronic Data Interchange)

![[assets/orden-tipo-edi-dims.jpeg]]

**What is EDI?** A system for electronic data exchange between companies. The customer uploads a file (usually from Excel or an Ariba-like platform) and that file is automatically converted into an order in CompuCom's system.

| Field | Detail |
|---|---|
| **Reference in DIMS** | Starts with `E` → e.g.: `E1240923` |
| **Source** | Spreadsheets or external platforms |
| **Risk** | Upload errors — if the file has errors, it affects quantities, SKUs, or addresses |

> ⚠️ **Special caution:** If an EDI order has data errors (wrong quantity, wrong SKU, bad address), the problem comes from the file the customer uploaded — it's not an internal error.

---

### 🟡 "S" Orders — Marketplace

![[assets/orden-tipo-marketplace-dims.jpeg]]

**What is it?** The customer directly accesses CompuCom's Marketplace (marketplace.compucom.com), selects products, and completes the purchase. The order is automatically created in DIMS.

| Field | Detail |
|---|---|
| **Reference in DIMS** | Starts with `S` → e.g.: `S0167476` |
| **Created by** | The customer themselves (customer-entered) |
| **Source** | CompuCom Marketplace portal |

---

### 🟣 "P" Orders — PAT / Product Assistance Team

![[assets/orden-tipo-pat-dims.jpeg]]

**What is it?** Orders that don't come from any external system — they are **manually created** by CompuCom's internal team, specifically for Cisco products or other special situations.

| Field | Detail |
|---|---|
| **Reference in DIMS** | Starts with `P` → e.g.: `P0173504` |
| **Created by** | CompuCom internal team |
| **Use cases** | Cisco Products, special situations |
| **Typical warehouse** | WH 143 (Direct Drop Ship) |

---

### Source Prefix Summary

| Letter | Source System | Created by |
|---|---|---|
| `A` | SAP Ariba | Customer (via Ariba portal) |
| `E` | EDI / Spreadsheet | Customer (via file upload) |
| `S` | Marketplace | Customer (via marketplace.compucom.com) |
| `P` | PAT / Internal | CompuCom internal team |

---

## PART 2 — How is the Order Processed? (Operational Type)

The second classifier is the **operational type** — which program or business model governs the order.

![[assets/orden-tipos-operacionales.jpeg]]

There are 3 main operational types: **Advanced Exchange (AE)**, **BAU (Business As Usual)**, and **DaaS (Device as a Service)**.

---

### a. Advanced Exchange (AE) 🔄

![[assets/orden-tipo-ae-advance-exchange.jpeg]]

> Triggered when a customer has a defective device that needs urgent replacement.

**How the process works:**
1. The customer reports a failed device
2. CompuCom **immediately ships a replacement** (within 24 hours — SLA)
3. A **return label** is included for the customer to send back the defective device
4. The order is **billed as a service**, not as a product ($0 value in DIMS to avoid margin issues)
5. Orders are created in DIMS with a **$0 value** to avoid pricing or margin issues

> 💡 **Why $0 in DIMS:** If they entered the real device price, it would create accounting margin issues. Since it's a warranty replacement, it's billed as a service.

---

### b. BAU — Business As Usual 🔵

![[assets/orden-tipo-bau-business-as-usual.jpeg]]

> The normal, routine day-to-day orders. The vast majority of orders you'll see are BAU.

**Characteristics:**
- **Shipping SLA:** 1-5 days (many ship around day 3 depending on warehouse workload)
- Can use CSP inventory (customer-owned), purchased inventory (bought from vendor), or a combination
- **Includes:** standard product purchases, procurement orders, CSP deployment orders

---

### c. DaaS — Device as a Service 🖥️

Subscription model where the customer **pays for device usage** (like renting) instead of purchasing. Similar to paying a monthly fee for the equipment their company uses.

---

## PART 3 — How Does the Product Get Delivered? (Fulfillment Type)

The third classifier is the **fulfillment type** — how and from where the product is shipped to the customer.

> 🔑 **Master rule:** The **Warehouse (WH)** number in DIMS tells you the fulfillment type at a glance.

---

### 📦 Warehouse Orders — WH 102 (US) / WH 122 (Canada)

![[assets/orden-tipo-warehouse-wh102-122.jpeg]]

**What does it mean?** The product physically passes through a CompuCom warehouse before reaching the customer. The warehouse receives, verifies, prepares, and ships the order.

**When is it used?**
- Customer needs **special device configuration** (imaging, setup, kitting)
- Products need to be **staged or bundled** before delivery
- There are **compliance or contract requirements** that mandate warehouse processing
- Inventory is already inside the CompuCom warehouse (CSP or pre-existing stock)

**Internal warehouse process:**

![[assets/orden-tipo-warehouse-operaciones.jpeg]]

```
Receiving          → Suppliers deliver goods, checked and logged
Put-away           → Items moved to assigned storage locations
Storage            → Goods kept in warehouse until needed
Picking & Packing  → Items selected, packed, and labeled for delivery
Shipping           → Carriers collect and dispatch orders
```

> 🔑 **Rule:** If inventory is **inside** CompuCom → Warehouse order (WH 102 or 122)

---

### 🚚 Dropship Orders — WH 143

![[assets/orden-tipo-dropship-wh143.jpeg]]

**What does it mean?** The product goes **directly from the vendor (supplier) or distributor (Disty) to the end customer** — it never passes through a CompuCom warehouse.

**When is it used?**
- Inventory is **not available** in the CompuCom warehouse
- **Urgent or expedited delivery** is required
- The product is **held at the vendor or distributor** location
- The customer has **free freight** included in their contract

**Drop Ship benefits:**

![[assets/orden-tipo-dropship-beneficios.jpeg]]

| Benefit | Why |
|---|---|
| **Faster delivery** | Fewer operational steps — goes direct from vendor to customer |
| **Lower cost** | Eliminates storage, handling, and secondary shipping |
| **Simplified process** | Easier to manage and scale |

> 🔑 **Rule:** If inventory is **outside** CompuCom (at the vendor) → Dropship (WH 143)

> 💡 **Related command:** `pm 4 8` in DIMS = Drop Ship Release. Releases the order so the Buyers Team can process it with the vendor.

---

## PART 4 — CSP (Customer-Owned Product)

![[assets/csp-customer-owned-product.jpeg]]

**What is CSP?** "Customer-Owned Product" — inventory that belongs to the customer, not CompuCom. There are 3 types:

| Type | Detailed description |
|---|---|
| **True CSP** | Product owned by the customer, shipped to CompuCom's warehouse and integrated into sales orders |
| **Refurb CSP** | Product returned by the customer, refurbished by CompuCom, available for redeployment |
| **Bill & Hold** | Product purchased from CompuCom but stored (held) until the customer needs to deploy it |

### True CSP in Detail

![[assets/csp-true-csp-explicacion.jpeg]]

True CSP inventory can arrive at CompuCom's warehouse from multiple scenarios:
- Client purchases from another vendor and **sends it to us** for management
- Client **moves inventory** from their other locations to our warehouse
- **Store or office closures** from the client — equipment comes to CompuCom
- Products purchased through CompuCom that the client decides to **store as their own inventory**

---

## PART 5 — Most Common Day-to-Day Order Types

![[assets/orden-tipos-comunes.jpeg]]

### Regular Orders (most frequent)

Standard orders driven by normal daily demand:
- **Typical products:** laptops, docks, keyboards, peripherals
- **Warehouse codes:** 143, 102, 122 depending on availability
- **Do not require:** special configuration, escalation, or project alignment
- Represent the **majority** of the team's routine transactions

---

## Summary Table

| Dimension | Code/Type | What it means in practice |
|---|---|---|
| **Source** | `A` in Reference | Came from SAP Ariba — corporate customer with PO |
| **Source** | `E` in Reference | Came from EDI/Spreadsheet — watch for upload errors |
| **Source** | `S` in Reference | Came from Marketplace — direct online purchase |
| **Source** | `P` in Reference | Created internally by PAT — Cisco or special |
| **Operational** | AE | Urgent 24h replacement of defective device |
| **Operational** | BAU | Normal order, 1-5 day SLA |
| **Operational** | DaaS | Device rental/subscription model |
| **Fulfillment** | WH 102/122 | Goes through CompuCom warehouse (US/Canada) |
| **Fulfillment** | WH 143 | Direct from vendor to customer (Drop Ship) |
| **Inventory** | CSP | Inventory belongs to the customer, not CompuCom |

---

## See Also

- [[⚙️ DIMS - Overview]] — System where all orders live
- [[⚙️ DIMS - Commands]] — Commands to query and operate orders
- [[📖 Glossary]] — Technical term definitions
- [[🛒 Marketplace - Overview]] — How S-type orders are generated
