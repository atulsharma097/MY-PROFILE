import { useEffect, useRef } from "react";

export default function Embers({ count = 90 }) {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    let w, h, raf;

    const resize = () => {
      w = c.width = c.offsetWidth;
      h = c.height = c.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const make = () => ({
      x: w * (0.4 + Math.random() * 0.6),
      y: h * Math.random(),
      r: Math.random() * 2 + 0.4,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(Math.random() * 0.5 + 0.1),
      a: Math.random(),
    });
    const parts = Array.from({ length: count }, make);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        p.a -= 0.003;
        if (p.a <= 0 || p.y < 0) Object.assign(p, make(), { y: h, a: Math.random() });
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, ${100 + ((Math.random() * 60) | 0)}, 30, ${p.a})`;
        ctx.shadowColor = "#ff4d0d";
        ctx.shadowBlur = 8;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" />;
}