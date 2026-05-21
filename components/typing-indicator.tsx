"use client"

export function TypingIndicator() {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="flex-shrink-0 w-7 h-7 mr-3">
        <img 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sRibcwDKg9apbjGoVuKFXQomfZuHuF.png"
          alt="Brain"
          className="w-7 h-7"
        />
      </div>
      <div className="flex items-center gap-1">
        <span 
          className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse-dot"
          style={{ animationDelay: "0s" }}
        />
        <span 
          className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse-dot"
          style={{ animationDelay: "0.2s" }}
        />
        <span 
          className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse-dot"
          style={{ animationDelay: "0.4s" }}
        />
      </div>
    </div>
  )
}
