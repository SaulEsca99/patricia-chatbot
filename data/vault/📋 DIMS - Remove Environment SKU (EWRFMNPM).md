Tags: #dims #case #ewrfmnpm #sku
← [[🏠 HOME]]

---

# 📋 DIMS — Remove Environment SKU

Procedure to remove an environmental recycling fee from a specific SKU using the EWRFMNPM (Electronic Waste Recycling Fee Maintenance) menu in DIMS.

---

## Overview

Some SKUs have environmental recycling fees applied to them. When a SKU should be exempt from this fee, you need to update the exception field in the EWRFMNPM menu.

---

## Procedure

### STEP 1 — Enter EWRFMNPM

Enter the Electronic Waste Recycling Fee Maintenance menu by typing **`EWRFMNPM`** in DIMS.

![[assets/doc-dims-ewrfmnpm-menu.png]]

### STEP 2 — Search Environmental SKU

Press **Ctrl+F** to search for the environmental SKU, then press **S** to see related SKUs.

![[assets/doc-dims-ewrfmnpm-search.png]]

### STEP 3 — Find SKU to Modify

Search for the specific SKU to modify with **Ctrl+F**.

![[assets/doc-dims-ewrfmnpm-sku-search.png]]

### STEP 4 — Update Exception

When locating the SKU, press **U** to update exceptions applied to the SKU and **leave the blank space**, pressing Enter. This will make the SKU not affected by the fee.

![[assets/doc-dims-ewrfmnpm-update.png]]

### STEP 5 — Verify

To verify, enter the SKU again and check that the **Exception** field is set to **Exempt**.

![[assets/doc-dims-ewrfmnpm-verify.png]]

---

## Quick Reference

| Command | Action |
|---|---|
| `EWRFMNPM` | Open Environmental Fee Maintenance |
| `S` | View related SKUs |
| `F` | Search for specific SKU |
| `U` | Update exception for SKU |

---

## See Also

- [[⚙️ DIMS - Commands]]
- [[⚙️ DIMS - Overview]]
