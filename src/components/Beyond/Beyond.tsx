"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { beyondTheScreen } from "@/lib/data";

export default function Beyond() {
    return (
        <section
            id="beyond"
            className="chapter"
            style={{
                background: "linear-gradient(to bottom, var(--bg-base), #0f0f18, var(--bg-base))",
            }}
        >
            <div className="max-w-5xl w-full mx-auto px-4">
                {/* Chapter Label */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <p className="chapter-label">ACT VI</p>
                    <h2 className="chapter-title">Beyond the Screen</h2>
                    <p className="mt-4 text-sm font-mono" style={{ color: "var(--text-muted)" }}>
                        [ THE HUMAN BEHIND THE CODE ]
                    </p>
                </motion.div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Sports */}
                    <SectionCard title="On the Sports Ground" delay={0}>
                        <div className="space-y-3">
                            {beyondTheScreen.sports.map((sport) => (
                                <motion.div
                                    key={sport.name}
                                    className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-[rgba(0,245,255,0.05)]"
                                    whileHover={{ x: 5 }}
                                >
                                    <span className="text-2xl">{sport.emoji}</span>
                                    <span className="font-mono text-sm" style={{ color: "var(--text-primary)" }}>
                                        {sport.name}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </SectionCard>

                    {/* Movies */}
                    <SectionCard title="First Love: Movies" delay={0.15}>
                        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                            Movies were my first love, even before coding.
                        </p>
                        {/* Movie collage */}
                        <div className="grid grid-cols-4 gap-2 mb-4">
                            {beyondTheScreen.movies.list.map((movie, i) => (
                                <motion.div
                                    key={movie}
                                    className="aspect-[2/3] rounded-lg flex items-center justify-center p-1 text-center"
                                    style={{
                                        background: `hsl(${200 + i * 20}, 70%, ${12 + i * 2}%)`,
                                        border: i === 0 ? "1px solid var(--red)" : "1px solid rgba(255,255,255,0.05)",
                                        boxShadow: i === 0 ? "0 0 15px var(--red-dim)" : "none",
                                    }}
                                    whileHover={{ scale: 1.08, zIndex: 10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <span className="text-[9px] font-mono leading-tight" style={{ color: "var(--text-secondary)" }}>
                                        {movie}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                        <p className="text-xs font-mono" style={{ color: "var(--red)" }}>
                            ★ All-time favourite: <strong>{beyondTheScreen.movies.allTimeFavorite}</strong>
                        </p>
                    </SectionCard>

                    {/* Music */}
                    <SectionCard title="The Coding Soundtrack" delay={0.3}>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-4xl">🎵</span>
                            <div>
                                <p className="text-sm mb-1" style={{ color: "var(--text-primary)" }}>
                                    {beyondTheScreen.music.vibe}
                                </p>
                                <p className="text-xs italic" style={{ color: "var(--text-muted)" }}>
                                    {beyondTheScreen.music.warning}
                                </p>
                            </div>
                        </div>
                        {/* Equalizer animation */}
                        <div className="flex items-end gap-1 h-8">
                            {Array.from({ length: 20 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-1.5 rounded-t"
                                    style={{ background: "var(--cyan)" }}
                                    animate={{
                                        height: [
                                            `${Math.random() * 20 + 5}px`,
                                            `${Math.random() * 30 + 10}px`,
                                            `${Math.random() * 15 + 5}px`,
                                        ],
                                    }}
                                    transition={{
                                        duration: 0.8 + Math.random() * 0.5,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        delay: i * 0.05,
                                    }}
                                />
                            ))}
                        </div>
                    </SectionCard>

                    {/* Quote */}
                    <SectionCard title="Words I Live By" delay={0.45}>
                        <div className="flex flex-col items-center justify-center h-full py-6">
                            <motion.div
                                className="relative"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1 }}
                                viewport={{ once: true }}
                            >
                                <span
                                    className="absolute -top-4 -left-2 text-6xl opacity-20 heading-display"
                                    style={{ color: "var(--cyan)" }}
                                >
                                    &ldquo;
                                </span>
                                <p
                                    className="heading-display text-2xl md:text-3xl text-center px-6 leading-relaxed"
                                    style={{
                                        background: "linear-gradient(135deg, var(--cyan), var(--red))",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    {beyondTheScreen.quote}
                                </p>
                                <span
                                    className="absolute -bottom-6 -right-2 text-6xl opacity-20 heading-display"
                                    style={{ color: "var(--red)" }}
                                >
                                    &rdquo;
                                </span>
                            </motion.div>
                        </div>
                    </SectionCard>
                </div>
            </div>
        </section>
    );
}

function SectionCard({
    title,
    delay,
    children,
}: {
    title: string;
    delay: number;
    children: React.ReactNode;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            className="glow-card"
            style={{ background: "var(--bg-elevated)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay }}
        >
            <h3
                className="heading-display text-lg mb-4"
                style={{ color: "var(--cyan)" }}
            >
                {title}
            </h3>
            {children}
        </motion.div>
    );
}
