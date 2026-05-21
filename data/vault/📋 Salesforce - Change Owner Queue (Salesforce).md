# 📋 Salesforce — Change Owner Queue

Tags: #salesforce #process #changeowner #cases #pat

← [[🏠 HOME]] | [[💼 Salesforce - Overview]]

---

## What is This Process?

**Change Owner** is one of the most frequent daily processes. It consists of assigning a case to the correct client **queue** — that is, redirecting it to the internal team that should handle it.

> 💡 **Context:** Teamboxes are internal groups identified as `CC#` (e.g.: CC45, CC60, CC90). Each client has an assigned CC in the **Q-Lookup** database. Your job is to find that CC# and assign it to the case.

---

## When to Use It

When you receive a case in the PAT Queue and the **Case Owner** is not correct — you need to assign it to the corresponding client queue.

---

## Required Tools

- ✅ Salesforce → Commerce Storefront Console → PAT Queue
- ✅ Access to **Q-Lookup** (queue assignment repository)

> ⚠️ Access to Q-Lookup must be granted in advance. See [[🔐 Access Requests]].

---

## Step by Step

### STEP 1 — Open the Case from PAT Queue

![[assets/doc-sf-case-list.png]]

In Salesforce, inside **Commerce Storefront Console → Product Assistance Team (PAT) Queue**, you'll see the list of active cases. Click on the **case number** (e.g.: `12502965`) to open it.

---

### STEP 2 — Identify the Client in Description Information

![[assets/doc-sf-case-details.png]]

Inside the opened case, look for the **Description Information** section (scroll down to find it). There you'll find the case text with the client name (e.g.: The Hartford, Cisco, Sun Life Financial).

Note down the client name — you'll need it in the next step.

---

### STEP 3 — Search the Queue in Q-Lookup

![[assets/doc-sf-qlookup.png]]

Open the **Q-Lookup** repository (shared Excel file). To search quickly:

1. Press `Ctrl + F` to open search
2. Type the **first 3 letters of the client name** (e.g.: `SUN` for Sun Life Financial)
3. Locate the client in the **Customer** column
4. In the **Queue** column, note the queue code — it will have the format `CC#` (e.g.: `CC45`)

> 💡 **Tip:** If the client has multiple rows, look for the one that matches the case type or region. If in doubt, ask your manager.

> 🚨 **NOTE:** If two teams appear under the same user, ask the manager which one to pick.

> 🚨 **NOTE:** Bank of Montreal's Queue team is **BMO**.

---

### STEP 4 — Change the Case Owner in Salesforce

![[assets/doc-sf-change-owner-modal.png]]

Return to the case in Salesforce:

1. Find the **Case Owner** field (in the Fields or Details section)
2. Click on the field — the **Change Case Owner** modal will open
3. In the modal search bar, type the queue number found (e.g.: `CC45`)
4. Select the queue from the results
5. Click **Change Owner**

✅ **Done!** The Case Owner has been changed to the correct queue.

---

## Flow Diagram

```
PAT Queue in Salesforce
        ↓
Click on case number
        ↓
Read "Description Information"
Identify client name
        ↓
Open Q-Lookup
Ctrl+F → first 3 letters of client
Note the CC# from Queue column
        ↓
Return to Salesforce → Case Owner
Click → "Change Case Owner"
Type CC# → Click "Change Owner"
        ↓
✅ Case reassigned correctly
```

---

## See Also

- [[📋 Salesforce - Change Multiple Owner (Salesforce)]] — For changing multiple cases of the same client at once
- [[💼 Salesforce - Overview]] — How to navigate Salesforce and reach PAT Queue
