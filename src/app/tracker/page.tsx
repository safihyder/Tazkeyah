"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, History, Heart, Calendar, Smile, Meh, Frown, LogOut, CheckCircle2, Award, Zap, Brain, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function HabitTracker() {
  const [streak, setStreak] = useState(0);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [mood, setMood] = useState<string | null>(null);
  const [showRelapse, setShowRelapse] = useState(false);

  useEffect(() => {
    const savedStreak = localStorage.getItem("nt-streak");
    if (savedStreak) setStreak(parseInt(savedStreak));
  }, []);

  const handleCheckIn = () => {
    setHasCheckedIn(true);
    setStreak((s) => {
        const newStreak = s + (hasCheckedIn ? 0 : 1);
        localStorage.setItem("nt-streak", newStreak.toString());
        return newStreak;
    });
  };

  const logRelapse = () => {
    const confirm = window.confirm("Relapse is part of recovery, not the end of it. Are you sure you want to reset your streak?");
    if (confirm) {
        setStreak(0);
        localStorage.setItem("nt-streak", "0");
        setHasCheckedIn(false);
        setMood(null);
        setShowRelapse(false);
    }
  };

  return (
    <div className="container max-w-6xl py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column: Streak & Core Tracker */}
            <div className="lg:col-span-2 space-y-8">
                <div className="flex flex-col md:flex-row gap-6">
                    <Card className="flex-1 bg-primary text-primary-foreground relative overflow-hidden flex flex-col justify-center items-center py-10 rounded-3xl group transition-all hover:scale-[1.02]">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                             <Zap className="h-24 w-24" />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-[0.2em] mb-2 opacity-80">Current Streak</span>
                        <div className="text-8xl font-black font-heading mb-2">{streak}</div>
                        <span className="text-lg font-medium opacity-80">Days of Purity</span>
                    </Card>

                    <Card className="flex-1 border-2 border-primary/20 rounded-3xl p-8 flex flex-col justify-between bg-background/50 backdrop-blur">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold font-heading">Daily Check-in</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                A small commitment every morning protects your journey throughout the day.
                            </p>
                        </div>
                        <div className="pt-6 space-y-4">
                             <div className="flex items-center justify-between text-sm">
                                <span className="font-bold">Goal Reach: {Math.min(streak, 30)}/30</span>
                                <span className="opacity-60">{Math.round((Math.min(streak, 30) / 30) * 100)}% to Silver Medal</span>
                             </div>
                             <Progress value={(Math.min(streak, 30) / 30) * 100} className="h-3" />
                             <Button
                                className="w-full rounded-2xl h-14 text-lg font-bold shadow-lg"
                                disabled={hasCheckedIn}
                                onClick={handleCheckIn}
                             >
                                {hasCheckedIn ? (
                                    <span className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5" /> Already Checked-in</span>
                                ) : (
                                    "Confirm My Purity Today"
                                )}
                             </Button>
                        </div>
                    </Card>
                </div>

                <Card className="rounded-3xl p-8 border bg-card/30">
                    <Tabs defaultValue="mood" className="space-y-8">
                        <TabsList className="grid grid-cols-3 h-12 bg-muted/50 rounded-xl p-1">
                            <TabsTrigger value="mood" className="rounded-lg gap-2"><Smile className="h-4 w-4" /> Mood</TabsTrigger>
                            <TabsTrigger value="journal" className="rounded-lg gap-2"><Brain className="h-4 w-4" /> Triggers</TabsTrigger>
                            <TabsTrigger value="history" className="rounded-lg gap-2"><History className="h-4 w-4" /> History</TabsTrigger>
                        </TabsList>

                        <TabsContent value="mood" className="space-y-6 flex flex-col items-center py-4">
                            <h4 className="text-lg font-semibold">How are you feeling spiritually?</h4>
                            <div className="flex gap-4 md:gap-8 justify-center">
                               {[
                                  { label: "Peaceful", icon: Smile, color: "text-emerald-500", key: "calm" },
                                  { label: "Tested", icon: Meh, color: "text-amber-500", key: "tested" },
                                  { label: "Struggling", icon: Frown, color: "text-rose-500", key: "struggle" }
                               ].map((m) => (
                                   <button
                                      key={m.key}
                                      onClick={() => setMood(m.key)}
                                      className={cn(
                                          "flex flex-col items-center gap-2 p-4 rounded-2xl transition-all border-2 border-transparent",
                                          mood === m.key ? "bg-primary/5 border-primary/20 scale-110" : "hover:bg-muted opacity-60 hover:opacity-100"
                                      )}
                                   >
                                      <m.icon className={cn("h-10 w-10", m.color)} />
                                      <span className="text-xs font-bold uppercase tracking-widest">{m.label}</span>
                                   </button>
                               ))}
                            </div>
                            <div className="max-w-md w-full pt-4">
                                <p className="text-sm text-center italic text-muted-foreground">
                                   {mood === "calm" && "Mashallah. Use this calm time to increase your Dhikr and protect this state."}
                                   {mood === "tested" && "Urges are part of the process. Stay vigilant and keep your gaze lowered."}
                                   {mood === "struggle" && "Mercy is abundant. Do not lose hope. Lean on the Urge Emergency tools."}
                                   {!mood && "Select your current mood to reflect on your state."}
                                </p>
                            </div>
                        </TabsContent>

                        <TabsContent value="journal" className="space-y-6">
                            <div className="space-y-4">
                               <h4 className="text-lg font-semibold flex items-center gap-2">
                                  <ShieldCheck className="h-5 w-5 text-primary" />
                                  Record a Trigger (Journal)
                               </h4>
                               <div className="p-4 rounded-xl border bg-background/50 italic text-muted-foreground text-sm">
                                  A private space to analyze what leads you towards bad habits.
                               </div>
                               <textarea
                                  placeholder="What triggered you today? (e.g., Boredom, Social Media, Late night usage...)"
                                  className="w-full min-h-[120px] rounded-2xl border-2 bg-background p-4 text-sm focus:border-primary outline-none transition-all resize-none"
                               />
                               <Button variant="secondary" className="w-full rounded-xl">Save Private Reflection</Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="history" className="py-10 text-center">
                             <div className="flex flex-col items-center gap-4">
                                <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center opacity-40">
                                   <Calendar className="h-8 w-8" />
                                </div>
                                <p className="text-muted-foreground text-sm font-medium">History tracking will be available soon with local storage support.</p>
                             </div>
                        </TabsContent>
                    </Tabs>
                </Card>
            </div>

            {/* Right Column: Milestones & Management */}
            <div className="space-y-8">
                <Card className="rounded-3xl overflow-hidden border">
                    <CardHeader className="bg-muted/50 border-b">
                        <CardTitle className="text-lg font-heading flex items-center gap-2">
                             <Award className="h-5 w-5 text-amber-500" /> Milestones
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        {[
                            { title: "The First Step", text: "1 Day Clean", completed: streak >= 1 },
                            { title: "Shield of Faith", text: "7 Days Clean", completed: streak >= 7 },
                            { title: "Self Mastery", text: "30 Days Clean", completed: streak >= 30 },
                            { title: "Pure Heart", text: "90 Days Clean", completed: streak >= 90 },
                        ].map((milestone, i) => (
                             <div key={i} className="flex items-center gap-4">
                                <div className={cn(
                                    "h-10 w-10 rounded-xl flex items-center justify-center border-2",
                                    milestone.completed ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-600" : "bg-muted border-transparent opacity-40"
                                )}>
                                   <Award className="h-5 w-5" />
                                </div>
                                <div>
                                   <p className={cn("text-sm font-bold", !milestone.completed && "opacity-50")}>{milestone.title}</p>
                                   <p className="text-xs text-muted-foreground">{milestone.text}</p>
                                </div>
                             </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="rounded-3xl border-rose-500/10 bg-rose-500/[0.02] overflow-hidden">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm uppercase tracking-widest opacity-60">Management</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <Button
                            variant="ghost"
                            className="w-full justify-between h-12 text-destructive hover:bg-destructive/10 hover:text-destructive rounded-xl"
                            onClick={() => setShowRelapse(true)}
                        >
                            <span className="font-semibold">Relapse Incident</span>
                            <LogOut className="h-4 w-4" />
                        </Button>

                        <AnimatePresence>
                             {showRelapse && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="pt-4 border-t space-y-4 overflow-hidden"
                                >
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Failing is not the end. The door to repentence is always open. Allah loves those who return. Reset your streak and start fresh now.
                                    </p>
                                    <div className="flex gap-2">
                                        <Button variant="destructive" size="sm" className="flex-1 rounded-lg" onClick={logRelapse}>Reset Streak</Button>
                                        <Button variant="outline" size="sm" className="flex-1 rounded-lg" onClick={() => setShowRelapse(false)}>Cancel</Button>
                                    </div>
                                </motion.div>
                             )}
                        </AnimatePresence>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
