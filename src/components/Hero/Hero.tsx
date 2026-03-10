"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [entered, setEntered] = useState(false);
    const [showMask, setShowMask] = useState(false);

    // Particle canvas
    useEffect(() => {
        const canvas = document.getElementById("hero-particles") as HTMLCanvasElement;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animFrameId: number;
        const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Create particles
        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.1,
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 245, 255, ${p.opacity})`;
                ctx.fill();
            });

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 245, 255, ${0.08 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            animFrameId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animFrameId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    // Trigger mask reveal after a short delay
    useEffect(() => {
        const timeout = setTimeout(() => setShowMask(true), 1800);
        return () => clearTimeout(timeout);
    }, []);

    const handleEnter = () => {
        setEntered(true);
        setTimeout(() => {
            const about = document.getElementById("about");
            if (about) about.scrollIntoView({ behavior: "smooth" });
        }, 600);
    };

    const nameLetters = "YASHRAJ RASTOGI".split("");

    return (
        <section
            id="hero"
            ref={containerRef}
            className="chapter relative flex flex-col items-center justify-center overflow-hidden"
            style={{ minHeight: "100vh" }}
        >
            {/* Particle Background */}
            <canvas
                id="hero-particles"
                className="absolute inset-0 z-0"
                style={{ opacity: 0.6 }}
            />

            {/* Radial gradient overlay */}
            <div
                className="absolute inset-0 z-[1]"
                style={{
                    background:
                        "radial-gradient(ellipse at center, transparent 0%, var(--bg-base) 70%)",
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-4">
                {/* Cinematic name reveal */}
                <motion.div
                    className="overflow-hidden mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div className="flex flex-wrap justify-center gap-[2px]">
                        {nameLetters.map((letter, i) => (
                            <motion.span
                                key={i}
                                className="heading-display text-glow inline-block"
                                style={{
                                    fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                                    color: "var(--text-primary)",
                                }}
                                initial={{ y: 80, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.5 + i * 0.04,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                {letter === " " ? "\u00A0" : letter}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                {/* Tagline */}
                <motion.p
                    className="text-lg md:text-xl mb-12"
                    style={{ color: "var(--text-secondary)" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.3 }}
                >
                    Full Stack Web Developer & AI Enthusiast
                </motion.p>

                {/* ─── MASK TEXT EFFECT ─── */}
                <motion.div
                    className="relative mb-16 select-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showMask ? 1 : 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="relative overflow-hidden group interactive" style={{ padding: "1rem 2rem" }}>
                        {/* Visible text */}
                        <span
                            className="heading-display block text-3xl md:text-5xl transition-all duration-700 ease-out group-hover:opacity-0 group-hover:translate-y-[-100%]"
                            style={{ color: "var(--cyan)" }}
                        >
                            Making Good Stuff
                        </span>
                        {/* Hidden text revealed on hover */}
                        <span
                            className="heading-display absolute inset-0 flex items-center justify-center text-3xl md:text-5xl transition-all duration-700 ease-out opacity-0 translate-y-[100%] group-hover:opacity-100 group-hover:translate-y-0"
                            style={{ color: "var(--red)" }}
                        >
                            Hiding Bad Stuff
                        </span>
                    </div>
                    <motion.p
                        className="text-xs mt-3 font-mono"
                        style={{ color: "var(--text-muted)" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5, duration: 1 }}
                    >
                        [ hover to reveal ]
                    </motion.p>
                </motion.div>

                {/* Enter CTA */}
                <AnimatePresence>
                    {!entered && (
                        <motion.button
                            onClick={handleEnter}
                            className="interactive relative px-8 py-3 rounded-full font-mono text-sm uppercase tracking-[0.3em] border transition-all duration-500 hover:shadow-[0_0_30px_var(--cyan-dim)]"
                            style={{
                                borderColor: "var(--cyan-dim)",
                                color: "var(--cyan)",
                                background: "transparent",
                            }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.8, delay: 1.8 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Enter
                            <span
                                className="absolute inset-0 rounded-full animate-ping opacity-20"
                                style={{ border: "1px solid var(--cyan)" }}
                            />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
            >
                <motion.div
                    className="w-5 h-8 rounded-full border-2 flex items-start justify-center p-1"
                    style={{ borderColor: "var(--text-muted)" }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <motion.div
                        className="w-1 h-2 rounded-full"
                        style={{ background: "var(--cyan)" }}
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
