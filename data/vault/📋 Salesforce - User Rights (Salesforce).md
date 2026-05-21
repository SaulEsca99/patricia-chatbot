# 📋 Salesforce — User Rights

Tags: #salesforce #process #userrights #permissions #setup

← [[🏠 HOME]] | [[💼 Salesforce - Overview]]

---

## What is This Process?

After assigning a user to a User Group (see [[📋 Salesforce - B2B User Group (Salesforce)]]), you need to configure the appropriate **permissions** for that user. This controls what the user can do on the Marketplace.

---

## Step by Step

### STEP 1 — Open User Contact Details

Navigate to the user's contact details in Salesforce. Click on **User Setup** to open the permissions window.

![[assets/doc-sf-user-setup.png]]

---

### STEP 2 — Configure Permissions

![[assets/doc-sf-user-rights.png]]

The User Setup window will display the available permissions:

1. **Remove** the default permissions that are initially selected
2. Grant only the **"Only View Data"** permission

> 💡 By default, new users may have more permissions than needed. Always strip the defaults and assign only what's required.

✅ The user now has the correct permissions configured.

---

## See Also

- [[📋 Salesforce - B2B User Group (Salesforce)]] — Prerequisite: assign user to a group first
- [[💼 Salesforce - Overview]] — Salesforce navigation
