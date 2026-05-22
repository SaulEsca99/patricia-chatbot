import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get('title')
  
  if (!title) {
    return NextResponse.json({ error: 'Title required' }, { status: 400 })
  }

  const vaultDir = path.join(process.cwd(), 'data', 'vault')
  const files = fs.readdirSync(vaultDir).filter(f => f.endsWith('.md'))
  
  // Find the matching file (fuzzy match on title)
  const titleLower = title.toLowerCase()
  const match = files.find(f => {
    const name = f.replace('.md', '').toLowerCase()
    // Try exact contains first
    if (name.includes(titleLower)) return true
    // Then try all words match
    const words = titleLower.split(/[\s\-]+/).filter(w => w.length > 2)
    return words.every(word => name.includes(word))
  })

  if (!match) {
    return NextResponse.json({ content: `Note "${title}" not found in the knowledge base.` })
  }

  let content = fs.readFileSync(path.join(vaultDir, match), 'utf-8')
  
  // Clean up for display
  content = content
    // Remove Obsidian image embeds entirely (they can't be served from vault)
    .replace(/!\[\[assets\/[^\]]+\]\]/g, '')
    // Resolve wikilinks to bold text
    .replace(/\[\[([^\]|]+)\|?([^\]]*)\]\]/g, (_, link, alias) => `**${alias || link}**`)
    // Remove empty lines left by image removal
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  return NextResponse.json({ content, filename: match })
}
