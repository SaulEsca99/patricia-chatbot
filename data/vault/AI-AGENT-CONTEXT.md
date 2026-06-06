# AI Agent Master Context — CompuCom PAT Documentation System

> **READ THIS FIRST.** This document explains the full architecture, reasoning, and history of the CompuCom PAT documentation system. It is intended for any AI assistant (Claude, Gemini, etc.) that needs to continue work on this project. Read every section before making any changes.

---

## 1. Who You Are Working With

You are working with a **Product Assistance Team (PAT) intern at CompuCom**. The user:

- Works at CompuCom's IT services company supporting enterprise clients
- Has a **corporate Claude account** (Enterprise), so they may switch machines and need the AI to always have full context
- Manages two GitHub repositories as part of this project (explained below)
- Wants all documentation written in **English** (the vault is in English)
- Prefers a very hands-on approach: no planning documents, just execute and ship

---

## 2. The Problem Being Solved

CompuCom's PAT team onboards new interns regularly. The team works across 4+ complex internal systems (DIMS, Salesforce, Marketplace, PAT/CPT). Before this project:

- There was **no single place** to learn how to do things
- New interns constantly asked managers for help on basic operations
- Documentation existed only as Notion exports — unstructured, hard to search, no images
- There was no intelligent assistant to answer operational questions

**The solution** is a two-part system:
1. A structured **Obsidian knowledge base** (for reading and maintenance)
2. A **web chatbot called "Patricia"** (for instant Q&A, deployed on Vercel)

---

## 3. The Two GitHub Repositories

This is the most important thing to understand. There are **two separate repositories** with different purposes:

---

### Repository 1: `SaulEsca99/Compucom-Brain`

**Purpose:** The Obsidian vault — the structured knowledge base.

**Local path:** `/home/cyborg-15/Escritorio/compucom vault/obsidian compucom/`

**What's inside:**
```
Compucom-Brain/
├── 00-Home/            ← Master entry point + cheatsheet
├── 01-DIMS/            ← DIMS system docs (11 notes)
├── 02-Salesforce/      ← Salesforce docs (7 notes)
├── 03-Marketplace/     ← Marketplace docs (2 notes)
├── 04-PAT/             ← PAT/CPT tool docs (6 notes)
├── 05-Glossary/        ← Technical terms glossary
├── 06-Contacts/        ← Team contacts
├── 07-Access/          ← Access request templates
├── assets/             ← All screenshots (121 images)
├── CLAUDE.md           ← AI instructions for this vault
└── AI-AGENT-CONTEXT.md ← THIS FILE
```

**Who uses it:**
- New interns clone it and open it in Obsidian for offline reading
- Team members edit it when procedures change
- `git pull` to get updates, `git push` to share new notes

**Branches:** `main` (English) | `spanish` (Spanish version — exists but not the primary)

**How to push changes:**
```bash
cd "/home/cyborg-15/Escritorio/compucom vault/obsidian compucom"
git add .
git commit -m "your description"
git push origin main
```

---

### Repository 2: `SaulEsca99/patricia-chatbot`

**Purpose:** The "Patricia" web chatbot — AI assistant powered by the vault knowledge.

**Local path:** `/home/cyborg-15/Descargas/compu-com-brain-app/`

**Tech stack:** Next.js 14 + TypeScript + Tailwind CSS + Vercel deployment

**What's inside:**
```
compu-com-brain-app/
├── app/
│   ├── api/
│   │   ├── chat/route.ts    ← Main chatbot logic (TF-IDF search + answer builder)
│   │   └── note/route.ts    ← Fetches full note content for the note viewer
│   └── page.tsx             ← Root page (state management hub)
├── components/
│   ├── welcome-screen.tsx   ← Home screen with suggestion cards
│   ├── chat-view.tsx        ← Chat interface
│   ├── chat-input.tsx       ← Message input box
│   ├── sources-panel.tsx    ← Side panel listing all vault topics
│   └── note-viewer.tsx      ← Modal for reading full notes with images
├── data/vault/              ← COPY of vault notes (31 .md files)
├── lib/
│   ├── knowledge-base.ts    ← TF-IDF indexing + search engine
│   └── chat-data.ts         ← Navigation structure + suggestion cards
└── public/assets/           ← COPY of vault images (121 .png files)
```

**Deployment:** Vercel → every `git push main` auto-deploys the site.

**How to push changes:**
```bash
cd /home/cyborg-15/Descargas/compu-com-brain-app
git add .
git commit -m "your description"
git push origin main
```

---

### Why Two Repos?

| Reason | Explanation |
|---|---|
| **Separation of concerns** | Vault = human-readable docs. Chatbot = software. Different audiences, different workflows. |
| **Different update cycles** | Notes can change daily. The chatbot app code rarely changes. |
| **Obsidian compatibility** | Obsidian opens a folder as a vault. Mixing it with Next.js would break Obsidian's links. |
| **Independent deployability** | Patricia can be redeployed without touching the vault, and vice versa. |

---

### The Sync Rule

**Both repos must stay in sync.** When you add or update notes in `Compucom-Brain`, you must **also copy them** to Patricia's `data/vault/`. When images are added to `assets/`, copy them to `public/assets/`.

```bash
# After updating the vault, sync to Patricia:
cp "/home/cyborg-15/Escritorio/compucom vault/obsidian compucom/01-DIMS/New Note.md" \
   "/home/cyborg-15/Descargas/compu-com-brain-app/data/vault/"

cp "/home/cyborg-15/Escritorio/compucom vault/obsidian compucom/assets/new-image.png" \
   "/home/cyborg-15/Descargas/compu-com-brain-app/public/assets/"
```

---

## 4. How Patricia Works (Technical Deep Dive)

### 4.1 The RAG Engine — TF-IDF

Patricia does **NOT use an external AI API** (no OpenAI, no Anthropic). All intelligence is local, using a **TF-IDF (Term Frequency-Inverse Document Frequency)** search engine built in TypeScript.

**File:** `lib/knowledge-base.ts`

**How it works:**
1. At startup, it reads all `.md` files from `data/vault/`
2. Each note is split into **chunks** (by heading sections)
3. Each chunk is indexed with TF-IDF scores per word
4. When a user asks a question:
   - The query is tokenized
   - TF-IDF scores are calculated against all chunks
   - **Boost multipliers** are applied based on system type and title relevance
   - Top 8 chunks are returned
5. The `chat/route.ts` builds an intelligent answer from those chunks

**Why TF-IDF instead of an LLM?**
- No API costs
- Works offline / on edge
- Instant response (no latency)
- Fully controllable — you know exactly what it returns
- Can be upgraded to Bedrock/Claude later (the system is designed for this)

**Future upgrade path (when ready):**
```
Set in Vercel Environment Variables:
BEDROCK_ENABLED=true
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
```
This would route responses through Amazon Bedrock (Claude) instead of TF-IDF.

---

### 4.2 The Note Viewer

When users click on a source link in Patricia's response (or browse Sources panel), the note viewer opens. It:
1. Calls `GET /api/note?title=Note+Name`
2. The API reads the `.md` file from `data/vault/`
3. Converts **Obsidian image syntax** (`![[assets/image.png]]`) → standard markdown (`![alt](/assets/image.png)`)
4. Returns the markdown, which is rendered in the modal with full image support

**Important:** Images only render if they exist in `public/assets/`. Always copy images when adding notes.

---

### 4.3 The Sources Panel

`lib/chat-data.ts` contains the `knowledgeSources` array — the navigation structure for the sidebar. Every time a new note is added to the vault AND Patricia, this file must be updated to add the new entry so users can browse to it.

**Pattern to follow:**
```typescript
{ id: 'dims-status-codes', name: 'Status Codes' }
```
The `id` maps to the note title used in the API. The `name` is the display label.

---

## 5. Content — What's Documented

### 5.1 Vault Note Count: 31 notes + 121 images

### 5.2 Covered Systems

| System | Notes | Key Content |
|---|---|---|
| **DIMS** | 11 | Overview, Installation (sNetTerm), Commands, Order Types, Status Codes, Electronic Hold, Kill User, Change Order Status, Account Profile, Update VIA Codes, Remove Environment SKU (EWRFMNPM) |
| **Salesforce** | 7 | Overview, Initial Setup, Change Owner Queue, Change Multiple Owner, B2B User Group, User Rights, Remove User |
| **Marketplace** | 2 | Overview, SAML Authentication |
| **PAT/CPT** | 6 | Overview (with Stock Codes/Rule Types/Calc Types tables), Create Price Rule, Remove SKU, Update SKUs, Add Valid Sales, New User |
| **Reference** | 4 | Glossary (~70 terms), Team Contacts, Access Requests, Cheatsheet |

---

### 5.3 What Each System Is

**DIMS (Dimension Information Management System)**
- The core backend of CompuCom. Accessed via sNetTerm (SSH terminal emulator).
- Manages orders, their statuses, customer accounts, SKUs, freight/shipping
- Every order has a status code (01–80) that tracks its lifecycle
- Common commands: `ESS1`, `ESS49`, `util 3`, `fr 2`, `EWRFMNPM`, `pm 4 8`

**Salesforce**
- CRM used for case management
- PAT team works the "Commerce Storefront Console → PAT Queue"
- Cases come in and get routed to the right CC# queue based on Q-Lookup sheet
- Key operations: changing case owners, managing B2B users, assigning user groups

**Marketplace**
- Customer-facing e-commerce portal: `https://marketplace.compucom.com`
- Integrated with DIMS for order processing
- ZZZ Corp = test/demo environment for validating customer-facing features

**PAT Tool (Product Assistance Team)**
- Internal tool at `https://pat.compucom.local`
- Manages **CPT (Customer Pricing Tool)** — pricing rules per customer
- Price rules determine what SKUs a customer sees and at what price
- Rule hierarchy: SKU Number > Vendor-Product Group > ... > Stock Code Only

---

## 6. Documentation Workflow

### Adding a New Note

1. **Create the note in Obsidian vault** (follow naming conventions in `CLAUDE.md`)
2. **Copy images** from `DOCUMENTATION/` export folder → `assets/` with descriptive names
3. **Push to `Compucom-Brain`**
4. **Copy note** → `compu-com-brain-app/data/vault/`
5. **Copy images** → `compu-com-brain-app/public/assets/`
6. **Update `lib/chat-data.ts`** — add the new entry to `knowledgeSources`
7. **Push to `patricia-chatbot`**

### Importing from Notion Export

When the user exports from Notion, the export creates:
- A `.md` file with content (uses Notion-flavored markdown)
- A `DOCUMENTATION/` folder with images named `image 1.png`, `image 2.png`, etc.

**Your job when importing:**
1. Parse the export to find **sections not yet in the vault**
2. Convert Notion-format content to clean Obsidian markdown (remove `<aside>` blocks → `> ⚠️ NOTE:`)
3. Copy images with **descriptive names** (NOT `image 1.png` — use `doc-dims-via-codes-list.png`)
4. Create proper notes following vault structure conventions

---

## 7. Obsidian Vault Conventions

**File naming:**
- Process notes: `📋 SYSTEM - Action (Tool).md`  →  e.g., `📋 DIMS - Update VIA Codes (Freight ID).md`
- Overview notes: `⚙️ DIMS - Overview.md`, `💼 Salesforce - Overview.md`
- Reference notes: `📖 Glossary.md`, `⚡ Cheatsheet.md`

**Emoji conventions:**
- `⚙️` → DIMS (system/technical)
- `💼` → Salesforce (business)
- `🛒` → Marketplace
- `🔧` → PAT Tool
- `📋` → Any process/case note
- `📖` → Glossary / Reference
- `🏠` → Home
- `🔐` → Access / Security

**Internal linking:**
- Use `[[Note Name]]` — NO file paths
- Every note links back to `[[🏠 HOME]]`
- Every note has a `## See Also` section at the bottom

**Images:**
- Stored in `assets/` at repo root
- Referenced as `![[assets/image-name.png]]` in Obsidian
- Patricia converts this to `/assets/image-name.png` for web rendering

---

## 8. Current State (as of June 2026)

### What is Working
- ✅ Patricia chatbot deployed on Vercel (auto-deploys on push)
- ✅ TF-IDF search across 31 notes
- ✅ Note viewer with full image rendering
- ✅ Sources panel with all 31 notes browseable
- ✅ Home button in chat header (logo click → resets to home)
- ✅ Scroll in sources panel (native browser scroll)
- ✅ Chat input vertically centered (line-height: 24px, padding: py-[6px])
- ✅ 121 images served from `public/assets/`
- ✅ Compucom-Brain vault on GitHub (current, synced)

### Known Limitations / Future Work
- ⚠️ Patricia uses TF-IDF, not a real LLM — complex multi-turn conversations are limited
- ⚠️ Images in notes only work if manually copied to `public/assets/`
- ⚠️ `spanish` branch in Compucom-Brain exists but needs updating
- 💡 Amazon Bedrock integration is designed-in — just needs credentials + `BEDROCK_ENABLED=true`
- 💡 A formal CI script could automate the vault → Patricia sync

---

## 9. Key File Locations Quick Reference

| File | Path | Purpose |
|---|---|---|
| Vault root | `/home/cyborg-15/Escritorio/compucom vault/obsidian compucom/` | Obsidian vault |
| Patricia root | `/home/cyborg-15/Descargas/compu-com-brain-app/` | Next.js chatbot |
| Chat API | `compu-com-brain-app/app/api/chat/route.ts` | Answer generation |
| Note API | `compu-com-brain-app/app/api/note/route.ts` | Note retrieval + image conversion |
| TF-IDF engine | `compu-com-brain-app/lib/knowledge-base.ts` | Search engine |
| Nav structure | `compu-com-brain-app/lib/chat-data.ts` | Sidebar navigation |
| Vault notes | `compu-com-brain-app/data/vault/` | 31 markdown files |
| Images (web) | `compu-com-brain-app/public/assets/` | 121 PNG files |
| Images (vault) | `obsidian compucom/assets/` | 121 PNG files |
| AI instructions | `obsidian compucom/CLAUDE.md` | Vault-specific rules |

---

## 10. Rules You Must Follow

1. **Always update both repos** when adding notes — never just one
2. **Never use AI filler text** — write documentation like an experienced coworker
3. **Never rename existing files** from outside Obsidian — internal links would break
4. **Always use descriptive image names** — not `image1.png`
5. **Update `chat-data.ts`** every time a new note is added to Patricia
6. **Test locally** before pushing: `cd compu-com-brain-app && npm run dev`
7. **Commit messages** should be descriptive: `feat:`, `fix:`, `docs:` prefixes
8. **Don't break existing notes** — read before editing
9. **Content language is English** (the `main` branch)

---

*This document is maintained by the PAT Team lead. Last updated: June 2026.*
*For questions about the codebase, read `CLAUDE.md` in the vault root.*
