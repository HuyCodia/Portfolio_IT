"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { ArrowDown, Sparkles, Cpu, Layers } from "lucide-react";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Section 1: Hero (0% scroll) - Centered
  const s1Opacity = useTransform(scrollYProgress, [0, 0.12, 0.2], [1, 1, 0]);
  const s1Y = useTransform(scrollYProgress, [0, 0.2], [0, -80]);
  const s1Scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.94]);

  // Section 2: "I build digital experiences" (30% scroll) - Left aligned
  const s2Opacity = useTransform(scrollYProgress, [0.2, 0.28, 0.38, 0.46], [0, 1, 1, 0]);
  const s2Y = useTransform(scrollYProgress, [0.2, 0.3, 0.46], [60, 0, -60]);
  const s2X = useTransform(scrollYProgress, [0.2, 0.3, 0.46], [-30, 0, -20]);

  // Section 3: "Bridging design and engineering" (60% scroll) - Right aligned
  const s3Opacity = useTransform(scrollYProgress, [0.48, 0.58, 0.68, 0.76], [0, 1, 1, 0]);
  const s3Y = useTransform(scrollYProgress, [0.48, 0.6, 0.76], [60, 0, -60]);
  const s3X = useTransform(scrollYProgress, [0.48, 0.6, 0.76], [30, 0, 20]);

  // Section 4: Lead-in to Selected Works (85% scroll) - Centered
  const s4Opacity = useTransform(scrollYProgress, [0.78, 0.86, 0.94, 0.99], [0, 1, 1, 0]);
  const s4Y = useTransform(scrollYProgress, [0.78, 0.86, 0.99], [60, 0, -40]);

  // Bottom scroll prompter opacity (fades out early)
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 md:p-16">
      {/* SECTION 1: 0% scroll - Center */}
      <motion.div
        style={{ opacity: s1Opacity, y: s1Y, scale: s1Scale }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/20 backdrop-blur-md mb-6">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[11px] font-mono tracking-widest text-cyan-300 uppercase">
            Portfolio • 2026
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-white max-w-4xl leading-[1.05]">
          Alex Vance.{" "}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-amber-400 text-glow-cyan">
            Creative Developer.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300/80 max-w-2xl font-light leading-relaxed">
          Crafting visceral digital experiences at the nexus of motion graphics,
          interactive WebGL, and sub-millisecond frontend engineering.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="px-3 py-1 rounded-md bg-white/[0.05] border border-white/10 text-xs font-mono text-slate-300">
            Awwwards SOTD ×3
          </span>
          <span className="px-3 py-1 rounded-md bg-white/[0.05] border border-white/10 text-xs font-mono text-slate-300">
            FWA of the Day
          </span>
          <span className="px-3 py-1 rounded-md bg-white/[0.05] border border-white/10 text-xs font-mono text-slate-300">
            60FPS Canvas Scrubbing
          </span>
        </div>
      </motion.div>

      {/* SECTION 2: 30% scroll - Left Aligned */}
      <motion.div
        style={{ opacity: s2Opacity, y: s2Y, x: s2X }}
        className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-20 max-w-3xl"
      >
        <div className="p-6 md:p-8 rounded-2xl glass-panel max-w-xl border-l-2 border-l-cyan-400 shadow-2xl">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
            <Cpu className="w-4 h-4" />
            <span>Core Philosophy // 01</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 leading-tight">
            I build digital{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              experiences.
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Static web pages are obsolete. I engineer immersive, kinetic web
            environments where every scroll tick, cursor vector, and frame rate
            budget is orchestrated for maximum emotional resonance.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
            <div>
              <div className="text-xl font-mono font-bold text-white">0.016s</div>
              <div className="text-xs text-slate-400">Render Frame Budget</div>
            </div>
            <div>
              <div className="text-xl font-mono font-bold text-cyan-400">100%</div>
              <div className="text-xs text-slate-400">GPU Accelerated</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* SECTION 3: 60% scroll - Right Aligned */}
      <motion.div
        style={{ opacity: s3Opacity, y: s3Y, x: s3X }}
        className="absolute inset-0 flex flex-col justify-center items-end px-6 md:px-20"
      >
        <div className="p-6 md:p-8 rounded-2xl glass-panel max-w-xl border-r-2 border-r-amber-400 shadow-2xl text-right">
          <div className="flex items-center justify-end gap-2 text-amber-400 font-mono text-xs uppercase tracking-widest mb-3">
            <span>Engineering Discipline // 02</span>
            <Layers className="w-4 h-4" />
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 leading-tight">
            Bridging design and{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-400 to-orange-400">
              engineering.
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Great code is invisible until you feel it. Combining high-level design
            intuition with low-level rendering pipelines to turn complex ideas
            into seamless user journeys.
          </p>

          <div className="flex flex-wrap justify-end gap-2">
            {["Next.js 14", "HTML5 Canvas", "Framer Motion", "Tailwind CSS", "TypeScript"].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* SECTION 4: 85% scroll - Center Transition to Works */}
      <motion.div
        style={{ opacity: s4Opacity, y: s4Y }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        <div className="p-8 rounded-3xl glass-panel max-w-lg border border-white/10 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Scroll Scrub Complete</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
            Selected Works
          </h2>
          <p className="text-slate-400 text-sm md:text-base mb-6">
            Explore 4 featured interactive case studies crafted with cutting-edge
            frontend technology.
          </p>
          <div className="flex items-center justify-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest animate-bounce">
            <ArrowDown className="w-4 h-4" />
            <span>Keep scrolling to explore</span>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator for Section 1 */}
      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 pointer-events-none"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-2.5 rounded-full bg-cyan-400"
          />
        </div>
        <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400/80">
          Scroll to Explore
        </span>
      </motion.div>
    </div>
  );
}

