import { useEffect, useState } from "react";
import { profile } from "../data/content";

export default function Navbar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let current = "home";
      for (const { id } of profile.nav) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12">
      {/* Logo */}
      <a href="#home" className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-sm border-2 border-ember font-display text-3xl leading-none text-ember">
          A
        </span>
        <span className="hidden font-ui text-[15px] leading-tight tracking-[0.2em] text-white/80 sm:block">
          {profile.brand.split(" ")[0]}
          <br />
          <span className="text-ember">{profile.brand.split(" ")[1]}</span>
        </span>
      </a>

      {/* Links */}
      <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 font-nav text-[13px] tracking-[0.15em] lg:flex">
        {profile.nav.map(({ label, id }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`pb-1 transition-colors hover:text-ember ${active === id
              ? "border-b-2 border-ember text-ember"
              : "border-b-2 border-transparent text-white"
              }`}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* CTA */}
      <a
        href="#contact"
        className="flex items-center gap-3 rounded-full border border-ember/70 bg-black/60 py-2 pl-6 pr-3 font-ui text-[12px] tracking-[0.15em] shadow-[0_0_18px_rgba(255,77,13,0.55)] transition hover:shadow-[0_0_30px_rgba(255,77,13,0.9)]"
      >
        LET'S TALK
        <span className="h-2.5 w-2.5 rounded-full bg-ember shadow-[0_0_10px_#ff4d0d]" />
      </a>
    </header>
  );
}