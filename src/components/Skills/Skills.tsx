"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { skills, type Skill } from "@/lib/data";

const categories = ["Languages", "Frontend", "Backend", "Tools"] as const;
const categoryIcons: Record<string, string> = {
    Languages: "⚔️",
    Frontend: "🛡️",
    Backend: "⚙️",
    Tools: "🔧",
};

export default function Skills() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

    return (
        <section id="skills" className="chapter" ref={sectionRef}>
            <div className="max-w-6xl w-full mx-auto px-4">
                {/* Chapter Label */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <p className="chapter-label">ACT III</p>
                    <h2 className="chapter-title">The Arsenal</h2>
                    <p className="mt-4 text-sm font-mono" style={{ color: "var(--text-muted)" }}>
                        [ WEAPONS CLASSIFIED // HOVER TO INSPECT ]
                    </p>
                </motion.div>

                {/* HUD Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {categories.map((cat, ci) => (
                        <motion.div
                            key={cat}
                            className="glow-card"
                            style={{ background: "var(--bg-elevated)" }}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: ci * 0.15 }}
                            viewport={{ once: true }}
                        >
                            {/* Category header */}
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-2xl">{categoryIcons[cat]}</span>
                                <h3
                                    className="heading-display text-lg uppercase tracking-widest"
                                    style={{ color: "var(--cyan)" }}
                                >
                                    {cat}
                                </h3>
                            </div>

                            {/* Skill bars */}
                            <div className="space-y-4">
                                {skills
                                    .filter((s) => s.category === cat)
                                    .map((skill) => (
                                        <SkillBar
                                            key={skill.name}
                                            skill={skill}
                                            isHovered={hoveredSkill?.name === skill.name}
                                            onHover={() => setHoveredSkill(skill)}
                                            onLeave={() => setHoveredSkill(null)}
                                        />
                                    ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Hover tooltip */}
                <motion.div
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 glass rounded-xl px-6 py-3 z-[100] pointer-events-none hidden md:block"
                    animate={{
                        opacity: hoveredSkill ? 1 : 0,
                        y: hoveredSkill ? 0 : 10,
                    }}
                    transition={{ duration: 0.2 }}
                >
                    {hoveredSkill && (
                        <p className="text-sm font-mono" style={{ color: "var(--text-secondary)" }}>
                            <span style={{ color: "var(--cyan)" }}>{hoveredSkill.name}</span> — {hoveredSkill.note}
                        </p>
                    )}
                </motion.div>
            </div>
        </section>
    );
}

function SkillBar({
    skill,
    isHovered,
    onHover,
    onLeave,
}: {
    skill: Skill;
    isHovered: boolean;
    onHover: () => void;
    onLeave: () => void;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <div
            ref={ref}
            className="interactive group cursor-none"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            <div className="flex justify-between items-center mb-1.5">
                <span
                    className="text-sm font-mono transition-colors duration-300"
                    style={{ color: isHovered ? "var(--cyan)" : "var(--text-primary)" }}
                >
                    {skill.name}
                </span>
                <motion.span
                    className="text-xs font-mono"
                    style={{ color: "var(--text-muted)" }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 }}
                >
                    {skill.level}%
                </motion.span>
            </div>
            <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ background: "rgba(0,245,255,0.08)" }}
            >
                <motion.div
                    className="h-full rounded-full"
                    style={{
                        background: isHovered
                            ? "linear-gradient(90deg, var(--cyan), var(--red))"
                            : "linear-gradient(90deg, var(--cyan), var(--cyan-dim))",
                        boxShadow: isHovered ? "0 0 12px var(--cyan-dim)" : "none",
                    }}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                />
            </div>
        </div>
    );
}
