"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SEVEN_ADVENTURES } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, ChevronLeft, Sword, Shield, Sparkles } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdventuresPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < SEVEN_ADVENTURES.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const adventure = SEVEN_ADVENTURES[currentStep];
  const progress = ((currentStep + 1) / SEVEN_ADVENTURES.length) * 100;

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <Link 
            href="/learn" 
            className={cn(buttonVariants({ variant: "ghost" }), "mb-6")}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Wisdom Library
          </Link>
          <h1 className="text-4xl font-bold font-heading text-primary mb-4">
            The Seven Adventures of Matrimony
          </h1>
          <p className="text-muted-foreground italic">
            "Pass these seven legendary obstacles with heroism and break the magic spells of delusion."
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-primary/60 mb-2">
            <span>Adventure {currentStep + 1} of 7</span>
            <span>{Math.round(progress)}% Conquered</span>
          </div>
          <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="glass-card p-8 md:p-12 relative overflow-hidden border-primary/20">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Sword className="h-40 w-40 text-primary rotate-12" />
              </div>

              <div className="relative z-10">
                <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary mb-8 shadow-inner">
                  <Shield className="h-8 w-8" />
                </div>

                <h2 className="text-3xl font-bold mb-4 font-heading">{adventure.title}</h2>
                <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                  {adventure.description}
                </p>

                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h3 className="font-bold text-primary uppercase tracking-wider text-sm">Author's Guidance</h3>
                  </div>
                  <p className="text-lg italic leading-relaxed text-foreground/90">
                    "{adventure.authorView}"
                  </p>
                </div>
              </div>

              <div className="flex justify-between mt-12 pt-8 border-t border-primary/10">
                <Button 
                  variant="outline" 
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="rounded-full px-6"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>

                {currentStep < SEVEN_ADVENTURES.length - 1 ? (
                  <Button 
                    onClick={nextStep}
                    className="rounded-full px-8 shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                  >
                    Next Adventure <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Link 
                    href="/learn"
                    className={cn(buttonVariants({ variant: "default" }), "rounded-full px-8 shadow-lg shadow-primary/20")}
                  >
                    Complete Journey <Sparkles className="ml-2 h-4 w-4" />
                  </Link>
                )}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

