"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ShieldAlert, Heart, Calendar, BookOpen, BarChart3, MessageSquare, HelpCircle, Info, Target, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { OrbitalNavigation } from "@/components/OrbitalNavigation";
import { TEN_INSTRUCTIONS } from "@/lib/data";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowLeft } from "lucide-react";
import gsap from "gsap";

const mainSections = [
  {
    title: "Daily Reminders",
    href: "/daily",
    icon: "Calendar" as const,
    size: "lg" as const,
    color: "bg-emerald-500/5 hover:bg-emerald-500/10",
  },
  {
    title: "Urge Emergency",
    href: "/emergency",
    icon: "ShieldAlert" as const,
    size: "lg" as const,
    color: "bg-amber-500/5 hover:bg-amber-500/10",
  },
  {
    title: "AI Sanctuary",
    href: "/chat",
    icon: "MessageSquare" as const,
    size: "lg" as const,
    color: "bg-indigo-500/5 hover:bg-indigo-500/10",
  },
  {
    title: "Progress",
    href: "/progress",
    icon: "BarChart3" as const,
    size: "lg" as const,
    color: "bg-blue-500/5 hover:bg-blue-500/10",
  },
  {
    title: "Wisdom",
    href: "/learn",
    icon: "BookOpen" as const,
    size: "lg" as const,
    color: "bg-purple-500/5 hover:bg-purple-500/10",
  },
  {
    title: "Q&A",
    href: "/qa",
    icon: "HelpCircle" as const,
    size: "md" as const,
    color: "bg-rose-500/5 hover:bg-rose-500/10",
  },
  {
    title: "Tracker",
    href: "/tracker",
    icon: "Target" as const,
    size: "md" as const,
    color: "bg-cyan-500/5 hover:bg-cyan-500/10",
  },
  {
    title: "About",
    href: "/about",
    icon: "Info" as const,
    size: "md" as const,
    color: "bg-slate-500/5 hover:bg-slate-500/10",
  },
];



export default function Home() {
  const [showBubbles, setShowBubbles] = useState(false);
  const heroTextRef = useRef<HTMLDivElement>(null);

  const handleExplore = () => {
    // GSAP animation for text disappearance
    if (heroTextRef.current) {
      gsap.to(heroTextRef.current, {
        opacity: 0,
        y: -50,
        filter: "blur(15px)",
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => setShowBubbles(true)
      });
    }
  };

  const handleReset = () => {
    setShowBubbles(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-background">
      {/* Hero Section */}
      <section className={cn(
        "relative w-full overflow-hidden flex flex-col items-center justify-center text-center px-4 transition-all duration-700",
        showBubbles ? "h-screen fixed inset-0 z-50 bg-background" : "min-h-[95vh] pt-10"
      )}>
        {/* Background Accents */}
        <div className="absolute top-0 -z-20 h-full w-full bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        </div>

        {/* Bubbles Universe */}
        <AnimatePresence>
          {showBubbles && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex flex-col overflow-y-auto overflow-x-hidden scrollbar-hide"
            >
              <div className="w-full min-h-full max-w-7xl mx-auto flex flex-col items-center py-8 px-4">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="sticky top-0 z-50 mb-12 text-center"
                ><Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="rounded-full text-xs opacity-60 hover:opacity-100 hover:bg-primary/10 transition-all backdrop-blur-md bg-background/20"
                >
                    <ArrowLeft className="mr-2 h-3 w-3" /> Back to Introduction
                  </Button>
                </motion.div>

                <div className="w-full flex-1 flex items-center justify-center overflow-visible">
                  <OrbitalNavigation items={[...mainSections]} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Text */}
        {!showBubbles && (
          <div
            ref={heroTextRef}
            className="max-w-4xl relative z-20 flex flex-col items-center px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center rounded-full border border-primary/20 px-4 py-1 text-xs md:text-sm font-medium mb-10 bg-primary/5 text-primary backdrop-blur-sm"
            >
              <Zap className="h-3 w-3 mr-2" />
              <span className="tracking-widest uppercase">Spiritual Freedom & Purity</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 font-heading text-primary leading-[1.1]">
              Break the chains. <br />
              <span className="text-foreground font-light italic">Find your peace.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto font-normal">
              A private sanctuary built to help you overcome habits through Timeless Wisdom and modern tools.
            </p>

            <Button
              size="lg"
              onClick={handleExplore}
              className="rounded-full px-10 h-16 text-lg font-bold shadow-xl shadow-primary/20 group transition-all hover:scale-105"
            >
              Enter the Sanctuary
              <ChevronDown className="ml-3 h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>
        )}
      </section>

      {/* Other Sections (Hidden when bubbles are shown) */}
      {!showBubbles && (
        <div className="w-full">
          {/* Quote Section */}
          <section className="w-full py-24 bg-muted/30">
            <div className="container px-4 mx-auto text-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-2xl mx-auto"
              >
                <BookOpen className="h-10 w-10 text-primary mx-auto mb-6 opacity-40" />
                <p className="text-2xl md:text-3xl font-heading italic leading-snug mb-6">
                  "Truly, in the remembrance of Allah do hearts find rest."
                </p>
                <p className="text-muted-foreground font-medium">— Quran (13:28)</p>
              </motion.div>
            </div>
          </section>

          {/* Brief Explanation */}
          <section className="container py-32 px-4 flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold font-heading italic">More than just a habit tracker.</h2>
              <p className="text-lg text-muted-foreground">
                We believe recovery isn't just about counting days; it's about rebuilding your connection with Allah and your own soul.
              </p>
              <div className="space-y-4">
                {[
                  "Zero judgment, 100% support.",
                  "Spiritual grounding in every tool.",
                  "Built for privacy and discretion.",
                  "Evidence-based recovery meets Islamic values."
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span className="font-medium text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full max-w-lg aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl border flex items-center justify-center p-12 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                {/* Geometric Accent Mockup */}
                <div className="w-full h-full grid grid-cols-6 grid-rows-6 gap-2">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className="border border-foreground rounded-sm rotate-45" />
                  ))}
                </div>
              </div>
              <ShieldAlert className="w-32 h-32 text-primary opacity-20" />
            </div>
          </section>

          {/* CTA Section */}
          <section className="container px-4 py-20">
            <div className="bg-primary text-primary-foreground p-10 md:p-20 rounded-[3rem] text-center space-y-8 relative overflow-hidden">
              <div className="absolute top-[-10%] left-[-10%] w-[30%] h-[30%] bg-white/10 rounded-full blur-3xl opacity-50" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-white/10 rounded-full blur-3xl opacity-50" />

              <h2 className="text-4xl md:text-5xl font-bold font-heading">Ready to reclaim your light?</h2>
              <p className="text-lg opacity-90 max-w-xl mx-auto">
                Join others on the path of purification. It's free, private, and forever.
              </p>
              <Link href="/start" className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "rounded-full px-10 h-14 text-lg shadow-2xl shadow-black/20")}>
                Create My Journey
              </Link>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
