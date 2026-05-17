"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ShieldAlert, Heart, Calendar, BookOpen, BarChart3, MessageSquare, HelpCircle, Info, Target, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSanctuary, useScrollState } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles } from "lucide-react";

export default function Home() {
  const { openSanctuary } = useSanctuary();
  const { scrolled } = useScrollState();

  return (
    <div className="flex flex-col items-center min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden flex flex-col items-center justify-center text-center px-4 min-h-[calc(100vh-80px)] py-8">
        {/* Background Accents */}
        <div className="absolute top-0 -z-20 h-full w-full bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        </div>

        {/* Hero Text */}
        <div className="max-w-4xl relative z-20 flex flex-col items-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center rounded-full border border-primary/20 px-4 py-1 text-xs md:text-sm font-medium mb-10 bg-primary/5 text-primary backdrop-blur-sm"
          >
            <Zap className="h-3 w-3 mr-2" />
            <span className="tracking-widest uppercase">Spiritual Freedom & Purity</span>
          </motion.div>

          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 font-heading text-primary leading-[1.1]">
            Break the chains. <br />
            <span className="text-foreground font-light italic">Find your peace.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto font-normal">
            A private sanctuary built to help you overcome habits through Timeless Wisdom and modern tools.
          </p>

          <div className="h-32 flex items-center justify-center mt-4">
            <AnimatePresence mode="wait">
              {!scrolled && (
                <motion.div
                  key="hero-orb"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center gap-6 cursor-pointer group"
                  onClick={openSanctuary}
                >
                  <motion.div
                    layoutId="sanctuary-button"
                    className="relative flex items-center justify-center rounded-full h-20 w-20 md:h-24 md:w-24 bg-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.8)] transition-transform group-hover:scale-110"
                    transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Sparkles className="h-8 w-8 text-white group-hover:rotate-12 transition-transform" />
                  </motion.div>
                  <span className="text-sm md:text-base font-bold text-emerald-400 tracking-[0.2em] uppercase group-hover:text-emerald-300 transition-colors drop-shadow-md">
                    Enter the Sanctuary
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Other Sections */}
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
    </div>
  );
}
