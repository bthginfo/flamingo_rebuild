import type { StyleDefinition } from './model';

export const styles: readonly StyleDefinition[] = [
  {
    key: 'classic',
    label: 'Classic',
    character: 'Elegant, vertrauensvoll, zeitlos und redaktionell.',
    tokens: {
      fontPairing: 'editorial-serif',
      density: 'balanced',
      imageTreatment: 'warm editorial photography',
      cardTreatment: 'soft borders, restrained shadow',
      ctaTreatment: 'calm pill buttons'
    }
  },
  {
    key: 'modern',
    label: 'Modern',
    character: 'Minimal, hochwertig, klar strukturiert und großzügig.',
    tokens: {
      fontPairing: 'clean sans with refined display',
      density: 'airy',
      imageTreatment: 'precise crops and whitespace',
      cardTreatment: 'flat surfaces, strong alignment',
      ctaTreatment: 'crisp geometric buttons'
    }
  },
  {
    key: 'bold',
    label: 'Bold',
    character: 'Ausdrucksstark, kontrastreich, typografisch und merkfähig.',
    tokens: {
      fontPairing: 'high contrast display plus utilitarian sans',
      density: 'compact',
      imageTreatment: 'large crops, overlays, high contrast',
      cardTreatment: 'strong borders and expressive rhythm',
      ctaTreatment: 'high emphasis buttons'
    }
  }
];
