# 📖 Glossary — CompuCom PAT

Tags: #glossary #reference

← [[🏠 HOME]]

---

> Reference of all technical terms and concepts used in the PAT team's daily work. If you encounter a new term, add it here.

---

## A

**Active Directory / Azure AD**
Microsoft's enterprise identity management system. When a client migrates their identity provider (e.g., from ADFS to Azure AD), their SAML metadata needs updating. See [[📋 Marketplace - SAML Authentication (Connect Portal)]].

**Advanced Exchange (AE)**
Operational order type triggered when a customer has a defective device requiring urgent replacement. Shipped within 24 hours (SLA), includes return label, billed as service ($0 in DIMS). See [[⚙️ DIMS - Order Types]].

**Ariba (SAP Ariba)**
SAP platform that consolidates a company's purchases with its vendors. Orders from Ariba have the prefix `A` in DIMS (e.g.: `A1234567`). See [[⚙️ DIMS - Order Types]].

---

## B

**BAU (Business As Usual)**
Standard day-to-day operational order type. Shipping SLA of 1-5 days. Can use CSP inventory, purchased inventory, or both. The most frequent order type PAT handles. See [[⚙️ DIMS - Order Types]].

**Bill & Hold**
CSP type. Product purchased from CompuCom but stored (held) until the customer needs to deploy it. See **CSP**.

**Bundle**
Collection of SKUs grouped and sold as a single product. Managed in DIMS as a set of related SKUs.

**Buyer Group**
Group of buyers within the Marketplace system. Associated with purchasing permissions. See [[📋 Salesforce - B2B User Group (Salesforce)]].

---

## C

**Carrier**
Shipping company that delivers products from warehouse or vendor to customer. Examples: FedEx, UPS, Purolator. In DIMS, the carrier appears in the `Via Code` header field.

**Case**
A support ticket or request. The basic unit of work for the PAT team in Salesforce. Each case has a unique number (e.g.: `12502965`) and a status (Queue, In Process, Closed).

**Case Owner**
The current owner of a case. Can be a person or a queue. A key part of PAT's work is ensuring each case has the correct Case Owner. See [[📋 Salesforce - Change Owner Queue (Salesforce)]].

**CC# (Teambox)**
Internal CompuCom queue code. Identifies the sales group responsible for a specific client. Format: `CC` + number (e.g.: `CC45`, `CC60`, `CC90`). Looked up in Q-Lookup. See [[📋 Salesforce - Change Owner Queue (Salesforce)]].

**CMPC - Data Center Ops**
CompuCom's Data Center technical team. Only they can execute Kill User in DIMS. Kill User tickets are assigned to them with P3 priority. See [[📋 DIMS - Kill User (Connect Portal)]].

**Company Portal**
Microsoft application where CompuCom employees install authorized software. Where you download and install **sNetTerm** to access DIMS. See [[⚙️ DIMS - Installation]].

**CPT (Customer Pricing Tool)**
Tool within PAT used to manage pricing rules per customer. Controls which SKUs are visible and at what prices. See [[🔧 PAT - Overview]].

**Credit & Rebill**
Financial correction process when an order was incorrectly invoiced. The original is voided (credit) and re-invoiced (rebill) with correct data.

**CSP (Customer-Owned Product)**
Inventory owned by the customer, not CompuCom. Three subtypes: **True CSP**, **Refurb CSP**, and **Bill & Hold**. See [[⚙️ DIMS - Order Types]].

**Customer Number**
Identifier of a billing account in DIMS. Used to link orders to a specific client's financial account.

---

## D

**DaaS (Device as a Service)**
Operational order type where the customer pays a monthly subscription for device usage instead of purchasing.

**DIMS**
CompuCom's central backend system. Manages order status, billing, SKUs, and all order details. Accessed via **sNetTerm** using SSH. See [[⚙️ DIMS - Overview]].

**Disty (Distributor)**
External distributor that supplies CompuCom. In Drop Ship orders, the Disty ships directly to the end customer.

**Drop Ship**
Fulfillment model where the product goes directly from vendor to customer without passing through a CompuCom warehouse. Identified by warehouse code `143`. See [[⚙️ DIMS - Order Types]].

---

## E

**EDI (Electronic Data Interchange)**
Electronic data exchange system between companies. EDI orders come from Excel files or external platforms. Prefix `E` in DIMS. Upload errors can affect quantities, SKUs, or addresses.

**Electronic Hold**
Order blocked in DIMS due to a geocoding issue (address with multiple possible geocodes). Requires a ticket to Ahmad. See [[📋 DIMS - Electronic Hold (Connect Portal)]].

**ESS (Entry Screen System)**
DIMS navigation module. Most used: `ESS 49` (read-only — view orders and history) and `ESS 1` (advanced edit/query mode).

**EWRFMNPM**
Electronic West Recycling Fee Maintenance menu in DIMS. Used to manage environmental SKUs.

---

## F

**FR_ (Feature Request)**
Formal response from the development team to a technical ticket. When you send a SAML ticket to Priyanka, the team creates an FR_ to track the requested change.

**Fulfillment**
The complete process from when an order is created until the product physically reaches the customer. Includes: classification, processing, warehouse preparation or vendor coordination, and shipping. The type (Warehouse vs Drop Ship) determines which WH code is used. See [[⚙️ DIMS - Order Types]].

---

## G

**Geocoding / Geocode**
Address verification process. The system validates that an order's zip code corresponds to a real and unique location. If there's ambiguity (multiple geocodes for same zip), the order enters **Electronic Hold**. See [[📋 DIMS - Electronic Hold (Connect Portal)]].

---

## H

**Hold**
Any state that stops an order from advancing. Two main types: **Electronic Hold** (geocoding error) and **Manual Hold** (manually paused by someone, field `Man Hold: yes` in DIMS).

**Hub**
Client's main account in the Marketplace. A Hub can have multiple Sales Accounts. Used in SAML/SSO contexts.

---

## I

**Imaging**
Process of installing OS and configuring software on devices before delivery. Orders requiring imaging go through warehouse (WH 102/122), not Drop Ship.

**Infosec (Information Security)**
CompuCom's IT security team. Responsible for granting access to DIMS and Network Drives. See [[🔐 Access Requests]].

**Intune (Microsoft Intune)**
Microsoft device management service. CompuCom uses Intune to distribute software. sNetTerm is installed from the **Company Portal** managed by Intune.

---

## J

**JIT Handler**
Just-in-Time handler. Used in order processing for time-sensitive operations.

---

## K

**Kill User**
Command that permanently deletes a blocked user session in DIMS and releases the order it holds. Irreversible process executed by **CMPC - Data Center Ops**. See [[📋 DIMS - Kill User (Connect Portal)]].

**Kitting**
Process of grouping and packaging multiple products as a kit before delivery. Requires warehouse order (WH 102/122).

---

## M

**Man Hold (Manual Hold)**
DIMS header field (`Man Hold: yes/no`). Indicates if an order was manually paused by someone on the team.

**Marketplace (MKP)**
CompuCom's online sales platform (marketplace.compucom.com). Corporate clients buy tech products here. Orders have prefix `S` in DIMS. See [[🛒 Marketplace - Overview]].

**Metadata (SAML)**
XML file or URL describing a client's identity provider configuration. When a company changes their identity system, they need to update their metadata in CompuCom.

**MSRP**
Manufacturer's Suggested Retail Price. The recommended retail price set by the manufacturer.

**Mulesoft**
Integration middleware between MKP and DIMS. If a SKU appears in PAT but not in MKP, the problem is likely Mulesoft. See [[🔧 PAT - Overview]].

---

## N

**Network Drives**
Shared network paths for advanced DIMS operations. The 3 main paths: `ClickOnePD` (production), `ClickOneQC` (quality control), and `costchanges`. Requested via ticket to Infosec. See [[🔐 Access Requests]].

**No Rate**
No shipping charges apply to the order.

---

## O

**Order**
Formal customer request to purchase products or services. Recorded in the system for processing, fulfillment, and invoicing. In DIMS identified as **Service Order (SO)**. See [[⚙️ DIMS - Order Types]].

**OTP (One-Time Password)**
Authentication type where users receive a temporary code each time they want to access the Marketplace.

---

## P

**P1 / P2 / P3 / P4 / P5**
Support ticket priority levels:
- **P1** — Critical (system down, immediate response)
- **P2** — High (specific area not working)
- **P3** — Medium (urgent but not critical) ← most common in PAT
- **P4** — Low (no nearby deadline)
- **P5** — No urgency

**pad@compucom.com**
PAT team email. Required in CC when making the confirmation reply in the Kill User process.

**PAT (Product Assistance Team)**
The support team you belong to as an intern. Manages Salesforce cases and uses DIMS to verify and resolve order issues.

**pm 4 8**
DIMS command for **Drop Ship Release**. Releases the order for the Buyers Team to process with the vendor. See [[⚙️ DIMS - Commands]].

**PO (Purchase Order)**
Formal purchase order issued by the customer. In DIMS, visible in the `Cust PO` header field.

**Procurement**
Product acquisition process — from customer purchase decision to delivery. The Buyers Team at CompuCom handles procurement with vendors.

---

## Q

**Q-Lookup**
Excel database mapping all CompuCom clients to their queue (CC#). Critical tool for the Change Owner process. See [[📋 Salesforce - Change Owner Queue (Salesforce)]].

**Queue**
Salesforce work queue. A group of people or teams that receive and process cases. CompuCom queues use format `CC#`.

---

## R

**Refurb CSP**
CSP type. Product returned by customer, refurbished by CompuCom, available for redeployment. See **CSP**.

---

## S

**Shipping Address**
Stores the customer's previous delivery addresses in the system. Includes autofill functionality for faster order processing.

**SAML (Security Assertion Markup Language)**
Standard protocol enabling Single Sign-On (SSO). Allows corporate client employees to log into the Marketplace using their corporate credentials. See [[📋 Marketplace - SAML Authentication (Connect Portal)]].

**Service Order (SO)**
Unique reference number DIMS assigns to each order. Format varies by origin:

| Prefix | Origin | Example |
|---|---|---|
| `S` | Marketplace | `S1234567` |
| `A` | Ariba (SAP) | `A1234567` |
| `E` | EDI | `E1234567` |
| `P` | PAT / Internal | `P1234567` |
| (numbers only) | DIMS direct | `12345678` |

**SKU (Stock Keeping Unit)**
Unique code identifying a specific product in the system.

**sNetTerm**
Terminal application (InterSoft SNetTerm 4.1.0.2010) used to connect to DIMS via SSH. Installed from Company Portal. See [[⚙️ DIMS - Installation]].

**SSO (Single Sign-On)**
Unified authentication system. User logs in once with corporate credentials and accesses multiple systems. Implemented via **SAML** at CompuCom.

**SSO Domain**
Configuration defining SAML authentication rules for a specific client. Contains the client's identity provider metadata.

**Stock Codes**
Product availability codes in DIMS: `8` = completely discontinued, `7` = discontinued but still with inventory.

---

## T

**Team Mailbox**
Code identifying the internal sales team responsible for an account. Visible in DIMS header (`Team Mailbox: CC90`). Equivalent to **CC#** used in Salesforce.

**True CSP**
CSP type. Customer-owned product shipped to CompuCom's warehouse and integrated into sales orders. See **CSP** and [[⚙️ DIMS - Order Types]].

---

## U

**UAT / QCDIMS**
DIMS test environment. Used to test commands or configurations without affecting real orders. Server name: `QCDIMS`. See [[⚙️ DIMS - Overview]].

**UTIL 3**
DIMS command that forces an order status change. Used when an order is stuck. See [[📋 DIMS - Change Order Status (DIMS)]].

---

## V

**Vendor**
External supplier that provides products to CompuCom. In Drop Ship, the vendor ships directly to the customer. Examples: Ingram Micro, TD Synnex, D&H.

**Via Code**
DIMS header field for shipping method. Indicates carrier and delivery type. Examples: `C2 -FedxCollect-2da` (FedEx 2-day), `VC Purolator Expr` (Purolator Express).

---

## W

**Warehouse (WH)**
Physical or virtual storage where inventory is located. The WH code determines fulfillment type:

| Code | Location / Type | Typical Use |
|---|---|---|
| `102` | US — physical | CSP, Advance Exchange, orders with config |
| `122` | Canada — physical | Same as 102 but for Canada |
| `143` | Virtual / Drop Ship | Product direct from vendor to customer |

See [[⚙️ DIMS - Order Types]].

---

## Z

**ZZZ Corp**
Demo/sandbox company in the Marketplace. Used for testing as if you were a real customer, without affecting production data. Access granted by Fernando Blengio.
