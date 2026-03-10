import type { Metadata } from "next";
import { DM_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Yashraj Rastogi — The Architect of Code",
  description:
    "Full Stack Web Developer & AI Enthusiast. A cinematic portfolio experience.",
  keywords: [
    "Yashraj Rastogi",
    "portfolio",
    "full stack developer",
    "AI enthusiast",
    "web developer",
  ],
  openGraph: {
    title: "Yashraj Rastogi — The Architect of Code",
    description: "Full Stack Web Developer & AI Enthusiast.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${dmMono.variable} film-grain antialiased`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
