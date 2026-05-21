# 📋 PAT — Create a Price Rule (CPT)

Tags: #pat #cpt #process #pricerule #create

← [[🏠 HOME]] | [[🔧 PAT - Overview]]

---

## What is This Process?

Creating a **price rule** in the CPT (Customer Pricing Tool) defines what pricing a specific customer gets for specific SKUs. Each rule has a calculation type, a rule type, and a list of associated items.

---

## Step by Step

### STEP 1 — Navigate to Price Rules

Select the **Customers** menu and click **Create** under **Price Rules**.

![[assets/doc-cpt-create-rule-menu.png]]

---

### STEP 2 — Select Calculation Type

Choose the **Calculation Type** for the new rule (e.g.: Fixed Price, Percentage, Margin).

![[assets/doc-cpt-calculation-type.png]]

---

### STEP 3 — Select Rule Type

Select the **Rule Type** that applies.

![[assets/doc-cpt-rule-type.png]]

> 🚨 **IMPORTANT:** Rule type has hierarchy from top to bottom. For example, if a SKU fits the requirements for a "SKU Number" rule AND it also fits under "Vendor-Product Group," the SKU Number rule takes priority — the second rule will NOT affect it.

---

### STEP 4 — Fill Required Fields

Fill in all required fields and click **Save**.

![[assets/doc-cpt-rule-fields.png]]

---

### STEP 5 — Add Items to the Rule

Add all of the items (SKUs) related to that type of rule.

![[assets/doc-cpt-rule-items.png]]

---

## After Creating the Rule

When generating the price rules after creation, the system will ask if the rule was modified. Since it's a **new rule**, select **Yes** to generate.

---

## See Also

- [[🔧 PAT - Overview]] — PAT login and CPT overview
- [[📋 PAT - Remove SKU from Rule (CPT)]] — How to remove a SKU
- [[📋 PAT - Update SKUs (CPT)]] — How to update pricing
