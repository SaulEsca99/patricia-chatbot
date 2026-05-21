# 📋 PAT — Update SKUs

Tags: #pat #cpt #process #sku #update #pricing

← [[🏠 HOME]] | [[🔧 PAT - Overview]]

---

## What is This Process?

Updating the **price or configuration** of existing SKUs within a CPT price rule. This is needed when a product's price changes or needs to be corrected.

---

## Step by Step

### STEP 1 — Check the CPT Form

Review the CPT form, checking:
- SKU number
- Possible new price rule
- Percentage updates
- Price or rounding changes

The following example is for updating a **fixed price**:

![[assets/doc-cpt-update-form.png]]

---

### STEP 2 — Modify the Price in the Rule

In the CPT, the SKU had a price of `2065.48`. It belongs to a rule that has only one SKU, so modifying the price in the rule is sufficient.

> 💡 **Important:** If the rule has **more than one SKU**, you would need to **create a new rule** for the SKU you want to update (to avoid affecting the other SKUs in the same rule).

![[assets/doc-cpt-update-rule-price.png]]

![[assets/doc-cpt-update-result.png]]

---

### STEP 3 — Save and Generate

1. After modifying the price, click **Save and Close**
2. Since the rule was **modified/created**, when generating the rules the chosen option must be **Yes**
3. Check the **stacker** — when it finishes generating the rules, go to the **Preview** section and verify the SKUs got updated

---

## Key Decision: Modify vs. Create New Rule

| Scenario | Action |
|---|---|
| Rule has **only 1 SKU** | Modify the existing rule directly |
| Rule has **multiple SKUs** | Create a **new rule** for the SKU you're updating |

---

## See Also

- [[🔧 PAT - Overview]] — PAT login and CPT overview
- [[📋 PAT - Create Price Rule (CPT)]] — How to create new rules
- [[📋 PAT - Remove SKU from Rule (CPT)]] — How to remove a SKU
