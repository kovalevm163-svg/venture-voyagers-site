document.getElementById("year").textContent = new Date().getFullYear();

const authCta = document.getElementById("auth-cta");
let activeAccount = null;
let currentAssignedConcierge = null;
const SESSION_EMAIL_KEY = "vvs_active_account_email";
const SESSION_ACCOUNT_SNAPSHOT_KEY = "vvs_active_account_snapshot";
const SUNRISE_SESSION_KEY = "vvs_sunrise_session";
const SUNRISE_CONTROL_DATA_KEY = "vvs_sunrise_control_data";
const WEBSITE_SHUTDOWN_KEY = "vvs_website_shutdown_v3";

const accounts = {
  "vlv@1.a": {
    email: "VLV@1.A",
    password: "1234",
    secretPhrase: "Abu",
    prefix: "His Higness",
    firstName: "Ahmad",
    lastName: "Al-Qinar",
    country: "UAE",
    membership: "Voyager Red",
    servicesCompleted: 347,
    pastService: {
      title: "Jerusalem Security Escort",
      details: "Principal protection and route management across Jerusalem.",
      endedAt: "January 12, 2026, 18:40 (GMT+2)"
    },
    upcomingService: {
      title: "Maldives - Radoga Resorts",
      details: "43-night executive stay. Jet departure 11:30 AM, pick-up team arrival 9:45 AM, breakfast prepared on road.",
      startsAt: "March 04, 2026, 11:30 (UTC+5)"
    },
    assignedTeam: {
      pilot: "Aquila Executive Fleet (G650ER, Global 7500, Falcon 8X) | Captain Luca Ferri | pilot.luca@venture-voyagers.com | +971 50 440 1937",
      driver: "Rashid Al Nuaimi | driver.rashid@venture-voyagers.com | +971 52 771 9024",
      concierge: "Benedict Hale | concierge.benedict@venture-voyagers.com | +971 58 006 1183",
      security: "Idris Kamel | security.idris@venture-voyagers.com | +971 56 990 7742"
    },
    tips: [
      "Your early pick-up includes a secured breakfast route to maintain timing and privacy.",
      "Travel with duplicate document copies in separate bags and keep one offline itinerary copy.",
      "Use secured communications only for schedule updates while in transit."
    ]
  },
  "eb@1.a": {
    email: "eb@1.a",
    password: "AA1234",
    secretPhrase: "Masichka",
    prefix: "Mrs.",
    firstName: "Elizaveta",
    lastName: "Kovaleva-Buyvidayte",
    country: "Russian Federation",
    membership: "Voyager Red",
    servicesCompleted: 312,
    pastService: {
      title: "Vilnius Executive Security Escort",
      details: "Protected executive transfer with route control and private arrival handling.",
      endedAt: "February 15, 2026, 20:10 (EET)"
    },
    upcomingService: {
      title: "Monaco Discreet Travel Program",
      details: "Private aviation, arrival corridor security, and concierge-led schedule management.",
      startsAt: "March 10, 2026, 09:35 (CET)"
    },
    assignedTeam: {
      pilot: "North Star Fleet (G700, Falcon 8X, Global 7500) | Captain Emilia Rozen | pilot.emilia@venture-voyagers.com | +370 612 440 991",
      driver: "Tomas Vaitkus | driver.tomas@venture-voyagers.com | +370 622 771 204",
      concierge: "Selene Marwick | concierge.selene@venture-voyagers.com | +370 655 908 332",
      security: "Aurelijus Kazlauskas | security.aurelijus@venture-voyagers.com | +370 669 120 883"
    },
    tips: [
      "Submit your itinerary early to enable faster execution planning.",
      "Keep one backup contact channel active while traveling.",
      "Use secure channels for sensitive movement details."
    ]
  },
  "noir@venture-voyagers.com": {
    email: "noir@venture-voyagers.com",
    password: "Noir!7788",
    secretPhrase: "Obsidian",
    prefix: "Mr.",
    firstName: "Lorenzo",
    lastName: "Fabrizzi",
    country: "Italy",
    membership: "Voyager Noir",
    servicesCompleted: 76,
    pastService: {
      title: "Monaco Grand Prix Mobility & Security",
      details: "Executive movement program with venue perimeter security and rapid transfer orchestration.",
      endedAt: "May 27, 2026, 21:25 (CEST)"
    },
    upcomingService: {
      title: "Kyoto Cultural Retreat Logistics",
      details: "12-night schedule, private aviation segment, heritage-site permits, and multilingual concierge support.",
      startsAt: "September 09, 2026, 14:10 (JST)"
    },
    tips: [
      "Use separate communication channels for itinerary and identity-sensitive details.",
      "Confirm venue access windows at least 24 hours before arrival.",
      "Keep a digital and printed emergency contact card at all times."
    ]
  },
  "noir2@venture-voyagers.com": {
    email: "noir2@venture-voyagers.com",
    password: "Noir2026",
    secretPhrase: "Velvet",
    prefix: "Ms.",
    firstName: "Elena",
    lastName: "Morandi",
    country: "Italy",
    membership: "Voyager Noir",
    servicesCompleted: 64,
    pastService: {
      title: "Zurich Executive Protection Transit",
      details: "Airport-to-venue security corridor with controlled transfer and discreet escort.",
      endedAt: "February 03, 2026, 22:10 (CET)"
    },
    upcomingService: {
      title: "Tokyo Multi-City Business Program",
      details: "10-night schedule, secured route planning, priority venue entry, and rapid concierge support.",
      startsAt: "April 18, 2026, 09:20 (JST)"
    },
    tips: [
      "Keep travel and identity documentation in separate secure holders.",
      "Confirm transfer windows 12 hours before each movement segment.",
      "Use encrypted channels for schedule adjustments when abroad."
    ]
  },
  "ava@1.com": {
    email: "ava@1.com",
    password: "Asa17",
    secretPhrase: "Twerk",
    prefix: "Ms.",
    firstName: "Ava",
    lastName: "Miller",
    country: "UAE",
    membership: "Voyager Cuprum",
    servicesCompleted: 7,
    pastService: {
      title: "Dubai Priority Transfer Coordination",
      details: "Time-sensitive city routing with private transfer and concierge escort.",
      endedAt: "February 10, 2026, 17:05 (GST)"
    },
    upcomingService: {
      title: "Abu Dhabi Executive Event Support",
      details: "Venue logistics, transport management, and on-site concierge assistance.",
      startsAt: "March 02, 2026, 10:00 (GST)"
    },
    tips: [
      "Confirm event passes and IDs one day before departure.",
      "Share one emergency contact with your assigned concierge team.",
      "Keep both email and phone channels available for rapid updates."
    ]
  },
  "dr.rakesh@vvs.com": {
    email: "dr.rakesh@vvs.com",
    password: "Rakesh88",
    secretPhrase: "Lotus",
    prefix: "Dr.",
    firstName: "Rakesh",
    lastName: "Menon",
    country: "India",
    membership: "Voyager Aurum",
    servicesCompleted: 24,
    pastService: {
      title: "Mumbai Business Route & Terminal Support",
      details: "Priority airport processing and city-side executive movement control.",
      endedAt: "February 02, 2026, 20:15 (IST)"
    },
    upcomingService: {
      title: "Singapore Board Summit Transit",
      details: "3-day business support with premium transfer sequencing and concierge ops.",
      startsAt: "March 11, 2026, 08:40 (SGT)"
    },
    tips: [
      "Keep boarding and identification documents in one protected holder.",
      "Confirm vehicle plate and driver identity before departure.",
      "Notify concierge immediately if schedule changes by more than 15 minutes."
    ]
  },
  "mr.kovalev@vvs.com": {
    email: "mr.kovalev@vvs.com",
    password: "Kovalev55",
    secretPhrase: "Polar",
    prefix: "Mr.",
    firstName: "Alexei",
    lastName: "Kovalev",
    country: "Russia",
    membership: "Voyager Argentum",
    servicesCompleted: 15,
    pastService: {
      title: "St. Petersburg Security Transit",
      details: "Business district protection and monitored inter-venue movements.",
      endedAt: "January 30, 2026, 19:00 (MSK)"
    },
    upcomingService: {
      title: "Dubai Investor Week Route Program",
      details: "Airport escort, meeting transfers, and schedule risk management.",
      startsAt: "April 06, 2026, 10:30 (GST)"
    },
    tips: [
      "Use designated secure lanes when advised by concierge.",
      "Carry one secondary payment option for contingency routing.",
      "Maintain discreet travel posture in public waiting areas."
    ]
  },
  "ms.fabrizzi@vvs.com": {
    email: "ms.fabrizzi@vvs.com",
    password: "Fabrizzi77",
    secretPhrase: "Opera",
    prefix: "Ms.",
    firstName: "Giulia",
    lastName: "Fabrizzi",
    country: "Italy",
    membership: "Voyager Platinum",
    servicesCompleted: 36,
    pastService: {
      title: "Rome Diplomatic Event Support",
      details: "Multi-venue convoy sequencing and protected executive entry paths.",
      endedAt: "February 05, 2026, 23:10 (CET)"
    },
    upcomingService: {
      title: "London Fashion Circuit Coordination",
      details: "7-day movement command, arrivals supervision, and venue liaison.",
      startsAt: "March 19, 2026, 09:10 (GMT)"
    },
    tips: [
      "Lock final wardrobe/equipment logistics 24h prior to movement.",
      "Keep venue contacts available offline in case of network delay.",
      "Use concierge-approved transfer points only."
    ]
  },
  "sir.hughes@vvs.com": {
    email: "sir.hughes@vvs.com",
    password: "Hughes66",
    secretPhrase: "Crown",
    prefix: "Sir",
    firstName: "Edward",
    lastName: "Hughes",
    country: "United Kingdom",
    membership: "Voyager Diamante",
    servicesCompleted: 49,
    pastService: {
      title: "Geneva Private Protection Rotation",
      details: "Extended executive protection with controlled movement corridors.",
      endedAt: "February 07, 2026, 18:55 (CET)"
    },
    upcomingService: {
      title: "Doha Strategy Forum Program",
      details: "5-day secure itinerary with managed security perimeter transitions.",
      startsAt: "April 13, 2026, 12:20 (AST)"
    },
    tips: [
      "Share passport copy in advance through secure channel only.",
      "Use staggered departure timing to reduce congestion risk.",
      "Keep emergency card accessible in both phone and hard copy."
    ]
  },
  "mr.alvarez@vvs.com": {
    email: "mr.alvarez@vvs.com",
    password: "Alvarez44",
    secretPhrase: "Toro",
    prefix: "Mr.",
    firstName: "Diego",
    lastName: "Alvarez",
    country: "Spain",
    membership: "Voyager Cuprum",
    servicesCompleted: 8,
    pastService: {
      title: "Madrid Convention Mobility Setup",
      details: "Arrival coordination and controlled city transfer operations.",
      endedAt: "February 04, 2026, 16:20 (CET)"
    },
    upcomingService: {
      title: "Lisbon Investor Tour Support",
      details: "2-day transfer and concierge management for executive meetings.",
      startsAt: "March 08, 2026, 09:45 (WET)"
    },
    tips: [
      "Review traffic advisories before first departure.",
      "Carry spare device charging backup for long transfer windows.",
      "Confirm venue access credentials before boarding."
    ]
  },
  "ms.tanaka@vvs.com": {
    email: "ms.tanaka@vvs.com",
    password: "Tanaka90",
    secretPhrase: "Sakura",
    prefix: "Ms.",
    firstName: "Aiko",
    lastName: "Tanaka",
    country: "Japan",
    membership: "Voyager Aurum",
    servicesCompleted: 27,
    pastService: {
      title: "Osaka Medical Summit Logistics",
      details: "Executive transfers and multilingual concierge support throughout summit.",
      endedAt: "February 01, 2026, 20:05 (JST)"
    },
    upcomingService: {
      title: "Seoul Board Session Program",
      details: "Airport fast-track, secure route planning, and hotel operations support.",
      startsAt: "March 21, 2026, 11:10 (KST)"
    },
    tips: [
      "Use concierge-verified emergency clinics near each venue.",
      "Keep business and private itineraries separated for privacy.",
      "Enable roaming backup connectivity before international movement."
    ]
  },
  "dr.nasser@vvs.com": {
    email: "dr.nasser@vvs.com",
    password: "Nasser52",
    secretPhrase: "Falcon",
    prefix: "Dr.",
    firstName: "Hadi",
    lastName: "Nasser",
    country: "Qatar",
    membership: "Voyager Platinum",
    servicesCompleted: 40,
    pastService: {
      title: "Doha Night Security Corridor",
      details: "High-security venue transfer with layered route monitoring.",
      endedAt: "February 08, 2026, 01:15 (AST)"
    },
    upcomingService: {
      title: "Paris Private Medical Delegation",
      details: "6-day protected travel plan and executive reception support.",
      startsAt: "April 01, 2026, 13:35 (CEST)"
    },
    tips: [
      "Confirm all travel meds and prescriptions before departure.",
      "Use controlled arrival points for high-density venues.",
      "Escalate any schedule compression to concierge immediately."
    ]
  },
  "mr.santos@vvs.com": {
    email: "mr.santos@vvs.com",
    password: "Santos31",
    secretPhrase: "Rio",
    prefix: "Mr.",
    firstName: "Paulo",
    lastName: "Santos",
    country: "Brazil",
    membership: "Voyager Argentum",
    servicesCompleted: 16,
    pastService: {
      title: "Sao Paulo Executive Transfer Control",
      details: "City movement and airport channel management for investor roadshow.",
      endedAt: "February 09, 2026, 19:30 (BRT)"
    },
    upcomingService: {
      title: "Miami Cross-Border Meeting Program",
      details: "3-day secure mobility and concierge-led schedule protection.",
      startsAt: "March 28, 2026, 10:50 (EDT)"
    },
    tips: [
      "Pre-clear airport transfer timing to reduce waiting exposure.",
      "Keep one trusted contact copied on key schedule updates.",
      "Use secure payment channels for urgent booking adjustments."
    ]
  },
  "ms.williams@vvs.com": {
    email: "ms.williams@vvs.com",
    password: "Will88",
    secretPhrase: "Amber",
    prefix: "Ms.",
    firstName: "Jordan",
    lastName: "Williams",
    country: "USA",
    membership: "Voyager Cuprum",
    servicesCompleted: 10,
    pastService: {
      title: "New York Priority Security Escort",
      details: "Event entry security and tightly timed transfer execution.",
      endedAt: "February 11, 2026, 22:25 (EST)"
    },
    upcomingService: {
      title: "Los Angeles Studio Circuit Support",
      details: "Production-day mobility with multi-point routing and concierge oversight.",
      startsAt: "March 17, 2026, 08:15 (PST)"
    },
    tips: [
      "Leave 20-minute buffer for high-traffic city corridors.",
      "Use discreet pickup points near major venue exits.",
      "Keep key IDs in two separate secure compartments."
    ]
  },
  "mr.mendes@vvs.com": {
    email: "mr.mendes@vvs.com",
    password: "Mendes27",
    secretPhrase: "Atlas",
    prefix: "Mr.",
    firstName: "Rui",
    lastName: "Mendes",
    country: "Portugal",
    membership: "Voyager Diamante",
    servicesCompleted: 53,
    pastService: {
      title: "Porto Diplomatic Security Movement",
      details: "Full-city protective scheduling and principal transfer command.",
      endedAt: "February 06, 2026, 21:45 (WET)"
    },
    upcomingService: {
      title: "Marrakesh Executive Resort Program",
      details: "9-night private stay with aviation, transfer, and perimeter support.",
      startsAt: "April 09, 2026, 12:40 (WEST)"
    },
    tips: [
      "Validate hotel-side private access routes before arrival.",
      "Use secured luggage tracking for long-haul travel segments.",
      "Keep all updated itineraries synced with concierge dispatch."
    ]
  },
  "hh.farooq@vvs.com": {
    email: "hh.farooq@vvs.com",
    password: "RedMajlis9",
    secretPhrase: "Phoenix",
    prefix: "His Highness",
    firstName: "Farooq",
    lastName: "Al-Maktoum",
    country: "UAE",
    membership: "Voyager Red",
    servicesCompleted: 412,
    pastService: {
      title: "Cannes Red-Carpet Security Program",
      details: "End-to-end executive security, convoy handling, and private venue transitions.",
      endedAt: "February 12, 2026, 23:35 (CET)"
    },
    upcomingService: {
      title: "Geneva Family Office Summit",
      details: "14-night elite travel command with dedicated Red-tier concierge team.",
      startsAt: "April 22, 2026, 10:45 (CEST)"
    },
    assignedTeam: {
      pilot: "Crimson Crown Fleet (Lineage 1000E, G700, Challenger 650) | Captain Arman Qadir | pilot.arman@venture-voyagers.com | +971 50 881 2201",
      driver: "Khaled Noor | driver.khaled@venture-voyagers.com | +971 52 741 9903",
      concierge: "Selena Ward | concierge.selena@venture-voyagers.com | +971 58 212 7710",
      security: "Maj. Idris Kareem | security.idris@venture-voyagers.com | +971 56 334 5802"
    },
    tips: [
      "Confirm all principal movement windows 6 hours in advance for security staging.",
      "Use designated executive lanes and controlled access points only.",
      "Keep all schedule revisions routed through concierge command."
    ]
  },
  "lady.rossi@vvs.com": {
    email: "lady.rossi@vvs.com",
    password: "RossaElite7",
    secretPhrase: "VelvetRose",
    prefix: "Lady",
    firstName: "Isabella",
    lastName: "Rossi",
    country: "Italy",
    membership: "Voyager Red",
    servicesCompleted: 389,
    pastService: {
      title: "Milan Couture Week Command",
      details: "Secure venue sequencing, executive transport shielding, and VIP access control.",
      endedAt: "February 09, 2026, 21:10 (CET)"
    },
    upcomingService: {
      title: "New York Investment Circuit",
      details: "11-night Red-tier operation with private aviation and full concierge team coverage.",
      startsAt: "May 03, 2026, 08:55 (EDT)"
    },
    assignedTeam: {
      pilot: "Rosso Vento Fleet (Falcon 7X, Praetor 600, Gulfstream G600) | Captain Marco Vitale | pilot.marco@venture-voyagers.com | +39 345 778 1201",
      driver: "Luca Berni | driver.luca@venture-voyagers.com | +39 334 509 8817",
      concierge: "Benedict Hale | concierge.benedict@venture-voyagers.com | +39 327 610 7724",
      security: "Elena Marchetti | security.elena@venture-voyagers.com | +39 339 118 0046"
    },
    tips: [
      "Use split departure strategy for large venue exits.",
      "Carry backup secure comms battery during long-day schedules.",
      "Pre-authorize all overnight routing updates with your concierge lead."
    ]
  },
  "mr.chen@vvs.com": {
    email: "mr.chen@vvs.com",
    password: "ChenStart1",
    secretPhrase: "Lantern",
    prefix: "Mr.",
    firstName: "Wei",
    lastName: "Chen",
    country: "Singapore",
    membership: "Non-Member",
    servicesCompleted: 2,
    pastService: {
      title: "Singapore Airport Priority Pickup",
      details: "Arrival-day coordination and hotel transfer arrangement.",
      endedAt: "February 14, 2026, 15:20 (SGT)"
    },
    upcomingService: {
      title: "Bangkok Business Visit Assistance",
      details: "Single-day mobility support with concierge check-ins.",
      startsAt: "March 12, 2026, 09:15 (ICT)"
    },
    tips: [
      "Share flight updates with concierge at least 2 hours before landing.",
      "Keep one local payment method available for on-ground contingencies.",
      "Carry photocopies of key travel IDs in a separate bag."
    ]
  },
  "ms.khan@vvs.com": {
    email: "ms.khan@vvs.com",
    password: "KhanAccess2",
    secretPhrase: "Saffron",
    prefix: "Ms.",
    firstName: "Nadia",
    lastName: "Khan",
    country: "Pakistan",
    membership: "Non-Member",
    servicesCompleted: 0,
    pastService: {
      title: "No completed service yet",
      details: "Account is prepared for first-time booking.",
      endedAt: "N/A"
    },
    upcomingService: {
      title: "No upcoming service yet",
      details: "Submit a contact request to start your first concierge plan.",
      startsAt: "N/A"
    },
    tips: [
      "Provide complete pickup and destination details in the first request.",
      "Select preferred contact channel for faster response handling.",
      "Book high-priority requests early to secure optimal timings."
    ]
  },
  "aleks.totev@vvs.com": {
    email: "aleks.totev@vvs.com",
    password: "OwnerAlek26",
    altPasswords: ["OwnerAlek$26"],
    secretPhrase: "BalkanCrest",
    prefix: "Mr.",
    firstName: "Aleks",
    lastName: "Totev",
    country: "Bulgaria",
    membership: "Owner",
    roleTitle: "CEO & Founder",
    servicesCompleted: 5874,
    pastService: {
      title: "Executive Oversight",
      details: "Portfolio-level operational supervision.",
      endedAt: "N/A"
    },
    upcomingService: {
      title: "Owner Command Agenda",
      details: "Strategic management and network expansion directives.",
      startsAt: "Ongoing"
    },
    ownerMetrics: {
      servicesCompleted24h: 124,
      topPerformance: [
        "Benedict Hale - 23 completions | 98.9% satisfaction | Avg dispatch 4m 12s",
        "Camille Laurent - 21 completions | 98.4% satisfaction | Avg dispatch 4m 31s",
        "Nikolai Orlov - 19 completions | 97.8% satisfaction | Avg dispatch 5m 03s",
        "Sofia Mendes - 18 completions | 97.6% satisfaction | Avg dispatch 5m 20s",
        "Hana Sato - 17 completions | 97.2% satisfaction | Avg dispatch 5m 44s"
      ],
      topSelected: [
        "Benedict Hale - selected 34 times | 11 Red-tier requests",
        "Selena Ward - selected 30 times | 9 Red-tier requests",
        "Marco Vitale - selected 27 times | 8 Red-tier requests",
        "Camille Laurent - selected 25 times | 7 Red-tier requests",
        "Lina Rossi - selected 22 times | 6 Red-tier requests"
      ],
      clientReviews24h: "184 reviews | 169 positive, 11 neutral, 4 escalated follow-ups",
      revenueBrut24h: "$612,940 (billing before costs, all active corridors)",
      revenueNet24h: "$462,380 (post-cost margin locked at 75.4%)",
      expenses24h: "$104,770 (aviation 39%, security 28%, hospitality 19%, operations 14%)",
      moneyToBeEarned: "$298,450 (confirmed receivables in next 72h)",
      moneyToBePaid: "$118,630 (partner settlements + payroll allocations in next 72h)",
      conciergeOvertimeHours24h: "221.5 hours (32 concierges; avg 6h 55m overtime per concierge)",
      goalOfDay: "Maintain under-5-minute dispatch for all Priority/Red operations and close all escalations same-day.",
      satisfactionRate: "97.3% average client satisfaction"
    },
    tips: [
      "Monitor Red-tier service density every two hours for dispatch balancing.",
      "Push cross-team handoff checks before high-volume airport windows.",
      "Maintain 15% surge-ready concierge reserve for critical routing."
    ]
  },
  "mikhail.kovalev@vvs.com": {
    email: "mikhail.kovalev@vvs.com",
    password: "OwnerMik26",
    altPasswords: ["OwnerMik#26"],
    secretPhrase: "NorthernVector",
    prefix: "Mr.",
    firstName: "Mikhail",
    lastName: "Kovalev",
    country: "Russian Federation",
    membership: "Owner",
    roleTitle: "COO & Co-Founder",
    servicesCompleted: 5638,
    pastService: {
      title: "Operations Directorate Review",
      details: "Global operational throughput and security readiness review.",
      endedAt: "N/A"
    },
    upcomingService: {
      title: "COO Daily Control Board",
      details: "Resource planning, partner alignment, and deployment decisions.",
      startsAt: "Ongoing"
    },
    ownerMetrics: {
      servicesCompleted24h: 117,
      topPerformance: [
        "Nikolai Orlov - 22 completions | 98.1% satisfaction | Avg dispatch 4m 28s",
        "Hana Sato - 20 completions | 97.9% satisfaction | Avg dispatch 4m 51s",
        "Camille Laurent - 19 completions | 97.4% satisfaction | Avg dispatch 5m 05s",
        "Benedict Hale - 18 completions | 97.2% satisfaction | Avg dispatch 5m 18s",
        "Victor Ward - 17 completions | 96.8% satisfaction | Avg dispatch 5m 42s"
      ],
      topSelected: [
        "Nikolai Orlov - selected 31 times | 10 security-intensive requests",
        "Benedict Hale - selected 29 times | 9 cross-border requests",
        "Sofia Mendes - selected 26 times | 8 hospitality-intensive requests",
        "Selena Ward - selected 24 times | 7 same-day critical requests",
        "Omar Vian - selected 21 times | 6 VIP escort requests"
      ],
      clientReviews24h: "163 reviews | 147 positive, 12 neutral, 4 escalated follow-ups",
      revenueBrut24h: "$579,310 (billing before costs, global operations)",
      revenueNet24h: "$431,690 (post-cost margin locked at 74.5%)",
      expenses24h: "$98,420 (aviation 36%, security 31%, hospitality 18%, operations 15%)",
      moneyToBeEarned: "$276,980 (confirmed receivables in next 72h)",
      moneyToBePaid: "$109,240 (partner settlements + payroll allocations in next 72h)",
      conciergeOvertimeHours24h: "208.0 hours (30 concierges; avg 6h 56m overtime per concierge)",
      goalOfDay: "Keep same-day execution success above 98% and clear all operational debt before 22:00 local.",
      satisfactionRate: "96.7% average client satisfaction"
    },
    tips: [
      "Prioritize timezone-staggered staffing to reduce handoff latency.",
      "Track airport security queue trends for transfer rerouting readiness.",
      "Escalate partner-side risks into dispatch within five minutes."
    ]
  },
  "ceo@vvs.com": {
    email: "ceo@vvs.com",
    password: "Alek2026",
    secretPhrase: "BalkanCrest",
    prefix: "Mr.",
    firstName: "Aleks",
    lastName: "Totev",
    country: "Bulgaria",
    membership: "Owner",
    roleTitle: "CEO & Founder",
    servicesCompleted: 5874,
    pastService: { title: "Executive Oversight", details: "Portfolio-level operational supervision.", endedAt: "N/A" },
    upcomingService: { title: "Owner Command Agenda", details: "Strategic management and network expansion directives.", startsAt: "Ongoing" },
    ownerMetrics: {
      servicesCompleted24h: 94,
      topPerformance: [
        "Benedict Hale - 17 successful completions",
        "Camille Laurent - 15 successful completions",
        "Nikolai Orlov - 14 successful completions",
        "Sofia Mendes - 13 successful completions",
        "Hana Sato - 12 successful completions"
      ],
      topSelected: [
        "Benedict Hale - selected 28 times",
        "Selena Ward - selected 24 times",
        "Marco Vitale - selected 22 times",
        "Camille Laurent - selected 21 times",
        "Lina Rossi - selected 19 times"
      ],
      clientReviews24h: "132 new reviews received",
      revenueBrut24h: "$482,400",
      revenueNet24h: "$361,960",
      expenses24h: "$89,740",
      moneyToBeEarned: "$214,300",
      moneyToBePaid: "$71,520",
      conciergeOvertimeHours24h: "167.5 hours",
      goalOfDay: "Complete zero-delay execution for all Priority and Red-tier requests.",
      satisfactionRate: "96.4%"
    }
  },
  "coo@vvs.com": {
    email: "coo@vvs.com",
    password: "Mik2026",
    secretPhrase: "NorthernVector",
    prefix: "Mr.",
    firstName: "Mikhail",
    lastName: "Kovalev",
    country: "Russian Federation",
    membership: "Owner",
    roleTitle: "COO & Co-Founder",
    servicesCompleted: 5638,
    pastService: { title: "Operations Directorate Review", details: "Global operational throughput and security readiness review.", endedAt: "N/A" },
    upcomingService: { title: "COO Daily Control Board", details: "Resource planning, partner alignment, and deployment decisions.", startsAt: "Ongoing" },
    ownerMetrics: {
      servicesCompleted24h: 88,
      topPerformance: [
        "Nikolai Orlov - 16 successful completions",
        "Hana Sato - 14 successful completions",
        "Camille Laurent - 13 successful completions",
        "Benedict Hale - 13 successful completions",
        "Victor Ward - 12 successful completions"
      ],
      topSelected: [
        "Nikolai Orlov - selected 25 times",
        "Benedict Hale - selected 23 times",
        "Sofia Mendes - selected 21 times",
        "Selena Ward - selected 20 times",
        "Omar Vian - selected 18 times"
      ],
      clientReviews24h: "119 new reviews received",
      revenueBrut24h: "$451,870",
      revenueNet24h: "$338,902",
      expenses24h: "$84,610",
      moneyToBeEarned: "$198,750",
      moneyToBePaid: "$64,430",
      conciergeOvertimeHours24h: "154.0 hours",
      goalOfDay: "Keep global same-day execution success above 98%.",
      satisfactionRate: "95.8%"
    }
  },
  "aleks.sunrise@vvs.com": {
    email: "aleks.sunrise@vvs.com",
    password: "SunriseAlek26",
    secretPhrase: "BalkanCrest",
    prefix: "Mr.",
    firstName: "Aleks",
    lastName: "Totev",
    country: "Bulgaria",
    membership: "Owner",
    roleTitle: "CEO & Founder",
    servicesCompleted: 5874,
    pastService: { title: "Executive Oversight", details: "Portfolio-level operational supervision.", endedAt: "N/A" },
    upcomingService: { title: "Owner Command Agenda", details: "Strategic management and network expansion directives.", startsAt: "Ongoing" },
    ownerMetrics: {
      servicesCompleted24h: 124,
      topPerformance: ["Benedict Hale - 23 completions", "Camille Laurent - 21 completions", "Nikolai Orlov - 19 completions", "Sofia Mendes - 18 completions", "Hana Sato - 17 completions"],
      topSelected: ["Benedict Hale - selected 34 times", "Selena Ward - selected 30 times", "Marco Vitale - selected 27 times", "Camille Laurent - selected 25 times", "Lina Rossi - selected 22 times"],
      clientReviews24h: "184 reviews | 169 positive, 11 neutral, 4 escalated follow-ups",
      revenueBrut24h: "$612,940",
      revenueNet24h: "$462,380",
      expenses24h: "$104,770",
      moneyToBeEarned: "$298,450",
      moneyToBePaid: "$118,630",
      conciergeOvertimeHours24h: "221.5 hours",
      goalOfDay: "Maintain under-5-minute dispatch for all Priority/Red operations.",
      satisfactionRate: "97.3%"
    }
  },
  "mikhail.sunrise@vvs.com": {
    email: "mikhail.sunrise@vvs.com",
    password: "SunriseMik26",
    secretPhrase: "NorthernVector",
    prefix: "Mr.",
    firstName: "Mikhail",
    lastName: "Kovalev",
    country: "Russian Federation",
    membership: "Owner",
    roleTitle: "COO & Co-Founder",
    servicesCompleted: 5638,
    pastService: { title: "Operations Directorate Review", details: "Global operational throughput and security readiness review.", endedAt: "N/A" },
    upcomingService: { title: "COO Daily Control Board", details: "Resource planning, partner alignment, and deployment decisions.", startsAt: "Ongoing" },
    ownerMetrics: {
      servicesCompleted24h: 117,
      topPerformance: ["Nikolai Orlov - 22 completions", "Hana Sato - 20 completions", "Camille Laurent - 19 completions", "Benedict Hale - 18 completions", "Victor Ward - 17 completions"],
      topSelected: ["Nikolai Orlov - selected 31 times", "Benedict Hale - selected 29 times", "Sofia Mendes - selected 26 times", "Selena Ward - selected 24 times", "Omar Vian - selected 21 times"],
      clientReviews24h: "163 reviews | 147 positive, 12 neutral, 4 escalated follow-ups",
      revenueBrut24h: "$579,310",
      revenueNet24h: "$431,690",
      expenses24h: "$98,420",
      moneyToBeEarned: "$276,980",
      moneyToBePaid: "$109,240",
      conciergeOvertimeHours24h: "208.0 hours",
      goalOfDay: "Keep same-day execution success above 98% and clear operational debt.",
      satisfactionRate: "96.7%"
    }
  }
};

const countryDialCodes = {
  "united arab emirates": "+971",
  "uae": "+971",
  "italy": "+39",
  "russia": "+7",
  "russian federation": "+7",
  "ukraine": "+380",
  "india": "+91",
  "singapore": "+65",
  "pakistan": "+92",
  "united kingdom": "+44",
  "bulgaria": "+359",
  "spain": "+34",
  "japan": "+81",
  "qatar": "+974",
  "brazil": "+55",
  "usa": "+1",
  "united states": "+1",
  "portugal": "+351",
  "france": "+33"
};

const countryDialCodesByIso = {
  AD: "+376",
  AE: "+971",
  AF: "+93",
  AG: "+1",
  AI: "+1",
  AL: "+355",
  AM: "+374",
  AO: "+244",
  AR: "+54",
  AS: "+1",
  AT: "+43",
  AU: "+61",
  AW: "+297",
  AX: "+358",
  AZ: "+994",
  BA: "+387",
  BB: "+1",
  BD: "+880",
  BE: "+32",
  BF: "+226",
  BG: "+359",
  BH: "+973",
  BI: "+257",
  BJ: "+229",
  BL: "+590",
  BM: "+1",
  BN: "+673",
  BO: "+591",
  BQ: "+599",
  BR: "+55",
  BS: "+1",
  BT: "+975",
  BV: "+47",
  BW: "+267",
  BY: "+375",
  BZ: "+501",
  CA: "+1",
  CC: "+61",
  CD: "+243",
  CF: "+236",
  CG: "+242",
  CH: "+41",
  CI: "+225",
  CK: "+682",
  CL: "+56",
  CM: "+237",
  CN: "+86",
  CO: "+57",
  CR: "+506",
  CU: "+53",
  CV: "+238",
  CW: "+599",
  CX: "+61",
  CY: "+357",
  CZ: "+420",
  DE: "+49",
  DJ: "+253",
  DK: "+45",
  DM: "+1",
  DO: "+1",
  DZ: "+213",
  EC: "+593",
  EE: "+372",
  EG: "+20",
  EH: "+212",
  ER: "+291",
  ES: "+34",
  ET: "+251",
  FI: "+358",
  FJ: "+679",
  FK: "+500",
  FM: "+691",
  FO: "+298",
  FR: "+33",
  GA: "+241",
  GB: "+44",
  GD: "+1",
  GE: "+995",
  GF: "+594",
  GG: "+44",
  GH: "+233",
  GI: "+350",
  GL: "+299",
  GM: "+220",
  GN: "+224",
  GP: "+590",
  GQ: "+240",
  GR: "+30",
  GS: "+500",
  GT: "+502",
  GU: "+1",
  GW: "+245",
  GY: "+592",
  HK: "+852",
  HN: "+504",
  HR: "+385",
  HT: "+509",
  HU: "+36",
  ID: "+62",
  IE: "+353",
  IL: "+972",
  IM: "+44",
  IN: "+91",
  IO: "+246",
  IQ: "+964",
  IR: "+98",
  IS: "+354",
  IT: "+39",
  JE: "+44",
  JM: "+1",
  JO: "+962",
  JP: "+81",
  KE: "+254",
  KG: "+996",
  KH: "+855",
  KI: "+686",
  KM: "+269",
  KN: "+1",
  KP: "+850",
  KR: "+82",
  KW: "+965",
  KY: "+1",
  KZ: "+7",
  LA: "+856",
  LB: "+961",
  LC: "+1",
  LI: "+423",
  LK: "+94",
  LR: "+231",
  LS: "+266",
  LT: "+370",
  LU: "+352",
  LV: "+371",
  LY: "+218",
  MA: "+212",
  MC: "+377",
  MD: "+373",
  ME: "+382",
  MF: "+590",
  MG: "+261",
  MH: "+692",
  MK: "+389",
  ML: "+223",
  MM: "+95",
  MN: "+976",
  MO: "+853",
  MP: "+1",
  MQ: "+596",
  MR: "+222",
  MS: "+1",
  MT: "+356",
  MU: "+230",
  MV: "+960",
  MW: "+265",
  MX: "+52",
  MY: "+60",
  MZ: "+258",
  NA: "+264",
  NC: "+687",
  NE: "+227",
  NF: "+672",
  NG: "+234",
  NI: "+505",
  NL: "+31",
  NO: "+47",
  NP: "+977",
  NR: "+674",
  NU: "+683",
  NZ: "+64",
  OM: "+968",
  PA: "+507",
  PE: "+51",
  PF: "+689",
  PG: "+675",
  PH: "+63",
  PK: "+92",
  PL: "+48",
  PM: "+508",
  PN: "+64",
  PR: "+1",
  PS: "+970",
  PT: "+351",
  PW: "+680",
  PY: "+595",
  QA: "+974",
  RE: "+262",
  RO: "+40",
  RS: "+381",
  RU: "+7",
  RW: "+250",
  SA: "+966",
  SB: "+677",
  SC: "+248",
  SD: "+249",
  SE: "+46",
  SG: "+65",
  SH: "+290",
  SI: "+386",
  SJ: "+477",
  SK: "+421",
  SL: "+232",
  SM: "+378",
  SN: "+221",
  SO: "+252",
  SR: "+597",
  SS: "+211",
  ST: "+239",
  SV: "+503",
  SX: "+1",
  SY: "+963",
  SZ: "+268",
  TC: "+1",
  TD: "+235",
  TF: "+262",
  TG: "+228",
  TH: "+66",
  TJ: "+992",
  TK: "+690",
  TL: "+670",
  TM: "+993",
  TN: "+216",
  TO: "+676",
  TR: "+90",
  TT: "+1",
  TV: "+688",
  TW: "+886",
  TZ: "+255",
  UA: "+380",
  UG: "+256",
  UM: "+268",
  US: "+1",
  UY: "+598",
  UZ: "+998",
  VA: "+390",
  VC: "+1",
  VE: "+58",
  VG: "+1",
  VI: "+1",
  VN: "+84",
  VU: "+678",
  WF: "+681",
  WS: "+685",
  XK: "+383",
  YE: "+967",
  YT: "+262",
  ZA: "+27",
  ZM: "+260",
  ZW: "+263",
};
const countryNamesByIso = {
  AD: "Andorra",
  AE: "United Arab Emirates",
  AF: "Afghanistan",
  AG: "Antigua and Barbuda",
  AI: "Anguilla",
  AL: "Albania",
  AM: "Armenia",
  AO: "Angola",
  AQ: "Antarctica",
  AR: "Argentina",
  AS: "American Samoa",
  AT: "Austria",
  AU: "Australia",
  AW: "Aruba",
  AX: "Åland Islands",
  AZ: "Azerbaijan",
  BA: "Bosnia and Herzegovina",
  BB: "Barbados",
  BD: "Bangladesh",
  BE: "Belgium",
  BF: "Burkina Faso",
  BG: "Bulgaria",
  BH: "Bahrain",
  BI: "Burundi",
  BJ: "Benin",
  BL: "Saint Barthélemy",
  BM: "Bermuda",
  BN: "Brunei",
  BO: "Bolivia",
  BQ: "Caribbean Netherlands",
  BR: "Brazil",
  BS: "Bahamas",
  BT: "Bhutan",
  BV: "Bouvet Island",
  BW: "Botswana",
  BY: "Belarus",
  BZ: "Belize",
  CA: "Canada",
  CC: "Cocos (Keeling) Islands",
  CD: "DR Congo",
  CF: "Central African Republic",
  CG: "Republic of the Congo",
  CH: "Switzerland",
  CI: "Ivory Coast",
  CK: "Cook Islands",
  CL: "Chile",
  CM: "Cameroon",
  CN: "China",
  CO: "Colombia",
  CR: "Costa Rica",
  CU: "Cuba",
  CV: "Cape Verde",
  CW: "Curaçao",
  CX: "Christmas Island",
  CY: "Cyprus",
  CZ: "Czechia",
  DE: "Germany",
  DJ: "Djibouti",
  DK: "Denmark",
  DM: "Dominica",
  DO: "Dominican Republic",
  DZ: "Algeria",
  EC: "Ecuador",
  EE: "Estonia",
  EG: "Egypt",
  EH: "Western Sahara",
  ER: "Eritrea",
  ES: "Spain",
  ET: "Ethiopia",
  FI: "Finland",
  FJ: "Fiji",
  FK: "Falkland Islands",
  FM: "Micronesia",
  FO: "Faroe Islands",
  FR: "France",
  GA: "Gabon",
  GB: "United Kingdom",
  GD: "Grenada",
  GE: "Georgia",
  GF: "French Guiana",
  GG: "Guernsey",
  GH: "Ghana",
  GI: "Gibraltar",
  GL: "Greenland",
  GM: "Gambia",
  GN: "Guinea",
  GP: "Guadeloupe",
  GQ: "Equatorial Guinea",
  GR: "Greece",
  GS: "South Georgia",
  GT: "Guatemala",
  GU: "Guam",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HK: "Hong Kong",
  HM: "Heard Island and McDonald Islands",
  HN: "Honduras",
  HR: "Croatia",
  HT: "Haiti",
  HU: "Hungary",
  ID: "Indonesia",
  IE: "Ireland",
  IL: "Israel",
  IM: "Isle of Man",
  IN: "India",
  IO: "British Indian Ocean Territory",
  IQ: "Iraq",
  IR: "Iran",
  IS: "Iceland",
  IT: "Italy",
  JE: "Jersey",
  JM: "Jamaica",
  JO: "Jordan",
  JP: "Japan",
  KE: "Kenya",
  KG: "Kyrgyzstan",
  KH: "Cambodia",
  KI: "Kiribati",
  KM: "Comoros",
  KN: "Saint Kitts and Nevis",
  KP: "North Korea",
  KR: "South Korea",
  KW: "Kuwait",
  KY: "Cayman Islands",
  KZ: "Kazakhstan",
  LA: "Laos",
  LB: "Lebanon",
  LC: "Saint Lucia",
  LI: "Liechtenstein",
  LK: "Sri Lanka",
  LR: "Liberia",
  LS: "Lesotho",
  LT: "Lithuania",
  LU: "Luxembourg",
  LV: "Latvia",
  LY: "Libya",
  MA: "Morocco",
  MC: "Monaco",
  MD: "Moldova",
  ME: "Montenegro",
  MF: "Saint Martin",
  MG: "Madagascar",
  MH: "Marshall Islands",
  MK: "North Macedonia",
  ML: "Mali",
  MM: "Myanmar",
  MN: "Mongolia",
  MO: "Macau",
  MP: "Northern Mariana Islands",
  MQ: "Martinique",
  MR: "Mauritania",
  MS: "Montserrat",
  MT: "Malta",
  MU: "Mauritius",
  MV: "Maldives",
  MW: "Malawi",
  MX: "Mexico",
  MY: "Malaysia",
  MZ: "Mozambique",
  NA: "Namibia",
  NC: "New Caledonia",
  NE: "Niger",
  NF: "Norfolk Island",
  NG: "Nigeria",
  NI: "Nicaragua",
  NL: "Netherlands",
  NO: "Norway",
  NP: "Nepal",
  NR: "Nauru",
  NU: "Niue",
  NZ: "New Zealand",
  OM: "Oman",
  PA: "Panama",
  PE: "Peru",
  PF: "French Polynesia",
  PG: "Papua New Guinea",
  PH: "Philippines",
  PK: "Pakistan",
  PL: "Poland",
  PM: "Saint Pierre and Miquelon",
  PN: "Pitcairn Islands",
  PR: "Puerto Rico",
  PS: "Palestine",
  PT: "Portugal",
  PW: "Palau",
  PY: "Paraguay",
  QA: "Qatar",
  RE: "Réunion",
  RO: "Romania",
  RS: "Serbia",
  RU: "Russia",
  RW: "Rwanda",
  SA: "Saudi Arabia",
  SB: "Solomon Islands",
  SC: "Seychelles",
  SD: "Sudan",
  SE: "Sweden",
  SG: "Singapore",
  SH: "Saint Helena, Ascension and Tristan da Cunha",
  SI: "Slovenia",
  SJ: "Svalbard and Jan Mayen",
  SK: "Slovakia",
  SL: "Sierra Leone",
  SM: "San Marino",
  SN: "Senegal",
  SO: "Somalia",
  SR: "Suriname",
  SS: "South Sudan",
  ST: "São Tomé and Príncipe",
  SV: "El Salvador",
  SX: "Sint Maarten",
  SY: "Syria",
  SZ: "Eswatini",
  TC: "Turks and Caicos Islands",
  TD: "Chad",
  TF: "French Southern and Antarctic Lands",
  TG: "Togo",
  TH: "Thailand",
  TJ: "Tajikistan",
  TK: "Tokelau",
  TL: "Timor-Leste",
  TM: "Turkmenistan",
  TN: "Tunisia",
  TO: "Tonga",
  TR: "Turkey",
  TT: "Trinidad and Tobago",
  TV: "Tuvalu",
  TW: "Taiwan",
  TZ: "Tanzania",
  UA: "Ukraine",
  UG: "Uganda",
  UM: "United States Minor Outlying Islands",
  US: "United States",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VA: "Vatican City",
  VC: "Saint Vincent and the Grenadines",
  VE: "Venezuela",
  VG: "British Virgin Islands",
  VI: "United States Virgin Islands",
  VN: "Vietnam",
  VU: "Vanuatu",
  WF: "Wallis and Futuna",
  WS: "Samoa",
  XK: "Kosovo",
  YE: "Yemen",
  YT: "Mayotte",
  ZA: "South Africa",
  ZM: "Zambia",
  ZW: "Zimbabwe",
};

const countryLanguageByIso = {
  AD: "ca",
  AE: "ar",
  AF: "fa",
  AG: "en",
  AI: "en",
  AL: "sq",
  AM: "hy",
  AO: "pt",
  AR: "es",
  AS: "en",
  AT: "de",
  AU: "en",
  AW: "nl",
  AX: "sv",
  AZ: "az",
  BA: "bs",
  BB: "en",
  BD: "bn",
  BE: "nl",
  BF: "fr",
  BG: "bg",
  BH: "ar",
  BI: "fr",
  BJ: "fr",
  BL: "fr",
  BM: "en",
  BN: "ms",
  BO: "es",
  BQ: "nl",
  BR: "pt",
  BS: "en",
  BT: "dz",
  BV: "no",
  BW: "en",
  BY: "be",
  BZ: "en",
  CA: "en",
  CC: "en",
  CD: "fr",
  CF: "fr",
  CG: "fr",
  CH: "fr",
  CI: "fr",
  CK: "en",
  CL: "es",
  CM: "fr",
  CN: "zh",
  CO: "es",
  CR: "es",
  CU: "es",
  CV: "pt",
  CW: "en",
  CX: "en",
  CY: "el",
  CZ: "cs",
  DE: "de",
  DJ: "ar",
  DK: "da",
  DM: "en",
  DO: "es",
  DZ: "ar",
  EC: "es",
  EE: "et",
  EG: "ar",
  EH: "en",
  ER: "ar",
  ES: "es",
  ET: "am",
  FI: "fi",
  FJ: "en",
  FK: "en",
  FM: "en",
  FO: "da",
  FR: "fr",
  GA: "fr",
  GB: "en",
  GD: "en",
  GE: "ka",
  GF: "fr",
  GG: "en",
  GH: "en",
  GI: "en",
  GL: "kl",
  GM: "en",
  GN: "fr",
  GP: "fr",
  GQ: "fr",
  GR: "el",
  GS: "en",
  GT: "es",
  GU: "ch",
  GW: "pt",
  GY: "en",
  HK: "zh",
  HM: "en",
  HN: "es",
  HR: "hr",
  HT: "ht",
  HU: "hu",
  ID: "id",
  IE: "en",
  IL: "he",
  IM: "en",
  IN: "hi",
  IO: "en",
  IQ: "ar",
  IR: "fa",
  IS: "is",
  IT: "it",
  JE: "en",
  JM: "en",
  JO: "ar",
  JP: "ja",
  KE: "en",
  KG: "ky",
  KH: "km",
  KI: "en",
  KM: "ar",
  KN: "en",
  KP: "ko",
  KR: "ko",
  KW: "ar",
  KY: "en",
  KZ: "kk",
  LA: "lo",
  LB: "ar",
  LC: "en",
  LI: "de",
  LK: "si",
  LR: "en",
  LS: "en",
  LT: "lt",
  LU: "de",
  LV: "lv",
  LY: "ar",
  MA: "ar",
  MC: "fr",
  MD: "ro",
  ME: "sr",
  MF: "fr",
  MG: "mg",
  MH: "en",
  MK: "mk",
  ML: "fr",
  MM: "my",
  MN: "mn",
  MO: "pt",
  MP: "en",
  MQ: "fr",
  MR: "ar",
  MS: "en",
  MT: "mt",
  MU: "en",
  MV: "dv",
  MW: "en",
  MX: "es",
  MY: "ms",
  MZ: "pt",
  NA: "af",
  NC: "fr",
  NE: "fr",
  NF: "en",
  NG: "en",
  NI: "es",
  NL: "nl",
  NO: "nn",
  NP: "ne",
  NR: "en",
  NU: "en",
  NZ: "en",
  OM: "ar",
  PA: "es",
  PE: "es",
  PF: "fr",
  PG: "en",
  PH: "fil",
  PK: "ur",
  PL: "pl",
  PM: "fr",
  PN: "en",
  PR: "es",
  PS: "ar",
  PT: "pt",
  PW: "en",
  PY: "gn",
  QA: "ar",
  RE: "fr",
  RO: "ro",
  RS: "sr",
  RU: "ru",
  RW: "rw",
  SA: "ar",
  SB: "en",
  SC: "en",
  SD: "ar",
  SE: "sv",
  SG: "en",
  SH: "en",
  SI: "sl",
  SJ: "no",
  SK: "sk",
  SL: "en",
  SM: "it",
  SN: "fr",
  SO: "so",
  SR: "nl",
  SS: "en",
  ST: "pt",
  SV: "es",
  SX: "en",
  SY: "ar",
  SZ: "en",
  TC: "en",
  TD: "ar",
  TF: "fr",
  TG: "fr",
  TH: "th",
  TJ: "tg",
  TK: "en",
  TL: "pt",
  TM: "tk",
  TN: "ar",
  TO: "en",
  TR: "tr",
  TT: "en",
  TV: "en",
  TW: "zh",
  TZ: "sw",
  UA: "uk",
  UG: "en",
  UM: "en",
  US: "en",
  UY: "es",
  UZ: "uz",
  VA: "it",
  VC: "en",
  VE: "es",
  VG: "en",
  VI: "en",
  VN: "vi",
  VU: "bi",
  WF: "fr",
  WS: "en",
  XK: "sq",
  YE: "ar",
  YT: "fr",
  ZA: "af",
  ZM: "en",
  ZW: "en",
};
const remoteCountryDialCodesByIso = {};
const remoteCountryTimeZonesByIso = {};
const signupCountriesByIso = {};
const navLanguageCountriesByIso = {};

const countryCodeAliases = {
  uk: "GB",
  uae: "AE",
  usa: "US",
  rf: "RU"
};

const countryPrimaryTimeZoneByIso = {
  AE: "Asia/Dubai",
  RU: "Europe/Moscow",
  BG: "Europe/Sofia",
  IT: "Europe/Rome",
  GB: "Europe/London",
  US: "America/New_York",
  IN: "Asia/Kolkata",
  SG: "Asia/Singapore",
  PK: "Asia/Karachi",
  FR: "Europe/Paris",
  ES: "Europe/Madrid",
  PT: "Europe/Lisbon",
  QA: "Asia/Qatar",
  JP: "Asia/Tokyo",
  BR: "America/Sao_Paulo",
  UA: "Europe/Kyiv"
};

const countryAlpha3Aliases = {
  ukr: "UA",
  gbr: "GB",
  usa: "US",
  are: "AE",
  rus: "RU",
  ind: "IN",
  ita: "IT",
  esp: "ES",
  prt: "PT",
  qat: "QA",
  jpn: "JP",
  pak: "PK",
  sgp: "SG",
  bgr: "BG",
  bra: "BR",
  fra: "FR"
};

const regionDisplayNames = (typeof Intl !== "undefined" && Intl.DisplayNames)
  ? new Intl.DisplayNames(["en"], { type: "region" })
  : null;

const supportedRegionCodeSet = new Set();
const regionNameToCode = new Map();

if (regionDisplayNames) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < letters.length; i += 1) {
    for (let j = 0; j < letters.length; j += 1) {
      const code = `${letters[i]}${letters[j]}`;
      try {
        const label = regionDisplayNames.of(code);
        // Keep only valid countries/regions where DisplayNames resolves to a real name.
        if (label && label !== code) {
          supportedRegionCodeSet.add(code);
          regionNameToCode.set(label.toLowerCase(), code);
        }
      } catch (_err) {
        // Ignore invalid entries for this runtime.
      }
    }
  }
}

function resolveCountryCode(country) {
  const raw = (country || "").trim();
  if (!raw) return "";
  const cleaned = raw.toLowerCase().replace(/\./g, "").replace(/\s+/g, " ").trim();
  const aliasCode = countryCodeAliases[cleaned];
  if (aliasCode) return aliasCode;

  if (/^[a-z]{3}$/i.test(cleaned)) {
    const fromAlpha3 = countryAlpha3Aliases[cleaned];
    if (fromAlpha3) return fromAlpha3;
  }

  if (/^[a-z]{2}$/i.test(cleaned)) {
    const code2 = cleaned.toUpperCase();
    // Accept direct ISO-2 codes from dropdown even if runtime region set is incomplete.
    if (supportedRegionCodeSet.size === 0 || supportedRegionCodeSet.has(code2) || /^[A-Z]{2}$/.test(code2)) {
      return code2;
    }
  }

  const fromName = regionNameToCode.get(cleaned);
  if (fromName) return fromName;
  return "";
}

function normalizeCountryKey(country) {
  const code = resolveCountryCode(country);
  if (code && regionDisplayNames) {
    const fullName = regionDisplayNames.of(code);
    if (fullName) return fullName.toLowerCase();
  }
  const raw = (country || "").trim().toLowerCase();
  return raw.replace(/\./g, "").replace(/\s+/g, " ").trim();
}

function countryDisplayName(country) {
  const code = resolveCountryCode(country);
  if (code && countryNamesByIso[code]) return countryNamesByIso[code];
  if (code && regionDisplayNames) {
    const fullName = regionDisplayNames.of(code);
    if (fullName) return fullName;
  }
  return (country || "Unknown");
}

function normalizeCountryLabelKey(label) {
  return String(label || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getCountryEntriesForSelectors() {
  const seenNames = new Set();
  return Object.keys(countryNamesByIso)
    .map((iso) => ({ iso, label: String(countryNamesByIso[iso] || "").trim() }))
    .filter((item) => item.iso && item.label)
    .filter((item) => {
      const key = normalizeCountryLabelKey(item.label);
      if (!key || seenNames.has(key)) return false;
      seenNames.add(key);
      return true;
    })
    .sort((a, b) => String(a.label).localeCompare(String(b.label)));
}

function renderSignupCountriesFromMap() {
  const select = document.getElementById("signup-country");
  if (!select) return;

  const current = select.value;
  const entries = Object.keys(signupCountriesByIso)
    .map((code) => ({ code, label: signupCountriesByIso[code] }))
    .filter((entry) => entry.code && entry.label)
    .sort((a, b) => String(a.label).localeCompare(String(b.label)));

  select.innerHTML = '<option value="">Select country</option>';
  entries.forEach((entry) => {
    const option = document.createElement("option");
    option.value = entry.code;
    option.textContent = entry.label;
    select.appendChild(option);
  });

  if (current && signupCountriesByIso[current]) {
    select.value = current;
  }
}

function populateSignupCountries() {
  const select = document.getElementById("signup-country");
  if (!select) return;

  if (select.options.length > 1) return;

  getCountryEntriesForSelectors().forEach((entry) => {
    const iso = entry.iso;
    const label = entry.label;
    signupCountriesByIso[iso] = label;
  });
  renderSignupCountriesFromMap();
}

function populateIssuedServiceCountries() {
  const select = document.getElementById("country-issued");
  if (!select) return;
  if (select.options.length > 1) return;

  getCountryEntriesForSelectors().forEach((entry) => {
    const option = document.createElement("option");
    option.value = entry.iso;
    option.textContent = entry.label;
    select.appendChild(option);
  });
}

function populateNavLanguageCountries() {
  const select = document.getElementById("site-language-country");
  if (!select) return;
  if (select.options.length > 1) return;

  getCountryEntriesForSelectors().forEach((entry) => {
    navLanguageCountriesByIso[entry.iso] = entry.label;
    const option = document.createElement("option");
    option.value = entry.iso;
    option.textContent = entry.label;
    select.appendChild(option);
  });
}

async function loadGlobalDialCodes() {
  try {
    const countriesResponse = await fetch("https://restcountries.com/v3.1/all?fields=cca2,name,idd,unMember,timezones");
    if (!countriesResponse.ok) return;

    const countries = await countriesResponse.json();
    if (!Array.isArray(countries)) return;

    const seenNames = new Set();
    countries.forEach((entry) => {
      const code = String(entry && entry.cca2 ? entry.cca2 : "").toUpperCase();
      const label = String(entry && entry.name && entry.name.common ? entry.name.common : "");
      const root = String(entry && entry.idd && entry.idd.root ? entry.idd.root : "");
      const suffixes = Array.isArray(entry && entry.idd ? entry.idd.suffixes : null) ? entry.idd.suffixes : [];
      const timezones = Array.isArray(entry && entry.timezones ? entry.timezones : null) ? entry.timezones : [];
      const unMember = !!(entry && entry.unMember);
      if (!code || !label || !unMember) return;

      const labelKey = normalizeCountryLabelKey(label);
      if (!labelKey || seenNames.has(labelKey)) return;
      seenNames.add(labelKey);
      signupCountriesByIso[code] = label;

      // For NANP (+1) and +7 regions use root only to avoid wrong +1x / +7x variants.
      if (root === "+1" || root === "+7") {
        remoteCountryDialCodesByIso[code] = root;
      } else if (root && suffixes.length > 0) {
        const suffix = String(suffixes[0] || "");
        remoteCountryDialCodesByIso[code] = suffix ? `${root}${suffix}` : root;
      }

      if (timezones.length > 0) {
        remoteCountryTimeZonesByIso[code] = String(timezones[0]);
      }
    });

    renderSignupCountriesFromMap();

    const countrySelect = document.getElementById("signup-country");
    if (countrySelect && countrySelect.value) {
      countrySelect.dispatchEvent(new Event("change"));
    }
  } catch (_err) {
    // Keep static dial-code fallback when network is unavailable.
  }
}

function isValidSignupPassword(password) {
  const value = String(password || "");
  const uppercase = (value.match(/[A-Z]/g) || []).length;
  const numbers = (value.match(/[0-9]/g) || []).length;
  const special = (value.match(/[^A-Za-z0-9]/g) || []).length;
  return value.length >= 12 && uppercase >= 2 && numbers >= 2 && special >= 2;
}

let activeSiteLanguage = "en";
const translationCache = new Map();
const originalTextByNode = new WeakMap();
const originalPlaceholderByEl = new WeakMap();
const originalOptionTextByEl = new WeakMap();
const originalAttrByEl = new WeakMap();
let translationRunId = 0;
let isTranslating = false;
const supportedTranslationLangs = new Set();
let activeTranslationSwitchId = 0;
const TRANSLATION_SEPARATOR = "__VVS_9f6e4b_SEG__";
let activeTranslationAbortController = null;
const TRANSLATION_REQUEST_TIMEOUT_MS = 3000;
let activeRefreshTimer = null;
let pendingServiceRequestKey = "";
const sunriseModuleRoutes = [
  "sunrise-revenue",
  "sunrise-sales",
  "sunrise-marketing",
  "sunrise-locations",
  "sunrise-maintenance",
  "sunrise-employees",
  "sunrise-services",
  "sunrise-legality",
  "sunrise-expenses",
  "sunrise-income",
  "sunrise-surveys",
  "sunrise-events",
  "sunrise-performance",
  "sunrise-dts",
  "sunrise-eam",
  "sunrise-ifs",
  "sunrise-ecs",
  "sunrise-smca",
  "sunrise-rim",
  "sunrise-soc",
  "sunrise-soc-details",
  "sunrise-inbox",
  "sunrise-lcs"
];
const sunriseShortcutRouteMap = {
  rev1: "sunrise-revenue",
  sls1: "sunrise-sales",
  mkt1: "sunrise-marketing",
  loc1: "sunrise-locations",
  mnt1: "sunrise-maintenance",
  emp1: "sunrise-employees",
  srv1: "sunrise-services",
  lgl1: "sunrise-legality",
  exp1: "sunrise-expenses",
  inc1: "sunrise-income",
  csv1: "sunrise-surveys",
  inb1: "sunrise-inbox",
  evt1: "sunrise-events",
  ovr1: "sunrise-performance",
  dts: "sunrise-dts",
  eam: "sunrise-eam",
  ifs: "sunrise-ifs",
  ecs: "sunrise-ecs",
  smca: "sunrise-smca",
  rim: "sunrise-rim",
  soc: "sunrise-soc",
  lcs: "sunrise-lcs",
  notos: "sunrise-lcs"
};

const languageFallbackMap = {
  he: "iw",
  fil: "tl",
  nb: "no",
  nn: "no",
  cmn: "zh-CN",
  yue: "zh-TW"
};

function languageCodeForCountryIso(countryIso) {
  const code = String(countryIso || "").toUpperCase();
  if (!/^[A-Z]{2}$/.test(code)) return "en";

  const mapped = String(countryLanguageByIso[code] || "").toLowerCase();
  let cldrLang = "";
  try {
    const locale = new Intl.Locale(`und-${code}`).maximize();
    cldrLang = (locale && locale.language ? String(locale.language) : "").toLowerCase();
  } catch (_err) {
    cldrLang = "";
  }

  // Prefer explicit country map to avoid wrong locale inferences (e.g., KZ -> kk).
  if (mapped && mapped !== "en") return mapped;
  if (cldrLang && cldrLang !== "en") return cldrLang;
  if (mapped) return mapped;
  if (cldrLang) return cldrLang;
  return "en";
}

function normalizeTargetLanguage(lang) {
  const code = String(lang || "en").toLowerCase();
  if (code.startsWith("zh")) return "zh-CN";
  if (code === "he") return "iw";
  if (code === "fil") return "tl";
  if (code === "nb" || code === "nn") return "no";
  if (languageFallbackMap[code]) return languageFallbackMap[code];
  return code;
}

async function loadSupportedTranslationLanguages() {
  try {
    const response = await fetch("https://translate.googleapis.com/translate_a/l?client=gtx&hl=en");
    if (!response.ok) return;
    const data = await response.json();
    const sl = data && data.sl ? data.sl : {};
    Object.keys(sl).forEach((code) => {
      const normalized = normalizeTargetLanguage(code);
      supportedTranslationLangs.add(normalized.toLowerCase());
      supportedTranslationLangs.add(String(code).toLowerCase());
    });
  } catch (_err) {
    // Ignore network errors; we'll still attempt translation.
  }
}

function resolveSupportedTargetLanguage(lang) {
  const normalized = normalizeTargetLanguage(lang);
  // Always attempt the mapped national language directly.
  // Fallbacks are handled by normalizeTargetLanguage and provider response.
  return normalized;
}

function shouldTranslateText(text) {
  const t = String(text || "").trim();
  if (!t || t.length < 2) return false;
  // Must contain at least one Unicode letter (works for non-Latin scripts too).
  if (!/\p{L}/u.test(t)) return false;
  if (/^\+?\d[\d\s().-]*$/.test(t)) return false;
  if (/@/.test(t)) return false;
  return true;
}

function escapeRegex(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function collectActiveTranslationRoots() {
  const roots = [];
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  const activePage = document.querySelector('.routePage:not([hidden])');
  const contactOverlay = document.getElementById("contact-overlay");
  if (header) roots.push(header);
  if (activePage) roots.push(activePage);
  if (footer) roots.push(footer);
  if (contactOverlay && !contactOverlay.hasAttribute("hidden")) roots.push(contactOverlay);
  return roots.length ? roots : [document.body];
}

function collectTranslatableTextNodes(roots = collectActiveTranslationRoots()) {
  const nodes = [];
  roots.forEach((root) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        const tag = parent.tagName;
        if (["SCRIPT", "STYLE", "NOSCRIPT", "OPTION", "TEXTAREA"].includes(tag)) return NodeFilter.FILTER_REJECT;
        if (parent.closest("svg")) return NodeFilter.FILTER_REJECT;
        if (!shouldTranslateText(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!originalTextByNode.has(node)) originalTextByNode.set(node, node.nodeValue);
      nodes.push(node);
    }
  });
  return nodes;
}

function collectPlaceholderElements(roots = collectActiveTranslationRoots()) {
  const els = roots.flatMap((root) => Array.from(root.querySelectorAll("input[placeholder], textarea[placeholder]")));
  return els.filter((el) => shouldTranslateText(el.getAttribute("placeholder")));
}

function collectTranslatableOptions(roots = collectActiveTranslationRoots()) {
  const options = roots.flatMap((root) => Array.from(root.querySelectorAll("select option")));
  return options.filter((opt) => {
    const parent = opt.parentElement;
    if (!parent) return false;
    const parentId = parent.id || "";
    if (parentId === "signup-country" || parentId === "site-language-country") return false;
    return shouldTranslateText(opt.textContent);
  });
}

function collectTranslatableAttributeNodes(roots = collectActiveTranslationRoots()) {
  const attrNodes = [];
  const candidates = roots.flatMap((root) => Array.from(root.querySelectorAll("[aria-label], [title], input[type='submit'], input[type='button'], input[type='reset'], button[value]")));
  candidates.forEach((el) => {
    const snapshot = originalAttrByEl.get(el) || {};
    const nextSnapshot = { ...snapshot };
    ["aria-label", "title", "value"].forEach((attr) => {
      if (!el.hasAttribute(attr)) return;
      const value = el.getAttribute(attr) || "";
      if (!snapshot[attr]) nextSnapshot[attr] = value;
      const original = nextSnapshot[attr] || value;
      if (shouldTranslateText(original)) {
        attrNodes.push({ el, attr, original });
      }
    });
    originalAttrByEl.set(el, nextSnapshot);
  });
  return attrNodes;
}

function parseGoogleTranslatedText(payload) {
  if (!Array.isArray(payload) || !Array.isArray(payload[0])) return "";
  return payload[0]
    .map((part) => (Array.isArray(part) ? String(part[0] || "") : ""))
    .join("");
}

async function fetchGoogleTranslation(text, lang, signal) {
  const fallbackUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(lang)}&dt=t&q=${encodeURIComponent(text)}`;
  const timeoutController = new AbortController();
  const timeoutId = setTimeout(() => timeoutController.abort(), TRANSLATION_REQUEST_TIMEOUT_MS);
  const onAbortFromParent = () => timeoutController.abort();
  if (signal) signal.addEventListener("abort", onAbortFromParent, { once: true });
  try {
    const response = await fetch(fallbackUrl, { signal: timeoutController.signal });
    if (!response.ok) return "";
    const data = await response.json();
    return parseGoogleTranslatedText(data);
  } catch (_err) {
    return "";
  } finally {
    clearTimeout(timeoutId);
    if (signal) signal.removeEventListener("abort", onAbortFromParent);
  }
}

async function fetchGoogleTranslationJoinedChunk(texts, lang, signal) {
  if (!Array.isArray(texts) || texts.length === 0) return [];
  const joined = texts.join(TRANSLATION_SEPARATOR);
  const translated = await fetchGoogleTranslation(joined, lang, signal);
  if (!translated) return [];
  const split = String(translated).split(new RegExp(`\\s*${escapeRegex(TRANSLATION_SEPARATOR)}\\s*`, "g"));
  if (split.length !== texts.length) return [];
  return split.map((item) => String(item || "").trim());
}

async function translateTextValue(text, targetLang, signal) {
  const t = String(text || "");
  const lang = resolveSupportedTargetLanguage(targetLang);
  const key = `${lang}::${t}`;
  if (translationCache.has(key)) return translationCache.get(key);
  if (signal && signal.aborted) return t;
  try {
    const translated = await fetchGoogleTranslation(t, lang, signal);
    if (translated && translated.trim()) {
      translationCache.set(key, translated);
      return translated;
    }
  } catch (_err) {
    // Fall through to default value.
  }

  translationCache.set(key, t);
  return t;
}

async function translateBatchValues(values, targetLang, signal) {
  const lang = resolveSupportedTargetLanguage(targetLang);
  const out = new Map();
  const pending = values.filter((v) => !translationCache.has(`${lang}::${v}`));
  values.forEach((v) => {
    const cached = translationCache.get(`${lang}::${v}`);
    if (cached) out.set(v, cached);
  });
  if (pending.length === 0) return out;

  const chunks = [];
  let current = [];
  let currentLen = 0;
  pending.forEach((item) => {
    const nextLen = currentLen + item.length + TRANSLATION_SEPARATOR.length;
    if (current.length > 0 && nextLen > 1400) {
      chunks.push(current);
      current = [item];
      currentLen = item.length;
    } else {
      current.push(item);
      currentLen = nextLen;
    }
  });
  if (current.length) chunks.push(current);

  const chunkConcurrency = 5;
  let chunkIndex = 0;

  async function translateChunkAdaptive(chunk) {
    if (signal && signal.aborted) return new Map();
    if (!Array.isArray(chunk) || chunk.length === 0) return new Map();

    const joinedResult = await fetchGoogleTranslationJoinedChunk(chunk, lang, signal);
    if (Array.isArray(joinedResult) && joinedResult.length === chunk.length) {
      const map = new Map();
      chunk.forEach((src, i) => {
        const translated = String(joinedResult[i] || "").trim() || src;
        map.set(src, translated);
      });
      return map;
    }

    if (chunk.length === 1) {
      const src = chunk[0];
      const translated = await translateTextValue(src, lang, signal);
      return new Map([[src, translated]]);
    }

    const mid = Math.floor(chunk.length / 2);
    const left = chunk.slice(0, mid);
    const right = chunk.slice(mid);
    const [leftMap, rightMap] = await Promise.all([
      translateChunkAdaptive(left),
      translateChunkAdaptive(right)
    ]);
    const merged = new Map(leftMap);
    rightMap.forEach((v, k) => merged.set(k, v));
    return merged;
  }

  async function chunkWorker() {
    while (chunkIndex < chunks.length) {
      if (signal && signal.aborted) return;
      const idx = chunkIndex;
      chunkIndex += 1;
      const chunk = chunks[idx];
      // eslint-disable-next-line no-await-in-loop
      const translatedChunk = await translateChunkAdaptive(chunk);
      translatedChunk.forEach((translated, src) => {
        translationCache.set(`${lang}::${src}`, translated);
        out.set(src, translated);
      });
    }
  }
  await Promise.all(Array.from({ length: Math.min(chunkConcurrency, chunks.length || 1) }, () => chunkWorker()));

  return out;
}

function applyTranslatedResultsToNodes(results, textNodes, placeholderEls, optionEls, attrNodes) {
  textNodes.forEach((node) => {
    const original = originalTextByNode.get(node);
    if (typeof original !== "string") return;
    if (results.has(original)) node.nodeValue = results.get(original);
  });
  placeholderEls.forEach((el) => {
    const original = originalPlaceholderByEl.get(el);
    if (typeof original !== "string") return;
    if (results.has(original)) el.setAttribute("placeholder", results.get(original));
  });
  optionEls.forEach((el) => {
    const original = originalOptionTextByEl.get(el);
    if (typeof original !== "string") return;
    if (results.has(original)) el.textContent = results.get(original);
  });
  attrNodes.forEach(({ el, attr, original }) => {
    if (typeof original !== "string") return;
    if (results.has(original)) el.setAttribute(attr, results.get(original));
  });
}

async function translateEntireSite(targetLang, roots = collectActiveTranslationRoots()) {
  const lang = resolveSupportedTargetLanguage(targetLang);
  const runId = ++translationRunId;
  const controller = new AbortController();
  activeTranslationAbortController = controller;
  const { signal } = controller;
  isTranslating = true;

  try {
    const textNodes = collectTranslatableTextNodes(roots);
    const placeholderEls = collectPlaceholderElements(roots);
    const optionEls = collectTranslatableOptions(roots);
    const attrNodes = collectTranslatableAttributeNodes(roots);

    if (lang === "en") {
      textNodes.forEach((node) => {
        const original = originalTextByNode.get(node);
        if (typeof original === "string") node.nodeValue = original;
      });
      placeholderEls.forEach((el) => {
        if (!originalPlaceholderByEl.has(el)) {
          originalPlaceholderByEl.set(el, el.getAttribute("placeholder") || "");
        }
        const original = originalPlaceholderByEl.get(el);
        if (typeof original === "string") el.setAttribute("placeholder", original);
      });
      optionEls.forEach((el) => {
        if (!originalOptionTextByEl.has(el)) originalOptionTextByEl.set(el, el.textContent || "");
        const original = originalOptionTextByEl.get(el);
        if (typeof original === "string") el.textContent = original;
      });
      attrNodes.forEach(({ el, attr, original }) => {
        if (typeof original === "string") el.setAttribute(attr, original);
      });
      return;
    }

    // Baseline reset in-place to avoid full pre-reset pass on every switch.
    textNodes.forEach((node) => {
      const original = originalTextByNode.get(node);
      if (typeof original === "string") node.nodeValue = original;
    });
    placeholderEls.forEach((el) => {
      if (!originalPlaceholderByEl.has(el)) {
        originalPlaceholderByEl.set(el, el.getAttribute("placeholder") || "");
      }
      const original = originalPlaceholderByEl.get(el);
      if (typeof original === "string") el.setAttribute("placeholder", original);
    });
    optionEls.forEach((el) => {
      if (!originalOptionTextByEl.has(el)) originalOptionTextByEl.set(el, el.textContent || "");
      const original = originalOptionTextByEl.get(el);
      if (typeof original === "string") el.textContent = original;
    });
    attrNodes.forEach(({ el, attr, original }) => {
      if (typeof original === "string") el.setAttribute(attr, original);
    });

    const uniqueTexts = new Set();
    textNodes.forEach((node) => {
      const original = originalTextByNode.get(node);
      if (typeof original === "string" && shouldTranslateText(original)) uniqueTexts.add(original);
    });
    placeholderEls.forEach((el) => {
      if (!originalPlaceholderByEl.has(el)) {
        originalPlaceholderByEl.set(el, el.getAttribute("placeholder") || "");
      }
      const original = originalPlaceholderByEl.get(el);
      if (typeof original === "string" && shouldTranslateText(original)) uniqueTexts.add(original);
    });
    optionEls.forEach((el) => {
      if (!originalOptionTextByEl.has(el)) originalOptionTextByEl.set(el, el.textContent || "");
      const original = originalOptionTextByEl.get(el);
      if (typeof original === "string" && shouldTranslateText(original)) uniqueTexts.add(original);
    });
    attrNodes.forEach(({ original }) => {
      if (typeof original === "string" && shouldTranslateText(original)) uniqueTexts.add(original);
    });

    const items = Array.from(uniqueTexts);
    const results = new Map();
    const missing = [];
    items.forEach((item) => {
      const cached = translationCache.get(`${lang}::${item}`);
      if (cached) results.set(item, cached);
      else missing.push(item);
    });

    // Instant render from cache for near-zero perceived switch delay.
    if (results.size > 0) {
      applyTranslatedResultsToNodes(results, textNodes, placeholderEls, optionEls, attrNodes);
    }

    if (missing.length > 0) {
      const fetched = await translateBatchValues(missing, lang, signal);
      fetched.forEach((value, key) => results.set(key, value));
    }
    if (signal.aborted || runId !== translationRunId) return;

    applyTranslatedResultsToNodes(results, textNodes, placeholderEls, optionEls, attrNodes);
  } finally {
    isTranslating = false;
    if (activeTranslationAbortController === controller) activeTranslationAbortController = null;
  }
}

function restoreOriginalEnglishContent(roots = collectActiveTranslationRoots()) {
  const textNodes = collectTranslatableTextNodes(roots);
  const placeholderEls = collectPlaceholderElements(roots);
  const optionEls = collectTranslatableOptions(roots);
  const attrNodes = collectTranslatableAttributeNodes(roots);

  textNodes.forEach((node) => {
    const original = originalTextByNode.get(node);
    if (typeof original === "string") node.nodeValue = original;
  });
  placeholderEls.forEach((el) => {
    if (!originalPlaceholderByEl.has(el)) {
      originalPlaceholderByEl.set(el, el.getAttribute("placeholder") || "");
    }
    const original = originalPlaceholderByEl.get(el);
    if (typeof original === "string") el.setAttribute("placeholder", original);
  });
  optionEls.forEach((el) => {
    if (!originalOptionTextByEl.has(el)) originalOptionTextByEl.set(el, el.textContent || "");
    const original = originalOptionTextByEl.get(el);
    if (typeof original === "string") el.textContent = original;
  });
  attrNodes.forEach(({ el, attr, original }) => {
    if (typeof original === "string") el.setAttribute(attr, original);
  });
}

function queueTranslation(targetLang) {
  const lang = String(targetLang || "en");
  const switchId = ++activeTranslationSwitchId;
  if (activeRefreshTimer) {
    clearTimeout(activeRefreshTimer);
    activeRefreshTimer = null;
  }

  if (activeTranslationAbortController) {
    activeTranslationAbortController.abort();
    activeTranslationAbortController = null;
  }
  isTranslating = false;

  Promise.resolve()
    .then(async () => {
      if (switchId !== activeTranslationSwitchId) return;
      await translateEntireSite(lang);
    })
    .catch(() => {});
}

function refreshActiveLanguageIfNeeded() {
  if (!activeSiteLanguage || activeSiteLanguage === "en") return;
  if (isTranslating) return;
  if (activeRefreshTimer) clearTimeout(activeRefreshTimer);
  activeRefreshTimer = setTimeout(() => {
    queueTranslation(activeSiteLanguage);
  }, 120);
}

function applyLanguageFromCountrySelection(countryIso) {
  const code = String(countryIso || "").toUpperCase();
  const lang = code ? languageCodeForCountryIso(code) : "en";
  if (lang === activeSiteLanguage && !isTranslating) return;
  if (activeTranslationAbortController) {
    activeTranslationAbortController.abort();
    activeTranslationAbortController = null;
  }
  if (activeRefreshTimer) {
    clearTimeout(activeRefreshTimer);
    activeRefreshTimer = null;
  }
  activeSiteLanguage = lang;
  document.documentElement.setAttribute("lang", lang);
  document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  isTranslating = false;
  queueTranslation(lang);
}

function setupNavLanguageSelector() {
  const select = document.getElementById("site-language-country");
  if (!select) return;
  const onSelectLanguage = () => {
    applyLanguageFromCountrySelection(select.value);
  };
  select.addEventListener("change", onSelectLanguage);
  select.addEventListener("input", onSelectLanguage);
  // Always start in English on page open.
  select.value = "";
  applyLanguageFromCountrySelection("");
}

const conciergeFirstSyllablesA = [
  "al", "be", "ca", "da", "el", "fa", "ga", "ha", "is", "jo",
  "ka", "le", "mi", "na", "or", "pa", "qi", "ra", "sa", "ta",
  "ul", "va", "wi", "xe", "ya", "za", "ari", "eno", "ivo", "lio",
  "nora", "sena", "tari", "vilo", "zari", "amel", "bora", "cali", "dari", "esra"
];

const conciergeFirstSyllablesB = [
  "den", "lia", "mar", "vin", "sel", "ron", "tis", "niel", "vora", "kiel",
  "rina", "sor", "lin", "fer", "del", "mora", "san", "rei", "vian", "tel",
  "qor", "hal", "bryn", "lume", "dara", "syl", "nex", "vera", "jas", "ciel"
];

const conciergeLastSyllablesA = [
  "arden", "belmont", "corvin", "dalton", "everly", "falken", "grayson", "halberg", "iverson", "jolivet",
  "kessler", "langford", "merrow", "norland", "ormond", "pember", "quillon", "ravent", "stroud", "telford",
  "ulmar", "valent", "wexley", "xandor", "yarrow", "zorin", "ansell", "bramwell", "clairmont", "dunley",
  "elcott", "fairmont", "grafton", "hollis", "ironwood", "jarvis", "kirkland", "lockhart", "montclair", "northam"
];

const conciergeLastSyllablesB = [
  "stone", "hart", "mere", "field", "crest", "brook", "ford", "vale", "ridge", "worth",
  "ward", "moor", "gate", "shaw", "mont", "thorne", "cliff", "hurst", "quay", "dell",
  "lark", "bloom", "frost", "drake", "cove", "dawn", "flare", "glade", "crown", "spire"
];
const conciergeRoles = ["Lead Concierge", "Travel Concierge", "Security Concierge", "Lifestyle Concierge", "Operations Concierge"];

function titleCase(word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function buildUniqueWord(index, partA, partB) {
  const a = partA[index % partA.length];
  const b = partB[Math.floor(index / partA.length) % partB.length];
  return titleCase(`${a}${b}`);
}

const conciergeFirstNames = Array.from({ length: 1000 }, (_, index) =>
  buildUniqueWord(index, conciergeFirstSyllablesA, conciergeFirstSyllablesB)
);

const conciergeLastNames = Array.from({ length: 1000 }, (_, index) =>
  buildUniqueWord(index, conciergeLastSyllablesA, conciergeLastSyllablesB)
);

const conciergeCatalog = Array.from({ length: 1000 }, (_, index) => {
  const first = conciergeFirstNames[index];
  const last = conciergeLastNames[index];
  const role = conciergeRoles[index % conciergeRoles.length];
  const slug = `${first}.${last}`.toLowerCase();
  const n = index + 1;
  const phoneSeed = String(1000 + n).padStart(4, "0");
  return {
    id: `concierge-${n}`,
    name: `${first} ${last}`,
    role,
    email: `${slug}@venture-voyagers.com`,
    localPhone: `58 ${phoneSeed.slice(0, 2)} ${phoneSeed.slice(2)} ${String(2000 + n).slice(-4)}`
  };
});

function randomConciergeDesk(size = 8) {
  const copy = [...conciergeCatalog];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(size, copy.length));
}

function setActiveNav(route) {
  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    const isActive = link.getAttribute("data-route") === route;
    link.classList.toggle("active", isActive);
  });
}

function initHeroLocator() {
  const signal = document.querySelector(".heroSignal");
  const radar = document.querySelector(".heroRadar");
  const dots = Array.from(document.querySelectorAll(".heroDot"));
  if (!signal || !radar || dots.length === 0) return;

  const sweepDurationMs = 11000;
  const sweepHalfWidthDeg = 18;

  const normalizeAngle = (deg) => {
    let a = deg % 360;
    if (a < 0) a += 360;
    return a;
  };

  const angularDelta = (a, b) => {
    const diff = Math.abs(a - b) % 360;
    return diff > 180 ? 360 - diff : diff;
  };

  const loop = () => {
    const homeVisible = !document.querySelector('[data-page="home"]')?.hasAttribute("hidden");
    if (homeVisible) {
      const radarRect = radar.getBoundingClientRect();
      const centerX = radarRect.left + radarRect.width / 2;
      const centerY = radarRect.top + radarRect.height / 2;
      const elapsed = performance.now() % sweepDurationMs;
      const sweepAngle = normalizeAngle((elapsed / sweepDurationMs) * 360);
      signal.style.transform = `translate(-50%, -50%) rotate(${sweepAngle}deg)`;

      dots.forEach((dot) => {
        const rect = dot.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const dx = x - centerX;
        const dy = y - centerY;
        const dotAngle = normalizeAngle((Math.atan2(dy, dx) * 180 / Math.PI) + 90);
        const lit = angularDelta(sweepAngle, dotAngle) <= sweepHalfWidthDeg;
        dot.classList.toggle("isLit", lit);
      });
    }
    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);
}

function isWebsiteShutdownActive() {
  try {
    return localStorage.getItem(WEBSITE_SHUTDOWN_KEY) === "1";
  } catch (_) {
    return false;
  }
}

function setWebsiteShutdownActive(flag) {
  try {
    if (flag) localStorage.setItem(WEBSITE_SHUTDOWN_KEY, "1");
    else localStorage.removeItem(WEBSITE_SHUTDOWN_KEY);
  } catch (_) {}
}

function canAccessDuringShutdown(route) {
  const normalized = String(route || "").trim();
  if (normalized === "account") return true;
  const owner = !!activeAccount && isOwnerAccount(activeAccount);
  if (!owner) return false;
  return normalized === "sunrise" || sunriseModuleRoutes.includes(normalized);
}

function showRoute(route, pushHash = true) {
  let target = route || "home";
  if (isWebsiteShutdownActive() && !canAccessDuringShutdown(target)) {
    target = "shutdown-404";
  }
  const isSunriseModuleRoute = sunriseModuleRoutes.includes(target);
  if (target === "ambassador") {
    const allowed = activeAccount && String(activeAccount.membership || "").toLowerCase() === "voyager red";
    if (!allowed) target = activeAccount ? "profile" : "home";
  }
  if (target === "voyager-control") {
    const allowed = isVoyagerControlUser(activeAccount);
    if (!allowed) target = activeAccount ? "profile" : "home";
  }
  if (target === "sunrise" || isSunriseModuleRoute) {
    const allowed = isOwnerAccount(activeAccount);
    if (!allowed) {
      target = activeAccount ? "profile" : "home";
    } else if (isSunriseModuleRoute && !sunriseState.unlocked) {
      target = "sunrise";
    }
  }
  const pages = Array.from(document.querySelectorAll(".routePage"));
  const next = pages.find((page) => page.getAttribute("data-page") === target);
  if (!next) return;

  const current = pages.find((page) => !page.hasAttribute("hidden"));
  if (current === next) return;

  if (current) current.classList.add("routeOut");
  next.removeAttribute("hidden");
  next.classList.add("routeOut");

  requestAnimationFrame(() => {
    setTimeout(() => {
      if (current) {
        current.setAttribute("hidden", "");
        current.classList.remove("routeOut");
      }
      next.classList.remove("routeOut");
      setActiveNav(target);
      updateSunriseShortcutDock(target);
      appendSunrisePathTrace(target);
      window.scrollTo({ top: 0, behavior: "auto" });
      if (target === "account") resetAuthState();
      if (target === "sunrise") updateSunriseAccessView();
      if (target === "contact") applyContactAccountPrefill();
      if (activeSiteLanguage && activeSiteLanguage !== "en") {
        queueTranslation(activeSiteLanguage);
      }
      if (pushHash) window.location.hash = target;
    }, 180);
  });
}

function forceShowRoute(route, pushHash = true) {
  const target = route || "home";
  const normalizedTarget = (isWebsiteShutdownActive() && !canAccessDuringShutdown(target)) ? "shutdown-404" : target;
  const pages = Array.from(document.querySelectorAll(".routePage"));
  const next = pages.find((page) => page.getAttribute("data-page") === normalizedTarget);
  if (!next) return;
  pages.forEach((page) => {
    if (page === next) page.removeAttribute("hidden");
    else page.setAttribute("hidden", "");
    page.classList.remove("routeOut");
  });
  setActiveNav(normalizedTarget);
  updateSunriseShortcutDock(normalizedTarget);
  appendSunrisePathTrace(normalizedTarget);
  window.scrollTo({ top: 0, behavior: "auto" });
  if (normalizedTarget === "account") resetAuthState();
  if (normalizedTarget === "sunrise") updateSunriseAccessView();
  if (normalizedTarget === "contact") applyContactAccountPrefill();
  if (activeSiteLanguage && activeSiteLanguage !== "en") queueTranslation(activeSiteLanguage);
  if (pushHash) window.location.hash = normalizedTarget;
}

function goToContactForService(serviceKey) {
  pendingServiceRequestKey = String(serviceKey || "").trim();
  forceShowRoute("contact", false);
  const serviceTypeSelect = document.getElementById("service-type");
  if (serviceTypeSelect && pendingServiceRequestKey) {
    const options = Array.from(serviceTypeSelect.options || []);
    const option = options.find((item) => String(item.value || "").trim() === pendingServiceRequestKey);
    if (option) serviceTypeSelect.value = option.value;
  }
  window.location.hash = `contact?service=${encodeURIComponent(pendingServiceRequestKey)}`;
  requestAnimationFrame(() => {
    const select = document.getElementById("service-type");
    if (!select || !pendingServiceRequestKey) return;
    const options = Array.from(select.options || []);
    const option = options.find((item) => String(item.value || "").trim() === pendingServiceRequestKey);
    if (option) select.value = option.value;
  });
  return false;
}
window.goToContactForService = goToContactForService;

function setupServiceButtons() {
  const links = Array.from(document.querySelectorAll(".serviceCardLink[data-service-request]"));
  links.forEach((link) => {
    if (link.dataset.boundServiceClick === "1") return;
    link.addEventListener("click", () => {
      pendingServiceRequestKey = String(link.getAttribute("data-service-request") || "").trim();
    });
    link.dataset.boundServiceClick = "1";
  });
}

function setupSunriseShortcutMenu() {
  const forms = Array.from(document.querySelectorAll(".sunriseShortcutForm"));
  if (!forms.length) return;

  const resolveShortcutRoute = (rawValue) => {
    const raw = String(rawValue || "").trim().toLowerCase().replace(/\s+/g, "");
    if (!raw) return "";
    return sunriseShortcutRouteMap[raw] || (sunriseModuleRoutes.includes(raw) ? raw : "");
  };

  forms.forEach((form) => {
    const input = form.querySelector("input");
    const infoTarget = String(form.getAttribute("data-info-target") || "").trim();
    const info = infoTarget ? document.getElementById(infoTarget) : null;
    if (!input || !info) return;
    if (form.dataset.shortcutBound === "1") return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const raw = String(input.value || "").trim();
      if (!raw) {
        info.textContent = "Enter a module code, for example REV1 or SLS1.";
        return;
      }
      if (!sunriseState.unlocked) {
        info.textContent = "Unlock Sunrise first to use shortcut routing.";
        return;
      }

      const normalized = raw.toLowerCase().replace(/\s+/g, "");
      if (normalized === "ws") {
        setWebsiteShutdownActive(true);
        info.textContent = "Website shutdown activated. Public access is now frozen to 404.";
        const nextRoute = canAccessDuringShutdown(currentVisibleRoute()) ? currentVisibleRoute() : "shutdown-404";
        showRoute(nextRoute);
        return;
      }
      if (normalized === "wr") {
        setWebsiteShutdownActive(false);
        info.textContent = "Website restore completed. All access has been unfrozen.";
        showRoute("sunrise");
        return;
      }

      const route = resolveShortcutRoute(raw);
      if (!route) {
        if (/^[a-z]\d{7}$/i.test(normalized)) {
          const serviceId = normalized.toUpperCase();
          const serviceFocus = findServiceById(serviceId);
          if (!serviceFocus) {
            info.textContent = `Service ${serviceId} not found in current/past/deleted lists.`;
            return;
          }
          sunriseControlState.socSelectedServiceId = serviceId;
          saveSunriseControlState();
          renderSOCDetailsPage();
          showRoute("sunrise-soc-details");
          info.textContent = "";
          input.value = "";
          return;
        }
        info.textContent = "Unknown selection code. Use one of the codes shown on the module cards.";
        return;
      }
      info.textContent = "";
      input.value = "";
      showRoute(route);
    });

    form.dataset.shortcutBound = "1";
  });
}

function ensureSunriseInboxTopButtons() {
  const targets = ["sunrise", ...sunriseModuleRoutes];
  targets.forEach((route) => {
    const page = document.querySelector(`.routePage[data-page="${route}"]`);
    if (!page) return;
    const actions = page.querySelector(".viewTop .viewActions");
    if (!actions) return;
    if (actions.querySelector('[data-sunrise-top-inbox="1"]')) return;
    const inboxBtn = document.createElement("a");
    inboxBtn.className = "btn ghost";
    inboxBtn.href = "#sunrise-inbox";
    inboxBtn.setAttribute("data-route", "sunrise-inbox");
    inboxBtn.setAttribute("data-sunrise-top-inbox", "1");
    inboxBtn.textContent = "Inbox";
    const logoutBtn = actions.querySelector("[data-sunrise-logout]") || actions.querySelector("#sunrise-logout-btn");
    if (logoutBtn) actions.insertBefore(inboxBtn, logoutBtn);
    else actions.prepend(inboxBtn);
  });
}

function currentVisibleRoute() {
  const page = document.querySelector(".routePage:not([hidden])");
  return page ? String(page.getAttribute("data-page") || "home") : "home";
}

function updateSunriseShortcutDock(route = currentVisibleRoute()) {
  const dock = document.getElementById("sunrise-shortcut-dock");
  if (!dock) return;
  const normalizedRoute = String(route || "").trim();
  const isSunriseRoute = normalizedRoute === "sunrise" || sunriseModuleRoutes.includes(normalizedRoute);
  const shouldShow = isSunriseRoute && !!activeAccount && isOwnerAccount(activeAccount) && !!sunriseState.unlocked;
  dock.hidden = !shouldShow;
}

function initRouteFromHash() {
  const raw = window.location.hash.replace("#", "").trim();
  const [routeBase, query = ""] = raw.split("?");
  const baseRoutes = ["home", "services", "membership", "contact", "account", "profile", "ambassador", "voyager-control", "sunrise", "shutdown-404"];
  const route = (baseRoutes.includes(routeBase) || sunriseModuleRoutes.includes(routeBase)) ? routeBase : "home";
  const ambassadorAllowed = activeAccount && String(activeAccount.membership || "").toLowerCase() === "voyager red";
  const controlAllowed = isVoyagerControlUser(activeAccount);
  const sunriseAllowed = isOwnerAccount(activeAccount);
  const sunriseModuleAllowed = !sunriseModuleRoutes.includes(route) || sunriseState.unlocked;
  let safeRoute = route;
  if (route === "ambassador" && !ambassadorAllowed) safeRoute = activeAccount ? "profile" : "home";
  if (route === "voyager-control" && !controlAllowed) safeRoute = activeAccount ? "profile" : "home";
  if (route === "sunrise" && !sunriseAllowed) safeRoute = activeAccount ? "profile" : "home";
  if (sunriseModuleRoutes.includes(route) && (!sunriseAllowed || !sunriseModuleAllowed)) safeRoute = sunriseAllowed ? "sunrise" : (activeAccount ? "profile" : "home");
  if (isWebsiteShutdownActive() && !canAccessDuringShutdown(safeRoute)) safeRoute = "shutdown-404";

  document.querySelectorAll(".routePage").forEach((page) => {
    if (page.getAttribute("data-page") === safeRoute) {
      page.removeAttribute("hidden");
    } else {
      page.setAttribute("hidden", "");
    }
  });
  setActiveNav(safeRoute);
  updateSunriseShortcutDock(safeRoute);
  appendSunrisePathTrace(safeRoute);
  if (safeRoute === "sunrise") updateSunriseAccessView();
  if (safeRoute === "contact") applyContactAccountPrefill();
  window.scrollTo({ top: 0, behavior: "auto" });
  if (route === "contact" && query) {
    const params = new URLSearchParams(query);
    const requestedService = String(params.get("service") || "").trim();
    if (requestedService) pendingServiceRequestKey = requestedService;
  }
  if (route === "contact" && pendingServiceRequestKey) {
    const serviceTypeSelect = document.getElementById("service-type");
    if (serviceTypeSelect) {
      const options = Array.from(serviceTypeSelect.options || []);
      const option = options.find((item) => String(item.value || "").trim() === pendingServiceRequestKey);
      if (option) serviceTypeSelect.value = option.value;
    }
  }
}

const tierData = {
  cuprum: {
    name: "Voyager Cuprum",
    validity: "Validity: 1 Year",
    achievement: "Achieve after 5 completed services with VVS.",
    benefits: [
      "24/7 concierge assistance.",
      "Private physical member card delivery.",
      "Free instant execution service."
    ]
  },
  argentum: {
    name: "Voyager Argentum",
    validity: "Validity: 1 Year",
    achievement: "Achieve after 12 completed services, or 9 completed services plus 1 referral with at least 1 completed service.",
    benefits: [
      "All standard tier benefits (24/7 assistance and private member card).",
      "Free instant execution service.",
      "Free Airport Escort."
    ]
  },
  aurum: {
    name: "Voyager Aurum",
    validity: "Validity: 1 Year",
    achievement: "Achieve after 20 completed services, or 17 completed services plus 2 referrals with at least 1 completed service each.",
    benefits: [
      "All standard tier benefits (24/7 assistance and private member card).",
      "Free instant execution service.",
      "Free Business Airport Escort.",
      "Terminal Lounge access."
    ]
  },
  platinum: {
    name: "Voyager Platinum",
    validity: "Validity: 1 Year",
    achievement: "Achieve after 33 completed services, or 25 completed services plus 4 referrals with at least 1 completed service per referral.",
    benefits: [
      "All standard tier benefits (24/7 assistance and private member card).",
      "Free instant execution service.",
      "Security Escort to the airport.",
      "Fast terminal-to-gate escort.",
      "Terminal Lounge access.",
      "1 free round private jet transfer.",
      "5 complimentary nights in a hotel or villa of the client's choice."
    ]
  },
  diamante: {
    name: "Voyager Diamante",
    validity: "Validity: 1 Year",
    achievement: "Achieve after 45 completed services, or 38 completed services plus 1 referral that reaches Voyager Argentum status.",
    benefits: [
      "All Voyager Platinum benefits.",
      "Free instant execution service.",
      "24/7 private escape service.",
      "3 special service requests at no charge.",
      "24/7 access to 2 security bodyguards when required."
    ]
  },
  noir: {
    name: "Voyager Noir",
    validity: "Validity: 1 Year",
    achievement: "Achieve after 60 completed services and 1 referral that reaches Voyager Aurum status.",
    benefits: [
      "All Voyager Diamante benefits.",
      "Free instant execution service.",
      "5 special service requests at no charge.",
      "Priority strategic assignment handling for complex requests."
    ]
  },
  red: {
    name: "Voyager Red",
    validity: "Validity: Lifetime",
    achievement: "Granted only by direct CEO/COO invitation.",
    benefits: [
      "All Voyager Noir benefits.",
      "Free instant execution service.",
      "50% discount on all future services.",
      "Lifetime membership status.",
      "Access to the VVS Red Lounge.",
      "Dedicated 24/7 concierge team assigned exclusively to the client.",
      "Ability to gift a 2% service discount to up to 5 referrals.",
      "5 free round-trip private jet flights per year with coordinated home-to-airport, airport-to-jet, and jet-to-hotel routing.",
      "17 complimentary nights per year in a hotel or villa of the client's choice."
    ]
  }
};

function renderTier(tierKey) {
  const tier = tierData[tierKey];
  if (!tier) return;

  const name = document.getElementById("tier-name");
  const validity = document.getElementById("tier-validity");
  const achievement = document.getElementById("tier-achievement");
  const benefits = document.getElementById("tier-benefits");

  if (!name || !validity || !achievement || !benefits) return;

  name.textContent = tier.name;
  validity.textContent = tier.validity;
  achievement.textContent = tier.achievement;
  benefits.innerHTML = tier.benefits.map((item) => `<li>${item}</li>`).join("");
  refreshActiveLanguageIfNeeded();
}

document.addEventListener("click", (e) => {
  const routeLink = e.target.closest("[data-route]");
  if (routeLink) {
    e.preventDefault();
    showRoute(routeLink.getAttribute("data-route"));
    return;
  }

  const tierButton = e.target.closest("[data-tier]");
  if (!tierButton) return;

  const key = tierButton.getAttribute("data-tier");
  renderTier(key);

  document.querySelectorAll(".tierOption").forEach((button) => {
    const isActive = button === tierButton;
    button.classList.toggle("isActive", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
});

window.addEventListener("hashchange", initRouteFromHash);
renderTier("cuprum");
initHeroLocator();
populateSignupCountries();
populateIssuedServiceCountries();
populateNavLanguageCountries();
setupNavLanguageSelector();
setupSignupCountryPhoneAutofill();
setupContactIssuedCountryPhoneAutofill();
setupServiceButtons();
setupSunriseShortcutMenu();

queueMicrotask(() => {
  try {
    restoreActiveSession();
    updateAuthCta();
    initRouteFromHash();
  } catch (err) {
    console.error("Startup init error:", err);
    updateAuthCta();
    initRouteFromHash();
  }
});

// Arc/Chromium bfcache restore safety: rebind interactions on tab/session restore.
window.addEventListener("pageshow", () => {
  setupServiceButtons();
});

const executionSelect = document.getElementById("execution-time");
const instantWarning = document.getElementById("instant-warning");
const contactForm = document.getElementById("contact-form");
const contactError = document.getElementById("contact-error");
const contactOverlay = document.getElementById("contact-overlay");
const contactSuccessMessage = document.getElementById("contact-success-message");
const contactOverlayClose = document.getElementById("contact-overlay-close");
const contactPrefillFieldIds = ["first-name", "last-name", "title", "phone", "email"];

function contactPrefillStorageKey() {
  if (!activeAccount || !activeAccount.email) return "";
  return `vvs_contact_prefill_${String(activeAccount.email).trim().toLowerCase()}`;
}

function saveContactPrefillDraft() {
  const key = contactPrefillStorageKey();
  if (!key) return;
  const payload = {
    firstName: (document.getElementById("first-name")?.value || "").trim(),
    lastName: (document.getElementById("last-name")?.value || "").trim(),
    title: (document.getElementById("title")?.value || "").trim(),
    phone: (document.getElementById("phone")?.value || "").trim(),
    email: (document.getElementById("email")?.value || "").trim()
  };
  try {
    localStorage.setItem(key, JSON.stringify(payload));
  } catch (_) {}
}

function loadContactPrefillDraft() {
  const key = contactPrefillStorageKey();
  if (!key) return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch (_) {
    return null;
  }
}

function applyContactAccountPrefill() {
  if (!contactForm || !activeAccount) return;
  const defaults = {
    firstName: String(activeAccount.firstName || "").trim(),
    lastName: String(activeAccount.lastName || "").trim(),
    title: String(activeAccount.prefix || "Mr.").trim(),
    phone: String(activeAccount.phone || "").trim(),
    email: String(activeAccount.email || "").trim()
  };
  const draft = loadContactPrefillDraft() || {};
  const finalData = {
    firstName: draft.firstName || defaults.firstName,
    lastName: draft.lastName || defaults.lastName,
    title: draft.title || defaults.title,
    phone: draft.phone || defaults.phone,
    email: draft.email || defaults.email
  };

  const first = document.getElementById("first-name");
  const last = document.getElementById("last-name");
  const title = document.getElementById("title");
  const phone = document.getElementById("phone");
  const email = document.getElementById("email");
  if (first) first.value = finalData.firstName;
  if (last) last.value = finalData.lastName;
  if (title) title.value = finalData.title;
  if (phone) phone.value = finalData.phone;
  if (email) email.value = finalData.email;
  saveContactPrefillDraft();
}

function bindContactPrefillPersistence() {
  if (!contactForm) return;
  contactPrefillFieldIds.forEach((id) => {
    const el = document.getElementById(id);
    if (!el || el.dataset.contactPrefillBound === "1") return;
    const handler = () => saveContactPrefillDraft();
    el.addEventListener("input", handler);
    el.addEventListener("change", handler);
    el.dataset.contactPrefillBound = "1";
  });
}

if (executionSelect && instantWarning) {
  executionSelect.addEventListener("change", () => {
    instantWarning.hidden = executionSelect.value !== "Instant";
  });
}

bindContactPrefillPersistence();

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (contactError) contactError.textContent = "";

    const methods = Array.from(document.querySelectorAll('input[name="contactMethod"]:checked'))
      .map((node) => node.value);

    if (methods.length === 0) {
      if (contactError) contactError.textContent = "Select at least one preferred contact method (email and/or phone).";
      return;
    }

    if (!contactForm.reportValidity()) return;

    let methodText = "email address";
    if (methods.length === 2) {
      methodText = "email address and phone number";
    } else if (methods[0] === "phone") {
      methodText = "phone number";
    }

    const titleInput = document.getElementById("title");
    const lastNameInput = document.getElementById("last-name");
    const title = titleInput && titleInput.value ? titleInput.value.trim() : "Mr.";
    const lastName = lastNameInput && lastNameInput.value ? lastNameInput.value.trim() : "Client";

    if (contactSuccessMessage) {
      contactSuccessMessage.textContent =
        `Dear ${title} ${lastName}, Concierge Benedict has been assigned to your request. You will be contacted for service details via your ${methodText}, based on your selected preference. Thank you for choosing VVS.`;
    }

    if (contactOverlay) contactOverlay.hidden = false;
    refreshActiveLanguageIfNeeded();
    contactForm.reset();
    if (activeAccount) applyContactAccountPrefill();
    if (instantWarning) instantWarning.hidden = true;
  });
}

if (contactOverlayClose) {
  contactOverlayClose.addEventListener("click", () => {
    if (contactOverlay) contactOverlay.hidden = true;
  });
}

const authTabs = document.querySelectorAll(".authTab");
const authPanels = document.querySelectorAll(".authPanel");
const loginStep1 = document.getElementById("login-step1");
const loginStep2 = document.getElementById("login-step2");
const signupStep1 = document.getElementById("signup-step1");
const signupStep2 = document.getElementById("signup-step2");
const pwOldForm = document.getElementById("pw-old-form");
const pwRecoveryStep1 = document.getElementById("pw-recovery-step1");
const pwRecoveryStep2 = document.getElementById("pw-recovery-step2");
const loginInfo = document.getElementById("login-info");
const signupInfo = document.getElementById("signup-info");
const passwordInfo = document.getElementById("password-info");
const passwordRecoveryInfo = document.getElementById("password-recovery-info");

const authState = {
  loginCode: "",
  signupCode: "",
  loginEmail: "",
  signupEmail: "",
  loginAccount: null,
  testCodesByEmail: {}
};

const passwordResetState = {
  email: "",
  code: "",
  account: null
};

const sunriseState = {
  unlocked: false,
  email: "",
  code: "",
  account: null,
  sessionId: "",
  operatorCode: ""
};

const SUNRISE_OWNER_CODES = {
  "aleks.sunrise@vvs.com": "AO1",
  "mikhail.sunrise@vvs.com": "MO1"
};

function normalizeMembershipTier(value) {
  return String(value || "").trim().toLowerCase().replace(/\s+/g, " ");
}

function activateAuthTab(tabKey) {
  authTabs.forEach((tab) => {
    const active = tab.getAttribute("data-auth-tab") === tabKey;
    tab.classList.toggle("isActive", active);
    tab.setAttribute("aria-selected", String(active));
  });

  authPanels.forEach((panel) => {
    panel.hidden = panel.getAttribute("data-auth-panel") !== tabKey;
  });

  if (tabKey === "login") {
    if (loginStep1) loginStep1.hidden = false;
    if (loginStep2) loginStep2.hidden = true;
    if (loginInfo) loginInfo.textContent = "";
  }

  if (tabKey === "signup") {
    if (signupStep1) signupStep1.hidden = false;
    if (signupStep2) signupStep2.hidden = true;
    if (signupInfo) signupInfo.textContent = "";
  }

  if (tabKey === "password") {
    if (pwOldForm) pwOldForm.hidden = false;
    if (passwordInfo) passwordInfo.textContent = "";
    if (pwRecoveryStep1) {
      pwRecoveryStep1.hidden = true;
      pwRecoveryStep1.reset();
    }
    if (pwRecoveryStep2) {
      pwRecoveryStep2.hidden = true;
      pwRecoveryStep2.reset();
    }
    if (passwordRecoveryInfo) passwordRecoveryInfo.textContent = "";
    passwordResetState.email = "";
    passwordResetState.code = "";
    passwordResetState.account = null;
  }

  if (tabKey === "password-recovery") {
    if (pwOldForm) {
      pwOldForm.hidden = true;
      pwOldForm.reset();
    }
    if (pwRecoveryStep1) pwRecoveryStep1.hidden = false;
    if (pwRecoveryStep2) {
      pwRecoveryStep2.hidden = true;
      pwRecoveryStep2.reset();
    }
    if (passwordInfo) passwordInfo.textContent = "";
    if (passwordRecoveryInfo) passwordRecoveryInfo.textContent = "Enter your email address, secret phrase, and membership tier to send the recovery code.";
    passwordResetState.email = "";
    passwordResetState.code = "";
    passwordResetState.account = null;
  }
}

function resetAuthState() {
  activateAuthTab("login");
  if (loginStep1) loginStep1.reset();
  if (loginStep2) loginStep2.reset();
  if (signupStep1) signupStep1.reset();
  if (signupStep2) signupStep2.reset();
  if (pwOldForm) pwOldForm.reset();
  if (pwRecoveryStep1) pwRecoveryStep1.reset();
  if (pwRecoveryStep2) pwRecoveryStep2.reset();
  if (passwordInfo) passwordInfo.textContent = "";
  if (passwordRecoveryInfo) passwordRecoveryInfo.textContent = "";
  passwordResetState.email = "";
  passwordResetState.code = "";
  passwordResetState.account = null;
}

function updateSunriseAccessView() {
  const authCard = document.getElementById("sunrise-auth-card");
  const panel = document.getElementById("sunrise-panel");
  if (!authCard || !panel) return;
  authCard.hidden = sunriseState.unlocked;
  panel.hidden = !sunriseState.unlocked;
  updateSunriseShortcutDock();
}

function resetSunriseState(options = {}) {
  const shouldClearStoredSession = options.clearStoredSession !== false;
  if (sunriseState.unlocked) closeNotosSession();
  sunriseState.unlocked = false;
  sunriseState.email = "";
  sunriseState.code = "";
  sunriseState.account = null;
  sunriseState.sessionId = "";
  sunriseState.operatorCode = "";
  if (shouldClearStoredSession) clearSunriseSession();
  const step1 = document.getElementById("sunrise-step1");
  const step2 = document.getElementById("sunrise-step2");
  const info = document.getElementById("sunrise-info");
  if (step1) {
    step1.hidden = false;
    step1.reset();
  }
  if (step2) {
    step2.hidden = true;
    step2.reset();
  }
  if (info) info.textContent = "";
  updateSunriseAccessView();
}

function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function issueTestEmailCode(email) {
  const normalized = (email || "").trim().toLowerCase();
  if (!normalized) return "";
  const code = generateCode();
  authState.testCodesByEmail[normalized] = code;
  return code;
}

function isSunriseCredentialAccount(account) {
  if (!account || !isOwnerAccount(account)) return false;
  const key = String(account.email || "").trim().toLowerCase();
  return key === "aleks.sunrise@vvs.com" || key === "mikhail.sunrise@vvs.com";
}

function findAccountByEmail(email) {
  const key = (email || "").trim().toLowerCase();
  if (!key) return null;
  if (accounts[key]) return accounts[key];
  return Object.values(accounts).find((account) => (account.email || "").trim().toLowerCase() === key) || null;
}

function greetingPrefixByCountry(country) {
  const key = normalizeCountryKey(country);
  if (key === "united arab emirates") return "Marhaba";
  if (key === "russian federation") return "Здравствуйте";
  if (key === "ukraine") return "Вітаю";
  if (key === "bulgaria") return "Здравейте";
  if (key === "italy") return "Ciao";
  if (key === "france") return "Bonjour";
  if (key === "spain") return "Hola";
  if (key === "portugal") return "Ola";
  if (key === "japan") return "Konnichiwa";
  if (key === "india") return "Namaste";
  if (key === "pakistan") return "Assalamualaikum";
  if (key === "brazil") return "Ola";
  return "Welcome";
}

function tierThemeClass(membership) {
  const value = (membership || "").toLowerCase();
  if (value.includes("owner")) return "tier-theme-owner";
  if (value.includes("non-member") || value.includes("non member")) return "tier-theme-base";
  if (value.includes("red")) return "tier-theme-red";
  if (value.includes("noir")) return "tier-theme-noir";
  if (value.includes("diamante")) return "tier-theme-diamante";
  if (value.includes("platinum")) return "tier-theme-platinum";
  if (value.includes("aurum")) return "tier-theme-aurum";
  if (value.includes("argentum")) return "tier-theme-argentum";
  if (value.includes("cuprum")) return "tier-theme-cuprum";
  return "tier-theme-gold";
}

function dialCodeForCountry(country) {
  const code = resolveCountryCode(country);
  if (code && countryDialCodesByIso[code]) return countryDialCodesByIso[code];
  const key = normalizeCountryKey(country);
  return countryDialCodes[key] || "+1";
}

function setupSignupCountryPhoneAutofill() {
  const countrySelect = document.getElementById("signup-country");
  const phoneInput = document.getElementById("signup-phone");
  if (!countrySelect || !phoneInput) return;

  const applyDialCode = () => {
    const country = countrySelect.value;
    if (!country) return;
    const dial = dialCodeForCountry(country);
    phoneInput.placeholder = `${dial} 555 123 4567`;

    const current = (phoneInput.value || "").trim();
    if (!current) {
      phoneInput.value = `${dial} `;
      return;
    }

    if (/^\+\d/.test(current)) {
      phoneInput.value = current.replace(/^\+\d{1,3}\s*/, `${dial} `);
      return;
    }

    if (!current.startsWith(dial)) {
      phoneInput.value = `${dial} ${current}`;
    }
  };

  countrySelect.addEventListener("change", applyDialCode);
  countrySelect.addEventListener("input", applyDialCode);
}

function setupContactIssuedCountryPhoneAutofill() {
  const countrySelect = document.getElementById("country-issued");
  const phoneInput = document.getElementById("phone");
  if (!countrySelect || !phoneInput) return;
  if (countrySelect.dataset.phoneAutofillBound === "1") return;

  const applyDialCode = () => {
    const country = String(countrySelect.value || "").trim();
    if (!country) return;
    const dial = dialCodeForCountry(country);
    phoneInput.placeholder = `${dial} 555 123 4567`;

    const current = (phoneInput.value || "").trim();
    if (!current) {
      phoneInput.value = `${dial} `;
      return;
    }

    if (/^\+\d/.test(current)) {
      phoneInput.value = current.replace(/^\+\d{1,4}\s*/, `${dial} `);
      return;
    }

    if (!current.startsWith(dial)) {
      phoneInput.value = `${dial} ${current}`;
    }
  };

  countrySelect.addEventListener("change", applyDialCode);
  countrySelect.addEventListener("input", applyDialCode);
  countrySelect.dataset.phoneAutofillBound = "1";
}

function localizePhone(localPhone, country) {
  return `${dialCodeForCountry(country)} ${localPhone}`;
}

function localizePhoneInText(text, country) {
  return (text || "").replace(/\+\d{1,3}\s?/, `${dialCodeForCountry(country)} `);
}

function conciergeToText(person, country) {
  return `${person.name} | ${person.email} | ${localizePhone(person.localPhone, country)}`;
}

function autoAssignConcierge(account) {
  if (!account) return null;
  return conciergeCatalog[Math.floor(Math.random() * conciergeCatalog.length)];
}

function tierProgressInfo(membership, servicesCompleted) {
  const tier = (membership || "").toLowerCase();
  if (tier.includes("owner")) {
    return { percent: 100, text: "Owner status active. Strategic dashboard controls enabled." };
  }
  if (tier.includes("non-member") || tier.includes("non member")) {
    const required = 5;
    const completed = Math.max(0, servicesCompleted || 0);
    const percent = Math.min(100, Math.round((completed / required) * 100));
    const remaining = Math.max(0, required - completed);
    return { percent, text: `${remaining} services remaining to reach Voyager Cuprum.` };
  }

  if (tier.includes("noir")) {
    return { percent: 100, text: "Voyager Red is invitation-only. Profile is ready for executive review eligibility." };
  }

  const thresholds = [
    { name: "Voyager Cuprum", required: 5 },
    { name: "Voyager Argentum", required: 12 },
    { name: "Voyager Aurum", required: 20 },
    { name: "Voyager Platinum", required: 33 },
    { name: "Voyager Diamante", required: 45 },
    { name: "Voyager Noir", required: 60 }
  ];

  const currentIndex = Math.max(0, thresholds.findIndex((item) => tier.includes(item.name.split(" ")[1].toLowerCase())));
  const current = thresholds[currentIndex];
  const next = thresholds[Math.min(currentIndex + 1, thresholds.length - 1)];

  if (!current || !next || current.name === next.name) {
    return { percent: 100, text: "Current tier is at the highest progression level." };
  }

  const segmentCompleted = Math.max(0, servicesCompleted - current.required);
  const segmentTotal = Math.max(1, next.required - current.required);
  const percent = Math.min(100, Math.round((segmentCompleted / segmentTotal) * 100));
  const remaining = Math.max(0, next.required - servicesCompleted);

  return { percent, text: `${remaining} services remaining to reach ${next.name}.` };
}

function updateAuthCta() {
  if (!authCta) return;
  if (isWebsiteShutdownActive()) {
    authCta.textContent = "Account";
    authCta.setAttribute("href", "#account");
    authCta.setAttribute("data-route", "account");
    updateAmbassadorAccess();
    updateVoyagerControlAccess();
    return;
  }
  if (activeAccount) {
    authCta.textContent = "Account";
    authCta.setAttribute("href", "#profile");
    authCta.setAttribute("data-route", "profile");
  } else {
    authCta.textContent = "Log In / Sign Up";
    authCta.setAttribute("href", "#account");
    authCta.setAttribute("data-route", "account");
  }
  updateAmbassadorAccess();
  updateVoyagerControlAccess();
}

function clearActiveSession() {
  try {
    localStorage.removeItem(SESSION_EMAIL_KEY);
    localStorage.removeItem(SESSION_ACCOUNT_SNAPSHOT_KEY);
  } catch (_) {}
}

function persistActiveSession(account) {
  if (!account || !account.email) {
    clearActiveSession();
    return;
  }
  try {
    localStorage.setItem(SESSION_EMAIL_KEY, String(account.email).trim().toLowerCase());
    localStorage.setItem(SESSION_ACCOUNT_SNAPSHOT_KEY, JSON.stringify(account));
  } catch (_) {}
}

function clearSunriseSession() {
  try {
    localStorage.removeItem(SUNRISE_SESSION_KEY);
  } catch (_) {}
}

function resolveSunriseOwnerCode(account) {
  const email = String(account?.email || "").trim().toLowerCase();
  if (SUNRISE_OWNER_CODES[email]) return SUNRISE_OWNER_CODES[email];
  const first = String(account?.firstName || "").trim().toLowerCase();
  if (first === "aleks") return "AO1";
  if (first === "mikhail") return "MO1";
  return "OWN";
}

function generateGenericNotosSessionId() {
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const digits = String(Math.floor(1000 + Math.random() * 9000));
  return `NTS-${digits}${letter}`;
}

function formatUtcTimestamp(date = new Date()) {
  const d = date instanceof Date ? date : new Date();
  return d.toISOString().replace("T", " ").slice(0, 19) + " UTC";
}

function getLcsSessionMetaById(sessionId) {
  if (!sunriseControlState || !sessionId) return null;
  const list = Array.isArray(sunriseControlState.lcsSessions) ? sunriseControlState.lcsSessions : [];
  const idx = list.findIndex((row) => String(row.id || "") === String(sessionId));
  if (idx < 0) return null;
  return { idx, row: list[idx] };
}

function ensureSessionPathTimeline(row) {
  if (!Array.isArray(row.pathTimeline)) row.pathTimeline = [];
  return row.pathTimeline;
}

function updateNotosSessionDuration(row) {
  const loginTs = Number(row?.loginTs || 0);
  if (!loginTs) return;
  const endTs = row?.logoutTs ? Number(row.logoutTs) : Date.now();
  const diffMs = Math.max(0, endTs - loginTs);
  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  row.session = `${String(hours).padStart(2, "0")}hr:${String(minutes).padStart(2, "0")}min:${String(seconds).padStart(2, "0")}sec`;
}

function buildPathPreview(pathTimeline = []) {
  if (!Array.isArray(pathTimeline) || !pathTimeline.length) return "";
  return pathTimeline
    .slice(-8)
    .map((entry) => `${entry.route} @ ${entry.at}`)
    .join(" | ");
}

function appendSunrisePathTrace(route) {
  if (!sunriseState.unlocked || !sunriseState.sessionId || !route) return;
  const isSunriseRoute = route === "sunrise" || sunriseModuleRoutes.includes(route);
  if (!isSunriseRoute) return;
  const meta = getLcsSessionMetaById(sunriseState.sessionId);
  if (!meta) return;
  const timeline = ensureSessionPathTimeline(meta.row);
  const now = formatUtcTimestamp(new Date());
  const last = timeline[timeline.length - 1];
  if (last && last.route === route && last.at === now) return;
  timeline.push({ route, at: now });
  meta.row.path = buildPathPreview(timeline);
  updateNotosSessionDuration(meta.row);
  saveSunriseControlState();
  if (currentVisibleRoute() === "sunrise-lcs") renderLCSPage();
}

function startNotosSession(account) {
  if (!sunriseControlState || !account) return;
  const now = new Date();
  const operatorCode = resolveSunriseOwnerCode(account);
  const sessionId = operatorCode === "AO1"
    ? "NTS-A01"
    : (operatorCode === "MO1" ? "NTS-M01" : generateGenericNotosSessionId());
  sunriseState.sessionId = sessionId;
  sunriseState.operatorCode = operatorCode;
  const loginStamp = formatUtcTimestamp(now);
  const row = {
    id: sessionId,
    code: operatorCode,
    employee: "Notos EA (Executive Admin)",
    loginAt: loginStamp,
    logoutAt: "Active",
    loginTs: now.getTime(),
    logoutTs: 0,
    session: "00hr:00min:00sec",
    path: "",
    pathTimeline: [],
    permission: "Owner"
  };
  const list = Array.isArray(sunriseControlState.lcsSessions) ? sunriseControlState.lcsSessions : [];
  const existingIdx = list.findIndex((item) => String(item.id || "") === sessionId);
  if (existingIdx >= 0) list.splice(existingIdx, 1);
  sunriseControlState.lcsSessions = list;
  sunriseControlState.lcsSessions.unshift(row);
  appendSunrisePathTrace("sunrise");
}

function closeNotosSession() {
  if (!sunriseControlState || !sunriseState.sessionId) return;
  const meta = getLcsSessionMetaById(sunriseState.sessionId);
  if (!meta) return;
  const now = new Date();
  meta.row.logoutAt = formatUtcTimestamp(now);
  meta.row.logoutTs = now.getTime();
  updateNotosSessionDuration(meta.row);
  saveSunriseControlState();
}

function persistSunriseSession(account) {
  if (!account || !isSunriseCredentialAccount(account)) {
    clearSunriseSession();
    return;
  }
  try {
    localStorage.setItem(SUNRISE_SESSION_KEY, JSON.stringify({
      unlocked: true,
      email: String(account.email || "").trim().toLowerCase(),
      sessionId: String(sunriseState.sessionId || ""),
      operatorCode: String(resolveSunriseOwnerCode(account) || "")
    }));
  } catch (_) {}
}

function restoreSunriseSession(account) {
  if (!account || !isSunriseCredentialAccount(account)) {
    clearSunriseSession();
    return;
  }
  try {
    const raw = localStorage.getItem(SUNRISE_SESSION_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    const savedEmail = String(parsed && parsed.email ? parsed.email : "").trim().toLowerCase();
    const accountEmail = String(account.email || "").trim().toLowerCase();
    const unlocked = !!(parsed && parsed.unlocked);
    if (!savedEmail || savedEmail !== accountEmail || !unlocked) {
      clearSunriseSession();
      return;
    }
    sunriseState.unlocked = true;
    sunriseState.email = accountEmail;
    sunriseState.account = account;
    sunriseState.code = "";
    sunriseState.sessionId = String(parsed?.sessionId || "");
    sunriseState.operatorCode = String(parsed?.operatorCode || resolveSunriseOwnerCode(account));
    if (sunriseControlState && (!sunriseState.sessionId || !getLcsSessionMetaById(sunriseState.sessionId))) {
      startNotosSession(account);
      persistSunriseSession(account);
    }
    updateSunriseAccessView();
  } catch (_) {
    clearSunriseSession();
  }
}

function restoreActiveSession() {
  try {
    const savedEmail = (localStorage.getItem(SESSION_EMAIL_KEY) || "").trim().toLowerCase();
    if (!savedEmail) return;

    let account = findAccountByEmail(savedEmail);
    if (!account) {
      const snapshotRaw = localStorage.getItem(SESSION_ACCOUNT_SNAPSHOT_KEY);
      if (snapshotRaw) {
        const snapshot = JSON.parse(snapshotRaw);
        if (snapshot && snapshot.email && String(snapshot.email).trim().toLowerCase() === savedEmail) {
          accounts[savedEmail] = snapshot;
          account = accounts[savedEmail];
        }
      }
    }

    if (!account) {
      clearActiveSession();
      return;
    }

    activeAccount = account;
    renderProfile(account);
    restoreSunriseSession(account);
  } catch (_) {
    clearActiveSession();
  }
}

function ensureSunriseSessionRecord() {
  if (!sunriseControlState || !sunriseState.unlocked || !sunriseState.account) return;
  if (!sunriseState.sessionId || !getLcsSessionMetaById(sunriseState.sessionId)) {
    startNotosSession(sunriseState.account);
    persistSunriseSession(sunriseState.account);
  }
}

function updateAmbassadorAccess() {
  const navAmbassador = document.getElementById("nav-ambassador");
  const isRed = !!(activeAccount && String(activeAccount.membership || "").toLowerCase() === "voyager red");
  if (navAmbassador) navAmbassador.hidden = !isRed;
}

function isVoyagerControlUser(account) {
  if (!account) return false;
  const email = String(account.email || "").trim().toLowerCase();
  const first = String(account.firstName || "").trim().toLowerCase();
  const last = String(account.lastName || "").trim().toLowerCase();
  const isOwner = String(account.membership || "").trim().toLowerCase() === "owner";
  if (!isOwner) return false;
  if (["aleks.totev@vvs.com", "mikhail.kovalev@vvs.com", "ceo@vvs.com", "coo@vvs.com"].includes(email)) return true;
  return (first === "aleks" && last === "totev") || (first === "mikhail" && last === "kovalev");
}

function isOwnerAccount(account) {
  return !!(account && String(account.membership || "").trim().toLowerCase() === "owner");
}

function updateVoyagerControlAccess() {
  const navControl = document.getElementById("nav-voyager-control");
  if (navControl) navControl.hidden = !isVoyagerControlUser(activeAccount);
}

function dayPartGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 22) return "Good Evening";
  return "Good Night";
}

function accountHourInTimeZone(account) {
  let zone = "";
  const code = resolveCountryCode(account && account.country ? account.country : "");
  if (code) {
    zone = remoteCountryTimeZonesByIso[code] || countryPrimaryTimeZoneByIso[code] || "";
  }
  if (!zone) {
    zone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  }

  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      hour12: false,
      timeZone: zone || undefined
    }).formatToParts(new Date());
    const hourPart = parts.find((part) => part.type === "hour");
    const hour = Number(hourPart ? hourPart.value : NaN);
    if (Number.isFinite(hour)) return hour;
  } catch (_err) {
    // Fall back to device-local time.
  }
  return new Date().getHours();
}

function dayPartGreetingForAccount(account) {
  const hour = accountHourInTimeZone(account);
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 22) return "Good Evening";
  return "Good Night";
}

function renderAmbassadorLounge(account) {
  if (!account || String(account.membership || "").toLowerCase() !== "voyager red") return;
  const greetingEl = document.getElementById("ambassador-greeting");
  const eventsEl = document.getElementById("ambassador-events");
  const offersEl = document.getElementById("ambassador-offers");
  const detailsEl = document.getElementById("ambassador-event-details");
  const ceoEl = document.getElementById("ambassador-ceo-note");
  const moneyEl = document.getElementById("ambassador-money-saved");

  if (greetingEl) greetingEl.textContent = `${dayPartGreetingForAccount(account)}, ${account.prefix} ${account.lastName}`;

  if (eventsEl) {
    eventsEl.innerHTML = [
      "Red Circle Gala, Monaco - March 14, 2026, 20:00 (CET)",
      "Private Aviation Forum, Zurich - March 29, 2026, 11:00 (CET)",
      "Security Leadership Dinner, Dubai - April 10, 2026, 19:30 (GST)"
    ].map((item) => `<li>${item}</li>`).join("");
  }

  if (offersEl) {
    offersEl.innerHTML = [
      "Priority same-day executive dispatch window until 23:00 local time.",
      "Complimentary private terminal handling for one international departure.",
      "Extended late-night operations desk with direct Red-tier routing."
    ].map((item) => `<li>${item}</li>`).join("");
  }

  if (detailsEl) {
    detailsEl.textContent = "Red Circle Gala, Monaco: private waterfront venue access, security perimeter coordination from 18:30, fleet staging in three secure zones, and dedicated concierge command channel from first pickup through post-event return.";
  }

  if (ceoEl) {
    ceoEl.textContent = "Founders message: thank you for your continued trust in VVS and for allowing our team to support your global movements with precision and discretion. Gift of the month: a bespoke carbon-shell executive travel case with RFID-shielded document vault, encrypted luggage tracker, monogrammed leather passport folio, and a private route-briefing dossier prepared for your next trip.";
  }

  if (moneyEl) {
    const completed = Math.max(0, Number(account.servicesCompleted || 0));
    const saved = Math.round(completed * 1850);
    moneyEl.textContent = `$${saved.toLocaleString("en-US")} USD`;
  }
}

function renderVoyagerControl(account) {
  if (!isVoyagerControlUser(account)) return;

  const greetingEl = document.getElementById("voyager-control-greeting");
  const summaryEl = document.getElementById("vc-all-tiers-summary");
  const complaintsEl = document.getElementById("vc-complaints-day");
  const redPerfEl = document.getElementById("vc-red-performance");
  const redReqEl = document.getElementById("vc-red-requests");
  const kpiEl = document.getElementById("vc-tier-kpis");
  const attentionEl = document.getElementById("vc-general-attention");
  const satMap = {
    cuprum: document.getElementById("vc-sat-cuprum"),
    argentum: document.getElementById("vc-sat-argentum"),
    aurum: document.getElementById("vc-sat-aurum"),
    platinum: document.getElementById("vc-sat-platinum"),
    diamante: document.getElementById("vc-sat-diamante"),
    noir: document.getElementById("vc-sat-noir"),
    red: document.getElementById("vc-sat-red")
  };

  const profile = String(account.firstName || "").toLowerCase() === "aleks"
    ? {
      sat: { cuprum: "93.7%", argentum: "94.8%", aurum: "95.6%", platinum: "96.2%", diamante: "96.8%", noir: "97.1%", red: "98.9%" },
      summary: "Weighted all-tier satisfaction: 96.1% over the last 24h (quality trend +0.6% vs previous day).",
      complaints: [
        "12 total complaints today: 7 timing variance, 3 communication clarity, 2 partner-side facility delay.",
        "Resolved same day: 10 | In active resolution: 2 (both under operations lead supervision).",
        "Escalation trigger exceeded in 1 corridor; corrective dispatch protocol activated."
      ],
      redPerformance: "Team Red this month: 214 completed Red operations | 99.1% completion quality | Avg dispatch 4m 06s | Security incident rate 0.0%. Total spend on Voyager Red this month: $384,620 across aviation, security, concierge premium staffing, and member-special allocations.",
      redRequests: [
        "Benedict Hale - Primary requests: ultra-short notice airport security corridors, multi-leg jet + ground synchronization.",
        "Selene Marwick - Primary requests: discreet diplomatic travel handling, private venue perimeter control.",
        "Nikolai Orlov - Main complaints observed: isolated transfer wait-time spikes in two high-volume airport windows.",
        "Camille Laurent - Main requests: family executive travel bundles with custom security layering."
      ],
      kpis: [
        "Cuprum: 4.9m avg dispatch | 92.8% same-day success | 1.8% complaint ratio.",
        "Argentum: 4.6m avg dispatch | 94.1% same-day success | 1.5% complaint ratio.",
        "Aurum: 4.3m avg dispatch | 95.0% same-day success | 1.2% complaint ratio.",
        "Platinum: 4.1m avg dispatch | 96.2% same-day success | 0.9% complaint ratio.",
        "Diamante/Noir/Red combined: 3.9m avg dispatch | 98.4% same-day success | 0.4% complaint ratio."
      ],
      attention: [
        "Two high-value Noir members requested tighter timezone handoff consistency.",
        "Aurum tier shows strongest growth this week; pre-allocate concierge capacity to avoid peak-hour saturation.",
        "Monitor referral-conversion quality in Cuprum to reduce early churn risk.",
        "Maintain Red corridor readiness around Monaco, Zurich, and Dubai routes this week."
      ]
    }
    : {
      sat: { cuprum: "92.9%", argentum: "94.1%", aurum: "95.2%", platinum: "95.9%", diamante: "96.4%", noir: "96.9%", red: "98.6%" },
      summary: "Weighted all-tier satisfaction: 95.7% over the last 24h (service stability maintained across all corridors).",
      complaints: [
        "15 total complaints today: 8 timing variance, 4 route-change communication, 3 external partner delays.",
        "Resolved same day: 13 | In active resolution: 2 (both expected closed before end-of-day).",
        "No critical safety complaints registered."
      ],
      redPerformance: "Team Red this month: 207 completed Red operations | 98.7% completion quality | Avg dispatch 4m 18s | Security incident rate 0.0%. Total spend on Voyager Red this month: $369,480 across private mobility, specialist security staffing, and premium concierge execution.",
      redRequests: [
        "Nikolai Orlov - Primary requests: secure business transfer rings with dynamic route fallback.",
        "Benedict Hale - Primary requests: high-discretion executive movement with direct terminal coordination.",
        "Sofia Mendes - Main complaints observed: limited same-hour lounge slot flexibility in one corridor.",
        "Victor Ward - Primary requests: multi-country operations with consolidated daily briefing delivery."
      ],
      kpis: [
        "Cuprum: 5.1m avg dispatch | 92.1% same-day success | 2.0% complaint ratio.",
        "Argentum: 4.7m avg dispatch | 93.8% same-day success | 1.6% complaint ratio.",
        "Aurum: 4.4m avg dispatch | 94.9% same-day success | 1.3% complaint ratio.",
        "Platinum: 4.2m avg dispatch | 95.8% same-day success | 1.0% complaint ratio.",
        "Diamante/Noir/Red combined: 4.0m avg dispatch | 98.1% same-day success | 0.5% complaint ratio."
      ],
      attention: [
        "Three Platinum members requested expanded late-night operations in Asia corridors.",
        "Noir demand has increased on back-to-back long-haul schedules; keep reserve concierge coverage above 18%.",
        "One partner location requires stricter SLA enforcement after repeated transfer delays.",
        "Retain proactive review calls for Red members after every major movement sequence."
      ]
    };

  if (greetingEl) greetingEl.textContent = `${dayPartGreetingForAccount(account)}, ${account.prefix} ${account.lastName} - welcome to Voyager Satisfaction Panel`;
  if (summaryEl) summaryEl.textContent = markUsd(profile.summary);
  if (redPerfEl) redPerfEl.textContent = markUsd(profile.redPerformance);
  Object.entries(profile.sat).forEach(([key, value]) => {
    const el = satMap[key];
    if (el) el.textContent = value;
  });
  if (complaintsEl) complaintsEl.innerHTML = profile.complaints.map((item) => `<li>${markUsd(item)}</li>`).join("");
  if (redReqEl) redReqEl.innerHTML = profile.redRequests.map((item) => `<li>${markUsd(item)}</li>`).join("");
  if (kpiEl) kpiEl.innerHTML = profile.kpis.map((item) => `<li>${markUsd(item)}</li>`).join("");
  if (attentionEl) attentionEl.innerHTML = profile.attention.map((item) => `<li>${markUsd(item)}</li>`).join("");
}

function renderSunrise(account) {
  if (!isOwnerAccount(account)) return;
  const greetingEl = document.getElementById("sunrise-greeting");
  if (greetingEl) {
    greetingEl.textContent = `${dayPartGreetingForAccount(account)}, ${account.prefix} ${account.lastName} - Welcome to Sunrise, Access Level - Owner`;
  }
  updateSunriseAccessView();
}

function renderProfile(account) {
  if (!account) return;
  const displayCountry = countryDisplayName(account.country);
  const greeting = greetingPrefixByCountry(account.country);
  const greetEl = document.getElementById("profile-greeting");
  const summaryEl = document.getElementById("profile-summary");
  const tierEl = document.getElementById("profile-tier");
  const completedEl = document.getElementById("profile-services-completed");
  const pastTitleEl = document.getElementById("profile-past-title");
  const pastDetailsEl = document.getElementById("profile-past-details");
  const upcomingTitleEl = document.getElementById("profile-upcoming-title");
  const upcomingDetailsEl = document.getElementById("profile-upcoming-details");
  const redTeamWrap = document.getElementById("profile-red-team");
  const standardSupport = document.getElementById("profile-standard-support");
  const progressWrap = document.getElementById("profile-progress-wrap");
  const conciergeAutoNote = document.getElementById("profile-concierge-auto-note");
  const tipsEl = document.getElementById("profile-tips");
  const profileShell = document.getElementById("profile-shell");
  const conciergeList = document.getElementById("profile-concierge-list");
  const ownerMetricsWrap = document.getElementById("profile-owner-metrics");
  const profileStatusLabel = document.getElementById("profile-status-label");
  const conciergeDeskCard = document.getElementById("profile-concierge-desk-card");
  const tipsCard = document.getElementById("profile-tips-card");
  const ownerExecutiveTag = document.getElementById("owner-executive-tag");
  const profileAmbassadorBtn = document.getElementById("profile-ambassador-btn");
  const profileSunriseBtn = document.getElementById("profile-sunrise-btn");

  if (greetEl) greetEl.textContent = `${greeting} ${account.prefix} ${account.lastName}`;
  if (summaryEl) {
    const roleLine = account.roleTitle ? `${account.roleTitle} | ` : "";
    summaryEl.textContent = `${roleLine}${account.firstName} ${account.lastName} - ${displayCountry} - ${account.membership}.`;
  }
  if (tierEl) tierEl.textContent = account.membership;
  if (completedEl) completedEl.textContent = String(account.servicesCompleted);
  if (profileStatusLabel) profileStatusLabel.textContent = account.membership.toLowerCase() === "owner" ? "Status" : "Membership";
  if (pastTitleEl) pastTitleEl.textContent = account.pastService.title;
  if (pastDetailsEl) pastDetailsEl.textContent = `${account.pastService.details} Ended: ${account.pastService.endedAt}.`;
  if (upcomingTitleEl) upcomingTitleEl.textContent = account.upcomingService.title;
  if (upcomingDetailsEl) upcomingDetailsEl.textContent = `${account.upcomingService.details} Scheduled: ${account.upcomingService.startsAt}.`;

  if (tipsEl) {
    tipsEl.innerHTML = (account.tips || []).map((tip) => `<li>${tip}</li>`).join("");
  }

  if (profileShell) {
    profileShell.classList.remove(
      "tier-theme-base",
      "tier-theme-owner",
      "tier-theme-red",
      "tier-theme-noir",
      "tier-theme-diamante",
      "tier-theme-platinum",
      "tier-theme-aurum",
      "tier-theme-argentum",
      "tier-theme-cuprum",
      "tier-theme-gold"
    );
    profileShell.classList.add(tierThemeClass(account.membership));
  }

  const isRed = account.membership.toLowerCase() === "voyager red";
  const isOwner = account.membership.toLowerCase() === "owner";
  if (profileAmbassadorBtn) profileAmbassadorBtn.hidden = !isRed;
  if (profileSunriseBtn) profileSunriseBtn.hidden = !isOwner;
  if (ownerExecutiveTag) ownerExecutiveTag.hidden = !isOwner;
  if (ownerMetricsWrap) ownerMetricsWrap.hidden = !isOwner;
  if (conciergeDeskCard) conciergeDeskCard.hidden = isOwner;
  if (tipsCard) tipsCard.hidden = isOwner;
  if (redTeamWrap) redTeamWrap.hidden = !isRed;
  if (standardSupport) standardSupport.hidden = isRed || isOwner;
  if (progressWrap) progressWrap.hidden = isRed || isOwner;

  if (isOwner && account.ownerMetrics) {
    const m = account.ownerMetrics;
    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };
    setText("owner-services-completed-24h", String(m.servicesCompleted24h));
    setText("owner-client-reviews-24h", m.clientReviews24h);
    setText("owner-revenue-24h", `${markUsd(m.revenueBrut24h)} / ${markUsd(m.revenueNet24h)}`);
    setText("owner-expenses-24h", markUsd(m.expenses24h));
    setText("owner-money-flow-24h", `To Earn: ${markUsd(m.moneyToBeEarned)} | To Pay: ${markUsd(m.moneyToBePaid)}`);
    setText("owner-overtime-24h", m.conciergeOvertimeHours24h);
    setText("owner-goal-today", m.goalOfDay);
    setText("owner-satisfaction-rate", m.satisfactionRate);

    const perfList = document.getElementById("owner-top-performance");
    const selectedList = document.getElementById("owner-top-selected");
    if (perfList) perfList.innerHTML = (m.topPerformance || []).map((item) => `<li>${item}</li>`).join("");
    if (selectedList) selectedList.innerHTML = (m.topSelected || []).map((item) => `<li>${item}</li>`).join("");
  }

  if (isRed && account.assignedTeam) {
    const pilot = document.getElementById("team-pilot");
    const driver = document.getElementById("team-driver");
    const concierge = document.getElementById("team-concierge");
    const security = document.getElementById("team-security");
    if (pilot) pilot.textContent = localizePhoneInText(account.assignedTeam.pilot, account.country);
    if (driver) driver.textContent = localizePhoneInText(account.assignedTeam.driver, account.country);
    if (concierge) concierge.textContent = localizePhoneInText(account.assignedTeam.concierge, account.country);
    if (security) security.textContent = localizePhoneInText(account.assignedTeam.security, account.country);
    currentAssignedConcierge = null;
  } else {
    const lastCons = document.getElementById("profile-last-concierge");
    const progressFill = document.getElementById("profile-progress-fill");
    const progressText = document.getElementById("profile-progress-text");
    const isNewAccount = (account.servicesCompleted || 0) <= 0;
    if (isNewAccount) {
      currentAssignedConcierge = null;
      if (lastCons) lastCons.textContent = "No concierges were assigned to your services yet, let's find the first one!";
      if (conciergeAutoNote) conciergeAutoNote.textContent = "Submit your first request and VVS dispatch will assign the right concierge instantly.";
    } else {
      const assignedConcierge = autoAssignConcierge(account);
      currentAssignedConcierge = assignedConcierge;
      if (lastCons && assignedConcierge) lastCons.textContent = conciergeToText(assignedConcierge, account.country);
      if (conciergeAutoNote && assignedConcierge) {
        conciergeAutoNote.textContent = `Automatically assigned today: ${assignedConcierge.role} (${assignedConcierge.id.toUpperCase()}) by VVS dispatch engine.`;
      }
    }
    const progress = tierProgressInfo(account.membership, account.servicesCompleted);
    if (progressFill) progressFill.style.width = `${progress.percent}%`;
    if (progressText) progressText.textContent = progress.text;
  }

  if (conciergeList) {
    const desk = randomConciergeDesk(8);
    conciergeList.innerHTML = desk.map((person) => (
      `<div class="teamItem"><b>${person.role}</b><span>${person.name}<br>${person.email}<br>${localizePhone(person.localPhone, account.country)}</span></div>`
    )).join("");
  }
  renderAmbassadorLounge(account);
  renderVoyagerControl(account);
  renderSunrise(account);
  refreshActiveLanguageIfNeeded();
}

authTabs.forEach((tab) => {
  tab.addEventListener("click", () => activateAuthTab(tab.getAttribute("data-auth-tab")));
});

document.querySelectorAll("[data-open-password-tab]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const mode = String(btn.getAttribute("data-password-mode") || "change").trim().toLowerCase();
    activateAuthTab(mode === "recovery" ? "password-recovery" : "password");
  });
});

if (loginStep1) {
  loginStep1.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!loginStep1.reportValidity()) return;

    const email = document.getElementById("login-email");
    const password = document.getElementById("login-password");
    authState.loginEmail = email ? email.value.trim() : "";
    const account = findAccountByEmail(authState.loginEmail);
    const enteredPassword = password ? password.value.trim() : "";
    const allPasswords = account
      ? [String(account.password), ...((account.altPasswords || []).map((item) => String(item)))]
      : [];
    const passOk = account && allPasswords.some((stored) =>
      enteredPassword === stored || enteredPassword.toLowerCase() === stored.toLowerCase()
    );

    if (!account || !passOk) {
      if (loginInfo) loginInfo.textContent = "Log in failed. Check your email address or password.";
      return;
    }
    if (isWebsiteShutdownActive() && !isOwnerAccount(account)) {
      if (loginInfo) loginInfo.textContent = "Website is temporarily unavailable. Only owner login is permitted at this time.";
      return;
    }

    authState.loginAccount = account;
    authState.loginCode = issueTestEmailCode(authState.loginEmail);

    loginStep1.hidden = true;
    if (loginStep2) loginStep2.hidden = false;
    if (loginInfo) {
      loginInfo.textContent = `VVS email confirmation sent from concierge@venture-voyagers.com to ${authState.loginEmail} (Subject: VVS email confirmation). Test code: ${authState.loginCode}.`;
    }
  });
}

if (loginStep2) {
  loginStep2.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!loginStep2.reportValidity()) return;

    const phrase = document.getElementById("login-phrase");
    const code = document.getElementById("login-code");
    const account = authState.loginAccount || findAccountByEmail(authState.loginEmail);
    const phraseOk = phrase && account && phrase.value.trim().toLowerCase() === account.secretPhrase.toLowerCase();
    const codeOk = code && code.value.trim() === authState.loginCode;

    if (!phraseOk || !codeOk) {
      if (loginInfo) loginInfo.textContent = "Verification failed. Confirm your secret phrase and enter the correct email confirmation code.";
      return;
    }

    activeAccount = account;
    persistActiveSession(activeAccount);
    renderProfile(account);
    updateAuthCta();
    if (loginInfo) loginInfo.textContent = "Verification successful. Redirecting to your account.";
    loginStep2.reset();
    showRoute("profile");
  });
}

if (signupStep1) {
  signupStep1.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!signupStep1.reportValidity()) return;
    if (isWebsiteShutdownActive()) {
      if (signupInfo) signupInfo.textContent = "Sign up is temporarily unavailable while website shutdown mode is active.";
      return;
    }

    const email = document.getElementById("signup-email");
    const title = document.getElementById("signup-title");
    const first = document.getElementById("signup-first");
    const last = document.getElementById("signup-last");
    const country = document.getElementById("signup-country");
    const phone = document.getElementById("signup-phone");
    const password = document.getElementById("signup-password");
    const phrase = document.getElementById("signup-phrase");

    if (!isValidSignupPassword(password ? password.value : "")) {
      if (signupInfo) signupInfo.textContent = "Password must be at least 12 characters and include 2 capital letters, 2 numbers, and 2 special symbols.";
      return;
    }

    authState.signupEmail = email ? email.value.trim() : "";
    if (accounts[authState.signupEmail.toLowerCase()]) {
      if (signupInfo) signupInfo.textContent = "An account with this email already exists. Please log in.";
      return;
    }

    accounts[authState.signupEmail.toLowerCase()] = {
      email: authState.signupEmail,
      password: password ? password.value : "",
      secretPhrase: phrase ? phrase.value.trim() : "",
      prefix: title && title.value.trim() ? title.value.trim() : "Mr.",
      firstName: first ? first.value.trim() : "Client",
      lastName: last ? last.value.trim() : "Member",
      country: countryDisplayName(country ? country.value.trim() : "Unknown"),
      membership: "Non-Member",
      servicesCompleted: 0,
      phone: phone ? phone.value.trim() : "",
      pastService: {
        title: "No completed service yet",
        details: "No previous service records available.",
        endedAt: "N/A"
      },
      upcomingService: {
        title: "No upcoming service yet",
        details: "Book your first VVS service to start your schedule.",
        startsAt: "N/A"
      },
      tips: [
        "Share exact timing and location details early to improve execution speed.",
        "Keep one backup contact method active while traveling.",
        "Use verified transport and avoid posting live itinerary information."
      ]
    };
    authState.signupCode = issueTestEmailCode(authState.signupEmail);

    signupStep1.hidden = true;
    if (signupStep2) signupStep2.hidden = false;
    if (signupInfo) {
      signupInfo.textContent = `VVS email confirmation sent from concierge@venture-voyagers.com to ${authState.signupEmail} (Subject: VVS email confirmation). Test code: ${authState.signupCode}.`;
    }
  });
}

if (signupStep2) {
  signupStep2.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!signupStep2.reportValidity()) return;

    const code = document.getElementById("signup-code");
    const codeOk = code && code.value.trim() === authState.signupCode;
    if (!codeOk) {
      if (signupInfo) signupInfo.textContent = "Confirmation failed. Enter the correct email confirmation code.";
      return;
    }

    if (signupInfo) signupInfo.textContent = "Account created and verified successfully.";
    activeAccount = accounts[authState.signupEmail.toLowerCase()];
    if (activeAccount) {
      activeAccount.country = countryDisplayName(activeAccount.country);
      if ((activeAccount.servicesCompleted || 0) < 5) activeAccount.membership = "Non-Member";
      else if (!activeAccount.membership || activeAccount.membership.toLowerCase().includes("non-member")) activeAccount.membership = "Voyager Cuprum";
      if ((activeAccount.servicesCompleted || 0) < 0) activeAccount.servicesCompleted = 0;
    }
    renderProfile(activeAccount);
    updateAuthCta();
    persistActiveSession(activeAccount);
    signupStep2.reset();
    showRoute("profile");
  });
}

if (pwOldForm) {
  pwOldForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!pwOldForm.reportValidity()) return;

    const email = (document.getElementById("pw-old-email")?.value || "").trim();
    const oldPassword = (document.getElementById("pw-old-password")?.value || "").trim();
    const newPassword = (document.getElementById("pw-old-new")?.value || "").trim();
    const confirmPassword = (document.getElementById("pw-old-confirm")?.value || "").trim();

    const account = findAccountByEmail(email);
    if (!account) {
      if (passwordInfo) passwordInfo.textContent = "Account not found for this email address.";
      return;
    }

    const allPasswords = [String(account.password), ...((account.altPasswords || []).map((item) => String(item)))];
    const oldOk = allPasswords.some((stored) => oldPassword === stored || oldPassword.toLowerCase() === stored.toLowerCase());
    if (!oldOk) {
      if (passwordInfo) passwordInfo.textContent = "Current password is incorrect.";
      return;
    }
    if (newPassword !== confirmPassword) {
      if (passwordInfo) passwordInfo.textContent = "New password and confirmation do not match.";
      return;
    }
    if (!isValidSignupPassword(newPassword)) {
      if (passwordInfo) passwordInfo.textContent = "New password must be at least 12 characters with 2 capital letters, 2 numbers, and 2 special symbols.";
      return;
    }

    account.password = newPassword;
    account.altPasswords = [];
    if (activeAccount && String(activeAccount.email || "").trim().toLowerCase() === String(account.email || "").trim().toLowerCase()) {
      activeAccount.password = newPassword;
      activeAccount.altPasswords = [];
      persistActiveSession(activeAccount);
    }
    if (passwordInfo) passwordInfo.textContent = "Password updated successfully.";
    pwOldForm.reset();
  });
}

if (pwRecoveryStep1) {
  pwRecoveryStep1.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!pwRecoveryStep1.reportValidity()) return;

    const email = (document.getElementById("pw-rec-email")?.value || "").trim();
    const phrase = (document.getElementById("pw-rec-phrase")?.value || "").trim().toLowerCase();
    const selectedTier = normalizeMembershipTier(document.getElementById("pw-rec-tier")?.value || "");
    const account = findAccountByEmail(email);
    if (!account) {
      if (passwordRecoveryInfo) passwordRecoveryInfo.textContent = "Account not found for this email address.";
      return;
    }
    const phraseOk = phrase === String(account.secretPhrase || "").toLowerCase();
    if (!phraseOk) {
      if (passwordRecoveryInfo) passwordRecoveryInfo.textContent = "Secret phrase is incorrect.";
      return;
    }
    const accountTier = normalizeMembershipTier(account.membership || "");
    if (!selectedTier || selectedTier !== accountTier) {
      if (passwordRecoveryInfo) passwordRecoveryInfo.textContent = "Selected membership tier does not match this account.";
      return;
    }

    passwordResetState.email = String(account.email || email).trim().toLowerCase();
    passwordResetState.account = account;
    passwordResetState.code = issueTestEmailCode(passwordResetState.email);
    if (pwRecoveryStep2) {
      pwRecoveryStep2.hidden = true;
      pwRecoveryStep2.reset();
    }
    if (passwordRecoveryInfo) passwordRecoveryInfo.textContent = `Recovery code sent to ${passwordResetState.email}. Test code: ${passwordResetState.code}.`;
  });
}

if (pwRecoveryStep2) {
  pwRecoveryStep2.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!pwRecoveryStep2.reportValidity()) return;

    const code = (document.getElementById("pw-rec-code")?.value || "").trim();
    const newPassword = (document.getElementById("pw-rec-new")?.value || "").trim();
    const confirmPassword = (document.getElementById("pw-rec-confirm")?.value || "").trim();
    const account = passwordResetState.account || findAccountByEmail(passwordResetState.email);

    if (!account) {
      if (passwordInfo) passwordInfo.textContent = "Password recovery session expired. Start again.";
      return;
    }
    if (code !== passwordResetState.code) {
      if (passwordInfo) passwordInfo.textContent = "Verification code is incorrect.";
      return;
    }
    if (newPassword !== confirmPassword) {
      if (passwordInfo) passwordInfo.textContent = "New password and confirmation do not match.";
      return;
    }
    if (!isValidSignupPassword(newPassword)) {
      if (passwordInfo) passwordInfo.textContent = "New password must be at least 12 characters with 2 capital letters, 2 numbers, and 2 special symbols.";
      return;
    }

    account.password = newPassword;
    account.altPasswords = [];
    if (activeAccount && String(activeAccount.email || "").trim().toLowerCase() === String(account.email || "").trim().toLowerCase()) {
      activeAccount.password = newPassword;
      activeAccount.altPasswords = [];
      persistActiveSession(activeAccount);
    }
    if (passwordInfo) passwordInfo.textContent = "Password updated successfully through email + secret phrase.";
    pwRecoveryStep2.reset();
    pwRecoveryStep2.hidden = true;
    pwRecoveryStep1.hidden = false;
    pwRecoveryStep1.reset();
    passwordResetState.email = "";
    passwordResetState.code = "";
    passwordResetState.account = null;
  });
}

const sameConciergeBtn = document.getElementById("same-concierge-btn");
const sameConciergeResult = document.getElementById("same-concierge-result");
const sunriseStep1 = document.getElementById("sunrise-step1");
const sunriseStep2 = document.getElementById("sunrise-step2");
const sunriseInfo = document.getElementById("sunrise-info");
const sunriseLogoutBtn = document.getElementById("sunrise-logout-btn");
const sunriseRouteLogoutBtns = Array.from(document.querySelectorAll("[data-sunrise-logout]"));
const logoutBtn = document.getElementById("logout-btn");

const sunriseControlDefaults = {
  dtsDocs: [
    { id: "DOC-001", name: "Client NDA Pack", note: "Signed PDF required", status: "Pending" }
  ],
  eamExpenses: [
    { id: "OPS", name: "Operations", amount: 145000 },
    { id: "SEC", name: "Security", amount: 98000 },
    { id: "TRV", name: "Travel", amount: 121500 }
  ],
  ifsIncome: [
    { id: "RET", name: "Retained Earnings", amount: 240000 },
    { id: "REI", name: "Reinvestment", amount: 125000 },
    { id: "RES", name: "Emergency Reserve", amount: 88000 }
  ],
  smca: [
    { id: "SM-101", name: "Luca Ferri", role: "Sales", position: "Senior Sales Executive", commission: 6.5 },
    { id: "SM-102", name: "Selena Marwick", role: "Marketing", position: "Growth Marketing Lead", commission: 4.2 }
  ],
  ecsEmployees: [
    { id: "EMP-101", name: "Camille Mendes", role: "Concierge", position: "Lead Concierge", salary: 12500, hours: 176, bonus: 1200, commission: 4.5, status: "Active", email: "camille.mendes@venture-voyagers.com", login: "camille.mendes", permission: "Tier-3" }
  ],
  rimInvites: [
    { id: "RIM-001", name: "Prospect One", email: "prospect.one@example.com", country: "UAE", team: "Aquila Team", status: "Draft" }
  ],
  socServices: {
    current: [
      {
        id: "A1203456",
        title: "Airport Security Corridor",
        client: "Client Alpha",
        tier: "Voyager Aurum",
        desiredExecutionTime: "24h",
        description: "Primary route security and terminal transfer.",
        assigned: "Benedict Hale",
        assignedAt: "2026-02-21 08:35 UTC",
        confirmedAt: "2026-02-21 08:12 UTC",
        status: "Assigned",
        stage: "Current",
        budget: 18000,
        steps: [
          { id: "S1", action: "Initial intake validated", details: "Client profile and scope verified by control desk.", status: "Done" },
          { id: "S2", action: "Risk route review", details: "Entry/exit lanes and fallback corridors approved.", status: "Done" },
          { id: "S3", action: "Team assignment", details: "Lead security concierge and route unit assigned.", status: "In Progress" },
          { id: "S4", action: "Execution handoff", details: "Departure pack and timing confirmation to client.", status: "Pending" }
        ]
      }
    ],
    past: [],
    deleted: []
  },
  lcsSessions: [
    {
      id: "NTS-4821Q",
      code: "OPS1",
      employee: "Camille Mendes",
      loginAt: "2026-02-21 08:04:00 UTC",
      logoutAt: "2026-02-21 18:14:00 UTC",
      loginTs: 0,
      logoutTs: 0,
      session: "10hr:10min:00sec",
      path: "sunrise-services @ 2026-02-21 08:15:00 UTC | sunrise-soc @ 2026-02-21 09:02:00 UTC",
      pathTimeline: [
        { route: "sunrise-services", at: "2026-02-21 08:15:00 UTC" },
        { route: "sunrise-soc", at: "2026-02-21 09:02:00 UTC" }
      ],
      permission: "Tier-3"
    }
  ],
  inbox: {
    activeFolder: "inbox",
    selectedMessageId: "",
    composeOpen: false,
    lastInfo: "",
    customFolders: ["VIP Clients", "Partners"],
    defaultSignatureId: "SIG-001",
    signatures: [
      {
        id: "SIG-001",
        name: "Operations Formal",
        text: "Regards,\nVVS Sunrise Operations\nconcierge@venture-voyagers.com",
        imageName: ""
      }
    ],
    messages: [
      {
        id: "MAIL-1001",
        folder: "inbox",
        from: "legal.ops@venture-voyagers.com",
        to: "owner@venture-voyagers.com",
        cc: "",
        bcc: "",
        subject: "Daily legal review queue",
        bodyHtml: "<p>Please review the 5 priority files before 16:00 UTC.</p>",
        priority: "High",
        scheduledAt: "",
        createdAt: "2026-02-21 08:20 UTC",
        attachments: []
      },
      {
        id: "MAIL-1002",
        folder: "sent",
        from: "owner@venture-voyagers.com",
        to: "fleet.control@venture-voyagers.com",
        cc: "ops@venture-voyagers.com",
        bcc: "",
        subject: "Fleet readiness check",
        bodyHtml: "<p>Confirm all pre-departure checks are completed.</p>",
        priority: "Normal",
        scheduledAt: "",
        createdAt: "2026-02-20 19:10 UTC",
        attachments: ["fleet-report.pdf"]
      }
    ]
  },
  socSelectedServiceId: ""
};

let sunriseControlState = null;

function cloneDefaultSunriseControlState() {
  return JSON.parse(JSON.stringify(sunriseControlDefaults));
}

function loadSunriseControlState() {
  const fallback = cloneDefaultSunriseControlState();
  try {
    const raw = localStorage.getItem(SUNRISE_CONTROL_DATA_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return fallback;
    const ecsEmployees = Array.isArray(parsed.ecsEmployees)
      ? parsed.ecsEmployees.map((row) => ({
          ...row,
          role: String(row?.role || "Concierge"),
          position: String(row?.position || row?.role || "Concierge Associate")
        }))
      : fallback.ecsEmployees;
    const normalizeSocService = (row = {}) => {
      const steps = Array.isArray(row.steps) && row.steps.length
        ? row.steps.map((step, index) => ({
            id: String(step?.id || `S${index + 1}`),
            action: String(step?.action || ""),
            details: String(step?.details || ""),
            status: String(step?.status || "Pending")
          }))
        : [
            { id: "S1", action: "Intake review", details: "Scope and client profile validation.", status: "Pending" },
            { id: "S2", action: "Execution planning", details: "Resource planning and route schedule.", status: "Pending" },
            { id: "S3", action: "Service delivery", details: "Live execution and control monitoring.", status: "Pending" },
            { id: "S4", action: "Closure", details: "Service closeout and quality confirmation.", status: "Pending" }
          ];
      return {
        ...row,
        tier: String(row?.tier || "Non-Member"),
        desiredExecutionTime: String(row?.desiredExecutionTime || "24h"),
        assignedAt: String(row?.assignedAt || ""),
        confirmedAt: String(row?.confirmedAt || ""),
        description: String(row?.description || ""),
        steps
      };
    };
    const parsedSoc = parsed.socServices || {};
    const socServices = {
      ...fallback.socServices,
      ...parsedSoc,
      current: (Array.isArray(parsedSoc.current) ? parsedSoc.current : fallback.socServices.current).map(normalizeSocService),
      past: (Array.isArray(parsedSoc.past) ? parsedSoc.past : fallback.socServices.past).map(normalizeSocService),
      deleted: (Array.isArray(parsedSoc.deleted) ? parsedSoc.deleted : fallback.socServices.deleted).map(normalizeSocService)
    };
    const parsedInbox = parsed.inbox || {};
    const parsedLcs = Array.isArray(parsed.lcsSessions) ? parsed.lcsSessions : fallback.lcsSessions;
    const lcsSessions = parsedLcs.map((row, idx) => {
      const timeline = Array.isArray(row?.pathTimeline)
        ? row.pathTimeline.map((entry) => ({
            route: String(entry?.route || ""),
            at: String(entry?.at || "")
          })).filter((entry) => entry.route)
        : [];
      const code = String(row?.code || row?.operatorCode || "OPS1");
      const isOwnerSession = String(row?.permission || "").toLowerCase() === "owner";
      const normalizedOwnerId = code === "AO1" ? "NTS-A01" : (code === "MO1" ? "NTS-M01" : "");
      return {
        id: String(normalizedOwnerId || row?.id || generateGenericNotosSessionId()),
        code,
        employee: isOwnerSession ? "Notos EA (Executive Admin)" : String(row?.employee || "Unknown User"),
        loginAt: String(row?.loginAt || ""),
        logoutAt: String(row?.logoutAt || ""),
        loginTs: Number(row?.loginTs || 0),
        logoutTs: Number(row?.logoutTs || 0),
        session: String(row?.session || "00hr:00min:00sec"),
        path: String(row?.path || buildPathPreview(timeline)),
        pathTimeline: timeline,
        permission: String(row?.permission || "Tier-1")
      };
    });
    const inbox = {
      ...fallback.inbox,
      ...parsedInbox,
      selectedMessageId: String(parsedInbox.selectedMessageId || ""),
      composeOpen: !!parsedInbox.composeOpen,
      lastInfo: String(parsedInbox.lastInfo || ""),
      customFolders: Array.isArray(parsedInbox.customFolders) ? parsedInbox.customFolders : fallback.inbox.customFolders,
      signatures: Array.isArray(parsedInbox.signatures) && parsedInbox.signatures.length
        ? parsedInbox.signatures.map((sig, idx) => ({
            id: String(sig?.id || `SIG-${String(idx + 1).padStart(3, "0")}`),
            name: String(sig?.name || `Signature ${idx + 1}`),
            text: String(sig?.text || sig?.html || ""),
            imageName: String(sig?.imageName || "")
          }))
        : fallback.inbox.signatures,
      messages: Array.isArray(parsedInbox.messages)
        ? parsedInbox.messages.map((msg, idx) => ({
            id: String(msg?.id || `MAIL-${String(idx + 1000).padStart(4, "0")}`),
            folder: String(msg?.folder || "inbox"),
            from: String(msg?.from || ""),
            to: String(msg?.to || ""),
            cc: String(msg?.cc || ""),
            bcc: String(msg?.bcc || ""),
            subject: String(msg?.subject || ""),
            bodyHtml: String(msg?.bodyHtml || ""),
            priority: String(msg?.priority || "Normal"),
            scheduledAt: String(msg?.scheduledAt || ""),
            createdAt: String(msg?.createdAt || ""),
            attachments: Array.isArray(msg?.attachments) ? msg.attachments.map((item) => String(item)) : []
          }))
        : fallback.inbox.messages
    };
    return {
      ...fallback,
      ...parsed,
      ecsEmployees,
      socServices,
      lcsSessions,
      inbox
    };
  } catch (_) {
    return fallback;
  }
}

function saveSunriseControlState() {
  if (!sunriseControlState) return;
  try {
    localStorage.setItem(SUNRISE_CONTROL_DATA_KEY, JSON.stringify(sunriseControlState));
  } catch (_) {}
  renderSunriseControlSummary();
}

function money(value) {
  const n = Number(value || 0);
  return `$${Math.round(n).toLocaleString()} USD`;
}

function markUsd(value) {
  return String(value == null ? "" : value).replace(/\$([0-9][0-9,]*(?:\.[0-9]+)?)(?!\s*USD)/g, (_m, amount) => `$${amount} USD`);
}

function generateServiceId() {
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const digits = String(Math.floor(1000000 + Math.random() * 9000000));
  return `${letter}${digits}`;
}

function defaultSocSteps() {
  return [
    { id: "S1", action: "Intake review", details: "Scope and client profile validation.", status: "Pending" },
    { id: "S2", action: "Execution planning", details: "Resource planning and route schedule.", status: "Pending" },
    { id: "S3", action: "Service delivery", details: "Live execution and control monitoring.", status: "Pending" },
    { id: "S4", action: "Closure", details: "Service closeout and quality confirmation.", status: "Pending" }
  ];
}

function findServiceById(serviceId) {
  const key = String(serviceId || "").trim().toUpperCase();
  if (!sunriseControlState || !key) return null;
  const groups = sunriseControlState.socServices || {};
  const source = ["current", "past", "deleted"];
  for (const bucket of source) {
    const list = Array.isArray(groups[bucket]) ? groups[bucket] : [];
    const found = list.find((item) => String(item.id || "").toUpperCase() === key);
    if (found) return { ...found, bucket };
  }
  return null;
}

function findServiceMetaById(serviceId) {
  const key = String(serviceId || "").trim().toUpperCase();
  if (!sunriseControlState || !key) return null;
  const groups = sunriseControlState.socServices || {};
  const source = ["current", "past", "deleted"];
  for (const bucket of source) {
    const list = Array.isArray(groups[bucket]) ? groups[bucket] : [];
    const idx = list.findIndex((item) => String(item.id || "").toUpperCase() === key);
    if (idx >= 0) return { bucket, idx, service: list[idx] };
  }
  return null;
}

function renderSunriseControlSummary() {
  if (!sunriseControlState) return;
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };
  const expTotal = (sunriseControlState.eamExpenses || []).reduce((sum, row) => sum + Number(row.amount || 0), 0);
  const incTotal = (sunriseControlState.ifsIncome || []).reduce((sum, row) => sum + Number(row.amount || 0), 0);
  setText("sum-dts-count", String((sunriseControlState.dtsDocs || []).length));
  setText("sum-eam-total", money(expTotal));
  setText("sum-ifs-total", money(incTotal));
  setText("sum-ecs-count", String((sunriseControlState.ecsEmployees || []).length));
  setText("sum-soc-current", String(((sunriseControlState.socServices || {}).current || []).length));
  setText("sum-lcs-count", String((sunriseControlState.lcsSessions || []).length));
}

function renderDTSPage() {
  const grid = document.getElementById("sunrise-dts-grid");
  if (!grid || !sunriseControlState) return;
  const rows = (sunriseControlState.dtsDocs || []).map((doc, idx) => `
    <tr><td><input class="input" data-dts-id="${idx}" value="${doc.id || ""}"></td><td><input class="input" data-dts-name="${idx}" value="${doc.name || ""}"></td><td><input class="input" data-dts-note="${idx}" value="${doc.note || ""}"></td><td><select class="select" data-dts-status="${idx}"><option ${doc.status==="Pending"?"selected":""}>Pending</option><option ${doc.status==="Submitted"?"selected":""}>Submitted</option><option ${doc.status==="Approved"?"selected":""}>Approved</option></select></td><td><button class="sunriseMiniBtn" type="button" data-dts-del="${idx}">Delete</button></td></tr>
  `).join("");
  grid.innerHTML = `<article class="sunriseControlCard sunriseDetailWide"><h3>Upload / Edit Documents</h3><input class="input" id="dts-upload" type="file" multiple><table class="sunriseControlTable"><thead><tr><th>ID</th><th>Document</th><th>Note</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows || "<tr><td colspan='5'>No documents yet.</td></tr>"}</tbody></table></article>`;
}

function renderMoneyPage(gridId, listKey, title) {
  const grid = document.getElementById(gridId);
  if (!grid || !sunriseControlState) return;
  const rows = (sunriseControlState[listKey] || []).map((row, idx) => `
    <tr><td><input class="input" data-money-id="${listKey}:${idx}" value="${row.id || ""}"></td><td><input class="input" data-money-name="${listKey}:${idx}" value="${row.name || ""}"></td><td><input class="input" type="number" data-money-amount="${listKey}:${idx}" value="${Number(row.amount || 0)}"></td><td><button class="sunriseMiniBtn" type="button" data-money-del="${listKey}:${idx}">Delete</button></td></tr>
  `).join("");
  grid.innerHTML = `<article class="sunriseControlCard sunriseDetailWide"><h3>${title}</h3><table class="sunriseControlTable"><thead><tr><th>Code</th><th>Unit</th><th>Amount (USD)</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table><div class="sunriseControlActions"><button class="sunriseMiniBtn" type="button" data-money-add="${listKey}">Add Row</button></div></article>`;
}

function renderECSPage() {
  const grid = document.getElementById("sunrise-ecs-grid");
  if (!grid || !sunriseControlState) return;
  const rows = (sunriseControlState.ecsEmployees || []).map((row, idx) => `
    <tr>
      <td><input class="input" data-ecs-id="${idx}" value="${row.id || ""}"></td><td><input class="input" data-ecs-name="${idx}" value="${row.name || ""}"></td><td><input class="input" type="number" data-ecs-salary="${idx}" value="${Number(row.salary || 0)}"></td>
      <td><input class="input" type="number" data-ecs-hours="${idx}" value="${Number(row.hours || 0)}"></td><td><input class="input" type="number" data-ecs-bonus="${idx}" value="${Number(row.bonus || 0)}"></td>
      <td><input class="input" type="number" step="0.1" data-ecs-commission="${idx}" value="${Number(row.commission || 0)}"></td>
      <td><input class="input" data-ecs-position="${idx}" value="${row.position || ""}"></td>
      <td><select class="select" data-ecs-status="${idx}"><option ${row.status==="Active"?"selected":""}>Active</option><option ${row.status==="Promoted"?"selected":""}>Promoted</option><option ${row.status==="Fired"?"selected":""}>Fired</option></select></td>
      <td><input class="input" data-ecs-email="${idx}" value="${row.email || ""}"></td><td><input class="input" data-ecs-login="${idx}" value="${row.login || ""}"></td>
      <td><input class="input" data-ecs-permission="${idx}" value="${row.permission || ""}"></td>
      <td><button class="sunriseMiniBtn" type="button" data-ecs-mail="${idx}">Email</button><button class="sunriseMiniBtn" type="button" data-ecs-del="${idx}">Delete</button></td>
    </tr>
  `).join("");
  grid.innerHTML = `<article class="sunriseControlCard sunriseDetailWide"><h3>Employees Control System</h3><table class="sunriseControlTable"><thead><tr><th>ID</th><th>Name</th><th>Salary</th><th>Hours</th><th>Bonus</th><th>Comm%</th><th>Position</th><th>Status</th><th>Email</th><th>Login</th><th>Permission</th><th>Actions</th></tr></thead><tbody>${rows}</tbody></table><div class="sunriseControlActions"><button class="sunriseMiniBtn" type="button" data-ecs-add>Add Employee</button></div></article>`;
}

function renderRIMPage() {
  const grid = document.getElementById("sunrise-rim-grid");
  if (!grid || !sunriseControlState) return;
  const rows = (sunriseControlState.rimInvites || []).map((row, idx) => `<tr><td><input class="input" data-rim-id="${idx}" value="${row.id || ""}"></td><td><input class="input" data-rim-name="${idx}" value="${row.name || ""}"></td><td><input class="input" data-rim-email="${idx}" value="${row.email || ""}"></td><td><input class="input" data-rim-country="${idx}" value="${row.country || ""}"></td><td><input class="input" data-rim-team="${idx}" value="${row.team || ""}"></td><td><select class="select" data-rim-status="${idx}"><option ${row.status==="Draft"?"selected":""}>Draft</option><option ${row.status==="Sent"?"selected":""}>Sent</option><option ${row.status==="Accepted"?"selected":""}>Accepted</option></select></td><td><button class="sunriseMiniBtn" type="button" data-rim-del="${idx}">Delete</button></td></tr>`).join("");
  grid.innerHTML = `<article class="sunriseControlCard sunriseDetailWide"><h3>Red Invitations and Team Assignment</h3><table class="sunriseControlTable"><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Country</th><th>Assigned Team</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table><div class="sunriseControlActions"><button class="sunriseMiniBtn" type="button" data-rim-add>Add Invitation</button></div></article>`;
}

function renderSOCPage() {
  const grid = document.getElementById("sunrise-soc-grid");
  if (!grid || !sunriseControlState) return;
  const soc = sunriseControlState.socServices || { current: [], past: [], deleted: [] };
  const renderRows = (bucket, restoreMode = false) => (soc[bucket] || []).map((row, idx) => `<tr><td><input class="input" data-soc-id="${bucket}:${idx}" value="${row.id || ""}"></td><td><input class="input" data-soc-title="${bucket}:${idx}" value="${row.title || ""}"></td><td><input class="input" data-soc-client="${bucket}:${idx}" value="${row.client || ""}"></td><td><select class="select" data-soc-tier="${bucket}:${idx}"><option ${row.tier==="Non-Member"?"selected":""}>Non-Member</option><option ${row.tier==="Voyager Cuprum"?"selected":""}>Voyager Cuprum</option><option ${row.tier==="Voyager Argentum"?"selected":""}>Voyager Argentum</option><option ${row.tier==="Voyager Aurum"?"selected":""}>Voyager Aurum</option><option ${row.tier==="Voyager Platinum"?"selected":""}>Voyager Platinum</option><option ${row.tier==="Voyager Diamante"?"selected":""}>Voyager Diamante</option><option ${row.tier==="Voyager Noir"?"selected":""}>Voyager Noir</option><option ${row.tier==="Voyager Red"?"selected":""}>Voyager Red</option></select></td><td><select class="select" data-soc-desired="${bucket}:${idx}"><option ${row.desiredExecutionTime==="Instant"?"selected":""}>Instant</option><option ${row.desiredExecutionTime==="24h"?"selected":""}>24h</option><option ${row.desiredExecutionTime==="48h"?"selected":""}>48h</option><option ${row.desiredExecutionTime==="72h"?"selected":""}>72h</option><option ${row.desiredExecutionTime==="Within a week"?"selected":""}>Within a week</option><option ${row.desiredExecutionTime==="Within a month"?"selected":""}>Within a month</option><option ${row.desiredExecutionTime==="2 months"?"selected":""}>2 months</option><option ${row.desiredExecutionTime==="3 months"?"selected":""}>3 months</option><option ${row.desiredExecutionTime==="6 months"?"selected":""}>6 months</option></select></td><td><input class="input" data-soc-assigned="${bucket}:${idx}" value="${row.assigned || ""}"></td><td><input class="input" data-soc-assigned-at="${bucket}:${idx}" value="${row.assignedAt || ""}" placeholder="YYYY-MM-DD HH:MM TZ"></td><td><input class="input" data-soc-confirmed-at="${bucket}:${idx}" value="${row.confirmedAt || ""}" placeholder="YYYY-MM-DD HH:MM TZ"></td><td><select class="select" data-soc-status="${bucket}:${idx}"><option ${row.status==="Assigned"?"selected":""}>Assigned</option><option ${row.status==="Confirmed"?"selected":""}>Confirmed</option><option ${row.status==="Closed"?"selected":""}>Closed</option></select></td><td>${restoreMode ? `<button class="sunriseMiniBtn" type="button" data-soc-restore="${idx}">Restore</button>` : `<button class="sunriseMiniBtn" type="button" data-soc-delete="${bucket}:${idx}">Delete</button><button class="sunriseMiniBtn" type="button" data-soc-open="${row.id}">Details</button>`}</td></tr>`).join("");
  grid.innerHTML = `<article class="sunriseControlCard sunriseDetailWide"><h3>Service Registration</h3><div class="sunriseControlActions"><input class="input" id="soc-new-title" placeholder="Service title"><input class="input" id="soc-new-client" placeholder="Client"><select class="select" id="soc-new-tier"><option>Non-Member</option><option>Voyager Cuprum</option><option>Voyager Argentum</option><option>Voyager Aurum</option><option>Voyager Platinum</option><option>Voyager Diamante</option><option>Voyager Noir</option><option>Voyager Red</option></select><select class="select" id="soc-new-desired"><option>Instant</option><option selected>24h</option><option>48h</option><option>72h</option><option>Within a week</option><option>Within a month</option><option>2 months</option><option>3 months</option><option>6 months</option></select><button class="sunriseMiniBtn" type="button" id="soc-add-service">Register Service</button></div></article><article class="sunriseControlCard sunriseDetailWide"><h3>Current Services</h3><table class="sunriseControlTable"><thead><tr><th>ID</th><th>Title</th><th>Client</th><th>Tier</th><th>Desired Execution</th><th>Assigned To</th><th>Assigned At</th><th>Confirmed At</th><th>Status</th><th>Actions</th></tr></thead><tbody>${renderRows("current") || "<tr><td colspan='10'>No current services.</td></tr>"}</tbody></table></article><article class="sunriseControlCard sunriseDetailWide"><h3>Past Services</h3><table class="sunriseControlTable"><thead><tr><th>ID</th><th>Title</th><th>Client</th><th>Tier</th><th>Desired Execution</th><th>Assigned To</th><th>Assigned At</th><th>Confirmed At</th><th>Status</th><th>Actions</th></tr></thead><tbody>${renderRows("past") || "<tr><td colspan='10'>No past services.</td></tr>"}</tbody></table></article><article class="sunriseControlCard sunriseDetailWide"><h3>Recently Deleted</h3><table class="sunriseControlTable"><thead><tr><th>ID</th><th>Title</th><th>Client</th><th>Tier</th><th>Desired Execution</th><th>Assigned To</th><th>Assigned At</th><th>Confirmed At</th><th>Status</th><th>Action</th></tr></thead><tbody>${renderRows("deleted", true) || "<tr><td colspan='10'>No deleted services.</td></tr>"}</tbody></table></article>`;
}

function renderSOCDetailsPage() {
  const grid = document.getElementById("sunrise-soc-details-grid");
  if (!grid || !sunriseControlState) return;
  const selectedId = sunriseControlState.socSelectedServiceId || "";
  const selected = findServiceById(selectedId);
  if (!selected) {
    grid.innerHTML = `<article class="sunriseControlCard sunriseDetailWide"><h3>No Selected Service</h3><p class="opsText">Open a service from SOC list or use shortcut with service ID (example: A1234567).</p></article>`;
    return;
  }
  const steps = Array.isArray(selected.steps) ? selected.steps : [];
  const stepRows = steps.map((step, idx) => `<tr><td><input class="input" data-socd-step-id="${idx}" value="${step.id || `S${idx + 1}`}"></td><td><input class="input" data-socd-action="${idx}" value="${step.action || ""}"></td><td><input class="input" data-socd-details="${idx}" value="${step.details || ""}"></td><td><select class="select" data-socd-status="${idx}"><option ${step.status==="Pending"?"selected":""}>Pending</option><option ${step.status==="In Progress"?"selected":""}>In Progress</option><option ${step.status==="Done"?"selected":""}>Done</option><option ${step.status==="Blocked"?"selected":""}>Blocked</option></select></td><td><button class="sunriseMiniBtn" type="button" data-socd-del="${idx}">Delete</button></td></tr>`).join("");
  grid.innerHTML = `<article class="sunriseControlCard sunriseDetailWide"><h3>Core Service Profile</h3><table class="sunriseControlTable"><tbody><tr><th style="width:220px;">Service ID</th><td><input class="input" data-socd-id value="${selected.id || ""}"></td></tr><tr><th>Service Title</th><td><input class="input" data-socd-title value="${selected.title || ""}"></td></tr><tr><th>Client</th><td><input class="input" data-socd-client value="${selected.client || ""}"></td></tr><tr><th>Client Tier</th><td><select class="select" data-socd-tier><option ${selected.tier==="Non-Member"?"selected":""}>Non-Member</option><option ${selected.tier==="Voyager Cuprum"?"selected":""}>Voyager Cuprum</option><option ${selected.tier==="Voyager Argentum"?"selected":""}>Voyager Argentum</option><option ${selected.tier==="Voyager Aurum"?"selected":""}>Voyager Aurum</option><option ${selected.tier==="Voyager Platinum"?"selected":""}>Voyager Platinum</option><option ${selected.tier==="Voyager Diamante"?"selected":""}>Voyager Diamante</option><option ${selected.tier==="Voyager Noir"?"selected":""}>Voyager Noir</option><option ${selected.tier==="Voyager Red"?"selected":""}>Voyager Red</option></select></td></tr><tr><th>Desired Execution Time</th><td><select class="select" data-socd-desired><option ${selected.desiredExecutionTime==="Instant"?"selected":""}>Instant</option><option ${selected.desiredExecutionTime==="24h"?"selected":""}>24h</option><option ${selected.desiredExecutionTime==="48h"?"selected":""}>48h</option><option ${selected.desiredExecutionTime==="72h"?"selected":""}>72h</option><option ${selected.desiredExecutionTime==="Within a week"?"selected":""}>Within a week</option><option ${selected.desiredExecutionTime==="Within a month"?"selected":""}>Within a month</option><option ${selected.desiredExecutionTime==="2 months"?"selected":""}>2 months</option><option ${selected.desiredExecutionTime==="3 months"?"selected":""}>3 months</option><option ${selected.desiredExecutionTime==="6 months"?"selected":""}>6 months</option></select></td></tr><tr><th>Assigned Concierge / Team</th><td><input class="input" data-socd-assigned value="${selected.assigned || ""}"></td></tr><tr><th>Assigned At</th><td><input class="input" data-socd-assigned-at value="${selected.assignedAt || ""}" placeholder="YYYY-MM-DD HH:MM TZ"></td></tr><tr><th>Confirmed At</th><td><input class="input" data-socd-confirmed-at value="${selected.confirmedAt || ""}" placeholder="YYYY-MM-DD HH:MM TZ"></td></tr><tr><th>Status</th><td><select class="select" data-socd-status-main><option ${selected.status==="Assigned"?"selected":""}>Assigned</option><option ${selected.status==="Confirmed"?"selected":""}>Confirmed</option><option ${selected.status==="Closed"?"selected":""}>Closed</option></select></td></tr><tr><th>Service Description</th><td><textarea class="input mailTextarea" data-socd-description>${selected.description || ""}</textarea></td></tr></tbody></table></article><article class="sunriseControlCard sunriseDetailWide"><h3>Step-by-Step Actions</h3><table class="sunriseControlTable"><thead><tr><th>Step</th><th>Action</th><th>Concrete Details</th><th>Status</th><th>Action</th></tr></thead><tbody>${stepRows || "<tr><td colspan='5'>No steps yet.</td></tr>"}</tbody></table><div class="sunriseControlActions"><button class="sunriseMiniBtn" type="button" data-socd-add-step>Add Step</button></div></article>`;
}

function renderLCSPage() {
  const grid = document.getElementById("sunrise-lcs-grid");
  if (!grid || !sunriseControlState) return;
  (sunriseControlState.lcsSessions || []).forEach((row) => {
    if (Number(row?.loginTs || 0) > 0 && !Number(row?.logoutTs || 0)) updateNotosSessionDuration(row);
  });
  const rows = (sunriseControlState.lcsSessions || []).map((row, idx) => {
    const timelineCount = Array.isArray(row.pathTimeline) ? row.pathTimeline.length : 0;
    return `<tr><td><input class="input" data-lcs-id="${idx}" value="${row.id || ""}"></td><td><input class="input" data-lcs-code="${idx}" value="${row.code || ""}"></td><td><input class="input" data-lcs-employee="${idx}" value="${row.employee || ""}"></td><td><input class="input" data-lcs-login="${idx}" value="${row.loginAt || ""}"></td><td><input class="input" data-lcs-logout="${idx}" value="${row.logoutAt || ""}"></td><td><input class="input" data-lcs-session="${idx}" value="${row.session || ""}"></td><td><button class="sunriseMiniBtn" type="button" data-lcs-path-open="${idx}">${timelineCount} path steps</button></td><td><input class="input" data-lcs-permission="${idx}" value="${row.permission || ""}"></td><td><button class="sunriseMiniBtn" type="button" data-lcs-del="${idx}">Delete</button></td></tr>`;
  }).join("");
  grid.innerHTML = `<article class="sunriseControlCard sunriseDetailWide"><h3>Notos Login Control System</h3><table class="sunriseControlTable"><thead><tr><th>ID</th><th>Code</th><th>Employee</th><th>Login</th><th>Logout</th><th>Session</th><th>Path</th><th>Permission</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table><div class="sunriseControlActions"><button class="sunriseMiniBtn" type="button" data-lcs-add>Add Session</button></div></article>`;
}

function inboxFolderCount(inbox, folder) {
  const messages = Array.isArray(inbox.messages) ? inbox.messages : [];
  if (folder === "folders") {
    const custom = new Set((inbox.customFolders || []).map((f) => String(f)));
    return messages.filter((m) => custom.has(String(m.folder || ""))).length;
  }
  return messages.filter((m) => String(m.folder || "") === folder).length;
}

function renderSunriseInboxPage() {
  const root = document.getElementById("sunrise-inbox-root");
  if (!root || !sunriseControlState) return;
  const inbox = sunriseControlState.inbox || {};
  const activeFolder = String(inbox.activeFolder || "inbox");
  const selectedMessageId = String(inbox.selectedMessageId || "");
  const composeOpen = !!inbox.composeOpen;
  const customFolders = Array.isArray(inbox.customFolders) ? inbox.customFolders : [];
  const messages = Array.isArray(inbox.messages) ? inbox.messages : [];
  const signatures = Array.isArray(inbox.signatures) ? inbox.signatures : [];
  const defaultSignatureId = String(inbox.defaultSignatureId || "");
  const customSet = new Set(customFolders.map((name) => String(name)));
  const visibleMessages = messages.filter((msg) => {
    const folder = String(msg.folder || "inbox");
    if (activeFolder === "folders") return customSet.has(folder);
    return folder === activeFolder;
  });
  const selectedMessage = messages.find((msg) => String(msg.id || "") === selectedMessageId) || null;

  const folderBtn = (folderKey, label) => {
    const active = activeFolder === folderKey ? " isActive" : "";
    return `<button class="sunriseInboxFolderBtn${active}" type="button" data-inbox-folder="${folderKey}"><span>${label}</span><b>${inboxFolderCount(inbox, folderKey)}</b></button>`;
  };

  const customFolderBtns = customFolders.map((name) => {
    const key = String(name);
    const active = activeFolder === key ? " isActive" : "";
    const count = messages.filter((msg) => String(msg.folder || "") === key).length;
    return `<button class="sunriseInboxFolderBtn${active}" type="button" data-inbox-folder="${key}"><span>${key}</span><b>${count}</b></button>`;
  }).join("");

  const rows = visibleMessages.map((msg) => {
    const id = String(msg.id || "");
    const from = String(msg.from || "").trim() || "Unknown sender";
    const subject = String(msg.subject || "").trim() || "(No subject)";
    const priority = String(msg.priority || "Normal");
    const created = String(msg.createdAt || "");
    const active = id === selectedMessageId ? " isActive" : "";
    return `<button class="sunriseInboxRow${active}" type="button" data-inbox-open="${id}"><span class="sunriseInboxFrom">${from}</span><span class="sunriseInboxSubject">${subject}</span><span class="sunriseInboxMeta">${priority} • ${created}</span></button>`;
  }).join("");

  const signatureOptions = signatures.map((sig) => {
    const id = String(sig.id || "");
    const selected = id === defaultSignatureId ? "selected" : "";
    return `<option value="${id}" ${selected}>${sig.name || id}</option>`;
  }).join("");

  const signatureRows = signatures.map((sig, idx) => {
    const id = String(sig.id || "");
    const checked = id === defaultSignatureId ? "checked" : "";
    return `<article class="sunriseInboxSignatureItem"><div class="sunriseInboxSignatureHead"><input class="input" data-inbox-signature-name="${idx}" value="${sig.name || ""}" placeholder="Signature name"><label class="choice"><input type="radio" name="inbox-default-signature" data-inbox-signature-default="${id}" ${checked}/> Default</label><button class="sunriseMiniBtn" type="button" data-inbox-signature-del="${idx}">Delete</button></div><textarea class="input sunriseInboxSignatureArea" data-inbox-signature-text="${idx}" placeholder="Signature text">${sig.text || ""}</textarea><div class="sunriseControlActions"><input class="input" data-inbox-signature-image="${idx}" value="${sig.imageName || ""}" placeholder="Signature image name (optional)"><input class="input" type="file" accept=\"image/*\" data-inbox-signature-image-file="${idx}"></div></article>`;
  }).join("");

  const detailHtml = selectedMessage
    ? `<article class="sunriseControlCard sunriseDetailWide"><div class="sunriseInboxTop"><h3>Email Details</h3><div class="sunriseControlActions"><button class="sunriseMiniBtn" type="button" data-inbox-archive="${selectedMessage.id}">Archive</button><select class="select" id="inbox-move-target"><option value="">Move to...</option><option value="inbox">Inbox</option><option value="archive">Archive</option><option value="sent">Sent</option><option value="spam">Spam</option><option value="trash">Trash</option>${customFolders.map((name) => `<option value="${name}">${name}</option>`).join("")}</select><button class="sunriseMiniBtn" type="button" data-inbox-move="${selectedMessage.id}">Move</button><button class="sunriseMiniBtn" type="button" data-inbox-delete="${selectedMessage.id}">Delete to Trash</button></div></div><div class="sunriseInboxDetailGrid"><p><b>From:</b> ${selectedMessage.from || "-"}</p><p><b>To:</b> ${selectedMessage.to || "-"}</p><p><b>CC:</b> ${selectedMessage.cc || "-"}</p><p><b>BCC:</b> ${selectedMessage.bcc || "-"}</p><p><b>Subject:</b> ${selectedMessage.subject || "-"}</p><p><b>Priority:</b> ${selectedMessage.priority || "Normal"}</p><p><b>Created:</b> ${selectedMessage.createdAt || "-"}</p><p><b>Scheduled:</b> ${selectedMessage.scheduledAt || "-"}</p></div><div class="sunriseInboxAttachList">${(selectedMessage.attachments || []).length ? `Attachments: ${(selectedMessage.attachments || []).join(", ")}` : "Attachments: none"}</div><div class="sunriseInboxDetailBody">${selectedMessage.bodyHtml || "<p>No content.</p>"}</div></article>`
    : `<article class="sunriseControlCard sunriseDetailWide"><p class="profileNote">Select an email to view details.</p></article>`;

  root.innerHTML = `<div class="sunriseInboxShell"><aside class="sunriseInboxSidebar"><div class="sunriseInboxFolders"><p class="sunriseCategoryTitle">Mailboxes</p>${folderBtn("inbox", "Inbox")}${folderBtn("archive", "Archive")}${folderBtn("folders", "Folders")}${folderBtn("sent", "Sent")}${folderBtn("spam", "Spam")}${folderBtn("trash", "Trash")}${folderBtn("sending", "Sending")}</div><div class="sunriseInboxFolders"><p class="sunriseCategoryTitle">Custom Folders</p>${customFolderBtns || "<p class='profileNote'>No custom folders yet.</p>"}<div class="sunriseControlActions"><input class="input" id="inbox-new-folder" placeholder="New folder name"><button class="sunriseMiniBtn" type="button" data-inbox-folder-add>Create</button></div></div><div class="sunriseInboxSettings"><p class="sunriseCategoryTitle">Inbox Signatures</p>${signatureRows || "<p class='profileNote'>No signatures yet.</p>"}<div class="sunriseControlActions"><input class="input" id="inbox-new-signature-name" placeholder="Signature name"><button class="sunriseMiniBtn" type="button" data-inbox-signature-add>Add Signature</button></div></div></aside><section class="sunriseInboxMain"><article class="sunriseControlCard sunriseDetailWide"><div class="sunriseInboxTop"><h3>Folder: ${activeFolder}</h3><button class="sunriseMiniBtn" type="button" data-inbox-new-compose>${composeOpen ? "Close Compose" : "Compose"}</button></div><div class="sunriseInboxList">${rows || "<p class='profileNote'>No emails in this folder.</p>"}</div></article>${detailHtml}<article class="sunriseControlCard sunriseDetailWide${composeOpen ? "" : " isHidden"}" id="inbox-compose-card"><h3>Compose Email</h3><div class="sunriseInboxComposeGrid compact"><div class="field"><label>To</label><input class="input" id="inbox-to" type="email" placeholder="recipient@domain.com"></div><div class="field"><label>Subject</label><input class="input" id="inbox-subject" type="text" placeholder="Email subject"></div><div class="field"><label>CC</label><input class="input" id="inbox-cc" type="email" placeholder="cc@domain.com"></div><div class="field"><label>BCC</label><input class="input" id="inbox-bcc" type="email" placeholder="bcc@domain.com"></div></div><div class="sunriseInboxMiniBar"><button class="sunriseMiniBtn" type="button" data-inbox-toggle-mini="style">Style</button><button class="sunriseMiniBtn" type="button" data-inbox-toggle-mini="font">Font</button><button class="sunriseMiniBtn" type="button" data-inbox-toggle-mini="files">Files</button><button class="sunriseMiniBtn" type="button" data-inbox-toggle-mini="delivery">Delivery</button><button class="sunriseMiniBtn" type="button" data-inbox-toggle-mini="signature">Signature</button></div><div class="sunriseInboxMiniPanelWrap"><div class="sunriseInboxMiniPanel isActive" data-mini-panel="style"><button class="sunriseMiniBtn" type="button" data-inbox-style-preset="title">Title</button><button class="sunriseMiniBtn" type="button" data-inbox-style-preset="subtitle">Subtitle</button><button class="sunriseMiniBtn" type="button" data-inbox-style-preset="body">Body</button><button class="sunriseMiniBtn" type="button" data-inbox-style-preset="quote">Quote</button><button class="sunriseMiniBtn" type="button" data-inbox-editor-cmd="bold"><b>B</b></button><button class="sunriseMiniBtn" type="button" data-inbox-editor-cmd="italic"><i>I</i></button><button class="sunriseMiniBtn" type="button" data-inbox-editor-cmd="underline"><u>U</u></button></div><div class="sunriseInboxMiniPanel" data-mini-panel="font"><select class="select" id="inbox-font-family"><option value="Arial, sans-serif">Arial</option><option value="'Times New Roman', serif">Times New Roman</option><option value="'Courier New', monospace">Courier New</option><option value="Georgia, serif">Georgia</option></select><select class="select" id="inbox-font-size"><option value="2">Small</option><option value="3" selected>Normal</option><option value="4">Large</option><option value="5">XL</option></select></div><div class="sunriseInboxMiniPanel" data-mini-panel="files"><input class="input miniFileInput" id="inbox-attach" type="file" multiple></div><div class="sunriseInboxMiniPanel" data-mini-panel="delivery"><select class="select" id="inbox-priority"><option>Low</option><option selected>Normal</option><option>High</option><option>Urgent</option></select><input class="input" id="inbox-schedule" type="datetime-local"></div><div class="sunriseInboxMiniPanel" data-mini-panel="signature"><select class="select" id="inbox-signature-select">${signatureOptions}</select><button class="sunriseMiniBtn" type="button" data-inbox-apply-signature>Apply</button></div></div><div class="sunriseInboxEditorWrap"><div id="inbox-editor" class="sunriseInboxEditor" contenteditable="true"></div></div><div class="sunriseInboxAttachList" id="inbox-attachments-list"></div><div class="sunriseControlActions"><button class="sunriseMiniBtn" type="button" data-inbox-send>Send</button></div><p class="authInfo" id="inbox-info">${inbox.lastInfo || ""}</p></article></section></div>`;

  const editor = document.getElementById("inbox-editor");
  const signatureSelect = document.getElementById("inbox-signature-select");
  if (editor && !editor.innerHTML.trim() && signatureSelect && signatures.length) {
    const sig = signatures.find((item) => String(item.id) === String(signatureSelect.value));
    if (sig) {
      const sigText = String(sig.text || "").replace(/\n/g, "<br>");
      const sigImage = sig.imageName ? `<br><span>[Image: ${sig.imageName}]</span>` : "";
      editor.innerHTML = `${sigText}${sigImage}`;
    }
  }
}

function renderSMCAPage() {
  const grid = document.getElementById("sunrise-smca-grid");
  if (!grid || !sunriseControlState) return;
  const rows = (sunriseControlState.smca || []).map((row, idx) => `
    <tr>
      <td><input class="input" data-smca-id="${idx}" value="${row.id || ""}"></td>
      <td><input class="input" data-smca-name="${idx}" value="${row.name || ""}"></td>
      <td><input class="input" data-smca-role="${idx}" value="${row.role || ""}"></td>
      <td><input class="input" data-smca-position="${idx}" value="${row.position || ""}"></td>
      <td><input class="input" type="number" step="0.1" data-smca-commission="${idx}" value="${Number(row.commission ?? row.amount ?? 0)}"></td>
      <td><button class="sunriseMiniBtn" type="button" data-smca-del="${idx}">Delete</button></td>
    </tr>
  `).join("");
  grid.innerHTML = `<article class="sunriseControlCard sunriseDetailWide"><h3>Sales & Marketing Commissions by Employee</h3><table class="sunriseControlTable"><thead><tr><th>ID</th><th>Employee</th><th>Role</th><th>Position</th><th>Commission %</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table><div class="sunriseControlActions"><button class="sunriseMiniBtn" type="button" data-smca-add>Add Employee Commission</button></div></article>`;
}

function renderCustomSunriseControlPages() {
  renderSunriseControlSummary();
  renderDTSPage();
  renderMoneyPage("sunrise-eam-grid", "eamExpenses", "Expenses Adjustment");
  renderMoneyPage("sunrise-ifs-grid", "ifsIncome", "Income Flow Allocation");
  renderSMCAPage();
  renderECSPage();
  renderRIMPage();
  renderSOCPage();
  renderSOCDetailsPage();
  renderSunriseInboxPage();
  renderLCSPage();
}

function bindSunriseControlInteractions() {
  if (document.body.dataset.sunriseControlBound === "1") return;
  document.body.dataset.sunriseControlBound = "1";
  const sunriseEmailOverlay = document.getElementById("sunrise-email-overlay");
  const sunriseMailTo = document.getElementById("sunrise-mail-to");
  const sunriseMailSubject = document.getElementById("sunrise-mail-subject");
  const sunriseMailBody = document.getElementById("sunrise-mail-body");
  const sunriseMailInfo = document.getElementById("sunrise-mail-info");
  const notosPathOverlay = document.getElementById("notos-path-overlay");
  const notosPathClose = document.getElementById("notos-path-close");
  if (notosPathClose && notosPathClose.dataset.boundNotosClose !== "1") {
    notosPathClose.addEventListener("click", () => {
      if (notosPathOverlay) notosPathOverlay.hidden = true;
    });
    notosPathClose.dataset.boundNotosClose = "1";
  }

  const openSunriseEmailComposer = (user) => {
    if (!sunriseEmailOverlay) return;
    const userName = String(user?.name || "Employee").trim();
    if (sunriseMailTo) sunriseMailTo.value = String(user?.email || "").trim();
    if (sunriseMailSubject) sunriseMailSubject.value = `VVS Operations Notice - ${userName}`;
    if (sunriseMailBody) sunriseMailBody.value = `Dear ${userName},\n\nPlease review the latest operational update.\n\nRegards,\nVVS Command`;
    if (sunriseMailInfo) sunriseMailInfo.textContent = "";
    sunriseEmailOverlay.hidden = false;
  };

  const closeSunriseEmailComposer = () => {
    if (sunriseEmailOverlay) sunriseEmailOverlay.hidden = true;
  };

  const parseKey = (value) => {
    const [a, b] = String(value || "").split(":");
    return { key: a, idx: Number(b) };
  };

  document.addEventListener("click", (event) => {
    const actionBtn = event.target.closest("[data-shortcut-action]");
    if (actionBtn) {
      const action = String(actionBtn.getAttribute("data-shortcut-action") || "").toLowerCase();
      if (action === "ws") {
        setWebsiteShutdownActive(true);
        showRoute(canAccessDuringShutdown(currentVisibleRoute()) ? currentVisibleRoute() : "shutdown-404");
      } else if (action === "wr") {
        setWebsiteShutdownActive(false);
        showRoute("sunrise");
      }
      return;
    }

    const moneyAdd = event.target.closest("[data-money-add]");
    if (moneyAdd && sunriseControlState) {
      const key = String(moneyAdd.getAttribute("data-money-add") || "");
      const list = sunriseControlState[key];
      if (Array.isArray(list)) {
        list.push({ id: `NEW-${Math.floor(Math.random() * 900 + 100)}`, name: "New Unit", amount: 0 });
        saveSunriseControlState();
        renderCustomSunriseControlPages();
      }
      return;
    }

    const moneyDel = event.target.closest("[data-money-del]");
    if (moneyDel && sunriseControlState) {
      const { key, idx } = parseKey(moneyDel.getAttribute("data-money-del"));
      const list = sunriseControlState[key];
      if (Array.isArray(list)) list.splice(idx, 1);
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      return;
    }

    const dtsDel = event.target.closest("[data-dts-del]");
    if (dtsDel && sunriseControlState) {
      sunriseControlState.dtsDocs.splice(Number(dtsDel.getAttribute("data-dts-del")), 1);
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      return;
    }

    const ecsAdd = event.target.closest("[data-ecs-add]");
    if (ecsAdd && sunriseControlState) {
      sunriseControlState.ecsEmployees.push({ id: `EMP-${Math.floor(Math.random() * 900 + 100)}`, name: "New Employee", role: "Concierge", position: "Concierge Associate", salary: 0, hours: 0, bonus: 0, commission: 0, status: "Active", email: "", login: "", permission: "Tier-1" });
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      return;
    }

    const ecsDel = event.target.closest("[data-ecs-del]");
    if (ecsDel && sunriseControlState) {
      sunriseControlState.ecsEmployees.splice(Number(ecsDel.getAttribute("data-ecs-del")), 1);
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      return;
    }

    const ecsMail = event.target.closest("[data-ecs-mail]");
    if (ecsMail && sunriseControlState) {
      const idx = Number(ecsMail.getAttribute("data-ecs-mail"));
      const user = sunriseControlState.ecsEmployees[idx];
      if (user) openSunriseEmailComposer(user);
      return;
    }

    const sunriseMailClose = event.target.closest("[data-sunrise-mail-close]");
    if (sunriseMailClose) {
      closeSunriseEmailComposer();
      return;
    }

    const sunriseMailSend = event.target.closest("[data-sunrise-mail-send]");
    if (sunriseMailSend) {
      const to = String(sunriseMailTo?.value || "").trim();
      const subject = String(sunriseMailSubject?.value || "").trim();
      const body = String(sunriseMailBody?.value || "").trim();
      if (!to || !subject || !body) {
        if (sunriseMailInfo) sunriseMailInfo.textContent = "Complete To, Subject and Message before sending.";
        return;
      }
      if (sunriseMailInfo) sunriseMailInfo.textContent = `Message queued to ${to}. API connector will be attached later.`;
      window.setTimeout(() => {
        closeSunriseEmailComposer();
      }, 650);
      return;
    }

    const rimAdd = event.target.closest("[data-rim-add]");
    if (rimAdd && sunriseControlState) {
      sunriseControlState.rimInvites.push({ id: `RIM-${Math.floor(Math.random() * 900 + 100)}`, name: "New Invite", email: "", country: "", team: "", status: "Draft" });
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      return;
    }

    const rimDel = event.target.closest("[data-rim-del]");
    if (rimDel && sunriseControlState) {
      sunriseControlState.rimInvites.splice(Number(rimDel.getAttribute("data-rim-del")), 1);
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      return;
    }

    const smcaAdd = event.target.closest("[data-smca-add]");
    if (smcaAdd && sunriseControlState) {
      sunriseControlState.smca.push({
        id: `SM-${Math.floor(Math.random() * 900 + 100)}`,
        name: "New Employee",
        role: "Sales",
        position: "Associate",
        commission: 0
      });
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      return;
    }

    const smcaDel = event.target.closest("[data-smca-del]");
    if (smcaDel && sunriseControlState) {
      sunriseControlState.smca.splice(Number(smcaDel.getAttribute("data-smca-del")), 1);
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      return;
    }

    const addService = event.target.closest("#soc-add-service");
    if (addService && sunriseControlState) {
      const title = (document.getElementById("soc-new-title")?.value || "").trim();
      const client = (document.getElementById("soc-new-client")?.value || "").trim();
      const tier = (document.getElementById("soc-new-tier")?.value || "Non-Member").trim();
      const desiredExecutionTime = (document.getElementById("soc-new-desired")?.value || "24h").trim();
      if (!title || !client) return;
      sunriseControlState.socServices.current.push({
        id: generateServiceId(),
        title,
        client,
        tier,
        desiredExecutionTime,
        description: "",
        assigned: "Unassigned",
        assignedAt: "",
        confirmedAt: "",
        status: "Assigned",
        stage: "Current",
        budget: 0,
        steps: defaultSocSteps()
      });
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      return;
    }

    const socDelete = event.target.closest("[data-soc-delete]");
    if (socDelete && sunriseControlState) {
      const { key, idx } = parseKey(socDelete.getAttribute("data-soc-delete"));
      const list = sunriseControlState.socServices[key] || [];
      const [removed] = list.splice(idx, 1);
      if (removed) sunriseControlState.socServices.deleted.unshift(removed);
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      return;
    }

    const socRestore = event.target.closest("[data-soc-restore]");
    if (socRestore && sunriseControlState) {
      const idx = Number(socRestore.getAttribute("data-soc-restore"));
      const [restored] = sunriseControlState.socServices.deleted.splice(idx, 1);
      if (restored) sunriseControlState.socServices.past.unshift(restored);
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      return;
    }

    const socOpen = event.target.closest("[data-soc-open]");
    if (socOpen && sunriseControlState) {
      sunriseControlState.socSelectedServiceId = String(socOpen.getAttribute("data-soc-open") || "").toUpperCase();
      saveSunriseControlState();
      renderSOCDetailsPage();
      showRoute("sunrise-soc-details");
      return;
    }

    const socdAddStep = event.target.closest("[data-socd-add-step]");
    if (socdAddStep && sunriseControlState) {
      const meta = findServiceMetaById(sunriseControlState.socSelectedServiceId);
      if (!meta) return;
      const list = Array.isArray(meta.service.steps) ? meta.service.steps : [];
      list.push({
        id: `S${list.length + 1}`,
        action: "New step",
        details: "Define concrete action detail.",
        status: "Pending"
      });
      meta.service.steps = list;
      saveSunriseControlState();
      renderSOCDetailsPage();
      renderSOCPage();
      return;
    }

    const socdDelStep = event.target.closest("[data-socd-del]");
    if (socdDelStep && sunriseControlState) {
      const meta = findServiceMetaById(sunriseControlState.socSelectedServiceId);
      if (!meta) return;
      const idx = Number(socdDelStep.getAttribute("data-socd-del"));
      if (!Array.isArray(meta.service.steps)) meta.service.steps = [];
      meta.service.steps.splice(idx, 1);
      meta.service.steps = meta.service.steps.map((step, stepIdx) => ({
        ...step,
        id: `S${stepIdx + 1}`
      }));
      saveSunriseControlState();
      renderSOCDetailsPage();
      renderSOCPage();
      return;
    }

    const inboxFolderBtn = event.target.closest("[data-inbox-folder]");
    if (inboxFolderBtn && sunriseControlState) {
      const inbox = sunriseControlState.inbox || {};
      inbox.activeFolder = String(inboxFolderBtn.getAttribute("data-inbox-folder") || "inbox");
      inbox.composeOpen = false;
      inbox.selectedMessageId = "";
      inbox.lastInfo = "";
      sunriseControlState.inbox = inbox;
      saveSunriseControlState();
      renderSunriseInboxPage();
      return;
    }

    const inboxFolderAdd = event.target.closest("[data-inbox-folder-add]");
    if (inboxFolderAdd && sunriseControlState) {
      const inbox = sunriseControlState.inbox || {};
      const input = document.getElementById("inbox-new-folder");
      const folder = String(input?.value || "").trim();
      if (!folder) return;
      if (!Array.isArray(inbox.customFolders)) inbox.customFolders = [];
      if (!inbox.customFolders.includes(folder)) inbox.customFolders.push(folder);
      inbox.lastInfo = `Folder "${folder}" created.`;
      sunriseControlState.inbox = inbox;
      saveSunriseControlState();
      renderSunriseInboxPage();
      return;
    }

    const inboxSignatureAdd = event.target.closest("[data-inbox-signature-add]");
    if (inboxSignatureAdd && sunriseControlState) {
      const inbox = sunriseControlState.inbox || {};
      const input = document.getElementById("inbox-new-signature-name");
      const name = String(input?.value || "").trim() || "New Signature";
      if (!Array.isArray(inbox.signatures)) inbox.signatures = [];
      const sig = { id: `SIG-${Date.now()}`, name, text: "Regards,\nVVS Sunrise", imageName: "" };
      inbox.signatures.push(sig);
      if (!inbox.defaultSignatureId) inbox.defaultSignatureId = sig.id;
      inbox.lastInfo = `Signature "${name}" created.`;
      sunriseControlState.inbox = inbox;
      saveSunriseControlState();
      renderSunriseInboxPage();
      return;
    }

    const inboxSignatureDel = event.target.closest("[data-inbox-signature-del]");
    if (inboxSignatureDel && sunriseControlState) {
      const inbox = sunriseControlState.inbox || {};
      const idx = Number(inboxSignatureDel.getAttribute("data-inbox-signature-del"));
      if (!Array.isArray(inbox.signatures)) inbox.signatures = [];
      const [removed] = inbox.signatures.splice(idx, 1);
      if (removed && inbox.defaultSignatureId === removed.id) {
        inbox.defaultSignatureId = inbox.signatures[0] ? inbox.signatures[0].id : "";
      }
      inbox.lastInfo = "Signature removed.";
      sunriseControlState.inbox = inbox;
      saveSunriseControlState();
      renderSunriseInboxPage();
      return;
    }

    const inboxComposeNew = event.target.closest("[data-inbox-new-compose]");
    if (inboxComposeNew && sunriseControlState) {
      const inbox = sunriseControlState.inbox || {};
      const shouldOpen = !inbox.composeOpen;
      inbox.composeOpen = shouldOpen;
      sunriseControlState.inbox = inbox;
      saveSunriseControlState();
      renderSunriseInboxPage();
      if (!shouldOpen) return;
      const editor = document.getElementById("inbox-editor");
      const to = document.getElementById("inbox-to");
      const cc = document.getElementById("inbox-cc");
      const bcc = document.getElementById("inbox-bcc");
      const subject = document.getElementById("inbox-subject");
      const schedule = document.getElementById("inbox-schedule");
      const attachList = document.getElementById("inbox-attachments-list");
      if (to) to.value = "";
      if (cc) cc.value = "";
      if (bcc) bcc.value = "";
      if (subject) subject.value = "";
      if (schedule) schedule.value = "";
      if (attachList) attachList.textContent = "";
      if (editor) editor.innerHTML = "";
      const applyBtn = document.querySelector("[data-inbox-apply-signature]");
      if (applyBtn instanceof HTMLElement) applyBtn.click();
      return;
    }

    const inboxMiniToggle = event.target.closest("[data-inbox-toggle-mini]");
    if (inboxMiniToggle) {
      const panel = String(inboxMiniToggle.getAttribute("data-inbox-toggle-mini") || "");
      document.querySelectorAll(".sunriseInboxMiniPanel").forEach((node) => {
        node.classList.toggle("isActive", node.getAttribute("data-mini-panel") === panel);
      });
      return;
    }

    const inboxOpen = event.target.closest("[data-inbox-open]");
    if (inboxOpen && sunriseControlState) {
      const id = String(inboxOpen.getAttribute("data-inbox-open") || "");
      const inbox = sunriseControlState.inbox || {};
      const msg = (Array.isArray(inbox.messages) ? inbox.messages : []).find((m) => String(m.id) === id);
      if (!msg) return;
      inbox.selectedMessageId = id;
      sunriseControlState.inbox = inbox;
      saveSunriseControlState();
      renderSunriseInboxPage();
      return;
    }

    const inboxArchive = event.target.closest("[data-inbox-archive]");
    if (inboxArchive && sunriseControlState) {
      const inbox = sunriseControlState.inbox || {};
      const id = String(inboxArchive.getAttribute("data-inbox-archive") || "");
      const msg = (Array.isArray(inbox.messages) ? inbox.messages : []).find((m) => String(m.id) === id);
      if (!msg) return;
      msg.folder = "archive";
      inbox.selectedMessageId = id;
      inbox.activeFolder = "archive";
      inbox.lastInfo = "Email archived.";
      sunriseControlState.inbox = inbox;
      saveSunriseControlState();
      renderSunriseInboxPage();
      return;
    }

    const inboxMove = event.target.closest("[data-inbox-move]");
    if (inboxMove && sunriseControlState) {
      const inbox = sunriseControlState.inbox || {};
      const id = String(inboxMove.getAttribute("data-inbox-move") || "");
      const target = String(document.getElementById("inbox-move-target")?.value || "").trim();
      if (!target) return;
      const msg = (Array.isArray(inbox.messages) ? inbox.messages : []).find((m) => String(m.id) === id);
      if (!msg) return;
      msg.folder = target;
      inbox.activeFolder = target;
      inbox.selectedMessageId = id;
      inbox.lastInfo = `Email moved to ${target}.`;
      sunriseControlState.inbox = inbox;
      saveSunriseControlState();
      renderSunriseInboxPage();
      return;
    }

    const inboxDelete = event.target.closest("[data-inbox-delete]");
    if (inboxDelete && sunriseControlState) {
      const inbox = sunriseControlState.inbox || {};
      const id = String(inboxDelete.getAttribute("data-inbox-delete") || "");
      const msg = (Array.isArray(inbox.messages) ? inbox.messages : []).find((m) => String(m.id) === id);
      if (!msg) return;
      msg.folder = "trash";
      inbox.activeFolder = "trash";
      inbox.selectedMessageId = id;
      inbox.lastInfo = "Email moved to trash.";
      sunriseControlState.inbox = inbox;
      saveSunriseControlState();
      renderSunriseInboxPage();
      return;
    }

    const inboxEditorCmd = event.target.closest("[data-inbox-editor-cmd]");
    if (inboxEditorCmd) {
      const cmd = String(inboxEditorCmd.getAttribute("data-inbox-editor-cmd") || "");
      const editor = document.getElementById("inbox-editor");
      if (editor) editor.focus();
      if (cmd) document.execCommand(cmd, false);
      return;
    }

    const inboxStylePreset = event.target.closest("[data-inbox-style-preset]");
    if (inboxStylePreset) {
      const preset = String(inboxStylePreset.getAttribute("data-inbox-style-preset") || "body");
      const editor = document.getElementById("inbox-editor");
      if (!editor) return;
      editor.focus();
      if (preset === "title") {
        document.execCommand("formatBlock", false, "h2");
      } else if (preset === "subtitle") {
        document.execCommand("formatBlock", false, "h3");
      } else if (preset === "quote") {
        document.execCommand("formatBlock", false, "blockquote");
      } else {
        document.execCommand("formatBlock", false, "p");
      }
      return;
    }

    const inboxApplySignature = event.target.closest("[data-inbox-apply-signature]");
    if (inboxApplySignature && sunriseControlState) {
      const inbox = sunriseControlState.inbox || {};
      const sigId = String(document.getElementById("inbox-signature-select")?.value || "");
      const sig = (Array.isArray(inbox.signatures) ? inbox.signatures : []).find((s) => String(s.id) === sigId);
      const editor = document.getElementById("inbox-editor");
      if (editor && sig) {
        const existing = String(editor.innerHTML || "").trim();
        const sigText = String(sig.text || "").replace(/\n/g, "<br>");
        const sigImage = sig.imageName ? `<br><span>[Image: ${sig.imageName}]</span>` : "";
        const signatureBlock = `${sigText}${sigImage}`;
        editor.innerHTML = existing ? `${existing}<br><br>${signatureBlock}` : signatureBlock;
      }
      return;
    }

    const inboxSend = event.target.closest("[data-inbox-send]");
    if (inboxSend && sunriseControlState) {
      const inbox = sunriseControlState.inbox || {};
      const to = String(document.getElementById("inbox-to")?.value || "").trim();
      const cc = String(document.getElementById("inbox-cc")?.value || "").trim();
      const bcc = String(document.getElementById("inbox-bcc")?.value || "").trim();
      const subject = String(document.getElementById("inbox-subject")?.value || "").trim();
      const priority = String(document.getElementById("inbox-priority")?.value || "Normal");
      const scheduledAt = String(document.getElementById("inbox-schedule")?.value || "");
      const bodyHtml = String(document.getElementById("inbox-editor")?.innerHTML || "").trim();
      const attachInput = document.getElementById("inbox-attach");
      const attachments = (attachInput instanceof HTMLInputElement && attachInput.files)
        ? Array.from(attachInput.files).map((file) => file.name)
        : [];
      if (!to || !subject || !bodyHtml) {
        inbox.lastInfo = "Complete To, Subject and message before sending.";
        sunriseControlState.inbox = inbox;
        saveSunriseControlState();
        renderSunriseInboxPage();
        return;
      }
      if (!Array.isArray(inbox.messages)) inbox.messages = [];
      const now = new Date();
      const scheduleTs = scheduledAt ? new Date(scheduledAt).getTime() : 0;
      const folder = scheduleTs && scheduleTs > now.getTime() ? "sending" : "sent";
      inbox.messages.unshift({
        id: `MAIL-${Date.now()}`,
        folder,
        from: sunriseState.email || (activeAccount?.email || "concierge@venture-voyagers.com"),
        to,
        cc,
        bcc,
        subject,
        bodyHtml,
        priority,
        scheduledAt,
        createdAt: now.toISOString().replace("T", " ").slice(0, 16) + " UTC",
        attachments
      });
      inbox.activeFolder = folder;
      inbox.lastInfo = folder === "sending" ? "Email scheduled and placed in Sending." : "Email sent and moved to Sent.";
      sunriseControlState.inbox = inbox;
      saveSunriseControlState();
      renderSunriseInboxPage();
      return;
    }

    const lcsAdd = event.target.closest("[data-lcs-add]");
    if (lcsAdd && sunriseControlState) {
      sunriseControlState.lcsSessions.push({ id: generateGenericNotosSessionId(), code: "OPS1", employee: "New User", loginAt: "", logoutAt: "", loginTs: 0, logoutTs: 0, session: "00hr:00min:00sec", path: "", pathTimeline: [], permission: "Tier-1" });
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      return;
    }

    const lcsPathOpen = event.target.closest("[data-lcs-path-open]");
    if (lcsPathOpen && sunriseControlState) {
      const idx = Number(lcsPathOpen.getAttribute("data-lcs-path-open"));
      const row = sunriseControlState.lcsSessions[idx];
      const overlay = document.getElementById("notos-path-overlay");
      const title = document.getElementById("notos-path-title");
      const body = document.getElementById("notos-path-body");
      const info = document.getElementById("notos-path-info");
      if (!row || !overlay || !body) return;
      const timeline = Array.isArray(row.pathTimeline) ? row.pathTimeline : [];
      body.innerHTML = timeline.length
        ? timeline.map((entry, stepIdx) => `<div class="field"><label>Step ${stepIdx + 1}</label><input class="input" value="${entry.route} @ ${entry.at}" readonly></div>`).join("")
        : `<p class="profileNote">No path captured yet for this session.</p>`;
      if (title) title.textContent = `Session Path - ${row.id || "NTS"}`;
      if (info) info.textContent = row.path || "";
      overlay.hidden = false;
      return;
    }

    const lcsDel = event.target.closest("[data-lcs-del]");
    if (lcsDel && sunriseControlState) {
      sunriseControlState.lcsSessions.splice(Number(lcsDel.getAttribute("data-lcs-del")), 1);
      saveSunriseControlState();
      renderCustomSunriseControlPages();
    }
  });

  document.addEventListener("change", (event) => {
    const t = event.target;
    if (!(t instanceof HTMLElement) || !sunriseControlState) return;

    if (t.id === "dts-upload" && t instanceof HTMLInputElement && t.files) {
      Array.from(t.files).forEach((file) => {
        sunriseControlState.dtsDocs.push({ id: `DOC-${Math.floor(Math.random() * 900 + 100)}`, name: file.name, note: "Uploaded", status: "Submitted" });
      });
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      return;
    }

    if (t.id === "inbox-font-family") {
      document.execCommand("fontName", false, String((t instanceof HTMLSelectElement ? t.value : "") || "Arial, sans-serif"));
      return;
    }
    if (t.id === "inbox-font-size") {
      document.execCommand("fontSize", false, String((t instanceof HTMLSelectElement ? t.value : "3") || "3"));
      return;
    }
    if (t.id === "inbox-attach" && t instanceof HTMLInputElement) {
      const attachList = document.getElementById("inbox-attachments-list");
      const files = t.files ? Array.from(t.files).map((file) => file.name) : [];
      if (attachList) attachList.textContent = files.length ? `Attachments: ${files.join(", ")}` : "";
      return;
    }
    if (t.hasAttribute("data-inbox-signature-image-file") && t instanceof HTMLInputElement) {
      const idx = Number(t.getAttribute("data-inbox-signature-image-file"));
      const inbox = sunriseControlState.inbox || {};
      if (!Array.isArray(inbox.signatures)) inbox.signatures = [];
      const file = t.files && t.files[0] ? t.files[0] : null;
      if (inbox.signatures[idx]) inbox.signatures[idx].imageName = file ? file.name : "";
      sunriseControlState.inbox = inbox;
      saveSunriseControlState();
      renderSunriseInboxPage();
      return;
    }
    if (t.id === "inbox-signature-select" && sunriseControlState) {
      const inbox = sunriseControlState.inbox || {};
      inbox.defaultSignatureId = String((t instanceof HTMLSelectElement ? t.value : "") || "");
      inbox.lastInfo = "Default signature preset updated.";
      sunriseControlState.inbox = inbox;
      saveSunriseControlState();
      return;
    }

    const updateField = (attr, handler) => {
      const raw = t.getAttribute(attr);
      if (raw == null) return false;
      handler(raw);
      saveSunriseControlState();
      return true;
    };

    if (updateField("data-dts-id", (raw) => { sunriseControlState.dtsDocs[Number(raw)].id = t.value.trim(); })) return;
    if (updateField("data-dts-name", (raw) => { sunriseControlState.dtsDocs[Number(raw)].name = t.value; })) return;
    if (updateField("data-dts-note", (raw) => { sunriseControlState.dtsDocs[Number(raw)].note = t.value; })) return;
    if (updateField("data-dts-status", (raw) => { sunriseControlState.dtsDocs[Number(raw)].status = t.value; })) return;

    if (updateField("data-money-id", (raw) => { const { key, idx } = parseKey(raw); sunriseControlState[key][idx].id = t.value.trim(); })) return;
    if (updateField("data-money-name", (raw) => { const { key, idx } = parseKey(raw); sunriseControlState[key][idx].name = t.value; })) return;
    if (updateField("data-money-amount", (raw) => { const { key, idx } = parseKey(raw); sunriseControlState[key][idx].amount = Number(t.value || 0); })) return;

    if (updateField("data-ecs-id", (raw) => { sunriseControlState.ecsEmployees[Number(raw)].id = t.value.trim(); })) return;
    if (updateField("data-ecs-name", (raw) => { sunriseControlState.ecsEmployees[Number(raw)].name = t.value; })) return;
    if (updateField("data-ecs-salary", (raw) => { sunriseControlState.ecsEmployees[Number(raw)].salary = Number(t.value || 0); })) return;
    if (updateField("data-ecs-hours", (raw) => { sunriseControlState.ecsEmployees[Number(raw)].hours = Number(t.value || 0); })) return;
    if (updateField("data-ecs-bonus", (raw) => { sunriseControlState.ecsEmployees[Number(raw)].bonus = Number(t.value || 0); })) return;
    if (updateField("data-ecs-commission", (raw) => { sunriseControlState.ecsEmployees[Number(raw)].commission = Number(t.value || 0); })) return;
    if (updateField("data-ecs-position", (raw) => { sunriseControlState.ecsEmployees[Number(raw)].position = t.value; })) return;
    if (updateField("data-ecs-status", (raw) => { sunriseControlState.ecsEmployees[Number(raw)].status = t.value; })) return;
    if (updateField("data-ecs-email", (raw) => { sunriseControlState.ecsEmployees[Number(raw)].email = t.value; })) return;
    if (updateField("data-ecs-login", (raw) => { sunriseControlState.ecsEmployees[Number(raw)].login = t.value; })) return;
    if (updateField("data-ecs-permission", (raw) => { sunriseControlState.ecsEmployees[Number(raw)].permission = t.value; })) return;

    if (updateField("data-rim-id", (raw) => { sunriseControlState.rimInvites[Number(raw)].id = t.value.trim(); })) return;
    if (updateField("data-rim-name", (raw) => { sunriseControlState.rimInvites[Number(raw)].name = t.value; })) return;
    if (updateField("data-rim-email", (raw) => { sunriseControlState.rimInvites[Number(raw)].email = t.value; })) return;
    if (updateField("data-rim-country", (raw) => { sunriseControlState.rimInvites[Number(raw)].country = t.value; })) return;
    if (updateField("data-rim-team", (raw) => { sunriseControlState.rimInvites[Number(raw)].team = t.value; })) return;
    if (updateField("data-rim-status", (raw) => { sunriseControlState.rimInvites[Number(raw)].status = t.value; })) return;

    if (updateField("data-smca-id", (raw) => { sunriseControlState.smca[Number(raw)].id = t.value.trim(); })) return;
    if (updateField("data-smca-name", (raw) => { sunriseControlState.smca[Number(raw)].name = t.value; })) return;
    if (updateField("data-smca-role", (raw) => { sunriseControlState.smca[Number(raw)].role = t.value; })) return;
    if (updateField("data-smca-position", (raw) => { sunriseControlState.smca[Number(raw)].position = t.value; })) return;
    if (updateField("data-smca-commission", (raw) => { sunriseControlState.smca[Number(raw)].commission = Number(t.value || 0); })) return;

    if (updateField("data-inbox-signature-name", (raw) => {
      const inbox = sunriseControlState.inbox || {};
      const idx = Number(raw);
      if (!Array.isArray(inbox.signatures)) inbox.signatures = [];
      if (inbox.signatures[idx]) inbox.signatures[idx].name = t.value;
      sunriseControlState.inbox = inbox;
    })) return;
    if (updateField("data-inbox-signature-text", (raw) => {
      const inbox = sunriseControlState.inbox || {};
      const idx = Number(raw);
      if (!Array.isArray(inbox.signatures)) inbox.signatures = [];
      if (inbox.signatures[idx]) inbox.signatures[idx].text = t.value;
      sunriseControlState.inbox = inbox;
    })) return;
    if (updateField("data-inbox-signature-image", (raw) => {
      const inbox = sunriseControlState.inbox || {};
      const idx = Number(raw);
      if (!Array.isArray(inbox.signatures)) inbox.signatures = [];
      if (inbox.signatures[idx]) inbox.signatures[idx].imageName = t.value;
      sunriseControlState.inbox = inbox;
    })) return;
    if (updateField("data-inbox-signature-default", (raw) => {
      const inbox = sunriseControlState.inbox || {};
      inbox.defaultSignatureId = String(raw || "");
      inbox.lastInfo = "Default signature preset updated.";
      sunriseControlState.inbox = inbox;
      renderSunriseInboxPage();
    })) return;

    if (updateField("data-soc-id", (raw) => {
      const { key, idx } = parseKey(raw);
      const service = sunriseControlState.socServices[key][idx];
      const oldId = String(service?.id || "");
      const nextId = t.value.trim().toUpperCase();
      if (!service || !nextId) return;
      service.id = nextId;
      if (String(sunriseControlState.socSelectedServiceId || "").toUpperCase() === oldId.toUpperCase()) {
        sunriseControlState.socSelectedServiceId = nextId;
      }
      renderSOCDetailsPage();
    })) return;
    if (updateField("data-soc-title", (raw) => { const { key, idx } = parseKey(raw); sunriseControlState.socServices[key][idx].title = t.value; })) return;
    if (updateField("data-soc-client", (raw) => { const { key, idx } = parseKey(raw); sunriseControlState.socServices[key][idx].client = t.value; })) return;
    if (updateField("data-soc-tier", (raw) => { const { key, idx } = parseKey(raw); sunriseControlState.socServices[key][idx].tier = t.value; })) return;
    if (updateField("data-soc-desired", (raw) => { const { key, idx } = parseKey(raw); sunriseControlState.socServices[key][idx].desiredExecutionTime = t.value; })) return;
    if (updateField("data-soc-assigned", (raw) => {
      const { key, idx } = parseKey(raw);
      sunriseControlState.socServices[key][idx].assigned = t.value;
      if (t.value && !sunriseControlState.socServices[key][idx].assignedAt) {
        sunriseControlState.socServices[key][idx].assignedAt = new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC";
      }
    })) return;
    if (updateField("data-soc-assigned-at", (raw) => { const { key, idx } = parseKey(raw); sunriseControlState.socServices[key][idx].assignedAt = t.value; })) return;
    if (updateField("data-soc-confirmed-at", (raw) => { const { key, idx } = parseKey(raw); sunriseControlState.socServices[key][idx].confirmedAt = t.value; })) return;
    if (updateField("data-soc-status", (raw) => {
      const { key, idx } = parseKey(raw);
      sunriseControlState.socServices[key][idx].status = t.value;
      if (t.value === "Confirmed" && !sunriseControlState.socServices[key][idx].confirmedAt) {
        sunriseControlState.socServices[key][idx].confirmedAt = new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC";
      }
    })) return;

    if (updateField("data-socd-id", () => {
      const meta = findServiceMetaById(sunriseControlState.socSelectedServiceId);
      const nextId = t.value.trim().toUpperCase();
      if (!meta || !nextId) return;
      meta.service.id = nextId;
      sunriseControlState.socSelectedServiceId = nextId;
      renderSOCPage();
      renderSOCDetailsPage();
    })) return;
    if (updateField("data-socd-title", () => {
      const meta = findServiceMetaById(sunriseControlState.socSelectedServiceId);
      if (meta) meta.service.title = t.value;
      renderSOCPage();
    })) return;
    if (updateField("data-socd-client", () => {
      const meta = findServiceMetaById(sunriseControlState.socSelectedServiceId);
      if (meta) meta.service.client = t.value;
      renderSOCPage();
    })) return;
    if (updateField("data-socd-tier", () => {
      const meta = findServiceMetaById(sunriseControlState.socSelectedServiceId);
      if (meta) meta.service.tier = t.value;
      renderSOCPage();
    })) return;
    if (updateField("data-socd-desired", () => {
      const meta = findServiceMetaById(sunriseControlState.socSelectedServiceId);
      if (meta) meta.service.desiredExecutionTime = t.value;
      renderSOCPage();
    })) return;
    if (updateField("data-socd-assigned", () => {
      const meta = findServiceMetaById(sunriseControlState.socSelectedServiceId);
      if (meta) {
        meta.service.assigned = t.value;
        if (t.value && !meta.service.assignedAt) {
          meta.service.assignedAt = new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC";
        }
      }
      renderSOCPage();
    })) return;
    if (updateField("data-socd-assigned-at", () => {
      const meta = findServiceMetaById(sunriseControlState.socSelectedServiceId);
      if (meta) meta.service.assignedAt = t.value;
      renderSOCPage();
    })) return;
    if (updateField("data-socd-confirmed-at", () => {
      const meta = findServiceMetaById(sunriseControlState.socSelectedServiceId);
      if (meta) meta.service.confirmedAt = t.value;
      renderSOCPage();
    })) return;
    if (updateField("data-socd-status-main", () => {
      const meta = findServiceMetaById(sunriseControlState.socSelectedServiceId);
      if (meta) {
        meta.service.status = t.value;
        if (t.value === "Confirmed" && !meta.service.confirmedAt) {
          meta.service.confirmedAt = new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC";
        }
      }
      renderSOCPage();
    })) return;
    if (updateField("data-socd-description", () => {
      const meta = findServiceMetaById(sunriseControlState.socSelectedServiceId);
      if (meta) meta.service.description = t.value;
    })) return;
    if (updateField("data-socd-step-id", (raw) => {
      const meta = findServiceMetaById(sunriseControlState.socSelectedServiceId);
      const idx = Number(raw);
      if (meta && Array.isArray(meta.service.steps) && meta.service.steps[idx]) {
        meta.service.steps[idx].id = t.value.trim() || `S${idx + 1}`;
      }
    })) return;
    if (updateField("data-socd-action", (raw) => {
      const meta = findServiceMetaById(sunriseControlState.socSelectedServiceId);
      const idx = Number(raw);
      if (meta && Array.isArray(meta.service.steps) && meta.service.steps[idx]) meta.service.steps[idx].action = t.value;
    })) return;
    if (updateField("data-socd-details", (raw) => {
      const meta = findServiceMetaById(sunriseControlState.socSelectedServiceId);
      const idx = Number(raw);
      if (meta && Array.isArray(meta.service.steps) && meta.service.steps[idx]) meta.service.steps[idx].details = t.value;
    })) return;
    if (updateField("data-socd-status", (raw) => {
      const meta = findServiceMetaById(sunriseControlState.socSelectedServiceId);
      const idx = Number(raw);
      if (meta && Array.isArray(meta.service.steps) && meta.service.steps[idx]) meta.service.steps[idx].status = t.value;
    })) return;

    if (updateField("data-lcs-id", (raw) => { sunriseControlState.lcsSessions[Number(raw)].id = t.value.trim(); })) return;
    if (updateField("data-lcs-code", (raw) => { sunriseControlState.lcsSessions[Number(raw)].code = t.value.trim(); })) return;
    if (updateField("data-lcs-employee", (raw) => { sunriseControlState.lcsSessions[Number(raw)].employee = t.value; })) return;
    if (updateField("data-lcs-login", (raw) => { sunriseControlState.lcsSessions[Number(raw)].loginAt = t.value; })) return;
    if (updateField("data-lcs-logout", (raw) => { sunriseControlState.lcsSessions[Number(raw)].logoutAt = t.value; })) return;
    if (updateField("data-lcs-session", (raw) => { sunriseControlState.lcsSessions[Number(raw)].session = t.value; })) return;
    if (updateField("data-lcs-permission", (raw) => { sunriseControlState.lcsSessions[Number(raw)].permission = t.value; })) return;
  });
}

function sunriseDetailCard(section) {
  const rows = (section.rows || []).map((row) => `<li>${markUsd(row)}</li>`).join("");
  return `<article class="sunriseDetailCard${section.wide ? " sunriseDetailWide" : ""}"><h3>${section.title}</h3><p class="opsText">${markUsd(section.summary || "")}</p><ul class="sunriseDetailList">${rows}</ul></article>`;
}

const sunriseDetailContent = {
  "sunrise-revenue": [
    { title: "Revenue Flow Access", summary: "Complete operational visibility of revenue inflow, outflow, and margin stability.", rows: ["Gross bookings (24h): $612,940 | Net recognized (24h): $462,380.", "Revenue by service type: Travel 41%, Security 27%, Special Requests 19%, Real Estate Management 13%.", "High-yield corridors: Dubai-Monaco, Zurich-Singapore, London-New York.", "Top variance source: overnight surge staffing (+6.2% cost impact)."] },
    { title: "Detailed Insights", summary: "Performance depth by team, client segment, and execution reliability.", rows: ["Enterprise accounts produced 58% of net revenue in past 7 days.", "Repeat-client basket value +14.1% versus previous month.", "Average billing cycle: 3.6 days | collection efficiency: 97.8%.", "Revenue-at-risk (open disputes): $18,420 with 72h review target."] },
    { title: "Tactical Notes", summary: "Immediate actions for revenue integrity and growth continuity.", rows: ["Increase high-margin weekend package availability in GCC lanes.", "Keep Red/Noir rapid-dispatch corridors above 22% reserve capacity.", "Apply dynamic pricing guardrails for last-minute cross-border routes.", "Escalate partner SLA breaches above 2 occurrences/day."] }
  ],
  "sunrise-sales": [
    { title: "Services Sold", summary: "Comprehensive sales metrics across channels and concierge desks.", rows: ["Total services sold today: 186 | converted leads: 131.", "Upsales completed: 42 (22.6% upsale rate).", "Cross-team collaborations closed: 18 strategic bundles.", "Average close time: 1h 48m for priority clients."] },
    { title: "Pipeline & Conversion", summary: "Lead quality and conversion performance with deep breakdown.", rows: ["Inbound conversion: 64.2% | referral conversion: 71.9%.", "Decline reasons: timing mismatch 38%, budget limits 26%, scope change 21%.", "Highest close rates by concierge desk: Security, Lifestyle, Aviation.", "Follow-up completion SLA: 96.4% within 20 minutes."] },
    { title: "Commercial Insights", summary: "Sales efficiency measures and quality indicators.", rows: ["Top collaboration partner group generated $94,300 net this week.", "Noir/Red bundles show strongest retention curve (93% continuation).", "Average discount utilization remains controlled at 4.8%.", "Priority recommendation: expand enterprise travel-security packaged offers."] }
  ],
  "sunrise-marketing": [
    { title: "General Marketing Flow", summary: "Detailed campaign and channel flow across all audience segments.", rows: ["Active campaigns: 14 | high-performing campaigns: 6.", "Organic discovery contribution: 37% of inbound leads.", "Partner and collaboration channels contributed 29% of qualified traffic.", "Engagement quality index: 8.4/10 this week."] },
    { title: "Performance Analytics", summary: "Detailed insight into cost, response, and effectiveness.", rows: ["Cost per qualified lead: $18.20 | conversion-to-service: 22.3%.", "Top region response: GCC + Western Europe.", "Best creative format: short operational case studies (+31% CTR).", "Campaign fatigue risk detected on 2 ad groups; refresh scheduled."] },
    { title: "Strategic Enhancement", summary: "Execution recommendations for next cycle.", rows: ["Increase founder-message campaign frequency for high-tier prospects.", "Deploy concierge spotlight series for trust-led acquisition.", "Boost airport execution narratives in enterprise segment.", "Expand multilingual campaigns on high-LTV corridors."] }
  ],
  "sunrise-locations": [
    { title: "VVS Office Network", summary: "Global office footprint with operational role by location.", rows: ["Primary offices: Dubai, London, Monaco, Zurich, Singapore.", "Secondary offices: Rome, Paris, Tokyo, Doha, Sofia.", "24/7 command hubs active: Dubai, London, Singapore.", "Operational handoff latency target: below 4 minutes."] },
    { title: "Immediate-Response (IR) Locations", summary: "Rapid deployment points for urgent assignments.", rows: ["Active IR stations: 28 globally.", "Average mobilization time: 11m 40s.", "IR readiness above target in 25/28 stations.", "Under review: 3 stations with partner-security staffing gaps."] },
    { title: "Coverage Control", summary: "Location-level quality and risk indicators.", rows: ["Coverage confidence index: 96.9%.", "Airport-zone exposure reduced by 12% since last month.", "High-volume congestion forecast in 2 corridors this weekend.", "Action: pre-stage reserve teams 6h before predicted peak windows."] }
  ],
  "sunrise-maintenance": [
    { title: "Cleaning and Reset Queue", summary: "After-service and pre-service cleanings with quality checkpoints.", rows: ["Completed post-service cleanings today: 92.", "Pre-service preparations completed: 108.", "Quality verification pass rate: 99.2%.", "Escalated resets pending: 3 (target closure under 6 hours)."] },
    { title: "Operational Continuity", summary: "Asset/service continuity through structured maintenance cadence.", rows: ["Average turnaround time between services: 2h 12m.", "Most common delay source: vendor late access window.", "On-time readiness for next assignment: 97.4%.", "Priority directive: tighten handoff checklist compliance to 100%."] },
    { title: "Service Standard Audits", summary: "Detailed audit outcomes for maintenance consistency.", rows: ["Audit coverage (7d): 100% critical assets.", "Minor deviations found: 11 | resolved same day: 10.", "No critical sanitation non-compliance recorded.", "Next audit wave scheduled for IR-heavy locations first."] }
  ],
  "sunrise-employees": [
    { title: "Employee Performance", summary: "Performance detail by role, shift, and execution quality.", rows: ["Concierge productivity index: 94.7/100.", "Security execution consistency: 97.2/100.", "Cross-team handoff quality score: 95.1/100.", "Average overtime utilization: 6h 44m per high-load operator."] },
    { title: "Wages Paid / To Be Paid", summary: "Financial and payroll transparency across all active teams.", rows: ["Wages paid (current cycle): $284,900.", "Wages pending (next 72h): $116,300.", "Payroll discrepancy flags: 0 critical | 2 minor reconciliations.", "Compensation SLA compliance: 100% on core payroll windows."] },
    { title: "People Ops Signals", summary: "Capacity and retention indicators to protect service quality.", rows: ["Fatigue watchlist: 9 employees (rotations already applied).", "Training completion rate this month: 91%.", "Retention risk low across top-performing desks.", "Action: expand backup staffing for night-shift airport corridors."] }
  ],
  "sunrise-services": [
    { title: "Active Services by Priority", summary: "All services to be completed within requested timeframes.", rows: ["Basic priority queue: 64 open.", "Elevated priority queue: 31 open.", "High critical queue: 12 open.", "Average SLA adherence across all queues: 97.6%."] },
    { title: "Timing and Completion", summary: "Execution timing precision and service closure quality.", rows: ["On-time completion: 95.8% today.", "Near-delay interventions: 14 (resolved before SLA breach).", "Current longest open request age: 5h 21m.", "Escalations requiring owner visibility: 2."] },
    { title: "Past Service Performance", summary: "Historical quality and corrective action depth.", rows: ["7-day completion quality average: 96.9%.", "Client-verified successful closures: 99.1%.", "Repeat issue clusters: transfer congestion, partner check-in lag.", "Corrective plans deployed on 4 underperforming partner nodes."] }
  ],
  "sunrise-legality": [
    { title: "Legal Cases Overview", summary: "Active and resolved legal matters with operational impact mapping.", rows: ["Active legal cases: 14 | high priority: 3.", "Resolved cases this quarter: 29.", "No active injunction affecting service delivery corridors.", "Escalated counsel reviews due this week: 5."] },
    { title: "Documents to Review", summary: "Document control and legal filebox monitoring.", rows: ["Documents pending legal review: 187.", "Critical contract renewals in 30-day window: 21.", "Compliance document accuracy score: 98.3%.", "Digital filebox indexing completion: 100% current month."] },
    { title: "Follow-up Control", summary: "Case progression and legal operation continuity.", rows: ["Average legal response turnaround: 9h 12m.", "Unreviewed critical filings: 0.", "Case closure efficiency improved 12% month-over-month.", "Action: accelerate jurisdiction-specific template updates."] }
  ],
  "sunrise-expenses": [
    { title: "Expense Detail", summary: "Granular expense breakdown with operational context.", rows: ["24h total expenses: $104,770.", "Category split: Aviation 39%, Security 28%, Hospitality 19%, Ops 14%.", "Outlier costs detected in one premium lounge partner chain.", "Cost-control compliance index: 93.6%."] },
    { title: "Highlights and Signals", summary: "Where spend improved and where attention is required.", rows: ["Fuel procurement optimization saved 6.1% this week.", "Security contractor overnight rates rose 4.4%.", "Rapid-transfer overtime spend stable within target.", "Vendor renegotiation opportunities identified in 3 markets."] },
    { title: "Recommended Adjustments", summary: "Immediate and mid-term expense optimization actions.", rows: ["Shift low-yield transfer blocks to fixed-rate partner pools.", "Apply weekend surge caps in low-complexity corridors.", "Bundle recurring hospitality procurements quarterly.", "Expand performance-based partner payment clauses."] }
  ],
  "sunrise-income": [
    { title: "Income Trace", summary: "Full income tracking and profitability visibility.", rows: ["Total recognized income (MTD): $8.42M.", "Net income (MTD): $3.29M.", "Net YTD: $29.4M with 11.8% growth versus prior year.", "Receivables due in next 72h: $298,450."] },
    { title: "Profitability Breakdown", summary: "Net result detail by tier, service type, and region.", rows: ["Highest net margin: Red/Noir strategic bundles.", "Regional net leaders: GCC, DACH, UK.", "Lowest margin segments flagged for pricing recalibration.", "Profit leakage risk currently contained under 1.9%."] },
    { title: "Forward Income Outlook", summary: "Forecast detail and collection reliability indicators.", rows: ["30-day projected net: $4.8M (confidence 0.83).", "Collection punctuality: 97.1% within expected window.", "Potential downside scenarios modeled with hedge controls.", "Action: prioritize high-trust enterprise renewals this cycle."] }
  ],
  "sunrise-surveys": [
    { title: "Survey and Review Intelligence", summary: "Comprehensive customer feedback analytics and FAQ handling depth.", rows: ["New surveys in 24h: 184 | processed: 184.", "Average response time: 12m 34s.", "Most asked question: urgent same-day international routing.", "Most discussed positive topic: concierge discretion and speed.", "Most discussed negative topic: occasional partner transfer wait time."] },
    { title: "Feedback Control", summary: "Response quality and sentiment operations.", rows: ["Positive sentiment: 91.8% | neutral: 6.2% | negative: 2.0%.", "FAQ responded coverage: 99.4%.", "Escalated complaint threads open: 4.", "Owner-watch list clients requiring direct follow-up: 3."] }
  ],
  "sunrise-events": [
    { title: "Upcoming Event Planning", summary: "Detailed pipeline for upcoming events with resource commitments.", rows: ["Upcoming events in planning: 17.", "Critical events in next 7 days: 5.", "Pre-event readiness average: 94.9%.", "Cross-team resource lock confirmed for 100% high-priority events."] },
    { title: "Past Event Metrics", summary: "Performance depth on completed events.", rows: ["Past 30-day events delivered: 49.", "On-time event execution: 97.3%.", "Client satisfaction for event operations: 96.8%.", "Primary delays source: venue access clearance in 2 cities."] },
    { title: "VVS Response Precision", summary: "Operational responsiveness for clients and teams.", rows: ["Average incident-response in live events: 6m 09s.", "Team update cadence compliance: 98.1%.", "Client update confirmation rate: 99.0%.", "Action: increase pre-event simulation on complex multi-leg events."] }
  ],
  "sunrise-performance": [
    { title: "Company Performance Overview", summary: "Overall VVS operational health with detailed insight indicators.", rows: ["Global execution success: 97.9%.", "Average dispatch latency: 4m 21s.", "Cross-department delivery reliability: 96.4%.", "Strategic objective completion this month: 88%."] },
    { title: "Operational Quality", summary: "Quality and resilience metrics across all business lines.", rows: ["Critical incident rate remains below 0.3%.", "Escalation containment success: 94.6%.", "Partner SLA adherence: 95.2%.", "High-tier client continuity index: 98.7%."] },
    { title: "Financial + Service Synthesis", summary: "Unified business and delivery performance signals.", rows: ["Revenue-to-service quality correlation remains strongly positive.", "Cost-to-quality efficiency improved 5.2% month-over-month.", "Client retention trajectory above annual benchmark.", "Recommended focus: preserve speed while expanding strategic capacity."] }
  ]
};

function renderSunriseModulePages() {
  sunriseModuleRoutes.forEach((route) => {
    const page = document.querySelector(`.routePage[data-page="${route}"]`);
    if (!page) return;
    const grid = page.querySelector(".sunriseDetailGrid");
    if (!grid) return;
    const sections = sunriseDetailContent[route] || [];
    const cards = sections.map((section) => sunriseDetailCard(section)).join("");
    let extra = "";
    if (route === "sunrise-surveys") {
      extra = `<article class="sunriseDetailCard sunriseDetailWide"><h3>Respond to Client (Demo)</h3><form class="sunriseReplyForm sunriseClientReplyForm"><div class="field"><label>Client Email</label><input class="input sunrise-client-email" type="email" required /></div><div class="field"><label>Response Message</label><textarea class="input sunrise-client-reply" rows="3" required></textarea></div><div class="sunriseModuleActions"><button class="sunriseMiniBtn" type="submit">Send Response</button></div></form><p class="authInfo sunrise-reply-info"></p></article>`;
    }
    grid.innerHTML = `${cards}${extra}`;
  });
}

function bindSunriseReplyForms() {
  const forms = Array.from(document.querySelectorAll(".sunriseClientReplyForm"));
  forms.forEach((form) => {
    if (form.dataset.boundReply === "1") return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const email = form.querySelector(".sunrise-client-email");
      const info = form.parentElement ? form.parentElement.querySelector(".sunrise-reply-info") : null;
      if (info) info.textContent = `Reply queued for ${email ? email.value.trim() : "client"} from concierge@venture-voyagers.com. API delivery will be connected later.`;
      form.reset();
    });
    form.dataset.boundReply = "1";
  });
}

sunriseControlState = loadSunriseControlState();
try {
  ensureSunriseSessionRecord();
  renderSunriseModulePages();
  renderCustomSunriseControlPages();
  ensureSunriseInboxTopButtons();
  bindSunriseControlInteractions();
  bindSunriseReplyForms();
} catch (err) {
  // Keep auth and verification flows alive even if a Sunrise view block fails.
  console.error("Sunrise init error:", err);
  if (!sunriseControlState) sunriseControlState = cloneDefaultSunriseControlState();
  try { bindSunriseControlInteractions(); } catch (_) {}
}
if (sameConciergeBtn) {
  sameConciergeBtn.addEventListener("click", () => {
    if (!activeAccount) return;
    const assigned = currentAssignedConcierge;
    const label = assigned ? `${assigned.name} (${assigned.role})` : "assigned concierge";
    if (sameConciergeResult) sameConciergeResult.textContent = `Availability check submitted for ${label}. Concierge desk will confirm assignment shortly.`;
  });
}

if (sunriseStep1) {
  sunriseStep1.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!sunriseStep1.reportValidity()) return;
    if (!isOwnerAccount(activeAccount)) {
      if (sunriseInfo) sunriseInfo.textContent = "Owner account required.";
      return;
    }

    const emailEl = document.getElementById("sunrise-email");
    const passwordEl = document.getElementById("sunrise-password");
    const email = emailEl ? emailEl.value.trim() : "";
    const password = passwordEl ? passwordEl.value.trim() : "";
    const account = findAccountByEmail(email);
    const allPasswords = account
      ? [String(account.password), ...((account.altPasswords || []).map((item) => String(item)))]
      : [];
    const passOk = account && allPasswords.some((stored) =>
      password === stored || password.toLowerCase() === stored.toLowerCase()
    );

  if (!account || !passOk || !isSunriseCredentialAccount(account)) {
      if (sunriseInfo) sunriseInfo.textContent = "Sunrise log in failed. Check your Sunrise email or password.";
      return;
    }

    sunriseState.email = String(account.email || email).trim().toLowerCase();
    sunriseState.account = account;
    sunriseState.code = issueTestEmailCode(sunriseState.email);

    sunriseStep1.hidden = true;
    if (sunriseStep2) sunriseStep2.hidden = false;
    if (sunriseInfo) {
      sunriseInfo.textContent = `VVS Sunrise email confirmation sent to ${sunriseState.email} from concierge@venture-voyagers.com (Subject: VVS email confirmation). Test code: ${sunriseState.code}.`;
    }
  });
}

if (sunriseStep2) {
  sunriseStep2.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!sunriseStep2.reportValidity()) return;
    const phraseEl = document.getElementById("sunrise-phrase");
    const codeEl = document.getElementById("sunrise-code");
    const phrase = phraseEl ? phraseEl.value.trim().toLowerCase() : "";
    const code = codeEl ? codeEl.value.trim() : "";
    const account = sunriseState.account || findAccountByEmail(sunriseState.email);

    const phraseOk = !!(account && phrase && phrase === String(account.secretPhrase || "").toLowerCase());
    const codeOk = !!(code && code === sunriseState.code);
    if (!phraseOk || !codeOk) {
      if (sunriseInfo) sunriseInfo.textContent = "Sunrise verification failed. Confirm secret phrase and code.";
      return;
    }

    sunriseState.unlocked = true;
    startNotosSession(account);
    persistSunriseSession(account);
    if (sunriseInfo) sunriseInfo.textContent = "Sunrise access granted.";
    updateSunriseAccessView();
    renderSunrise(activeAccount);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    activeAccount = null;
    resetSunriseState();
    clearActiveSession();
    updateAuthCta();
    showRoute("home");
  });
}

if (sunriseLogoutBtn) {
  sunriseLogoutBtn.addEventListener("click", () => {
    resetSunriseState();
    showRoute("sunrise");
  });
}

sunriseRouteLogoutBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    resetSunriseState();
    showRoute("sunrise");
  });
});
