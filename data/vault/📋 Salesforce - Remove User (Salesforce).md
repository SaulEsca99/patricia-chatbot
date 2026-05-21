# 📋 Salesforce — Remove User from Company Account

Tags: #salesforce #process #deleteuser #commerce

← [[🏠 HOME]] | [[💼 Salesforce - Overview]]

---

## What is This Process?

⚠️ **This is NOT the same as Kill User.** Kill User operates in DIMS (deletes a blocked session). This process is done **entirely in Salesforce** — it removes a person from a company's Marketplace account.

**Use case:** An employee left the company, changed roles, or should no longer have access to order through the Marketplace.

---

## Step by Step

### STEP 1 — Navigate to Commerce in Salesforce

1. Open Salesforce → **Commerce** section
2. Search for the **user** to be removed

### STEP 2 — Open the User Account

1. Locate the user in the account's contact list
2. Click on the user's name to open their profile

### STEP 3 — Delete the User

1. In the user profile, find the **Delete** option
2. Confirm the deletion

✅ The user has been removed from the company's Marketplace account.

> ⚠️ This does NOT delete the user from Salesforce itself — it only removes their association with the company's commerce account.

---

## Important Distinction

| Process | System | What it does |
|---|---|---|
| **Kill User** | DIMS (sNetTerm) | Deletes a stuck session, releases blocked order |
| **Remove User** | Salesforce (Commerce) | Removes a person from a company's Marketplace account |

---

## See Also

- [[📋 DIMS - Kill User (Connect Portal)]] — ⚠️ DIFFERENT process: for DIMS blocked sessions
- [[💼 Salesforce - Overview]] — Salesforce navigation
