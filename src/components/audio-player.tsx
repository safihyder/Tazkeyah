"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Music,
  Headphones,
  Sparkles,
  AlertCircle,
  FileAudio,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Track {
  id: number;
  title: string;
  reciter: string;
  url: string;
  type: string;
  fallback?: string;
}

const PLAYLIST: Track[] = [

  {
    id: 2,
    title: "Dua Kumail",
    reciter: "Hamed Zamani",
    url: "https://res.cloudinary.com/drzh7mup3/video/upload/v1778872239/YTDown_YouTube_Media_jz8CsoyA9c0_007_128k_wmwnnl.mp3",
    type: "Dua"
  },
  {
    id: 3,
    title: "Sahifa e Sajjadiya",
    reciter: "Sayed Mustafa Mosavi",
    url: "https://res.cloudinary.com/drzh7mup3/video/upload/v1778872851/%D8%A7%D9%84%D8%B3%D9%8A%D8%AF-%D9%85%D8%B5%D8%B7%D9%81%D9%89-%D8%A7%D9%84%D9%85%D9%88%D8%B3%D9%88%D9%8A_bzmheg.mp3",
    type: "Maqta (Excerpt)"
  }
];

const WaveVisualizer = () => (
  <div className="flex items-center gap-[2px] h-4">
    {[1, 2, 3].map((i) => (
      <motion.div
        key={i}
        animate={{
          height: ["20%", "100%", "20%"],
        }}
        transition={{
          duration: 0.6 + i * 0.1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-[3px] bg-primary-foreground rounded-full"
      />
    ))}
  </div>
);

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = PLAYLIST[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    setError(null);
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(() => {
        if (currentTrack.fallback) {
          audioRef.current!.src = currentTrack.fallback;
          audioRef.current!.play().catch(() => setError("Audio source unavailable."));
        } else {
          setError("Source blocked or file missing.");
        }
      });
    }
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        setError(null);
        audioRef.current.play().catch(e => {
          if (currentTrack.fallback) {
            audioRef.current!.src = currentTrack.fallback;
            audioRef.current!.play().catch(() => setError("Both local and remote sources blocked."));
          } else {
            setError("Audio source unavailable.");
          }
          setIsPlaying(false);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
  };

  return (
    <div className="fixed bottom-24 left-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 p-6 rounded-[2.5rem] glass-card border-primary/20 shadow-2xl w-80 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Headphones className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">Tazkeyah Sanctuary</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setIsExpanded(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-1.5 px-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xl truncate leading-tight">{currentTrack.title}</h4>
                <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase">
                  {currentTrack.type}
                </span>
              </div>
              <p className="text-xs text-muted-foreground italic flex items-center gap-1.5">
                <FileAudio className="h-3 w-3 text-primary/50" /> {currentTrack.reciter}
              </p>
            </div>

            {error ? (
              <div className="flex flex-col gap-2 p-4 rounded-2xl bg-destructive/10 text-destructive text-[10px] leading-relaxed border border-destructive/20">
                <div className="flex items-center gap-2 font-bold uppercase">
                  <AlertCircle className="h-3 w-3" /> Error Loading
                </div>
                <p>Audio source could not be reached. Please check your connection or use local files.</p>
              </div>
            ) : (
              <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden relative">
                {isPlaying && (
                  <>
                    <motion.div
                      initial={{ left: "-100%" }}
                      animate={{ left: "100%" }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-0 bottom-0 w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                    />
                    <motion.div
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-primary/20"
                    />
                  </>
                )}
              </div>
            )}

            <div className="flex items-center justify-center gap-6 py-2">
              <Button variant="ghost" size="icon" className="rounded-full" onClick={prevTrack}>
                <SkipBack className="h-6 w-6" />
              </Button>
              <Button
                className="h-14 w-14 rounded-full shadow-xl shadow-primary/20 hover:scale-105"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 pl-1" />}
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={nextTrack}>
                <SkipForward className="h-6 w-6" />
              </Button>
            </div>

            <div className="flex items-center gap-4 px-2">
              <Volume2 className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-primary/10 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "h-16 w-16 rounded-full flex items-center justify-center shadow-2xl transition-all border-2 relative overflow-hidden",
          isPlaying
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-background/90 backdrop-blur-xl text-primary border-primary/20"
        )}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="waves"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <WaveVisualizer />
            </motion.div>
          ) : (
            <motion.div
              key="play"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Play className="h-7 w-7 pl-1" />
            </motion.div>
          )}
        </AnimatePresence>

        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-white"
          />
        )}
      </motion.button>

      <audio
        ref={audioRef}
        src={currentTrack.url}
        onEnded={nextTrack}
        onPlay={() => { setIsPlaying(true); setError(null); }}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
}
