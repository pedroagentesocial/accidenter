import { useEffect, useRef, useState } from "react";

type Props = {
  locale: "en" | "es";
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
};

type Item = {
  title: string;
  text: string;
  icon: "pulse" | "scan" | "shield" | "route";
};

function Icon({ name }: { name: Item["icon"] }) {
  if (name === "pulse") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 12h4l2.2-5 3.6 10L15 12h6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "scan") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 8V5h3M20 8V5h-3M4 16v3h3M20 16v3h-3M7 12h10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "shield") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3l7 3v5c0 4.6-2.9 8.8-7 10-4.1-1.2-7-5.4-7-10V6l7-3z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7h8M4 12h12M4 17h16M18 7l2-2M18 17l2 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ModernIntroSection({ locale, title, description, ctaText, ctaHref }: Props) {
  const rootRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const items: Item[] = locale === "es"
    ? [
      {
        title: "Atención rápida",
        text: "Evaluación inmediata con prioridades claras para tu recuperación.",
        icon: "pulse"
      },
      {
        title: "Diagnóstico avanzado",
        text: "Imágenes y evaluación en clínica para reducir dudas y demoras.",
        icon: "scan"
      },
      {
        title: "Recuperación protegida",
        text: "Decisiones médicas basadas en evidencia para mejores resultados.",
        icon: "shield"
      },
      {
        title: "Ruta de seguimiento",
        text: "Un plan concreto para que sepas qué sigue después de la visita.",
        icon: "route"
      }
    ]
    : [
      {
        title: "Rapid Injury Care",
        text: "Immediate assessment with clear priorities for your recovery path.",
        icon: "pulse"
      },
      {
        title: "Advanced Diagnostics",
        text: "On-site imaging and evaluation to reduce uncertainty and delays.",
        icon: "scan"
      },
      {
        title: "Recovery Protection",
        text: "Evidence-based care decisions designed to support long-term outcomes.",
        icon: "shield"
      },
      {
        title: "Follow-up Roadmap",
        text: "A structured next-step plan so you know exactly what comes after today.",
        icon: "route"
      }
    ];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={rootRef} className="relative border-y border-brand-accent/30 bg-white">
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-brand-light/35 to-transparent" />
      <div className="container relative py-14 sm:py-16">
        <div className={visible ? "mx-auto max-w-3xl text-center transition-all duration-700 opacity-100 translate-y-0" : "mx-auto max-w-3xl text-center transition-all duration-700 opacity-0 translate-y-4"}>
          <h2 className="font-accent text-3xl sm:text-4xl tracking-tight text-brand-dark">{title}</h2>
          <p className="mt-4 text-brand-dark/80 text-lg">{description}</p>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {items.map((item, idx) => (
            <article
              key={item.title}
              className={visible ? "group rounded-3xl border border-brand-accent/40 bg-white p-5 shadow-sm transition-all duration-700 opacity-100 translate-y-0 hover:-translate-y-1 hover:shadow-lg" : "group rounded-3xl border border-brand-accent/40 bg-white p-5 shadow-sm transition-all duration-700 opacity-0 translate-y-5"}
              style={{ transitionDelay: `${120 + idx * 90}ms` }}
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                <Icon name={item.icon} />
              </div>
              <h3 className="mt-4 text-lg font-accent text-brand-dark">{item.title}</h3>
              <p className="mt-2 text-sm text-brand-dark/75">{item.text}</p>
            </article>
          ))}
        </div>
        <div className={visible ? "mt-8 flex justify-center transition-all duration-700 opacity-100 translate-y-0" : "mt-8 flex justify-center transition-all duration-700 opacity-0 translate-y-3"} style={{ transitionDelay: "450ms" }}>
          <a href={ctaHref} className="button-primary">{ctaText}</a>
        </div>
      </div>
    </section>
  );
}
