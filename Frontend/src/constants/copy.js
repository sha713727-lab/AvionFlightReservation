import { LEGAL_COPY } from '@/constants/legalCopy'

export const COPY = {
  cta: {
    talkWithExpert: 'Request independent booking help',
    bookConsultation: 'Request independent booking help',
    bookFreeConsultation: 'Request independent booking help',
    callNow: 'Call AvioSupportDesk',
    callBackRequest: 'Request a callback',
    exploreServices: 'See our service fees',
    callToBook: 'Request booking help',
    seeFees: 'See our service fees',
  },
  hero: {
    speakableSummary:
      'Compare portal redemptions, fixed-chart awards, and partner-transfer options before moving your Avion points. We explain remaining cash costs and booking steps while you keep control of your account. Assistance fees are quoted before you agree.',
    disclosure:
      'AvioSupportDesk is an independent travel assistance service. We are not affiliated with RBC, Avion Rewards, British Airways Avios, or any airline.',
  },
  footer: {
    tagline: 'Independent Avion points booking assistance and related travel help.',
    disclaimerTitle: 'Disclaimer',
    disclaimer:
      'AvioSupportDesk (aviosupportdesk.com) is an independent travel assistance service. We are not affiliated with, authorized by, or endorsed by Royal Bank of Canada (RBC), Avion Rewards, British Airways Avios, or any airline or bank reward program. Airline, hotel, and program names may appear only to identify customer travel requests. All trademarks are the property of their respective owners. Our assistance fee is separate from supplier and program charges.',
    rightsReserved: 'All rights reserved.',
    copyrightPrefix: '©',
    copyrightBrand: 'AvioSupportDesk',
  },
  callModal: {
    title: 'Call AvioSupportDesk',
    description:
      'Speak with AvioSupportDesk about comparing Avion redemption options or other trip assistance within our stated scope.',
    businessLabel: 'AvioSupportDesk phone',
  },
  callbackModal: {
    promptTitle: 'Need help booking?',
    promptDescription: 'Request a free callback from a travel specialist.',
    requestCta: 'Request a callback',
    formTitle: 'Request a callback',
    formDescription: 'Share your details and preferred time. We will call you back.',
    nameLabel: 'Full name',
    namePlaceholder: 'Your name',
    phoneLabel: 'Phone number',
    phonePlaceholder: '+1 555 000 0000',
    datetimeLabel: 'Preferred date & time',
    submitCta: 'Submit request',
    submittingCta: 'Submitting…',
    thankYouTitle: 'Thank you',
    thankYouDescription:
      'Your callback request was received. A travel specialist will contact you at your preferred time.',
  },
  rewards: {
    eyebrow: 'Points redemption assistance',
    title: 'Turn points into adventures',
    description:
      'Sitting on unused airline miles or credit card rewards? Our specialists help compare options and book travel. AvioSupportDesk is not affiliated with RBC or Avion Rewards.',
    cta: 'Get redemption help',
    imageAlt: 'Luxury airplane cabin for points and miles flight redemption',
    modalTitle: 'Need help redeeming your travel points?',
    modalDescription:
      "Speak with our travel specialist today. We'll review your travel points and find useful redemption options.",
  },
  services: {
    watermark: 'SERVICES',
    title: 'Flight & Travel Services',
    description:
      'From flight reservations to hotel bookings and points redemption assistance — handled by travel specialists over the phone.',
    whatYouGet: 'What you get',
    getStarted: 'Talk with an expert',
    exploreService: 'Explore Service',
    pageEyebrow: 'Our services',
    pageTitle: 'Book flights, hotels, and trip support by phone.',
    pageDescription:
      'AvioSupportDesk phone services cover flight booking, hotels, points redemption, changes, cancellations, seats, baggage, and trip planning. Call a specialist for clear next steps—we are an independent travel desk, not an airline or bank rewards hotline.',
    metaDescription:
      'Flight booking, hotel booking, and points redemption assistance with AvioSupportDesk. Independent travel specialists for Canada, USA, Europe, and Mexico.',
    pagePrimaryCta: 'Talk with an expert',
    pageSecondaryCta: 'Browse services',
    categoriesEyebrow: 'Service lines',
    categoriesTitle: 'A clear view of how Avion supports every trip.',
    categoriesDescription:
      'From first booking to last-minute changes — one team, one call, end-to-end travel support.',
    catalogEyebrow: 'Full catalog',
    catalogTitle: 'Every service, explained clearly.',
    catalogDescription:
      'Explore what each service includes, then talk with a specialist when you are ready to book.',
    catalogCtaTitle: 'Ready to book with a specialist?',
    catalogCtaDescription:
      'Call now for flight reservations, hotel booking, points help, or support on an existing trip.',
  },
  feeTransparency: {
    watermark: 'ASSISTANCE FEE',
    title: 'What our fee covers, and what it never includes',
    description:
      'Our assistance is optional and quoted before any paid work starts. Supplier and program charges stay separate.',
    items: [
      {
        id: 'quote-first',
        title: 'Quoted before work begins',
        description:
          'You receive the assistance fee, currency, and scope in writing and decide whether to accept it. We do not publish an invented “from” price.',
      },
      {
        id: 'covers',
        title: 'Comparison and guidance',
        description:
          'Itinerary comparison, a written cash-versus-points breakdown for options we can evaluate, and guidance for steps you complete in your own account.',
      },
      {
        id: 'separate',
        title: 'Supplier charges are separate',
        description:
          'Fares, taxes, surcharges, program fees, hotel rates, and any cash due alongside a redemption are charged by the supplier or program — not by us.',
      },
    ],
    ctaLabel: 'See full service fee details',
  },
  avionResources: {
    watermark: 'AVION GUIDES & TOOLS',
    title: 'Understand your Avion options before you call',
    description:
      'Read the rules, check the observed chart levels, and run your own numbers. Our paid assistance is optional — these resources are free.',
  },
  suppliers: {
    watermark: 'SUPPLIERS TRAVELERS ASK ABOUT',
    title: 'Airlines and programs travelers ask about',
    description:
      'These are the airlines, hotels, and loyalty programs customers most often ask us about when comparing an itinerary.',
    note:
      'Naming a supplier is not a partnership, endorsement, or claim of special access. We hold no airline or program authority and cannot override supplier rules.',
    noteLinkLabel: 'Read our independent service disclosure',
  },
  whyUs: {
    watermark: 'WHY US',
    title: 'Why book with AvioSupportDesk',
    description: 'Independent specialists, clear booking guidance, and dedicated phone support.',
    previousLabel: 'Previous reason',
    nextLabel: 'Next reason',
  },
  process: {
    watermark: 'PROCESS',
    title: 'PROCESS',
    description: 'From your request to a quoted fee and customer-controlled next steps.',
  },
  destinations: {
    watermark: 'DESTINATIONS',
    title: 'Popular Flight Destinations',
    accentTitle: 'Where will you go next',
    description:
      'Example destinations travelers often ask about. Points requirements depend on origin, membership eligibility, trip type, and current program rules—not a fixed city price.',
    redeemFrom: 'Illustrative chart level',
    potentialDestinations: 'Example destinations',
    pointsDisclaimer:
      'Point figures shown with chart levels are illustrative only. They are not guaranteed quotes, inventory, or AvioSupportDesk redemption prices. Confirm current rules on the official Avion Rewards travel site or request a written comparison from us.',
    pageEyebrow: 'Destinations',
    pageTitle: 'Popular flight destinations across Canada, USA, and beyond.',
    pageDescription:
      'Browse example destinations travelers discuss with AvioSupportDesk. We help compare routes and redemption conditions; we do not publish unconditional city point prices.',
    metaDescription:
      'Browse example Canada, USA, Europe, and Mexico destinations. AvioSupportDesk provides independent booking assistance—not guaranteed Avion point prices by city.',
    pagePrimaryCta: 'Request independent booking help',
    pageSecondaryCta: 'Browse destinations',
    filterAll: 'All destinations',
    pointsLabel: 'points (illustrative)',
    redeemFromLabel: 'Example chart level',
    galleryEyebrow: 'Explore',
    galleryTitle: 'Places travelers often ask about.',
    galleryDescription:
      'Filter by region group or browse destinations. Point costs vary by origin, eligibility, and program terms—use our chart guide for conditional examples.',
    ctaTitle: 'Need help comparing options for a destination?',
    ctaDescription:
      'Request independent assistance to compare cash and points options for your route. Fees are quoted before you agree.',
  },
  faq: {
    watermark: 'FAQ',
    title: 'FAQ',
    accentTitle: 'Questions? We have answers',
    description: 'Everything you need to know about booking with AvioSupportDesk — explained simply.',
  },
  redeemCta: {
    title: 'Need Avion points booking assistance?',
    description:
      'Request help comparing Avion redemptions, cash fares, or an existing trip. Fees are quoted before paid work begins.',
  },
  about: {
    pageEyebrow: 'About Us',
    pageTitle: 'Independent Avion points and travel assistance.',
    pageDescription:
      'AvioSupportDesk operates as an independent phone assistance service based on correspondence in Toronto, Canada. We help travelers compare Avion points options, cash fares, and related booking steps—we are not an airline call center or bank rewards desk.',
    metaDescription:
      'Learn who operates AvioSupportDesk, how fees work, and what we can and cannot do. Independent Avion points and flight assistance—not affiliated with RBC or Avion Rewards.',
    pagePrimaryCta: 'Request independent booking help',
    pageSecondaryCta: 'See our service fees',
    whoWeAreEyebrow: 'Who We Are',
    whoWeAreTitle: 'Who operates AvioSupportDesk, and how we work.',
    whoWeAreParagraphs: [
      'AvioSupportDesk is an independent travel assistance business that serves customers by phone and written inquiry across Canada, the United States, and international callers who need English-language booking help.',
      'Our core focus is Avion points booking assistance: comparing portal redemptions, fixed-chart awards, partner-transfer paths, remaining cash costs, and when paying cash may be clearer. We also help with related flight bookings, changes, cancellations, hotels, seats, and baggage when those requests fit an accepted scope.',
      'We do not operate airline or rewards accounts for you, collect passwords or one-time codes, override supplier rules, or claim affiliation with RBC, Avion Rewards, British Airways Avios, or any airline. You approve every travel option and keep control of your accounts.',
      'Assistance fees are quoted in writing before paid work starts and stay separate from fares, taxes, surcharges, and program charges. Customer contact details are used only to respond to your request under our privacy policy.',
    ],
    transparencyLabel: 'Transparency',
    transparencyText:
      'We are not an airline, hotel, bank, rewards program, or card issuer. We are not affiliated with RBC, Avion Rewards, British Airways Avios, or any airline. The Toronto address listed on this site is a correspondence mailing address—not a staffed walk-in customer office. Visitors are not expected at that address. All fares, availability, rules, and changes are subject to the final terms of the actual travel supplier.',
    whyChooseEyebrow: 'Why Choose Us',
    whyChooseTitle: 'Why travelers choose AvioSupportDesk.',
    whyChooseDescription:
      'Independent phone help, clear fee explanations, and honest limits on what we can and cannot do.',
    trustTitle: 'Trust signals we stand behind',
    missionEyebrow: 'Our Mission',
    missionTitle: 'Make travel booking easier at every step.',
    missionDescription:
      'To make travel booking easier by giving customers simple explanations, available options, and support through each step of the reservation process.',
    valuesEyebrow: 'Our Values',
    valuesTitle: 'Clear details before every travel decision.',
    valuesDescription:
      'We believe customers should receive clear details before making travel decisions.',
    contactReasonsEyebrow: 'Why Customers Contact Us',
    contactReasonsTitle: 'Support when booking details matter most.',
    contactReasonsDescription:
      'Customers may contact us when they need assistance with flight reservations, hotel arrangements, travel date changes, cancellation guidance, points redemption questions, or understanding policy information related to their trip.',
    ctaTitle: 'Need help with a reservation?',
    ctaDescription:
      'Request independent assistance for flight booking, hotel arrangements, trip planning, or questions about an existing reservation. Fees are quoted before paid work begins.',
  },
  contactPage: {
    pageEyebrow: 'Contact Us',
    pageTitle: 'Contact AvioSupportDesk for independent help.',
    pageDescription:
      'Contact AvioSupportDesk by phone or inquiry form for independent flight booking help, changes, cancellations, and travel questions. Keep dates, destinations, and booking references ready—never send account passwords or one-time codes.',
    metaDescription:
      'Contact AvioSupportDesk for independent flight and points assistance by phone or inquiry form. Not affiliated with RBC or Avion Rewards. Call +1 877 702 9887.',
    pagePrimaryCta: 'Call AvioSupportDesk',
    supportEyebrow: 'Get Travel Support',
    supportTitle: 'Speak with a specialist by phone.',
    supportDescription:
      'For booking assistance, trip questions, or policy support, contact our team by phone during staffed hours. Please keep your travel dates, destination, passenger details, and any existing booking information ready when you call.',
    phoneLabel: 'Phone Support',
    bestForLabel: 'Best For',
    bestForText: 'Flight booking, changes, cancellations, and travel questions',
    serviceTypeLabel: 'Service Type',
    serviceTypeText: 'Independent travel assistance',
    beforeCallEyebrow: 'Before You Call',
    beforeCallTitle: 'Have these details ready.',
    noticeLabel: 'Important Notice',
    noticeText:
      'We provide support based on available supplier information. Final prices, rules, and availability can change until the booking is confirmed. Our assistance fee is separate and quoted before you agree.',
    formEyebrow: 'Send a message',
    formTitle: 'Contact form',
    formDescription:
      'Submit a validated inquiry. You will receive a reference number when it is accepted. For urgent trips, call us. Do not include passwords, OTPs, or full card numbers.',
    formNameLabel: 'Full name',
    formNamePlaceholder: 'Your name',
    formEmailLabel: 'Email',
    formEmailPlaceholder: 'you@example.com',
    formPhoneLabel: 'Phone',
    formPhonePlaceholder: '+1 555 000 0000',
    formSubjectLabel: 'Subject',
    formSubjectPlaceholder: 'How can we help?',
    formMessageLabel: 'Message',
    formMessagePlaceholder: 'Share trip dates, destinations, or booking questions…',
    formSubmitCta: 'Send message',
    formSubmittingCta: 'Sending…',
    correspondenceEyebrow: 'Mailing address',
    correspondenceTitle: 'Toronto correspondence address',
    correspondenceDescription:
      'This is a mailing address for written correspondence only. It is not a walk-in customer office, and visitors are not expected on site. Prefer phone or the inquiry form for booking help.',
    correspondenceMapsLabel: 'View mailing address on Google Maps',
    hoursEyebrow: 'Business hours',
    hoursTitle: 'When you can reach us',
  },
  internationalFlight: {
    badge: 'Independent Travel Assistance',
    titleLineOne: 'Book Your Flight',
    titleLineTwo: 'By Phone.',
    description:
      'Book international and domestic flights by phone with AvioSupportDesk—a real specialist compares fare options for Europe, Canada, Mexico, and USA routes. No bots: share your trip details, review rules, and confirm when you are ready.',
    availability: 'Available 7 days a week · Canada & USA',
    regionsEyebrow: 'We book flights to',
    regionsTitle: 'Popular international and domestic routes.',
    regionsDescription:
      'Tell us where you are headed — our specialists book Europe, Canada, Mexico, and United States routes by phone.',
    stepsTitle: 'Three steps. That\'s it.',
    stepsDescription: 'Call, share your trip details, and we confirm your booking.',
    ctaTitle: 'Ready to fly?',
    ctaDescription: 'Call now — we\'ll handle the rest.',
    metaDescription:
      'Book international and domestic flights by phone with AvioSupportDesk. Independent specialists for Europe, Canada, Mexico, and USA routes.',
  },
  ...LEGAL_COPY,
}
