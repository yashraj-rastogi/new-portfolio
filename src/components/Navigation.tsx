"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const chapters = [
    { id: "hero", label: "I" },
    { id: "about", label: "II" },
    { id: "skills", label: "III" },
    { id: "projects", label: "IV" },
    { id: "achievements", label: "V" },
    { id: "beyond", label: "VI" },
    { id: "contact", label: "VII" },
];

export default function Navigation() {
    const [active, setActive] = useState("hero");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            setProgress(docHeight > 0 ? scrollTop / docHeight : 0);

            // Determine active chapter
            for (let i = chapters.length - 1; i >= 0; i--) {
                const section = document.getElementById(chapters[i].id);
                if (section && scrollTop >= section.offsetTop - 200) {
                    setActive(chapters[i].id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            {/* Scroll Progress Bar */}
            <motion.div
                className="scroll-progress"
                style={{ scaleX: progress }}
            />

            {/* Chapter Dots */}
            <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-[9990] hidden md:flex flex-col gap-4 items-center">
                {chapters.map((ch) => (
                    <button
                        key={ch.id}
                        onClick={() => scrollTo(ch.id)}
                        className="interactive group relative flex items-center gap-3"
                        aria-label={`Go to Act ${ch.label}`}
                    >
                        {/* Label */}
                        <span className="absolute right-8 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono whitespace-nowrap"
                            style={{ color: active === ch.id ? "var(--cyan)" : "var(--text-muted)" }}
                        >
                            ACT {ch.label}
                        </span>
                        {/* Dot */}
                        <span
                            className="block rounded-full transition-all duration-300"
                            style={{
                                width: active === ch.id ? 10 : 6,
                                height: active === ch.id ? 10 : 6,
                                background:
                                    active === ch.id ? "var(--cyan)" : "var(--text-muted)",
                                boxShadow:
                                    active === ch.id ? "0 0 10px var(--cyan-dim)" : "none",
                            }}
                        />
                    </button>
                ))}
            </nav>
        </>
    );
}
