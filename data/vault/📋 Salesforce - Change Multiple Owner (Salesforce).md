# 📋 Salesforce — Change Multiple Owner Queue

Tags: #salesforce #process #changeowner #bulk #pat

← [[🏠 HOME]] | [[💼 Salesforce - Overview]]

---

## What is This Process?

When you have **multiple cases from the same client** in the PAT Queue, instead of changing each Case Owner individually, you can do a **bulk selection** to process them all at once.

---

## When to Use It

When multiple cases in the PAT Queue:
- Belong to the **same client**
- Are the **same case type**

---

## Step by Step

### STEP 1 — Identify and Select Cases

![[assets/doc-sf-change-multiple-owner.png]]

First, identify each case individually. If the cases correspond to the same client and the same case type, select them using the checkboxes on the left.

In the example shown, the **Contact Name** belongs to the same client — so the identified cases can be selected together.

---

### STEP 2 — Change Owner for All Selected

1. Navigate to option **1 – Change Owner**
2. A window will appear with a search field and a dropdown menu
3. In step **2**, within the dropdown, select the **user icon**
4. Several icons will appear — select the **Queue icon (layers)**
5. Search for the appropriate **CC#** queue
6. Click **Change Owner**

✅ All selected cases will be reassigned simultaneously.

---

## See Also

- [[📋 Salesforce - Change Owner Queue (Salesforce)]] — For changing a single case
- [[💼 Salesforce - Overview]] — PAT Queue navigation
