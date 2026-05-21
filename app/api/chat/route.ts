import { NextRequest, NextResponse } from 'next/server'
import { searchVault, loadVault } from '@/lib/knowledge-base'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Search the vault for relevant chunks
    const results = searchVault(message, 8)

    if (results.length === 0) {
      return NextResponse.json({
        answer: `I don't have specific information about that in my knowledge base.\n\nI can help you with:\n\n| System | Topics |\n|---|---|\n| **DIMS** | Commands, Kill User, Electronic Hold, Order Types, Installation |\n| **Salesforce** | Change Owner Queue, B2B User Group, User Rights, Remove User |\n| **Marketplace** | SAML Authentication, Overview |\n| **PAT/CPT** | Price Rules, SKU Management |\n| **Reference** | Glossary, Access Requests, Contacts |\n\nTry asking a specific question like *"How do I do a Kill User?"* or *"What is Electronic Hold?"*`,
        sources: [],
      })
    }

    // Extract unique source notes
    const sources = [...new Set(results.map(r => r.noteTitle))]

    // Build intelligent answer
    const answer = buildIntelligentAnswer(message, results)

    return NextResponse.json({ answer, sources })
  } catch (error) {
    console.error('[Patricia API Error]', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

interface ChunkResult {
  noteTitle: string
  section: string
  content: string
  system: string
}

function buildIntelligentAnswer(query: string, chunks: ChunkResult[]): string {
  const queryLower = query.toLowerCase()

  // Combine all chunks from the primary note
  const primaryNote = chunks[0].noteTitle
  const primaryChunks = chunks.filter(c => c.noteTitle === primaryNote)
  const secondaryChunks = chunks.filter(c => c.noteTitle !== primaryNote).slice(0, 2)

  // Clean content: remove "See Also" and navigation sections
  function cleanForChat(text: string): string {
    return text
      // Remove "See Also" sections entirely
      .replace(/## See Also[\s\S]*?(?=\n## |$)/g, '')
      // Remove "Ver También" sections
      .replace(/## Ver También[\s\S]*?(?=\n## |$)/g, '')
      // Remove standalone link lists at the end
      .replace(/\n- \[?\[?[⚙️💼🛒🔧📋📖👥🔐⚡].+$/gm, '')
      // Remove empty headers
      .replace(/^##\s*\n/gm, '')
      // Clean up extra whitespace
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  }

  // Determine if this is a "how to" question (process/procedure)
  const isHowTo = /how|como|cómo|steps|process|procedure|do i|can i|create|change|update|remove|delete|kill/i.test(queryLower)
  
  // Determine if this is a "what is" question (definition)
  const isDefinition = /what is|what are|qué es|define|explain|meaning|difference/i.test(queryLower)

  let answer = ''

  if (isHowTo) {
    // For process questions — extract and present steps clearly
    const mainContent = primaryChunks.map(c => cleanForChat(c.content)).join('\n\n')
    
    // Check if the content already has numbered steps
    const hasSteps = /STEP \d|PASO \d|^\d\./m.test(mainContent)
    
    if (hasSteps) {
      // Content already has clear steps — present directly
      answer = mainContent
    } else {
      // Build a structured response
      answer = mainContent
    }

    // Add ticket template if the process involves tickets
    const ticketChunk = chunks.find(c => 
      c.content.includes('```') && 
      (c.content.toLowerCase().includes('ticket') || 
       c.content.toLowerCase().includes('título') ||
       c.content.toLowerCase().includes('title'))
    )
    if (ticketChunk && !mainContent.includes(ticketChunk.content)) {
      const ticketContent = cleanForChat(ticketChunk.content)
      if (ticketContent.length > 20) {
        answer += '\n\n' + ticketContent
      }
    }

  } else if (isDefinition) {
    // For definition questions — lead with the definition, then details
    const mainContent = primaryChunks.map(c => cleanForChat(c.content)).join('\n\n')
    answer = mainContent

  } else {
    // General questions — present the most relevant content
    const mainContent = primaryChunks.map(c => cleanForChat(c.content)).join('\n\n')
    answer = mainContent
  }

  // Add related info from secondary notes (if they add value)
  if (secondaryChunks.length > 0) {
    const relatedParts: string[] = []
    
    for (const chunk of secondaryChunks) {
      const cleaned = cleanForChat(chunk.content)
      // Only include if it adds meaningful content (not just links/references)
      if (cleaned.length > 50 && !cleaned.startsWith('##') ) {
        const truncated = cleaned.length > 400 
          ? cleaned.substring(0, 400).replace(/\n[^\n]*$/, '') + '...'
          : cleaned
        relatedParts.push(`**From ${chunk.noteTitle}:**\n\n${truncated}`)
      }
    }

    if (relatedParts.length > 0) {
      answer += '\n\n---\n\n> 💡 **Related Information**\n\n' + relatedParts.join('\n\n')
    }
  }

  // Final cleanup
  answer = answer
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  // If answer is too short, it means we only got navigation content
  if (answer.length < 30) {
    // Fall back to raw primary content
    answer = chunks[0].content
  }

  return answer
}
