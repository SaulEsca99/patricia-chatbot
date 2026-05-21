# 📋 DIMS — Electronic Hold (Geocoding)

Tags: #dims #process #electronichold #geocoding #ticket

← [[🏠 HOME]] | [[⚙️ DIMS - Commands]]

---

## What is an Electronic Hold?

![[assets/doc-electronic-hold.png]]

**Geocode** verifies whether an order's address corresponds to a real and valid location. The system does this automatically when processing orders.

When the system cannot automatically resolve the address, the order goes into **Electronic Hold** and the error appears in DIMS.

---

## Error — "Multiple Geo Codes for Zipcode"

### How it looks in DIMS

When reviewing an order with `S` (holds) inside `ESS 49`, you'll see the order is blocked. The specific message is:

```
Order XXXXXXXXX is on electronic hold with Multi Geo-Codes for Zipcode
```

### What NOT to do
❌ Don't try to resolve it manually in DIMS — you don't have the tools

### What to do
Create a support ticket and send it to **Ahmad** with the order information.

---

## Step by Step

### STEP 1 — Identify the affected order

In DIMS (ESS 49), when reviewing holds with `S`, identify:
- The affected **order number**
- The problematic **zip code**
- Confirm the message is "Multi Geo-Codes for Zipcode"

### STEP 2 — Create the support ticket

> 📋 **Copy and paste — only modify the order number:**

**Ticket title:**
```
Electronic Hold
```
*(Do not modify the title — it's always exactly this)*

**Ticket body:**
```
Order [ORDER_NUMBER] is on electronic hold with
Multi Geo-Codes for Zipcode

Please address and assign to product systems as P3
```
*Example: `Order 111192335 is on electronic hold with Multi Geo-Codes for Zipcode. Please address and assign to product systems as P3`*

**Where is this happening:** select `Somewhere Else`

![[assets/ticket-geocodificacion-electronic-hold.jpeg]]

### STEP 3 — Send the ticket to Ahmad

- Send the ticket to **Ahmad** with the complete order information
- Assign as **P3** (medium priority — standard level for this type of incident)
- Ahmad will resolve the geocoding issue

---

## Flow Diagram

```
Review holds in ESS 49 → command S
        ↓
Appears: "Electronic Hold - Multi Geo-Codes for Zipcode"
        ↓
Document: order number + zip code + exact message
        ↓
Create ticket:
  Title: "Electronic Hold"
  Body: "Order XXX is on electronic hold with
         Multi Geo-Codes for Zipcode.
         Please address and assign to product systems as P3"
        ↓
Send to Ahmad (P3)
        ↓
✅ Ahmad resolves the geocoding issue
```

---

## Additional Context

- This error occurs because the zip code has multiple possible geocodes in the system database
- It's not a data entry error — it's a system issue that only the technical team can resolve
- Priority is **P3** because there's urgency but it's not critical

---

## See Also

- [[⚙️ DIMS - Commands]] — ESS 49, S for viewing holds
- [[🔐 Access Requests]] — How to create tickets correctly
- [[👥 Team Contacts]] — Ahmad's contact information
