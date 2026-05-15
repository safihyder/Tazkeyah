"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X, Sparkles, Shield } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ShieldTracker } from "@/lib/store";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Start Here", href: "/start" },
  { name: "Daily", href: "/daily" },
  { name: "Urge!", href: "/emergency" },
  { name: "Tracker", href: "/tracker" },
  { name: "Learn", href: "/learn" },
  { name: "Progress", href: "/progress" },
  { name: "Q&A", href: "/qa" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { strength, level } = ShieldTracker();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

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
          <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10">
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

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname === item.href ? "text-primary font-bold" : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b bg-background animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary font-bold" : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
