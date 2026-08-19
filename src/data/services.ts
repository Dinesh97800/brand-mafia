export type ServicePillar = {
  title: string;
  description: string;
};

export type ServiceProcessStep = {
  title: string;
  description: string;
};

export function serviceImage(filename: string) {
  return `/images/services/${encodeURIComponent(filename)}`;
}

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  headline: string;
  seoDescription: string;
  intro: string[];
  quote: string;
  forWho: string;
  pillars: ServicePillar[];
  includes: string[];
  outcomes: string[];
  process: ServiceProcessStep[];
  relatedIds: string[];
  blogSlug: string;
  image: string;
};

export const services: Service[] = [
  {
    id: "seo",
    title: "SEO",
    description:
      "Local SEO built on digital trust — aligning websites, Google profiles, reviews, and customer intent so people find you with confidence.",
    icon: "Search",
    headline: "Get Found. Get Chosen. Grow Organically.",
    seoDescription:
      "Search is crowded. Brand Mafia SEO helps customers find you, choose you, and keep coming back — technical foundations, content, and authority that convert.",
    intro: [
      "SEO is not just keywords and backlinks. For Brand Mafia, it begins with understanding how real customers search — for pizza, coffee, a haircut, a florist, a service they need today.",
      "We align websites, Google Business Profiles, reviews, service pages, and customer intent so that people searching with urgency can find the right business with confidence.",
      "We do not build marketing around platforms. We build it around people, behavior, trust, and measurable business growth.",
    ],
    quote:
      "Local SEO works when Google can clearly understand who you are, where you are, what you offer, and why customers trust you.",
    forWho:
      "Local businesses, multi-location brands, and service companies that need to show up first — and look trustworthy when they do.",
    pillars: [
      {
        title: "Digital Trust",
        description:
          "Reviews, NAP consistency, and clear service pages so Google — and customers — know you are the real thing.",
      },
      {
        title: "Intent Mapping",
        description:
          "We match pages to how people actually search: near me, open now, best, delivery, booking — not vanity terms.",
      },
      {
        title: "Technical Clarity",
        description:
          "Speed, structure, and crawlability that let your content work. A slow, confusing site cannot rank or convert.",
      },
      {
        title: "Compounding Authority",
        description:
          "Content, local citations, and links that build over time — SEO that keeps working after the campaign ends.",
      },
    ],
    includes: [
      "Technical SEO audit and on-page optimization",
      "Keyword and search-intent research for your market",
      "Service and location page architecture",
      "Review and reputation strategy",
      "Content briefs aligned to real customer questions",
      "Monthly ranking, traffic, and lead reporting",
    ],
    outcomes: [
      "Higher visibility for high-intent local searches",
      "More qualified inquiries, not just more traffic",
      "A site Google can understand and customers can trust",
      "Rankings that compound instead of reset every month",
    ],
    process: [
      {
        title: "Audit",
        description:
          "We map how customers find you today — search terms, competitors, listings, and every leak in the funnel.",
      },
      {
        title: "Structure",
        description:
          "We rebuild the information architecture so each page has a job: rank, explain, and convert.",
      },
      {
        title: "Earn Trust",
        description:
          "Reviews, content, and citations that prove you are the obvious choice in your area.",
      },
      {
        title: "Grow",
        description:
          "Ongoing optimization against real leads and revenue — not screenshots of impressions.",
      },
    ],
    relatedIds: ["ecommerce-seo", "content", "ai-optimization"],
    blogSlug: "local-seo-for-local-businesses",
    image: serviceImage("SEO.webp"),
  },
  // {
  //   id: "google-ads",
  //   title: "Google Ads",
  //   description:
  //     "We optimize for revenue, not vanity metrics — turning search intent into orders, bookings, and purchases.",
  //   icon: "Target",
  //   headline: "Turn search intent into revenue.",
  //   seoDescription:
  //     "Brand Mafia Google Ads are built for revenue, not vanity metrics — turning search intent into orders, bookings, and purchases.",
  //   intro: [
  //     "We do not run Google Ads like a typical agency. Clicks are cheap. Orders, bookings, and purchases are the point.",
  //     "For a pizzeria, that means delivery and menu intent. For a barbershop, local appointment searches. For a florist, emotional moments — birthdays, anniversaries, I-need-this-today.",
  //     "The goal is not to buy traffic. The goal is to turn search intent into revenue.",
  //   ],
  //   quote: "The goal is not to buy traffic. The goal is to turn search intent into revenue.",
  //   forWho:
  //     "Businesses with clear offer, location, or product intent — where people already know what they want and need the right brand to appear.",
  //   pillars: [
  //     {
  //       title: "Revenue First",
  //       description:
  //         "Campaigns are scored on cost per acquisition, bookings, and return — not CTR theater.",
  //     },
  //     {
  //       title: "Intent Tightness",
  //       description:
  //         "We bid on the searches that mean buy, book, or order — and cut the rest without apology.",
  //     },
  //     {
  //       title: "Landing Fit",
  //       description:
  //         "Ads send people to pages built for that intent. A generic homepage is not a landing page.",
  //     },
  //     {
  //       title: "Creative That Converts",
  //       description:
  //         "Copy and extensions that match how customers talk — offers, hours, menus, proof, not slogans.",
  //     },
  //   ],
  //   includes: [
  //     "Account audit or full campaign build",
  //     "Keyword, negative, and audience architecture",
  //     "Conversion tracking and lead quality setup",
  //     "Ad copy, extensions, and offer testing",
  //     "Landing page recommendations",
  //     "Weekly optimization and transparent ROI reporting",
  //   ],
  //   outcomes: [
  //     "Lower wasted spend on low-intent clicks",
  //     "More orders, bookings, and qualified leads",
  //     "Clear cost-per-result you can actually use",
  //     "A paid search engine you can scale with confidence",
  //   ],
  //   process: [
  //     {
  //       title: "Measure",
  //       description:
  //         "We install tracking that follows the money — calls, forms, purchases — not vanity events.",
  //     },
  //     {
  //       title: "Focus",
  //       description:
  //         "We rebuild campaigns around high-intent queries and kill budget leaks.",
  //     },
  //     {
  //       title: "Match",
  //       description:
  //         "Ad, offer, and landing page say the same thing. Friction is treated as wasted spend.",
  //     },
  //     {
  //       title: "Scale",
  //       description:
  //         "We raise budget only on what returns value. Growth without a leaky funnel is the rule.",
  //     },
  //   ],
  //   relatedIds: ["performance", "meta-ads", "web-development"],
  //   blogSlug: "google-ads-not-like-typical-agency",
  //   image:
  //     "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80",
  // },
  // {
  //   id: "meta-ads",
  //   title: "Meta Ads",
  //   description:
  //     "Meta is distraction, not intent. We sell cravings, atmosphere, trust, and emotion — turning attention into action.",
  //   icon: "Share2",
  //   headline: "Sell the feeling. Then the action.",
  //   seoDescription:
  //     "Brand Mafia Meta Ads sell cravings, atmosphere, trust, and emotion — turning attention into action on a platform of distraction, not intent.",
  //   intro: [
  //     "Meta is a platform of distraction, not intent. That changes everything about how we advertise.",
  //     "People are not searching. They are scrolling. So we do not interrupt with features — we interrupt with appetite, atmosphere, personality, and emotion.",
  //     "Attention becomes valuable only when it creates emotion, connection, and action.",
  //   ],
  //   quote:
  //     "Attention becomes valuable only when it creates emotion, connection, and action.",
  //   forWho:
  //     "Brands that win on feeling — restaurants, cafés, salons, retail, lifestyle, and anyone who needs to create demand rather than capture it.",
  //   pillars: [
  //     {
  //       title: "Emotion Over Specs",
  //       description:
  //         "We sell cravings, rooms you want to sit in, trust you can feel — not bullet lists.",
  //     },
  //     {
  //       title: "Creative as the Targeting",
  //       description:
  //         "The ad is the filter. Strong creative finds the right people faster than overbuilt audiences.",
  //     },
  //     {
  //       title: "Offer Architecture",
  //       description:
  //         "Hooks, offers, and retargeting that move someone from scroll to visit, book, or buy.",
  //     },
  //     {
  //       title: "Always-On Testing",
  //       description:
  //         "New angles weekly. We kill losers fast and put budget behind what actually moves people.",
  //     },
  //   ],
  //   includes: [
  //     "Creative strategy and ad concepts",
  //     "Campaign, audience, and retargeting structure",
  //     "Static, reel, and story ad production guidance",
  //     "Pixel, CAPI, and conversion tracking",
  //     "Offer and landing alignment",
  //     "Creative testing cadence and performance reporting",
  //   ],
  //   outcomes: [
  //     "Ads people actually stop for",
  //     "Lower cost per result as creative compounds",
  //     "A retargeting engine that recovers warm attention",
  //     "Demand created — not just captured",
  //   ],
  //   process: [
  //     {
  //       title: "Position",
  //       description:
  //         "We define the feeling the brand must own on the feed — craving, trust, warmth, or energy.",
  //     },
  //     {
  //       title: "Create",
  //       description:
  //         "Hooks, visuals, and offers built for interruption — then for the click.",
  //     },
  //     {
  //       title: "Prove",
  //       description:
  //         "Small tests, honest numbers, fast cuts. No six-week wait to learn the obvious.",
  //     },
  //     {
  //       title: "Compound",
  //       description:
  //         "Winners get budget, new angles, and retargeting so attention turns into habit.",
  //     },
  //   ],
  //   relatedIds: ["social", "google-ads", "performance"],
  //   blogSlug: "meta-ads-not-like-everyone-else",
  //   image:
  //     "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1400&q=80",
  // },
  {
    id: "web-development",
    title: "Website Development",
    description:
      "Websites built around customers, not templates — clarity beats complexity every time.",
    icon: "Code2",
    headline: "Websites Built to Convert, Not Just Exist.",
    seoDescription:
      "Brand Mafia builds websites around customers, not templates — sites designed for ordering, booking, trust, and conversion. Clarity beats complexity.",
    intro: [
      "A website is often the first employee a customer interacts with. It should know what they came to do — order, book, trust, or fall in love with the product.",
      "We do not start with a template. We start with the job: a pizzeria needs speed. A café needs comfort. A barbershop needs trust and a booking flow. A product brand needs the product to shine.",
      "A beautiful website that creates friction is still a bad website. Clarity beats complexity.",
    ],
    quote:
      "A beautiful website that creates friction is still a bad website. Clarity beats complexity.",
    forWho:
      "Businesses whose current site looks fine and converts poorly — or who are ready to treat the website as a growth asset, not a brochure.",
    pillars: [
      {
        title: "Job To Be Done",
        description:
          "Every page has a purpose. If it does not help someone act, it does not belong.",
      },
      {
        title: "Speed & Clarity",
        description:
          "Fast loads, obvious next steps, mobile-first. Confusion is a conversion tax.",
      },
      {
        title: "Brand On Screen",
        description:
          "The site should feel like the business — elegant, warm, confident, or hungry — not like a theme.",
      },
      {
        title: "Built To Measure",
        description:
          "Tracking, forms, and booking or commerce flows that tell us what actually happened.",
      },
    ],
    includes: [
      "UX strategy and information architecture",
      "Custom design system aligned to your brand",
      "High-performance development (Next.js)",
      "Booking, ordering, or inquiry flows",
      "SEO-ready structure and Core Web Vitals",
      "Analytics, conversion tracking, and launch support",
    ],
    outcomes: [
      "A site that does the job without asking people to think",
      "Higher conversion from the traffic you already pay for",
      "A digital presence that matches the brand in the room",
      "A foundation SEO and ads can actually scale on",
    ],
    process: [
      {
        title: "Understand",
        description:
          "We study how customers arrive, what they want, and where the current site fails them.",
      },
      {
        title: "Design",
        description:
          "Wireframes and visuals built around the conversion path — not decoration.",
      },
      {
        title: "Build",
        description:
          "Clean, fast, accessible code. Integrations that actually get used.",
      },
      {
        title: "Prove",
        description:
          "Launch, measure, tighten copy and flow until the site earns its keep.",
      },
    ],
    relatedIds: ["seo", "app-development", "branding"],
    blogSlug: "websites-around-customers-not-templates",
    image: serviceImage("Website Development.webp"),
  },
  {
    id: "branding",
    title: "Brand Identity",
    description:
      "Branding is a business decision. Elegance, confidence, warmth, or energy — shaped to how customers should feel.",
    icon: "Palette",
    headline: "Build a Brand People Recognize Before They Read the Name.",
    seoDescription:
      "Brand Mafia treats branding as a business decision, not decoration — identity shaped by elegance, confidence, warmth, or energy.",
    intro: [
      "Branding is a business decision, not a decoration project. It decides how people feel before they read a single word.",
      "A florist may need elegance and emotion. A barbershop, confidence and community. A café, warmth. A pizzeria, energy and appetite. We shape identity to the feeling the business must own.",
      "If people recognize the brand without seeing the logo, the identity is working.",
    ],
    quote:
      "If people recognize the brand without seeing the logo, the identity is working.",
    forWho:
      "Founders and operators who have outgrown a DIY look — or who need a complete identity before they spend on ads and content.",
    pillars: [
      {
        title: "Position First",
        description:
          "Who you are for, who you are not, and the feeling that should land in three seconds.",
      },
      {
        title: "System, Not A Logo",
        description:
          "Type, color, photography, voice, and application rules so the brand holds in the wild.",
      },
      {
        title: "Room To Live In",
        description:
          "Menus, storefronts, packaging, social, and web — identity that survives real use.",
      },
      {
        title: "Business Outcome",
        description:
          "Premium pricing, clearer choice, stronger recall. Pretty is not the KPI.",
      },
    ],
    includes: [
      "Brand strategy and positioning workshop",
      "Logo, wordmark, and identity system",
      "Color, type, and photography direction",
      "Voice and messaging guidelines",
      "Key applications (web, social, print, signage)",
      "Brand book your team can actually follow",
    ],
    outcomes: [
      "A brand people remember without the logo",
      "Consistency across every customer touchpoint",
      "Creative that ads and social can scale from",
      "A look that matches the business you actually are",
    ],
    process: [
      {
        title: "Discover",
        description:
          "We listen to how you talk, how customers choose, and what the market already owns.",
      },
      {
        title: "Define",
        description:
          "Positioning, personality, and the visual territory that is yours to take.",
      },
      {
        title: "Design",
        description:
          "Identity exploration, then a system — not a one-off mark.",
      },
      {
        title: "Apply",
        description:
          "We put it on the things people actually see, then hand you a guide that holds.",
      },
    ],
    relatedIds: ["web-development", "social", "video-production"],
    blogSlug: "brand-identity-more-than-a-logo",
    image: serviceImage("Brand Identity.webp"),
  },
  {
    id: "social",
    title: "Social Media Marketing",
    description:
      "Consistency builds brands. Appetite-driven, lifestyle, personality, and emotional content that keeps you top of mind.",
    icon: "Users",
    headline: "Turn Attention Into Community.",
    seoDescription:
      "Brand Mafia social media is built on consistency, not random virality — appetite, lifestyle, personality, and emotion that keep you top of mind.",
    intro: [
      "Social media marketing is not posting every day. Consistency builds brands; random virality does not.",
      "We create content with a job: appetite for a pizzeria, lifestyle for a café, personality and transformations for a barbershop, emotional storytelling for a florist.",
      "The goal is not to impress the algorithm. The goal is to stay present in the customer's mind.",
    ],
    quote:
      "The goal is not to impress the algorithm. The goal is to stay present in the customer's mind.",
    forWho:
      "Local and lifestyle brands that need a feed that feels like them — sharper, louder, and impossible to ignore — without becoming a content factory.",
    pillars: [
      {
        title: "A Point Of View",
        description:
          "Every brand gets a content thesis. Without one, you are just filling the calendar.",
      },
      {
        title: "Formats That Fit",
        description:
          "Reels, stories, carousels, and community — chosen for the business, not for trends.",
      },
      {
        title: "Rhythm Over Spikes",
        description:
          "A cadence people can feel. Presence beats a lucky video you cannot repeat.",
      },
      {
        title: "Tied To Growth",
        description:
          "Social supports ads, booking, and foot traffic. Vanity likes are not a strategy.",
      },
    ],
    includes: [
      "Content strategy and monthly calendar",
      "Profile optimization and brand-fit creative",
      "Reels, posts, and story production",
      "Community engagement playbook",
      "Campaign and promotional content",
      "Monthly performance and content insights",
    ],
    outcomes: [
      "A feed that looks and feels like the brand",
      "Customers who recognize you before they need you",
      "Creative that paid social can scale",
      "Consistency without burning out the owner",
    ],
    process: [
      {
        title: "Audit",
        description:
          "We look at what you post, what competitors own, and what your customers actually save and share.",
      },
      {
        title: "System",
        description:
          "Pillars, cadence, and a production rhythm your team — or ours — can keep.",
      },
      {
        title: "Create",
        description:
          "Content with a job: crave, trust, belong, or act. Not filler.",
      },
      {
        title: "Learn",
        description:
          "We double down on what holds attention and quietly drop what does not.",
      },
    ],
    relatedIds: ["content", "video-production", "branding"],
    blogSlug: "social-media-not-posting-every-day",
    image: serviceImage("Social Media Marketing.webp"),
  },
  {
    id: "content",
    title: "Content Marketing",
    description:
      "Content is a long-term asset — turning products into stories and experiences into trust that outlasts the publish date.",
    icon: "FileText",
    headline: "Create Content People Remember.",
    seoDescription:
      "Brand Mafia content marketing turns products into stories and experiences into trust — long-term assets that work after the publish date.",
    intro: [
      "Content is a long-term business asset, not a daily task. Great content makes people trust the business before they buy from it.",
      "We turn products into stories, education into authority, and customer experiences into proof. Blogs, videos, behind-the-scenes moments, and local stories keep working long after they go live.",
      "Clarity creates trust. Trust creates action. Action creates growth.",
    ],
    quote: "Great content makes people trust the business before they buy from it.",
    forWho:
      "Brands that need more than ads — authority, search traffic, and a library of proof that sales and social can keep using.",
    pillars: [
      {
        title: "Stories, Not Specs",
        description:
          "People remember how you made them feel. We write from that, then add the facts.",
      },
      {
        title: "Search + Share",
        description:
          "Pieces built to rank and to travel — SEO pages, films, and local stories with a job.",
      },
      {
        title: "Proof On File",
        description:
          "Case moments, process, and customer experience that shorten the path to yes.",
      },
      {
        title: "Reuse By Design",
        description:
          "One story becomes a blog, a reel, an email, an ad. Assets, not one-offs.",
      },
    ],
    includes: [
      "Content strategy mapped to search and sales",
      "Editorial calendar and topic clusters",
      "Long-form articles, landing copy, and scripts",
      "Video and behind-the-scenes storytelling",
      "SEO-aligned publishing and internal linking",
      "Repurposing into social, email, and ads",
    ],
    outcomes: [
      "A library of assets that keep earning trust",
      "Organic traffic that is actually qualified",
      "Sales conversations that start warmer",
      "Less scramble for 'what do we post this week'",
    ],
    process: [
      {
        title: "Map",
        description:
          "We find the questions, objections, and stories that move your buyer.",
      },
      {
        title: "Plan",
        description:
          "Clusters and a cadence that serve SEO, social, and the sales team at once.",
      },
      {
        title: "Produce",
        description:
          "Writing and film with a Brand Mafia standard: clear, human, useful.",
      },
      {
        title: "Distribute",
        description:
          "Publish, slice, and put the same story to work across channels.",
      },
    ],
    relatedIds: ["seo", "social", "video-production"],
    blogSlug: "content-marketing-about-being-remembered",
    image: serviceImage("Content Marketing.webp"),
  },
  {
    id: "ai",
    title: "AI Automation",
    description:
      "AI saves time, not connection — automating inquiries, reminders, follow-ups, and repetitive workflows.",
    icon: "Bot",
    headline: "AI handles repetition. Humans handle connection.",
    seoDescription:
      "Brand Mafia AI automation saves time without replacing human connection — inquiries, reminders, follow-ups, and workflows that keep the business consistent.",
    intro: [
      "AI should save time, not replace human connection. The win for most businesses is operational consistency — not a sci-fi chatbot nobody asked for.",
      "We automate common inquiries, booking reminders, review requests, follow-ups, and content assistance so your team can stay on the floor, with the customer.",
      "AI handles repetition. Humans handle connection.",
    ],
    quote: "AI handles repetition. Humans handle connection.",
    forWho:
      "Owners and teams drowning in the same messages, reminders, and admin — who want their people back on hospitality, sales, and craft.",
    pillars: [
      {
        title: "Repetition First",
        description:
          "We automate the work you already hate doing twice. Not processes that still need a human.",
      },
      {
        title: "Keep The Voice",
        description:
          "Replies and follow-ups sound like the brand. Robotic 'How can I help you today?' is not a strategy.",
      },
      {
        title: "Handoff, Not Replacement",
        description:
          "When the moment needs a person, the system gets out of the way.",
      },
      {
        title: "Quiet Reliability",
        description:
          "Reminders sent, reviews asked, leads followed. The business feels tighter without extra headcount.",
      },
    ],
    includes: [
      "Workflow audit of inquiries, bookings, and follow-ups",
      "AI assistants for FAQs and after-hours response",
      "Booking reminders and no-show reduction flows",
      "Review request and reputation loops",
      "Lead follow-up and CRM-light automation",
      "Content assistance that still needs a human editor",
    ],
    outcomes: [
      "Fewer missed inquiries and no-shows",
      "Faster response without living on your phone",
      "A more consistent customer experience",
      "Hours back for the work only you can do",
    ],
    process: [
      {
        title: "Map The Loops",
        description:
          "We list every repetitive message, reminder, and task that currently lives in someone's head.",
      },
      {
        title: "Design The Path",
        description:
          "What the machine handles, what a human takes, and where the brand voice stays intact.",
      },
      {
        title: "Build",
        description:
          "Tools that fit how you already work — not a stack you will abandon in a month.",
      },
      {
        title: "Tune",
        description:
          "We watch real conversations and tighten until it feels like you, just faster.",
      },
    ],
    relatedIds: ["email", "gmb", "web-development"],
    blogSlug: "ai-automation-removing-repetition",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=80",
  },
  // {
  //   id: "local-seo",
  //   title: "Local SEO",
  //   description:
  //     "Own your local market with geo-targeted SEO that puts you on the map when customers search with urgency.",
  //   icon: "MapPin",
  //   headline: "Own the map when they search with urgency.",
  //   seoDescription:
  //     "Brand Mafia Local SEO puts you on the map when customers search with urgency — geo-targeted visibility built on trust, listings, and real intent.",
  //   intro: [
  //     "Local SEO is how you become the name people see — and the one they trust — when they need you now.",
  //     "We treat the map pack, Google Business Profile, reviews, and location pages as one system. Visibility without conversion is just a prettier listing.",
  //     "Working with local businesses taught us this: people search with urgency. Your job is to be obvious, close, and credible.",
  //   ],
  //   quote:
  //     "Local SEO works when Google can clearly understand who you are, where you are, what you offer, and why customers trust you.",
  //   forWho:
  //     "Restaurants, salons, shops, clinics, and service businesses that live or die by nearby demand.",
  //   pillars: [
  //     {
  //       title: "Map Pack Presence",
  //       description:
  //         "Categories, services, photos, and proximity signals that put you in the local three.",
  //     },
  //     {
  //       title: "Location Pages That Convert",
  //       description:
  //         "Pages that answer the search — hours, offer, proof — not thin city clones.",
  //     },
  //     {
  //       title: "Review Momentum",
  //       description:
  //         "A system for earning and responding to reviews so trust is visible, not assumed.",
  //     },
  //     {
  //       title: "Local Proof Everywhere",
  //       description:
  //         "Citations, partnerships, and on-site signals that match the real-world business.",
  //     },
  //   ],
  //   includes: [
  //     "Local competitive and map-pack audit",
  //     "Google Business Profile strategy (paired with GMB work)",
  //     "Location and service page builds",
  //     "Citation cleanup and consistency",
  //     "Review generation and response playbook",
  //     "Local rank and lead tracking",
  //   ],
  //   outcomes: [
  //     "Higher map-pack and local organic visibility",
  //     "More calls, directions, and walk-ins from search",
  //     "A listing and site that match the real business",
  //     "A local lead engine that does not depend on ads alone",
  //   ],
  //   process: [
  //     {
  //       title: "See The Market",
  //       description:
  //         "We map who owns the pack, which queries matter, and where you leak trust.",
  //     },
  //     {
  //       title: "Fix The Signals",
  //       description:
  //         "Name, categories, pages, and citations — one version of the truth.",
  //     },
  //     {
  //       title: "Earn The Reviews",
  //       description:
  //         "A request and response rhythm that builds the proof Google and people both use.",
  //     },
  //     {
  //       title: "Defend The Rank",
  //       description:
  //         "Local SEO is a contest. We keep publishing, updating, and measuring leads.",
  //     },
  //   ],
  //   relatedIds: ["seo", "gmb", "google-ads"],
  //   blogSlug: "local-seo-for-local-businesses",
  //   image:
  //     "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1400&q=80",
  // },
  // {
  //   id: "gmb",
  //   title: "GMB Optimization",
  //   description:
  //     "Your Google Business Profile is the new front door — optimized for visibility, trust, and conversion.",
  //   icon: "Building2",
  //   headline: "The new front door is a Google profile.",
  //   seoDescription:
  //     "Brand Mafia Google Business Profile optimization treats your listing as the new front door — photos, menus, hours, reviews, and conversion.",
  //   intro: [
  //     "Many customers see your Google profile before they see your website. For a lot of local businesses, that listing is the business.",
  //     "We optimize photos, menus, hours, services, products, and reviews so the profile does more than exist — it converts. Visibility matters, but conversion is the real goal.",
  //     "A florist's photos are brand. A barbershop's reviews are trust. A pizzeria's hours and delivery info are the sale.",
  //   ],
  //   quote: "Visibility matters, but conversion is the real goal.",
  //   forWho:
  //     "Any local business that lives on Maps — especially if the listing is incomplete, outdated, or losing to a competitor with a weaker product.",
  //   pillars: [
  //     {
  //       title: "Complete The Door",
  //       description:
  //         "Categories, services, products, attributes, hours, and Q&A — no empty rooms.",
  //     },
  //     {
  //       title: "Photos As Brand",
  //       description:
  //         "We treat the gallery as storefront design, not leftover camera rolls.",
  //     },
  //     {
  //       title: "Reviews As Proof",
  //       description:
  //         "Ask, respond, and surface the stories that make a stranger comfortable.",
  //     },
  //     {
  //       title: "Posts That Work",
  //       description:
  //         "Offers, events, and updates that keep the profile alive — and clickable.",
  //     },
  //   ],
  //   includes: [
  //     "Full Google Business Profile audit",
  //     "Category, service, and attribute optimization",
  //     "Photo, menu, and product setup",
  //     "Review strategy and response templates",
  //     "Weekly posts, offers, and updates",
  //     "Insights reporting on calls, clicks, and direction requests",
  //   ],
  //   outcomes: [
  //     "A listing that looks as good as the business",
  //     "More calls, website clicks, and direction requests",
  //     "Stronger map-pack competitiveness",
  //     "Trust signals that ads and SEO can lean on",
  //   ],
  //   process: [
  //     {
  //       title: "Audit",
  //       description:
  //         "We compare your profile to the businesses beating you — category by category.",
  //     },
  //     {
  //       title: "Complete",
  //       description:
  //         "Every field, photo, and service filled like a storefront you actually care about.",
  //     },
  //     {
  //       title: "Activate",
  //       description:
  //         "Reviews, posts, and Q&A so the listing feels current, not abandoned.",
  //     },
  //     {
  //       title: "Maintain",
  //       description:
  //         "Hours change. Offers change. We keep the front door honest and converting.",
  //     },
  //   ],
  //   relatedIds: ["local-seo", "seo", "social"],
  //   blogSlug: "google-business-profile-new-front-door",
  //   image:
  //     "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=80",
  // },
  {
    id: "email",
    title: "Email Marketing",
    description:
      "Relationship-building over broadcasts — welcome flows, retention campaigns, and emails that drive repeat business.",
    icon: "Mail",
    headline: "Turn Your Inbox Into a Revenue Channel.",
    seoDescription:
      "Brand Mafia email marketing builds long-term customer value — welcome flows, retention, and emails that feel like a relationship, not a blast.",
    intro: [
      "Email is one of the highest-ROI channels when used correctly. Most brands treat it like a megaphone. We treat it like a relationship.",
      "We build welcome sequences, reminder flows, educational emails, customer stories, and retention campaigns. Instead of constant promotions, we focus on repeat business and lifetime value.",
      "The best email marketing feels like a relationship, not a broadcast.",
    ],
    quote:
      "The best email marketing feels like a relationship, not a broadcast.",
    forWho:
      "Businesses with a customer list — or the ability to build one — who want people to come back without paying for them twice.",
    pillars: [
      {
        title: "Welcome Like A Host",
        description:
          "The first emails set the relationship. We teach, thank, and invite — then sell.",
      },
      {
        title: "Flows Over Blasts",
        description:
          "Automation for onboarding, reminders, win-backs, and reviews. Broadcasts for moments that deserve them.",
      },
      {
        title: "Useful, Then Commercial",
        description:
          "Stories, education, and offers in a rhythm people will not mute.",
      },
      {
        title: "Retention Math",
        description:
          "We measure repeat purchase, bookings, and list health — not open-rate vanity.",
      },
    ],
    includes: [
      "List and ESP audit",
      "Welcome, reminder, and retention flows",
      "Campaign calendar and copywriting",
      "Segmentation by behavior and offer",
      "Design that matches the brand",
      "Deliverability hygiene and performance reporting",
    ],
    outcomes: [
      "More repeat visits and purchases from people you already earned",
      "A list that stays engaged instead of going cold",
      "Lower dependence on paid acquisition",
      "Email that sounds like the brand, not a template",
    ],
    process: [
      {
        title: "Listen",
        description:
          "We look at what you send, who opens, and where people drop off the relationship.",
      },
      {
        title: "Build The Paths",
        description:
          "Welcome, nurture, reminder, and win-back — each with a job and a voice.",
      },
      {
        title: "Write",
        description:
          "Copy people will actually read. Offers when they earn the right to be there.",
      },
      {
        title: "Compound",
        description:
          "We test subject, offer, and cadence against revenue and retention.",
      },
    ],
    relatedIds: ["ecommerce-seo", "digital-marketing", "content"],
    blogSlug: "email-marketing-long-term-customer-value",
    image: serviceImage("Email Marketing.webp"),
  },
  {
    id: "performance",
    title: "Performance Marketing",
    description:
      "If we spend one dollar, how much comes back? We scale what produces measurable growth and ROI.",
    icon: "TrendingUp",
    headline: "Every Dollar Should Have a Job.",
    seoDescription:
      "Brand Mafia performance marketing measures what comes back — CAC, revenue, repeat customers, and ROI. We scale what produces growth.",
    intro: [
      "If we spend one dollar, how much value returns to the business? That is the only question that matters in performance marketing.",
      "We measure the outcome that matches the business: orders for a restaurant, bookings for a shop, purchases and retention for a product brand. Customer acquisition cost, revenue, repeat customers, and ROI — not dashboards that look busy.",
      "The goal is not to spend more. The goal is to scale what produces measurable growth.",
    ],
    quote:
      "The goal is not to spend more. The goal is to scale what produces measurable growth.",
    forWho:
      "Brands ready to treat paid media as a growth engine — with tracking, creative, and landing pages willing to be judged by money in, money out.",
    pillars: [
      {
        title: "One Number, One Truth",
        description:
          "We agree what success is — CAC, ROAS, bookings — and report against that, not a buffet of metrics.",
      },
      {
        title: "Full-Funnel Spend",
        description:
          "Search captures demand. Social creates it. Retargeting recovers it. We run the system, not isolated ads.",
      },
      {
        title: "Creative + Offer + Page",
        description:
          "Media cannot save a weak offer or a confusing page. We fix the stack, then scale.",
      },
      {
        title: "Kill And Scale",
        description:
          "Losers lose budget. Winners get more. Sentiment does not get a vote.",
      },
    ],
    includes: [
      "Full-funnel media strategy (search, social, retargeting)",
      "Conversion tracking and attribution setup",
      "Creative testing program",
      "Landing page and offer optimization",
      "Budget allocation across channels",
      "Executive reporting: CAC, ROAS, pipeline, and recommendations",
    ],
    outcomes: [
      "A clear answer to what each dollar returns",
      "Channels that work together instead of competing",
      "Faster learning cycles and less wasted spend",
      "A growth engine you can turn up with confidence",
    ],
    process: [
      {
        title: "Instrument",
        description:
          "Tracking that follows the sale. If we cannot measure it, we will not scale it.",
      },
      {
        title: "Diagnose",
        description:
          "Where is demand, where is waste, where does the funnel break.",
      },
      {
        title: "Test",
        description:
          "Creative, audience, and offer tests with a kill date. No infinite 'learning phases.'",
      },
      {
        title: "Scale",
        description:
          "Budget follows proof. We expand what returns value and protect the brand while we do it.",
      },
    ],
    relatedIds: ["digital-marketing", "social", "web-development"],
    blogSlug: "performance-marketing-measuring-what-comes-back",
    image: serviceImage("Performance Marketing.webp"),
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description:
      "One strategy across search, content, social, paid, email, and conversion — so channels reinforce each other instead of competing.",
    icon: "Network",
    headline: "One Strategy. Every Growth Channel.",
    seoDescription:
      "Brand Mafia digital marketing connects SEO, content, social, paid media, email, and conversion into one growth system — not a pile of disconnected channels.",
    intro: [
      "Most brands buy channels. We build a system. Search, content, social, paid, and email only work when they share the same offer, the same story, and the same next step.",
      "Digital marketing is the umbrella: one strategy, then the right mix of work for where your customers actually decide.",
    ],
    quote: "Channels shouldn't work in silos. They should hand the customer to each other.",
    forWho:
      "Businesses tired of paying five vendors to contradict each other — who want one growth plan and a team that can run it.",
    pillars: [
      {
        title: "One Story",
        description:
          "Positioning, offer, and proof stay consistent from the ad to the inbox.",
      },
      {
        title: "The Right Mix",
        description:
          "We pick channels for the job — not because a package includes them.",
      },
      {
        title: "Shared Measurement",
        description:
          "One view of pipeline and revenue. Channel vanity stays off the scoreboard.",
      },
      {
        title: "Compounding Loops",
        description:
          "Content feeds ads. Ads feed email. Email feeds search. The system gets cheaper as it learns.",
      },
    ],
    includes: [
      "Growth audit across acquisition and retention",
      "Channel mix and 90-day roadmap",
      "Creative and messaging system",
      "Tracking and reporting that follow the sale",
      "Monthly optimization across the stack",
      "A single team accountable for the outcome",
    ],
    outcomes: [
      "Channels that support each other instead of stealing budget",
      "A clearer answer to what is actually growing the business",
      "Less wasted spend on work that does not connect",
      "A plan you can scale without starting over every quarter",
    ],
    process: [
      {
        title: "Map",
        description: "How people find you, hesitate, buy, and come back.",
      },
      {
        title: "Choose",
        description: "The smallest mix that can move the number that matters.",
      },
      {
        title: "Connect",
        description: "Message, creative, and tracking shared across every surface.",
      },
      {
        title: "Compound",
        description: "We keep the loops that work and shut the ones that don't.",
      },
    ],
    relatedIds: ["seo", "social", "performance"],
    blogSlug: "performance-marketing-measuring-what-comes-back",
    image: serviceImage("Digital Marketing.webp"),
  },
  {
    id: "ecommerce-seo",
    title: "E-commerce SEO",
    description:
      "Category rankings, product visibility, and technical store SEO that turn product searches into checkout — not just sessions.",
    icon: "ShoppingBag",
    headline: "Turn Product Searches Into Sales.",
    seoDescription:
      "Brand Mafia e-commerce SEO is built for category rankings, product visibility, structured data, and conversion-ready traffic — not vanity sessions.",
    intro: [
      "A store is not a blog with a cart. Rankings have to land on the page that can sell: category, collection, or product.",
      "We treat the catalogue as a search asset — architecture, internal links, structured data, and pages that make the next click obvious.",
    ],
    quote: "Your catalogue is a search asset. Most stores treat it like a filing cabinet.",
    forWho:
      "Shopify, Woo, and custom stores that get traffic they cannot turn into orders — or that lose category space to thinner competitors.",
    pillars: [
      {
        title: "Category First",
        description:
          "Money pages get the architecture. Thin tag pages do not get to compete with them.",
      },
      {
        title: "Product Clarity",
        description:
          "Titles, copy, and schema that match how people search — and how they decide.",
      },
      {
        title: "Technical Store Health",
        description:
          "Indexation, faceted nav, speed, and crawl budget that do not fight the catalogue.",
      },
      {
        title: "Traffic That Can Buy",
        description:
          "We judge SEO on assisted revenue and product-page conversion, not sessions.",
      },
    ],
    includes: [
      "Store architecture and indexation audit",
      "Category and collection strategy",
      "Product SEO templates and internal linking",
      "Structured data for products and reviews",
      "Technical fixes for filters, speed, and duplicates",
      "Search-to-revenue reporting",
    ],
    outcomes: [
      "More visibility on the searches that sit next to a purchase",
      "A catalogue Google can understand and customers can shop",
      "Less wasted crawl on pages that cannot convert",
      "Organic traffic that shows up in the same report as sales",
    ],
    process: [
      {
        title: "Audit the store",
        description: "What ranks, what is blocked, and where the cart leaks.",
      },
      {
        title: "Rebuild the map",
        description: "Categories, products, and links with a job.",
      },
      {
        title: "Make pages sell",
        description: "Copy, proof, and structure on the money URLs.",
      },
      {
        title: "Keep it clean",
        description: "New SKUs, filters, and content without creating junk.",
      },
    ],
    relatedIds: ["seo", "web-development", "performance"],
    blogSlug: "local-seo-for-local-businesses",
    image: serviceImage("E-commerce SEO.webp"),
  },
  // {
  //   id: "ai-optimization",
  //   title: "AI Optimization",
  //   description:
  //     "Make your brand easier to understand, cite, and recommend as search becomes answer-first — without promising placement you cannot control.",
  //   icon: "Sparkles",
  //   headline: "Be Visible in the Age of AI Search.",
  //   seoDescription:
  //     "Brand Mafia AI optimization prepares your brand for answer-first search — structured information, entity clarity, and useful content. No guaranteed AI placements.",
  //   intro: [
  //     "Search is becoming answer-first. People still look things up — they just often get a summary before a list of links.",
  //     "We do not sell guaranteed placement in AI answers. We make your brand easier to understand, cite, and trust: clear entities, structured content, and pages that actually help.",
  //   ],
  //   quote: "You cannot buy a citation. You can become the source worth citing.",
  //   forWho:
  //     "Brands that already publish and rank — and want their information to travel into AI answers, not just classic blue links.",
  //   pillars: [
  //     {
  //       title: "Entity Clarity",
  //       description:
  //         "Who you are, what you offer, and how that is stated the same way everywhere.",
  //     },
  //     {
  //       title: "Structured Helpfulness",
  //       description:
  //         "Pages that answer real questions in language machines and people can both use.",
  //     },
  //     {
  //       title: "Technical Access",
  //       description:
  //         "Crawlable, fast, and not locked behind junk that blocks discovery.",
  //     },
  //     {
  //       title: "Honest Scope",
  //       description:
  //         "We report on readiness and visibility signals — not fantasies about controlling the model.",
  //     },
  //   ],
  //   includes: [
  //     "Entity and knowledge-panel audit",
  //     "Content structured for questions and citations",
  //     "Schema and information architecture review",
  //     "Technical accessibility for crawlers and AI systems",
  //     "Source-worthiness improvements on key pages",
  //     "A readiness report — not a placement guarantee",
  //   ],
  //   outcomes: [
  //     "A clearer public record of who you are and what you do",
  //     "Content that is easier to quote, summarize, and trust",
  //     "Fewer contradictions across site, profiles, and listings",
  //     "A brand prepared for answer-first search — without the hype",
  //   ],
  //   process: [
  //     {
  //       title: "Inventory",
  //       description: "How the brand is described today — on-site and off.",
  //     },
  //     {
  //       title: "Clarify",
  //       description: "One accurate story, then structure that can be parsed.",
  //     },
  //     {
  //       title: "Publish",
  //       description: "Useful pages that deserve to be referenced.",
  //     },
  //     {
  //       title: "Watch",
  //       description: "Visibility and citation signals. We adjust. We do not promise magic.",
  //     },
  //   ],
  //   relatedIds: ["seo", "content", "web-development"],
  //   blogSlug: "ai-automation-removing-repetition",
  //   image: serviceImage("AI Optimization.webp"),
  // },
  {
    id: "app-development",
    title: "App Development",
    description:
      "Product strategy, UX, and engineering for apps people actually finish using — not a feature list that never ships.",
    icon: "Smartphone",
    headline: "Ideas Engineered Into Products People Use.",
    seoDescription:
      "Brand Mafia app development covers product strategy, UX, architecture, build, QA, and launch — so you ship the right product before you build more product.",
    intro: [
      "Most apps fail because they were specified as a pile of features. We start with the job the product has to do in someone's week.",
      "Then we design the few screens that matter, build them cleanly, and leave room to learn after launch.",
    ],
    quote: "Build the right product before building more product.",
    forWho:
      "Founders and operators with a real user problem — not a wishlist — who need a team that can decide what not to build.",
    pillars: [
      {
        title: "Job First",
        description:
          "We write the use case before the backlog. Extra features wait.",
      },
      {
        title: "Interface as Product",
        description:
          "The screens are the product. We design the path, then the chrome.",
      },
      {
        title: "Architecture That Lasts",
        description:
          "A stack you can ship and maintain — not a demo that dies in month four.",
      },
      {
        title: "Launch, Then Learn",
        description:
          "QA, release, and a plan for the first month of real use.",
      },
    ],
    includes: [
      "Product discovery and scope lock",
      "UX flows and interface design",
      "Mobile or web app architecture",
      "Development and QA",
      "Launch support and analytics",
      "A backlog for iteration — not a rewrite",
    ],
    outcomes: [
      "A product that does one job well enough to be used again",
      "Fewer months spent on features nobody asked for",
      "A codebase your next hire can actually inherit",
      "A launch that is a starting line, not a cliff",
    ],
    process: [
      {
        title: "Decide",
        description: "Who it is for, what success looks like, what we will not build.",
      },
      {
        title: "Design",
        description: "Flows and screens for the core journey.",
      },
      {
        title: "Build",
        description: "Engineering with QA, not a demo sprint.",
      },
      {
        title: "Release",
        description: "Ship, watch, and plan the next honest version.",
      },
    ],
    relatedIds: ["web-development", "branding", "digital-marketing"],
    blogSlug: "websites-around-customers-not-templates",
    image: serviceImage("App Development.webp"),
  },
  {
    id: "video-production",
    title: "Video Production",
    description:
      "Concepts, filming, edit, and cutdowns built to earn the next three seconds — then do a job in the campaign.",
    icon: "Clapperboard",
    headline: "Stories Designed to Stop the Scroll.",
    seoDescription:
      "Brand Mafia video production covers concept, script, storyboard, shoot, edit, motion, and social cutdowns — cinematic work with a campaign job.",
    intro: [
      "Great video earns the next three seconds. Then it has to do a job: make someone hungry, book, trust, or remember you.",
      "We treat film as a system — concept through cutdowns — so the hero piece and the stories cut from it all sound like the same brand.",
    ],
    quote: "Great video earns the next three seconds. Then it has to earn the click.",
    forWho:
      "Brands that need film for ads, social, or the site — and are tired of pretty clips that cannot be reused.",
    pillars: [
      {
        title: "A Job Per Film",
        description:
          "Appetite, proof, launch, or culture. We pick one before we write a shot list.",
      },
      {
        title: "Pre-production Is the Work",
        description:
          "Brief, concept, and storyboard so the shoot is not a guessing day.",
      },
      {
        title: "Cutdowns by Design",
        description:
          "Hero, 15s, 6s, stills. The campaign is planned in the edit, not hoped for.",
      },
      {
        title: "Cinematic, Not Decorative",
        description:
          "Pace, sound, and picture that hold attention. No stock-music wallpaper.",
      },
    ],
    includes: [
      "Concept and scripting",
      "Storyboards and shot planning",
      "Production and direction",
      "Edit, color, and motion",
      "Social and paid cutdowns",
      "A delivery kit your media team can actually run",
    ],
    outcomes: [
      "Film that can open an ad, a page, or a launch",
      "Cutdowns that do not look like afterthoughts",
      "A visual language ads and social can keep using",
      "Fewer reshoots because the brief was real",
    ],
    process: [
      {
        title: "Brief",
        description: "Audience, offer, and the feeling the film must land.",
      },
      {
        title: "Concept",
        description: "A story worth shooting — on paper first.",
      },
      {
        title: "Make",
        description: "Pre-pro, shoot, edit. Tight, not theatrical for its own sake.",
      },
      {
        title: "Deliver",
        description: "Hero plus the cuts the campaign actually needs.",
      },
    ],
    relatedIds: ["social", "content", "branding"],
    blogSlug: "content-marketing-about-being-remembered",
    image: serviceImage("Video Production.webp"),
  },
];

export const featuredServiceIds = [
  "seo",
  "google-ads",
  "meta-ads",
  "web-development",
  "branding",
  "social",
  "content",
  "ai",
  "local-seo",
  "gmb",
  "email",
  "performance",
] as const;

export function getFeaturedServices() {
  return featuredServiceIds
    .map((id) => services.find((service) => service.id === id))
    .filter((service): service is Service => Boolean(service));
}

export const serviceAliases: Record<string, string> = {
  "web-dev": "web-development",
  "website-development": "web-development",
  "brand-identity": "branding",
  "email-marketing": "email",
  "social-media-marketing": "social",
  "performance-marketing": "performance",
  "content-marketing": "content",
};

export function resolveServiceId(slug: string) {
  return serviceAliases[slug] ?? slug;
}

export function getServiceById(id: string) {
  return services.find((service) => service.id === resolveServiceId(id));
}

export function getServiceStaticParams() {
  const slugs = new Set([
    ...services.map((service) => service.id),
    ...Object.keys(serviceAliases),
  ]);
  return [...slugs].map((slug) => ({ slug }));
}

export function getRelatedServices(service: Service) {
  const related = service.relatedIds
    .map((id) => getServiceById(id))
    .filter((item): item is Service => Boolean(item));

  if (related.length >= 3) return related.slice(0, 3);

  const extras = services.filter(
    (item) => item.id !== service.id && !service.relatedIds.includes(item.id)
  );

  return [...related, ...extras].slice(0, 3);
}
