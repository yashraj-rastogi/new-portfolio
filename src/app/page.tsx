import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Skills from "@/components/Skills/Skills";
import Projects from "@/components/Projects/Projects";
import Achievements from "@/components/Achievements/Achievements";
import Beyond from "@/components/Beyond/Beyond";
import Contact from "@/components/Contact/Contact";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Achievements />
      <Beyond />
      <Contact />
    </main>
  );
}
