"use client"

import { ChatInput } from "@/components/chat-input"

interface SuggestionCard {
  id: string
  text: string
  icon: string
}

interface WelcomeScreenProps {
  suggestions: SuggestionCard[]
  onSuggestionClick: (text: string) => void
  inputValue: string
  onInputChange: (value: string) => void
  onSend: () => void
}

export function WelcomeScreen({
  suggestions,
  onSuggestionClick,
  inputValue,
  onInputChange,
  onSend,
}: WelcomeScreenProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 sm:px-6">
      <div className="max-w-2xl w-full">
        {/* Logo & Title */}
        <div className="text-center mb-12 animate-fade-in">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/compucom_logo%20%281%29-jl9k4W2pjdKreOaQBitkC3T0ORphL0.png"
            alt="CompuCom"
            className="w-20 h-20 mx-auto mb-8 drop-shadow-2xl"
          />
          <h1 className="text-4xl sm:text-5xl font-semibold text-foreground tracking-tight mb-3">
            Patricia
          </h1>
          <p className="text-muted-foreground text-base">
            Hi! I'm Patricia, your PAT knowledge assistant
          </p>
        </div>

        {/* Input */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <ChatInput
            value={inputValue}
            onChange={onInputChange}
            onSend={onSend}
            placeholder="Ask Patricia anything..."
          />
        </div>

        {/* Suggestions */}
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => onSuggestionClick(suggestion.text)}
                className="px-4 py-2.5 text-sm text-muted-foreground rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 hover:text-foreground transition-all duration-200"
              >
                {suggestion.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
