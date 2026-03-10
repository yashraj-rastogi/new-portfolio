"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { contactLinks } from "@/lib/data";

const iconSvgs: Record<string, JSX.Element> = {
    github: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
    ),
    linkedin: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    ),
    email: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
    ),
    instagram: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
    ),
};

export default function Contact() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Signal wave animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animFrameId: number;
        let time = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = 200;
        };
        resize();
        window.addEventListener("resize", resize);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 0.015;

            for (let wave = 0; wave < 3; wave++) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 245, 255, ${0.08 - wave * 0.02})`;
                ctx.lineWidth = 1;

                for (let x = 0; x < canvas.width; x++) {
                    const y =
                        canvas.height / 2 +
                        Math.sin(x * 0.008 + time + wave * 0.8) * (20 + wave * 8) +
                        Math.sin(x * 0.015 + time * 1.5) * 10;
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }

            animFrameId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animFrameId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <section
            id="contact"
            className="chapter relative"
            style={{ minHeight: "80vh" }}
        >
            {/* Signal wave background */}
            <canvas
                ref={canvasRef}
                className="absolute bottom-0 left-0 right-0 z-0 opacity-50"
            />

            {/* Spotlight effect */}
            <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 40% 60% at 50% 40%, rgba(0,245,255,0.03) 0%, transparent 70%)",
                }}
            />

            <div className="relative z-10 max-w-2xl w-full mx-auto px-4 text-center">
                {/* Chapter Label */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <p className="chapter-label">OUTRO</p>
                    <h2 className="chapter-title">The Signal</h2>
                    <p className="mt-4 text-lg" style={{ color: "var(--text-secondary)" }}>
                        Got a mission? Let&apos;s talk.
                    </p>
                </motion.div>

                {/* Contact Form */}
                <motion.form
                    className="space-y-4 mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="interactive w-full px-4 py-3 rounded-lg font-mono text-sm outline-none transition-all duration-300 focus:shadow-[0_0_20px_var(--cyan-dim)]"
                            style={{
                                background: "var(--bg-elevated)",
                                border: "1px solid rgba(0,245,255,0.1)",
                                color: "var(--text-primary)",
                            }}
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="interactive w-full px-4 py-3 rounded-lg font-mono text-sm outline-none transition-all duration-300 focus:shadow-[0_0_20px_var(--cyan-dim)]"
                            style={{
                                background: "var(--bg-elevated)",
                                border: "1px solid rgba(0,245,255,0.1)",
                                color: "var(--text-primary)",
                            }}
                        />
                    </div>
                    <textarea
                        placeholder="Your Message"
                        rows={4}
                        className="interactive w-full px-4 py-3 rounded-lg font-mono text-sm outline-none resize-none transition-all duration-300 focus:shadow-[0_0_20px_var(--cyan-dim)]"
                        style={{
                            background: "var(--bg-elevated)",
                            border: "1px solid rgba(0,245,255,0.1)",
                            color: "var(--text-primary)",
                        }}
                    />
                    <motion.button
                        type="submit"
                        className="interactive px-8 py-3 rounded-lg font-mono text-sm uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_30px_var(--cyan-dim)]"
                        style={{
                            background: "var(--cyan)",
                            color: "var(--bg-base)",
                            border: "none",
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Send Signal →
                    </motion.button>
                </motion.form>

                {/* Social Links */}
                <motion.div
                    className="flex justify-center gap-5 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    {contactLinks.map((link, i) => (
                        <motion.a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="interactive w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_var(--cyan-dim)]"
                            style={{
                                background: "var(--bg-elevated)",
                                color: "var(--text-secondary)",
                                border: "1px solid rgba(0,245,255,0.1)",
                            }}
                            whileHover={{
                                scale: 1.15,
                                color: "var(--cyan)",
                                borderColor: "var(--cyan)",
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                            viewport={{ once: true }}
                            aria-label={link.label}
                        >
                            {iconSvgs[link.icon]}
                        </motion.a>
                    ))}
                </motion.div>

                {/* Footer */}
                <motion.p
                    className="text-xs font-mono"
                    style={{ color: "var(--text-muted)" }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    viewport={{ once: true }}
                >
                    Designed & Built by Yashraj Rastogi · {new Date().getFullYear()}
                </motion.p>
            </div>
        </section>
    );
}
