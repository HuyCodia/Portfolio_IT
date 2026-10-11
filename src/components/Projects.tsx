"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, Project } from "@/data/projects";
import {
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  Layers,
  X,
  CheckCircle2,
} from "lucide-react";
import { GithubIcon } from "./Icons";

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ["All", "WebGL / Creative Coding", "Scrollytelling eCommerce", "Systems & Generative UI"];

  const filteredProjects =
    selectedFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedFilter || selectedFilter === "All");

  return (
    <section id="work" className="relative py-32 px-6 md:px-16 bg-[#070a13] z-20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-900/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected Works (04)</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white">
              Crafted with Precision.
            </h2>
          </div>

          <p className="text-slate-400 max-w-md text-sm md:text-base leading-relaxed">
            Case studies demonstrating high-performance canvas rendering,
            fluid motion systems, and editorial-level scrollytelling.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 ${
                selectedFilter === cat
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                  : "bg-white/[0.03] text-slate-400 border border-white/10 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onOpenModal={() => setActiveModalProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <CaseStudyModal
            project={activeModalProject}
            onClose={() => setActiveModalProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenModal: () => void;
}

function ProjectCard({ project, index, onOpenModal }: ProjectCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const getAccentBorder = () => {
    switch (project.accentColor) {
      case "cyan":
        return "hover:border-cyan-500/50 group-hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]";
      case "amber":
        return "hover:border-amber-500/50 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]";
      case "teal":
        return "hover:border-teal-500/50 group-hover:shadow-[0_0_30px_rgba(20,184,166,0.15)]";
      default:
        return "hover:border-purple-500/50 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-3xl p-8 glass-panel glass-panel-hover overflow-hidden transition-all duration-500 ${getAccentBorder()}`}
    >
      {/* Dynamic Cursor Spotlight Effect */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.08), transparent 80%)`,
          }}
        />
      )}

      {/* Card Header */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-mono text-slate-400 tracking-wider">
          {`0${index + 1} // ${project.category}`}
        </span>
        <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
          {project.year}
        </span>
      </div>

      {/* Title & Subtitle */}
      <div className="mb-4">
        <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
          <span>{project.title}</span>
          <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
        </h3>
        <p className="text-sm text-cyan-400/90 font-mono mt-1">
          {project.subtitle}
        </p>
      </div>

      {/* Description */}
      <p className="text-slate-300 text-sm leading-relaxed mb-6">
        {project.description}
      </p>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2 py-4 mb-6 rounded-xl bg-black/30 border border-white/5">
        {project.metrics.map((m, i) => (
          <div key={i} className="text-center px-2">
            <div className="text-xs text-slate-400 font-mono">{m.label}</div>
            <div className="text-sm font-bold text-white font-mono mt-0.5">
              {m.value}
            </div>
          </div>
        ))}
      </div>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <button
          onClick={onOpenModal}
          className="text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>Case Study Specs</span>
        </button>

        <div className="flex items-center gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="View Source Code on GitHub"
            className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono hover:bg-cyan-500/20 transition-all"
          >
            <span>Live Experience</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

interface CaseStudyModalProps {
  project: Project;
  onClose: () => void;
}

function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel p-6 sm:p-10 border border-white/20 shadow-2xl bg-[#090e1a]"
      >
        <button
          onClick={onClose}
          aria-label="Close Case Study"
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4">
          <span>{project.category}</span>
          <span>•</span>
          <span>{project.year}</span>
        </div>

        <h3 className="text-3xl sm:text-4xl font-black text-white mb-2">
          {project.title}
        </h3>
        <p className="text-cyan-300 font-mono text-sm mb-6">{project.subtitle}</p>

        <div className="mb-6">
          <h4 className="text-xs uppercase font-mono tracking-widest text-slate-400 mb-2">
            Overview
          </h4>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="mb-6">
          <h4 className="text-xs uppercase font-mono tracking-widest text-slate-400 mb-3">
            Engineering Highlights
          </h4>
          <div className="space-y-2.5">
            {project.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-8">
          {project.metrics.map((m, i) => (
            <div key={i} className="text-center">
              <div className="text-xs text-slate-400 font-mono">{m.label}</div>
              <div className="text-base font-bold text-cyan-300 font-mono mt-1">
                {m.value}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          >
            Close
          </button>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-full text-xs font-mono font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors flex items-center gap-1.5"
          >
            <span>Launch Live Experience</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

