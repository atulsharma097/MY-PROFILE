import { Brain, Code2, Braces, ArrowUpRight } from "lucide-react";
import Embers from "./Embers";

const floatCards = [
  { icon: Brain, title: "AI", sub: "Enthusiast", cls: "hv-pos-1", delay: "0s" },
  { icon: Code2, title: "Full Stack", sub: "Developer", cls: "hv-pos-2", delay: "1.2s" },
  { icon: Braces, title: "Problem", sub: "Solver", cls: "hv-pos-3", delay: "2.4s" },
];

export default function HeroVisual() {
  return (
    <div className="hero-visual pointer-events-none absolute inset-0 isolate overflow-hidden">
      {/* ALL CSS IN THE SAME JSX FILE */}
      <style>{`
        /* The root is a size container, so cqh / cqw below mean
           "% of the hero's height / width". */
        .hero-visual {
          container-type: size;

          /* H = height of the artwork (the PNG is anchored bottom-right). */
          --H: 100cqh;

          /* ============================================================
             DESKTOP / LAPTOP (> 1024px)
             RING GEOMETRY inside the PNG, as fractions of its height,
             measured from your desktop screenshot.
             ring-right = ring center, distance from image's RIGHT edge
             ring-top   = ring center, distance from image's TOP edge
             ring-r     = ring radius
             ============================================================ */
          --ring-right: 0.573;
          --ring-top: 0.357;
          --ring-r: 0.29;

          /* CARD POSITIONS: x / y in multiples of the ring radius,
             from the ring center (x: + is right, y: + is down). */
          --c1-x: -1.0;   --c1-y: -0.55;   /* AI          (top-left of ring) */
          --c2-x: 0.95;   --c2-y: -0.7;    /* Full Stack  (top-right)        */
          --c3-x: 1.05;   --c3-y: 0.55;    /* Problem     (bottom-right)     */
        }

        /* ---------- ARTWORK ---------- */
        .hv-stage {
          position: absolute;
          bottom: 0;
          right: 0;
          height: var(--H);
          width: max-content;
          max-width: none;
        }

        .hv-art {
          display: block;
          height: 100%;
          width: auto;
          max-width: none;
          position: relative;
          z-index: 10;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 18%, #000 38%);
          mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 18%, #000 38%);
        }

        .hv-glow {
          position: absolute;
          z-index: 0;
          top: 0;
          right: -2%;
          width: 40%;
          height: 100%;
          background: radial-gradient(
            ellipse at 65% 43%,
            rgba(255, 66, 0, 0.28),
            rgba(255, 45, 0, 0.12) 35%,
            transparent 70%
          );
          filter: blur(15px);
          animation: hv-glow-pulse 4s ease-in-out infinite alternate;
        }

        .hv-flames {
          position: absolute;
          z-index: 10;
          left: 25%;
          right: 0;
          bottom: -5%;
          height: 48%;
          background:
            radial-gradient(ellipse at 65% 100%, rgba(255, 40, 0, 0.38), transparent 65%),
            radial-gradient(ellipse at 85% 90%, rgba(255, 120, 15, 0.22), transparent 45%),
            radial-gradient(ellipse at 35% 100%, rgba(255, 60, 0, 0.2), transparent 50%);
          filter: blur(18px);
          mix-blend-mode: screen;
          animation: hv-flame-flicker 1.6s ease-in-out infinite alternate;
        }

        .hv-embers {
          position: absolute;
          z-index: 20;
          inset: 0;
          pointer-events: none;
        }

        .hv-spark-field {
          position: absolute;
          z-index: 21;
          inset: 0;
          overflow: hidden;
          background-image:
            radial-gradient(circle, #ffb45e 0 1px, transparent 2px),
            radial-gradient(circle, #ff4d0a 0 1.5px, transparent 3px),
            radial-gradient(circle, #ffe0a0 0 1px, transparent 2px);
          background-size: 113px 139px, 173px 191px, 227px 163px;
          background-position: 0 0, 50px 70px, 90px 20px;
          opacity: 0.35;
          animation: hv-sparks-drift 12s linear infinite;
        }

        .hv-heat-line {
          position: absolute;
          z-index: 22;
          right: 0;
          bottom: 4%;
          width: 70%;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 65, 0, 0.4),
            #ff8a38,
            rgba(255, 65, 0, 0.3),
            transparent
          );
          box-shadow: 0 0 12px rgba(255, 65, 0, 0.6);
          animation: hv-heat-pulse 2.5s ease-in-out infinite alternate;
        }

        /* ---------- FLOATING CARDS ---------- */
        /* .hv-cards is a zero-size point sitting exactly on the ring center.
           Every card is placed from that point in units of the ring radius. */
        .hv-cards {
          position: absolute;
          z-index: 35;
          width: 0;
          height: 0;
          right: calc(var(--H) * var(--ring-right));
          top: calc(var(--H) * var(--ring-top));
          --R: calc(var(--H) * var(--ring-r));
          font-size: clamp(10px, 0.55vw + 5px, 13px);
        }

        .hv-card-pos {
          position: absolute;
          transform: translate(-50%, -50%);
        }

        .hv-pos-1 { left: calc(var(--R) * var(--c1-x)); top: calc(var(--R) * var(--c1-y)); }
        .hv-pos-2 { left: calc(var(--R) * var(--c2-x)); top: calc(var(--R) * var(--c2-y)); }
        .hv-pos-3 { left: calc(var(--R) * var(--c3-x)); top: calc(var(--R) * var(--c3-y)); }

        .hv-card {
          display: flex;
          align-items: center;
          gap: 0.8em;
          padding: 0.8em 1.1em;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 0.8em;
          background: rgba(0, 0, 0, 0.72);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 0 24px rgba(255, 77, 13, 0.25);
          animation: hv-card-float 4s ease-in-out infinite;
          white-space: nowrap;
        }

        .hv-card-icon {
          width: 1.6em;
          height: 1.6em;
          color: #ff4d0a;
          flex-shrink: 0;
        }

        .hv-card-text { line-height: 1.2; }
        .hv-card-title { font-size: 1em; color: #fff; }
        .hv-card-sub { font-size: 0.85em; color: #a3a3a3; }

        .hv-card-arrow {
          width: 0.95em;
          height: 0.95em;
          margin-left: 0.6em;
          align-self: flex-end;
          color: rgba(255, 77, 13, 0.7);
        }

        /* ---------- KEYFRAMES ---------- */
        @keyframes hv-card-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes hv-glow-pulse {
          from { opacity: 0.6; transform: scale(0.97); }
          to   { opacity: 1;   transform: scale(1.04); }
        }

        @keyframes hv-flame-flicker {
          from { opacity: 0.45; transform: scaleX(0.96) translateY(0); }
          to   { opacity: 0.9;  transform: scaleX(1.03) translateY(-5px); }
        }

        @keyframes hv-sparks-drift {
          from { background-position: 0 0, 50px 70px, 90px 20px; }
          to   { background-position: -40px -220px, 120px -180px, 40px -260px; }
        }

        @keyframes hv-heat-pulse {
          from { opacity: 0.35; }
          to   { opacity: 0.9; }
        }

        /* ---------- TABLET + MOBILE (UNCHANGED) ---------- */
        @media (max-width: 1024px) {
          .hero-visual {
            --H: min(82cqh, 120cqw);

            /* Ring geometry for phones / tablets (the values that
               already work on your phone). */
            --ring-right: 0.37;
            --ring-top: 0.29;
            --ring-r: 0.20;

            /* All three cards on the RIGHT half of the ring,
               so they never sit on top of your text. */
            --c1-x: 0.95;  --c1-y: -0.05;
            --c2-x: 0.2;   --c2-y: -1.05;
            --c3-x: 0.5;   --c3-y: 1.0;
          }

          /* Fade the top of the artwork so there is no hard edge/split. */
          .hv-art {
            -webkit-mask-image:
              linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 18%, #000 38%),
              linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 12%, #000 30%);
            -webkit-mask-composite: source-in;
            mask-image:
              linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 18%, #000 38%),
              linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 12%, #000 30%);
            mask-composite: intersect;
          }

          .hv-glow { width: 100%; right: -15%; }
          .hv-flames { left: 0; opacity: 0.65; }
          .hv-heat-line { width: 100%; }
        }

        @media (max-width: 560px) {
          .hero-visual { --H: min(80cqh, 135cqw); }
          .hv-card-sub,
          .hv-card-arrow { display: none; }
          .hv-card { padding: 0.6em 0.9em; gap: 0.6em; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hv-glow,
          .hv-flames,
          .hv-spark-field,
          .hv-heat-line,
          .hv-card {
            animation: none !important;
          }
        }
      `}</style>

      {/* 1. Orange ambient glow */}
      <div className="hv-glow" />

      {/* 2. Flame-like base light */}
      <div className="hv-flames" />

      {/* 3. Rising embers */}
      <div className="hv-embers">
        <Embers count={70} />
      </div>

      {/* 4. Artwork (your PNG already has the ring) */}
      <div className="hv-stage">
        <img
          src="/hero.png"
          alt="Hero Artwork"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          className="hv-art"
        />

        {/* Floating cards: anchored to the ring center inside the artwork */}
        <div className="hv-cards">
          {floatCards.map(({ icon: Icon, title, sub, cls, delay }) => (
            <div key={title} className={`hv-card-pos ${cls}`}>
              <div className="hv-card font-ui" style={{ animationDelay: delay }}>
                <Icon className="hv-card-icon" strokeWidth={1.8} />
                <div className="hv-card-text">
                  <p className="hv-card-title">{title}</p>
                  <p className="hv-card-sub">{sub}</p>
                </div>
                <ArrowUpRight className="hv-card-arrow" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Extra floating light particles */}
      <div className="hv-spark-field" />

      {/* 6. Bottom heat streak */}
      <div className="hv-heat-line" />

      {/* 7. Fade into next section */}
      <div className="absolute inset-x-0 bottom-0 z-30 h-24 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

      {/* 8. Vertical side text */}
      <p
        className="absolute right-[1.2%] top-[27%] z-40 hidden font-ui text-[9px] tracking-[0.35em] text-white/80 lg:block"
        style={{ writingMode: "vertical-rl" }}
      >
        VISUAL THAT SPEAK
      </p>

      {/* 9. Bottom-right caption */}
      <p className="absolute bottom-[8%] right-[3%] z-40 hidden text-right font-ui text-[9px] leading-relaxed tracking-[0.2em] text-white/70 lg:block">
        CREATING
        <br />
        <span className="text-white">IMPACT THROUGH</span>
        <br />
        <span className="text-white">DEVELOPMENT</span>
      </p>
    </div>
  );
}