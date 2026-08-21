import { services } from "./services";

export { services } from "./services";

export const siteConfig = {
  name: "Brand Mafia",
  tagline: "Building Brands That Dominate.",
  logo: "/images/brand-mafia.png",
  favicon: "/images/favicon.jpeg",
  description:
    "Premium digital marketing agency specializing in SEO, paid ads, branding, web development, and AI automation. We build brands that dominate.",
  url: "https://brandmafia.com",
  email: "info@brandmafia.co",
  phone: "+1 (782) 882-1814",
  whatsapp: "+17828821814",
  address: {
    street: "123 Marketing Avenue",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "US",
  },
  social: {
    twitter: "https://twitter.com/brandmafia",
    instagram: "https://www.instagram.com/brandmafia.co",
    linkedin: "https://www.linkedin.com/in/the-brand-mafia-42b716422/",
    facebook: "https://www.facebook.com/brandmafia",
    youtube: "https://youtube.com/@brandmafia",
  },
  calendly: "tel:+17828821814",
};

/**
 * Site-wide navigation style.
 * "pill"    — floating pill header with logo, links, and CTA (PillNavbar)
 * "classic" — original fixed header with underline links (Navbar)
 * "bottom"  — floating pill bar docked to the bottom of the viewport (BottomNav)
 */
export const navigationVariant: "pill" | "classic" | "bottom" = "pill";

export const navLinks = [
  // { label: "About", href: "/about" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  // { label: "Portfolio", href: "/portfolio" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Pricing", href: "/pricing" },
  // { label: "Blog", href: "/blog" },
  // { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const heroServices = [
  "SEO",
  "Paid Ads",
  "Branding",
  "Web Development",
  "Social Media",
  "AI Automation",
];

export const clientLogos = [
  "lalajithebarbershop",
  "lalaspizza",
  "lalascafe.ca",
  "activeaway",
  // "GreenPeak",
  // "SwiftPay",
  // "AuraSkin",
  // "CloudNine",
  // "BoldCraft",
  // "ZenithCo",
];

export const stats = [
  { value: 200, suffix: "+", label: "Projects" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 10, suffix: "M+", label: "Ad Spend Managed", prefix: "" },
  { value: 500, suffix: "%", label: "Average ROAS" },
];

export const aboutHero = {
  label: "About Us",
  title: "Creators. Builders.",
  titleHighlight: "Growth Partners.",
  description:
    "We're a team of creators and entrepreneurs — some who live and breathe content and storytelling, others who've already built real, established businesses in our own community from the ground up.",
  features: [
    {
      title: "Real Experience",
      description: "We've built, scaled and sold businesses.",
      icon: "Briefcase",
    },
    {
      title: "Results That Matter",
      description: "Impact-driven strategies that move the needle.",
      icon: "Target",
    },
    {
      title: "People First",
      description: "We treat your brand like it's our own.",
      icon: "Heart",
    },
  ],
  badge: {
    line1: "Built on Trust.",
    line2: "Driven by Impact.",
  },
};

export const aboutJourney = {
  label: "Our Journey",
  title: "We've Already Done It",
  paragraphs: [
    "We're a team of creators and entrepreneurs — some who live and breathe content and storytelling, others who've already built real, established businesses in our own community from the ground up. Together, that means we don't just tell you what should work. We've already done it.",
    "We've built businesses from scratch — sourcing inventory, setting up operations, growing brands from a single idea into something people trust. We've taken an existing shop and turned it into a name recognized across the region. We've grown creators into recognized personal brands, and shaped the look, story, and feel behind cafés and salons — from the logo on the wall to the content on the feed.",
    "That's the difference. We don't just manage your social media. We build brands the same way we built our own — step by step, with real skin in the game.",
    "If you're starting from nothing or ready to scale to the next level, we're not here as outside consultants. We're here as people who've built what you're trying to build.",
  ],
};

export const aboutStats = [
  {
    value: 200,
    suffix: "+",
    label: "Projects Delivered",
    description: "Successful campaigns and brand builds across industries.",
    icon: "Briefcase",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Long-term partnerships built on trust and results.",
    icon: "Heart",
  },
  {
    value: 10,
    suffix: "M+",
    label: "Ad Spend Managed",
    description: "Strategic investment in measurable growth.",
    icon: "DollarSign",
    display: "10M+",
  },
  {
    value: 500,
    suffix: "%",
    label: "Average ROAS",
    description: "Performance that delivers real business impact.",
    icon: "TrendingUp",
  },
];

export const aboutWhyWorkWithUs = {
  label: "Why Work With Us?",
  title: "We Don't Just Market. We",
  titleHighlight: "Build With You.",
  items: [
    {
      title: "Entrepreneurial Mindset",
      description:
        "We've built businesses from scratch — not just campaigns. We understand operations, inventory, and what it takes to grow from zero.",
      icon: "Lightbulb",
    },
    {
      title: "End-to-End Execution",
      description:
        "From brand identity and content to ads and automation — one team that handles the full growth stack.",
      icon: "Layers",
    },
    {
      title: "Transparent & Honest",
      description:
        "Clear reporting, honest recommendations, and strategies built around measurable business growth — not vanity metrics.",
      icon: "ShieldCheck",
    },
    {
      title: "Obsessed With Growth",
      description:
        "Every decision is tied to discovery, trust, and action. We scale what produces real results for your business.",
      icon: "Rocket",
    },
  ],
  quote:
    "From early ideas to industry leaders — we've been part of the journey.",
  quoteHighlight: "journey.",
  images: [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  ],
};

export const whyStats = [
  { value: 200, suffix: "+", label: "Projects Launched" },
  { value: 50, suffix: "+", label: "Team Members" },
  { value: 10, suffix: "M+", label: "Of Digital Spends", display: "10M+" },
];

export const servicesStats = [
  {
    value: 200,
    suffix: "+",
    label: "Projects Delivered",
    icon: "Briefcase",
  },
  {
    value: 50,
    suffix: "+",
    label: "Brands Empowered",
    icon: "Users",
  },
  {
    value: 10,
    suffix: "M+",
    label: "Ad Spend Managed",
    display: "10M+",
    icon: "Megaphone",
  },
  {
    value: 500,
    suffix: "%",
    label: "Average ROAS",
    icon: "TrendingUp",
  },
];

export const brandGrowthLayers = [
  {
    id: "strategy",
    title: "Strategy",
    subtitle: "Discovery & Positioning",
    description:
      "We map your market, define your audience, and build a growth roadmap that turns ambition into a clear, measurable plan.",
    icon: "Compass",
  },
  {
    id: "creative",
    title: "Creative",
    subtitle: "Brand & Content",
    description:
      "From identity systems to scroll-stopping creative, we craft assets that make your brand impossible to ignore.",
    icon: "Palette",
  },
  {
    id: "performance",
    title: "Performance",
    subtitle: "Paid Media & SEO",
    description:
      "Data-driven campaigns across search, social, and display — optimized relentlessly for leads, sales, and ROAS.",
    icon: "TrendingUp",
  },
  {
    id: "automation",
    title: "Automation",
    subtitle: "Scale & Intelligence",
    description:
      "AI-powered workflows, email sequences, and analytics dashboards that multiply output without multiplying headcount.",
    icon: "Bot",
  },
];

export const showcasePillars = [
  {
    label: "Media",
    image:
      "/images/MEDIA.webp",
  },
  {
    label: "Discovery",
    image:
      "/images/DISCOVERY.webp",
  },
  {
    label: "Strategy",
    image:
      "/images/STRATEGY.webp",
  },
  {
    label: "Content",
    image:
      "/images/CONTENT.webp",
  },
  {
    label: "Commerce",
    image:
      "/images/COMMERCE.webp",
  },
];

export const projects = [
  {
    id: "lalaji-the-barbershop",
    title: "Lalaji The Barbershop",
    client: "Lalaji The Barbershop",
    category: "SEO",
    image: "/images/case-study/lalajithebarbershop.png",
    description:
      "From a local barbershop to a growing Nova Scotia brand — visibility, bookings, and a digital presence that matches the chair.",
    results: ["2.4M+ people reached", "8K+ appointments generated"],
    metrics: [
      { value: "2.4M+", label: "People Reached" },
      { value: "8K+", label: "Appointments" },
    ],
  },
  {
    id: "lalas-pizza",
    title: "Lala's Pizza",
    client: "Lala's Pizza",
    category: "Branding",
    image: "/images/case-study/lalas-hero.png",
    description:
      "From restaurant launch to a digital food brand — website, social, ads, and local SEO from day one.",
    results: ["1.2M+ reach", "18.5K+ orders"],
    metrics: [
      { value: "1.2M+", label: "Reach" },
      { value: "18.5K+", label: "Orders" },
    ],
  },
  {
    id: "lalas-cafe",
    title: "Lala's Cafe",
    client: "Lala's Cafe",
    category: "Web Design",
    image: "/images/case-study/lalas-cafe-hero.png",
    description:
      "From new cafe launch to a digital-first local brand — website, video, social, and local SEO from day one.",
    results: ["187+ visitors daily", "93% positive feedback"],
    metrics: [
      { value: "187+", label: "Daily Visitors" },
      { value: "93%", label: "Positive Feedback" },
    ],
  },
  {
    id: "oohlalablume",
    title: "Blume Salon & Spa",
    client: "Blume Salon & Spa",
    category: "Paid Ads",
    image: "/images/case-study/blume-hero.png",
    description:
      "Turning digital visibility into real beauty bookings — Meta Ads and local SEO that brought the right clients into the salon.",
    results: ["250+ conversions", "10X+ return on ad spend"],
    metrics: [
      { value: "250+", label: "Conversions" },
      { value: "10X+", label: "ROAS" },
    ],
  },
  {
    id: "active-away",
    title: "Active Away",
    client: "Active Away",
    category: "SEO",
    image: "/images/case-study/active-away-hero.png",
    description:
      "Ranking a UK tennis holiday brand on page one of Google — SEO for the searches their customers actually use.",
    results: ["Page 1 Google rankings", "Multiple high-value keywords"],
    metrics: [
      { value: "Page 1", label: "Google Rankings" },
      { value: "UK", label: "Market Visibility" },
    ],
  },
  // {
  //   id: "luxora-rebrand",
  //   title: "Luxora Rebrand",
  //   client: "Luxora",
  //   category: "Branding",
  //   image:
  //     "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  //   description: "Complete brand transformation for a luxury skincare line.",
  //   results: ["340% increase in brand awareness", "2.5x social engagement"],
  //   metrics: [
  //     { value: "340%", label: "Brand Awareness" },
  //     { value: "2.5x", label: "Social Engagement" },
  //   ],
  // },
  // {
  //   id: "techvault-seo",
  //   title: "TechVault SEO",
  //   client: "TechVault",
  //   category: "SEO",
  //   image:
  //     "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  //   description: "Organic traffic domination for a SaaS startup.",
  //   results: ["450% organic traffic growth", "#1 rankings for 28 keywords"],
  //   metrics: [
  //     { value: "450%", label: "Organic Traffic" },
  //     { value: "#1", label: "Keyword Rankings" },
  //   ],
  // },
  // {
  //   id: "primefit-ads",
  //   title: "PrimeFit Campaign",
  //   client: "PrimeFit",
  //   category: "Paid Ads",
  //   image:
  //     "https://images.pexels.com/photos/36106736/pexels-photo-36106736.jpeg?_gl=1*1etmlr9*_ga*MTIyNzM3NjE3MC4xNzg2MzgxMjg1*_ga_8JE65Q40S6*czE3ODYzODEyODUkbzEkZzEkdDE3ODYzODEyOTckajQ4JGwwJGgw",
  //   description: "Multi-channel paid media strategy for fitness brand.",
  //   results: ["620% ROAS", "$2.1M revenue generated"],
  //   metrics: [
  //     { value: "620%", label: "ROAS" },
  //     { value: "$2.1M", label: "Revenue" },
  //   ],
  // },
  // {
  //   id: "novalabs-web",
  //   title: "NovaLabs Platform",
  //   client: "NovaLabs",
  //   category: "Web Design",
  //   image:
  //     "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
  //   description: "Award-winning web experience for AI startup.",
  //   results: ["85% bounce rate reduction", "3x conversion rate"],
  //   metrics: [
  //     { value: "85%", label: "Bounce Drop" },
  //     { value: "3x", label: "Conversion Rate" },
  //   ],
  // },
  // {
  //   id: "auraskin-social",
  //   title: "AuraSkin Social",
  //   client: "AuraSkin",
  //   category: "Social Media",
  //   image:
  //     "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
  //   description: "Viral social media strategy for beauty brand.",
  //   results: ["1M+ followers gained", "890% engagement increase"],
  //   metrics: [
  //     { value: "1M+", label: "Followers" },
  //     { value: "890%", label: "Engagement" },
  //   ],
  // },
  // {
  //   id: "swiftpay-growth",
  //   title: "SwiftPay Growth",
  //   client: "SwiftPay",
  //   category: "Paid Ads",
  //   image:
  //     "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  //   description: "Performance marketing for fintech app launch.",
  //   results: ["500K app downloads", "4.2x LTV improvement"],
  //   metrics: [
  //     { value: "500K", label: "Downloads" },
  //     { value: "4.2x", label: "LTV" },
  //   ],
  // },
];

export const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "Deep dive into your brand, market, and competitive landscape.",
  },
  {
    step: "02",
    title: "Strategy",
    description: "Custom roadmap aligned with your goals and growth targets.",
  },
  {
    step: "03",
    title: "Execution",
    description: "Flawless implementation across all channels and touchpoints.",
  },
  {
    step: "04",
    title: "Optimization",
    description: "Continuous testing and refinement for peak performance.",
  },
  {
    step: "05",
    title: "Growth",
    description: "Scale what works and dominate your market segment.",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CEO, Luxora",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=400&fit=crop&q=80",
    rating: 5,
    text: "Brand Mafia transformed our entire digital presence. Our revenue tripled in 6 months. They're not just marketers — they're growth partners.",
  },
  {
    id: 2,
    name: "Marcus Williams",
    role: "Founder, TechVault",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&q=80",
    rating: 5,
    text: "The SEO results speak for themselves. We went from page 5 to #1 for our core keywords. Absolutely phenomenal work.",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "CMO, PrimeFit",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=400&fit=crop&q=80",
    rating: 5,
    text: "Their paid ads strategy generated a 620% ROAS. I've worked with many agencies — Brand Mafia is in a league of their own.",
  },
  {
    id: 4,
    name: "David Park",
    role: "Director, NovaLabs",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=400&fit=crop&q=80",
    rating: 5,
    text: "From branding to web development, every deliverable exceeded expectations. Premium quality at every touchpoint.",
  },
  {
    id: 5,
    name: "Priya Mehta",
    role: "Founder, AuraSkin",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=400&fit=crop&q=80",
    rating: 5,
    text: "They understood our brand before we even finished the brief. The social strategy felt like us — just sharper, louder, and impossible to ignore.",
  },
  {
    id: 6,
    name: "James Okonkwo",
    role: "CEO, SwiftPay",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=400&fit=crop&q=80",
    rating: 5,
    text: "We needed growth without burning the brand. Brand Mafia built a performance engine that actually compounds. Month after month, the numbers climb.",
  },
  {
    id: 7,
    name: "Hannah Lee",
    role: "Marketing Lead, GreenPeak",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=400&fit=crop&q=80",
    rating: 5,
    text: "Local SEO finally clicked. We're the first name people see — and the one they trust. Inquiries went from a trickle to a waitlist.",
  },
  {
    id: 8,
    name: "Tom Brennan",
    role: "Founder, CloudNine",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=400&fit=crop&q=80",
    rating: 5,
    text: "The website they built doesn't just look premium — it converts. Every page has a job. We stopped guessing and started growing.",
  },
  {
    id: 9,
    name: "Aisha Rahman",
    role: "CMO, BoldCraft",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop&q=80",
    rating: 5,
    text: "They treat branding like a business decision, not a mood board. Our identity finally matches the company we actually are.",
  },
];

export const team = [
  {
    name: "Alex Rivera",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Jordan Blake",
    role: "Head of Strategy",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Mia Thompson",
    role: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Chris Anderson",
    role: "Performance Lead",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80",
    social: { linkedin: "#", twitter: "#" },
  },
];

export const whyChooseUs = [
  "Results-Driven Marketing Strategies",
  "Lead Generation Focused Campaigns",
  "Creative Content That Converts",
  "Transparent Reporting",
  "Dedicated Growth Support",
  "Customized Marketing Plans",
  "Industry-Specific Expertise",
];

export const pricingPlans = [
  {
    id: "starter-growth",
    name: "Starter Growth",
    price: "$3,000–3,500",
    quarterlyPrice: "$2,550–2,975",
    period: "/month + Ad Spend",
    description:
      "Perfect for startups, local businesses, salons, barbershops, restaurants, cafes, and service-based businesses looking to establish a strong online presence.",
    highlights: [
      "Facebook & Instagram Management",
      "8–12 Custom Branded Posts & Reels",
      "Google Business Profile Optimization",
      "Meta Ads OR Google Ads Management",
      "Monthly Performance Report",
    ],
    inherits: null,
    featureGroups: [
      {
        title: "Social Media Management",
        items: [
          "Facebook & Instagram Management",
          "Profile Optimization",
          "Monthly Content Strategy",
          "Hashtag Research",
          "Content Scheduling",
        ],
      },
      {
        title: "Content Creation",
        items: [
          "8–12 Custom Branded Posts",
          "8–10 Reels",
          "Story Designs",
          "Promotional Banners",
        ],
      },
      {
        title: "Brand Growth",
        items: [
          "Social Media Audit",
          "Competitor Analysis",
          "Content Strategy Recommendations",
        ],
      },
      {
        title: "Google Business Profile",
        items: [
          "Google Business Profile Optimization",
          "Service & Product Updates",
          "Local Visibility Improvements",
        ],
      },
      {
        title: "Paid Advertising",
        items: [
          "Meta Ads OR Google Ads Management",
          "Campaign Setup & Monitoring",
          "Audience Targeting",
          "Lead Generation Campaigns",
        ],
      },
      {
        title: "Reporting",
        items: [
          "Monthly Performance Report",
          "Reach & Engagement Analysis",
          "Ad Performance Summary",
        ],
      },
    ],
    bestFor:
      "Businesses looking to build brand awareness and generate consistent inquiries.",
    highlighted: false,
    cta: "Get Started",
    ctaHref: siteConfig.calendly,
  },
  {
    id: "business-growth",
    name: "Business Growth",
    price: "$4,000–5,500",
    period: "/month + Ad Spend",
    description:
      "For businesses looking to generate more leads, appointments, bookings, and sales.",
    inherits: "Starter Growth",
    featureGroups: [
      {
        title: "Advanced Social Media Management",
        items: [
          "16–20 Professional Posts",
          "15–20 Story Designs",
          "12–15 Reels + 2–3 YouTube Videos",
          "Monthly Content Calendar",
          "Community Engagement Strategy",
        ],
      },
      {
        title: "Marketing Campaigns",
        items: [
          "Promotional Campaign Creation",
          "Seasonal Campaigns",
          "Offer Design & Marketing",
          "Customer Acquisition Strategy",
        ],
      },
      {
        title: "Advertising Management",
        items: [
          "Meta Ads Management",
          "Lead Generation Campaigns",
          "Conversion Campaigns",
          "Retargeting Campaigns",
        ],
      },
      {
        title: "Market Research",
        items: [
          "Competitor Research",
          "Market Positioning Analysis",
          "Customer Persona Development",
        ],
      },
      {
        title: "Google Business Profile Growth",
        items: [
          "Weekly Updates",
          "Local Ranking Strategy",
          "Review Management Guidance",
        ],
      },
      {
        title: "Performance Tracking",
        items: [
          "Monthly Strategy Consultation",
          "Lead Tracking Report",
          "ROI Analysis",
        ],
      },
    ],
    bestFor:
      "Growing businesses ready to scale their customer acquisition efforts.",
    highlighted: true,
    cta: "Book a Strategy Call",
    ctaHref: siteConfig.calendly,
  },
  {
    id: "scale-dominate",
    name: "Scale & Dominate",
    price: "$10,000",
    period: "/month + Ad Spend",
    description:
      "For established businesses focused on aggressive growth and market leadership.",
    inherits: "Business Growth",
    featureGroups: [
      {
        title: "Full-Funnel Marketing",
        items: [
          "Meta Ads Management",
          "Google Ads Management",
          "Retargeting Funnels",
          "Conversion Optimization",
        ],
      },
      {
        title: "Premium Content Creation",
        items: [
          "20–30 Premium Posts Monthly",
          "Reels Strategy & Planning",
          "15–25 Reels & YouTube Videos",
          "Video Marketing Consultation",
          "Story Campaigns",
          "UGC & Creator Collaborations",
        ],
      },
      {
        title: "Business Growth Consulting",
        items: [
          "Weekly Strategy Meetings",
          "Market Expansion Planning",
          "Sales Funnel Optimization",
          "Brand Positioning Strategy",
        ],
      },
      {
        title: "Lead Generation Systems",
        items: [
          "Lead Capture Funnel Setup",
          "Landing Page Recommendations",
          "CRM Integration Support",
          "Conversion Tracking",
        ],
      },
      {
        title: "Email & SMS Marketing",
        items: [
          "Campaign Setup",
          "Customer Retention Campaigns",
          "Promotional Broadcast Campaigns",
        ],
      },
      {
        title: "Website Support",
        items: [
          "Website Content Updates",
          "Landing Page Optimization",
          "Conversion Tracking Setup",
        ],
      },
      {
        title: "Executive Reporting",
        items: [
          "Monthly Growth Dashboard",
          "ROI Tracking",
          "Cost Per Lead Analysis",
          "Strategic Growth Recommendations",
        ],
      },
    ],
    bestFor:
      "Businesses seeking consistent lead generation, sales growth, and long-term market dominance.",
    highlighted: false,
    cta: "Talk to Us",
    ctaHref: "/contact",
  },
];

export const solutions = [
  {
    id: "what-makes-us-different",
    title: "What makes Brand Mafia different from other agencies?",
    description:
      "We combine data-driven performance marketing with premium creative execution. Every strategy is custom-built for your brand — no templates, no cookie-cutter approaches. Our average client sees 500% ROAS.",
    ctaLabel: "Learn more",
    ctaHref: "/about",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=80",
  },
  {
    id: "how-long-results",
    title: "How long before I see results?",
    description:
      "Paid ads typically show results within 2-4 weeks. SEO is a longer game — expect meaningful improvements in 3-6 months. We set clear milestones and keep you informed every step of the way.",
    ctaLabel: "See case studies",
    ctaHref: "/case-studies",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
  },
  {
    id: "startups",
    title: "Do you work with startups?",
    description:
      "Absolutely. Our Starter Growth package is designed for emerging brands and local businesses. We've helped dozens of startups go from zero to market leaders.",
    ctaLabel: "View packages",
    ctaHref: "/pricing",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80",
  },
  {
    id: "strategy-call",
    title: "What's included in the free strategy call?",
    description:
      "A 30-minute consultation where we audit your current marketing, identify growth opportunities, and outline a custom strategy — completely free, no obligations.",
    ctaLabel: "Book a call",
    ctaHref: siteConfig.calendly,
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80",
  },
  {
    id: "switch-plans",
    title: "Can I upgrade my package later?",
    description:
      "Yes. We offer flexible month-to-month contracts. Move from Starter Growth to Business Growth or Scale & Dominate whenever your business is ready for more.",
    ctaLabel: "Compare packages",
    ctaHref: "/pricing",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80",
  },
  {
    id: "white-label",
    title: "Do you offer white-label services?",
    description:
      "Yes, we partner with agencies and consultants who need premium execution capabilities. Contact us for white-label pricing.",
    ctaLabel: "Partner with us",
    ctaHref: "/contact",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80",
  },
];

export const blogFilterCategories = [
  "All Posts",
  "Digital Marketing",
  "SEO",
  "Branding",
  "Web Development",
  "Social Media",
  "Paid Ads",
  "Content Marketing",
] as const;

export const blogPhilosophy = {
  title: "The Brand Mafia Philosophy",
  paragraphs: [
    "We do not build marketing around platforms. We build it around people, behavior, trust, and measurable business growth.",
    "Whether it is SEO, ads, websites, branding, content, automation, or performance marketing, our goal is the same: make the business easier to discover, easier to trust, and easier to choose.",
  ],
  quote: "Clarity creates trust. Trust creates action. Action creates growth.",
};

export const blogPosts = [
  // {
  //   slug: "local-seo-for-local-businesses",
  //   title: "What SEO Really Looks Like for Local Businesses",
  //   excerpt:
  //     "SEO is not just keywords and backlinks. For Brand Mafia, it begins with understanding how real customers search for pizza, coffee, haircuts, and flower delivery in Halifax.",
  //   category: "SEO",
  //   filterCategory: "SEO",
  //   readTime: "6 min read",
  //   date: "Aug 15, 2026",
  //   image:
  //     "https://images.unsplash.com/photo-1432888622747-4eb9e8eb2f8c?w=1200&q=80",
  //   content: [
  //     "SEO is not just keywords and backlinks. For Brand Mafia, it begins with understanding how real customers search for pizza, coffee, haircuts, and flower delivery in Halifax.",
  //     "Working with Blume, Lalaji Barbershop, Lala's Café, and Lala's Pizza showed us that local SEO is fundamentally about digital trust. We aligned websites, Google Business Profiles, reviews, service pages, and customer intent so that people searching with urgency could find the right business with confidence.",
  //   ],
  //   quote:
  //     "Local SEO works when Google can clearly understand who you are, where you are, what you offer, and why customers trust you.",
  // },
  // {
  //   slug: "google-ads-not-like-typical-agency",
  //   title: "Why We Don't Run Google Ads Like a Typical Agency",
  //   excerpt:
  //     "We optimize for revenue, not vanity metrics — turning search intent into orders, bookings, and purchases for local businesses.",
  //   category: "Google Ads",
  //   filterCategory: "Paid Ads",
  //   readTime: "5 min read",
  //   date: "Aug 14, 2026",
  //   image:
  //     "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
  //   content: [
  //     "We optimize for revenue, not vanity metrics.",
  //     "For Lala's Pizza, we targeted delivery and menu intent. For Lalaji Barbershop, we focused on local appointment searches. For Blume, we built campaigns around emotional moments such as birthdays and anniversaries.",
  //   ],
  //   quote:
  //     "The goal is not to buy traffic. The goal is to turn search intent into revenue.",
  // },
  // {
  //   slug: "meta-ads-not-like-everyone-else",
  //   title: "Why We Don't Run Meta Ads Like Everyone Else",
  //   excerpt:
  //     "Meta is a platform of distraction, not intent. That changes everything about how we sell cravings, atmosphere, trust, and emotion.",
  //   category: "Meta Ads",
  //   filterCategory: "Paid Ads",
  //   readTime: "5 min read",
  //   date: "Aug 13, 2026",
  //   image:
  //     "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&q=80",
  //   content: [
  //     "Meta is a platform of distraction, not intent. That changes everything.",
  //     "For Lala's Pizza, we sold cravings. For Lala's Café, we sold atmosphere. For Lalaji Barbershop, we sold trust and personality. For Blume, we sold emotion and celebration.",
  //   ],
  //   quote:
  //     "Attention becomes valuable only when it creates emotion, connection, and action.",
  // },
  {
    slug: "websites-around-customers-not-templates",
    title: "Why We Build Websites Around Customers, Not Templates",
    excerpt:
      "A website is often the first employee a customer interacts with — built for ordering, booking, trust, or visual storytelling.",
    category: "Website Development",
    filterCategory: "Web Development",
    readTime: "6 min read",
    date: "Aug 12, 2026",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80",
    content: [
      "A website is often the first employee a customer interacts with.",
      "For Lala's Pizza, the site was built around ordering quickly. For Lala's Café, it communicated comfort and community. For Lalaji Barbershop, it prioritized trust and booking flow. For Blume, it created a clean visual experience that let the products shine.",
    ],
    quote:
      "A beautiful website that creates friction is still a bad website. Clarity beats complexity.",
  },
  {
    slug: "brand-identity-more-than-a-logo",
    title: "Brand Identity Is More Than a Logo",
    excerpt:
      "Branding is a business decision, not a decoration project — shaped by elegance, confidence, warmth, or energy depending on the business.",
    category: "Brand Identity",
    filterCategory: "Branding",
    readTime: "5 min read",
    date: "Aug 11, 2026",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
    content: [
      "Branding is a business decision, not a decoration project.",
      "Blume required elegance and emotion. Lalaji Barbershop required confidence and community. Lala's Café required warmth and comfort. Lala's Pizza required energy and appetite.",
    ],
    quote:
      "If people recognize the brand without seeing the logo, the identity is working.",
  },
  {
    slug: "social-media-not-posting-every-day",
    title: "Social Media Marketing Is Not Posting Every Day",
    excerpt:
      "Consistency builds brands; random virality does not. We create appetite-driven, lifestyle, personality, and emotional content.",
    category: "Social Media",
    filterCategory: "Social Media",
    readTime: "6 min read",
    date: "Aug 10, 2026",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e039e967?w=1200&q=80",
    content: [
      "Consistency builds brands; random virality does not.",
      "For Lala's Pizza, we created appetite-driven content. For Lala's Café, we focused on lifestyle and atmosphere. For Lalaji Barbershop, we highlighted personality and transformations. For Blume, we used emotional storytelling.",
    ],
    quote:
      "The goal is not to impress the algorithm. The goal is to stay present in the customer's mind.",
  },
  {
    slug: "content-marketing-about-being-remembered",
    title: "Content Marketing Is About Being Remembered",
    excerpt:
      "Content is a long-term business asset — turning products into stories, education into authority, and experiences into trust.",
    category: "Content Marketing",
    filterCategory: "Content Marketing",
    readTime: "6 min read",
    date: "Aug 9, 2026",
    image:
      "https://images.unsplash.com/photo-1455398673324-7866e5ea3d71?w=1200&q=80",
    content: [
      "Content is a long-term business asset, not a daily task.",
      "We turn products into stories, education into authority, and customer experiences into trust. Blogs, videos, behind-the-scenes moments, and local stories continue working long after they are published.",
    ],
    quote:
      "Great content makes people trust the business before they buy from it.",
  },
  {
    slug: "ai-automation-removing-repetition",
    title: "AI Automation Is About Removing Repetition",
    excerpt:
      "AI should save time, not replace human connection — automating inquiries, reminders, follow-ups, and content assistance.",
    category: "AI Automation",
    filterCategory: "Digital Marketing",
    readTime: "5 min read",
    date: "Aug 8, 2026",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
    content: [
      "AI should save time, not replace human connection.",
      "We automate common inquiries, booking reminders, review requests, follow-ups, and content assistance. For local businesses, the biggest win is often operational consistency rather than futuristic technology.",
    ],
    quote: "AI handles repetition. Humans handle connection.",
  },
  // {
  //   slug: "google-business-profile-new-front-door",
  //   title: "Google Business Profile Is the New Front Door",
  //   excerpt:
  //     "Many customers see your Google profile before they see your website — optimized for photos, menus, hours, reviews, and trust.",
  //   category: "GMB Optimization",
  //   filterCategory: "SEO",
  //   readTime: "5 min read",
  //   date: "Aug 7, 2026",
  //   image:
  //     "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
  //   content: [
  //     "Many customers see your Google profile before they see your website.",
  //     "For Lala's Pizza, we optimized photos, menus, hours, and delivery information. For Lalaji Barbershop, we focused on reviews and trust signals. For Blume, we treated photos as part of the brand experience.",
  //   ],
  //   quote: "Visibility matters, but conversion is the real goal.",
  // },
  {
    slug: "email-marketing-long-term-customer-value",
    title: "Email Marketing Builds Long-Term Customer Value",
    excerpt:
      "Email is one of the highest-ROI channels when used correctly — focused on relationship-building and repeat business.",
    category: "Email Marketing",
    filterCategory: "Digital Marketing",
    readTime: "5 min read",
    date: "Aug 6, 2026",
    image:
      "https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=1200&q=80",
    content: [
      "Email is one of the highest-ROI channels when used correctly.",
      "We build welcome sequences, reminder flows, educational emails, customer stories, and retention campaigns. Instead of sending constant promotions, we focus on relationship-building and repeat business.",
    ],
    quote:
      "The best email marketing feels like a relationship, not a broadcast.",
  },
  {
    slug: "performance-marketing-measuring-what-comes-back",
    title: "Performance Marketing Is About Measuring What Comes Back",
    excerpt:
      "If we spend one dollar, how much value returns to the business? We focus on CAC, revenue, repeat customers, and ROI.",
    category: "Performance Marketing",
    filterCategory: "Paid Ads",
    readTime: "6 min read",
    date: "Aug 5, 2026",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    content: [
      "If we spend one dollar, how much value returns to the business?",
      "For Lala's Pizza, we measured orders. For Lalaji Barbershop, we measured bookings. For Blume, we measured purchases and retention. We focus on customer acquisition cost, revenue, repeat customers, and ROI.",
    ],
    quote:
      "The goal is not to spend more. The goal is to scale what produces measurable growth.",
  },
];

export const footerLinks = {
  quick: [
    { label: "About", href: "/about" },
    // { label: "Portfolio", href: "/portfolio" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  services: services.slice(0, 6).map((s) => ({
    label: s.title,
    href: `/services/${s.id}`,
  })),
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export const careers = [
  {
    title: "Senior SEO Strategist",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Performance Marketing Manager",
    location: "New York, NY",
    type: "Full-time",
  },
  {
    title: "Creative Designer",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Account Executive",
    location: "Hybrid",
    type: "Full-time",
  },
];
