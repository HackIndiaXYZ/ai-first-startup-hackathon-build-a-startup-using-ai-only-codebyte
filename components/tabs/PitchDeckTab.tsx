"use client";

import React, { useState, useEffect } from "react";
import {
  DeckSlide,
} from "@/types/startup";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Printer,
  Sparkles,
  Layers,
  BarChart3,
  CheckCircle2,
  FileDown,
} from "lucide-react";

interface PitchDeckTabProps {
  slides: DeckSlide[];
  startupIdea: string;
}

export const PitchDeckTab: React.FC<PitchDeckTabProps> = ({
  slides,
  startupIdea,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentSlide = slides[currentSlideIndex] || slides[0];

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation (ArrowLeft and ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slides.length]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Deck Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4 no-print">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1 font-mono text-xs text-zinc-300">
            <Layers className="h-3.5 w-3.5 text-cyan-400" />
            <span>Slide {currentSlideIndex + 1} of {slides.length}</span>
          </div>
          <span className="text-xs text-zinc-500 hidden sm:inline font-mono">
            (Use ← and → keys to navigate)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Print / Save as PDF Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:text-white"
            title="Print or save entire 10-slide deck as PDF"
          >
            <Printer className="h-3.5 w-3.5 text-zinc-400" />
            <span>Print Deck (PDF)</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:text-white"
          >
            <Maximize2 className="h-3.5 w-3.5 text-zinc-400" />
            <span>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
          </button>
        </div>
      </div>

      {/* Main 16:9 Presentation Slide Viewer */}
      <div
        className={`relative mx-auto w-full transition-all duration-300 ${
          isFullscreen
            ? "fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/95 p-8"
            : "max-w-4xl"
        }`}
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-zinc-800 bg-[#0d0d0d] p-6 shadow-2xl flex flex-col justify-between sm:p-10">
          {/* Slide Ambient Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl" />

          {/* Slide Header */}
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest text-cyan-300">
                <Sparkles className="h-2.5 w-2.5" />
                {currentSlide.category}
              </span>
              <span className="font-mono text-xs text-zinc-600">
                0{currentSlideIndex + 1} / {slides.length}
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              {currentSlide.title}
            </h2>

            {currentSlide.subtitle && (
              <p className="mt-1 text-xs sm:text-sm text-zinc-400 font-normal">
                {currentSlide.subtitle}
              </p>
            )}
          </div>

          {/* Slide Body: Bullets and/or Metrics */}
          <div className="my-auto py-2">
            {currentSlide.metrics && currentSlide.metrics.length > 0 && (
              <div className="mb-4 grid grid-cols-3 gap-3">
                {currentSlide.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 text-center"
                  >
                    <div className="text-xl sm:text-2xl font-bold text-cyan-400">
                      {m.value}
                    </div>
                    <div className="text-[10px] sm:text-xs font-mono text-zinc-400">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <ul className="space-y-2.5 sm:space-y-3">
              {currentSlide.bullets.map((bullet, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300"
                >
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span className="leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Slide Footer / Key Takeaway */}
          <div className="border-t border-zinc-800/80 pt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-[11px] sm:text-xs text-zinc-300 font-medium">
                Takeaway: {currentSlide.takeaway}
              </span>
            </div>
            <div className="text-[10px] font-mono text-zinc-600 hidden sm:block">
              PitchPilot Investor Deck
            </div>
          </div>

          {/* Slide Navigation Overlay Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-zinc-800 bg-black/60 p-2 text-zinc-400 backdrop-blur-sm transition-all hover:bg-zinc-800 hover:text-white"
            title="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-zinc-800 bg-black/60 p-2 text-zinc-400 backdrop-blur-sm transition-all hover:bg-zinc-800 hover:text-white"
            title="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Slide Thumbnail Navigation Strip */}
      <div className="mx-auto max-w-4xl no-print">
        <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
          Slide Thumbnails (Click to Jump)
        </div>
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
          {slides.map((slide, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`flex flex-col items-center justify-center rounded-lg border p-2 text-center transition-all ${
                idx === currentSlideIndex
                  ? "border-cyan-500 bg-cyan-950/40 text-cyan-200"
                  : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
              }`}
            >
              <span className="text-xs font-mono font-bold">{idx + 1}</span>
              <span className="text-[9px] truncate max-w-full font-sans mt-0.5">
                {slide.category}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Print-Only Slide View (All 10 slides printed sequentially) */}
      <div className="hidden print:block space-y-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">{startupIdea}</h1>
          <p className="text-sm text-gray-600">PitchPilot Investor Presentation</p>
        </div>

        {slides.map((slide, idx) => (
          <div key={idx} className="slide-print-card print-page-break p-6 border border-gray-300 rounded-lg">
            <div className="flex justify-between border-b pb-2 mb-4">
              <span className="font-bold uppercase text-xs text-gray-500">{slide.category}</span>
              <span className="text-xs font-mono">Slide {idx + 1} of {slides.length}</span>
            </div>
            <h2 className="text-xl font-bold mb-2">{slide.title}</h2>
            {slide.subtitle && <p className="text-sm text-gray-600 mb-4">{slide.subtitle}</p>}
            <ul className="space-y-2 mb-4">
              {slide.bullets.map((b, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span>•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="border-t pt-2 text-xs font-semibold text-gray-700">
              Takeaway: {slide.takeaway}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
