export const lalasCafeCaseStudy = {
  slug: "lalas-cafe",
  title: "Lala's Cafe",
  eyebrow: "Case Study",
  tagline: "Where Coffee Meets Comfort",
  headline: "From New Cafe Launch to a Digital-First Local Brand",
  summary:
    "Brand Mafia partnered with Lala's Cafe from day one to build a strong digital presence, attract local customers, and create a brand people love.",
  website: "https://lalascafe.ca/",
  websiteLabel: "lalascafe.ca",
  logo: "https://lalascafe.ca/wp-content/uploads/2026/03/LALAs-Cafe-Main-Logo.png",
  // heroImage: "/images/case-study/lalas-cafe-hero.png",
  heroImage: "/images/case-study/lalas-cafe.jpeg",
  laptopImage: "/images/case-study/lalas-cafe-website-laptop.png",
  phoneImage: "/images/case-study/lalas-cafe-mobile-website.png",
  pastaImage: "/images/case-study/lalas-cafe-pasta-dish.png",
  ctaImage: "/images/case-study/lalas-cafe-latte.png",
  tags: [
    { label: "Halifax, Nova Scotia", icon: "map" },
    { label: "Launched April 2026", icon: "calendar" },
    { label: "Food & Beverage", icon: "utensils" },
  ],
  snapshot: [
    { value: "Halifax", label: "Home City" },
    { value: "Apr 2026", label: "Launch" },
    { value: "Cafe", label: "Industry" },
  ],
  challenge: {
    intro:
      "Launching a new cafe in a competitive market meant more than great coffee and food. Lala's Cafe needed a strong digital presence from day one.",
    points: [
      "No existing online presence to launch with",
      "Needed a brand that felt as warm as the room",
      "Menu, reservations, and vibe had to live in one place",
      "Local customers had to find them first",
    ],
  },
  approach: {
    intro:
      "We built a complete digital foundation that connects the brand with the right audience across every touchpoint.",
    points: [
      "A modern website for menu, ambience, and reservations",
      "Video and reels that capture the cafe's food and story",
      "Social content that grows a loyal local community",
      "Local SEO to rank in nearby searches and drive foot traffic",
    ],
  },
  work: [
    {
      num: "01",
      title: "Website Development",
      description:
        "Designed a modern, mobile-friendly website to showcase the menu, ambience and make reservations seamless.",
      icon: "monitor",
    },
    {
      num: "02",
      title: "Video Production",
      description:
        "Created engaging videos and reels to capture the cafe's vibe, food, and story for social platforms.",
      icon: "video",
    },
    {
      num: "03",
      title: "Social Media Marketing",
      description:
        "Built a content engine with posts, reels and campaigns that grow engagement and a loyal community.",
      icon: "thumbs",
    },
    {
      num: "04",
      title: "Local SEO",
      description:
        "Optimized Google Business Profile and local SEO to rank higher in local searches and drive foot traffic.",
      icon: "search",
    },
  ],
  digitalHome: [
    "Beautiful, modern design that reflects the brand.",
    "Easy menu browsing and reservations.",
    "Fully responsive for a seamless experience.",
    "Built to convert visitors into loyal customers.",
  ],
  metrics: [
    { value: "187+", label: "Visitors Daily", icon: "users" },
    { value: "375+", label: "Deliveries Monthly", icon: "bag" },
    { value: "93%", label: "Positive Feedback", icon: "star" },
    { value: "37+", label: "Awards & Honors", icon: "award" },
  ],
  gallery: {
    featured: {
      src: "/images/case-study/lalas-cafe-booth.png",
      alt: "Lala's Cafe seating",
    },
    items: [
      { src: "/images/case-study/lalas-cafe-milkshake.png", alt: "Raspberry milkshake" },
      { src: "/images/case-study/lalas-cafe-matcha.png", alt: "Matcha latte" },
      { src: "/images/case-study/lalas-cafe-sandwich.png", alt: "Grilled sandwich" },
      { src: "/images/case-study/lalas-cafe-pasta-dish.png", alt: "Pasta plate" },
      { src: "/images/case-study/lalas-cafe-latte.png", alt: "Latte art" },
    ],
  },
  testimonial: {
    text: "Lala's Cafe has become my favorite spot! The coffee is amazing, the food is delicious, and the atmosphere is so cozy. Highly recommend for everyone in Halifax.",
    name: "Simranjit Singh",
  },
  services: [
    { label: "Website Development", icon: "monitor" },
    { label: "Video Production", icon: "video" },
    { label: "Social Media", icon: "thumbs" },
    { label: "Local SEO", icon: "search" },
    { label: "Content Strategy", icon: "target" },
    { label: "Brand Positioning", icon: "heart" },
  ],
} as const;
