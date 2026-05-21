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
    return name.includes(titleLower) || titleLower.split(' ').every(word => name.includes(word.toLowerCase()))
  })

  if (!match) {
    return NextResponse.json({ content: `Note "${title}" not found in the knowledge base.` })
  }

  let content = fs.readFileSync(path.join(vaultDir, match), 'utf-8')
  
  // Clean up for display — remove image embeds but keep the rest readable
  content = content
    .replace(/!\[\[assets\/[^\]]+\]\]/g, '*[Image]*')
    .replace(/\[\[([^\]|]+)\|?([^\]]*)\]\]/g, (_, link, alias) => `**${alias || link}**`)

  return NextResponse.json({ content, filename: match })
}
