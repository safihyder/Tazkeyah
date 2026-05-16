"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { MessageCircle, X, Send, Sparkles, User, Bot, Minimize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error: chatError } = useChat({
    api: "/api/chat",
  });
  const isLoading = status === "loading" || status === "streaming";
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('ChatWidget mounted. sendMessage:', !!sendMessage, 'status:', status);
  }, [sendMessage, status]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    try {
      await sendMessage({ role: "user", content: input });
      setInput("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[380px] h-[550px] max-h-[80vh] flex flex-col bg-background/80 backdrop-blur-xl border border-border shadow-2xl rounded-3xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b bg-primary/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Youth Path Guide</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Online</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8 hover:bg-background/80"
                onClick={() => setIsOpen(false)}
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4 pb-4">
                {messages.length === 0 && (
                  <div className="text-center py-12 px-6">
                    <div className="h-16 w-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Bot className="h-8 w-8 text-primary/40" />
                    </div>
                    <h4 className="font-medium mb-2">As-salamu alaykum</h4>
                    <p className="text-sm text-muted-foreground">
                      I'm here to offer guidance based on Ayatullah Makeram Shirazi's teachings. How can I support you today?
                    </p>
                  </div>
                )}
                {messages.map((m: any) => (
                  <div
                    key={m.id}
                    className={cn(
                      "flex gap-3 max-w-[85%]",
                      m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                    )}
                  >
                    <div className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center shrink-0 border",
                      m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    )}>
                      {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div
                      className={cn(
                        "p-3 rounded-2xl text-sm leading-relaxed",
                        m.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-none"
                          : "bg-muted/50 border rounded-tl-none"
                      )}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 mr-auto max-w-[85%]">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 bg-muted border">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="p-3 rounded-2xl bg-muted/50 border rounded-tl-none">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-4 bg-background border-t flex gap-2"
            >
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={handleInputChange}
                className="rounded-full bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary h-10"
              />
              <Button 
                type="submit" 
                size="icon" 
                className="rounded-full shrink-0 h-10 w-10 shadow-lg shadow-primary/20"
                disabled={!input.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <div className="px-4 pb-2 text-[9px] text-center text-muted-foreground opacity-60">
              Guidance based on 'Sexual Problems of Youths'
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          size="lg"
          className="h-14 w-14 rounded-full shadow-2xl shadow-primary/40 p-0"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </motion.div>
    </div>
  );
}
