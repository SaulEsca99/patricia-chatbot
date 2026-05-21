"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Message } from "@/lib/chat-data"
import { cn } from "@/lib/utils"
import { CSSProperties } from "react"
import { FileText } from "lucide-react"

interface ChatMessageProps {
  message: Message
  style?: CSSProperties
  onSourceClick?: (noteTitle: string) => void
}

export function ChatMessage({ message, style, onSourceClick }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div
      className={cn(
        "flex animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
      style={style}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 mr-3 mt-0.5">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/compucom_logo%20%281%29-jl9k4W2pjdKreOaQBitkC3T0ORphL0.png"
            alt="Patricia"
            className="w-8 h-8"
          />
        </div>
      )}
      
      <div
        className={cn(
          "max-w-[85%]",
          isUser
            ? "bg-foreground text-background rounded-3xl rounded-br-lg px-4 py-2.5"
            : "text-foreground"
        )}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed">{message.content}</p>
        ) : (
          <div className="prose-chat text-sm">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        )}
        
        {/* Clickable Source Pills */}
        {message.sources && message.sources.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {message.sources.map((source, index) => (
              <button
                key={index}
                onClick={() => onSourceClick?.(source)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-secondary/80 text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors cursor-pointer"
              >
                <FileText className="h-3 w-3" />
                {source}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
