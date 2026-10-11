import Navigation from "@/components/Navigation";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";
import Philosophy from "@/components/Philosophy";
import Contact from "@/components/Contact";
import AmbientCursor from "@/components/AmbientCursor";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#070a13] text-slate-100 selection:bg-cyan-500/30 selection:text-white">
      {/* Ambient mouse follower glow */}
      <AmbientCursor />

      {/* Persistent floating navigation bar */}
      <Navigation />

      {/* Component 1 & 2: 500vh Sticky Canvas Scrollytelling + Parallax Overlay */}
      <ScrollyCanvas />

      {/* Component 3: Work Grid showcasing featured project case studies */}
      <Projects />

      {/* Architecture & Engineering Philosophy */}
      <Philosophy />

      {/* Contact CTA & Footer */}
      <Contact />
    </main>
  );
}
