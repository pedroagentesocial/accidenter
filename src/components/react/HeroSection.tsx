import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  locale: "en" | "es";
  title: string;
  subtitle: string;
  safetyNote: string;
  primaryCTA: string;
  secondaryCTA: string;
};

type Slide = {
  eyebrow: string;
  title: string;
  subtitle: string;
  note: string;
  bullets: string[];
  video: string;
  fallbacks: string[];
  primary: { text: string; href: string; style: "primary" | "success" };
  secondary: { text: string; href: string; style: "primary" | "success" };
  proof: string;
};

type NavConnection = {
  effectiveType?: string;
};

type NavWithConnection = Navigator & {
  connection?: NavConnection;
};

export default function HeroSection({ locale, title, subtitle, safetyNote, primaryCTA, secondaryCTA }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const switchTimerRef = useRef<number | null>(null);
  const [current, setCurrent] = useState(0);
  const [muted, setMuted] = useState(true);
  const [preferLow, setPreferLow] = useState(false);
  const [candidate, setCandidate] = useState(0);
  const [videoVisible, setVideoVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  const slides = useMemo<Slide[]>(() => {
    if (locale === "es") {
      return [
        {
          eyebrow: "Atención de lesiones 24/7",
          title,
          subtitle,
          note: safetyNote,
          bullets: ["Sin cita", "Evaluación rápida", "Plan claro"],
          video: "/videos/hero1.mp4",
          fallbacks: ["/videos/hero2.mp4", "/videos/bilingual.mp4"],
          primary: { text: primaryCTA, href: "tel:+18019967427", style: "primary" },
          secondary: { text: secondaryCTA, href: "/es/servicios", style: "success" },
          proof: "Atención confiable para pacientes lesionados en Utah"
        },
        {
          eyebrow: "Diagnóstico preciso en sitio",
          title: "Rayos X y diagnóstico en la clínica",
          subtitle: "Decisiones más claras, menos espera y mejor dirección clínica.",
          note: "Traiga estudios previos si ya cuenta con ellos.",
          bullets: ["Imagen en el momento", "Interpretación clínica", "Siguientes pasos claros"],
          video: "/videos/hero2.mp4",
          fallbacks: ["/videos/hero1.mp4", "/videos/postaccident.mp4"],
          primary: { text: "Ver diagnósticos", href: "/es/servicios/diagnostic-evaluation", style: "primary" },
          secondary: { text: "Llamar ahora", href: "tel:+18019967427", style: "success" },
          proof: "Flujo médico diseñado para rapidez y certeza"
        },
        {
          eyebrow: "Comunicación bilingüe real",
          title: "Atención bilingüe para decisiones seguras",
          subtitle: "Inglés y español para entender su plan con total claridad.",
          note: "Nuestro equipo te acompaña en cada etapa.",
          bullets: ["Inglés + Español", "Explicación clara", "Menos confusión"],
          video: "/videos/bilingual.mp4",
          fallbacks: ["/videos/hero1.mp4"],
          primary: { text: "Llamar (EN/ES)", href: "tel:+18019967427", style: "primary" },
          secondary: { text: "Contacto", href: "/es/contacto", style: "success" },
          proof: "Comunicación clínica de inicio a seguimiento"
        },
        {
          eyebrow: "Recuperación con dirección",
          title: "Cuidado post-accidente con plan claro",
          subtitle: "Desde la primera valoración hasta su seguimiento.",
          note: "Atención el mismo día sujeta a disponibilidad.",
          bullets: ["Valoración", "Plan clínico", "Seguimiento"],
          video: "/videos/postaccident.mp4",
          fallbacks: ["/videos/hero1.mp4"],
          primary: { text: "Atención Post-Accidente", href: "/es/servicios/motor-vehicle-post-accident-care", style: "primary" },
          secondary: { text: "Agendar visita", href: "tel:+18019967427", style: "success" },
          proof: "Continuidad para que tu recuperación no se detenga"
        }
      ];
    }
    return [
      {
        eyebrow: "24/7 injury support",
        title,
        subtitle,
        note: safetyNote,
        bullets: ["Walk-in welcome", "Fast triage", "Clear treatment plan"],
        video: "/videos/hero1.mp4",
        fallbacks: ["/videos/hero2.mp4", "/videos/bilingual.mp4"],
        primary: { text: primaryCTA, href: "tel:+18019967427", style: "primary" },
        secondary: { text: secondaryCTA, href: "/en/services", style: "success" },
        proof: "Trusted by accident-injury patients across Utah"
      },
      {
        eyebrow: "Diagnostic-focused care",
        title: "On-site X-ray and diagnostics",
        subtitle: "Clear decisions, faster triage, and the right next clinical step.",
        note: "Bring prior reports or imaging if you already have them.",
        bullets: ["Same-day imaging", "Clinical interpretation", "Actionable next steps"],
        video: "/videos/hero2.mp4",
        fallbacks: ["/videos/hero1.mp4", "/videos/postaccident.mp4"],
        primary: { text: "View Diagnostics", href: "/en/services/diagnostic-evaluation", style: "primary" },
        secondary: { text: "Call for Guidance", href: "tel:+18019967427", style: "success" },
        proof: "Clinical workflow built for speed and certainty"
      },
      {
        eyebrow: "Bilingual clinical communication",
        title: "Bilingual communication you can trust",
        subtitle: "English and Spanish support for safer decisions and smoother follow-up.",
        note: "Nuestro equipo te acompaña durante todo el proceso.",
        bullets: ["English + Español", "Clear explanation", "No confusion in your plan"],
        video: "/videos/bilingual.mp4",
        fallbacks: ["/videos/hero1.mp4"],
        primary: { text: "Call (EN/ES)", href: "tel:+18019967427", style: "primary" },
        secondary: { text: "Contact Team", href: "/en/contact", style: "success" },
        proof: "Communication-first care from intake to follow-up"
      },
      {
        eyebrow: "Recovery-centered plan",
        title: "Post-accident care with a clear plan",
        subtitle: "From first evaluation to follow-up, we keep your care path simple.",
        note: "Same-day support available based on current demand.",
        bullets: ["Evaluation", "Plan of care", "Ongoing follow-up"],
        video: "/videos/postaccident.mp4",
        fallbacks: ["/videos/hero1.mp4"],
        primary: { text: "Post-Accident Care", href: "/en/services/motor-vehicle-post-accident-care", style: "primary" },
        secondary: { text: "Schedule Visit", href: "tel:+18019967427", style: "success" },
        proof: "Coordinated support so your recovery never stalls"
      }
    ];
  }, [locale, primaryCTA, safetyNote, secondaryCTA, subtitle, title]);

  const sources = useMemo(() => {
    const base = slides[current].video;
    const low = base.replace(".mp4", "-low.mp4");
    const ordered = preferLow ? [low, base, ...slides[current].fallbacks] : [base, low, ...slides[current].fallbacks];
    return Array.from(new Set(ordered));
  }, [current, preferLow, slides]);

  const queueSlide = useCallback((updater: (prev: number) => number) => {
    setTextVisible(false);
    setVideoVisible(false);
    if (switchTimerRef.current) {
      window.clearTimeout(switchTimerRef.current);
    }
    switchTimerRef.current = window.setTimeout(() => {
      setCurrent((prev) => {
        const next = updater(prev);
        return ((next % slides.length) + slides.length) % slides.length;
      });
      setCandidate(0);
    }, 180);
  }, [slides.length]);

  useEffect(() => {
    setCandidate(0);
  }, [current]);

  useEffect(() => {
    const nav = navigator as NavWithConnection;
    const connection = nav.connection?.effectiveType ?? "";
    const isSlow = /(^2g|3g|slow-2g)/i.test(connection);
    const isSmall = window.matchMedia("(max-width: 640px)").matches;
    setPreferLow(isSlow || isSmall);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      queueSlide((v) => v + 1);
    }, 9000);
    return () => window.clearInterval(timer);
  }, [queueSlide]);

  useEffect(() => {
    setTextVisible(false);
    const timer = window.setTimeout(() => setTextVisible(true), 90);
    return () => window.clearTimeout(timer);
  }, [current]);

  useEffect(() => {
    return () => {
      if (switchTimerRef.current) {
        window.clearTimeout(switchTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, [current, candidate, muted]);

  const active = slides[current];
  const src = sources[Math.min(candidate, sources.length - 1)];
  const progress = `${((current + 1) / slides.length) * 100}%`;

  return (
    <section className="relative overflow-hidden border-b border-brand-accent/20 bg-black min-h-[560px] sm:min-h-[640px] lg:min-h-[720px]">
      <video
        key={src}
        ref={videoRef}
        src={src}
        className={videoVisible ? "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 opacity-100 scale-[1.03]" : "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 opacity-0 scale-[1.03]"}
        autoPlay
        playsInline
        muted={muted}
        poster="/images/postaccident.jpg"
        onError={() => setCandidate((v) => (v < sources.length - 1 ? v + 1 : v))}
        onLoadedData={() => setVideoVisible(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
      <div className="container relative z-10 py-14 sm:py-20 lg:py-24 pb-40 sm:pb-36">
        <div className="max-w-6xl">
          <div key={`content-${current}`} className="duration-500">
            <div className="max-w-3xl">
            <span className={textVisible ? "inline-flex items-center rounded-full border border-brand-accent/40 bg-white/90 px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-primary transition-all duration-700 opacity-100 translate-y-0 blur-0 scale-100" : "inline-flex items-center rounded-full border border-brand-accent/40 bg-white/90 px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-primary transition-all duration-700 opacity-0 translate-y-3 blur-[2px] scale-[0.98]"}>
              {active.eyebrow}
            </span>
            <h1 className={textVisible ? "mt-4 text-4xl sm:text-5xl lg:text-6xl font-accent font-semibold tracking-tight text-white leading-tight transition-all duration-700 opacity-100 translate-y-0 blur-0 scale-100" : "mt-4 text-4xl sm:text-5xl lg:text-6xl font-accent font-semibold tracking-tight text-white leading-tight transition-all duration-700 opacity-0 translate-y-4 blur-[2px] scale-[0.98]"} style={{ transitionDelay: "80ms" }}>
              {active.title}
            </h1>
            <p className={textVisible ? "mt-5 text-white/95 text-lg sm:text-xl font-medium max-w-2xl transition-all duration-700 opacity-100 translate-y-0 blur-0 scale-100" : "mt-5 text-white/95 text-lg sm:text-xl font-medium max-w-2xl transition-all duration-700 opacity-0 translate-y-3 blur-[2px] scale-[0.99]"} style={{ transitionDelay: "150ms" }}>
              {active.subtitle}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {active.bullets.map((item, idx) => (
                <span key={item} className={textVisible ? "inline-flex items-center rounded-full border border-white/40 bg-white/15 backdrop-blur px-3 py-1 text-xs sm:text-sm font-semibold text-white transition-all duration-700 opacity-100 translate-y-0 blur-0" : "inline-flex items-center rounded-full border border-white/40 bg-white/15 backdrop-blur px-3 py-1 text-xs sm:text-sm font-semibold text-white transition-all duration-700 opacity-0 translate-y-2 blur-[1px]"} style={{ transitionDelay: `${220 + idx * 80}ms` }}>
                  {item}
                </span>
              ))}
            </div>
            <div className={textVisible ? "mt-8 flex flex-wrap gap-3 transition-all duration-700 opacity-100 translate-y-0" : "mt-8 flex flex-wrap gap-3 transition-all duration-700 opacity-0 translate-y-3"} style={{ transitionDelay: "380ms" }}>
              <a href={active.primary.href} className={`${active.primary.style === "primary" ? "button-primary" : "button-success"} transition-transform duration-300 hover:scale-105`}>
                {active.primary.text}
              </a>
              <a href={active.secondary.href} className={`${active.secondary.style === "primary" ? "button-primary" : "button-success"} transition-transform duration-300 hover:scale-105`}>
                {active.secondary.text}
              </a>
            </div>
            <p className={textVisible ? "mt-5 text-sm font-medium text-white/85 transition-all duration-700 opacity-100 translate-y-0" : "mt-5 text-sm font-medium text-white/85 transition-all duration-700 opacity-0 translate-y-2"} style={{ transitionDelay: "460ms" }}>{active.note}</p>
            <p className={textVisible ? "mt-2 text-xs font-semibold uppercase tracking-wide text-brand-accent transition-all duration-700 opacity-100 translate-y-0" : "mt-2 text-xs font-semibold uppercase tracking-wide text-brand-accent transition-all duration-700 opacity-0 translate-y-2"} style={{ transitionDelay: "520ms" }}>{active.proof}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 inset-x-0 z-20 px-4">
        <div className="mx-auto w-full max-w-3xl rounded-2xl border border-white/20 bg-black/35 backdrop-blur p-3 sm:p-4">
          <div className="h-1.5 rounded-full bg-white/25 overflow-hidden">
            <div className="h-full bg-brand-success transition-all duration-500" style={{ width: progress }} />
          </div>
          <div className="mt-3 flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-dark" onClick={() => setMuted((v) => !v)}>
              {muted ? (locale === "es" ? "Activar sonido" : "Unmute") : (locale === "es" ? "Silenciar" : "Mute")}
            </button>
            <div className="flex items-center gap-2">
              <button type="button" className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-dark" onClick={() => queueSlide((v) => v - 1)}>
                {locale === "es" ? "Previo" : "Prev"}
              </button>
              <button type="button" className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-dark" onClick={() => queueSlide((v) => v + 1)}>
                {locale === "es" ? "Siguiente" : "Next"}
              </button>
            </div>
            <div className="flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => queueSlide(() => idx)}
                  className={idx === current ? "h-2.5 w-6 rounded-full bg-white transition-all" : "h-2.5 w-2.5 rounded-full bg-white/40 transition-all"}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
