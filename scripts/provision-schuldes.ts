import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import bcrypt from 'bcryptjs';
import { insertTenantRecord, tenantSlugExists } from '../src/db/crm-repository';
import { publishDraftForTenant, saveDraftSiteDocument } from '../src/db/site-document-repository';
import { validateSiteDocument } from '../src/platform/publishing/validate-site-document';
import { getDemoSeed } from '../src/template-engine/seeds';
import type { CollectionSeedItem, SiteSeed } from '../src/template-engine/seeds/model';

const tenantSlug = 'schuldes';
const tenantName = 'Schuldes GmbH & Co. KG';
const dryRun = process.argv.includes('--dry-run');

loadDotEnvLocal();

const image = {
  water: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1800&q=82',
  drying: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1800&q=82',
  thermal: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1800&q=82',
  basement: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=82',
  team: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1800&q=82',
  tools: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=1800&q=82'
};

const services: CollectionSeedItem[] = [
  collection('svc-water', 'tradeService', 'Wasserschadenbeseitigung', 'wasserschadenbeseitigung', {
    summary:
      'Soforthilfe, Schadensanalyse, technische Trocknung und Sanierung aus einer koordinierten Hand fuer Ingolstadt und die Region.',
    description:
      'Schuldes begrenzt Wasserschaeden schnell, analysiert Ursache und Ausmass und koordiniert die anschliessende Trocknung sowie notwendige Sanierungsschritte. Ziel ist ein klarer Ablauf mit transparentem Angebot, kurzer Reaktionszeit und moeglichst wenig Reibung fuer Eigentuemer, Hausverwaltungen und Versicherer.',
    image: image.water,
    cta: { label: 'Schaden anfragen', link: { type: 'page', href: '/kontakt' } }
  }),
  collection('svc-leak', 'tradeService', 'Leckortung & Thermografie', 'leckortung-thermografie', {
    summary:
      'Praezise Ortung von Leckagen mit Thermografie, akustischen Verfahren, Feuchtemessung und endoskopischer Pruefung.',
    description:
      'Wenn die Ursache unklar ist, wird das passende Messverfahren gewaehlt: Thermografie, frequenzakustische Leckageortung, Widerstands- und Digitalmessungen oder Endoskopie. So lassen sich Schaeden gezielter beheben und unnoetige Oeffnungen vermeiden.',
    image: image.thermal,
    cta: { label: 'Ortung besprechen', link: { type: 'page', href: '/kontakt' } }
  }),
  collection('svc-drying', 'tradeService', 'Bautrocknung', 'bautrocknung', {
    summary:
      'Technische Trocknung nach Wasserschaeden, Feuchtepruefung und laufende Kontrolle bis zur belastbaren Uebergabe.',
    description:
      'Trocknungsgeraete werden bedarfsgerecht dimensioniert und bereits in der fruehen Schadensphase eingesetzt. Schuldes begleitet Messung, Kontrolle und Dokumentation, damit Folgeschaeden, Geruch und Schimmelrisiken reduziert werden.',
    image: image.drying,
    cta: { label: 'Trocknung planen', link: { type: 'page', href: '/kontakt' } }
  }),
  collection('svc-seal', 'tradeService', 'Bauwerksabdichtung', 'bauwerksabdichtung', {
    summary:
      'Abdichtung von Keller, Bodenplatte, Wandanschluessen, Terrassen, Balkonen und feuchtebelasteten Raeumen.',
    description:
      'Bei Neubau und Sanierung entscheidet die Bausubstanz ueber Art und Umfang der Abdichtung. Schuldes prueft die Konstruktion, bewertet Feuchtewege und setzt passende Massnahmen gegen eindringende Feuchtigkeit um.',
    image: image.basement,
    cta: { label: 'Abdichtung pruefen', link: { type: 'page', href: '/kontakt' } }
  }),
  collection('svc-cracks', 'tradeService', 'Rissverpressung', 'rissverpressung', {
    summary:
      'Verpressung von Rissen, Arbeitsfugen und Betonbauteilen je nach statischer oder abdichtender Anforderung.',
    description:
      'Ob kraftschluessig, begrenzt dehnfaehig oder als dauerhafter Verschluss von Arbeitsfugen: Das Verfahren richtet sich nach Bauteil, Rissbild und Belastung. Schuldes bewertet die Situation vor Ort und setzt die geeignete Loesung ein.',
    image: image.tools,
    cta: { label: 'Rissbild einschaetzen', link: { type: 'page', href: '/kontakt' } }
  }),
  collection('svc-management', 'tradeService', 'Schadensmanagement', 'schadensmanagement', {
    summary:
      'Ein Ansprechpartner fuer Gewerke, Angebot, Ausfuehrung, Rechnungspruefung und Abstimmung mit Versicherern.',
    description:
      'Nach dem Komplettservice-Prinzip koordiniert Schuldes bei Bedarf Maler, Bodenleger, Schreiner, Fliesenleger und weitere Partner. Kunden behalten einen zentralen Ansprechpartner und muessen die einzelnen Gewerke nicht selbst steuern.',
    image: image.team,
    cta: { label: 'Komplettservice anfragen', link: { type: 'page', href: '/kontakt' } }
  })
];

const references: CollectionSeedItem[] = [
  collection('ref-emergency', 'referenceProject', 'Soforthilfe nach Leitungswasserschaden', 'soforthilfe-leitungswasserschaden', {
    summary:
      'Erstbegehung, Schadensbegrenzung, technische Trocknung und koordinierte Sanierung fuer ein bewohntes Objekt.',
    image: image.water,
    detail: 'Schnelle Stabilisierung, klare Abstimmung, ein Ansprechpartner.'
  }),
  collection('ref-basement', 'referenceProject', 'Kellerabdichtung in Bestandsgebaeude', 'kellerabdichtung-bestand', {
    summary:
      'Analyse von Feuchtewegen, Abdichtung der kritischen Anschluesse und Vorbereitung der weiteren Nutzung.',
    image: image.basement,
    detail: 'Geeignet fuer Keller, Tiefgeschosse und feuchtebelastete Raeume.'
  }),
  collection('ref-thermal', 'referenceProject', 'Leckortung mit Thermografie', 'leckortung-thermografie-projekt', {
    summary:
      'Zerstoerungsarme Eingrenzung der Schadensursache mit Messverfahren, Dokumentation und Handlungsempfehlung.',
    image: image.thermal,
    detail: 'Praezise Ortung vor der eigentlichen Behebung.'
  }),
  collection('ref-drying', 'referenceProject', 'Bautrocknung nach Schadenereignis', 'bautrocknung-schadenereignis', {
    summary:
      'Trocknungskonzept, laufende Messung und Abschlusskontrolle zur Vermeidung von Langzeitschaeden.',
    image: image.drying,
    detail: 'Trocknung und Kontrolle bis zur belastbaren Uebergabe.'
  }),
  collection('ref-crack', 'referenceProject', 'Rissverpressung an Betonbauteil', 'rissverpressung-betonbauteil', {
    summary:
      'Bewertung des Rissbildes und passende Verpressung fuer Tragfaehigkeit oder Abdichtung.',
    image: image.tools,
    detail: 'Verfahren passend zu Bauteil, Belastung und Ziel.'
  }),
  collection('ref-insurance', 'referenceProject', 'Sanierungssteuerung mit Versicherer', 'sanierungssteuerung-versicherer', {
    summary:
      'Koordination notwendiger Gewerke inklusive Angebot, Ausfuehrungskontrolle und Abwicklung.',
    image: image.team,
    detail: 'Komplettservice reduziert Aufwand fuer Kunden und Verwaltung.'
  })
];

const insights: CollectionSeedItem[] = [
  collection('ins-step', 'tradesmanInsight', 'Ablauf im Wasserschadenfall', 'ablauf-im-wasserschadenfall', {
    summary:
      'Von Soforthilfe ueber Analyse bis Trocknung und Sanierung: der klare Ablauf fuer einen geordneten Schadenprozess.',
    image: image.water,
    kicker: 'Ablauf',
    metric: '1 Ansprechpartner',
    detail: 'Schnell reagieren, Ursache klaeren, Folgeschaeden vermeiden.'
  }),
  collection('ins-complete', 'tradesmanInsight', 'Komplettservice ohne Gewerke-Chaos', 'komplettservice-ohne-gewerke-chaos', {
    summary:
      'Schuldes koordiniert Partnergewerke und haelt Kommunikation, Rechnungspruefung und Ausfuehrung zusammen.',
    image: image.team,
    kicker: 'Service',
    metric: 'Alles aus einer Hand',
    detail: 'Besonders hilfreich bei Versicherungs- und Sanierungsfaellen.'
  }),
  collection('ins-leak', 'tradesmanInsight', 'Warum Leckortung vor Oeffnung kommt', 'warum-leckortung-vor-oeffnung-kommt', {
    summary:
      'Messverfahren helfen, die Ursache gezielter einzugrenzen und unnoetige Eingriffe in Bauteile zu reduzieren.',
    image: image.thermal,
    kicker: 'Analyse',
    metric: 'Praezise',
    detail: 'Thermografie, Akustik, Feuchtemessung und Endoskopie.'
  }),
  collection('ins-drying', 'tradesmanInsight', 'Trocknung ist mehr als Geraete aufstellen', 'trocknung-ist-mehr-als-geraete-aufstellen', {
    summary:
      'Dimensionierung, Kontrolle und Dokumentation entscheiden darueber, ob Feuchte wirklich nachhaltig reduziert wird.',
    image: image.drying,
    kicker: 'Trocknung',
    metric: 'Dokumentiert',
    detail: 'Messwerte schaffen Sicherheit fuer die naechsten Schritte.'
  }),
  collection('ins-sealing', 'tradesmanInsight', 'Bauwerksabdichtung richtig einschaetzen', 'bauwerksabdichtung-richtig-einschaetzen', {
    summary:
      'Feuchte Wege, Bausubstanz und Nutzung bestimmen die passende Abdichtung bei Neubau und Sanierung.',
    image: image.basement,
    kicker: 'Abdichtung',
    metric: 'Bestand & Neubau',
    detail: 'Keller, Bodenplatte, Wandanschluesse und Feuchtraeume.'
  }),
  collection('ins-fixed', 'tradesmanInsight', 'Transparenz durch Festpreisangebot', 'transparenz-durch-festpreisangebot', {
    summary:
      'Nach sorgfaeltiger Aufwandsanalyse entsteht ein nachvollziehbares Angebot mit Planungssicherheit.',
    image: image.tools,
    kicker: 'Kosten',
    metric: 'Transparent',
    detail: 'Eine klare Kalkulation reduziert Unsicherheit im Schadenfall.'
  })
];

const news: CollectionSeedItem[] = [
  collection('news-1', 'newsArticle', 'Was tun bei einem frischen Wasserschaden?', 'was-tun-bei-frischem-wasserschaden', {
    summary:
      'Die ersten Schritte entscheiden darueber, ob Folgeschaeden kleiner bleiben und die Sanierung strukturiert starten kann.',
    description:
      'Wichtig sind Schadensbegrenzung, schnelle Kontaktaufnahme, erste Dokumentation und eine fachliche Einschaetzung der Ursache. Schuldes unterstuetzt mit Soforthilfe, Messtechnik und abgestimmter Trocknung.',
    image: image.water,
    category: 'Ratgeber',
    publishedAt: '2026-05-01',
    author: 'Schuldes Team',
    readTime: '4 Min.'
  }),
  collection('news-2', 'newsArticle', 'Wann Thermografie bei Leckagen hilft', 'wann-thermografie-bei-leckagen-hilft', {
    summary:
      'Thermografie kann Temperaturunterschiede sichtbar machen und ist ein Baustein fuer zerstoerungsarme Leckortung.',
    description:
      'Je nach Schadenbild kombiniert Schuldes Thermografie mit weiteren Messverfahren. So wird die Ursache eingegrenzt, bevor Bauteile unnoetig geoeffnet werden.',
    image: image.thermal,
    category: 'Leckortung',
    publishedAt: '2026-04-18',
    author: 'Schuldes Team',
    readTime: '3 Min.'
  }),
  collection('news-3', 'newsArticle', 'Warum Komplettservice im Schadenfall entlastet', 'warum-komplettservice-entlastet', {
    summary:
      'Ein zentraler Ansprechpartner spart Zeit, reduziert Abstimmungsaufwand und haelt Gewerke sowie Versicherer zusammen.',
    description:
      'Vom Angebot ueber die Partnerkoordination bis zur Rechnungspruefung kann Schuldes Sanierungsprozesse strukturiert begleiten. Das ist vor allem bei bewohnten Objekten und Versicherungsfaellen wertvoll.',
    image: image.team,
    category: 'Schadensmanagement',
    publishedAt: '2026-04-03',
    author: 'Schuldes Team',
    readTime: '5 Min.'
  }),
  collection('news-4', 'newsArticle', 'Bautrocknung richtig planen', 'bautrocknung-richtig-planen', {
    summary:
      'Trocknung braucht Messung, passende Geraete und regelmaessige Kontrolle statt Bauchgefuehl.',
    description:
      'Schuldes plant Trocknungsgeraete nach Bedarf, kontrolliert Feuchtewerte und dokumentiert den Fortschritt bis zur belastbaren Uebergabe.',
    image: image.drying,
    category: 'Bautrocknung',
    publishedAt: '2026-03-22',
    author: 'Schuldes Team',
    readTime: '4 Min.'
  }),
  collection('news-5', 'newsArticle', 'Kellerfeuchte frueh erkennen', 'kellerfeuchte-frueh-erkennen', {
    summary:
      'Ausbluehungen, Geruch und abplatzender Putz koennen Hinweise auf Feuchteprobleme in der Bausubstanz sein.',
    description:
      'Bei feuchtebelasteten Kellern prueft Schuldes Konstruktion, Feuchtewege und geeignete Abdichtungsmassnahmen. So wird die Nutzung planbarer.',
    image: image.basement,
    category: 'Bauwerksabdichtung',
    publishedAt: '2026-03-05',
    author: 'Schuldes Team',
    readTime: '4 Min.'
  }),
  collection('news-6', 'newsArticle', 'Rissverpressung: Verfahren nach Bauteil', 'rissverpressung-verfahren-nach-bauteil', {
    summary:
      'Ob kraftschluessig oder abdichtend: Das passende Verfahren richtet sich nach Rissbild, Material und Ziel.',
    description:
      'Risse in Betonbauteilen, Arbeitsfugen oder Anschluessen werden nicht pauschal behandelt. Schuldes bewertet die Situation und waehlt ein Verfahren passend zur baulichen Aufgabe.',
    image: image.tools,
    category: 'Rissverpressung',
    publishedAt: '2026-02-15',
    author: 'Schuldes Team',
    readTime: '3 Min.'
  })
];

async function main() {
  const base = getDemoSeed('tradesman', 'modern');
  if (!base) throw new Error('Missing tradesman/modern seed.');

  const seed = personalize(base);
  const issues = validateSiteDocument(seed);
  if (issues.length > 0) {
    throw new Error(`Seed validation failed:\n${issues.join('\n')}`);
  }

  if (dryRun) {
    console.log('Dry run passed.');
    console.log(`Pages: ${seed.pages.length}`);
    console.log(`Collections: ${seed.collections.length}`);
    return;
  }

  if (await tenantSlugExists(tenantSlug)) {
    throw new Error(`Tenant slug already exists: ${tenantSlug}`);
  }

  const adminPassword = process.env.SCHULDES_ADMIN_PASSWORD?.trim();
  if (!adminPassword || adminPassword.length < 8) {
    throw new Error('Set SCHULDES_ADMIN_PASSWORD with at least 8 characters before provisioning.');
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await insertTenantRecord({
    slug: tenantSlug,
    name: tenantName,
    industryKey: 'tradesman',
    styleKey: 'modern',
    passwordHash
  });
  await saveDraftSiteDocument(tenantSlug, seed);
  await publishDraftForTenant(tenantSlug);
  await saveDraftSiteDocument(tenantSlug, seed);

  console.log(`Provisioned ${tenantName} as tenant "${tenantSlug}".`);
  console.log('Admin user:', tenantSlug);
  console.log('Admin password: value from SCHULDES_ADMIN_PASSWORD');
}

function personalize(seed: SiteSeed): SiteSeed {
  const collections = [...services, ...references, ...insights, ...news];
  return {
    ...seed,
    tenantName,
    global: {
      ...seed.global,
      brand: {
        name: tenantName,
        tagline: 'Wasserschadenbeseitigung, Leckortung, Bautrocknung und Sanierung in Ingolstadt.',
        accentHex: '#0f766e',
        themePresetId: 'custom-schuldes'
      },
      navigation: [
        { label: 'Start', href: '/' },
        { label: 'Leistungen', href: '/leistungen' },
        { label: 'Referenzen', href: '/referenzen' },
        { label: 'Unternehmen', href: '/betrieb' },
        { label: 'Kontakt', href: '/kontakt' }
      ],
      contact: {
        phone: '+49 841 951648-0',
        email: 'mail@schuldes-rainer.de',
        address: 'Joseph-Baader-Strasse 1, 85053 Ingolstadt',
        openingHours: {
          monday: '07:00 - 17:00',
          tuesday: '07:00 - 17:00',
          wednesday: '07:00 - 17:00',
          thursday: '07:00 - 17:00',
          friday: '07:00 - 14:00'
        }
      },
      integrations: {
        ...seed.global.integrations,
        cookieUi: 'full',
        privacyHref: '/datenschutz',
        imprintHref: '/impressum'
      }
    },
    collections,
    pages: seed.pages.map((page) => ({
      ...page,
      title: pageTitle(page.key),
      slug: pageSlug(page.key),
      seo: pageSeo(page.key),
      sections: page.sections.map((section) => ({
        ...section,
        data: sectionData(page.key, section.sectionKey, section.id, section.data)
      }))
    }))
  };
}

function sectionData(pageKey: string, sectionKey: string, sectionId: string, fallback: Record<string, unknown>): Record<string, unknown> {
  if (sectionKey === 'global.hero') {
    return {
      eyebrow: 'Ingolstadt · seit ueber 30 Jahren',
      headline: { plain: 'Wasserschaden?', accent: 'Wir steuern das.' },
      subline:
        'Schuldes ist spezialisiert auf Wasserschadenbeseitigung, Leckortung, Bautrocknung, Bauwerksabdichtung, Rissverpressung und Schadensmanagement.',
      body:
        'Vom ersten Anruf bis zur letzten Sanierungsmassnahme: ein erfahrenes Team, moderne Messtechnik und ein Komplettservice, der Zeit, Nerven und Kosten spart.',
      image: image.water,
      primaryCta: { label: 'Soforthilfe anfragen', link: { type: 'page', href: '/kontakt' } },
      secondaryCta: { label: 'Leistungen ansehen', link: { type: 'page', href: '/leistungen' } }
    };
  }
  if (sectionKey === 'tradesman.serviceOverview') {
    return {
      eyebrow: pageKey === 'home' ? 'Leistungsschwerpunkte' : 'Leistungen',
      headline:
        pageKey === 'home'
          ? { plain: 'Schnell handeln,', accent: 'sauber sanieren.' }
          : { plain: 'Alle Leistungen', accent: 'im Ueberblick.' },
      intro:
        'Schuldes verbindet technische Analyse, Soforthilfe und Sanierungssteuerung zu einem klaren Ablauf mit einem zentralen Ansprechpartner.',
      items: services.map((item) => item.id)
    };
  }
  if (sectionKey === 'tradesman.references') {
    return {
      eyebrow: 'Praxisfaelle',
      headline: { plain: 'Typische Schadenlagen,', accent: 'klar geloest.' },
      intro:
        'Beispiele fuer Einsatzbereiche, wie sie bei Wasserschaeden, Abdichtung, Leckortung und Sanierungskoordination regelmaessig vorkommen.',
      items: references.map((item) => item.id)
    };
  }
  if (sectionKey === 'tradesman.deepDives') {
    return {
      eyebrow: 'Wissen & Ablauf',
      headline: { plain: 'Was Kunden', accent: 'vorher wissen wollen.' },
      intro:
        'Konkrete Erklaerungen zu Soforthilfe, Komplettservice, Leckortung, Trocknung, Abdichtung und Kostenklarheit.',
      items: insights.map((item) => item.id)
    };
  }
  if (sectionKey === 'global.newsTeaser') {
    return {
      eyebrow: 'Ratgeber',
      headline: { plain: 'Aktuelles aus', accent: 'Schaden & Sanierung.' },
      intro:
        'Kurze Hinweise fuer Eigentuemer, Hausverwaltungen und Betriebe, die bei Wasserschaden, Feuchte oder Rissen schnell Orientierung brauchen.',
      limit: 4,
      items: news.map((item) => item.id),
      cta: { label: 'Alle Ratgeber lesen', link: { type: 'page', href: '/news' } }
    };
  }
  if (sectionKey === 'global.pageHeader') {
    const map: Record<string, Record<string, unknown>> = {
      services: {
        eyebrow: 'Leistungen',
        headline: { plain: 'Komplettservice', accent: 'bei Wasserschaeden.' },
        subline:
          'Soforthilfe, Leckortung, Trocknung, Abdichtung, Rissverpressung und Schadensmanagement mit Erfahrung aus Ingolstadt.',
        image: image.thermal
      },
      references: {
        eyebrow: 'Referenzen',
        headline: { plain: 'Schadenlagen', accent: 'aus der Praxis.' },
        subline:
          'Ausgewaehlte typische Einsatzbereiche: vom Leitungswasserschaden bis zur Kellerabdichtung und Sanierungskoordination.',
        image: image.drying
      },
      about: {
        eyebrow: 'Unternehmen',
        headline: { plain: 'Spezialisiert auf', accent: 'Wasserschaden.' },
        subline:
          'Seit Jahrzehnten konzentriert sich Schuldes auf Wasserschadenbeseitigung, Leckortung, Bautrocknung, Bauwerksabdichtung und Rissverpressung.',
        image: image.team
      },
      contact: {
        eyebrow: 'Kontakt',
        headline: { plain: 'Direkt anfragen,', accent: 'schnell klaeren.' },
        subline: 'Telefonisch erreichbar Montag bis Donnerstag 7:00 - 17:00 Uhr und Freitag 7:00 - 14:00 Uhr.',
        image: image.basement
      }
    };
    return map[pageKey] ?? fallback;
  }
  if (sectionKey === 'global.textImage' && pageKey === 'about') {
    return {
      eyebrow: 'Komplettservice-Prinzip',
      headline: { plain: 'Erfahrung,', accent: 'die entlastet.' },
      body:
        'Schuldes verbindet Fachkompetenz, moderne Verfahren und die Koordination notwendiger Sanierungsgewerke. Kunden erhalten einen Ansprechpartner fuer Analyse, Angebot, Ausfuehrung, Rechnungspruefung und Abstimmung mit Versicherern.',
      image: image.team,
      cta: { label: 'Kontakt aufnehmen', link: { type: 'page', href: '/kontakt' } }
    };
  }
  if (sectionKey === 'global.contactCta') {
    return {
      eyebrow: 'Naechster Schritt',
      headline: { plain: 'Schaden oder Projekt', accent: 'besprechen.' },
      subline:
        'Rufen Sie an oder senden Sie eine Anfrage. Fotos, Objektadresse und kurze Beschreibung helfen bei der ersten Einschaetzung.',
      cta: { label: 'Kontakt aufnehmen', link: { type: 'page', href: '/kontakt' } }
    };
  }
  if (sectionKey === 'global.mapContact') {
    return {
      eyebrow: 'Standort Ingolstadt',
      headline: { plain: 'Schuldes GmbH', accent: '& Co. KG.' },
      subline: 'Joseph-Baader-Strasse 1, 85053 Ingolstadt. Telefon: +49 841 951648-0.',
      primaryActionLabel: 'Anrufen',
      secondaryActionLabel: 'E-Mail schreiben',
      address: 'Joseph-Baader-Strasse 1, 85053 Ingolstadt',
      phone: '+49 841 951648-0',
      email: 'mail@schuldes-rainer.de',
      mapsUrl: 'https://www.openstreetmap.org/search?query=Joseph-Baader-Stra%C3%9Fe%201%2085053%20Ingolstadt',
      locations: [],
      arrival: [
        { title: 'Telefonisch erreichbar', body: 'Montag bis Donnerstag 7:00 - 17:00 Uhr, Freitag 7:00 - 14:00 Uhr.' },
        { title: 'Fuer Schadenfaelle', body: 'Bitte Objektadresse, Schadensart, Fotos und Rueckrufnummer bereithalten.' }
      ],
      openingHours: {
        monday: '07:00 - 17:00',
        tuesday: '07:00 - 17:00',
        wednesday: '07:00 - 17:00',
        thursday: '07:00 - 17:00',
        friday: '07:00 - 14:00'
      }
    };
  }
  return fallback;
}

function pageTitle(key: string): string {
  const map: Record<string, string> = {
    home: 'Startseite',
    services: 'Leistungen',
    references: 'Referenzen',
    about: 'Unternehmen',
    contact: 'Kontakt'
  };
  return map[key] ?? key;
}

function pageSlug(key: string): string {
  const map: Record<string, string> = {
    home: '/',
    services: '/leistungen',
    references: '/referenzen',
    about: '/betrieb',
    contact: '/kontakt'
  };
  return map[key] ?? `/${key}`;
}

function pageSeo(key: string): Record<string, unknown> {
  const map: Record<string, Record<string, unknown>> = {
    home: {
      title: 'Schuldes GmbH & Co. KG · Wasserschadenbeseitigung Ingolstadt',
      description:
        'Spezialist fuer Wasserschadenbeseitigung, Leckortung, Bautrocknung, Bauwerksabdichtung, Rissverpressung und Schadensmanagement in Ingolstadt.'
    },
    services: {
      title: 'Leistungen · Schuldes Ingolstadt',
      description:
        'Wasserschadenbeseitigung, Leckortung, Thermografie, Bautrocknung, Bauwerksabdichtung, Rissverpressung und Schadensmanagement.'
    },
    references: {
      title: 'Referenzen · Schuldes GmbH & Co. KG',
      description: 'Typische Schadenlagen und Sanierungsablaeufe aus Wasserschaden, Abdichtung, Trocknung und Leckortung.'
    },
    about: {
      title: 'Unternehmen · Schuldes GmbH & Co. KG',
      description: 'Spezialisierter Komplettservice fuer Wasserschaeden in Ingolstadt und der Region.'
    },
    contact: {
      title: 'Kontakt · Schuldes Ingolstadt',
      description: 'Schuldes GmbH & Co. KG, Joseph-Baader-Strasse 1, 85053 Ingolstadt, Telefon +49 841 951648-0.'
    }
  };
  return map[key] ?? {};
}

function collection(
  id: string,
  collectionKey: string,
  title: string,
  slug: string,
  data: Record<string, unknown>
): CollectionSeedItem {
  return {
    id,
    collectionKey,
    title,
    slug,
    data: {
      summary: '',
      image: '',
      ...data
    },
    seo: {
      title,
      description: typeof data.summary === 'string' ? data.summary : ''
    }
  };
}

function loadDotEnvLocal() {
  const file = resolve(process.cwd(), '.env.local');
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx <= 0) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
    if (!process.env[key]) process.env[key] = value;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
