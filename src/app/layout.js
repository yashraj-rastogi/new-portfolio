import "./globals.css";

export const metadata = {
  title: "Yashraj Rastogi — Full Stack Developer & AI Enthusiast",
  description:
    "Portfolio of Yashraj Rastogi — a full stack developer and AI enthusiast building things that matter. Explore projects, skills, and the story behind the code.",
  keywords: [
    "Yashraj Rastogi",
    "portfolio",
    "full stack developer",
    "AI enthusiast",
    "web developer",
    "React",
    "Next.js",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* SVG Filter for hand-drawn roughen effect */}
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <filter id="roughen">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.02"
                numOctaves="3"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="1.5"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
