export interface ProfileData {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  whatsapp: string;
  facebook: string;
  avatar: string;
  cprCardImage: string;
  officeAddress: string;
  bio: string;
  aboutHighlights: string[];
  yearsExperience: string;
  projectsCompleted: string;
  clientSatisfaction: string;
  skillsMastered: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Design & Creative' | 'Office & Data' | 'Professional';
  level: number; // 0 - 100
  experience: string;
  description: string;
  tools: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  current: boolean;
  description: string;
  responsibilities: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  group: string;
  result: string;
  yearOrStatus: string;
  location: string;
  details: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  icon: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  videoUrl?: string;
  tags: string[];
  client: string;
  year: string;
  deliverables: string[];
  featured?: boolean;
}

export const INITIAL_PROFILE: ProfileData = {
  name: "KM Azizul Islam",
  role: "Graphic Designer & Executive Officer",
  tagline: "Shaping prestigious visual identities, precision print architecture, and healthcare publication systems.",
  location: "Chattogram, Bangladesh",
  officeAddress: "Moti Tower, Chawkbazar, Chittagong, Bangladesh",
  email: "kmazizulislam52@gmail.com",
  phone: "01830641733",
  whatsapp: "+8801830641733",
  facebook: "https://www.facebook.com/km.azizul.islam.122576",
  avatar: "/assets/aistudio/image_3b90e3ad.png",
  cprCardImage: "/assets/aistudio/image_cf367862.png",
  bio: "I am KM Azizul Islam (Azizul Islam Opi), Executive Officer of CPR Medical Academy and a dedicated Graphic Designer & Creative Professional based in Chittagong, Bangladesh. With extensive expertise in vector design, commercial prepress publishing, and institutional communication, I bridge the gap between creative visual artistry and strategic healthcare management. My multidisciplinary work spans leading corporate and healthcare publications at CPR Medical Academy, commercial offset printing at Al Falah Computer and Printers, and precision inventory databases at Bazar Bag Super Shop.",
  aboutHighlights: [
    "Executive leadership & publication management at CPR Medical Academy",
    "Master vector design, brand architecture & Adobe Illustrator layouts",
    "Commercial offset prepress calibration & zero-defect print production",
    "Healthcare course curriculum literature & executive presentation decks"
  ],
  yearsExperience: "3+",
  projectsCompleted: "180+",
  clientSatisfaction: "100%",
  skillsMastered: "7+"
};

export const INITIAL_SKILLS: SkillItem[] = [
  {
    id: "illustrator",
    name: "Adobe Illustrator",
    category: "Design & Creative",
    level: 95,
    experience: "3+ Years",
    description: "Master-level vector illustrations, logo mark engineering, typography styling, bezier curves, and complex print layouts.",
    tools: ["Pen Tool", "Pathfinder", "Gradient Mesh", "Color Separation", "Vector Brushes"]
  },
  {
    id: "graphic-design",
    name: "Graphic Design",
    category: "Design & Creative",
    level: 98,
    experience: "3+ Years",
    description: "Comprehensive visual theory, color psychology, optical balance, typographic hierarchy, grid systems, and brand cohesion.",
    tools: ["Brand Identity", "Visual Hierarchy", "Layout Systems", "Color Harmonies"]
  },
  {
    id: "ms-word",
    name: "MS Word",
    category: "Office & Data",
    level: 92,
    experience: "4+ Years",
    description: "Executive report formatting, formal corporate publishing, automated table of contents, letterhead systems, and documentation.",
    tools: ["Style Templates", "Table Layouts", "Header/Footer Systems", "Mail Merge"]
  },
  {
    id: "ms-excel",
    name: "MS Excel",
    category: "Office & Data",
    level: 88,
    experience: "4+ Years",
    description: "Spreadsheet architecture, pivot tables, data verification, automated formulas, financial summaries, and inventory accounting.",
    tools: ["VLOOKUP/XLOOKUP", "Pivot Tables", "Conditional Formatting", "Data Validation"]
  },
  {
    id: "ms-powerpoint",
    name: "MS PowerPoint",
    category: "Office & Data",
    level: 94,
    experience: "3+ Years",
    description: "High-impact executive pitch decks, medical academy presentation decks, synchronized animations, and visual storytelling.",
    tools: ["Master Slides", "Custom Transitions", "Data Infographics", "Typography Decks"]
  },
  {
    id: "data-entry",
    name: "Data Entry",
    category: "Office & Data",
    level: 96,
    experience: "4+ Years",
    description: "Fast typing speed, 99.9% data accuracy, large-scale cataloging, barcode SKU management, and meticulous records verification.",
    tools: ["Speed Typing", "Quality Audit", "SKU Systems", "Database Entry"]
  },
  {
    id: "communication",
    name: "Communication",
    category: "Professional",
    level: 90,
    experience: "Ongoing",
    description: "Creative briefing, client expectation management, cross-functional collaboration, executive correspondence, and team synergy.",
    tools: ["Client Briefing", "Presentation", "Active Listening", "Negotiation"]
  }
];

export const INITIAL_EXPERIENCES: ExperienceItem[] = [
  {
    id: "cpr-medical",
    role: "Executive Officer",
    company: "CPR Medical Academy",
    period: "01 September 2026 To Running",
    location: "Moti Tower, Chawkbazar, Chittagong, Bangladesh",
    current: true,
    description: "Serving as Executive Officer of CPR Medical Academy (চট্টগ্রামে একমাত্র অফলাইন মেডিকেল পোস্ট গ্র্যাজুয়েশন ওরিয়েন্টেশন সেন্টার) at Moti Tower, Chawkbazar, Chittagong. Leading institutional brand communication, executive publications, course curriculum layouts, and clinical training graphics.",
    responsibilities: [
      "Overseeing executive operations, brand identity, and official publications for Chittagong's premier medical post-graduation orientation center.",
      "Directing design and layout of official medical course guides, clinical curriculum sheets, and executive certificates.",
      "Managing institutional digital presentations, visiting cards, and academic orientation outreach materials.",
      "Collaborating with senior medical faculty to translate complex clinical curricula into clear, publication-grade visual guides."
    ]
  },
  {
    id: "al-falah",
    role: "Graphics Designer",
    company: "Al Falah Computer and Printers",
    period: "01-04-2023 To 24-01-2025",
    location: "Chattogram, Bangladesh",
    current: false,
    description: "Served as primary graphics designer delivering hundreds of high-volume commercial print jobs, corporate identity kits, flex banners, and prepress layouts.",
    responsibilities: [
      "Engineered vector logos, corporate stationery, product packaging, and advertising banners for commercial clients.",
      "Handled complete prepress workflow including color separation (CMYK), bleed calibration, and plate proofing.",
      "Revamped client brand assets from low-resolution sketches into pristine scalable vector artwork.",
      "Coordinated with printing press technicians to ensure zero-defect physical print runs."
    ]
  },
  {
    id: "bazar-bag",
    role: "Data Entry Manager",
    company: "Bazar Bag Super Shop",
    period: "01-06-2021 To 24-01-2022",
    location: "Chattogram, Bangladesh",
    current: false,
    description: "Managed super shop inventory database, product barcode registration, daily billing reconciliation, and automated stock reporting.",
    responsibilities: [
      "Cataloged and audited over 10,000+ retail SKU entries with extreme precision.",
      "Synchronized daily point-of-sale data with supplier replenishment manifests.",
      "Generated weekly turnover analytics and inventory shortage alerts for senior management.",
      "Automated recurrent spreadsheet reports to minimize manual data reconciliation time."
    ]
  }
];

export const INITIAL_EDUCATION: EducationItem[] = [
  {
    id: "hsc",
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Dilowara Jahan Memorial College",
    group: "Science",
    result: "Running",
    yearOrStatus: "Currently Enrolled (Running)",
    location: "Chattogram, Bangladesh",
    details: "Focusing on advanced Science disciplines, mathematical problem solving, physics, and analytical thinking which strengthens architectural design fundamentals."
  },
  {
    id: "ssc",
    degree: "Secondary School Certificate (SSC)",
    institution: "Chakaria Central High School",
    group: "Science",
    result: "GPA 4.78 / 5.00",
    yearOrStatus: "Graduated 2024",
    location: "Chakaria, Chattogram Division, Bangladesh",
    details: "Achieved outstanding academic standing in the Science Group with GPA 4.78, laying a rigorous foundation in technology, systematic logic, and creative discipline."
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "graphic-design",
    title: "Graphic Design",
    tagline: "High-impact visual communication for digital and commercial media.",
    description: "Transforming concepts into memorable visuals using modern design principles, striking color palettes, and typographic excellence.",
    deliverables: ["Visual Identity Assets", "Marketing Banners", "Editorial Layouts", "Posters & Flyers", "Digital Illustrations"],
    icon: "palette"
  },
  {
    id: "branding",
    title: "Branding & Identity",
    tagline: "Complete visual identities that elevate brands above competition.",
    description: "Crafting iconic vector logos, comprehensive brand manuals, color guidelines, and cohesive design systems that build trust and distinction.",
    deliverables: ["Logo Design", "Brand Guidelines", "Corporate Stationery", "Typography Pairing", "Brand Collateral"],
    icon: "sparkles"
  },
  {
    id: "social-media",
    title: "Social Media Design",
    tagline: "Eye-catching social creatives engineered for engagement.",
    description: "Designing conversion-driven social media posts, carousel stories, ad banners, and header artwork tailored for Facebook, Instagram, and LinkedIn.",
    deliverables: ["Instagram Carousels", "Ad Creatives", "Cover Artworks", "Story Templates", "Promotional Graphics"],
    icon: "share2"
  },
  {
    id: "print-design",
    title: "Print Design & Prepress",
    tagline: "Flawless print-ready materials with strict color precision.",
    description: "Expertise in CMYK prepress calibration, packaging die-cuts, large format billboards, brochures, catalogs, and commercial flex printing.",
    deliverables: ["Packaging & Labels", "Brochures & Catalogs", "Billboards & Flex Banners", "Business Cards", "Offset Prepress"],
    icon: "printer"
  },
  {
    id: "3d-motion",
    title: "3D Animation & Motion",
    tagline: "Futuristic 3D visualizers, kinetic typography, and motion graphics.",
    description: "Creating captivating 3D geometric animations, logo reveals, kinetic text animations, and futuristic sci-fi visual loops.",
    deliverables: ["3D Geometric Animations", "Kinetic Motion Graphics", "Logo Reveals", "Video Loop Visuals", "Social Motion Ads"],
    icon: "cube"
  },
  {
    id: "document-layout",
    title: "Document Layout & Data",
    tagline: "Executive-grade formatting for reports, decks, and spreadsheets.",
    description: "Polished multi-page corporate reports, clinical documentation, interactive presentation decks, and structured Excel models.",
    deliverables: ["Annual Reports", "Executive PowerPoint Decks", "Medical Manuals", "Custom Excel Dashboards", "Official Certificates"],
    icon: "file-text"
  }
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: "cpr-academy-brand",
    title: "CPR Medical Academy Identity & Orientation Suite",
    category: "Branding",
    tagline: "Official identity architecture and executive stationery for Chittagong's premier medical post-graduation orientation center.",
    description: "Official identity and communication design system for CPR Medical Academy (চট্টগ্রামে একমাত্র অফলাইন মেডিকেল পোস্ট গ্র্যাজুয়েশন ওরিয়েন্টেশন সেন্টার, Moti Tower, Chawkbazar, Chittagong). Features custom vector stethoscope and pulse logomark, executive visiting cards, curriculum orientation booklets, and digital marketing banners.",
    image: "/assets/aistudio/image_cf367862.png",
    tags: ["Adobe Illustrator", "Branding", "Medical Publication", "Print Design"],
    client: "CPR Medical Academy",
    year: "2026",
    deliverables: ["Official Visiting Card", "Institutional Logo", "Curriculum Booklet", "Orientation Banners"],
    featured: true
  },
  {
    id: "al-falah-packaging",
    title: "Al Falah Commercial Print & Packaging",
    category: "Print Design",
    tagline: "Commercial offset packaging and luxury gold-stamped stationery.",
    description: "High-volume commercial packaging and corporate stationery suite executed during my tenure at Al Falah Computer and Printers. Includes custom die-cut box layouts, CMYK color-accurate separations, flex banner graphics, and embossed business stationery.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1200&q=80",
    tags: ["Print Design", "Prepress CMYK", "Packaging", "Adobe Illustrator"],
    client: "Al Falah Computer & Printers",
    year: "2024",
    deliverables: ["Product Packaging Die-Cut", "Flex Banner (20x10ft)", "Corporate Stationery", "Offset Separation"],
    featured: true
  },
  {
    id: "neo-cyber-visuals",
    title: "Neo-Cyber 3D Geometric Visualizer",
    category: "3D & Motion",
    tagline: "Futuristic sci-fi visual experiment with glowing polyhedrals.",
    description: "A futuristic 3D animation concept developed with glowing geometric primitives, floating chrome rings, and electric cyan particles. Designed as a brand reveal bumper and high-tech digital billboard animation.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    tags: ["3D Animation", "Motion Graphics", "Sci-Fi", "Awwwards Style"],
    client: "Self-Initiated Concept",
    year: "2025",
    deliverables: ["3D Geometric Model", "Motion Bumper (4K)", "Sound Design Sync", "Kinetic Loop"],
    featured: true
  },
  {
    id: "bazar-bag-infographics",
    title: "Bazar Bag Retail Brand & Analytics",
    category: "Branding",
    tagline: "Complete retail identity and inventory infographic system.",
    description: "Visual identity revamp and visual data system for Bazar Bag Super Shop. Designed consumer-facing price signage, promotional aisle banners, social media product carousels, and visual Excel KPI executive dashboards for retail management.",
    image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=1200&q=80",
    tags: ["Retail Branding", "MS Excel", "Social Media", "Data Graphics"],
    client: "Bazar Bag Super Shop",
    year: "2022",
    deliverables: ["Retail Signage", "Aisle Banners", "Inventory KPI Dashboard", "Social Media Ads"],
    featured: false
  },
  {
    id: "chroma-typography",
    title: "Kinetic Typography & Vector Posters",
    category: "Typography & Vectors",
    tagline: "Editorial vector posters celebrating contemporary typography.",
    description: "An experimental series of poster designs exploring experimental grid alignments, high-contrast serif typography, and intricate geometric vector ornaments created 100% in Adobe Illustrator.",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80",
    tags: ["Adobe Illustrator", "Typography", "Editorial", "Poster Art"],
    client: "Creative Showcase",
    year: "2024",
    deliverables: ["4-Piece Poster Series", "Custom Type Vectors", "Print Exhibition Proofs"],
    featured: true
  },
  {
    id: "social-media-campaign",
    title: "Electric Pulse Social Media Campaign",
    category: "Social Media",
    tagline: "High-converting social media marketing graphics & carousel ads.",
    description: "A dynamic series of 15 social media ad visuals engineered with high-contrast electric blues, glowing typography, and optimized mobile aspect ratios to maximize engagement and click-through rates.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
    tags: ["Social Media", "Ad Creatives", "Carousel Design", "Marketing"],
    client: "Digital Growth Agency",
    year: "2024",
    deliverables: ["15 Instagram Feeds", "10 Story Ads", "Carousel Templates"],
    featured: false
  },
  {
    id: "executive-deck",
    title: "Corporate Strategy & Presentation Deck",
    category: "Office & Data",
    tagline: "Clean, investor-grade MS PowerPoint & Word executive publication.",
    description: "An elegant, minimalist corporate presentation system crafted with custom master layouts, vector charts, financial data graphs, and an accompanying 24-page executive summary document.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    tags: ["MS PowerPoint", "MS Word", "Pitch Deck", "Executive Layout"],
    client: "Corporate Consultancy",
    year: "2025",
    deliverables: ["32-Slide Deck", "Corporate Summary PDF", "Custom Infographic Assets"],
    featured: false
  },
  {
    id: "chattogram-cultural-fest",
    title: "Chattogram Youth Cultural Fest Branding",
    category: "Branding",
    tagline: "Festive visual identity with traditional motifs and modern vectors.",
    description: "Identity system created for a regional cultural festival in Chattogram, merging traditional Bengali folk art motifs with sharp modern vector geometry, vibrant banners, event stage backdrops, and commemorative badges.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    tags: ["Cultural Branding", "Event Identity", "Vector Illustration", "Banner Design"],
    client: "Cultural Organizing Committee",
    year: "2024",
    deliverables: ["Festival Logo", "Stage Backdrop (40ft)", "Event Badges", "Social Campaign"],
    featured: false
  }
];
