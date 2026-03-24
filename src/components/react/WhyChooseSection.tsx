import { useEffect, useRef, useState } from "react";

type Point = {
  title: string;
  text: string;
};

type Props = {
  locale: "en" | "es";
  title: string;
  points: Point[];
  images: string[];
};

export default function WhyChooseSection({ locale, title, points, images }: Props) {
  const rootRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionTitle = locale === "es" ? "Velocidad clínica, claridad total" : "Clinical speed, total clarity";

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
            {locale === "es" ? "Ventajas reales" : "Real advantages"}
          </p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-accent tracking-tight text-brand-dark">{sectionTitle}</h2>
          <p className="mt-2 text-sm sm:text-base text-brand-dark/70">{title}</p>
        </div>
        <div className="mt-8 sm:mt-10 mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          {points.map((point, idx) => (
            <article
              key={`${point.title}-${idx}`}
              className={visible ? "group w-full overflow-hidden rounded-3xl border border-brand-accent/40 bg-white shadow-sm transition-all duration-700 opacity-100 translate-y-0 hover:-translate-y-1 hover:shadow-xl" : "group w-full overflow-hidden rounded-3xl border border-brand-accent/40 bg-white shadow-sm transition-all duration-700 opacity-0 translate-y-5"}
              style={{ transitionDelay: `${130 + idx * 90}ms` }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-[42%_58%] min-h-[280px] sm:min-h-[250px]">
                <div className="relative h-44 sm:h-auto">
                  <img src={images[idx % images.length]} alt={point.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent sm:bg-gradient-to-r sm:from-black/20 sm:to-transparent" />
                </div>
                <div className="relative p-5 sm:p-6 flex flex-col justify-center">
                  <div className="inline-flex w-fit rounded-full border border-brand-accent/40 bg-brand-light/40 px-3 py-1 text-xs font-semibold text-brand-primary">
                    {locale === "es" ? "Beneficio clave" : "Key advantage"}
                  </div>
                  <h3 className="mt-4 text-lg sm:text-xl font-accent text-brand-dark">{point.title}</h3>
                  <p className="mt-3 text-sm sm:text-base text-brand-dark/80 leading-relaxed">{point.text}</p>
                  <div className="mt-4 h-1 w-16 rounded-full bg-brand-primary/70" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
