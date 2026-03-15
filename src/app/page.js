"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

/* ═══ Data ═══ */
const SKILLS = [
  {
    label: "Languages",
    rotate: "-0.4deg",
    items: [
      { name: "JavaScript", level: "Advanced", pct: 88 },
      { name: "Python", level: "Intermediate", pct: 65 },
      { name: "Java", level: "Intermediate", pct: 60 },
    ],
  },
  {
    label: "Frontend",
    rotate: "0.6deg",
    items: [
      { name: "React.js", level: "Advanced", pct: 85 },
      { name: "Next.js", level: "Advanced", pct: 82 },
      { name: "HTML / CSS", level: "Advanced", pct: 90 },
    ],
  },
  {
    label: "Backend",
    rotate: "0.3deg",
    items: [
      { name: "Node.js + Express", level: "Advanced", pct: 83 },
      { name: "Django", level: "Intermediate", pct: 68 },
      { name: "REST APIs", level: "Advanced", pct: 85 },
    ],
  },
  {
    label: "AI & Tools",
    rotate: "-0.5deg",
    items: [
      { name: "AI Integration", level: "Enthusiast", pct: 72 },
      { name: "Git / GitHub", level: "Advanced", pct: 86 },
      { name: "Problem Solving", level: "Persistent", pct: 95 },
    ],
  },
];

const PROJECTS = [
  {
    num: "01",
    name: "Project Alpha",
    desc: "A full-stack platform that solved a real problem. Kept me up at 3 AM and still does.",
    tags: ["React", "Node.js", "MongoDB"],
    featured: true,
  },
  {
    num: "02",
    name: "Project Beta",
    desc: "A modern web application built with the latest frameworks and best practices.",
    tags: ["Next.js", "Django"],
  },
  {
    num: "03",
    name: "Project Gamma",
    desc: "An AI-powered tool that automates the mundane and amplifies the creative.",
    tags: ["Python", "AI"],
  },
  {
    num: "04",
    name: "Project Delta",
    desc: "A robust backend system designed for scalability and performance.",
    tags: ["Java", "Spring Boot"],
  },
];

const ACHIEVEMENTS = [
  {
    icon: "🏆",
    title: "National Finalist — India AI Impact Summit",
    desc: "HCL GUVI Buildathon. Competed at national level with ideas that actually mattered.",
    rotate: "0.5deg",
    unlocked: true,
  },
  {
    icon: "⚡",
    title: "Hackathon Finalist — Multiple Editions",
    desc: "Reached finals of multiple college-level hackathons and competitions.",
    rotate: "-0.7deg",
    unlocked: true,
  },
  {
    icon: "🎯",
    title: "Technical Coordinator — Events & Community",
    desc: "Organized DSA competitions, workshops, webinars, and hackathons for the tech community.",
    rotate: "0.3deg",
    unlocked: true,
  },
  {
    icon: "🔒",
    title: "Certification — Coming Soon",
    desc: "Something exciting is in the works. Stay tuned for the next unlock.",
    rotate: "-0.4deg",
    unlocked: false,
  },
];

const MOVIES = [
  { name: "The Sixth Sense ★", featured: true },
  { name: "Interstellar" },
  { name: "Inception" },
  { name: "The Dark Knight" },
  { name: "Dune" },
  { name: "Oppenheimer" },
];

const TIMELINE = [
  {
    num: "1",
    chapter: "// chapter one",
    text: "Opened a large codebase. Understood nothing. Opened it again anyway.",
    type: "normal",
  },
  {
    num: "2",
    chapter: "// chapter two",
    text: "Became Technical Coordinator. Organized events, workshops, hackathons.",
    type: "normal",
  },
  {
    num: "3",
    chapter: "// chapter three",
    text: "Reached finals of multiple college-level hackathons and competitions.",
    type: "normal",
  },
  {
    num: "★",
    chapter: "// chapter four — national stage",
    text: "National Finalist — India AI Impact Summit Buildathon by HCL GUVI.",
    type: "star",
  },
  {
    num: "…",
    chapter: "// to be continued",
    text: "And the story isn't over.",
    type: "end",
  },
];

/* ═══ SVG Icons ═══ */
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

/* ═══ Component ═══ */
export default function Home() {
  const [loading, setLoading] = useState(true);
  const mainRef = useRef(null);

  useEffect(() => {
    // Loading screen timer
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;

    let ctx;
    const initAnimations = async () => {
      const gsapModule = await import("gsap");
      const scrollModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default || gsapModule.gsap || gsapModule;
      const ScrollTrigger =
        scrollModule.ScrollTrigger || scrollModule.default;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        /* Hero entrance */
        gsap.from(".hero-anim", {
          y: 50,
          opacity: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.2,
        });

        /* Floating doodles */
        gsap.to(".doodle", {
          y: "random(-10, 10)",
          x: "random(-5, 5)",
          rotation: "random(-5, 5)",
          duration: "random(3, 6)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: { each: 0.5, from: "random" },
        });

        /* Generic reveal */
        gsap.utils.toArray(".reveal").forEach((el) => {
          gsap.to(el, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });

        gsap.utils.toArray(".reveal-left").forEach((el) => {
          gsap.to(el, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });

        gsap.utils.toArray(".reveal-right").forEach((el) => {
          gsap.to(el, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });

        /* Timeline stagger */
        const tlItems = gsap.utils.toArray(".timeline-item");
        if (tlItems.length) {
          gsap.to(tlItems, {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".timeline",
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        }

        /* Skill bars */
        gsap.utils.toArray(".skill-bar-fill").forEach((bar) => {
          const target = bar.getAttribute("data-pct");
          gsap.to(bar, {
            width: target + "%",
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          });
        });

        /* Achievement cards pop */
        const achCards = gsap.utils.toArray(".reveal-scale");
        if (achCards.length) {
          gsap.to(achCards, {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.12,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: achCards[0],
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }

        /* Movie pills stagger */
        const pills = gsap.utils.toArray(".movie-pill-anim");
        if (pills.length) {
          gsap.from(pills, {
            y: 15,
            opacity: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: pills[0],
              start: "top 90%",
              toggleActions: "play none none none",
            },
          });
        }
      }, mainRef);
    };

    initAnimations();
    return () => ctx && ctx.revert();
  }, [loading]);

  /* ─── Scribbled underline SVG path ─── */
  const UnderlineSVG = () => (
    <svg
      className={styles.heroUnderline}
      viewBox="0 0 500 14"
      preserveAspectRatio="none"
    >
      <path
        d="M0,7 Q50,2 100,8 Q150,14 200,6 Q250,0 300,8 Q350,14 400,5 Q450,0 500,7"
        stroke="var(--ink)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );

  if (loading) {
    return (
      <div className="loader">
        <div className="loader-pencil">
          <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 42l3.3-7.6L30.6 13.1l4.3 4.3L13.6 38.7 6 42zm33.5-25.7l-4.3-4.3 3.2-3.2c.6-.6 1.5-.6 2.1 0l2.2 2.2c.6.6.6 1.5 0 2.1l-3.2 3.2z" />
          </svg>
        </div>
        <div className="loader-line"></div>
        <p className="loader-text">sketching the page...</p>
      </div>
    );
  }

  return (
    <main ref={mainRef} className="notebook-bg">
      {/* ═══════════════════════════════════
           SECTION 1 — HERO
      ═══════════════════════════════════ */}
      <section id="hero" className={`section ${styles.hero}`}>
        <span className="section-label hero-anim">
          // pg.01 — the opening sketch
        </span>
        <p className={`${styles.heroSubtitle} hero-anim`}>
          Full Stack Developer &amp; AI Enthusiast
        </p>
        <h1 className={`${styles.heroName} hero-anim`}>
          <span className={styles.heroNameLine}>
            Yashraj Rastogi
            <UnderlineSVG />
          </span>
          <span className={styles.heroNameLine}>
            
            <UnderlineSVG />
          </span>
        </h1>

        <div className={`quote-block ${styles.heroQuote} hero-anim`}>
          <p className={styles.heroQuoteBig}>Making Good Stuff</p>
          <span className={styles.heroQuoteStruck}>Hiding Bad Stuff</span>
        </div>

        <p className={`${styles.heroBio} hero-anim`}>
          A 2nd year B.Tech undergrad at SRMCEM who loves creating and building
          stuff and likes to learn new things.
        </p>

        <a href="#about" className="cta-button hero-anim">
          Turn the Page →
        </a>

        {/* Floating doodles */}
        <div className={styles.heroDoodles}>
          <span
            className="doodle"
            style={{
              top: "15%",
              right: "10%",
              fontSize: "3rem",
              transform: "rotate(15deg)",
            }}
          >
            {"{ }"}
          </span>
          <span
            className="doodle"
            style={{
              top: "35%",
              right: "30%",
              fontSize: "2.5rem",
              transform: "rotate(-8deg)",
            }}
          >
            ✦
          </span>
          <span
            className="doodle"
            style={{
              top: "55%",
              right: "5%",
              fontSize: "1.5rem",
              fontFamily: "var(--font-handwriting)",
            }}
          >
            ~~~~~
          </span>
          <span
            className="doodle"
            style={{
              top: "70%",
              right: "25%",
              fontSize: "2rem",
              transform: "rotate(5deg)",
            }}
          >
            {"</>"}
          </span>
          <span
            className="doodle"
            style={{
              top: "45%",
              right: "50%",
              fontSize: "1.8rem",
              transform: "rotate(-12deg)",
            }}
          >
            ★
          </span>
          <span
            className="doodle"
            style={{
              top: "80%",
              right: "45%",
              fontSize: "1.2rem",
              fontFamily: "var(--font-typewriter)",
            }}
          >
            console.log()
          </span>
        </div>

        <div className={`${styles.heroScroll} scroll-hint`}>
          <span>scroll down</span>
          <span>↓</span>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════════════════════════════════
           SECTION 2 — ABOUT
      ═══════════════════════════════════ */}
      <section id="about" className="section">
        <span className="section-label reveal">
          // pg.02 — origin story
        </span>
        <h2 className="section-heading reveal">
          From Scared to
          <br />
          National Stage
        </h2>

        <div className={styles.aboutGrid}>
          <div className="reveal-left">
            <p className={styles.aboutBio}>
              A 2nd year B.Tech undergrad at SRMCEM. Chased code obsessively.
              Built things that didn&apos;t exist. Opened codebases at 2 AM. Broke
              things, fixed them, broke them again — and loved every second of
              it.
            </p>
            <p className={styles.aboutBio}>
              I believe in building things that solve real problems, even if it
              means rewriting the same function seventeen times until it feels
              right.
            </p>
            <div className={styles.aboutCallout}>
              <p className={styles.aboutCalloutText}>
                → I just love building stuff.
              </p>
              <p className={styles.aboutCalloutSub}>
                That&apos;s it. That&apos;s the whole motivation.
              </p>
            </div>
          </div>

          <div className="timeline reveal-right">
            {TIMELINE.map((item, i) => (
              <div key={i} className="timeline-item">
                <div
                  className={`timeline-dot ${
                    item.type === "star"
                      ? "timeline-dot-star"
                      : item.type === "end"
                      ? "timeline-dot-end"
                      : ""
                  }`}
                >
                  {item.num}
                </div>
                <p className="timeline-chapter">{item.chapter}</p>
                <p
                  className={`timeline-text ${
                    item.type === "star" ? "timeline-text-bold" : ""
                  }`}
                  style={
                    item.type === "end"
                      ? { fontStyle: "italic", color: "var(--pencil)" }
                      : {}
                  }
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════════════════════════════════
           SECTION 3 — SKILLS
      ═══════════════════════════════════ */}
      <section id="skills" className="section">
        <span className="section-label reveal">
          // pg.03 — the arsenal
        </span>
        <h2 className="section-heading reveal">Weapons of Choice</h2>

        <div className={styles.skillsGrid}>
          {SKILLS.map((cat, ci) => (
            <div
              key={ci}
              className={`sketch-card sketch-card-shadow folded-corner ${styles.skillCard} reveal`}
              style={{ "--rotate": cat.rotate }}
            >
              <p className={styles.skillCardLabel}>// {cat.label}</p>
              {cat.items.map((skill, si) => (
                <div key={si} className={styles.skillRow}>
                  <div className={styles.skillRowHeader}>
                    <span className={styles.skillName}>{skill.name}</span>
                    <span className={styles.skillLevel}>{skill.level}</span>
                  </div>
                  <div className="skill-bar-track">
                    <div
                      className="skill-bar-fill"
                      data-pct={skill.pct}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════════════════════════════════
           SECTION 4 — PROJECTS
      ═══════════════════════════════════ */}
      <section id="projects" className="section">
        <span className="section-label reveal">
          // pg.04 — the missions
        </span>
        <h2 className="section-heading reveal">Things I Built</h2>

        {/* Featured project */}
        <div
          className={`sketch-card sketch-card-shadow ${styles.projectFeatured} reveal`}
        >
          <div>
            <p className={styles.projectFeaturedBadge}>★ featured mission</p>
            <h3 className={styles.projectFeaturedName}>
              {PROJECTS[0].name}
            </h3>
            <p className={styles.projectFeaturedDesc}>{PROJECTS[0].desc}</p>
            <div className={styles.projectCardTags}>
              {PROJECTS[0].tags.map((tag, i) => (
                <span key={i} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <a href="#" className={styles.projectCardLink}>
              View Mission →
            </a>
          </div>
          <div className={styles.projectFeaturedImg}>
            [ screenshot goes here ]
          </div>
        </div>

        {/* Other projects */}
        <div className={styles.projectsGrid}>
          {PROJECTS.slice(1).map((proj, i) => (
            <div
              key={i}
              className={`sketch-card sketch-card-shadow pushpin ${styles.projectCard} reveal`}
              style={{
                "--rotate":
                  i === 0 ? "-0.5deg" : i === 1 ? "0.6deg" : "-0.3deg",
              }}
            >
              <p className={styles.projectCardNum}>
                // MISSION_{proj.num}
              </p>
              <h3 className={styles.projectCardName}>{proj.name}</h3>
              <p className={styles.projectCardDesc}>{proj.desc}</p>
              <hr className={styles.projectCardDivider} />
              <div className={styles.projectCardTags}>
                {proj.tags.map((tag, ti) => (
                  <span key={ti} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <a href="#" className={styles.projectCardLink}>
                View Mission →
              </a>
            </div>
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════════════════════════════════
           SECTION 5 — ACHIEVEMENTS
      ═══════════════════════════════════ */}
      <section id="achievements" className="section">
        <span className="section-label reveal">
          // pg.05 — hall of legends
        </span>
        <h2 className="section-heading reveal">Unlocked Achievements</h2>

        <div className={styles.achievementsGrid}>
          {ACHIEVEMENTS.map((ach, i) => (
            <div
              key={i}
              className={`sketch-card sketch-card-shadow tape-strip ${
                styles.achievementCard
              } ${!ach.unlocked ? styles.achievementLocked : ""} reveal-scale`}
              style={{ "--rotate": ach.rotate }}
            >
              <div className={styles.achievementIcon}>{ach.icon}</div>
              <h3 className={styles.achievementTitle}>{ach.title}</h3>
              <p className={styles.achievementDesc}>{ach.desc}</p>
              <span
                className={`stamp ${
                  !ach.unlocked ? "stamp-pending" : ""
                }`}
              >
                {ach.unlocked ? "✓ UNLOCKED" : "~ PENDING"}
              </span>
            </div>
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════════════════════════════════
           SECTION 6 — BEYOND THE SCREEN
      ═══════════════════════════════════ */}
      <section id="beyond" className="section">
        <span className="section-label reveal">
          // pg.06 — beyond the screen
        </span>
        <h2 className="section-heading reveal">The Human Bits</h2>

        <div className={`${styles.beyondGrid} reveal`}>
          {/* Sports card */}
          <div
            className={`sketch-card sketch-card-shadow ${styles.beyondCard}`}
            style={{ "--rotate": "-0.6deg" }}
          >
            <p className={styles.beyondCardLabel}>
              <span className={styles.beyondCardEmoji}>🏸</span> ON THE
              GROUND
            </p>
            <p className={styles.beyondCardTitle}>Badminton player.</p>
            <p className={styles.beyondCardText}>Right-arm fast bowler.</p>
            <p className={styles.beyondCardText}>Volleyball man.</p>
            <p className={styles.beyondCardItalic}>
              The ground clears the bugs.
            </p>
          </div>

          {/* Cinema card */}
          <div
            className={`sketch-card sketch-card-shadow ${styles.beyondCard} ${styles.beyondCinemaWide}`}
            style={{ "--rotate": "0.3deg" }}
          >
            <p className={styles.beyondCardLabel}>
              <span className={styles.beyondCardEmoji}>🎬</span> CINEMA —
              FIRST LOVE
            </p>
            <p className={styles.beyondCardText}>
              All-time favourite:{" "}
              <strong>The Sixth Sense ★</strong>
            </p>
            <div className={styles.moviesScroll}>
              {MOVIES.map((movie, i) => (
                <span
                  key={i}
                  className={`movie-pill movie-pill-anim ${
                    movie.featured ? "movie-pill-featured" : ""
                  }`}
                >
                  {movie.name}
                </span>
              ))}
            </div>
            <p className={styles.beyondCardItalic}>
              Movies before code. Always.
            </p>
          </div>

          {/* Music card */}
          <div
            className={`sketch-card sketch-card-shadow ${styles.beyondCard} ${styles.beyondMusic}`}
            style={{ "--rotate": "-0.3deg" }}
          >
            <p className={styles.beyondCardLabel}>
              <span className={styles.beyondCardEmoji}>🎵</span> CODING
              SOUNDTRACK
            </p>
            <p className={styles.beyondCardText}>Old Hindi retro hits.</p>
            <p className={styles.beyondCardText}>Coding without them?</p>
            <p className={styles.beyondCardTitle}>
              Unfixed bugs guaranteed.
            </p>
          </div>

          {/* Quote card */}
          <div
            className={`sketch-card sketch-card-shadow ${styles.beyondCard} ${styles.beyondQuoteWide} ${styles.beyondQuoteCard}`}
            style={{ "--rotate": "0.3deg" }}
          >
            <span className={styles.beyondQuoteMark}>&ldquo;</span>
            <p className={styles.beyondQuoteText}>
              Decisions Decide Destiny
            </p>
            <p className={styles.beyondQuoteAttr}>— Yashraj Rastogi</p>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════════════════════════════════
           SECTION 7 — CONTACT
      ═══════════════════════════════════ */}
      <section id="contact" className={`section ${styles.contact}`}>
        <span className="section-label reveal">
          // outro — the signal
        </span>
        <h2 className={`${styles.contactHeading} reveal`}>
          Got a Mission? Let&apos;s Talk.
        </h2>
        <p className={`${styles.contactTagline} reveal`}>
          Open to collaborations, internships, cool projects, and interesting
          conversations.
        </p>
        <div className={`${styles.contactButtons} reveal`}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn"
          >
            <GitHubIcon /> GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn"
          >
            <LinkedInIcon /> LinkedIn
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn"
          >
            <InstagramIcon /> Instagram
          </a>
          <a href="mailto:hello@example.com" className="contact-btn">
            <EmailIcon /> Email
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════
           FOOTER
      ═══════════════════════════════════ */}
      <footer className="footer">
        <span className="footer-left">© 2025 Yashraj Rastogi</span>
        <span className="footer-center">Decisions Decide Destiny</span>
        <span className="footer-right">Built with obsession ✏️</span>
      </footer>
    </main>
  );
}
