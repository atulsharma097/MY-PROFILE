import { FaPlay } from "react-icons/fa";
import HeroVisual from "./HeroVisual";
import Stats from "./Stats";
import Socials from "./Socials";
import { profile } from "../data/content";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-ink">
      <HeroVisual />

      <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 pb-10 pt-28 md:px-12 lg:pl-[7.5%]">
        {/* Greeting */}
        <p className="mb-3 flex items-center gap-3 font-ui text-[23px] tracking-[0.22em]">
          <span className="h-2 w-2 rounded-full bg-ember shadow-[0_0_8px_#ff4d0d]" />
          HEY, I'M  <span className="text-ember">{profile.name}</span>
        </p>

        {/* Heading */}
        <h1 className="font-display text-[clamp(3.2rem,6.9vw,8rem)] leading-[0.95] tracking-wide">
          I CODE
          <br />
          CREATIVE IDEAS
          <br />
          INTO <span className="text-ember">REALITY</span>
        </h1>

        {/* Intro */}
        <p className="mt-6 max-w-[26rem] text-[clamp(0.95rem,1.05vw,1.15rem)] leading-snug text-white/90">
          {profile.intro}
        </p>

        {/* Buttons */}
        <div className="mt-7 flex flex-wrap items-center gap-7">
          <a
            href="#work"
            className="flex items-center gap-5 rounded-full bg-gradient-to-r from-ember to-ember-soft py-2 pl-7 pr-2 font-ui text-[13px] font-semibold tracking-[0.12em] shadow-[0_0_25px_rgba(255,77,13,0.55)] transition hover:scale-105"
          >
            EXPLORE PROJECTS
            <span className="h-7 w-7 rounded-full bg-ink ring-2 ring-ink/40" />
          </a>

          <button className="group flex items-center gap-3 font-ui text-[13px] font-medium tracking-[0.12em]">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-ember text-ember transition group-hover:bg-ember group-hover:text-white">
              <FaPlay className="ml-0.5 text-[10px]" />
            </span>
            VIEW MY TECH STACK
          </button>
        </div>

        {/* Stats */}
        <div className="mt-6">
          <Stats />
        </div>

        {/* Trusted + socials */}
        <p className="mt-5 font-ui text-[10px] font-medium tracking-[0.12em]">
          BUILDING • LEARNING • CREATING
        </p>
        <div className="mt-3">
          <Socials />
        </div>
      </div>
    </section>
  );
}