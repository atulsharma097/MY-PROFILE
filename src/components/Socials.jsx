import { FaLinkedinIn, FaInstagram } from "react-icons/fa";

const linkClass =
  "text-white transition hover:text-ember hover:drop-shadow-[0_0_8px_#ff4d0d]";

export default function Socials() {
  return (
    <div className="flex items-center gap-6">
      {/* LinkedIn */}
      <a href="https://www.linkedin.com/in/atul-sharma-a50aa1184/" aria-label="LinkedIn" className={`${linkClass} text-4xl`}>
        <FaLinkedinIn />
      </a>

      {/* Instagram */}
      <a href="#" aria-label="Instagram" className={`${linkClass} text-4xl`}>
        <FaInstagram />
      </a>

      {/* Photoshop (Ps badge) */}
      <a
        href="#"
        aria-label="Photoshop"
        className={`${linkClass} flex h-6 w-6 items-center justify-center rounded-[3px] border-2 border-current font-ui text-[20px] font-bold leading-none`}
      >
        Ps
      </a>

      {/* Adobe logo */}
      <a href="#" aria-label="Adobe" className={linkClass}>
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425zM8.884 1.376H0v21.248zm15.116 0h-8.884L24 22.624Z" />
        </svg>
      </a>

      {/* Notion-style box */}
      <a
        href="#"
        aria-label="Notion"
        className={`${linkClass} flex h-6 w-6 items-center justify-center rounded-[4px] border-2 border-current font-ui text-[20px] font-bold leading-none`}
      >
        N
      </a>
    </div>
  );
}