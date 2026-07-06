export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  perfumePrice50ml: number;
  perfumePrice100ml: number;
  oilPrice6ml: number;
  oilPrice12ml: number;
  family: 'Floral' | 'Woody' | 'Sweet' | 'Spicy' | 'Citrus' | 'Fresh';
  gender: 'Unisex' | 'Men' | 'Women';
  tags: ('Best Seller' | 'New Arrival' | 'Signature')[];
  notes: {
    top: string;
    heart: string;
    base: string;
  };
  performance: {
    longevity: string;
    projection: string;
  };
  bestFor: {
    time: string[];
    seasons: string[];
    occasions: string[];
  };
}

export const PRODUCTS: Product[] = [
  {
    id: 'jasmine',
    name: 'Jasmine Signature',
    image: '/products/jasmine_oil.png',
    description: 'A beautiful and natural floral aroma that feels fresh and elegant. The fragrance lasts for hours without being overpowering.',
    perfumePrice50ml: 2590,
    perfumePrice100ml: 3990,
    oilPrice6ml: 569,
    oilPrice12ml: 990,
    family: 'Floral',
    gender: 'Unisex',
    tags: ['Best Seller', 'Signature'],
    notes: {
      top: 'Fresh Cut Green Leaves, Dewy Morning Breeze',
      heart: 'Royal Jasmine Sambac, White Gardenia',
      base: 'Soft White Musk, Warm Sandalwood'
    },
    performance: {
      longevity: 'Long-lasting (8-10 hours)',
      projection: 'Moderate'
    },
    bestFor: {
      time: ['Day', 'Night'],
      seasons: ['Spring', 'Summer'],
      occasions: ['Daily Wear', 'Special Events']
    }
  },
  {
    id: 'al-zaf',
    name: 'Al-Zaf Royal',
    image: '/products/al_zaf.png',
    description: 'Deep, rich woody notes combined with amber and sweet musk. A truly mesmerizing experience.',
    perfumePrice50ml: 2390,
    perfumePrice100ml: 3790,
    oilPrice6ml: 520,
    oilPrice12ml: 890,
    family: 'Woody',
    gender: 'Unisex',
    tags: ['Best Seller'],
    notes: {
      top: 'Bergamot, Warm Cardamom',
      heart: 'Agarwood (Oud), Cedarwood, Bulgarian Rose',
      base: 'Rich Amber, Sweet Musk, Vetiver'
    },
    performance: {
      longevity: 'Long-lasting (10+ hours)',
      projection: 'Strong (fills room)'
    },
    bestFor: {
      time: ['Night'],
      seasons: ['Autumn', 'Winter'],
      occasions: ['Evening Wear', 'Special Events']
    }
  },
  {
    id: 'al-haroon',
    name: 'Al Harun Signature Edition',
    image: '/products/al_haroon.png',
    description: 'An exotic, spicy blend with hints of saffron, precious oud, and warm vanilla.',
    perfumePrice50ml: 2990,
    perfumePrice100ml: 4490,
    oilPrice6ml: 710,
    oilPrice12ml: 1250,
    family: 'Spicy',
    gender: 'Men',
    tags: ['Signature', 'Best Seller'],
    notes: {
      top: 'Precious Saffron, Black Pepper',
      heart: 'Nutmeg, Lavender, Patchouli',
      base: 'Pure Oud, Dry Amber, Madagascar Vanilla'
    },
    performance: {
      longevity: 'Very Long-lasting (12+ hours)',
      projection: 'Strong'
    },
    bestFor: {
      time: ['Night'],
      seasons: ['Autumn', 'Winter'],
      occasions: ['Professional Setting', 'Special Events']
    }
  },
  {
    id: 'latafa-khamrah',
    name: 'Khamrah Collection',
    image: '/products/latafa_khamrah.png',
    description: 'Warm, sweet, and comforting with cinnamon, praline, dates, and rich wood tones.',
    perfumePrice50ml: 3090,
    perfumePrice100ml: 4690,
    oilPrice6ml: 729,
    oilPrice12ml: 1290,
    family: 'Sweet',
    gender: 'Unisex',
    tags: ['Best Seller'],
    notes: {
      top: 'Cinnamon, Nutmeg, Bergamot',
      heart: 'Praline, Dates, Tuberose, Mahonial',
      base: 'Vanilla, Tonka Bean, Benzoin, Amberwood, Myrrh'
    },
    performance: {
      longevity: 'Very Long-lasting (12+ hours)',
      projection: 'Strong'
    },
    bestFor: {
      time: ['Night'],
      seasons: ['Autumn', 'Winter'],
      occasions: ['Date Night', 'Evening Wear']
    }
  },
  {
    id: 'almarziyah',
    name: 'Al Marziyah',
    image: '/products/almarziyah.png',
    description: 'A sophisticated combination of rich floral scents, warm vanilla, and smooth white musk.',
    perfumePrice50ml: 2890,
    perfumePrice100ml: 4390,
    oilPrice6ml: 680,
    oilPrice12ml: 1190,
    family: 'Floral',
    gender: 'Women',
    tags: ['Signature'],
    notes: {
      top: 'Sweet Blossom, Honey',
      heart: 'Rose, White Jasmine, Vanilla Orchid',
      base: 'White Musk, Cashmere Wood, Warm Amber'
    },
    performance: {
      longevity: 'Long-lasting (8-10 hours)',
      projection: 'Moderate'
    },
    bestFor: {
      time: ['Day'],
      seasons: ['Spring', 'Summer'],
      occasions: ['Daily Wear', 'Professional Setting']
    }
  },
  {
    id: 'althair-vanilla',
    name: 'Althair Vanilla',
    image: '/products/althair_vanilla.png',
    description: 'A warm vanilla composition combined with soft spice and amber undertones. Cozy and seductive.',
    perfumePrice50ml: 2790,
    perfumePrice100ml: 4190,
    oilPrice6ml: 629,
    oilPrice12ml: 1090,
    family: 'Sweet',
    gender: 'Unisex',
    tags: ['New Arrival'],
    notes: {
      top: 'Orange Blossom, Bergamot, Cinnamon',
      heart: 'Bourbon Vanilla, Elemi Resin',
      base: 'Guaiac Wood, Musk, Praline'
    },
    performance: {
      longevity: 'Long-lasting (10+ hours)',
      projection: 'Moderate to Strong'
    },
    bestFor: {
      time: ['Night'],
      seasons: ['Autumn', 'Winter'],
      occasions: ['Date Night', 'Evening Wear']
    }
  },
  {
    id: 'delighted-dior',
    name: 'Delighted Dior',
    image: '/products/delighted_dior_v2.png',
    description: 'An elegant and light floral fragrance inspired by Dior, balancing sweetness and freshness.',
    perfumePrice50ml: 2690,
    perfumePrice100ml: 3990,
    oilPrice6ml: 579,
    oilPrice12ml: 990,
    family: 'Fresh',
    gender: 'Women',
    tags: ['Best Seller'],
    notes: {
      top: 'Calabrian Bergamot, Mandarin Orange',
      heart: 'Grasse Rose, Damascus Rose, Peony',
      base: 'White Musk, Rosewood'
    },
    performance: {
      longevity: 'Moderate (6-8 hours)',
      projection: 'Moderate'
    },
    bestFor: {
      time: ['Day'],
      seasons: ['Spring'],
      occasions: ['Daily Wear', 'Professional Setting']
    }
  },
  {
    id: 'erba-pura',
    name: 'Erba Pura',
    image: '/products/erba_pura.png',
    description: 'A fresh, fruity, citrus-forward fragrance with a warm amber and musk base.',
    perfumePrice50ml: 2290,
    perfumePrice100ml: 3490,
    oilPrice6ml: 509,
    oilPrice12ml: 890,
    family: 'Citrus',
    gender: 'Unisex',
    tags: ['New Arrival'],
    notes: {
      top: 'Sicilian Orange, Sicilian Lemon, Calabrian Bergamot',
      heart: 'Warm Mediterranean Fruits',
      base: 'White Musk, Amber, Madagascar Vanilla'
    },
    performance: {
      longevity: 'Very Long-lasting (12+ hours)',
      projection: 'Strong (fills room)'
    },
    bestFor: {
      time: ['Day'],
      seasons: ['Summer'],
      occasions: ['Daily Wear', 'Relaxing at Home']
    }
  },
  {
    id: 'pistachio-gelato',
    name: 'Pistachio Gelato',
    image: '/products/pistachio_gelato.png',
    description: 'A sweet, creamy scent with notes of pistachio, whipped cream, and vanilla.',
    perfumePrice50ml: 2590,
    perfumePrice100ml: 3990,
    oilPrice6ml: 569,
    oilPrice12ml: 990,
    family: 'Sweet',
    gender: 'Unisex',
    tags: ['New Arrival'],
    notes: {
      top: 'Pistachio, Hazelnut, Italian Bergamot, Cardamom',
      heart: 'Lily-of-the-Valley, White Jasmine, Raspberry, Peach',
      base: 'Whipped Cream, Sweet Marshmallow, Cotton Candy, Sandalwood'
    },
    performance: {
      longevity: 'Long-lasting (8-10 hours)',
      projection: 'Moderate'
    },
    bestFor: {
      time: ['Day'],
      seasons: ['Spring', 'Summer'],
      occasions: ['Daily Wear', 'Relaxing at Home']
    }
  },
  {
    id: 'almarj',
    name: 'Al Marj',
    image: '/products/almarj.png',
    description: 'A premium, bold signature fragrance featuring rich woody accords and exotic spices.',
    perfumePrice50ml: 2750,
    perfumePrice100ml: 4150,
    oilPrice6ml: 620,
    oilPrice12ml: 1090,
    family: 'Woody',
    gender: 'Unisex',
    tags: ['Signature', 'New Arrival'],
    notes: {
      top: 'Spicy Saffron, Royal Jasmine',
      heart: 'Amberwood, Mineral Ambergris',
      base: 'Fir Resin, Cedarwood'
    },
    performance: {
      longevity: 'Very Long-lasting (12+ hours)',
      projection: 'Strong'
    },
    bestFor: {
      time: ['Night'],
      seasons: ['Winter', 'Autumn'],
      occasions: ['Evening Wear', 'Special Events']
    }
  }
];

export function getProductById(id: string): Product | undefined {
  const normalizedId = id.toLowerCase().replace(/[^a-z0-9]/g, '');
  return PRODUCTS.find(p => {
    const normalizedPid = p.id.toLowerCase().replace(/[^a-z0-9]/g, '');
    return normalizedPid === normalizedId || 
           (normalizedId.includes('harun') && normalizedPid.includes('harun')) ||
           (normalizedId.includes('haroon') && normalizedPid.includes('harun')) ||
           (normalizedId.includes('khamrah') && normalizedPid.includes('khamrah')) ||
           (normalizedId.includes('marziyah') && normalizedPid.includes('marziyah'));
  });
}
