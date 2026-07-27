export interface PartnerBrand {
  id: string;
  index: number;
  name: string;
  tagline: string;
  category: string;
  description: string;
  story: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  ingredients: string[];
  services: string[];
  highlights: string[];
  metrics: { label: string; value: string }[];
  accentColor: string;
  detailedStory: {
    heroQuote: string;
    sections: { title: string; text: string }[];
  };
}

export const PARTNER_BRANDS: PartnerBrand[] = [
  {
    id: 'maison-bin-sadhik',
    index: 0,
    name: 'Maison Bin Sadhik',
    tagline: 'Artisanal Distillation & Royal Amber Oud',
    category: 'Haute Perfumery',
    description: 'Pioneering sustainable wild-harvested Oud and Taif Rose extractions, guaranteeing zero-waste hydro-distillation and direct financial royalties to mountain harvesting families.',
    story: 'Born from decades of sacred Arabian perfumery traditions, Bin Sadhik marries wild-harvested Assamese Oud with steam-distilled Taif Rose petals to create timeless luxury reserves.',
    notes: {
      top: ['Wild Saffron', 'Cardamom', 'Bergamot Essence'],
      heart: ['Taif Rose', 'Jasmine Sambac', 'Smoked Incense'],
      base: ['Aged Cambodian Oud', 'Ambergris', 'Royal Sandalwood']
    },
    ingredients: ['100% Wild Oud Extract', 'Pure Taif Rose Oil', 'Organic Botanical Alcohol'],
    services: ['Bespoke Distillation', 'Zero-Waste Extraction', 'Reserve Batching'],
    highlights: [
      '100% Wild-harvest certified organic resin',
      'Solar-powered hydro-distillation copper stills',
      'Direct fair-share royalties for Taif & Assam growers',
    ],
    metrics: [
      { value: '100%', label: 'Ethical Sourcing' },
      { value: '45+', label: 'Artisan Families' },
      { value: '0%', label: 'Synthetic Solvents' }
    ],
    accentColor: '#e8d8a0',
    detailedStory: {
      heroQuote: "True luxury is born when sacred botanical traditions elevate both the senses and the hands that harvest them.",
      sections: [
        {
          title: "Sacred Distillation Heritage",
          text: "Maison Bin Sadhik operates at the intersection of centuries-old Arabian perfumery and modern eco-stewardship. By utilizing low-pressure copper hydro-distillation, we extract pure aromatic essences without harsh chemical solvents."
        },
        {
          title: "Direct Community Royalties",
          text: "We eliminate exploitative intermediaries. Every kilogram of wild floral petal or aged oud wood purchased directly funds local community infrastructure, ensuring long-term economic independence for Taif rose farmers and Assamese forest guardians."
        }
      ]
    }
  },
  {
    id: 'lumina-education',
    index: 1,
    name: 'Lumina Education',
    tagline: 'Rural Literacy & Digital Learning Centers',
    category: 'Educational Foundation',
    description: 'Empowering future generations by constructing solar-powered computer labs, distributing learning kits, and providing full scholarships to rural school children.',
    story: 'In Arabic, NURA means light. Through Lumina, 10% of all fragrance profits illuminate the minds of children across rural districts through scholarships and digital literacy labs.',
    notes: {
      top: ['Golden Amber', 'Crisp White Tea'],
      heart: ['Lotus Flower', 'Orange Blossom'],
      base: ['White Musk', 'Cedarwood', 'Vanilla Resin']
    },
    ingredients: ['Natural Botanical Extracts', 'Ethical Essential Oils', 'Pure Grain Spirit'],
    services: ['School Scholarships', 'Digital Literacy Labs', 'STEM Equipment'],
    highlights: [
      'Over 12,000 students funded across rural districts',
      '100% direct allocation from NURA fragrance sales',
      'Solar-powered computer centers in 14 villages',
    ],
    metrics: [
      { value: '12k+', label: 'Students Empowered' },
      { value: '14', label: 'Tech Labs Built' },
      { value: '10%', label: 'Profit Dedicated' }
    ],
    accentColor: '#f4e0a5',
    detailedStory: {
      heroQuote: "Education is the purest form of light — illumination that transforms generations.",
      sections: [
        {
          title: "Bridging the Digital Divide",
          text: "Through the Circle of Light initiative, Lumina builds self-sustaining, solar-powered digital learning labs equipped with modern computers, high-speed connectivity, and interactive STEM software in remote rural communities."
        },
        {
          title: "Holistic Student Support",
          text: "Beyond infrastructure, we provide complete educational kits—including textbooks, uniforms, nutrition support, and merit-based high school scholarships—ensuring no child drops out due to financial hardship."
        }
      ]
    }
  },
  {
    id: 'oasis-hydro',
    index: 2,
    name: 'Oasis Pure Hydro',
    tagline: 'Clean Aquifer Wells & Water Stewardship',
    category: 'Environmental Water Project',
    description: 'Building solar-powered deep aquifer tube-wells and reverse osmosis purification stations to deliver clean, drinkable water to arid agricultural communities.',
    story: 'Pure water is the origin of all vitality. Oasis Pure Hydro brings clean, drinkable aquifer water to thousands of families, creating healthy, thriving communities.',
    notes: {
      top: ['Aquatic Petrichor', 'Fresh Cypress', 'Lime Zest'],
      heart: ['Water Lily', 'Bamboo Leaves', 'White Jasmine'],
      base: ['Clean Driftwood', 'Veter', 'Light Amber']
    },
    ingredients: ['Eco-Filtered Aquifer Water', 'Natural Essential Oils'],
    services: ['Solar Well Drilling', 'RO Purification Hubs', 'Aquifer Stewardship'],
    highlights: [
      '48 deep aquifer tube-wells actively operating',
      'Zero-chemical eco-filtration infrastructure',
      '24/7 free clean drinking water for 35,000+ residents',
    ],
    metrics: [
      { value: '48', label: 'Wells Constructed' },
      { value: '35k+', label: 'Daily Beneficiaries' },
      { value: '100%', label: 'Solar Powered' }
    ],
    accentColor: '#d2e7ff',
    detailedStory: {
      heroQuote: "Water is the origin of all vitality. Bringing safe water transforms entire rural economies overnight.",
      sections: [
        {
          title: "Sustainable Deep Drilling",
          text: "Oasis Pure Hydro installs deep-bore solar aquifer systems that bypass polluted surface water, providing crystal-clear, mineral-rich drinking water straight from protected subterranean reservoirs."
        },
        {
          title: "Community Stewardship Training",
          text: "Each well is paired with a trained local water committee responsible for ongoing maintenance, ensuring water systems remain fully operational for decades without reliance on external aid."
        }
      ]
    }
  },
  {
    id: 'artisan-guild',
    index: 3,
    name: 'Artisan Guild Co-op',
    tagline: 'Handloom Textile Mastery & Micro-Grants',
    category: 'Social Enterprise',
    description: 'Sponsoring textile weaving, hand-stitching, and luxury packaging workshops that equip rural women with sustainable income, tools, and business micro-grants.',
    story: 'Celebrating centuries of traditional handloom artistry, the Artisan Guild provides rural craftswomen with fair wages, micro-capital, and financial autonomy.',
    notes: {
      top: ['Warm Cinnamon', 'Sweet Nutmeg', 'Mandarin'],
      heart: ['Damask Rose', 'Spiced Clove', 'Cashmere Wood'],
      base: ['Rich Vanilla Pod', 'Tonka Bean', 'Smooth Leather']
    },
    ingredients: ['Organic Botanical Scents', 'Natural Silk & Velvet Textiles'],
    services: ['Handloom Weaving', 'Micro-Grant Capital', 'Velvet Pouch Crafting'],
    highlights: [
      '300+ women empowered as independent creators',
      'Handmade velvet & silk fragrance pouches',
      '100% fair-wage certified cooperative model',
    ],
    metrics: [
      { value: '300+', label: 'Artisan Partners' },
      { value: '3.5x', label: 'Income Growth' },
      { value: '0%', label: 'Plastic Packaging' }
    ],
    accentColor: '#ebd5b3',
    detailedStory: {
      heroQuote: "When you empower a woman through master craftsmanship, you elevate an entire village.",
      sections: [
        {
          title: "Preserving Heritage Weaving",
          text: "The Artisan Guild revives centuries-old handloom techniques to produce NURA's signature velvet pouches and presentation boxes, turning traditional craft into sustainable livelihoods."
        },
        {
          title: "Micro-Grant Entrepreneurship",
          text: "Graduates of our 6-month master training receive zero-interest equipment micro-grants to establish their own independent tailoring units, securing multi-generational financial autonomy."
        }
      ]
    }
  },
  {
    id: 'botanica-reserve',
    index: 4,
    name: 'Botanica Reserve',
    tagline: 'Endangered Flora Preservation & Organic Soil',
    category: 'Biodiversity Reserve',
    description: 'Cultivating protected reserves of rare aromatic species—such as Mysore Sandalwood and Jasmine Sambac—using pesticide-free, regenerative agricultural science.',
    story: 'Dedicated to preserving endangered perfume botanicals, Botanica Reserve nurtures native flora and soil ecology through 100% organic regenerative farming.',
    notes: {
      top: ['Fresh Jasmine Petals', 'Green Leaf Sap', 'Neroli'],
      heart: ['Mysore Sandalwood', 'Night-Blooming Cereus'],
      base: ['Earth Moss', 'Vetiver Root', 'Golden Resin']
    },
    ingredients: ['Regenerative Botanical Extracts', 'Mysore Sandalwood Oil'],
    services: ['Biodiversity Reserves', 'Soil Regeneration', 'Organic Cultivation'],
    highlights: [
      '500+ acres of protected regenerative botanical reserves',
      'Sandalwood tree replanting program (3 for 1 ratio)',
      '100% pesticide-free organic soil certification',
    ],
    metrics: [
      { value: '500', label: 'Acres Protected' },
      { value: '15k+', label: 'Trees Replanted' },
      { value: '100%', label: 'Organic Certified' }
    ],
    accentColor: '#bde5c8',
    detailedStory: {
      heroQuote: "Nurturing the earth with reverence yields botanical essences of unmatched purity and spiritual depth.",
      sections: [
        {
          title: "Regenerative Agroforestry",
          text: "Botanica Reserve combines ancient natural farming wisdom with modern botanical science, restoring degraded soil quality while cultivating vulnerable perfume plants in their native bio-habitats."
        },
        {
          title: "Sandalwood Reforestation Initiative",
          text: "For every drop of Mysore Sandalwood oil used in NURA formulations, Botanica plants three native saplings on secure reserve lands to guarantee species preservation for centuries to come."
        }
      ]
    }
  }
];
