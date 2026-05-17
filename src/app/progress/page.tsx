"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress as ShadcnProgress } from "@/components/ui/progress";
import { BarChart3, LineChart, PieChart, ShieldCheck, Heart, Zap, Award, Target, Calendar, Activity, Info, Trophy, Smile, CheckCircle2, Meh, Frown, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useTrackerStore } from "@/lib/store";

export default function Progress() {
  const { state, isLoaded } = useTrackerStore();
  
  if (!isLoaded) return null;

  const streak = state.streak;

  const milestones = [
    { label: "1 Day", days: 1, text: "The first victory." },
    { label: "1 Week", days: 7, text: "A solid foundation." },
    { label: "2 Weeks", days: 14, text: "Halfway to the first month." },
    { label: "30 Days", days: 30, text: "A new standard." },
    { label: "90 Days", days: 90, text: "Total transformation." },
  ];

  const currentMilestone = milestones.find((m) => m.days > streak) || milestones[milestones.length - 1];
  const previousMilestone = milestones[milestones.lastIndexOf(milestones.find((m) => m.days > streak)!) - 1] || { days: 0 };
  const percentage = Math.min(Math.round(((streak - previousMilestone.days) / (currentMilestone.days - previousMilestone.days)) * 100), 100);

  // Generate last 14 days
  const last14Days = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  });

  return (
    <div className="container max-w-6xl py-12 px-4 space-y-12">
        <div className="text-center mb-16 space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold font-heading italic text-primary">Your Spiritual Journey</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
               "Verily, the best of people are those who strive and return to Allah." Every day is a brick in the wall of your freedom.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="rounded-3xl border-2 border-primary/10 bg-primary/5 flex flex-col justify-center items-center py-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                     <Zap className="h-16 w-16" />
                </div>
                <div className="text-6xl font-black font-heading mb-2 text-primary">{streak}</div>
                <span className="text-xs font-bold uppercase tracking-widest opacity-60">Current Streak</span>
            </Card>

            <Card className="rounded-3xl flex flex-col justify-center items-center py-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                     <Trophy className="h-16 w-16" />
                </div>
                <div className="text-4xl font-bold font-heading mb-2">{Math.floor(streak / 7)}</div>
                <span className="text-xs font-bold uppercase tracking-widest opacity-60">Weeks Complete</span>
            </Card>

            <Card className="rounded-3xl flex flex-col justify-center items-center py-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                     <Smile className="h-16 w-16" />
                </div>
                <div className="text-4xl font-bold font-heading mb-2">High</div>
                <span className="text-xs font-bold uppercase tracking-widest opacity-60">Spiritual Consistency</span>
            </Card>

            <Card className="rounded-3xl flex flex-col justify-center items-center py-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                     <CheckCircle2 className="h-16 w-16" />
                </div>
                <div className="text-4xl font-bold font-heading mb-2">{streak > 0 ? "True" : "Fresh"}</div>
                <span className="text-xs font-bold uppercase tracking-widest opacity-60">Victory Mindset</span>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <Card className="rounded-[2.5rem] border p-8 space-y-10">
                   <div className="flex items-center justify-between">
                      <div className="space-y-1">
                          <h3 className="text-2xl font-bold font-heading">Road to {currentMilestone.label}</h3>
                          <p className="text-sm text-muted-foreground">{currentMilestone.text}</p>
                      </div>
                      <div className="h-16 w-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                          {percentage}%
                      </div>
                   </div>

                   <div className="space-y-6">
                       <ShadcnProgress value={percentage} className="h-6 rounded-full border-4 border-background shadow-inner" />
                       <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-60">
                          <span>{previousMilestone.days} Days (Check-in)</span>
                          <span>{currentMilestone.days} Days (Next Reward)</span>
                       </div>
                   </div>

                   <div className="pt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="p-6 rounded-3xl border bg-muted/20 flex items-center gap-6">
                          <div className="h-12 w-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                             <Target className="h-6 w-6" />
                          </div>
                          <div>
                             <p className="text-xs font-bold uppercase tracking-widest opacity-50">Remaining</p>
                             <p className="text-xl font-bold font-heading">{currentMilestone.days - streak} Days</p>
                          </div>
                       </div>
                       <div className="p-6 rounded-3xl border bg-muted/20 flex items-center gap-6">
                          <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                             <Activity className="h-6 w-6" />
                          </div>
                          <div>
                             <p className="text-xs font-bold uppercase tracking-widest opacity-50">Momentum</p>
                             <p className="text-xl font-bold font-heading">Expanding</p>
                          </div>
                       </div>
                   </div>
                </Card>

                <Card className="rounded-[2.5rem] p-10 space-y-8 bg-muted/30 border-none">
                    <h3 className="text-2xl font-bold font-heading flex items-center gap-3">
                       <ShieldCheck className="h-6 w-6 text-primary" />
                       Recent Activity (Last 14 Days)
                    </h3>
                    <div className="w-full bg-background/50 rounded-3xl border p-6 flex flex-col gap-6">
                        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                            {last14Days.map(dateStr => {
                                const entry = state.history[dateStr];
                                const mood = entry?.mood;
                                const isToday = dateStr === last14Days[last14Days.length - 1];
                                
                                let bgColor = "bg-muted";
                                if (mood === "calm") bgColor = "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]";
                                else if (mood === "tested") bgColor = "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]";
                                else if (mood === "struggle") bgColor = "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]";

                                return (
                                    <div key={dateStr} className="flex flex-col items-center gap-2 min-w-[3rem]">
                                        <div 
                                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${bgColor} ${isToday ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
                                          title={`${dateStr}: ${mood || 'No record'}`}
                                        >
                                           {mood === 'calm' && <Smile className="h-5 w-5 text-white" />}
                                           {mood === 'tested' && <Meh className="h-5 w-5 text-white" />}
                                           {mood === 'struggle' && <Frown className="h-5 w-5 text-white" />}
                                        </div>
                                        <span className="text-[10px] uppercase font-bold opacity-50">
                                            {new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' })}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        
                        <div className="pt-4 border-t space-y-4">
                            <h4 className="text-sm font-bold uppercase tracking-widest opacity-70">Recent Reflections</h4>
                            <div className="space-y-3">
                                {Object.values(state.history).filter(e => e.journal).slice(-3).reverse().map((entry, i) => (
                                    <div key={i} className="p-4 rounded-2xl bg-muted/30 border border-primary/5 text-sm italic flex gap-4">
                                        <div className="opacity-40 mt-0.5"><MessageSquare className="h-4 w-4" /></div>
                                        <div>
                                            <span className="font-bold opacity-50 mr-2 not-italic text-xs">{entry.date}</span>
                                            <span className="text-muted-foreground">"{entry.journal}"</span>
                                        </div>
                                    </div>
                                ))}
                                {Object.values(state.history).filter(e => e.journal).length === 0 && (
                                    <p className="text-sm text-muted-foreground italic opacity-60">No journal entries recorded yet. Use the Tracker to write private reflections.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="space-y-8">
                <Card className="rounded-[2.5rem] bg-indigo-600 text-white overflow-hidden relative p-8 h-full flex flex-col justify-between">
                     <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-white/10 rounded-full blur-[80px]" />
                     <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-black/10 rounded-full blur-[80px]" />

                     <div className="relative space-y-6">
                         <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
                            <Heart className="h-6 w-6" />
                         </div>
                         <h3 className="text-3xl font-bold font-heading leading-tight">Reflection for the long-haul.</h3>
                         <p className="text-lg opacity-80">
                            Recovery isn't just about stoping a bad habit. It's about starting a better life.
                         </p>
                     </div>

                     <div className="relative pt-12 space-y-4">
                         <p className="text-sm font-medium opacity-60">"The best of people are those whose lives are long and their deeds are good."</p>
                         <div className="h-px bg-white/20 w-full" />
                         <span className="text-xs uppercase tracking-widest opacity-50 font-bold">Wisdom from Hadith</span>
                     </div>
                </Card>
            </div>
        </div>
    </div>
  );
}
