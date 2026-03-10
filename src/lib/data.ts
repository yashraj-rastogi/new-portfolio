// ─── All portfolio content in one place ───

export const personalInfo = {
    name: "Yashraj Rastogi",
    tagline: "Full Stack Web Developer & AI Enthusiast",
    heroMask: {
        visible: "Making Good Stuff",
        hidden: "Hiding Bad Stuff",
    },
    bio: "A 2nd year B.Tech undergrad at Shri Ramswaroop Memorial College of Engineering and Management, who loves creating and building stuff and likes to learn new things.",
    photo: "/heroimg.jpg",
};

export interface TimelineEvent {
    year: string;
    title: string;
    description: string;
}

export const originTimeline: TimelineEvent[] = [
    {
        year: "The Beginning",
        title: "Scared of Large Codebases",
        description:
            "Started my coding journey feeling overwhelmed by the sheer size of real-world projects. Every file felt like a maze.",
    },
    {
        year: "The Grind",
        title: "Hackathon After Hackathon",
        description:
            "Became a finalist in multiple college-level hackathons and competitions, sharpening my skills one challenge at a time.",
    },
    {
        year: "The Breakthrough",
        title: "National Finalist — India AI Impact Summit",
        description:
            "Reached the national finals of the India AI Impact Summit Buildathon by HCL & GUVI. The scared kid was now competing with the best.",
    },
    {
        year: "The Leader",
        title: "Technical Coordinator",
        description:
            "Organized DSA competitions, workshops, seminars, webinars, and hackathons as Technical Coordinator of the college club.",
    },
    {
        year: "The Core",
        title: "What Drives Me",
        description:
            "I just love building stuff. That's it. That's the whole story.",
    },
];

export interface Skill {
    name: string;
    level: number; // 0-100
    category: "Languages" | "Frontend" | "Backend" | "Tools";
    note: string;
}

export const skills: Skill[] = [
    {
        name: "JavaScript",
        level: 90,
        category: "Languages",
        note: "My primary weapon. From vanilla to full-stack.",
    },
    {
        name: "Python",
        level: 65,
        category: "Languages",
        note: "AI/ML experiments and backend scripting.",
    },
    {
        name: "Java",
        level: 60,
        category: "Languages",
        note: "DSA battles and OOP fundamentals.",
    },
    {
        name: "React.js",
        level: 88,
        category: "Frontend",
        note: "My go-to for building UI. Component thinking is second nature.",
    },
    {
        name: "Next.js",
        level: 82,
        category: "Frontend",
        note: "Full-stack React. SSR, API routes, the whole package.",
    },
    {
        name: "HTML / CSS",
        level: 85,
        category: "Frontend",
        note: "The foundation. Responsive, accessible, pixel-perfect.",
    },
    {
        name: "Node.js",
        level: 80,
        category: "Backend",
        note: "Express APIs, real-time apps, microservices.",
    },
    {
        name: "Express.js",
        level: 78,
        category: "Backend",
        note: "RESTful APIs, middleware chains, auth flows.",
    },
    {
        name: "Django",
        level: 60,
        category: "Backend",
        note: "Python's batteries-included framework.",
    },
    {
        name: "Git / GitHub",
        level: 80,
        category: "Tools",
        note: "Version control is non-negotiable.",
    },
    {
        name: "Firebase",
        level: 70,
        category: "Tools",
        note: "Auth, Firestore, hosting — rapid prototyping.",
    },
    {
        name: "Tailwind CSS",
        level: 75,
        category: "Tools",
        note: "Utility-first styling for speed.",
    },
];

export interface Project {
    codename: string;
    title: string;
    objective: string;
    tech: string[];
    impact: string;
    category: "Frontend" | "Backend" | "Full-Stack" | "AI" | "Other";
    github?: string;
    live?: string;
    featured?: boolean;
}

export const projects: Project[] = [
    {
        codename: "PHANTOM",
        title: "Project Phantom",
        objective: "A full-stack web application with real-time features and AI integration.",
        tech: ["Next.js", "Node.js", "Firebase", "OpenAI API"],
        impact:
            "Served 500+ users in its first month. Reduced manual workflow by 60%.",
        category: "Full-Stack",
        github: "#",
        live: "#",
        featured: true,
    },
    {
        codename: "SPECTRE",
        title: "Project Spectre",
        objective: "An AI-powered tool that automates content analysis and generation.",
        tech: ["Python", "Django", "TensorFlow", "React"],
        impact:
            "National finalist submission at India AI Impact Summit Buildathon.",
        category: "AI",
        github: "#",
        live: "#",
    },
    {
        codename: "AEGIS",
        title: "Project Aegis",
        objective: "A responsive dashboard for monitoring and managing system metrics.",
        tech: ["React", "Express", "MongoDB", "Chart.js"],
        impact:
            "Used by the college tech club for event analytics tracking.",
        category: "Frontend",
        github: "#",
    },
    {
        codename: "NEXUS",
        title: "Project Nexus",
        objective: "A collaborative platform connecting students with hackathon teams.",
        tech: ["Next.js", "Firebase", "Tailwind CSS"],
        impact:
            "Helped 200+ students find hackathon teammates across colleges.",
        category: "Full-Stack",
        github: "#",
        live: "#",
    },
];

export interface Achievement {
    title: string;
    description: string;
    type: "hackathon" | "certification" | "award" | "contribution";
    year: string;
}

export const achievements: Achievement[] = [
    {
        title: "India AI Impact Summit — National Finalist",
        description: "Reached the national finals of the Buildathon by HCL & GUVI.",
        type: "hackathon",
        year: "2025",
    },
    {
        title: "College Hackathon Finalist",
        description: "Multi-time finalist across various college-level hackathons.",
        type: "hackathon",
        year: "2024-25",
    },
    {
        title: "Technical Coordinator",
        description:
            "Organized 10+ technical events including DSA competitions and workshops.",
        type: "award",
        year: "2024-25",
    },
    {
        title: "Open Source Contributor",
        description: "Contributed to multiple open-source projects on GitHub.",
        type: "contribution",
        year: "2024",
    },
    {
        title: "Cloud Certification",
        description: "Completed cloud computing fundamentals certification.",
        type: "certification",
        year: "2024",
    },
];

export const beyondTheScreen = {
    sports: [
        { name: "Badminton", emoji: "🏸" },
        { name: "Cricket — Right-arm Fast Bowler", emoji: "🏏" },
        { name: "Volleyball", emoji: "🏐" },
    ],
    movies: {
        favoriteQuote: "I see dead people.",
        allTimeFavorite: "The Sixth Sense",
        list: [
            "The Sixth Sense",
            "Inception",
            "Interstellar",
            "The Dark Knight",
            "Fight Club",
            "The Prestige",
            "Shutter Island",
            "Se7en",
        ],
    },
    music: {
        vibe: "Old Hindi retro hits",
        warning:
            "Coding without old hindi retro hits may result in leaving some unfixed bugs.",
    },
    quote: "Decisions Decides Destiny",
};

export const contactLinks = [
    { label: "GitHub", url: "https://github.com/yashraj-rastogi", icon: "github" },
    { label: "LinkedIn", url: "https://linkedin.com/in/yashraj-rastogi", icon: "linkedin" },
    { label: "Email", url: "mailto:yashraj@example.com", icon: "email" },
    { label: "Instagram", url: "https://instagram.com/yashraj.rastogi", icon: "instagram" },
];
