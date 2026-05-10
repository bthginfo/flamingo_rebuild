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

import { applyWowToSeed } from './wow-inject';
import { deepenDemoSeed } from './content-depth';

export function getDemoSeed(industryKey: IndustryKey, styleKey: StyleKey): SiteSeed | undefined {
  let seed: SiteSeed | undefined;
  if (industryKey === 'restaurant') seed = restaurantSeed(styleKey);
  else if (industryKey === 'hotel') seed = hotelSeed(styleKey);
  else if (industryKey === 'tourism') seed = tourismSeed(styleKey);
  else if (industryKey === 'salon') seed = salonSeed(styleKey);
  else if (industryKey === 'tradesman') seed = tradesmanSeed(styleKey);
  else if (industryKey === 'consulting') seed = consultingSeed(styleKey);
  else if (industryKey === 'medical') seed = medicalSeed(styleKey);
  else if (industryKey === 'fitness') seed = fitnessSeed(styleKey);
  else if (industryKey === 'wedding') seed = weddingSeed(styleKey);
  return seed ? applyWowToSeed(deepenDemoSeed(seed)) : undefined;
}
