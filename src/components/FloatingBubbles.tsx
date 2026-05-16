"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";

interface BubbleProps {
  title: string;
  href: string;
  icon: keyof typeof Icons;
  size?: "sm" | "md" | "lg";
  color?: string;
  delay?: number;
}

const IconComponent = ({ name, className }: { name: keyof typeof Icons; className?: string }) => {
  const LucideIcon = Icons[name] as any;
  if (!LucideIcon) return <Icons.Circle className={className} />;
  return <LucideIcon className={className} />;
};

const Bubble = ({ title, href, icon, size = "md", color = "bg-primary/10", delay = 0 }: BubbleProps) => {
  const sizeClasses = {
    sm: "w-20 h-20 md:w-28 md:h-28 text-[9px] md:text-[10px]",
    md: "w-28 h-28 md:w-36 md:h-36 text-[10px] md:text-xs",
    lg: "w-32 h-32 md:w-48 md:h-48 text-xs md:text-sm",
  };

  const iconSizes = {
    sm: "h-4 w-4 md:h-5 md:h-5",
    md: "h-6 w-6 md:h-8 md:h-8",
    lg: "h-8 w-8 md:h-12 md:h-12",
  };

  // Randomized animation parameters for a more organic feel
  const duration = useRef(4 + Math.random() * 4).current;
  const delayAnim = useRef(Math.random() * -10).current;
  const xMovement = useRef(Math.random() * 30 - 15).current;
  const yMovement = useRef(Math.random() * 30 - 15).current;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, yMovement, 0],
        x: [0, xMovement, 0],
        rotate: [0, Math.random() * 4 - 2, 0],
      }}
      transition={{ 
        opacity: { duration: 0.4, delay },
        scale: { type: "spring", stiffness: 200, damping: 20, delay },
        y: { duration, repeat: Infinity, ease: "easeInOut", delay: delayAnim },
        x: { duration: duration * 1.5, repeat: Infinity, ease: "easeInOut", delay: delayAnim },
        rotate: { duration: duration * 2, repeat: Infinity, ease: "easeInOut" },
      }}
      whileHover={{ 
        scale: 1.1, 
        zIndex: 50,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      whileTap={{ scale: 0.95 }}
      className="relative block group cursor-pointer"
    >
      <Link href={href} className="block w-full h-full">
        <div className={cn(
          "rounded-full flex flex-col items-center justify-center p-6 text-center border transition-all duration-500",
          "backdrop-blur-[12px] bg-white/5 dark:bg-white/5",
          "shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] border-white/20 dark:border-white/10",
          "group-hover:border-primary/40 group-hover:bg-primary/5 group-hover:shadow-primary/20",
          color,
          sizeClasses[size]
        )}>
          <div className="mb-3 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]">
            <IconComponent name={icon} className={cn("text-primary opacity-80 group-hover:opacity-100", iconSizes[size])} />
          </div>
          <span className="font-bold font-heading uppercase tracking-widest leading-tight opacity-70 group-hover:opacity-100 transition-opacity">
            {title}
          </span>
        </div>
        
        {/* Hover Glow Background */}
        <div className="absolute inset-0 -z-10 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 scale-150" />
      </Link>
    </motion.div>
  );
};

export const FloatingBubbles = ({ items }: { items: BubbleProps[] }) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-2 md:gap-8 lg:gap-12 p-4 md:p-20 max-w-7xl mx-auto overflow-visible">
      {items.map((item, index) => (
        <Bubble key={index} {...item} delay={index * 0.05} />
      ))}
    </div>
  );
};
