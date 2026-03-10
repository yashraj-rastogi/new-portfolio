"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { achievements } from "@/lib/data";

const typeIcons: Record<string, string> = {
    hackathon: "🏆",
    certification: "📜",
    award: "🎖️",
    contribution: "💻",
};

const typeColors: Record<string, string> = {
    hackathon: "var(--red)",
    certification: "var(--cyan)",
    award: "#ffd700",
    contribution: "#a855f7",
};

export default function Achievements() {
    return (
        <section id="achievements" className="chapter">
            <div className="max-w-5xl w-full mx-auto px-4">
                {/* Chapter Label */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <p className="chapter-label">ACT V</p>
                    <h2 className="chapter-title">Hall of Legends</h2>
                    <p className="mt-4 text-sm font-mono" style={{ color: "var(--text-muted)" }}>
                        [ ACHIEVEMENTS UNLOCKED ]
                    </p>
                </motion.div>

                {/* Stats counters */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <StatCounter label="Hackathons" value={5} suffix="+" />
                    <StatCounter label="Projects Built" value={10} suffix="+" />
                    <StatCounter label="Events Organized" value={10} suffix="+" />
                    <StatCounter label="Technologies" value={12} suffix="+" />
                </motion.div>

                {/* Achievement cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {achievements.map((ach, i) => (
                        <AchievementCard key={ach.title} achievement={ach} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function StatCounter({
    label,
    value,
    suffix = "",
}: {
    label: string;
    value: number;
    suffix?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div
            ref={ref}
            className="text-center p-4 rounded-xl"
            style={{
                background: "var(--bg-elevated)",
                border: "1px solid rgba(0,245,255,0.1)",
            }}
        >
            <motion.span
                className="heading-display text-3xl md:text-4xl block"
                style={{ color: "var(--cyan)" }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
            >
                {isInView ? value : 0}
                {suffix}
            </motion.span>
            <span className="text-xs font-mono mt-1 block" style={{ color: "var(--text-muted)" }}>
                {label}
            </span>
        </div>
    );
}

function AchievementCard({
    achievement,
    index,
}: {
    achievement: (typeof achievements)[0];
    index: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            className="glow-card relative overflow-hidden group"
            initial={{ opacity: 0, scale: 0.8, rotateX: 15 }}
            animate={
                isInView
                    ? { opacity: 1, scale: 1, rotateX: 0 }
                    : {}
            }
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            {/* Unlock flash effect */}
            {isInView && (
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `radial-gradient(ellipse at center, ${typeColors[achievement.type]}22, transparent)`,
                    }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 1.5, delay: index * 0.1 }}
                />
            )}

            <div className="flex items-start gap-3">
                <span className="text-2xl">{typeIcons[achievement.type]}</span>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <h4 className="heading-display text-sm" style={{ color: "var(--text-primary)" }}>
                            {achievement.title}
                        </h4>
                    </div>
                    <p className="text-xs mb-2" style={{ color: "var(--text-secondary)" }}>
                        {achievement.description}
                    </p>
                    <span
                        className="text-[10px] font-mono px-2 py-0.5 rounded inline-block"
                        style={{
                            background: `${typeColors[achievement.type]}15`,
                            color: typeColors[achievement.type],
                            border: `1px solid ${typeColors[achievement.type]}30`,
                        }}
                    >
                        {achievement.year}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
