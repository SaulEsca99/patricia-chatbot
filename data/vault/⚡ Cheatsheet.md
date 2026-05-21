# ⚡ Cheatsheet — Quick Reference

Tags: #cheatsheet #reference #quick

← [[🏠 HOME]]

---

## DIMS Commands

| Command | What it does |
|---|---|
| `ESS 1` | Edit/query mode (real-time) |
| `ESS 49` | Read-only — view order history & status |
| `F` | Search for an order |
| `T` | Detailed order status |
| `S` | View holds on the order |
| `R` | Customer SKU info |
| `UTIL 3` | Force status change (push) |
| `pm 4 8` | Drop Ship Release |
| `fr 2` | Freight Administration Profile |
| `CC15` | Access customer account |
| `F4` | Exit |
| `Shift + Insert` | Paste |
| `Ctrl + Insert` | Copy |
| `Ctrl + C` | Close interface |

---

## Order Prefixes

| Prefix | Source |
|---|---|
| `A` | Ariba (SAP) |
| `E` | EDI (Spreadsheet) |
| `S` | Marketplace |
| `P` | PAT / Internal |
| Numbers | DIMS direct |

---

## Warehouse Codes

| Code | Location |
|---|---|
| `102` | US — physical warehouse |
| `122` | Canada — physical warehouse |
| `143` | Virtual — Drop Ship (vendor direct) |

---

## Ticket Templates

### Electronic Hold
```
Title: Electronic Hold
Body: Order [ORDER_NUMBER] is on electronic hold with
Multi Geo-Codes for Zipcode
Please address and assign to product systems as P3
Where: Somewhere Else
```

### Kill User
```
Title: Kill User [USER_ID] Order [ORDER_NUMBER]
Body: Please kill user [USER_ID] and release order [ORDER_NUMBER].
Please assign to CMPC - Data Center Ops
P 3
Where: Somewhere Else
```

### DIMS Access
```
Title: DIMS Access Request - [Your Name]
Body: I am a new intern on PAT. I need access to DIMS (sNetTerm).
Please assign to infosec.
My user is: [your_user]
My manager is: [manager_name]
```

### Network Drive Access
```
Title: Network Drive Access Request
Body:
\\spw099nas02g\ClickOnePD
\\spw099nas02v\ClickOneQC
\\sp099nas01r\Applications\UNIX\Applications\DIMS\costchanges
Please assign to infosec, my user is [your_user]
```

### SAML SSO Update
```
Title: SAML SSO Update - [Client Name]
Body:
Customer [CLIENT] is experiencing SSO login issues.
Account/Hub: [ACCOUNT]
SSO Domain: [DOMAIN]
New Metadata URL: [URL]
Please update the SAML configuration.
```

---

## Key Contacts Quick Reference

| Person | For what |
|---|---|
| **Fernando Blengio** | Salesforce access, Q-Lookup, ZZZ Corp |
| **Priyanka Musuku** | SAML/SSO tickets |
| **Ahmad** | Electronic Hold / geocoding |
| **CMPC - Data Center Ops** | Kill User execution |

---

## Stock Codes

| Code | Meaning |
|---|---|
| `8` | Completely discontinued |
| `7` | Discontinued but still with inventory |

---

## Priority Levels

| Level | When to use |
|---|---|
| **P3** | Most tickets (medium urgency) |
| **P1** | System is completely down |
| **P2** | Specific area not working |
