import { useMemo, useState } from "react";

type Locale = "en" | "es";

type Props = {
  locale: Locale;
  pathname: string;
  labels: {
    services: string;
    about: string;
    contact: string;
    faq: string;
    schedule: string;
  };
};

function switchLocalePath(locale: Locale, path: string) {
  if (locale === "en") {
    if (path.startsWith("/en/contact")) return path.replace("/en/contact", "/es/contacto");
    if (path.startsWith("/en/services")) return path.replace("/en/services", "/es/servicios");
    if (path.startsWith("/en/privacy-policy")) return path.replace("/en/privacy-policy", "/es/politica-de-privacidad");
    if (path.startsWith("/en/terms-of-service")) return path.replace("/en/terms-of-service", "/es/terminos-del-servicio");
    if (path.startsWith("/en")) return path.replace("/en", "/es") || "/es";
    return "/es";
  }
  if (path.startsWith("/es/contacto")) return path.replace("/es/contacto", "/en/contact");
  if (path.startsWith("/es/servicios")) return path.replace("/es/servicios", "/en/services");
  if (path.startsWith("/es/politica-de-privacidad")) return path.replace("/es/politica-de-privacidad", "/en/privacy-policy");
  if (path.startsWith("/es/terminos-del-servicio")) return path.replace("/es/terminos-del-servicio", "/en/terms-of-service");
  if (path.startsWith("/es")) return path.replace("/es", "/en") || "/en";
  return "/en";
}

export default function AppHeader({ locale, pathname, labels }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const normalizedPath = pathname.replace(/\/$/, "") || (locale === "en" ? "/en" : "/es");
  const hrefs = useMemo(() => {
    return {
      home: locale === "en" ? "/en" : "/es",
      services: locale === "en" ? "/en/services" : "/es/servicios",
      about: locale === "en" ? "/en/about" : "/es/about",
      contact: locale === "en" ? "/en/contact" : "/es/contacto",
      faq: locale === "en" ? "/en/faq" : "/es/faq",
      switchHref: switchLocalePath(locale, pathname)
    };
  }, [locale, pathname]);
  const active = useMemo(() => {
    const is = (href: string) => normalizedPath === href || normalizedPath.startsWith(`${href}/`);
    return {
      home: is(hrefs.home),
      services: is(hrefs.services),
      about: is(hrefs.about),
      contact: is(hrefs.contact)
    };
  }, [hrefs, normalizedPath]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-brand-accent/30 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-5 lg:gap-8">
              <a href={hrefs.home} className="flex items-center gap-3 animate-in fade-in slide-in-from-top-1 duration-300">
                <img src="/images/logo.png" alt="Accident ER – Urgent Care MD logo" className="h-16 w-16 sm:h-[4.75rem] sm:w-[4.75rem] rounded logo-dark" />
              </a>
              <nav className="hidden lg:flex items-center gap-6 text-sm">
                <a href={hrefs.home} className={`font-semibold transition-colors ${active.home ? "text-brand-primary" : "text-brand-dark hover:text-brand-primary"}`}>
                  <span className={`relative inline-block pb-1 ${active.home ? "after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[2px] after:rounded-full after:bg-brand-primary" : ""}`}>{locale === "en" ? "Home" : "Inicio"}</span>
                </a>
                <a href={hrefs.services} className={`font-semibold transition-colors ${active.services ? "text-brand-primary" : "text-brand-dark hover:text-brand-primary"}`}>
                  <span className={`relative inline-block pb-1 ${active.services ? "after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[2px] after:rounded-full after:bg-brand-primary" : ""}`}>{labels.services}</span>
                </a>
                <a href={hrefs.about} className={`font-semibold transition-colors ${active.about ? "text-brand-primary" : "text-brand-dark hover:text-brand-primary"}`}>
                  <span className={`relative inline-block pb-1 ${active.about ? "after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[2px] after:rounded-full after:bg-brand-primary" : ""}`}>{labels.about}</span>
                </a>
                <a href={hrefs.contact} className={`font-semibold transition-colors ${active.contact ? "text-brand-primary" : "text-brand-dark hover:text-brand-primary"}`}>
                  <span className={`relative inline-block pb-1 ${active.contact ? "after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[2px] after:rounded-full after:bg-brand-primary" : ""}`}>{labels.contact}</span>
                </a>
              </nav>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <a href={hrefs.switchHref} className="button-outline-dark py-2">{locale === "en" ? "ES" : "EN"}</a>
              <a href="tel:+18019967427" className="button-primary py-2">+1 801-996-7427</a>
              <button type="button" onClick={() => setBookingOpen(true)} className="button-success py-2">
                {labels.schedule}
              </button>
            </div>
            <button
              type="button"
              className="lg:hidden button-outline-dark py-2"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              Menu
            </button>
          </div>
          {mobileOpen && (
            <div className="lg:hidden mt-4 rounded-xl border border-brand-accent/40 bg-white p-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="grid gap-2">
                <a href={hrefs.home} className={`justify-center py-2 ${active.home ? "button-success" : "button-outline-dark"}`}>{locale === "en" ? "Home" : "Inicio"}</a>
                <a href={hrefs.services} className={`justify-center py-2 ${active.services ? "button-success" : "button-outline-dark"}`}>{labels.services}</a>
                <a href={hrefs.about} className={`justify-center py-2 ${active.about ? "button-success" : "button-outline-dark"}`}>{labels.about}</a>
                <a href={hrefs.contact} className={`justify-center py-2 ${active.contact ? "button-success" : "button-outline-dark"}`}>{labels.contact}</a>
                <a href={hrefs.switchHref} className="button-outline-dark justify-center py-2">{locale === "en" ? "ES" : "EN"}</a>
                <button type="button" onClick={() => setBookingOpen(true)} className="button-success justify-center py-2">{labels.schedule}</button>
              </div>
            </div>
          )}
        </div>
      </header>
      {bookingOpen && (
        <div className="fixed inset-0 z-[120] animate-in fade-in duration-150" aria-hidden="false">
          <div className="absolute inset-0 bg-black/70" onClick={() => setBookingOpen(false)} />
          <div className="relative z-[121] min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-5xl rounded-2xl bg-white border border-brand-accent shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between px-4 py-3 border-b border-brand-accent">
                <h3 className="font-heading text-brand-dark">{labels.schedule}</h3>
                <button type="button" onClick={() => setBookingOpen(false)} className="button-outline-dark">×</button>
              </div>
              <iframe
                src="https://api.leadconnectorhq.com/widget/booking/SLtn70zGBAWxozn4sZA5"
                style={{ width: "100%", border: "none", overflow: "hidden" }}
                scrolling="no"
                title="booking"
                className="w-full min-h-[680px]"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
