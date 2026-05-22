Tags: #dims #reference #status-codes
← [[🏠 HOME]]

---

# ⚙️ DIMS — Status Codes

Complete reference of all order status codes used in the DIMS system. Understanding these codes is essential for tracking orders through their lifecycle.

---

## Order Entry & Review

| Status | Name | Description |
|---|---|---|
| **01** | EDI Status | Order transmitted via EDI or Ariba. Must be reviewed and released by the CAC team. |
| **04** | Web Status | Order received from the web. Must be reviewed and released by the CAC team. |
| **06** | Drop Ship Status | Order placed through the Drop Ship team. Sub-statuses: **06** = Ready to generate PO · **06B** = Waiting to run hold checks · **06C** = Manually held by buyer. |
| **07** | Software Site License | Order contains a site license SKU. Held until Software Operations receives all required paperwork. |
| **08** | SWIMS Status | SWIMS-entered orders of $25,000+ (or other SWIMS factors). Contact Software Operations for assistance. |

---

## Hold Statuses

| Status | Name | Description |
|---|---|---|
| **03** | Hercules Hold | Placed by CACHELP Team when no valid hold reason is found on the hold report. |
| **11** | Rebate Hold | Rebate SKU found with a value change, SKU change, or expiration. ISR must review, adjust, and release. |
| **12** | Special Order (SKU 000000) | Order contains a 000000 SKU. Held until the SKU is re-SKUed or removed. |
| **18** | Partial Ship Hold | Product is on backorder and the order has partial ship set to "No." Released when all product is allocated or partial ship is enabled. |
| **20hsig** | Credit Card Signature Hold | Credit card orders ≥ $1,000. Team Leads may release once customer authorization is received. |
| **21** | Credit Hold | Customer is at or over their credit limit. Credit Analyst must authorize release. |
| **21Q** | Pre-Sale – QC Review | Awaiting review by QC Analyst. |
| **21M** | Pre-Sale – Mismatch Hold | Order does not match the PO. |
| **21N** | Pre-Sale – Needs PO Hold | Order does not have a hard copy PO. |
| **22** | Collections Hold | Customer is behind on invoice payments. Accounts Receivable Analyst must authorize release. |
| **27** | Switchout Status | Pick ticket cancelled at warehouse and returned for correction. ISR must release after corrections are made. |
| **33** | Account Manager Rep Hold | "HD" is in the ship-via field. Released once a carrier is selected. |
| **36** | Low Margin Hold | Order margin is at or below the acceptable threshold. Team Leads may release. |
| **37** | Companion Order Hold | Order is waiting to ship with a companion order. Must ship from the same DC with matching ship-to info. |

---

## Processing & PPS Generation

| Status | Name | Description |
|---|---|---|
| **10** | PPS Not Generated | Starting status for CompuCom warehouse orders. Partial-ship orders remain here until fully shipped. Also used for Drop Ship orders once a PO is cut (remains until invoiced). |
| **24** | In Process | Order has allocated and passed all hold checks; queued for PPS generation. |
| **25** | PPS Generated | PPS generated; waiting for WIMS stacker to move it to status 40. |
| **40** | Pick Ticket Generated | WIMS has picked up the order; moved from status 25. |
| **41** | Pick Ticket Generated (Pre-Config) | Same as 40 but order is placed in the pre-config queue. |

---

## Warehouse — Picking & Assembly

| Status | Name | Description |
|---|---|---|
| **50** | Being Picked | Order is actively being picked in the warehouse. |
| **55** | Fully Picked | All product picked; moved to assembly. Routes to **65** (pick & pack) or **57** (config needed). |
| **57** | Staging | Order assembled and moved to the staging area in the config room. |
| **58** | Industry View | WIMS/IV MOL Gen Stacker creates mol files. Once all units reach the PACKING station in IV, order advances to status 59. |
| **59** | Ready to Advance | Pick ticket ready to move to status 60 or 65. |

---

## Configuration

| Status | Name | Description |
|---|---|---|
| **60** | Config Room – Idle | Pick ticket in the config room but not actively being worked on. |
| **61** | In Configuration | Order is on the bench with a technician. De-config charges may apply if kicked back from this point. |
| **62** | Configuration Problem | Technician encountered an issue. Held until Account Manager provides resolution; then returns to 61. |
| **63** | Burned In | Product has completed the burn-in stage. |
| **64** | Configuration Completed | Config process done; waiting to move to shipping lanes. |

---

## Shipping & Invoicing

| Status | Name | Description |
|---|---|---|
| **65** | In Shipping Lane | Order ready for boxing/palletizing. Last stage at which an order can be pulled back. |
| **70** | Packed & Scanned | Order boxed, scanned, and in the first stages of invoicing. |
| **80** | Invoiced & Shipped | Order has completed final invoicing and has shipped. |

*Source: DIMS_STATUS_CODES_3.pdf*

---

## See Also

- [[⚙️ DIMS - Commands]]
- [[⚙️ DIMS - Order Types]]
- [[📋 DIMS - Change Order Status (DIMS)]]
- [[📋 DIMS - Electronic Hold (Connect Portal)]]
