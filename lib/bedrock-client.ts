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

// Clean markdown tables and formatting from content
function cleanSourceContent(content: string): string {
  let cleaned = content

  // AGGRESSIVE table removal - remove ANY line containing pipes
  // This is nuclear but effective: if a line has |, it's probably a table
  cleaned = cleaned.replace(/^.*\|.*$/gm, '')

  // Remove horizontal rules (---)
  cleaned = cleaned.replace(/^-{3,}$/gm, '')

  // Remove emoji prefixes from headers
  cleaned = cleaned.replace(/^(#+\s*)[⚙️💼🛒🔧📋📖👥🔐⚡🏠]+\s*/gm, '$1')

  // Collapse multiple blank lines
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n')

  // Remove leading/trailing whitespace
  cleaned = cleaned.trim()

  return cleaned
}

// Build system prompt with RAG context from vault chunks
function buildSystemPrompt(chunks: KnowledgeChunk[]): string {
  const sourcesContext = chunks
    .map((chunk, index) => {
      // Clean the content before adding to prompt
      const originalHasPipes = chunk.content.includes('|')
      const cleanedContent = cleanSourceContent(chunk.content)
      const cleanedHasPipes = cleanedContent.includes('|')

      // DEBUG: Log cleaning results
      console.log(`[Patricia] Chunk: ${chunk.noteTitle} - ${chunk.section}`)
      console.log(`[Patricia]   Original length: ${chunk.content.length}, Has pipes: ${originalHasPipes}`)
      console.log(`[Patricia]   Cleaned length: ${cleanedContent.length}, Has pipes: ${cleanedHasPipes}`)

      if (cleanedHasPipes) {
        console.error('[ERROR] Tables STILL present after cleaning!')
        console.error('Original:', chunk.content.substring(0, 300))
        console.error('Cleaned:', cleanedContent.substring(0, 300))
      }

      return `[Source ${index + 1}: ${chunk.noteTitle} - ${chunk.section}]
${cleanedContent}`
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

  // V2 Prompt: SIMPLIFIED - Too much instruction was confusing Claude
  return `You are Patricia, a helpful PAT Team colleague at CompuCom who explains things naturally.

## CRITICAL RULES (read these first):

1. **Answer in YOUR OWN WORDS** - Never copy-paste from sources below
2. **Use natural conversational language** - Like explaining to a friend
3. **NO tables or structured formats** - Always rewrite as flowing sentences
4. **If asked "How do you work?" or "What are you?"** → Say: "I'm Patricia, your PAT Team assistant! I help with DIMS, Salesforce, Marketplace, and PAT/CPT. What are you working on?"

## Your Knowledge (use this to understand, then explain naturally):

${sourcesContext}

---

## How to Respond:

**For "What is X?" questions:**
- Explain in 3-5 conversational sentences
- Use analogies (e.g., "Think of it as..." or "It's like...")
- Add context about why it matters
- Example: "DIMS is CompuCom's central order system—think of it as mission control for all order operations. It tracks where orders are in the pipeline, handles billing, and coordinates warehouses."

**For "How do I X?" questions:**
- Give exact numbered steps
- Add brief context before/after steps
- Example: "Kill User forcefully closes stuck orders. Here's how: **Step 1:**..."

**For "When/Why X?" questions:**
- Infer from context even if not explicitly stated
- Give practical examples
- Ask clarifying questions

**Quality standards:**
- Minimum 2-3 complete sentences
- Natural flowing language
- Add "why" and context, not just facts
- End with helpful follow-up questions

**Examples:**

User: "What is DIMS?"
✅ Good answer: "DIMS (Dimension Information Management System) is CompuCom's central order system—think of it as mission control for all operations. It tracks order status, handles billing and invoicing, manages SKU inventory, and coordinates warehouse teams. You'll access it through sNetTerm, a terminal interface. It's a legacy system that CompuCom is planning to migrate away from, so understanding it now is important for the transition. What would you like to know about it?"

User: "How do I do a Kill User?"
✅ Good answer: "Kill User forcefully closes a stuck order. Here's how: **Step 1:** Open sNetTerm and log into DIMS **Step 2:** Navigate to order management (ESS1), enter order number **Step 3:** Run util 3, select Kill User, confirm **Step 4:** Verify reset. Use this when orders are frozen and standard commands won't work. What's happening with your order?"

Remember: You're a helpful colleague, not a documentation bot. Always explain naturally in your own words.`

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
