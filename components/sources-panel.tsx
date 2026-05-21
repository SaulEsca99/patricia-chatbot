"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { knowledgeSources } from "@/lib/chat-data"
import { cn } from "@/lib/utils"

interface SourcesPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function SourcesPanel({ isOpen, onClose }: SourcesPanelProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Panel */}
      <div
        className={cn(
          "fixed md:relative right-0 top-0 h-full w-[320px] bg-background border-l border-border z-50 flex flex-col transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full md:hidden"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-border/50">
          <h2 className="text-sm font-medium text-foreground">Sources</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {knowledgeSources.map((source) => (
              <div key={source.id}>
                <h3 className="text-xs font-medium uppercase tracking-wider text-primary/80 mb-3 px-1">
                  {source.name}
                </h3>
                <div className="space-y-0.5">
                  {source.items.map((item) => (
                    <button
                      key={item.id}
                      className="w-full text-left px-3 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  )
}
