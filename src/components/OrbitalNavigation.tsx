"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import gsap from "gsap";

interface OrbitalItem {
  title: string;
  href: string;
  icon: keyof typeof Icons;
  color?: string;
  size?: "sm" | "md" | "lg";
}

const IconComponent = ({ name, className }: { name: keyof typeof Icons; className?: string }) => {
  const LucideIcon = Icons[name] as any;
  if (!LucideIcon) return <Icons.Circle className={className} />;
  return <LucideIcon className={className} />;
};

export const OrbitalNavigation = ({ items, onNavigate }: { items: OrbitalItem[]; onNavigate?: () => void }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(300);

  useEffect(() => {
    const updateRadius = () => {
      const size = Math.min(window.innerWidth * 0.8, window.innerHeight * 0.7);
      setRadius(size / 2);
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  // Continuous rotation for the "shuffle" effect
  useEffect(() => {
    if (!ringRef.current) return;

    const bubbles = ringRef.current.querySelectorAll(".orbital-bubble-inner");

    const ctx = gsap.context(() => {
      // Rotate the entire ring
      gsap.to(ringRef.current, {
        rotation: 360,
        duration: 80,
        repeat: -1,
        ease: "none"
      });

      // Counter-rotate the individual bubbles so icons stay upright
      gsap.to(bubbles, {
        rotation: -360,
        duration: 80,
        repeat: -1,
        ease: "none"
      });
    });

    return () => ctx.revert();
  }, [items.length]);

  return (
    <div className="relative w-full aspect-square max-w-[90vh] mx-auto flex items-center justify-center overflow-visible">
      {/* Central Focus Area */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <AnimatePresence mode="wait">
          {activeIndex !== null ? (
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
              className="pointer-events-auto"
            >
              <Link href={items[activeIndex].href} onClick={onNavigate} className="flex flex-col items-center justify-center text-center p-8 rounded-full bg-primary/10 backdrop-blur-3xl border border-primary/30 w-56 h-56 md:w-72 md:h-72 shadow-[0_0_80px_rgba(var(--primary),0.2)] group cursor-pointer">
                <div className="mb-4 p-4 rounded-full bg-primary/20 shadow-[0_0_20px_rgba(var(--primary),0.2)] group-hover:bg-primary/30 transition-colors">
                  <IconComponent 
                    name={items[activeIndex].icon} 
                    className="w-12 h-12 md:w-20 md:h-20 text-primary animate-pulse group-hover:scale-110 transition-transform" 
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-heading text-primary uppercase tracking-widest leading-tight drop-shadow-sm">
                  {items[activeIndex].title}
                </h3>
                <p className="mt-4 text-[10px] md:text-xs uppercase tracking-[0.4em] text-primary/60 font-black animate-pulse">
                  Tap to Enter
                </p>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center flex flex-col items-center"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
                <div className="w-20 h-20 rounded-full border-2 border-primary/30 border-t-primary animate-spin opacity-40" />
              </div>
              <p className="text-sm uppercase tracking-[0.6em] italic text-primary/40 font-black">Sanctuary</p>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Orbital Ring */}
      <div ref={ringRef} className="relative w-full h-full flex items-center justify-center pointer-events-none">
        {items.map((item, index) => {
          const angle = (index / items.length) * (2 * Math.PI);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <div
              key={index}
              className="absolute pointer-events-auto"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="orbital-bubble-inner">
                <OrbitalBubble
                  item={item}
                  isActive={activeIndex === index}
                  onHover={() => setActiveIndex(index)}
                  onLeave={() => setActiveIndex(null)}
                  onClick={onNavigate}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Decorative Rings */}
      <div className="absolute inset-0 -z-10 rounded-full border border-primary/5 scale-100" />
      <div className="absolute inset-0 -z-10 rounded-full border border-primary/5 scale-75" />
      <div className="absolute inset-0 -z-10 rounded-full border border-primary/5 scale-50" />
    </div>
  );
};

const OrbitalBubble = ({
  item,
  isActive,
  onHover,
  onLeave,
  onClick
}: {
  item: OrbitalItem;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick?: () => void;
}) => {
  return (
    <Link
      href={item.href}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={(e) => {
        // On mobile, first tap selects the item instead of navigating directly
        if (window.innerWidth < 768 && !isActive) {
          e.preventDefault();
          onHover();
        } else if (onClick) {
          onClick();
        }
      }}
      className="block outline-none"
    >
      <motion.div
        animate={{
          scale: isActive ? 1.4 : 1,
          rotate: isActive ? 0 : 0 // We'll keep rotation relative to parent
        }}
        className={cn(
          "w-16 h-16 md:w-20 md:h-20 rounded-full flex flex-col items-center justify-center transition-all duration-500 border relative group",
          isActive
            ? "bg-primary/20 border-primary shadow-[0_0_20px_rgba(var(--primary),0.3)] z-50"
            : "bg-background/40 backdrop-blur-md border-white/10 hover:border-primary/40"
        )}
      >
        {/* Anti-rotation for icon so it stays upright */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center px-1"
        >
          <IconComponent
            name={item.icon}
            className={cn(
              "w-5 h-5 md:w-8 md:h-8 transition-colors",
              isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
            )}
          />
          {/* Small label for mobile */}
          <span className={cn(
            "text-[6px] mt-1 text-center font-bold tracking-tighter uppercase leading-[1.1] md:hidden truncate w-[50px]",
            isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
          )}>
            {item.title}
          </span>
        </motion.div>

        {/* Glow */}
        {isActive && (
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
        )}
      </motion.div>
    </Link>
  );
};
