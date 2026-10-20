"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Eye, Send, Plus, FileText, Sparkles } from "lucide-react";
import { FantasyScene } from "@/components/animations/FantasyScene";
import { Scribe } from "@/components/characters/Scribe";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GENRES } from "@/lib/utils";
import { countWords } from "@/lib/utils";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [content, setContent] = useState("");
  const [saved, setSaved] = useState(false);
  const [published, setPublished] = useState(false);
  const [writing, setWriting] = useState(false);

  const wordCount = countWords(content);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handlePublish = () => {
    setPublished(true);
    setTimeout(() => setPublished(false), 4000);
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 h-[40vh] pointer-events-none overflow-hidden">
        <FantasyScene variant="ambient" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy-deep" />
      </div>

      <div className="relative verse-container pt-28 pb-16 md:pt-32">
        <FadeIn>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <p className="verse-subheading text-champagne/60 mb-3">The Scribe&apos;s Chamber</p>
              <h1 className="verse-heading text-4xl md:text-5xl font-light gold-text">Write Your Legend</h1>
            </div>
            <Scribe writing={writing || content.length > 0} />
          </div>
        </FadeIn>

        <AnimatePresence>
          {saved && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 glass-tile px-6 py-3 flex items-center gap-2 border-champagne/30"
            >
              <Sparkles className="w-4 h-4 text-champagne" />
              <span className="text-sm font-sans text-champagne">Draft Saved</span>
            </motion.div>
          )}
          {published && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/80 backdrop-blur-sm"
            >
              <motion.div
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                className="text-center p-10"
              >
                <motion.div
                  animate={{ y: [0, -60, -120], opacity: [1, 0.8, 0], scale: [1, 0.8, 0.5] }}
                  transition={{ duration: 2 }}
                  className="w-20 h-24 mx-auto mb-6 rounded-sm bg-champagne/20 border border-champagne/40"
                />
                <h2 className="verse-heading text-2xl text-champagne mb-2">Your story has entered the realm.</h2>
                <p className="text-ivory-muted font-sans text-sm">It now drifts among the stars of the Verse.</p>
                <Button variant="ghost" size="sm" className="mt-6" onClick={() => setPublished(false)}>Continue Writing</Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <FadeIn className="lg:col-span-1 space-y-4">
            <div className="verse-panel p-5">
              <h3 className="verse-subheading mb-4">Your Drafts</h3>
              {["Untitled Story", "The Last Lighthouse", "Whispers"].map((draft) => (
                <button key={draft} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm font-sans text-ivory-muted hover:text-champagne hover:bg-champagne/5 transition-colors">
                  <FileText className="w-4 h-4 text-champagne/60" />
                  {draft}
                </button>
              ))}
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-sans text-champagne hover:bg-champagne/5 mt-2">
                <Plus className="w-4 h-4" /> New Story
              </button>
            </div>
            <div className="verse-panel p-5">
              <h3 className="verse-subheading mb-3">Statistics</h3>
              <div className="space-y-2 text-sm font-sans">
                <div className="flex justify-between text-ivory-muted"><span>Words</span><span className="text-champagne">{wordCount}</span></div>
                <div className="flex justify-between text-ivory-muted"><span>Status</span><Badge variant="tag">Draft</Badge></div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="lg:col-span-3">
            <div className="verse-panel overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-white/10">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={handleSave}><Save className="w-4 h-4" />Save Draft</Button>
                  <Button variant="ghost" size="sm"><Eye className="w-4 h-4" />Preview</Button>
                </div>
                <Button variant="primary" size="sm" onClick={handlePublish}><Send className="w-4 h-4" />Publish</Button>
              </div>
              <div className="p-6 md:p-10 space-y-6">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Story title..."
                  className="w-full bg-transparent text-3xl md:text-4xl font-display text-champagne placeholder:text-ivory-dim/40 focus:outline-none tracking-wide"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select value={genre} onChange={(e) => setGenre(e.target.value)} className="verse-input">
                    <option value="">Select genre...</option>
                    {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                  <input type="text" placeholder="Tags (comma separated)" className="verse-input" />
                </div>
                <textarea
                  value={content}
                  onChange={(e) => { setContent(e.target.value); setWriting(true); }}
                  onBlur={() => setWriting(false)}
                  placeholder="Begin your tale..."
                  rows={18}
                  className="w-full bg-transparent text-ivory/90 font-serif text-lg leading-[1.9] placeholder:text-ivory-dim/40 focus:outline-none resize-none"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
