# ⚙️ DIMS — Commands & Daily Usage

Tags: #dims #commands #ess #shortcuts

← [[🏠 HOME]] | [[⚙️ DIMS - Overview]]

---

## Main Entry Screens

| Command | Description |
|---|---|
| `ESS 1` | Work on the order in real time (edit mode) |
| `ESS 49` | Work exclusively with order history — read-only view to review order status |

> 💡 **Daily workflow:** You'll use `ESS 49` most often to check orders. Use `ESS 1` only when you need to make changes.

---

## Navigation & Search Commands

| Command | What it does |
|---|---|
| `F` | Search for an order |
| `T` | Display detailed status information for the order being reviewed |
| `S` | Within ESS49, review the types of holds on the order |
| `R` | Display information related to the customer's SKUs |
| `Tab` | Navigate within DIMS |
| `F4` | Exit command |

---

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Shift + Insert` | Paste the order number |
| `Ctrl + Insert` | Copy the information |
| `Ctrl + C` | Close the interface |

---

## Action Commands

| Command | Description |
|---|---|
| `UTIL 3` | Force status change and push the order through. See [[📋 DIMS - Change Order Status (DIMS)]] |
| `pm 4 8` | **Drop Ship Release** — Buyers Team queue. Releases the order so the buyer can process it with the vendor. `pm` = product manager, `4 8` = Drop Ship Released |
| `kill user` | Delete a user session and release a blocked order. See [[📋 DIMS - Kill User (Connect Portal)]] |
| `fr 2` | Freight Administration Profile |
| `CC15` | Access the customer account |

---

## EWRFMNPM — Environmental Fee Maintenance

| Command | Description |
|---|---|
| `EWRFMNPM` | Electronic West Recycling Fee Maintenance menu |
| `EWRFMNPM` → `S` | Review the SKUs |
| `EWRFMNPM` → `S` → `F` | Search for a specific SKU |
| `EWRFMNPM` → `S` → `U` | Update the environmental SKU |

---

## Mass Change Owner Criteria

When doing a mass **Change Owner** from DIMS (for multiple cases of the same client):

1. All cases must belong to the **same client**
2. All cases must be the **same case type**
3. Only then can you do a bulk selection

---

## Stock Codes

| Code | Meaning |
|---|---|
| `8` | Completely discontinued item |
| `7` | Discontinued but still with inventory |

---

## See Also

- [[⚙️ DIMS - Overview]] — System overview and environments
- [[⚙️ DIMS - Order Types]] — Order types, CSP, fulfillment
- [[📋 DIMS - Electronic Hold (Connect Portal)]] — What to do with geocoding errors
- [[📋 DIMS - Kill User (Connect Portal)]] — How to kill a user session
- [[📋 DIMS - Change Order Status (DIMS)]] — How to push an order (UTIL 3)
