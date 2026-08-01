export interface VideoItem {
  id: string;
  title: string;
  category: 'Short Film' | 'Tutorial' | 'Tech & Gear' | 'Documentary' | 'Behind The Scenes';
  duration: string;
  views: string;
  published: string;
  thumbnail: string;
  description: string;
  youtubeId: string;
  gearUsed: string[];
  colorPalette: string[];
  lutUsed: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: 'Commercial' | 'Music Video' | 'Interactive 3D' | 'Editorial' | 'Generative Film';
  year: string;
  role: string;
  coverImage: string;
  heroVideo?: string;
  summary: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  stats: { label: string; value: string }[];
  gallery: string[];
}

export interface ProductItem {
  id: string;
  title: string;
  category: 'Course' | 'Presets & LUTs' | 'Notion OS' | 'FX Templates' | 'Ebook' | 'Code Starter' | 'Membership';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  tagline: string;
  description: string;
  coverImage: string;
  features: string[];
  includes: string[];
  demoBeforeAfter?: { before: string; after: string };
  downloadSize: string;
}

export interface PodcastEpisode {
  id: string;
  number: number;
  title: string;
  guest: string;
  guestRole: string;
  duration: string;
  publishDate: string;
  coverImage: string;
  summary: string;
  keyTakeaways: string[];
  audioUrl?: string;
  spotifyUrl: string;
  appleUrl: string;
  timestamps: { time: string; label: string }[];
}

export interface GearItem {
  name: string;
  category: 'Cameras' | 'Lenses' | 'Audio' | 'Lighting' | 'Computing & Post' | 'Accessories';
  specs: string;
  rating: string;
  link: string;
}

export const CREATOR_PROFILE = {
  name: "Julian Vance",
  title: "Director, Filmmaker & Creative Technologist",
  location: "Tokyo / Los Angeles",
  bio: "Crafting visual stories at the intersection of cinema, generative technology, and high-fashion aesthetics.",
  stats: {
    youtubeSubscribers: "820K",
    instagramFollowers: "450K",
    totalAudience: "1.27M+",
    monthlyViews: "8.5M",
    brandPartnerships: "40+",
    digitalCustomers: "14.2K+"
  },
  socials: {
    youtube: "https://youtube.com",
    instagram: "https://instagram.com",
    twitter: "https://x.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com"
  },
  manifesto: [
    "In a world saturated with ephemeral noise, true cinema is an anchor of emotional resonance.",
    "The camera is not just a tool; it is a lens into the unseen geometry of human emotion.",
    "Technology should never overshadow soul. We use AI to elevate human imagination, not replace it.",
    "Build products you wish existed when you were starting out."
  ],
  timeline: [
    { year: "2026", title: "MOTION Studio Launch", description: "Pioneered interactive 3D web-cinematics and released 'NEON DREAMS' 8K Short Film." },
    { year: "2025", title: "Sony Alpha Global Ambassador", description: "Directed global launch campaign for Sony FX9 Mark II in Tokyo & Iceland." },
    { year: "2024", title: "Vogue Creative Innovator Award", description: "Recognized for blending high-fashion cinematography with WebGL interactive platforms." },
    { year: "2023", title: "100K Digital Creator Community", description: "Surpassed 10,000 creators using Julian's Cinema LUTs and Notion Director OS." },
    { year: "2021", title: "First Short Film Cannes Selection", description: "'ECHOES OF SILENCE' selected at Cannes Short Film Corner." }
  ]
};

export const VIDEOS_DATA: VideoItem[] = [
  {
    id: "vid-1",
    title: "NEON DREAMS — 8K Cinematic Short Film",
    category: "Short Film",
    duration: "12:45",
    views: "2.4M",
    published: "2 weeks ago",
    thumbnail: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80",
    description: "An atmospheric exploration of night solitude in Shinjuku, filmed entirely on anamorphic lenses in 8K resolution.",
    youtubeId: "dQw4w9WgXcQ",
    gearUsed: ["RED V-Raptor 8K", "Atlas Orion Anamorphic 50mm T2", "Aputure 600d Pro", "DJI Ronin 2"],
    colorPalette: ["#020617", "#06b6d4", "#ec4899", "#f59e0b", "#38bdf8"],
    lutUsed: "Tokyo Teal & Magenta V3"
  },
  {
    id: "vid-2",
    title: "How I Color Grade 8K Anamorphic Footage in Premiere",
    category: "Tutorial",
    duration: "18:20",
    views: "890K",
    published: "1 month ago",
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
    description: "A complete step-by-step breakdown of my color workflow, LUT stacking technique, and skin tone protection.",
    youtubeId: "dQw4w9WgXcQ",
    gearUsed: ["Apple Mac Studio M2 Ultra", "Pro Display XDR", "DaVinci Resolve Studio", "Tangent Wave2"],
    colorPalette: ["#18181b", "#ea580c", "#ca8a04", "#0284c7", "#f43f5e"],
    lutUsed: "Kodak Vision3 500T Emulation"
  },
  {
    id: "vid-3",
    title: "Ultimate $50,000 Cinema Rig Breakdown (2026)",
    category: "Tech & Gear",
    duration: "22:15",
    views: "1.1M",
    published: "2 months ago",
    thumbnail: "https://images.unsplash.com/photo-1512790182412-b19e6d61b39a?auto=format&fit=crop&w=1200&q=80",
    description: "Every cable, monitor, battery plate, and wireless video receiver on my RED V-Raptor setup.",
    youtubeId: "dQw4w9WgXcQ",
    gearUsed: ["RED V-Raptor XL", "SmallHD Cine 7", "Teradek Bolt 4K", "Wooden Camera Rigging"],
    colorPalette: ["#09090b", "#27272a", "#52525b", "#a1a1aa", "#f4f4f5"],
    lutUsed: "Monochrome High Contrast"
  },
  {
    id: "vid-4",
    title: "Behind the Scenes with Nike Lab in Iceland",
    category: "Behind The Scenes",
    duration: "15:40",
    views: "640K",
    published: "3 months ago",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    description: "Battling -15°C temperatures, freezing glaciers, and high wind while directing Nike's winter apparel launch.",
    youtubeId: "dQw4w9WgXcQ",
    gearUsed: ["Sony FX6", "Sony 24-70mm GM II", "Core SWX Nano Batteries", "Pelican Storm Cases"],
    colorPalette: ["#0f172a", "#38bdf8", "#94a3b8", "#e2e8f0", "#ffffff"],
    lutUsed: "Arctic Frost Neutral"
  },
  {
    id: "vid-5",
    title: "The Architecture of Light: Studio Lighting Masterclass",
    category: "Tutorial",
    duration: "28:10",
    views: "1.4M",
    published: "4 months ago",
    thumbnail: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80",
    description: "How to shape light like Roger Deakins using negative fill, diffusion frames, and practical fixtures.",
    youtubeId: "dQw4w9WgXcQ",
    gearUsed: ["Aputure 1200d Pro", "Nanlite Pavilion Tubes", "Matthews C-Stands", "DoPchoice Snapgrid"],
    colorPalette: ["#1c1917", "#78350f", "#d97706", "#fef3c7", "#ffffff"],
    lutUsed: "Tungsten Warmth"
  },
  {
    id: "vid-6",
    title: "THE SOUND OF SILENCE — Documentary on Analog Audio",
    category: "Documentary",
    duration: "34:00",
    views: "720K",
    published: "6 months ago",
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80",
    description: "Exploring the legendary vinyl cutting engineers in Tokyo who preserve the warm soul of sound.",
    youtubeId: "dQw4w9WgXcQ",
    gearUsed: ["Canon C300 Mark III", "Sennheiser MKH416", "Sound Devices MixPre-6", "Leica R Prime Lenses"],
    colorPalette: ["#292524", "#78350f", "#b45309", "#d97706", "#fbbf24"],
    lutUsed: "Vintage Reel 35mm"
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "proj-1",
    title: "SONY FX9 — The Soul of Speed",
    client: "Sony Electronics",
    category: "Commercial",
    year: "2025",
    role: "Director & Director of Photography",
    coverImage: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=1200&q=80",
    summary: "Global launch commercial for Sony's flagship cinema camera captured in Tokyo Speedway and Mount Fuji.",
    challenge: "Deliver 4K 120fps high-action sports footage in low light conditions while maintaining cinematic depth of field.",
    solution: "Custom rigged dual FX9 cameras on high-speed pursuit vehicles with remote wireless optical control.",
    deliverables: ["60s TV Commercial", "30s Social Cutdown", "Behind The Scenes Film", "Key Print Photography"],
    stats: [
      { label: "Global Impressions", value: "18.4M" },
      { label: "Sales Increase", value: "+34%" },
      { label: "Cannes Lion Shortlist", value: "2025" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512790182412-b19e6d61b39a?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "proj-2",
    title: "LEICA M12 — Crafting Time",
    client: "Leica Camera AG",
    category: "Editorial",
    year: "2025",
    role: "Creative Director & Photographer",
    coverImage: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80",
    summary: "An editorial photographic journal highlighting master watchmakers in Geneva, Switzerland.",
    challenge: "Capture micro-mechanical precision in extreme close-ups without intrusive lighting equipment.",
    solution: "Used vintage Noctilux f/0.95 glass with ambient fiber-optic accents to create poetic depth.",
    deliverables: ["Hardcover Collector Monograph", "Editorial Campaign", "Digital Interactive Gallery"],
    stats: [
      { label: "Print Circulation", value: "120,000" },
      { label: "Exhibition", value: "Leica Gallery Wetzlar" },
      { label: "Awards", value: "PX3 Gold Award" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "proj-3",
    title: "NIKE LAB — Zero Gravity Outerwear",
    client: "Nike Inc.",
    category: "Commercial",
    year: "2024",
    role: "Director & VFX Supervisor",
    coverImage: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=80",
    summary: "Surreal winter outdoor campaign combining high-speed wirework with generative particle simulations.",
    challenge: "Synthesize frozen storm environments with photorealistic cloth simulation.",
    solution: "Shot on LED Volume stage in London combined with Unreal Engine 5 real-time backgrounds.",
    deliverables: ["Hero Commercial", "3D Interactive Web Experience", "Storefront Video Walls"],
    stats: [
      { label: "Campaign Engagement", value: "4.2M" },
      { label: "Product Sell-Out Time", value: "12 Hours" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "proj-4",
    title: "TEENAGE ENGINEERING — OP-XY Synth Launch",
    client: "Teenage Engineering",
    category: "Interactive 3D",
    year: "2024",
    role: "Interactive Designer & Sound Artist",
    coverImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80",
    summary: "Interactive WebGL synthesizer portal where visitors play real-time audio samples in 3D.",
    challenge: "Low-latency browser audio playback synchronized with 60fps 3D mesh deformation.",
    solution: "WebAudio API DSP engine paired with custom Three.js shaders.",
    deliverables: ["Interactive Product Portal", "Audio Sample Pack", "Design Documentary"],
    stats: [
      { label: "Awwwards Winner", value: "Site of the Day" },
      { label: "Unique Visitors", value: "1.8M" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: "prod-1",
    title: "THE CINEMA LUT COLLECTION V3 (2026 EDITION)",
    category: "Presets & LUTs",
    price: 49,
    originalPrice: 89,
    rating: 4.9,
    reviewsCount: 3420,
    badge: "BESTSELLER",
    tagline: "The exact 12 color grading LUTs used in Julian's commercial film work for Sony, Leica & Nike.",
    description: "Engineered specifically for Log footage (S-Log3, C-Log2, REDLog3G10, Arri LogC) and Rec.709. Preserves rich skin tones while giving deep filmic shadows and vibrant clean highlights.",
    coverImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
    features: [
      "12 Pro LUTs (.cube files for Premiere, DaVinci, Final Cut, CapCut)",
      "Rec.709 & Log versions included for each profile",
      "Skin Tone Protection Matrix built-in",
      "Grain & Halation Emulation PowerGrades (DaVinci Resolve)",
      "Free lifetime updates as new camera sensors launch"
    ],
    includes: ["12 .CUBE Files", "PDF Color Grading Guide", "DaVinci Resolve Node Trees", "Sample RAW Clips"],
    demoBeforeAfter: {
      before: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=800&q=80",
      after: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80"
    },
    downloadSize: "142 MB"
  },
  {
    id: "prod-2",
    title: "DIRECTOR OS — NOTION CREATOR MASTER SYSTEM",
    category: "Notion OS",
    price: 69,
    originalPrice: 120,
    rating: 4.95,
    reviewsCount: 1890,
    badge: "ESSENTIAL",
    tagline: "The operating system used to run a $500K/year creative studio.",
    description: "Everything you need to pitch clients, track video projects, organize script treatments, manage equipment inventories, and automate rate card proposals.",
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Client Pitching & Contract Template Vault",
      "Pre-Production Shot List & Storyboard Generator",
      "Equipment Inventory & Rental Tracking",
      "YouTube Content Calendar & Analytics Dashboard",
      "Sponsorship Rate Calculator & Invoice Builder"
    ],
    includes: ["Complete Notion Workspace", "15+ Custom Templates", "Video Walkthrough Tutorial"],
    downloadSize: "Instant Notion Duplicate Link"
  },
  {
    id: "prod-3",
    title: "CINEMATIC LIGHTING MASTERCLASS (FULL COURSE)",
    category: "Course",
    price: 199,
    originalPrice: 349,
    rating: 5.0,
    reviewsCount: 840,
    badge: "POPULAR",
    tagline: "Master lighting architecture, shadow design, and color contrast in 6 hours of high-bitrate video.",
    description: "Go on set with Julian across 8 real commercial video shoots. Learn key lighting setups for interviews, narrative short films, fashion commercials, and solo studio setups.",
    coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80",
    features: [
      "24 Video Modules (6+ Hours in 4K HDR)",
      "Interactive 3D Lighting Diagram Files",
      "3-Point to 10-Point Lighting Case Studies",
      "Direct Q&A Portal with Julian",
      "Certificate of Completion & Discord Community Access"
    ],
    includes: ["24 HD Video Lessons", "3D Lighting Files (.blend)", "PDF Lighting Diagrams"],
    downloadSize: "Online Streaming + Offline Downloads"
  },
  {
    id: "prod-4",
    title: "ANAMORPHIC FX & LIGHT LEAKS PACK",
    category: "FX Templates",
    price: 39,
    originalPrice: 59,
    rating: 4.8,
    reviewsCount: 620,
    tagline: "Real 8K optical light leaks, lens flares, and film grain overlays captured on 35mm glass.",
    description: "Drag-and-drop blend mode overlays captured on authentic vintage anamorphic lenses. Works in any NLE software.",
    coverImage: "https://images.unsplash.com/photo-1512790182412-b19e6d61b39a?auto=format&fit=crop&w=1200&q=80",
    features: [
      "35 Real Anamorphic Lens Flare Overlays (ProRes 422 HQ)",
      "20 Organic Film Grain Files (8K Resolution)",
      "10 Film Gate Transitions & Flash Frames"
    ],
    includes: ["65 ProRes Video Files", "Installation Guide"],
    downloadSize: "4.2 GB"
  },
  {
    id: "prod-5",
    title: "THE FILMMAKER'S GUIDE TO BRAND DEALS (EBOOK)",
    category: "Ebook",
    price: 29,
    rating: 4.85,
    reviewsCount: 1120,
    tagline: "How to negotiate 5-figure brand partnerships without compromising creative integrity.",
    description: "120 pages of practical negotiation strategies, email scripts, deliverables scope templates, and pricing charts from a director who has closed over $1M in sponsorships.",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80",
    features: [
      "120 Page Interactive PDF & EPUB",
      "Copy-Paste Brand Outreach Email Scripts",
      "Usage Rights & Licensing Fee Calculator"
    ],
    includes: ["PDF, EPUB, & Kindle Formats", "Spreadsheet Rate Calculator"],
    downloadSize: "18 MB"
  },
  {
    id: "prod-6",
    title: "MOTION INNER CIRCLE MEMBERSHIP",
    category: "Membership",
    price: 29,
    rating: 4.95,
    reviewsCount: 1240,
    badge: "COMMUNITY",
    tagline: "Monthly live color grading feedback, raw project files, private Discord, and direct mentorship.",
    description: "Join 1,200+ elite creators getting monthly raw camera footage downloads, project file teardowns, live video reviews, and insider job boards.",
    coverImage: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Monthly 8K RAW Video Files for Practice",
      "Bi-Weekly Live Group Review Streams with Julian",
      "Private Discord with Exclusive Film Job Board",
      "50% Discount on all Digital Products"
    ],
    includes: ["Instant Discord Role Access", "Member Vault Archives"],
    downloadSize: "Subscription Access"
  }
];

export const PODCAST_DATA: PodcastEpisode[] = [
  {
    id: "pod-1",
    number: 48,
    title: "The Future of Synthetic Cinema & AI Storytelling",
    guest: "Dr. Evelyn Vance",
    guestRole: "Generative AI Research Lead",
    duration: "1h 14m",
    publishDate: "July 24, 2026",
    coverImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80",
    summary: "Exploring how generative video models will alter cinematic production pipelines, real-time camera tracking, and human-AI director workflows.",
    keyTakeaways: [
      "Why human emotional intent remains the core constraint of generative cinema",
      "How NeRFs and Gaussian Splatting enable virtual location scoutings",
      "Redefining copyright and actor likeness protection in synthetic media"
    ],
    spotifyUrl: "https://spotify.com",
    appleUrl: "https://apple.com",
    timestamps: [
      { time: "00:00", label: "Introduction & State of AI Cinema" },
      { time: "14:20", label: "Breaking Down Generative Video Quality" },
      { time: "32:15", label: "Real-time LED Volume Virtual Production" },
      { time: "58:40", label: "Advice for Young Directors in 2026" }
    ]
  },
  {
    id: "pod-2",
    number: 47,
    title: "Shooting 35mm Film in Tokyo with Leica",
    guest: "Kenji Sato",
    guestRole: "Master Street Photographer",
    duration: "58m",
    publishDate: "July 10, 2026",
    coverImage: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80",
    summary: "Kenji Sato discusses his 30-year journey shooting high-contrast night street photography in Shinjuku, grain chemistry, and finding beauty in urban shadows.",
    keyTakeaways: [
      "The philosophy of 'One Lens, One Camera, One Year'",
      "Why analog film grain creates emotional texture digital sensors miss",
      "Navigating urban lighting and neon colors at night"
    ],
    spotifyUrl: "https://spotify.com",
    appleUrl: "https://apple.com",
    timestamps: [
      { time: "00:00", label: "Intro to Night Street Photography" },
      { time: "12:10", label: "Choosing the Right Film Stock" },
      { time: "28:45", label: "Darkroom Printing Secrets" }
    ]
  },
  {
    id: "pod-3",
    number: 46,
    title: "Designing Spatial Audio for Sci-Fi Blockbusters",
    guest: "Maya Lin",
    guestRole: "Academy Award-Nominated Sound Designer",
    duration: "1h 22m",
    publishDate: "June 28, 2026",
    coverImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80",
    summary: "Inside the Foley pits and modular synth labs that generated the iconic soundscapes for recent Hollywood sci-fi epics.",
    keyTakeaways: [
      "Using contact microphones on frozen metal to build alien sound engines",
      "Sub-bass frequency management for cinema subwoofers",
      "Spatial audio mixing in Dolby Atmos"
    ],
    spotifyUrl: "https://spotify.com",
    appleUrl: "https://apple.com",
    timestamps: [
      { time: "00:00", label: "Foley Recording Mastery" },
      { time: "22:00", label: "Modular Synth Sound Design" },
      { time: "45:30", label: "Dolby Atmos Spatial Mixing" }
    ]
  }
];

export const GEAR_VAULT: GearItem[] = [
  { name: "RED V-Raptor 8K VV", category: "Cameras", specs: "8K 120fps, REDCODE RAW, Vista Vision Sensor", rating: "Primary", link: "#" },
  { name: "Sony FX6 Cinema Camera", category: "Cameras", specs: "Full Frame 4K 120fps, Dual Base ISO", rating: "Secondary/B-Cam", link: "#" },
  { name: "Leica M11 Monochrom", category: "Cameras", specs: "60MP Full Frame Dedicated Black & White", rating: "Personal Stills", link: "#" },
  { name: "Atlas Orion Anamorphic 2x Set", category: "Lenses", specs: "32mm, 50mm, 80mm T2.0 Anamorphic", rating: "Hero Glass", link: "#" },
  { name: "Leica R Vintage Prime Set", category: "Lenses", specs: "19mm, 28mm, 35mm, 50mm, 80mm Summilux", rating: "Vintage Character", link: "#" },
  { name: "Shure SM7B + Cloudlifter", category: "Audio", specs: "Cardioid Dynamic Vocal Microphone", rating: "Studio Mic", link: "#" },
  { name: "Sennheiser MKH 416 Shotgun", category: "Audio", specs: "Moisture-resistant Shotgun Mic", rating: "Film Audio", link: "#" },
  { name: "Sound Devices MixPre-6 II", category: "Audio", specs: "32-Bit Float Audio Recorder", rating: "Location Sound", link: "#" },
  { name: "Aputure 600d Pro Daylight", category: "Lighting", specs: "COB LED 600W, Bowens Mount", rating: "Key Light", link: "#" },
  { name: "Nanlite Pavotube II 30X (4 Pack)", category: "Lighting", specs: "RGBWW Pixel Tubes, Battery Powered", rating: "Practical Accents", link: "#" },
  { name: "Apple Mac Studio M2 Ultra", category: "Computing & Post", specs: "192GB RAM, 8TB NVMe, 76-Core GPU", rating: "Primary Rig", link: "#" },
  { name: "Pro Display XDR 32\"", category: "Computing & Post", specs: "6K Retina, 1600 nits Peak Brightness", rating: "Color Grading", link: "#" },
  { name: "DaVinci Resolve Micro Panel", category: "Computing & Post", specs: "Hardware Color Trackballs", rating: "Grading Control", link: "#" }
];

export const MEDIA_KIT_STATS = {
  demographics: [
    { country: "United States", percentage: 42 },
    { country: "United Kingdom", percentage: 14 },
    { country: "Germany & EU", percentage: 18 },
    { country: "Japan & East Asia", percentage: 16 },
    { country: "Canada & Australia", percentage: 10 }
  ],
  ageGroup: [
    { range: "18 - 24", percentage: 28 },
    { range: "25 - 34", percentage: 54 },
    { range: "35 - 44", percentage: 14 },
    { range: "45+", percentage: 4 }
  ],
  gender: { male: 68, female: 30, other: 2 },
  topCategories: ["Filmmaking & Cinema", "High-End Tech & Computing", "Photography & Glass", "Software & AI Tools", "Luxury Travel & Gear"],
  pastPartners: [
    { name: "Sony Alpha", logo: "SONY", year: "2024-2026", campaign: "FX Series Launch" },
    { name: "Leica Camera", logo: "LEICA", year: "2025", campaign: "M11 Monochrom Campaign" },
    { name: "Aputure", logo: "APUTURE", year: "2024", campaign: "Lighting Masterclass" },
    { name: "SanDisk Extreme", logo: "SANDISK", year: "2025", campaign: "8K Workflow Storage" },
    { name: "Teenage Engineering", logo: "TEENAGE ENG", year: "2024", campaign: "Synthesizer Design" },
    { name: "Frame.io", logo: "FRAME.IO", year: "2025", campaign: "Cloud Collaboration" }
  ]
};

export const CONSULTATION_SESSIONS = [
  {
    id: "session-1",
    title: "1:1 Creative Direction & Film Review",
    duration: "60 Minutes",
    price: 350,
    description: "Deep-dive feedback on your short film, commercial cut, or pitch deck. Julian reviews your frame composition, color grade, story arc, and lighting setup.",
    includes: ["Pre-call video review (up to 15 mins footage)", "60-min live Zoom session", "Written actionable teardown PDF"]
  },
  {
    id: "session-2",
    title: "YouTube Channel & Audience Growth Audit",
    duration: "90 Minutes",
    price: 500,
    description: "Comprehensive breakdown of your creator brand, thumbnail strategy, retention editing, title optimization, and digital product monetization funnel.",
    includes: ["Complete channel analytics audit", "Thumbnail & title teardown", "90-min strategy roadmap call", "Action plan template"]
  },
  {
    id: "session-3",
    title: "Studio Setup & Gear Consultation",
    duration: "45 Minutes",
    price: 250,
    description: "Design your dream cinema or YouTube studio setup based on your exact budget, room acoustics, and lighting space.",
    includes: ["Customized equipment purchasing list", "Room placement diagram", "45-min technical setup call"]
  }
];
