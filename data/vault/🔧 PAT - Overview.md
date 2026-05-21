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
- [[⚙️ DIMS - Overview]] — Backend system
