import type { IndustryKey, StyleKey } from '../model';
import type { SiteSeed } from './model';
import { consultingSeed } from './consulting';
import { fitnessSeed } from './fitness';
import { hotelSeed } from './hotel';
import { medicalSeed } from './medical';
import { restaurantSeed } from './restaurant';
import { salonSeed } from './salon';
import { tourismSeed } from './tourism';
import { tradesmanSeed } from './tradesman';
import { weddingSeed } from './wedding';

export function getDemoSeed(industryKey: IndustryKey, styleKey: StyleKey): SiteSeed | undefined {
  if (industryKey === 'restaurant') return restaurantSeed(styleKey);
  if (industryKey === 'hotel') return hotelSeed(styleKey);
  if (industryKey === 'tourism') return tourismSeed(styleKey);
  if (industryKey === 'salon') return salonSeed(styleKey);
  if (industryKey === 'tradesman') return tradesmanSeed(styleKey);
  if (industryKey === 'consulting') return consultingSeed(styleKey);
  if (industryKey === 'medical') return medicalSeed(styleKey);
  if (industryKey === 'fitness') return fitnessSeed(styleKey);
  if (industryKey === 'wedding') return weddingSeed(styleKey);
  return undefined;
}
