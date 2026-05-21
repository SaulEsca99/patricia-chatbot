import fs from 'fs'
import path from 'path'

export interface KnowledgeChunk {
  id: string
  noteTitle: string
  section: string
  content: string
  system: string
  tokens: string[]
}

// Strip Obsidian-specific syntax
function cleanMarkdown(raw: string): string {
  return raw
    .replace(/!\[\[assets\/[^\]]+\]\]/g, '')      // Remove image embeds
    .replace(/\[\[([^\]|]+)\|?([^\]]*)\]\]/g, (_, link, alias) => alias || link) // Resolve wikilinks
    .replace(/^Tags:.*$/gm, '')                    // Remove tag lines
    .replace(/^←.*$/gm, '')                        // Remove nav lines
    .replace(/---/g, '')                           // Remove horizontal rules
    .replace(/\n{3,}/g, '\n\n')                    // Collapse blank lines
    .trim()
}

// Tokenize for search
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2)
}

// Detect system from filename
function detectSystem(filename: string): string {
  if (filename.includes('DIMS')) return 'DIMS'
  if (filename.includes('Salesforce')) return 'Salesforce'
  if (filename.includes('Marketplace')) return 'Marketplace'
  if (filename.includes('PAT')) return 'PAT'
  if (filename.includes('Glossary')) return 'Glossary'
  if (filename.includes('Contact')) return 'Contacts'
  if (filename.includes('Access')) return 'Access'
  if (filename.includes('Cheatsheet')) return 'Reference'
  return 'General'
}

// Split note into chunks by ## sections
function chunkNote(noteTitle: string, content: string, system: string): KnowledgeChunk[] {
  const cleaned = cleanMarkdown(content)
  const sections = cleaned.split(/^## /m)
  const chunks: KnowledgeChunk[] = []

  // First section (before any ##) — use as intro
  if (sections[0].trim().length > 50) {
    const text = sections[0].trim()
    chunks.push({
      id: `${noteTitle}__intro`,
      noteTitle,
      section: 'Introduction',
      content: text,
      system,
      tokens: tokenize(text),
    })
  }

  // Remaining sections
  for (let i = 1; i < sections.length; i++) {
    const lines = sections[i].split('\n')
    const sectionTitle = lines[0].replace(/^#+\s*/, '').trim()
    const text = lines.slice(1).join('\n').trim()

    if (text.length < 20) continue

    const fullText = `## ${sectionTitle}\n${text}`
    chunks.push({
      id: `${noteTitle}__${sectionTitle.toLowerCase().replace(/\s+/g, '_')}`,
      noteTitle,
      section: sectionTitle,
      content: fullText,
      system,
      tokens: tokenize(fullText),
    })
  }

  return chunks
}

// Load and index the entire vault
let cachedChunks: KnowledgeChunk[] | null = null

export function loadVault(): KnowledgeChunk[] {
  if (cachedChunks) return cachedChunks

  const vaultDir = path.join(process.cwd(), 'data', 'vault')
  
  if (!fs.existsSync(vaultDir)) {
    console.error('Vault directory not found:', vaultDir)
    return []
  }

  const files = fs.readdirSync(vaultDir).filter(f => f.endsWith('.md'))
  const allChunks: KnowledgeChunk[] = []

  for (const file of files) {
    const content = fs.readFileSync(path.join(vaultDir, file), 'utf-8')
    const noteTitle = file.replace('.md', '').replace(/^[^\w]*\s*/, '') // Remove emoji prefix
    const system = detectSystem(file)
    const chunks = chunkNote(noteTitle, content, system)
    allChunks.push(...chunks)
  }

  cachedChunks = allChunks
  console.log(`[Patricia] Loaded ${files.length} notes → ${allChunks.length} chunks`)
  return allChunks
}

// TF-IDF inspired search
export function searchVault(query: string, topK: number = 5): KnowledgeChunk[] {
  const chunks = loadVault()
  const queryTokens = tokenize(query)

  if (queryTokens.length === 0) return chunks.slice(0, topK)

  // Calculate document frequency for IDF
  const df: Record<string, number> = {}
  for (const chunk of chunks) {
    const uniqueTokens = new Set(chunk.tokens)
    for (const token of uniqueTokens) {
      df[token] = (df[token] || 0) + 1
    }
  }

  // Score each chunk
  const scored = chunks.map(chunk => {
    let score = 0
    const chunkTokenSet = new Set(chunk.tokens)

    for (const qt of queryTokens) {
      // Exact match
      if (chunkTokenSet.has(qt)) {
        const tf = chunk.tokens.filter(t => t === qt).length / chunk.tokens.length
        const idf = Math.log(chunks.length / (df[qt] || 1))
        score += tf * idf * 10
      }

      // Partial match (substring)
      for (const ct of chunkTokenSet) {
        if (ct.includes(qt) || qt.includes(ct)) {
          score += 0.5
        }
      }
    }

    // Boost if query mentions the system
    const queryLower = query.toLowerCase()
    if (queryLower.includes(chunk.system.toLowerCase())) {
      score *= 1.5
    }

    // Boost section titles that match
    const sectionLower = chunk.section.toLowerCase()
    for (const qt of queryTokens) {
      if (sectionLower.includes(qt)) {
        score *= 1.3
      }
    }

    return { chunk, score }
  })

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .filter(s => s.score > 0)
    .map(s => s.chunk)
}
