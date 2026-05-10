import type { IndustryDefinition } from '../model';
import { field } from '../fields';
import { page, standardServiceCollection } from './helpers';

const globalAllowed = [
  'global.hero',
  'global.pageHeader',
  'global.actionBar',
  'global.textImage',
  'global.galleryGrid',
  'global.testimonials',
  'global.faq',
  'global.contactCta',
  'global.mapContact',
  'global.statsBand',
  'global.trustLogos',
  'global.bentoHighlights',
  'global.scrollerHighlights',
  'global.iconHighlights',
  'global.storyTimeline',
  'global.mediaSpotlight',
  'global.quoteMarquee',
  'global.asymmetricSpot',
  'global.pricingTiers',
  'global.ribbonCta',
  'global.keyFactsGrid',
  'global.videoEmbed',
  'global.pullQuote',
  'global.stepsStrip',
  'global.featureCompare'
] as const;

export const industries: readonly IndustryDefinition[] = [
  {
    key: 'restaurant',
    label: 'Restaurants',
    positioning: 'Reservierungen, Speisekarte, Atmosphäre und Vertrauen für Gastronomie.',
    corePages: [
      page('home', 'Startseite', '/', ['global.hero', 'global.actionBar', 'restaurant.menuHighlights', 'restaurant.diningExperiences', 'global.testimonials', 'global.contactCta'], [...globalAllowed, 'restaurant.menuHighlights', 'restaurant.diningExperiences']),
      page('menu', 'Speisekarte', '/speisekarte', ['global.pageHeader', 'restaurant.menuHighlights', 'global.contactCta'], [...globalAllowed, 'restaurant.menuHighlights', 'restaurant.diningExperiences']),
      page('experiences', 'Erlebnisse', '/erlebnisse', ['global.pageHeader', 'restaurant.diningExperiences', 'global.contactCta'], [...globalAllowed, 'restaurant.menuHighlights', 'restaurant.diningExperiences']),
      page('gallery', 'Galerie', '/galerie', ['global.pageHeader', 'global.galleryGrid', 'global.contactCta'], globalAllowed),
      page('about', 'Über uns', '/ueber-uns', ['global.pageHeader', 'global.textImage', 'global.testimonials'], globalAllowed),
      page('contact', 'Kontakt', '/kontakt', ['global.pageHeader', 'global.mapContact', 'global.contactCta'], [...globalAllowed, 'global.mapContact'])
    ],
    collections: [
      standardServiceCollection('restaurant', 'menuItem', 'Gerichte', '/speisekarte'),
      standardServiceCollection('restaurant', 'diningExperience', 'Erlebnisse', '/erlebnisse')
    ]
  },
  {
    key: 'hotel',
    label: 'Hotels',
    positioning: 'Zimmer, Buchungsimpulse, Ausstattung und Aufenthaltsgefühl.',
    corePages: [
      page('home', 'Startseite', '/', ['global.hero', 'hotel.roomHighlights', 'hotel.offers', 'global.testimonials', 'global.contactCta'], [...globalAllowed, 'hotel.roomHighlights', 'hotel.offers']),
      page('rooms', 'Zimmer', '/zimmer', ['global.pageHeader', 'hotel.roomHighlights', 'hotel.offers'], [...globalAllowed, 'hotel.roomHighlights', 'hotel.offers']),
      page('gallery', 'Galerie', '/galerie', ['global.pageHeader', 'global.galleryGrid'], globalAllowed),
      page('about', 'Haus', '/haus', ['global.pageHeader', 'global.textImage', 'global.testimonials'], globalAllowed),
      page('contact', 'Anreise & Kontakt', '/kontakt', ['global.pageHeader', 'global.mapContact', 'global.contactCta'], globalAllowed)
    ],
    collections: [
      standardServiceCollection('hotel', 'room', 'Zimmer', '/zimmer'),
      standardServiceCollection('hotel', 'hotelOffer', 'Angebote', '/angebote')
    ]
  },
  {
    key: 'tourism',
    label: 'Tourismus',
    positioning: 'Touren, Erlebnisse, Pakete und Buchungsentscheidungen.',
    corePages: [
      page('home', 'Startseite', '/', ['global.hero', 'tourism.tourHighlights', 'global.testimonials', 'global.contactCta'], [...globalAllowed, 'tourism.tourHighlights']),
      page('tours', 'Touren', '/touren', ['global.pageHeader', 'tourism.tourHighlights'], [...globalAllowed, 'tourism.tourHighlights']),
      page('gallery', 'Eindrücke', '/galerie', ['global.pageHeader', 'global.galleryGrid'], globalAllowed),
      page('about', 'Guides', '/guides', ['global.pageHeader', 'global.textImage'], globalAllowed),
      page('contact', 'Buchen', '/kontakt', ['global.pageHeader', 'global.mapContact', 'global.contactCta'], globalAllowed)
    ],
    collections: [standardServiceCollection('tourism', 'tour', 'Touren', '/touren')]
  },
  {
    key: 'salon',
    label: 'Salons',
    positioning: 'Treatments, Looks, Vertrauen, Team und Terminbuchung.',
    corePages: [
      page('home', 'Startseite', '/', ['global.hero', 'salon.treatmentHighlights', 'salon.lookbook', 'global.testimonials', 'global.contactCta'], [...globalAllowed, 'salon.treatmentHighlights', 'salon.lookbook']),
      page('services', 'Leistungen', '/leistungen', ['global.pageHeader', 'salon.treatmentHighlights'], [...globalAllowed, 'salon.treatmentHighlights', 'salon.lookbook']),
      page('gallery', 'Looks', '/looks', ['global.pageHeader', 'salon.lookbook', 'global.galleryGrid'], [...globalAllowed, 'salon.lookbook']),
      page('about', 'Studio', '/studio', ['global.pageHeader', 'global.textImage', 'global.testimonials'], globalAllowed),
      page('contact', 'Termin', '/kontakt', ['global.pageHeader', 'global.mapContact', 'global.contactCta'], globalAllowed)
    ],
    collections: [
      standardServiceCollection('salon', 'treatment', 'Leistungen', '/leistungen'),
      standardServiceCollection('salon', 'look', 'Looks', '/looks')
    ]
  },
  {
    key: 'tradesman',
    label: 'Handwerk',
    positioning: 'Leistungen, Referenzen, Vertrauen, Anfrage und regionale Nähe.',
    corePages: [
      page('home', 'Startseite', '/', ['global.hero', 'tradesman.serviceOverview', 'tradesman.references', 'global.contactCta'], [...globalAllowed, 'tradesman.serviceOverview', 'tradesman.references']),
      page('services', 'Leistungen', '/leistungen', ['global.pageHeader', 'tradesman.serviceOverview'], [...globalAllowed, 'tradesman.serviceOverview', 'tradesman.references']),
      page('references', 'Referenzen', '/referenzen', ['global.pageHeader', 'tradesman.references'], [...globalAllowed, 'tradesman.references']),
      page('about', 'Betrieb', '/betrieb', ['global.pageHeader', 'global.textImage'], globalAllowed),
      page('contact', 'Anfrage', '/kontakt', ['global.pageHeader', 'global.mapContact', 'global.contactCta'], globalAllowed)
    ],
    collections: [
      standardServiceCollection('tradesman', 'tradeService', 'Leistungen', '/leistungen'),
      standardServiceCollection('tradesman', 'referenceProject', 'Referenzen', '/referenzen')
    ]
  },
  {
    key: 'consulting',
    label: 'Beratungen',
    positioning: 'Angebote, Expertise, Cases, Prozesse und qualifizierte Erstgespräche.',
    corePages: [
      page('home', 'Startseite', '/', ['global.hero', 'consulting.offerOverview', 'consulting.caseStudies', 'global.contactCta'], [...globalAllowed, 'consulting.offerOverview', 'consulting.caseStudies']),
      page('services', 'Leistungen', '/leistungen', ['global.pageHeader', 'consulting.offerOverview'], [...globalAllowed, 'consulting.offerOverview', 'consulting.caseStudies']),
      page('cases', 'Cases', '/cases', ['global.pageHeader', 'consulting.caseStudies'], [...globalAllowed, 'consulting.caseStudies']),
      page('about', 'Expertise', '/expertise', ['global.pageHeader', 'global.textImage'], globalAllowed),
      page('contact', 'Kontakt', '/kontakt', ['global.pageHeader', 'global.mapContact', 'global.contactCta'], globalAllowed)
    ],
    collections: [
      standardServiceCollection('consulting', 'consultingService', 'Angebote', '/leistungen'),
      standardServiceCollection('consulting', 'caseStudy', 'Cases', '/cases')
    ]
  },
  {
    key: 'medical',
    label: 'Ärzte & Praxen',
    positioning: 'Behandlungen, Ärzteteam, Terminwege, Vertrauen und klare Patienteninformation.',
    corePages: [
      page('home', 'Startseite', '/', ['global.hero', 'medical.treatmentOverview', 'medical.doctorTeam', 'global.contactCta'], [...globalAllowed, 'medical.treatmentOverview', 'medical.doctorTeam']),
      page('services', 'Leistungen', '/leistungen', ['global.pageHeader', 'medical.treatmentOverview'], [...globalAllowed, 'medical.treatmentOverview', 'medical.doctorTeam']),
      page('team', 'Team', '/team', ['global.pageHeader', 'medical.doctorTeam'], [...globalAllowed, 'medical.doctorTeam']),
      page('about', 'Praxis', '/praxis', ['global.pageHeader', 'global.textImage'], globalAllowed),
      page('contact', 'Termin', '/kontakt', ['global.pageHeader', 'global.mapContact', 'global.contactCta'], globalAllowed)
    ],
    collections: [
      standardServiceCollection('medical', 'treatment', 'Behandlungen', '/leistungen'),
      standardServiceCollection('medical', 'doctor', 'Ärzteteam', '/team')
    ]
  },
  {
    key: 'fitness',
    label: 'Fitness & Studios',
    positioning: 'Kurse, Trainingsplan, Trainer, Mitgliedschaften und Probetraining.',
    corePages: [
      page('home', 'Startseite', '/', ['global.hero', 'fitness.classOverview', 'fitness.trainingPlan', 'fitness.trainerTeam', 'global.contactCta'], [...globalAllowed, 'fitness.classOverview', 'fitness.trainingPlan', 'fitness.trainerTeam']),
      page('classes', 'Kurse', '/kurse', ['global.pageHeader', 'fitness.classOverview', 'fitness.trainingPlan'], [...globalAllowed, 'fitness.classOverview', 'fitness.trainingPlan']),
      page('trainers', 'Trainer:innen', '/trainer', ['global.pageHeader', 'fitness.trainerTeam'], [...globalAllowed, 'fitness.trainerTeam']),
      page('about', 'Studio', '/studio', ['global.pageHeader', 'global.textImage'], globalAllowed),
      page('contact', 'Probetraining', '/kontakt', ['global.pageHeader', 'global.mapContact', 'global.contactCta'], globalAllowed)
    ],
    collections: [
      standardServiceCollection('fitness', 'fitnessClass', 'Kurse', '/kurse'),
      standardServiceCollection('fitness', 'trainer', 'Trainer:innen', '/trainer'),
      {
        key: 'scheduleItem',
        label: 'Trainingsplan',
        industry: 'fitness',
        slugPrefix: '/kurse',
        fields: [
          field.text('title', 'Kurs', { required: true }),
          field.text('slug', 'Slug', { required: true }),
          field.textarea('summary', 'Kurzbeschreibung', { required: true }),
          field.image('image', 'Bild'),
          field.text('weekday', 'Wochentag', { required: true }),
          field.text('time', 'Uhrzeit', { required: true }),
          field.text('level', 'Level'),
          field.text('trainer', 'Trainer:in')
        ],
        detailPage: {
          pathPattern: '/kurse/[slug]',
          allowedSections: [
            'global.pageHeader',
            'global.textImage',
            'global.contactCta',
            'global.statsBand',
            'global.trustLogos',
            'global.bentoHighlights'
          ],
          defaultSections: ['global.pageHeader', 'global.textImage', 'global.contactCta']
        }
      }
    ]
  },
  {
    key: 'wedding',
    label: 'Wedding',
    positioning: 'Hochzeitswebsite mit Ablauf, RSVP, Location, Unterkunft, FAQ und Story.',
    corePages: [
      page('home', 'Startseite', '/', ['global.hero', 'wedding.schedule', 'wedding.rsvp', 'global.galleryGrid'], [...globalAllowed, 'wedding.schedule', 'wedding.rsvp', 'wedding.accommodation']),
      page('schedule', 'Ablauf', '/ablauf', ['global.pageHeader', 'wedding.schedule'], [...globalAllowed, 'wedding.schedule']),
      page('location', 'Location', '/location', ['global.pageHeader', 'global.textImage', 'wedding.accommodation'], [...globalAllowed, 'wedding.accommodation']),
      page('rsvp', 'RSVP', '/rsvp', ['global.pageHeader', 'wedding.rsvp'], [...globalAllowed, 'wedding.rsvp']),
      page('faq', 'FAQ', '/faq', ['global.pageHeader', 'global.faq'], globalAllowed)
    ],
    collections: [
      standardServiceCollection('wedding', 'scheduleItem', 'Ablauf', '/ablauf'),
      standardServiceCollection('wedding', 'accommodation', 'Unterkünfte', '/unterkunft')
    ]
  }
];

export function getIndustryDefinition(key: string): IndustryDefinition | undefined {
  return industries.find((industry) => industry.key === key);
}
