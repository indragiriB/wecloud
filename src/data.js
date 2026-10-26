// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE. Everything on the site comes from here.
// ─────────────────────────────────────────────────────────────

const site = {
  // Shown in the big dot-matrix headline. Each word goes on its own line.
  // Letters, numbers and basic punctuation are supported.
  name: 'Your Name',
  initials: 'YN',
  role: 'Frontend developer and interface designer',
  intro:
    'I build fast, accessible websites and apps, and I care about the small details that make them feel considered.',

  // The clock in the hero shows this timezone (IANA name, e.g. "America/New_York").
  timezone: 'UTC',

  hero: {
    status: 'Open to work',
    facts: [
      ['Based in', 'City, Country'],
      ['Focus', 'UI engineering'],
      ['Stack', 'React, TypeScript, CSS'],
    ],
  },

  nav: [
    { id: 'home', label: 'Home' },
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ],

  // ── Projects ────────────────────────────────────────────────
  // `image`: leave as null to show the placeholder. To use a real image,
  // put the file in /public/projects/ and set image: '/projects/shop.jpg'.
  projects: [
    {
      id: 'storefront',
      title: 'Storefront redesign',
      year: '2026',
      role: 'Design and development',
      type: 'E-commerce',
      description:
        'A faster, simpler checkout for a small homeware shop. Cut the steps from cart to payment from six to three and lifted mobile conversion.',
      tags: ['React', 'Stripe', 'Accessibility'],
      links: { live: 'https://example.com', code: 'https://github.com/' },
      image: null,
    },
    {
      id: 'metrics',
      title: 'Metrics board',
      year: '2025',
      role: 'Frontend',
      type: 'Dashboard',
      description:
        'A live dashboard that turns a noisy event stream into five numbers a support team can act on, with keyboard-first filtering.',
      tags: ['TypeScript', 'D3', 'WebSockets'],
      links: { live: 'https://example.com', code: 'https://github.com/' },
      image: null,
    },
    {
      id: 'field-notes',
      title: 'Field notes',
      year: '2025',
      role: 'Solo project',
      type: 'Web app',
      description:
        'An offline-first note-taking app for people who work outdoors. Syncs when the signal comes back and never loses a draft.',
      tags: ['PWA', 'IndexedDB', 'CSS'],
      links: { live: 'https://example.com', code: 'https://github.com/' },
      image: null,
    },
    {
      id: 'transit-map',
      title: 'Transit map',
      year: '2024',
      role: 'Design and development',
      type: 'Data visualisation',
      description:
        'An interactive map of a city’s bus and tram network that answers one question quickly: how do I get there from here?',
      tags: ['SVG', 'React', 'Open data'],
      links: { live: 'https://example.com', code: null },
      image: null,
    },
  ],

  // ── About ───────────────────────────────────────────────────
  about: {
    // null shows a placeholder. Or: '/me.jpg' (file in /public).
    photo: null,
    lede: 'I’m a frontend developer who likes work that sits between design and code.',
    paragraphs: [
      'I’ve spent the last few years building interfaces for small teams and startups, from first sketch to shipped product. I’m happiest when I can own a feature end to end.',
      'Away from the keyboard you’ll find me on long walks, in secondhand bookshops, or fixing something that wasn’t quite broken.',
    ],
    facts: [
      ['Role', 'Frontend developer'],
      ['Based in', 'City, Country'],
      ['Experience', '4 years'],
      ['Languages', 'English'],
      ['Availability', 'From next month'],
    ],
    // level is 0 to 10
    skills: [
      { name: 'React', level: 9 },
      { name: 'JavaScript', level: 9 },
      { name: 'CSS', level: 8 },
      { name: 'TypeScript', level: 7 },
      { name: 'Accessibility', level: 7 },
      { name: 'Node.js', level: 5 },
    ],
    timeline: [
      {
        when: '2025 to now',
        title: 'Frontend developer, Company name',
        text: 'Leading the design system and the customer dashboard.',
      },
      {
        when: '2023 to 2025',
        title: 'Junior developer, Studio name',
        text: 'Shipped marketing sites and web apps for a dozen clients.',
      },
      {
        when: '2022',
        title: 'BSc Computer Science, University name',
        text: 'Final project on accessible data visualisation.',
      },
    ],
  },

  // ── Contact ─────────────────────────────────────────────────
  contact: {
    email: 'hello@yourdomain.com',
    blurb:
      'Have a project, a role, or just a question? Send a message and I’ll reply within a day or two.',
    socials: [
      { label: 'GitHub', handle: '@yourname', href: 'https://github.com/' },
      { label: 'LinkedIn', handle: 'in/yourname', href: 'https://linkedin.com/' },
      { label: 'Instagram', handle: '@yourname', href: 'https://instagram.com/' },
      { label: 'X', handle: '@yourname', href: 'https://x.com/' },
    ],
  },
}

export default site
