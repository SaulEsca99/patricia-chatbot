Tags: #dims #case #via-codes #freight
← [[🏠 HOME]]

---

# 📋 DIMS — Update VIA Codes (Freight ID)

Procedure to update VIA codes for a customer's freight ID in DIMS. This involves modifying shipping method codes in the Account Profile.

---

## Overview

VIA codes determine the available shipping methods for a customer. When a customer requests changes to their shipping options, you need to update the VIA codes associated with their freight ID.

---

## Procedure

### STEP 1 — Open Account Profile

Go to the production drive and open the **Account Profile** application.

![[assets/doc-dims-account-profile-app.png]]

### STEP 2 — Search the Account

Use **Ctrl+F** to search for the customer account.

![[assets/doc-dims-account-search.png]]

### STEP 3 — Find the Freight ID

Locate the **Freight ID** field in the account profile.

![[assets/doc-dims-freight-id-field.png]]

### STEP 4 — Search Freight ID in DIMS

Go to DIMS and use the command **`fr 2`** to search the identified freight ID from Account Profile. Press **E** for editing.

![[assets/doc-dims-fr2-search.png]]

### STEP 5 — Modify VIA Codes

In the following menu, the options listed on the **left** are the current VIA codes for the customer, and the **right** ones are the available codes that could be assigned.

![[assets/doc-dims-via-codes-list.png]]

Press **Tab** to change to the right list and search the requested VIA code. Once encountered, press **Enter** and choose the show portal option you want or have been told to set.

![[assets/doc-dims-via-codes-select.png]]

### STEP 6 — Save

When finished setting VIA codes, press **OK** and then **Save** in the new screen.

![[assets/doc-dims-via-codes-save.png]]

> ⚠️ **IMPORTANT:** Modifications involving both the addition and removal of VIA codes for the same shipping method cannot be processed in a single transaction. The correct procedure requires removing the corresponding codes, saving the configuration, and subsequently initiating a new edit to add the remaining codes.

---

## See Also

- [[⚙️ DIMS - Commands]]
- [[⚙️ DIMS - Status Codes]]
- [[📋 DIMS - Change Order Status (DIMS)]]
