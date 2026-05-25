import type { AudienceId } from '../context/AudienceContext';

/* ─────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────── */
export interface AudienceContent {
  id: AudienceId;
  label: string;

  hero: {
    eyebrow: string;
    headline: string[];
    subline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };

  productOverview: {
    eyebrow: string;
    headline: string;
    description: string;
    features: Array<{ label: string; value: string; sub: string }>;
    bottomRow: Array<{ label: string; desc: string }>;
  };

  howItWorks: {
    eyebrow: string;
    headline: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
      metric: string;
      metricLabel: string;
    }>;
  };

  appControl: {
    eyebrow: string;
    headline: string;
    description: string;
    controls: Array<{ title: string; subtext: string }>;
  };

  smokePerformance: {
    eyebrow: string;
    headline: string;
    description: string;
    badge: string;
    bottomPills: string[];
  };

  experience: {
    eyebrow: string;
    headline: string;
    description: string;
    items: Array<{ title: string; detail: string; tag: string }>;
  };

  benefits: {
    eyebrow: string;
    headline: string;
    metrics: Array<{ title: string; metric: string | null; description: string }>;
    chartSavings: string;
  };

  closing: {
    eyebrow: string;
    headline: string;
    subline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };

  componentBreakdown: {
    eyebrow: string;
    headline: string;
    navHint: string;
    items: Array<{ name: string; description: string; detail: string }>;
  };

  modal: {
    eyebrow: string;
    title: string;
    ctaButton: string;
    specsSectionLabel: string;
    highlightsSectionLabel: string;
    deliverySectionLabel: string;
    specs: Array<{ label: string; value: string; sub: string }>;
    warranty: { title: string; body: string };
    highlights: Array<{ tag: string; title: string; body: string }>;
  };

  influencer: {
    quote: string;
    name: string;
    role: string;
    imageSrc?: string;
    videoSrc?: string;
  };
}

const MODAL_SPEC_VALUES = [
  { label: 'Heizzeit', value: '30 Sek.' },
  { label: 'Temperatur', value: '± 1 °C' },
  { label: 'Akkulaufzeit', value: '6+ Std.' },
  { label: 'Session-Dauer', value: '45–60 Min.' },
  { label: 'App-Steuerung', value: 'iOS & Android' },
  { label: 'Wasservolumen', value: '350 ml' },
] as const;

function modalSpecs(subs: readonly [string, string, string, string, string, string]) {
  return MODAL_SPEC_VALUES.map((s, i) => ({ ...s, sub: subs[i] }));
}

/* ─────────────────────────────────────────────────────────────
   1 — STREET CULTURE · Luciano · 18–25
   Ton: direkt, locker, klar – kein aufgesetzter Slang
───────────────────────────────────────────────────────────── */
const street: AudienceContent = {
  id: 1,
  label: 'Street Culture',

  hero: {
    eyebrow: 'Electric Hookah · Plug & Play',
    headline: ['Shisha.', 'No Stress.'],
    subline: 'Keine Kohle. Kein Setup. Einfach anmachen und loslegen – wann du willst, wo du willst.',
    ctaPrimary: 'Jetzt sichern',
    ctaSecondary: 'Was ist das?',
  },

  productOverview: {
    eyebrow: 'Wie es funktioniert',
    headline: 'Kein Setup. Einfach an.',
    description: 'Vergiss Kohle, Asche und den ganzen Aufwand. Pod rein, Knopf drücken, losrauchen. So einfach ist das.',
    features: [
      { label: 'Heizzeit', value: '30 Sek.', sub: 'Ready in 30 Sek.' },
      { label: 'Temperatur', value: '± 1°C', sub: 'Kein Verbrennen' },
      { label: 'Wartung', value: 'Keine', sub: 'Null Aufwand' },
    ],
    bottomRow: [
      { label: 'Kein Kohle', desc: 'Stecker rein, läuft' },
      { label: 'Sauberer Zug', desc: 'Weniger Nebenprodukte' },
      { label: 'App-Steuerung', desc: 'Alles am Handy' },
    ],
  },

  howItWorks: {
    eyebrow: "So läuft's",
    headline: 'Drei Schritte. Fertig.',
    steps: [
      {
        number: '01',
        title: 'Einschalten',
        description: 'Anmachen. 30 Sekunden warten. Ready. Kein Vorheizen, kein Rumfummeln.',
        metric: '30 Sek.',
        metricLabel: 'bis bereit',
      },
      {
        number: '02',
        title: 'Pod einlegen',
        description: 'Einlegen. Das System stellt sich selbst ein. Du musst nichts einstellen.',
        metric: '1 Klick',
        metricLabel: 'Einrichtung',
      },
      {
        number: '03',
        title: 'Rauchen',
        description: 'Gleichmäßiger Zug von Anfang bis Ende. Kein Nachlegen, keine Unterbrechung.',
        metric: '45–60 Min.',
        metricLabel: 'Session-Dauer',
      },
    ],
  },

  appControl: {
    eyebrow: 'App',
    headline: 'Alles per Handy',
    description: 'Züge, Temperatur, LED-Farben – alles über die App. Du musst nicht mal aufstehen.',
    controls: [
      { title: 'Züge tracken', subtext: 'Sieh in Echtzeit, wie du rauchst – über die ganze Session.' },
      { title: 'Session-Timer', subtext: 'Wie lang läuft die Session schon? Immer im Blick.' },
      { title: 'Rauchkontrolle', subtext: 'Mehr oder weniger Rauch — per Slider in der App.' },
      { title: 'LED-Farben', subtext: 'Farbe, Modus, Helligkeit – nach deinem Geschmack.' },
      { title: 'Luftzug', subtext: 'Widerstand feinjustieren, bis es genau passt.' },
    ],
  },

  smokePerformance: {
    eyebrow: 'Performance',
    headline: 'Bleibt die ganze Session auf Level',
    description: 'Normale Kohle lässt nach 20 Minuten nach. Die Electric Hookah hält durch — von erstem bis letztem Zug.',
    badge: 'Konstant stark',
    bottomPills: [
      'Kein Kohle-Nachlegen',
      '60 Min. volle Power',
      'Stabiler als Kohle',
      'Sofort bereit',
      'Jedes Mal gleich',
      'Kein Hitzeschock',
      'Gleichmäßig bis zum letzten Zug',
      'Kein Setup-Stress',
    ],
  },

  experience: {
    eyebrow: 'Das Gefühl',
    headline: 'Einfach besser rauchen',
    description: 'Kein Stress mit Kohle mehr. Du machst an, und es läuft. Der Rest ergibt sich.',
    items: [
      {
        title: 'Sofort bereit',
        detail: 'Kein Anfeuern, kein Warten. Einschalten und der Abend kann anfangen.',
        tag: 'Instant',
      },
      {
        title: 'Reiner Geschmack',
        detail: 'Elektrische Hitze bringt das Aroma klar raus. Kein Kohlegeschmack, nur der Flavor.',
        tag: 'Pure Flavor',
      },
      {
        title: 'Entspannte Runde',
        detail: 'Licht runter, Musik an, Session läuft – ohne dass jemand alle fünf Minuten die Kohle checken muss.',
        tag: 'Chill',
      },
      {
        title: 'Mehr Zeit für Freunde',
        detail: 'Weniger Setup, weniger Unterbrechungen. Mehr Gespräche, mehr Lachen.',
        tag: 'Social',
      },
      {
        title: 'Keine Unterbrechung',
        detail: 'Konstant von Anfang bis Ende. Keine Kohle wechseln, kein Nachregeln.',
        tag: 'Zero Hassle',
      },
      {
        title: 'Überall nutzbar',
        detail: 'Balkon, Wohnzimmer, bei Freunden – kein großer Aufbau, einfach dabei.',
        tag: 'Flexibel',
      },
    ],
  },

  benefits: {
    eyebrow: 'Was du sparst',
    headline: 'Günstiger als du denkst.',
    metrics: [
      {
        title: 'Kein Verbrennen',
        metric: null,
        description: 'Elektrisch verdampft – kein Kohlegeschmack, kein Verbrennen.',
      },
      {
        title: 'Günstiger',
        metric: '-40%',
        description: 'Laufende Kosten im Vergleich zum traditionellen Setup.',
      },
      {
        title: 'Pro Session',
        metric: '€0,80',
        description: 'Durchschnittliche Kosten pro Session mit Pods.',
      },
      {
        title: 'Sofort los',
        metric: null,
        description: 'Kein Aufbauen, kein Reinigen. Einschalten und rauchen.',
      },
    ],
    chartSavings: '€ 240 weniger Ausgaben nach 12 Monaten',
  },

  closing: {
    eyebrow: 'Jetzt verfügbar',
    headline: 'Shisha ohne Aufwand.',
    subline: 'Einfach anmachen, loslegen, fertig.',
    ctaPrimary: 'Jetzt sichern',
    ctaSecondary: 'Was ist das?',
  },

  componentBreakdown: {
    eyebrow: 'Was drin steckt',
    headline: 'Alles im Überblick',
    navHint: 'Tippe auf eine Komponente — Kurzinfo und Details zu allen 9 Teilen.',
    items: [
      { name: 'Pod', description: 'Geschmack wechseln — ohne Tabak und ohne Stress.', detail: 'Pod rein, fertig. Kein klebriger Aufbau, kein Reinigen zwischen den Sessions.' },
      { name: 'Durchzugmodul', description: 'Sorgt für einen gleichmäßigen, angenehmen Zug.', detail: 'Kein Ziehen wie bei einer kaputten Shisha — der Luftstrom bleibt stabil.' },
      { name: 'Abdichtung', description: 'Hält alles dicht, damit nichts entweicht.', detail: 'Weniger Leistungsverlust, weniger Ärger — einfach sauber abgedichtet.' },
      { name: 'Bowl', description: 'Wasserkammer für Kühlung und weichen Zug.', detail: 'Das richtige Volumen sorgt dafür, dass sich die Session angenehm anfühlt.' },
      { name: 'Heizkern', description: 'Elektrisch statt Kohle — in 30 Sekunden ready.', detail: 'Kein Anfeuern, kein Warten. Einschalten und der Abend kann starten.' },
      { name: 'Heizkammer', description: 'Die Hitze kommt elektrisch — nicht von Kohle.', detail: 'Geschlossene Zone, gleichbleibende Wärme. Kein Nachlegen mitten in der Session.' },
      { name: 'Ladepad', description: 'Laden, steuern, Akku checken — alles an einem Ort.', detail: 'Sieh direkt, wie viel Power noch da ist, und steuer die Session ohne Aufwand.' },
      { name: 'Schlauch', description: 'Flexibel, robust, neutral im Geschmack.', detail: 'Bleibt formstabil — auch wenn die Session länger wird als geplant.' },
      { name: 'Mundstück', description: 'Edelstahl mit cleanem, kühlem Griff.', detail: 'Fühlt sich hochwertig an und bleibt angenehm über die ganze Runde.' },
    ],
  },

  modal: {
    eyebrow: 'Electric Hookah',
    title: 'Was steckt drin?',
    ctaButton: 'Jetzt sichern — € 249',
    specsSectionLabel: 'Auf einen Blick',
    highlightsSectionLabel: 'Das Wichtigste',
    deliverySectionLabel: 'Im Karton',
    specs: modalSpecs(['Ready in 30 Sek.', 'Kein Verbrennen', 'Für lange Abende', 'Pro Session', 'Alles am Handy', 'Weicher Zug']),
    warranty: {
      title: '2 Jahre Garantie',
      body: 'Falls was klemmt: kostenloser Ersatz innerhalb der EU. Ohne Stress.',
    },
    highlights: [
      {
        tag: 'Technologie',
        title: 'Elektrischer Heizkern',
        body: 'An, 30 Sekunden warten, läuft. Keine Kohle, kein Setup — einfach ready.',
      },
      {
        tag: 'Kosten',
        title: 'Ab € 0,80 pro Session',
        body: 'Ein Pod reicht für 45–60 Minuten. Gegenüber normalem Kohle-Setup sparst du bis zu 40 % der laufenden Kosten.',
      },
      {
        tag: 'Design',
        title: 'Alles einzeln austauschbar',
        body: 'Mundstück, Pod, Akkumodul – alles wechselbar ohne Werkzeug. Kein Wegwerfen der ganzen Shisha.',
      },
      {
        tag: 'Sauberkeit',
        title: 'Kein Rauch, keine Asche',
        body: 'Elektrische Verdampfung bedeutet: kein Ruß, kaum Geruch, saubere Luft im Raum.',
      },
    ],
  },

  influencer: {
    quote: "Shisha war immer mein Ding. Das hier macht's einfach geil.",
    name: 'Luciano',
    role: 'Rapper · Artist',
    imageSrc: 'Still_Trade_Republic_Luciano02.png',
    videoSrc: 'Luciano.mp4',
  },
};

/* ─────────────────────────────────────────────────────────────
   2 — PREMIUM LIFESTYLE · Brad Pitt · 35–50
   Ton: ruhig, selbstsicher, kein Marketing-Speak
───────────────────────────────────────────────────────────── */
const premium: AudienceContent = {
  id: 2,
  label: 'Premium Lifestyle',

  hero: {
    eyebrow: 'Electric Hookah · Designed',
    headline: ['Shisha.', 'Perfected.'],
    subline: 'Kein Kompromiss. Elektrische Präzision, zeitloses Design. Das Ritual, wie es sein sollte.',
    ctaPrimary: 'Vorbestellen',
    ctaSecondary: 'Mehr erfahren',
  },

  productOverview: {
    eyebrow: 'Technologie',
    headline: 'Tradition trifft Technologie',
    description: 'Eine Shisha, die alles Unnötige weglässt. Elektrische Wärme ersetzt Kohle, Asche und ständige Wartung – ohne Abstriche beim Erlebnis.',
    features: [
      { label: 'Heizzeit', value: '30 Sek.', sub: 'Sofort bereit' },
      { label: 'Temperatur', value: '± 1°C', sub: 'Digitale Präzision' },
      { label: 'Wartung', value: 'Keine', sub: 'Null Aufwand' },
    ],
    bottomRow: [
      { label: 'Keine Kohle', desc: 'Saubere elektrische Verdampfung' },
      { label: 'Kein Rauch', desc: 'Reduzierte Nebenprodukte' },
      { label: 'App-Steuerung', desc: 'Volle Kontrolle, jederzeit' },
    ],
  },

  howItWorks: {
    eyebrow: 'Ablauf',
    headline: 'In drei Schritten zum perfekten Ritual',
    steps: [
      {
        number: '01',
        title: 'Aktivieren',
        description: 'Einschalten. Die elektrische Heizung erreicht die optimale Temperatur in 30 Sekunden.',
        metric: '30 Sek.',
        metricLabel: 'bis bereit',
      },
      {
        number: '02',
        title: 'Pod einsetzen',
        description: 'Aroma-Pod einlegen. Das System kalibriert sich automatisch – kein manuelles Einstellen.',
        metric: '1 Klick',
        metricLabel: 'Einrichtung',
      },
      {
        number: '03',
        title: 'Genießen',
        description: 'Gleichmäßige Dampfqualität, präzise Temperaturkontrolle – über die gesamte Session.',
        metric: '45–60 Min.',
        metricLabel: 'Session-Dauer',
      },
    ],
  },

  appControl: {
    eyebrow: 'App-Steuerung',
    headline: 'Vollständige Kontrolle, eine App',
    description: 'Vom ersten Zug bis zum Ende überwachst du alle Parameter direkt auf dem Smartphone – diskret und präzise.',
    controls: [
      { title: 'Züge verfolgen', subtext: 'Live-Übersicht jedes Zuges über die gesamte Session.' },
      { title: 'Session-Timer', subtext: 'Sekundengenaue Laufzeit für vollständige Kontrolle.' },
      { title: 'Dampfintensität', subtext: 'Intensität jederzeit anpassen – direkt aus der App.' },
      { title: 'LED-Ambiente', subtext: 'Farbe und Helligkeit an die Stimmung anpassen.' },
      { title: 'Luftwiderstand', subtext: 'Zugwiderstand feinjustieren für das ideale Zugverhalten.' },
    ],
  },

  smokePerformance: {
    eyebrow: 'Performance',
    headline: 'Konstante Qualität, von Anfang bis Ende',
    description: 'Während traditionelle Kohle-Setups nach 20 Minuten nachlassen, bleibt die elektrische Leistung über die gesamte Session stabil.',
    badge: 'Bis zur letzten Minute',
    bottomPills: [
      'Ruhiges Ritual ohne Kohle',
      'Deutlich reduzierter Geruch',
      'Gleichmäßiger Dampf bis zum Schluss',
      'Kein Kohle-Nachschub',
      '60 Minuten konstante Leistung',
      'Diskret im Raum',
      'Schnelle Einsatzbereitschaft',
      'Jedes Mal dasselbe Erlebnis',
    ],
  },

  experience: {
    eyebrow: 'Das Erlebnis',
    headline: 'Warum sich jede Session besser anfühlt',
    description: 'Weniger Aufwand, mehr Genuss. Diese Shisha macht aus einer Gewohnheit ein Ritual.',
    items: [
      {
        title: 'Sofort bereit',
        detail: 'Kein Anfeuern, kein Warten. Ein Knopfdruck – und der Moment gehört dir.',
        tag: 'Instant',
      },
      {
        title: 'Reiner Geschmack',
        detail: 'Saubere Hitze bringt das Aroma ohne Kohleeinfluss raus. Jeder Zug schmeckt weich und klar.',
        tag: 'Pure Flavor',
      },
      {
        title: 'Das perfekte Ambiente',
        detail: 'Kein Rumhantieren mit Kohle. Die Session läuft – du kannst dich auf das Wesentliche konzentrieren.',
        tag: 'Atmosphere',
      },
      {
        title: 'Mehr Zeit für Gespräche',
        detail: 'Weniger Unterbrechungen durch Setup und Wartung. Mehr Raum für das, was zählt.',
        tag: 'Ungestört',
      },
      {
        title: 'Session ohne Kompromisse',
        detail: 'Konstante Qualität von Anfang bis Ende – ohne Nachregeln, ohne nachlassende Leistung.',
        tag: 'Mühelos',
      },
      {
        title: 'Überall nutzbar',
        detail: 'Zuhause oder unterwegs – kompaktes Design, kein aufwändiges Setup.',
        tag: 'Flexibel',
      },
    ],
  },

  benefits: {
    eyebrow: 'Zahlen & Fakten',
    headline: 'Die Zahlen sprechen.',
    metrics: [
      {
        title: 'Keine Verbrennungsrückstände',
        metric: null,
        description: 'Elektrische Verdampfung – kein Kohlegeschmack, keine Rückstände.',
      },
      {
        title: 'Günstiger',
        metric: '-40%',
        description: 'Laufende Kosten vs. traditionelles Kohle-Setup.',
      },
      {
        title: 'Pro Session',
        metric: '€0,80',
        description: 'Durchschnittliche Kosten pro Session mit Pods.',
      },
      {
        title: 'Kein Aufbau',
        metric: null,
        description: 'Sofort einsatzbereit, kein Reinigen nötig.',
      },
    ],
    chartSavings: '€ 240 weniger Ausgaben im Jahr',
  },

  closing: {
    eyebrow: 'Jetzt verfügbar',
    headline: 'Shisha, neu gedacht.',
    subline: 'Präzise. Sauber. Elektrisch. Das Erlebnis, das du erwartest.',
    ctaPrimary: 'Vorbestellen',
    ctaSecondary: 'Mehr erfahren',
  },

  componentBreakdown: {
    eyebrow: 'Aufbau & Material',
    headline: 'Komponenten im Detail',
    navHint: 'Kurzbeschreibung und Detailtext zu allen 9 Komponenten.',
    items: [
      { name: 'Pod', description: 'Modulares Aroma-System für schnellen Geschmackwechsel.', detail: 'Vorkonfektionierte Pods ohne Tabakaufbau — gleichbleibende Qualität, null Aufwand.' },
      { name: 'Durchzugmodul', description: 'Steuert den Luftfluss gleichmäßig durch das System.', detail: 'Abgestimmter Airflow für ruhiges, vorhersehbares Zugverhalten über die gesamte Session.' },
      { name: 'Abdichtung', description: 'Dichtet die Module sauber und luftdicht ab.', detail: 'Hitze- und feuchtigkeitsresistent — verhindert Leistungsverlust und Nebenluft.' },
      { name: 'Bowl', description: 'Wasserkammer für Kühlung und ruhigen Durchzug.', detail: 'Abgestimmtes Volumen für weiches Rauchgefühl — Session für Session.' },
      { name: 'Keramik-Heizkern', description: 'Schnelles Aufheizen mit stabiler Temperatur.', detail: 'Thermisch träges Keramikmaterial hält Geschmack und Temperatur konstant.' },
      { name: 'Heizkammer', description: 'Elektrische Hitzezone statt Kohle.', detail: 'Geschlossener Heizbereich mit präziser Leistungsabgabe — kein Ritual-Störer.' },
      { name: 'Ladepad mit Steuerungs- und Akkuanzeige', description: 'Laden, steuern und Akkustand auf einen Blick.', detail: 'Integriertes Interface für Sessionkontrolle mit klarem Akku-Feedback.' },
      { name: 'Schlauch aus hochwertigem Gummi', description: 'Flexibel, robust und geschmacksneutral im Zug.', detail: 'Formstabil und angenehm — auch bei längeren Sessions.' },
      { name: 'Edelstahl-Mundstück', description: 'Hochwertiges Finish mit kühler, präziser Haptik.', detail: 'Langlebiger Edelstahl mit sauberem Durchzug und Premium-Gefühl.' },
    ],
  },

  modal: {
    eyebrow: 'Electric Hookah',
    title: 'Alle Details',
    ctaButton: 'Jetzt vorbestellen — € 249',
    specsSectionLabel: 'Technische Daten',
    highlightsSectionLabel: 'Im Detail',
    deliverySectionLabel: 'Lieferumfang',
    specs: modalSpecs(['Sofortbereitschaft', 'Digitale Präzision', 'Pro Ladung', 'Pro Pod', 'Bluetooth 5.0', 'Optimale Kühlung']),
    warranty: {
      title: '2 Jahre Herstellergarantie',
      body: 'Vollständige Garantie auf alle Komponenten. Kostenloser Ersatzversand innerhalb der EU.',
    },
    highlights: [
      {
        tag: 'Technologie',
        title: 'Elektrischer Heizkern',
        body: 'Proprietärer Keramik-Heizkern – erreicht die Zieltemperatur in unter 30 Sekunden und hält sie auf ±1°C genau. Keine Kohle, kein Aufwand.',
      },
      {
        tag: 'Kosten',
        title: 'Ab € 0,80 pro Session',
        body: 'Ein Flavor Pod reicht für 45–60 Minuten. Bis zu 40 % weniger laufende Kosten gegenüber traditionellem Setup.',
      },
      {
        tag: 'Design',
        title: 'Modulares System',
        body: 'Jede Komponente einzeln austauschbar – Mundstück, Pod, Akkumodul. Ohne Werkzeug, ohne Kompromisse.',
      },
      {
        tag: 'Sauberkeit',
        title: 'Keine Verbrennungsrückstände',
        body: 'Elektrische Verdampfung bedeutet keinen Rauch und keine Asche. Deutlich reduzierter Geruch, saubere Luft.',
      },
    ],
  },

  influencer: {
    quote: 'Quality matters. In everything I do.',
    name: 'Brad Pitt',
    role: 'Actor · Entrepreneur',
    imageSrc: 'Brad_Pitt_Trade_Republic.png',
    videoSrc: 'Brad_pitt.mp4',
  },
};

/* ─────────────────────────────────────────────────────────────
   3 — SHISHA-EXPERTE · Connoisseur · 25–40
   Ton: sachkundig, direkt – spricht den Kenner als Gleichgesinnte an
───────────────────────────────────────────────────────────── */
const expert: AudienceContent = {
  id: 3,
  label: 'Shisha-Experte',

  hero: {
    eyebrow: 'Pro-Setup · Elektrische Heiztechnologie',
    headline: ['Shisha.', 'Mastered.'],
    subline: 'Elektrische Heiztechnologie für Kenner. Kontrollierte Temperatur, optimierter Airflow, unverfälschter Geschmack.',
    ctaPrimary: 'Jetzt testen',
    ctaSecondary: 'Technische Details',
  },

  productOverview: {
    eyebrow: 'Technologie',
    headline: 'Entwickelt für echte Kenner',
    description: 'Keramik-Heizkern mit präziser Temperaturregelung, optimiertem Airflow und geschmacksneutralen Materialien. Kein Kohleeinfluss, kein Qualitätsverlust über die Session.',
    features: [
      { label: 'Heizzeit', value: '30 Sek.', sub: 'Keramik-Heizkern' },
      { label: 'Temperatur', value: '± 1°C', sub: 'Präzise geregelt' },
      { label: 'Wartung', value: 'Keine', sub: 'Pod-System' },
    ],
    bottomRow: [
      { label: 'Kein Kohlegeschmack', desc: 'Reine elektrische Verdampfung' },
      { label: 'Konstanter Airflow', desc: 'Optimierter Zugwiderstand' },
      { label: 'App-Kontrolle', desc: 'Temperatur auf 1°C genau' },
    ],
  },

  howItWorks: {
    eyebrow: 'Anwendung',
    headline: 'Präzision in drei Schritten',
    steps: [
      {
        number: '01',
        title: 'Aufheizen',
        description: 'Keramik-Heizkern erreicht die eingestellte Zieltemperatur in 30 Sekunden – ohne Überhitzen, ohne Schwanken.',
        metric: '30 Sek.',
        metricLabel: 'Aufheizzeit',
      },
      {
        number: '02',
        title: 'Pod einsetzen',
        description: 'Pod einlegen. Das System kalibriert Luftwiderstand und Temperaturzone automatisch.',
        metric: '1 Klick',
        metricLabel: 'Kalibrierung',
      },
      {
        number: '03',
        title: 'Session',
        description: 'Gleichmäßige Intensität von Minute 0 bis 60. Kein Nachlassen, kein Nachregeln.',
        metric: '60 Min.',
        metricLabel: 'Volle Leistung',
      },
    ],
  },

  appControl: {
    eyebrow: 'Steuerung',
    headline: 'Alle Parameter, eine App',
    description: 'Temperatur, Zugwiderstand, Sessiondaten – alles live überwachbar und direkt einstellbar.',
    controls: [
      { title: 'Züge analysieren', subtext: 'Detailliertes Live-Tracking jedes Zuges – Intensität, Dauer, Verlauf.' },
      { title: 'Session-Timer', subtext: 'Sekundengenaue Laufzeit – für reproduzierbare Sessions.' },
      { title: 'Dampfintensität', subtext: 'Verdampfungsgrad in Echtzeit beobachten und anpassen.' },
      { title: 'LED-Einstellung', subtext: 'Beleuchtung anpassen – oder ganz deaktivieren.' },
      { title: 'Zugwiderstand', subtext: 'Airflow feinjustieren für dein gewünschtes Zugverhalten.' },
    ],
  },

  smokePerformance: {
    eyebrow: 'Performance',
    headline: 'Dampfqualität messbar konstant',
    description: 'Traditionelle Kohle verliert nach 20 Minuten signifikant an Intensität. Der Keramik-Heizkern hält die Dampfqualität über die gesamte Session auf gleichem Niveau.',
    badge: 'Messbar konstant',
    bottomPills: [
      '±2% Intensitätsschwankung',
      'Reproduzierbares Session-Profil',
      'Keramik-Heizkern ±1°C',
      'Kein Flavourverlust',
      'Geringere Schwankung als Kohle',
      '60 Min. volle Leistung',
      'Kein Kohle-Nachschub',
      'Messbar konstant',
    ],
  },

  experience: {
    eyebrow: 'Das Erlebnis',
    headline: 'Was erfahrene Nutzer schätzen',
    description: 'Kein Kohleeinfluss, kein Temperaturschwanken. Nur das Aroma, das du eingelegt hast.',
    items: [
      {
        title: 'Reiner Geschmack',
        detail: 'Elektrische Verdampfung ohne Kohle-Einfluss. Das Flavor-Profil bleibt unverfälscht – von Anfang bis Ende.',
        tag: 'Rein',
      },
      {
        title: 'Stabile Intensität',
        detail: '±2% Schwankung über 60 Minuten. Kein Nachlassen wie bei traditioneller Kohle.',
        tag: 'Stabil',
      },
      {
        title: 'Volle Kontrolle',
        detail: 'Temperatur auf 1°C einstellbar. Zugwiderstand nach Wunsch – alles jederzeit reproduzierbar.',
        tag: 'Präzise',
      },
      {
        title: 'Kein Kohlegeschmack',
        detail: 'Das häufigste Problem bei herkömmlichen Setups ist eliminiert. Sauber, klar, intensiv.',
        tag: 'Sauber',
      },
      {
        title: 'Schneller Wechsel',
        detail: 'Neuer Geschmack in Sekunden – Pod raus, Pod rein, fertig. Kein Reinigen, keine Wartezeit.',
        tag: 'Schnell',
      },
      {
        title: 'Sauberes Setup',
        detail: 'Keine Asche, kein Ruß. Das Setup bleibt sauber – Session für Session.',
        tag: 'Rückstandsfrei',
      },
    ],
  },

  benefits: {
    eyebrow: 'Daten & Vergleich',
    headline: 'Präzision, die man schmeckt.',
    metrics: [
      {
        title: 'Temperaturgenauigkeit',
        metric: '±1°C',
        description: 'Keramik-Heizkern mit präziser Regelung – keine Schwankungen.',
      },
      {
        title: 'Kein Kohlegeschmack',
        metric: null,
        description: 'Elektrische Verdampfung – das Flavor-Profil bleibt unverfälscht.',
      },
      {
        title: 'Session-Kosten',
        metric: '€0,80',
        description: 'Messbar günstiger als Kohle-Setup bei gleichem Genuss.',
      },
      {
        title: 'Keine Asche',
        metric: null,
        description: 'Keine Verbrennungsrückstände – kein Reinigen, kein Ruß.',
      },
    ],
    chartSavings: '€ 240 weniger für Kohle & Zubehör pro Jahr',
  },

  closing: {
    eyebrow: 'Für Kenner',
    headline: 'Für die, die es wissen.',
    subline: 'Elektrische Heiztechnik für unverfälschten Geschmack und volle Kontrolle – Session für Session.',
    ctaPrimary: 'Jetzt testen',
    ctaSecondary: 'Technische Details',
  },

  componentBreakdown: {
    eyebrow: 'Komponenten im Detail',
    headline: 'Technischer Aufbau',
    navHint: 'Kurzbeschreibung und Detailtext zu allen 9 Komponenten — für reproduzierbare Sessions.',
    items: [
      { name: 'Pod', description: 'Vorkonfektioniertes Pod-System mit kalibriertem Flavor-Profil.', detail: 'Geschmacksneutraler Aufbau ohne Tabak — gleichbleibende Verdampfung ohne manuelles Packing.' },
      { name: 'Durchzugmodul', description: 'Steuert den Luftfluss gleichmäßig durch das System.', detail: 'Optimierter Airflow für konstanten Zugwiderstand und reproduzierbares Rauchverhalten.' },
      { name: 'Abdichtung', description: 'Dichtet die Module sauber und luftdicht ab.', detail: 'Hitze- und feuchtigkeitsresistente Dichtflächen — verhindert Nebenluft und Leistungsverlust.' },
      { name: 'Bowl', description: 'Wasserkammer für Kühlung und ruhigen Durchzug.', detail: 'Abgestimmtes Volumen für weiches Rauchgefühl über die gesamte Session.' },
      { name: 'Keramik-Heizkern', description: 'Schnelles Aufheizen mit stabiler Temperatur.', detail: 'Thermisch träges Keramikmaterial gleicht Lastspitzen aus — ±1°C über 60 Minuten.' },
      { name: 'Heizkammer', description: 'Elektrische Hitzezone statt Kohle.', detail: 'Geschlossener Heizbereich mit präziser Leistungsabgabe für reproduzierbaren Dampf.' },
      { name: 'Ladepad mit Steuerungs- und Akkuanzeige', description: 'Laden, steuern und Akkustand auf einen Blick.', detail: 'Integriertes Interface für Sessionkontrolle und Akku-Monitoring in Echtzeit.' },
      { name: 'Schlauch aus hochwertigem Gummi', description: 'Flexibel, robust und geschmacksneutral im Zug.', detail: 'Geschmacksneutrales Material — formstabil bei langen Sessions.' },
      { name: 'Edelstahl-Mundstück', description: 'Hochwertiges Finish mit kühler, präziser Haptik.', detail: 'Langlebiger Edelstahl mit sauberem Durchzug — kein Material-Einfluss aufs Aroma.' },
    ],
  },

  modal: {
    eyebrow: 'Electric Hookah',
    title: 'Technische Details',
    ctaButton: 'Jetzt testen — € 249',
    specsSectionLabel: 'Spezifikationen',
    highlightsSectionLabel: 'Technische Übersicht',
    deliverySectionLabel: 'Lieferumfang',
    specs: modalSpecs(['Keramik-Heizkern', '±1°C Regelung', '6+ Stunden Laufzeit', '45–60 Min. pro Pod', 'Bluetooth 5.0', '350 ml Kühlvolumen']),
    warranty: {
      title: '2 Jahre Garantie',
      body: 'Herstellergarantie auf alle Module. Kostenloser EU-Ersatzversand — ohne proprietären Lock-in.',
    },
    highlights: [
      {
        tag: 'Heiztechnologie',
        title: 'Keramik-Heizkern',
        body: 'Thermisch träges Keramikmaterial gleicht Lastspitzen aus, hält die Temperatur auf ±1°C konstant – kein Überhitzen, kein Flavourverlust.',
      },
      {
        tag: 'Kosten',
        title: 'Ab € 0,80 pro Session',
        body: 'Ein Flavor Pod für 45–60 Minuten. Bis zu 40 % günstiger als Kohle-Setup – messbar, nicht nur behauptet.',
      },
      {
        tag: 'Aufbau',
        title: 'Modulares System',
        body: 'Alle Komponenten einzeln wechselbar – Mundstück, Pod, Akkumodul. Kein Werkzeug, kein proprietärer Lock-in.',
      },
      {
        tag: 'Sauberkeit',
        title: 'Keine Verbrennungsrückstände',
        body: 'Elektrische Verdampfung produziert keinen Ruß, keine Asche. Das Setup bleibt sauber – und das Aroma unverfälscht.',
      },
    ],
  },

  influencer: {
    quote: 'Fünf Jahre Shisha. Ich habe alles ausprobiert. Das hier ist technisch auf einem anderen Level.',
    name: 'Community Verified',
    role: 'Shisha-Experte · Verified Review',
    imageSrc: undefined,
  },
};

/* ─────────────────────────────────────────────────────────────
   Export
───────────────────────────────────────────────────────────── */
export const audienceContent: Record<AudienceId, AudienceContent> = {
  1: street,
  2: premium,
  3: expert,
};
