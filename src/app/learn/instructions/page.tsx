"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TEN_INSTRUCTIONS } from "@/lib/data";
import { 
  EyeOff, 
  Calendar, 
  Dumbbell, 
  Repeat, 
  Users, 
  Heart, 
  Zap, 
  ShieldCheck, 
  Utensils, 
  Sparkles,
  ChevronRight,
  BookOpen
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState, useEffect, Suspense } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

const iconMap: Record<string, any> = {
  EyeOff,
  Calendar,
  Dumbbell,
  Repeat,
  Users,
  Heart,
  Zap,
  ShieldCheck,
  Utensils,
  Sparkles
};

export default function InstructionsPage() {
  return (
    <Suspense fallback={<div className="container py-24 text-center">Loading instructions...</div>}>
      <InstructionsContent />
    </Suspense>
  );
}

function InstructionsContent() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const step = searchParams.get("step");
    if (step) {
      setActiveStep(parseInt(step));
      setTimeout(() => {
        const el = document.getElementById(`step-${step}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 500);
    }
  }, [searchParams]);

  return (
    <div className="container py-12 px-4 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <BookOpen className="h-4 w-4" />
          <span>Ayatullah Makeram Shirazi's Guidance</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 italic text-primary">
          The 10 Instructions for Success
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Timeless practical steps to reclaim your spiritual freedom and build a path towards purity and self-discipline.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {/* Connection Line (Desktop) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block -z-10" />

        {TEN_INSTRUCTIONS.map((step, index) => {
          const Icon = iconMap[step.icon];
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={step.id}
              id={`step-${step.id}`}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "flex flex-col",
                isEven ? "md:pr-12 md:text-right md:items-end" : "md:pl-12 md:text-left md:items-start"
              )}
            >
              <Card 
                className={cn(
                  "w-full group cursor-pointer transition-all hover:shadow-xl hover:border-primary/50 bg-card/50 backdrop-blur-sm relative overflow-hidden",
                  activeStep === step.id ? "ring-2 ring-primary border-primary" : ""
                )}
                onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
              >
                {/* Step Number Badge */}
                <div className={cn(
                  "absolute top-0 w-12 h-12 flex items-center justify-center font-bold text-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground",
                  isEven ? "right-0 rounded-bl-3xl" : "left-0 rounded-br-3xl"
                )}>
                  {step.id}
                </div>

                <CardHeader className="pt-10">
                  <div className={cn(
                    "p-3 rounded-2xl bg-primary/5 text-primary mb-4 w-fit transition-transform group-hover:scale-110",
                    isEven ? "ml-auto" : ""
                  )}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl md:text-2xl font-heading italic">{step.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {step.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <motion.div
                    initial={false}
                    animate={{ height: activeStep === step.id ? "auto" : 0, opacity: activeStep === step.id ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 mt-4 border-t text-sm text-muted-foreground leading-relaxed italic">
                      {step.fullContent}
                    </div>
                  </motion.div>
                  
                  <div className={cn(
                    "flex items-center gap-2 mt-4 text-xs font-semibold text-primary uppercase tracking-wider",
                    isEven ? "justify-end" : "justify-start"
                  )}>
                    <span>{activeStep === step.id ? "Show less" : "Read more"}</span>
                    <ChevronRight className={cn("h-3 w-3 transition-transform", activeStep === step.id ? "rotate-90" : "")} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-24 p-8 rounded-[2rem] bg-muted/50 border border-dashed text-center"
      >
        <Sparkles className="h-8 w-8 text-primary mx-auto mb-4 opacity-40" />
        <h3 className="text-2xl font-bold font-heading mb-4 italic">The Path of a Thousand Miles</h3>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          These instructions are not just rules, but tools for your transformation. Start with one, and let the light of consistency guide you.
        </p>
        <Link 
          href="/start" 
          className={cn(buttonVariants({ size: "lg" }), "rounded-full px-8")}
        >
          Start My Progress Tracking
        </Link>
      </motion.div>
    </div>
  );
}
