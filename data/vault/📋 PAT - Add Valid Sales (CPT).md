Tags: #pat #cpt #case #sku #valid-sales
← [[🏠 HOME]]

---

# 📋 PAT — Add SKU to Valid Sales (CPT)

Procedure to add Valid Sales to a SKU in the PAT Tool. This is required when a SKU does not appear in MKP because it lacks Valid Sales assignment.

---

## When to Use

Add Valid Sales to a SKU when:

- The user is specifically requesting it
- The SKU has **Stock Code 06** (Customer Specific)
- The SKU does not appear in the Marketplace even after being added to a price rule

---

## Procedure

### STEP 1 — Navigate to DIMS Item View/Edit

Enter the PAT Tool, click on **Products**, and search for **"DIMS Item View/Edit"**. Enter the SKU number:

![[assets/doc-pat-valid-sales-search.png]]

### STEP 2 — Add Valid Sales

In the **"Valid Sales"** field, add the valid sales to the SKU. This is needed because when the SKU does not appear, we must add valid sales to the **Price Code**.

In this example, the SKU has Stock Code 06 — we need to Add Valid Sales before adding it to the SKU rule:

![[assets/doc-pat-valid-sales-add.png]]

> ⚠️ **IMPORTANT:** We only add Valid Sales when the user is requesting it or when the SKU has **Stock Code 06**.

---

## See Also

- [[📋 PAT - Create Price Rule (CPT)]]
- [[📋 PAT - Update SKUs (CPT)]]
- [[🔧 PAT - Overview]]
