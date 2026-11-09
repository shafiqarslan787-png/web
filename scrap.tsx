import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { CONFIG } from "@/config";

export const PAGES = [
  { to: "/", short: "Birthday Incident", title: "The Birthday Incident" },
  { to: "/universe", short: "Universe Is Weird", title: "The Universe Is Weird" },
  { to: "/cats", short: "Cat.exe", title: "Cat.exe Has Stopped Working" },
  { to: "/twins", short: "Twin Evidence", title: "Twin Behavior Evidence" },
  { to: "/letter", short: "One Last Thing", title: "One Last Thing, Amy" },
] as const;

export function Nav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const idx = Math.max(0, PAGES.findIndex((p) => p.to === path));
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-3 py-2">
        <Link to="/" className="font-hand text-2xl font-bold -rotate-3 shrink-0" aria-label="YOUR SSD home">
          {CONFIG.signature} <span aria-hidden>✶</span>
        </Link>
        <nav aria-label="Pages" className="flex-1 overflow-x-auto">
          <ul className="flex gap-1.5 whitespace-nowrap">
            {PAGES.map((p, i) => (
              <li key={p.to}>
                <Link
                  to={p.to}
                  className={`inline-block rounded-t-lg border-2 border-b-0 border-ink px-3 py-1 text-sm font-display font-medium transition ${
                    i === idx ? "bg-butter -translate-y-0.5" : i % 2 ? "bg-sky/60" : "bg-sage/50"
                  }`}
                  aria-current={i === idx ? "page" : undefined}
                >
                  <span className="mr-1 font-hand text-base">{i + 1}.</span>
                  {p.short}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <MusicToggle />
      </div>
      <p className="pb-1 text-center font-hand text-lg text-muted-foreground">
        Page {idx + 1} of 5 — {CONFIG.siteName}
      </p>
    </header>
  );
}

// Soft optional music: never autoplays. Uses CONFIG.musicUrl, or a gentle built-in chime loop.
export function MusicToggle() {
  const [on, setOn] = useState(false);
  const audio = useRef<HTMLAudioElement | null>(null);
  const ctx = useRef<AudioContext | null>(null);
  const timer = useRef<number | null>(null);

  const stop = () => {
    audio.current?.pause();
    if (timer.current) window.clearInterval(timer.current);
    ctx.current?.close().catch(() => {});
    ctx.current = null;
  };
  useEffect(() => stop, []);

  const startChimes = () => {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    const c = new AC();
    ctx.current = c;
    const notes = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 698.46];
    let i = 0;
    const play = () => {
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = "sine";
      o.frequency.value = notes[i++ % notes.length] ?? 523;
      g.gain.setValueAtTime(0, c.currentTime);
      g.gain.linearRampToValueAtTime(0.06, c.currentTime + 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 1.4);
      o.connect(g).connect(c.destination);
      o.start();
      o.stop(c.currentTime + 1.5);
    };
    play();
    timer.current = window.setInterval(play, 650);
  };

  const toggle = () => {
    if (on) { stop(); setOn(false); return; }
    setOn(true);
    if (CONFIG.musicUrl) {
      audio.current = audio.current ?? new Audio(CONFIG.musicUrl);
      audio.current.loop = true;
      audio.current.volume = 0.4;
      audio.current.play().catch(() => startChimes());
    } else startChimes();
  };

  return (
    <button onClick={toggle} aria-pressed={on} className="shrink-0 rounded-full border-2 border-ink bg-card px-3 py-1 text-sm font-display" title="Optional cozy music">
      {on ? "♫ music on" : "♪ music off"}
    </button>
  );
}

export function Meme({ kind, caption, className = "", size = 180, rotate = 0, bubbleSide = "top" }: {
  kind: "sleepy" | "heart"; caption?: string; className?: string; size?: number; rotate?: number; bubbleSide?: "top" | "bottom";
}) {
  const [broken, setBroken] = useState(false);
  const src = kind === "sleepy" ? CONFIG.images.sleepy : CONFIG.images.heart;
  const alt = kind === "sleepy" ? "Sleepy meme character in striped pajamas holding a candle" : "Goofy white meme character making a heart with its hands";
  return (
    <figure className={`flex flex-col items-center gap-2 ${className}`} style={{ transform: `rotate(${rotate}deg)` }}>
      {caption && bubbleSide === "top" && <figcaption className="bubble max-w-[16rem] text-center">{caption}</figcaption>}
      {broken ? (
        <div className="scrap-card grid place-items-center p-4 font-hand text-xl" style={{ width: size, height: size * 0.9 }}>
          {kind === "sleepy" ? "🕯️😴" : "🫶"}
        </div>
      ) : (
        <img src={src} alt={alt} width={size} height={size * 0.9} onError={() => setBroken(true)} className="meme-img wobble h-auto" style={{ width: size }} loading="lazy" />
      )}
      {caption && bubbleSide === "bottom" && <figcaption className="bubble max-w-[16rem] text-center">{caption}</figcaption>}
    </figure>
  );
}

export function NextButton({ to, children, turn = false }: { to: string; children: ReactNode; turn?: boolean }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center py-14">
      <button
        className="btn-scrap text-lg"
        onClick={() => {
          const go = () => { navigate({ to }); window.scrollTo({ top: 0 }); };
          const el = document.getElementById("page-root");
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          if (turn && el && !reduce) { el.classList.add("page-turn"); setTimeout(go, 620); } else go();
        }}
      >
        {children}
      </button>
    </div>
  );
}

export function Heading({ kicker, title, sub }: { kicker?: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {kicker && <p className="mb-3 inline-block -rotate-2 rounded-md border-2 border-ink bg-rose px-3 py-1 font-display text-sm font-semibold tracking-wider">{kicker}</p>}
      <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"><span className="scribble">{title}</span></h1>
      {sub && <p className="mt-4 font-hand text-2xl text-muted-foreground sm:text-3xl">{sub}</p>}
    </div>
  );
}

export function SectionTitle({ children, note }: { children: ReactNode; note?: string }) {
  return (
    <div className="mb-6 mt-16 flex flex-wrap items-end gap-3">
      <h2 className="text-2xl font-bold sm:text-3xl underline decoration-wavy decoration-sage underline-offset-8">{children}</h2>
      {note && <span className="font-hand text-xl text-muted-foreground">← {note}</span>}
    </div>
  );
}

const DOODLES = ["✦", "☆", "✧", "♡", "🐾", "☾", "✶", "⋆"];
export function Doodles({ count = 14, seed = 1 }: { count?: number; seed?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const r = (n: number) => ((Math.sin((i + 1) * 9.13 * seed + n) + 1) / 2);
        return (
          <span key={i} className="absolute select-none text-ink/25" style={{ left: `${r(1) * 96}%`, top: `${r(2) * 96}%`, fontSize: `${14 + r(3) * 22}px`, transform: `rotate(${r(4) * 60 - 30}deg)` }}>
            {DOODLES[i % DOODLES.length]}
          </span>
        );
      })}
    </div>
  );
}

const CONFETTI_COLORS = ["var(--sage)", "var(--sky)", "var(--lavender)", "var(--butter)", "var(--rose)"];
export function Confetti({ fire }: { fire: number }) {
  const [pieces, setPieces] = useState<number[]>([]);
  useEffect(() => {
    if (!fire) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPieces(Array.from({ length: 60 }, (_, i) => i + fire * 100));
    const t = setTimeout(() => setPieces([]), 2600);
    return () => clearTimeout(t);
  }, [fire]);
  return (
    <>
      {pieces.map((p) => (
        <span key={p} aria-hidden className="confetti-piece rounded-sm" style={{ left: `${Math.random() * 100}vw`, background: CONFETTI_COLORS[p % 5], animationDelay: `${Math.random() * 0.6}s` }} />
      ))}
    </>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return <main id="page-root" className="relative mx-auto max-w-6xl px-4 pb-10 pt-8 sm:px-6">{children}</main>;
}
