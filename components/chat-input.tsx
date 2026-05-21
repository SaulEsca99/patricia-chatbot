"use client"

import { useRef, useEffect } from "react"
import { ArrowUp } from "lucide-react"

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  placeholder?: string
}

export function ChatInput({
  value,
  onChange,
  onSend,
  placeholder = "Ask me anything...",
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`
    }
  }, [value])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (value.trim()) onSend()
    }
  }

  return (
    <div className="relative flex items-end gap-3 rounded-2xl bg-card border border-border p-4 focus-within:border-primary/40 focus-within:ring-1 focus-within:ring-primary/20 transition-all shadow-lg shadow-black/20">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={1}
        className="flex-1 resize-none bg-transparent text-foreground placeholder:text-muted-foreground/60 focus:outline-none text-base leading-relaxed min-h-[28px] max-h-[160px] py-0.5"
      />
      <button
        onClick={onSend}
        disabled={!value.trim()}
        className="flex items-center justify-center h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-primary to-accent text-white disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 transition-all shadow-md"
      >
        <ArrowUp className="h-5 w-5" />
        <span className="sr-only">Send</span>
      </button>
    </div>
  )
}
