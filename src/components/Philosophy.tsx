"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Terminal,
  Zap,
  Gauge,
  Palette,
} from "lucide-react";

export default function Philosophy() {
  const pillars = [
    {
      icon: Gauge,
      number: "01",
      title: "Sub-Millisecond Canvas Loop",
      desc: "Scrubbing high-definition image sequences at 60-120fps requires disciplined memory management. Preloaded ImageBitmap instances, requestAnimationFrame throttling, and responsive object-fit algorithms ensure zero stutter.",
      badge: "Performance First",
      color: "cyan",
    },
    {
      icon: Zap,
      number: "02",
      title: "Tactile Motion Physics",
      desc: "Every interaction is grounded in kinetic intuition. Using spring-dampened motion curves, directional momentum, and parallax layers to deliver interfaces that feel physical rather than synthetic.",
      badge: "Framer Motion",
      color: "amber",
    },
    {
      icon: Terminal,
      number: "03",
      title: "Full-Stack Architecture",
      desc: "Built on Next.js 14 App Router with React Server Components, TypeScript strict mode, and tree-shaken bundles. Beauty at the surface backed by rigorous engineering foundations.",
      badge: "Next.js 14 / TS",
      color: "teal",
    },
    {
      icon: Palette,
      number: "04",
      title: "Awwwards-Tier Art Direction",
      desc: "Typographic discipline with Geist Sans, cinematic ambient lighting matching dual-key camera setups, subtle film grain, and harmonious glassmorphism that enhances readability without distraction.",
      badge: "Creative Direction",
      color: "purple",
    },
  ];

  const stack = [
    { name: "Next.js 14", role: "App Router & SSR" },
    { name: "HTML5 Canvas", role: "60FPS Scrollytelling" },
    { name: "Framer Motion", role: "Gesture & Parallax" },
    { name: "Tailwind CSS", role: "Design System" },
    { name: "TypeScript", role: "Type Safety" },
    { name: "Three.js / WebGL", role: "3D Spatial Graphics" },
    { name: "Web Audio API", role: "Generative Soundscapes" },
    { name: "WebP / AVIF", role: "High-Density Assets" },
  ];

  return (
    <section id="philosophy" className="relative py-32 px-6 md:px-16 bg-[#070a13] z-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Architecture & Philosophy</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">
            Engineered for Emotion,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-cyan-400">
              Benchmarked for Speed.
            </span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            The best creative websites don&apos;t just look spectacular—they feel
            instantaneous. Here is how I approach the balance between aesthetic
            ambition and rendering performance.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 rounded-3xl glass-panel glass-panel-hover relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-slate-500 tracking-widest">
                    {`${pillar.number} // ${pillar.badge}`}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Tech Stack Matrix */}
        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-white/10 gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white">Technical Arsenal</h3>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Cutting-edge technologies powering modern interactive production
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400">
                PROD-READY / PRODUCTION VERIFIED
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stack.map((item) => (
              <div
                key={item.name}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all"
              >
                <div className="text-sm font-bold text-white">{item.name}</div>
                <div className="text-xs font-mono text-slate-400 mt-1">
                  {item.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

