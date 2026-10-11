"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  Send,
  FileText,
  ArrowUp,
  Sparkles,
} from "lucide-react";
import { GithubIcon, TwitterIcon, LinkedinIcon } from "./Icons";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "alex.vance.dev@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative pt-32 pb-16 px-6 md:px-16 bg-[#070a13] z-20 border-t border-white/5 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-cyan-500/10 via-amber-500/5 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Main CTA Section */}
        <div className="p-8 sm:p-16 rounded-3xl glass-panel border border-white/10 mb-20 text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Initiate Collaboration</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight max-w-3xl mx-auto mb-6 leading-tight">
            Ready to craft something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-amber-400">
              extraordinary?
            </span>
          </h2>

          <p className="text-slate-300 text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Whether you are launching an Awwwards-worthy flagship experience,
            refining a complex WebGL tool, or exploring bespoke scrollytelling.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Copy Email Button */}
            <button
              onClick={handleCopyEmail}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white/10 border border-white/20 text-white font-mono text-sm hover:bg-white/15 hover:border-cyan-400/50 transition-all shadow-lg group"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-bold">Email Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span>{email}</span>
                </>
              )}
            </button>

            {/* Direct Mailto */}
            <a
              href={`mailto:${email}?subject=Collaboration%20Inquiry%20via%20Portfolio`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-cyan-400 text-slate-950 font-mono text-sm font-bold hover:bg-cyan-300 shadow-[0_0_25px_rgba(56,189,248,0.35)] transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Send Direct Inquiry</span>
            </a>
          </div>

          <div className="mt-8 text-xs font-mono text-slate-400 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Currently booking select projects for Q2 / Q3 2026</span>
          </div>
        </div>

        {/* Links & Colophon Row */}
        <div className="flex flex-col md:flex-row items-center justify-between py-8 border-t border-white/10 gap-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-white font-mono">ALEX VANCE</span>
            <span className="text-xs font-mono text-slate-500">•</span>
            <span className="text-xs font-mono text-slate-400">
              Senior Creative Developer
            </span>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {[
              { label: "GitHub", icon: GithubIcon, href: "https://github.com" },
              { label: "Twitter", icon: TwitterIcon, href: "https://twitter.com" },
              { label: "LinkedIn", icon: LinkedinIcon, href: "https://linkedin.com" },
              { label: "ReadCV", icon: FileText, href: "https://read.cv" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-cyan-400/40 hover:bg-white/10 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <span>Top of Canvas</span>
            <ArrowUp className="w-4 h-4 text-cyan-400" />
          </button>
        </div>

        {/* Architecture Colophon */}
        <div className="pt-6 text-center text-xs font-mono text-slate-500">
          Built with Next.js 14 App Router • 90-Frame Canvas Scrubbing • Framer Motion • Tailwind CSS • 60 FPS Optimized
        </div>
      </div>
    </footer>
  );
}
