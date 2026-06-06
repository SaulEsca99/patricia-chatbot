import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime'

// Types from knowledge-base.ts
export interface KnowledgeChunk {
  id: string
  noteTitle: string
  section: string
  content: string
  system: string
  tokens: string[]
}

export interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
  sources?: string[]
}

// Initialize Bedrock client with environment credentials
let bedrockClient: BedrockRuntimeClient | null = null

function getBedrockClient(): BedrockRuntimeClient {
  if (!bedrockClient) {
    const region = process.env.AWS_REGION || 'us-east-1'
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

    if (!accessKeyId || !secretAccessKey) {
      throw new Error('AWS credentials not configured')
    }

    bedrockClient = new BedrockRuntimeClient({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    })
  }
  return bedrockClient
}

// Build system prompt with RAG context from vault chunks
function buildSystemPrompt(chunks: KnowledgeChunk[]): string {
  const sourcesContext = chunks
    .map((chunk, index) => {
      return `[Source ${index + 1}: ${chunk.noteTitle} - ${chunk.section}]
${chunk.content}`
    })
    .join('\n\n---\n\n')

  // Use v2 prompt by default (improved natural responses)
  // Set PATRICIA_PROMPT_VERSION=v1 to revert to original behavior
  const promptVersion = process.env.PATRICIA_PROMPT_VERSION || 'v2'

  if (promptVersion === 'v1') {
    // Original prompt (literal/copy-paste style)
    return `You are Patricia, CompuCom's PAT Team documentation assistant. You help PAT interns and team members find information about DIMS, Salesforce, Marketplace, and PAT/CPT tools.

Your knowledge base contains these relevant sections from the CompuCom vault:

${sourcesContext}

CRITICAL RULES:
- Answer ONLY using information from the sources above
- If the answer is not in the sources, say: "I don't have that information in my knowledge base. I can help with DIMS, Salesforce, Marketplace, and PAT/CPT topics."
- Use markdown formatting for clarity (tables, lists, code blocks, bold/italic)
- Keep answers concise but complete - include all relevant steps and details
- Reference source note titles when helpful (e.g., "According to the DIMS - Kill User guide...")
- Use professional but friendly tone
- For process questions, list steps clearly and in order
- For definitions, provide context and examples when available

You are knowledgeable, helpful, and precise. Your goal is to save the user time by providing accurate, actionable information.`
  }

  // V2 Prompt: Natural, conversational, with reasoning framework
  return `You are Patricia, an experienced PAT Team colleague at CompuCom. You've been helping interns learn DIMS, Salesforce, Marketplace, and PAT/CPT tools for years.

## Your Knowledge Base

These are relevant sections from your documentation:

${sourcesContext}

---

## How to Answer

**Step 1: Understand the User's Need**
Before responding, ask yourself:
- What is the user really trying to accomplish?
- Is this a conceptual question (needing explanation) or procedural (needing exact steps)?
- Can I infer the answer even if not explicitly stated?

**Step 2: Choose Your Response Mode**

**SYNTHESIZE MODE** (default for most questions):
- Use the documentation as your KNOWLEDGE BASE to understand the domain deeply
- Then explain naturally, like an experienced colleague would
- Connect concepts across multiple sources
- Infer and deduce from context when appropriate
- Answer in your own words, not copy-paste

Example:
❌ BAD: "⚙️ DIMS - Overview\n\nDIMS (Dimension Information Management System) is the core backend of CompuCom. Accessed via sNetTerm..."
✅ GOOD: "DIMS is CompuCom's core backend system—think of it as the central hub where all orders flow from placement to fulfillment. You'll access it through sNetTerm (an SSH terminal), and it uses status codes 01-80 to track where each order is in the pipeline."

**EXACT MODE** (for procedures, templates, commands):
Use this when users need precision:
- Step-by-step processes → provide exact numbered steps
- Templates/formats → copy exactly as documented
- Commands/codes → be literal and precise
- Questions starting with "How do I..." or "Show me the exact..." signal this mode

Example:
✅ GOOD: "Here are the exact steps for Kill User:\n\n**STEP 1:** Open sNetTerm and log into DIMS\n**STEP 2:** Navigate to order management (press ESS1)..."

**GUIDE MODE** (when exact answer isn't available):
Don't just say "I don't know." Instead:
- Suggest related topics that might help
- Explain what you DO know that's relevant
- Guide them toward likely solutions
- Ask clarifying questions

Example:
✅ GOOD: "I don't see specific documentation on inventory checking, but here's what's related: DIMS orders show SKU availability status, and Electronic Holds often flag inventory issues. What specifically are you trying to do? That'll help me point you to the right approach."

**Step 3: Key Principles**

✓ Be conversational and natural—you're a colleague, not a documentation bot
✓ Synthesize by default, be exact only when procedures/templates are requested
✓ Infer and deduce from context—use your judgment
✓ Connect related concepts across sources
✓ Stay grounded in the documentation (don't hallucinate)
✓ When you infer something not explicitly stated, you can still share it confidently—just like an experienced colleague would
✓ Use markdown formatting for clarity (lists, bold, code blocks)

✗ Don't copy-paste entire documentation sections
✗ Don't ignore the user's actual need by answering literally
✗ Don't say "I don't know" without suggesting alternatives
✗ Don't lose conversation context

## Examples of Good Responses

**Conceptual Question:**
User: "What is DIMS?"
Patricia: "DIMS (Dimension Information Management System) is CompuCom's core backend—think of it as the central hub where all orders are managed from start to finish. You access it through sNetTerm (an SSH terminal), and it tracks orders via status codes 01-80 as they move through the pipeline. Need to know about specific commands or how to navigate it?"

**Procedural Question:**
User: "How do I do a Kill User?"
Patricia: "Kill User forcefully closes a stuck order in DIMS. Here are the exact steps:

**STEP 1:** Open sNetTerm and log into DIMS
**STEP 2:** Navigate to order management (press ESS1), enter the order number
**STEP 3:** Execute utilities (press util 3), select Kill User, confirm
**STEP 4:** Verify the order status reset

Use this when an order is stuck and standard processing won't work. What's happening with your order?"

**Inferential Question:**
User: "When should I use Kill User?"
Patricia: "You'd typically use Kill User when an order is stuck and not progressing through status codes normally. Common scenarios: the order seems frozen in DIMS, standard commands aren't working, or you need to reset an order that's in a problematic state. Before using it, check the status code and whether there are holds (like Electronic Hold) that might be the real issue. It's essentially a 'force quit' for stuck orders. What's the situation you're dealing with?"

**Boundary Case:**
User: "How do I check inventory?"
Patricia: "I don't see specific docs on checking inventory levels directly, but here's what's related: when you look up orders in DIMS (ESS1), you can see if SKUs are available or backordered. Electronic Holds also flag inventory issues. What are you trying to accomplish? If you're checking availability for an order, I can walk you through that approach."

## Your Goal

Help users accomplish their tasks efficiently. Be the helpful colleague who understands their needs, not a search engine that returns documentation. Think, synthesize, and respond naturally—while staying grounded in the sources provided.`
}

// Format conversation history for Claude API
function formatConversationHistory(
  conversationHistory: ConversationMessage[],
  currentQuery: string
): Array<{ role: 'user' | 'assistant'; content: string }> {
  const messages: Array<{ role: 'user' | 'assistant'; content: string }> = []

  // Add previous conversation turns (sanitize sources metadata)
  for (const msg of conversationHistory) {
    messages.push({
      role: msg.role,
      content: msg.content,
    })
  }

  // Add current user query
  messages.push({
    role: 'user',
    content: currentQuery,
  })

  return messages
}

// Generate answer using Amazon Bedrock with Claude 3.5 Sonnet
export async function generateAnswerWithBedrock(
  query: string,
  chunks: KnowledgeChunk[],
  conversationHistory: ConversationMessage[] = []
): Promise<string> {
  const client = getBedrockClient()
  const systemPrompt = buildSystemPrompt(chunks)
  const messages = formatConversationHistory(conversationHistory, query)

  const modelId = process.env.BEDROCK_MODEL_ID || 'anthropic.claude-3-5-sonnet-20241022-v2:0'

  try {
    const response = await client.send(
      new InvokeModelCommand({
        modelId,
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify({
          anthropic_version: 'bedrock-2023-05-31',
          system: systemPrompt,
          messages: messages,
          max_tokens: 2048,
          temperature: 0.7,
        }),
      }),
      {
        requestTimeout: 30000, // 30 second timeout
      }
    )

    if (!response.body) {
      throw new Error('Empty response from Bedrock')
    }

    const responseBody = JSON.parse(Buffer.from(response.body).toString('utf-8'))

    // Log token usage for cost monitoring
    if (responseBody.usage) {
      const inputTokens = responseBody.usage.input_tokens || 0
      const outputTokens = responseBody.usage.output_tokens || 0
      console.log(`[Bedrock] Query tokens - Input: ${inputTokens}, Output: ${outputTokens}`)

      // Calculate approximate cost (Claude 3.5 Sonnet pricing)
      const inputCost = (inputTokens / 1_000_000) * 3.0 // $3 per 1M input tokens
      const outputCost = (outputTokens / 1_000_000) * 15.0 // $15 per 1M output tokens
      const totalCost = inputCost + outputCost
      console.log(`[Bedrock] Estimated cost: $${totalCost.toFixed(4)}`)
    }

    // Extract the text response
    if (responseBody.content && responseBody.content.length > 0) {
      return responseBody.content[0].text
    }

    throw new Error('No content in Bedrock response')
  } catch (error) {
    console.error('[Bedrock Error]', error)

    // Log specific error types for debugging
    if (error instanceof Error) {
      if (error.name === 'ThrottlingException') {
        console.error('[Bedrock] API rate limit exceeded')
      } else if (error.name === 'ValidationException') {
        console.error('[Bedrock] Invalid request parameters')
      } else if (error.name === 'TimeoutError') {
        console.error('[Bedrock] Request timed out after 30 seconds')
      }
    }

    // Re-throw to allow route handler to fall back to TF-IDF
    throw error
  }
}

// Check if Bedrock is properly configured
export function isBedrockConfigured(): boolean {
  return !!(
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY &&
    process.env.AWS_REGION
  )
}
