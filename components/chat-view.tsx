"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatInput } from "@/components/chat-input"
import { ChatMessage } from "@/components/chat-message"
import { TypingIndicator } from "@/components/typing-indicator"
import { Message } from "@/lib/chat-data"
import { Plus, Layers } from "lucide-react"
import { RefObject } from "react"

interface ChatViewProps {
  messages: Message[]
  isTyping: boolean
  inputValue: string
  onInputChange: (value: string) => void
  onSend: () => void
  onNewChat: () => void
  onToggleSources: () => void
  showSources: boolean
  messagesEndRef: RefObject<HTMLDivElement | null>
}

export function ChatView({
  messages,
  isTyping,
  inputValue,
  onInputChange,
  onSend,
  onNewChat,
  onToggleSources,
  showSources,
  messagesEndRef,
}: ChatViewProps) {
  return (
    <div className="flex flex-1 flex-col h-full">
      {/* Minimal Header */}
      <header className="flex items-center justify-between px-4 md:px-6 h-14 border-b border-border/50">
        <div className="flex items-center gap-3">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/compucom_logo%20%281%29-jl9k4W2pjdKreOaQBitkC3T0ORphL0.png"
            alt="CompuCom"
            className="w-8 h-8"
          />
          <span className="text-sm font-semibold text-foreground">Patricia</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onNewChat}
            className="h-8 px-3 text-muted-foreground hover:text-foreground"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            <span className="text-xs">New</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSources}
            className={`h-8 px-3 ${showSources ? "text-foreground bg-secondary" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Layers className="h-4 w-4 mr-1.5" />
            <span className="text-xs">Sources</span>
          </Button>
        </div>
      </header>

      {/* Messages */}
      <ScrollArea className="flex-1">
        <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 space-y-6">
          {messages.map((message, index) => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              style={{ animationDelay: `${index * 0.05}s` }}
            />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border/50 px-4 md:px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <ChatInput
            value={inputValue}
            onChange={onInputChange}
            onSend={onSend}
            placeholder="Ask Patricia..."
          />
        </div>
      </div>
    </div>
  )
}
