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
      field.splitHeading('headline', 'Überschrift', { required: true }),
      field.textarea('intro', 'Einleitung'),
      field.collectionList('items', itemLabel, collectionKey, { required: true })
    ]
  };
}

export const industrySections: readonly SectionDefinition[] = [
  collectionSection('restaurant.menuHighlights', 'Gerichte & Empfehlungen', 'restaurant', 'menuItem', 'Gerichte'),
  collectionSection('restaurant.diningExperiences', 'Erlebnisse & Events', 'restaurant', 'diningExperience', 'Erlebnisse'),
  collectionSection('hotel.roomHighlights', 'Zimmer & Suiten', 'hotel', 'room', 'Zimmer'),
  collectionSection('hotel.offers', 'Angebote', 'hotel', 'hotelOffer', 'Angebote'),
  collectionSection('tourism.tourHighlights', 'Touren & Pakete', 'tourism', 'tour', 'Touren'),
  collectionSection('salon.treatmentHighlights', 'Leistungen & Treatments', 'salon', 'treatment', 'Leistungen'),
  collectionSection('salon.lookbook', 'Looks & Ergebnisse', 'salon', 'look', 'Looks'),
  collectionSection('tradesman.serviceOverview', 'Leistungen', 'tradesman', 'tradeService', 'Leistungen'),
  collectionSection('tradesman.references', 'Referenzen', 'tradesman', 'referenceProject', 'Referenzen'),
  collectionSection('consulting.offerOverview', 'Beratungsangebote', 'consulting', 'consultingService', 'Angebote'),
  collectionSection('consulting.caseStudies', 'Cases', 'consulting', 'caseStudy', 'Cases'),
  collectionSection('medical.treatmentOverview', 'Behandlungen', 'medical', 'treatment', 'Behandlungen'),
  collectionSection('medical.doctorTeam', 'Ärzteteam', 'medical', 'doctor', 'Teammitglieder'),
  collectionSection('fitness.classOverview', 'Kurse & Programme', 'fitness', 'fitnessClass', 'Kurse'),
  collectionSection('fitness.trainingPlan', 'Trainingsplan', 'fitness', 'scheduleItem', 'Termine'),
  collectionSection('fitness.trainerTeam', 'Trainer:innen', 'fitness', 'trainer', 'Trainer:innen'),
  collectionSection('wedding.schedule', 'Tagesablauf', 'wedding', 'scheduleItem', 'Programmpunkte'),
  collectionSection('wedding.accommodation', 'Unterkünfte', 'wedding', 'accommodation', 'Unterkünfte'),
  {
    key: 'wedding.rsvp',
    label: 'RSVP',
    industries: ['wedding'],
    styles: allStyles,
    allowedPageKinds: ['core', 'custom'],
    fields: [
      field.text('eyebrow', 'Eyebrow'),
      field.splitHeading('headline', 'Überschrift'),
      field.textarea('intro', 'Einleitung'),
      field.text('deadlineLabel', 'Antwortfrist'),
      field.cta('cta', 'RSVP Button')
    ]
  }
];
