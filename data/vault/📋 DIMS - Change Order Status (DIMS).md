# 📋 DIMS — Change Order Status (PUSH)

Tags: #dims #process #util3 #status #push

← [[🏠 HOME]] | [[⚙️ DIMS - Commands]]

---

## What is This Process?

When an order is stuck at a certain status in DIMS and needs to advance to the next phase, you can use the **UTIL 3** command to force a status change (push it through).

---

## Step by Step

![[assets/doc-dims-util3-push.png]]

### STEP 1 — Enter DIMS and use UTIL 3

1. Open the DIMS interface (sNetTerm)
2. Type the command: `util 3`

### STEP 2 — Enter the Order Number

1. In the **"Order-no"** field, type the order number
2. Press **Enter**
3. The system will display order details: **Whs-alloc**, **Order Status**, and **CD-CODE**

### STEP 3 — Push the Status

In this example, the current status is **06B**. We need to move it to **STATUS 07**:

1. Press **Enter** twice
2. The order status will change

> 🚨 **NOTE:** Status Code `06B` = Waiting to run through hold checks.

> 🚨 **NOTE:** When you don't know the CD CODE, create a ticket assigned to **PSSKU** or **Product Systems**.

---

## When to Create a Ticket Instead

If the status change fails or you encounter an unknown CD CODE:

> 📋 **Copy and paste:**

**Ticket title:**
```
Order Status Change - Order [ORDER_NUMBER]
```

**Ticket body:**
```
Order [ORDER_NUMBER] is stuck at status [CURRENT_STATUS] with CD CODE [CD_CODE].
Unable to push through with UTIL 3.

Please review and assign to Product Systems as P3.
```

---

## See Also

- [[⚙️ DIMS - Commands]] — All DIMS commands including UTIL 3
- [[📋 DIMS - Electronic Hold (Connect Portal)]] — Another type of blocked order
