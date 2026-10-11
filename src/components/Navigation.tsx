"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Send } from "lucide-react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ambient sound synthesizer using native Web Audio API (no external file needed!)
  const toggleAudio = () => {
    if (isPlayingAudio) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 0.8);
        setTimeout(() => {
          osc1Ref.current?.stop();
          osc2Ref.current?.stop();
          setIsPlayingAudio(false);
        }, 800);
      }
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 1.5);
        gainNodeRef.current = gainNode;

        // Soft ambient binaural sine waves (A2 = 110Hz, E3 = 164.81Hz)
        const osc1 = ctx.createOscillator();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(110, ctx.currentTime);

        const osc2 = ctx.createOscillator();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(164.81, ctx.currentTime);

        // Lowpass filter for warm atmospheric sound
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(280, ctx.currentTime);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc1.start();
        osc2.start();
        osc1Ref.current = osc1;
        osc2Ref.current = osc2;

        setIsPlayingAudio(true);
      } catch (err) {
        console.warn("Web Audio API not allowed yet:", err);
      }
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 flex justify-center py-5 px-6 pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-between gap-4 md:gap-8 px-5 py-2.5 rounded-full transition-all duration-500 max-w-5xl w-full ${
          scrolled
            ? "glass-panel bg-[#070a13]/85 shadow-[0_10px_35px_rgba(0,0,0,0.5)] border-white/10"
            : "bg-black/30 backdrop-blur-md border border-white/5"
        }`}
      >
        {/* Monogram / Logo */}
        <a
          href="#hero-scroller"
          className="group flex items-center gap-2 text-white font-bold tracking-tight text-lg"
        >
          <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-amber-500 flex items-center justify-center text-xs font-mono text-slate-950 font-black shadow-[0_0_15px_rgba(56,189,248,0.3)] group-hover:scale-105 transition-transform">
            AV
          </span>
          <span className="font-mono text-sm tracking-wider text-slate-200 hidden sm:inline">
            ALEX.VANCE
          </span>
        </a>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-300">
          <a
            href="#hero-scroller"
            className="hover:text-cyan-300 transition-colors"
          >
            {"//"} Sequence
          </a>
          <a
            href="#work"
            className="hover:text-cyan-300 transition-colors"
          >
            {"//"} Works
          </a>
          <a
            href="#philosophy"
            className="hover:text-cyan-300 transition-colors"
          >
            {"//"} Philosophy
          </a>
          <a
            href="#contact"
            className="hover:text-cyan-300 transition-colors"
          >
            {"//"} Contact
          </a>
        </div>

        {/* Right Actions: Audio Toggle & Contact Button */}
        <div className="flex items-center gap-3">
          {/* Ambient Sound Generator Button */}
          <button
            onClick={toggleAudio}
            title={isPlayingAudio ? "Mute Ambient Soundscape" : "Play Ambient Soundscape"}
            className={`p-2 rounded-full border text-xs transition-all flex items-center gap-1.5 ${
              isPlayingAudio
                ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.3)]"
                : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className="text-[10px] font-mono hidden sm:inline">AMBIENT ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono hidden sm:inline">SOUND</span>
              </>
            )}
          </button>

          {/* Quick Connect CTA */}
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 font-mono text-xs font-bold hover:brightness-110 shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-all"
          >
            <Send className="w-3 h-3" />
            <span>Connect</span>
          </a>
        </div>
      </nav>
    </header>
  );
}

