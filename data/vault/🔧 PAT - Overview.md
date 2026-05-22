# 🔧 PAT — Overview (Product Assistance Team & CPT)

Tags: #pat #cpt #login #skus #pricing

← [[🏠 HOME]]

---

## What is PAT?

**PAT (Product Assistance Team)** is the platform used to manage SKU catalogs and pricing rules for customers. It includes the **CPT (Customer Pricing Tool)**, which controls product listings and prices.

**PAT Access link:** https://pat.compucom.local/common/site/signin.aspx

---

## First Time Signing In

![[assets/doc-pat-login.png]]

1. Enter your **User ID** (email or employee ID)
2. Enter your **password**
3. Click **Sign in**

> 🚨 **NOTE:** To access PAT CompuCom, simply sign in with your CompuCom credentials.

---

## PAT Home

![[assets/doc-pat-home.png]]

Once logged in, you will see the PAT main interface. The menus you will use most frequently are:

| Menu | Purpose |
|---|---|
| **Products** | SKU viewing and maintenance |
| **Customers** | Customer information, their rules, and which SKUs they have access to |

---

## What is CPT?

**CPT (Customer Pricing Tool)** is the tool within PAT used to manage **pricing rules** for each customer. Each customer has specific rules that determine:
- Which SKUs they can see
- What prices they pay
- What calculation types apply (fixed price, percentage discount, etc.)

---

## Common CPT Tasks

| Task | Link |
|---|---|
| Create a new pricing rule | [[📋 PAT - Create Price Rule (CPT)]] |
| Remove a SKU from an existing rule | [[📋 PAT - Remove SKU from Rule (CPT)]] |
| Update SKU pricing | [[📋 PAT - Update SKUs (CPT)]] |
| Add SKU to Valid Sales | [[📋 PAT - Add Valid Sales (CPT)]] |
| Create a new user | [[📋 PAT - New User (PAT Tool)]] |

---

## Stock Codes Reference

| Stock Code | Description |
|---|---|
| **02** | Primary Stocking |
| **03** | Spec Order BO Only |
| **04** | SP Ord No Rel Vend |
| **06** | Customer Specific |
| **07** | Disc'd w/Inv |
| **08** | Disc'd w/No Inv |
| **14** | Distributor Stock |
| **17** | No Commissionable |
| **30** | Service Parts |
| **32** | Service Parts |
| **35** | SVC Whole Units |
| **50** | Govt — State/Local |
| **51** | Education |
| **52** | Government — Other |
| **53** | SOC Specific |
| **55** | SOC Unix |
| **56** | SOC Education |
| **57** | SOC Software |
| **60** | PSD Regular Items |
| **63** | PSD Labor |
| **66** | PSD Cust Specific |
| **77** | Expanded Product Off |
| **98** | Evals/Assets |
| **99** | Tracking/Bundles |

---

## Rule Type Hierarchy

Rule types have a **hierarchy from top to bottom**. If a SKU fits the requirements for a higher-priority rule (e.g., "SKU Number"), it will not be affected by lower-priority rules (e.g., "Vendor-Product Group").

| Priority | Rule Type |
|---|---|
| 1 | SKU Number |
| 2 | Vendor-Product Group-Stock Code |
| 3 | Manufacturer-Product Group-Stock Code |
| 4 | Vendor-Inv Group-Stock Code |
| 5 | Manufacturer-Inv Group-Stock Code |
| 6 | Vendor-Product Group |
| 7 | Product Group-Stock Code |
| 8 | Vendor-Stock Code |
| 9 | Manufacturer-Stock Code |
| 10 | Inv Group-Vendor |
| 11 | Inv Group-Manufacturer |
| 12 | Inv Group-Stock Code |
| 13 | Product Group Only |
| 14 | Vendor Code Only |
| 15 | Manufacturer Only |
| 16 | Stock Code Only |
| 17 | Inv Group Only |

---

## Calculation Types

| Calculation Type | Description |
|---|---|
| **Fixed Percent Above Cost** | Percentage markup over cost |
| **Fixed Price (Single SKU Rule)** | Fixed dollar amount for a specific SKU |
| **Gross Margin Dollars** | Fixed dollar margin |
| **Gross Margin Percentage** | Percentage-based margin |
| **MSRP** | Manufacturer's Suggested Retail Price |
| **US1 Fixed Percent Above Cost** | US1-based percentage markup |
| **US1 Gross Margin Dollars** | US1-based dollar margin |
| **US1 Gross Margin Percent** | US1-based percentage margin |
| **US1 or 3rd Party Average** | Average of US1 and third-party pricing |

---

## Mulesoft Troubleshooting

> 🚨 When a SKU is recently added and does not appear in MKP (Marketplace) even though it appears in PAT, the problem is likely **Mulesoft** — the interface between MKP and DIMS.

To verify, check if the following fields are empty or malformed in the SKU's Salesforce page:
1. **Commerce Entitlement Policies**
2. **Categories**
3. **Price books**

Whenever this happens, place a ticket or send a message to DIMS devs indicating:
```
DLTPRICE INSERT {CPT} {SKU}
```

---

## See Also

- [[📋 PAT - Create Price Rule (CPT)]] — Create new pricing rules
- [[📋 PAT - Remove SKU from Rule (CPT)]] — Remove SKUs from rules
- [[📋 PAT - Update SKUs (CPT)]] — Update pricing
- [[📋 PAT - Add Valid Sales (CPT)]] — Add Valid Sales to SKUs
- [[📋 PAT - New User (PAT Tool)]] — Create new users
- [[⚙️ DIMS - Overview]] — Backend system
