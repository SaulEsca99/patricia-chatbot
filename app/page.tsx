"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Message, suggestionCards } from "@/lib/chat-data"
import { WelcomeScreen } from "@/components/welcome-screen"
import { ChatView } from "@/components/chat-view"
import { SourcesPanel } from "@/components/sources-panel"
import { NoteViewer } from "@/components/note-viewer"

// Conversation history type for LLM context
interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
  sources?: string[]
}

export default function PatriciaPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showSources, setShowSources] = useState(false)
  const [hasStartedChat, setHasStartedChat] = useState(false)
  const [viewingNote, setViewingNote] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const handleSendMessage = useCallback(async (messageText?: string) => {
    const text = messageText || inputValue.trim()
    if (!text) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setHasStartedChat(true)
    setIsTyping(true)

    // Add user message to conversation history for LLM context
    const newUserHistoryMessage: ConversationMessage = {
      role: 'user',
      content: text,
    }
    const updatedHistory = [...conversationHistory, newUserHistoryMessage]
    setConversationHistory(updatedHistory)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationHistory: updatedHistory.slice(-10), // Last 5 turns (10 messages)
        }),
      })

      const data = await res.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.answer || 'Sorry, I could not find an answer.',
        sources: data.sources || [],
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, botMessage])

      // Add assistant response to conversation history
      setConversationHistory(prev => [...prev, {
        role: 'assistant',
        content: data.answer || 'Sorry, I could not find an answer.',
        sources: data.sources,
      }])
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: 'Sorry, there was an error processing your request. Please try again.',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }, [inputValue, conversationHistory])

  const handleSuggestionClick = useCallback((text: string) => {
    handleSendMessage(text)
  }, [handleSendMessage])

  const handleNewChat = useCallback(() => {
    setMessages([])
    setConversationHistory([]) // Clear ephemeral conversation memory
    setHasStartedChat(false)
    setInputValue("")
    setShowSources(false)
  }, [])

  const handleSourceClick = useCallback((noteTitle: string) => {
    setViewingNote(noteTitle)
  }, [])

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background">
      <div className="flex flex-1 flex-col min-h-0">
        {!hasStartedChat ? (
          <WelcomeScreen
            suggestions={suggestionCards}
            onSuggestionClick={handleSuggestionClick}
            inputValue={inputValue}
            onInputChange={setInputValue}
            onSend={() => handleSendMessage()}
            onToggleSources={() => setShowSources(!showSources)}
          />
        ) : (
          <ChatView
            messages={messages}
            isTyping={isTyping}
            inputValue={inputValue}
            onInputChange={setInputValue}
            onSend={() => handleSendMessage()}
            onNewChat={handleNewChat}
            onToggleSources={() => setShowSources(!showSources)}
            showSources={showSources}
            messagesEndRef={messagesEndRef}
            onSourceClick={handleSourceClick}
          />
        )}
      </div>
      
      <SourcesPanel 
        isOpen={showSources} 
        onClose={() => setShowSources(false)}
        onSourceClick={handleSourceClick}
      />

      {/* Full documentation viewer */}
      <NoteViewer
        noteTitle={viewingNote}
        onClose={() => setViewingNote(null)}
      />
    </div>
  )
}
