export interface Product {
  id: string;
  name: string;
  subtitle?: string;
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
    id: 'al-zaf',
    name: 'AL-ZAF',
    subtitle: '(The Natural Simple Fusion)',
    image: '/products/al_zaf.png',
    description: "A beautiful blend of shadowy and sunny elements for the men and women of contrast ZAFIZZY's iconic AL-ZAF Perfume Oil is a daring vet practical fragrance reflecting ZAFIZZY's unique vision of the chic of the best woman. The sweet alluring qualities of jasmine bring AL-ZAF a bright for everyone. Richly fragrant cocoa and stimulating coumarin add AL-ZAF's strange side, while almond and coffee bring notes of vivid vivacity",
    perfumePrice50ml: 2390,
    perfumePrice100ml: 3790,
    oilPrice6ml: 520,
    oilPrice12ml: 890,
    family: 'Woody',
    gender: 'Unisex',
    tags: ['Best Seller', 'Signature'],
    notes: {
      top: 'Sweet Jasmine, Almond, Coffee',
      heart: 'Rich Cocoa, Stimulating Coumarin',
      base: 'Shadowy & Sunny Woods, Warm Amber'
    },
    performance: {
      longevity: 'Long-lasting (10+ hours)',
      projection: 'Strong (fills room)'
    },
    bestFor: {
      time: ['Day', 'Night'],
      seasons: ['Autumn', 'Winter'],
      occasions: ['Daily Wear', 'Special Events']
    }
  },
  {
    id: 'al-harun',
    name: 'Al Harun V-1',
    subtitle: '(The Entire Pure Combination)',
    image: '/products/al_harun.png',
    description: "Al Harun V-1 by ZAFIZZY Perfumers tells a story as you wear it. It opens with bold leather and geranium, then settles into a refined smoky-woody heart of patchouli and cedar. The dry down is where it truly shines warm amber, soft musk, creamy sandalwood, and earthy moss come together for a comforting, intimate finish that lingers close to the skin.",
    perfumePrice50ml: 2990,
    perfumePrice100ml: 4490,
    oilPrice6ml: 710,
    oilPrice12ml: 1250,
    family: 'Spicy',
    gender: 'Men',
    tags: ['Signature', 'Best Seller'],
    notes: {
      top: 'Bold Leather, Geranium',
      heart: 'Smoky Patchouli, Cedarwood',
      base: 'Warm Amber, Soft Musk, Creamy Sandalwood, Earthy Moss'
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
    id: 'al-kamrah',
    name: 'Al Kamrah V-1',
    subtitle: '(Almost The Entire Pure Combination)',
    image: '/products/al_kamrah.png',
    description: "Al Kamrah V-1 is rich, warm, and a little indulgent. Think Middle Eastern comfort meets sweet, gourmand depth. It opens with a bright pop of peppery bergamot, then softens into sticky date, buttery praline, and a touch of cinnamon. On the dry-down, you get creamy vanilla, resinous amber, and woody tonka bean deep, sensual, and cozy. This is the kind of scent you reach for on cold evenings or intimate nights in. Modern, yes but unapologetically luxurious.",
    perfumePrice50ml: 3090,
    perfumePrice100ml: 4690,
    oilPrice6ml: 729,
    oilPrice12ml: 1290,
    family: 'Sweet',
    gender: 'Unisex',
    tags: ['Best Seller'],
    notes: {
      top: 'Peppery Bergamot, Touch of Cinnamon',
      heart: 'Sticky Date, Buttery Praline',
      base: 'Creamy Vanilla, Resinous Amber, Woody Tonka Bean'
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
    subtitle: '(The Entire Pure Combination)',
    image: '/products/al_marziyah.png',
    description: "Al Marziyah by ZAFIZY is a sophisticated unisex scent, celebrated for its exceptional value. It captures a sunset in a bottle, opening with juicy fruits, flowing through a floral heart, and settling into a warm, woody base subtly enhanced with dark leather and oud for mystery.",
    perfumePrice50ml: 2890,
    perfumePrice100ml: 4390,
    oilPrice6ml: 680,
    oilPrice12ml: 1190,
    family: 'Floral',
    gender: 'Unisex',
    tags: ['Signature'],
    notes: {
      top: 'Juicy Fruits, Sunset Accords',
      heart: 'Floral Heart, Sweet Blossom',
      base: 'Warm Woody Base, Dark Leather, Precious Oud'
    },
    performance: {
      longevity: 'Long-lasting (8-10 hours)',
      projection: 'Moderate'
    },
    bestFor: {
      time: ['Day', 'Night'],
      seasons: ['Spring', 'Summer', 'Autumn'],
      occasions: ['Daily Wear', 'Professional Setting']
    }
  },
  {
    id: 'almarj',
    name: 'Al Marj V1',
    subtitle: '(The Entire Pure Combination)',
    image: '/products/al_marj.png',
    description: "Al Marj is a luxurious unisex scent that layers juicy tropical fruits over rich woods and warm spice. It opens bright with sweet raspberry and pear, then softens into honey, delicate florals, and a refined leather base that feels effortlessly sophisticated.",
    perfumePrice50ml: 2750,
    perfumePrice100ml: 4150,
    oilPrice6ml: 620,
    oilPrice12ml: 1090,
    family: 'Woody',
    gender: 'Unisex',
    tags: ['Signature', 'New Arrival'],
    notes: {
      top: 'Sweet Raspberry, Pear, Tropical Fruits',
      heart: 'Pure Honey, Delicate Florals',
      base: 'Refined Leather, Rich Woods, Warm Spice'
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
  },
  {
    id: 'summer-oud',
    name: 'Summer Oud',
    subtitle: '(The Natural Simple Fusion)',
    image: '/products/summer_oud.png',
    description: "Summer Oud is a beloved unisex scent that lifts deep, traditional oud with a splash of sunlit freshness. It opens with a zesty, spiced kick, eases into a warm floral sweetness, and finishes as a smooth, leather-soft wood.",
    perfumePrice50ml: 2890,
    perfumePrice100ml: 4390,
    oilPrice6ml: 650,
    oilPrice12ml: 1150,
    family: 'Woody',
    gender: 'Unisex',
    tags: ['Best Seller', 'New Arrival'],
    notes: {
      top: 'Zesty Sunlit Citrus, Spiced Kick',
      heart: 'Warm Floral Sweetness',
      base: 'Deep Traditional Oud, Leather-Soft Wood'
    },
    performance: {
      longevity: 'Very Long-lasting (12+ hours)',
      projection: 'Strong (fills room)'
    },
    bestFor: {
      time: ['Day', 'Night'],
      seasons: ['Spring', 'Summer'],
      occasions: ['Daily Wear', 'Special Events']
    }
  },
  {
    id: 'warmed-dior',
    name: 'Warmed Dior',
    subtitle: '(The Natural Simple Fusion)',
    image: '/products/warmed_dior.png',
    description: "Warmed Dior by ZAFIZZY Perfumers has this dark, romantic, almost mysterious feel to it. It opens with a gothic little twist think blood orange, dark plum, or red berries, with just a hint of something metallic and intriguing. Then it settles into something softer and deeply seductive: musk, vanilla, and woody notes that feel warm, unisex, and surprisingly long-lasting. Perfect when you want romance with a bit of an edge.",
    perfumePrice50ml: 2690,
    perfumePrice100ml: 3990,
    oilPrice6ml: 579,
    oilPrice12ml: 990,
    family: 'Spicy',
    gender: 'Unisex',
    tags: ['Signature', 'Best Seller'],
    notes: {
      top: 'Blood Orange, Dark Plum, Red Berries',
      heart: 'Metallic Intrigue, Soft Seductive Musk',
      base: 'Madagascar Vanilla, Warm Woody Notes'
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
    id: 'canadian-lemon',
    name: 'Canadian Lemon',
    subtitle: '(The Natural Simple Fusion)',
    image: '/products/canadian_lemon.png',
    description: "Canadian Lemon by ZAFIZZY feels like a sunny, flirty little mood-lifter. It opens with that lemon juicy burst of ripe peach, then softens into a breezy, almost weightless mix of cherry blossom and white jasmine. There’s nothing heavy about it just a light, easy, put-it-on-and-go kind of scent that works every day without trying too hard.",
    perfumePrice50ml: 2490,
    perfumePrice100ml: 3790,
    oilPrice6ml: 540,
    oilPrice12ml: 920,
    family: 'Citrus',
    gender: 'Unisex',
    tags: ['New Arrival'],
    notes: {
      top: 'Zesty Lemon Burst, Ripe Peach',
      heart: 'Breezy Cherry Blossom, White Jasmine',
      base: 'Light Airy Musk, Soft Cedar'
    },
    performance: {
      longevity: 'Moderate (6-8 hours)',
      projection: 'Moderate'
    },
    bestFor: {
      time: ['Day'],
      seasons: ['Spring', 'Summer'],
      occasions: ['Daily Wear', 'Relaxing at Home']
    }
  },
  {
    id: 'erba-pura',
    name: 'Erba Pura',
    subtitle: '(The Entire Pure Combination)',
    image: '/products/erba_pura.png',
    description: "Xerjoff Erba Pura casts a spell with its radiant, effervescent citrus opening, soon unfolding into a luscious medley of sun-ripened Mediterranean fruits. This joyful sweetness then settles into a plush, velvety bed of musk and vanilla, lending it a warmth that feels both enveloping and quietly sensual. Known for its commanding presence, it delivers exceptional projection and leaves a beautifully persistent trail that lingers for hours on end.",
    perfumePrice50ml: 2990,
    perfumePrice100ml: 4490,
    oilPrice6ml: 690,
    oilPrice12ml: 1190,
    family: 'Citrus',
    gender: 'Unisex',
    tags: ['Best Seller', 'New Arrival'],
    notes: {
      top: 'Sicilian Orange, Sicilian Lemon, Calabrian Bergamot',
      heart: 'Luscious Sun-Ripened Mediterranean Fruits',
      base: 'Plush White Musk, Madagascar Vanilla, Warm Amber'
    },
    performance: {
      longevity: 'Very Long-lasting (12+ hours)',
      projection: 'Strong (fills room)'
    },
    bestFor: {
      time: ['Day', 'Night'],
      seasons: ['Spring', 'Summer'],
      occasions: ['Daily Wear', 'Special Events']
    }
  },
  {
    id: 'wardha-of-arab',
    name: 'Wardha Of Arab',
    subtitle: '(The Natural Simple Fusion)',
    image: '/products/wardha_of_arab.png',
    description: "ZAFIZZY’s Wardha Of Arab unfolds like a sun-drenched arrangement of creamy white and golden petals, lifted by a soft, juicy fruitiness that whispers rather than shouts. The effect is polished, luminous, and touched with a gentle, natural sweetness refined without ever feeling stiff.",
    perfumePrice50ml: 2790,
    perfumePrice100ml: 4190,
    oilPrice6ml: 610,
    oilPrice12ml: 1050,
    family: 'Floral',
    gender: 'Unisex',
    tags: ['Signature', 'New Arrival'],
    notes: {
      top: 'Soft Juicy Fruitiness, Dewy Petals',
      heart: 'Creamy White & Golden Petals',
      base: 'Luminous Amber, Gentle Wood'
    },
    performance: {
      longevity: 'Long-lasting (8-10 hours)',
      projection: 'Moderate'
    },
    bestFor: {
      time: ['Day', 'Night'],
      seasons: ['Spring', 'Summer'],
      occasions: ['Daily Wear', 'Professional Setting']
    }
  },
  {
    id: 'flower-jazz',
    name: 'Flower Jazz',
    subtitle: '(Jasmin: Feel It Real - The Natural Simple Fusion)',
    image: '/products/flower_jazz.png',
    description: "ZAFIZZY’s Flower Jazz (Jasmin: Feel It Real) is a unisex scent that takes the lush, sweet character of jasmine and grounds it with soft, earthy warmth no rigid gender lines, just a clean, modern floral that feels equally right on anyone. A lively citrus lift or a gentle trail of amber and vanilla gives it quiet depth, so it wears fresh and easy during the day and slips naturally into something more intimate when evening comes.",
    perfumePrice50ml: 2590,
    perfumePrice100ml: 3990,
    oilPrice6ml: 569,
    oilPrice12ml: 990,
    family: 'Floral',
    gender: 'Unisex',
    tags: ['Best Seller', 'Signature'],
    notes: {
      top: 'Lively Citrus Lift, Dewy Morning Breeze',
      heart: 'Lush Royal Jasmine Sambac, Clean Modern Floral',
      base: 'Soft Earthy Warmth, Gentle Amber & Vanilla'
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
    id: 'althair-pdm',
    name: 'Althaïr',
    subtitle: '(Parfums de Marly - The Natural Simple Fusion)',
    image: '/products/althair_pdm.png',
    description: "Althaïr Parfums de Marly: It’s one of those scents that feels effortlessly seductive on anyone. Opens with a bright, spicy hug of orange flower, bergamot, cardamom, and a whisper of cinnamon. Then the vanilla kicks in: not the sugary kind, but deep, warm, almost addictive. Pure, understated luxury that just stays with you.",
    perfumePrice50ml: 2790,
    perfumePrice100ml: 4190,
    oilPrice6ml: 629,
    oilPrice12ml: 1090,
    family: 'Sweet',
    gender: 'Unisex',
    tags: ['New Arrival', 'Signature'],
    notes: {
      top: 'Orange Flower, Bergamot, Cardamom, Whisper of Cinnamon',
      heart: 'Bourbon Vanilla, Deep Spicy Accords',
      base: 'Addictive Warm Vanilla, Guaiac Wood, Soft Musk'
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
    id: 'pistachio-gelato',
    name: 'Yum Pistachio Gelato 33',
    subtitle: '(Kayali - Flirty Gourmand Indulgence)',
    image: '/products/pistachio_gelato.png',
    description: "Kayali’s Yum Pistachio Gelato 33 is a gourmand that doesn’t take itself too seriously it’s pure, flirty indulgence. The opening is unmistakably nutty, with pistachio and a whisper of roasted hazelnut, but it softens quickly into a creamy, cloud-like sweetness. Whipped cream, pillowy marshmallow, and spun sugar give it that just-desserted scent trail, while staying airy rather than heavy. It’s playful, cozy, and genuinely hard not to smile at.",
    perfumePrice50ml: 2690,
    perfumePrice100ml: 3990,
    oilPrice6ml: 579,
    oilPrice12ml: 990,
    family: 'Sweet',
    gender: 'Unisex',
    tags: ['Best Seller', 'New Arrival'],
    notes: {
      top: 'Pistachio, Roasted Hazelnut, Italian Bergamot',
      heart: 'Whipped Cream, White Jasmine, Raspberry, Peach',
      base: 'Pillowy Marshmallow, Spun Sugar, Sandalwood'
    },
    performance: {
      longevity: 'Long-lasting (8-10 hours)',
      projection: 'Moderate'
    },
    bestFor: {
      time: ['Day', 'Night'],
      seasons: ['Spring', 'Summer', 'Autumn'],
      occasions: ['Daily Wear', 'Relaxing at Home']
    }
  },
  {
    id: 'sheikh-musk',
    name: 'Sheikh Musk V-1',
    subtitle: '(The Natural Simple Fusion)',
    image: '/products/sheikh_musk.png',
    description: "Sheikh Musk V-1 by ZAFIZZY feels like slipping into something effortlessly luxurious. It opens with a generous, almost edible sweetness vanilla and amber folded together then slowly reveals a darker, woodier backbone that keeps it from ever becoming too dessert-like. There’s a quiet tension between the gourmand warmth and the grounded, smoky undertones that makes it magnetic on both men and women. What really stands out, though, is how long it stays with you; hours after applying, it still hums softly on the skin. The dry-down is pure comfort: plush, sensual, and polished, leaving a trail that feels intimate rather than loud, like a secret you want to lean in closer to catch.",
    perfumePrice50ml: 2990,
    perfumePrice100ml: 4490,
    oilPrice6ml: 710,
    oilPrice12ml: 1250,
    family: 'Spicy',
    gender: 'Unisex',
    tags: ['Signature', 'Best Seller'],
    notes: {
      top: 'Generous Edible Sweetness, Warm Vanilla, Amber',
      heart: 'Grounding Smoky Undertones, Dark Woody Backbone',
      base: 'Plush Sensual Musk, Creamy Sandalwood'
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
    id: 'tam-dao',
    name: 'Tam Dao',
    subtitle: '(Diptyque - The Natural Simple Fusion)',
    image: '/products/tam_dao.png',
    description: "Diptyque’s Tam Dao is a masterclass in restraint. Rather than leaning into sandalwood’s sweeter, more indulgent side, it pays homage to the sacred groves of northern Vietnam with a composition that feels almost architectural. The wood is there in full, creamy force milky and smooth but it’s immediately tempered by the austere snap of cypress and the parched, dusty grain of cedar. A subtle pulse of spice keeps things earthy, grounding the fragrance in something ancient and smoky, like incense lingering long after the ritual is over. It’s an impeccably balanced, entirely unisex scent that doesn’t shout; it settles into the skin like a well-worn memory.",
    perfumePrice50ml: 2890,
    perfumePrice100ml: 4390,
    oilPrice6ml: 680,
    oilPrice12ml: 1190,
    family: 'Woody',
    gender: 'Unisex',
    tags: ['Signature', 'New Arrival'],
    notes: {
      top: 'Austere Cypress, Dusty Cedar Grain, Fresh Spice',
      heart: 'Milky Smooth Sandalwood, Sacred Grove Accords',
      base: 'Ancient Incense, Earthy Smoky Woods'
    },
    performance: {
      longevity: 'Long-lasting (10+ hours)',
      projection: 'Moderate'
    },
    bestFor: {
      time: ['Day', 'Night'],
      seasons: ['Autumn', 'Winter', 'Spring'],
      occasions: ['Daily Wear', 'Professional Setting']
    }
  }
];

export function getProductById(id: string): Product | undefined {
  const normalizedId = id.toLowerCase().replace(/[^a-z0-9]/g, '');
  return PRODUCTS.find(p => {
    const normalizedPid = p.id.toLowerCase().replace(/[^a-z0-9]/g, '');
    return (
      normalizedPid === normalizedId ||
      (normalizedId.includes('zaf') && normalizedPid.includes('zaf')) ||
      (normalizedId.includes('harun') && normalizedPid.includes('harun')) ||
      (normalizedId.includes('haroon') && normalizedPid.includes('harun')) ||
      (normalizedId.includes('kamrah') && normalizedPid.includes('kamrah')) ||
      (normalizedId.includes('khamrah') && normalizedPid.includes('kamrah')) ||
      (normalizedId.includes('marziyah') && normalizedPid.includes('marziyah')) ||
      (normalizedId.includes('marj') && normalizedPid.includes('marj')) ||
      (normalizedId.includes('summer') && normalizedPid.includes('summer')) ||
      (normalizedId.includes('dior') && normalizedPid.includes('dior')) ||
      (normalizedId.includes('lemon') && normalizedPid.includes('lemon')) ||
      (normalizedId.includes('erba') && normalizedPid.includes('erba')) ||
      (normalizedId.includes('wardha') && normalizedPid.includes('wardha')) ||
      (normalizedId.includes('flower') && normalizedPid.includes('flower')) ||
      (normalizedId.includes('jazz') && normalizedPid.includes('flower')) ||
      (normalizedId.includes('jasmin') && (normalizedPid.includes('flower') || normalizedPid.includes('jasmin'))) ||
      (normalizedId.includes('althair') && normalizedPid.includes('althair')) ||
      (normalizedId.includes('marly') && normalizedPid.includes('althair')) ||
      (normalizedId.includes('pistachio') && normalizedPid.includes('pistachio')) ||
      (normalizedId.includes('kayali') && normalizedPid.includes('pistachio')) ||
      (normalizedId.includes('sheikh') && normalizedPid.includes('sheikh')) ||
      (normalizedId.includes('tam') && normalizedPid.includes('tam')) ||
      (normalizedId.includes('dao') && normalizedPid.includes('tam'))
    );
  });
}

