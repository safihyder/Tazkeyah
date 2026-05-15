"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import wisdomData from "@/data/wisdom.json";
import { Textarea } from "@/components/ui/textarea";
import confetti from "canvas-confetti";
import { useShield } from "@/lib/store";

type Stage = "initial" | "intensity" | "breathing" | "action" | "complete" | "journal";
type Intensity = "low" | "medium" | "high" | "strategic";

// Icon Helper to map string to Lucide component
const Icon = ({ name, className }: { name: string; className?: string }) => {
  const LucideIcon = (Icons as any)[name];
  if (!LucideIcon) return <Icons.HelpCircle className={className} />;
  return <LucideIcon className={className} />;
};

export default function UrgeEmergency() {
    const [stage, setStage] = useState<Stage>("initial");
    const [intensity, setIntensity] = useState<Intensity>("medium");
    const [seconds, setSeconds] = useState(60);
    const [isActive, setIsActive] = useState(false);
    const [journalText, setJournalText] = useState("");
    const [randomWisdom, setRandomWisdom] = useState(wisdomData.verses[0]);
    const [currentPrompt, setCurrentPrompt] = useState(wisdomData.journalPrompts[0]);
    const { addStrength } = useShield();

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive && seconds > 0) {
            interval = setInterval(() => setSeconds((s) => s - 1), 1000);
        } else if (seconds === 0 && isActive) {
            setIsActive(false);
            setStage("action");
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, seconds]);

    const startProcess = (selectedIntensity: Intensity) => {
        setIntensity(selectedIntensity);
        const times = { low: 30, medium: 120, high: 300, strategic: 180 };
        setSeconds(times[selectedIntensity]);
        
        const relevantVerses = wisdomData.verses.filter(v => v.tags.includes(selectedIntensity));
        const selected = relevantVerses[Math.floor(Math.random() * relevantVerses.length)] || wisdomData.verses[0];
        setRandomWisdom(selected);
        
        setStage("breathing");
        setIsActive(true);
    };

    const handleVictory = () => {
        const amounts = { low: 2, medium: 5, high: 10, strategic: 7 };
        addStrength(amounts[intensity]);
        
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#065f46', '#fbbf24', '#ffffff']
        });
        
        setStage("complete");
    };

    const goToJournal = () => {
        const prompt = wisdomData.journalPrompts[Math.floor(Math.random() * wisdomData.journalPrompts.length)];
        setCurrentPrompt(prompt);
        setStage("journal");
    };

    const reset = () => {
        setStage("initial");
        setSeconds(60);
        setIsActive(false);
        setJournalText("");
    };

    const dynamicActions = wisdomData.recoveryActions.filter(a => a.tags.includes(intensity));

    return (
        <div className="min-h-[90vh] container max-w-4xl py-12 px-4 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
                {stage === "initial" && (
                    <motion.div
                        key="initial"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex flex-col items-center gap-8 text-center"
                    >
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl font-bold font-heading text-primary tracking-tight">
                                The Sanctuary
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-lg">
                                You are not alone in this struggle. Allah sees your effort.
                                Let's navigate this wave together.
                            </p>
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all animate-pulse duration-[3000ms]" />
                            <Button
                                size="lg"
                                className="h-56 w-56 rounded-full text-2xl font-bold shadow-[0_0_50px_-12px_rgba(var(--primary),0.5)] relative border-8 border-background hover:scale-105 transition-all duration-500"
                                onClick={() => setStage("intensity")}
                            >
                                I feel an urge
                            </Button>
                        </div>

                        <div className="flex items-center gap-2 text-sm font-medium opacity-60">
                            <Icon name="ShieldAlert" className="h-4 w-4 text-primary" />
                            Pressing this starts your victory sequence.
                        </div>
                    </motion.div>
                )}

                {stage === "intensity" && (
                    <motion.div
                        key="intensity"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full max-w-2xl space-y-8"
                    >
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-bold font-heading">Assess the Wave</h2>
                            <p className="text-muted-foreground">How strong is the inclination right now?</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {wisdomData.intensityLevels.map((level) => (
                                <button
                                    key={level.id}
                                    onClick={() => startProcess(level.id as Intensity)}
                                    className="group relative p-6 rounded-3xl glass-card hover:bg-primary/5 transition-all duration-300 text-left border-2 border-transparent hover:border-primary/20"
                                >
                                    <Icon name={level.icon} className={cn("h-8 w-8 mb-4", level.color)} />
                                    <h3 className="text-xl font-bold mb-1">{level.label}</h3>
                                    <p className="text-sm opacity-60">{level.desc}</p>
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Icon name="Sparkles" className="h-4 w-4 text-primary" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {stage === "breathing" && (
                    <motion.div
                        key="breathing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-12 w-full"
                    >
                        <div className="relative flex items-center justify-center h-80 w-80">
                            <motion.div
                                animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0.1, 0.3] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute h-40 w-40 rounded-full bg-primary"
                            />
                            <motion.div
                                animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.5, 0.2, 0.5] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                className="absolute h-40 w-40 rounded-full bg-primary/40"
                            />

                            <div className="relative flex flex-col items-center text-center">
                                <span className="text-6xl font-bold font-mono tracking-tighter text-primary">{seconds}s</span>
                                <motion.span
                                    animate={{ opacity: [1, 0.5, 1] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="text-sm font-bold uppercase tracking-[0.2em] mt-2 text-primary/70"
                                >
                                    {seconds % 8 < 4 ? "Breathe In" : "Breathe Out"}
                                </motion.span>
                            </div>
                        </div>

                        <div className="max-w-lg text-center space-y-6">
                            <Card className="p-8 glass-card border-primary/10 relative overflow-hidden">
                                <Icon name="Quote" className="absolute top-4 left-4 h-12 w-12 opacity-5 text-primary" />
                                <div className="space-y-4 relative z-10">
                                    <p className="text-xl font-medium leading-relaxed italic text-foreground/90">
                                        "{randomWisdom.text}"
                                    </p>
                                    <div className="text-sm font-bold text-primary/80 uppercase tracking-wider">
                                        — {randomWisdom.source}
                                    </div>
                                </div>
                            </Card>
                            <div className="flex flex-col items-center gap-4">
                                <div className="flex items-center justify-center gap-2 text-muted-foreground italic text-sm">
                                    <Icon name="Info" className="h-4 w-4" />
                                    <span>Wait for the timer. This silence is your shield.</span>
                                </div>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="rounded-full border-primary/20 hover:bg-primary/5 group"
                                    onClick={() => {
                                        window.dispatchEvent(new CustomEvent('open-audio-player'));
                                    }}
                                >
                                    <Icon name="Volume2" className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                                    Need Calming Sound?
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {stage === "action" && (
                    <motion.div
                        key="action"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-2xl space-y-8"
                    >
                        <div className="text-center space-y-3">
                            <h2 className="text-4xl font-bold font-heading">The Wave is Subsiding</h2>
                            <p className="text-xl text-muted-foreground">Secure your victory with these final steps.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {dynamicActions.map((action, i) => (
                                <motion.div
                                    key={action.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-6 rounded-3xl glass hover:bg-primary/5 transition-all flex items-center gap-6 group"
                                >
                                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                        <Icon name={action.icon} className="h-7 w-7 text-primary" />
                                    </div>
                                    <p className="text-lg font-medium leading-relaxed flex-1">{action.text}</p>
                                    <div className="h-8 w-8 rounded-full border-2 border-primary/20 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                        <Icon name="CheckCircle2" className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-col items-center gap-4 pt-8">
                            <Button className="rounded-full px-12 h-16 text-xl shadow-2xl hover:scale-105 transition-transform" onClick={handleVictory}>
                                I have overcome this trial
                            </Button>
                        </div>
                    </motion.div>
                )}

                {stage === "complete" && (
                    <motion.div
                        key="complete"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex flex-col items-center text-center gap-8 py-20"
                    >
                        <div className="relative">
                            <motion.div
                                animate={{ 
                                    scale: [1, 1.2, 1], 
                                    rotate: [0, 5, -5, 0],
                                    boxShadow: ["0 0 0px 0px rgba(var(--primary),0)", "0 0 40px 10px rgba(var(--primary),0.2)", "0 0 0px 0px rgba(var(--primary),0)"]
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="h-32 w-32 rounded-full bg-primary/20 text-primary flex items-center justify-center border-4 border-primary/40"
                            >
                                <Icon name="Heart" className="h-16 w-16" />
                            </motion.div>
                            <Icon name="Sparkles" className="absolute -top-4 -right-4 h-8 w-8 text-accent animate-pulse" />
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-5xl font-bold font-heading text-primary">Victory.</h2>
                            <p className="text-2xl text-muted-foreground max-w-md font-medium">
                                *Alhamdulillah.* You chose the Pleasure of Allah over a fleeting shadow.
                            </p>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-bold text-sm">
                                <Icon name="ShieldCheck" className="h-4 w-4" />
                                Shield Strength Increased!
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <Button className="rounded-full px-8 h-14 text-lg" onClick={goToJournal}>
                                <Icon name="MessageSquare" className="mr-2 h-5 w-5" /> Reflect & Log Victory
                            </Button>
                            <Button variant="ghost" className="opacity-60" onClick={reset}>
                                Return to Sanctuary
                            </Button>
                        </div>
                    </motion.div>
                )}

                {stage === "journal" && (
                    <motion.div
                        key="journal"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full max-w-2xl space-y-8"
                    >
                        <div className="space-y-4 text-center">
                            <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-2">
                                <Icon name="Quote" className="h-6 w-6" />
                            </div>
                            <h2 className="text-3xl font-bold font-heading">Victory Reflection</h2>
                            <p className="text-muted-foreground italic">"{currentPrompt.text}"</p>
                        </div>

                        <Card className="p-6 glass-card">
                            <Textarea 
                                placeholder="Type your thoughts here... (Private)"
                                value={journalText}
                                onChange={(e) => setJournalText(e.target.value)}
                                className="min-h-[200px] border-none bg-transparent focus-visible:ring-0 text-lg resize-none"
                            />
                        </Card>

                        <div className="flex justify-between items-center pt-4">
                             <Button variant="ghost" onClick={() => setStage("complete")}>
                                Back
                             </Button>
                             <Button className="rounded-full px-10 h-12" onClick={reset}>
                                Save Victory <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
                             </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
