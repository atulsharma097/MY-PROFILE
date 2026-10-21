import { useEffect, useMemo, useRef, useState } from 'react';
import './Loader.css';

/* ------------------------------------------------------------------ */
/*  Config – tweak these to taste                                      */
/* ------------------------------------------------------------------ */
const NAME = 'Atul';
const SUFFIX = 'DESIGN';
const INITIAL = 'A';
const MIN_DURATION = 3400; // minimum time the loader is shown (ms)
const MAX_WAIT = 9000; // safety: never hang longer than this (ms)
const INTRO_DELAY = 350; // small pause so the intro animation can play first
const STRIPS = 9; // number of shutter strips in the exit transition

// Headline that slides as loading progresses: [startsAt%, whitePart, orangePart]
const LINES = [
    [0, "HEY, I'M", 'ATUL'],
    [28, 'I CODE CREATIVE', 'IDEAS'],
    [62, 'INTO', 'REALITY'],
    [100, "LET'S", 'BUILD'],
];

// Floating tags (same as the hero) that pop in around the ring
const CHIPS = [
    { at: 18, icon: 'AI', title: 'AI', sub: 'Enthusiast', pos: 'tl' },
    { at: 45, icon: '</>', title: 'Full Stack', sub: 'Developer', pos: 'tr' },
    { at: 72, icon: '{ }', title: 'Problem', sub: 'Solver', pos: 'br' },
];

const RING_TEXT = 'CODE • DESIGN • CREATE • AI • FULL STACK • ';
const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const rand = (a, b) => Math.random() * (b - a) + a;
const smooth = (t) => t * t * (3 - 2 * t);

/* One rolling (odometer) digit – moved by transform only */
function Digit({ innerRef }) {
    return (
        <span className="kl-digit">
            <span className="kl-strip" ref={innerRef}>
                {DIGITS.map((d, i) => (
                    <i key={i}>{d}</i>
                ))}
            </span>
        </span>
    );
}

/* ------------------------------------------------------------------ */
/*  Loader                                                             */
/* ------------------------------------------------------------------ */
export default function Loader({ onComplete }) {
    const [phase, setPhase] = useState('loading'); // loading → ready → reveal → done
    const [lineIdx, setLineIdx] = useState(0);

    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;

    const canvasRef = useRef(null);
    const slotRef = useRef(null); // un-transformed emblem box (used for measuring)
    const emblemRef = useRef(null); // tilts with the mouse
    const shardsRef = useRef(null);
    const glowRef = useRef(null);
    const arcRef = useRef(null);
    const headRef = useRef(null);
    const barRef = useRef(null);
    const hunRef = useRef(null);
    const tenRef = useRef(null);
    const oneRef = useRef(null);
    const chipRefs = useRef([]);

    const shards = useMemo(
        () =>
            Array.from({ length: 9 }, (_, i) => ({
                id: i,
                style: {
                    '--a': `${(360 / 9) * i + rand(-18, 18)}deg`,
                    '--k': rand(0.64, 0.92),
                    '--sz': `${rand(7, 18)}px`,
                    '--rot': `${rand(0, 360)}deg`,
                    '--dur': `${rand(3, 6)}s`,
                    '--delay': `${rand(-6, 0)}s`,
                },
            })),
        []
    );

    /* Lock page scroll while the loader is up (restored on unmount) */
    useEffect(() => {
        const html = document.documentElement;
        const prev = html.style.overflow;
        html.style.overflow = 'hidden';
        return () => {
            html.style.overflow = prev;
        };
    }, []);

    /* ---------------------------------------------------------------- */
    /*  Master loop: progress, DOM writes, parallax and sparks all run    */
    /*  in ONE requestAnimationFrame – no React re-render per frame.      */
    /* ---------------------------------------------------------------- */
    useEffect(() => {
        const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        /* glow sprites (gold → orange → red) */
        const makeSprite = (rgb) => {
            const c = document.createElement('canvas');
            c.width = c.height = 48;
            const g = c.getContext('2d');
            const gr = g.createRadialGradient(24, 24, 0, 24, 24, 24);
            gr.addColorStop(0, 'rgba(255,255,255,1)');
            gr.addColorStop(0.25, `rgba(${rgb},0.9)`);
            gr.addColorStop(1, `rgba(${rgb},0)`);
            g.fillStyle = gr;
            g.fillRect(0, 0, 48, 48);
            return c;
        };
        const sprites = ['255,214,120', '255,106,0', '255,45,0'].map(makeSprite);

        let w = 0;
        let h = 0;
        let cx = 0;
        let cy = 0;
        let R = 0;

        function measure() {
            const r = slotRef.current?.getBoundingClientRect();
            if (!r) return;
            cx = r.left + r.width / 2;
            cy = r.top + r.height / 2;
            R = (r.width * 130) / 300; // ring radius in px
        }
        function resize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            measure();
        }
        resize();
        window.addEventListener('resize', resize);

        /* pointer parallax (falls back to a gentle idle drift) */
        const pointer = { x: 0, y: 0, active: false };
        const onMove = (e) => {
            pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
            pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
            pointer.active = true;
        };
        const onLeave = () => {
            pointer.active = false;
        };
        window.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('pointerleave', onLeave);
        const par = { x: 0, y: 0 };

        /* readiness */
        let windowReady = document.readyState === 'complete';
        let fontsReady = false;
        const onLoad = () => {
            windowReady = true;
        };
        window.addEventListener('load', onLoad);
        (document.fonts?.ready ?? Promise.resolve())
            .then(() => {
                fontsReady = true;
            })
            .catch(() => {
                fontsReady = true;
            });

        /* particles */
        const MAX = 600;
        const parts = [];
        const add = (p) => {
            if (parts.length < MAX) parts.push(p);
        };
        const spawnAmbient = () =>
            add({
                x: rand(0, w),
                y: h + 10,
                vx: rand(-14, 14),
                vy: -rand(30, 110),
                age: 0,
                life: rand(4, 8),
                size: rand(1.4, 3.2),
                drag: 0,
                wob: rand(0, 6.28),
            });
        const spawnSpark = (x, y, dir) => {
            const a = dir + rand(-0.9, 0.9);
            const s = rand(40, 210);
            add({
                x,
                y,
                vx: Math.cos(a) * s,
                vy: Math.sin(a) * s - 20,
                age: 0,
                life: rand(0.5, 1.4),
                size: rand(1.2, 3),
                drag: 1.6,
                wob: 0,
            });
        };
        const burst = () => {
            for (let i = 0; i < 170; i++) {
                const a = rand(0, Math.PI * 2);
                const s = rand(160, 720);
                add({
                    x: cx + par.x * 10,
                    y: cy + par.y * 10,
                    vx: Math.cos(a) * s,
                    vy: Math.sin(a) * s,
                    age: 0,
                    life: rand(0.7, 1.7),
                    size: rand(1.4, 3.4),
                    drag: 2.4,
                    wob: 0,
                });
            }
        };

        /* state */
        let p = 0; // displayed progress (0-100), damped for silky motion
        let finished = false;
        let lastLine = 0;
        let ambAcc = 0;
        let sparkAcc = 0;
        let lastMeasure = 0;
        const chipOn = CHIPS.map(() => false);
        const start = performance.now();
        let last = start;
        let raf;

        const paint = (v) => {
            if (arcRef.current) arcRef.current.style.strokeDashoffset = String(100 - v);
            if (headRef.current) headRef.current.style.transform = `rotate(${v * 3.6}deg)`;
            if (barRef.current) barRef.current.style.transform = `scaleX(${v / 100})`;

            // odometer: ones roll continuously, tens/hundreds roll when carried
            const ones = v % 10;
            const carry = smooth(clamp(ones - 9, 0, 1));
            if (oneRef.current) oneRef.current.style.transform = `translate3d(0,${-ones}em,0)`;
            if (tenRef.current)
                tenRef.current.style.transform = `translate3d(0,${-(Math.floor(v / 10) + carry)}em,0)`;
            if (hunRef.current) hunRef.current.style.transform = `translate3d(0,${-clamp(v - 99, 0, 1)}em,0)`;

            // floating tags
            CHIPS.forEach((c, i) => {
                const on = v >= c.at;
                if (on !== chipOn[i]) {
                    chipOn[i] = on;
                    chipRefs.current[i]?.classList.toggle('is-on', on);
                }
            });

            // headline slide (only touches React when the line actually changes)
            const idx = LINES.reduce((a, l, i) => (v >= l[0] ? i : a), 0);
            if (idx !== lastLine) {
                lastLine = idx;
                setLineIdx(idx);
            }
        };

        const frame = (now) => {
            const dt = Math.min((now - last) / 1000, 0.05);
            last = now;
            const elapsed = now - start;
            if (now - lastMeasure > 500) {
                measure();
                lastMeasure = now;
            }

            /* progress */
            if (!finished) {
                const ready = (windowReady && fontsReady) || elapsed > MAX_WAIT;
                const t = clamp((elapsed - INTRO_DELAY) / MIN_DURATION, 0, 1);
                let target = (0.5 - 0.5 * Math.cos(Math.PI * t)) * 100; // ease in-out
                if (!ready) target = Math.min(target, 92);
                p += (target - p) * (1 - Math.exp(-dt * 7)); // damped follow
                if (target >= 100 && p > 99.4) {
                    p = 100;
                    finished = true;
                    if (!reduce) burst();
                    setPhase('ready');
                }
                paint(p);
            }

            /* parallax tilt */
            if (!reduce) {
                const tx = pointer.active ? pointer.x : Math.sin(elapsed / 1700) * 0.55;
                const ty = pointer.active ? pointer.y : Math.cos(elapsed / 2300) * 0.4;
                const k = 1 - Math.exp(-dt * 5);
                par.x += (tx - par.x) * k;
                par.y += (ty - par.y) * k;
                if (emblemRef.current)
                    emblemRef.current.style.transform = `translate3d(${par.x * 10}px,${par.y * 10}px,0) rotateX(${-par.y * 7
                        }deg) rotateY(${par.x * 9}deg)`;
                if (shardsRef.current)
                    shardsRef.current.style.transform = `translate3d(${par.x * 22}px,${par.y * 22}px,0)`;
                if (glowRef.current)
                    glowRef.current.style.transform = `translate(calc(-50% + ${-par.x * 18}px), calc(-50% + ${-par.y * 18
                        }px))`;
            }

            /* sparks + embers */
            if (!reduce) {
                ambAcc += 38 * dt;
                while (ambAcc >= 1) {
                    spawnAmbient();
                    ambAcc -= 1;
                }
                if (!finished && elapsed > INTRO_DELAY) {
                    sparkAcc += 110 * dt;
                    const ang = ((p * 3.6 - 90) * Math.PI) / 180;
                    const hx = cx + par.x * 10 + R * Math.cos(ang);
                    const hy = cy + par.y * 10 + R * Math.sin(ang);
                    while (sparkAcc >= 1) {
                        spawnSpark(hx, hy, ang - 0.6);
                        sparkAcc -= 1;
                    }
                }

                ctx.clearRect(0, 0, w, h);
                ctx.globalCompositeOperation = 'lighter';
                for (let i = parts.length - 1; i >= 0; i--) {
                    const q = parts[i];
                    q.age += dt;
                    if (q.age >= q.life) {
                        parts[i] = parts[parts.length - 1];
                        parts.pop();
                        continue;
                    }
                    if (q.drag) {
                        const d = Math.exp(-q.drag * dt);
                        q.vx *= d;
                        q.vy = q.vy * d - 30 * dt; // embers drift upward
                    }
                    q.x += q.vx * dt + (q.wob ? Math.sin(q.age * 2 + q.wob) * 9 * dt : 0);
                    q.y += q.vy * dt;
                    const t = q.age / q.life;
                    const a = t < 0.1 ? t / 0.1 : 1 - (t - 0.1) / 0.9;
                    const s = q.size * 3.2 * (1 + (1 - t) * 0.6);
                    ctx.globalAlpha = a * 0.95;
                    ctx.drawImage(sprites[t < 0.35 ? 0 : t < 0.7 ? 1 : 2], q.x - s, q.y - s, s * 2, s * 2);
                }
                ctx.globalAlpha = 1;
            }

            raf = requestAnimationFrame(frame);
        };
        raf = requestAnimationFrame(frame);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
            window.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerleave', onLeave);
            window.removeEventListener('load', onLoad);
        };
    }, []);

    /* Phase sequencing */
    useEffect(() => {
        let timer;
        if (phase === 'ready') timer = setTimeout(() => setPhase('reveal'), 750);
        if (phase === 'reveal')
            timer = setTimeout(() => {
                setPhase('done');
                onCompleteRef.current?.();
            }, 1450);
        return () => clearTimeout(timer);
    }, [phase]);

    if (phase === 'done') return null;

    return (
        <div className={`kl-wrap kl-phase-${phase}`} role="status" aria-live="polite" aria-label="Loading">
            {/* Shutter strips – slide up at the end to reveal the site */}
            <div className="kl-strips" aria-hidden="true">
                {Array.from({ length: STRIPS }, (_, i) => (
                    <i key={i} style={{ '--d': `${Math.abs(i - (STRIPS - 1) / 2) * 0.07}s` }} />
                ))}
            </div>

            <div className="kl-stage">
                <div className="kl-bg" />
                <div className="kl-glow" ref={glowRef} />
                <canvas className="kl-canvas" ref={canvasRef} aria-hidden="true" />
                <div className="kl-grain" />
                <div className="kl-flash" />

                {/* HUD – mirrors the site's navbar / hero details */}
                <div className="kl-logo">
                    <span className="kl-logo__box">{INITIAL}</span>
                    <span className="kl-logo__text">
                        {NAME}
                        <b>{SUFFIX}</b>
                    </span>
                </div>
                <span className="kl-hud kl-hud--bl">BUILDING • LEARNING • CREATING</span>
                <span className="kl-hud kl-hud--br">
                    CREATING
                    <br />
                    IMPACT THROUGH
                    <br />
                    DEVELOPMENT
                </span>
                <span className="kl-hud kl-hud--side">PORTFOLIO • 2026</span>

                {/* Center */}
                <div className="kl-core">
                    <div className="kl-slot" ref={slotRef}>
                        <div className="kl-emblem" ref={emblemRef}>
                            <div className="kl-corona" />
                            <div className="kl-flare" />
                            <div className="kl-disc" />

                            <div className="kl-shards" ref={shardsRef}>
                                {shards.map((s) => (
                                    <span key={s.id} style={s.style} />
                                ))}
                            </div>

                            <svg viewBox="0 0 300 300" className="kl-rings" aria-hidden="true">
                                <defs>
                                    <linearGradient id="kl-grad" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#ffd36b" />
                                        <stop offset="45%" stopColor="#ff6a00" />
                                        <stop offset="100%" stopColor="#ff2d00" />
                                    </linearGradient>
                                    <path id="kl-textpath" d="M150,150 m-160,0 a160,160 0 1,1 320,0 a160,160 0 1,1 -320,0" fill="none" />
                                </defs>

                                {/* rotating text ring */}
                                <g className="kl-spin-text">
                                    <text className="kl-ringtext">
                                        <textPath href="#kl-textpath" textLength="1004" lengthAdjust="spacing">
                                            {RING_TEXT}
                                        </textPath>
                                    </text>
                                </g>

                                <g className="kl-spin">
                                    <circle cx="150" cy="150" r="146" className="kl-ring kl-ring--ticks" />
                                </g>
                                <circle
                                    cx="150"
                                    cy="150"
                                    r="130"
                                    pathLength="100"
                                    className="kl-track"
                                    transform="rotate(-90 150 150)"
                                />
                                <circle
                                    ref={arcRef}
                                    cx="150"
                                    cy="150"
                                    r="130"
                                    pathLength="100"
                                    className="kl-arc"
                                    strokeDasharray="100 100"
                                    strokeDashoffset="100"
                                    transform="rotate(-90 150 150)"
                                />
                                {/* glowing head – rotated by transform only */}
                                <g ref={headRef} className="kl-headg">
                                    <circle cx="150" cy="20" r="5.5" className="kl-head" />
                                </g>
                            </svg>

                            <div className="kl-mark">
                                <span>{INITIAL}</span>
                            </div>

                            <div className="kl-shock" />
                            <div className="kl-shock kl-shock--2" />

                            {CHIPS.map((c, i) => (
                                <div
                                    key={c.title}
                                    ref={(el) => (chipRefs.current[i] = el)}
                                    className={`kl-chip kl-chip--${c.pos}`}
                                >
                                    <i>{c.icon}</i>
                                    <span>
                                        <b>{c.title}</b>
                                        <small>{c.sub}</small>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sliding headline */}
                    <h1 className="kl-headline" aria-hidden="true">
                        <span className="kl-track" style={{ transform: `translate3d(0, ${-lineIdx * 1.15}em, 0)` }}>
                            {LINES.map(([, white, accent], i) => (
                                <span className="kl-line" key={i}>
                                    {white} <em>{accent}</em>
                                </span>
                            ))}
                        </span>
                    </h1>

                    <div className="kl-meter">
                        <div className="kl-bar">
                            <div className="kl-bar__fill" ref={barRef} />
                        </div>
                        <div className="kl-row">
                            <span className="kl-label">{phase === 'loading' ? 'LOADING EXPERIENCE' : 'READY'}</span>
                            <span className="kl-count">
                                <Digit innerRef={hunRef} />
                                <Digit innerRef={tenRef} />
                                <Digit innerRef={oneRef} />
                                <small>%</small>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="kl-vignette" />
            </div>
        </div>
    );
}