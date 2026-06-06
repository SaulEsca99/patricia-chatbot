# Patricia Response Quality Test Scenarios

## 📋 Test Categories

### Category 1: Conceptual Questions (Should SYNTHESIZE)
These questions ask "what is X" or "explain Y" - Patricia should synthesize information naturally.

---

### **Test 1.1: System Definition**
**Question:** "What is DIMS?"

**Current Behavior (Predicted):**
```
⚙️ DIMS - Overview

DIMS (Dimension Information Management System) is the core backend of CompuCom. Accessed via sNetTerm (SSH terminal emulator). Manages orders, their statuses, customer accounts, SKUs, freight/shipping. Every order has a status code (01–80) that tracks its lifecycle. Common commands: ESS1, ESS49, util 3, fr 2, EWRFMNPM, pm 4 8.

[Source: DIMS - Overview]
```

**Desired Behavior:**
```
DIMS (Dimension Information Management System) is CompuCom's core backend system—think of it as the central hub where all orders are managed from start to finish. You'll access it through sNetTerm, which is basically an SSH terminal.

What makes DIMS powerful is its status code system: every order flows through codes 01-80 as it moves from placement to fulfillment. This lets you track exactly where an order is in the pipeline and what needs to happen next.

Need to know about specific commands or how to navigate it? I can help with that!
```

**Evaluation Criteria:**
- [ ] Sounds conversational (not copy-paste)
- [ ] Synthesizes key concepts
- [ ] Adds helpful context
- [ ] Invites follow-up questions

---

### **Test 1.2: System Comparison**
**Question:** "What's the difference between DIMS and Marketplace?"

**Current Behavior (Predicted):**
```
[Dumps DIMS overview doc]
[Dumps Marketplace overview doc]
```

**Desired Behavior:**
```
DIMS and Marketplace serve different roles in CompuCom's ecosystem:

**DIMS** is the backend order management system—it's where orders are actually processed, tracked, and fulfilled. You access it through sNetTerm (a terminal interface) and it's mainly used by internal teams to manage order workflows.

**Marketplace** is the customer-facing e-commerce portal where customers browse and place orders. Think of it as the storefront, while DIMS is the warehouse and fulfillment center behind it.

They work together: orders placed in Marketplace flow into DIMS for processing. Marketplace also uses SAML authentication for security, while DIMS uses standard login credentials.

Which system were you trying to work with?
```

**Evaluation Criteria:**
- [ ] Compares and contrasts clearly
- [ ] Uses helpful analogies
- [ ] Explains relationship between systems
- [ ] Conversational tone

---

### **Test 1.3: Concept Explanation**
**Question:** "How does order processing work at CompuCom?"

**Current Behavior (Predicted):**
```
[Returns chunks about order types, status codes, but doesn't connect them into a cohesive flow]
```

**Desired Behavior:**
```
Order processing at CompuCom follows a structured flow through DIMS:

1. **Order Creation** → An order enters the system (status code 01-10 range), either from Marketplace or direct entry

2. **Validation** → The system checks inventory, pricing, and customer details

3. **Processing** → The order moves through various status codes (11-45) as it's being prepared—this includes SKU validation, price rule application via the PAT tool, and shipping setup

4. **Fulfillment** → Once ready, it enters fulfillment status (45-60), where shipping and freight details are finalized

5. **Completion** → Finally it reaches delivered/closed status (70-80)

At any point, you can check an order's status code to see exactly where it is in this pipeline. Issues like Electronic Hold or stuck orders can pause this flow, which is when you'd use tools like Kill User to reset things.

What part of the process are you working with?
```

**Evaluation Criteria:**
- [ ] Creates a narrative flow
- [ ] Connects concepts across docs
- [ ] Adds context not explicitly in docs
- [ ] Helpful and actionable

---

## Category 2: Procedural Questions (Should BE EXACT)
These questions ask "how do I do X" - Patricia should provide exact steps.

---

### **Test 2.1: Step-by-Step Process**
**Question:** "How do I do a Kill User?"

**Current Behavior (Predicted):**
```
[Either too literal copy-paste OR too synthesized and misses steps]
```

**Desired Behavior:**
```
Kill User is used to forcefully close or reset a stuck order in DIMS. Here are the exact steps:

**STEP 1:** Open sNetTerm and log into DIMS

**STEP 2:** Navigate to order management:
- Press `ESS1` (Order Status Screen)
- Enter the order number

**STEP 3:** Execute Kill User:
- Press `util 3` to access utilities
- Select "Kill User" option
- Confirm the action when prompted

**STEP 4:** Verify the order status has been reset

**Important:** This is typically used when an order is stuck in processing and standard cancellation won't work. Make sure you understand why the order is stuck before killing the user session, as it will clear any in-progress changes.

Need help troubleshooting why an order might be stuck?

[Source: DIMS - Kill User]
```

**Evaluation Criteria:**
- [ ] Exact steps preserved
- [ ] Clear formatting
- [ ] Adds helpful context (when to use it)
- [ ] Offers follow-up help
- [ ] Cites source

---

### **Test 2.2: Installation Process**
**Question:** "How do I install sNetTerm?"

**Current Behavior (Predicted):**
```
[Returns installation section verbatim]
```

**Desired Behavior:**
```
Here's how to install sNetTerm for accessing DIMS:

**STEP 1:** Download sNetTerm
- Go to [download link from docs]
- Choose Windows/Mac version

**STEP 2:** Run the installer
- Double-click the .exe file
- Accept default installation path

**STEP 3:** Configure connection
- Open sNetTerm
- Set host: [host from docs]
- Set port: [port from docs]
- Save the profile

**STEP 4:** Test connection
- Connect using your DIMS credentials
- You should see the DIMS login screen

First time setting this up? It's pretty straightforward, but let me know if you hit any snags!

[Source: DIMS - Installation]
```

**Evaluation Criteria:**
- [ ] Steps are exact and complete
- [ ] Maintains technical details
- [ ] Friendly wrapper context
- [ ] Encourages asking for help

---

### **Test 2.3: Configuration Change**
**Question:** "How do I change an order status in DIMS?"

**Current Behavior (Predicted):**
```
[Returns relevant section but may miss context]
```

**Desired Behavior:**
```
To change an order status in DIMS:

**STEP 1:** Access the order
- Open DIMS via sNetTerm
- Press `ESS49` (Order Management)
- Enter the order number

**STEP 2:** Modify status
- Select "Change Status" option
- Enter new status code (see status codes chart if unsure)
- Add reason code if required

**STEP 3:** Confirm changes
- Review the status change summary
- Confirm the update
- Note the timestamp

**Important:** You'll need appropriate permissions to change certain statuses. Some status codes are restricted or require manager approval.

Common status changes:
- 01→10: Order entry to validation
- 20→45: Processing to ready for fulfillment
- 45→70: Fulfillment to shipped

What status change are you trying to make?

[Source: DIMS - Change Order Status]
```

**Evaluation Criteria:**
- [ ] Clear step-by-step
- [ ] Preserves important warnings
- [ ] Adds helpful examples
- [ ] Context-aware follow-up

---

## Category 3: Inferential Questions (Should DEDUCE)
These questions aren't directly answered in docs—Patricia must infer from context.

---

### **Test 3.1: When to Use**
**Question:** "When should I use Kill User?"

**Current Behavior (Predicted):**
```
"I don't have that information in my knowledge base."
OR
[Just describes what Kill User is without answering "when"]
```

**Desired Behavior:**
```
You'd use Kill User in these situations:

**When an order is stuck:**
- The order isn't progressing through status codes normally
- Standard processing commands aren't working
- The order seems "frozen" in DIMS

**When you need to reset an order:**
- An incorrect change was made and needs to be undone
- Multiple users are working on the same order and it's causing conflicts
- The order is in a problematic state that can't be fixed through normal means

**Before using Kill User, check:**
1. What status code is the order in?
2. Are there any holds (like Electronic Hold) that might be the real issue?
3. Have you tried standard cancellation/modification first?

Kill User is essentially a "force quit" for stuck orders—it clears the active session so the order can be reprocessed. It's powerful but should be used thoughtfully.

What's happening with the order you're trying to fix?

[Inferred from: DIMS - Kill User, DIMS - Status Codes, DIMS - Electronic Hold]
```

**Evaluation Criteria:**
- [ ] Infers use cases from documentation
- [ ] Provides practical examples
- [ ] Adds helpful prerequisites
- [ ] Acknowledges it's inferred (not explicit)

---

### **Test 3.2: Troubleshooting**
**Question:** "Why would an order be in status 45?"

**Current Behavior (Predicted):**
```
[Returns status code list but doesn't explain what 45 means]
```

**Desired Behavior:**
```
Status 45 means the order is in "Ready for Fulfillment" stage—good news, it's progressed successfully through processing!

**What this means:**
- Order validation is complete
- Inventory has been allocated
- Pricing and customer details are confirmed
- It's queued up for the fulfillment team to ship

**Next steps for this order:**
- Fulfillment team will pick, pack, and ship
- It'll move to status 60-70 range as it ships
- Eventually reaches 80 (complete/delivered)

**If the order seems stuck at 45:**
- Check for Electronic Holds
- Verify shipping address is complete
- Confirm inventory is actually available
- Check if there's a freight/shipping config issue

Is this order stuck at 45, or are you just checking its status?

[Source: DIMS - Status Codes, DIMS - Electronic Hold]
```

**Evaluation Criteria:**
- [ ] Explains what the status means
- [ ] Provides context about workflow
- [ ] Anticipates follow-up concerns
- [ ] Offers troubleshooting

---

### **Test 3.3: Cause Analysis**
**Question:** "What causes an Electronic Hold?"

**Current Behavior (Predicted):**
```
[Returns Electronic Hold doc section verbatim]
```

**Desired Behavior:**
```
Electronic Holds are DIMS's way of flagging orders that need attention before they can proceed. Common causes:

**Inventory Issues:**
- SKU is out of stock or backordered
- Quantity requested exceeds available inventory
- Invalid or discontinued SKU

**Pricing Problems:**
- Price rule mismatch or missing
- Customer pricing not configured in PAT tool
- Promotional pricing expired or invalid

**Order Data Issues:**
- Missing or invalid shipping address
- Customer account not properly set up
- Required fields left blank

**System Constraints:**
- Order exceeds customer's credit limit
- Duplicate order detection triggered
- Fraud prevention flag

**To resolve an Electronic Hold:**
1. Check the hold reason code in DIMS
2. Fix the underlying issue (update SKU, fix pricing, correct address)
3. Release the hold manually once resolved

What hold reason code are you seeing?

[Source: DIMS - Electronic Hold, PAT - Price Rules, DIMS - Status Codes]
```

**Evaluation Criteria:**
- [ ] Infers causes from multiple sources
- [ ] Categorizes logically
- [ ] Provides resolution path
- [ ] Asks clarifying question

---

## Category 4: Template Requests (Should BE LITERAL)
These questions ask for specific formats—Patricia should copy exactly.

---

### **Test 4.1: Ticket Template**
**Question:** "Show me the ticket format for Kill User"

**Current Behavior (Predicted):**
```
[Either missing template or too synthesized]
```

**Desired Behavior:**
```
Here's the exact ticket template for Kill User:

\`\`\`
Ticket Title: DIMS - Kill User Request - [Order Number]

Summary:
Request to perform Kill User operation on order [ORDER_NUMBER]

Details:
- Order Number: [ORDER_NUMBER]
- Current Status Code: [XX]
- Customer: [CUSTOMER_NAME]
- Issue: [Brief description of why order is stuck]
- Attempted Solutions: [What you've tried so far]
- Urgency: [Normal/High/Critical]

Reason for Kill User:
[Explain why Kill User is needed and what outcome you expect]

Requestor: [Your name]
Date: [Date]
\`\`\`

**Fill in the bracketed sections with your specific order details.** This format ensures the DIMS team has all the context they need to process your request quickly.

Need help filling out any of these fields?

[Source: DIMS - Kill User]
```

**Evaluation Criteria:**
- [ ] Template copied exactly
- [ ] Proper formatting preserved
- [ ] Adds brief usage instructions
- [ ] Offers help with filling it out

---

### **Test 4.2: Command Reference**
**Question:** "What are the main DIMS commands I should know?"

**Current Behavior (Predicted):**
```
[Lists commands without context]
```

**Desired Behavior:**
```
Here are the essential DIMS commands:

**Order Management:**
- `ESS1` - Order Status Screen (view order details)
- `ESS49` - Order Management (modify orders)
- `util 3` - Utilities menu (includes Kill User)

**Freight & Shipping:**
- `fr 2` - Freight management
- `pm 4 8` - Shipping configuration

**Account Management:**
- `EWRFMNPM` - Remove environment SKU

**Navigation:**
- Press function keys (F1-F12) for quick actions
- Use arrow keys to navigate menus
- Type command codes directly at any screen

**Pro tip:** The most-used commands for PAT team are ESS1 (checking order status) and ESS49 (making changes). Get comfortable with those first!

Want me to explain what any of these commands do in detail?

[Source: DIMS - Commands, DIMS - Overview]
```

**Evaluation Criteria:**
- [ ] Lists commands accurately
- [ ] Categorizes logically
- [ ] Adds usage context
- [ ] Highlights most important ones

---

## Category 5: Boundary Cases (Should GUIDE)
These questions aren't directly covered—Patricia should guide to related info.

---

### **Test 5.1: Not Directly Covered**
**Question:** "How do I check inventory levels?"

**Current Behavior (Predicted):**
```
"I don't have that information in my knowledge base."
```

**Desired Behavior:**
```
I don't see specific docs on checking inventory levels directly, but here's what I know that's related:

**Via DIMS:**
- When you look up an order (ESS1), you can see if SKUs are available or backordered
- Electronic Holds often trigger for inventory issues, which shows you inventory problems
- SKU management commands might give you inventory visibility

**Via PAT Tool:**
- The SKU management functions show which SKUs are valid and active
- This doesn't show live inventory counts, but tells you if a SKU exists

**Best approach:**
Inventory management might be in a system I don't have docs for yet, or it might be in a DIMS section not covered in my current knowledge base. 

What specifically are you trying to do? If you're:
- Checking if a SKU is available for an order → Look at order status in DIMS
- Troubleshooting an out-of-stock issue → Check for Electronic Holds
- Managing SKU catalog → Use PAT tool SKU management

Want me to explain any of those approaches?

[Related sources: DIMS - Electronic Hold, PAT - Update SKUs]
```

**Evaluation Criteria:**
- [ ] Acknowledges gap honestly
- [ ] Suggests related information
- [ ] Provides workarounds
- [ ] Asks clarifying questions

---

### **Test 5.2: Best Practices**
**Question:** "What's the best practice for tracking orders?"

**Current Behavior (Predicted):**
```
"I don't have that information in my knowledge base."
```

**Desired Behavior:**
```
The documentation doesn't have a specific "best practices" guide, but based on the order management workflows I can see, here's what I'd recommend:

**Use Status Codes Proactively:**
- Check status codes regularly (ESS1)
- Know what each status means so you can spot issues early
- Status codes 01-80 tell you the full journey of an order

**Watch for Holds:**
- Electronic Holds are your early warning system
- They flag issues before orders get stuck
- Check hold reason codes to troubleshoot quickly

**Document Issues:**
- Use the ticket templates when escalating
- Include order number, status code, and what you've tried
- This helps the team resolve issues faster

**Know Your Tools:**
- DIMS for order processing and status
- Salesforce for customer case management
- PAT tool for pricing and SKU issues

These are patterns I'm inferring from the documented workflows, not official best practices. Your team might have additional guidelines!

What specific aspect of order tracking are you trying to improve?

[Inferred from: DIMS - Status Codes, DIMS - Electronic Hold, Salesforce - Overview]
```

**Evaluation Criteria:**
- [ ] Acknowledges it's inferred
- [ ] Provides practical guidance
- [ ] Based on documented patterns
- [ ] Defers to team knowledge

---

## Category 6: Multi-Turn Conversations (Should MAINTAIN CONTEXT)
These test conversation memory and follow-up handling.

---

### **Test 6.1: Follow-up Question**
**First Question:** "What is DIMS?"
**Patricia's Answer:** [Natural explanation of DIMS]

**Follow-up Question:** "How do I install it?"

**Current Behavior (Predicted):**
```
[Might not recognize "it" refers to DIMS]
```

**Desired Behavior:**
```
To install sNetTerm (the tool for accessing DIMS):

[Provides exact installation steps as in Test 2.2]
```

**Evaluation Criteria:**
- [ ] Recognizes "it" = DIMS/sNetTerm
- [ ] Provides relevant response
- [ ] No need for user to repeat context

---

### **Test 6.2: Progressive Detail**
**First Question:** "What's Kill User?"
**Patricia's Answer:** [Brief explanation]

**Follow-up Question:** "Show me the exact steps"

**Current Behavior (Predicted):**
```
[Might treat as new question]
```

**Desired Behavior:**
```
Here are the exact steps for Kill User:

[Provides detailed step-by-step as in Test 2.1]
```

**Evaluation Criteria:**
- [ ] Understands user wants more detail
- [ ] Switches from synthesis to exact mode
- [ ] Maintains topic continuity

---

### **Test 6.3: Clarification**
**First Question:** "My order is stuck"
**Patricia's Answer:** [Asks for more details]

**Follow-up:** "It's in status 45"

**Current Behavior (Predicted):**
```
[Might not connect to previous context]
```

**Desired Behavior:**
```
Got it—status 45 is "Ready for Fulfillment", so it's processed but hasn't shipped yet. Here's what to check:

[Provides troubleshooting specific to status 45 stuck orders]
```

**Evaluation Criteria:**
- [ ] Connects to previous conversation
- [ ] Uses context to give specific answer
- [ ] Treats it as continued conversation

---

## 📊 Scoring Rubric

For each test, rate 1-10 on these dimensions:

**Naturalness (1-10)**
- 1-3: Robotic, copy-paste feeling
- 4-6: Somewhat natural but stiff
- 7-8: Conversational with minor issues
- 9-10: Sounds like a helpful colleague

**Accuracy (1-10)**
- 1-3: Wrong or misleading information
- 4-6: Mostly correct but missing key details
- 7-8: Accurate with minor gaps
- 9-10: Completely accurate and comprehensive

**Helpfulness (1-10)**
- 1-3: Not useful, doesn't answer the question
- 4-6: Partially helpful but incomplete
- 7-8: Helpful, accomplishes user's goal
- 9-10: Extremely helpful, anticipates needs

**Mode Appropriateness (1-10)**
- 1-3: Wrong mode (synthesized when should be exact, or vice versa)
- 4-6: Somewhat appropriate but inconsistent
- 7-8: Mostly right mode choice
- 9-10: Perfect mode choice for question type

**Overall Score:** Average of all four dimensions

**Target:** 8+ average across all tests

---

## 🎯 Next Steps

1. **Baseline Testing:** Run all 15 tests with CURRENT Patricia
2. **Document Results:** Record actual responses and scores
3. **Implement v2 Prompt:** Deploy improved system prompt
4. **Retest:** Run same 15 tests with NEW Patricia
5. **Compare:** Calculate improvement delta
6. **Iterate:** Fine-tune based on results

Ready to start testing?
