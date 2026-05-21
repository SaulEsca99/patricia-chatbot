import { NextRequest, NextResponse } from 'next/server'
import { searchVault } from '@/lib/knowledge-base'

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Search the vault for relevant chunks
    const results = searchVault(message, 5)

    if (results.length === 0) {
      return NextResponse.json({
        answer: `I couldn't find specific information about that in the knowledge base. Try asking about:\n\n- **DIMS**: Commands, Kill User, Electronic Hold, Order Types\n- **Salesforce**: Change Owner Queue, B2B User Group, User Rights\n- **Marketplace**: SAML Authentication\n- **PAT**: Price Rules, SKU Management\n\nYou can also check the **Glossary** for term definitions.`,
        sources: [],
      })
    }

    // Extract unique source notes
    const sources = [...new Set(results.map(r => r.noteTitle))]

    // Build the answer from retrieved chunks
    const contextParts = results.map(r => r.content)
    const combinedContext = contextParts.join('\n\n---\n\n')

    // Check if Bedrock is enabled
    const bedrockEnabled = process.env.BEDROCK_ENABLED === 'true'

    let answer: string

    if (bedrockEnabled) {
      // Future: Call Amazon Bedrock Claude here
      // For now, fall through to smart search mode
      answer = buildSmartAnswer(message, results)
    } else {
      // Smart Search Mode — no AI, just structured retrieval
      answer = buildSmartAnswer(message, results)
    }

    return NextResponse.json({ answer, sources })
  } catch (error) {
    console.error('[Patricia API Error]', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Build a structured answer from retrieved chunks without AI
function buildSmartAnswer(
  query: string,
  chunks: { noteTitle: string; section: string; content: string; system: string }[]
): string {
  if (chunks.length === 0) return 'No relevant information found.'

  const primary = chunks[0]
  const secondary = chunks.slice(1, 3)

  // Build main answer
  let answer = ''

  // If the top result is very relevant (contains the query keywords), show it directly
  answer += primary.content

  // Add related sections if they're from different notes
  const relatedFromOtherNotes = secondary.filter(c => c.noteTitle !== primary.noteTitle)
  if (relatedFromOtherNotes.length > 0) {
    answer += '\n\n---\n\n### Related Information\n\n'
    for (const chunk of relatedFromOtherNotes) {
      answer += `**From ${chunk.noteTitle}:**\n\n`
      // Truncate if too long
      const truncated = chunk.content.length > 500
        ? chunk.content.substring(0, 500) + '...'
        : chunk.content
      answer += truncated + '\n\n'
    }
  }

  return answer
}
