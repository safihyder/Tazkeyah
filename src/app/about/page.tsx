"use client";

import { ShieldCheck, Lock, EyeOff, Scale, Heart, Info, Globe, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function AboutPrivacy() {
    return (
        <div className="container max-w-4xl py-12 px-4 space-y-16">
            <div className="text-center space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold font-heading italic">About & Privacy</h1>
                <p className="text-muted-foreground text-lg">
                    Your trust is our most sacred priority.
                </p>
            </div>

            <section className="space-y-8">
                <h2 className="text-2xl font-bold font-heading border-b pb-2 flex items-center gap-2">
                    <Info className="h-6 w-6 text-primary" />
                    Our Mission
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                    Tazkeyah is an independent project dedicated to helping the Ummah overcome modern digital challenges through spiritual grounding. We believe that bad habits are often symptoms of a disconnected heart. By providing Quranic reminders, Ahlulbayt teachings, and practical recovery tools, we aim to help you rebuild your spiritual armor.
                </p>
            </section>

            <section className="space-y-8">
                <h2 className="text-2xl font-bold font-heading border-b pb-2 flex items-center gap-2">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                    Privacy First
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        {
                            icon: Lock,
                            title: "Local Storage Only",
                            text: "Currently, all your streaks, progress, and journal entries are stored locally on your browser. We do NOT see your data."
                        },
                        {
                            icon: EyeOff,
                            title: "No Tracking",
                            text: "We do not use invasive analytics, marketing pixels, or social media trackers. Your journey is between you and Allah."
                        },
                        {
                            icon: Globe,
                            title: "No Account Required",
                            text: "You can use every feature of this platform without ever creating an account or providing an email address."
                        },
                        {
                            icon: Shield,
                            title: "Secure Future",
                            text: "If we ever implement cloud sync, it will be end-to-end encrypted so that even we cannot read your private thoughts."
                        }
                    ].map((item, i) => (
                        <Card key={i} className="rounded-2xl border-primary/5 bg-primary/[0.02]">
                            <CardHeader className="pb-2">
                                <item.icon className="h-6 w-6 text-primary mb-2" />
                                <CardTitle className="text-lg">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{item.text}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="space-y-8">
                <h2 className="text-2xl font-bold font-heading border-b pb-2 flex items-center gap-2">
                    <Heart className="h-6 w-6 text-primary" />
                    Ethical Commitment
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                    This platform is free and will always remain free from manipulative design patterns (gamification that causes stress, FOMO, or loud notifications). We prioritize your peace of mind over engagement metrics.
                </p>
                <div className="p-8 rounded-3xl bg-muted/50 border border-dotted border-muted-foreground/20 text-center italic text-sm">
                    "May Allah accept this small effort and make it a means of purification for us all."
                </div>
            </section>
        </div>
    );
}
