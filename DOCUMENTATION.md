# Project Documentation: Tazkeyah Enhancement

## 1. Project Overview
**Tazkeyah** is a premium, spiritually grounded web application designed to help users overcome negative habits and addictions through a combination of **Modern Psychology** and **Islamic Wisdom (Quran & Ahlulbayt)**. 

The primary goal of this enhancement project was to transform a basic utility into a high-end, "Sanctuary" experience that provides immediate relief during urges and long-term spiritual growth.

---

## 2. Research & Philosophical Foundation
The entire implementation is built on two core pillars:

### A. Psychological Pillar: Urge Surfing
- **Concept:** Urges are viewed as ocean waves that peak and eventually subside. 
- **Method:** Instead of "fighting" an urge (which creates stress), users are taught to "ride" it using mindfulness and breathing.
- **Technique:** Integrated the **5-4-3-2-1 Grounding Technique** to disrupt the brain's focus on the temptation.

### B. Islamic Pillar: Jihad al-Nafs
- **Concept:** The "Greater Jihad" or the internal struggle to discipline the lower self (*Nafs al-Ammara*).
- **Goal:** To transition the soul toward *Nafs al-Mutma'inna* (The Soul at Peace).
- **Tools:** Utilization of **Dhikr** (Remembrance), **Wudhu** (Ablution as a cooling agent), and **Sajdah** (Prostration) as spiritual shields.

---

## 3. Implementation Phases

### Phase 1: Visual Identity & Design System
We moved away from "Alert-based" red colors to a calming, premium "Sanctuary" palette.
- **Primary Color:** Spiritual Teal/Emerald (`oklch(0.45 0.12 170)`) - Represents growth and peace.
- **Background:** Deep Night Blue (`oklch(0.12 0.04 240)`) - Provides depth and focus.
- **Accent:** Soft Gold (`oklch(0.85 0.15 80)`) - Represents enlightenment and victory.
- **Utilities:** 
    - `glass`: Translucent, blurred backgrounds for headers and cards.
    - `glass-card`: Premium shadowed containers for content.
    - `text-glow`: Subtle luminosity for primary text elements.

### Phase 2: The Core Sanctuary (Content & Logic)
The "Urge Emergency" page was redesigned into a **Tiered Response System**:
- **Tiered Intensity Selection:** Users categorize their urge as *Ripple (Low)*, *Wave (Medium)*, or *Storm (High)*.
- **Dynamic Wisdom Engine:** Created `src/data/wisdom.json` to store context-aware Quranic verses and Hadiths.
- **Audio Integration:** Linked the global `AudioPlayer` to the emergency flow, allowing users to trigger calming "Rain" or "Quran" tracks with one click.
- **Muhasabah (Reflection) Stage:** Added a post-victory journaling step where users answer therapeutic prompts to understand their triggers.

### Phase 3: Polish & Gamification
To encourage consistency and provide positive reinforcement:
- **Victory Celebration:** Integrated `canvas-confetti` to trigger a visual reward upon overcoming an urge.
- **Shield Strength Tracker:** Developed a custom hook and store (`src/lib/store.ts`) that calculates and persists user progress.
- **Shield Levels:** Users level up their "Spiritual Shield" based on the intensity of urges they overcome.
- **Navbar HUD:** A real-time status indicator in the Navbar showing current Level and Strength.

---

## 4. Technical Architecture

### Core Technologies
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4 with OKLCH colors.
- **Animations:** Framer Motion (AnimatePresence, Layout transitions).
- **Icons:** Lucide-React.
- **State:** LocalStorage-backed custom store with Cross-Component Event Dispatching.

### New Components & Data
| File | Description |
| :--- | :--- |
| `src/data/wisdom.json` | The centralized "Heart" of the app's content. |
| `src/lib/store.ts` | Handles gamification logic and persistence. |
| `src/components/ui/textarea.tsx` | A custom-styled, premium input for journaling. |
| `src/app/emergency/page.tsx` | The redesigned "Sanctuary" logic. |

---

## 5. Summary of Experience Flow
1. **Trigger**: User feels an urge and enters **The Sanctuary**.
2. **Assessment**: User selects intensity (Low, Med, High).
3. **The Surf**: User follows a timed breathing pulse while reading targeted Quranic wisdom.
4. **Action**: User completes physical/spiritual grounding tasks.
5. **Victory**: Confetti triggers, Shield Strength increases.
6. **Reflection**: User journals the trigger, converting a struggle into wisdom.

---
**Status:** All phases implemented and verified.
**Documentation Date:** 2026-05-15
