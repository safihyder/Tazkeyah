"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import * as Icons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import wisdomData from "@/data/wisdom.json";

// Icon Helper to map string to Lucide component
const Icon = ({ name, className }: { name: string; className?: string }) => {
  const LucideIcon = (Icons as any)[name];
  if (!LucideIcon) return <Icons.BookOpen className={className} />;
  return <LucideIcon className={className} />;
};

export default function LearnPage() {
  const [selectedLesson, setSelectedLesson] = useState<typeof wisdomData.lessons[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLessons = (wisdomData.lessons || []).filter(lesson => 
    lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lesson.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold font-heading text-primary tracking-tight">Wisdom Library</h1>
          <p className="text-muted-foreground italic max-w-2xl">"Acquire knowledge, for he who acquires it in the way of Allah performs an act of piety." — Imam Ali (AS)</p>
        </div>
        
        <div className="relative max-w-sm w-full">
          <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search spiritual lessons..."
            className="w-full pl-11 pr-4 py-3 rounded-full border bg-background/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => (
          <motion.div
            key={lesson.id}
            layoutId={`card-${lesson.id}`}
            onClick={() => setSelectedLesson(lesson)}
            className="cursor-pointer"
          >
            <Card className="h-full glass-card hover:bg-primary/5 transition-all duration-300 border-primary/10 overflow-hidden group hover:shadow-xl hover:shadow-primary/5">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Icon name={lesson.icon} className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-primary/5 text-primary/70 border border-primary/10">
                    {lesson.category}
                  </span>
                </div>
                <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">{lesson.title}</CardTitle>
                <CardDescription className="line-clamp-2 mt-2 leading-relaxed">{lesson.description}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-0">
                <Button variant="ghost" className="w-full justify-between hover:bg-primary/10 group-hover:pl-6 transition-all">
                  Read Lesson <Icons.ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedLesson && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLesson(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            
            <motion.div 
              layoutId={`card-${selectedLesson.id}`}
              className="relative w-full max-w-3xl bg-background border border-primary/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Integrated Top Bar */}
              <div className="p-6 md:p-8 flex items-start justify-between shrink-0">
                <div className="flex items-center gap-5">
                   <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/10 shadow-lg shadow-primary/5">
                     <Icon name={selectedLesson.icon} className="h-7 w-7 md:h-8 md:w-8" />
                   </div>
                   <div className="space-y-1">
                      <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-[9px] font-extrabold uppercase tracking-[0.2em] border border-primary/10">
                        {selectedLesson.category}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold font-heading tracking-tight text-foreground leading-tight">
                        {selectedLesson.title}
                      </h2>
                   </div>
                </div>
                
                <Button 
                   variant="ghost" 
                   size="icon" 
                   className="rounded-full bg-muted/50 hover:bg-muted transition-colors h-10 w-10 shrink-0"
                   onClick={() => setSelectedLesson(null)}
                 >
                   <Icons.X className="h-5 w-5" />
                 </Button>
              </div>
              
              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto px-6 md:px-10 pb-10 custom-scrollbar">
                <div className="space-y-8 max-w-2xl">
                  <div className="border-l-4 border-primary/30 pl-6 py-2">
                    <p className="text-xl md:text-2xl text-foreground font-medium italic leading-relaxed opacity-90">
                      "{selectedLesson.description}"
                    </p>
                  </div>

                  <div className="prose prose-teal dark:prose-invert max-w-none">
                    <p className="text-foreground/80 leading-loose text-lg md:text-xl whitespace-pre-wrap">
                      {selectedLesson.content}
                    </p>
                  </div>

                  <div className="pt-4">
                    <Card className="bg-primary/5 border-primary/20 p-8 rounded-[1.5rem] relative overflow-hidden shadow-sm group">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform duration-500">
                        <Icons.Lightbulb className="h-20 w-20 text-primary" />
                      </div>
                      <div className="flex flex-col md:flex-row gap-6 relative z-10">
                        <div className="p-4 rounded-2xl bg-primary text-primary-foreground h-fit shadow-lg shadow-primary/20">
                          <Icons.Sparkles className="h-6 w-6" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-xl font-bold text-primary">Daily Practice</h4>
                          <p className="text-lg opacity-80 leading-relaxed font-medium">
                            {selectedLesson.action}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Ultra-Slim Footer */}
              <div className="p-4 border-t bg-muted/10 flex justify-end shrink-0">
                <Button 
                  className="rounded-full px-8 h-10 text-sm font-bold shadow-lg shadow-primary/10 transition-all hover:scale-105" 
                  onClick={() => setSelectedLesson(null)}
                >
                  Complete Lesson
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(var(--primary), 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(var(--primary), 0.2);
        }
      `}</style>
    </div>
  );
}
