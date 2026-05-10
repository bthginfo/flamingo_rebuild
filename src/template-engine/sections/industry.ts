import { field } from '../fields';
import type { IndustryKey, SectionDefinition } from '../model';

const allStyles = ['classic', 'modern', 'bold'] as const;

function collectionSection(
  key: string,
  label: string,
  industry: IndustryKey,
  collectionKey: string,
  itemLabel: string
): SectionDefinition {
  return {
    key,
    label,
    industries: [industry],
    styles: allStyles,
    allowedPageKinds: ['core', 'custom'],
    repeatable: true,
    fields: [
      field.text('eyebrow', 'Eyebrow'),
      field.splitHeading('headline', 'Ueberschrift', { required: true }),
      field.textarea('intro', 'Einleitung'),
      field.collectionList('items', itemLabel, collectionKey, { required: true })
    ]
  };
}

export const industrySections: readonly SectionDefinition[] = [
  collectionSection('restaurant.menuHighlights', 'Gerichte & Empfehlungen', 'restaurant', 'menuItem', 'Gerichte'),
  collectionSection('restaurant.diningExperiences', 'Erlebnisse & Events', 'restaurant', 'diningExperience', 'Erlebnisse'),
  collectionSection('restaurant.deepDives', 'Storys, Produzenten & Pairings', 'restaurant', 'restaurantInsight', 'Deep-Dives'),
  collectionSection('hotel.roomHighlights', 'Zimmer & Suiten', 'hotel', 'room', 'Zimmer'),
  collectionSection('hotel.offers', 'Angebote', 'hotel', 'hotelOffer', 'Angebote'),
  collectionSection('hotel.deepDives', 'Haus, Spa & Service-Details', 'hotel', 'hotelInsight', 'Deep-Dives'),
  collectionSection('tourism.tourHighlights', 'Touren & Pakete', 'tourism', 'tour', 'Touren'),
  collectionSection('tourism.deepDives', 'Guides, Sicherheit & Insiderwissen', 'tourism', 'tourismInsight', 'Deep-Dives'),
  collectionSection('salon.treatmentHighlights', 'Leistungen & Treatments', 'salon', 'treatment', 'Leistungen'),
  collectionSection('salon.lookbook', 'Looks & Ergebnisse', 'salon', 'look', 'Looks'),
  collectionSection('salon.deepDives', 'Beratung, Pflege & Studio-Rituale', 'salon', 'salonInsight', 'Deep-Dives'),
  collectionSection('tradesman.serviceOverview', 'Leistungen', 'tradesman', 'tradeService', 'Leistungen'),
  collectionSection('tradesman.references', 'Referenzen', 'tradesman', 'referenceProject', 'Referenzen'),
  collectionSection('tradesman.deepDives', 'Qualitaet, Ablauf & Materialwissen', 'tradesman', 'tradesmanInsight', 'Deep-Dives'),
  collectionSection('consulting.offerOverview', 'Beratungsangebote', 'consulting', 'consultingService', 'Angebote'),
  collectionSection('consulting.caseStudies', 'Cases', 'consulting', 'caseStudy', 'Cases'),
  collectionSection('consulting.deepDives', 'Methoden, Deliverables & Playbooks', 'consulting', 'consultingInsight', 'Deep-Dives'),
  collectionSection('medical.treatmentOverview', 'Behandlungen', 'medical', 'treatment', 'Behandlungen'),
  collectionSection('medical.doctorTeam', 'Aerzteteam', 'medical', 'doctor', 'Teammitglieder'),
  collectionSection('medical.deepDives', 'Patienteninfos, Diagnostik & Ablauf', 'medical', 'medicalInsight', 'Deep-Dives'),
  collectionSection('fitness.classOverview', 'Kurse & Programme', 'fitness', 'fitnessClass', 'Kurse'),
  collectionSection('fitness.trainingPlan', 'Trainingsplan', 'fitness', 'scheduleItem', 'Termine'),
  collectionSection('fitness.trainerTeam', 'Trainer:innen', 'fitness', 'trainer', 'Trainer:innen'),
  collectionSection('fitness.deepDives', 'Training, Community & Ziele', 'fitness', 'fitnessInsight', 'Deep-Dives'),
  collectionSection('wedding.schedule', 'Tagesablauf', 'wedding', 'scheduleItem', 'Programmpunkte'),
  collectionSection('wedding.accommodation', 'Unterkuenfte', 'wedding', 'accommodation', 'Unterkuenfte'),
  collectionSection('wedding.deepDives', 'Gaesteinfos, Plan B & Details', 'wedding', 'weddingInsight', 'Deep-Dives'),
  {
    key: 'wedding.rsvp',
    label: 'RSVP',
    industries: ['wedding'],
    styles: allStyles,
    allowedPageKinds: ['core', 'custom'],
    fields: [
      field.text('eyebrow', 'Eyebrow'),
      field.splitHeading('headline', 'Ueberschrift'),
      field.textarea('intro', 'Einleitung'),
      field.text('deadlineLabel', 'Antwortfrist'),
      field.cta('cta', 'RSVP Button')
    ]
  }
];
