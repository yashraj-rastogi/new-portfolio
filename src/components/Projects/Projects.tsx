"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/lib/data";

const filterCategories = ["All", "Frontend", "Backend", "Full-Stack", "AI", "Other"] as const;

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState<string>("All");
    const [expandedProject, setExpandedProject] = useState<string | null>(null);

    const filtered =
        activeFilter === "All"
            ? projects
            : projects.filter((p) => p.category === activeFilter);

    return (
        <section id="projects" className="chapter" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
            <div className="max-w-6xl w-full mx-auto px-4">
                {/* Chapter Label */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <p className="chapter-label">ACT IV</p>
                    <h2 className="chapter-title">The Missions</h2>
                    <p className="mt-4 text-sm font-mono" style={{ color: "var(--text-muted)" }}>
                        [ CLASSIFIED // CLICK TO EXPAND MISSION BRIEFING ]
                    </p>
                </motion.div>

                {/* Filter tabs */}
                <motion.div
                    className="flex flex-wrap justify-center gap-2 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    {filterCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className="interactive px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300"
                            style={{
                                background:
                                    activeFilter === cat ? "var(--cyan)" : "transparent",
                                color:
                                    activeFilter === cat ? "var(--bg-base)" : "var(--text-muted)",
                                border: `1px solid ${activeFilter === cat ? "var(--cyan)" : "var(--text-muted)"
                                    }`,
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Featured Project (first featured one) */}
                {filtered.find((p) => p.featured) && (
                    <FeaturedProject project={filtered.find((p) => p.featured)!} />
                )}

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <AnimatePresence mode="popLayout">
                        {filtered
                            .filter((p) => !p.featured)
                            .map((project) => (
                                <ProjectCard
                                    key={project.codename}
                                    project={project}
                                    isExpanded={expandedProject === project.codename}
                                    onToggle={() =>
                                        setExpandedProject(
                                            expandedProject === project.codename
                                                ? null
                                                : project.codename
                                        )
                                    }
                                />
                            ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

function FeaturedProject({ project }: { project: Project }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            className="relative rounded-2xl overflow-hidden p-8 md:p-12 mb-4"
            style={{
                background:
                    "linear-gradient(135deg, var(--bg-elevated) 0%, var(--bg-card) 100%)",
                border: "1px solid rgba(0, 245, 255, 0.15)",
                boxShadow: "0 0 60px rgba(0, 245, 255, 0.05)",
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
        >
            {/* "FEATURED" stamp */}
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest"
                style={{ background: "var(--red)", color: "white" }}
            >
                Featured Mission
            </div>

            <span className="text-xs font-mono tracking-[0.5em] uppercase block mb-2"
                style={{ color: "var(--red)" }}
            >
                CODENAME: {project.codename}
            </span>
            <h3 className="heading-display text-3xl md:text-4xl mb-4"
                style={{ color: "var(--text-primary)" }}
            >
                {project.title}
            </h3>
            <p className="text-base md:text-lg mb-6" style={{ color: "var(--text-secondary)" }}>
                {project.objective}
            </p>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t) => (
                    <span
                        key={t}
                        className="px-3 py-1 rounded-full text-xs font-mono"
                        style={{
                            background: "rgba(0,245,255,0.1)",
                            color: "var(--cyan)",
                            border: "1px solid rgba(0,245,255,0.2)",
                        }}
                    >
                        {t}
                    </span>
                ))}
            </div>

            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
                <span style={{ color: "var(--cyan)" }}>Impact:</span> {project.impact}
            </p>

            {/* Links */}
            <div className="flex gap-4">
                {project.github && (
                    <a
                        href={project.github}
                        className="interactive px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider border transition-all duration-300 hover:shadow-[0_0_20px_var(--cyan-dim)]"
                        style={{ borderColor: "var(--cyan-dim)", color: "var(--cyan)" }}
                    >
                        GitHub →
                    </a>
                )}
                {project.live && (
                    <a
                        href={project.live}
                        className="interactive px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-300"
                        style={{ background: "var(--cyan)", color: "var(--bg-base)" }}
                    >
                        Live Demo →
                    </a>
                )}
            </div>
        </motion.div>
    );
}

function ProjectCard({
    project,
    isExpanded,
    onToggle,
}: {
    project: Project;
    isExpanded: boolean;
    onToggle: () => void;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            layout
            className="glow-card interactive"
            onClick={onToggle}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4 }}
            style={{ cursor: "none" }}
        >
            {/* Classified label */}
            <div className="flex items-center justify-between mb-3">
                <span
                    className="text-[10px] font-mono tracking-[0.4em] uppercase"
                    style={{ color: "var(--red)" }}
                >
                    {project.codename}
                </span>
                <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded"
                    style={{
                        background: "rgba(255,51,102,0.1)",
                        color: "var(--red)",
                        border: "1px solid rgba(255,51,102,0.2)",
                    }}
                >
                    {project.category}
                </span>
            </div>

            <h4 className="heading-display text-lg mb-2" style={{ color: "var(--text-primary)" }}>
                {project.title}
            </h4>
            <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
                {project.objective}
            </p>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-1.5 mb-3">
                {project.tech.map((t) => (
                    <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10px] font-mono"
                        style={{
                            background: "rgba(0,245,255,0.08)",
                            color: "var(--cyan)",
                        }}
                    >
                        {t}
                    </span>
                ))}
            </div>

            {/* Expanded details */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                    >
                        <div
                            className="pt-3 mt-3"
                            style={{ borderTop: "1px solid rgba(0,245,255,0.1)" }}
                        >
                            <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
                                <span style={{ color: "var(--cyan)" }}>Impact:</span> {project.impact}
                            </p>
                            <div className="flex gap-3">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        className="interactive text-xs font-mono underline"
                                        style={{ color: "var(--cyan)" }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        GitHub →
                                    </a>
                                )}
                                {project.live && (
                                    <a
                                        href={project.live}
                                        className="interactive text-xs font-mono underline"
                                        style={{ color: "var(--red)" }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Live Demo →
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <p
                className="text-[10px] font-mono mt-3"
                style={{ color: "var(--text-muted)" }}
            >
                {isExpanded ? "[ CLICK TO COLLAPSE ]" : "[ CLICK TO EXPAND BRIEFING ]"}
            </p>
        </motion.div>
    );
}
