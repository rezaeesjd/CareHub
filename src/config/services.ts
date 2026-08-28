/**
 * Service definitions. Editable copy for the three primary service clusters
 * and the "additional coordination" list. Kept separate from components so a
 * non-developer can adjust wording. See docs/CONTENT-EDITING.md.
 *
 * IMPORTANT copy rules baked in below:
 *  - IV wording never implies an automatic prescription.
 *  - Tourist/insurance wording never promises reimbursement or direct billing.
 *  - Florence Care 24 coordinates; it does not "own" a lab, pharmacy or clinic.
 */
import type { Lang } from './site';

export type LocalisedList = Record<Lang, string[]>;
export type Localised = Record<Lang, string>;

export interface Seo {
  title: string;
  description: string;
}

export interface ServiceCluster {
  /** Stable id, used for anchors and icons. */
  id: string;
  /** Localised URL slug per language (no leading/trailing slash). */
  slug: Record<Lang, string>;
  icon: 'nursing' | 'physio' | 'tourist';
  /** Accent: 'navy' (default) or 'red' for the physiotherapy card, per the flyer. */
  accent: 'navy' | 'red';
  title: Localised;
  note: Localised;
  intro: Localised;
  items: LocalisedList;
  /** Per-language SEO for the generic service page (nursing / physio). */
  seo?: Record<Lang, Seo>;
}

export const clusters: ServiceCluster[] = [
  {
    id: 'nursing',
    slug: { en: 'nursing-care-florence', it: 'assistenza-infermieristica-firenze' },
    icon: 'nursing',
    accent: 'navy',
    title: { en: 'Nursing Care', it: 'Assistenza Infermieristica' },
    note: {
      en: 'At home, in hotels and in accommodation.',
      it: 'A domicilio, in hotel e nelle strutture ricettive.',
    },
    intro: {
      en: 'Qualified nurses provide care where you are — no need to travel while you are unwell.',
      it: 'Infermieri qualificati offrono assistenza dove ti trovi, senza doverti spostare quando non stai bene.',
    },
    items: {
      en: [
        'Wound care and dressings',
        'Medication administration',
        'Injections',
        'Blood sampling',
        'Vital signs monitoring',
        'Post-operative assistance',
        'Catheter and stoma care',
        'IV therapies and infusions — doctor consultation and prescription available when required',
      ],
      it: [
        'Medicazioni e cura delle ferite',
        'Somministrazione di farmaci',
        'Iniezioni',
        'Prelievi del sangue',
        'Monitoraggio dei parametri vitali',
        'Assistenza post-operatoria',
        'Gestione di cateteri e stomie',
        'Terapie infusionali ed endovenose — consulto medico e prescrizione disponibili quando necessari',
      ],
    },
    seo: {
      en: {
        title: 'Nurse at Home & Hotel in Florence | Florence Care 24',
        description:
          'Qualified nurses for home and hotel visits in Florence: wound care, injections, blood sampling, post-operative care and IV therapy coordination. Call or WhatsApp.',
      },
      it: {
        title: 'Infermiere a Domicilio e in Hotel a Firenze | Florence Care 24',
        description:
          'Infermieri qualificati per visite a domicilio e in hotel a Firenze: medicazioni, iniezioni, prelievi, assistenza post-operatoria e coordinamento di terapie infusionali. Chiama o scrivi su WhatsApp.',
      },
    },
  },
  {
    id: 'physio',
    slug: { en: 'home-physiotherapy-florence', it: 'fisioterapia-domicilio-firenze' },
    icon: 'physio',
    accent: 'red',
    title: { en: 'Physiotherapy', it: 'Fisioterapia' },
    note: {
      en: 'Home visits with professional equipment.',
      it: 'Visite a domicilio con attrezzatura professionale.',
    },
    intro: {
      en: 'Physiotherapists come to you for assessment, treatment and a recovery plan you can follow.',
      it: 'I fisioterapisti vengono da te per valutazione, trattamento e un piano di recupero da seguire.',
    },
    items: {
      en: [
        'Musculoskeletal pain treatment',
        'Mobility assistance',
        'Post-operative rehabilitation',
        'Manual therapy',
        'Functional recovery',
        'Personalised rehabilitation plans',
      ],
      it: [
        'Trattamento del dolore muscoloscheletrico',
        'Supporto alla mobilità',
        'Riabilitazione post-operatoria',
        'Terapia manuale',
        'Recupero funzionale',
        'Piani riabilitativi personalizzati',
      ],
    },
    seo: {
      en: {
        title: 'Home Physiotherapy in Florence | Florence Care 24',
        description:
          'Physiotherapists come to your home or hotel in Florence for musculoskeletal pain, mobility, post-operative rehabilitation and manual therapy. Call or WhatsApp.',
      },
      it: {
        title: 'Fisioterapia a Domicilio a Firenze | Florence Care 24',
        description:
          'Fisioterapisti a domicilio o in hotel a Firenze per dolore muscoloscheletrico, mobilità, riabilitazione post-operatoria e terapia manuale. Chiama o scrivi su WhatsApp.',
      },
    },
  },
  {
    id: 'tourist',
    slug: {
      en: 'medical-help-tourists-florence',
      it: 'assistenza-sanitaria-turisti-firenze',
    },
    icon: 'tourist',
    accent: 'navy',
    title: { en: 'Tourists & International Visitors', it: 'Turisti e Visitatori Internazionali' },
    note: {
      en: "Healthcare help when you don't know the Italian system.",
      it: 'Aiuto sanitario quando non conosci il sistema italiano.',
    },
    intro: {
      en: "Feeling unwell far from home is stressful. You don't need to understand the Italian healthcare system — one call and we help you find the right next step in English.",
      it: 'Sentirsi male lontano da casa è stressante. Non devi conoscere il sistema sanitario italiano: una chiamata e ti aiutiamo a trovare il passo giusto, anche in inglese.',
    },
    items: {
      en: [
        'Healthcare assistance in your hotel or accommodation',
        'Communication in English',
        'Coordination with doctors when needed',
        'Pharmacy coordination',
        'Laboratory and test coordination',
        'Specialist appointment coordination',
        'Follow-up and help understanding the care pathway',
        'Documentation and invoice support for insurance reimbursement requests',
      ],
      it: [
        'Assistenza sanitaria nel tuo hotel o alloggio',
        'Comunicazione in inglese e in italiano',
        'Coordinamento con i medici quando necessario',
        'Coordinamento con la farmacia',
        'Coordinamento di analisi ed esami di laboratorio',
        'Coordinamento di visite specialistiche',
        'Follow-up e aiuto a comprendere il percorso di cura',
        'Supporto con documentazione e fatture per richieste di rimborso assicurativo',
      ],
    },
  },
];

/** "Additional Healthcare Coordination" — coordinated, not owned by Florence Care 24. */
export const additionalCoordination: LocalisedList = {
  en: [
    'Doctor consultation',
    'Doctor home visit',
    'Telemedicine',
    'Laboratory tests',
    'Pharmacy',
    'Specialists',
    'Diagnostics',
    'Post-operative care pathways',
  ],
  it: [
    'Consulto medico',
    'Visita medica a domicilio',
    'Telemedicina',
    'Esami di laboratorio',
    'Farmacia',
    'Specialisti',
    'Diagnostica',
    'Percorsi di assistenza post-operatoria',
  ],
};

export function getCluster(id: string): ServiceCluster | undefined {
  return clusters.find((c) => c.id === id);
}
