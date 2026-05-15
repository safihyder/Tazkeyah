"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Compass, ShieldCheck, Heart, Zap, Award, Target, Calendar, Info, Trophy, Smile, CheckCircle2, Hand, MessageSquare, BookOpen, Key, Anchor, Globe } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: 1,
    title: "The Silent Vow",
    description: "Repentence (Tawbah) is a private contract between you and Allah. No one else needs to know.",
    icon: Key,
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    id: 2,
    title: "The Digital Shield",
    description: "Install website blockers, unfollow triggering accounts, and use our Urge Emergency system.",
    icon: ShieldCheck,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    id: 3,
    title: "The Daily Ritual",
    description: "Check in with the tracker every morning. Read the Daily Reminder before you start your day.",
    icon: Calendar,
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    id: 4,
    title: "The Accountability",
    description: "Even in private recovery, knowledge is power. Spend time in the Learn section to build your armor.",
    icon: BookOpen,
    color: "bg-purple-500/10 text-purple-600",
  }
];

export default function StartHere() {
  return (
    <div className="container max-w-5xl py-12 px-4 space-y-24 pb-32">
        <div className="text-center space-y-4 pt-10">
            <h1 className="text-4xl md:text-6xl font-black font-heading italic text-primary leading-tight">Your New Chapter<br />Starts Now.</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
               "Verily, Allah will not change the condition of a people until they change what is in themselves." — Quran (13:11)
            </p>
        </div>

        <section className="space-y-12">
           <div className="flex items-center gap-4 border-b pb-4">
              <span className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">1</span>
              <h2 className="text-2xl font-bold font-heading uppercase tracking-widest opacity-80 italic">The Path of Purity</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {steps.map((step, i) => (
                   <motion.div
                       key={i}
                       initial={{ opacity: 0, x: -20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       transition={{ delay: i * 0.1 }}
                       viewport={{ once: true }}
                       className="p-8 rounded-3xl border bg-card/40 backdrop-blur-sm flex flex-col gap-6"
                   >
                      <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center", step.color)}>
                         <step.icon className="h-6 w-6" />
                      </div>
                      <div className="space-y-2">
                         <h3 className="text-xl font-bold font-heading italic">{step.title}</h3>
                         <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
                      </div>
                   </motion.div>
               ))}
           </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-muted/20 p-10 md:p-20 rounded-[3rem]">
            <div className="space-y-10">
                <div className="space-y-4">
                    <h2 className="text-4xl font-black font-heading italic">Everything you need to succeed.</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                       We've combined modern psychology with Islamic spiritual tools to create a recovery experience that addresses both the mind and the heart.
                    </p>
                </div>
                <div className="space-y-4">
                    {[
                        { icon: Anchor, title: "Urge Support", text: "Tools to Ground you in moments of peak temptation." },
                        { icon: Zap, title: "Streak Counter", text: "Positive reinforcement for every single day of victory." },
                        { icon: MessageSquare, title: "Spiritual Journaling", text: "Private space to analyze and understand your triggers." },
                    ].map((feature, i) => (
                        <div key={i} className="flex gap-4">
                           <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex-shrink-0 flex items-center justify-center">
                              <feature.icon className="h-5 w-5" />
                           </div>
                           <div className="space-y-1">
                               <p className="font-bold text-sm tracking-wide">{feature.title}</p>
                               <p className="text-xs text-muted-foreground">{feature.text}</p>
                           </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full aspect-square relative rounded-[3rem] overflow-hidden border shadow-2xl">
                 <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 animate-pulse" />
                 <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="w-full aspect-video bg-background/80 rounded-3xl border-4 border-dotted border-primary/20 flex items-center justify-center">
                         <Globe className="h-20 w-20 text-primary/10" />
                    </div>
                 </div>
                 <div className="absolute bottom-8 right-8 p-6 bg-background rounded-3xl border shadow-xl flex items-center gap-4 animate-bounce">
                    <ShieldCheck className="h-8 w-8 text-emerald-500" />
                    <div className="space-y-1">
                        <p className="text-xs font-bold uppercase">Encrypted</p>
                        <p className="text-[10px] opacity-60">Your data never leaves your device.</p>
                    </div>
                 </div>
            </div>
        </section>

        <section className="text-center py-20 px-6 space-y-10 bg-primary text-primary-foreground rounded-[4rem] relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
            <div className="relative space-y-10 max-w-2xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-black font-heading italic">Ready to commit?</h2>
                <p className="text-lg opacity-80">
                   Recovery is only possible with a firm decision. Say the "Niyyah" (intention) in your heart: "I am doing this for the sake of Allah and for the sake of my soul."
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/daily" className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "rounded-full px-12 h-14 text-lg")}>
                        Start Today's Lesson
                    </Link>
                    <Link href="/tracker" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-12 h-14 text-lg bg-transparent text-white border-white/20 hover:bg-white/10")}>
                        Set Up My Tracker
                    </Link>
                </div>
            </div>
        </section>
    </div>
  );
}
