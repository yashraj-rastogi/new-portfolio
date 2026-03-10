"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { originTimeline, personalInfo } from "@/lib/data";
import Image from "next/image";

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);

    return (
        <section id="about" className="chapter" ref={sectionRef} style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
            <div className="max-w-5xl w-full mx-auto px-4">
                {/* Chapter Label */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <p className="chapter-label">ACT II</p>
                    <h2 className="chapter-title">The Origin Story</h2>
                </motion.div>

                {/* Bio + Photo row */}
                <motion.div
                    className="flex flex-col md:flex-row items-center gap-10 mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    {/* Photo */}
                    <div
                        className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden flex-shrink-0"
                        style={{
                            boxShadow: "0 0 30px rgba(0, 245, 255, 0.15)",
                            border: "1px solid rgba(0, 245, 255, 0.2)",
                        }}
                    >
                        <Image
                            src={personalInfo.photo}
                            alt={personalInfo.name}
                            fill
                            className="object-cover"
                            style={{ filter: "saturate(0.7) contrast(1.1)" }}
                        />
                        {/* Teal/orange cinematic overlay */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background:
                                    "linear-gradient(135deg, rgba(0,245,255,0.08) 0%, rgba(255,51,102,0.06) 100%)",
                            }}
                        />
                    </div>

                    {/* Bio text */}
                    <div className="text-center md:text-left">
                        <p className="text-lg md:text-xl leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                            {personalInfo.bio}
                        </p>
                    </div>
                </motion.div>

                {/* ─── Timeline ─── */}
                <div className="relative">
                    {/* Center line */}
                    <div
                        className="absolute left-1/2 top-0 bottom-0 w-[1px] hidden md:block"
                        style={{ background: "linear-gradient(to bottom, transparent, var(--cyan-dim), transparent)" }}
                    />
                    {/* Mobile left line */}
                    <div
                        className="absolute left-4 top-0 bottom-0 w-[1px] md:hidden"
                        style={{ background: "linear-gradient(to bottom, transparent, var(--cyan-dim), transparent)" }}
                    />

                    {originTimeline.map((event, i) => (
                        <TimelineItem key={i} event={event} index={i} />
                    ))}
                </div>

                {/* Closing line */}
                <motion.p
                    className="text-center mt-16 text-xl md:text-2xl italic"
                    style={{ color: "var(--text-muted)" }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    &ldquo;And the story isn&apos;t over.&rdquo;
                </motion.p>
            </div>
        </section>
    );
}

function TimelineItem({ event, index }: { event: typeof originTimeline[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const isLeft = index % 2 === 0;

    return (
        <div
            ref={ref}
            className={`relative flex items-center mb-12 md:mb-16 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
        >
            {/* Dot on the line */}
            <motion.div
                className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 z-10"
                style={{
                    background: isInView ? "var(--cyan)" : "var(--bg-card)",
                    boxShadow: isInView ? "0 0 12px var(--cyan-dim)" : "none",
                    border: "2px solid var(--cyan-dim)",
                }}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 }}
            />

            {/* Spacer (desktop) */}
            <div className="hidden md:block w-1/2" />

            {/* Card */}
            <motion.div
                className={`glow-card ml-10 md:ml-0 ${isLeft ? "md:ml-8" : "md:mr-8"} md:w-1/2 w-full`}
                initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
            >
                <span
                    className="text-xs font-mono uppercase tracking-widest mb-2 block"
                    style={{ color: "var(--cyan)" }}
                >
                    {event.year}
                </span>
                <h3
                    className="heading-display text-xl md:text-2xl mb-2"
                    style={{ color: "var(--text-primary)" }}
                >
                    {event.title}
                </h3>
                <p style={{ color: "var(--text-secondary)" }} className="text-sm leading-relaxed">
                    {event.description}
                </p>
            </motion.div>
        </div>
    );
}
