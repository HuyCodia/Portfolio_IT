"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useScroll } from "framer-motion";
import Overlay from "./Overlay";
import { Loader2 } from "lucide-react";

const TOTAL_FRAMES = 90;

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  // Framer Motion useScroll on the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Render a specific frame onto the canvas using object-fit: cover logic
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Retrieve image from preloaded cache
    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    // object-fit: cover algorithm
    if (canvasRatio > imgRatio) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgRatio;
      drawHeight = canvasHeight;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Update canvas resolution based on devicePixelRatio and container dimensions
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const width = Math.round(rect.width * dpr);
    const height = Math.round(rect.height * dpr);

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    renderFrame(currentFrameRef.current);
  }, [renderFrame]);

  // Preload all 90 frames in useEffect to prevent flickering and white flashes
  useEffect(() => {
    let isCancelled = false;
    const images: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(2, "0");
      // Use WebP sequence with PNG fallback
      img.src = `/sequence/frame_${paddedIndex}_delay-0.067s.webp`;

      img.onload = () => {
        if (isCancelled) return;
        count++;
        setLoadedCount(count);

        // Once the initial frame is ready, paint it immediately
        if (i === 0 && !isReady) {
          updateCanvasDimensions();
          renderFrame(0);
        }

        // Once at least 30% are loaded, mark as ready to display
        if (count >= Math.min(30, TOTAL_FRAMES)) {
          setIsReady(true);
        }
      };

      img.onerror = () => {
        // Fallback to .png if .webp fails
        img.src = `/sequence/frame_${paddedIndex}_delay-0.067s.png`;
      };

      images.push(img);
    }

    imagesRef.current = images;

    // Window resize listener
    const handleResize = () => {
      updateCanvasDimensions();
    };

    window.addEventListener("resize", handleResize);
    updateCanvasDimensions();

    return () => {
      isCancelled = true;
      window.removeEventListener("resize", handleResize);
    };
  }, [renderFrame, updateCanvasDimensions, isReady]);

  // Scrub through the frames based on scrollYProgress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const targetIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(latest * (TOTAL_FRAMES - 1)))
      );

      if (targetIndex !== currentFrameRef.current) {
        currentFrameRef.current = targetIndex;

        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
        }

        rafIdRef.current = requestAnimationFrame(() => {
          renderFrame(targetIndex);
        });
      }
    });

    return () => {
      unsubscribe();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [scrollYProgress, renderFrame]);

  const loadPercent = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <div
      ref={containerRef}
      id="hero-scroller"
      className="relative h-[500vh] bg-[#070a13]"
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Canvas displaying sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block object-cover"
        />

        {/* Cinematic Vignette & Ambient Glow Mask */}
        <div className="absolute inset-0 pointer-events-none vignette-mask" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#070a13] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#070a13]/80 to-transparent pointer-events-none" />

        {/* Ambient colored lighting accents mirroring the subject's dual lighting */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Parallax Overlay Component sitting on top (z-index 10) */}
        <Overlay scrollYProgress={scrollYProgress} />

        {/* Minimalist System Preloader Indicator */}
        {loadedCount < TOTAL_FRAMES && (
          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/10 text-[11px] font-mono tracking-wider text-slate-300">
            <Loader2 className="w-3 h-3 text-cyan-400 animate-spin" />
            <span>CACHING FRAMES: {loadPercent}%</span>
            <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-amber-500 transition-all duration-300"
                style={{ width: `${loadPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

