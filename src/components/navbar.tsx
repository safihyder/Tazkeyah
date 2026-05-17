"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ShieldTracker, useSanctuary, useScrollState } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { scrolled } = useScrollState();
  const { strength, level } = ShieldTracker();
  const { openSanctuary } = useSanctuary();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Show the sanctuary button in Navbar if we are NOT on the homepage, OR if we are on the homepage and have scrolled down.
  const showSanctuaryButton = pathname !== "/" || scrolled;

  return (
    <header className="sticky top-0 z-50 w-full border-b glass transition-all duration-300">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-primary/20 rounded-full blur-sm group-hover:bg-primary/40 transition-all" />
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                <Sparkles className="h-6 w-6 text-primary-foreground group-hover:rotate-12 transition-transform" />
              </span>
            </div>
            <span className="font-bold text-xl tracking-tight">Tazkeyah</span>
          </Link>

          {/* Shield Status */}
          <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10">
            <div className="relative">
              <Shield className="h-5 w-5 text-primary" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-accent text-[8px] font-bold text-accent-foreground">
                {level}
              </span>
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground opacity-70">Shield Level</span>
              <span className="text-xs font-bold text-primary">Strength: {strength}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <AnimatePresence>
            {showSanctuaryButton && (
              <motion.button
                layoutId="sanctuary-button"
                onClick={openSanctuary}
                className="relative flex items-center justify-center rounded-full h-10 w-10 md:h-12 md:w-12 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)] transition-transform hover:scale-110 cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
              >
                <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-white" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
