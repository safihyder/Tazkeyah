"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "Tazkeyah_shield_strength";

export function useShield() {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setStrength(parseInt(saved, 10));
    }
  }, []);

  const addStrength = (amount: number) => {
    const newStrength = strength + amount;
    setStrength(newStrength);
    localStorage.setItem(STORAGE_KEY, newStrength.toString());

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent("shield-updated", { detail: newStrength }));
  };

  const getLevel = () => {
    return Math.floor(Math.sqrt(strength / 10)) + 1;
  };

  return { strength, addStrength, getLevel };
}

export function ShieldTracker() {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setStrength(parseInt(saved, 10));

    const handleUpdate = (e: any) => setStrength(e.detail);
    window.addEventListener("shield-updated", handleUpdate);
    return () => window.removeEventListener("shield-updated", handleUpdate);
  }, []);

  const level = Math.floor(Math.sqrt(strength / 10)) + 1;

  return { strength, level };
}
