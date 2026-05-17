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

export function useSanctuary() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleUpdate = (e: any) => setIsOpen(e.detail);
    window.addEventListener("sanctuary-toggled", handleUpdate);
    return () => window.removeEventListener("sanctuary-toggled", handleUpdate);
  }, []);

  const openSanctuary = () => {
    window.dispatchEvent(new CustomEvent("sanctuary-toggled", { detail: true }));
  };

  const closeSanctuary = () => {
    window.dispatchEvent(new CustomEvent("sanctuary-toggled", { detail: false }));
  };

  return { isOpen, openSanctuary, closeSanctuary };
}

export function useScrollState(threshold = 450) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { scrolled };
}

export type MoodType = "calm" | "tested" | "struggle" | null;

export interface DailyEntry {
  date: string; // YYYY-MM-DD
  mood: MoodType;
  journal: string;
}

export interface TrackerState {
  streak: number;
  lastCheckInDate: string | null;
  history: Record<string, DailyEntry>; // Keyed by YYYY-MM-DD for easy access
}

const defaultTrackerState: TrackerState = {
  streak: 0,
  lastCheckInDate: null,
  history: {}
};

const TRACKER_STORAGE_KEY = "tazkeyah-tracker-data";

export function useTrackerStore() {
  const [state, setState] = useState<TrackerState>(defaultTrackerState);
  const [isLoaded, setIsLoaded] = useState(false);

  // Return YYYY-MM-DD based on local timezone
  const getTodayStr = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  };
  
  const today = getTodayStr();

  useEffect(() => {
    // Load from local storage
    const saved = localStorage.getItem(TRACKER_STORAGE_KEY);
    let loadedState = { ...defaultTrackerState };

    if (saved) {
      try {
        loadedState = JSON.parse(saved);
        setState(loadedState);
      } catch (e) {
        console.error("Failed to parse tracker data", e);
      }
    } else {
      // Grab legacy nt-streak if new data doesn't exist but old does
      const legacyStreak = localStorage.getItem("nt-streak");
      if (legacyStreak) {
        loadedState.streak = parseInt(legacyStreak, 10);
        setState(loadedState);
      }
    }

    setIsLoaded(true);

    const handleUpdate = (e: any) => setState(e.detail);
    window.addEventListener("tracker-updated", handleUpdate);
    return () => window.removeEventListener("tracker-updated", handleUpdate);
  }, []);

  const updateState = (newState: TrackerState) => {
    setState(newState);
    localStorage.setItem(TRACKER_STORAGE_KEY, JSON.stringify(newState));
    window.dispatchEvent(new CustomEvent("tracker-updated", { detail: newState }));
  };

  const resetStreak = () => {
    const newState: TrackerState = {
      ...state,
      streak: 0,
      lastCheckInDate: null,
      // We don't wipe history, just the streak
    };
    updateState(newState);
    localStorage.setItem("nt-streak", "0");
  };

  // Check if they missed a day
  useEffect(() => {
    if (isLoaded && state.lastCheckInDate && state.lastCheckInDate !== today && state.streak > 0) {
       const yesterday = new Date();
       yesterday.setDate(yesterday.getDate() - 1);
       const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
       
       if (state.lastCheckInDate !== yesterdayStr) {
           resetStreak(); // Missed yesterday!
       }
    }
  }, [isLoaded, today, state.lastCheckInDate, state.streak]);

  const checkIn = () => {
    let newStreak = state.streak;
    if (state.lastCheckInDate !== today) {
      newStreak += 1;
    }

    const todayEntry = state.history[today] || { date: today, mood: null, journal: "" };

    const newState: TrackerState = {
      ...state,
      streak: newStreak,
      lastCheckInDate: today,
      history: {
        ...state.history,
        [today]: todayEntry
      }
    };
    
    updateState(newState);
  };

  const logMood = (mood: MoodType) => {
    const todayEntry = state.history[today] || { date: today, mood: null, journal: "" };
    const newState: TrackerState = {
      ...state,
      history: {
        ...state.history,
        [today]: { ...todayEntry, mood }
      }
    };
    updateState(newState);
  };

  const saveJournal = (journal: string) => {
    const todayEntry = state.history[today] || { date: today, mood: null, journal: "" };
    const newState: TrackerState = {
      ...state,
      history: {
        ...state.history,
        [today]: { ...todayEntry, journal }
      }
    };
    updateState(newState);
  };

  const hasCheckedInToday = state.lastCheckInDate === today;
  const todayEntry = state.history[today] || { date: today, mood: null, journal: "" };

  return {
    state,
    isLoaded,
    hasCheckedInToday,
    todayEntry,
    checkIn,
    resetStreak,
    logMood,
    saveJournal
  };
}
