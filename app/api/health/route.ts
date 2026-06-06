import { NextResponse } from 'next/server'
import { isBedrockConfigured } from '@/lib/bedrock-client'

/**
 * Health check endpoint to verify system status and LLM configuration
 *
 * Usage:
 * GET /api/health
 *
 * Response:
 * {
 *   "status": "ok",
 *   "timestamp": "2026-06-05T10:30:00.000Z",
 *   "llm": {
 *     "enabled": true,
 *     "bedrock_configured": true,
 *     "model": "anthropic.claude-3-5-sonnet-20241022-v2:0",
 *     "region": "us-east-1"
 *   },
 *   "vault": {
 *     "notes_count": 31
 *   }
 * }
 */
export async function GET() {
  try {
    const useLLM = process.env.USE_LLM === 'true'
    const bedrockConfigured = isBedrockConfigured()
    const region = process.env.AWS_REGION || 'not-set'
    const modelId = process.env.BEDROCK_MODEL_ID || 'anthropic.claude-3-5-sonnet-20241022-v2:0'

    // Check vault availability by checking if the vault directory exists
    let notesCount = 0
    try {
      const fs = require('fs')
      const path = require('path')
      const vaultDir = path.join(process.cwd(), 'data', 'vault')

      if (fs.existsSync(vaultDir)) {
        const files = fs.readdirSync(vaultDir).filter((f: string) => f.endsWith('.md'))
        notesCount = files.length
      }
    } catch (vaultError) {
      console.warn('[Health Check] Could not read vault directory:', vaultError)
    }

    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      llm: {
        enabled: useLLM,
        bedrock_configured: bedrockConfigured,
        model: modelId,
        region: region,
      },
      vault: {
        notes_count: notesCount,
      },
    })
  } catch (error) {
    console.error('[Health Check Error]', error)
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
      },
      { status: 500 }
    )
  }
}
