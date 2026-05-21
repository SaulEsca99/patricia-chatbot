# 📋 DIMS — Kill User (Delete an Order Session)

Tags: #dims #process #killuser #datacenter #order

← [[🏠 HOME]] | [[⚙️ DIMS - Commands]]

---

> ⚠️ **This process is irreversible.** Always verify that the user ID and order number are correct before proceeding.

---

## What is Kill User?

**Kill User** is the command that permanently deletes a stuck user session and releases a blocked order in DIMS. It happens when an order cannot advance because a ghost user has an active session holding it. Requires coordination with **CMPC - Data Center Ops**, who execute the final deletion.

> 💡 **Example:** Order `111254216` is blocked because user `A226496` has an active session that wasn't properly closed. Kill User removes that session and frees the order.

---

## Required Materials

- ✅ The **User ID** in DIMS — format: letter + numbers, e.g.: `A226496`
- ✅ The **order number** to release — 9 digits, e.g.: `111254216`
- ✅ Access to create support tickets

---

## Step by Step

### STEP 1 — Verify in DIMS with UTIL 3

Before creating the ticket, check the order status:

1. Open DIMS (sNetTerm) → `ESS 49`
2. Press `F` → search the order with `Shift + Insert`
3. Use `UTIL 3` to verify if it's blocked
   - If blocked → `UTIL 3` forces the status change
   - If not resolved with UTIL 3 → proceed to Kill User ticket

→ See [[⚙️ DIMS - Commands]] for UTIL 3 details

---

### STEP 2 — Create the Ticket

> 📋 **Copy and paste — only modify what's in `[ ]`:**

**Ticket title:**
```
Kill User [USER_ID] Order [ORDER_NUMBER]
```
*Example: `Kill User A226496 Order 111254216`*

**Ticket body:**
```
Please kill user [USER_ID] and release order [ORDER_NUMBER].
Please assign to CMPC - Data Center Ops
P 3
```
*Example body: `Please kill user A226496 and release order 111254216. Please assign to CMPC - Data Center Ops P 3`*

**Where is this happening:** select `Somewhere Else`

![[assets/ticket-kill-user.jpeg]]

---

### STEP 3 — Send to Data Center and Wait

1. Send the ticket to **CMPC - Data Center Ops**
2. Wait for success confirmation (they may request a **confirmation PIN**)

---

### STEP 4 — Confirm and Close

When the Data Center confirms:

1. **Reply** to the confirmation message
2. ⚠️ **Required in CC:** `pad@compucom.com`
3. Close the case

---

## Flow Diagram

```
ESS 49 → F → search the order
        ↓
UTIL 3 → does it release?
  Yes → ✅ no ticket needed
  No  → continue ↓
        ↓
Create ticket:
  Title: "Kill User [USER] Order [ORDER]"
  Body: "Please kill user... CMPC - Data Center Ops P 3"
  Where: Somewhere Else
        ↓
Data Center confirms
        ↓
Reply + CC pad@compucom.com
        ↓
Close case
        ↓
✅ Order deleted from system
```

---

## Responsibilities

| Who | What they do |
|---|---|
| **You** | Verify in DIMS, create the ticket in exact format, make final reply with pad@compucom.com in CC |
| **CMPC - Data Center Ops** | Validate info, request PIN if applicable, execute deletion, confirm success |

---

## See Also

- [[⚙️ DIMS - Commands]] — UTIL 3 commands
- [[📋 Salesforce - Remove User (Salesforce)]] — ⚠️ DIFFERENT: this one is in Salesforce, not DIMS
