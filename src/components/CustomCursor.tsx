"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.left = `${mouseX}px`;
            dot.style.top = `${mouseY}px`;
        };

        const animate = () => {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            ring.style.left = `${ringX}px`;
            ring.style.top = `${ringY}px`;
            requestAnimationFrame(animate);
        };

        const onMouseEnterInteractive = () => {
            document.body.classList.add("cursor-hover");
        };
        const onMouseLeaveInteractive = () => {
            document.body.classList.remove("cursor-hover");
        };

        window.addEventListener("mousemove", onMouseMove);
        animate();

        // Watch for interactive elements
        const attachHoverListeners = () => {
            const interactives = document.querySelectorAll(
                'a, button, [role="button"], input, textarea, .interactive'
            );
            interactives.forEach((el) => {
                el.addEventListener("mouseenter", onMouseEnterInteractive);
                el.addEventListener("mouseleave", onMouseLeaveInteractive);
            });
        };

        attachHoverListeners();
        const observer = new MutationObserver(attachHoverListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={ringRef} className="cursor-ring" />
        </>
    );
}
