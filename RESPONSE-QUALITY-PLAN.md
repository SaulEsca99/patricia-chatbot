# Patricia Response Quality Improvement Plan

## 🔍 Problem Analysis

### Current Behavior (Issues Identified)

**Problem 1: Over-literal responses**
- System prompt says: "Answer ONLY using information from the sources above"
- This causes Patricia to copy-paste from docs instead of synthesizing
- She can't infer, deduce, or connect concepts across documents
- Users get documentation dumps instead of helpful answers

**Problem 2: No reasoning instructions**
- No guidance on WHEN to be literal vs. when to synthesize
- No examples showing good vs. bad response patterns
- No instruction to think through the user's actual need

**Problem 3: Missing context awareness**
- Doesn't distinguish between:
  - Conceptual questions ("What is DIMS?") → needs synthesis
  - Procedural questions ("How do I kill a user?") → needs exact steps
  - Template requests ("Show me the ticket format") → needs literal copy

### Desired Behavior

**Good Response Patterns:**

| Question Type | Example | Expected Behavior |
|---|---|---|
| **Conceptual** | "What is DIMS?" | Synthesize from multiple sources, explain in natural language |
| **Exploratory** | "How does order processing work?" | Connect concepts across docs, explain flow |
| **Inferential** | "Why would I use Kill User?" | Deduce from context clues in documentation |
| **Procedural** | "How do I kill a user?" | Provide exact steps from docs, preserve structure |
| **Template** | "Show me a ticket format" | Copy template verbatim, maintain formatting |
| **Troubleshooting** | "My order is stuck" | Infer likely causes, suggest related solutions |

---

## 🎯 Solution Strategy

### Phase 1: Improve System Prompt (Core Fix)

**Current prompt problems:**
```
Line 59: "Answer ONLY using information from the sources above"
Line 60: If not in sources, say "I don't have that information"
```

**New prompt approach:**
```
You are Patricia, an intelligent PAT Team assistant who UNDERSTANDS the documentation deeply.

Your role is to:
1. UNDERSTAND the user's actual need (not just literal question)
2. SYNTHESIZE information from sources naturally
3. INFER and DEDUCE when appropriate
4. Be PRECISE when user needs exact steps/templates
5. GUIDE users to related info when their exact question isn't covered

Knowledge vs. Verbatim Rule:
- Use docs as your KNOWLEDGE BASE to understand the domain
- Answer naturally in your own words, like an experienced colleague
- EXCEPTION: When user asks for specific formats (templates, steps, commands), provide them exactly as documented
```

### Phase 2: Add Reasoning Instructions

**Add meta-cognitive prompting:**
```
Before answering, think:
1. What is the user really trying to accomplish?
2. Is this conceptual (synthesize) or procedural (be exact)?
3. Can I infer from related information if exact answer isn't present?
4. What would be most helpful: explanation, steps, or guidance?
```

### Phase 3: Add Few-Shot Examples

**Show Claude what good responses look like:**

```
Example 1 - Conceptual (SYNTHESIZE):
User: "What is DIMS?"
Bad: [copies entire overview doc]
Good: "DIMS (Dimension Information Management System) is CompuCom's core backend for order management. It's accessed via sNetTerm and handles everything from order creation to shipping. Think of it as the central hub where orders flow through various status codes (01-80) as they progress from placement to fulfillment."

Example 2 - Procedural (BE EXACT):
User: "How do I do a Kill User?"
Good: [Provide exact steps from documentation, numbered, with tool names]

Example 3 - Inferential (DEDUCE):
User: "When would I need to use Kill User?"
Good: "Based on the documentation, Kill User is typically used when an order is stuck or needs to be canceled during processing. It's a way to reset the order state in DIMS. You'd use this when standard cancellation isn't working or when you need to forcefully close an order."
(Note: This answer is INFERRED from the context, not stated explicitly)

Example 4 - Template (LITERAL):
User: "Show me the ticket format for Kill User"
Good: [Copy exact template from docs with all fields]
```

### Phase 4: Add Boundary Handling

**For truly unknown topics:**
```
Instead of: "I don't have that information"
Say: "I don't see specific documentation on [topic], but here's what might be related: [suggest closest concepts]. Or you might find more info in [system name]. Would you like me to explain any of these related topics?"
```

---

## 📝 Implementation Plan

### Step 1: Create Test Scenarios

Create a test suite with 15 questions across different types:

**Conceptual Questions (synthesis needed):**
1. "What is DIMS?"
2. "How does order processing work?"
3. "What's the difference between DIMS and Marketplace?"

**Procedural Questions (exact steps needed):**
4. "How do I do a Kill User?"
5. "How do I change an order status?"
6. "How do I install sNetTerm?"

**Inferential Questions (deduction needed):**
7. "When should I use Kill User?"
8. "Why would an order be in status 45?"
9. "What causes an Electronic Hold?"

**Template Requests (literal copy needed):**
10. "Show me a Kill User ticket template"
11. "What's the format for a PAT ticket?"

**Troubleshooting Questions (guidance needed):**
12. "My order is stuck, what should I do?"
13. "I can't change the owner in Salesforce"

**Edge Cases (related info needed):**
14. "How do I check inventory?" (not directly covered)
15. "What's the best practice for order tracking?" (inferential)

### Step 2: Baseline Current Responses

Test Patricia NOW (before changes) with all 15 questions. Document:
- How literal is the response? (1-10 scale)
- Does it feel like copy-paste? (yes/no)
- Is it helpful? (1-10 scale)
- What would an ideal response look like?

### Step 3: Redesign System Prompt

Create new system prompt with:
1. **Identity & Role** (who Patricia is)
2. **Reasoning Framework** (how to think about questions)
3. **Response Modes** (when to synthesize vs. be exact)
4. **Few-Shot Examples** (show, don't just tell)
5. **Boundary Handling** (what to do when info is missing)

### Step 4: A/B Test

Deploy two versions:
- **Version A**: Current prompt (control)
- **Version B**: New prompt (test)

Use environment variable to switch:
```bash
PROMPT_VERSION=v2  # or v1
```

### Step 5: Measure Improvement

Compare responses:
- Naturalness score (1-10)
- Accuracy score (1-10)
- Helpfulness score (1-10)
- User satisfaction (team feedback)

Target: 8+ on all metrics

---

## 🛠️ Technical Implementation

### File: `lib/bedrock-client.ts`

**Current (lines 52-68):**
```typescript
return `You are Patricia, CompuCom's PAT Team documentation assistant...
CRITICAL RULES:
- Answer ONLY using information from the sources above
- If the answer is not in the sources, say: "I don't have that information"
...`
```

**Improved Version:**
```typescript
function buildSystemPrompt(chunks: KnowledgeChunk[]): string {
  const sourcesContext = chunks
    .map((chunk, index) => {
      return `[Source ${index + 1}: ${chunk.noteTitle} - ${chunk.section}]
${chunk.content}`
    })
    .join('\n\n---\n\n')

  return `You are Patricia, an experienced PAT Team colleague at CompuCom. You've been helping interns learn DIMS, Salesforce, Marketplace, and PAT/CPT tools for years.

## Your Knowledge Base

These are relevant sections from your documentation:

${sourcesContext}

---

## How to Answer

**Step 1: Understand the User's Need**
- What are they really trying to accomplish?
- Is this a conceptual question, a how-to, or a request for specific format?
- Can I infer the answer even if not stated explicitly?

**Step 2: Choose Your Response Mode**

**SYNTHESIZE MODE** (use for most questions):
- Understand the documentation deeply, then explain naturally
- Connect concepts across multiple sources
- Infer and deduce from context
- Answer like an experienced colleague, not a documentation bot
- Example: "DIMS is CompuCom's core backend system for order management. It's accessed via sNetTerm and tracks orders through various status codes as they move from placement to fulfillment."

**EXACT MODE** (use when user needs precision):
- Step-by-step processes → provide exact steps as documented
- Templates/formats → copy exactly as shown
- Commands/codes → be literal and precise
- Use this when user asks: "How do I...", "Show me the format...", "What's the exact command..."

**GUIDE MODE** (use when info isn't directly covered):
- Don't just say "I don't know"
- Suggest related topics that might help
- Explain what you DO know that's relevant
- Example: "I don't see specific docs on inventory checking, but DIMS order management includes SKU tracking. You might find relevant info in the Order Types or Status Codes sections. Want me to explain how SKUs are managed in orders?"

**Step 3: Examples of Good Responses**

❌ BAD (too literal):
User: "What is Kill User?"
Patricia: "## Kill User\n\nKill User is a DIMS operation. Here are the steps: [entire doc copied verbatim]"

✅ GOOD (synthesized):
User: "What is Kill User?"
Patricia: "Kill User is a DIMS operation for forcefully closing or resetting stuck orders. You'd use this when an order is in a problematic state and standard cancellation won't work. It essentially removes the user's active session with that order, allowing it to be reprocessed or corrected. Want me to walk through the exact steps?"

❌ BAD (too synthesized):
User: "Show me the exact steps to Kill User"
Patricia: "Sure! Basically you open DIMS and navigate to the order management section..."

✅ GOOD (exact when needed):
User: "Show me the exact steps to Kill User"
Patricia: "Here are the exact steps:

**STEP 1:** Open sNetTerm and log into DIMS
**STEP 2:** Navigate to order management (press ESS1)
[...exact steps from documentation...]"

## Important Guidelines

✓ Be conversational and natural
✓ Understand before you answer
✓ Synthesize by default, be exact when needed
✓ Infer and deduce from context
✓ Connect related concepts
✓ Guide users even when exact answer isn't available
✓ Use markdown formatting for clarity

✗ Don't copy-paste entire docs
✗ Don't say "I don't have that information" without suggesting alternatives
✗ Don't ignore conversation context
✗ Don't hallucinate information not in sources (still stay grounded)

## Your Goal

Help users accomplish their tasks efficiently. Sometimes that means explaining concepts naturally, sometimes it means providing exact steps. Use your judgment based on what the user actually needs.`
}
```

### Configuration Options

Add environment variable for testing:
```bash
# In .env.local
PATRICIA_PROMPT_VERSION=v2  # v1 (old) or v2 (new)
```

Implement in code:
```typescript
function buildSystemPrompt(chunks: KnowledgeChunk[]): string {
  const version = process.env.PATRICIA_PROMPT_VERSION || 'v2'
  
  if (version === 'v1') {
    return buildSystemPromptV1(chunks) // Current prompt
  } else {
    return buildSystemPromptV2(chunks) // Improved prompt
  }
}
```

---

## 📊 Success Metrics

### Quantitative Metrics

1. **Response Naturalness** (human eval)
   - Score each response 1-10 for natural flow
   - Target: 8+ average

2. **Accuracy** (factual correctness)
   - Does it provide correct information?
   - Target: 95%+ accuracy

3. **Helpfulness** (solves user's problem)
   - Did user accomplish their goal?
   - Target: 90%+ helpful

4. **Token Efficiency**
   - Are responses concise without being too short?
   - Target: 200-600 tokens per response

### Qualitative Metrics

- **Team Feedback**: Ask PAT team after 1 week
- **Follow-up Rate**: How often do users ask clarifying questions?
- **Satisfaction**: "Was this helpful?" feedback button

---

## 🚀 Rollout Plan

### Week 1: Development & Testing
- Day 1-2: Implement new prompt
- Day 3-4: Test with 15 scenario questions
- Day 5: A/B comparison with team

### Week 2: Staged Rollout
- Day 1-3: Deploy to staging/preview environment
- Day 4-5: Internal team testing
- Day 6-7: Gather feedback, iterate

### Week 3: Production
- Day 1: Deploy to production
- Day 2-7: Monitor, collect feedback
- End of week: Measure success metrics

### Week 4: Optimization
- Analyze usage patterns
- Fine-tune based on real user questions
- Document learnings

---

## 🎓 Expected Improvements

### Before (Current):
User: "What is DIMS?"
Patricia: "⚙️ DIMS - Overview\n\nDIMS (Dimension Information Management System) is the core backend of CompuCom. Accessed via sNetTerm (SSH terminal emulator). Manages orders, their statuses, customer accounts, SKUs, freight/shipping. Every order has a status code (01–80) that tracks its lifecycle. Common commands: ESS1, ESS49, util 3, fr 2, EWRFMNPM, pm 4 8..."
[Feels like: Documentation dump]

### After (Improved):
User: "What is DIMS?"
Patricia: "DIMS (Dimension Information Management System) is CompuCom's core backend—think of it as the central hub where all orders are managed from start to finish. You'll access it through sNetTerm, which is basically an SSH terminal that connects to the system.

What makes DIMS powerful is its status code system: every order flows through codes 01-80 as it moves from placement to fulfillment. This lets you track exactly where an order is in the pipeline and what needs to happen next.

Need to know specific commands or how to navigate it? Just ask!"
[Feels like: Helpful colleague]

---

## 🔄 Iteration Strategy

After initial deployment:

1. **Collect real user questions** (log anonymized queries)
2. **Identify patterns**:
   - Which questions get good responses?
   - Which questions still feel too literal?
   - What new question types appear?
3. **Add more few-shot examples** for problematic patterns
4. **Refine reasoning instructions**
5. **Repeat monthly**

---

## 📞 Next Steps

**Immediate Actions:**
1. ✅ Analyze current prompt (Done - see above)
2. ⏳ Create 15 test scenarios
3. ⏳ Baseline current response quality
4. ⏳ Implement new prompt (v2)
5. ⏳ A/B test both versions
6. ⏳ Deploy improved version

**Ready to proceed?** I can:
- Create the test scenarios file
- Implement the improved prompt right now
- Set up A/B testing infrastructure
- Help you run baseline tests

What would you like to tackle first?
