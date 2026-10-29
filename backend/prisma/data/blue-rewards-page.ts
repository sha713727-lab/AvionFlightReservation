/** Seed content for the /blue-rewards CMS page. Media slots start empty for admin upload. */

export const BLUE_REWARDS_PAGE_SEED = {
  status: 'published',
  metaTitle: 'Blue Rewards Travel Redemption Help | AvioSupportDesk',
  metaDescription:
    'Get independent help with Blue Rewards travel redemption. Compare travel options, understand points and cash costs, and follow the official booking process.',
  ogTitle: null as string | null,
  ogDescription: null as string | null,
  heroHeading: 'Blue Rewards Travel Redemption Assistance',
  heroIntroduction:
    'Put your Blue Points towards your next trip.\n\nPlanning a getaway with your rewards? AvioSupportDesk helps you understand your travel options, compare points against cash prices, and review the details before you redeem.\n\nGet personalised guidance for your destination, dates and budget while keeping control of your Blue Rewards account. We are an independent paid travel-assistance service, not affiliated with Blue Rewards or BMO.',
  heroPrimaryCtaLabel: 'Get Redemption Guidance',
  heroSecondaryCtaLabel: 'View Our Service Fees',
  heroSecondaryCtaHref: '/service-fees',
  officialLinkLabel: 'Visit the official Blue Rewards Travel website',
  officialLinkHref: 'https://travel.bluerewards.ca/',
  storyLabel: 'A clearer way to plan travel with your points',
  storyParagraphs: [
    'A points balance is only the starting point. Your travel dates, preferred route, accommodation needs and remaining cash costs all matter when choosing a redemption.',
    'We help you review the options available for your trip and understand what each includes. Whether you are comparing flights, planning a hotel stay or considering a package, our guidance helps you make an informed decision before confirming your booking.',
  ],
  storyCtaLabel: 'Request Travel Redemption Help',
  storyCtaHref: '/contact',
  principlesHeading: 'How our redemption assistance works',
  clientsEnabled: false,
  clientsHeading: '',
  clientsIntroduction: '',
  railLabel: 'Understand the total before you redeem',
  contactEmailOverride: null as string | null,
  mediaSlots: [
    { slotKey: 'lead', mediaUrl: '', alt: '' },
    { slotKey: 'pairALeft', mediaUrl: '', alt: '' },
    { slotKey: 'pairARight', mediaUrl: '', alt: '' },
    { slotKey: 'pairBLeft', mediaUrl: '', alt: '' },
    { slotKey: 'pairBRight', mediaUrl: '', alt: '' },
  ],
  principles: [
    {
      numberLabel: '01',
      title: 'Tell us about your trip',
      description:
        'Share your destination, departure city, travel dates, number of travellers and approximate Blue Points balance. Let us know whether your dates are flexible and how much you are comfortable paying alongside your points.',
      sortOrder: 1,
    },
    {
      numberLabel: '02',
      title: 'Review your assistance quote',
      description:
        'We explain the help we can provide and give you a written quote before paid work begins. Your quote identifies our assistance fee, currency and agreed scope.',
      sortOrder: 2,
    },
    {
      numberLabel: '03',
      title: 'Compare your options',
      description:
        'We help review the options we can evaluate, including points required, remaining cash costs, travel arrangements and relevant restrictions.',
      sortOrder: 3,
    },
    {
      numberLabel: '04',
      title: 'Complete your booking through official channels',
      description:
        'You sign in to your own account and complete the redemption through the official booking process. We can explain the steps while you retain control of your account and final decision.',
      sortOrder: 4,
    },
  ],
  railCards: [
    {
      cardType: 'standard',
      title: 'Look beyond the points total',
      body: 'A useful comparison looks beyond the number of points displayed. Blue Points can cover eligible booking costs, including taxes and fees, with exceptions for cruises and charges payable at the property. A credit card may still be required. Always review the final payment breakdown before confirming.',
      sortOrder: 1,
    },
    {
      cardType: 'standard',
      title: 'Points required',
      body: 'The points required for your selected trip.',
      sortOrder: 2,
    },
    {
      cardType: 'standard',
      title: 'Card payment',
      body: 'Any amount payable by credit card.',
      sortOrder: 3,
    },
    {
      cardType: 'standard',
      title: 'Optional extras',
      body: 'Baggage, seat selection and other optional extras.',
      sortOrder: 4,
    },
    {
      cardType: 'standard',
      title: 'On-site charges',
      body: 'Charges payable at the property or rental counter.',
      sortOrder: 5,
    },
    {
      cardType: 'standard',
      title: 'Change and cancellation',
      body: 'Change and cancellation conditions for your booking.',
      sortOrder: 6,
    },
    {
      cardType: 'partnership',
      title: 'Our assistance fee',
      body: 'Our separately quoted assistance fee is independent of travel and programme charges.',
      linkLabel: 'View Our Service Fees',
      linkHref: '/service-fees',
      sortOrder: 7,
    },
  ],
  properties: [
    {
      title: 'Flights',
      blurb:
        'Compare departure times, connections, cabin options and baggage conditions to find a journey that suits your plans.',
      sortOrder: 1,
    },
    {
      title: 'Hotels and stays',
      blurb:
        'Review location, room type, included amenities and cancellation terms before choosing where to stay.',
      sortOrder: 2,
    },
    {
      title: 'Car rentals',
      blurb:
        'Understand vehicle categories, pickup arrangements, mileage conditions and charges payable at the rental counter.',
      sortOrder: 3,
    },
    {
      title: 'Travel packages',
      blurb:
        'Consider flights and accommodation together, checking the complete itinerary, inclusions and conditions before committing.',
      sortOrder: 4,
    },
    {
      title: 'Activities and experiences',
      blurb:
        'Explore eligible activities for your destination and check dates, admission details and cancellation conditions.',
      sortOrder: 5,
    },
    {
      title: 'Cruises',
      blurb:
        'Explore cruise redemption options through Blue Rewards’ cruise partner, redtag.ca. Cruise bookings have separate minimum-points and payment requirements.',
      sortOrder: 6,
    },
  ],
  faqs: [
    {
      question: 'How do I redeem Blue Points for travel?',
      answer:
        'Sign in through the official Blue Rewards website, open the travel section and search for your preferred trip. Review the available payment options and complete the booking through the official checkout. We provide optional guidance throughout your decision-making process.',
      sortOrder: 1,
      isEnabled: true,
    },
    {
      question: 'Can I use points and pay the remainder by credit card?',
      answer:
        'Yes. Blue Rewards supports a combination of points and credit-card payment for eligible travel. Cruise bookings follow separate requirements, including a minimum points redemption. Check the payment options displayed for your selected booking.',
      sortOrder: 2,
      isEnabled: true,
    },
    {
      question: 'How many Blue Points do I need for my trip?',
      answer:
        'Check the current redemption quote for your selected travel dates and product. There is no single points requirement for every trip. The advertised value of 1,500 points for $10 applies to eligible in-store and eGift Card redemptions; travel uses separate redemption terms and rates.',
      sortOrder: 3,
      isEnabled: true,
    },
    {
      question: 'What happened to my AIR MILES balance?',
      answer:
        'The Canadian AIR MILES programme transitioned to Blue Rewards on June 2, 2026. Existing Miles were automatically converted into Blue Points, and Cash and Dream balances were combined. Blue Rewards states that the conversion preserved their value. Check your official account for your current balance.',
      sortOrder: 4,
      isEnabled: true,
    },
    {
      question: 'Can you redeem my points over the phone?',
      answer:
        'We can explain your options and booking steps by phone. You complete the online redemption through the official Blue Rewards channels. We do not take control of your rewards account or request your password or one-time verification codes.',
      sortOrder: 5,
      isEnabled: true,
    },
    {
      question: 'Can I change or cancel a trip booked with points?',
      answer:
        'Your options depend on the booking conditions and applicable supplier rules. Charges may apply, and refunds are available only where the terms permit. We can help you understand those conditions, but changes and refunds must be handled through the provider responsible for your reservation.',
      sortOrder: 6,
      isEnabled: true,
    },
    {
      question: 'Do I have to pay AvioSupportDesk to use my points?',
      answer:
        'No. Our assistance is optional. You can use the official Blue Rewards booking channels yourself. If you choose our help, we explain our separate assistance fee before you agree. Travel costs and any programme or supplier charges remain separate.',
      sortOrder: 7,
      isEnabled: true,
    },
    {
      question: 'Who should I contact about login problems or missing points?',
      answer:
        'Contact the official Blue Rewards support team for account access, missing points, balance discrepancies and programme decisions. Visit the official Blue Rewards Support Centre: https://www.bluerewards.ca/en/support-centre.html.',
      sortOrder: 8,
      isEnabled: true,
    },
  ],
}
