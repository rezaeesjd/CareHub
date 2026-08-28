/**
 * Italian content dictionary. Reviewed, natural Italian for a healthcare/service
 * context — not a literal translation of the English. Mirrors the shape of en.ts.
 */
import type { Dictionary } from './en';

export const it: Dictionary = {
  langName: 'Italiano',
  langSwitchLabel: 'Lingua',

  nav: {
    services: 'Servizi',
    howItWorks: 'Come Funziona',
    tourists: 'Turisti e Visitatori',
    about: 'Chi Siamo',
    faq: 'FAQ',
    contact: 'Contatti',
  },

  cta: {
    whatsapp: 'Scrivici su WhatsApp',
    whatsappShort: 'WhatsApp',
    call: 'Chiama',
    callFull: 'Chiama +39 375 837 4492',
    callNow: 'Chiama ora',
    seeServices: 'Vedi i servizi',
    email: 'Email',
    messageUs: 'Scrivici su WhatsApp',
    viewNursing: 'Servizi infermieristici',
    viewPhysio: 'Servizi di fisioterapia',
    touristHelp: 'Assistenza per i visitatori',
  },

  hero: {
    kicker: 'Assistenza e Coordinamento Sanitario',
    title: 'Aiuto medico a Firenze quando ne hai più bisogno.',
    subtitle:
      'Ti aiutiamo a metterti in contatto con professionisti sanitari qualificati per assistenza a casa, in hotel o nel tuo alloggio a Firenze.',
  },

  trust: {
    heading: 'Perché ci contattano',
    points: [
      {
        icon: 'contact',
        title: 'Un unico contatto',
        text: 'Un solo numero per le tue esigenze sanitarie a Firenze.',
      },
      {
        icon: 'home',
        title: 'Visite a casa e in hotel',
        text: "L'assistenza viene da te: a casa, in hotel o nel tuo alloggio.",
      },
      {
        icon: 'language',
        title: 'Italiano e inglese',
        text: 'Supporto in italiano e in inglese, e in altre lingue dove disponibile.',
      },
      {
        icon: 'shield',
        title: 'Professionisti qualificati',
        text: 'Assistenza fornita da professionisti indipendenti qualificati e abilitati.',
      },
    ],
  },

  notSure: {
    heading: 'Non sai di cosa hai bisogno?',
    text: 'Non devi capire da solo quale professionista contattare. Raccontaci di cosa hai bisogno e ti aiutiamo a coordinare il passo giusto.',
  },

  servicesSection: {
    heading: 'Come possiamo aiutarti',
    subheading: 'I tre modi in cui ci contattano più spesso.',
  },

  additional: {
    heading: 'Ulteriore coordinamento sanitario',
    text: 'In base alla tua richiesta, possiamo aiutarti a coordinare anche i seguenti servizi tramite professionisti indipendenti abilitati e partner autorizzati.',
    note: 'Florence Care 24 coordina questi servizi, erogati da professionisti sanitari indipendenti e partner autorizzati. Non gestiamo un laboratorio, una farmacia o un ambulatorio propri.',
  },

  howItWorks: {
    heading: 'Come funziona',
    steps: [
      {
        title: 'Contattaci',
        text: 'Chiamaci o scrivici su WhatsApp e raccontaci di cosa hai bisogno.',
      },
      {
        title: 'Capiamo la tua richiesta',
        text: 'Raccogliamo le informazioni necessarie per capire la situazione e il passo successivo.',
      },
      {
        title: 'Ti mettiamo in contatto con il professionista giusto',
        text: 'A seconda della richiesta, può essere un infermiere, un medico, un fisioterapista, un laboratorio, una farmacia o un altro professionista qualificato.',
      },
      {
        title: 'Assistenza e follow-up',
        text: 'Il professionista eroga il servizio e noi possiamo aiutare con il coordinamento e il follow-up quando serve.',
      },
    ],
  },

  finalCta: {
    heading: 'Non sai di cosa hai bisogno?',
    text: 'Chiamaci o scrivici e ti aiuteremo a coordinare il passo giusto.',
  },

  contactBar: {
    call: 'Chiama',
    whatsapp: 'WhatsApp',
  },

  footer: {
    tagline: 'Assistenza e Coordinamento Sanitario',
    contactHeading: 'Contatti',
    linksHeading: 'Sito',
    languageHeading: 'Lingua',
    phone: 'Telefono',
    whatsapp: 'WhatsApp',
    email: 'Email',
    serviceAreaHeading: 'Zona servita',
    rights: 'Tutti i diritti riservati.',
    disclaimer:
      'Florence Care 24 fornisce assistenza e coordinamento. Le prestazioni sanitarie sono erogate da professionisti indipendenti e abilitati.',
    links: {
      services: 'Servizi',
      tourists: 'Turisti',
      about: 'Chi siamo',
      faq: 'FAQ',
      contact: 'Contatti',
      privacy: 'Informativa sulla privacy',
      cookies: 'Informativa sui cookie',
      terms: 'Termini',
    },
  },

  servicePage: {
    whatWeCover: 'Cosa può includere',
    backToServices: 'Tutti i servizi',
    relatedHeading: 'Potrebbe interessarti anche',
  },

  touristPage: {
    metaTitle: 'Assistenza sanitaria per turisti a Firenze | Supporto in inglese',
    metaDescription:
      'Non ti senti bene a Firenze? Assistenza e coordinamento sanitario per turisti — visite di infermieri e medici in hotel, coordinamento con farmacia e laboratorio. Chiama o scrivi su WhatsApp.',
    h1: 'Assistenza sanitaria per turisti a Firenze',
    lead: 'Se non ti senti bene mentre sei a Firenze, non devi affrontare da solo il sistema sanitario italiano. Chiamaci o scrivici e ti aiutiamo a trovare il passo giusto, anche in inglese.',
    faqHeading: 'Domande frequenti dei visitatori',
    qa: [
      {
        q: 'Sto male mentre visito Firenze. Cosa faccio?',
        a: 'Chiamaci o scrivici su WhatsApp e descrivici come ti senti. Ti aiutiamo a capire la situazione e a coordinare il professionista adatto: un infermiere, un medico o un altro servizio.',
      },
      {
        q: 'Può venire qualcuno nel mio hotel?',
        a: 'Sì. I professionisti sanitari possono raggiungerti in hotel, B&B o nel tuo alloggio, così puoi riposare invece di spostarti mentre non stai bene.',
      },
      {
        q: 'Parlate inglese?',
        a: 'Sì. Offriamo supporto in inglese e in italiano, e in altre lingue dove disponibile.',
      },
      {
        q: 'Potete aiutarmi a trovare un medico?',
        a: 'Sì. Quando è opportuno, coordiniamo un consulto. Il medico prende una decisione professionale indipendente sulla tua assistenza.',
      },
      {
        q: 'Potete aiutarmi con una prescrizione quando è necessaria dal punto di vista medico?',
        a: 'Quando una prescrizione è necessaria, possiamo coordinare un consulto medico. La prescrizione non è mai automatica: è il medico a decidere in modo indipendente se è clinicamente appropriata.',
      },
      {
        q: 'Potete aiutarmi con la farmacia?',
        a: 'Sì. Possiamo aiutarti con il coordinamento della farmacia, così ottieni ciò di cui hai bisogno senza cercare in una città che non conosci.',
      },
      {
        q: 'Potete aiutarmi con analisi del sangue o di laboratorio?',
        a: 'Sì. Coordiniamo prelievi ed esami di laboratorio con partner autorizzati.',
      },
      {
        q: "Potete fornire documentazione per il rimborso dell'assicurazione di viaggio?",
        a: 'Possiamo fornire documentazione e fatture a supporto delle richieste di rimborso assicurativo. Non garantiamo il rimborso e non fatturiamo direttamente agli assicuratori, salvo accordi specifici.',
      },
      {
        q: 'Come vi contatto?',
        a: 'Chiamaci o scrivici su WhatsApp. È il modo più veloce per parlare con una persona che può aiutarti.',
      },
    ],
  },

  aboutPage: {
    metaTitle: 'Chi siamo | Florence Care 24 — Assistenza e Coordinamento Sanitario',
    metaDescription:
      'Florence Care 24 aiuta le persone a Firenze a raggiungere professionisti sanitari qualificati e indipendenti, a domicilio, in hotel e negli alloggi, con supporto in italiano e in inglese.',
    h1: 'Chi è Florence Care 24',
    lead: 'Ricevere assistenza sanitaria in una città che non si conosce è difficile: lingua diversa, sistema sconosciuto e nessuna idea di chi chiamare. Florence Care 24 nasce per semplificare tutto questo.',
    body: [
      {
        h: 'Perché esistiamo',
        p: 'Turisti, studenti internazionali e residenti stranieri affrontano spesso lo stesso problema quando non stanno bene a Firenze: non sanno se serve un infermiere, un medico o uno specialista, magari non parlano italiano e non sanno di chi fidarsi. Noi offriamo loro un unico punto di contatto.',
      },
      {
        h: 'Cosa facciamo',
        p: 'Ti aiutiamo a metterti in contatto con professionisti sanitari qualificati, abilitati e indipendenti per assistenza a casa, in hotel e negli alloggi. Capiamo la richiesta, coordiniamo il professionista adatto e aiutiamo con il follow-up.',
      },
      {
        h: 'In cosa crediamo',
        p: "L'assistenza clinica spetta ai professionisti abilitati. Il nostro ruolo è rendere semplice l'accesso: comunicazione chiara, comodità a casa e in hotel, supporto multilingue e coordinamento affidabile, così puoi concentrarti sul sentirti meglio.",
      },
    ],
  },

  contactPage: {
    metaTitle: 'Contatti | Florence Care 24 — Chiama o scrivi su WhatsApp',
    metaDescription:
      'Contatta Florence Care 24 per assistenza e coordinamento sanitario a Firenze. Chiamaci o scrivici su WhatsApp, oppure via email. Visite a domicilio e in hotel.',
    h1: 'Contattaci',
    lead: 'Il modo più veloce per raggiungerci è per telefono o WhatsApp. Una persona ti aiuterà a capire il passo successivo.',
    callHeading: 'Chiama',
    whatsappHeading: 'WhatsApp',
    emailHeading: 'Email',
    hoursNote:
      'Le richieste sono gestite in base alla disponibilità dei professionisti, anche nei fine settimana e nei giorni festivi.',
    privacyNotice:
      'Ti preghiamo di non inserire informazioni mediche dettagliate o sensibili nei messaggi. Contattaci direttamente per telefono o WhatsApp per assistenza.',
  },

  faqPage: {
    metaTitle: 'Domande frequenti | Florence Care 24',
    metaDescription:
      'Domande frequenti su assistenza e coordinamento sanitario a Firenze: visite a domicilio e in hotel, infermieri, medici, terapia infusionale, laboratorio, documentazione assicurativa e pagamenti.',
    h1: 'Domande frequenti',
    lead: 'Risposte brevi e oneste alle domande più comuni.',
    qa: [
      {
        q: 'Come richiedo assistenza?',
        a: 'Chiamaci o scrivici su WhatsApp e raccontaci di cosa hai bisogno. Al resto pensiamo noi.',
      },
      {
        q: 'Può venire qualcuno nel mio hotel?',
        a: 'Sì. I professionisti possono raggiungerti in hotel, B&B o alloggio, oltre che a casa.',
      },
      {
        q: 'Offrite assistenza infermieristica a domicilio?',
        a: 'Sì: medicazioni, iniezioni, somministrazione di farmaci, prelievi, parametri vitali, assistenza post-operatoria e altro.',
      },
      {
        q: 'Parlate inglese?',
        a: 'Sì. Offriamo supporto in italiano e in inglese, e in altre lingue dove disponibile.',
      },
      {
        q: 'Potete aiutarmi a trovare un medico?',
        a: 'Sì. Quando è opportuno, coordiniamo un medico. Il medico prende una decisione professionale indipendente.',
      },
      {
        q: 'E se serve una prescrizione?',
        a: 'Quando è necessaria dal punto di vista medico, possiamo coordinare un consulto. La prescrizione non è mai automatica: decide il medico in modo indipendente.',
      },
      {
        q: 'Potete aiutare con la terapia infusionale?',
        a: 'Le terapie infusionali ed endovenose possono essere coordinate quando appropriato. Consulto medico e prescrizione sono disponibili quando necessari dal punto di vista medico.',
      },
      {
        q: 'Potete aiutare con gli esami di laboratorio?',
        a: 'Sì. Coordiniamo prelievi ed esami di laboratorio con partner autorizzati.',
      },
      {
        q: 'Offrite fisioterapia a domicilio?',
        a: 'Sì. I fisioterapisti possono raggiungerti per valutazione, trattamento e un piano di recupero.',
      },
      {
        q: "Potete aiutare con la documentazione per l'assicurazione di viaggio?",
        a: 'Forniamo documentazione e fatture a supporto delle richieste di rimborso assicurativo. Non garantiamo il rimborso e non fatturiamo direttamente agli assicuratori, salvo accordi specifici.',
      },
      {
        q: 'I servizi sono disponibili nei fine settimana e nei giorni festivi?',
        a: 'Le richieste sono gestite in base alla disponibilità dei professionisti, anche nei fine settimana e nei giorni festivi.',
      },
      {
        q: 'Come funziona il pagamento?',
        a: 'Il pagamento viene concordato durante il coordinamento, di norma tramite link di pagamento sicuro o di persona. Spieghiamo sempre i costi prima di qualsiasi servizio.',
      },
      {
        q: 'Quali zone servite?',
        a: 'Firenze e zone limitrofe. Chiedici pure per la tua posizione specifica.',
      },
    ],
  },

  legal: {
    draftBanner:
      'BOZZA — questa pagina è un segnaposto in attesa di revisione da parte di un professionista legale/privacy qualificato in Italia. Non costituisce consulenza legale.',
    lastUpdatedLabel: 'Ultimo aggiornamento',
    providerRoleHeading: 'Il nostro ruolo',
    privacy: {
      metaTitle: 'Informativa sulla privacy | Florence Care 24',
      metaDescription:
        'Bozza di informativa sulla privacy di Florence Care 24, in attesa di revisione professionale.',
      h1: 'Informativa sulla privacy',
      intro:
        'Florence Care 24 si impegna a proteggere la tua privacy e a raccogliere il minor numero possibile di dati personali. Questa bozza descrive il nostro approccio previsto e sarà finalizzata dopo la revisione di un professionista privacy qualificato in Italia.',
      sections: [
        {
          h: 'Dati che raccogliamo',
          p: 'Questo sito non richiede la creazione di un account. Se in futuro verrà attivato un modulo di contatto, raccoglierà solo dati di contatto di base (come nome e telefono) e mai informazioni mediche dettagliate.',
        },
        {
          h: 'Informazioni sanitarie',
          p: 'Ti preghiamo di non inviare informazioni mediche dettagliate o sensibili tramite il sito. Le richieste sanitarie sono gestite direttamente per telefono o WhatsApp. Non conserviamo informazioni mediche in analytics, cookie o memoria locale del sito.',
        },
        {
          h: 'Analytics',
          p: 'Se attivati, gli analytics del sito raccolgono solo informazioni di utilizzo non identificative (come le pagine visitate e come arrivano i visitatori) e mai sintomi, diagnosi, nomi o numeri di telefono.',
        },
        {
          h: 'I tuoi diritti',
          p: 'Ai sensi del GDPR hai diritti sui tuoi dati personali, tra cui accesso, rettifica e cancellazione. Contattaci per esercitarli.',
        },
      ],
    },
    cookies: {
      metaTitle: 'Informativa sui cookie | Florence Care 24',
      metaDescription:
        'Bozza di informativa sui cookie di Florence Care 24, in attesa di revisione professionale.',
      h1: 'Informativa sui cookie',
      intro:
        'Questa bozza sarà finalizzata dopo la revisione professionale. Il nostro approccio predefinito è usare il minor numero possibile di cookie.',
      sections: [
        {
          h: 'Memorizzazione strettamente necessaria',
          p: "Il sito può memorizzare nel browser la tua preferenza di lingua e l'attribuzione di marketing (come un codice di referral). Serve a mostrare correttamente il sito e a capire come i visitatori ci raggiungono. Non contiene mai informazioni sanitarie.",
        },
        {
          h: 'Analytics opzionali',
          p: 'Gli analytics opzionali vengono caricati solo se configurati, con caricamento subordinato al consenso per i visitatori UE quando è attivo il tracciamento pubblicitario o analitico.',
        },
      ],
    },
    terms: {
      metaTitle: 'Termini | Florence Care 24',
      metaDescription:
        'Bozza di termini di servizio di Florence Care 24, in attesa di revisione professionale.',
      h1: 'Termini di servizio',
      intro:
        'Questa bozza di termini sarà finalizzata dopo la revisione professionale e, nella forma attuale, non costituisce un accordo vincolante.',
      sections: [
        {
          h: 'Il nostro ruolo',
          p: 'Florence Care 24 fornisce assistenza e coordinamento. Le prestazioni sanitarie sono erogate da professionisti indipendenti e abilitati, che operano sotto la propria responsabilità professionale.',
        },
        {
          h: 'Nessuna garanzia',
          p: 'Non garantiamo esiti medici specifici, tempi di risposta, rimborsi assicurativi o la disponibilità di uno specifico professionista.',
        },
      ],
    },
  },

  breadcrumbHome: 'Home',
  notFound: {
    metaTitle: 'Pagina non trovata | Florence Care 24',
    code: '404',
    title: 'Pagina non trovata',
    text: 'La pagina che cerchi non è qui. Torniamo sulla strada giusta.',
    home: 'Vai alla homepage',
  },
};
