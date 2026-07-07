import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ar";

type Dict = typeof en;

const en = {
  nav: { home: "Home", about: "About", services: "Services", doctors: "Doctors", contact: "Contact" },
  actions: {
    book: "Book appointment",
    callNow: "Call now",
    whatsapp: "WhatsApp",
    directions: "Get directions",
    explore: "Explore services",
    learnMore: "Learn more",
  },
  hero: {
    badge: "Trusted family clinic",
    title: "Compassionate care for every stage of life.",
    subtitle:
      "At Shafa Care, our team combines modern medicine with a warm, personal approach — so you feel heard, cared for, and well.",
    stat1: "Years of care",
    stat2: "Patients served",
    stat3: "Patient rating",
    openToday: "Open today",
    hours: "8:00 AM – 8:00 PM",
  },
  services: {
    title: "Our Medical Services",
    subtitle: "Comprehensive healthcare tailored to your needs",
    heroBadge: "Full-spectrum care",
    items: {
      general: { title: "General Medicine", desc: "Comprehensive primary care — annual physicals, chronic care, and acute treatment." },
      pediatrics: { title: "Pediatrics", desc: "Gentle, kid-friendly care from newborn check-ups through adolescence." },
      dental: { title: "Dental Care", desc: "Cleanings, cosmetic treatments, and orthodontics in a calming space." },
      cardio: { title: "Cardiology", desc: "Heart health screenings, ECGs, and specialist consultations." },
      lab: { title: "Lab & Diagnostics", desc: "On-site laboratory with fast, accurate results you can trust." },
      wellness: { title: "Wellness & Vaccines", desc: "Immunizations, nutrition guidance, and preventive wellness plans." },
      mental: { title: "Mental Health", desc: "Confidential counseling and support by licensed clinicians." },
      physio: { title: "Physiotherapy", desc: "Rehabilitation and mobility programs by certified therapists." },
    },
  },
  about: {
    title: "About Shafa Care Clinic",
    lead:
      "Shafa Care Clinic is a premier healthcare destination dedicated to providing world-class medical services. Under the expert leadership of Dr. Firas Ajo, we combine cutting-edge medical technology with a compassionate, patient-first approach.",
    mission:
      "Our mission is to deliver exceptional, patient-centered healthcare that improves the wellbeing of our community through clinical excellence, compassion, and innovation.",
    values: "Our Values",
    valuesList: {
      compassion: { title: "Compassion", desc: "We treat every patient like family — with warmth and respect." },
      excellence: { title: "Excellence", desc: "Evidence-based practice and continued education, always." },
      community: { title: "Community", desc: "A trusted health partner to the neighborhood we call home." },
      innovation: { title: "Innovation", desc: "Modern tools and thoughtful design that make care easier." },
    },
  },
  doctors: {
    title: "Meet Our Medical Team",
    subtitle: "Experienced professionals dedicated to your wellbeing",
    list: [
      { name: "Dr. Firas Ajo", role: "Founder & Medical Director" },
      { name: "Dr. Layla Mansour", role: "Pediatrics" },
      { name: "Dr. Omar Haddad", role: "Cardiology" },
      { name: "Dr. Rana Al-Salem", role: "Dental Care" },
    ],
  },
  testimonials: {
    title: "What Our Patients Say",
    subtitle: "Hear from those who trust us with their health",
    list: [
      { quote: "The doctors at Shafa Care truly listen. My kids actually look forward to their check-ups now.", name: "Layla A.", role: "Patient since 2021" },
      { quote: "Professional, warm, and precise. The best clinic experience I've had in Amman.", name: "Kareem S.", role: "Patient since 2023" },
      { quote: "Dr. Firas explained everything clearly and made me feel completely at ease.", name: "Noor H.", role: "Patient since 2022" },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    items: [
      { q: "Do I need to book in advance?", a: "Same-week appointments are available, and walk-ins are welcome during clinic hours." },
      { q: "What insurance do you accept?", a: "We work with most major providers. Contact us with your provider name and we'll confirm coverage." },
      { q: "Do you treat children?", a: "Yes — our pediatric team cares for newborns through adolescents in a kid-friendly space." },
      { q: "Where are you located?", a: "Visit us in Amman. Tap the address on this page for turn-by-turn directions." },
    ],
  },
  contact: {
    title: "Get in touch",
    subtitle: "Book an appointment, ask a question, or just say hello.",
    address: "Address",
    phone: "Phone",
    email: "Email",
    hours: "Working hours",
    hoursValue: "Mon–Fri 8:00–20:00 · Sat 9:00–16:00",
    addressValue: "Amman, Jordan — tap for directions",
    form: {
      name: "Full name",
      phone: "Phone",
      email: "Email",
      reason: "Reason for visit",
      message: "Your message",
      submit: "Send message",
      successTitle: "Message received",
      success: "Thank you — our team will be in touch within one business day.",
    },
  },
  footer: {
    tagline: "Compassionate healthcare, close to home.",
    quickLinks: "Quick links",
    services: "Services",
    contact: "Contact",
    hours: "Hours",
    monFri: "Mon – Fri: 8:00 – 20:00",
    sat: "Saturday: 9:00 – 16:00",
    sun: "Sunday: Closed",
    rights: "All rights reserved.",
  },
  ui: { language: "Language", theme: "Theme", menu: "Menu" },
};

const ar: Dict = {
  nav: { home: "الرئيسية", about: "من نحن", services: "الخدمات", doctors: "الكادر الطبي", contact: "اتصل بنا" },
  actions: {
    book: "احجز موعداً",
    callNow: "اتصل الآن",
    whatsapp: "واتساب",
    directions: "الاتجاهات",
    explore: "استكشف الخدمات",
    learnMore: "اقرأ المزيد",
  },
  hero: {
    badge: "عيادة عائلية موثوقة",
    title: "رعاية بحُبّ في كل مرحلة من مراحل الحياة.",
    subtitle:
      "في عيادة شفا، يجمع فريقنا بين الطب الحديث واللمسة الإنسانية الدافئة — لتشعر بأنك مسموع، ومحاط بالرعاية، وبأفضل حال.",
    stat1: "سنوات من الرعاية",
    stat2: "مريض تمّت خدمته",
    stat3: "تقييم المرضى",
    openToday: "مفتوحة اليوم",
    hours: "٨:٠٠ ص – ٨:٠٠ م",
  },
  services: {
    title: "خدماتنا الطبية",
    subtitle: "رعاية صحية شاملة مصممة لاحتياجاتك",
    heroBadge: "رعاية متكاملة",
    items: {
      general: { title: "الطب العام", desc: "رعاية أولية شاملة — فحوصات سنوية ومتابعة الأمراض المزمنة والحالات الطارئة." },
      pediatrics: { title: "طب الأطفال", desc: "رعاية لطيفة وودّية من الرضّع حتى المراهقين." },
      dental: { title: "طب الأسنان", desc: "تنظيف وتجميل وتقويم في بيئة مريحة." },
      cardio: { title: "أمراض القلب", desc: "فحوصات القلب وتخطيط القلب واستشارات الاختصاصيين." },
      lab: { title: "المختبر والتشخيص", desc: "مختبر داخلي بنتائج سريعة ودقيقة." },
      wellness: { title: "الصحة واللقاحات", desc: "تطعيمات وإرشاد غذائي وخطط وقاية." },
      mental: { title: "الصحة النفسية", desc: "استشارات سرية ودعم من مختصين مرخصين." },
      physio: { title: "العلاج الطبيعي", desc: "برامج تأهيل وحركة يقدّمها معالجون معتمدون." },
    },
  },
  about: {
    title: "عن عيادة شفا الطبية",
    lead:
      "عيادة شفا وجهة صحية رائدة تقدّم خدمات طبية عالمية المستوى. بقيادة الدكتور فراس عجو، نجمع بين أحدث التقنيات الطبية ونهج إنساني يضع المريض أولاً.",
    mission:
      "مهمتنا تقديم رعاية صحية استثنائية تركّز على المريض لتحسين صحة مجتمعنا من خلال التميز والرحمة والابتكار.",
    values: "قيمنا",
    valuesList: {
      compassion: { title: "الرحمة", desc: "نعامل كل مريض كأنه من العائلة — بدفء واحترام." },
      excellence: { title: "التميّز", desc: "ممارسة قائمة على الأدلة وتعليم مستمر دائماً." },
      community: { title: "المجتمع", desc: "شريك صحي موثوق للمجتمع الذي ننتمي إليه." },
      innovation: { title: "الابتكار", desc: "أدوات حديثة وتصميم مدروس يجعل الرعاية أسهل." },
    },
  },
  doctors: {
    title: "تعرّف على فريقنا الطبي",
    subtitle: "خبراء مخلصون لرعاية صحتك",
    list: [
      { name: "د. فراس عجو", role: "المؤسس والمدير الطبي" },
      { name: "د. ليلى منصور", role: "طب الأطفال" },
      { name: "د. عمر حداد", role: "أمراض القلب" },
      { name: "د. رنا السالم", role: "طب الأسنان" },
    ],
  },
  testimonials: {
    title: "ماذا يقول مرضانا",
    subtitle: "استمع لمن يثقون بنا في صحتهم",
    list: [
      { quote: "أطباء شفا يستمعون فعلاً. أطفالي أصبحوا يتطلعون إلى مواعيدهم.", name: "ليلى ع.", role: "مريضة منذ ٢٠٢١" },
      { quote: "احترافية ودفء ودقة. أفضل تجربة عيادة في عمّان.", name: "كريم س.", role: "مريض منذ ٢٠٢٣" },
      { quote: "الدكتور فراس شرح كل شيء بوضوح وجعلني مرتاحاً تماماً.", name: "نور ح.", role: "مريضة منذ ٢٠٢٢" },
    ],
  },
  faq: {
    title: "الأسئلة الشائعة",
    items: [
      { q: "هل أحتاج للحجز مسبقاً؟", a: "تتوفر مواعيد خلال الأسبوع، والزيارات دون موعد مرحّب بها خلال ساعات العمل." },
      { q: "ما التأمينات المقبولة؟", a: "نتعامل مع معظم شركات التأمين. تواصل معنا لنؤكد التغطية." },
      { q: "هل تعالجون الأطفال؟", a: "نعم — فريق الأطفال لدينا يعتني بالرضّع حتى المراهقين." },
      { q: "أين تقعون؟", a: "في عمّان. اضغط على العنوان في هذه الصفحة للحصول على الاتجاهات." },
    ],
  },
  contact: {
    title: "تواصل معنا",
    subtitle: "احجز موعداً أو اسأل عن أي شيء — نحن هنا للمساعدة.",
    address: "العنوان",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    hours: "ساعات العمل",
    hoursValue: "الاثنين–الجمعة ٨:٠٠–٢٠:٠٠ · السبت ٩:٠٠–١٦:٠٠",
    addressValue: "عمّان، الأردن — اضغط للاتجاهات",
    form: {
      name: "الاسم الكامل",
      phone: "رقم الهاتف",
      email: "البريد الإلكتروني",
      reason: "سبب الزيارة",
      message: "رسالتك",
      submit: "إرسال الرسالة",
      successTitle: "تم استلام رسالتك",
      success: "شكراً لك — سيتواصل فريقنا معك خلال يوم عمل واحد.",
    },
  },
  footer: {
    tagline: "رعاية صحية بحُبّ، قريبة من بيتك.",
    quickLinks: "روابط سريعة",
    services: "الخدمات",
    contact: "اتصل بنا",
    hours: "ساعات العمل",
    monFri: "الاثنين – الجمعة: ٨:٠٠ – ٢٠:٠٠",
    sat: "السبت: ٩:٠٠ – ١٦:٠٠",
    sun: "الأحد: مغلق",
    rights: "جميع الحقوق محفوظة.",
  },
  ui: { language: "اللغة", theme: "المظهر", menu: "القائمة" },
};

const dicts: Record<Lang, Dict> = { en, ar };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict; dir: "ltr" | "rtl" };
const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem("lang") as Lang | null)) || null;
    if (saved === "en" || saved === "ar") setLangState(saved);
  }, []);

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t: dicts[lang], dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}