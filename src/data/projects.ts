export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  description: string;
  role: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  accentColor: string; // "cyan" | "amber" | "teal" | "purple"
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  highlights: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "aura-digital",
    title: "Aura Spatial",
    subtitle: "Interactive 3D Soundscape & Spatial Experience",
    category: "WebGL / Creative Coding",
    year: "2026",
    description:
      "A dynamic 3D web environment featuring real-time procedural audio synthesis, spatial reverb physics, and custom GLSL vertex shaders rendered at 120fps.",
    role: "Lead Creative Technologist",
    tags: ["Next.js 14", "Three.js / WebGL", "Web Audio API", "GLSL Shaders", "Tailwind CSS"],
    metrics: [
      { label: "Frame Rate", value: "120 FPS" },
      { label: "Audio Latency", value: "<12ms" },
      { label: "Accolade", value: "Awwwards SOTD" },
    ],
    accentColor: "cyan",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com/aura",
    featured: true,
    highlights: [
      "Custom physically-based lighting and noise displacement shaders",
      "Dynamic directional binaural audio spatialization",
      "Zero bundle bloat with tree-shaken WebGL pipelines",
    ],
  },
  {
    id: "synapse-os",
    title: "Synapse OS",
    subtitle: "Neural Interface & Node-Based Visual Compute",
    category: "Systems & Generative UI",
    year: "2025",
    description:
      "An experimental operating system interface simulating neural network activations with real-time particle graphs, tactile spring dynamics, and gesture navigation.",
    role: "Interaction Architect",
    tags: ["React 18", "Framer Motion", "Canvas 2D", "WebAssembly", "TypeScript"],
    metrics: [
      { label: "Active Nodes", value: "10,000+" },
      { label: "Physics Loop", value: "60 FPS" },
      { label: "Accolade", value: "FWA of the Day" },
    ],
    accentColor: "amber",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com/synapse",
    featured: true,
    highlights: [
      "HTML5 Canvas optimized particle simulation with quadtree partitioning",
      "Fluid gestural drag-and-drop workspace with spring dampening",
      "Persistent state synchronization via indexedDB",
    ],
  },
  {
    id: "chrono-luxe",
    title: "Chrono Luxe",
    subtitle: "High-Horology Scrollytelling & 3D Tourbillon",
    category: "Scrollytelling eCommerce",
    year: "2025",
    description:
      "A cinematic e-commerce editorial for luxury mechanical timepieces, powered by scroll-scrubbed photogrammetry sequences and interactive exploded component views.",
    role: "Creative Developer",
    tags: ["Next.js", "Canvas Scrubbing", "Tailwind CSS", "GSAP / Motion", "Shopify API"],
    metrics: [
      { label: "Asset Size", value: "1.2 MB WebP" },
      { label: "Scrub Smoothness", value: "60 FPS" },
      { label: "Conversion Lift", value: "+44%" },
    ],
    accentColor: "teal",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com/chrono",
    featured: true,
    highlights: [
      "Sub-frame interpolated image sequence scrubbing with devicePixelRatio scaling",
      "Multi-layered glassmorphism HUD with real-time component breakdown",
      "Optimized memory footprint avoiding canvas context garbage-collection spikes",
    ],
  },
  {
    id: "nebula-engine",
    title: "Nebula Engine",
    subtitle: "WebGPU Particle Toolkit & Generative Shaders",
    category: "Open Source Tooling",
    year: "2025",
    description:
      "A lightweight open-source compute shader toolkit enabling developers to simulate millions of gravitationally interacting particles in browser environments.",
    role: "Author & Maintainer",
    tags: ["WebGPU", "WGSL", "TypeScript", "Vite", "Canvas"],
    metrics: [
      { label: "Particles", value: "1,000,000" },
      { label: "GitHub Stars", value: "2.4k" },
      { label: "License", value: "MIT" },
    ],
    accentColor: "purple",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com/nebula",
    featured: true,
    highlights: [
      "Parallel compute shader passes using WebGPU pipeline layouts",
      "Intuitive declarative API for modern React and vanilla web applications",
      "Zero dependencies with zero-overhead memory buffers",
    ],
  },
];

