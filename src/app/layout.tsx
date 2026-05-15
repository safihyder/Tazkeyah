import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { AudioPlayer } from "@/components/audio-player";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tazkeyah | Islamic Recovery & Growth",
  description: "A private, calming, spiritually uplifting platform to help you overcome bad habits through Quranic reminders and Ahlulbayt teachings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex-1 flex flex-col pt-4">
            {children}
          </main>
          <AudioPlayer />
          <footer className="py-8 border-t bg-muted/30">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} Tazkeyah. Your journey to spiritual freedom.</p>
              <p className="mt-2 text-[10px] opacity-50">Private. Secure. Non-judgmental.</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
