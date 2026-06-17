export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  perfumePrice50ml: number;
  perfumePrice100ml: number;
  oilPrice6ml: number;
  oilPrice12ml: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 'jasmine',
    name: 'Jasmine',
    image: '/products/jasmine_oil.png',
    description: 'A beautiful and natural floral aroma that feels fresh and elegant. The fragrance lasts for hours without being overpowering.',
    perfumePrice50ml: 2590,
    perfumePrice100ml: 3990,
    oilPrice6ml: 569,
    oilPrice12ml: 990
  },
  {
    id: 'al-zaf',
    name: 'AL-ZAF',
    image: '/products/al_zaf.png',
    description: 'Deep, rich woody notes combined with amber and sweet musk. A truly mesmerizing experience.',
    perfumePrice50ml: 2390,
    perfumePrice100ml: 3790,
    oilPrice6ml: 520,
    oilPrice12ml: 890
  },
  {
    id: 'al-haroon',
    name: 'Al Harun V1',
    image: '/products/al_haroon.png',
    description: 'An exotic, spicy blend with hints of saffron, precious oud, and warm vanilla.',
    perfumePrice50ml: 2990,
    perfumePrice100ml: 4490,
    oilPrice6ml: 710,
    oilPrice12ml: 1250
  },
  {
    id: 'latafa-khamrah',
    name: 'Lattafa Khamrah V1',
    image: '/products/latafa_khamrah.png',
    description: 'Warm, sweet, and comforting with cinnamon, praline, dates, and rich wood tones.',
    perfumePrice50ml: 3090,
    perfumePrice100ml: 4690,
    oilPrice6ml: 729,
    oilPrice12ml: 1290
  },
  {
    id: 'almarziyah',
    name: 'Al Marziyah',
    image: '/products/almarziyah.png',
    description: 'A sophisticated combination of rich floral scents, warm vanilla, and smooth white musk.',
    perfumePrice50ml: 2890,
    perfumePrice100ml: 4390,
    oilPrice6ml: 680,
    oilPrice12ml: 1190
  },
  {
    id: 'althair-vanilla',
    name: 'Althair vanilla',
    image: '/products/althair_vanilla.png',
    description: 'A warm vanilla composition combined with soft spice and amber undertones. Cozy and seductive.',
    perfumePrice50ml: 2790,
    perfumePrice100ml: 4190,
    oilPrice6ml: 629,
    oilPrice12ml: 1090
  },
  {
    id: 'delighted-dior',
    name: 'delighted dior',
    image: '/products/delighted_dior.png',
    description: 'An elegant and light floral fragrance inspired by Dior, balancing sweetness and freshness.',
    perfumePrice50ml: 2690,
    perfumePrice100ml: 3990,
    oilPrice6ml: 579,
    oilPrice12ml: 990
  },
  {
    id: 'erba-pura',
    name: 'erba pura',
    image: '/products/erba_pura.png',
    description: 'A fresh, fruity, citrus-forward fragrance with a warm amber and musk base.',
    perfumePrice50ml: 2290,
    perfumePrice100ml: 3490,
    oilPrice6ml: 509,
    oilPrice12ml: 890
  },
  {
    id: 'pistachio-gelato',
    name: 'PISTACHIO GELATO',
    image: '/products/pistachio_gelato.png',
    description: 'A sweet, creamy scent with notes of pistachio, whipped cream, and vanilla.',
    perfumePrice50ml: 2590,
    perfumePrice100ml: 3990,
    oilPrice6ml: 569,
    oilPrice12ml: 990
  },
  {
    id: 'almarj',
    name: 'ALMARJ',
    image: '/products/almarj.png',
    description: 'A premium, bold signature fragrance featuring rich woody accords and exotic spices.',
    perfumePrice50ml: 2750,
    perfumePrice100ml: 4150,
    oilPrice6ml: 620,
    oilPrice12ml: 1090
  }
];

export function getProductById(id: string): Product | undefined {
  // Try direct match or fuzzy matching for minor ID discrepancies
  const normalizedId = id.toLowerCase().replace(/[^a-z0-9]/g, '');
  return PRODUCTS.find(p => {
    const normalizedPid = p.id.toLowerCase().replace(/[^a-z0-9]/g, '');
    // Allow matching al-harun to al-haroon, etc.
    return normalizedPid === normalizedId || 
           (normalizedId.includes('harun') && normalizedPid.includes('harun')) ||
           (normalizedId.includes('haroon') && normalizedPid.includes('harun')) ||
           (normalizedId.includes('khamrah') && normalizedPid.includes('khamrah')) ||
           (normalizedId.includes('marziyah') && normalizedPid.includes('marziyah'));
  });
}
