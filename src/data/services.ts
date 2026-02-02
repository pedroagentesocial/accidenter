export type Service = { slug: string; order: number; i18nKey: string };

const services: Service[] = [
  { slug: "accident-medical-evaluation", order: 1, i18nKey: "services.accident-medical-evaluation" },
  { slug: "concussion-tbi-evaluation", order: 2, i18nKey: "services.concussion-tbi-evaluation" },
  { slug: "whiplash-neck-injury-evaluation", order: 3, i18nKey: "services.whiplash-neck-injury-evaluation" },
  { slug: "back-spine-injury-evaluation", order: 4, i18nKey: "services.back-spine-injury-evaluation" },
  { slug: "soft-tissue-injury-evaluation", order: 5, i18nKey: "services.soft-tissue-injury-evaluation" },
  { slug: "work-injury-evaluation", order: 6, i18nKey: "services.work-injury-evaluation" },
  { slug: "diagnostic-evaluation", order: 7, i18nKey: "services.diagnostic-evaluation" },
  { slug: "motor-vehicle-post-accident-care", order: 8, i18nKey: "services.motor-vehicle-post-accident-care" },
  { slug: "care-plan-coordination", order: 9, i18nKey: "services.care-plan-coordination" }
].sort((a, b) => a.order - b.order);

export default services;
