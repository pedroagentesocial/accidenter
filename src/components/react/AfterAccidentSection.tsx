import { useEffect, useRef, useState } from "react";

type Step = {
  title: string;
  text: string;
};

type Props = {
  locale: "en" | "es";
  title: string;
  steps: Step[];
};

export default function AfterAccidentSection({ locale, title, steps }: Props) {
  const rootRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionTitle = locale === "es" ? "Ruta Inteligente de Recuperación" : "Smart Recovery Roadmap";

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
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
    <section ref={rootRef} className="relative bg-white border-y border-brand-accent/30">
      <div className="container py-12 sm:py-16">
        <div className={visible ? "mx-auto max-w-3xl text-center transition-all duration-700 opacity-100 translate-y-0" : "mx-auto max-w-3xl text-center transition-all duration-700 opacity-0 translate-y-4"}>
          <p className="inline-flex rounded-full border border-brand-accent/40 bg-white px-3 py-1 text-xs font-semibold text-brand-primary">
            {locale === "es" ? "Qué hacer ahora" : "What to do now"}
          </p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-accent tracking-tight text-brand-dark">{sectionTitle}</h2>
          <p className="mt-2 text-sm sm:text-base text-brand-dark/70">{title}</p>
        </div>
        <div className="mt-8 sm:mt-10 mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 justify-items-center">
          {steps.map((step, idx) => {
            return (
              <article
                key={`${step.title}-${idx}`}
                className={visible ? "relative w-full max-w-sm rounded-3xl border border-brand-accent/40 bg-white p-4 sm:p-5 shadow-sm transition-all duration-700 opacity-100 translate-y-0 hover:-translate-y-1 hover:shadow-lg text-center flex flex-col items-center" : "relative w-full max-w-sm rounded-3xl border border-brand-accent/40 bg-white p-4 sm:p-5 shadow-sm transition-all duration-700 opacity-0 translate-y-5 text-center flex flex-col items-center"}
                style={{ transitionDelay: `${130 + idx * 90}ms` }}
              >
                <span className="inline-flex h-14 min-w-14 items-center justify-center rounded-full bg-brand-primary text-white text-xl font-heading px-3 shadow-md ring-4 ring-brand-primary/20">
                  {idx + 1}
                </span>
                <h3 className="mt-4 text-base sm:text-lg font-accent text-brand-dark">{step.title}</h3>
                <p className="mt-2 text-sm sm:text-base text-brand-dark/80">{step.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
