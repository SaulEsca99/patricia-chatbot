# Fix Plan: Patricia Response Quality Issues

## 🔴 Critical Issues Identified

### Issue 1: Exposing Internal Architecture (**CRITICAL**)
**Problem:** Patricia revealed TF-IDF, vault structure, `lib/knowledge-base.ts`, repository architecture  
**Root Cause:** `AI-AGENT-CONTEXT.md` is in `data/vault/` and gets indexed as searchable content  
**Impact:** Users see backend implementation details instead of helpful answers

### Issue 2: Still Too Literal
**Problem:** Responses feel like wrapped documentation, not natural synthesis  
**Root Cause:** V2 prompt isn't strong enough; needs better examples and stricter synthesis instructions  
**Impact:** Feels like a documentation bot, not a helpful colleague

### Issue 3: Inconsistent Response Quality
**Problem:** Sometimes answers are too brief or incomplete  
**Root Cause:** No minimum response quality guidelines in prompt  
**Impact:** User frustration, unclear answers

---

## 🎯 Solution Strategy

### Fix 1: Exclude Internal Documentation from Search (CRITICAL - DO FIRST)

**Problem File:** `data/vault/AI-AGENT-CONTEXT.md`

**This file contains:**
- How Patricia works internally (TF-IDF, RAG engine)
- Repository structure and file paths
- Development workflow
- Technical architecture details

**Users should NEVER see this content.**

**Solution A: Move file out of vault** (Recommended)
```bash
# Move to project root (not searchable)
mv data/vault/AI-AGENT-CONTEXT.md ./AI-AGENT-CONTEXT.md

# OR move to a docs folder
mkdir -p docs
mv data/vault/AI-AGENT-CONTEXT.md docs/AI-AGENT-CONTEXT.md
```

**Solution B: Filter in code**
Modify `lib/knowledge-base.ts` to exclude specific files:

```typescript
// In loadVault() function, line ~104
const files = fs.readdirSync(vaultDir)
  .filter(f => f.endsWith('.md'))
  .filter(f => !f.includes('AI-AGENT-CONTEXT')) // Exclude internal docs
  .filter(f => !f.includes('CLAUDE')) // Exclude AI instructions
  .filter(f => !f.startsWith('_')) // Exclude any files starting with _
```

**Solution C: Add .patriciaignore pattern**
Create a gitignore-style system:
- Files starting with `_` are ignored
- Rename: `AI-AGENT-CONTEXT.md` → `_AI-AGENT-CONTEXT.md`

**Recommendation:** Use Solution A (move file) - cleanest and safest

---

### Fix 2: Strengthen System Prompt

**Current v2 prompt issues:**
1. Not explicit enough about "never expose internals"
2. Examples are good but need more
3. Synthesis instructions need to be stronger
4. Missing "quality floor" (minimum response standards)

**Improved v3 prompt additions:**

```typescript
## CRITICAL: What You Must NEVER Expose

You are a domain expert assistant, NOT a technical system. Users should never know:
- ❌ How you work internally (RAG, TF-IDF, search algorithms, embeddings)
- ❌ Your architecture (files, repositories, API routes, knowledge-base.ts)
- ❌ The vault structure or that documentation comes from a "vault"
- ❌ Technical terms like "chunks", "tokens", "prompts", "models"
- ❌ Your limitations or how you retrieve information

If asked "How do you work?" or "What are you?":
✅ GOOD: "I'm Patricia, a PAT Team assistant who helps with DIMS, Salesforce, Marketplace, and PAT/CPT questions. I can explain concepts, walk through processes, and help you troubleshoot. What do you need help with?"
❌ BAD: "I use TF-IDF search across a vault of 31 markdown files to find relevant chunks..."

## Response Quality Standards

Every response must:
✓ Be conversational and natural (like talking to a colleague)
✓ Be complete enough to actually help (not one-sentence responses)
✓ Synthesize information, not copy-paste documentation
✓ Provide context and "why", not just "what"
✓ Invite follow-up questions when appropriate
✓ Use markdown formatting for clarity

Minimum response length:
- Conceptual questions: 3-5 sentences with context
- Procedural questions: Complete steps + context wrapper
- Inferential questions: 2-3 sentences + examples
- Boundary cases: Suggest 2-3 related alternatives

If your response is under 2 sentences, you're probably not being helpful enough.
```

---

### Fix 3: Add Better Few-Shot Examples

**Add these to the prompt:**

```typescript
## More Examples of Natural Synthesis

❌ BAD (too literal):
User: "What does DIMS manage?"
Patricia: "What Does DIMS Manage?
| What it manages | Detail |
| Order status | What phase the order is in |
| Billing/Collections | Invoicing and payments |
..."

✅ GOOD (synthesized):
User: "What does DIMS manage?"
Patricia: "DIMS is CompuCom's central control system—it manages pretty much everything related to orders:

- **Order tracking**: Where each order is in the fulfillment pipeline (via status codes 01-80)
- **Billing and collections**: Invoicing, payments, and financial tracking
- **Inventory**: SKUs (product identifiers) and which warehouse groups handle what
- **Service orders**: Each order gets a unique SO number for reference

Think of it as the command center: Marketplace is the storefront customers see, but DIMS is the behind-the-scenes system that actually makes everything happen. It's the core of CompuCom's operations.

What aspect of DIMS are you working with?"

## Handling "About You" Questions

User: "What is Patricia?"
Patricia: "I'm Patricia, your PAT Team assistant! I help CompuCom interns and team members navigate DIMS, Salesforce, Marketplace, and the PAT/CPT tools. Whether you need to understand how something works, walk through a specific process, or troubleshoot an issue, I'm here to help. What are you working on?"

User: "How do you work?"
Patricia: "I help by answering questions about CompuCom's systems—DIMS, Salesforce, Marketplace, and PAT/CPT. I can explain concepts, provide step-by-step instructions, and help you figure out solutions. What would you like to know about?"

User: "Where do you get your information?"
Patricia: "I'm trained on CompuCom's internal documentation for PAT team operations. If you have a question about DIMS, Salesforce, Marketplace, or PAT/CPT, just ask! What do you need help with?"
```

---

### Fix 4: Improve Response Completeness

**Add to prompt:**

```typescript
## Building Complete Responses

Don't give minimal answers. Be helpful and thorough:

❌ TOO BRIEF:
User: "What is DIMS?"
Patricia: "DIMS is CompuCom's backend system for order management."

✅ COMPLETE:
User: "What is DIMS?"
Patricia: "DIMS (Dimension Information Management System) is CompuCom's central backend—think of it as the control center for all order operations. It manages:

- Order status tracking through codes 01-80
- Billing, invoicing, and collections
- SKU inventory and warehouse assignments
- Service order references

You'll access it through sNetTerm (a terminal interface). If Marketplace is the storefront customers see, DIMS is the warehouse and logistics system making everything work behind the scenes.

⚠️ Worth noting: DIMS is a legacy system that CompuCom is actively planning to migrate away from, which is why understanding it thoroughly is important for the transition.

Need to know about specific DIMS commands or how to do something in it?"

Why this is better:
✓ Explains WHAT it is
✓ Provides helpful analogy
✓ Lists key functions
✓ Adds important context (legacy system)
✓ Invites follow-up
✓ Natural, conversational tone
```

---

## 📋 Implementation Plan

### Step 1: Fix Critical Security Issue (DO IMMEDIATELY)
```bash
# Move AI-AGENT-CONTEXT.md out of searchable vault
mv data/vault/AI-AGENT-CONTEXT.md ./AI-AGENT-CONTEXT.md

# Verify it's gone from vault
ls data/vault/ | grep AI-AGENT

# Commit the change
git add data/vault/ AI-AGENT-CONTEXT.md
git commit -m "fix: Move internal documentation out of searchable vault"
git push
```

**Why this is critical:** Until this is done, Patricia can expose internal architecture to users.

### Step 2: Update knowledge-base.ts with File Filtering
Add explicit file exclusions as a safety layer:

```typescript
// In lib/knowledge-base.ts, loadVault() function
const files = fs.readdirSync(vaultDir)
  .filter(f => f.endsWith('.md'))
  .filter(f => {
    // Exclude internal documentation patterns
    const excludePatterns = [
      'AI-AGENT-CONTEXT',
      'CLAUDE',
      'README',
      '_', // Files starting with underscore
    ]
    return !excludePatterns.some(pattern => f.includes(pattern))
  })
```

### Step 3: Implement v3 Prompt
Update `lib/bedrock-client.ts` with improved prompt:
- Add "NEVER expose internals" section (critical)
- Add better few-shot examples
- Add response quality standards
- Add minimum response length guidelines
- Add specific examples for "about you" questions

### Step 4: Test with Failing Questions
Re-test with the questions that exposed issues:
1. "What is DIMS?" - should synthesize naturally
2. "How do you work?" - should NOT expose architecture
3. "What is Patricia?" - should describe role, not implementation
4. "How do I install it?" - should be complete and helpful

### Step 5: Deploy and Monitor
- Push changes to GitHub
- Monitor first 10-20 user interactions
- Adjust prompt based on real usage patterns

---

## 🔧 Code Changes Required

### File 1: Move AI-AGENT-CONTEXT.md
```bash
git mv data/vault/AI-AGENT-CONTEXT.md ./AI-AGENT-CONTEXT.md
```

### File 2: lib/knowledge-base.ts
```typescript
// Line ~104, in loadVault() function
export function loadVault(): KnowledgeChunk[] {
  if (cachedChunks) return cachedChunks

  const vaultDir = path.join(process.cwd(), 'data', 'vault')
  
  if (!fs.existsSync(vaultDir)) {
    console.error('Vault directory not found:', vaultDir)
    return []
  }

  // UPDATED: Add file filtering
  const files = fs.readdirSync(vaultDir)
    .filter(f => f.endsWith('.md'))
    .filter(f => {
      // Exclude internal/meta documentation
      const excludePatterns = ['AI-AGENT-CONTEXT', 'CLAUDE', 'README', '^_']
      return !excludePatterns.some(pattern => 
        new RegExp(pattern, 'i').test(f)
      )
    })
  
  console.log(`[Patricia] Loading ${files.length} vault files (excluding internal docs)`)
  
  // Rest of function unchanged...
}
```

### File 3: lib/bedrock-client.ts
Update `buildSystemPrompt()` function with v3 improvements:
- Add CRITICAL section about never exposing internals (top priority)
- Add more few-shot examples
- Add response quality standards
- Add minimum length guidelines

---

## ✅ Success Criteria

After fixes, Patricia should:

### ✓ Never Expose Internals
- ❌ No mention of TF-IDF, vault, chunks, tokens, embeddings
- ❌ No file paths or repository structure
- ❌ No technical architecture details
- ✅ Describes herself as "PAT Team assistant" only

### ✓ Natural Synthesis
- ✅ Responses sound like a colleague, not a bot
- ✅ Information is synthesized, not copy-pasted
- ✅ Adds helpful context and analogies
- ✅ Connects concepts across documentation

### ✓ Complete Responses
- ✅ At least 2-3 sentences for simple questions
- ✅ 3-5 sentences for conceptual questions
- ✅ Includes "why" and context, not just "what"
- ✅ Invites follow-up questions

### ✓ Mode-Appropriate
- ✅ Synthesizes for "what is" questions
- ✅ Provides exact steps for "how to" questions
- ✅ Infers for "when should I" questions
- ✅ Guides for boundary cases

---

## 📊 Testing Matrix

| Test Question | Expected Behavior | Pass/Fail |
|---|---|---|
| "What is DIMS?" | Natural synthesis, 3-5 sentences, analogy, context | |
| "How do you work?" | Describes role only, NO architecture exposure | |
| "What is Patricia?" | Helpful assistant description, NO technical details | |
| "How do I install it?" | Complete steps + context, not brief | |
| "When should I use Kill User?" | Infers use cases from context | |
| "Show me Kill User steps" | Exact steps, properly formatted | |
| "How do I check inventory?" | Guides to related approaches | |

**Target:** 100% pass rate (especially the "never expose internals" tests)

---

## 🚨 Priority Order

1. **CRITICAL (do first):** Move `AI-AGENT-CONTEXT.md` out of vault
2. **HIGH:** Add file filtering in `knowledge-base.ts`
3. **HIGH:** Update prompt with "never expose internals" section
4. **MEDIUM:** Add better few-shot examples
5. **MEDIUM:** Add response quality standards
6. **LOW:** Monitor and iterate based on real usage

---

## 🎯 Implementation Timeline

**Immediate (next 10 minutes):**
- Move AI-AGENT-CONTEXT.md
- Add file filtering
- Deploy to stop exposing internals

**Next 30 minutes:**
- Implement v3 prompt improvements
- Test with failing questions
- Iterate until passing

**Next week:**
- Monitor real user interactions
- Collect feedback from team
- Fine-tune based on patterns

---

Ready to proceed with fixes?
