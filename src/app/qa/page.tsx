"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Plus,
  Minus,
  Brain,
  Shield,
  Scale,
  MessageCircle,
  Sparkles,
  ChevronDown,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import wisdomData from "@/data/wisdom.json";
import { cn } from "@/lib/utils";

export default function QAPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqs = (wisdomData as any).faq || [];

  const filteredFaqs = faqs.filter((faq: any) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Your question has been submitted privately for research. Alhamdulillah.");
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Header */}
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-2">
          <MessageCircle className="h-8 w-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight">Guidance & Fatwa</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto italic">
          Finding clarity through logic, spiritual wisdom, and the rulings of our Fuqaha.
        </p>

        <div className="relative max-w-xl mx-auto mt-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search questions (e.g. fast, prayer, relapse)..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-background/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4 mb-20">
        {filteredFaqs.map((faq: any) => (
          <div
            key={faq.id}
            className={cn(
              "rounded-3xl border transition-all duration-300 overflow-hidden",
              expandedId === faq.id ? "bg-primary/5 border-primary/20 shadow-xl" : "bg-card border-border hover:border-primary/20"
            )}
          >
            <button
              onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
              className="w-full p-6 text-left flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-primary/10 text-primary shrink-0">
                  {faq.category}
                </span>
                <h3 className="text-lg md:text-xl font-bold leading-tight">{faq.question}</h3>
              </div>
              <div className={cn("shrink-0 transition-transform duration-300", expandedId === faq.id && "rotate-180")}>
                <ChevronDown className="h-6 w-6 text-primary" />
              </div>
            </button>

            <AnimatePresence>
              {expandedId === faq.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Logical Response */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-primary">
                          <Brain className="h-4 w-4" />
                          <span className="text-xs font-bold uppercase tracking-tighter">Logical Perspective</span>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground bg-background/40 p-4 rounded-2xl border border-primary/5">
                          {faq.logic}
                        </p>
                      </div>

                      {/* Spiritual Response */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-primary">
                          <Sparkles className="h-4 w-4" />
                          <span className="text-xs font-bold uppercase tracking-tighter">Spiritual Teaching</span>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground bg-background/40 p-4 rounded-2xl border border-primary/5 italic">
                          {faq.spiritual}
                        </p>
                      </div>

                      {/* Fiqh Response */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-primary">
                          <Scale className="h-4 w-4" />
                          <span className="text-xs font-bold uppercase tracking-tighter">Fiqh Ruling</span>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground bg-background/40 p-4 rounded-2xl border border-primary/5">
                          {faq.fiqh}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {filteredFaqs.length === 0 && (
          <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
            <p className="text-muted-foreground">No questions found matching your search. Try another keyword.</p>
          </div>
        )}
      </div>

      {/* Submit Question Form */}
      <Card className="rounded-[2.5rem] overflow-hidden border-primary/20 shadow-2xl relative">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <MessageCircle className="h-32 w-32 text-primary" />
        </div>

        <CardHeader className="bg-primary/5 p-8 border-b border-primary/10">
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <Plus className="h-6 w-6 text-primary" /> Ask a Question
          </CardTitle>
          <p className="text-muted-foreground">
            Don't find what you're looking for? Submit your question anonymously. Our research team will provide a 3-tier answer soon.
          </p>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">Category</label>
                <select className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 outline-none">
                  <option>Mindset & Psychology</option>
                  <option>Spiritual Growth</option>
                  <option>Fiqh & Purity</option>
                  <option>Relapse & Recovery</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">Title (Optional)</label>
                <Input placeholder="Brief topic..." className="rounded-xl h-12" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">Your Question</label>
              <Textarea
                placeholder="Describe your struggle or question in detail... (Completely Anonymous)"
                className="rounded-2xl min-h-[150px] resize-none"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full md:w-auto px-12 h-14 rounded-full text-lg font-bold shadow-xl shadow-primary/20"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Send Question"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
