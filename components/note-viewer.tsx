"use client"

import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { X } from "lucide-react"

interface NoteViewerProps {
  noteTitle: string | null
  onClose: () => void
}

export function NoteViewer({ noteTitle, onClose }: NoteViewerProps) {
  const [content, setContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!noteTitle) {
      setContent(null)
      return
    }

    setLoading(true)
    fetch(`/api/note?title=${encodeURIComponent(noteTitle)}`)
      .then(res => res.json())
      .then(data => {
        setContent(data.content || 'Note not found.')
        setLoading(false)
      })
      .catch(() => {
        setContent('Error loading note.')
        setLoading(false)
      })
  }, [noteTitle])

  if (!noteTitle) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-40 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed inset-y-0 right-0 w-full sm:w-[500px] md:w-[600px] bg-background border-l border-border z-50 animate-slide-in flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <div>
            <h2 className="text-sm font-semibold text-foreground">📄 Documentation</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{noteTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 min-h-0">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse-dot" />
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse-dot" style={{ animationDelay: "0.2s" }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse-dot" style={{ animationDelay: "0.4s" }} />
              </div>
            </div>
          ) : (
            <div className="prose-chat text-sm">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content || ''}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
