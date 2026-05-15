"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ShieldAlert, Heart, Calendar, BookOpen, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Calendar,
    title: "Daily Reminders",
    description: "Start each day with Quranic wisdom and Ahlulbayt teachings to keep your spirit strong.",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: ShieldAlert,
    title: "Urge Emergency",
    description: "A 60-second sanctuary for when things feel overwhelming. Breathe, Dhikr, and reset.",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Celebrate milestones and track your journey towards spiritual freedom, non-judgmentally.",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    icon: Heart,
    title: "Safe & Support",
    description: "A private, compassionate space focused on mercy, discipline, and consistent growth.",
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full py-20 lg:py-32 overflow-hidden flex flex-col items-center justify-center text-center px-4">
        {/* Background Accents */}
        <div className="absolute top-0 -z-10 h-full w-full bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium mb-6 bg-background/50 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            <span>Your journey to purity starts here</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 font-heading text-primary">
            Break chains. <br />
            <span className="text-foreground italic">Find peace.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
            Tazkeyah is a private sanctuary for those seeking to overcome bad habits through the timeless wisdom of the Quran and the Ahlulbayt.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/start" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-8 h-12 text-md")}>
              Start Your Journey
            </Link>
            <Link href="/emergency" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-8 h-12 text-md bg-background/50")}>
              Need Help Now?
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats / Features Grid */}
      <section className="container py-24 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all"
            >
              <div className={cn("inline-flex p-3 rounded-xl mb-4", feature.color)}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

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
          <Link href="/start" className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "rounded-full px-10 h-14 text-lg")}>
            Create My Journey
          </Link>
        </div>
      </section>
    </div>
  );
}
