import { field } from '../fields';
import type { CollectionDefinition, IndustryKey, PageDefinition } from '../model';

export function page(
  key: string,
  label: string,
  defaultSlug: string,
  defaultSections: readonly string[],
  allowedSections: readonly string[] = defaultSections
): PageDefinition {
  return {
    key,
    label,
    kind: 'core',
    defaultSlug,
    required: true,
    allowedSections,
    defaultSections
  };
}

export function standardServiceCollection(
  industry: IndustryKey,
  key: string,
  label: string,
  slugPrefix: string
): CollectionDefinition {
  const extraFields = extraCollectionFields(industry, key);
  return {
    key,
    label,
    industry,
    slugPrefix,
    fields: [
      field.text('title', 'Titel', { required: true }),
      field.text('slug', 'Slug', { required: true }),
      field.textarea('summary', 'Kurzbeschreibung', { required: true }),
      field.richText('description', 'Beschreibung'),
      field.image('image', 'Bild'),
      ...extraFields,
      field.cta('cta', 'Button'),
      field.seo()
    ],
    detailPage: {
      pathPattern: `${slugPrefix}/[slug]`,
      allowedSections: [
        'global.pageHeader',
        'global.textImage',
        'global.galleryGrid',
        'global.faq',
        'global.contactCta',
        'global.statsBand',
        'global.trustLogos',
        'global.bentoHighlights',
        'global.iconHighlights',
        'global.storyTimeline',
        'global.mediaSpotlight',
        'global.quoteMarquee',
        'global.keyFactsGrid',
        'global.videoEmbed',
        'global.stepsStrip'
      ],
      defaultSections: ['global.pageHeader', 'global.textImage', 'global.contactCta']
    }
  };
}

function textListField(key: string, label: string) {
  return field.repeater(key, label, [field.text('value', 'Eintrag')]);
}

function extraCollectionFields(industry: IndustryKey, key: string) {
  if (industry === 'restaurant' && key === 'menuItem') {
    return [
      field.text('category', 'Kategorie'),
      field.text('price', 'Preis'),
      textListField('ingredients', 'Zutaten'),
      field.textarea('allergens', 'Allergene / Hinweise'),
      field.textarea('dietaryTags', 'Ernaehrungs-Tags'),
      field.text('pairingRecommendation', 'Pairing-Empfehlung'),
      field.url('videoUrl', 'Video-URL')
    ];
  }
  if (industry === 'restaurant' && key === 'diningExperience') {
    return [
      field.text('duration', 'Dauer'),
      field.text('price', 'Preis'),
      field.text('capacity', 'Kapazitaet'),
      field.textarea('scheduleInfo', 'Ablauf / Termine'),
      textListField('included', 'Inklusive'),
      field.url('videoUrl', 'Video-URL')
    ];
  }
  if (industry === 'hotel' && key === 'room') {
    return [
      field.gallery('images', 'Zimmergalerie'),
      field.text('sizeSqm', 'Groesse in qm'),
      field.text('occupancy', 'Belegung'),
      field.text('bedType', 'Bettentyp'),
      field.text('view', 'Ausblick'),
      field.text('priceFrom', 'Preis ab'),
      textListField('amenities', 'Ausstattung'),
      field.url('videoUrl', 'Video-URL')
    ];
  }
  if (industry === 'hotel' && key === 'hotelOffer') {
    return [
      field.text('travelPeriod', 'Reisezeitraum'),
      field.text('priceFrom', 'Preis ab'),
      textListField('included', 'Inklusive'),
      field.url('videoUrl', 'Video-URL')
    ];
  }
  if (industry === 'tourism' && key === 'tour') {
    return [
      field.text('duration', 'Dauer'),
      field.text('distance', 'Distanz'),
      field.text('elevationGain', 'Hoehenmeter'),
      field.text('difficulty', 'Schwierigkeit'),
      field.text('season', 'Saison'),
      field.text('price', 'Preis'),
      field.text('meetingPoint', 'Treffpunkt'),
      textListField('included', 'Inklusive'),
      textListField('requirements', 'Voraussetzungen'),
      textListField('packingList', 'Packliste'),
      field.url('videoUrl', 'Video-URL')
    ];
  }
  if (industry === 'salon' && key === 'treatment') {
    return [
      field.text('category', 'Kategorie'),
      field.text('duration', 'Dauer'),
      field.text('priceFrom', 'Preis ab'),
      field.textarea('preparation', 'Vorbereitung'),
      field.textarea('aftercare', 'Pflege danach'),
      field.url('videoUrl', 'Video-URL')
    ];
  }
  if (industry === 'salon' && key === 'look') {
    return [
      field.gallery('images', 'Look-Galerie'),
      field.textarea('styleTags', 'Style-Tags'),
      field.textarea('relatedServices', 'Passende Leistungen'),
      field.url('videoUrl', 'Video-URL')
    ];
  }
  if (industry === 'tradesman' && key === 'tradeService') {
    return [
      field.textarea('problemStatement', 'Typisches Problem'),
      field.textarea('solutionSummary', 'Loesungsansatz'),
      field.textarea('serviceArea', 'Einsatzgebiet'),
      field.url('videoUrl', 'Video-URL')
    ];
  }
  if (industry === 'tradesman' && key === 'referenceProject') {
    return [
      field.gallery('images', 'Projektbilder'),
      field.text('location', 'Ort'),
      field.text('projectType', 'Projektart'),
      field.text('duration', 'Dauer'),
      field.textarea('servicesIncluded', 'Umgesetzte Leistungen'),
      field.textarea('customerQuote', 'Kundenstimme'),
      field.url('videoUrl', 'Video-URL')
    ];
  }
  if (industry === 'consulting' && key === 'consultingService') {
    return [
      field.text('targetAudience', 'Zielgruppe'),
      field.textarea('problemTypes', 'Problemfelder'),
      textListField('deliverables', 'Deliverables'),
      field.text('duration', 'Dauer / Format')
    ];
  }
  if (industry === 'consulting' && key === 'caseStudy') {
    return [
      field.text('industry', 'Branche'),
      field.textarea('challenge', 'Ausgangslage'),
      field.richText('approach', 'Vorgehen'),
      field.richText('results', 'Ergebnisse'),
      field.repeater('metrics', 'Kennzahlen', [field.text('label', 'Label'), field.text('value', 'Wert')]),
      field.textarea('testimonial', 'Kundenstimme'),
      field.url('videoUrl', 'Video-URL')
    ];
  }
  if (industry === 'medical' && key === 'treatment') {
    return [
      textListField('indications', 'Indikationen'),
      field.richText('procedure', 'Ablauf'),
      field.textarea('preparation', 'Vorbereitung'),
      field.textarea('aftercare', 'Nachsorge'),
      field.text('coveredByInsurance', 'Kasse / Privat'),
      field.text('duration', 'Dauer'),
      field.url('videoUrl', 'Video-URL')
    ];
  }
  if (industry === 'medical' && key === 'doctor') {
    return [
      field.text('role', 'Rolle'),
      textListField('specialties', 'Schwerpunkte'),
      field.richText('bio', 'Biografie'),
      field.textarea('languages', 'Sprachen'),
      field.textarea('consultationHours', 'Sprechzeiten'),
      field.url('videoUrl', 'Video-URL')
    ];
  }
  if (industry === 'fitness' && key === 'fitnessClass') {
    return [
      field.text('category', 'Kategorie'),
      field.text('level', 'Level'),
      field.text('duration', 'Dauer'),
      field.textarea('schedule', 'Termine'),
      textListField('goals', 'Trainingsziele'),
      textListField('equipmentNeeded', 'Equipment'),
      field.url('videoUrl', 'Video-URL')
    ];
  }
  if (industry === 'fitness' && key === 'trainer') {
    return [
      field.text('role', 'Rolle'),
      textListField('specialties', 'Schwerpunkte'),
      field.richText('bio', 'Biografie'),
      field.textarea('certifications', 'Zertifikate'),
      field.url('videoUrl', 'Video-URL')
    ];
  }
  if (industry === 'wedding' && key === 'scheduleItem') {
    return [
      field.text('time', 'Uhrzeit'),
      field.text('location', 'Ort'),
      field.textarea('guestNote', 'Hinweis fuer Gaeste'),
      field.url('videoUrl', 'Video-URL')
    ];
  }
  if (industry === 'wedding' && key === 'accommodation') {
    return [
      field.text('location', 'Ort'),
      field.text('priceFrom', 'Preis ab'),
      field.text('distance', 'Entfernung'),
      field.textarea('bookingHint', 'Buchungshinweis'),
      field.url('mapsUrl', 'Google-Maps-Link'),
      field.url('videoUrl', 'Video-URL')
    ];
  }
  return [];
}

export function premiumContentCollection(
  industry: IndustryKey,
  key: string,
  label: string,
  slugPrefix: string
): CollectionDefinition {
  return {
    key,
    label,
    industry,
    slugPrefix,
    fields: [
      field.text('title', 'Titel', { required: true }),
      field.text('slug', 'Slug', { required: true }),
      field.textarea('summary', 'Kurzbeschreibung', { required: true }),
      field.richText('description', 'Beschreibung'),
      field.image('image', 'Bild'),
      field.text('kicker', 'Kicker'),
      field.text('metric', 'Kennzahl / Signal'),
      field.text('detail', 'Detailzeile'),
      field.cta('cta', 'Button'),
      field.seo()
    ],
    detailPage: {
      pathPattern: `${slugPrefix}/[slug]`,
      allowedSections: [
        'global.pageHeader',
        'global.textImage',
        'global.galleryGrid',
        'global.faq',
        'global.contactCta',
        'global.statsBand',
        'global.bentoHighlights',
        'global.iconHighlights',
        'global.storyTimeline',
        'global.mediaSpotlight',
        'global.quoteMarquee',
        'global.keyFactsGrid',
        'global.stepsStrip',
        'global.videoEmbed'
      ],
      defaultSections: ['global.pageHeader', 'global.textImage', 'global.contactCta']
    }
  };
}

export function newsArticleCollection(industry: IndustryKey): CollectionDefinition {
  return {
    key: 'newsArticle',
    label: 'News & Blog',
    industry,
    slugPrefix: '/news',
    fields: [
      field.text('title', 'Titel', { required: true }),
      field.text('slug', 'Slug', { required: true }),
      field.textarea('summary', 'Kurzbeschreibung', { required: true }),
      field.richText('description', 'Artikeltext'),
      field.image('image', 'Titelbild'),
      field.text('category', 'Kategorie'),
      { key: 'publishedAt', label: 'Datum', type: 'date' },
      field.text('author', 'Autor:in'),
      field.text('readTime', 'Lesezeit'),
      field.cta('cta', 'Button'),
      field.seo()
    ],
    detailPage: {
      pathPattern: '/news/[slug]',
      allowedSections: [
        'global.pageHeader',
        'global.textImage',
        'global.galleryGrid',
        'global.faq',
        'global.contactCta',
        'global.statsBand',
        'global.bentoHighlights',
        'global.iconHighlights',
        'global.storyTimeline',
        'global.mediaSpotlight',
        'global.quoteMarquee',
        'global.keyFactsGrid',
        'global.pullQuote',
        'global.videoEmbed'
      ],
      defaultSections: ['global.pageHeader', 'global.textImage', 'global.contactCta']
    }
  };
}
