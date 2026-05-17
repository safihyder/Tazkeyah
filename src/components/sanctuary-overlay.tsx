"use client";

import { motion, AnimatePresence } from "framer-motion";
import { OrbitalNavigation } from "@/components/OrbitalNavigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useSanctuary } from "@/lib/store";

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

export function SanctuaryOverlay() {
  const { isOpen, closeSanctuary } = useSanctuary();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col overflow-y-auto overflow-x-hidden scrollbar-hide bg-background/95 backdrop-blur-xl"
        >
          <div className="w-full min-h-full max-w-7xl mx-auto flex flex-col items-center py-8 px-4 relative">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="sticky top-4 z-50 mb-12 text-center"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={closeSanctuary}
                className="rounded-full text-xs opacity-60 hover:opacity-100 hover:bg-primary/10 transition-all backdrop-blur-md bg-background/20"
              >
                <ArrowLeft className="mr-2 h-3 w-3" /> Back
              </Button>
            </motion.div>

            <div className="w-full flex-1 flex items-center justify-center overflow-visible mt-20">
              <OrbitalNavigation items={mainSections} onNavigate={closeSanctuary} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
