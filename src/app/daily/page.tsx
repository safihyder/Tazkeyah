"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, BookOpen, Quote, Lightbulb, CheckSquare, HeartPulse } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const reminders = [
  {
    type: "quran",
    id: 1,
    title: "Quranic Wisdom",
    icon: BookOpen,
    text: "Whoever is careful of his duty to Allah, He will make for him an outlet...",
    reference: "Surah At-Talaq 65:2",
    reflection: "How can you turn back to Allah in your moment of struggle today?",
    action: "Say 100 times Istighfar (Astaghfirullah) with focus.",
  },
  {
    type: "ahlulbayt",
    id: 2,
    title: "Ahlulbayt Teaching",
    icon: Quote,
    text: "Patience is of two kinds: patience over what you dislike, and patience against what you desire.",
    reference: "Imam Ali (as)",
    reflection: "What desire are you currently patient against? Feel the strength in your restraint.",
    action: "Pause for 10 seconds before reacting to your next urge.",
  },
  {
    type: "reflection",
    id: 3,
    title: "Daily Reflection",
    icon: Lightbulb,
    text: "The path to recovery is not a straight line, but a series of small, intentional steps towards purity.",
    reference: "Purity Journey",
    reflection: "What is one small step you can take today to protect your gaze?",
    action: "Lower your gaze once today when it feels difficult.",
  }
];

export default function DailyReminder() {
  const [index, setIndex] = useState(0);
  const reminder = reminders[index];

  const next = () => setIndex((prev) => (prev + 1) % reminders.length);
  const prev = () => setIndex((prev) => (prev - 1 + reminders.length) % reminders.length);

  return (
    <div className="container max-w-4xl py-12 px-4 flex flex-col items-center">
        <div className="text-center mb-10 space-y-2">
            <h1 className="text-3xl md:text-5xl font-bold font-heading">Daily Reminders</h1>
            <p className="text-muted-foreground">Spiritual fuel for your journey today.</p>
        </div>

        <div className="w-full relative flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-2xl"
                >
                    <Card className="shadow-xl overflow-hidden border-2 border-primary/10">
                        <CardHeader className="bg-primary/5 pb-8 border-b dark:bg-primary/5">
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 <div className="p-2 rounded-lg bg-primary/20">
                                    <reminder.icon className="h-5 w-5 text-primary" />
                                 </div>
                                 <CardTitle className="text-xl">{reminder.title}</CardTitle>
                              </div>
                              <span className="text-xs font-bold uppercase tracking-widest opacity-40">Step {index + 1} of 3</span>
                           </div>
                        </CardHeader>
                        <CardContent className="pt-10 pb-8 space-y-8 px-8">
                             <div className="space-y-4">
                                <p className="text-2xl md:text-3xl font-heading leading-tight italic">
                                    "{reminder.text}"
                                </p>
                                <p className="text-sm font-semibold opacity-60 text-right">— {reminder.reference}</p>
                             </div>

                             <div className="p-6 rounded-2xl bg-muted/50 border border-muted-foreground/10 space-y-3">
                                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                    <HeartPulse className="h-4 w-4" />
                                    <span>Reflection</span>
                                </div>
                                <p className="text-sm leading-relaxed italic opacity-80">{reminder.reflection}</p>
                             </div>

                             <div className="p-6 rounded-2xl border-2 border-primary/20 bg-primary/5 space-y-3">
                                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                    <CheckSquare className="h-4 w-4" />
                                    <span>Today's Action</span>
                                </div>
                                <p className="text-sm font-medium leading-relaxed">{reminder.action}</p>
                             </div>
                        </CardContent>
                        <CardFooter className="flex justify-between bg-muted/20 border-t p-4">
                            <Button variant="ghost" size="sm" onClick={prev}>
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Previous
                            </Button>
                            <Button variant="ghost" size="sm" onClick={next}>
                                Next
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            </AnimatePresence>
        </div>

        <div className="mt-12 flex justify-center gap-2">
            {reminders.map((_, i) => (
                <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${index === i ? "w-8 bg-primary" : "w-2 bg-muted-foreground/20"}`}
                />
            ))}
        </div>

        <div className="mt-16 text-center">
           <Button variant="outline" size="sm" className="rounded-full text-muted-foreground">
              Return to Journey
           </Button>
        </div>
    </div>
  );
}
