document.getElementById("year").textContent = new Date().getFullYear();

const authCta = document.getElementById("auth-cta");
let activeAccount = null;
let currentAssignedConcierge = null;
let sunriseControlState = null;
const SESSION_EMAIL_KEY = "vvs_active_account_email";
const SESSION_ACCOUNT_SNAPSHOT_KEY = "vvs_active_account_snapshot";
const SUNRISE_SESSION_KEY = "vvs_sunrise_session";
const SUNRISE_CONTROL_DATA_KEY = "vvs_sunrise_control_data";
const MONARCH_ARCHANGEL_DATA_KEY = "vvs_monarch_archangel_data";
const ACCOUNTS_DATA_KEY = "vvs_accounts_data";
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
  "concierge.basic@vvs.com": {
    email: "concierge.basic@vvs.com",
    password: "Concierge#2026",
    secretPhrase: "MarbleKey",
    prefix: "Ms.",
    firstName: "Camille",
    lastName: "Rowan",
    country: "United Kingdom",
    membership: "Staff",
    sunriseAccessLevel: "STA",
    notosId: "NTS-2147C",
    roleTitle: "Concierge (Basic Employee)",
    servicesCompleted: 0,
    pastService: { title: "N/A", details: "Internal employee account.", endedAt: "N/A" },
    upcomingService: { title: "N/A", details: "Internal employee account.", startsAt: "N/A" },
    tips: []
  },
  "ssr.supervisor@vvs.com": {
    email: "ssr.supervisor@vvs.com",
    password: "Ssr!Supervisor26",
    secretPhrase: "AuroraLock",
    prefix: "Mr.",
    firstName: "Rafael",
    lastName: "Novak",
    country: "Spain",
    membership: "Staff",
    sunriseAccessLevel: "SS",
    notosId: "NTS-5802R",
    roleTitle: "Special Service Requests Supervisor",
    servicesCompleted: 0,
    pastService: { title: "N/A", details: "Internal employee account.", endedAt: "N/A" },
    upcomingService: { title: "N/A", details: "Internal employee account.", startsAt: "N/A" },
    tips: []
  },
  "red.concierge.head@vvs.com": {
    email: "red.concierge.head@vvs.com",
    password: "RedHead#2626",
    secretPhrase: "CrimsonCode",
    prefix: "Mrs.",
    firstName: "Selena",
    lastName: "Ward",
    country: "United Arab Emirates",
    membership: "Staff",
    sunriseAccessLevel: "CA",
    notosId: "NTS-9346S",
    roleTitle: "RED Head of Concierge Team",
    servicesCompleted: 0,
    pastService: { title: "N/A", details: "Internal employee account.", endedAt: "N/A" },
    upcomingService: { title: "N/A", details: "Internal employee account.", startsAt: "N/A" },
    tips: []
  },
  "ops.director@vvs.com": {
    email: "ops.director@vvs.com",
    password: "DirectorOps@26",
    secretPhrase: "AtlasNode",
    prefix: "Dr.",
    firstName: "Ibrahim",
    lastName: "Khaled",
    country: "Qatar",
    membership: "Staff",
    sunriseAccessLevel: "DA",
    notosId: "NTS-7024K",
    roleTitle: "Director of Operations",
    servicesCompleted: 0,
    pastService: { title: "N/A", details: "Internal employee account.", endedAt: "N/A" },
    upcomingService: { title: "N/A", details: "Internal employee account.", startsAt: "N/A" },
    tips: []
  },
  "cmo@vvs.com": {
    email: "cmo@vvs.com",
    password: "CMO!Vision26",
    secretPhrase: "BloomThread",
    prefix: "Ms.",
    firstName: "Gianna",
    lastName: "Vale",
    country: "Italy",
    membership: "Staff",
    sunriseAccessLevel: "SM",
    notosId: "NTS-4475V",
    roleTitle: "Chief Marketing Officer",
    servicesCompleted: 0,
    pastService: { title: "N/A", details: "Internal employee account.", endedAt: "N/A" },
    upcomingService: { title: "N/A", details: "Internal employee account.", startsAt: "N/A" },
    tips: []
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

const SEEDED_ACCOUNTS_DATA = JSON.parse(JSON.stringify(accounts));

function buildManagedStaffSeed({
  email = "",
  password = "",
  secretPhrase = "",
  prefix = "Mr.",
  firstName = "",
  lastName = "",
  country = "",
  sunriseAccessLevel = "STA",
  notosId = "",
  roleTitle = "Staff",
  phone = "",
  staffDivision = "Office",
  rtaRoles = []
} = {}) {
  return {
    email,
    password,
    secretPhrase,
    prefix,
    firstName,
    lastName,
    country,
    phone,
    membership: "Staff",
    sunriseAccessLevel,
    notosId,
    roleTitle,
    staffDivision,
    rtaRoles: Array.isArray(rtaRoles) ? rtaRoles.slice() : [],
    servicesCompleted: 0,
    pastService: { title: "N/A", details: "Internal employee account.", endedAt: "N/A" },
    upcomingService: { title: "N/A", details: "Internal employee account.", startsAt: "N/A" },
    tips: []
  };
}

const managedStaffDirectory = {
  "concierge.basic@vvs.com": buildManagedStaffSeed({
    email: "concierge.basic@vvs.com",
    password: "Concierge#2026",
    secretPhrase: "MarbleKey",
    prefix: "Ms.",
    firstName: "Camille",
    lastName: "Rowan",
    country: "United Kingdom",
    sunriseAccessLevel: "STA",
    notosId: "NTS-2147C",
    roleTitle: "Office Concierge Associate",
    phone: "+44 20 7946 8501",
    staffDivision: "Office",
    rtaRoles: ["concierge"]
  }),
  "office.associate@vvs.com": buildManagedStaffSeed({
    email: "office.associate@vvs.com",
    password: "OfficeAssociate#26",
    secretPhrase: "HelixLedger",
    prefix: "Ms.",
    firstName: "Clara",
    lastName: "Mensah",
    country: "United Kingdom",
    sunriseAccessLevel: "SA",
    notosId: "NTS-2751A",
    roleTitle: "Office Client Associate",
    phone: "+44 20 7946 8514",
    staffDivision: "Office"
  }),
  "office.supervisor@vvs.com": buildManagedStaffSeed({
    email: "office.supervisor@vvs.com",
    password: "OfficeSupervisor#26",
    secretPhrase: "BronzeOrbit",
    prefix: "Mr.",
    firstName: "Omar",
    lastName: "Petrov",
    country: "Bulgaria",
    sunriseAccessLevel: "SS",
    notosId: "NTS-3488S",
    roleTitle: "Office Service Supervisor",
    phone: "+359 2 492 5508",
    staffDivision: "Office"
  }),
  "office.management@vvs.com": buildManagedStaffSeed({
    email: "office.management@vvs.com",
    password: "OfficeManager#26",
    secretPhrase: "AmberVector",
    prefix: "Ms.",
    firstName: "Sofia",
    lastName: "Arden",
    country: "Italy",
    sunriseAccessLevel: "SM",
    notosId: "NTS-4160M",
    roleTitle: "Office Operations Manager",
    phone: "+39 02 8712 4522",
    staffDivision: "Office"
  }),
  "office.directorate@vvs.com": buildManagedStaffSeed({
    email: "office.directorate@vvs.com",
    password: "OfficeDirectorate#26",
    secretPhrase: "IvoryBridge",
    prefix: "Mr.",
    firstName: "Matteo",
    lastName: "Kruger",
    country: "Germany",
    sunriseAccessLevel: "DA",
    notosId: "NTS-5871D",
    roleTitle: "Office Directorate Coordinator",
    phone: "+49 30 2840 7611",
    staffDivision: "Office"
  }),
  "office.chairman@vvs.com": buildManagedStaffSeed({
    email: "office.chairman@vvs.com",
    password: "OfficeChairman#26",
    secretPhrase: "OnyxHarbor",
    prefix: "Mrs.",
    firstName: "Evelyn",
    lastName: "Laurent",
    country: "France",
    sunriseAccessLevel: "CA",
    notosId: "NTS-6405C",
    roleTitle: "Office Executive Chairman Liaison",
    phone: "+33 1 84 88 1150",
    staffDivision: "Office"
  }),
  "ssr.supervisor@vvs.com": buildManagedStaffSeed({
    email: "ssr.supervisor@vvs.com",
    password: "Ssr!Supervisor26",
    secretPhrase: "AuroraLock",
    prefix: "Mr.",
    firstName: "Rafael",
    lastName: "Novak",
    country: "Spain",
    sunriseAccessLevel: "SS",
    notosId: "NTS-5802R",
    roleTitle: "Special Service Requests Supervisor",
    phone: "+34 91 003 4410",
    staffDivision: "Special Requests"
  }),
  "red.concierge.head@vvs.com": buildManagedStaffSeed({
    email: "red.concierge.head@vvs.com",
    password: "RedHead#2626",
    secretPhrase: "CrimsonCode",
    prefix: "Mrs.",
    firstName: "Selena",
    lastName: "Ward",
    country: "United Arab Emirates",
    sunriseAccessLevel: "CA",
    notosId: "NTS-9346S",
    roleTitle: "RED Head of Concierge Team",
    phone: "+971 4 555 7701",
    staffDivision: "Special Requests",
    rtaRoles: ["concierge"]
  }),
  "ops.director@vvs.com": buildManagedStaffSeed({
    email: "ops.director@vvs.com",
    password: "DirectorOps@26",
    secretPhrase: "AtlasNode",
    prefix: "Dr.",
    firstName: "Ibrahim",
    lastName: "Khaled",
    country: "Qatar",
    sunriseAccessLevel: "DA",
    notosId: "NTS-7024K",
    roleTitle: "Director of Operations",
    phone: "+974 4008 2140",
    staffDivision: "Headquarters"
  }),
  "cmo@vvs.com": buildManagedStaffSeed({
    email: "cmo@vvs.com",
    password: "CMO!Vision26",
    secretPhrase: "BloomThread",
    prefix: "Ms.",
    firstName: "Gianna",
    lastName: "Vale",
    country: "Italy",
    sunriseAccessLevel: "SM",
    notosId: "NTS-4475V",
    roleTitle: "Chief Marketing Officer",
    phone: "+39 02 8712 4490",
    staffDivision: "Headquarters"
  }),
  "pilot.luca@venture-voyagers.com": buildManagedStaffSeed({
    email: "pilot.luca@venture-voyagers.com",
    password: "LucaFleet#26",
    secretPhrase: "AquilaWing",
    prefix: "Capt.",
    firstName: "Luca",
    lastName: "Ferri",
    country: "United Arab Emirates",
    sunriseAccessLevel: "SA",
    notosId: "NTS-4117L",
    roleTitle: "Fleet Captain",
    phone: "+971 50 440 1937",
    staffDivision: "Field",
    rtaRoles: ["fleet"]
  }),
  "pilot.emilia@venture-voyagers.com": buildManagedStaffSeed({
    email: "pilot.emilia@venture-voyagers.com",
    password: "EmiliaFleet#26",
    secretPhrase: "NorthStar",
    prefix: "Capt.",
    firstName: "Emilia",
    lastName: "Rozen",
    country: "Lithuania",
    sunriseAccessLevel: "SA",
    notosId: "NTS-5221E",
    roleTitle: "Fleet Captain",
    phone: "+370 612 440 991",
    staffDivision: "Field",
    rtaRoles: ["fleet"]
  }),
  "driver.rashid@venture-voyagers.com": buildManagedStaffSeed({
    email: "driver.rashid@venture-voyagers.com",
    password: "RashidDrive#26",
    secretPhrase: "DesertRoute",
    prefix: "Mr.",
    firstName: "Rashid",
    lastName: "Al Nuaimi",
    country: "United Arab Emirates",
    sunriseAccessLevel: "STA",
    notosId: "NTS-6382R",
    roleTitle: "Executive Driver",
    phone: "+971 52 771 9024",
    staffDivision: "Field",
    rtaRoles: ["driver"]
  }),
  "driver.tomas@venture-voyagers.com": buildManagedStaffSeed({
    email: "driver.tomas@venture-voyagers.com",
    password: "TomasDrive#26",
    secretPhrase: "BalticRoute",
    prefix: "Mr.",
    firstName: "Tomas",
    lastName: "Vaitkus",
    country: "Lithuania",
    sunriseAccessLevel: "STA",
    notosId: "NTS-6473T",
    roleTitle: "Executive Driver",
    phone: "+370 622 771 204",
    staffDivision: "Field",
    rtaRoles: ["driver"]
  }),
  "concierge.benedict@venture-voyagers.com": buildManagedStaffSeed({
    email: "concierge.benedict@venture-voyagers.com",
    password: "BenedictDesk#26",
    secretPhrase: "GraniteDesk",
    prefix: "Mr.",
    firstName: "Benedict",
    lastName: "Hale",
    country: "United Arab Emirates",
    sunriseAccessLevel: "SS",
    notosId: "NTS-7714B",
    roleTitle: "Voyager Red Concierge",
    phone: "+971 58 006 1183",
    staffDivision: "Special Requests",
    rtaRoles: ["concierge"]
  }),
  "concierge.selene@venture-voyagers.com": buildManagedStaffSeed({
    email: "concierge.selene@venture-voyagers.com",
    password: "SeleneDesk#26",
    secretPhrase: "MonacoDesk",
    prefix: "Ms.",
    firstName: "Selene",
    lastName: "Marwick",
    country: "Lithuania",
    sunriseAccessLevel: "SS",
    notosId: "NTS-7822S",
    roleTitle: "Voyager Red Concierge",
    phone: "+370 655 908 332",
    staffDivision: "Special Requests",
    rtaRoles: ["concierge"]
  }),
  "security.idris@venture-voyagers.com": buildManagedStaffSeed({
    email: "security.idris@venture-voyagers.com",
    password: "IdrisSec#26",
    secretPhrase: "ShieldLine",
    prefix: "Mr.",
    firstName: "Idris",
    lastName: "Kamel",
    country: "United Arab Emirates",
    sunriseAccessLevel: "SS",
    notosId: "NTS-8106I",
    roleTitle: "Head of Security",
    phone: "+971 56 990 7742",
    staffDivision: "Field",
    rtaRoles: ["security"]
  }),
  "security.aurelijus@venture-voyagers.com": buildManagedStaffSeed({
    email: "security.aurelijus@venture-voyagers.com",
    password: "AurelijusSec#26",
    secretPhrase: "IronRoute",
    prefix: "Mr.",
    firstName: "Aurelijus",
    lastName: "Kazlauskas",
    country: "Lithuania",
    sunriseAccessLevel: "SS",
    notosId: "NTS-8264A",
    roleTitle: "Head of Security",
    phone: "+370 669 120 883",
    staffDivision: "Field",
    rtaRoles: ["security"]
  }),
  "special.requests.lina@venture-voyagers.com": buildManagedStaffSeed({
    email: "special.requests.lina@venture-voyagers.com",
    password: "LinaRequests#26",
    secretPhrase: "VelvetThread",
    prefix: "Ms.",
    firstName: "Lina",
    lastName: "Rossi",
    country: "Italy",
    sunriseAccessLevel: "SA",
    notosId: "NTS-9055L",
    roleTitle: "Special Requests Concierge",
    phone: "+39 06 9481 3320",
    staffDivision: "Special Requests",
    rtaRoles: ["concierge"]
  })
};

function cloneManagedStaffValue(value) {
  if (Array.isArray(value)) return value.map((item) => cloneManagedStaffValue(item));
  if (value && typeof value === "object") return JSON.parse(JSON.stringify(value));
  return value;
}

function hydrateManagedStaffDirectory() {
  Object.entries(managedStaffDirectory).forEach(([key, seed]) => {
    if (!accounts[key]) {
      accounts[key] = cloneManagedStaffValue(seed);
      return;
    }
    const account = accounts[key];
    Object.entries(seed).forEach(([field, value]) => {
      if (field === "rtaRoles") {
        if (!Array.isArray(account.rtaRoles) || !account.rtaRoles.length) {
          account.rtaRoles = cloneManagedStaffValue(value);
        }
        return;
      }
      if (field === "tips" || field === "pastService" || field === "upcomingService") {
        if (!account[field] || (typeof account[field] === "object" && !Object.keys(account[field]).length)) {
          account[field] = cloneManagedStaffValue(value);
        }
        return;
      }
      if (account[field] == null || account[field] === "") {
        account[field] = cloneManagedStaffValue(value);
      }
    });
  });
}

function normalizeAccountsObject(raw) {
  if (!raw || typeof raw !== "object") return null;
  const normalized = {};
  Object.entries(raw).forEach(([rawKey, rawAccount]) => {
    if (!rawAccount || typeof rawAccount !== "object") return;
    const key = String(rawKey || rawAccount.email || "").trim().toLowerCase();
    if (!key) return;
    normalized[key] = {
      ...rawAccount,
      email: String(rawAccount.email || key).trim()
    };
  });
  return Object.keys(normalized).length ? normalized : null;
}

function cloneAccountsPayload(value = null) {
  if (value === null || value === undefined) return null;
  try {
    return JSON.parse(JSON.stringify(value));
  } catch (_) {
    return null;
  }
}

function isBlankLikeStoredString(value = "") {
  const text = String(value ?? "").trim();
  if (!text) return true;
  return /^(undefined|null)$/i.test(text);
}

function mergeStoredValuePreservingSeed(seedValue, incomingValue) {
  if (incomingValue === undefined || incomingValue === null) {
    return cloneAccountsPayload(seedValue) ?? seedValue;
  }
  if (seedValue === undefined || seedValue === null) {
    return cloneAccountsPayload(incomingValue) ?? incomingValue;
  }
  if (typeof seedValue === "string" || typeof incomingValue === "string") {
    if (isBlankLikeStoredString(incomingValue) && !isBlankLikeStoredString(seedValue)) {
      return String(seedValue);
    }
    return String(incomingValue);
  }
  if (Array.isArray(seedValue) || Array.isArray(incomingValue)) {
    const seedArray = Array.isArray(seedValue) ? seedValue : [];
    const incomingArray = Array.isArray(incomingValue) ? incomingValue : [];
    if (!incomingArray.length && seedArray.length) {
      return cloneAccountsPayload(seedArray) ?? seedArray.slice();
    }
    return cloneAccountsPayload(incomingArray) ?? incomingArray.slice();
  }
  if (typeof seedValue === "object" && typeof incomingValue === "object") {
    const merged = {};
    const keys = new Set([
      ...Object.keys(seedValue || {}),
      ...Object.keys(incomingValue || {})
    ]);
    keys.forEach((key) => {
      merged[key] = mergeStoredValuePreservingSeed(seedValue?.[key], incomingValue?.[key]);
    });
    return merged;
  }
  return incomingValue;
}

function buildMergedAccountsPayload(nextAccounts) {
  const seeded = normalizeAccountsObject(cloneAccountsPayload(SEEDED_ACCOUNTS_DATA)) || {};
  const incoming = normalizeAccountsObject(nextAccounts) || {};
  const merged = { ...seeded };
  Object.entries(incoming).forEach(([key, value]) => {
    const seededAccount = seeded[key] && typeof seeded[key] === "object" ? seeded[key] : {};
    const incomingAccount = value && typeof value === "object" ? value : {};
    merged[key] = normalizeAccountServiceCards({
      ...mergeStoredValuePreservingSeed(
        cloneAccountsPayload(seededAccount) || {},
        cloneAccountsPayload(incomingAccount) || {}
      ),
      email: String(incomingAccount.email || seededAccount.email || key).trim()
    });
  });
  return Object.keys(merged).length ? merged : null;
}

function isProtectedOwnerSunriseCredentialKey(rawKey = "") {
  const key = String(rawKey || "").trim().toLowerCase();
  return key === "aleks.sunrise@vvs.com" || key === "mikhail.sunrise@vvs.com";
}

function isProtectedOwnerVvsCredentialKey(rawKey = "") {
  const key = String(rawKey || "").trim().toLowerCase();
  return key === "aleks.totev@vvs.com"
    || key === "mikhail.kovalev@vvs.com"
    || key === "ceo@vvs.com"
    || key === "coo@vvs.com";
}

function isProtectedOwnerCredentialKey(rawKey = "") {
  return isProtectedOwnerVvsCredentialKey(rawKey) || isProtectedOwnerSunriseCredentialKey(rawKey);
}

function restoreProtectedOwnerCredentials() {
  [
    "aleks.totev@vvs.com",
    "mikhail.kovalev@vvs.com",
    "ceo@vvs.com",
    "coo@vvs.com",
    "aleks.sunrise@vvs.com",
    "mikhail.sunrise@vvs.com"
  ].forEach((key) => {
    const seeded = SEEDED_ACCOUNTS_DATA[key];
    if (!seeded) return;
    accounts[key] = cloneAccountsPayload(seeded) || { ...seeded };
    accounts[key].email = key;
    if (isProtectedOwnerSunriseCredentialKey(key)) {
      accounts[key].sunriseCredential = true;
      accounts[key].sunriseLinkedEmail = String(
        seeded.sunriseLinkedEmail
        || (key.startsWith("aleks.") ? "aleks.totev@vvs.com" : "mikhail.kovalev@vvs.com")
      ).trim().toLowerCase();
    }
  });
}

function accountTimestampLabel(value = null) {
  if (value) {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return formatUtcTimestamp(parsed);
  }
  return formatUtcTimestamp(new Date());
}

function isCustomerAccount(account = null) {
  if (!account || typeof account !== "object") return false;
  if (account.sunriseCredential) return false;
  const membership = String(account.membership || "").trim().toLowerCase();
  return membership !== "staff" && membership !== "owner";
}

function normalizeCustomerCredentialFields(account = null) {
  if (!isCustomerAccount(account)) return account;
  const emailKey = normalizeEmailAddress(account.email || "");
  const seededAccount = emailKey ? SEEDED_ACCOUNTS_DATA[emailKey] : null;
  const createdAt = String(account.createdAt || "").trim();
  const verifiedAt = String(account.verifiedAt || account.emailVerifiedAt || "").trim();
  const contactMethod = String(
    account.preferredContactMethod
    || account.lastContactMethod
    || (account.email ? "email" : (account.phone ? "phone" : ""))
  ).trim().toLowerCase();
  const nextCountryCode = String(account.countryCode || resolveCountryCode(account.country) || "").trim().toUpperCase();
  if ((!account.phone || !String(account.phone).trim()) && seededAccount) {
    const dialCode = dialCodeForCountry(account.country || seededAccount.country || nextCountryCode || "");
    const localSeed = Array.from((emailKey || seededAccount.email || "client").replace(/[^a-z0-9]/gi, ""))
      .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const first = String(100 + (localSeed % 900)).padStart(3, "0");
    const second = String(100 + ((localSeed * 7) % 900)).padStart(3, "0");
    const third = String(1000 + ((localSeed * 13) % 9000)).padStart(4, "0");
    account.phone = `${dialCode} ${first} ${second} ${third}`;
  }
  account.countryCode = nextCountryCode;
  account.country = countryDisplayName(account.country || nextCountryCode || "");
  account.preferredContactMethod = contactMethod;
  const hasClientHistory = Number(account.servicesCompleted || 0) > 0
    || (String(account.upcomingService?.title || "").trim() && String(account.upcomingService?.title || "").trim() !== defaultClientUpcomingServiceCard().title)
    || (String(account.pastService?.title || "").trim() && String(account.pastService?.title || "").trim() !== defaultClientPastServiceCard().title);
  account.accountStatus = String(account.accountStatus || (verifiedAt || hasClientHistory ? "Active" : "Pending Verification")).trim();
  account.createdAt = createdAt || accountTimestampLabel();
  account.updatedAt = String(account.updatedAt || createdAt || accountTimestampLabel()).trim();
  account.verifiedAt = verifiedAt || (account.accountStatus === "Active" ? account.createdAt : "");
  account.signupSource = String(account.signupSource || "VVS Signup").trim();
  return account;
}

function buildCustomerAccountRecord({
  email = "",
  password = "",
  secretPhrase = "",
  prefix = "Mr.",
  firstName = "Client",
  lastName = "Member",
  countryCode = "",
  phone = ""
} = {}) {
  return normalizeCustomerCredentialFields(normalizeAccountServiceCards({
    email: String(email || "").trim(),
    password: String(password || ""),
    secretPhrase: String(secretPhrase || "").trim(),
    prefix: String(prefix || "").trim() || "Mr.",
    firstName: String(firstName || "").trim() || "Client",
    lastName: String(lastName || "").trim() || "Member",
    country: countryDisplayName(countryCode || "Unknown"),
    countryCode: String(countryCode || "").trim().toUpperCase(),
    membership: "Non-Member",
    accountStatus: "Pending Verification",
    servicesCompleted: 0,
    phone: String(phone || "").trim(),
    preferredContactMethod: String(email || "").trim() ? "email" : (String(phone || "").trim() ? "phone" : ""),
    createdAt: accountTimestampLabel(),
    updatedAt: accountTimestampLabel(),
    verifiedAt: "",
    signupSource: "VVS Signup",
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
  }));
}

function cleanLegacyServiceDescription(text = "", fallback = "") {
  const cleaned = String(text || "")
    .replace(/\bAssigned concierge:[^.]*\.?/gi, " ")
    .replace(/\bHandled by[^.]*\.?/gi, " ")
    .replace(/\bPreferred contact via[^.]*\.?/gi, " ")
    .replace(/\bDesired execution:[^.]*\.?/gi, " ")
    .replace(/\bExecution window:[^.]*\.?/gi, " ")
    .replace(/\bStatus:[^.]*\.?/gi, " ")
    .replace(/\bRequest submitted[^.]*\.?/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!cleaned || cleaned.length < 4 || /^(n|na|n\/a)$/i.test(cleaned)) {
    return String(fallback || "").trim();
  }
  return cleaned;
}

function inferLegacyUpcomingStatus(card = {}) {
  const details = String(card?.details || "");
  const startsAt = String(card?.startsAt || "");
  if (/confirmed/i.test(details) || /^confirmed\b/i.test(startsAt)) return "Confirmed";
  if (/pending confirmation/i.test(details) || /pending confirmation/i.test(startsAt)) return "Pending confirmation";
  return String(card?.statusText || "").trim();
}

function inferLegacyPastStatus(card = {}) {
  const details = String(card?.details || "");
  const endedAt = String(card?.endedAt || "");
  if (/completed|closed/i.test(details) || /closed/i.test(endedAt)) return "Completed";
  return String(card?.statusText || "").trim();
}

function inferLegacyUpcomingTimeframe(card = {}) {
  const details = String(card?.details || "");
  const startsAt = String(card?.startsAt || "").trim();
  const fromStartsAt = startsAt.match(/(?:confirmed\s*[•-]\s*|pending confirmation\s*\()([^.)]+)\)?/i);
  if (fromStartsAt && fromStartsAt[1]) return fromStartsAt[1].trim();
  const fromDetails = details.match(/Desired execution:\s*([^.]*)/i);
  if (fromDetails && fromDetails[1]) return fromDetails[1].trim();
  if (startsAt && startsAt !== "N/A" && !/pending confirmation|confirmed/i.test(startsAt)) return startsAt;
  return "";
}

function inferLegacyPastTime(card = {}) {
  const endedAt = String(card?.endedAt || "").trim();
  if (endedAt && endedAt !== "N/A") return endedAt;
  return "";
}

function normalizeClientUpcomingServiceCard(card = {}) {
  const fallback = defaultClientUpcomingServiceCard();
  const title = String(card?.title || fallback.title).trim() || fallback.title;
  const statusText = inferLegacyUpcomingStatus(card);
  const timeframe = inferLegacyUpcomingTimeframe(card);
  const details = cleanLegacyServiceDescription(
    String(card?.details || ""),
    title === fallback.title ? fallback.details : "Your service arrangements are being coordinated."
  );
  return {
    title,
    details,
    startsAt: timeframe || (title === fallback.title ? fallback.startsAt : ""),
    statusText,
    timeLabel: timeframe ? "Requested timeframe" : ""
  };
}

function normalizeClientPastServiceCard(card = {}) {
  const fallback = defaultClientPastServiceCard();
  const title = String(card?.title || fallback.title).trim() || fallback.title;
  const statusText = inferLegacyPastStatus(card);
  const completedAt = inferLegacyPastTime(card);
  const details = cleanLegacyServiceDescription(
    String(card?.details || ""),
    title === fallback.title ? fallback.details : "This service has been completed successfully."
  );
  return {
    title,
    details,
    endedAt: completedAt || (title === fallback.title ? fallback.endedAt : ""),
    statusText,
    timeLabel: completedAt ? "Completed" : ""
  };
}

function normalizeAccountServiceCards(account) {
  if (!account || typeof account !== "object") return account;
  normalizeCustomerCredentialFields(account);
  account.upcomingService = normalizeClientUpcomingServiceCard(account.upcomingService);
  account.pastService = normalizeClientPastServiceCard(account.pastService);
  return account;
}

function normalizeAllAccountRecords() {
  Object.values(accounts).forEach((account) => normalizeAccountServiceCards(account));
}

function replaceAccountsData(nextAccounts, { mergeWithSeed = true } = {}) {
  const normalized = mergeWithSeed
    ? buildMergedAccountsPayload(nextAccounts)
    : normalizeAccountsObject(nextAccounts);
  if (!normalized) return false;
  Object.keys(accounts).forEach((key) => delete accounts[key]);
  Object.entries(normalized).forEach(([key, value]) => {
    accounts[key] = normalizeAccountServiceCards(value);
  });
  return true;
}

function persistAccountsData() {
  try {
    localStorage.setItem(ACCOUNTS_DATA_KEY, JSON.stringify(accounts));
  } catch (_) {}
  if (sunriseControlState) {
    ensureRtaAssignmentsStore();
    ensureSocServicesStore();
    syncRedTeamAssignmentsToClientAccounts();
    syncSocServicesToClientAccounts();
    scheduleSunriseAdminRenders();
  }
  queueMonarchArchangelSync();
}

function loadAccountsDataFromStorage() {
  try {
    const raw = localStorage.getItem(ACCOUNTS_DATA_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return replaceAccountsData(parsed, { mergeWithSeed: true });
  } catch (_) {
    return false;
  }
}

function initializeAccountsData() {
  if (!loadAccountsDataFromStorage()) {
    persistAccountsData();
    return;
  }
  persistAccountsData();
}

function removeAutoGeneratedAmpNoise() {
  Object.keys(accounts).forEach((key) => {
    const account = accounts[key];
    if (!account || typeof account !== "object") return;
    if (isOwnerAccount(account)) return;
    const first = String(account.firstName || "").trim().toLowerCase();
    const last = String(account.lastName || "").trim().toLowerCase();
    const email = String(account.email || key || "").trim().toLowerCase();
    if ((first === "roman" && last === "novikov") || last === "novikov") {
      delete accounts[key];
      return;
    }
    if (email !== key && accounts[email] === account && email !== key) {
      delete accounts[key];
    }
  });
}

function buildSunriseEmail(baseEmail) {
  const key = String(baseEmail || "").trim().toLowerCase();
  const local = key.split("@")[0] || "user";
  let candidate = `${local}.sunrise@vvs.com`;
  let idx = 1;
  while (accounts[candidate]) {
    candidate = `${local}.sunrise${idx}@vvs.com`;
    idx += 1;
  }
  return candidate;
}

function preferredSunriseEmailForBase(emailKey = "", account = null) {
  const normalizedEmail = String(emailKey || "").trim().toLowerCase();
  const first = String(account?.firstName || "").trim().toLowerCase();
  if (normalizedEmail === "aleks.totev@vvs.com" || first === "aleks") return "aleks.sunrise@vvs.com";
  if (normalizedEmail === "mikhail.kovalev@vvs.com" || first === "mikhail") return "mikhail.sunrise@vvs.com";
  return buildSunriseEmail(normalizedEmail);
}

function ensureSunriseCredentials() {
  const snapshot = Object.entries(accounts);
  snapshot.forEach(([key, account]) => {
    if (!account || typeof account !== "object") return;
    const emailKey = String(key || "").trim().toLowerCase();
    const membership = String(account.membership || "").trim().toLowerCase();
    const hasSunriseAccessFlag = !!String(account.sunriseAccessLevel || "").trim();
    const isOwner = membership === "owner";
    const isStaff = membership === "staff";
    const isSunriseCred = emailKey.endsWith(".sunrise@vvs.com") || !!account.sunriseCredential;
    if (isSunriseCred) {
      account.sunriseCredential = true;
      if (!account.sunriseLinkedEmail) {
        if (emailKey === "aleks.sunrise@vvs.com") account.sunriseLinkedEmail = "aleks.totev@vvs.com";
        if (emailKey === "mikhail.sunrise@vvs.com") account.sunriseLinkedEmail = "mikhail.kovalev@vvs.com";
      }
      return;
    }
    if (!isOwner && !(isStaff && hasSunriseAccessFlag)) return;
    const existingLinkedEntry = Object.entries(accounts).find(([candidateKey, candidateAccount]) => {
      if (!candidateAccount || typeof candidateAccount !== "object") return false;
      if (!candidateAccount.sunriseCredential) return false;
      const linked = String(candidateAccount.sunriseLinkedEmail || "").trim().toLowerCase();
      return linked === emailKey || candidateKey === preferredSunriseEmailForBase(emailKey, account);
    });
    const sunriseEmail = existingLinkedEntry
      ? String(existingLinkedEntry[0] || "").trim().toLowerCase()
      : preferredSunriseEmailForBase(emailKey, account);
    if (!accounts[sunriseEmail]) {
      accounts[sunriseEmail] = {
        ...account,
        email: sunriseEmail,
        password: String(account.password || ""),
        secretPhrase: String(account.secretPhrase || ""),
        sunriseCredential: true,
        sunriseLinkedEmail: emailKey,
        notosId: String(account.notosId || "").trim().toUpperCase()
      };
    } else {
      accounts[sunriseEmail] = {
        ...accounts[sunriseEmail],
        ...account,
        email: sunriseEmail,
        password: String(accounts[sunriseEmail].password || account.password || ""),
        secretPhrase: String(accounts[sunriseEmail].secretPhrase || account.secretPhrase || ""),
        sunriseCredential: true,
        sunriseLinkedEmail: emailKey,
        notosId: String(account.notosId || accounts[sunriseEmail].notosId || "").trim().toUpperCase(),
        sunriseAccessLevel: String(account.sunriseAccessLevel || accounts[sunriseEmail].sunriseAccessLevel || "").trim().toUpperCase()
      };
    }
  });
}

function pruneDuplicateSunriseCredentials() {
  const sunriseEntries = Object.entries(accounts).filter(([, account]) => !!account?.sunriseCredential);
  const grouped = new Map();
  sunriseEntries.forEach(([key, account]) => {
    const linked = String(account?.sunriseLinkedEmail || "").trim().toLowerCase();
    if (!linked) return;
    if (!grouped.has(linked)) grouped.set(linked, []);
    grouped.get(linked).push([key, account]);
  });

  grouped.forEach((entries, linked) => {
    if (entries.length <= 1) return;
    const preferred = preferredSunriseEmailForBase(linked, accounts[linked]);
    entries.sort((a, b) => {
      const aKey = String(a[0] || "").trim().toLowerCase();
      const bKey = String(b[0] || "").trim().toLowerCase();
      const aPreferred = aKey === preferred ? 0 : (aKey.endsWith(".sunrise@vvs.com") ? 1 : 2);
      const bPreferred = bKey === preferred ? 0 : (bKey.endsWith(".sunrise@vvs.com") ? 1 : 2);
      if (aPreferred !== bPreferred) return aPreferred - bPreferred;
      return aKey.length - bKey.length || aKey.localeCompare(bKey);
    });
    const [keepKey] = entries[0];
    entries.slice(1).forEach(([duplicateKey]) => {
      if (duplicateKey === keepKey) return;
      delete accounts[duplicateKey];
    });
  });
}

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
let pendingPreferredConcierge = "";
let sunriseHasUnsavedChanges = false;
let sunriseCommittedStateHash = "";
let sunriseSessionTicker = null;
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
  "sunrise-rta",
  "sunrise-rim",
  "sunrise-soc",
  "sunrise-soc-details",
  "sunrise-inbox",
  "sunrise-lcs",
  "sunrise-amp",
  "sunrise-alp",
  "sunrise-mcc",
  "sunrise-monarch"
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
  rta: "sunrise-rta",
  rim: "sunrise-rim",
  soc: "sunrise-soc",
  lcs: "sunrise-lcs",
  notos: "sunrise-lcs",
  amp: "sunrise-amp",
  alp: "sunrise-alp",
  mcc: "sunrise-mcc",
  ma1: "sunrise-monarch",
  maa1: "sunrise-monarch"
};

const sunriseShortcutDescriptions = {
  dts: "Documents To Submit",
  eam: "Expenses Adjusting Menu",
  ifs: "Income Flow Spreader",
  ecs: "Employees Control System",
  smca: "Sales & Marketing Commissions Adjustments",
  rta: "Red Team Assigning Menu",
  rim: "Red Inviting Menu",
  soc: "Services & Operations Control",
  lcs: "Notos - Login Control System",
  notos: "Notos - Login Control System",
  amp: "Account Management Page",
  alp: "Access Levels Page",
  mcc: "Manage & Create Codes",
  ma1: "MONARCH ARCHANGEL",
  maa1: "MONARCH ARCHANGEL",
  ws: "Website shutdown (freeze public access to 404)",
  wr: "Website restore"
};

const sunriseAccessRouteDefaults = {
  STA: ["sunrise", "sunrise-inbox", "sunrise-services", "sunrise-performance"],
  SA: ["sunrise", "sunrise-inbox", "sunrise-services", "sunrise-performance", "sunrise-sales", "sunrise-marketing", "sunrise-locations"],
  SS: ["sunrise", "sunrise-inbox", "sunrise-services", "sunrise-performance", "sunrise-sales", "sunrise-marketing", "sunrise-locations", "sunrise-soc", "sunrise-soc-details", "sunrise-employees", "sunrise-lcs"],
  SM: ["sunrise", "sunrise-inbox", "sunrise-services", "sunrise-performance", "sunrise-sales", "sunrise-marketing", "sunrise-locations", "sunrise-soc", "sunrise-soc-details", "sunrise-employees", "sunrise-lcs", "sunrise-expenses", "sunrise-income", "sunrise-eam", "sunrise-ifs", "sunrise-smca", "sunrise-rta", "sunrise-surveys", "sunrise-events", "sunrise-maintenance", "sunrise-mcc"],
  DA: sunriseModuleRoutes.slice(),
  CA: sunriseModuleRoutes.slice(),
  OW: sunriseModuleRoutes.slice()
};

const sunriseAccessKeywordRoutes = {
  inbox: ["sunrise-inbox"],
  soc: ["sunrise-soc", "sunrise-soc-details"],
  services: ["sunrise-services"],
  employees: ["sunrise-employees", "sunrise-ecs"],
  lcs: ["sunrise-lcs"],
  notos: ["sunrise-lcs"],
  dts: ["sunrise-dts"],
  expenses: ["sunrise-expenses", "sunrise-eam"],
  income: ["sunrise-income", "sunrise-ifs"],
  sales: ["sunrise-sales", "sunrise-smca"],
  marketing: ["sunrise-marketing", "sunrise-smca"],
  legality: ["sunrise-legality"],
  events: ["sunrise-events"],
  surveys: ["sunrise-surveys"],
  revenue: ["sunrise-revenue"],
  amp: ["sunrise-amp"],
  alp: ["sunrise-alp"],
  monarch: ["sunrise-monarch"],
  locations: ["sunrise-locations"],
  maintenance: ["sunrise-maintenance"],
  rta: ["sunrise-rta"],
  rim: ["sunrise-rim"]
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
  document.body.setAttribute("data-route", String(route || "home"));
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

function getCurrentSunriseOperator() {
  if (sunriseState.unlocked && sunriseState.account) return sunriseState.account;
  return activeAccount;
}

function sunriseAccessMeta(account) {
  const fallback = { code: "SA", title: "Sunrise Associate", access: "Operational dashboards" };
  if (!account) return fallback;
  if (isMikhailOwnerAccount(account)) {
    return {
      code: "CR",
      title: "Creator",
      access: "Creator command authority + MONARCH ARCHANGEL + full Sunrise executive archive oversight"
    };
  }
  const code = (isOwnerAccount(account) ? "OW" : String(account.sunriseAccessLevel || "SA")).trim().toUpperCase();
  const levels = Array.isArray(sunriseControlState?.accessLevels) ? sunriseControlState.accessLevels : [];
  const row = levels.find((item) => String(item?.code || "").trim().toUpperCase() === code);
  return {
    code,
    title: String(row?.title || (code === "OW" ? "Owner" : fallback.title)).trim(),
    access: String(row?.access || (code === "OW" ? "Full Sunrise command and shutdown/restore authority" : fallback.access)).trim()
  };
}

function isSameOwnerIdentity(accountA, accountB) {
  if (!accountA || !accountB) return false;
  const codeA = String(resolveSunriseOwnerCode(accountA) || "").trim().toUpperCase();
  const codeB = String(resolveSunriseOwnerCode(accountB) || "").trim().toUpperCase();
  if (codeA && codeB) return codeA === codeB;
  const a = `${String(accountA.firstName || "").trim().toLowerCase()}|${String(accountA.lastName || "").trim().toLowerCase()}`;
  const b = `${String(accountB.firstName || "").trim().toLowerCase()}|${String(accountB.lastName || "").trim().toLowerCase()}`;
  return !!a && a === b;
}

function blockSunriseOwnerBreachAttempt() {
  const warning = "NOTOS Critical Warning - Sunrise Owner Access attempts are prohibited from your VVS platform. Please notify the Owner about the credentials breach immediately and return to Log In Page";
  if (sunriseInfo) sunriseInfo.textContent = warning;
  if (sunriseOwnerAlertText) sunriseOwnerAlertText.textContent = warning;
  if (sunriseOwnerAlertOverlay) sunriseOwnerAlertOverlay.hidden = false;
}

function allowedSunriseRoutesForAccount(account) {
  const meta = sunriseAccessMeta(account);
  if (!account) return new Set(["sunrise"]);
  if (isOwnerAccount(account) || meta.code === "OW") return new Set(["sunrise", ...sunriseModuleRoutes]);
  const seeded = sunriseAccessRouteDefaults[meta.code] || sunriseAccessRouteDefaults.SA;
  const set = new Set(seeded);
  const accessText = String(meta.access || "").toLowerCase();
  if (accessText.includes("full") || accessText.includes("all")) {
    sunriseModuleRoutes.forEach((route) => set.add(route));
  } else {
    Object.entries(sunriseAccessKeywordRoutes).forEach(([keyword, routes]) => {
      if (accessText.includes(keyword)) routes.forEach((route) => set.add(route));
    });
  }
  set.add("sunrise");
  return set;
}

function canAccessSunriseRoute(account, route, shortcutToken = "") {
  const normalizedRoute = String(route || "").trim();
  if (!normalizedRoute || normalizedRoute === "sunrise") return true;
  if (!sunriseModuleRoutes.includes(normalizedRoute)) return true;
  if (!account || !hasSunriseAccess(account)) return false;
  if (normalizedRoute === "sunrise-monarch") return isOwnerAccount(account);
  if (isOwnerAccount(account)) return true;
  const token = String(shortcutToken || "").trim().toLowerCase();
  if ((token === "ws" || token === "wr") && !isOwnerAccount(account)) return false;
  const allowed = allowedSunriseRoutesForAccount(account);
  return allowed.has(normalizedRoute);
}

function currentSunriseCreatorViewer(account = getCurrentSunriseOperator()) {
  return isMikhailOwnerAccount(account || sunriseState?.account || activeAccount || null);
}

function sunriseAccessCodesList(viewer = getCurrentSunriseOperator()) {
  const levels = Array.isArray(sunriseControlState?.accessLevels) ? sunriseControlState.accessLevels : [];
  const fromLevels = levels.map((row) => String(row?.code || "").trim().toUpperCase()).filter(Boolean);
  const merged = Array.from(new Set(["STA", "SA", "SS", "SM", "DA", "CA", "OW", ...(currentSunriseCreatorViewer(viewer) ? ["CR"] : []), ...fromLevels]));
  return merged;
}

function suggestedAccessForShortcut(code, route) {
  const c = String(code || "").toLowerCase();
  const r = String(route || "").toLowerCase();
  if (c === "ws" || c === "wr") return "OW";
  if (c === "ma1" || c === "maa1" || r === "sunrise-monarch") return currentSunriseCreatorViewer() ? "CR,OW" : "OW";
  if (c === "amp" || c === "alp" || c === "mcc") return "SM,DA,CA,OW";
  if (c === "lcs" || c === "notos" || r === "sunrise-lcs") return "SS,SM,DA,CA,OW";
  if (c === "rta" || r === "sunrise-rta") return "SM,DA,CA,OW";
  if (r === "sunrise-soc" || r === "sunrise-soc-details" || r === "sunrise-ecs") return "SS,SM,DA,CA,OW";
  return "SA,SS,SM,DA,CA,OW";
}

function defaultShortcutCodeRegistry() {
  const entries = [];
  Object.entries(sunriseShortcutRouteMap).forEach(([code, route]) => {
    entries.push({
      code: String(code).toUpperCase(),
      route: String(route || "").trim(),
      title: String(sunriseShortcutDescriptions[code] || route || "").trim(),
      access: suggestedAccessForShortcut(code, route)
    });
  });
  if (!entries.find((row) => row.code === "WS")) {
    entries.push({ code: "WS", route: "", title: String(sunriseShortcutDescriptions.ws || "Website shutdown"), access: "OW" });
  }
  if (!entries.find((row) => row.code === "WR")) {
    entries.push({ code: "WR", route: "", title: String(sunriseShortcutDescriptions.wr || "Website restore"), access: "OW" });
  }
  return entries;
}

function normalizeCodeAccessList(value) {
  return String(value || "")
    .split(/[,\s/]+/)
    .map((part) => part.trim().toUpperCase())
    .filter(Boolean);
}

function ensureShortcutCodeRegistry() {
  if (!sunriseControlState) return [];
  if (!Array.isArray(sunriseControlState.shortcutCodes) || !sunriseControlState.shortcutCodes.length) {
    sunriseControlState.shortcutCodes = defaultShortcutCodeRegistry();
  }
  sunriseControlState.shortcutCodes = sunriseControlState.shortcutCodes.map((row) => ({
    code: String(row?.code || "").trim().toUpperCase(),
    route: String(row?.route || "").trim(),
    title: String(row?.title || "").trim(),
    access: String(row?.access || "").trim().toUpperCase() || "OW"
  })).filter((row) => !!row.code);
  syncSunriseDockCodesPreview(sunriseControlState.shortcutCodes);
  return sunriseControlState.shortcutCodes;
}

function findShortcutEntry(shortcutToken) {
  const token = String(shortcutToken || "").trim().toUpperCase();
  if (!token) return null;
  const list = ensureShortcutCodeRegistry();
  return list.find((row) => row.code === token) || null;
}

function canUseShortcutCode(account, shortcutToken) {
  const entry = findShortcutEntry(shortcutToken);
  if (!entry) return false;
  if (isOwnerAccount(account)) return true;
  const granted = normalizeCodeAccessList(entry.access);
  const level = String(account?.sunriseAccessLevel || "").trim().toUpperCase();
  return !!(level && granted.includes(level));
}

function showRoute(route, pushHash = true) {
  let target = route || "home";
  if (target === "profile" && !activeAccount) {
    target = "account";
  }
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
    const allowed = hasSunriseAccess(activeAccount);
    if (!allowed) {
      target = activeAccount ? "profile" : "home";
    } else if (isSunriseModuleRoute && !sunriseState.unlocked) {
      target = "sunrise";
    } else if (isSunriseModuleRoute && !canAccessSunriseRoute(getCurrentSunriseOperator(), target)) {
      target = "sunrise";
    }
  }
  if (shouldBlockRouteForUnsavedSunriseChanges(target)) {
    openSunriseUnsavedModal((action) => {
      if (action === "save") {
        commitSunriseChanges();
        showRoute(target, pushHash);
      } else if (action === "discard") {
        sunriseHasUnsavedChanges = false;
        updateSunriseSaveButtonsState();
        showRoute(target, pushHash);
      }
    });
    return;
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
      updateSunriseSessionBar();
      window.scrollTo({ top: 0, behavior: "auto" });
      if (target === "account") resetAuthState();
      if (target === "sunrise") updateSunriseAccessView();
      if (target === "sunrise" || sunriseModuleRoutes.includes(target)) renderCustomSunriseControlPages();
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
  if (shouldBlockRouteForUnsavedSunriseChanges(normalizedTarget)) {
    openSunriseUnsavedModal((action) => {
      if (action === "save") {
        commitSunriseChanges();
        forceShowRoute(normalizedTarget, pushHash);
      } else if (action === "discard") {
        sunriseHasUnsavedChanges = false;
        updateSunriseSaveButtonsState();
        forceShowRoute(normalizedTarget, pushHash);
      }
    });
    return;
  }
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
  updateSunriseSessionBar();
  window.scrollTo({ top: 0, behavior: "auto" });
  if (normalizedTarget === "account") resetAuthState();
  if (normalizedTarget === "sunrise") updateSunriseAccessView();
  if (normalizedTarget === "sunrise" || sunriseModuleRoutes.includes(normalizedTarget)) renderCustomSunriseControlPages();
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
window.openVvsServiceRequest = function openVvsServiceRequest(event) {
  if (event) event.preventDefault();
  return goToContactForService(pendingServiceRequestKey || "");
};

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
  const helpToggle = document.getElementById("sunrise-shortcut-help-toggle");
  const helpBox = document.getElementById("sunrise-code-help");
  if (helpBox) {
    syncSunriseDockCodesPreview(ensureShortcutCodeRegistry());
  }
  if (helpToggle && helpBox && helpToggle.dataset.boundHelp !== "1") {
    helpToggle.addEventListener("click", () => {
      toggleSunriseDockCodes();
    });
    helpToggle.dataset.boundHelp = "1";
  }

  const normalizeShortcutToken = (rawValue) => {
    const token = String(rawValue || "").trim().split(/[\s,;]+/)[0] || "";
    return token.toLowerCase().replace(/[^a-z0-9-]/g, "");
  };

  const resolveShortcutRoute = (rawValue) => {
    const raw = normalizeShortcutToken(rawValue);
    if (!raw) return "";
    const entry = findShortcutEntry(raw);
    if (entry && entry.route) return entry.route;
    return sunriseShortcutRouteMap[raw] || (sunriseModuleRoutes.includes(raw) ? raw : "");
  };

  const isShortcutAccessReady = () => {
    if (sunriseState.unlocked) return true;
    return !!activeAccount && hasSunriseAccess(activeAccount);
  };

  forms.forEach((form) => {
    if (form.id === "sunrise-shortcut-dock-form") return;
    const input = form.querySelector("input");
    const infoTarget = String(form.getAttribute("data-info-target") || "").trim();
    const info = infoTarget ? document.getElementById(infoTarget) : null;
    if (!input || !info) return;
    if (form.dataset.shortcutBound === "1") return;

    const runShortcut = () => {
      const raw = String(input.value || "").trim();
      if (!raw) {
        info.textContent = "Enter a module code, for example REV1 or SLS1.";
        return false;
      }
      if (!isShortcutAccessReady()) {
        info.textContent = "Unlock Sunrise first to use shortcut routing.";
        return false;
      }

      const normalized = normalizeShortcutToken(raw);
      const operator = getCurrentSunriseOperator();
      if (normalized && findShortcutEntry(normalized) && !canUseShortcutCode(operator, normalized)) {
        info.textContent = `Access denied for code ${normalized.toUpperCase()}.`;
        return false;
      }
      if (normalized === "ws") {
        if (!isOwnerAccount(getCurrentSunriseOperator())) {
          info.textContent = "Access denied for WS command.";
          return false;
        }
        setWebsiteShutdownActive(true);
        info.textContent = "Website shutdown activated. Public access is now frozen to 404.";
        const nextRoute = canAccessDuringShutdown(currentVisibleRoute()) ? currentVisibleRoute() : "shutdown-404";
        showRoute(nextRoute);
        return true;
      }
      if (normalized === "wr") {
        if (!isOwnerAccount(getCurrentSunriseOperator())) {
          info.textContent = "Access denied for WR command.";
          return false;
        }
        setWebsiteShutdownActive(false);
        info.textContent = "Website restore completed. All access has been unfrozen.";
        showRoute("sunrise");
        return true;
      }

      const route = resolveShortcutRoute(raw);
      if (!route) {
        const cleanServiceToken = normalized.replace(/[^a-z0-9]/g, "");
        if (/^[a-z]\d{7}$/i.test(cleanServiceToken)) {
          const serviceId = cleanServiceToken.toUpperCase();
          const serviceFocus = findServiceById(serviceId);
          if (!serviceFocus) {
            info.textContent = `Service ${serviceId} not found in current/past/deleted lists.`;
            return false;
          }
          sunriseControlState.socSelectedServiceId = serviceId;
          saveSunriseControlState({ markDirty: false });
          renderSOCDetailsPage();
          showRoute("sunrise-soc-details");
          info.textContent = "";
          input.value = "";
          return true;
        }
        info.textContent = "Unknown selection code. Open Codes for the full command list.";
        return false;
      }
      info.textContent = "";
      input.value = "";
      if (!canAccessSunriseRoute(operator, route, normalized)) {
        info.textContent = `Access denied for code ${normalized.toUpperCase()}.`;
        return false;
      }
      showRoute(route);
      return true;
    };

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      runShortcut();
    });

    const openBtn = form.querySelector('button[type="submit"]');
    if (openBtn && openBtn.dataset.shortcutClickBound !== "1") {
      openBtn.addEventListener("click", (event) => {
        event.preventDefault();
        runShortcut();
      });
      openBtn.dataset.shortcutClickBound = "1";
    }

    if (input.dataset.shortcutEnterBound !== "1") {
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          runShortcut();
        }
      });
      input.dataset.shortcutEnterBound = "1";
    }

    form.dataset.shortcutBound = "1";
  });

  const dockForm = document.getElementById("sunrise-shortcut-dock-form");
  const dockInput = document.getElementById("sunrise-shortcut-dock-input");
  if (dockForm instanceof HTMLFormElement && dockForm.dataset.shortcutBound !== "1") {
    dockForm.addEventListener("submit", (event) => {
      event.preventDefault();
      runSunriseDockShortcut();
    });
    dockForm.dataset.shortcutBound = "1";
  }
  if (dockInput instanceof HTMLInputElement && dockInput.dataset.shortcutEnterBound !== "1") {
    dockInput.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      runSunriseDockShortcut();
    });
    dockInput.dataset.shortcutEnterBound = "1";
  }

  const launchButtons = Array.from(document.querySelectorAll("[data-shortcut][data-route]"));
  launchButtons.forEach((btn) => {
    if (btn.dataset.shortcutLaunchBound === "1") return;
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const route = String(btn.getAttribute("data-route") || "").trim();
      if (!route) return;
      if (!isShortcutAccessReady()) {
        const dockInfo = document.getElementById("sunrise-shortcut-dock-info");
        if (dockInfo) dockInfo.textContent = "Unlock Sunrise first to use shortcut routing.";
        return;
      }
      const operator = getCurrentSunriseOperator();
      if (!canAccessSunriseRoute(operator, route)) {
        const dockInfo = document.getElementById("sunrise-shortcut-dock-info");
        if (dockInfo) dockInfo.textContent = "Access denied for this module.";
        return;
      }
      showRoute(route);
    });
    btn.dataset.shortcutLaunchBound = "1";
  });

}

function normalizeSunriseShortcutToken(rawValue) {
  const token = String(rawValue || "").trim().split(/[\s,;]+/)[0] || "";
  return token.toLowerCase().replace(/[^a-z0-9-]/g, "");
}

function resolveSunriseShortcutRoute(rawValue) {
  const raw = normalizeSunriseShortcutToken(rawValue);
  if (!raw) return "";
  const entry = findShortcutEntry(raw);
  if (entry && entry.route) return entry.route;
  return sunriseShortcutRouteMap[raw] || (sunriseModuleRoutes.includes(raw) ? raw : "");
}

function runSunriseDockShortcut() {
  const input = document.getElementById("sunrise-shortcut-dock-input");
  const info = document.getElementById("sunrise-shortcut-dock-info");
  if (!(input instanceof HTMLInputElement) || !(info instanceof HTMLElement)) return false;
  const raw = String(input.value || "").trim();
  if (!raw) {
    info.textContent = "Enter a module code, for example REV1 or SLS1.";
    return false;
  }
  if (!sunriseState.unlocked && !(activeAccount && hasSunriseAccess(activeAccount))) {
    info.textContent = "Unlock Sunrise first to use shortcut routing.";
    return false;
  }
  const normalized = normalizeSunriseShortcutToken(raw);
  const operator = getCurrentSunriseOperator();
  if (normalized && findShortcutEntry(normalized) && !canUseShortcutCode(operator, normalized)) {
    info.textContent = `Access denied for code ${normalized.toUpperCase()}.`;
    return false;
  }
  if (normalized === "ws") {
    if (!isOwnerAccount(operator)) {
      info.textContent = "Access denied for WS command.";
      return false;
    }
    setWebsiteShutdownActive(true);
    info.textContent = "Website shutdown activated. Public access is now frozen to 404.";
    const nextRoute = canAccessDuringShutdown(currentVisibleRoute()) ? currentVisibleRoute() : "shutdown-404";
    showRoute(nextRoute);
    input.value = "";
    return true;
  }
  if (normalized === "wr") {
    if (!isOwnerAccount(operator)) {
      info.textContent = "Access denied for WR command.";
      return false;
    }
    setWebsiteShutdownActive(false);
    info.textContent = "Website restore completed. All access has been unfrozen.";
    showRoute("sunrise");
    input.value = "";
    return true;
  }
  const route = resolveSunriseShortcutRoute(raw);
  if (!route) {
    const cleanServiceToken = normalized.replace(/[^a-z0-9]/g, "");
    if (/^[a-z]\d{7}$/i.test(cleanServiceToken)) {
      const serviceId = cleanServiceToken.toUpperCase();
      const serviceFocus = findServiceById(serviceId);
      if (!serviceFocus) {
        info.textContent = `Service ${serviceId} not found in current/past/deleted lists.`;
        return false;
      }
      sunriseControlState.socSelectedServiceId = serviceId;
      saveSunriseControlState({ markDirty: false });
      renderSOCDetailsPage();
      showRoute("sunrise-soc-details");
      info.textContent = "";
      input.value = "";
      return true;
    }
    info.textContent = "Unknown selection code. Open Codes for the full command list.";
    return false;
  }
  if (!canAccessSunriseRoute(operator, route, normalized)) {
    info.textContent = `Access denied for code ${normalized.toUpperCase()}.`;
    return false;
  }
  info.textContent = "";
  input.value = "";
  showRoute(route);
  return true;
}

function syncSunriseDockCodesPreview(registry = []) {
  const helpBox = document.getElementById("sunrise-code-help");
  const toggleBtn = document.getElementById("sunrise-shortcut-help-toggle");
  const safeRegistry = Array.isArray(registry) ? registry : [];
  if (toggleBtn instanceof HTMLElement) {
    toggleBtn.textContent = `Codes (${safeRegistry.length})`;
  }
  if (!(helpBox instanceof HTMLElement)) return false;
  helpBox.innerHTML = (safeRegistry.length ? safeRegistry : Object.entries(sunriseShortcutDescriptions).map(([code, text]) => ({
    code: String(code || "").toUpperCase(),
    title: String(text || ""),
    route: "",
    access: ""
  })))
    .map((entry) => {
      const code = String(entry.code || "").toUpperCase();
      const title = String(entry.title || entry.route || "Shortcut").trim();
      const route = String(entry.route || "").trim();
      const access = normalizeCodeAccessList(entry.access).join(", ") || "OW";
      return `<article class="sunriseCodeHelpCard">
        <b>${code}</b>
        <p>${title}</p>
        <span>${route ? `Route: ${route}` : "Route: custom action"}</span>
        <small>Access: ${access}</small>
      </article>`;
    })
    .join("");
  return true;
}

function toggleSunriseDockCodes() {
  const helpBox = document.getElementById("sunrise-code-help");
  if (!(helpBox instanceof HTMLElement)) return false;
  syncSunriseDockCodesPreview(ensureShortcutCodeRegistry());
  const willShow = helpBox.hidden;
  helpBox.hidden = !willShow;
  helpBox.style.display = willShow ? "block" : "none";
  return true;
}

window.sunriseDockSubmitShortcut = runSunriseDockShortcut;
window.sunriseDockToggleCodes = toggleSunriseDockCodes;

function ensureSunriseInboxTopButtons() {
  const targets = ["sunrise", ...sunriseModuleRoutes];
  const accountSettingsTarget = resolveAccountSettingsTarget();
  const showAccountSettings = !!accountSettingsTarget && !isOwnerAccount(accountSettingsTarget);
  targets.forEach((route) => {
    const page = document.querySelector(`.routePage[data-page="${route}"]`);
    if (!page) return;
    const actions = page.querySelector(".viewTop .viewActions");
    if (!actions) return;
    actions.querySelectorAll('[data-sunrise-top-inbox="1"]').forEach((btn) => btn.remove());
    actions.querySelectorAll('[data-sunrise-account-settings="1"]').forEach((btn) => btn.remove());
    const logoutBtn = actions.querySelector("[data-sunrise-logout]") || actions.querySelector("#sunrise-logout-btn");
    if (!showAccountSettings) return;
    const settingsBtn = document.createElement("button");
    settingsBtn.type = "button";
    settingsBtn.className = "btn ghost";
    settingsBtn.setAttribute("data-sunrise-account-settings", "1");
    settingsBtn.textContent = "Account Settings";
    settingsBtn.addEventListener("click", () => {
      const targetAccount = resolveAccountSettingsTarget();
      if (targetAccount) openAccountSettingsOverlay(targetAccount);
    });
    if (logoutBtn) actions.insertBefore(settingsBtn, logoutBtn);
    else actions.prepend(settingsBtn);
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
  const inMonarch = normalizedRoute === "sunrise-monarch";
  const isSunriseRoute = normalizedRoute === "sunrise" || sunriseModuleRoutes.includes(normalizedRoute);
  const shouldShow = isSunriseRoute && !inMonarch && !!activeAccount && hasSunriseAccess(activeAccount) && !!sunriseState.unlocked;
  dock.hidden = !shouldShow;
  dock.style.position = "fixed";
  dock.style.left = "50%";
  dock.style.right = "auto";
  dock.style.top = "auto";
  syncSunriseDockCodesPreview(ensureShortcutCodeRegistry());
  dock.style.bottom = "12px";
  dock.style.transform = "translateX(-50%)";
  dock.style.width = "min(920px, calc(100% - 24px))";
  dock.style.maxWidth = "min(920px, calc(100% - 24px))";
  dock.style.display = shouldShow ? "block" : "none";
  document.body.classList.toggle("sunrise-dock-visible", shouldShow);
}

function initRouteFromHash() {
  const raw = window.location.hash.replace("#", "").trim();
  const [routeBase, query = ""] = raw.split("?");
  const baseRoutes = ["home", "services", "membership", "contact", "account", "profile", "ambassador", "voyager-control", "sunrise", "shutdown-404"];
  const route = (baseRoutes.includes(routeBase) || sunriseModuleRoutes.includes(routeBase)) ? routeBase : "home";
  const ambassadorAllowed = activeAccount && String(activeAccount.membership || "").toLowerCase() === "voyager red";
  const controlAllowed = isVoyagerControlUser(activeAccount);
  const sunriseAllowed = hasSunriseAccess(activeAccount);
  const sunriseModuleAllowed = !sunriseModuleRoutes.includes(route) || sunriseState.unlocked;
  let safeRoute = route;
  if (route === "profile" && !activeAccount) safeRoute = "account";
  if (route === "ambassador" && !ambassadorAllowed) safeRoute = activeAccount ? "profile" : "home";
  if (route === "voyager-control" && !controlAllowed) safeRoute = activeAccount ? "profile" : "home";
  if (route === "sunrise" && !sunriseAllowed) safeRoute = activeAccount ? "profile" : "home";
  if (sunriseModuleRoutes.includes(route) && (!sunriseAllowed || !sunriseModuleAllowed)) safeRoute = sunriseAllowed ? "sunrise" : (activeAccount ? "profile" : "home");
  if (sunriseModuleRoutes.includes(safeRoute) && !canAccessSunriseRoute(getCurrentSunriseOperator(), safeRoute)) safeRoute = "sunrise";
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
  updateSunriseSessionBar();
  if (safeRoute === "sunrise") updateSunriseAccessView();
  if (safeRoute === "sunrise" || sunriseModuleRoutes.includes(safeRoute)) renderCustomSunriseControlPages();
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

function populateAllTierBacks() {
  Object.keys(tierData).forEach((key) => renderTier(key));
}

function renderTier(tierKey) {
  const tier = tierData[tierKey];
  if (!tier) return;
  const back = document.querySelector(`[data-tier-back="${tierKey}"]`);
  if (back) {
    const shortName = String(tier.name || "").replace(/^Voyager\s+/i, "").trim() || tier.name;
    back.innerHTML = `<div class="tierBackCard"><h3 class="tierBackTitle">${shortName}</h3><div class="tierBackText"><p><strong>${tier.validity}.</strong> ${tier.achievement}</p><ul>${tier.benefits.map((item) => `<li>${item}</li>`).join("")}</ul></div></div>`;
  }
  refreshActiveLanguageIfNeeded();
}

document.addEventListener("click", (e) => {
  const clickTarget = e.target instanceof Element ? e.target : null;
  if (!clickTarget) return;
  const instagramLink = clickTarget.closest("[data-instagram-link]");
  if (instagramLink) {
    e.preventDefault();
    const url = String(instagramLink.getAttribute("href") || "https://www.instagram.com/venturevs/").trim();
    try {
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (_) {
      window.location.href = url;
    }
    return;
  }
  const serviceRequestLink = clickTarget.closest("[data-service-request]");
  if (serviceRequestLink) {
    e.preventDefault();
    const serviceKey = String(serviceRequestLink.getAttribute("data-service-request") || "").trim();
    goToContactForService(serviceKey);
    return;
  }
  const profileServiceBtn = clickTarget.closest("#profile-submit-service-btn, #profile-submit-service-top");
  if (profileServiceBtn) {
    e.preventDefault();
    showRoute("contact");
    return;
  }
  const conciergePick = clickTarget.closest("[data-concierge-pick]");
  if (conciergePick) {
    e.preventDefault();
    pendingPreferredConcierge = String(conciergePick.getAttribute("data-concierge-pick") || "").trim();
    showRoute("contact");
    return;
  }
  const routeLink = clickTarget.closest("a[data-route], button[data-route], [role='button'][data-route]");
  if (routeLink) {
    e.preventDefault();
    showRoute(routeLink.getAttribute("data-route"));
    return;
  }

  const tierButton = clickTarget.closest("[data-tier]");
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
const safeStartupCall = (name, fn) => {
  try {
    fn();
  } catch (err) {
    console.error(`Startup call failed: ${name}`, err);
  }
};

safeStartupCall("populateAllTierBacks", populateAllTierBacks);
safeStartupCall("initHeroLocator", initHeroLocator);
safeStartupCall("populateSignupCountries", populateSignupCountries);
safeStartupCall("populateIssuedServiceCountries", populateIssuedServiceCountries);
safeStartupCall("populateAccountSettingsCountry", () => populateCountrySelect(document.getElementById("account-settings-country"), "Select country"));
safeStartupCall("populateNavLanguageCountries", populateNavLanguageCountries);
safeStartupCall("setupNavLanguageSelector", setupNavLanguageSelector);
safeStartupCall("setupSignupCountryPhoneAutofill", setupSignupCountryPhoneAutofill);
safeStartupCall("setupContactIssuedCountryPhoneAutofill", setupContactIssuedCountryPhoneAutofill);
safeStartupCall("setupServiceButtons", setupServiceButtons);
safeStartupCall("setupSunriseShortcutMenu", setupSunriseShortcutMenu);

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
const contactSubmitBtn = document.getElementById("contact-submit-btn");
const contactPrefillFieldIds = ["first-name", "last-name", "title", "phone", "email", "country-issued"];
let contactSubmitInFlight = false;

function ensureContactHiddenField(name, value = "") {
  if (!contactForm || !name) return null;
  let input = contactForm.querySelector(`input[type="hidden"][name="${name}"]`);
  if (!(input instanceof HTMLInputElement)) {
    input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    contactForm.appendChild(input);
  }
  input.value = String(value || "");
  return input;
}

function applyContactFormPublicFallbackState({
  assignedConcierge = "",
  clientTier = ""
} = {}) {
  if (!contactForm) return;
  contactForm.setAttribute("method", "post");
  contactForm.setAttribute("action", "/api/contact-submit");
  contactForm.removeAttribute("onsubmit");
  if (contactSubmitBtn instanceof HTMLButtonElement) {
    contactSubmitBtn.removeAttribute("onclick");
    contactSubmitBtn.setAttribute("formmethod", "post");
    contactSubmitBtn.setAttribute("formaction", "/api/contact-submit");
  }
  ensureContactHiddenField("assignedConcierge", assignedConcierge || "VVS Concierge Desk");
  ensureContactHiddenField("clientTier", clientTier || "Non-Member");
}

function submitContactFormNatively() {
  if (!contactForm) return false;
  try {
    contactForm.dataset.nativeSubmit = "1";
    HTMLFormElement.prototype.submit.call(contactForm);
    return true;
  } catch (error) {
    console.error("Native contact form submit failed:", error);
    contactForm.dataset.nativeSubmit = "";
    return false;
  }
}

function contactPrefillStorageKey() {
  if (!activeAccount || !activeAccount.email) return "";
  return `vvs_contact_prefill_${String(activeAccount.email).trim().toLowerCase()}`;
}

function saveContactPrefillDraft() {
  const key = contactPrefillStorageKey();
  if (!key) return;
  const selectedMethod = contactForm?.querySelector('input[name="contactMethod"]:checked');
  const payload = {
    firstName: (document.getElementById("first-name")?.value || "").trim(),
    lastName: (document.getElementById("last-name")?.value || "").trim(),
    title: (document.getElementById("title")?.value || "").trim(),
    phone: (document.getElementById("phone")?.value || "").trim(),
    email: (document.getElementById("email")?.value || "").trim(),
    countryIssued: (document.getElementById("country-issued")?.value || "").trim(),
    contactMethod: selectedMethod instanceof HTMLInputElement ? String(selectedMethod.value || "").trim() : ""
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
    email: String(activeAccount.email || "").trim(),
    countryIssued: resolveCountryCode(activeAccount.country) || "",
    contactMethod: String(activeAccount.lastContactMethod || (activeAccount.email ? "email" : (activeAccount.phone ? "phone" : ""))).trim()
  };
  const draft = loadContactPrefillDraft() || {};
  const finalData = {
    firstName: draft.firstName || defaults.firstName,
    lastName: draft.lastName || defaults.lastName,
    title: draft.title || defaults.title,
    phone: draft.phone || defaults.phone,
    email: draft.email || defaults.email,
    countryIssued: draft.countryIssued || defaults.countryIssued,
    contactMethod: draft.contactMethod || defaults.contactMethod
  };

  const first = document.getElementById("first-name");
  const last = document.getElementById("last-name");
  const title = document.getElementById("title");
  const phone = document.getElementById("phone");
  const email = document.getElementById("email");
  const country = document.getElementById("country-issued");
  if (first) first.value = finalData.firstName;
  if (last) last.value = finalData.lastName;
  if (title) title.value = finalData.title;
  if (phone) phone.value = finalData.phone;
  if (email) email.value = finalData.email;
  if (country) country.value = finalData.countryIssued;
  const contactMethodInputs = Array.from(contactForm.querySelectorAll('input[name="contactMethod"]'));
  contactMethodInputs.forEach((input) => {
    if (!(input instanceof HTMLInputElement)) return;
    input.checked = String(input.value || "").trim() === finalData.contactMethod;
  });
  setupContactMethodChoices();
  if (pendingPreferredConcierge && contactError) {
    contactError.textContent = `Preferred concierge pre-assigned: ${pendingPreferredConcierge}.`;
  } else if (contactError) {
    contactError.textContent = "";
  }
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

function setupContactMethodChoices() {
  if (!contactForm) return;

  const selector = '.contactChoice input[name="contactMethod"]';
  const syncState = () => {
    Array.from(contactForm.querySelectorAll(selector)).forEach((input) => {
      const label = input.closest(".choice");
      if (!label) return;
      label.classList.toggle("isChecked", !!input.checked);
    });
  };

  if (contactForm.dataset.contactMethodBound === "1") {
    syncState();
    return;
  }

  contactForm.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (!target.matches(selector)) return;
    syncState();
  });

  contactForm.addEventListener("click", (event) => {
    const clickTarget = event.target instanceof Element ? event.target : null;
    if (!clickTarget) return;
    const choiceLabel = clickTarget.closest(".contactChoice .choice");
    if (!choiceLabel) return;
    const input = choiceLabel.querySelector('input[name="contactMethod"]');
    if (!(input instanceof HTMLInputElement)) return;

    if (clickTarget === input) return;
    event.preventDefault();
    if (String(input.type).toLowerCase() === "radio") input.checked = true;
    else input.checked = !input.checked;
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });

  contactForm.dataset.contactMethodBound = "1";
  syncState();
}

if (executionSelect && instantWarning) {
  executionSelect.addEventListener("change", () => {
    instantWarning.hidden = executionSelect.value !== "Instant";
  });
}

bindContactPrefillPersistence();
setupContactMethodChoices();

const sunriseStaffAliasKeywords = [
  "house",
  "team",
  "department.red",
  "department",
  "management",
  "executives",
  "directorate",
  "operations",
  "ops",
  "concierge",
  "staff",
  "red"
];

const sunriseOwnerAliasKeywords = [
  "owner",
  "owners",
  "ceo",
  "coo",
  "founder",
  "founders",
  "chairman",
  "executive-owner"
];

const sunriseOwnerAddressKeywords = [
  "aleks",
  "totev",
  "mikhail",
  "kovalev",
  "ceo",
  "coo",
  "owner",
  "founder",
  "chairman"
];

function normalizeEmailAddress(value = "") {
  return String(value || "").trim().toLowerCase();
}

function parseEmailRecipients(value = "") {
  return String(value || "")
    .split(/[,;\n]+/)
    .map((token) => String(token || "").trim())
    .map((token) => {
      const m = token.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
      return m ? normalizeEmailAddress(m[0]) : "";
    })
    .filter(Boolean);
}

function resolveSunriseMailboxForAccount(account) {
  if (!account) return "";
  const rawEmail = normalizeEmailAddress(account.email || "");
  if (!rawEmail) return "";
  if (account.sunriseCredential) return rawEmail;
  if (!hasSunriseAccess(account)) return "";
  const linkedMailbox = Object.entries(accounts).find(([key, row]) => {
    const linked = normalizeEmailAddress(row?.sunriseLinkedEmail || "");
    return !!row?.sunriseCredential && linked && (linked === rawEmail || linked === normalizeEmailAddress(account.email));
  });
  if (linkedMailbox && linkedMailbox[0]) return normalizeEmailAddress(linkedMailbox[0]);
  if (isOwnerAccount(account)) {
    if (rawEmail.includes("aleks")) return "aleks.sunrise@vvs.com";
    if (rawEmail.includes("mikhail")) return "mikhail.sunrise@vvs.com";
  }
  return rawEmail;
}

function ownerSunriseMailboxes() {
  const set = new Set();
  Object.values(accounts).forEach((account) => {
    if (!account || !isOwnerAccount(account)) return;
    const mailbox = resolveSunriseMailboxForAccount(account);
    if (mailbox) set.add(mailbox);
  });
  if (!set.size) {
    set.add("aleks.sunrise@vvs.com");
    set.add("mikhail.sunrise@vvs.com");
  }
  return Array.from(set);
}

function staffSunriseMailboxes() {
  const set = new Set();
  Object.values(accounts).forEach((account) => {
    if (!account || isOwnerAccount(account)) return;
    const membership = String(account.membership || "").trim().toLowerCase();
    if (membership !== "staff") return;
    const mailbox = resolveSunriseMailboxForAccount(account);
    if (mailbox) set.add(mailbox);
  });
  return Array.from(set);
}

function isStaffDistributionAlias(email = "") {
  const value = normalizeEmailAddress(email);
  const [localPart = "", domain = ""] = value.split("@");
  if (domain !== "venture-voyagers.com" || !localPart) return false;
  return sunriseStaffAliasKeywords.some((keyword) => {
    const k = String(keyword || "").toLowerCase();
    return localPart === k
      || localPart.startsWith(`${k}.`)
      || localPart.startsWith(`${k}-`)
      || localPart.endsWith(`.${k}`)
      || localPart.includes(`${k}_`);
  });
}

function isOwnerDistributionAlias(email = "") {
  const value = normalizeEmailAddress(email);
  const [localPart = "", domain = ""] = value.split("@");
  if (domain !== "venture-voyagers.com" || !localPart) return false;
  return sunriseOwnerAliasKeywords.some((keyword) => {
    const k = String(keyword || "").toLowerCase();
    return localPart === k
      || localPart.startsWith(`${k}.`)
      || localPart.startsWith(`${k}-`)
      || localPart.endsWith(`.${k}`)
      || localPart.includes(`${k}_`);
  });
}

function isOwnerAddressLike(email = "") {
  const value = normalizeEmailAddress(email);
  if (!value || !value.includes("@")) return false;
  const [localPart = "", domain = ""] = value.split("@");
  if (!localPart) return false;
  const ownerDomain = domain === "vvs.com" || domain === "venture-voyagers.com";
  if (!ownerDomain) return false;
  return sunriseOwnerAddressKeywords.some((keyword) => localPart.includes(String(keyword || "").toLowerCase()));
}

function resolveSunriseRecipientMailboxes(to = "", cc = "", bcc = "") {
  const targets = new Set();
  const recipients = [...parseEmailRecipients(to), ...parseEmailRecipients(cc), ...parseEmailRecipients(bcc)];
  recipients.forEach((email) => {
    const [localPart = "", domain = ""] = email.split("@");
    if (isOwnerDistributionAlias(email) || isOwnerAddressLike(email)) {
      ownerSunriseMailboxes().forEach((mailbox) => targets.add(mailbox));
      return;
    }
    if (isStaffDistributionAlias(email)) {
      staffSunriseMailboxes().forEach((mailbox) => targets.add(mailbox));
      return;
    }
    if (email === "owner@venture-voyagers.com") {
      ownerSunriseMailboxes().forEach((mailbox) => targets.add(mailbox));
      return;
    }
    const account = findAccountByEmail(email);
    if (account && hasSunriseAccess(account)) {
      if (isOwnerAccount(account)) {
        ownerSunriseMailboxes().forEach((mailbox) => targets.add(mailbox));
      } else {
        const mailbox = resolveSunriseMailboxForAccount(account);
        if (mailbox) targets.add(mailbox);
      }
      return;
    }
    if (domain === "venture-voyagers.com" && localPart && !isOwnerAddressLike(email)) {
      // For shared operational aliases (including future prefixes), distribute to staff.
      staffSunriseMailboxes().forEach((mailbox) => targets.add(mailbox));
      return;
    }
    if (email.endsWith(".sunrise@vvs.com")) {
      targets.add(email);
    }
  });
  return Array.from(targets);
}

function routeSunriseInboundCopies({
  senderMailbox = "",
  from = "",
  to = "",
  cc = "",
  bcc = "",
  subject = "",
  bodyHtml = "",
  priority = "Normal",
  attachments = []
} = {}) {
  const sender = normalizeEmailAddress(senderMailbox);
  const recipientMailboxes = resolveSunriseRecipientMailboxes(to, cc, bcc);
  recipientMailboxes.forEach((mailbox) => {
    const key = normalizeEmailAddress(mailbox);
    if (!key || (sender && key === sender)) return;
    pushInboxMessage({
      mailbox: key,
      folder: "inbox",
      from,
      to,
      cc,
      bcc,
      subject,
      bodyHtml,
      priority,
      attachments
    });
  });
}

function activeSunriseMailbox() {
  const account = sunriseState?.account || activeAccount || null;
  const mailbox = resolveSunriseMailboxForAccount(account);
  if (mailbox) return mailbox;
  return ownerSunriseMailboxes()[0] || "aleks.sunrise@vvs.com";
}

function sunriseInboxProfile() {
  const sessionAccount = sunriseState?.account || activeAccount || null;
  if (!sessionAccount) return { name: "Sunrise Operator", position: "Authenticated Session" };
  const linkedEmail = normalizeEmailAddress(sessionAccount.sunriseLinkedEmail || "");
  const resolvedAccount = linkedEmail && accounts[linkedEmail] ? accounts[linkedEmail] : sessionAccount;
  const prefix = String(resolvedAccount.prefix || "").trim();
  const first = String(resolvedAccount.firstName || "").trim();
  const last = String(resolvedAccount.lastName || "").trim();
  const nameCore = `${first} ${last}`.trim();
  const name = `${prefix} ${nameCore}`.replace(/\s+/g, " ").trim() || String(resolvedAccount.email || sessionAccount.email || "Sunrise Operator");
  const meta = sunriseAccessMeta(resolvedAccount);
  const position = String(resolvedAccount.roleTitle || sessionAccount.roleTitle || meta.title || "Sunrise Operator").trim();
  return { name, position };
}

let sunriseComposeDraftBaseline = null;

function getSunriseComposeSnapshot() {
  const readValue = (id) => String(document.getElementById(id)?.value || "").trim();
  const readFiles = (id) => {
    const input = document.getElementById(id);
    if (!(input instanceof HTMLInputElement) || !input.files) return [];
    return Array.from(input.files).map((file) => String(file?.name || "").trim()).filter(Boolean).sort();
  };
  return {
    to: readValue("sunrise-mail-to"),
    cc: readValue("sunrise-mail-cc"),
    bcc: readValue("sunrise-mail-bcc"),
    subject: readValue("sunrise-mail-subject"),
    from: readValue("sunrise-mail-from"),
    signature: readValue("sunrise-mail-signature"),
    body: readValue("sunrise-mail-body"),
    font: readValue("sunrise-mail-font"),
    fontSize: readValue("sunrise-mail-font-size"),
    priority: readValue("sunrise-mail-priority"),
    schedule: readValue("sunrise-mail-schedule"),
    attachments: readFiles("sunrise-mail-attach")
  };
}

function setSunriseComposeDraftBaseline() {
  sunriseComposeDraftBaseline = getSunriseComposeSnapshot();
}

function clearSunriseComposeDraftBaseline() {
  sunriseComposeDraftBaseline = null;
}

function hasSnapshotContent(snapshot = {}) {
  return Object.values(snapshot).some((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return String(value || "").trim().length > 0;
  });
}

function sunriseComposeSnapshotChanged() {
  const current = getSunriseComposeSnapshot();
  if (!sunriseComposeDraftBaseline) return hasSnapshotContent(current);
  const baseline = sunriseComposeDraftBaseline;
  const keys = ["to", "cc", "bcc", "subject", "from", "signature", "body", "font", "fontSize", "priority", "schedule"];
  const anyFieldChanged = keys.some((key) => String(current[key] || "") !== String(baseline[key] || ""));
  if (anyFieldChanged) return true;
  const currentFiles = Array.isArray(current.attachments) ? current.attachments : [];
  const baselineFiles = Array.isArray(baseline.attachments) ? baseline.attachments : [];
  if (currentFiles.length !== baselineFiles.length) return true;
  return currentFiles.some((name, idx) => name !== baselineFiles[idx]);
}

function hasPendingInboxChanges() {
  const overlay = document.getElementById("sunrise-email-overlay");
  if (!(overlay instanceof HTMLElement) || overlay.hidden) return false;
  return sunriseComposeSnapshotChanged();
}

function pushInboxMessage(payload = {}) {
  if (!sunriseControlState) return;
  const inbox = sunriseControlState.inbox || {};
  if (!Array.isArray(inbox.messages)) inbox.messages = [];
  inbox.messages.unshift({
    id: `MAIL-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    folder: payload.folder || "inbox",
    mailbox: payload.mailbox || "shared",
    from: payload.from || "concierge@venture-voyagers.com",
    to: payload.to || "",
    cc: payload.cc || "",
    bcc: payload.bcc || "",
    subject: payload.subject || "(No subject)",
    bodyHtml: payload.bodyHtml || "<p>No content.</p>",
    priority: payload.priority || "Normal",
    scheduledAt: payload.scheduledAt || "",
    createdAt: new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC",
    attachments: Array.isArray(payload.attachments) ? payload.attachments : []
  });
  sunriseControlState.inbox = inbox;
  saveSunriseControlState({ markDirty: false });
}

function formatOptionalCountryDisplay(country = "") {
  const raw = String(country || "").trim();
  return raw ? countryDisplayName(raw) : "";
}

function encodeHtmlEntities(value = "") {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const staffDivisionOrder = ["Headquarters", "Office", "Field", "Special Requests"];
const ampStaffGroupOrder = ["Owners", ...staffDivisionOrder];
const ampOwnerPreferredKeys = {
  "aleks totev": "aleks.totev@vvs.com",
  "mikhail kovalev": "mikhail.kovalev@vvs.com"
};
const ampOfficePreferredKeys = {
  CA: "office.chairman@vvs.com",
  DA: "office.directorate@vvs.com",
  SM: "office.management@vvs.com",
  SS: "office.supervisor@vvs.com",
  SA: "office.associate@vvs.com",
  STA: "concierge.basic@vvs.com"
};
const rtaRoleMeta = {
  fleet: { label: "Fleet", accountKey: "pilot" },
  driver: { label: "Driver", accountKey: "driver" },
  concierge: { label: "Concierge", accountKey: "concierge" },
  security: { label: "Head of Security", accountKey: "security" }
};

function normalizeStaffDivision(value = "", roleTitle = "") {
  const raw = String(value || "").trim().toLowerCase();
  if (raw === "owners" || raw === "owner") return "Owners";
  if (raw === "headquarters" || raw === "hq") return "Headquarters";
  if (raw === "office") return "Office";
  if (raw === "field") return "Field";
  if (raw === "special requests" || raw === "special-requests" || raw === "special_requests") return "Special Requests";
  const role = String(roleTitle || "").trim().toLowerCase();
  if (role.includes("special request")) return "Special Requests";
  if (role.includes("director") || role.includes("chief") || role.includes("chairman") || role.includes("head of concierge")) return "Headquarters";
  if (role.includes("fleet") || role.includes("driver") || role.includes("security") || role.includes("captain")) return "Field";
  return "Office";
}

function normalizeRtaRoles(value = [], roleTitle = "") {
  const source = Array.isArray(value)
    ? value
    : String(value || "").split(",").map((item) => item.trim()).filter(Boolean);
  const normalized = source.map((item) => String(item || "").trim().toLowerCase()).filter((item) => !!rtaRoleMeta[item]);
  if (normalized.length) return Array.from(new Set(normalized));
  const role = String(roleTitle || "").trim().toLowerCase();
  const inferred = [];
  if (role.includes("fleet") || role.includes("pilot") || role.includes("captain")) inferred.push("fleet");
  if (role.includes("driver") || role.includes("chauffeur")) inferred.push("driver");
  if (role.includes("concierge")) inferred.push("concierge");
  if (role.includes("security")) inferred.push("security");
  return Array.from(new Set(inferred));
}

function isVoyagerRedAccount(account) {
  if (!account || account.sunriseCredential) return false;
  return String(account.membership || "").trim().toLowerCase() === "voyager red";
}

function rtaRoleLabel(role = "") {
  return rtaRoleMeta[String(role || "").trim().toLowerCase()]?.label || "Team Role";
}

function rtaAccountKeyForRole(role = "") {
  return rtaRoleMeta[String(role || "").trim().toLowerCase()]?.accountKey || String(role || "").trim().toLowerCase();
}

function rtaEligibleStaffEntries(role = "") {
  const normalizedRole = String(role || "").trim().toLowerCase();
  return Object.entries(accounts)
    .filter(([, account]) => {
      if (!account || account.sunriseCredential) return false;
      if (String(account.membership || "").trim().toLowerCase() !== "staff") return false;
      const roles = normalizeRtaRoles(account.rtaRoles, account.roleTitle);
      return roles.includes(normalizedRole);
    })
    .sort((a, b) => {
      const aName = `${String(a[1]?.firstName || "").trim()} ${String(a[1]?.lastName || "").trim()}`.trim().toLowerCase();
      const bName = `${String(b[1]?.firstName || "").trim()} ${String(b[1]?.lastName || "").trim()}`.trim().toLowerCase();
      return aName.localeCompare(bName);
    });
}

function normalizeRtaAssignmentStatus(value = "") {
  const status = String(value || "").trim().toLowerCase();
  if (status === "confirmed") return "Confirmed";
  if (status === "pending confirmation" || status === "pending") return "Pending Confirmation";
  return "Unassigned";
}

function normalizeRtaPendingAction(value = "") {
  const action = String(value || "").trim().toLowerCase();
  if (["assign", "switch", "clear"].includes(action)) return action;
  return "";
}

function currentRtaApprovalLevel(account = getCurrentSunriseOperator()) {
  if (!account) return "";
  if (isOwnerAccount(account)) return "OW";
  return String(account.sunriseAccessLevel || "").trim().toUpperCase();
}

function canAccessRta(account = getCurrentSunriseOperator()) {
  const level = currentRtaApprovalLevel(account);
  return ["SM", "DA", "CA", "OW"].includes(level);
}

function canApproveRtaAssignment(account = getCurrentSunriseOperator()) {
  const level = currentRtaApprovalLevel(account);
  return ["DA", "CA", "OW"].includes(level);
}

function canManageRtaSwitch(account = getCurrentSunriseOperator()) {
  const level = currentRtaApprovalLevel(account);
  return ["DA", "CA", "OW"].includes(level);
}

function canEmptyRtaTeam(account = getCurrentSunriseOperator()) {
  const level = currentRtaApprovalLevel(account);
  return ["CA", "OW"].includes(level);
}

function redMemberAccountEntries() {
  return Object.entries(accounts)
    .filter(([, account]) => isVoyagerRedAccount(account))
    .sort((a, b) => {
      const aName = `${String(a[1]?.firstName || "").trim()} ${String(a[1]?.lastName || "").trim()}`.trim().toLowerCase();
      const bName = `${String(b[1]?.firstName || "").trim()} ${String(b[1]?.lastName || "").trim()}`.trim().toLowerCase();
      return aName.localeCompare(bName);
    });
}

function buildRtaOperatorLabel(account = getCurrentSunriseOperator()) {
  if (!account) return "";
  const fullName = `${String(account.firstName || "").trim()} ${String(account.lastName || "").trim()}`.trim();
  const level = currentRtaApprovalLevel(account) || "STA";
  return fullName ? `${fullName} (${level})` : level;
}

function buildRtaTeamAssignmentText(account, role = "") {
  if (!account) return "";
  const parts = [];
  const fullName = `${String(account.firstName || "").trim()} ${String(account.lastName || "").trim()}`.trim();
  if (fullName) parts.push(fullName);
  const title = String(account.roleTitle || rtaRoleLabel(role)).trim();
  if (title) parts.push(title);
  if (account.email) parts.push(String(account.email).trim().toLowerCase());
  if (account.phone) parts.push(String(account.phone).trim());
  return parts.filter(Boolean).join(" | ");
}

function buildRtaTeamOptionLabel(account, role = "") {
  if (!account) return "";
  const fullName = `${String(account.firstName || "").trim()} ${String(account.lastName || "").trim()}`.trim();
  const title = String(account.roleTitle || rtaRoleLabel(role)).trim();
  return [fullName, title].filter(Boolean).join(" • ");
}

function findStaffKeyByLegacyTeamValue(value = "", role = "") {
  const raw = String(value || "").trim().toLowerCase();
  if (!raw) return "";
  const match = rtaEligibleStaffEntries(role).find(([, account]) => {
    const email = String(account?.email || "").trim().toLowerCase();
    const fullName = `${String(account?.firstName || "").trim()} ${String(account?.lastName || "").trim()}`.trim().toLowerCase();
    return (email && raw.includes(email)) || (fullName && raw.includes(fullName));
  });
  return match ? match[0] : "";
}

function normalizeRtaAssignment(row = {}) {
  return {
    clientKey: String(row?.clientKey || "").trim().toLowerCase(),
    clientEmail: String(row?.clientEmail || "").trim(),
    clientName: String(row?.clientName || "").trim(),
    clientCountry: String(row?.clientCountry || "").trim(),
    clientPhone: String(row?.clientPhone || "").trim(),
    tier: String(row?.tier || "Voyager Red").trim(),
    fleetStaffKey: String(row?.fleetStaffKey || "").trim().toLowerCase(),
    driverStaffKey: String(row?.driverStaffKey || "").trim().toLowerCase(),
    conciergeStaffKey: String(row?.conciergeStaffKey || "").trim().toLowerCase(),
    securityStaffKey: String(row?.securityStaffKey || "").trim().toLowerCase(),
    publishedFleetStaffKey: String(row?.publishedFleetStaffKey || "").trim().toLowerCase(),
    publishedDriverStaffKey: String(row?.publishedDriverStaffKey || "").trim().toLowerCase(),
    publishedConciergeStaffKey: String(row?.publishedConciergeStaffKey || "").trim().toLowerCase(),
    publishedSecurityStaffKey: String(row?.publishedSecurityStaffKey || "").trim().toLowerCase(),
    status: normalizeRtaAssignmentStatus(row?.status),
    pendingAction: normalizeRtaPendingAction(row?.pendingAction),
    requestedBy: String(row?.requestedBy || "").trim(),
    requestedAt: String(row?.requestedAt || "").trim(),
    confirmedBy: String(row?.confirmedBy || "").trim(),
    confirmedAt: String(row?.confirmedAt || "").trim(),
    auditLog: Array.isArray(row?.auditLog)
      ? row.auditLog.map((item) => String(item || "").trim()).filter(Boolean).slice(0, 12)
      : []
  };
}

function buildSeedRtaAssignmentFromAccount(key, account) {
  return normalizeRtaAssignment({
    clientKey: key,
    clientEmail: String(account?.email || key || "").trim(),
    clientName: `${String(account?.firstName || "").trim()} ${String(account?.lastName || "").trim()}`.trim(),
    clientCountry: String(account?.country || "").trim(),
    clientPhone: String(account?.phone || "").trim(),
    tier: String(account?.membership || "Voyager Red").trim(),
    fleetStaffKey: findStaffKeyByLegacyTeamValue(account?.assignedTeam?.pilot, "fleet"),
    driverStaffKey: findStaffKeyByLegacyTeamValue(account?.assignedTeam?.driver, "driver"),
    conciergeStaffKey: findStaffKeyByLegacyTeamValue(account?.assignedTeam?.concierge, "concierge"),
    securityStaffKey: findStaffKeyByLegacyTeamValue(account?.assignedTeam?.security, "security"),
    publishedFleetStaffKey: findStaffKeyByLegacyTeamValue(account?.assignedTeam?.pilot, "fleet"),
    publishedDriverStaffKey: findStaffKeyByLegacyTeamValue(account?.assignedTeam?.driver, "driver"),
    publishedConciergeStaffKey: findStaffKeyByLegacyTeamValue(account?.assignedTeam?.concierge, "concierge"),
    publishedSecurityStaffKey: findStaffKeyByLegacyTeamValue(account?.assignedTeam?.security, "security"),
    status: account?.assignedTeam ? "Confirmed" : "Unassigned"
  });
}

function ensureRtaAssignmentsStore() {
  if (!sunriseControlState) return;
  if (!Array.isArray(sunriseControlState.rtaAssignments)) sunriseControlState.rtaAssignments = [];
  const existingByClient = new Map();
  sunriseControlState.rtaAssignments = sunriseControlState.rtaAssignments
    .map((row) => normalizeRtaAssignment(row))
    .filter((row) => !!row.clientKey);
  sunriseControlState.rtaAssignments.forEach((row, idx) => {
    if (!existingByClient.has(row.clientKey)) existingByClient.set(row.clientKey, idx);
  });
  redMemberAccountEntries().forEach(([key, account]) => {
    if (!existingByClient.has(key)) {
      sunriseControlState.rtaAssignments.push(buildSeedRtaAssignmentFromAccount(key, account));
      existingByClient.set(key, sunriseControlState.rtaAssignments.length - 1);
      return;
    }
    const row = sunriseControlState.rtaAssignments[existingByClient.get(key)];
    row.clientKey = key;
    row.clientEmail = String(account?.email || row.clientEmail || key || "").trim();
    row.clientName = `${String(account?.firstName || "").trim()} ${String(account?.lastName || "").trim()}`.trim();
    row.clientCountry = String(account?.country || row.clientCountry || "").trim();
    row.clientPhone = String(account?.phone || row.clientPhone || "").trim();
    row.tier = String(account?.membership || row.tier || "Voyager Red").trim();
    if (row.status === "Confirmed") {
      if (!row.publishedFleetStaffKey && row.fleetStaffKey) row.publishedFleetStaffKey = row.fleetStaffKey;
      if (!row.publishedDriverStaffKey && row.driverStaffKey) row.publishedDriverStaffKey = row.driverStaffKey;
      if (!row.publishedConciergeStaffKey && row.conciergeStaffKey) row.publishedConciergeStaffKey = row.conciergeStaffKey;
      if (!row.publishedSecurityStaffKey && row.securityStaffKey) row.publishedSecurityStaffKey = row.securityStaffKey;
    }
    const hasPublishedSelection = hasAnyRtaSelection(rtaPublishedSelectionFromAssignment(row));
    const hasWorkingSelection = hasAnyRtaSelection(rtaSelectionFromAssignment(row));
    if (!row.requestedBy && !row.requestedAt && !row.confirmedBy && !row.confirmedAt && !row.auditLog.length) {
      if (!hasWorkingSelection && account?.assignedTeam) {
        row.fleetStaffKey = findStaffKeyByLegacyTeamValue(account.assignedTeam.pilot, "fleet");
        row.driverStaffKey = findStaffKeyByLegacyTeamValue(account.assignedTeam.driver, "driver");
        row.conciergeStaffKey = findStaffKeyByLegacyTeamValue(account.assignedTeam.concierge, "concierge");
        row.securityStaffKey = findStaffKeyByLegacyTeamValue(account.assignedTeam.security, "security");
      }
      if (!hasPublishedSelection && account?.assignedTeam) {
        row.publishedFleetStaffKey = findStaffKeyByLegacyTeamValue(account.assignedTeam.pilot, "fleet");
        row.publishedDriverStaffKey = findStaffKeyByLegacyTeamValue(account.assignedTeam.driver, "driver");
        row.publishedConciergeStaffKey = findStaffKeyByLegacyTeamValue(account.assignedTeam.concierge, "concierge");
        row.publishedSecurityStaffKey = findStaffKeyByLegacyTeamValue(account.assignedTeam.security, "security");
      }
      if (account?.assignedTeam && !hasAnyRtaSelection(rtaPublishedSelectionFromAssignment(row)) && !hasAnyRtaSelection(rtaSelectionFromAssignment(row))) {
        row.status = "Confirmed";
      }
    }
  });
}

function findRtaAssignmentByClientKey(clientKey = "") {
  if (!sunriseControlState || !Array.isArray(sunriseControlState.rtaAssignments)) return null;
  const key = String(clientKey || "").trim().toLowerCase();
  return sunriseControlState.rtaAssignments.find((row) => String(row?.clientKey || "").trim().toLowerCase() === key) || null;
}

function rtaPendingCount() {
  if (!sunriseControlState || !Array.isArray(sunriseControlState.rtaAssignments)) return 0;
  return sunriseControlState.rtaAssignments.filter((row) => normalizeRtaAssignmentStatus(row?.status) === "Pending Confirmation").length;
}

function buildRtaProfileStatusNote(status = "", at = "") {
  const normalized = normalizeRtaAssignmentStatus(status);
  const timestamp = String(at || "").trim();
  if (normalized === "Pending Confirmation") {
    return timestamp
      ? `Team update pending executive confirmation since ${timestamp}.`
      : "Team update pending executive confirmation.";
  }
  if (normalized === "Confirmed") {
    return timestamp
      ? `Team confirmed and active as of ${timestamp}.`
      : "Team confirmed and active.";
  }
  return "";
}

function rtaSelectionFromAssignment(assignment = {}) {
  return {
    fleetStaffKey: String(assignment?.fleetStaffKey || "").trim().toLowerCase(),
    driverStaffKey: String(assignment?.driverStaffKey || "").trim().toLowerCase(),
    conciergeStaffKey: String(assignment?.conciergeStaffKey || "").trim().toLowerCase(),
    securityStaffKey: String(assignment?.securityStaffKey || "").trim().toLowerCase()
  };
}

function rtaPublishedSelectionFromAssignment(assignment = {}) {
  return {
    fleetStaffKey: String(assignment?.publishedFleetStaffKey || "").trim().toLowerCase(),
    driverStaffKey: String(assignment?.publishedDriverStaffKey || "").trim().toLowerCase(),
    conciergeStaffKey: String(assignment?.publishedConciergeStaffKey || "").trim().toLowerCase(),
    securityStaffKey: String(assignment?.publishedSecurityStaffKey || "").trim().toLowerCase()
  };
}

function applyRtaSelectionToAssignment(assignment, selection = {}) {
  if (!assignment) return;
  assignment.fleetStaffKey = String(selection.fleetStaffKey || "").trim().toLowerCase();
  assignment.driverStaffKey = String(selection.driverStaffKey || "").trim().toLowerCase();
  assignment.conciergeStaffKey = String(selection.conciergeStaffKey || "").trim().toLowerCase();
  assignment.securityStaffKey = String(selection.securityStaffKey || "").trim().toLowerCase();
}

function publishRtaSelection(assignment) {
  if (!assignment) return;
  assignment.publishedFleetStaffKey = String(assignment.fleetStaffKey || "").trim().toLowerCase();
  assignment.publishedDriverStaffKey = String(assignment.driverStaffKey || "").trim().toLowerCase();
  assignment.publishedConciergeStaffKey = String(assignment.conciergeStaffKey || "").trim().toLowerCase();
  assignment.publishedSecurityStaffKey = String(assignment.securityStaffKey || "").trim().toLowerCase();
}

function clearPublishedRtaSelection(assignment) {
  if (!assignment) return;
  assignment.publishedFleetStaffKey = "";
  assignment.publishedDriverStaffKey = "";
  assignment.publishedConciergeStaffKey = "";
  assignment.publishedSecurityStaffKey = "";
}

function clearRtaSelection(assignment) {
  if (!assignment) return;
  assignment.fleetStaffKey = "";
  assignment.driverStaffKey = "";
  assignment.conciergeStaffKey = "";
  assignment.securityStaffKey = "";
}

function clearRtaAssignmentState(assignment) {
  if (!assignment) return;
  clearRtaSelection(assignment);
  clearPublishedRtaSelection(assignment);
  assignment.status = "Unassigned";
  assignment.pendingAction = "";
  assignment.requestedBy = "";
  assignment.requestedAt = "";
  assignment.confirmedBy = "";
  assignment.confirmedAt = "";
}

function hasAnyRtaSelection(selection = {}) {
  return !!(selection.fleetStaffKey || selection.driverStaffKey || selection.conciergeStaffKey || selection.securityStaffKey);
}

function hasCompleteRtaSelection(selection = {}) {
  return !!(selection.fleetStaffKey && selection.driverStaffKey && selection.conciergeStaffKey && selection.securityStaffKey);
}

function rtaSelectionsMatch(a = {}, b = {}) {
  return String(a.fleetStaffKey || "") === String(b.fleetStaffKey || "")
    && String(a.driverStaffKey || "") === String(b.driverStaffKey || "")
    && String(a.conciergeStaffKey || "") === String(b.conciergeStaffKey || "")
    && String(a.securityStaffKey || "") === String(b.securityStaffKey || "");
}

function buildRtaAuditEntries(assignment = {}) {
  const explicit = Array.isArray(assignment.auditLog)
    ? assignment.auditLog.map((item) => String(item || "").trim()).filter(Boolean)
    : [];
  if (explicit.length) return explicit;
  const legacy = [];
  if (assignment.requestedBy) legacy.push(`Requested by ${assignment.requestedBy}${assignment.requestedAt ? ` on ${assignment.requestedAt}` : ""}`);
  if (assignment.confirmedBy) legacy.push(`Confirmed by ${assignment.confirmedBy}${assignment.confirmedAt ? ` on ${assignment.confirmedAt}` : ""}`);
  return legacy;
}

function appendRtaAuditEntry(assignment, text = "") {
  if (!assignment) return;
  if (!Array.isArray(assignment.auditLog)) assignment.auditLog = [];
  const message = String(text || "").trim();
  if (!message) return;
  assignment.auditLog.unshift(message);
  if (assignment.auditLog.length > 12) assignment.auditLog = assignment.auditLog.slice(0, 12);
}

function hydrateRtaAssignmentClientFields(assignment, clientKey = "", client = null) {
  if (!assignment) return;
  assignment.clientKey = String(clientKey || assignment.clientKey || "").trim().toLowerCase();
  assignment.clientEmail = String(client?.email || clientKey || assignment.clientEmail || "").trim();
  assignment.clientName = `${String(client?.firstName || "").trim()} ${String(client?.lastName || "").trim()}`.trim() || String(assignment.clientName || "").trim();
  assignment.clientCountry = String(client?.country || assignment.clientCountry || "").trim();
  assignment.clientPhone = String(client?.phone || assignment.clientPhone || "").trim();
  assignment.tier = String(client?.membership || assignment.tier || "Voyager Red").trim();
}

function setRtaPendingSubmission(assignment, selection = {}, pendingAction = "assign") {
  if (!assignment) return;
  applyRtaSelectionToAssignment(assignment, selection);
  assignment.status = "Pending Confirmation";
  assignment.pendingAction = normalizeRtaPendingAction(pendingAction);
  assignment.requestedBy = buildRtaOperatorLabel();
  assignment.requestedAt = formatUtcTimestamp(new Date());
  assignment.confirmedBy = "";
  assignment.confirmedAt = "";
}

function confirmRtaSelection(assignment) {
  if (!assignment) return;
  assignment.status = "Confirmed";
  assignment.pendingAction = "";
  assignment.confirmedBy = buildRtaOperatorLabel();
  assignment.confirmedAt = formatUtcTimestamp(new Date());
  if (!assignment.requestedBy) assignment.requestedBy = buildRtaOperatorLabel();
  if (!assignment.requestedAt) assignment.requestedAt = formatUtcTimestamp(new Date());
  publishRtaSelection(assignment);
}

function syncRedTeamAssignmentsToClientAccounts() {
  if (!sunriseControlState) return;
  ensureRtaAssignmentsStore();
  let activeAccountChanged = false;
  sunriseControlState.rtaAssignments.forEach((assignment) => {
    const key = String(assignment?.clientKey || "").trim().toLowerCase();
    if (!key || !accounts[key]) return;
    const account = accounts[key];
    if (!isVoyagerRedAccount(account)) return;
    const nextStatus = normalizeRtaAssignmentStatus(assignment.status);
    const publishedSelection = rtaPublishedSelectionFromAssignment(assignment);
    if (nextStatus === "Confirmed" && hasCompleteRtaSelection(rtaSelectionFromAssignment(assignment)) && !hasCompleteRtaSelection(publishedSelection)) {
      publishRtaSelection(assignment);
    }
    const effectiveSelection = nextStatus === "Confirmed"
      ? rtaSelectionFromAssignment(assignment)
      : publishedSelection;
    const fleet = accounts[effectiveSelection.fleetStaffKey] || null;
    const driver = accounts[effectiveSelection.driverStaffKey] || null;
    const concierge = accounts[effectiveSelection.conciergeStaffKey] || null;
    const security = accounts[effectiveSelection.securityStaffKey] || null;
    const nextTeam = (fleet || driver || concierge || security) ? {
      pilot: buildRtaTeamAssignmentText(fleet, "fleet"),
      driver: buildRtaTeamAssignmentText(driver, "driver"),
      concierge: buildRtaTeamAssignmentText(concierge, "concierge"),
      security: buildRtaTeamAssignmentText(security, "security")
    } : null;
    const nextNote = buildRtaProfileStatusNote(nextStatus, assignment.confirmedAt || assignment.requestedAt);
    if (nextTeam) {
      account.assignedTeam = nextTeam;
      account.redTeamAssignmentStatus = nextStatus;
      account.redTeamAssignmentNote = nextNote;
    } else {
      delete account.assignedTeam;
      delete account.redTeamAssignmentStatus;
      delete account.redTeamAssignmentNote;
    }
    if (activeAccount && normalizeEmailAddress(activeAccount.email) === key) activeAccountChanged = true;
  });
  if (activeAccountChanged && activeAccount) {
    const activeKey = normalizeEmailAddress(activeAccount.email);
    if (activeKey && accounts[activeKey]) {
      activeAccount = accounts[activeKey];
      persistActiveSession(activeAccount);
      renderProfile(activeAccount);
    }
  }
}

function resolveAccountByServiceClient({ clientAccountEmail = "", clientEmail = "", clientName = "" } = {}) {
  const directKeys = [clientAccountEmail, clientEmail]
    .map((value) => normalizeEmailAddress(value))
    .filter(Boolean);
  for (const key of directKeys) {
    if (accounts[key] && !accounts[key].sunriseCredential) {
      return { key, account: accounts[key] };
    }
  }

  const normalizedClientName = String(clientName || "").trim().toLowerCase();
  if (!normalizedClientName) {
    return { key: directKeys[0] || "", account: null };
  }

  const match = Object.entries(accounts).find(([, account]) => {
    if (!account || account.sunriseCredential) return false;
    const fullName = `${String(account.firstName || "").trim()} ${String(account.lastName || "").trim()}`.trim().toLowerCase();
    return !!fullName && fullName === normalizedClientName;
  });

  if (!match) return { key: directKeys[0] || "", account: null };
  return { key: match[0], account: match[1] };
}

function resolveSocClientCredentials(service = {}) {
  const match = resolveAccountByServiceClient({
    clientAccountEmail: service.clientAccountEmail,
    clientEmail: service.clientEmail,
    clientName: service.client
  });
  const account = match.account;
  const rawEmail = String(service.clientEmail || account?.email || match.key || "").trim();
  const rawPhone = String(service.clientPhone || account?.phone || "").trim();
  const rawCountry = String(service.clientCountry || account?.country || "").trim();
  const rawMethod = String(
    service.preferredContactMethod
    || account?.lastContactMethod
    || (rawEmail ? "email" : (rawPhone ? "phone" : ""))
  ).trim().toLowerCase();

  return {
    clientAccountEmail: normalizeEmailAddress(service.clientAccountEmail || rawEmail || match.key || ""),
    clientTitle: String(service.clientTitle || account?.prefix || "").trim(),
    clientEmail: rawEmail,
    clientPhone: rawPhone,
    clientCountry: rawCountry ? countryDisplayName(rawCountry) : "",
    preferredContactMethod: rawMethod
  };
}

function createSocServiceRecord({
  serviceId = "",
  serviceType = "",
  clientName = "",
  tier = "Non-Member",
  desiredExecutionTime = "",
  details = "",
  assigned = "",
  assignedAt = "",
  confirmedAt = "",
  status = "",
  stage = "Current",
  budget = 0,
  steps = null,
  clientTitle = "",
  clientEmail = "",
  clientPhone = "",
  clientCountry = "",
  preferredContactMethod = "",
  clientAccountEmail = ""
} = {}) {
  const resolvedAssigned = String(assigned || "").trim() || "Unassigned";
  const resolvedStatus = String(status || "").trim() || "Awaiting Confirmation";
  const credentials = resolveSocClientCredentials({
    client: clientName,
    clientTitle,
    clientEmail,
    clientPhone,
    clientCountry,
    preferredContactMethod,
    clientAccountEmail
  });
  return {
    id: serviceId || generateServiceId(),
    title: serviceType || "Service Request",
    client: clientName || "New Client",
    tier: tier || "Non-Member",
    desiredExecutionTime: desiredExecutionTime || "24h",
    description: details || "",
    assigned: resolvedAssigned,
    assignedAt: assignedAt || (resolvedAssigned.toLowerCase() !== "unassigned" ? formatUtcTimestamp(new Date()) : ""),
    confirmedAt: confirmedAt || "",
    status: resolvedStatus,
    stage: stage || "Current",
    budget: Number.isFinite(Number(budget)) ? Number(budget) : 0,
    clientTitle: credentials.clientTitle,
    clientEmail: credentials.clientEmail,
    clientPhone: credentials.clientPhone,
    clientCountry: credentials.clientCountry,
    preferredContactMethod: credentials.preferredContactMethod,
    clientAccountEmail: credentials.clientAccountEmail,
    steps: Array.isArray(steps) ? steps : defaultSocSteps()
  };
}

function normalizeProfileCardTime(value = "") {
  const text = String(value || "").trim();
  if (!text || text === "N/A") return "";
  return text;
}

function mapProfileStatusToSocStatus(statusText = "") {
  const normalized = String(statusText || "").trim().toLowerCase();
  if (!normalized) return "Awaiting Confirmation";
  if (normalized.includes("completed") || normalized.includes("closed")) return "Closed";
  if (normalized.includes("confirmed")) return "Confirmed";
  if (normalized.includes("assigned")) return "Assigned";
  return "Awaiting Confirmation";
}

function socRecordMatchesAccount(record = {}, accountKey = "", serviceTitle = "") {
  const normalizedKey = normalizeEmailAddress(accountKey);
  const normalizedTitle = String(serviceTitle || "").trim().toLowerCase();
  return normalizeEmailAddress(record?.clientAccountEmail || record?.clientEmail || "") === normalizedKey
    && String(record?.title || "").trim().toLowerCase() === normalizedTitle;
}

function ensureSocServicesStore() {
  if (!sunriseControlState) return;
  if (!sunriseControlState.socServices || typeof sunriseControlState.socServices !== "object") {
    sunriseControlState.socServices = { current: [], past: [], deleted: [] };
  }
  ["current", "past", "deleted"].forEach((bucket) => {
    if (!Array.isArray(sunriseControlState.socServices[bucket])) sunriseControlState.socServices[bucket] = [];
  });
  Object.entries(accounts).forEach(([key, account]) => {
    if (!account || account.sunriseCredential || isStaffAccountForAdmin(account)) return;
    const normalizedKey = normalizeEmailAddress(key);
    const tier = String(account.membership || "Non-Member").trim() || "Non-Member";
    const assigned = String(account.lastAssignedConcierge?.name || "").trim() || "Unassigned";
    const upcoming = normalizeClientUpcomingServiceCard(account.upcomingService);
    if (upcoming.title && upcoming.title !== defaultClientUpcomingServiceCard().title) {
      const existsCurrent = sunriseControlState.socServices.current.some((row) => socRecordMatchesAccount(row, normalizedKey, upcoming.title));
      const existsPast = sunriseControlState.socServices.past.some((row) => socRecordMatchesAccount(row, normalizedKey, upcoming.title));
      if (!existsCurrent && !existsPast) {
        sunriseControlState.socServices.current.push(createSocServiceRecord({
          serviceId: String(account.socUpcomingServiceId || "").trim().toUpperCase(),
          serviceType: upcoming.title,
          clientName: `${String(account.firstName || "").trim()} ${String(account.lastName || "").trim()}`.trim(),
          tier,
          desiredExecutionTime: normalizeProfileCardTime(upcoming.startsAt),
          details: String(upcoming.details || "").trim(),
          assigned,
          assignedAt: "",
          confirmedAt: "",
          status: mapProfileStatusToSocStatus(upcoming.statusText),
          stage: "Current",
          clientTitle: String(account.prefix || "").trim(),
          clientEmail: String(account.email || normalizedKey).trim(),
          clientPhone: String(account.phone || "").trim(),
          clientCountry: String(account.country || "").trim(),
          preferredContactMethod: String(account.preferredContactMethod || account.lastContactMethod || "").trim(),
          clientAccountEmail: normalizedKey
        }));
      }
    }
    const past = normalizeClientPastServiceCard(account.pastService);
    if (past.title && past.title !== defaultClientPastServiceCard().title) {
      const existsPast = sunriseControlState.socServices.past.some((row) => socRecordMatchesAccount(row, normalizedKey, past.title));
      if (!existsPast) {
        sunriseControlState.socServices.past.push(createSocServiceRecord({
          serviceId: String(account.socPastServiceId || "").trim().toUpperCase(),
          serviceType: past.title,
          clientName: `${String(account.firstName || "").trim()} ${String(account.lastName || "").trim()}`.trim(),
          tier,
          desiredExecutionTime: "",
          details: String(past.details || "").trim(),
          assigned,
          assignedAt: "",
          confirmedAt: normalizeProfileCardTime(past.endedAt),
          status: "Closed",
          stage: "Past",
          clientTitle: String(account.prefix || "").trim(),
          clientEmail: String(account.email || normalizedKey).trim(),
          clientPhone: String(account.phone || "").trim(),
          clientCountry: String(account.country || "").trim(),
          preferredContactMethod: String(account.preferredContactMethod || account.lastContactMethod || "").trim(),
          clientAccountEmail: normalizedKey
        }));
      }
    }
  });
}

function submitServiceIntoSOC({
  serviceType = "",
  clientName = "",
  tier = "Non-Member",
  desiredExecutionTime = "",
  details = "",
  assigned = "",
  clientTitle = "",
  clientEmail = "",
  clientPhone = "",
  clientCountry = "",
  preferredContactMethod = "",
  clientAccountEmail = ""
} = {}) {
  if (!sunriseControlState) return;
  if (!sunriseControlState.socServices) sunriseControlState.socServices = { current: [], past: [], deleted: [] };
  if (!Array.isArray(sunriseControlState.socServices.current)) sunriseControlState.socServices.current = [];
  sunriseControlState.socServices.current.unshift(createSocServiceRecord({
    serviceType,
    clientName,
    tier,
    desiredExecutionTime,
    details,
    assigned,
    clientTitle,
    clientEmail,
    clientPhone,
    clientCountry,
    preferredContactMethod,
    clientAccountEmail
  }));
  saveSunriseControlState({ markDirty: false });
}

function normalizeSocServiceStatus(status = "") {
  const value = String(status || "").trim().toLowerCase();
  if (value === "closed") return "Closed";
  if (value === "confirmed") return "Confirmed";
  if (value === "assigned") return "Assigned";
  if (value === "awaiting confirmation") return "Awaiting Confirmation";
  return value ? String(status).trim() : "Awaiting Confirmation";
}

function defaultClientUpcomingServiceCard() {
  return {
    title: "No upcoming service yet",
    details: "Book your first VVS service to start your schedule.",
    startsAt: "N/A",
    statusText: "",
    timeLabel: ""
  };
}

function defaultClientPastServiceCard() {
  return {
    title: "No completed service yet",
    details: "No previous service records available.",
    endedAt: "N/A",
    statusText: "",
    timeLabel: ""
  };
}

function socStatusPriority(status = "") {
  const normalized = normalizeSocServiceStatus(status);
  if (normalized === "Confirmed") return 3;
  if (normalized === "Assigned") return 2;
  if (normalized === "Awaiting Confirmation") return 1;
  return 0;
}

function socBucketPriority(bucket = "") {
  if (bucket === "current") return 2;
  if (bucket === "past") return 1;
  return 0;
}

function compareSocServiceCandidates(a, b) {
  const statusDiff = socStatusPriority(b?.service?.status) - socStatusPriority(a?.service?.status);
  if (statusDiff) return statusDiff;
  const bucketDiff = socBucketPriority(b?.bucket) - socBucketPriority(a?.bucket);
  if (bucketDiff) return bucketDiff;
  return Number(a?.idx || 0) - Number(b?.idx || 0);
}

function buildUpcomingServiceCardFromSoc(service = {}) {
  const normalizedStatus = normalizeSocServiceStatus(service.status);
  const description = String(service.description || "").trim() || "Your service request has been received and is being prepared.";

  return {
    title: String(service.title || "Service Request").trim() || "Service Request",
    details: description,
    statusText: normalizedStatus === "Confirmed" ? "Confirmed" : "Pending confirmation",
    startsAt: String(service.desiredExecutionTime || "").trim(),
    timeLabel: String(service.desiredExecutionTime || "").trim() ? "Requested timeframe" : ""
  };
}

function buildPastServiceCardFromSoc(service = {}) {
  const description = String(service.description || "").trim() || "This service has been completed successfully.";

  return {
    title: String(service.title || "Completed Service").trim() || "Completed Service",
    details: description,
    statusText: "Completed",
    endedAt: String(service.confirmedAt || service.assignedAt || "").trim() || "Closed",
    timeLabel: "Completed"
  };
}

function syncSocServicesToClientAccounts() {
  if (!sunriseControlState) return;
  const groups = sunriseControlState.socServices || {};
  const accountStates = new Map();
  const managedKeys = new Set(
    Object.entries(accounts)
      .filter(([, account]) => !!(account?.socUpcomingServiceId || account?.socPastServiceId))
      .map(([key]) => String(key || "").trim().toLowerCase())
  );

  ["current", "past"].forEach((bucket) => {
    const list = Array.isArray(groups[bucket]) ? groups[bucket] : [];
    list.forEach((service, idx) => {
      const match = resolveAccountByServiceClient({
        clientAccountEmail: service?.clientAccountEmail,
        clientEmail: service?.clientEmail,
        clientName: service?.client
      });
      const key = String(match?.key || "").trim().toLowerCase();
      const account = key && accounts[key] ? accounts[key] : null;
      if (!account || account.sunriseCredential || isStaffAccountForAdmin(account)) return;
      managedKeys.add(key);
      if (!accountStates.has(key)) {
        accountStates.set(key, { account, open: [], closed: [] });
      }
      const state = accountStates.get(key);
      const normalizedStatus = normalizeSocServiceStatus(service?.status);
      const credentials = resolveSocClientCredentials(service || {});
      if (credentials.clientTitle) state.account.prefix = credentials.clientTitle;
      if (credentials.clientPhone) state.account.phone = credentials.clientPhone;
      if (credentials.clientCountry) state.account.country = credentials.clientCountry;
      if (credentials.preferredContactMethod) state.account.lastContactMethod = credentials.preferredContactMethod;
      if (service?.assigned && String(service.assigned).trim() && String(service.assigned).trim().toLowerCase() !== "unassigned") {
        state.account.lastAssignedConcierge = resolveConciergeRecordByName(service.assigned) || {
          id: "assigned-concierge",
          name: String(service.assigned).trim(),
          role: "Assigned Concierge",
          email: "concierge@venture-voyagers.com",
          localPhone: ""
        };
      }
      const candidate = { service, bucket, idx };
      if (normalizedStatus === "Closed") state.closed.push(candidate);
      else state.open.push(candidate);
    });
  });

  let activeAccountChanged = false;
  managedKeys.forEach((key) => {
    const account = accounts[key];
    if (!account || account.sunriseCredential || isStaffAccountForAdmin(account)) return;
    const state = accountStates.get(key) || { account, open: [], closed: [] };
    const openCandidate = state.open.slice().sort(compareSocServiceCandidates)[0] || null;
    const closedCandidate = state.closed.slice().sort(compareSocServiceCandidates)[0] || null;

    if (openCandidate) {
      const nextUpcoming = buildUpcomingServiceCardFromSoc(openCandidate.service);
      const changed = !account.upcomingService
        || account.upcomingService.title !== nextUpcoming.title
        || account.upcomingService.details !== nextUpcoming.details
        || account.upcomingService.startsAt !== nextUpcoming.startsAt
        || String(account.upcomingService.statusText || "") !== String(nextUpcoming.statusText || "")
        || String(account.upcomingService.timeLabel || "") !== String(nextUpcoming.timeLabel || "")
        || account.socUpcomingServiceId !== openCandidate.service.id;
      if (changed) {
        account.upcomingService = nextUpcoming;
        account.socUpcomingServiceId = String(openCandidate.service.id || "").trim().toUpperCase();
        if (activeAccount && normalizeEmailAddress(activeAccount.email) === key) activeAccountChanged = true;
      }
    } else if (account.socUpcomingServiceId) {
      const fallbackUpcoming = defaultClientUpcomingServiceCard();
      const changed = !account.upcomingService
        || account.upcomingService.title !== fallbackUpcoming.title
        || account.upcomingService.details !== fallbackUpcoming.details
        || account.upcomingService.startsAt !== fallbackUpcoming.startsAt
        || String(account.upcomingService.statusText || "") !== String(fallbackUpcoming.statusText || "")
        || String(account.upcomingService.timeLabel || "") !== String(fallbackUpcoming.timeLabel || "");
      account.upcomingService = fallbackUpcoming;
      account.socUpcomingServiceId = "";
      if (changed && activeAccount && normalizeEmailAddress(activeAccount.email) === key) activeAccountChanged = true;
    }

    if (closedCandidate) {
      const nextPast = buildPastServiceCardFromSoc(closedCandidate.service);
      const changed = !account.pastService
        || account.pastService.title !== nextPast.title
        || account.pastService.details !== nextPast.details
        || account.pastService.endedAt !== nextPast.endedAt
        || String(account.pastService.statusText || "") !== String(nextPast.statusText || "")
        || String(account.pastService.timeLabel || "") !== String(nextPast.timeLabel || "")
        || account.socPastServiceId !== closedCandidate.service.id;
      if (changed) {
        account.pastService = nextPast;
        account.socPastServiceId = String(closedCandidate.service.id || "").trim().toUpperCase();
        if (activeAccount && normalizeEmailAddress(activeAccount.email) === key) activeAccountChanged = true;
      }
    } else if (account.socPastServiceId) {
      const fallbackPast = defaultClientPastServiceCard();
      const changed = !account.pastService
        || account.pastService.title !== fallbackPast.title
        || account.pastService.details !== fallbackPast.details
        || account.pastService.endedAt !== fallbackPast.endedAt
        || String(account.pastService.statusText || "") !== String(fallbackPast.statusText || "")
        || String(account.pastService.timeLabel || "") !== String(fallbackPast.timeLabel || "");
      account.pastService = fallbackPast;
      account.socPastServiceId = "";
      if (changed && activeAccount && normalizeEmailAddress(activeAccount.email) === key) activeAccountChanged = true;
    }
  });

  if (activeAccountChanged && activeAccount) {
    const activeKey = normalizeEmailAddress(activeAccount.email);
    if (activeKey && accounts[activeKey]) {
      activeAccount = accounts[activeKey];
      persistActiveSession(activeAccount);
      renderProfile(activeAccount);
    }
  }
}

function isLocalPreviewHost() {
  const host = String(window.location.hostname || "").trim().toLowerCase();
  return host === "127.0.0.1" || host === "localhost" || host === "";
}

async function postJsonWithTimeout(url, payload, timeoutMs = 12000) {
  return requestJsonWithTimeout(url, {
    method: "POST",
    payload,
    timeoutMs
  });
}

async function requestJsonWithTimeout(url, {
  method = "GET",
  payload = null,
  timeoutMs = 12000
} = {}) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method,
      headers: payload == null ? undefined : {
        "Content-Type": "application/json"
      },
      body: payload == null ? undefined : JSON.stringify(payload),
      signal: controller.signal
    });
    const body = await response.json().catch(() => ({}));
    return { ok: response.ok, status: response.status, body };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      body: {},
      error
    };
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function currentBrowserSessionLabel() {
  const ua = String(window.navigator?.userAgent || "").toLowerCase();
  if (ua.includes("arc")) return "Arc";
  if (ua.includes("safari") && !ua.includes("chrome")) return "Safari";
  if (ua.includes("edg")) return "Edge";
  if (ua.includes("firefox")) return "Firefox";
  if (ua.includes("chrome")) return "Chrome";
  return "Browser";
}

function cloneSharedRegistryAccount(account = null) {
  const cloned = cloneAccountsPayload(account) || {};
  delete cloned.sunriseCredential;
  return cloned;
}

function sharedRegistryAccountPayload(account = null, rawKey = "") {
  if (!account || typeof account !== "object" || account.sunriseCredential) return null;
  const key = normalizeEmailAddress(account.email || rawKey || "");
  if (!key) return null;
  const cloned = cloneSharedRegistryAccount(account);
  cloned.email = key;
  return cloned;
}

function mergeSharedRegistryAccountIntoLocal(account = null, rawKey = "") {
  if (!account || typeof account !== "object") return false;
  const key = normalizeEmailAddress(account.email || rawKey || "");
  if (!key) return false;
  const existing = cloneAccountsPayload(accounts[key]) || {};
  const nextAccount = normalizeAccountServiceCards({
    ...mergeStoredValuePreservingSeed(existing, cloneSharedRegistryAccount(account)),
    email: key
  });
  accounts[key] = nextAccount;
  return true;
}

function setSharedRegistrySnapshot(registry = null, { mergeIntoAccounts = true, persistLocal = false } = {}) {
  const snapshot = registry && typeof registry === "object" ? registry : {};
  sharedAccountRegistryState.accounts = snapshot.accounts && typeof snapshot.accounts === "object"
    ? snapshot.accounts
    : {};
  sharedAccountRegistryState.activities = Array.isArray(snapshot.activities)
    ? snapshot.activities
    : [];
  sharedAccountRegistryState.lastSyncedAt = String(snapshot.updatedAt || "").trim();
  if (mergeIntoAccounts) {
    Object.entries(sharedAccountRegistryState.accounts).forEach(([key, account]) => {
      const rows = sharedRegistryActivitiesForEmail(key);
      const enriched = enrichSharedRegistryAccountWithActivities(account, key, rows);
      if (!enriched) return;
      sharedAccountRegistryState.accounts[key] = cloneSharedRegistryAccount(enriched) || { email: key };
      mergeSharedRegistryAccountIntoLocal(enriched, key);
    });
    restoreProtectedOwnerCredentials();
    pruneDuplicateSunriseCredentials();
    normalizeAllAccountRecords();
    if (persistLocal) {
      try {
        localStorage.setItem(ACCOUNTS_DATA_KEY, JSON.stringify(accounts));
      } catch (_) {}
    }
  }
  queueMonarchArchangelSync();
}

function recentSharedRegistryActivities(limit = 20) {
  return (Array.isArray(sharedAccountRegistryState.activities) ? sharedAccountRegistryState.activities : [])
    .filter((row) => row && typeof row === "object")
    .slice(0, Math.max(1, Number(limit || 20)));
}

function humanizeRegistryEventType(value = "") {
  const key = String(value || "").trim().toLowerCase();
  if (key === "signup_started") return "Signup Started";
  if (key === "signup_verified") return "Signup Verified";
  if (key === "vvs_login") return "VVS Login";
  if (key === "sunrise_login") return "Sunrise Login";
  if (key === "membership_upgrade") return "Membership Upgrade";
  if (key === "account_updated") return "Account Updated";
  return String(value || "Activity")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function sharedRegistryActivityLocation(row = {}) {
  const parts = [
    String(row.city || "").trim(),
    String(row.region || "").trim(),
    String(row.country || "").trim()
  ].filter(Boolean);
  return parts.join(", ") || "Location pending";
}

function sharedRegistryActivityBrowser(row = {}) {
  const agent = String(row.userAgent || "").toLowerCase();
  if (agent.includes("arc")) return "Arc";
  if (agent.includes("safari") && !agent.includes("chrome")) return "Safari";
  if (agent.includes("edg")) return "Edge";
  if (agent.includes("firefox")) return "Firefox";
  if (agent.includes("chrome")) return "Chrome";
  return "Browser";
}

function sharedRegistryActivitiesForEmail(rawEmail = "") {
  const email = normalizeEmailAddress(rawEmail || "");
  if (!email) return [];
  return (Array.isArray(sharedAccountRegistryState.activities) ? sharedAccountRegistryState.activities : [])
    .filter((row) => normalizeEmailAddress(row?.email || "") === email);
}

function mergeSharedRegistryActivities(rows = []) {
  if (!Array.isArray(rows) || !rows.length) return;
  const existing = Array.isArray(sharedAccountRegistryState.activities)
    ? sharedAccountRegistryState.activities
    : [];
  const merged = [...rows, ...existing]
    .filter((row) => row && typeof row === "object")
    .map((row) => ({
      ...row,
      email: normalizeEmailAddress(row.email || ""),
      id: String(row.id || "").trim()
    }))
    .filter((row) => row.email && row.id);
  const seen = new Set();
  sharedAccountRegistryState.activities = merged.filter((row) => {
    const key = `${row.id}::${row.email}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 500);
}

function enrichSharedRegistryAccountWithActivities(rawAccount = null, rawEmail = "", rows = []) {
  const base = cloneSharedRegistryAccount(rawAccount) || {};
  const email = normalizeEmailAddress(base.email || rawEmail || "");
  if (!email) return null;
  const account = { ...base, email };
  const activityRows = Array.isArray(rows) ? rows : [];
  const latestRow = activityRows[0] || null;
  const signupVerified = activityRows.find((row) => String(row?.eventType || "").trim().toLowerCase() === "signup_verified") || null;
  const signupStarted = activityRows.find((row) => String(row?.eventType || "").trim().toLowerCase() === "signup_started") || null;

  const countryCode = resolveCountryCode(account.countryCode || account.country || "");
  const normalizedCountry = normalizeCountryLabelKey(account.country || "");
  const needsCountry = !countryCode || !normalizedCountry || normalizedCountry === "unknown";
  if (needsCountry) {
    const activityCountryCode = resolveCountryCode(latestRow?.country || "");
    if (activityCountryCode) {
      account.countryCode = activityCountryCode;
      account.country = countryDisplayName(activityCountryCode);
    } else {
      const fallbackCountry = String(latestRow?.country || "").trim();
      if (fallbackCountry) account.country = fallbackCountry;
    }
  } else if (!account.countryCode && countryCode) {
    account.countryCode = countryCode;
  }

  if (!String(account.preferredContactMethod || "").trim()) account.preferredContactMethod = "email";
  if (!String(account.accountStatus || "").trim()) account.accountStatus = "Active";

  if (!String(account.createdAt || "").trim() && signupStarted?.occurredAt) {
    account.createdAt = String(signupStarted.occurredAt || "").trim();
  }
  if (!String(account.verifiedAt || "").trim() && (signupVerified?.occurredAt || latestRow?.occurredAt)) {
    account.verifiedAt = String(signupVerified?.occurredAt || latestRow?.occurredAt || "").trim();
  }
  if (!String(account.updatedAt || "").trim() && latestRow?.occurredAt) {
    account.updatedAt = String(latestRow.occurredAt || "").trim();
  }
  return account;
}

async function pullSharedRegistryAccountByEmail(rawEmail = "", { persistLocal = true } = {}) {
  const email = normalizeEmailAddress(rawEmail || "");
  if (!email) return false;
  const result = await requestJsonWithTimeout(`/api/account-registry?email=${encodeURIComponent(email)}`, {
    method: "GET",
    timeoutMs: 15000
  });
  if (!result.ok || !result.body?.ok) return false;
  const account = result.body?.account && typeof result.body.account === "object"
    ? result.body.account
    : null;
  const activities = Array.isArray(result.body?.activities) ? result.body.activities : [];
  if (activities.length) mergeSharedRegistryActivities(activities);
  if (!account) return false;
  const enriched = enrichSharedRegistryAccountWithActivities(account, email, activities);
  if (!enriched) return false;
  sharedAccountRegistryState.loaded = true;
  sharedAccountRegistryState.available = true;
  sharedAccountRegistryState.error = "";
  sharedAccountRegistryState.accounts[email] = cloneSharedRegistryAccount(enriched) || { email };
  mergeSharedRegistryAccountIntoLocal(enriched, email);
  restoreProtectedOwnerCredentials();
  pruneDuplicateSunriseCredentials();
  normalizeAllAccountRecords();
  if (persistLocal) {
    try {
      localStorage.setItem(ACCOUNTS_DATA_KEY, JSON.stringify(accounts));
    } catch (_) {}
  }
  queueMonarchArchangelSync();
  if (sunriseControlState) {
    syncEcsWithStaffAccounts();
    ensureRtaAssignmentsStore();
    ensureSocServicesStore();
    syncRedTeamAssignmentsToClientAccounts();
    syncSocServicesToClientAccounts();
  }
  return true;
}

function extractEmailFromAmpFilter(filter = "") {
  const value = String(filter || "").trim().toLowerCase();
  if (!value) return "";
  const match = value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i);
  return normalizeEmailAddress(match?.[0] || "");
}

function queueAmpRegistryHydration(filter = "") {
  const targetEmail = extractEmailFromAmpFilter(filter);
  if (targetEmail && targetEmail !== ampRegistryLastHydratedEmail) {
    ampRegistryLastHydratedEmail = "";
  }
  if (ampRegistryHydrationTimer || ampRegistryHydrationInFlight) return;
  ampRegistryHydrationTimer = window.setTimeout(async () => {
    ampRegistryHydrationTimer = 0;
    if (ampRegistryHydrationInFlight) return;
    const now = Date.now();
    const email = extractEmailFromAmpFilter(String(document.getElementById("amp-search")?.value || filter || "").trim());
    const shouldRefresh = !sharedAccountRegistryState.loaded || (now - ampRegistryLastHydratedAt >= AMP_REGISTRY_HYDRATE_INTERVAL_MS);
    const shouldTarget = !!email && email !== ampRegistryLastHydratedEmail;
    if (!shouldRefresh && !shouldTarget) return;
    ampRegistryHydrationInFlight = true;
    let changed = false;
    if (shouldRefresh) {
      const refreshed = await refreshSharedAccountRegistry({ mergeIntoAccounts: true, persistLocal: true, force: true });
      ampRegistryLastHydratedAt = Date.now();
      changed = !!refreshed;
    }
    if (shouldTarget) {
      const targeted = await pullSharedRegistryAccountByEmail(email, { persistLocal: true });
      if (targeted) {
        changed = true;
        ampRegistryLastHydratedEmail = email;
      }
    }
    ampRegistryHydrationInFlight = false;
    if (changed && currentVisibleRoute() === "sunrise-amp") {
      const query = String(document.getElementById("amp-search")?.value || filter || "").trim();
      renderAMPPage(query, { skipRegistryHydration: true });
    }
  }, 120);
}

async function refreshSharedAccountRegistry({
  mergeIntoAccounts = true,
  persistLocal = true,
  force = false
} = {}) {
  if (sharedRegistryRefreshPromise && !force) return sharedRegistryRefreshPromise;
  sharedAccountRegistryState.loading = true;
  sharedRegistryRefreshPromise = requestJsonWithTimeout("/api/account-registry", {
    method: "GET",
    timeoutMs: 15000
  }).then((result) => {
    sharedAccountRegistryState.loading = false;
    sharedRegistryRefreshPromise = null;
    if (!result.ok || !result.body?.ok || !result.body?.registry) {
      const likelyUnavailable = isLocalPreviewHost() && (result.status === 0 || result.status === 404 || result.status === 405);
      sharedAccountRegistryState.loaded = true;
      sharedAccountRegistryState.available = false;
      sharedAccountRegistryState.error = likelyUnavailable
        ? ""
        : String(result.body?.message || "Shared account registry unavailable.").trim();
      return false;
    }
    sharedAccountRegistryState.loaded = true;
    sharedAccountRegistryState.available = true;
    sharedAccountRegistryState.error = "";
    setSharedRegistrySnapshot(result.body.registry, { mergeIntoAccounts, persistLocal });
    if (sunriseControlState) {
      syncEcsWithStaffAccounts();
      ensureRtaAssignmentsStore();
      ensureSocServicesStore();
      syncRedTeamAssignmentsToClientAccounts();
      syncSocServicesToClientAccounts();
      scheduleSunriseAdminRenders();
    }
    return true;
  }).catch(() => {
    sharedRegistryRefreshPromise = null;
    sharedAccountRegistryState.loading = false;
    sharedAccountRegistryState.loaded = true;
    sharedAccountRegistryState.available = false;
    return false;
  });
  return sharedRegistryRefreshPromise;
}

async function postSharedRegistryAction(payload = {}) {
  const result = await requestJsonWithTimeout("/api/account-registry", {
    method: "POST",
    payload,
    timeoutMs: 20000
  });
  if (!result.ok || !result.body?.ok) return false;
  sharedAccountRegistryState.loaded = true;
  sharedAccountRegistryState.available = true;
  sharedAccountRegistryState.error = "";
  if (result.body.registry) {
    setSharedRegistrySnapshot(result.body.registry, { mergeIntoAccounts: true, persistLocal: true });
    if (sunriseControlState) {
      syncEcsWithStaffAccounts();
      ensureRtaAssignmentsStore();
      ensureSocServicesStore();
      syncRedTeamAssignmentsToClientAccounts();
      syncSocServicesToClientAccounts();
      scheduleSunriseAdminRenders();
    }
  }
  return true;
}

async function logSharedRegistryActivity({
  email = "",
  eventType = "",
  system = "vvs",
  route = "",
  status = "",
  account = null
} = {}) {
  const normalizedEmail = normalizeEmailAddress(email || account?.email || "");
  if (!normalizedEmail || !eventType) return false;
  const record = sharedRegistryAccountPayload(account || accounts[normalizedEmail], normalizedEmail);
  return postSharedRegistryAction({
    action: "log-activity",
    email: normalizedEmail,
    eventType,
    system,
    route,
    status,
    account: record
  });
}

async function flushSharedRegistryAccountSync() {
  if (sharedRegistrySyncTimer) {
    window.clearTimeout(sharedRegistrySyncTimer);
    sharedRegistrySyncTimer = 0;
  }
  const keys = Array.from(sharedRegistryPendingKeys);
  sharedRegistryPendingKeys.clear();
  const batch = keys
    .map((key) => sharedRegistryAccountPayload(accounts[key], key))
    .filter(Boolean);
  if (!batch.length) return false;
  return postSharedRegistryAction({
    action: "bulk-upsert",
    accounts: batch
  });
}

function queueSharedRegistryAccountSync(rawKey = "") {
  const key = normalizeEmailAddress(rawKey || "");
  if (!key || !accounts[key] || accounts[key].sunriseCredential) return;
  sharedRegistryPendingKeys.add(key);
  if (sharedRegistrySyncTimer) return;
  sharedRegistrySyncTimer = window.setTimeout(() => {
    flushSharedRegistryAccountSync();
  }, 450);
}

function queueSharedRegistryBackfill() {
  if (sharedRegistryBackfillQueued) return;
  sharedRegistryBackfillQueued = true;
  window.setTimeout(() => {
    Object.entries(accounts).forEach(([key, account]) => {
      if (account?.sunriseCredential) return;
      queueSharedRegistryAccountSync(key);
    });
  }, 900);
}

function currentUpgradeInvitePayload() {
  const params = new URLSearchParams(window.location.search || "");
  return {
    email: normalizeEmailAddress(params.get("upgrade_email") || ""),
    token: String(params.get("upgrade_token") || "").trim(),
    source: String(params.get("upgrade_source") || "Chairman").trim()
  };
}

function clearUpgradeInvitePayload() {
  const url = new URL(window.location.href);
  url.searchParams.delete("upgrade_email");
  url.searchParams.delete("upgrade_token");
  url.searchParams.delete("upgrade_source");
  window.history.replaceState({}, document.title, `${url.pathname}${url.search}${url.hash}`);
}

function showMembershipUpgradeOverlay(account = null, previousTier = "", nextTier = "") {
  if (!membershipUpgradeOverlay) return;
  if (membershipUpgradeName) {
    membershipUpgradeName.textContent = `${String(account?.prefix || "").trim()} ${String(account?.firstName || "").trim()} ${String(account?.lastName || "").trim()}`.replace(/\s+/g, " ").trim() || "Voyager Member";
  }
  if (membershipUpgradeFrom) membershipUpgradeFrom.textContent = previousTier || "Non-Member";
  if (membershipUpgradeTo) membershipUpgradeTo.textContent = nextTier || "Voyager Red";
  membershipUpgradeOverlay.hidden = false;
}

async function applyUpgradeInviteFromUrl() {
  const invite = currentUpgradeInvitePayload();
  if (!invite.email || !invite.token) return false;
  if (!sharedAccountRegistryState.loaded) {
    await refreshSharedAccountRegistry({ mergeIntoAccounts: true, persistLocal: true });
  }
  if (!sharedAccountRegistryState.accounts?.[invite.email]) {
    await pullSharedRegistryAccountByEmail(invite.email, { persistLocal: true });
  }
  const sharedAccount = sharedAccountRegistryState.accounts?.[invite.email] || null;
  const pendingUpgrade = sharedAccount?.pendingUpgrade && typeof sharedAccount.pendingUpgrade === "object"
    ? sharedAccount.pendingUpgrade
    : null;
  if (!pendingUpgrade || String(pendingUpgrade.token || "").trim() !== invite.token) return false;
  const localAccount = accounts[invite.email] || findAccountByEmail(invite.email);
  if (!localAccount) {
    const loginEmailField = document.getElementById("login-email");
    if (loginEmailField instanceof HTMLInputElement) loginEmailField.value = invite.email;
    if (loginInfo) loginInfo.textContent = "Open this invitation from the device used during registration to complete your tier upgrade.";
    showRoute("account");
    return false;
  }

  const previousTier = String(localAccount.membership || pendingUpgrade.previousTier || "Non-Member").trim() || "Non-Member";
  const nextTier = String(pendingUpgrade.tier || "Voyager Red").trim() || "Voyager Red";
  localAccount.membership = nextTier;
  localAccount.accountStatus = "Active";
  localAccount.verifiedAt = String(localAccount.verifiedAt || sharedAccount?.verifiedAt || accountTimestampLabel()).trim();
  localAccount.updatedAt = accountTimestampLabel();
  localAccount.pendingUpgrade = {
    ...pendingUpgrade,
    claimedAt: localAccount.updatedAt,
    status: "Claimed"
  };
  syncChangedAccountState(invite.email);
  activeAccount = accounts[invite.email] || localAccount;
  persistActiveSession(activeAccount);
  renderProfile(activeAccount);
  updateAuthCta();
  showRoute("profile");
  await postSharedRegistryAction({
    action: "upsert-account",
    account: sharedRegistryAccountPayload(activeAccount, invite.email),
    event: {
      email: invite.email,
      eventType: "membership_upgrade",
      system: "vvs",
      route: "profile",
      status: `${previousTier} to ${nextTier}`
    }
  });
  showMembershipUpgradeOverlay(activeAccount, previousTier, nextTier);
  clearUpgradeInvitePayload();
  return true;
}

function buildContactIntegrationPayload(data = {}, assignedConcierge = "", clientTier = "Non-Member") {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    title: data.title,
    countryIssued: data.countryIssued,
    phone: data.phone,
    email: data.email,
    serviceType: data.serviceType,
    executionTime: data.executionTime,
    requestDetails: data.requestDetails,
    contactMethod: data.selectedMethod?.value || "",
    assignedConcierge,
    clientTier
  };
}

async function submitContactIntegrations(payload = {}) {
  const result = await postJsonWithTimeout("/api/contact-submit", payload);
  if (result.ok) return { ok: true, skipped: false, result };
  const likelyMissingApi = isLocalPreviewHost() && (result.status === 0 || result.status === 404 || result.status === 405);
  if (likelyMissingApi) {
    return {
      ok: false,
      skipped: true,
      message: "Local preview has no Cloudflare Functions runtime."
    };
  }
  return {
    ok: false,
    skipped: false,
    message: String(result.body?.message || "Contact API request failed.").trim(),
    result
  };
}

async function readEmailAttachments(fileInput) {
  if (!(fileInput instanceof HTMLInputElement) || !fileInput.files) return [];
  const files = Array.from(fileInput.files).filter(Boolean);
  const attachments = await Promise.all(files.map((file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const raw = String(reader.result || "");
      const [, base64 = ""] = raw.split(",");
      resolve({
        filename: file.name,
        content: base64,
        contentType: file.type || "application/octet-stream"
      });
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  })));
  return attachments.filter(Boolean);
}

async function deliverSunriseEmail({
  to = "",
  cc = "",
  bcc = "",
  subject = "",
  html = "",
  text = "",
  replyTo = "",
  from = "",
  attachments = []
} = {}) {
  const result = await postJsonWithTimeout("/api/email-send", {
    to,
    cc,
    bcc,
    subject,
    html,
    text,
    replyTo,
    from,
    attachments
  });
  if (result.ok) return { ok: true, skipped: false, result };
  const likelyMissingApi = isLocalPreviewHost() && (result.status === 0 || result.status === 404 || result.status === 405);
  if (likelyMissingApi) {
    return {
      ok: false,
      skipped: true,
      message: "Local preview has no Cloudflare Functions runtime."
    };
  }
  return {
    ok: false,
    skipped: false,
    message: String(result.body?.message || "Email API request failed.").trim(),
    result
  };
}

function shouldUseOwnerGmailInbox() {
  const account = sunriseState?.account || activeAccount || null;
  return !!(account && isOwnerAccount(account));
}

function ownerInboxActiveFolder() {
  return String(sunriseControlState?.inbox?.activeFolder || sunriseOwnerInboxState.folder || "inbox").trim() || "inbox";
}

function ownerInboxSelectedMessageId() {
  return String(
    sunriseControlState?.inbox?.selectedMessageId
    || sunriseOwnerInboxState.selectedMessage?.id
    || ""
  ).trim();
}

function ownerInboxStatusMessage(result = {}, fallback = "Owner Gmail inbox request failed.") {
  if (result?.body?.message) return String(result.body.message).trim();
  if (result?.body?.error?.message) return String(result.body.error.message).trim();
  return fallback;
}

function ownerInboxFolderCount(folderKey = "") {
  return Number(sunriseOwnerInboxState.folderCounts?.[folderKey] || 0);
}

function ownerInboxAliasChips() {
  const aliases = Array.isArray(sunriseOwnerInboxState.aliases) ? sunriseOwnerInboxState.aliases : [];
  if (!aliases.length) return "<span class=\"profileNote\">Primary Gmail sync active.</span>";
  return aliases.map((alias) => {
    const label = alias.displayName ? `${alias.displayName} • ${alias.email}` : alias.email;
    const accent = alias.isPrimary || alias.isDefault ? " sunriseStatusBadge" : "";
    return `<span class="sunriseInboxAliasChip${accent}">${label}</span>`;
  }).join("");
}

function ownerInboxVacationSummary() {
  const vacation = sunriseOwnerInboxState.vacation;
  if (!vacation || !vacation.enableAutoReply) return "Vacation reply is off.";
  const start = Number(vacation.startTime || 0) > 0 ? formatUtcTimestamp(vacation.startTime) : "now";
  const end = Number(vacation.endTime || 0) > 0 ? formatUtcTimestamp(vacation.endTime) : "until disabled";
  return `Vacation reply is active from ${start} to ${end}.`;
}

function htmlToSignatureText(value = "") {
  return String(value || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>\s*<p[^>]*>/gi, "\n\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const OWNER_GMAIL_SIGNATURE_DEFAULTS = [
  {
    id: "owner-signature-aleks",
    ownerCode: "AO1",
    name: "Aleks Totev",
    signatureHtml: `<p style="color:rgb(0,0,0)"><b>Aleks Totev</b><br>CEO &amp; Founder<br><strong>Venture Voyager Services LLC</strong></p><p style="color:rgb(0,0,0)">Luxury Concierge Services Worldwide Platform</p><p><a href="http://www.venture-voyagers.com" target="_blank"><b><font color="#000000">www.venture-voyagers.com</font></b></a></p><p style="color:rgb(0,0,0)"><a disabled="">email: <b>concierge@venture-voyagers.com</b></a><br>Office: <b>+971 529529110</b><br>DAMAC Towers by Paramount</p><p style="color:rgb(0,0,0)">Business Bay, Dubai, United Arab Emirates</p><p style="color:rgb(0,0,0)"><b><img data-aii="CiExb1hvRkpHZkJkWnh0ZlNvblRfWi0tRENhTzVocEZNU04" width="200" height="133" src="https://ci3.googleusercontent.com/mail-sig/AIorK4z_40vs8gfBn0-0fP0xqwZsSImXhDh3jj_PMrfIQRoMJinxdy6AVBT9L9zxmkAXIgMcsm13-zaE6Sh-" data-os="https://lh3.googleusercontent.com/d/1oXoFJGfBdZxtfSonT_Z--DCaO5hpFMSN"></b><b><img data-aii="CiExZEJuTmUxeVJNa2dialRxQzVzb3lGb2tfaXZ3ZmVxS20" width="200" height="133" src="https://ci3.googleusercontent.com/mail-sig/AIorK4yEqTdrJwD5nh4CKOt9jSTLOdBBPY7YEQT_UrelsnSz1AadJW46x9c0N3wiE00X8xR_5T_clz2NR7d7" data-os="https://lh3.googleusercontent.com/d/1dBnNe1yRMkgbjTqC5soyFok_ivwfeqKm"></b><em><br></em></p><p style="color:rgb(0,0,0)"><em>Disclaimer: This is a direct corporate mailing system, forwarding, sharing any information from this email violates Privacy Policy of VVS and can be lead to legal consequences.</em></p>`
  },
  {
    id: "owner-signature-mikhail",
    ownerCode: "MO1",
    name: "Mikhail Kovalev",
    signatureHtml: `<p style="color:rgb(0,0,0)"><b>Mikhail Kovalev</b><br>COO &amp; Co-Founder<br><strong>Venture Voyager Services LLC</strong></p><p style="color:rgb(0,0,0)">Luxury Concierge Services Worldwide Platform</p><p style="color:rgb(0,0,0)"><a href="http://www.venture-voyagers.com" target="_blank"><b><font color="#000000">www.venture-voyagers.com</font></b></a><br></p><p style="color:rgb(0,0,0)"><a disabled="">email:<span>&nbsp;</span><b>concierge@venture-voyagers.com</b></a><br>Office:<span>&nbsp;</span><b>+1 512 534 7616</b><br>2nd East street, Central District Tower</p><p style="color:rgb(0,0,0)">New York, United States<br></p><p style="color:rgb(0,0,0)"><b><img data-aii="CiExb1hvRkpHZkJkWnh0ZlNvblRfWi0tRENhTzVocEZNU04" width="200" height="133" src="https://ci3.googleusercontent.com/mail-sig/AIorK4z_40vs8gfBn0-0fP0xqwZsSImXhDh3jj_PMrfIQRoMJinxdy6AVBT9L9zxmkAXIgMcsm13-zaE6Sh-" data-os="https://lh3.googleusercontent.com/d/1oXoFJGfBdZxtfSonT_Z--DCaO5hpFMSN"></b><b><img data-aii="CiExZEJuTmUxeVJNa2dialRxQzVzb3lGb2tfaXZ3ZmVxS20" width="200" height="133" src="https://ci3.googleusercontent.com/mail-sig/AIorK4yEqTdrJwD5nh4CKOt9jSTLOdBBPY7YEQT_UrelsnSz1AadJW46x9c0N3wiE00X8xR_5T_clz2NR7d7" data-os="https://lh3.googleusercontent.com/d/1dBnNe1yRMkgbjTqC5soyFok_ivwfeqKm"></b><em><br></em></p><p style="color:rgb(0,0,0)"><em>Disclaimer: This is a direct corporate mailing system, forwarding, sharing any information from this email violates Privacy Policy of VVS and can be lead to legal consequences.</em></p>`
  }
];

function ownerInboxSenderProfiles() {
  const aliases = Array.isArray(sunriseOwnerInboxState.aliases) ? sunriseOwnerInboxState.aliases : [];
  return aliases.map((alias, index) => {
    const email = String(alias?.email || "").trim();
    const displayName = String(alias?.displayName || "").trim();
    const signatureHtml = String(alias?.signatureHtml || "").trim();
    return {
      id: email || `gmail-alias-${index + 1}`,
      email,
      displayName,
      replyTo: String(alias?.replyTo || "").trim(),
      isPrimary: !!alias?.isPrimary,
      isDefault: !!alias?.isDefault,
      signatureHtml
    };
  }).filter((entry) => entry.email);
}

function ownerInboxDefaultSenderProfile() {
  const profiles = ownerInboxSenderProfiles();
  return profiles.find((profile) => profile.isDefault)
    || profiles.find((profile) => profile.isPrimary)
    || profiles[0]
    || null;
}

function defaultOwnerSignaturePresetId() {
  const viewer = sunriseState?.account || activeAccount || null;
  if (isMikhailOwnerAccount(viewer)) return "owner-signature-mikhail";
  return "owner-signature-aleks";
}

function ownerInboxSignatureProfiles() {
  const inbox = sunriseControlState?.inbox || {};
  const stored = Array.isArray(inbox.ownerSignaturePresets) ? inbox.ownerSignaturePresets : [];
  const defaultMap = new Map(OWNER_GMAIL_SIGNATURE_DEFAULTS.map((preset) => [preset.id, { ...preset }]));
  stored.forEach((entry) => {
    const rawId = String(entry?.id || "").trim();
    const rawName = String(entry?.name || "").trim().toLowerCase();
    const matchedDefault = defaultMap.get(rawId)
      || OWNER_GMAIL_SIGNATURE_DEFAULTS.find((preset) => preset.name.trim().toLowerCase() === rawName);
    if (!matchedDefault) return;
    defaultMap.set(matchedDefault.id, {
      ...matchedDefault,
      name: String(entry?.name || matchedDefault.name || "").trim() || matchedDefault.name,
      signatureHtml: String(entry?.signatureHtml || entry?.html || matchedDefault.signatureHtml || "").trim() || matchedDefault.signatureHtml
    });
  });
  const selectedDefaultId = String(inbox.ownerDefaultSignatureId || defaultOwnerSignaturePresetId()).trim();
  return OWNER_GMAIL_SIGNATURE_DEFAULTS.map((preset) => {
    const merged = defaultMap.get(preset.id) || { ...preset };
    const signatureHtml = String(merged.signatureHtml || "").trim();
    return {
      id: preset.id,
      ownerCode: String(merged.ownerCode || preset.ownerCode || "").trim(),
      name: String(merged.name || preset.name || "").trim() || preset.name,
      signatureHtml,
      signatureText: htmlToSignatureText(signatureHtml),
      isDefault: preset.id === selectedDefaultId
    };
  });
}

function ownerInboxDefaultSignatureProfile() {
  const profiles = ownerInboxSignatureProfiles();
  return profiles.find((profile) => profile.isDefault)
    || profiles[0]
    || null;
}

function saveOwnerSignatureProfiles(nextProfiles = [], nextDefaultId = "") {
  if (!sunriseControlState) return;
  const inbox = sunriseControlState.inbox || {};
  inbox.ownerSignaturePresets = nextProfiles.map((profile) => ({
    id: String(profile?.id || "").trim(),
    ownerCode: String(profile?.ownerCode || "").trim(),
    name: String(profile?.name || "").trim(),
    signatureHtml: String(profile?.signatureHtml || "").trim()
  })).filter((profile) => profile.id);
  inbox.ownerDefaultSignatureId = String(nextDefaultId || inbox.ownerDefaultSignatureId || defaultOwnerSignaturePresetId()).trim();
  sunriseControlState.inbox = inbox;
  queueMonarchArchangelSync();
}

function ownerSignatureProfileById(profileId = "") {
  const id = String(profileId || "").trim();
  return ownerInboxSignatureProfiles().find((profile) => profile.id === id) || null;
}

function normalizeOwnerSignatureEditorHtml(value = "") {
  return String(value || "")
    .replace(/<div><br><\/div>/gi, "")
    .replace(/<div>/gi, "<p>")
    .replace(/<\/div>/gi, "</p>")
    .replace(/<p>\s*<\/p>/gi, "")
    .trim();
}

function persistOwnerSignatureProfileUpdate(profileId = "", updater = null, { rerender = false, forceDefault = false } = {}) {
  const id = String(profileId || "").trim();
  if (!id || typeof updater !== "function") return false;
  const profiles = ownerInboxSignatureProfiles();
  const idx = profiles.findIndex((profile) => profile.id === id);
  if (idx < 0) return false;
  updater(profiles[idx]);
  saveOwnerSignatureProfiles(
    profiles,
    String(sunriseControlState?.inbox?.ownerDefaultSignatureId || defaultOwnerSignaturePresetId()).trim()
  );
  syncOwnerComposeIdentityControls(forceDefault ? { forceDefault: true } : {});
  saveSunriseControlState({ markDirty: false });
  if (rerender) renderSignatureManager();
  return true;
}

function ownerSignatureEditorElement(profileId = "") {
  return document.querySelector(`[data-owner-signature-editor="${CSS.escape(String(profileId || "").trim())}"]`);
}

function ownerSignaturePreviewElement(profileId = "") {
  return document.querySelector(`[data-owner-signature-preview="${CSS.escape(String(profileId || "").trim())}"]`);
}

function ownerSignatureEditorHtml(profileId = "") {
  const editor = ownerSignatureEditorElement(profileId);
  return editor instanceof HTMLElement
    ? normalizeOwnerSignatureEditorHtml(editor.innerHTML)
    : String(ownerSignatureProfileById(profileId)?.signatureHtml || "").trim();
}

function refreshOwnerSignaturePreview(profileId = "", html = "") {
  const preview = ownerSignaturePreviewElement(profileId);
  if (!(preview instanceof HTMLElement)) return;
  const nextHtml = normalizeOwnerSignatureEditorHtml(html || ownerSignatureEditorHtml(profileId));
  preview.innerHTML = nextHtml || "<p class='profileNote'>No owner signature configured.</p>";
}

function syncOwnerSignatureEditorValue(profileId = "", { rerender = false } = {}) {
  const id = String(profileId || "").trim();
  if (!id) return false;
  const html = ownerSignatureEditorHtml(id);
  const updated = persistOwnerSignatureProfileUpdate(id, (profile) => {
    profile.signatureHtml = html;
  }, { rerender });
  refreshOwnerSignaturePreview(id, html);
  return updated;
}

function focusOwnerSignatureEditor(profileId = "") {
  const editor = ownerSignatureEditorElement(profileId);
  if (editor instanceof HTMLElement) editor.focus();
  return editor instanceof HTMLElement ? editor : null;
}

function runOwnerSignatureEditorCommand(profileId = "", command = "") {
  const id = String(profileId || "").trim();
  const editor = focusOwnerSignatureEditor(id);
  if (!editor) return false;
  const cmd = String(command || "").trim().toLowerCase();
  if (!cmd) return false;
  if (cmd === "title") {
    document.execCommand("formatBlock", false, "h3");
  } else if (cmd === "body") {
    document.execCommand("formatBlock", false, "p");
  } else if (cmd === "divider") {
    document.execCommand("insertHTML", false, "<p>────────────</p>");
  } else if (cmd === "website") {
    document.execCommand("insertHTML", false, `<p><a href="https://www.venture-voyagers.com" target="_blank">www.venture-voyagers.com</a></p>`);
  } else if (cmd === "email") {
    document.execCommand("insertHTML", false, `<p>concierge@venture-voyagers.com</p>`);
  } else if (cmd === "phone") {
    const profile = ownerSignatureProfileById(id);
    const phone = String(profile?.ownerCode || "").trim() === "AO1" ? "+971 529529110" : "+1 512 534 7616";
    document.execCommand("insertHTML", false, `<p>${phone}</p>`);
  } else {
    document.execCommand(cmd, false);
  }
  syncOwnerSignatureEditorValue(id);
  return true;
}

function ownerInboxSenderAddress(profile = null) {
  const email = String(profile?.email || "").trim();
  const displayName = String(profile?.displayName || "").trim();
  if (!email) return "Venture Voyager Services <concierge@venture-voyagers.com>";
  return displayName ? `${displayName} <${email}>` : email;
}

function setComposeFieldVisibility(id = "", visible = false) {
  const field = document.getElementById(id);
  const label = document.querySelector(`label[for="${id}"]`);
  if (field instanceof HTMLElement) field.hidden = !visible;
  if (label instanceof HTMLElement) label.hidden = !visible;
}

function syncOwnerComposeIdentityControls({ forceDefault = false } = {}) {
  const fromSelect = document.getElementById("sunrise-mail-from");
  const signatureSelect = document.getElementById("sunrise-mail-signature");
  const ownerMode = shouldUseOwnerGmailInbox();
  setComposeFieldVisibility("sunrise-mail-from", ownerMode);
  setComposeFieldVisibility("sunrise-mail-signature", ownerMode);
  if (!(fromSelect instanceof HTMLSelectElement) || !(signatureSelect instanceof HTMLSelectElement)) return;
  if (!ownerMode) {
    fromSelect.innerHTML = `<option value="concierge@venture-voyagers.com">concierge@venture-voyagers.com</option>`;
    fromSelect.value = "concierge@venture-voyagers.com";
    signatureSelect.innerHTML = `<option value="">No signature</option>`;
    signatureSelect.value = "";
    return;
  }
  const senderProfiles = ownerInboxSenderProfiles();
  const signatureProfiles = ownerInboxSignatureProfiles();
  const defaultSender = ownerInboxDefaultSenderProfile();
  const runtimeDefaultSignature = signatureProfiles.find((profile) => profile.id === defaultOwnerSignaturePresetId()) || null;
  const defaultSignature = forceDefault ? (runtimeDefaultSignature || ownerInboxDefaultSignatureProfile()) : ownerInboxDefaultSignatureProfile();
  fromSelect.innerHTML = senderProfiles.length
    ? senderProfiles.map((profile) => {
      const label = profile.displayName ? `${profile.displayName} • ${profile.email}` : profile.email;
      return `<option value="${profile.email}">${label}</option>`;
    }).join("")
    : `<option value="concierge@venture-voyagers.com">concierge@venture-voyagers.com</option>`;
  signatureSelect.innerHTML = `<option value="">No signature</option>${signatureProfiles.map((profile) => {
    return `<option value="${profile.id}">${profile.name}</option>`;
  }).join("")}`;
  if (forceDefault || !fromSelect.value) {
    fromSelect.value = String(defaultSender?.email || "concierge@venture-voyagers.com");
  }
  if (forceDefault || !signatureSelect.value || !signatureProfiles.some((profile) => profile.id === signatureSelect.value)) {
    signatureSelect.value = String(defaultSignature?.id || "");
  }
}

function selectedOwnerComposeSenderProfile() {
  const select = document.getElementById("sunrise-mail-from");
  const selected = String(select instanceof HTMLSelectElement ? select.value : "").trim();
  const profiles = ownerInboxSenderProfiles();
  return profiles.find((profile) => profile.email === selected)
    || ownerInboxDefaultSenderProfile();
}

function selectedOwnerComposeSignatureProfile() {
  const select = document.getElementById("sunrise-mail-signature");
  const selected = String(select instanceof HTMLSelectElement ? select.value : "").trim();
  const profiles = ownerInboxSignatureProfiles();
  return profiles.find((profile) => profile.id === selected)
    || ownerInboxDefaultSignatureProfile();
}

function appendOwnerSignatureHtml(bodyHtml = "", profile = null) {
  const signatureHtml = String(profile?.signatureHtml || "").trim();
  if (!signatureHtml) return bodyHtml;
  const content = String(bodyHtml || "").trim();
  return content ? `${content}<br><br>${signatureHtml}` : signatureHtml;
}

function appendOwnerSignatureText(bodyText = "", profile = null) {
  const signatureText = String(profile?.signatureText || "").trim();
  if (!signatureText) return String(bodyText || "").trim();
  const content = String(bodyText || "").trim();
  return content ? `${content}\n\n${signatureText}` : signatureText;
}

async function requestOwnerGmailInbox(endpoint, payload = null, timeoutMs = 15000) {
  const result = await requestJsonWithTimeout(endpoint, {
    method: payload == null ? "GET" : "POST",
    payload,
    timeoutMs
  });
  if (result.ok && result.body?.ok) return { ok: true, body: result.body };
  const likelyMissingApi = isLocalPreviewHost() && (result.status === 0 || result.status === 404 || result.status === 405);
  return {
    ok: false,
    skipped: likelyMissingApi,
    message: ownerInboxStatusMessage(result)
  };
}

async function syncOwnerGmailInbox({
  folder = "",
  selectedMessageId = "",
  clearSelectedMessage = false,
  silent = false
} = {}) {
  if (!shouldUseOwnerGmailInbox()) return false;
  const nextFolder = String(folder || ownerInboxActiveFolder()).trim() || "inbox";
  sunriseOwnerInboxState.folder = nextFolder;
  sunriseOwnerInboxState.loading = true;
  if (!silent) sunriseOwnerInboxState.error = "";
  if (sunriseControlState?.inbox) {
    sunriseControlState.inbox.activeFolder = nextFolder;
    if (clearSelectedMessage) sunriseControlState.inbox.selectedMessageId = "";
    else if (selectedMessageId) sunriseControlState.inbox.selectedMessageId = String(selectedMessageId || "").trim();
  }
  if (currentVisibleRoute() === "sunrise-inbox") renderSunriseInboxPage();

  const params = new URLSearchParams({
    mode: "bootstrap",
    folder: nextFolder
  });
  const requestedId = clearSelectedMessage
    ? ""
    : String(selectedMessageId || ownerInboxSelectedMessageId()).trim();
  if (requestedId) params.set("id", requestedId);
  const response = await requestOwnerGmailInbox(`/api/gmail-inbox?${params.toString()}`);

  sunriseOwnerInboxState.loading = false;
  if (!response.ok) {
    sunriseOwnerInboxState.ready = false;
    sunriseOwnerInboxState.error = String(response.message || "Owner Gmail inbox sync failed.").trim();
    if (currentVisibleRoute() === "sunrise-inbox") renderSunriseInboxPage();
    return false;
  }

  const body = response.body || {};
  sunriseOwnerInboxState.ready = true;
  sunriseOwnerInboxState.error = "";
  sunriseOwnerInboxState.messages = Array.isArray(body.messages) ? body.messages : [];
  sunriseOwnerInboxState.selectedMessage = clearSelectedMessage ? null : (body.selectedMessage || null);
  sunriseOwnerInboxState.customFolders = Array.isArray(body.customFolders) ? body.customFolders : [];
  sunriseOwnerInboxState.folderCounts = body.folderCounts || {};
  sunriseOwnerInboxState.aliases = Array.isArray(body.aliases) ? body.aliases : [];
  sunriseOwnerInboxState.vacation = body.vacation || null;
  sunriseOwnerInboxState.mailbox = String(body.mailbox || sunriseOwnerInboxState.mailbox || "concierge@venture-voyagers.com");
  sunriseOwnerInboxState.lastSyncedAt = String(body.lastSyncedAt || "").trim();
  sunriseOwnerInboxState.nextPageToken = String(body.nextPageToken || "").trim();
  if (sunriseControlState?.inbox) {
    sunriseControlState.inbox.activeFolder = nextFolder;
    sunriseControlState.inbox.selectedMessageId = clearSelectedMessage
      ? ""
      : String(body.selectedMessage?.id || "").trim();
  }
  syncOwnerComposeIdentityControls();
  if (currentVisibleRoute() === "sunrise-inbox") renderSunriseInboxPage();
  return true;
}

async function fetchOwnerGmailMessage(messageId = "") {
  const id = String(messageId || "").trim();
  if (!id) return false;
  const response = await requestOwnerGmailInbox(`/api/gmail-inbox?mode=message&id=${encodeURIComponent(id)}`);
  if (!response.ok) {
    sunriseOwnerInboxState.error = String(response.message || "Unable to load message details.").trim();
    if (currentVisibleRoute() === "sunrise-inbox") renderSunriseInboxPage();
    return false;
  }
  sunriseOwnerInboxState.selectedMessage = response.body?.message || null;
  sunriseOwnerInboxState.error = "";
  if (sunriseControlState?.inbox) sunriseControlState.inbox.selectedMessageId = id;
  if (currentVisibleRoute() === "sunrise-inbox") renderSunriseInboxPage();
  return true;
}

async function performOwnerGmailInboxAction(action = "", payload = {}, {
  refreshFolder = "",
  selectedMessageId = "",
  clearSelectedMessage = false,
  infoMessage = ""
} = {}) {
  const response = await requestOwnerGmailInbox("/api/gmail-inbox", {
    action,
    ...payload
  });
  if (!response.ok) {
    sunriseOwnerInboxState.error = String(response.message || "Owner Gmail inbox action failed.").trim();
    if (currentVisibleRoute() === "sunrise-inbox") renderSunriseInboxPage();
    return false;
  }
  sunriseOwnerInboxState.error = "";
  sunriseOwnerInboxState.info = String(infoMessage || "").trim();
  return syncOwnerGmailInbox({
    folder: refreshFolder || ownerInboxActiveFolder(),
    selectedMessageId,
    clearSelectedMessage
  });
}

function ensureOwnerInboxAutoRefresh() {
  if (sunriseOwnerInboxRefreshHandle) return;
  sunriseOwnerInboxRefreshHandle = window.setInterval(() => {
    if (currentVisibleRoute() !== "sunrise-inbox") return;
    if (!shouldUseOwnerGmailInbox() || sunriseOwnerInboxState.loading) return;
    syncOwnerGmailInbox({
      folder: ownerInboxActiveFolder(),
      selectedMessageId: ownerInboxSelectedMessageId(),
      silent: true
    });
  }, 45000);
}

function toLocalDateTimeValue(timestamp = 0) {
  const value = Number(timestamp || 0);
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function localDateTimeToMs(value = "") {
  const raw = String(value || "").trim();
  if (!raw) return 0;
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime();
}

function populateOwnerVacationOverlay() {
  const settings = sunriseOwnerInboxState.vacation || {};
  const enable = document.getElementById("sunrise-vacation-enable");
  const start = document.getElementById("sunrise-vacation-start");
  const end = document.getElementById("sunrise-vacation-end");
  const subject = document.getElementById("sunrise-vacation-subject");
  const body = document.getElementById("sunrise-vacation-body");
  const contacts = document.getElementById("sunrise-vacation-restrict-contacts");
  const domain = document.getElementById("sunrise-vacation-restrict-domain");
  const info = document.getElementById("sunrise-vacation-info");
  if (enable instanceof HTMLInputElement) enable.checked = !!settings.enableAutoReply;
  if (start instanceof HTMLInputElement) start.value = toLocalDateTimeValue(settings.startTime);
  if (end instanceof HTMLInputElement) end.value = toLocalDateTimeValue(settings.endTime);
  if (subject instanceof HTMLInputElement) subject.value = String(settings.responseSubject || "");
  if (body instanceof HTMLTextAreaElement) {
    body.value = String(settings.responseBodyPlainText || "").trim()
      || String(settings.responseBodyHtml || "").replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "");
  }
  if (contacts instanceof HTMLInputElement) contacts.checked = !!settings.restrictToContacts;
  if (domain instanceof HTMLInputElement) domain.checked = !!settings.restrictToDomain;
  if (info) info.textContent = "";
}

function openOwnerVacationOverlay() {
  const overlay = document.getElementById("sunrise-vacation-overlay");
  if (!overlay) return;
  populateOwnerVacationOverlay();
  overlay.hidden = false;
}

function closeOwnerVacationOverlay() {
  const overlay = document.getElementById("sunrise-vacation-overlay");
  if (overlay) overlay.hidden = true;
}

function closeSunriseInboxMessageOverlay() {
  const overlay = document.getElementById("sunrise-inbox-message-overlay");
  const body = document.getElementById("sunrise-inbox-message-body");
  const info = document.getElementById("sunrise-inbox-message-info");
  if (body) body.innerHTML = "";
  if (info) info.textContent = "";
  if (overlay) overlay.hidden = true;
}

function inboxMoveTargets() {
  const standardFolders = ["inbox", "archive", "sent", "drafts", "spam", "trash", "sending"];
  const customFolders = shouldUseOwnerGmailInbox()
    ? (Array.isArray(sunriseOwnerInboxState.customFolders) ? sunriseOwnerInboxState.customFolders : [])
    : (Array.isArray(sunriseControlState?.inbox?.customFolders) ? sunriseControlState.inbox.customFolders : []);
  return [...standardFolders, ...customFolders]
    .map((name) => String(name || "").trim())
    .filter(Boolean)
    .filter((name, index, list) => list.indexOf(name) === index);
}

function buildInboxMoveFolderOptions(selected = "") {
  const selectedKey = String(selected || "").trim();
  return inboxMoveTargets().map((name) => {
    const label = name === "sending"
      ? "Sending"
      : `${String(name).charAt(0).toUpperCase()}${String(name).slice(1)}`;
    const isSelected = name === selectedKey ? " selected" : "";
    return `<option value="${name}"${isSelected}>${label}</option>`;
  }).join("");
}

function buildSunriseInboxMessageWindow(message = {}) {
  const fallbackFolder = shouldUseOwnerGmailInbox()
    ? ownerInboxActiveFolder()
    : String(sunriseControlState?.inbox?.activeFolder || "inbox");
  const systemFolder = String(message.folder || fallbackFolder || "inbox").trim() || "inbox";
  const folderList = [systemFolder, ...(Array.isArray(message.customFolders) ? message.customFolders : [])]
    .map((folder) => String(folder || "").trim())
    .filter(Boolean)
    .filter((folder, index, list) => list.indexOf(folder) === index);
  const badges = [
    String(message.priority || "").trim(),
    String(message.scheduledAt || "").trim() ? `Scheduled ${message.scheduledAt}` : "",
    ...folderList
  ].filter(Boolean).map((item) => `<span class="sunriseInboxMessageBadge">${item}</span>`).join("");
  const metaRows = [
    ["From", message.from || "-"],
    ["To", message.to || "-"],
    ["CC", message.cc || "-"],
    ["BCC", message.bcc || "-"],
    ["Created", message.createdAt || "-"],
    ["Reply-To", message.replyTo || "-"],
    ["Scheduled", message.scheduledAt || "-"]
  ].map(([label, value]) => `<article class="sunriseInboxMessageMetaCard"><span>${label}</span><b>${value}</b></article>`).join("");
  const attachments = Array.isArray(message.attachments) && message.attachments.length
    ? `<div class="sunriseInboxAttachList">Attachments: ${message.attachments.join(", ")}</div>`
    : `<div class="sunriseInboxAttachList">Attachments: none</div>`;
  const moveOptions = buildInboxMoveFolderOptions(systemFolder);
  return `<div class="sunriseInboxMessageShell"><div class="sunriseInboxMessageHead"><div><p class="profileLabel">Inbox Message</p><h3 class="sunriseInboxMessageSubject">${message.subject || "(No subject)"}</h3></div><div class="sunriseInboxMessageBadges">${badges || '<span class="sunriseInboxMessageBadge">Message</span>'}</div></div><div class="sunriseInboxMessageTools"><button class="sunriseMiniBtn" type="button" data-inbox-archive="${message.id}">Archive</button><select class="select" id="inbox-move-target"><option value="">Move to...</option>${moveOptions}</select><button class="sunriseMiniBtn" type="button" data-inbox-move="${message.id}">Move</button><button class="sunriseMiniBtn" type="button" data-inbox-delete="${message.id}">Delete to Trash</button></div><div class="sunriseInboxMessageMeta">${metaRows}</div><div class="sunriseInboxAttachList">${folderList.length ? `Folders: ${folderList.join(", ")}` : "Folders: system"}</div>${attachments}<div class="sunriseInboxMessageBody">${message.bodyHtml || `<p>${String(message.snippet || "No content.")}</p>`}</div></div>`;
}

function openSunriseInboxMessageOverlay(message = {}) {
  const overlay = document.getElementById("sunrise-inbox-message-overlay");
  const title = document.getElementById("sunrise-inbox-message-title");
  const body = document.getElementById("sunrise-inbox-message-body");
  const info = document.getElementById("sunrise-inbox-message-info");
  if (!overlay || !body) return;
  body.innerHTML = buildSunriseInboxMessageWindow(message);
  if (title) title.textContent = String(message.subject || "Email Details").trim() || "Email Details";
  if (info) info.textContent = String(message.createdAt || "").trim();
  overlay.hidden = false;
}

function verificationEmailContextLabel(context = "") {
  return String(context || "").trim().toLowerCase() === "sunrise" ? "Sunrise" : "VVS";
}

function verificationRecipientName(account = null) {
  const prefix = String(account?.prefix || "").trim();
  const firstName = String(account?.firstName || "").trim();
  const lastName = String(account?.lastName || "").trim();
  return [prefix, firstName, lastName].filter(Boolean).join(" ").trim();
}

async function sendVerificationCodeEmail({
  email = "",
  code = "",
  context = "vvs",
  name = ""
} = {}) {
  const result = await postJsonWithTimeout("/api/auth-code-send", {
    email,
    code,
    context,
    name
  });
  if (result.ok && result.body?.ok) {
    return {
      ok: true,
      fallback: false,
      message: String(result.body?.message || "").trim()
    };
  }
  const likelyMissingApi = isLocalPreviewHost() && (result.status === 0 || result.status === 404 || result.status === 405);
  const skipped = likelyMissingApi || !!result.body?.skipped || !!result.body?.email?.skipped;
  return {
    ok: false,
    fallback: true,
    skipped,
    message: String(result.body?.message || result.body?.email?.message || "Confirmation code delivery is unavailable.").trim()
  };
}

function buildVerificationDispatchMessage({
  email = "",
  code = "",
  context = "vvs",
  delivery = {}
} = {}) {
  const label = verificationEmailContextLabel(context);
  const subject = `${label} confirmation code`;
  if (delivery.ok) {
    return `${label} confirmation code sent from concierge@venture-voyagers.com to ${email} (Subject: ${subject}).`;
  }
  const reason = String(delivery.message || "").trim();
  return `${label} confirmation code could not be delivered automatically right now.${reason ? ` ${reason}` : ""} Temporary code: ${code}.`;
}

function shouldBypassOwnerEmailVerification(account = null) {
  return false;
}

function setRecoveryCodeFieldVisibility(step2Form = null, hidden = false) {
  if (!(step2Form instanceof HTMLFormElement)) return;
  const codeInput = step2Form.querySelector('input[inputmode="numeric"]');
  const codeField = codeInput?.closest(".field");
  if (codeField instanceof HTMLElement) codeField.hidden = !!hidden;
  if (codeInput instanceof HTMLInputElement) {
    codeInput.required = !hidden;
    if (hidden) codeInput.value = "";
  }
}

function collectContactRequestData() {
  const selectedMethod = contactForm?.querySelector('input[name="contactMethod"]:checked');
  return {
    selectedMethod: selectedMethod instanceof HTMLInputElement ? selectedMethod : null,
    firstName: String(document.getElementById("first-name")?.value || "").trim(),
    lastName: String(document.getElementById("last-name")?.value || "").trim(),
    title: String(document.getElementById("title")?.value || "").trim(),
    countryIssued: String(document.getElementById("country-issued")?.value || "").trim(),
    phone: String(document.getElementById("phone")?.value || "").trim(),
    email: String(document.getElementById("email")?.value || "").trim(),
    serviceType: String(document.getElementById("service-type")?.value || "").trim(),
    executionTime: String(document.getElementById("execution-time")?.value || "").trim(),
    requestDetails: String(document.getElementById("request-details")?.value || "").trim()
  };
}

function validateContactRequest(data) {
  if (!data.selectedMethod) return "Select your preferred contact method (Email or Phone).";
  const missingLabels = [];
  if (!data.firstName) missingLabels.push("First Name");
  if (!data.lastName) missingLabels.push("Last Name");
  if (!data.title) missingLabels.push("Title");
  if (!data.countryIssued) missingLabels.push("Country of Issued Service");
  if (!data.phone) missingLabels.push("Phone Number");
  if (!data.email) missingLabels.push("Email Address");
  if (!data.serviceType) missingLabels.push("Service Type");
  if (!data.executionTime) missingLabels.push("Desired Execution Time");
  if (!data.requestDetails) missingLabels.push("Request Details");
  if (missingLabels.length) {
    return `Please complete: ${missingLabels.join(", ")}.`;
  }
  if (!/.+@.+\..+/.test(data.email)) return "Enter a valid email address.";
  return "";
}

function showContactSubmissionOverlay(message = "") {
  if (contactSuccessMessage) contactSuccessMessage.textContent = message;
  if (contactOverlay) contactOverlay.hidden = false;
}

function resolveConciergeRecordByName(name = "") {
  const target = String(name || "").trim().toLowerCase();
  if (!target) return null;
  return conciergeCatalog.find((person) => String(person.name || "").trim().toLowerCase() === target) || null;
}

function resolveStoredAssignedConcierge(account) {
  const stored = account?.lastAssignedConcierge;
  if (!stored) return null;
  if (typeof stored === "object") {
    const directName = String(stored.name || "").trim();
    const catalogMatch = resolveConciergeRecordByName(directName);
    if (catalogMatch) return catalogMatch;
    if (!directName) return null;
    return {
      id: String(stored.id || "assigned-concierge").trim(),
      name: directName,
      role: String(stored.role || "Assigned Concierge").trim(),
      email: String(stored.email || "concierge@venture-voyagers.com").trim(),
      localPhone: String(stored.localPhone || "").trim()
    };
  }
  const catalogMatch = resolveConciergeRecordByName(stored);
  if (catalogMatch) return catalogMatch;
  const storedName = String(stored || "").trim();
  if (!storedName) return null;
  return {
    id: "assigned-concierge",
    name: storedName,
    role: "Assigned Concierge",
    email: "concierge@venture-voyagers.com",
    localPhone: ""
  };
}

function syncSubmittedRequestIntoActiveAccount({
  data = {},
  formattedServiceType = "",
  assignedConcierge = "",
  methodText = ""
} = {}) {
  if (!activeAccount || !activeAccount.email) return;
  const accountKey = normalizeEmailAddress(activeAccount.email) || String(activeAccount.email || "").trim().toLowerCase();
  if (!accountKey || !accounts[accountKey]) return;

  const account = accounts[accountKey];
  const assignedRecord = currentAssignedConcierge && String(currentAssignedConcierge.name || "").trim() === assignedConcierge
    ? currentAssignedConcierge
    : resolveConciergeRecordByName(assignedConcierge);

  account.lastAssignedConcierge = assignedRecord || {
    id: "assigned-concierge",
    name: assignedConcierge,
    role: "Assigned Concierge",
    email: "concierge@venture-voyagers.com",
    localPhone: ""
  };
  if (data.title) account.prefix = data.title;
  if (data.firstName) account.firstName = data.firstName;
  if (data.lastName) account.lastName = data.lastName;
  if (data.phone) account.phone = data.phone;
  account.lastContactMethod = String(data.selectedMethod?.value || "").trim();
  account.preferredContactMethod = account.lastContactMethod;
  account.upcomingService = {
    title: formattedServiceType || "Service Request",
    details: String(data.requestDetails || "").trim() || "Your request has been received and is being reviewed.",
    startsAt: String(data.executionTime || "").trim(),
    statusText: "Pending confirmation",
    timeLabel: String(data.executionTime || "").trim() ? "Requested timeframe" : ""
  };
  if (data.countryIssued) {
    account.country = countryDisplayName(data.countryIssued);
    account.countryCode = String(data.countryIssued || "").trim().toUpperCase();
  }
  account.updatedAt = accountTimestampLabel();

  accounts[accountKey] = account;
  activeAccount = account;
  persistAccountsData();
  persistActiveSession(activeAccount);
  renderProfile(activeAccount);
}

async function handleContactSubmit(event) {
  if (event) event.preventDefault();
  if (!contactForm) return false;
  if (contactForm.dataset.nativeSubmit === "1") return true;
  if (contactSubmitInFlight) return false;
  contactSubmitInFlight = true;
  if (contactError) contactError.textContent = "";
  if (contactSubmitBtn instanceof HTMLButtonElement) contactSubmitBtn.disabled = true;

  try {
    const data = collectContactRequestData();
    const validationError = validateContactRequest(data);
    if (validationError) {
      if (contactError) contactError.textContent = validationError;
      return false;
    }

    const methodText = data.selectedMethod.value === "phone" ? "phone number" : "email address";
    const assignedConcierge = pendingPreferredConcierge
      || (currentAssignedConcierge ? currentAssignedConcierge.name : (autoAssignConcierge(activeAccount || { country: "United Arab Emirates" })?.name || "Benedict Hale"));
    const clientTier = activeAccount ? String(activeAccount.membership || "").trim() || "Non-Member" : "Non-Member";
    applyContactFormPublicFallbackState({ assignedConcierge, clientTier });
    const formattedServiceType = data.serviceType
      .replace(/_/g, " ")
      .replace(/\b\w/g, (m) => m.toUpperCase());
    const clientName = `${data.firstName} ${data.lastName}`.trim();
    const successMessage =
      `Dear ${data.title} ${data.lastName}, Concierge ${assignedConcierge} has been assigned to your request. You will be contacted for service details via your ${methodText}, based on your selected preference. Thank you for choosing VVS.`;

    try {
      submitServiceIntoSOC({
        serviceType: formattedServiceType,
        clientName,
        tier: clientTier,
        desiredExecutionTime: data.executionTime,
        details: data.requestDetails,
        assigned: assignedConcierge,
        clientTitle: data.title,
        clientEmail: data.email,
        clientPhone: data.phone,
        clientCountry: data.countryIssued,
        preferredContactMethod: String(data.selectedMethod?.value || "").trim(),
        clientAccountEmail: activeAccount ? normalizeEmailAddress(activeAccount.email) : normalizeEmailAddress(data.email)
      });
      const intakeSubject = `New Service Submission - ${data.serviceType || "General Request"}`;
      const intakeBody = `<p><b>Client:</b> ${data.title} ${data.firstName} ${data.lastName}</p><p><b>Phone:</b> ${data.phone}</p><p><b>Service:</b> ${data.serviceType}</p><p><b>Desired:</b> ${data.executionTime}</p><p><b>Assigned concierge:</b> ${assignedConcierge}</p><p><b>Details:</b> ${data.requestDetails || "N/A"}</p>`;
      routeSunriseInboundCopies({
        from: data.email || "client@unknown",
        to: "team@venture-voyagers.com",
        cc: "management@venture-voyagers.com",
        bcc: "",
        subject: intakeSubject,
        bodyHtml: intakeBody,
        priority: data.executionTime === "Instant" ? "Urgent" : "High",
        attachments: []
      });
    } catch (err) {
      console.error("Contact submit routing error:", err);
    }

    if (activeAccount) {
      syncSubmittedRequestIntoActiveAccount({
        data,
        formattedServiceType,
        assignedConcierge,
        methodText
      });
    }

    showContactSubmissionOverlay(successMessage);
    refreshActiveLanguageIfNeeded();
    contactForm.reset();
    pendingPreferredConcierge = "";
    if (activeAccount) applyContactAccountPrefill();
    else setupContactMethodChoices();
    if (instantWarning) instantWarning.hidden = true;

    submitContactIntegrations(
      buildContactIntegrationPayload(data, assignedConcierge, clientTier)
    ).then((integration) => {
      if (!integration.ok && !integration.skipped && contactError) {
        contactError.textContent = `Request saved locally, but external delivery failed: ${integration.message}`;
      }
    }).catch((error) => {
      if (contactError) contactError.textContent = "Request saved locally, but external delivery failed.";
      console.error("Contact integration error:", error);
    });

    return true;
  } catch (error) {
    console.error("Contact submit enhancement failed, falling back to native form submit:", error);
    applyContactFormPublicFallbackState({
      assignedConcierge: pendingPreferredConcierge || currentAssignedConcierge?.name || "VVS Concierge Desk",
      clientTier: activeAccount ? String(activeAccount.membership || "").trim() || "Non-Member" : "Non-Member"
    });
    if (contactError) contactError.textContent = "Submitting request via secure fallback...";
    submitContactFormNatively();
    return true;
  } finally {
    if (contactForm.dataset.nativeSubmit !== "1") contactForm.dataset.nativeSubmit = "";
    contactSubmitInFlight = false;
    if (contactSubmitBtn instanceof HTMLButtonElement) contactSubmitBtn.disabled = false;
  }
}

applyContactFormPublicFallbackState();

if (contactForm) {
  contactForm.addEventListener("submit", handleContactSubmit);
}

window.submitVvsContactRequest = (event) => {
  handleContactSubmit(event);
  return false;
};

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
const profileAccountSettingsBtn = document.getElementById("profile-account-settings-btn");
const accountSettingsOverlay = document.getElementById("account-settings-overlay");
const accountSettingsClose = document.getElementById("account-settings-close");
const accountSettingsForm = document.getElementById("account-settings-form");
const accountSettingsSummary = document.getElementById("account-settings-summary");
const accountSettingsInfo = document.getElementById("account-settings-info");
const accountSettingsDiscard = document.getElementById("account-settings-discard");
const accountSettingsPasswordInfo = document.getElementById("account-password-info");
const accountSettingsPasswordRecoveryInfo = document.getElementById("account-password-recovery-info");
const accountSettingsPasswordModeBtns = Array.from(document.querySelectorAll("[data-account-password-mode]"));
const accountSettingsPasswordForm = document.getElementById("account-pw-change-form");
const accountSettingsRecoveryStep1 = document.getElementById("account-pw-recovery-step1");
const accountSettingsRecoveryStep2 = document.getElementById("account-pw-recovery-step2");
const ampAccountDetailsOverlay = document.getElementById("amp-account-details-overlay");
const ampAccountDetailsClose = document.getElementById("amp-account-details-close");
const ampAccountDetailsForm = document.getElementById("amp-account-details-form");
const ampAccountDetailsDiscard = document.getElementById("amp-account-details-discard");
const ampAccountDetailsInfo = document.getElementById("amp-account-details-info");
const ampAccountDetailsSummary = document.getElementById("amp-account-details-summary");
const ampCustomerDetailsOverlay = document.getElementById("amp-customer-details-overlay");
const ampCustomerDetailsClose = document.getElementById("amp-customer-details-close");
const ampCustomerDetailsForm = document.getElementById("amp-customer-details-form");
const ampCustomerDetailsDiscard = document.getElementById("amp-customer-details-discard");
const ampCustomerDetailsInfo = document.getElementById("amp-customer-details-info");
const ampCustomerDetailsSummary = document.getElementById("amp-customer-details-summary");
const ampCustomerActivity = document.getElementById("amp-customer-activity");
const membershipUpgradeOverlay = document.getElementById("membership-upgrade-overlay");
const membershipUpgradeClose = document.getElementById("membership-upgrade-close");
const membershipUpgradeFrom = document.getElementById("membership-upgrade-from");
const membershipUpgradeTo = document.getElementById("membership-upgrade-to");
const membershipUpgradeName = document.getElementById("membership-upgrade-name");

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
  account: null,
  bypassEmailCode: false
};

const accountPasswordResetState = {
  email: "",
  code: "",
  account: null,
  bypassEmailCode: false
};

let accountSettingsTargetKey = "";
let ampAccountDetailsTargetKey = "";
let ampCustomerDetailsTargetKey = "";

const sunriseState = {
  unlocked: false,
  email: "",
  code: "",
  account: null,
  sessionId: "",
  operatorCode: "",
  pendingAccount: null
};

const sunriseOwnerInboxState = {
  loading: false,
  ready: false,
  folder: "inbox",
  messages: [],
  selectedMessage: null,
  customFolders: [],
  folderCounts: {},
  aliases: [],
  vacation: null,
  mailbox: "concierge@venture-voyagers.com",
  lastSyncedAt: "",
  info: "",
  error: "",
  nextPageToken: ""
};

const sharedAccountRegistryState = {
  loading: false,
  loaded: false,
  available: false,
  lastSyncedAt: "",
  accounts: {},
  activities: [],
  error: ""
};

let sharedRegistryRefreshPromise = null;
let sharedRegistrySyncTimer = 0;
let sharedRegistryBackfillQueued = false;
const sharedRegistryPendingKeys = new Set();
let ampRegistryHydrationTimer = 0;
let ampRegistryHydrationInFlight = false;
let ampRegistryLastHydratedAt = 0;
let ampRegistryLastHydratedEmail = "";
const AMP_REGISTRY_HYDRATE_INTERVAL_MS = 20000;

let sunriseOwnerInboxRefreshHandle = 0;

const SUNRISE_OWNER_CODES = {
  "aleks.sunrise@vvs.com": "AO1",
  "mikhail.sunrise@vvs.com": "MO1"
};

const MONARCH_ARCHANGEL_OWNER_ACCESS = {
  AO1: {
    code: "A/127186/MA/S/OW",
    password: "AMA4356817",
    notosId: "NTS-A01",
    ownerKey: "aleks.sunrise@vvs.com",
    ownerName: "Aleks Totev"
  },
  MO1: {
    code: "M/171717/MA/S/OW",
    password: "MMACR777",
    notosId: "NTS-M01",
    ownerKey: "mikhail.sunrise@vvs.com",
    ownerName: "Mikhail Kovalev"
  }
};

let monarchArchangelState = loadMonarchArchangelState();
const monarchArchangelRuntime = {
  unlocked: false,
  ownerOperatorCode: "",
  filterCategory: "all",
  filterQuery: "",
  detailsRecordId: "",
  info: "",
  hasUnsavedChanges: false
};
let monarchArchangelPersistTimer = 0;
let monarchArchangelSyncQueued = false;

function monarchDeepClone(value) {
  try {
    return JSON.parse(JSON.stringify(value == null ? null : value));
  } catch (_) {
    return value == null ? null : value;
  }
}

function emptyMonarchArchangelState() {
  return {
    records: {},
    ownerCredentials: {},
    updatedAt: ""
  };
}

function loadMonarchArchangelState() {
  try {
    const raw = localStorage.getItem(MONARCH_ARCHANGEL_DATA_KEY);
    if (!raw) return emptyMonarchArchangelState();
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object"
      ? {
        records: parsed.records && typeof parsed.records === "object" ? parsed.records : {},
        ownerCredentials: parsed.ownerCredentials && typeof parsed.ownerCredentials === "object" ? parsed.ownerCredentials : {},
        updatedAt: String(parsed.updatedAt || "").trim()
      }
      : emptyMonarchArchangelState();
  } catch (_) {
    return emptyMonarchArchangelState();
  }
}

function persistMonarchArchangelState() {
  try {
    localStorage.setItem(MONARCH_ARCHANGEL_DATA_KEY, JSON.stringify(monarchArchangelState || emptyMonarchArchangelState()));
  } catch (_) {}
}

function flushMonarchArchangelSync() {
  if (monarchArchangelPersistTimer) {
    window.clearTimeout(monarchArchangelPersistTimer);
    monarchArchangelPersistTimer = 0;
  }
  monarchArchangelSyncQueued = false;
  syncMonarchArchangelArchive({ immediate: true });
}

function queueMonarchArchangelSync() {
  monarchArchangelSyncQueued = true;
  if (monarchArchangelPersistTimer) return;
  monarchArchangelPersistTimer = window.setTimeout(() => {
    monarchArchangelPersistTimer = 0;
    if (!monarchArchangelSyncQueued) return;
    monarchArchangelSyncQueued = false;
    syncMonarchArchangelArchive({ immediate: true });
  }, 180);
}

function monarchOwnerAccessProfile(operatorCode = "") {
  const code = String(operatorCode || "").trim().toUpperCase();
  const base = MONARCH_ARCHANGEL_OWNER_ACCESS[code] || null;
  if (!base) return null;
  const override = monarchArchangelState?.ownerCredentials?.[code];
  return {
    ...base,
    ...(override && typeof override === "object" ? override : {})
  };
}

function currentMonarchOwnerProfile(account = getCurrentSunriseOperator() || activeAccount || null) {
  if (!isOwnerAccount(account)) return null;
  const operatorCode = String(resolveSunriseOwnerCode(account) || "").trim().toUpperCase();
  const profile = monarchOwnerAccessProfile(operatorCode);
  return profile ? { ...profile, operatorCode } : null;
}

function shouldShowMonarchArchangelForAccount(account = getCurrentSunriseOperator() || activeAccount || null) {
  return !!currentMonarchOwnerProfile(account);
}

function resetMonarchArchangelAccess() {
  monarchArchangelRuntime.unlocked = false;
  monarchArchangelRuntime.ownerOperatorCode = "";
  monarchArchangelRuntime.detailsRecordId = "";
  monarchArchangelRuntime.info = "";
  monarchArchangelRuntime.hasUnsavedChanges = false;
}

function monarchArchiveRecordId(category = "", sourceType = "", sourceKey = "") {
  return `${String(category || "").trim()}::${String(sourceType || "").trim()}::${String(sourceKey || "").trim()}`;
}

function monarchArchiveSummaryFromPayload(sourceType = "", payload = null) {
  const type = String(sourceType || "").trim();
  if (!payload || typeof payload !== "object") return "Archive snapshot.";
  if (type === "account") {
    const kind = payload.sunriseCredential ? "Sunrise credential" : (isOwnerAccount(payload) ? "Owner" : (String(payload.membership || "").trim() || "Client"));
    return [String(payload.email || "").trim().toLowerCase(), String(payload.country || "").trim(), kind].filter(Boolean).join(" • ");
  }
  if (type.startsWith("soc-")) {
    return [
      String(payload.client || payload.clientName || "").trim(),
      String(payload.status || "").trim(),
      String(payload.tier || "").trim()
    ].filter(Boolean).join(" • ");
  }
  if (type === "rta") {
    return [String(payload.clientEmail || "").trim(), String(payload.status || "").trim()].filter(Boolean).join(" • ");
  }
  if (type === "lcs") {
    return [String(payload.employee || "").trim(), String(payload.permission || "").trim(), String(payload.loginAt || "").trim()].filter(Boolean).join(" • ");
  }
  if (type === "mail") {
    return [String(payload.from || "").trim(), String(payload.subject || "").trim(), String(payload.createdAt || "").trim()].filter(Boolean).join(" • ");
  }
  if (type === "activity") {
    return [humanizeRegistryEventType(payload.eventType), String(payload.status || "").trim(), String(payload.occurredAt || "").trim()].filter(Boolean).join(" • ");
  }
  if (type === "access-level") {
    return [String(payload.title || "").trim(), String(payload.access || "").trim()].filter(Boolean).join(" • ");
  }
  if (type === "shortcut-code") {
    return [String(payload.route || "").trim(), String(payload.access || "").trim()].filter(Boolean).join(" • ");
  }
  if (Object.prototype.hasOwnProperty.call(payload, "amount")) {
    return [String(payload.name || "").trim(), money(payload.amount)].filter(Boolean).join(" • ");
  }
  return Object.entries(payload).slice(0, 3).map(([, value]) => String(value || "").trim()).filter(Boolean).join(" • ") || "Archive snapshot.";
}

function createMonarchArchiveRecord({
  category = "operations",
  sourceType = "",
  sourceKey = "",
  title = "",
  payload = null
} = {}) {
  return {
    id: monarchArchiveRecordId(category, sourceType, sourceKey),
    category: String(category || "").trim(),
    sourceType: String(sourceType || "").trim(),
    sourceKey: String(sourceKey || "").trim(),
    title: String(title || sourceKey || sourceType || "Record").trim(),
    summary: monarchArchiveSummaryFromPayload(sourceType, payload),
    payload: monarchDeepClone(payload),
    deletedInSource: false
  };
}

function collectMonarchArchiveMailMessages() {
  const merged = [];
  const seen = new Set();
  const ownerMessages = Array.isArray(sunriseOwnerInboxState?.messages) ? sunriseOwnerInboxState.messages : [];
  const localMessages = Array.isArray(sunriseControlState?.inbox?.messages) ? sunriseControlState.inbox.messages : [];
  [...ownerMessages, ...localMessages].forEach((message) => {
    const id = String(message?.id || "").trim();
    if (!id || seen.has(id)) return;
    seen.add(id);
    merged.push(message);
  });
  return merged;
}

function collectMonarchArchangelLiveRecords() {
  const records = [];
  Object.entries(accounts).forEach(([key, account]) => {
    records.push(createMonarchArchiveRecord({
      category: "credentials",
      sourceType: "account",
      sourceKey: key,
      title: `${String(account?.firstName || "").trim()} ${String(account?.lastName || "").trim()}`.trim() || String(account?.email || key).trim().toLowerCase(),
      payload: account
    }));
  });

  if (sunriseControlState) {
    ["current", "past", "deleted"].forEach((bucket) => {
      const list = Array.isArray(sunriseControlState?.socServices?.[bucket]) ? sunriseControlState.socServices[bucket] : [];
      list.forEach((service) => {
        records.push(createMonarchArchiveRecord({
          category: "services",
          sourceType: `soc-${bucket}`,
          sourceKey: String(service?.id || "").trim().toUpperCase(),
          title: String(service?.title || "Service Record").trim(),
          payload: service
        }));
      });
    });
    (Array.isArray(sunriseControlState.rtaAssignments) ? sunriseControlState.rtaAssignments : []).forEach((row) => {
      records.push(createMonarchArchiveRecord({
        category: "operations",
        sourceType: "rta",
        sourceKey: String(row?.clientKey || "").trim().toLowerCase(),
        title: String(row?.clientName || row?.clientEmail || "RTA Assignment").trim(),
        payload: row
      }));
    });
    (Array.isArray(sunriseControlState.rimInvites) ? sunriseControlState.rimInvites : []).forEach((row) => {
      records.push(createMonarchArchiveRecord({
        category: "operations",
        sourceType: "rim",
        sourceKey: String(row?.id || row?.email || "").trim(),
        title: String(row?.name || row?.email || "Red Invitation").trim(),
        payload: row
      }));
    });
    (Array.isArray(sunriseControlState.ecsEmployees) ? sunriseControlState.ecsEmployees : []).forEach((row) => {
      records.push(createMonarchArchiveRecord({
        category: "operations",
        sourceType: "ecs",
        sourceKey: String(row?.id || row?.email || "").trim(),
        title: String(row?.name || row?.email || "Employee").trim(),
        payload: row
      }));
    });
    (Array.isArray(sunriseControlState.accessLevels) ? sunriseControlState.accessLevels : []).forEach((row) => {
      records.push(createMonarchArchiveRecord({
        category: "operations",
        sourceType: "access-level",
        sourceKey: String(row?.code || "").trim().toUpperCase(),
        title: String(row?.title || row?.code || "Access Level").trim(),
        payload: row
      }));
    });
    (Array.isArray(sunriseControlState.shortcutCodes) ? sunriseControlState.shortcutCodes : []).forEach((row) => {
      records.push(createMonarchArchiveRecord({
        category: "operations",
        sourceType: "shortcut-code",
        sourceKey: String(row?.code || "").trim().toUpperCase(),
        title: String(row?.title || row?.code || "Shortcut Code").trim(),
        payload: row
      }));
    });
    (Array.isArray(sunriseControlState.eamExpenses) ? sunriseControlState.eamExpenses : []).forEach((row) => {
      records.push(createMonarchArchiveRecord({
        category: "payments",
        sourceType: "eam",
        sourceKey: String(row?.id || "").trim(),
        title: String(row?.name || row?.id || "Expense").trim(),
        payload: row
      }));
    });
    (Array.isArray(sunriseControlState.ifsIncome) ? sunriseControlState.ifsIncome : []).forEach((row) => {
      records.push(createMonarchArchiveRecord({
        category: "payments",
        sourceType: "ifs",
        sourceKey: String(row?.id || "").trim(),
        title: String(row?.name || row?.id || "Income").trim(),
        payload: row
      }));
    });
    (Array.isArray(sunriseControlState.smca) ? sunriseControlState.smca : []).forEach((row) => {
      records.push(createMonarchArchiveRecord({
        category: "payments",
        sourceType: "smca",
        sourceKey: String(row?.id || "").trim(),
        title: String(row?.name || row?.id || "Commission").trim(),
        payload: row
      }));
    });
    (Array.isArray(sunriseControlState.lcsSessions) ? sunriseControlState.lcsSessions : []).forEach((row) => {
      records.push(createMonarchArchiveRecord({
        category: "logins",
        sourceType: "lcs",
        sourceKey: String(row?.id || "").trim(),
        title: String(row?.employee || row?.code || "NOTOS Session").trim(),
        payload: row
      }));
    });
  }

  collectMonarchArchiveMailMessages().forEach((row) => {
    records.push(createMonarchArchiveRecord({
      category: "mail",
      sourceType: "mail",
      sourceKey: String(row?.id || "").trim(),
      title: String(row?.subject || "Mailbox Message").trim(),
      payload: row
    }));
  });

  recentSharedRegistryActivities(120).forEach((row) => {
    records.push(createMonarchArchiveRecord({
      category: "changes",
      sourceType: "activity",
      sourceKey: String(row?.id || `${row?.email || ""}:${row?.occurredAt || ""}`).trim(),
      title: humanizeRegistryEventType(row?.eventType || "Activity"),
      payload: row
    }));
  });

  return records.filter((record) => record.sourceKey);
}

function syncMonarchArchangelArchive({ immediate = false } = {}) {
  if (!monarchArchangelState || typeof monarchArchangelState !== "object") {
    monarchArchangelState = emptyMonarchArchangelState();
  }
  const now = formatUtcTimestamp(new Date());
  const existing = monarchArchangelState.records && typeof monarchArchangelState.records === "object"
    ? monarchArchangelState.records
    : {};
  const nextRecords = {};
  const liveRecords = collectMonarchArchangelLiveRecords();
  const liveIds = new Set();

  liveRecords.forEach((liveRecord) => {
    const id = String(liveRecord.id || "").trim();
    if (!id) return;
    liveIds.add(id);
    const previous = existing[id] && typeof existing[id] === "object" ? existing[id] : null;
    const useManualPayload = !!previous?.manualOverride;
    nextRecords[id] = {
      ...previous,
      ...liveRecord,
      payload: useManualPayload ? monarchDeepClone(previous.payload) : monarchDeepClone(liveRecord.payload),
      liveSnapshot: monarchDeepClone(liveRecord.payload),
      summary: liveRecord.summary,
      deletedInSource: false,
      manualOverride: useManualPayload,
      createdAt: String(previous?.createdAt || now).trim(),
      updatedAt: now,
      lastSyncedAt: now
    };
  });

  Object.values(existing).forEach((record) => {
    const id = String(record?.id || "").trim();
    if (!id || liveIds.has(id)) return;
    nextRecords[id] = {
      ...record,
      deletedInSource: true,
      updatedAt: now,
      lastSyncedAt: now
    };
  });

  monarchArchangelState.records = nextRecords;
  monarchArchangelState.updatedAt = now;
  if (immediate) persistMonarchArchangelState();
  else queueMonarchArchangelSync();
}

function monarchArchiveRecordsList() {
  return Object.values(monarchArchangelState?.records || {})
    .filter((record) => record && typeof record === "object")
    .sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")));
}

function findMonarchArchiveRecord(recordId = "") {
  const id = String(recordId || "").trim();
  if (!id) return null;
  return monarchArchangelState?.records?.[id] || null;
}

function normalizeMembershipTier(value) {
  return String(value || "").trim().toLowerCase().replace(/\s+/g, " ");
}

function populateCountrySelect(select, placeholder = "Select country") {
  if (!(select instanceof HTMLSelectElement)) return;
  const current = String(select.value || "").trim();
  select.innerHTML = `<option value="">${placeholder}</option>`;
  getCountryEntriesForSelectors().forEach((entry) => {
    const option = document.createElement("option");
    option.value = entry.iso;
    option.textContent = entry.label;
    select.appendChild(option);
  });
  const resolved = resolveCountryCode(current);
  if (resolved) select.value = resolved;
}

function canEditAmpOwnerAccount(rawKey = "") {
  const key = resolveAccountKey(rawKey);
  const target = key ? accounts[key] : null;
  const operator = getCurrentSunriseOperator();
  if (!target || !isOwnerAccount(target) || !operator) return false;
  if (isMikhailOwnerAccount(operator)) return true;
  if (isAleksSunriseOperator()) return isAleksOwnerAccount(target);
  return false;
}

function canViewAmpOwnerSensitiveFields(rawKey = "") {
  return canEditAmpOwnerAccount(rawKey);
}

function renameBaseAccountKey(rawKey = "", nextEmail = "") {
  const currentKey = resolveAccountKey(rawKey);
  const nextKey = normalizeEmailAddress(nextEmail);
  if (!currentKey || !accounts[currentKey] || !nextKey) return currentKey;
  const currentAccount = accounts[currentKey];
  if (nextKey !== currentKey && accounts[nextKey] && accounts[nextKey] !== currentAccount) return currentKey;

  if (nextKey !== currentKey) {
    accounts[nextKey] = currentAccount;
    delete accounts[currentKey];
  }
  currentAccount.email = nextKey;

  Object.values(accounts).forEach((account) => {
    if (!account?.sunriseCredential) return;
    if (normalizeEmailAddress(account.sunriseLinkedEmail || "") === currentKey) {
      account.sunriseLinkedEmail = nextKey;
    }
  });

  return nextKey;
}

function renameLinkedSunriseCredentialKey(baseKey = "", nextEmail = "") {
  const resolvedBaseKey = resolveAccountKey(baseKey);
  const nextKey = normalizeEmailAddress(nextEmail);
  const baseAccount = resolvedBaseKey ? accounts[resolvedBaseKey] : null;
  if (!resolvedBaseKey || !baseAccount || !nextKey) return findSunriseCredentialEmailForBaseKey(resolvedBaseKey, baseAccount);

  const currentSunriseKey = findSunriseCredentialEmailForBaseKey(resolvedBaseKey, baseAccount);
  const sunriseAccount = currentSunriseKey ? accounts[currentSunriseKey] : null;
  if (!currentSunriseKey || !sunriseAccount) return currentSunriseKey;
  if (nextKey !== currentSunriseKey && accounts[nextKey] && accounts[nextKey] !== sunriseAccount) return currentSunriseKey;

  if (nextKey !== currentSunriseKey) {
    accounts[nextKey] = sunriseAccount;
    delete accounts[currentSunriseKey];
  }
  sunriseAccount.email = nextKey;
  sunriseAccount.sunriseCredential = true;
  sunriseAccount.sunriseLinkedEmail = resolvedBaseKey;
  return nextKey;
}

function syncCredentialFieldAcrossLinkedAccounts(rawKey = "", fieldName = "", value = "") {
  const sourceKey = resolveAccountKey(rawKey);
  const keys = relatedAccountKeysForDelete(rawKey);
  keys.forEach((key) => {
    const account = accounts[key];
    if (!account) return;
    if (fieldName === "password" && sourceKey && isProtectedOwnerCredentialKey(sourceKey) && key !== sourceKey) {
      return;
    }
    account[fieldName] = value;
    if (fieldName === "password") {
      account.altPasswords = [];
    }
  });
}

function syncChangedAccountState(updatedKey = "") {
  ensureSunriseCredentials();
  restoreProtectedOwnerCredentials();
  pruneDuplicateSunriseCredentials();
  const refreshedKey = resolveAccountKey(updatedKey);
  if (refreshedKey && accounts[refreshedKey] && isCustomerAccount(accounts[refreshedKey])) {
    accounts[refreshedKey].updatedAt = accountTimestampLabel();
    normalizeAccountServiceCards(accounts[refreshedKey]);
  }
  Object.values(accounts).forEach((account) => normalizeAccountServiceCards(account));
  persistAccountsData();

  if (activeAccount) {
    const refreshed = findAccountByEmail(activeAccount.email)
      || accounts[resolveAccountKey(updatedKey)]
      || activeAccount;
    activeAccount = refreshed;
    persistActiveSession(activeAccount);
    renderProfile(activeAccount);
  }

  if (sunriseState.unlocked && sunriseState.account) {
    const refreshedSunrise = findAccountByEmail(sunriseState.account.email)
      || sunriseState.account;
    sunriseState.account = refreshedSunrise;
    sunriseState.email = normalizeEmailAddress(refreshedSunrise.email || sunriseState.email);
    persistSunriseSession(sunriseState.account);
  }

  updateAuthCta();
  scheduleSunriseAdminRenders();
  if (refreshedKey && accounts[refreshedKey] && !accounts[refreshedKey].sunriseCredential) {
    queueSharedRegistryAccountSync(refreshedKey);
  }
}

function resolveAccountSettingsTarget(account = null) {
  const candidate = account || getCurrentSunriseOperator() || activeAccount || null;
  if (!candidate) return null;
  if (!candidate.sunriseCredential) return candidate;
  const linkedKey = resolveAccountKey(candidate.sunriseLinkedEmail || "");
  return accounts[linkedKey] || activeAccount || candidate;
}

function applyStoredPasswordUpdate(account, newPassword = "") {
  if (!account) return false;
  const key = resolveAccountKey(account.email || "");
  if (!key || !accounts[key]) return false;
  syncCredentialFieldAcrossLinkedAccounts(key, "password", newPassword);
  syncChangedAccountState(key);
  return true;
}

function applyStoredSecretPhraseUpdate(account, nextPhrase = "") {
  if (!account) return false;
  const key = resolveAccountKey(account.email || "");
  if (!key || !accounts[key]) return false;
  syncCredentialFieldAcrossLinkedAccounts(key, "secretPhrase", nextPhrase);
  syncChangedAccountState(key);
  return true;
}

function submitPasswordChangeFlow({
  email = "",
  currentPassword = "",
  newPassword = "",
  confirmPassword = "",
  infoEl = null,
  onSuccess = null
} = {}) {
  const account = findAccountByEmail(email);
  if (!account) {
    if (infoEl) infoEl.textContent = "Account not found for this email address.";
    return false;
  }

  const allPasswords = [String(account.password), ...((account.altPasswords || []).map((item) => String(item)))];
  const oldOk = allPasswords.some((stored) => currentPassword === stored || currentPassword.toLowerCase() === stored.toLowerCase());
  if (!oldOk) {
    if (infoEl) infoEl.textContent = "Current password is incorrect.";
    return false;
  }
  if (newPassword !== confirmPassword) {
    if (infoEl) infoEl.textContent = "New password and confirmation do not match.";
    return false;
  }
  if (!isValidSignupPassword(newPassword)) {
    if (infoEl) infoEl.textContent = "New password must be at least 12 characters with 2 capital letters, 2 numbers, and 2 special symbols.";
    return false;
  }

  if (!applyStoredPasswordUpdate(account, newPassword)) {
    if (infoEl) infoEl.textContent = "Unable to update this password right now.";
    return false;
  }

  if (infoEl) infoEl.textContent = "Password updated successfully.";
  if (typeof onSuccess === "function") onSuccess(account);
  return true;
}

async function startPasswordRecoveryFlow({
  email = "",
  phrase = "",
  selectedTier = "",
  infoEl = null,
  step1Form = null,
  step2Form = null,
  state = passwordResetState
} = {}) {
  const account = findAccountByEmail(email);
  if (!account) {
    if (infoEl) infoEl.textContent = "Account not found for this email address.";
    return false;
  }
  const phraseOk = phrase === String(account.secretPhrase || "").toLowerCase();
  if (!phraseOk) {
    if (infoEl) infoEl.textContent = "Secret phrase is incorrect.";
    return false;
  }
  const accountTier = normalizeMembershipTier(account.membership || "");
  if (!selectedTier || selectedTier !== accountTier) {
    if (infoEl) infoEl.textContent = "Selected membership tier does not match this account.";
    return false;
  }

  state.email = String(account.email || email).trim().toLowerCase();
  state.account = account;
  state.bypassEmailCode = shouldBypassOwnerEmailVerification(account);
  state.code = state.bypassEmailCode ? "" : issueTestEmailCode(state.email);
  let delivery = {
    ok: false,
    fallback: false,
    skipped: false,
    message: ""
  };
  if (!state.bypassEmailCode) {
    delivery = await sendVerificationCodeEmail({
      email: state.email,
      code: state.code,
      context: "vvs",
      name: verificationRecipientName(account)
    });
  }
  if (step1Form) step1Form.hidden = true;
  if (step2Form) {
    step2Form.hidden = false;
    step2Form.reset();
    setRecoveryCodeFieldVisibility(step2Form, state.bypassEmailCode);
  }
  if (infoEl) {
    infoEl.textContent = state.bypassEmailCode
      ? "Owner recovery confirmed. Set a new password to continue."
      : buildVerificationDispatchMessage({
          email: state.email,
          code: state.code,
          context: "vvs",
          delivery
        });
  }
  return true;
}

function completePasswordRecoveryFlow({
  code = "",
  newPassword = "",
  confirmPassword = "",
  infoEl = null,
  step1Form = null,
  step2Form = null,
  state = passwordResetState,
  onSuccess = null
} = {}) {
  const account = state.account || findAccountByEmail(state.email);
  if (!account) {
    if (infoEl) infoEl.textContent = "Password recovery session expired. Start again.";
    return false;
  }
  if (!state.bypassEmailCode && code !== state.code) {
    if (infoEl) infoEl.textContent = "Verification code is incorrect.";
    return false;
  }
  if (newPassword !== confirmPassword) {
    if (infoEl) infoEl.textContent = "New password and confirmation do not match.";
    return false;
  }
  if (!isValidSignupPassword(newPassword)) {
    if (infoEl) infoEl.textContent = "New password must be at least 12 characters with 2 capital letters, 2 numbers, and 2 special symbols.";
    return false;
  }

  if (!applyStoredPasswordUpdate(account, newPassword)) {
    if (infoEl) infoEl.textContent = "Unable to update this password right now.";
    return false;
  }

  if (step2Form) {
    step2Form.reset();
    step2Form.hidden = true;
    setRecoveryCodeFieldVisibility(step2Form, false);
  }
  if (step1Form) {
    step1Form.hidden = false;
    step1Form.reset();
  }
  state.email = "";
  state.code = "";
  state.account = null;
  state.bypassEmailCode = false;
  if (infoEl) infoEl.textContent = "Password updated successfully through email + secret phrase.";
  if (typeof onSuccess === "function") onSuccess(account);
  return true;
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
    if (loginStep2) loginStep2.hidden = false;
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
    passwordResetState.bypassEmailCode = false;
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
    passwordResetState.bypassEmailCode = false;
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
  if (pwRecoveryStep2) {
    pwRecoveryStep2.reset();
    setRecoveryCodeFieldVisibility(pwRecoveryStep2, false);
  }
  if (passwordInfo) passwordInfo.textContent = "";
  if (passwordRecoveryInfo) passwordRecoveryInfo.textContent = "";
  passwordResetState.email = "";
  passwordResetState.code = "";
  passwordResetState.account = null;
  passwordResetState.bypassEmailCode = false;
}

function updateSunriseAccessView() {
  const authCard = document.getElementById("sunrise-auth-card");
  const panel = document.getElementById("sunrise-panel");
  if (!authCard || !panel) return;
  authCard.hidden = sunriseState.unlocked;
  panel.hidden = !sunriseState.unlocked;
  updateSunriseShortcutDock();
  updateSunriseSessionBar();
}

function updateSunriseSessionBar() {
  const bar = document.getElementById("sunrise-session-bar");
  const text = document.getElementById("sunrise-session-live");
  if (!bar || !text) return;
  const route = currentVisibleRoute();
  const bodyRoute = String(document.body.getAttribute("data-route") || "").trim();
  const hashRoute = String(window.location.hash || "").replace("#", "").split("?")[0].trim();
  const inMonarch = route === "sunrise-monarch" || bodyRoute === "sunrise-monarch" || hashRoute === "sunrise-monarch";
  const visible = sunriseState.unlocked
    && !inMonarch
    && (route === "sunrise" || sunriseModuleRoutes.includes(route))
    && (bodyRoute === "sunrise" || sunriseModuleRoutes.includes(bodyRoute))
    && (hashRoute === "sunrise" || sunriseModuleRoutes.includes(hashRoute));
  bar.hidden = !visible;
  bar.classList.toggle("isVisible", visible);
  bar.style.display = visible ? "flex" : "none";
  if (!visible) return;
  const meta = getLcsSessionMetaById(sunriseState.sessionId);
  if (!meta) {
    text.textContent = "00hr:00min:00sec";
    return;
  }
  updateNotosSessionDuration(meta.row);
  text.textContent = meta.row.session || "00hr:00min:00sec";
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
  sunriseState.pendingAccount = null;
  if (shouldClearStoredSession) clearSunriseSession();
  const step1 = document.getElementById("sunrise-step1");
  const step2 = document.getElementById("sunrise-step2");
  const info = document.getElementById("sunrise-info");
  if (step1) {
    step1.hidden = false;
    step1.reset();
  }
  if (step2) {
    step2.hidden = false;
    step2.reset();
  }
  if (info) info.textContent = "";
  if (sunriseOwnerAlertOverlay) sunriseOwnerAlertOverlay.hidden = true;
  if (sunriseUnsavedOverlay) sunriseUnsavedOverlay.hidden = true;
  sunriseUnsavedModalPendingAction = null;
  if (sunriseNotosOverlay) sunriseNotosOverlay.hidden = true;
  if (sunriseNotosInput) sunriseNotosInput.value = "";
  if (sunriseNotosInfo) sunriseNotosInfo.textContent = "";
  updateSunriseAccessView();
}

function secureRandomInt(max = 10) {
  const limit = Number(max || 0);
  if (!Number.isFinite(limit) || limit <= 0) return 0;
  if (window.crypto?.getRandomValues) {
    const bytes = new Uint32Array(1);
    window.crypto.getRandomValues(bytes);
    return bytes[0] % limit;
  }
  return Math.floor(Math.random() * limit);
}

function generateCodeDigits() {
  const digits = [];
  while (digits.length < 6) {
    const digit = String(secureRandomInt(10));
    if (digits.includes(digit)) continue;
    digits.push(digit);
  }
  return digits;
}

function codeLooksSimple(code = "") {
  const digits = String(code || "").split("").map((digit) => Number(digit));
  if (digits.length !== 6 || digits.some((digit) => Number.isNaN(digit))) return true;
  const ascending = digits.slice(1).every((digit, index) => digit - digits[index] === 1);
  const descending = digits.slice(1).every((digit, index) => digit - digits[index] === -1);
  const paired = digits[0] === digits[1] && digits[2] === digits[3] && digits[4] === digits[5];
  const mirrored = `${digits[0]}${digits[1]}${digits[2]}` === `${digits[5]}${digits[4]}${digits[3]}`;
  return ascending || descending || paired || mirrored;
}

function generateCode() {
  let code = "";
  do {
    const digits = generateCodeDigits();
    const offset = secureRandomInt(digits.length);
    code = digits.slice(offset).concat(digits.slice(0, offset)).join("");
  } while (codeLooksSimple(code));
  return code;
}

function issueTestEmailCode(email) {
  const normalized = (email || "").trim().toLowerCase();
  if (!normalized) return "";
  const code = generateCode();
  authState.testCodesByEmail[normalized] = code;
  return code;
}

function isSunriseCredentialAccount(account) {
  if (!account) return false;
  const key = String(account.email || "").trim().toLowerCase();
  return !!account.sunriseCredential || key.endsWith(".sunrise@vvs.com");
}

function isVvsCredentialAccount(account) {
  if (!account) return false;
  return !isSunriseCredentialAccount(account);
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
  if (key === "russia") return "Здравствуйте";
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
  const access = (activeAccount?.sunriseAccessLevel || "").toUpperCase();
  if (value.includes("owner")) return "tier-theme-owner";
  if (value.includes("staff")) {
    if (access === "STA" || access === "SA") return "tier-theme-sta";
    if (access === "SS") return "tier-theme-ss";
    if (access === "SM") return "tier-theme-sm";
    if (access === "DA") return "tier-theme-da";
    if (access === "CA") return "tier-theme-ca";
  }
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
  const parts = [
    String(person?.name || "").trim(),
    String(person?.email || "").trim()
  ].filter(Boolean);
  const phone = String(person?.localPhone || "").trim();
  if (phone) parts.push(localizePhone(phone, country));
  return parts.join(" | ");
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
  const contactCta = document.getElementById("contact-cta");
  if (!authCta) return;
  if (isWebsiteShutdownActive()) {
    authCta.textContent = "Account";
    authCta.setAttribute("href", "#account");
    authCta.setAttribute("data-route", "account");
    if (contactCta) contactCta.hidden = false;
    updateAmbassadorAccess();
    updateVoyagerControlAccess();
    return;
  }
  if (activeAccount) {
    authCta.textContent = "Account";
    authCta.setAttribute("href", "#profile");
    authCta.setAttribute("data-route", "profile");
    if (contactCta) contactCta.hidden = true;
  } else {
    authCta.textContent = "Log In / Sign Up";
    authCta.setAttribute("href", "#account");
    authCta.setAttribute("data-route", "account");
    if (contactCta) contactCta.hidden = false;
  }
  updateAmbassadorAccess();
  updateVoyagerControlAccess();
  updateContactRouteVisibility();
}

function updateContactRouteVisibility() {
  const links = Array.from(document.querySelectorAll('[data-route="contact"]'));
  const membership = String(activeAccount?.membership || "").trim().toLowerCase();
  const isStaffOrOwner = membership === "staff" || membership === "owner" || !!activeAccount?.sunriseCredential;
  links.forEach((link) => {
    if (!(link instanceof HTMLElement)) return;
    const keep = link.id === "profile-submit-service-btn" || link.id === "profile-submit-service-top";
    if (!activeAccount) {
      link.hidden = false;
      return;
    }
    if (!keep) {
      link.hidden = true;
      return;
    }
    link.hidden = isStaffOrOwner;
  });
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

function buildUniqueNotosSessionRecordId(baseNotosId) {
  const d = new Date();
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mi = String(d.getUTCMinutes()).padStart(2, "0");
  const ss = String(d.getUTCSeconds()).padStart(2, "0");
  let candidate = `${baseNotosId}-${yyyy}${mm}${dd}${hh}${mi}${ss}`;
  if (!sunriseControlState || !Array.isArray(sunriseControlState.lcsSessions)) return candidate;
  const used = new Set(sunriseControlState.lcsSessions.map((row) => String(row?.id || "")));
  if (!used.has(candidate)) return candidate;
  let attempt = 1;
  while (used.has(`${candidate}-${attempt}`)) attempt += 1;
  return `${candidate}-${attempt}`;
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
  saveSunriseControlState({ markDirty: false });
  if (currentVisibleRoute() === "sunrise-lcs") renderLCSPage();
}

function startNotosSession(account) {
  if (!sunriseControlState || !account) return;
  const now = new Date();
  const operatorCode = resolveSunriseOwnerCode(account);
  const owner = isOwnerAccount(account);
  const notosId = owner && operatorCode === "AO1"
    ? "NTS-A01"
    : (owner && operatorCode === "MO1" ? "NTS-M01" : String(account.notosId || generateGenericNotosSessionId()).toUpperCase());
  const sessionId = buildUniqueNotosSessionRecordId(notosId);
  sunriseState.sessionId = sessionId;
  sunriseState.operatorCode = operatorCode;
  const loginStamp = formatUtcTimestamp(now);
  const row = {
    id: sessionId,
    code: owner ? operatorCode : String(account.sunriseAccessLevel || "SA").toUpperCase(),
    employee: owner ? "Notos EA (Executive Admin)" : `${account.firstName || ""} ${account.lastName || ""}`.trim(),
    loginAt: loginStamp,
    logoutAt: "Active",
    loginTs: now.getTime(),
    logoutTs: 0,
    session: "00hr:00min:00sec",
    path: "",
    pathTimeline: [],
    permission: owner ? "Owner" : String(account.sunriseAccessLevel || "SA").toUpperCase(),
    notosId
  };
  const list = Array.isArray(sunriseControlState.lcsSessions) ? sunriseControlState.lcsSessions : [];
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
  saveSunriseControlState({ immediate: true, markDirty: false });
}

function persistSunriseSession(account) {
  if (!account || !hasSunriseAccess(account)) {
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
  if (!account || !hasSunriseAccess(account)) {
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
          accounts[savedEmail] = normalizeAccountServiceCards(snapshot);
          persistAccountsData();
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

function finalizeSunriseUnlock(account) {
  const targetAccount = account || sunriseState.account || null;
  if (!targetAccount) return;
  if (isAleksRestrictedFromMikhailSunrise(targetAccount)) {
    if (sunriseInfo) sunriseInfo.textContent = "Access restricted: Aleks Sunrise profile cannot open Mikhail Sunrise credentials.";
    sunriseState.pendingAccount = null;
    return;
  }
  const operatorAccount = isOwnerAccount(activeAccount) ? activeAccount : targetAccount;
  sunriseState.unlocked = true;
  sunriseState.account = targetAccount;
  sunriseState.email = String(targetAccount.email || "").trim().toLowerCase();
  sunriseState.pendingAccount = null;
  startNotosSession(operatorAccount);
  persistSunriseSession(operatorAccount);
  if (sunriseInfo) sunriseInfo.textContent = "Sunrise access granted.";
  if (sunriseNotosOverlay) sunriseNotosOverlay.hidden = true;
  if (sunriseNotosInput) sunriseNotosInput.value = "";
  if (sunriseNotosInfo) sunriseNotosInfo.textContent = "";
  updateSunriseAccessView();
  renderSunrise(activeAccount || targetAccount);
  queueSharedRegistryAccountSync(String(operatorAccount?.email || targetAccount?.email || "").trim().toLowerCase());
  logSharedRegistryActivity({
    email: String(operatorAccount?.email || targetAccount?.email || "").trim().toLowerCase(),
    eventType: "sunrise_login",
    system: "sunrise",
    route: currentVisibleRoute(),
    status: "Access Granted",
    account: operatorAccount || targetAccount
  });
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

function isAleksOwnerAccount(account) {
  if (!isOwnerAccount(account)) return false;
  return resolveSunriseOwnerCode(account) === "AO1"
    || String(account?.firstName || "").trim().toLowerCase() === "aleks";
}

function isMikhailOwnerAccount(account) {
  if (!isOwnerAccount(account)) return false;
  return resolveSunriseOwnerCode(account) === "MO1"
    || String(account?.firstName || "").trim().toLowerCase() === "mikhail";
}

function isAleksSunriseOperator() {
  const operator = getCurrentSunriseOperator();
  if (!operator || !isOwnerAccount(operator)) return false;
  const sessionCode = String(sunriseState?.operatorCode || "").trim().toUpperCase();
  if (sessionCode) return sessionCode === "AO1";
  return isAleksOwnerAccount(operator);
}

function isMikhailCredentialAccount(accountOrKey) {
  const key = typeof accountOrKey === "string" ? resolveAccountKey(accountOrKey) : "";
  const account = typeof accountOrKey === "string" ? accounts[key] : accountOrKey;
  if (!account) return false;
  if (isMikhailOwnerAccount(account)) return true;
  const protectedEmails = new Set([
    "mikhail.kovalev@vvs.com",
    "mikhail.sunrise@vvs.com",
    "coo@vvs.com"
  ]);
  const email = String(account.email || key || "").trim().toLowerCase();
  const linked = String(account.sunriseLinkedEmail || "").trim().toLowerCase();
  const keyLower = String(key || "").trim().toLowerCase();
  const first = String(account.firstName || "").trim().toLowerCase();
  const last = String(account.lastName || "").trim().toLowerCase();

  if (protectedEmails.has(email) || protectedEmails.has(linked) || protectedEmails.has(keyLower)) return true;
  if (email.includes("mikhail") || linked.includes("mikhail") || keyLower.includes("mikhail")) return true;
  if (first === "mikhail" || last === "kovalev" || `${first} ${last}`.trim() === "mikhail kovalev") return true;
  if (linked && accounts[linked] && isMikhailOwnerAccount(accounts[linked])) return true;
  return false;
}

function isAleksAmpRestrictedKey(rawKey = "") {
  if (!isAleksSunriseOperator()) return false;
  const key = resolveAccountKey(rawKey);
  if (!key || !accounts[key]) return false;
  return isMikhailCredentialAccount(accounts[key]);
}

function isAleksRestrictedFromMikhailSunrise(targetAccount) {
  const operator = getCurrentSunriseOperator();
  if (!isAleksOwnerAccount(operator)) return false;
  return isMikhailCredentialAccount(targetAccount);
}

function isAleksAlpRestrictedAccessRow(row = null) {
  if (!isAleksSunriseOperator() || !row || typeof row !== "object") return false;
  const code = String(row.code || "").trim().toUpperCase();
  const title = String(row.title || "").trim().toLowerCase();
  const access = String(row.access || "").trim().toLowerCase();
  if (code === "MO1") return true;
  if (title.includes("mikhail") || access.includes("mikhail")) return true;
  return false;
}

function isAleksAmpRestrictedDeletedRow(row = null) {
  if (!isAleksSunriseOperator() || !row || typeof row !== "object") return false;
  const rowAccount = row.account && typeof row.account === "object" ? row.account : null;
  if (rowAccount && isMikhailCredentialAccount(rowAccount)) return true;
  const rowKey = resolveAccountKey(row.email || row.key || (rowAccount ? rowAccount.email : ""));
  if (rowKey && isMikhailCredentialAccount(rowKey)) return true;
  return false;
}

function hasSunriseAccess(account) {
  if (!account) return false;
  return isOwnerAccount(account) || !!String(account.sunriseAccessLevel || "").trim();
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
  if (!hasSunriseAccess(account)) return;
  ensureSunriseInboxTopButtons();
  const greetingEl = document.getElementById("sunrise-greeting");
  const subtitleEl = document.getElementById("sunrise-subtitle");
  const panel = document.getElementById("sunrise-panel");
  const monarchBtn = document.getElementById("sunrise-monarch-btn");
  const meta = sunriseAccessMeta(account);
  const controlAccount = sunriseState.account;
  const isOwnerControllingOther = !!(
    isOwnerAccount(account)
    && controlAccount
    && !isSameOwnerIdentity(account, controlAccount)
  );
  if (greetingEl) {
    if (isOwnerControllingOther) {
      const controlledName = `${controlAccount.prefix || "Mr."} ${controlAccount.firstName || ""} ${controlAccount.lastName || ""}`.replace(/\s+/g, " ").trim();
      const controlledRole = String(controlAccount.roleTitle || "Sunrise Operator").trim();
      greetingEl.textContent = `${dayPartGreetingForAccount(account)}, ${account.prefix} ${account.lastName} - Session Overview: ${controlledName}, ${controlledRole}`;
    } else {
      const accessLevel = isOwnerAccount(account) ? meta.title : meta.code;
      greetingEl.textContent = `${dayPartGreetingForAccount(account)}, ${account.prefix} ${account.lastName} - Welcome to Sunrise, Access Level - ${accessLevel}`;
    }
  }
  if (subtitleEl) {
    if (isOwnerControllingOther) {
      subtitleEl.textContent = `Executive session mirror for ${controlAccount.firstName || ""} ${controlAccount.lastName || ""} (${controlAccount.roleTitle || "Sunrise Operator"}).`;
    } else if (isOwnerAccount(account)) {
      subtitleEl.textContent = `${meta.title} command modules for strategic control of VVS operations.`;
    } else {
      const role = String(account.roleTitle || meta.title || "Sunrise Associate").trim();
      const accessSummary = String(meta.access || "Operational dashboard access.").trim();
      subtitleEl.textContent = `${role} modules active. Access profile (${meta.code}): ${accessSummary}.`;
    }
  }
  if (panel) {
    const summary = panel.querySelector("#sunrise-ops-summary");
    const cards = Array.from(panel.querySelectorAll(".sunriseCategoryCard"));
    const launchButtons = Array.from(panel.querySelectorAll("[data-shortcut][data-route]"));
    const ownerView = isOwnerAccount(account);
    if (summary) summary.hidden = !ownerView;

    launchButtons.forEach((btn) => {
      const route = String(btn.getAttribute("data-route") || "").trim();
      const isExecutiveOnly = route === "sunrise-performance";
      const allowed = ownerView
        ? true
        : (!isExecutiveOnly && canAccessSunriseRoute(account, route));
      btn.hidden = !allowed;
    });

    cards.forEach((card) => {
      const anyVisible = Array.from(card.querySelectorAll("[data-shortcut][data-route]"))
        .some((btn) => !btn.hidden);
      card.hidden = !anyVisible;
    });
  }
  if (monarchBtn) monarchBtn.hidden = !shouldShowMonarchArchangelForAccount(account);
  updateSunriseAccessView();
}

const sunriseStaffRouteLabels = {
  "sunrise-inbox": "Inbox",
  "sunrise-services": "Services Dashboard",
  "sunrise-performance": "Performance Overview",
  "sunrise-sales": "Sales Performance",
  "sunrise-marketing": "Marketing",
  "sunrise-locations": "Locations",
  "sunrise-maintenance": "Maintenance",
  "sunrise-employees": "Employees Dashboard",
  "sunrise-legality": "Legality Follow Ups",
  "sunrise-expenses": "Expenses Management",
  "sunrise-income": "Income Management",
  "sunrise-surveys": "Customer Surveys",
  "sunrise-events": "Events Planning",
  "sunrise-dts": "Documents To Submit",
  "sunrise-eam": "Expenses Adjusting Menu",
  "sunrise-ifs": "Income Flow Spreader",
  "sunrise-ecs": "Employees Control System",
  "sunrise-smca": "Sales & Marketing Commissions",
  "sunrise-rta": "Red Team Assigning Menu",
  "sunrise-rim": "Red Inviting Menu",
  "sunrise-soc": "Services & Operations Control",
  "sunrise-soc-details": "Service Detail Control",
  "sunrise-lcs": "Notos Login Control System",
  "sunrise-amp": "Account Management Page",
  "sunrise-alp": "Access Levels Page",
  "sunrise-mcc": "Manage & Create Codes",
  "sunrise-monarch": "MONARCH ARCHANGEL"
};

function sunriseStaffRouteLabel(route = "") {
  const key = String(route || "").trim().toLowerCase();
  if (sunriseStaffRouteLabels[key]) return sunriseStaffRouteLabels[key];
  if (!key) return "Sunrise Module";
  return key
    .replace(/^sunrise-/, "")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function staffDutyByAccess(accessCode = "", roleTitle = "") {
  const code = String(accessCode || "").trim().toUpperCase();
  const role = String(roleTitle || "").trim();
  const byLevel = {
    STA: "Track assigned workflows, keep queue hygiene, and escalate blockers immediately.",
    SA: "Maintain active operations routing, response timing, and daily service throughput.",
    SS: "Supervise service quality, verify escalations, and close execution gaps before SLA breach.",
    SM: "Coordinate cross-functional execution with finance, operations, and staffing controls.",
    DA: "Oversee directorate-level strategic delivery, high-risk escalations, and governance alignment.",
    CA: "Execute chairman-level command control across critical service and operational nodes."
  };
  return role
    ? `${role}: ${byLevel[code] || "Maintain command discipline, service quality, and incident visibility."}`
    : (byLevel[code] || "Maintain command discipline, service quality, and incident visibility.");
}

function buildStaffProfileDashboard(account) {
  const accessMeta = sunriseAccessMeta(account);
  const allowedRoutes = Array.from(allowedSunriseRoutesForAccount(account))
    .filter((route) => route !== "sunrise")
    .sort();
  const mailbox = normalizeEmailAddress(resolveSunriseMailboxForAccount(account));
  const inboxMessages = Array.isArray(sunriseControlState?.inbox?.messages)
    ? sunriseControlState.inbox.messages.filter((msg) => normalizeEmailAddress(msg.mailbox || "") === mailbox)
    : [];
  const inboxQueue = inboxMessages.filter((msg) => String(msg.folder || "inbox") === "inbox").length;
  const socCurrent = Array.isArray(sunriseControlState?.socServices?.current) ? sunriseControlState.socServices.current : [];
  const awaiting = socCurrent.filter((row) => {
    const status = String(row?.status || "").trim().toLowerCase();
    return status === "assigned" || status.includes("awaiting");
  }).length;
  const activeNotos = Array.isArray(sunriseControlState?.lcsSessions)
    ? sunriseControlState.lcsSessions.filter((row) => {
      const permission = String(row?.permission || "").trim().toUpperCase();
      const level = String(account.sunriseAccessLevel || "").trim().toUpperCase();
      return permission === level && String(row?.logoutAt || "").trim().toLowerCase() === "active";
    }).length
    : 0;
  return {
    accessMeta,
    metrics: [
      { label: "Position", value: String(account.roleTitle || accessMeta.title || "Staff") },
      { label: "Access Level", value: `${accessMeta.code} • ${accessMeta.title}` },
      { label: "Sunrise Modules", value: String(allowedRoutes.length) },
      { label: "Inbox Queue", value: String(inboxQueue) },
      { label: "Awaiting Confirmations", value: String(awaiting) },
      { label: "NOTOS ID", value: String(account.notosId || "N/A").toUpperCase() },
      { label: "Active Sessions", value: String(activeNotos) },
      { label: "Primary Mailbox", value: mailbox || "N/A" }
    ],
    modules: allowedRoutes.map((route) => sunriseStaffRouteLabel(route)),
    focus: staffDutyByAccess(accessMeta.code, account.roleTitle),
    scope: String(accessMeta.access || "Operational dashboards")
  };
}

function renderProfile(account) {
  if (!account) return;
  const displayCountry = countryDisplayName(account.country);
  const greeting = greetingPrefixByCountry(account.country);
  const membershipValue = String(account.membership || "").trim();
  const membershipLower = membershipValue.toLowerCase();
  const isRed = membershipLower === "voyager red";
  const isOwner = membershipLower === "owner";
  const isEmployee = membershipLower === "staff" || (!!account.sunriseCredential && !isOwner);
  const greetEl = document.getElementById("profile-greeting");
  const summaryEl = document.getElementById("profile-summary");
  const tierEl = document.getElementById("profile-tier");
  const completedEl = document.getElementById("profile-services-completed");
  const profileStatusNoteLabel = document.getElementById("profile-status-note-label");
  const pastTitleEl = document.getElementById("profile-past-title");
  const pastDetailsEl = document.getElementById("profile-past-details");
  const upcomingTitleEl = document.getElementById("profile-upcoming-title");
  const upcomingDetailsEl = document.getElementById("profile-upcoming-details");
  const redTeamWrap = document.getElementById("profile-red-team");
  const redTeamStatusEl = document.getElementById("profile-red-team-status");
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
  const profileServiceToolbar = document.getElementById("profile-service-toolbar");
  const staffDashboard = document.getElementById("profile-staff-dashboard");
  const staffMetrics = document.getElementById("profile-staff-metrics");
  const staffModules = document.getElementById("profile-staff-modules");
  const conciergeCardLabel = document.getElementById("profile-concierge-card-label");
  const tipsLabel = document.getElementById("profile-tips-label");
  const staffDashboardData = isEmployee ? buildStaffProfileDashboard(account) : null;

  if (greetEl) greetEl.textContent = `${greeting} ${account.prefix} ${account.lastName}`;
  if (summaryEl) {
    if (isEmployee && staffDashboardData) {
      summaryEl.textContent = `${staffDashboardData.accessMeta.title} | ${account.firstName} ${account.lastName} - ${displayCountry} - Staff Access ${staffDashboardData.accessMeta.code}.`;
    } else {
      const roleLine = account.roleTitle ? `${account.roleTitle} | ` : "";
      summaryEl.textContent = `${roleLine}${account.firstName} ${account.lastName} - ${displayCountry} - ${account.membership}.`;
    }
  }
  if (profileStatusLabel) {
    profileStatusLabel.textContent = isOwner ? "Status" : (isEmployee ? "Access Level" : "Membership");
  }
  if (profileStatusNoteLabel) {
    profileStatusNoteLabel.textContent = isEmployee ? "Modules enabled" : "Services completed";
  }
  if (tierEl) {
    tierEl.textContent = isEmployee && staffDashboardData
      ? `${staffDashboardData.accessMeta.code} • ${staffDashboardData.accessMeta.title}`
      : account.membership;
  }
  if (completedEl) {
    completedEl.textContent = isEmployee && staffDashboardData
      ? String(staffDashboardData.metrics.find((row) => row.label === "Sunrise Modules")?.value || "0")
      : String(account.servicesCompleted);
  }
  if (pastTitleEl) {
    pastTitleEl.textContent = isEmployee ? "Operational Scope" : account.pastService.title;
  }
  if (pastDetailsEl) {
    pastDetailsEl.textContent = isEmployee && staffDashboardData
      ? `${staffDashboardData.scope}. Position focus: ${String(account.roleTitle || staffDashboardData.accessMeta.title)}.`
      : [
        String(account.pastService.details || "").trim(),
        account.pastService.statusText ? `Status: ${String(account.pastService.statusText).trim()}.` : "",
        (account.pastService.endedAt && String(account.pastService.endedAt).trim() && String(account.pastService.endedAt).trim() !== "N/A")
          ? `${String(account.pastService.timeLabel || "Completed").trim()}: ${String(account.pastService.endedAt).trim()}.`
          : ""
      ].filter(Boolean).join(" ");
  }
  if (upcomingTitleEl) {
    upcomingTitleEl.textContent = isEmployee ? "Current Duty Focus" : account.upcomingService.title;
  }
  if (upcomingDetailsEl) {
    upcomingDetailsEl.textContent = isEmployee && staffDashboardData
      ? staffDashboardData.focus
      : [
        String(account.upcomingService.details || "").trim(),
        account.upcomingService.statusText ? `Status: ${String(account.upcomingService.statusText).trim()}.` : "",
        (account.upcomingService.startsAt && String(account.upcomingService.startsAt).trim() && String(account.upcomingService.startsAt).trim() !== "N/A")
          ? `${String(account.upcomingService.timeLabel || "Timing").trim()}: ${String(account.upcomingService.startsAt).trim()}.`
          : ""
      ].filter(Boolean).join(" ");
  }

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
      "tier-theme-gold",
      "tier-theme-sta",
      "tier-theme-ss",
      "tier-theme-sm",
      "tier-theme-da",
      "tier-theme-ca"
    );
    profileShell.classList.add(tierThemeClass(account.membership));
  }

  if (profileAmbassadorBtn) profileAmbassadorBtn.hidden = !isRed;
  if (profileSunriseBtn) profileSunriseBtn.hidden = !hasSunriseAccess(account);
  if (profileAccountSettingsBtn) profileAccountSettingsBtn.hidden = !account;
  if (ownerExecutiveTag) ownerExecutiveTag.hidden = !isOwner;
  if (ownerMetricsWrap) ownerMetricsWrap.hidden = !isOwner;
  if (conciergeDeskCard) conciergeDeskCard.hidden = isOwner || isEmployee;
  if (tipsCard) tipsCard.hidden = isOwner || isEmployee;
  if (redTeamWrap) redTeamWrap.hidden = !isRed;
  if (standardSupport) standardSupport.hidden = isRed || isOwner || isEmployee;
  if (progressWrap) progressWrap.hidden = isRed || isOwner || isEmployee;
  if (staffDashboard) staffDashboard.hidden = !isEmployee;
  if (profileServiceToolbar) profileServiceToolbar.hidden = isOwner || isEmployee;
  if (profileSubmitServiceTopBtn) profileSubmitServiceTopBtn.hidden = isOwner || isEmployee;
  if (conciergeCardLabel) conciergeCardLabel.textContent = "Available Concierge Desk";
  if (tipsLabel) tipsLabel.textContent = "Trip & Safety Tips";

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

  if (isEmployee && staffDashboardData) {
    currentAssignedConcierge = null;
    if (staffMetrics) {
      staffMetrics.innerHTML = staffDashboardData.metrics
        .map((row) => `<div class="teamItem"><b>${row.label}</b><span>${row.value}</span></div>`)
        .join("");
    }
    if (staffModules) {
      const items = staffDashboardData.modules.slice(0, 10);
      staffModules.innerHTML = items.length
        ? items.map((item) => `<li>${item}</li>`).join("")
        : "<li>No Sunrise modules currently assigned.</li>";
    }
  } else if (isRed && account.assignedTeam) {
    const pilot = document.getElementById("team-pilot");
    const driver = document.getElementById("team-driver");
    const concierge = document.getElementById("team-concierge");
    const security = document.getElementById("team-security");
    if (pilot) pilot.textContent = localizePhoneInText(account.assignedTeam.pilot, account.country);
    if (driver) driver.textContent = localizePhoneInText(account.assignedTeam.driver, account.country);
    if (concierge) concierge.textContent = localizePhoneInText(account.assignedTeam.concierge, account.country);
    if (security) security.textContent = localizePhoneInText(account.assignedTeam.security, account.country);
    if (redTeamStatusEl) {
      const note = String(account.redTeamAssignmentNote || "").trim();
      redTeamStatusEl.hidden = !note;
      redTeamStatusEl.textContent = note;
    }
    currentAssignedConcierge = null;
  } else {
    if (redTeamStatusEl) {
      redTeamStatusEl.hidden = true;
      redTeamStatusEl.textContent = "";
    }
    const lastCons = document.getElementById("profile-last-concierge");
    const progressFill = document.getElementById("profile-progress-fill");
    const progressText = document.getElementById("profile-progress-text");
    const storedAssignedConcierge = resolveStoredAssignedConcierge(account);
    const isNewAccount = (account.servicesCompleted || 0) <= 0 && !storedAssignedConcierge;
    if (storedAssignedConcierge) {
      currentAssignedConcierge = storedAssignedConcierge;
      if (lastCons) lastCons.textContent = conciergeToText(storedAssignedConcierge, account.country);
      if (conciergeAutoNote) {
        const noteRole = String(storedAssignedConcierge.role || "Assigned Concierge").trim();
        const noteId = String(storedAssignedConcierge.id || "").trim();
        conciergeAutoNote.textContent = noteId
          ? `Automatically assigned today: ${noteRole} (${noteId.toUpperCase()}) by VVS dispatch engine.`
          : `Automatically assigned today: ${noteRole} by VVS dispatch engine.`;
      }
    } else if (isNewAccount) {
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

  if (conciergeList && !isOwner && !isEmployee) {
    const desk = randomConciergeDesk(8);
    conciergeList.innerHTML = desk.map((person) => (
      `<button class="teamItem conciergePick" type="button" data-concierge-pick="${person.name}"><b>${person.role}</b><span>${person.name}<br>${person.email}<br>${localizePhone(person.localPhone, account.country)}</span></button>`
    )).join("");
  } else if (conciergeList && isEmployee) {
    conciergeList.innerHTML = "";
  }
  renderAmbassadorLounge(account);
  renderVoyagerControl(account);
  renderSunrise(account);
  refreshActiveLanguageIfNeeded();
}

function resetAccountSettingsPasswordState() {
  if (accountSettingsPasswordForm) accountSettingsPasswordForm.reset();
  if (accountSettingsRecoveryStep1) {
    accountSettingsRecoveryStep1.hidden = true;
    accountSettingsRecoveryStep1.reset();
  }
  if (accountSettingsRecoveryStep2) {
    accountSettingsRecoveryStep2.hidden = true;
    accountSettingsRecoveryStep2.reset();
    setRecoveryCodeFieldVisibility(accountSettingsRecoveryStep2, false);
  }
  accountPasswordResetState.email = "";
  accountPasswordResetState.code = "";
  accountPasswordResetState.account = null;
  accountPasswordResetState.bypassEmailCode = false;
  if (accountSettingsPasswordInfo) accountSettingsPasswordInfo.textContent = "";
  if (accountSettingsPasswordRecoveryInfo) {
    accountSettingsPasswordRecoveryInfo.textContent = "Enter your email address, secret phrase, and membership tier to send the recovery code.";
  }
}

function activateAccountSettingsPasswordMode(mode = "change") {
  const normalized = String(mode || "change").trim().toLowerCase() === "recovery" ? "recovery" : "change";
  accountSettingsPasswordModeBtns.forEach((btn) => {
    const active = String(btn.getAttribute("data-account-password-mode") || "").trim().toLowerCase() === normalized;
    btn.classList.toggle("isActive", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });

  if (!accountSettingsPasswordForm || !accountSettingsRecoveryStep1 || !accountSettingsRecoveryStep2) return;

  if (normalized === "recovery") {
    accountSettingsPasswordForm.hidden = true;
    if (accountSettingsRecoveryStep2.hidden) {
      accountSettingsRecoveryStep1.hidden = false;
    }
    if (accountSettingsPasswordInfo) accountSettingsPasswordInfo.textContent = "";
    if (accountSettingsPasswordRecoveryInfo && !accountSettingsPasswordRecoveryInfo.textContent) {
      accountSettingsPasswordRecoveryInfo.textContent = "Enter your email address, secret phrase, and membership tier to send the recovery code.";
    }
    return;
  }

  accountSettingsPasswordForm.hidden = false;
  accountSettingsRecoveryStep1.hidden = true;
  accountSettingsRecoveryStep2.hidden = true;
  if (accountSettingsPasswordRecoveryInfo) accountSettingsPasswordRecoveryInfo.textContent = "";
  accountPasswordResetState.email = "";
  accountPasswordResetState.code = "";
  accountPasswordResetState.account = null;
  accountPasswordResetState.bypassEmailCode = false;
}

function populateAccountSettingsForm(account = activeAccount, options = {}) {
  if (!account || !accountSettingsForm) return;
  const resolvedTarget = resolveAccountKey(account.email || "");
  if (resolvedTarget) accountSettingsTargetKey = resolvedTarget;
  const shouldResetPasswordTools = options?.resetPasswordTools !== false;
  const countrySelect = document.getElementById("account-settings-country");
  if (countrySelect) populateCountrySelect(countrySelect, "Select country");
  if (shouldResetPasswordTools) resetAccountSettingsPasswordState();

  const setValue = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.value = String(value || "");
  };
  const accessMeta = hasSunriseAccess(account) ? sunriseAccessMeta(account) : null;
  const membershipWrap = document.getElementById("account-settings-membership-wrap");
  const roleWrap = document.getElementById("account-settings-role-wrap");
  const accessWrap = document.getElementById("account-settings-access-wrap");

  setValue("account-settings-title", account.prefix || "");
  setValue("account-settings-first", account.firstName || "");
  setValue("account-settings-last", account.lastName || "");
  setValue("account-settings-phone", account.phone || "");
  setValue("account-settings-email", account.email || "");
  setValue("account-settings-phrase", account.secretPhrase || "");
  setValue("account-settings-membership", account.membership || "");
  setValue("account-settings-role", account.roleTitle || "");
  setValue("account-settings-access", accessMeta ? `${accessMeta.code} - ${accessMeta.title}` : "");
  if (countrySelect instanceof HTMLSelectElement) {
    countrySelect.value = resolveCountryCode(account.country || "") || "";
  }

  if (membershipWrap) membershipWrap.hidden = false;
  if (roleWrap) roleWrap.hidden = !String(account.roleTitle || "").trim();
  if (accessWrap) accessWrap.hidden = !accessMeta;

  const passwordEmail = document.getElementById("account-pw-email");
  const recoveryEmail = document.getElementById("account-pw-rec-email");
  const recoveryTier = document.getElementById("account-pw-rec-tier");
  if (passwordEmail) passwordEmail.value = String(account.email || "").trim();
  if (recoveryEmail) recoveryEmail.value = String(account.email || "").trim();
  if (recoveryTier instanceof HTMLSelectElement) {
    recoveryTier.value = normalizeMembershipTier(account.membership || "");
  }

  if (accountSettingsSummary) {
    const accountType = isOwnerAccount(account) ? "owner profile" : (accessMeta ? "staff profile" : "client profile");
    accountSettingsSummary.textContent = `${String(account.firstName || "").trim()} ${String(account.lastName || "").trim()} - ${String(account.email || "").trim()} - ${accountType}.`;
  }
  if (accountSettingsInfo) accountSettingsInfo.textContent = "";
  activateAccountSettingsPasswordMode("change");
}

function openAccountSettingsOverlay(account = null) {
  const targetAccount = resolveAccountSettingsTarget(account);
  if (!targetAccount || !accountSettingsOverlay) return;
  populateAccountSettingsForm(targetAccount);
  accountSettingsOverlay.hidden = false;
}

function closeAccountSettingsOverlay() {
  if (accountSettingsOverlay) accountSettingsOverlay.hidden = true;
}

function currentAmpAccountDetailsTarget() {
  const key = resolveAccountKey(ampAccountDetailsTargetKey || "");
  return key ? accounts[key] || null : null;
}

function populateAmpAccountDetailsForm(account = null) {
  const target = account || currentAmpAccountDetailsTarget();
  if (!target || !ampAccountDetailsForm) return;
  const key = resolveAccountKey(target.email || "");
  if (!key) return;
  ampAccountDetailsTargetKey = key;
  const canEdit = isOwnerAccount(getCurrentSunriseOperator() || activeAccount || null);
  const setValue = (id, value) => {
    const field = document.getElementById(id);
    if (field) field.value = String(value || "");
  };
  const countrySelect = document.getElementById("amp-account-country");
  if (countrySelect instanceof HTMLSelectElement) {
    populateCountrySelect(countrySelect, "Select country");
    countrySelect.value = resolveCountryCode(target.country || "") || "";
    countrySelect.disabled = !canEdit;
  }
  const sunriseLogin = findSunriseCredentialEmailForBaseKey(key, target);
  const accessMeta = sunriseAccessMeta(target);
  setValue("amp-account-title", target.prefix || "");
  setValue("amp-account-first", target.firstName || "");
  setValue("amp-account-last", target.lastName || "");
  setValue("amp-account-role", target.roleTitle || "");
  setValue("amp-account-division", ampStaffGroupName(target));
  setValue("amp-account-email", target.email || key);
  setValue("amp-account-sunrise-email", sunriseLogin || "");
  setValue("amp-account-phone", target.phone || "");
  setValue("amp-account-password", target.password || "");
  setValue("amp-account-secret", target.secretPhrase || "");
  setValue("amp-account-access", accessMeta.code || staffAccessCode(target));
  setValue("amp-account-notos", target.notosId || "");
  if (ampAccountDetailsSummary) {
    const fullName = `${String(target.firstName || "").trim()} ${String(target.lastName || "").trim()}`.trim() || target.email || key;
    ampAccountDetailsSummary.textContent = `${fullName} - ${String(target.roleTitle || "Staff").trim()} - ${String(target.email || key).trim().toLowerCase()}.`;
  }
  if (ampAccountDetailsInfo) ampAccountDetailsInfo.textContent = "";
  Array.from(ampAccountDetailsForm.querySelectorAll("input, select")).forEach((field) => {
    if (!(field instanceof HTMLInputElement) && !(field instanceof HTMLSelectElement)) return;
    field.disabled = !canEdit;
    field.readOnly = !canEdit && field instanceof HTMLInputElement;
  });
}

function openAmpAccountDetails(rawKey = "") {
  const key = resolveAccountKey(rawKey || "");
  const account = key ? accounts[key] : null;
  if (!key || !account || !ampAccountDetailsOverlay) return;
  ampAccountDetailsTargetKey = key;
  populateAmpAccountDetailsForm(account);
  ampAccountDetailsOverlay.hidden = false;
}

function closeAmpAccountDetails() {
  if (ampAccountDetailsOverlay) ampAccountDetailsOverlay.hidden = true;
}

function currentAmpCustomerDetailsTarget() {
  const key = resolveAccountKey(ampCustomerDetailsTargetKey || "");
  return key ? accounts[key] || null : null;
}

function populateAmpCustomerDetailsForm(account = null) {
  const target = account || currentAmpCustomerDetailsTarget();
  if (!target || !ampCustomerDetailsForm) return;
  const key = resolveAccountKey(target.email || "");
  if (!key) return;
  ampCustomerDetailsTargetKey = key;
  const setValue = (id, value) => {
    const field = document.getElementById(id);
    if (field) field.value = String(value || "");
  };
  const countrySelect = document.getElementById("amp-customer-country");
  const contactSelect = document.getElementById("amp-customer-contact");
  if (countrySelect instanceof HTMLSelectElement) {
    populateCountrySelect(countrySelect, "Select country");
    countrySelect.value = resolveCountryCode(target.country || "") || "";
  }
  if (contactSelect instanceof HTMLSelectElement) {
    contactSelect.value = String(target.preferredContactMethod || target.lastContactMethod || "").trim().toLowerCase();
  }
  setValue("amp-customer-code", key);
  setValue("amp-customer-email", target.email || key);
  setValue("amp-customer-phone", target.phone || "");
  setValue("amp-customer-title", target.prefix || "");
  setValue("amp-customer-first", target.firstName || "");
  setValue("amp-customer-last", target.lastName || "");
  setValue("amp-customer-password", target.password || "");
  setValue("amp-customer-secret", target.secretPhrase || "");
  setValue("amp-customer-status", target.accountStatus || "Active");
  setValue("amp-customer-created", target.createdAt || "");
  setValue("amp-customer-verified", target.verifiedAt || "");
  setValue("amp-customer-tier", target.membership || "Non-Member");
  if (ampCustomerDetailsSummary) {
    const fullName = `${String(target.firstName || "").trim()} ${String(target.lastName || "").trim()}`.trim() || target.email || key;
    ampCustomerDetailsSummary.textContent = `${fullName} - ${String(target.email || key).trim().toLowerCase()} - client profile.`;
  }
  if (ampCustomerActivity) ampCustomerActivity.innerHTML = renderCustomerActivityRows(target.email || key);
  if (ampCustomerDetailsInfo) ampCustomerDetailsInfo.textContent = "";
}

function openAmpCustomerDetails(rawKey = "") {
  const key = resolveAccountKey(rawKey || "");
  const account = key ? accounts[key] : null;
  if (!key || !account || !ampCustomerDetailsOverlay) return;
  ampCustomerDetailsTargetKey = key;
  populateAmpCustomerDetailsForm(account);
  ampCustomerDetailsOverlay.hidden = false;
}

function closeAmpCustomerDetails() {
  if (ampCustomerDetailsOverlay) ampCustomerDetailsOverlay.hidden = true;
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

if (profileAccountSettingsBtn) {
  profileAccountSettingsBtn.addEventListener("click", () => openAccountSettingsOverlay());
}

if (accountSettingsClose) {
  accountSettingsClose.addEventListener("click", () => closeAccountSettingsOverlay());
}

if (accountSettingsOverlay && accountSettingsOverlay.dataset.boundDismiss !== "1") {
  accountSettingsOverlay.addEventListener("click", (event) => {
    if (event.target === accountSettingsOverlay) closeAccountSettingsOverlay();
  });
  accountSettingsOverlay.dataset.boundDismiss = "1";
}

if (ampAccountDetailsClose) {
  ampAccountDetailsClose.addEventListener("click", () => closeAmpAccountDetails());
}

if (ampAccountDetailsOverlay && ampAccountDetailsOverlay.dataset.boundDismiss !== "1") {
  ampAccountDetailsOverlay.addEventListener("click", (event) => {
    if (event.target === ampAccountDetailsOverlay) closeAmpAccountDetails();
  });
  ampAccountDetailsOverlay.dataset.boundDismiss = "1";
}

if (ampCustomerDetailsClose) {
  ampCustomerDetailsClose.addEventListener("click", () => closeAmpCustomerDetails());
}

if (ampCustomerDetailsOverlay && ampCustomerDetailsOverlay.dataset.boundDismiss !== "1") {
  ampCustomerDetailsOverlay.addEventListener("click", (event) => {
    if (event.target === ampCustomerDetailsOverlay) closeAmpCustomerDetails();
  });
  ampCustomerDetailsOverlay.dataset.boundDismiss = "1";
}

if (membershipUpgradeClose) {
  membershipUpgradeClose.addEventListener("click", () => {
    if (membershipUpgradeOverlay) membershipUpgradeOverlay.hidden = true;
  });
}

accountSettingsPasswordModeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const mode = String(btn.getAttribute("data-account-password-mode") || "change").trim().toLowerCase();
    activateAccountSettingsPasswordMode(mode);
  });
});

if (accountSettingsForm) {
  accountSettingsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!accountSettingsForm.reportValidity()) return;

    const currentKey = resolveAccountKey(accountSettingsTargetKey || activeAccount?.email || "");
    const account = accounts[currentKey] || resolveAccountSettingsTarget();
    const nextEmail = normalizeEmailAddress(document.getElementById("account-settings-email")?.value || "");
    const nextCountryCode = String(document.getElementById("account-settings-country")?.value || "").trim();
    const nextPhrase = String(document.getElementById("account-settings-phrase")?.value || "").trim();

    if (!currentKey || !accounts[currentKey] || !account) {
      if (accountSettingsInfo) accountSettingsInfo.textContent = "Unable to load the active account for editing.";
      return;
    }
    if (!nextEmail) {
      if (accountSettingsInfo) accountSettingsInfo.textContent = "Enter a valid VVS email address.";
      return;
    }
    if (nextEmail !== currentKey && accounts[nextEmail] && accounts[nextEmail] !== account) {
      if (accountSettingsInfo) accountSettingsInfo.textContent = "That email is already linked to another VVS account.";
      return;
    }

    account.prefix = String(document.getElementById("account-settings-title")?.value || "").trim();
    account.firstName = String(document.getElementById("account-settings-first")?.value || "").trim();
    account.lastName = String(document.getElementById("account-settings-last")?.value || "").trim();
    account.phone = String(document.getElementById("account-settings-phone")?.value || "").trim();
    account.country = nextCountryCode ? countryDisplayName(nextCountryCode) : "";
    account.secretPhrase = nextPhrase;

    const updatedKey = renameBaseAccountKey(currentKey, nextEmail);
    accountSettingsTargetKey = resolveAccountKey(updatedKey);
    syncCredentialFieldAcrossLinkedAccounts(updatedKey, "secretPhrase", nextPhrase);
    syncChangedAccountState(updatedKey);
    populateAccountSettingsForm(accounts[resolveAccountKey(updatedKey)] || resolveAccountSettingsTarget(), { resetPasswordTools: false });
    if (accountSettingsInfo) accountSettingsInfo.textContent = "Account details updated successfully.";
    logSharedRegistryActivity({
      email: String(nextEmail || updatedKey).trim().toLowerCase(),
      eventType: "account_updated",
      system: "vvs",
      route: "profile",
      status: "Account Saved",
      account: accounts[resolveAccountKey(updatedKey)] || account
    });
  });
}

if (accountSettingsDiscard) {
  accountSettingsDiscard.addEventListener("click", () => {
    const targetAccount = accounts[resolveAccountKey(accountSettingsTargetKey)] || resolveAccountSettingsTarget();
    if (!targetAccount) return;
    populateAccountSettingsForm(targetAccount);
    if (accountSettingsInfo) accountSettingsInfo.textContent = "Changes discarded.";
  });
}

if (ampAccountDetailsDiscard) {
  ampAccountDetailsDiscard.addEventListener("click", () => {
    const account = currentAmpAccountDetailsTarget();
    if (!account) return;
    populateAmpAccountDetailsForm(account);
    if (ampAccountDetailsInfo) ampAccountDetailsInfo.textContent = "Changes discarded.";
  });
}

if (ampCustomerDetailsDiscard) {
  ampCustomerDetailsDiscard.addEventListener("click", () => {
    const account = currentAmpCustomerDetailsTarget();
    if (!account) return;
    populateAmpCustomerDetailsForm(account);
    if (ampCustomerDetailsInfo) ampCustomerDetailsInfo.textContent = "Changes discarded.";
  });
}

if (ampAccountDetailsForm) {
  ampAccountDetailsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!ampAccountDetailsForm.reportValidity()) return;
    if (!isOwnerAccount(getCurrentSunriseOperator() || activeAccount || null)) {
      if (ampAccountDetailsInfo) ampAccountDetailsInfo.textContent = "Only owners can edit staff account details here.";
      return;
    }
    const currentKey = resolveAccountKey(ampAccountDetailsTargetKey || "");
    const account = currentKey ? accounts[currentKey] : null;
    if (!currentKey || !account) {
      if (ampAccountDetailsInfo) ampAccountDetailsInfo.textContent = "Unable to load this staff account.";
      return;
    }
    const nextEmail = normalizeEmailAddress(document.getElementById("amp-account-email")?.value || "");
    const nextSunriseEmail = normalizeEmailAddress(document.getElementById("amp-account-sunrise-email")?.value || "");
    if (!nextEmail) {
      if (ampAccountDetailsInfo) ampAccountDetailsInfo.textContent = "Enter a valid VVS email.";
      return;
    }
    if (nextEmail !== currentKey && accounts[nextEmail] && accounts[nextEmail] !== account) {
      if (ampAccountDetailsInfo) ampAccountDetailsInfo.textContent = "This VVS email is already linked to another account.";
      return;
    }
    account.prefix = String(document.getElementById("amp-account-title")?.value || "").trim();
    account.firstName = String(document.getElementById("amp-account-first")?.value || "").trim();
    account.lastName = String(document.getElementById("amp-account-last")?.value || "").trim();
    account.roleTitle = String(document.getElementById("amp-account-role")?.value || "").trim();
    account.staffDivision = normalizeStaffDivision(
      String(document.getElementById("amp-account-division")?.value || "").trim(),
      account.roleTitle
    );
    account.phone = String(document.getElementById("amp-account-phone")?.value || "").trim();
    const nextCountryCode = String(document.getElementById("amp-account-country")?.value || "").trim().toUpperCase();
    account.country = nextCountryCode ? countryDisplayName(nextCountryCode) : "";
    account.countryCode = nextCountryCode;
    account.notosId = String(document.getElementById("amp-account-notos")?.value || "").trim().toUpperCase();
    account.sunriseAccessLevel = String(document.getElementById("amp-account-access")?.value || "").trim().toUpperCase();
    syncCredentialFieldAcrossLinkedAccounts(currentKey, "password", String(document.getElementById("amp-account-password")?.value || ""));
    syncCredentialFieldAcrossLinkedAccounts(currentKey, "secretPhrase", String(document.getElementById("amp-account-secret")?.value || "").trim());
    const renamedKey = renameBaseAccountKey(currentKey, nextEmail);
    if (nextSunriseEmail) renameLinkedSunriseCredentialKey(renamedKey, nextSunriseEmail);
    syncChangedAccountState(renamedKey);
    saveSunriseControlState();
    populateAmpAccountDetailsForm(accounts[resolveAccountKey(renamedKey)] || null);
    renderAMPPage(String(document.getElementById("amp-search")?.value || "").trim());
    if (ampAccountDetailsInfo) ampAccountDetailsInfo.textContent = "Staff account updated.";
    logSharedRegistryActivity({
      email: String(nextEmail || renamedKey).trim().toLowerCase(),
      eventType: "account_updated",
      system: "sunrise",
      route: "sunrise-amp",
      status: "Staff Record Saved",
      account: accounts[resolveAccountKey(renamedKey)] || account
    });
  });
}

if (ampCustomerDetailsForm) {
  ampCustomerDetailsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!ampCustomerDetailsForm.reportValidity()) return;
    const currentKey = resolveAccountKey(ampCustomerDetailsTargetKey || "");
    const account = currentKey ? accounts[currentKey] : null;
    if (!currentKey || !account) {
      if (ampCustomerDetailsInfo) ampCustomerDetailsInfo.textContent = "Unable to load this client account.";
      return;
    }
    const nextEmail = normalizeEmailAddress(document.getElementById("amp-customer-email")?.value || "");
    if (!nextEmail) {
      if (ampCustomerDetailsInfo) ampCustomerDetailsInfo.textContent = "Enter a valid VVS email.";
      return;
    }
    if (nextEmail !== currentKey && accounts[nextEmail] && accounts[nextEmail] !== account) {
      if (ampCustomerDetailsInfo) ampCustomerDetailsInfo.textContent = "This VVS email is already linked to another account.";
      return;
    }
    account.phone = String(document.getElementById("amp-customer-phone")?.value || "").trim();
    const nextCountryCode = String(document.getElementById("amp-customer-country")?.value || "").trim().toUpperCase();
    account.countryCode = nextCountryCode;
    account.country = nextCountryCode ? countryDisplayName(nextCountryCode) : "";
    account.preferredContactMethod = String(document.getElementById("amp-customer-contact")?.value || "").trim().toLowerCase();
    account.lastContactMethod = account.preferredContactMethod;
    account.prefix = String(document.getElementById("amp-customer-title")?.value || "").trim();
    account.firstName = String(document.getElementById("amp-customer-first")?.value || "").trim();
    account.lastName = String(document.getElementById("amp-customer-last")?.value || "").trim();
    account.password = String(document.getElementById("amp-customer-password")?.value || "");
    account.secretPhrase = String(document.getElementById("amp-customer-secret")?.value || "").trim();
    account.accountStatus = String(document.getElementById("amp-customer-status")?.value || "").trim() || "Active";
    account.createdAt = String(document.getElementById("amp-customer-created")?.value || "").trim() || account.createdAt || accountTimestampLabel();
    account.verifiedAt = String(document.getElementById("amp-customer-verified")?.value || "").trim() || account.verifiedAt || account.createdAt;
    account.membership = String(document.getElementById("amp-customer-tier")?.value || "").trim() || "Non-Member";
    const renamedKey = renameBaseAccountKey(currentKey, nextEmail);
    syncChangedAccountState(renamedKey);
    saveSunriseControlState();
    populateAmpCustomerDetailsForm(accounts[resolveAccountKey(renamedKey)] || null);
    renderAMPPage(String(document.getElementById("amp-search")?.value || "").trim());
    if (ampCustomerDetailsInfo) ampCustomerDetailsInfo.textContent = "Client account updated.";
    logSharedRegistryActivity({
      email: String(nextEmail || renamedKey).trim().toLowerCase(),
      eventType: "account_updated",
      system: "sunrise",
      route: "sunrise-amp",
      status: "Client Record Saved",
      account: accounts[resolveAccountKey(renamedKey)] || account
    });
  });
}

if (accountSettingsPasswordForm) {
  accountSettingsPasswordForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!accountSettingsPasswordForm.reportValidity()) return;
    submitPasswordChangeFlow({
      email: (document.getElementById("account-pw-email")?.value || "").trim(),
      currentPassword: (document.getElementById("account-pw-current")?.value || "").trim(),
      newPassword: (document.getElementById("account-pw-new")?.value || "").trim(),
      confirmPassword: (document.getElementById("account-pw-confirm")?.value || "").trim(),
      infoEl: accountSettingsPasswordInfo,
      onSuccess: () => {
        accountSettingsPasswordForm.reset();
        const emailField = document.getElementById("account-pw-email");
        const targetAccount = accounts[resolveAccountKey(accountSettingsTargetKey)] || resolveAccountSettingsTarget();
        if (emailField) emailField.value = String(targetAccount?.email || activeAccount?.email || "").trim();
      }
    });
  });
}

if (accountSettingsRecoveryStep1) {
  accountSettingsRecoveryStep1.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!accountSettingsRecoveryStep1.reportValidity()) return;
    await startPasswordRecoveryFlow({
      email: (document.getElementById("account-pw-rec-email")?.value || "").trim(),
      phrase: (document.getElementById("account-pw-rec-phrase")?.value || "").trim().toLowerCase(),
      selectedTier: normalizeMembershipTier(document.getElementById("account-pw-rec-tier")?.value || ""),
      infoEl: accountSettingsPasswordRecoveryInfo,
      step1Form: accountSettingsRecoveryStep1,
      step2Form: accountSettingsRecoveryStep2,
      state: accountPasswordResetState
    });
  });
}

if (accountSettingsRecoveryStep2) {
  accountSettingsRecoveryStep2.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!accountSettingsRecoveryStep2.reportValidity()) return;
    completePasswordRecoveryFlow({
      code: (document.getElementById("account-pw-rec-code")?.value || "").trim(),
      newPassword: (document.getElementById("account-pw-rec-new")?.value || "").trim(),
      confirmPassword: (document.getElementById("account-pw-rec-confirm")?.value || "").trim(),
      infoEl: accountSettingsPasswordRecoveryInfo,
      step1Form: accountSettingsRecoveryStep1,
      step2Form: accountSettingsRecoveryStep2,
      state: accountPasswordResetState,
      onSuccess: (account) => {
        const email = String(account?.email || activeAccount?.email || "").trim();
        const tier = normalizeMembershipTier(account?.membership || activeAccount?.membership || "");
        const emailField = document.getElementById("account-pw-rec-email");
        const tierField = document.getElementById("account-pw-rec-tier");
        if (emailField) emailField.value = email;
        if (tierField instanceof HTMLSelectElement) tierField.value = tier;
      }
    });
  });
}

if (loginStep1) {
  loginStep1.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("login-email");
    const password = document.getElementById("login-password");
    authState.loginEmail = email ? email.value.trim() : "";
    const emailValue = authState.loginEmail;
    const passwordValue = password ? password.value.trim() : "";
    if (!emailValue || !passwordValue) {
      if (loginInfo) loginInfo.textContent = "Enter your email address and password.";
      return;
    }
    const account = findAccountByEmail(authState.loginEmail);
    const enteredPassword = passwordValue;
    const allPasswords = account
      ? [String(account.password), ...((account.altPasswords || []).map((item) => String(item)))]
      : [];
    const passOk = account && allPasswords.some((stored) =>
      enteredPassword === stored || enteredPassword.toLowerCase() === stored.toLowerCase()
    );

    if (!account || !passOk || !isVvsCredentialAccount(account)) {
      if (loginInfo) loginInfo.textContent = "Log in failed. Check your email address or password.";
      return;
    }
    if (isWebsiteShutdownActive() && !isOwnerAccount(account)) {
      if (loginInfo) loginInfo.textContent = "Website is temporarily unavailable. Only owner login is permitted at this time.";
      return;
    }

    authState.loginAccount = account;
    if (shouldBypassOwnerEmailVerification(account)) {
      activeAccount = account;
      persistActiveSession(activeAccount);
      renderProfile(account);
      updateAuthCta();
      if (loginStep2) {
        loginStep2.hidden = true;
        loginStep2.reset();
      }
      if (loginInfo) loginInfo.textContent = "Owner verification confirmed. Redirecting to your account.";
      queueSharedRegistryAccountSync(String(account.email || "").trim().toLowerCase());
      logSharedRegistryActivity({
        email: String(account.email || "").trim().toLowerCase(),
        eventType: "vvs_login",
        system: "vvs",
        route: "profile",
        status: "Access Granted",
        account
      });
      showRoute("profile");
      return;
    }

    authState.loginCode = issueTestEmailCode(authState.loginEmail);
    const delivery = await sendVerificationCodeEmail({
      email: authState.loginEmail,
      code: authState.loginCode,
      context: "vvs",
      name: verificationRecipientName(account)
    });

    loginStep1.hidden = false;
    if (loginStep2) loginStep2.hidden = false;
    if (loginInfo) {
      loginInfo.textContent = buildVerificationDispatchMessage({
        email: authState.loginEmail,
        code: authState.loginCode,
        context: "vvs",
        delivery
      });
    }
  });
}

if (loginStep2) {
  loginStep2.addEventListener("submit", (event) => {
    event.preventDefault();

    const phrase = document.getElementById("login-phrase");
    const code = document.getElementById("login-code");
    const phraseValue = phrase ? phrase.value.trim() : "";
    const codeValue = code ? code.value.trim() : "";
    if (!phraseValue || !codeValue) {
      if (loginInfo) loginInfo.textContent = "Enter your secret phrase and email confirmation code.";
      return;
    }
    const account = authState.loginAccount || findAccountByEmail(authState.loginEmail);
    const phraseOk = !!(account && phraseValue.toLowerCase() === String(account.secretPhrase || "").toLowerCase());
    const codeOk = codeValue === authState.loginCode;

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
    queueSharedRegistryAccountSync(String(account.email || "").trim().toLowerCase());
    logSharedRegistryActivity({
      email: String(account.email || "").trim().toLowerCase(),
      eventType: "vvs_login",
      system: "vvs",
      route: "profile",
      status: "Access Granted",
      account
    });
    showRoute("profile");
  });
}

if (signupStep1) {
  signupStep1.addEventListener("submit", async (event) => {
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

    accounts[authState.signupEmail.toLowerCase()] = buildCustomerAccountRecord({
      email: authState.signupEmail,
      password: password ? password.value : "",
      secretPhrase: phrase ? phrase.value.trim() : "",
      prefix: title && title.value.trim() ? title.value.trim() : "Mr.",
      firstName: first ? first.value.trim() : "Client",
      lastName: last ? last.value.trim() : "Member",
      countryCode: country ? country.value.trim() : "",
      phone: phone ? phone.value.trim() : ""
    });
    persistAccountsData();
    const signupAccount = accounts[authState.signupEmail.toLowerCase()];
    queueSharedRegistryAccountSync(authState.signupEmail);
    logSharedRegistryActivity({
      email: authState.signupEmail,
      eventType: "signup_started",
      system: "vvs",
      route: "signup",
      status: "Pending Verification",
      account: signupAccount
    });
    authState.signupCode = issueTestEmailCode(authState.signupEmail);
    const pendingAccount = signupAccount;
    const delivery = await sendVerificationCodeEmail({
      email: authState.signupEmail,
      code: authState.signupCode,
      context: "vvs",
      name: verificationRecipientName(pendingAccount)
    });

    signupStep1.hidden = true;
    if (signupStep2) signupStep2.hidden = false;
    if (signupInfo) {
      signupInfo.textContent = `${buildVerificationDispatchMessage({
        email: authState.signupEmail,
        code: authState.signupCode,
        context: "vvs",
        delivery
      })} Secret phrase can be entered only once and cannot be changed.`;
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
      activeAccount.accountStatus = "Active";
      activeAccount.verifiedAt = accountTimestampLabel();
      activeAccount.updatedAt = activeAccount.verifiedAt;
      activeAccount.preferredContactMethod = String(activeAccount.preferredContactMethod || "email").trim().toLowerCase();
      normalizeAccountServiceCards(activeAccount);
      persistAccountsData();
      queueSharedRegistryAccountSync(String(activeAccount.email || "").trim().toLowerCase());
      logSharedRegistryActivity({
        email: String(activeAccount.email || "").trim().toLowerCase(),
        eventType: "signup_verified",
        system: "vvs",
        route: "profile",
        status: "Active",
        account: activeAccount
      });
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
    const changed = submitPasswordChangeFlow({
      email: (document.getElementById("pw-old-email")?.value || "").trim(),
      currentPassword: (document.getElementById("pw-old-password")?.value || "").trim(),
      newPassword: (document.getElementById("pw-old-new")?.value || "").trim(),
      confirmPassword: (document.getElementById("pw-old-confirm")?.value || "").trim(),
      infoEl: passwordInfo,
      onSuccess: () => pwOldForm.reset()
    });
    if (!changed) return;
  });
}

if (pwRecoveryStep1) {
  pwRecoveryStep1.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!pwRecoveryStep1.reportValidity()) return;
    await startPasswordRecoveryFlow({
      email: (document.getElementById("pw-rec-email")?.value || "").trim(),
      phrase: (document.getElementById("pw-rec-phrase")?.value || "").trim().toLowerCase(),
      selectedTier: normalizeMembershipTier(document.getElementById("pw-rec-tier")?.value || ""),
      infoEl: passwordRecoveryInfo,
      step1Form: pwRecoveryStep1,
      step2Form: pwRecoveryStep2,
      state: passwordResetState
    });
  });
}

if (pwRecoveryStep2) {
  pwRecoveryStep2.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!pwRecoveryStep2.reportValidity()) return;
    completePasswordRecoveryFlow({
      code: (document.getElementById("pw-rec-code")?.value || "").trim(),
      newPassword: (document.getElementById("pw-rec-new")?.value || "").trim(),
      confirmPassword: (document.getElementById("pw-rec-confirm")?.value || "").trim(),
      infoEl: passwordRecoveryInfo,
      step1Form: pwRecoveryStep1,
      step2Form: pwRecoveryStep2,
      state: passwordResetState
    });
  });
}

const sameConciergeBtn = document.getElementById("same-concierge-btn");
const sameConciergeResult = document.getElementById("same-concierge-result");
const profileSubmitServiceBtn = document.getElementById("profile-submit-service-btn");
const profileSubmitServiceTopBtn = document.getElementById("profile-submit-service-top");
const sunriseStep1 = document.getElementById("sunrise-step1");
const sunriseStep2 = document.getElementById("sunrise-step2");
const sunriseInfo = document.getElementById("sunrise-info");
const sunriseOwnerAlertOverlay = document.getElementById("sunrise-owner-alert-overlay");
const sunriseOwnerAlertText = document.getElementById("sunrise-owner-alert-text");
const sunriseOwnerAlertBtn = document.getElementById("sunrise-owner-alert-btn");
const sunriseLogoutBtn = document.getElementById("sunrise-logout-btn");
const sunriseRouteLogoutBtns = Array.from(document.querySelectorAll("[data-sunrise-logout]"));
const sunriseNotosOverlay = document.getElementById("sunrise-notos-overlay");
const sunriseNotosInput = document.getElementById("sunrise-notos-id-popup");
const sunriseNotosInfo = document.getElementById("sunrise-notos-info");
const sunriseNotosSubmit = document.getElementById("sunrise-notos-submit");
const sunriseUnsavedOverlay = document.getElementById("sunrise-unsaved-overlay");
const sunriseUnsavedSaveBtn = document.getElementById("sunrise-unsaved-save");
const sunriseUnsavedDiscardBtn = document.getElementById("sunrise-unsaved-discard");
const sunriseUnsavedStayBtn = document.getElementById("sunrise-unsaved-stay");
const sunriseRtaAuditOverlay = document.getElementById("sunrise-rta-audit-overlay");
const sunriseRtaAuditTitle = document.getElementById("sunrise-rta-audit-title");
const sunriseRtaAuditBody = document.getElementById("sunrise-rta-audit-body");
const sunriseRtaAuditInfo = document.getElementById("sunrise-rta-audit-info");
const sunriseRtaAuditClose = document.getElementById("sunrise-rta-audit-close");
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
    { id: "EMP-101", name: "Camille Mendes", role: "Concierge", position: "Lead Concierge", division: "Office", rtaRoles: ["concierge"], salary: 12500, hours: 176, bonus: 1200, commission: 4.5, status: "Active", email: "camille.mendes@venture-voyagers.com", login: "camille.mendes", permission: "Tier-3" }
  ],
  rtaAssignments: [],
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
  accessLevels: [
    { code: "STA", title: "Sunrise Trainee Associate", access: "Read-only baseline dashboards" },
    { code: "SA", title: "Sunrise Associate", access: "Operational dashboards + inbox + SOC read" },
    { code: "SS", title: "Sunrise Supervisor", access: "Team controls + SOC write + LCS read" },
    { code: "SM", title: "Sunrise Management", access: "Department controls + approvals + SOC/LCS write" },
    { code: "DA", title: "Directorate Access", access: "Cross-department control + strategic actions" },
    { code: "CA", title: "Chairman Access", access: "Executive oversight + system critical actions" },
    { code: "OW", title: "Owner", access: "Full Sunrise command and shutdown/restore authority" }
  ],
  deletedAccounts: [],
  shortcutCodes: [],
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
        mailbox: "shared",
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
        mailbox: "shared",
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

function cloneDefaultSunriseControlState() {
  return JSON.parse(JSON.stringify(sunriseControlDefaults));
}

function mergeStateCollectionsByKey(defaultRows = [], storedRows = [], resolveKey = (_row, idx) => String(idx), normalizeRow = (row) => row) {
  const order = [];
  const merged = new Map();
  const upsert = (row, idx, sourcePriority = 0) => {
    const normalized = normalizeRow(row, idx);
    if (!normalized || typeof normalized !== "object") return;
    const key = String(resolveKey(normalized, idx) || "").trim();
    if (!key) return;
    if (!merged.has(key)) order.push(key);
    const current = merged.get(key);
    merged.set(
      key,
      current && sourcePriority > 0
        ? mergeStoredValuePreservingSeed(current, normalized)
        : normalized
    );
  };
  defaultRows.forEach((row, idx) => upsert(row, idx, 0));
  storedRows.forEach((row, idx) => upsert(row, idx, 1));
  return order.map((key) => merged.get(key)).filter(Boolean);
}

function loadSunriseControlState() {
  const fallback = cloneDefaultSunriseControlState();
  try {
    const raw = localStorage.getItem(SUNRISE_CONTROL_DATA_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return fallback;
    const dtsDocs = mergeStateCollectionsByKey(
      fallback.dtsDocs,
      Array.isArray(parsed.dtsDocs) ? parsed.dtsDocs : [],
      (row, idx) => String(row?.id || `DTS-${idx}`),
      (row) => ({
        id: String(row?.id || ""),
        name: String(row?.name || ""),
        note: String(row?.note || ""),
        status: String(row?.status || "Pending")
      })
    );
    const eamExpenses = mergeStateCollectionsByKey(
      fallback.eamExpenses,
      Array.isArray(parsed.eamExpenses) ? parsed.eamExpenses : [],
      (row, idx) => String(row?.id || `EAM-${idx}`),
      (row) => ({
        id: String(row?.id || ""),
        name: String(row?.name || ""),
        amount: Number(row?.amount || 0)
      })
    );
    const ifsIncome = mergeStateCollectionsByKey(
      fallback.ifsIncome,
      Array.isArray(parsed.ifsIncome) ? parsed.ifsIncome : [],
      (row, idx) => String(row?.id || `IFS-${idx}`),
      (row) => ({
        id: String(row?.id || ""),
        name: String(row?.name || ""),
        amount: Number(row?.amount || 0)
      })
    );
    const smca = mergeStateCollectionsByKey(
      fallback.smca,
      Array.isArray(parsed.smca) ? parsed.smca : [],
      (row, idx) => String(row?.id || `SMCA-${idx}`),
      (row) => ({
        id: String(row?.id || ""),
        name: String(row?.name || ""),
        role: String(row?.role || ""),
        position: String(row?.position || row?.role || ""),
        commission: Number(row?.commission || 0)
      })
    );
    const normalizeEcsEmployee = (row = {}) => ({
      ...row,
      role: String(row?.role || "Concierge"),
      position: String(row?.position || row?.role || "Concierge Associate"),
      division: normalizeStaffDivision(row?.division, row?.position || row?.role),
      rtaRoles: normalizeRtaRoles(row?.rtaRoles, row?.position || row?.role)
    });
    const ecsEmployees = Array.isArray(parsed.ecsEmployees)
      ? mergeStateCollectionsByKey(
          fallback.ecsEmployees,
          parsed.ecsEmployees,
          (row, idx) => String(row?.id || row?.email || row?.login || idx),
          normalizeEcsEmployee
        )
      : fallback.ecsEmployees;
    const rtaAssignments = Array.isArray(parsed.rtaAssignments)
      ? mergeStateCollectionsByKey(
          fallback.rtaAssignments,
          parsed.rtaAssignments,
          (row, idx) => String(row?.clientKey || row?.clientEmail || idx).trim().toLowerCase(),
          (row) => normalizeRtaAssignment(row)
        )
      : fallback.rtaAssignments;
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
      current: mergeStateCollectionsByKey(
        fallback.socServices.current,
        Array.isArray(parsedSoc.current) ? parsedSoc.current : [],
        (row, idx) => String(row?.id || `soc-current-${idx}`).trim().toUpperCase(),
        normalizeSocService
      ),
      past: mergeStateCollectionsByKey(
        fallback.socServices.past,
        Array.isArray(parsedSoc.past) ? parsedSoc.past : [],
        (row, idx) => String(row?.id || `soc-past-${idx}`).trim().toUpperCase(),
        normalizeSocService
      ),
      deleted: mergeStateCollectionsByKey(
        fallback.socServices.deleted,
        Array.isArray(parsedSoc.deleted) ? parsedSoc.deleted : [],
        (row, idx) => String(row?.id || `soc-deleted-${idx}`).trim().toUpperCase(),
        normalizeSocService
      )
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
      customFolders: Array.from(new Set([
        ...(Array.isArray(fallback.inbox.customFolders) ? fallback.inbox.customFolders : []),
        ...(Array.isArray(parsedInbox.customFolders) ? parsedInbox.customFolders : [])
      ].map((item) => String(item || "").trim()).filter(Boolean))),
      signatures: mergeStateCollectionsByKey(
        fallback.inbox.signatures,
        Array.isArray(parsedInbox.signatures) ? parsedInbox.signatures : [],
        (sig, idx) => String(sig?.id || `SIG-${String(idx + 1).padStart(3, "0")}`),
        (sig, idx) => ({
          id: String(sig?.id || `SIG-${String(idx + 1).padStart(3, "0")}`),
          name: String(sig?.name || `Signature ${idx + 1}`),
          text: String(sig?.text || sig?.html || ""),
          imageName: String(sig?.imageName || "")
        })
      ),
      messages: mergeStateCollectionsByKey(
        fallback.inbox.messages,
        Array.isArray(parsedInbox.messages) ? parsedInbox.messages : [],
        (msg, idx) => String(msg?.id || `MAIL-${String(idx + 1000).padStart(4, "0")}`),
        (msg, idx) => ({
          id: String(msg?.id || `MAIL-${String(idx + 1000).padStart(4, "0")}`),
          folder: String(msg?.folder || "inbox"),
          mailbox: String(msg?.mailbox || "shared"),
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
        })
      )
    };
    const deletedAccounts = Array.isArray(parsed.deletedAccounts)
      ? parsed.deletedAccounts.map((row) => ({
          kind: String(row?.kind || "customer"),
          key: String(row?.key || ""),
          email: String(row?.email || ""),
          name: String(row?.name || ""),
          membership: String(row?.membership || ""),
          sunriseAccessLevel: String(row?.sunriseAccessLevel || ""),
          notosId: String(row?.notosId || ""),
          account: row?.account && typeof row.account === "object" ? row.account : {},
          deletedAt: String(row?.deletedAt || "")
        }))
      : fallback.deletedAccounts;
    const rimInvites = Array.isArray(parsed.rimInvites)
      ? mergeStateCollectionsByKey(
          fallback.rimInvites,
          parsed.rimInvites,
          (row, idx) => String(row?.id || row?.email || `rim-${idx}`).trim().toLowerCase(),
          (row) => ({
            id: String(row?.id || ""),
            name: String(row?.name || ""),
            email: String(row?.email || ""),
            country: String(row?.country || ""),
            team: String(row?.team || ""),
            status: String(row?.status || "Draft")
          })
        )
      : fallback.rimInvites;
    const accessLevels = mergeStateCollectionsByKey(
      fallback.accessLevels,
      Array.isArray(parsed.accessLevels) ? parsed.accessLevels : [],
      (row, idx) => String(row?.code || `ACL-${idx}`).trim().toUpperCase(),
      (row) => ({
        code: String(row?.code || "").trim().toUpperCase(),
        title: String(row?.title || ""),
        access: String(row?.access || "")
      })
    );
    const shortcutCodes = mergeStateCollectionsByKey(
      fallback.shortcutCodes,
      Array.isArray(parsed.shortcutCodes) ? parsed.shortcutCodes : [],
      (row, idx) => String(row?.code || `CODE-${idx}`).trim().toUpperCase(),
      (row) => ({
        code: String(row?.code || "").trim().toUpperCase(),
        title: String(row?.title || ""),
        route: String(row?.route || ""),
        access: String(row?.access || "")
      })
    );
    return {
      ...fallback,
      ...parsed,
      dtsDocs,
      eamExpenses,
      ifsIncome,
      smca,
      ecsEmployees,
      rtaAssignments,
      rimInvites,
      socServices,
      lcsSessions,
      deletedAccounts,
      accessLevels,
      shortcutCodes,
      inbox
    };
  } catch (_) {
    return fallback;
  }
}

let sunrisePersistTimer = 0;
let sunrisePersistQueued = false;
const SUNRISE_PERSIST_DEBOUNCE_MS = 140;
let sunriseUnsavedModalPendingAction = null;

function snapshotSunriseControlState() {
  try {
    return JSON.stringify(sunriseControlState || {});
  } catch (_) {
    return "";
  }
}

function refreshSunriseDirtyFlag() {
  sunriseHasUnsavedChanges = snapshotSunriseControlState() !== sunriseCommittedStateHash;
  return sunriseHasUnsavedChanges;
}

function flushSunriseControlState() {
  if (!sunriseControlState) return;
  if (sunrisePersistTimer) {
    window.clearTimeout(sunrisePersistTimer);
    sunrisePersistTimer = 0;
  }
  sunrisePersistQueued = false;
  try {
    localStorage.setItem(SUNRISE_CONTROL_DATA_KEY, JSON.stringify(sunriseControlState));
  } catch (_) {}
  syncMonarchArchangelArchive({ immediate: true });
  persistAccountsData();
}

function queueSunriseControlStatePersist() {
  if (!sunriseControlState) return;
  sunrisePersistQueued = true;
  if (sunrisePersistTimer) return;
  sunrisePersistTimer = window.setTimeout(() => {
    sunrisePersistTimer = 0;
    if (!sunrisePersistQueued) return;
    flushSunriseControlState();
  }, SUNRISE_PERSIST_DEBOUNCE_MS);
}

function saveSunriseControlState(options = {}) {
  if (!sunriseControlState) return;
  syncRedTeamAssignmentsToClientAccounts();
  syncSocServicesToClientAccounts();
  const markDirty = options?.markDirty !== false;
  if (markDirty) {
    refreshSunriseDirtyFlag();
  } else {
    sunriseCommittedStateHash = snapshotSunriseControlState();
    sunriseHasUnsavedChanges = false;
  }
  if (options && options.immediate) {
    flushSunriseControlState();
    if (!markDirty) {
      sunriseCommittedStateHash = snapshotSunriseControlState();
      sunriseHasUnsavedChanges = false;
    } else {
      refreshSunriseDirtyFlag();
    }
  } else {
    queueSunriseControlStatePersist();
  }
  renderSunriseControlSummary();
  updateSunriseSaveButtonsState();
}

function commitSunriseChanges() {
  saveSunriseControlState({ immediate: true, markDirty: false });
}

function updateSunriseSaveButtonsState() {
  const buttons = document.querySelectorAll("[data-sunrise-save-changes]");
  buttons.forEach((btn) => {
    if (!(btn instanceof HTMLButtonElement)) return;
    btn.disabled = !sunriseHasUnsavedChanges;
    btn.textContent = sunriseHasUnsavedChanges ? "Save Changes" : "Saved";
  });
}

function ensureSunriseSaveButtons() {
  const sunriseMainPage = document.querySelector('.routePage[data-page="sunrise"]');
  if (sunriseMainPage) {
    sunriseMainPage.querySelectorAll("[data-sunrise-save-changes]").forEach((btn) => btn.remove());
  }
  const routes = [
    "sunrise-dts",
    "sunrise-eam",
    "sunrise-ifs",
    "sunrise-ecs",
    "sunrise-smca",
    "sunrise-rta",
    "sunrise-rim",
    "sunrise-soc",
    "sunrise-soc-details",
    "sunrise-inbox",
    "sunrise-lcs",
    "sunrise-amp",
    "sunrise-alp",
    "sunrise-mcc"
  ];
  routes.forEach((route) => {
    const page = document.querySelector(`.routePage[data-page="${route}"]`);
    if (!page) return;
    const actions = page.querySelector(".viewTop .viewActions");
    if (!actions) return;
    if (actions.querySelector("[data-sunrise-save-changes]")) return;
    const saveBtn = document.createElement("button");
    saveBtn.type = "button";
    saveBtn.className = "btn";
    saveBtn.setAttribute("data-sunrise-save-changes", "1");
    saveBtn.textContent = "Saved";
    actions.prepend(saveBtn);
  });
  updateSunriseSaveButtonsState();
}

function monarchArchiveCounts() {
  const records = monarchArchiveRecordsList();
  const counts = {
    total: records.length,
    credentials: 0,
    services: 0,
    operations: 0,
    payments: 0,
    mail: 0,
    logins: 0,
    changes: 0,
    deleted: 0
  };
  records.forEach((record) => {
    const category = String(record?.category || "").trim().toLowerCase();
    if (Object.prototype.hasOwnProperty.call(counts, category)) counts[category] += 1;
    if (record?.deletedInSource) counts.deleted += 1;
  });
  return counts;
}

function filteredMonarchArchiveRecords() {
  const category = String(monarchArchangelRuntime.filterCategory || "all").trim().toLowerCase();
  const query = String(monarchArchangelRuntime.filterQuery || "").trim().toLowerCase();
  return monarchArchiveRecordsList().filter((record) => {
    if (category !== "all" && String(record?.category || "").trim().toLowerCase() !== category) return false;
    if (!query) return true;
    const payloadText = JSON.stringify(record?.payload || {}).toLowerCase();
    return [
      record?.title,
      record?.summary,
      record?.sourceType,
      record?.sourceKey,
      record?.updatedAt,
      payloadText
    ].some((value) => String(value || "").toLowerCase().includes(query));
  });
}

function monarchFriendlyFieldLabel(key = "") {
  const source = String(key || "").trim();
  if (!source) return "Field";
  const withSpaces = source
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return withSpaces
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function encodeMonarchPointerSegment(segment = "") {
  return String(segment || "").replace(/~/g, "~0").replace(/\//g, "~1");
}

function decodeMonarchPointerSegment(segment = "") {
  return String(segment || "").replace(/~1/g, "/").replace(/~0/g, "~");
}

function monarchPointerFromSegments(segments = []) {
  const safe = Array.isArray(segments) ? segments : [];
  if (!safe.length) return "/";
  return `/${safe.map((segment) => encodeMonarchPointerSegment(segment)).join("/")}`;
}

function monarchPointerSegments(pointer = "") {
  const value = String(pointer || "").trim();
  if (!value || value === "/") return [];
  return value
    .replace(/^\//, "")
    .split("/")
    .map((segment) => decodeMonarchPointerSegment(segment));
}

function collectMonarchEditableFields(value = null, segments = [], list = []) {
  const pointer = monarchPointerFromSegments(segments);
  const pathLabel = segments.length
    ? segments.map((segment) => monarchFriendlyFieldLabel(segment)).join(" / ")
    : "Record Value";

  if (Array.isArray(value)) {
    if (!value.length) {
      if (!segments.length) return list;
      list.push({
        pointer,
        label: pathLabel,
        value: "",
        valueType: "text",
        isEmptyCollection: true
      });
      return list;
    }
    value.forEach((item, idx) => {
      collectMonarchEditableFields(item, [...segments, String(idx)], list);
    });
    return list;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value);
    if (!entries.length) {
      if (!segments.length) return list;
      list.push({
        pointer,
        label: pathLabel,
        value: "",
        valueType: "text",
        isEmptyCollection: true
      });
      return list;
    }
    entries.forEach(([key, item]) => {
      collectMonarchEditableFields(item, [...segments, key], list);
    });
    return list;
  }

  let valueType = "text";
  if (typeof value === "number" && Number.isFinite(value)) valueType = "number";
  else if (typeof value === "boolean") valueType = "boolean";

  list.push({
    pointer,
    label: pathLabel,
    value: value == null ? "" : String(value),
    valueType
  });
  return list;
}

function renderMonarchRecordFields(record = null) {
  const payload = monarchDeepClone(record?.payload || {});
  const fields = collectMonarchEditableFields(payload);
  if (!fields.length) {
    return `<article class="monarchRecordField full"><p class="profileNote">No editable values are available for this record.</p></article>`;
  }
  return fields.map((field, idx) => {
    const pointer = encodeHtmlEntities(String(field.pointer || "/"));
    const label = encodeHtmlEntities(String(field.label || "Field"));
    const value = encodeHtmlEntities(String(field.value || ""));
    if (field.valueType === "boolean") {
      return `<article class="monarchRecordField">
        <label for="monarch-record-field-${idx}">${label}</label>
        <select class="select" id="monarch-record-field-${idx}" data-monarch-field-pointer="${pointer}" data-monarch-field-type="boolean">
          <option value="true" ${field.value === "true" ? "selected" : ""}>Yes</option>
          <option value="false" ${field.value === "false" ? "selected" : ""}>No</option>
        </select>
      </article>`;
    }
    if (field.valueType === "number") {
      return `<article class="monarchRecordField">
        <label for="monarch-record-field-${idx}">${label}</label>
        <input class="input" id="monarch-record-field-${idx}" type="number" step="any" value="${value}" data-monarch-field-pointer="${pointer}" data-monarch-field-type="number" autocomplete="off">
      </article>`;
    }
    const longText = String(field.value || "").length > 120;
    const isFull = longText || field.isEmptyCollection;
    return `<article class="monarchRecordField${isFull ? " full" : ""}">
      <label for="monarch-record-field-${idx}">${label}</label>
      ${longText
        ? `<textarea class="input mailTextarea" id="monarch-record-field-${idx}" data-monarch-field-pointer="${pointer}" data-monarch-field-type="text" spellcheck="false">${value}</textarea>`
        : `<input class="input" id="monarch-record-field-${idx}" type="text" value="${value}" data-monarch-field-pointer="${pointer}" data-monarch-field-type="text" autocomplete="off">`}
    </article>`;
  }).join("");
}

function setMonarchPayloadValueAtPointer(rootPayload = {}, pointer = "/", nextValue = "") {
  const segments = monarchPointerSegments(pointer);
  if (!segments.length) return nextValue;
  const isIndex = (value) => /^\d+$/.test(String(value || ""));
  let cursor = rootPayload;
  for (let i = 0; i < segments.length - 1; i += 1) {
    const segment = segments[i];
    const nextSegment = segments[i + 1];
    if (Array.isArray(cursor)) {
      const idx = Number(segment);
      if (!Number.isInteger(idx) || idx < 0) return rootPayload;
      if (!cursor[idx] || typeof cursor[idx] !== "object") {
        cursor[idx] = isIndex(nextSegment) ? [] : {};
      }
      cursor = cursor[idx];
      continue;
    }
    if (!cursor || typeof cursor !== "object") return rootPayload;
    if (!Object.prototype.hasOwnProperty.call(cursor, segment) || !cursor[segment] || typeof cursor[segment] !== "object") {
      cursor[segment] = isIndex(nextSegment) ? [] : {};
    }
    cursor = cursor[segment];
  }
  const lastSegment = segments[segments.length - 1];
  if (Array.isArray(cursor)) {
    const idx = Number(lastSegment);
    if (!Number.isInteger(idx) || idx < 0) return rootPayload;
    cursor[idx] = nextValue;
    return rootPayload;
  }
  if (!cursor || typeof cursor !== "object") return rootPayload;
  cursor[lastSegment] = nextValue;
  return rootPayload;
}

function readMonarchRecordPayloadFromForm(record = null) {
  const fieldsRoot = document.getElementById("monarch-record-fields");
  if (!(fieldsRoot instanceof HTMLElement)) {
    return { ok: false, message: "Record fields are unavailable.", payload: null };
  }
  const payload = monarchDeepClone(record?.payload || {});
  const controls = Array.from(fieldsRoot.querySelectorAll("[data-monarch-field-pointer]"));
  for (const control of controls) {
    if (!(control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement || control instanceof HTMLSelectElement)) continue;
    const pointer = String(control.getAttribute("data-monarch-field-pointer") || "/").trim();
    const fieldType = String(control.getAttribute("data-monarch-field-type") || "text").trim().toLowerCase();
    const rawValue = String(control.value || "");
    let parsedValue = rawValue;
    if (fieldType === "boolean") {
      parsedValue = rawValue === "true";
    } else if (fieldType === "number") {
      if (!rawValue.trim()) {
        parsedValue = 0;
      } else {
        const numeric = Number(rawValue);
        if (!Number.isFinite(numeric)) {
          return { ok: false, message: "Numeric fields must contain valid numbers.", payload: null };
        }
        parsedValue = numeric;
      }
    }
    setMonarchPayloadValueAtPointer(payload, pointer, parsedValue);
  }
  return { ok: true, message: "Record fields captured.", payload };
}

function canRestoreMonarchArchiveRecord(record = null) {
  if (!record?.deletedInSource) return false;
  const sourceType = String(record?.sourceType || "").trim();
  return sourceType === "account"
    || sourceType === "rta"
    || sourceType === "rim"
    || sourceType === "ecs"
    || sourceType === "eam"
    || sourceType === "ifs"
    || sourceType === "smca"
    || sourceType === "lcs"
    || sourceType === "mail"
    || sourceType === "access-level"
    || sourceType === "shortcut-code"
    || sourceType.startsWith("soc-");
}

function canEraseMonarchArchiveRecord(record = null) {
  if (!record || record.deletedInSource) return false;
  const sourceType = String(record?.sourceType || "").trim();
  return sourceType === "account"
    || sourceType === "rta"
    || sourceType === "rim"
    || sourceType === "ecs"
    || sourceType === "eam"
    || sourceType === "ifs"
    || sourceType === "smca"
    || sourceType === "lcs"
    || sourceType === "mail"
    || sourceType === "access-level"
    || sourceType === "shortcut-code"
    || sourceType.startsWith("soc-");
}

function monarchRecordSourceActionConfig(record = null) {
  if (!record) return { hidden: true, label: "", mode: "" };
  if (record.deletedInSource) {
    if (!canRestoreMonarchArchiveRecord(record)) return { hidden: true, label: "", mode: "" };
    return { hidden: false, label: "Restore to Sunrise", mode: "restore" };
  }
  if (!canEraseMonarchArchiveRecord(record)) return { hidden: true, label: "", mode: "" };
  return { hidden: false, label: "Erase from Sunrise", mode: "erase" };
}

function isMonarchRecordRestrictedForOperator(record = null, operator = getCurrentSunriseOperator() || activeAccount || null) {
  if (!record || !isAleksOwnerAccount(operator)) return false;
  const sourceType = String(record.sourceType || "").trim().toLowerCase();
  if (sourceType === "account") {
    if (isMikhailCredentialAccount(record.sourceKey || "")) return true;
    return isMikhailCredentialAccount(record.payload || null);
  }
  if (String(record.category || "").trim().toLowerCase() !== "credentials") return false;
  const haystack = JSON.stringify({
    title: record.title,
    summary: record.summary,
    sourceKey: record.sourceKey,
    payload: record.payload
  }).toLowerCase();
  return haystack.includes("mikhail")
    || haystack.includes("coo@vvs.com")
    || haystack.includes("mikhail.kovalev@vvs.com")
    || haystack.includes("mikhail.sunrise@vvs.com");
}

function resolveMonarchRecordForOperator(recordId = "", { setRestrictedMessage = false } = {}) {
  const record = findMonarchArchiveRecord(recordId);
  if (!record) return null;
  if (!isMonarchRecordRestrictedForOperator(record)) return record;
  if (setRestrictedMessage) {
    monarchArchangelRuntime.info = "Access Restricted.";
  }
  return null;
}

function updateMonarchRecordSourceAction(record = null) {
  const actionBtn = document.getElementById("monarch-record-restore");
  if (!(actionBtn instanceof HTMLButtonElement)) return;
  const action = monarchRecordSourceActionConfig(record);
  actionBtn.hidden = action.hidden;
  if (!action.hidden) {
    actionBtn.textContent = action.label;
    actionBtn.dataset.monarchSourceMode = action.mode;
  } else {
    actionBtn.textContent = "Restore to Sunrise";
    delete actionBtn.dataset.monarchSourceMode;
  }
}

function openMonarchRecordOverlay(recordId = "") {
  const overlay = document.getElementById("monarch-record-overlay");
  const record = resolveMonarchRecordForOperator(recordId, { setRestrictedMessage: true });
  if (!overlay || !record) return;
  monarchArchangelRuntime.detailsRecordId = String(recordId || "").trim();
  const titleEl = document.getElementById("monarch-record-title");
  const summaryEl = document.getElementById("monarch-record-summary");
  const metaEl = document.getElementById("monarch-record-meta");
  const fieldsEl = document.getElementById("monarch-record-fields");
  const infoEl = document.getElementById("monarch-record-info");
  if (titleEl) titleEl.textContent = String(record.title || "Archive Record").trim();
  if (summaryEl) summaryEl.textContent = String(record.summary || "Archive snapshot").trim();
  if (metaEl) metaEl.textContent = `${String(record.category || "").trim()} • ${String(record.sourceType || "").trim()} • ${String(record.updatedAt || "").trim()}`;
  if (fieldsEl instanceof HTMLElement) fieldsEl.innerHTML = renderMonarchRecordFields(record);
  updateMonarchRecordSourceAction(record);
  if (infoEl) infoEl.textContent = "";
  overlay.hidden = false;
}

function closeMonarchRecordOverlay() {
  const overlay = document.getElementById("monarch-record-overlay");
  if (overlay) overlay.hidden = true;
}

function openMonarchCredentialOverlay() {
  const overlay = document.getElementById("monarch-credential-overlay");
  const body = document.getElementById("monarch-credential-body");
  const info = document.getElementById("monarch-credential-info");
  if (!overlay || !body) return;
  const operator = getCurrentSunriseOperator() || activeAccount || null;
  if (!isMikhailOwnerAccount(operator)) {
    if (info) info.textContent = "Access restricted.";
    return;
  }
  const aleks = monarchOwnerAccessProfile("AO1");
  if (!aleks) return;
  body.innerHTML = `<div class="monarchCredentialVault">
    <label class="monarchCredentialVaultRow">
      <span>Owner</span>
      <b>${aleks.ownerName}</b>
    </label>
    <label class="monarchCredentialVaultRow">
      <span>MA Owner Code</span>
      <input class="input" id="monarch-credential-code" type="text" value="${encodeHtmlEntities(String(aleks.code || "").trim())}" autocomplete="off">
    </label>
    <label class="monarchCredentialVaultRow">
      <span>MA Password</span>
      <input class="input" id="monarch-credential-password" type="text" value="${encodeHtmlEntities(String(aleks.password || "").trim())}" autocomplete="off">
    </label>
    <label class="monarchCredentialVaultRow">
      <span>Required NOTOS ID</span>
      <input class="input" id="monarch-credential-notos" type="text" value="${encodeHtmlEntities(String(aleks.notosId || "").trim())}" autocomplete="off">
    </label>
  </div>`;
  if (info) info.textContent = "Mikhail-only vault access. Changes update Aleks MONARCH ARCHANGEL credentials only.";
  overlay.hidden = false;
}

function closeMonarchCredentialOverlay() {
  const overlay = document.getElementById("monarch-credential-overlay");
  if (overlay) overlay.hidden = true;
}

function saveMonarchOwnerCredentials(operatorCode = "", updates = {}) {
  const code = String(operatorCode || "").trim().toUpperCase();
  const base = MONARCH_ARCHANGEL_OWNER_ACCESS[code] || null;
  if (!base) return { ok: false, message: "Owner vault not found." };
  if (!monarchArchangelState.ownerCredentials || typeof monarchArchangelState.ownerCredentials !== "object") {
    monarchArchangelState.ownerCredentials = {};
  }
  monarchArchangelState.ownerCredentials[code] = {
    ...((monarchArchangelState.ownerCredentials[code] && typeof monarchArchangelState.ownerCredentials[code] === "object")
      ? monarchArchangelState.ownerCredentials[code]
      : {}),
    code: String(updates.code || base.code || "").trim(),
    password: String(updates.password || base.password || "").trim(),
    notosId: String(updates.notosId || base.notosId || "").trim()
  };
  monarchArchangelState.updatedAt = formatUtcTimestamp(new Date());
  markMonarchUnsaved("MONARCH ARCHANGEL owner credential changes staged.");
  return { ok: true, message: "Aleks MONARCH ARCHANGEL credentials staged. Click Save Changes to commit." };
}

function upsertRecordInCollection(list, payload, resolveKey) {
  if (!Array.isArray(list)) return;
  const key = String(resolveKey(payload) || "").trim().toLowerCase();
  if (!key) return;
  const existingIdx = list.findIndex((row) => String(resolveKey(row) || "").trim().toLowerCase() === key);
  if (existingIdx >= 0) list[existingIdx] = monarchDeepClone(payload);
  else list.unshift(monarchDeepClone(payload));
}

function removeRecordsFromCollection(list, predicate) {
  if (!Array.isArray(list)) return 0;
  let removed = 0;
  for (let idx = list.length - 1; idx >= 0; idx -= 1) {
    if (!predicate(list[idx], idx)) continue;
    list.splice(idx, 1);
    removed += 1;
  }
  return removed;
}

function restoreMonarchArchiveRecord(recordId = "") {
  const record = findMonarchArchiveRecord(recordId);
  if (!record) return { ok: false, message: "Archive record not found." };
  const payload = monarchDeepClone(record.payload);
  const sourceType = String(record.sourceType || "").trim();
  if (!payload || typeof payload !== "object") return { ok: false, message: "Archive payload is invalid." };

  if (sourceType === "account") {
    const key = normalizeEmailAddress(payload.email || record.sourceKey || "");
    if (!key) return { ok: false, message: "Account email is required for restore." };
    accounts[key] = normalizeAccountServiceCards(payload);
    persistAccountsData();
    syncMonarchArchangelArchive({ immediate: true });
    return { ok: true, message: "Account restored to VVS and AMP." };
  }

  if (!sunriseControlState) return { ok: false, message: "Sunrise storage is unavailable." };

  if (sourceType === "rta") {
    ensureRtaAssignmentsStore();
    upsertRecordInCollection(sunriseControlState.rtaAssignments, normalizeRtaAssignment(payload), (row) => row?.clientKey);
    saveSunriseControlState({ immediate: true, markDirty: false });
    return { ok: true, message: "RTA record restored to Sunrise." };
  }
  if (sourceType === "rim") {
    upsertRecordInCollection(sunriseControlState.rimInvites, payload, (row) => row?.id || row?.email);
    saveSunriseControlState({ immediate: true, markDirty: false });
    return { ok: true, message: "RIM record restored to Sunrise." };
  }
  if (sourceType === "ecs") {
    upsertRecordInCollection(sunriseControlState.ecsEmployees, payload, (row) => row?.id || row?.email);
    saveSunriseControlState({ immediate: true, markDirty: false });
    return { ok: true, message: "ECS employee restored to Sunrise." };
  }
  if (sourceType === "eam") {
    upsertRecordInCollection(sunriseControlState.eamExpenses, payload, (row) => row?.id);
    saveSunriseControlState({ immediate: true, markDirty: false });
    return { ok: true, message: "Expense record restored to Sunrise." };
  }
  if (sourceType === "ifs") {
    upsertRecordInCollection(sunriseControlState.ifsIncome, payload, (row) => row?.id);
    saveSunriseControlState({ immediate: true, markDirty: false });
    return { ok: true, message: "Income record restored to Sunrise." };
  }
  if (sourceType === "smca") {
    upsertRecordInCollection(sunriseControlState.smca, payload, (row) => row?.id);
    saveSunriseControlState({ immediate: true, markDirty: false });
    return { ok: true, message: "Commission record restored to Sunrise." };
  }
  if (sourceType === "lcs") {
    upsertRecordInCollection(sunriseControlState.lcsSessions, payload, (row) => row?.id);
    saveSunriseControlState({ immediate: true, markDirty: false });
    return { ok: true, message: "NOTOS session restored to Sunrise." };
  }
  if (sourceType === "mail") {
    const inbox = sunriseControlState.inbox || {};
    if (!Array.isArray(inbox.messages)) inbox.messages = [];
    upsertRecordInCollection(inbox.messages, payload, (row) => row?.id);
    sunriseControlState.inbox = inbox;
    saveSunriseControlState({ immediate: true, markDirty: false });
    return { ok: true, message: "Mail record restored to Sunrise inbox storage." };
  }
  if (sourceType === "access-level") {
    upsertRecordInCollection(sunriseControlState.accessLevels, payload, (row) => row?.code);
    saveSunriseControlState({ immediate: true, markDirty: false });
    return { ok: true, message: "Access level restored to ALP." };
  }
  if (sourceType === "shortcut-code") {
    ensureShortcutCodeRegistry();
    upsertRecordInCollection(sunriseControlState.shortcutCodes, payload, (row) => row?.code);
    saveSunriseControlState({ immediate: true, markDirty: false });
    return { ok: true, message: "Shortcut code restored to MCC." };
  }
  if (sourceType.startsWith("soc-")) {
    const bucket = sourceType.replace("soc-", "");
    const targetList = Array.isArray(sunriseControlState?.socServices?.[bucket]) ? sunriseControlState.socServices[bucket] : null;
    if (!targetList) return { ok: false, message: "SOC collection is unavailable." };
    upsertRecordInCollection(targetList, payload, (row) => row?.id);
    saveSunriseControlState({ immediate: true, markDirty: false });
    return { ok: true, message: "SOC service restored to Sunrise." };
  }

  return { ok: false, message: "This archive type is view-only." };
}

function eraseMonarchArchiveRecordFromSource(recordId = "") {
  const record = findMonarchArchiveRecord(recordId);
  if (!record) return { ok: false, message: "Archive record not found." };
  if (record.deletedInSource) return { ok: false, message: "This record is already erased from Sunrise." };
  if (!canEraseMonarchArchiveRecord(record)) return { ok: false, message: "Erase action is unavailable for this source." };
  const payload = monarchDeepClone(record.payload);
  const sourceType = String(record.sourceType || "").trim();

  if (sourceType === "account") {
    const key = resolveAccountKey(payload?.email || record.sourceKey || "");
    if (!key || !accounts[key]) return { ok: false, message: "Account is already erased from Sunrise." };
    moveAccountsToDeletedBucket(key);
    persistAccountsData();
    saveSunriseControlState({ immediate: true, markDirty: false });
    syncMonarchArchangelArchive({ immediate: true });
    return { ok: true, message: "Account erased from Sunrise and secured in MONARCH ARCHANGEL vault." };
  }

  if (!sunriseControlState) return { ok: false, message: "Sunrise storage is unavailable." };
  let removed = 0;

  if (sourceType === "rta") {
    const key = String(payload?.clientKey || record.sourceKey || "").trim().toLowerCase();
    removed = removeRecordsFromCollection(sunriseControlState.rtaAssignments, (row) => String(row?.clientKey || "").trim().toLowerCase() === key);
  } else if (sourceType === "rim") {
    const key = String(payload?.id || payload?.email || record.sourceKey || "").trim().toLowerCase();
    removed = removeRecordsFromCollection(sunriseControlState.rimInvites, (row) => {
      const rowKey = String(row?.id || row?.email || "").trim().toLowerCase();
      return rowKey === key;
    });
  } else if (sourceType === "ecs") {
    const key = String(payload?.id || payload?.email || record.sourceKey || "").trim().toLowerCase();
    removed = removeRecordsFromCollection(sunriseControlState.ecsEmployees, (row) => {
      const rowKey = String(row?.id || row?.email || "").trim().toLowerCase();
      return rowKey === key;
    });
  } else if (sourceType === "eam") {
    const key = String(payload?.id || record.sourceKey || "").trim();
    removed = removeRecordsFromCollection(sunriseControlState.eamExpenses, (row) => String(row?.id || "").trim() === key);
  } else if (sourceType === "ifs") {
    const key = String(payload?.id || record.sourceKey || "").trim();
    removed = removeRecordsFromCollection(sunriseControlState.ifsIncome, (row) => String(row?.id || "").trim() === key);
  } else if (sourceType === "smca") {
    const key = String(payload?.id || record.sourceKey || "").trim();
    removed = removeRecordsFromCollection(sunriseControlState.smca, (row) => String(row?.id || "").trim() === key);
  } else if (sourceType === "lcs") {
    const key = String(payload?.id || record.sourceKey || "").trim();
    removed = removeRecordsFromCollection(sunriseControlState.lcsSessions, (row) => String(row?.id || "").trim() === key);
  } else if (sourceType === "mail") {
    const key = String(payload?.id || record.sourceKey || "").trim();
    const inbox = sunriseControlState.inbox || {};
    if (!Array.isArray(inbox.messages)) inbox.messages = [];
    removed += removeRecordsFromCollection(inbox.messages, (row) => String(row?.id || "").trim() === key);
    sunriseControlState.inbox = inbox;
    if (Array.isArray(sunriseOwnerInboxState.messages)) {
      removed += removeRecordsFromCollection(sunriseOwnerInboxState.messages, (row) => String(row?.id || "").trim() === key);
    }
    if (String(sunriseControlState?.inbox?.selectedMessageId || "").trim() === key) {
      sunriseControlState.inbox.selectedMessageId = "";
    }
  } else if (sourceType === "access-level") {
    const key = String(payload?.code || record.sourceKey || "").trim().toUpperCase();
    removed = removeRecordsFromCollection(sunriseControlState.accessLevels, (row) => String(row?.code || "").trim().toUpperCase() === key);
  } else if (sourceType === "shortcut-code") {
    const key = String(payload?.code || record.sourceKey || "").trim().toUpperCase();
    removed = removeRecordsFromCollection(sunriseControlState.shortcutCodes, (row) => String(row?.code || "").trim().toUpperCase() === key);
  } else if (sourceType.startsWith("soc-")) {
    const bucket = sourceType.replace("soc-", "");
    const targetList = Array.isArray(sunriseControlState?.socServices?.[bucket]) ? sunriseControlState.socServices[bucket] : null;
    if (!targetList) return { ok: false, message: "SOC collection is unavailable." };
    const key = String(payload?.id || record.sourceKey || "").trim().toUpperCase();
    removed = removeRecordsFromCollection(targetList, (row) => String(row?.id || "").trim().toUpperCase() === key);
  }

  if (!removed) return { ok: false, message: "No live Sunrise entry found for this record." };
  saveSunriseControlState({ immediate: true, markDirty: false });
  syncMonarchArchangelArchive({ immediate: true });
  return { ok: true, message: "Record erased from Sunrise and retained in MONARCH ARCHANGEL vault." };
}

function saveMonarchArchiveRecord(recordId = "", nextPayload = null) {
  const record = findMonarchArchiveRecord(recordId);
  if (!record) return { ok: false, message: "Archive record not found." };
  if (!nextPayload || typeof nextPayload !== "object") {
    return { ok: false, message: "Record values are invalid." };
  }
  const parsed = monarchDeepClone(nextPayload);
  record.payload = parsed;
  record.summary = monarchArchiveSummaryFromPayload(record.sourceType, parsed);
  record.manualOverride = true;
  record.updatedAt = formatUtcTimestamp(new Date());
  monarchArchangelState.updatedAt = record.updatedAt;
  markMonarchUnsaved("MONARCH ARCHANGEL record changes staged.");
  return { ok: true, message: "Record changes staged. Click Save Changes to commit." };
}

function deleteMonarchArchiveRecord(recordId = "") {
  const id = String(recordId || "").trim();
  if (!id || !monarchArchangelState?.records?.[id]) return { ok: false, message: "Archive record not found." };
  delete monarchArchangelState.records[id];
  monarchArchangelState.updatedAt = formatUtcTimestamp(new Date());
  persistMonarchArchangelState();
  if (monarchArchangelRuntime.detailsRecordId === id) monarchArchangelRuntime.detailsRecordId = "";
  return { ok: true, message: "Archive record deleted." };
}

function renderMonarchArchiveCards(records = []) {
  if (!Array.isArray(records) || !records.length) {
    return `<article class="monarchArchiveEmpty"><p>No archive records match the current filter.</p></article>`;
  }
  const operator = getCurrentSunriseOperator() || activeAccount || null;
  return records.map((record) => {
    if (isMonarchRecordRestrictedForOperator(record, operator)) {
      return `<article class="monarchArchiveCard isRestricted">
      <div class="monarchArchiveCardTop">
        <div>
          <p class="monarchArchiveEyebrow">Credentials</p>
          <h4>Restricted Credential Record</h4>
        </div>
        <span class="monarchArchiveFlag">Restricted</span>
      </div>
      <p class="monarchArchiveSummary">Access Restricted.</p>
      <div class="monarchArchiveMeta">
        <span>credentials</span>
        <span>restricted</span>
        <span>${encodeHtmlEntities(String(record?.updatedAt || "").trim())}</span>
      </div>
      <div class="viewActions monarchArchiveActions">
        <button class="sunriseMiniBtn" type="button" data-monarch-details="${encodeHtmlEntities(record.id)}">Details</button>
      </div>
    </article>`;
    }
    const deletedClass = record?.deletedInSource ? " isDeleted" : "";
    const deletedLabel = record?.deletedInSource ? `<span class="monarchArchiveFlag">Deleted in Sunrise</span>` : `<span class="monarchArchiveFlag isLive">Live</span>`;
    const sourceAction = monarchRecordSourceActionConfig(record);
    const sourceActionMarkup = sourceAction.hidden
      ? ""
      : `<button class="sunriseMiniBtn" type="button" data-monarch-source-action="${encodeHtmlEntities(record.id)}" data-monarch-source-mode="${encodeHtmlEntities(sourceAction.mode)}">${sourceAction.label}</button>`;
    return `<article class="monarchArchiveCard${deletedClass}">
      <div class="monarchArchiveCardTop">
        <div>
          <p class="monarchArchiveEyebrow">${String(record?.category || "").trim()}</p>
          <h4>${encodeHtmlEntities(String(record?.title || "Archive Record").trim())}</h4>
        </div>
        ${deletedLabel}
      </div>
      <p class="monarchArchiveSummary">${encodeHtmlEntities(String(record?.summary || "Archive snapshot").trim())}</p>
      <div class="monarchArchiveMeta">
        <span>${encodeHtmlEntities(String(record?.sourceType || "").trim())}</span>
        <span>${encodeHtmlEntities(String(record?.sourceKey || "").trim())}</span>
        <span>${encodeHtmlEntities(String(record?.updatedAt || "").trim())}</span>
      </div>
      <div class="viewActions monarchArchiveActions">
        <button class="sunriseMiniBtn" type="button" data-monarch-details="${encodeHtmlEntities(record.id)}">Details</button>
        ${sourceActionMarkup}
        <button class="sunriseMiniBtn" type="button" data-monarch-delete="${encodeHtmlEntities(record.id)}">Delete</button>
      </div>
    </article>`;
  }).join("");
}

function updateMonarchSaveButtonsState() {
  const buttons = document.querySelectorAll("#monarch-save-btn, #monarch-save-top-btn");
  buttons.forEach((btn) => {
    if (!(btn instanceof HTMLButtonElement)) return;
    btn.disabled = !monarchArchangelRuntime.hasUnsavedChanges;
    btn.textContent = monarchArchangelRuntime.hasUnsavedChanges ? "Save Changes" : "Saved";
  });
}

function markMonarchUnsaved(message = "") {
  monarchArchangelRuntime.hasUnsavedChanges = true;
  if (message) monarchArchangelRuntime.info = String(message || "").trim();
  updateMonarchSaveButtonsState();
}

function commitMonarchArchangelChanges() {
  commitSunriseChanges();
  syncMonarchArchangelArchive({ immediate: true });
  persistMonarchArchangelState();
  monarchArchangelRuntime.hasUnsavedChanges = false;
  monarchArchangelRuntime.info = "MONARCH ARCHANGEL changes saved.";
  updateMonarchSaveButtonsState();
}

function renderMonarchArchangelPage() {
  const grid = document.getElementById("sunrise-monarch-grid");
  const saveTopBtn = document.getElementById("monarch-save-top-btn");
  if (!grid) return;
  const operator = getCurrentSunriseOperator() || activeAccount || null;
  const ownerProfile = currentMonarchOwnerProfile(operator);
  if (!ownerProfile) {
    if (saveTopBtn) {
      saveTopBtn.hidden = true;
      saveTopBtn.disabled = true;
      saveTopBtn.removeAttribute("data-monarch-save-changes");
    }
    grid.innerHTML = `<article class="sunriseControlCard sunriseDetailWide"><h3>MONARCH ARCHANGEL</h3><p class="profileNote">Owner access only.</p></article>`;
    return;
  }

  if (!monarchArchangelRuntime.hasUnsavedChanges) {
    syncMonarchArchangelArchive({ immediate: true });
  }
  const counts = monarchArchiveCounts();
  if (!monarchArchangelRuntime.unlocked || monarchArchangelRuntime.ownerOperatorCode !== ownerProfile.operatorCode) {
    if (saveTopBtn) {
      saveTopBtn.hidden = true;
      saveTopBtn.disabled = true;
      saveTopBtn.removeAttribute("data-monarch-save-changes");
    }
    grid.innerHTML = `<article class="sunriseControlCard sunriseDetailWide monarchLoginCard">
      <h3>MONARCH ARCHANGEL ACCESS</h3>
      <p class="profileNote">Guardian archive access requires the owner code, MA password, and active NOTOS ID.</p>
      <form class="authGrid" id="monarch-auth-form" novalidate>
        <div class="field">
          <label for="monarch-owner-code">Owner Code</label>
          <input class="input" id="monarch-owner-code" type="text" autocomplete="off">
        </div>
        <div class="field">
          <label for="monarch-owner-password">MA Password</label>
          <input class="input" id="monarch-owner-password" type="password" autocomplete="off">
        </div>
        <div class="field full">
          <label for="monarch-owner-notos">NOTOS ID</label>
          <input class="input" id="monarch-owner-notos" type="text" autocomplete="off">
        </div>
        <div class="viewActions"><button class="btn primary" type="submit">Unlock MONARCH ARCHANGEL</button></div>
      </form>
      <p class="authInfo" id="monarch-auth-info">${encodeHtmlEntities(String(monarchArchangelRuntime.info || "").trim())}</p>
    </article>`;
    return;
  }
  if (monarchArchangelRuntime.detailsRecordId) {
    const activeRecord = findMonarchArchiveRecord(monarchArchangelRuntime.detailsRecordId);
    if (!activeRecord || isMonarchRecordRestrictedForOperator(activeRecord, operator)) {
      monarchArchangelRuntime.detailsRecordId = "";
      closeMonarchRecordOverlay();
    }
  }
  if (saveTopBtn) {
    saveTopBtn.hidden = false;
    saveTopBtn.setAttribute("data-monarch-save-changes", "1");
  }

  const records = filteredMonarchArchiveRecords();
  const categoryButtons = [
    ["all", "All Records"],
    ["credentials", "Credentials"],
    ["services", "Services"],
    ["operations", "Operations"],
    ["payments", "Payments"],
    ["mail", "Mail"],
    ["logins", "Logins"],
    ["changes", "Changes"]
  ].map(([key, label]) => `<button class="sunriseMiniBtn ${monarchArchangelRuntime.filterCategory === key ? "isActive" : ""}" type="button" data-monarch-category="${key}">${label}</button>`).join("");
  const mikhailVault = ownerProfile.operatorCode === "MO1"
    ? `<article class="sunriseControlCard sunriseDetailWide monarchExecutiveCard">
        <div class="monarchExecutiveTop">
          <div>
            <p class="ampSectionEyebrow">Executive Vault</p>
            <h3>Aleks MA Credentials</h3>
            <p class="profileNote">Separate Aleks credential window available only inside Mikhail's MONARCH ARCHANGEL session.</p>
          </div>
          <button class="btn ghost" type="button" id="monarch-open-aleks-vault">Open Aleks Vault</button>
        </div>
      </article>`
    : "";
  grid.innerHTML = `<section class="monarchShell monarchShellUnlocked sunriseDetailWide">
    <article class="monarchHero">
      <div>
        <p class="monarchKicker">Owner-only archive</p>
        <h2>MONARCH ARCHANGEL</h2>
        <p class="profileNote">Guardian archive for Sunrise and VVS records, credentials, services, payments, mail, and login intelligence.</p>
      </div>
      <div class="monarchHeroActions">
        <button class="btn ghost" type="button" id="monarch-save-btn" data-monarch-save-changes="1">Save Changes</button>
        <button class="btn ghost" type="button" id="monarch-lock-btn">Lock</button>
      </div>
    </article>
    <section class="monarchStatsGrid">
      <article class="monarchStatCard"><span>Archive Records</span><b>${counts.total}</b></article>
      <article class="monarchStatCard"><span>Credentials</span><b>${counts.credentials}</b></article>
      <article class="monarchStatCard"><span>Services</span><b>${counts.services}</b></article>
      <article class="monarchStatCard"><span>Operations</span><b>${counts.operations}</b></article>
      <article class="monarchStatCard"><span>Payments</span><b>${counts.payments}</b></article>
      <article class="monarchStatCard"><span>Mail / Logins</span><b>${counts.mail + counts.logins}</b></article>
      <article class="monarchStatCard"><span>Change Trace</span><b>${counts.changes}</b></article>
      <article class="monarchStatCard"><span>Deleted in Source</span><b>${counts.deleted}</b></article>
    </section>
    ${mikhailVault}
    <article class="sunriseControlCard sunriseDetailWide monarchControlCard">
      <div class="monarchControlBar">
        <input class="input" id="monarch-search" placeholder="Search title, source, payload, or timestamp" value="${encodeHtmlEntities(monarchArchangelRuntime.filterQuery)}">
        <button class="sunriseMiniBtn" type="button" data-monarch-search>Search</button>
      </div>
      <div class="sunriseSectionTabs monarchTabs">${categoryButtons}</div>
      <p class="profileNote">Archive sync ${encodeHtmlEntities(String(monarchArchangelState?.updatedAt || "").trim() || "pending")}.</p>
      <p class="authInfo">${encodeHtmlEntities(String(monarchArchangelRuntime.info || "").trim())}</p>
    </article>
    <section class="monarchArchiveGrid">${renderMonarchArchiveCards(records)}</section>
  </section>`;
  updateMonarchSaveButtonsState();
}

function parseSunriseScheduleInput(rawValue = "") {
  const value = String(rawValue || "").trim();
  if (!value) return { ok: true, formatted: "" };
  const m = value.match(/^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2})\/(\d{2})\/(\d{2})$/);
  if (!m) return { ok: false, formatted: "" };
  const day = Number(m[1]);
  const month = Number(m[2]);
  const year = Number(m[3]);
  const hour = Number(m[4]);
  const minute = Number(m[5]);
  const second = Number(m[6]);
  if (month < 1 || month > 12 || day < 1 || day > 31 || hour > 23 || minute > 59 || second > 59) {
    return { ok: false, formatted: "" };
  }
  return { ok: true, formatted: `${m[1]}/${m[2]}/${m[3]} ${m[4]}/${m[5]}/${m[6]}` };
}

function shouldBlockRouteForUnsavedSunriseChanges(nextRoute) {
  const current = currentVisibleRoute();
  const inSunriseNow = current === "sunrise" || sunriseModuleRoutes.includes(current);
  if (!inSunriseNow) return false;
  const normalized = String(nextRoute || "").trim();
  const stayingInSameRoute = normalized === current;
  if (current === "sunrise-inbox") {
    if (!hasPendingInboxChanges()) return false;
    return !stayingInSameRoute;
  }
  if (!sunriseHasUnsavedChanges) return false;
  if (!refreshSunriseDirtyFlag()) {
    updateSunriseSaveButtonsState();
    return false;
  }
  return !stayingInSameRoute;
}

function openSunriseUnsavedModal(onResolve) {
  const overlay = document.getElementById("sunrise-unsaved-overlay");
  if (!overlay) {
    if (typeof onResolve === "function") onResolve("cancel");
    return;
  }
  sunriseUnsavedModalPendingAction = onResolve;
  overlay.hidden = false;
}

function resolveSunriseUnsavedModal(action) {
  const overlay = document.getElementById("sunrise-unsaved-overlay");
  if (overlay) overlay.hidden = true;
  const cb = sunriseUnsavedModalPendingAction;
  sunriseUnsavedModalPendingAction = null;
  if (typeof cb === "function") cb(action);
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
  setText("sum-rta-pending", String(rtaPendingCount()));
  setText("sum-soc-current", String(((sunriseControlState.socServices || {}).current || []).length));
  setText("sum-lcs-count", String((sunriseControlState.lcsSessions || []).length));
}

function renderDTSPage() {
  const grid = document.getElementById("sunrise-dts-grid");
  if (!grid || !sunriseControlState) return;
  const rows = (sunriseControlState.dtsDocs || []).map((doc, idx) => `
    <tr><td><input class="input" data-dts-id="${idx}" value="${doc.id || ""}"></td><td><input class="input" data-dts-name="${idx}" value="${doc.name || ""}"></td><td><input class="input" data-dts-note="${idx}" value="${doc.note || ""}"></td><td><select class="select" data-dts-status="${idx}"><option ${doc.status==="Pending"?"selected":""}>Pending</option><option ${doc.status==="Submitted"?"selected":""}>Submitted</option><option ${doc.status==="Approved"?"selected":""}>Approved</option></select></td><td><button class="sunriseMiniBtn" type="button" data-dts-del="${idx}">Delete</button></td></tr>
  `).join("");
  grid.innerHTML = `<article class="sunriseControlCard sunriseDetailWide"><h3>Upload / Edit Documents</h3><input class="input" id="dts-upload" type="file" multiple><table class="sunriseControlTable"><thead><tr><th>ID</th><th>Document</th><th>Note</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows || "<tr><td colspan='5'>No documents yet.</td></tr>"}</tbody></table></article><article class="sunriseControlCard sunriseDetailWide"><h3>Sunrise PDF Redactor (Demo)</h3><div class="sunriseInboxMiniBar"><button class="sunriseMiniBtn" type="button" data-dts-editor-style="title">Title</button><button class="sunriseMiniBtn" type="button" data-dts-editor-style="subtitle">Subtitle</button><button class="sunriseMiniBtn" type="button" data-dts-editor-style="body">Body</button><button class="sunriseMiniBtn" type="button" data-dts-editor-cmd="bold"><b>B</b></button><button class="sunriseMiniBtn" type="button" data-dts-editor-cmd="italic"><i>I</i></button><button class="sunriseMiniBtn" type="button" data-dts-editor-cmd="underline"><u>U</u></button></div><div id="dts-editor" class="sunriseInboxEditor" contenteditable="true"><p>Load document summary and adjust content, notes, and signing blocks here.</p></div><div class="sunriseControlActions"><button class="sunriseMiniBtn" type="button" data-dts-editor-save>Save Notes</button></div><canvas id="dts-signature-pad" width="800" height="170" style="width:100%;border:1px solid rgba(223,167,131,.28);border-radius:12px;background:rgba(8,8,10,.45);"></canvas><div class="sunriseControlActions"><button class="sunriseMiniBtn" type="button" data-dts-sign-clear>Clear Signature</button></div></article>`;
}

function initDtsSignaturePad() {
  const canvas = document.getElementById("dts-signature-pad");
  if (!(canvas instanceof HTMLCanvasElement) || canvas.dataset.boundPad === "1") return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.strokeStyle = "rgba(238,179,127,.95)";
  ctx.lineWidth = 2.1;
  ctx.lineCap = "round";
  let drawing = false;
  const point = (event) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;
    return { x: (clientX - rect.left) * (canvas.width / rect.width), y: (clientY - rect.top) * (canvas.height / rect.height) };
  };
  const start = (event) => {
    drawing = true;
    const p = point(event);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  };
  const move = (event) => {
    if (!drawing) return;
    const p = point(event);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  };
  const end = () => { drawing = false; };
  canvas.addEventListener("mousedown", start);
  canvas.addEventListener("mousemove", move);
  window.addEventListener("mouseup", end);
  canvas.addEventListener("touchstart", start, { passive: true });
  canvas.addEventListener("touchmove", move, { passive: true });
  window.addEventListener("touchend", end, { passive: true });
  canvas.dataset.boundPad = "1";
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
      <td><select class="select" data-ecs-division="${idx}">${staffDivisionOrder.map((division) => `<option ${normalizeStaffDivision(row.division, row.position) === division ? "selected" : ""}>${division}</option>`).join("")}</select></td>
      <td><input class="input" data-ecs-rta="${idx}" value="${normalizeRtaRoles(row.rtaRoles, row.position).map((role) => rtaRoleLabel(role)).join(", ")}" placeholder="Fleet, Driver, Concierge, Head of Security"></td>
      <td><select class="select" data-ecs-status="${idx}"><option ${row.status==="Active"?"selected":""}>Active</option><option ${row.status==="Promoted"?"selected":""}>Promoted</option><option ${row.status==="Fired"?"selected":""}>Fired</option></select></td>
      <td><input class="input" data-ecs-email="${idx}" value="${row.email || ""}"></td><td><input class="input" data-ecs-login="${idx}" value="${row.login || ""}"></td>
      <td><input class="input" data-ecs-permission="${idx}" value="${row.permission || ""}"></td>
      <td><button class="sunriseMiniBtn" type="button" data-ecs-mail="${idx}">Email</button><button class="sunriseMiniBtn" type="button" data-ecs-del="${idx}">Delete</button></td>
    </tr>
  `).join("");
  grid.innerHTML = `<article class="sunriseControlCard sunriseDetailWide"><h3>Employees Control System</h3><table class="sunriseControlTable"><thead><tr><th>ID</th><th>Name</th><th>Salary</th><th>Hours</th><th>Bonus</th><th>Comm%</th><th>Position</th><th>Division</th><th>Red Team Role</th><th>Status</th><th>Email</th><th>Login</th><th>Permission</th><th>Actions</th></tr></thead><tbody>${rows}</tbody></table><div class="sunriseControlActions"><button class="sunriseMiniBtn" type="button" data-ecs-add>Add Employee</button></div></article>`;
}

function renderRTAPage() {
  const grid = document.getElementById("sunrise-rta-grid");
  if (!grid || !sunriseControlState) return;
  ensureRtaAssignmentsStore();
  const assignments = redMemberAccountEntries().map(([key, account]) => findRtaAssignmentByClientKey(key) || buildSeedRtaAssignmentFromAccount(key, account));
  const approved = canApproveRtaAssignment();
  const canSwitch = canManageRtaSwitch();
  const canEmpty = canEmptyRtaTeam();
  const cards = assignments.map((assignment) => {
    const clientKey = String(assignment.clientKey || "").trim().toLowerCase();
    const client = accounts[clientKey] || null;
    const domKey = clientKey.replace(/[^a-z0-9]+/gi, "-");
    const clientName = assignment.clientName || `${String(client?.firstName || "").trim()} ${String(client?.lastName || "").trim()}`.trim();
    const currentStatus = normalizeRtaAssignmentStatus(assignment.status);
    const pendingAction = normalizeRtaPendingAction(assignment.pendingAction);
    const statusClass = currentStatus === "Confirmed"
      ? "isConfirmed"
      : (currentStatus === "Pending Confirmation" ? "isPending" : "isUnassigned");
    const selectForRole = (role) => {
      const fieldKey = `${role}StaffKey`;
      const selected = String(assignment[fieldKey] || "").trim().toLowerCase();
      const selectedAccount = accounts[selected] || null;
      const options = rtaEligibleStaffEntries(role).map(([staffKey, staffAccount]) => {
        const label = buildRtaTeamOptionLabel(staffAccount, role);
        return `<option value="${staffKey}" ${selected === staffKey ? "selected" : ""}>${label}</option>`;
      }).join("");
      const detail = selectedAccount
        ? `<p class="sunriseRtaRoleMeta">${[
            String(selectedAccount.email || "").trim().toLowerCase(),
            String(selectedAccount.phone || "").trim()
          ].filter(Boolean).join(" · ")}</p>`
        : `<p class="sunriseRtaRoleMeta">No ${rtaRoleLabel(role).toLowerCase()} selected.</p>`;
      return `<label class="sunriseRtaRoleCard"><span class="sunriseRtaRoleLabel">${rtaRoleLabel(role)}</span><select class="select sunriseRtaSelect" id="rta-${role}-${domKey}"><option value="">Select ${rtaRoleLabel(role)}</option>${options}</select>${detail}</label>`;
    };
    const statusMeta = currentStatus === "Pending Confirmation"
      ? (pendingAction === "switch"
        ? "Team switch is waiting for DA, CA, or Owner confirmation."
        : (pendingAction === "clear"
          ? "Team removal is waiting for CA or Owner confirmation."
          : "Waiting for DA, CA, or Owner confirmation before publication to the client account."))
      : (currentStatus === "Confirmed" ? "Team is active and already visible on the client account page." : "No team has been assigned yet.");
    const auditParts = buildRtaAuditEntries(assignment);
    const credentials = [
      assignment.clientEmail || client?.email || "",
      assignment.clientPhone || client?.phone || "",
      formatOptionalCountryDisplay(assignment.clientCountry || client?.country || "")
    ].filter(Boolean);
    const primaryAction = currentStatus === "Confirmed"
      ? (canSwitch ? `<button class="sunriseMiniBtn sunriseRtaActionBtn" type="button" data-rta-switch="${clientKey}">Initiate Team Switch</button>` : "")
      : `<button class="sunriseMiniBtn sunriseRtaActionBtn" type="button" data-rta-save="${clientKey}">${approved ? "Assign Team" : "Submit for Confirmation"}</button>`;
    const showEmpty = hasAnyRtaSelection(rtaSelectionFromAssignment(assignment)) || hasAnyRtaSelection(rtaPublishedSelectionFromAssignment(assignment));
    return `<article class="sunriseControlCard sunriseDetailWide sunriseRtaCard">
      <div class="sunriseRtaCardTop">
        <div>
          <p class="sunriseRtaEyebrow">Voyager Red Member</p>
          <h3 class="sunriseRtaClientName">${clientName || "Voyager Red Member"}</h3>
          <p class="sunriseRtaClientTier">${String(assignment.tier || client?.membership || "Voyager Red").trim()}</p>
        </div>
        <div class="sunriseRtaStatusWrap">
          <span class="sunriseRtaBadge ${statusClass}">${currentStatus}</span>
          <p class="sunriseRtaStatusText">${statusMeta}</p>
        </div>
      </div>
      <div class="sunriseRtaInfoStrip">
        ${credentials.length ? credentials.map((item) => `<span>${item}</span>`).join("") : "<span>No client credentials stored yet.</span>"}
      </div>
      <div class="sunriseRtaRolesGrid">
        ${selectForRole("fleet")}
        ${selectForRole("driver")}
        ${selectForRole("concierge")}
        ${selectForRole("security")}
      </div>
      <div class="sunriseRtaFoot">
        <div class="sunriseRtaAudit">
          <div class="sunriseRtaAuditTop">
            <div>
              <p class="sunriseRtaSectionLabel">Assignment Audit</p>
              <p class="sunriseRtaAuditHint">${auditParts.length ? `${auditParts.length} logged change${auditParts.length === 1 ? "" : "s"} available.` : "No activity recorded yet."}</p>
            </div>
            <button class="sunriseMiniBtn sunriseRtaAuditBtn" type="button" data-rta-audit="${clientKey}">Open Audit</button>
          </div>
        </div>
        <div class="sunriseRtaActions">
          ${primaryAction}
          ${approved && currentStatus === "Pending Confirmation" && (pendingAction !== "clear" || canEmpty) ? `<button class="sunriseMiniBtn sunriseRtaActionBtn" type="button" data-rta-confirm="${clientKey}">Confirm</button>` : ""}
          ${canSwitch && currentStatus === "Confirmed" ? `<button class="sunriseMiniBtn sunriseRtaActionBtn isWarn" type="button" data-rta-revoke="${clientKey}">Revoke Confirmation</button>` : ""}
          ${canEmpty && showEmpty ? `<button class="sunriseMiniBtn sunriseRtaActionBtn isDanger" type="button" data-rta-empty="${clientKey}">Empty Team</button>` : ""}
        </div>
      </div>
    </article>`;
  }).join("");
  grid.innerHTML = `<article class="sunriseControlCard sunriseDetailWide sunriseRtaHero">
    <div class="sunriseRtaHeroTop">
      <div>
        <h3>Red Team Assigning Menu</h3>
        <p class="opsText">Assign Fleet, Driver, Concierge, and Head of Security for each Voyager Red member. Confirmed teams publish to the client account automatically.</p>
      </div>
      <div class="sunriseRtaStatGrid">
        <div class="sunriseRtaStat"><span>Voyager Red Members</span><b>${assignments.length}</b></div>
        <div class="sunriseRtaStat"><span>Pending Confirmation</span><b>${rtaPendingCount()}</b></div>
        <div class="sunriseRtaStat"><span>Confirmed Teams</span><b>${assignments.filter((row) => normalizeRtaAssignmentStatus(row.status) === "Confirmed").length}</b></div>
      </div>
    </div>
    <p class="authInfo" id="rta-info"></p>
  </article>
  <section class="sunriseRtaBoard">
    ${cards || `<article class="sunriseControlCard sunriseDetailWide"><p class="profileNote">No Voyager Red members available.</p></article>`}
  </section>`;
}

function renderRIMPage() {
  const grid = document.getElementById("sunrise-rim-grid");
  if (!grid || !sunriseControlState) return;
  const rows = (sunriseControlState.rimInvites || []).map((row, idx) => `<tr><td><input class="input" data-rim-id="${idx}" value="${row.id || ""}"></td><td><input class="input" data-rim-name="${idx}" value="${row.name || ""}"></td><td><input class="input" data-rim-email="${idx}" value="${row.email || ""}"></td><td><input class="input" data-rim-country="${idx}" value="${row.country || ""}"></td><td><select class="select" data-rim-status="${idx}"><option ${row.status==="Draft"?"selected":""}>Draft</option><option ${row.status==="Sent"?"selected":""}>Sent</option><option ${row.status==="Accepted"?"selected":""}>Accepted</option></select></td><td><button class="sunriseMiniBtn" type="button" data-rim-del="${idx}">Delete</button></td></tr>`).join("");
  grid.innerHTML = `<article class="sunriseControlCard sunriseDetailWide"><h3>Red Invitation Register</h3><p class="opsText">Track invitation records without internal team assignment fields.</p><table class="sunriseControlTable"><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Country</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows || "<tr><td colspan='6'>No invitations available.</td></tr>"}</tbody></table><div class="sunriseControlActions"><button class="sunriseMiniBtn" type="button" data-rim-add>Add Invitation</button></div></article>`;
}

function renderSOCPage() {
  const grid = document.getElementById("sunrise-soc-grid");
  if (!grid || !sunriseControlState) return;
  const soc = sunriseControlState.socServices || { current: [], past: [], deleted: [] };
  const renderRows = (bucket, restoreMode = false) => (soc[bucket] || []).map((row, idx) => `<tr><td><input class="input" data-soc-id="${bucket}:${idx}" value="${row.id || ""}"></td><td><input class="input" data-soc-title="${bucket}:${idx}" value="${row.title || ""}"></td><td><input class="input" data-soc-client="${bucket}:${idx}" value="${row.client || ""}"></td><td><select class="select" data-soc-tier="${bucket}:${idx}"><option ${row.tier==="Non-Member"?"selected":""}>Non-Member</option><option ${row.tier==="Voyager Cuprum"?"selected":""}>Voyager Cuprum</option><option ${row.tier==="Voyager Argentum"?"selected":""}>Voyager Argentum</option><option ${row.tier==="Voyager Aurum"?"selected":""}>Voyager Aurum</option><option ${row.tier==="Voyager Platinum"?"selected":""}>Voyager Platinum</option><option ${row.tier==="Voyager Diamante"?"selected":""}>Voyager Diamante</option><option ${row.tier==="Voyager Noir"?"selected":""}>Voyager Noir</option><option ${row.tier==="Voyager Red"?"selected":""}>Voyager Red</option></select></td><td><select class="select" data-soc-desired="${bucket}:${idx}"><option ${row.desiredExecutionTime==="Instant"?"selected":""}>Instant</option><option ${row.desiredExecutionTime==="24h"?"selected":""}>24h</option><option ${row.desiredExecutionTime==="48h"?"selected":""}>48h</option><option ${row.desiredExecutionTime==="72h"?"selected":""}>72h</option><option ${row.desiredExecutionTime==="Within a week"?"selected":""}>Within a week</option><option ${row.desiredExecutionTime==="Within a month"?"selected":""}>Within a month</option><option ${row.desiredExecutionTime==="2 months"?"selected":""}>2 months</option><option ${row.desiredExecutionTime==="3 months"?"selected":""}>3 months</option><option ${row.desiredExecutionTime==="6 months"?"selected":""}>6 months</option></select></td><td><input class="input" data-soc-assigned="${bucket}:${idx}" value="${row.assigned || ""}"></td><td><input class="input" data-soc-assigned-at="${bucket}:${idx}" value="${row.assignedAt || ""}" placeholder="YYYY-MM-DD HH:MM TZ"></td><td><input class="input" data-soc-confirmed-at="${bucket}:${idx}" value="${row.confirmedAt || ""}" placeholder="YYYY-MM-DD HH:MM TZ"></td><td><select class="select" data-soc-status="${bucket}:${idx}"><option ${row.status==="Awaiting Confirmation"?"selected":""}>Awaiting Confirmation</option><option ${row.status==="Assigned"?"selected":""}>Assigned</option><option ${row.status==="Confirmed"?"selected":""}>Confirmed</option><option ${row.status==="Closed"?"selected":""}>Closed</option></select></td><td>${restoreMode ? `<button class="sunriseMiniBtn" type="button" data-soc-restore="${idx}">Restore</button>` : `<button class="sunriseMiniBtn" type="button" data-soc-delete="${bucket}:${idx}">Delete</button><button class="sunriseMiniBtn" type="button" data-soc-open="${row.id}">Details</button>`}</td></tr>`).join("");
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
  const clientCredentials = resolveSocClientCredentials(selected);
  const steps = Array.isArray(selected.steps) ? selected.steps : [];
  const stepRows = steps.map((step, idx) => `<tr><td><input class="input" data-socd-step-id="${idx}" value="${step.id || `S${idx + 1}`}"></td><td><input class="input" data-socd-action="${idx}" value="${step.action || ""}"></td><td><input class="input" data-socd-details="${idx}" value="${step.details || ""}"></td><td><select class="select" data-socd-status="${idx}"><option ${step.status==="Pending"?"selected":""}>Pending</option><option ${step.status==="In Progress"?"selected":""}>In Progress</option><option ${step.status==="Done"?"selected":""}>Done</option><option ${step.status==="Blocked"?"selected":""}>Blocked</option></select></td><td><button class="sunriseMiniBtn" type="button" data-socd-del="${idx}">Delete</button></td></tr>`).join("");
  grid.innerHTML = `<article class="sunriseControlCard sunriseDetailWide"><h3>Core Service Profile</h3><table class="sunriseControlTable"><tbody><tr><th style="width:220px;">Service ID</th><td><input class="input" data-socd-id value="${selected.id || ""}"></td></tr><tr><th>Service Title</th><td><input class="input" data-socd-title value="${selected.title || ""}"></td></tr><tr><th>Client</th><td><input class="input" data-socd-client value="${selected.client || ""}"></td></tr><tr><th>Client Title</th><td><input class="input" data-socd-client-title value="${clientCredentials.clientTitle || ""}"></td></tr><tr><th>Client Email</th><td><input class="input" data-socd-client-email value="${clientCredentials.clientEmail || ""}"></td></tr><tr><th>Client Phone</th><td><input class="input" data-socd-client-phone value="${clientCredentials.clientPhone || ""}"></td></tr><tr><th>Client Country</th><td><input class="input" data-socd-client-country value="${clientCredentials.clientCountry || ""}"></td></tr><tr><th>Preferred Contact</th><td><select class="select" data-socd-client-contact><option value="" ${!clientCredentials.preferredContactMethod?"selected":""}>Not set</option><option value="email" ${clientCredentials.preferredContactMethod==="email"?"selected":""}>Email</option><option value="phone" ${clientCredentials.preferredContactMethod==="phone"?"selected":""}>Phone</option></select></td></tr><tr><th>Client Tier</th><td><select class="select" data-socd-tier><option ${selected.tier==="Non-Member"?"selected":""}>Non-Member</option><option ${selected.tier==="Voyager Cuprum"?"selected":""}>Voyager Cuprum</option><option ${selected.tier==="Voyager Argentum"?"selected":""}>Voyager Argentum</option><option ${selected.tier==="Voyager Aurum"?"selected":""}>Voyager Aurum</option><option ${selected.tier==="Voyager Platinum"?"selected":""}>Voyager Platinum</option><option ${selected.tier==="Voyager Diamante"?"selected":""}>Voyager Diamante</option><option ${selected.tier==="Voyager Noir"?"selected":""}>Voyager Noir</option><option ${selected.tier==="Voyager Red"?"selected":""}>Voyager Red</option></select></td></tr><tr><th>Desired Execution Time</th><td><select class="select" data-socd-desired><option ${selected.desiredExecutionTime==="Instant"?"selected":""}>Instant</option><option ${selected.desiredExecutionTime==="24h"?"selected":""}>24h</option><option ${selected.desiredExecutionTime==="48h"?"selected":""}>48h</option><option ${selected.desiredExecutionTime==="72h"?"selected":""}>72h</option><option ${selected.desiredExecutionTime==="Within a week"?"selected":""}>Within a week</option><option ${selected.desiredExecutionTime==="Within a month"?"selected":""}>Within a month</option><option ${selected.desiredExecutionTime==="2 months"?"selected":""}>2 months</option><option ${selected.desiredExecutionTime==="3 months"?"selected":""}>3 months</option><option ${selected.desiredExecutionTime==="6 months"?"selected":""}>6 months</option></select></td></tr><tr><th>Assigned Concierge / Team</th><td><input class="input" data-socd-assigned value="${selected.assigned || ""}"></td></tr><tr><th>Assigned At</th><td><input class="input" data-socd-assigned-at value="${selected.assignedAt || ""}" placeholder="YYYY-MM-DD HH:MM TZ"></td></tr><tr><th>Confirmed At</th><td><input class="input" data-socd-confirmed-at value="${selected.confirmedAt || ""}" placeholder="YYYY-MM-DD HH:MM TZ"></td></tr><tr><th>Status</th><td><select class="select" data-socd-status-main><option ${selected.status==="Awaiting Confirmation"?"selected":""}>Awaiting Confirmation</option><option ${selected.status==="Assigned"?"selected":""}>Assigned</option><option ${selected.status==="Confirmed"?"selected":""}>Confirmed</option><option ${selected.status==="Closed"?"selected":""}>Closed</option></select></td></tr><tr><th>Service Description</th><td><textarea class="input mailTextarea" data-socd-description>${selected.description || ""}</textarea></td></tr></tbody></table></article><article class="sunriseControlCard sunriseDetailWide"><h3>Step-by-Step Actions</h3><table class="sunriseControlTable"><thead><tr><th>Step</th><th>Action</th><th>Concrete Details</th><th>Status</th><th>Action</th></tr></thead><tbody>${stepRows || "<tr><td colspan='5'>No steps yet.</td></tr>"}</tbody></table><div class="sunriseControlActions"><button class="sunriseMiniBtn" type="button" data-socd-add-step>Add Step</button></div></article>`;
}

function renderLCSPage(filter = "") {
  const grid = document.getElementById("sunrise-lcs-grid");
  if (!grid || !sunriseControlState) return;
  (sunriseControlState.lcsSessions || []).forEach((row) => {
    if (Number(row?.loginTs || 0) > 0 && !Number(row?.logoutTs || 0)) updateNotosSessionDuration(row);
  });
  const rows = (sunriseControlState.lcsSessions || []).map((row, originalIdx) => ({ row, originalIdx })).filter(({ row }) => matchesSearch([
    row.id, row.code, row.employee, row.loginAt, row.logoutAt, row.session, row.path, row.permission
  ], filter)).map(({ row, originalIdx }) => {
    const timelineCount = Array.isArray(row.pathTimeline) ? row.pathTimeline.length : 0;
    return `<tr><td><input class="input" data-lcs-id="${originalIdx}" value="${row.id || ""}"></td><td><input class="input" data-lcs-code="${originalIdx}" value="${row.code || ""}"></td><td><input class="input" data-lcs-employee="${originalIdx}" value="${row.employee || ""}"></td><td><input class="input" data-lcs-login="${originalIdx}" value="${row.loginAt || ""}"></td><td><input class="input" data-lcs-logout="${originalIdx}" value="${row.logoutAt || ""}"></td><td><input class="input" data-lcs-session="${originalIdx}" value="${row.session || ""}"></td><td><input class="input" data-lcs-path="${originalIdx}" value="${row.path || ""}"><button class="sunriseMiniBtn" type="button" data-lcs-path-open="${originalIdx}">${timelineCount} steps</button></td><td><input class="input" data-lcs-permission="${originalIdx}" value="${row.permission || ""}"></td><td><button class="sunriseMiniBtn" type="button" data-lcs-del="${originalIdx}">Delete</button></td></tr>`;
  }).join("");
  grid.innerHTML = `<article class="sunriseControlCard sunriseDetailWide"><h3>Notos Login Control System</h3><div class="sunriseControlActions"><input class="input" id="lcs-search" placeholder="Search any value, use / to narrow" value="${filter.replace(/"/g, "&quot;")}"><button class="sunriseMiniBtn" type="button" data-lcs-search>Search</button><button class="sunriseMiniBtn" type="button" data-lcs-add>Add Session</button></div><table class="sunriseControlTable"><thead><tr><th>ID</th><th>Code</th><th>Employee</th><th>Login</th><th>Logout</th><th>Session</th><th>Path</th><th>Permission</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></article>`;
}

function searchTokens(query = "") {
  return String(query || "").toLowerCase().split("/").map((part) => part.trim()).filter(Boolean);
}

function matchesSearch(rowValues = [], query = "") {
  const tokens = searchTokens(query);
  if (!tokens.length) return true;
  const hay = rowValues.map((v) => String(v || "").toLowerCase()).join(" | ");
  return tokens.every((token) => hay.includes(token));
}

const sunriseAdminViewState = {
  ampSection: "customers",
  alpSection: "customers"
};

let sunriseAdminRenderQueued = false;

function scheduleSunriseAdminRenders() {
  if (sunriseAdminRenderQueued) return;
  sunriseAdminRenderQueued = true;
  window.setTimeout(() => {
    sunriseAdminRenderQueued = false;
    const ampQuery = String(document.getElementById("amp-search")?.value || "").trim();
    const alpQuery = String(document.getElementById("alp-search")?.value || "").trim();
    const mccQuery = String(document.getElementById("mcc-search")?.value || "").trim();
    renderAMPPage(ampQuery);
    renderALPPage(alpQuery);
    renderMCCPage(mccQuery);
    syncSunriseDockCodesPreview(ensureShortcutCodeRegistry());
  }, 60);
}

function normalizeAdminSection(value) {
  const v = String(value || "").trim().toLowerCase();
  if (v === "staff") return "staff";
  if (v === "deleted") return "deleted";
  return "customers";
}

function resolveAccountKey(raw = "") {
  const direct = String(raw || "").trim().toLowerCase();
  if (direct && accounts[direct]) return direct;
  const byEmail = Object.keys(accounts).find((key) => {
    const email = String(accounts[key]?.email || "").trim().toLowerCase();
    return !!direct && email === direct;
  });
  return byEmail || direct;
}

function isStaffAccountForAdmin(account) {
  if (!account) return false;
  if (isOwnerAccount(account)) return true;
  const membership = String(account.membership || "").trim().toLowerCase();
  if (membership === "staff" || membership === "owner") return true;
  return !!String(account.sunriseAccessLevel || "").trim();
}

function sunriseHierarchyOrder() {
  return ["OW", "CA", "DA", "SM", "SS", "SA", "STA"];
}

function hierarchySortIndex(code = "") {
  const idx = sunriseHierarchyOrder().indexOf(String(code || "").trim().toUpperCase());
  return idx >= 0 ? idx : 999;
}

function staffAccessCode(account) {
  if (isOwnerAccount(account)) return "OW";
  return String(account?.sunriseAccessLevel || "STA").trim().toUpperCase();
}

function ampStaffGroupName(account) {
  if (isOwnerAccount(account)) return "Owners";
  if (staffAccessCode(account) === "CA") return "Headquarters";
  return normalizeStaffDivision(account?.staffDivision, account?.roleTitle);
}

function ampStaffGroupDescription(group = "") {
  if (group === "Owners") return "Executive owner identities and primary control accounts.";
  if (group === "Headquarters") return "Strategic leadership and command-level staff roles.";
  if (group === "Office") return "Directorate office roles and linked Sunrise access accounts.";
  if (group === "Field") return "Deployment-side staff for movement, protection, and on-ground execution.";
  if (group === "Special Requests") return "Special handling staff for concierge-intensive and bespoke execution.";
  return "Operational staff accounts.";
}

function sunriseAccessMetaByCode(code = "") {
  const normalized = String(code || "").trim().toUpperCase();
  if (normalized === "CR") {
    return {
      code: "CR",
      title: "Creator",
      access: "Creator command authority + MONARCH ARCHANGEL + full Sunrise executive archive oversight"
    };
  }
  const row = Array.isArray(sunriseControlState?.accessLevels)
    ? sunriseControlState.accessLevels.find((item) => String(item?.code || "").trim().toUpperCase() === normalized)
    : null;
  return {
    code: normalized || "STA",
    title: String(row?.title || normalized || "Staff").trim(),
    access: String(row?.access || "").trim()
  };
}

function findSunriseCredentialEmailForBaseKey(baseKey = "", account = null) {
  const key = String(baseKey || "").trim().toLowerCase();
  if (!key) return "";
  const linked = Object.entries(accounts).find(([candidateKey, candidateAccount]) => {
    if (!candidateAccount?.sunriseCredential) return false;
    return String(candidateAccount.sunriseLinkedEmail || "").trim().toLowerCase() === key
      || String(candidateKey || "").trim().toLowerCase() === preferredSunriseEmailForBase(key, account || accounts[key] || null);
  });
  return linked ? String(linked[0] || "").trim().toLowerCase() : preferredSunriseEmailForBase(key, account || accounts[key] || null);
}

function choosePreferredAmpEntry(entries = [], preferredKey = "") {
  return entries
    .slice()
    .sort((a, b) => {
      const aKey = String(a?.[0] || "").trim().toLowerCase();
      const bKey = String(b?.[0] || "").trim().toLowerCase();
      const preferred = String(preferredKey || "").trim().toLowerCase();
      const aScore = aKey === preferred ? 0 : (aKey.startsWith("office.") ? 1 : (aKey.includes(".totev@") || aKey.includes(".kovalev@") ? 1 : 2));
      const bScore = bKey === preferred ? 0 : (bKey.startsWith("office.") ? 1 : (bKey.includes(".totev@") || bKey.includes(".kovalev@") ? 1 : 2));
      if (aScore !== bScore) return aScore - bScore;
      return aKey.localeCompare(bKey);
    })[0] || null;
}

function canonicalizeAmpStaffEntries(entries = []) {
  const ownersByPerson = new Map();
  const officeByAccess = new Map();
  const passthrough = [];

  entries.forEach((entry) => {
    const [key, account] = entry;
    if (!account) return;
    if (isOwnerAccount(account)) {
      const fullName = `${String(account.firstName || "").trim()} ${String(account.lastName || "").trim()}`.trim().toLowerCase() || String(key || "").trim().toLowerCase();
      if (!ownersByPerson.has(fullName)) ownersByPerson.set(fullName, []);
      ownersByPerson.get(fullName).push(entry);
      return;
    }
    if (ampStaffGroupName(account) === "Office") {
      const accessCode = staffAccessCode(account) || "STA";
      if (!officeByAccess.has(accessCode)) officeByAccess.set(accessCode, []);
      officeByAccess.get(accessCode).push(entry);
      return;
    }
    passthrough.push(entry);
  });

  const canonicalOwners = Array.from(ownersByPerson.entries())
    .map(([personKey, ownerEntries]) => choosePreferredAmpEntry(ownerEntries, ampOwnerPreferredKeys[personKey] || ""))
    .filter(Boolean);
  const canonicalOffice = sunriseHierarchyOrder()
    .filter((code) => code !== "OW")
    .map((code) => {
      const officeEntries = officeByAccess.get(code) || [];
      if (!officeEntries.length) return null;
      return choosePreferredAmpEntry(officeEntries, ampOfficePreferredKeys[code] || "");
    })
    .filter(Boolean);

  return [...canonicalOwners, ...canonicalOffice, ...passthrough];
}

function renderAmpOwnerCards(entries = []) {
  if (!Array.isArray(entries) || !entries.length) return "";
  const cards = entries.map(([key, account]) => {
    const editable = canEditAmpOwnerAccount(key);
    const canViewSensitive = canViewAmpOwnerSensitiveFields(key);
    const fullName = `${String(account?.firstName || "").trim()} ${String(account?.lastName || "").trim()}`.trim() || "Owner";
    const roleTitle = String(account?.roleTitle || "Owner").trim();
    const titleValue = String(account?.prefix || "").trim();
    const vvsLogin = String(account?.email || key || "").trim().toLowerCase();
    const sunriseLogin = findSunriseCredentialEmailForBaseKey(key, account);
    const sunriseAccount = sunriseLogin && accounts[sunriseLogin] ? accounts[sunriseLogin] : null;
    const phone = String(account?.phone || "").trim();
    const country = formatOptionalCountryDisplay(account?.country || "");
    const secretPhrase = canViewSensitive ? String(account?.secretPhrase || "") : "Restricted";
    const vvsValue = vvsLogin || "Not stored";
    const sunriseValue = canViewSensitive ? String(sunriseLogin || "Not linked").trim().toLowerCase() : "Restricted";
    const phoneValue = canViewSensitive ? (phone || "Not stored") : "Restricted";
    const countryValue = country || "Not stored";
    const passwordValue = canViewSensitive ? String(account?.password || "") : "Restricted";
    const notosValue = canViewSensitive
      ? String(sunriseAccount?.notosId || account?.notosId || resolveSunriseOwnerCode(account) || "OW").trim().toUpperCase()
      : "Restricted";
    const mutableAttr = (attr) => editable ? `${attr}="${key}"` : "readonly";
    return `<article class="ampOwnerCard">
      <div class="ampOwnerCardTop">
        <div>
          <p class="ampSectionEyebrow">Owner</p>
          <h4>${fullName}</h4>
          <p class="ampOwnerRole">${roleTitle}</p>
        </div>
        <span class="ampHierarchyCode">OW</span>
      </div>
      <div class="ampOwnerMetaRow">
        <span class="ampOwnerMetaChip"><b>VVS</b> ${vvsValue}</span>
        <span class="ampOwnerMetaChip"><b>Sunrise</b> ${sunriseValue}</span>
        <span class="ampOwnerMetaChip"><b>Country</b> ${countryValue}</span>
      </div>
      <div class="ampOwnerGrid">
        <div class="ampOwnerField"><span>Preferred Title</span><input class="input" ${mutableAttr("data-amp-title")} value="${titleValue}"></div>
        <div class="ampOwnerField"><span>Full Name</span><input class="input" ${mutableAttr("data-amp-name")} value="${fullName}"></div>
        <div class="ampOwnerField"><span>Position</span><input class="input" ${mutableAttr("data-amp-role")} value="${roleTitle}"></div>
        <div class="ampOwnerField"><span>VVS Email</span><input class="input" ${editable ? `data-amp-email="${key}"` : "readonly"} value="${vvsValue}"></div>
        <div class="ampOwnerField"><span>Sunrise Email</span><input class="input" ${editable ? `data-amp-sunrise-email="${key}"` : "readonly"} value="${sunriseValue}"></div>
        <div class="ampOwnerField"><span>Phone</span><input class="input" ${editable ? `data-amp-phone="${key}"` : "readonly"} value="${phoneValue}"></div>
        <div class="ampOwnerField"><span>Country</span><input class="input" ${editable ? `data-amp-country="${key}"` : "readonly"} value="${countryValue}"></div>
        <div class="ampOwnerField"><span>Password</span><input class="input" ${editable ? `data-amp-password="${key}"` : "readonly"} value="${passwordValue}"></div>
        <div class="ampOwnerField"><span>Secret Phrase</span><input class="input" ${editable ? `data-amp-secret="${key}"` : "readonly"} value="${secretPhrase}"></div>
        <div class="ampOwnerField"><span>NOTOS ID</span><input class="input" ${editable ? `data-amp-notos="${key}"` : "readonly"} value="${notosValue}"></div>
      </div>
    </article>`;
  }).join("");
  return `<div class="ampOwnerGridWrap">${cards}</div>`;
}

function renderAmpOfficeHierarchy(entries = []) {
  const directorateEntries = (Array.isArray(entries) ? entries : []).filter(([, account]) => staffAccessCode(account) === "DA");
  if (!directorateEntries.length) return "";
  const cards = directorateEntries.map(([key, account]) => {
    const accessMeta = sunriseAccessMetaByCode(staffAccessCode(account));
    const fullName = `${String(account?.firstName || "").trim()} ${String(account?.lastName || "").trim()}`.trim() || "Staff Member";
    const position = String(account?.roleTitle || "Staff").trim();
    const sunriseLogin = findSunriseCredentialEmailForBaseKey(key, account);
    const accessLine = accessMeta.access || accessMeta.title;
    return `<article class="ampHierarchyCard">
      <span class="ampHierarchyCode">${accessMeta.code}</span>
      <b>${position}</b>
      <p>${fullName}</p>
      <span class="ampHierarchyMeta">${accessLine}</span>
      <div class="ampHierarchyCredentials">
        <span><b>VVS</b> ${String(account?.email || key || "").trim().toLowerCase()}</span>
        <span><b>Sunrise</b> ${sunriseLogin}</span>
      </div>
    </article>`;
  }).join("");
  return `<div class="ampOfficeHierarchy">
    <div class="ampOfficeHierarchyTop">
      <span class="ampOfficeHierarchyTitle">Directorate Access</span>
      <span class="ampOfficeHierarchySummary">${directorateEntries.length} linked role${directorateEntries.length === 1 ? "" : "s"}</span>
    </div>
    <div class="ampHierarchyGrid">${cards}</div>
  </div>`;
}

function renderAmpActivityFeed() {
  const rows = recentSharedRegistryActivities(18);
  const status = sharedAccountRegistryState.available
    ? (sharedAccountRegistryState.lastSyncedAt ? `Live sync ${sharedAccountRegistryState.lastSyncedAt}` : "Live sync active")
    : "Shared sync pending";
  const body = rows.length
    ? rows.map((row) => {
      const email = String(row.email || "").trim().toLowerCase();
      const account = accounts[resolveAccountKey(email)] || findAccountByEmail(email);
      const fullName = account
        ? `${String(account.firstName || "").trim()} ${String(account.lastName || "").trim()}`.trim()
        : "";
      const location = sharedRegistryActivityLocation(row);
      const browser = sharedRegistryActivityBrowser(row);
      return `<article class="ampActivityRow">
        <div class="ampActivityIdentity">
          <b>${fullName || email || "Unknown Account"}</b>
          <span>${email || "No email recorded"}</span>
        </div>
        <div class="ampActivityMeta">
          <span class="ampActivityType">${humanizeRegistryEventType(row.eventType)}</span>
          <span>${String(row.system || "vvs").toUpperCase()}</span>
          <span>${location}</span>
          <span>${browser}</span>
          <span>${String(row.occurredAt || "").trim() || "Pending timestamp"}</span>
        </div>
      </article>`;
    }).join("")
    : `<p class="profileNote">No shared signup or login activity has been synced yet.</p>`;
  return `<article class="sunriseControlCard sunriseDetailWide ampActivityFeed">
    <div class="ampStaffOverviewTop">
      <div>
        <h3>Global Account Activity</h3>
        <p class="opsText">Shared AMP trace for signups and logins from all public browsers and locations.</p>
      </div>
      <span class="ampStaffCount">${status}</span>
    </div>
    <div class="ampActivityList">${body}</div>
  </article>`;
}

function renderAmpStaffCards(entries = []) {
  const viewerIsOwner = isOwnerAccount(getCurrentSunriseOperator() || activeAccount || null);
  if (!Array.isArray(entries) || !entries.length) {
    return `<p class="profileNote">No staff accounts found.</p>`;
  }
  return `<div class="ampStaffCards">${entries.map(([key, account]) => {
    const fullName = `${String(account?.firstName || "").trim()} ${String(account?.lastName || "").trim()}`.trim() || "Staff Member";
    const position = String(account?.roleTitle || "Staff").trim();
    const division = ampStaffGroupName(account);
    const accessMeta = sunriseAccessMeta(account);
    const sunriseLogin = findSunriseCredentialEmailForBaseKey(key, account);
    const displayCountry = formatOptionalCountryDisplay(account?.country || "");
    const detailsBtn = viewerIsOwner
      ? `<button class="sunriseMiniBtn" type="button" data-amp-staff-details="${key}">Details</button>`
      : "";
    return `<article class="ampStaffCard">
      <div class="ampStaffCardTop">
        <div>
          <p class="ampSectionEyebrow">${division}</p>
          <h4>${fullName}</h4>
          <p class="ampOwnerRole">${position}</p>
        </div>
        <div class="ampStaffCardActions">
          <span class="ampHierarchyCode">${String(accessMeta.code || staffAccessCode(account) || "STA").trim().toUpperCase()}</span>
          ${detailsBtn}
        </div>
      </div>
      <div class="ampOwnerMetaRow">
        <span class="ampOwnerMetaChip"><b>VVS</b> ${String(account?.email || key || "").trim().toLowerCase()}</span>
        <span class="ampOwnerMetaChip"><b>Sunrise</b> ${String(sunriseLogin || "Not linked").trim().toLowerCase()}</span>
        <span class="ampOwnerMetaChip"><b>Country</b> ${displayCountry || "Not stored"}</span>
      </div>
      <div class="ampStaffCardSummary">
        <div><span>Phone</span><b>${String(account?.phone || "Not stored").trim() || "Not stored"}</b></div>
        <div><span>Access</span><b>${accessMeta.title || accessMeta.code || "Staff"}</b></div>
        <div><span>NOTOS</span><b>${String(account?.notosId || "Not set").trim().toUpperCase() || "Not set"}</b></div>
      </div>
    </article>`;
  }).join("")}</div>`;
}

function renderCustomerActivityRows(email = "") {
  const normalizedEmail = normalizeEmailAddress(email);
  const rows = recentSharedRegistryActivities(40).filter((row) => normalizeEmailAddress(row?.email || "") === normalizedEmail);
  if (!rows.length) return `<p class="profileNote">No shared trace has been recorded for this account yet.</p>`;
  return rows.map((row) => `<article class="ampActivityRow">
    <div class="ampActivityIdentity">
      <b>${humanizeRegistryEventType(row.eventType)}</b>
      <span>${String(row.occurredAt || "").trim() || "Pending timestamp"}</span>
    </div>
    <div class="ampActivityMeta">
      <span>${String(row.system || "vvs").toUpperCase()}</span>
      <span>${sharedRegistryActivityLocation(row)}</span>
      <span>${sharedRegistryActivityBrowser(row)}</span>
      <span>${String(row.status || "Recorded").trim()}</span>
    </div>
  </article>`).join("");
}

function renderAmpCustomerCards(entries = []) {
  if (!Array.isArray(entries) || !entries.length) {
    return `<article class="sunriseControlCard sunriseDetailWide"><h3>Customers List</h3><p class="profileNote">No customer accounts found.</p></article>`;
  }
  const cards = entries.map(([key, account]) => {
    const fullName = `${String(account?.firstName || "").trim()} ${String(account?.lastName || "").trim()}`.trim() || "Client";
    const membership = String(account?.membership || "Non-Member").trim() || "Non-Member";
    const preferredContact = String(account?.preferredContactMethod || account?.lastContactMethod || "Not set").trim() || "Not set";
    const displayCountry = formatOptionalCountryDisplay(account?.country || "");
    return `<article class="ampStaffCard ampCustomerCard">
      <div class="ampStaffCardTop">
        <div>
          <p class="ampSectionEyebrow">Customer</p>
          <h4>${fullName}</h4>
          <p class="ampOwnerRole">${String(account?.email || key || "").trim().toLowerCase()}</p>
        </div>
        <div class="ampStaffCardActions">
          <span class="ampHierarchyCode">${membership}</span>
          <button class="sunriseMiniBtn" type="button" data-amp-customer-details="${key}">Details</button>
        </div>
      </div>
      <div class="ampOwnerMetaRow">
        <span class="ampOwnerMetaChip"><b>Phone</b> ${String(account?.phone || "Not stored").trim() || "Not stored"}</span>
        <span class="ampOwnerMetaChip"><b>Country</b> ${displayCountry || "Not stored"}</span>
        <span class="ampOwnerMetaChip"><b>Contact</b> ${preferredContact}</span>
      </div>
    </article>`;
  }).join("");
  return `<article class="sunriseControlCard sunriseDetailWide">
    <h3>Customers List</h3>
    <div class="ampStaffCards">${cards}</div>
  </article>`;
}

function renderAMPPage(filter = "", options = {}) {
  const grid = document.getElementById("sunrise-amp-grid");
  if (!grid) return;
  ensureAmpDeletedAccountsStore();
  if (!options?.skipRegistryHydration) {
    queueAmpRegistryHydration(filter);
  }
  const section = normalizeAdminSection(sunriseAdminViewState.ampSection);
  sunriseAdminViewState.ampSection = section;
  const accessCodes = Array.isArray(sunriseControlState?.accessLevels)
    ? sunriseControlState.accessLevels.map((row) => String(row?.code || "").trim().toUpperCase()).filter(Boolean)
    : [];
  const accessOptions = Array.from(new Set(["", ...accessCodes]));
  const tierOptions = ["Non-Member", "Voyager Cuprum", "Voyager Argentum", "Voyager Aurum", "Voyager Platinum", "Voyager Diamante", "Voyager Noir", "Voyager Red", "Owner", "Staff"];
  const accountEntries = Object.entries(accounts)
    .filter(([, account]) => !account?.sunriseCredential)
    .filter(([, account]) => matchesSearch([
      account.email,
      account.phone,
      account.firstName,
      account.lastName,
      account.roleTitle,
      account.staffDivision,
      account.prefix,
      account.membership,
      account.sunriseAccessLevel,
      account.notosId,
      account.country
    ], filter));

  const renderCustomerRows = (entries) => entries.map(([key, account]) => {
      const selectedTier = String(account.membership || "").trim();
      const tierList = tierOptions.includes(selectedTier) ? tierOptions : [...tierOptions, selectedTier];
      const ownerRestricted = isOwnerAccount(account);
      const lockedForAleks = isAleksAmpRestrictedKey(key);
      const passwordDisplay = ownerRestricted ? "RESTRICTED" : String(account.password || "");
      const secretPhraseDisplay = ownerRestricted || lockedForAleks ? "RESTRICTED" : String(account.secretPhrase || "");
      const readOnly = lockedForAleks ? "readonly" : "";
      const disabled = lockedForAleks ? "disabled" : "";
      const displayCountry = formatOptionalCountryDisplay(account.country);
      const preferredContact = String(account.preferredContactMethod || account.lastContactMethod || "").trim().toLowerCase();
      const createdAt = String(account.createdAt || "").trim() || "-";
      const verifiedAt = String(account.verifiedAt || "").trim() || "-";
      const statusDisplay = String(account.accountStatus || "Active").trim();
      const deleteCell = lockedForAleks
        ? `<span class="profileNote">Restricted</span>`
        : `<button class="sunriseMiniBtn" type="button" data-amp-del="${key}">Delete</button>`;
      return `<tr>
      <td><input class="input" data-amp-key="${key}" value="${key}" ${readOnly}></td>
      <td><input class="input" data-amp-email="${key}" value="${account.email || ""}" ${readOnly}></td>
      <td><input class="input" data-amp-phone="${key}" value="${account.phone || ""}" ${readOnly}></td>
      <td><input class="input" data-amp-country="${key}" value="${displayCountry}" ${readOnly}></td>
      <td><select class="select" data-amp-contact="${key}" ${disabled}><option value="" ${!preferredContact ? "selected" : ""}>Not set</option><option value="email" ${preferredContact === "email" ? "selected" : ""}>Email</option><option value="phone" ${preferredContact === "phone" ? "selected" : ""}>Phone</option></select></td>
      <td><input class="input" data-amp-title="${key}" value="${account.prefix || ""}" ${readOnly}></td>
      <td><input class="input" data-amp-name="${key}" value="${(account.firstName || "") + " " + (account.lastName || "")}" ${readOnly}></td>
      <td><input class="input" data-amp-password="${key}" value="${passwordDisplay}" ${(ownerRestricted || lockedForAleks) ? "readonly" : ""}></td>
      <td><input class="input" data-amp-secret="${key}" value="${secretPhraseDisplay}" ${(ownerRestricted || lockedForAleks) ? "readonly" : ""}></td>
      <td><input class="input" value="${statusDisplay}" readonly></td>
      <td><input class="input" value="${createdAt}" readonly></td>
      <td><input class="input" value="${verifiedAt}" readonly></td>
      <td><select class="select" data-amp-tier="${key}" ${disabled}>${tierList.map((tier) => `<option ${tier === selectedTier ? "selected" : ""}>${tier}</option>`).join("")}</select></td>
      <td>${deleteCell}</td>
    </tr>`;
    }).join("");

  const viewerAccount = getCurrentSunriseOperator() || activeAccount || null;
  const viewerIsOwner = isOwnerAccount(viewerAccount);
  const renderStaffRows = (entries) => entries.map(([key, account]) => {
      const selectedAccess = String(account.sunriseAccessLevel || "").trim().toUpperCase();
      const accessList = accessOptions.includes(selectedAccess) ? accessOptions : [...accessOptions, selectedAccess];
      const lockedForAleks = isAleksAmpRestrictedKey(key);
      const readOnly = lockedForAleks ? "readonly" : "";
      const disabled = lockedForAleks ? "disabled" : "";
      const displayCountry = formatOptionalCountryDisplay(account.country);
      const division = ampStaffGroupName(account);
      const sunriseLogin = findSunriseCredentialEmailForBaseKey(key, account);
      const deleteCell = lockedForAleks
        ? `<span class="profileNote">Restricted</span>`
        : `<button class="sunriseMiniBtn" type="button" data-amp-del="${key}">Delete</button>`;
      const sensitiveCells = viewerIsOwner
        ? `<td><input class="input" data-amp-email="${key}" value="${account.email || ""}" ${readOnly}></td>
      <td><input class="input" value="${sunriseLogin}" readonly></td>
      <td><input class="input" data-amp-phone="${key}" value="${account.phone || ""}" ${readOnly}></td>
      <td><input class="input" data-amp-country="${key}" value="${displayCountry}" ${readOnly}></td>
      <td><input class="input" data-amp-password="${key}" value="${String(account.password || "")}" ${lockedForAleks ? "readonly" : ""}></td>
      <td><input class="input" data-amp-secret="${key}" value="${lockedForAleks ? "RESTRICTED" : String(account.secretPhrase || "")}" ${lockedForAleks ? "readonly" : ""}></td>`
        : "";
      return `<tr>
      <td><input class="input" data-amp-key="${key}" value="${key}" ${readOnly}></td>
      <td><input class="input" data-amp-title="${key}" value="${account.prefix || ""}" ${readOnly}></td>
      <td><input class="input" data-amp-name="${key}" value="${(account.firstName || "") + " " + (account.lastName || "")}" ${readOnly}></td>
      <td><input class="input" data-amp-role="${key}" value="${account.roleTitle || ""}" ${readOnly}></td>
      <td><input class="input" value="${division}" readonly></td>
      ${sensitiveCells}
      <td><select class="select" data-amp-access="${key}" ${disabled}>${accessList.map((code) => `<option value="${code}" ${code === selectedAccess ? "selected" : ""}>${code || "None"}</option>`).join("")}</select></td>
      <td><input class="input" data-amp-notos="${key}" value="${account.notosId || ""}" ${readOnly}></td>
      <td>${deleteCell}</td>
    </tr>`;
    }).join("");

  const customerEntries = accountEntries.filter(([, account]) => !isStaffAccountForAdmin(account));
  const staffEntries = canonicalizeAmpStaffEntries(accountEntries.filter(([, account]) => isStaffAccountForAdmin(account)));
  const customersHtml = renderAmpCustomerCards(customerEntries);

  const groupedStaff = new Map();
  ampStaffGroupOrder.forEach((division) => groupedStaff.set(division, []));
  staffEntries
    .sort((a, b) => {
      const divisionDiff = ampStaffGroupOrder.indexOf(ampStaffGroupName(a[1])) - ampStaffGroupOrder.indexOf(ampStaffGroupName(b[1]));
      if (divisionDiff) return divisionDiff;
      const levelDiff = hierarchySortIndex(staffAccessCode(a[1])) - hierarchySortIndex(staffAccessCode(b[1]));
      if (levelDiff) return levelDiff;
      const roleDiff = String(a[1]?.roleTitle || "").trim().toLowerCase().localeCompare(String(b[1]?.roleTitle || "").trim().toLowerCase());
      if (roleDiff) return roleDiff;
      const aName = `${String(a[1]?.firstName || "").trim()} ${String(a[1]?.lastName || "").trim()}`.trim().toLowerCase();
      const bName = `${String(b[1]?.firstName || "").trim()} ${String(b[1]?.lastName || "").trim()}`.trim().toLowerCase();
      return aName.localeCompare(bName);
    })
    .forEach((entry) => {
      const division = ampStaffGroupName(entry[1]);
      if (!groupedStaff.has(division)) groupedStaff.set(division, []);
      groupedStaff.get(division).push(entry);
    });
  const staffOverviewStats = ampStaffGroupOrder
    .map((division) => ({ division, count: groupedStaff.get(division)?.length || 0 }))
    .filter((item) => item.count > 0)
    .map((item) => `<div class="ampStaffStat"><span>${item.division}</span><b>${item.count}</b></div>`)
    .join("");
  const staffGroupsHtml = Array.from(groupedStaff.entries())
    .filter(([, entries]) => entries.length)
    .map(([division, entries]) => `<article class="sunriseControlCard sunriseDetailWide ampStaffSection">
      <div class="ampStaffSectionTop">
        <div>
          <p class="ampSectionEyebrow">AMP Staff</p>
          <h3>${division}</h3>
        </div>
        <span class="ampStaffCount">${entries.length} account${entries.length === 1 ? "" : "s"}</span>
      </div>
      ${division === "Owners"
        ? renderAmpOwnerCards(entries)
        : `${division === "Office" ? renderAmpOfficeHierarchy(entries) : `<p class="opsText">${ampStaffGroupDescription(division)}</p>`}
      ${renderAmpStaffCards(entries)}`}
    </article>`)
    .join("");
  const staffHtml = staffGroupsHtml
    ? `<article class="sunriseControlCard sunriseDetailWide ampStaffOverview">
        <div class="ampStaffOverviewTop">
          <div>
            <h3>Staff Directory</h3>
            <p class="opsText">Owners stay compact, CA operators are grouped under Headquarters, and Office highlights Directorate access only.</p>
          </div>
          <div class="ampStaffStatsGrid">${staffOverviewStats}</div>
        </div>
      </article>${staffGroupsHtml}`
    : `<article class="sunriseControlCard sunriseDetailWide"><h3>Staff Hierarchy</h3><p class="profileNote">No staff accounts found.</p></article>`;
  const deletedRows = (Array.isArray(sunriseControlState?.deletedAccounts) ? sunriseControlState.deletedAccounts : [])
    .filter((row) => matchesSearch([row.email, row.name, row.role, row.membership, row.sunriseAccessLevel, row.notosId], filter))
    .map((row, idx) => {
      const lockedForAleks = isAleksAmpRestrictedDeletedRow(row);
      const actionCell = lockedForAleks
        ? `<span class="profileNote">Restricted</span>`
        : `<button class="sunriseMiniBtn" type="button" data-amp-restore="${idx}">Restore</button><button class="sunriseMiniBtn" type="button" data-amp-purge="${idx}">Delete Permanently</button>`;
      return `<tr>
      <td>${row.kind || "-"}</td>
      <td>${row.email || "-"}</td>
      <td>${row.name || "-"}</td>
      <td>${row.membership || "-"}</td>
      <td>${row.sunriseAccessLevel || "-"}</td>
      <td>${row.deletedAt || "-"}</td>
      <td>${actionCell}</td>
    </tr>`;
    }).join("");
  const deletedHtml = `<article class="sunriseControlCard sunriseDetailWide"><h3>Deleted Accounts</h3><table class="sunriseControlTable"><thead><tr><th>Type</th><th>Email</th><th>Name</th><th>Membership</th><th>Access</th><th>Deleted At</th><th>Action</th></tr></thead><tbody>${deletedRows || "<tr><td colspan='7'>No deleted accounts.</td></tr>"}</tbody></table></article>`;

  grid.innerHTML = `<article class="sunriseControlCard sunriseDetailWide"><h3>Account Management Page</h3><div class="sunriseControlActions"><input class="input" id="amp-search" placeholder="Search any value, use / to narrow (e.g. mikhail/owner)" value="${filter.replace(/"/g, "&quot;")}"><button class="sunriseMiniBtn" type="button" data-amp-search>Search</button><button class="sunriseMiniBtn" type="button" data-amp-add>Add Empty Account</button></div><div class="sunriseSectionTabs"><button class="sunriseMiniBtn ${section === "customers" ? "isActive" : ""}" type="button" data-amp-section="customers">Customers</button><button class="sunriseMiniBtn ${section === "staff" ? "isActive" : ""}" type="button" data-amp-section="staff">Staff</button><button class="sunriseMiniBtn ${section === "deleted" ? "isActive" : ""}" type="button" data-amp-section="deleted">Deleted Accounts</button></div></article>${section === "staff" ? staffHtml : (section === "deleted" ? deletedHtml : customersHtml)}`;
}

function ensureAmpDeletedAccountsStore() {
  if (!sunriseControlState) return;
  if (!Array.isArray(sunriseControlState.deletedAccounts)) sunriseControlState.deletedAccounts = [];
  sunriseControlState.deletedAccounts = sunriseControlState.deletedAccounts.filter((row) => {
    const name = `${String(row?.name || "").trim()}`.toLowerCase();
    const key = String(row?.key || "").trim().toLowerCase();
    const email = String(row?.email || "").trim().toLowerCase();
    if ((key && accounts[key]) || (email && resolveAccountKey(email) && accounts[resolveAccountKey(email)])) {
      return false;
    }
    return !name.includes("roman novikov");
  });
}

function deletedAccountSnapshot(account, key = "") {
  const email = String(account?.email || key || "").trim().toLowerCase();
  const kind = String(account?.membership || "").trim().toLowerCase() === "staff" || String(account?.sunriseAccessLevel || "").trim()
    ? "staff"
    : "customer";
  return {
    kind,
    key: String(key || email || "").trim().toLowerCase(),
    email,
    name: `${String(account?.firstName || "").trim()} ${String(account?.lastName || "").trim()}`.trim(),
    membership: String(account?.membership || "").trim() || "Non-Member",
    sunriseAccessLevel: String(account?.sunriseAccessLevel || "").trim().toUpperCase(),
    notosId: String(account?.notosId || "").trim().toUpperCase(),
    account: JSON.parse(JSON.stringify(account || {})),
    deletedAt: formatUtcTimestamp(new Date())
  };
}

function relatedAccountKeysForDelete(rawKey = "") {
  const primary = resolveAccountKey(rawKey);
  const keys = new Set();
  if (!primary || !accounts[primary]) return [];
  keys.add(primary);
  const account = accounts[primary];
  if (account?.sunriseCredential) {
    const linked = String(account.sunriseLinkedEmail || "").trim().toLowerCase();
    if (linked && accounts[linked]) keys.add(linked);
  } else {
    Object.keys(accounts).forEach((k) => {
      const a = accounts[k];
      if (!a?.sunriseCredential) return;
      const linked = String(a.sunriseLinkedEmail || "").trim().toLowerCase();
      if (linked === primary) keys.add(k);
    });
  }
  return Array.from(keys);
}

function moveAccountsToDeletedBucket(rawKey = "") {
  ensureAmpDeletedAccountsStore();
  const targets = relatedAccountKeysForDelete(rawKey);
  targets.forEach((key) => {
    if (!accounts[key]) return;
    sunriseControlState.deletedAccounts.unshift(deletedAccountSnapshot(accounts[key], key));
    delete accounts[key];
    if (activeAccount && String(activeAccount.email || "").trim().toLowerCase() === key) {
      activeAccount = null;
      clearActiveSession();
      updateAuthCta();
    }
    if (sunriseState?.active && String(sunriseState.email || "").trim().toLowerCase() === key) {
      clearSunriseSession();
    }
  });
}

function keepSingleStaffPerAccessLevel() {
  const levels = ["STA", "SA", "SS", "SM", "DA", "CA"];
  const keptBaseByLevel = new Map();
  const toDelete = [];
  const entries = Object.entries(accounts);
  entries.forEach(([key, account]) => {
    if (!account || typeof account !== "object") return;
    if (isOwnerAccount(account)) return;
    const membership = String(account.membership || "").trim().toLowerCase();
    if (membership !== "staff") return;
    if (account.sunriseCredential) return;
    const level = String(account.sunriseAccessLevel || "").trim().toUpperCase();
    if (!levels.includes(level)) return;
    if (!keptBaseByLevel.has(level)) {
      keptBaseByLevel.set(level, key);
      return;
    }
    toDelete.push(key);
  });
  toDelete.forEach((baseKey) => {
    const base = accounts[baseKey];
    if (!base) return;
    const level = String(base.sunriseAccessLevel || "").trim().toUpperCase();
    const sunriseKey = Object.keys(accounts).find((k) => {
      const a = accounts[k];
      return !!a?.sunriseCredential && String(a.sunriseLinkedEmail || "").trim().toLowerCase() === String(baseKey).trim().toLowerCase();
    });
    delete accounts[baseKey];
    if (sunriseKey && accounts[sunriseKey]) delete accounts[sunriseKey];
    if (activeAccount && String(activeAccount.email || "").trim().toLowerCase() === String(baseKey).trim().toLowerCase()) {
      activeAccount = null;
      clearActiveSession();
      updateAuthCta();
    }
    if (sunriseState?.active && String(sunriseState.email || "").trim().toLowerCase() === String(baseKey).trim().toLowerCase()) {
      clearSunriseSession();
    }
    const keptBase = keptBaseByLevel.get(level);
    if (keptBase && accounts[keptBase]) ensureSunriseCredentials();
  });

  const allowedBaseSet = new Set(Array.from(keptBaseByLevel.values()).map((v) => String(v).trim().toLowerCase()));
  const sunriseKeepByBase = new Set();
  Object.keys(accounts).forEach((key) => {
    const account = accounts[key];
    if (!account || typeof account !== "object") return;
    if (!account.sunriseCredential || isOwnerAccount(account)) return;
    const linked = String(account.sunriseLinkedEmail || "").trim().toLowerCase();
    const level = String(account.sunriseAccessLevel || "").trim().toUpperCase();
    if (!levels.includes(level)) return;
    if (!linked || !allowedBaseSet.has(linked)) {
      delete accounts[key];
      return;
    }
    if (sunriseKeepByBase.has(linked)) {
      delete accounts[key];
      return;
    }
    sunriseKeepByBase.add(linked);
  });
}

function renderALPPage(filter = "") {
  const grid = document.getElementById("sunrise-alp-grid");
  if (!grid || !sunriseControlState) return;
  const section = normalizeAdminSection(sunriseAdminViewState.alpSection);
  sunriseAdminViewState.alpSection = section;
  const viewer = getCurrentSunriseOperator() || activeAccount || null;
  if (!Array.isArray(sunriseControlState.accessLevels)) sunriseControlState.accessLevels = [];
  const renderAccessRow = (row, originalIdx) => {
    const virtualCreator = originalIdx === "virtual-creator";
    if (virtualCreator) {
      return `<tr>
        <td><input class="input" value="${row.code || ""}" readonly></td>
        <td><input class="input" value="${row.title || ""}" readonly></td>
        <td><input class="input" value="${row.access || ""}" readonly></td>
        <td><span class="profileNote">Mikhail view only</span></td>
      </tr>`;
    }
    const lockedForAleks = isAleksAlpRestrictedAccessRow(row);
    const lockAttrs = lockedForAleks ? "readonly aria-disabled=\"true\"" : "";
    const deleteAction = lockedForAleks
      ? "<span class=\"profileNote\">Restricted</span>"
      : `<button class="sunriseMiniBtn" type="button" data-alp-del="${originalIdx}">Delete</button>`;
    return `<tr>
      <td><input class="input" data-alp-code="${originalIdx}" value="${row.code || ""}" ${lockAttrs}></td>
      <td><input class="input" data-alp-title="${originalIdx}" value="${row.title || ""}" ${lockAttrs}></td>
      <td><input class="input" data-alp-access="${originalIdx}" value="${row.access || ""}" ${lockAttrs}></td>
      <td>${deleteAction}</td>
    </tr>`;
  };

  const customerPolicyRows = [
    ["Non-Member", "Public site + account dashboard + contact submission"],
    ["Voyager Cuprum", "All customer access + Cuprum benefit visibility"],
    ["Voyager Argentum", "All customer access + Argentum benefits"],
    ["Voyager Aurum", "All customer access + Aurum benefits"],
    ["Voyager Platinum", "All customer access + Platinum benefits"],
    ["Voyager Diamante", "All customer access + Diamante benefits"],
    ["Voyager Noir", "All customer access + Noir benefits"],
    ["Voyager Red", "All customer access + Red Lounge + Ambassador features"]
  ].filter(([tier, access]) => matchesSearch([tier, access], filter))
    .map(([tier, access]) => `<tr><td>${tier}</td><td>${access}</td></tr>`)
    .join("");

  const hierarchyBands = [
    { label: "Executive", codes: ["OW", "CA", "DA"] },
    { label: "Management", codes: ["SM", "SS"] },
    { label: "Associate", codes: ["SA", "STA"] }
  ];
  const staffHierarchyHtml = hierarchyBands.map((band) => {
    const bandRows = sunriseControlState.accessLevels
      .map((row, originalIdx) => ({ row, originalIdx }))
      .filter(({ row }) => band.codes.includes(String(row.code || "").toUpperCase()))
      .filter(({ row }) => matchesSearch([row.code, row.title, row.access], filter))
      .sort((a, b) => hierarchySortIndex(String(a.row.code || "")) - hierarchySortIndex(String(b.row.code || "")))
      .map(({ row, originalIdx }) => renderAccessRow(row, originalIdx))
      .join("");
    const creatorRow = band.label === "Executive" && currentSunriseCreatorViewer(viewer)
      && matchesSearch(["CR", "Creator", "MONARCH ARCHANGEL"], filter)
      ? renderAccessRow({
        code: "CR",
        title: "Creator",
        access: "Creator command authority + MONARCH ARCHANGEL + full Sunrise executive archive oversight"
      }, "virtual-creator")
      : "";
    return `<article class="sunriseControlCard sunriseDetailWide"><h3>${band.label} Hierarchy</h3><table class="sunriseControlTable"><thead><tr><th>Code</th><th>Level</th><th>Access Detail</th><th>Action</th></tr></thead><tbody>${creatorRow}${bandRows || (!creatorRow ? "<tr><td colspan='4'>No levels in this hierarchy band.</td></tr>" : "")}</tbody></table></article>`;
  }).join("");

  const sectionBody = section === "staff"
    ? `${staffHierarchyHtml}<article class="sunriseControlCard sunriseDetailWide"><div class="sunriseControlActions"><button class="sunriseMiniBtn" type="button" data-alp-add>Add Level</button></div></article>`
    : `<article class="sunriseControlCard sunriseDetailWide"><h3>Customers Access Policies</h3><table class="sunriseControlTable"><thead><tr><th>Tier</th><th>Platform Access</th></tr></thead><tbody>${customerPolicyRows || "<tr><td colspan='2'>No customer policy rows found.</td></tr>"}</tbody></table></article>`;

  grid.innerHTML = `<article class="sunriseControlCard sunriseDetailWide"><h3>Access Levels Page</h3><div class="sunriseControlActions"><input class="input" id="alp-search" placeholder="Search any value, use / to narrow" value="${filter.replace(/"/g, "&quot;")}"><button class="sunriseMiniBtn" type="button" data-alp-search>Search</button></div><div class="sunriseSectionTabs"><button class="sunriseMiniBtn ${section === "customers" ? "isActive" : ""}" type="button" data-alp-section="customers">Customers</button><button class="sunriseMiniBtn ${section === "staff" ? "isActive" : ""}" type="button" data-alp-section="staff">Staff</button></div></article>${sectionBody}`;
}

function renderShortcutCodeAdminCard(context = "MCC", filter = "", searchId = "mcc-search", searchAttr = "data-mcc-search", addAttr = "data-mcc-add") {
  const allAccess = sunriseAccessCodesList();
  const filteredCodes = ensureShortcutCodeRegistry()
    .map((row, originalIdx) => ({ row, originalIdx }))
    .filter(({ row }) => matchesSearch([row.code, row.title, row.route, row.access], filter));
  const rows = filteredCodes
    .map(({ row, originalIdx }) => {
      const selected = normalizeCodeAccessList(row.access);
      const accessOptions = allAccess.map((code) => `<option value="${code}" ${selected.includes(code) ? "selected" : ""}>${code}</option>`).join("");
      return `<article class="sunriseControlCard mccCodeCard">
        <div class="mccCodeCardTop">
          <div>
            <p class="ampSectionEyebrow">${context} Shortcut</p>
            <span class="mccCodeBadge">${row.code || "NEW"}</span>
          </div>
          <button class="sunriseMiniBtn" type="button" data-code-del="${originalIdx}">Delete</button>
        </div>
        <div class="mccFieldGrid">
          <label class="mccField">
            <span>Code</span>
            <input class="input" data-code-key="${originalIdx}" value="${row.code || ""}">
          </label>
          <label class="mccField">
            <span>Title</span>
            <input class="input" data-code-title="${originalIdx}" value="${row.title || ""}">
          </label>
          <label class="mccField mccFieldWide">
            <span>Route</span>
            <input class="input" data-code-route="${originalIdx}" value="${row.route || ""}" placeholder="sunrise-... route">
          </label>
          <label class="mccField mccFieldWide">
            <span>Allowed Access</span>
            <select class="select mccAccessSelect" multiple size="${Math.max(4, Math.min(allAccess.length, 7))}" data-code-access="${originalIdx}">${accessOptions}</select>
            <small>Use Cmd/Ctrl to select multiple Sunrise access levels.</small>
          </label>
        </div>
      </article>`;
    }).join("");
  return `<article class="sunriseControlCard sunriseDetailWide mccRegistryHero">
    <div class="mccRegistryTop">
      <div>
        <h3>Manage &amp; Create Codes</h3>
        <p class="opsText">Maintain Sunrise shortcut codes with route targets and allowed access levels in a cleaner control layout.</p>
      </div>
      <div class="mccRegistryStats">
        <div class="mccRegistryStat"><span>Visible Codes</span><b>${filteredCodes.length}</b></div>
        <div class="mccRegistryStat"><span>Access Levels</span><b>${allAccess.length}</b></div>
      </div>
    </div>
    <div class="mccControlBar">
      <input class="input" id="${searchId}" placeholder="Search code/title/route/access, use / to narrow" value="${String(filter || "").replace(/"/g, "&quot;")}">
      <button class="sunriseMiniBtn" type="button" ${searchAttr}>Search</button>
      <button class="sunriseMiniBtn" type="button" ${addAttr}>Add Code</button>
    </div>
  </article>
  <section class="mccCodeGrid">
    ${rows || `<article class="sunriseControlCard sunriseDetailWide"><p class="profileNote">No shortcut codes found.</p></article>`}
  </section>`;
}

function renderMCCPage(filter = "") {
  const grid = document.getElementById("sunrise-mcc-grid");
  if (!grid) return;
  grid.innerHTML = renderShortcutCodeAdminCard("MCC", filter, "mcc-search", "data-mcc-search", "data-mcc-add");
}

function inboxFolderCount(inbox, folder) {
  const messages = Array.isArray(inbox.messages) ? inbox.messages : [];
  if (folder === "folders") {
    const custom = new Set((inbox.customFolders || []).map((f) => String(f)));
    return messages.filter((m) => custom.has(String(m.folder || ""))).length;
  }
  return messages.filter((m) => String(m.folder || "") === folder).length;
}

function renderOwnerSunriseInboxPage(root) {
  const activeFolder = ownerInboxActiveFolder();
  const selectedMessage = sunriseOwnerInboxState.selectedMessage || null;
  const viewerProfile = sunriseInboxProfile();

  if ((!sunriseOwnerInboxState.ready || sunriseOwnerInboxState.folder !== activeFolder) && !sunriseOwnerInboxState.loading) {
    syncOwnerGmailInbox({
      folder: activeFolder,
      selectedMessageId: ownerInboxSelectedMessageId(),
      silent: true
    });
  }
  ensureOwnerInboxAutoRefresh();

  const folderBtn = (folderKey, label) => {
    const active = activeFolder === folderKey ? " isActive" : "";
    const countMarkup = active ? `<b>${(sunriseOwnerInboxState.messages || []).length}</b>` : "";
    return `<button class="sunriseInboxFolderBtn${active}" type="button" data-inbox-folder="${folderKey}"><span>${label}</span>${countMarkup}</button>`;
  };

  const customFolderBtns = (sunriseOwnerInboxState.customFolders || []).map((name) => {
    const active = activeFolder === name ? " isActive" : "";
    const countMarkup = active ? `<b>${(sunriseOwnerInboxState.messages || []).length}</b>` : "";
    return `<button class="sunriseInboxFolderBtn${active}" type="button" data-inbox-folder="${name}"><span>${name}</span>${countMarkup}</button>`;
  }).join("");

  const rows = (sunriseOwnerInboxState.messages || []).map((msg) => {
    const id = String(msg.id || "");
    const from = String(msg.from || "").trim() || "Unknown sender";
    const subject = String(msg.subject || "").trim() || "(No subject)";
    const priority = String(msg.priority || "Normal");
    const created = String(msg.createdAt || "");
    const active = selectedMessage && id === String(selectedMessage.id || "") ? " isActive" : "";
    return `<button class="sunriseInboxRow${active}" type="button" data-inbox-open="${id}"><span class="sunriseInboxFrom">${from}</span><span class="sunriseInboxSubject">${subject}</span><span class="sunriseInboxMeta">${priority} • ${created}</span></button>`;
  }).join("");
  const detailHtml = `<article class="sunriseControlCard sunriseDetailWide"><div class="sunriseInboxTop"><h3>Windowed Email Review</h3><div class="sunriseControlActions"><button class="sunriseMiniBtn" type="button" data-inbox-refresh>Refresh</button></div></div><p class="profileNote">${sunriseOwnerInboxState.loading ? "Synchronizing concierge@venture-voyagers.com..." : "Open any email to review the full conversation in a dedicated Sunrise window without leaving this folder."}</p></article>`;

  const infoText = sunriseOwnerInboxState.error
    || sunriseOwnerInboxState.info
    || (sunriseOwnerInboxState.loading
      ? "Synchronizing Gmail mirror..."
      : (sunriseOwnerInboxState.lastSyncedAt ? `Last synced ${sunriseOwnerInboxState.lastSyncedAt}.` : "Gmail mirror ready."));

  const trashAction = activeFolder === "trash"
    ? `<button class="sunriseMiniBtn" type="button" data-inbox-clear-trash>Clear Trash</button>`
    : "";

  root.innerHTML = `<div class="sunriseInboxShell"><aside class="sunriseInboxSidebar"><div class="sunriseInboxFolders"><p class="sunriseCategoryTitle">Owner Mailbox Mirror</p><p class="profileNote">${sunriseOwnerInboxState.mailbox}</p>${folderBtn("inbox", "Inbox")}${folderBtn("archive", "Archive")}${folderBtn("sent", "Sent")}${folderBtn("drafts", "Drafts")}${folderBtn("spam", "Spam")}${folderBtn("trash", "Trash")}${folderBtn("sending", "Sending")}</div><div class="sunriseInboxFolders"><p class="sunriseCategoryTitle">Gmail Folders</p>${customFolderBtns || "<p class='profileNote'>No custom Gmail folders yet.</p>"}<div class="sunriseControlActions"><input class="input" id="inbox-new-folder" placeholder="New Gmail folder"><button class="sunriseMiniBtn" type="button" data-inbox-folder-add>Create</button></div></div><div class="sunriseInboxSettings"><p class="sunriseCategoryTitle">Connected Identities</p><div class="sunriseInboxAliasRow">${ownerInboxAliasChips()}</div><p class="profileNote">${ownerInboxVacationSummary()}</p><div class="sunriseControlActions"><button class="sunriseMiniBtn" type="button" data-inbox-refresh>Refresh</button><button class="sunriseMiniBtn" type="button" data-inbox-vacation-open>Vacation Reply</button><button class="sunriseMiniBtn" type="button" data-inbox-signature-manager-open>Manage Signatures</button></div></div></aside><section class="sunriseInboxMain"><article class="sunriseControlCard sunriseDetailWide"><h3>${viewerProfile.name}</h3><p class="profileNote">${viewerProfile.position}</p><p class="profileNote">Live Gmail mirror for concierge@venture-voyagers.com inside Sunrise.</p></article><article class="sunriseControlCard sunriseDetailWide"><div class="sunriseInboxTop"><h3>Folder: ${activeFolder}</h3><div class="sunriseControlActions"><button class="sunriseMiniBtn" type="button" data-inbox-new-compose>Compose</button><button class="sunriseMiniBtn" type="button" data-inbox-refresh>Refresh</button>${trashAction}</div></div><p class="profileNote">${infoText}</p><div class="sunriseInboxList">${rows || `<p class='profileNote'>${sunriseOwnerInboxState.loading ? "Loading messages..." : "No emails in this folder."}</p>`}</div></article>${detailHtml}</section></div>`;
}

function renderSunriseInboxPage() {
  const root = document.getElementById("sunrise-inbox-root");
  if (!root || !sunriseControlState) return;
  if (shouldUseOwnerGmailInbox()) {
    renderOwnerSunriseInboxPage(root);
    return;
  }
  const inbox = sunriseControlState.inbox || {};
  const activeFolder = String(inbox.activeFolder || "inbox");
  const selectedMessageId = String(inbox.selectedMessageId || "");
  const composeOpen = !!inbox.composeOpen;
  const customFolders = Array.isArray(inbox.customFolders) ? inbox.customFolders : [];
  const mailboxKey = activeSunriseMailbox();
  const viewerAccount = sunriseState?.account || activeAccount || null;
  const viewerIsOwner = isOwnerAccount(viewerAccount);
  const viewerProfile = sunriseInboxProfile();
  const messages = (Array.isArray(inbox.messages) ? inbox.messages : []).filter((msg) => {
    const box = normalizeEmailAddress(msg.mailbox || "");
    const sender = normalizeEmailAddress(msg.from || "");
    const subject = String(msg.subject || "");
    if (!viewerIsOwner && (sender === "notos.alert@venture-voyagers.com" || /notos critical warning/i.test(subject))) {
      return false;
    }
    if (!box || box === "shared") return viewerIsOwner;
    return box === normalizeEmailAddress(mailboxKey);
  });
  const signatures = Array.isArray(inbox.signatures) ? inbox.signatures : [];
  const defaultSignatureId = String(inbox.defaultSignatureId || "");
  const customSet = new Set(customFolders.map((name) => String(name)));
  const visibleMessages = messages.filter((msg) => {
    const folder = String(msg.folder || "inbox");
    if (activeFolder === "folders") return customSet.has(folder);
    return folder === activeFolder;
  });

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

  const detailHtml = `<article class="sunriseControlCard sunriseDetailWide"><div class="sunriseInboxTop"><h3>Windowed Email Review</h3><div class="sunriseControlActions"><button class="sunriseMiniBtn" type="button" data-inbox-refresh>Refresh</button></div></div><p class="profileNote">Open any email to review the full conversation in a dedicated Sunrise window without leaving this folder.</p></article>`;

  const trashAction = activeFolder === "trash"
    ? `<button class="sunriseMiniBtn" type="button" data-inbox-clear-trash>Clear Trash</button>`
    : "";

  root.innerHTML = `<div class="sunriseInboxShell"><aside class="sunriseInboxSidebar"><div class="sunriseInboxFolders"><p class="sunriseCategoryTitle">Mailbox</p><p class="profileNote">${mailboxKey}</p>${folderBtn("inbox", "Inbox")}${folderBtn("archive", "Archive")}${folderBtn("folders", "Folders")}${folderBtn("sent", "Sent")}${folderBtn("drafts", "Drafts")}${folderBtn("spam", "Spam")}${folderBtn("trash", "Trash")}${folderBtn("sending", "Sending")}</div><div class="sunriseInboxFolders"><p class="sunriseCategoryTitle">Custom Folders</p>${customFolderBtns || "<p class='profileNote'>No custom folders yet.</p>"}<div class="sunriseControlActions"><input class="input" id="inbox-new-folder" placeholder="New folder name"><button class="sunriseMiniBtn" type="button" data-inbox-folder-add>Create</button></div></div><div class="sunriseInboxSettings"><p class="sunriseCategoryTitle">Inbox Signatures</p><p class="profileNote">${signatures.length} saved signature presets.</p><div class="sunriseControlActions"><button class="sunriseMiniBtn" type="button" data-inbox-signature-manager-open>Manage Signatures</button></div></div></aside><section class="sunriseInboxMain"><article class="sunriseControlCard sunriseDetailWide"><h3>${viewerProfile.name}</h3><p class="profileNote">${viewerProfile.position}</p></article><article class="sunriseControlCard sunriseDetailWide"><div class="sunriseInboxTop"><h3>Folder: ${activeFolder}</h3><div class="sunriseControlActions"><button class="sunriseMiniBtn" type="button" data-inbox-new-compose>Compose</button>${trashAction}</div></div><div class="sunriseInboxList">${rows || "<p class='profileNote'>No emails in this folder.</p>"}</div></article>${detailHtml}</section></div>`;

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
  enhanceFilePickers(root);
}

function renderSignatureManager() {
  if (!sunriseControlState) return;
  const wrap = document.getElementById("inbox-signature-manager");
  if (!wrap) return;
  if (shouldUseOwnerGmailInbox()) {
    const profiles = ownerInboxSignatureProfiles();
    const defaultId = String(ownerInboxDefaultSignatureProfile()?.id || "");
    wrap.innerHTML = profiles.length
      ? `<section class="sunriseOwnerSignatureStudio">${profiles.map((profile) => {
        const ownerLabel = String(profile.ownerCode || "").trim() === "MO1" ? "Mikhail" : "Aleks";
        const defaultClass = profile.id === defaultId ? " isDefault" : "";
        return `<article class="sunriseOwnerSignatureCard${defaultClass}">
          <div class="sunriseOwnerSignatureHead">
            <div class="sunriseOwnerSignatureMeta">
              <span>${ownerLabel} Signature</span>
              <b>${encodeHtmlEntities(profile.name)}</b>
            </div>
            <label class="sunriseOwnerSignatureToggle">
              <input type="radio" name="owner-default-signature" data-owner-signature-default="${profile.id}" ${profile.id === defaultId ? "checked" : ""}/>
              <span>Default</span>
            </label>
          </div>
          <div class="sunriseOwnerSignatureFields">
            <label class="sunriseOwnerSignatureField">
              <span>Signature Label</span>
              <input class="input" data-owner-signature-name="${profile.id}" value="${encodeHtmlEntities(profile.name)}" placeholder="Signature name">
            </label>
            <label class="sunriseOwnerSignatureField">
              <span>Linked Owner</span>
              <input class="input" value="${ownerLabel}" readonly>
            </label>
          </div>
          <div class="sunriseOwnerSignatureToolbar">
            <button class="sunriseMiniBtn" type="button" data-owner-signature-command="bold" data-owner-signature-target="${profile.id}"><b>B</b></button>
            <button class="sunriseMiniBtn" type="button" data-owner-signature-command="italic" data-owner-signature-target="${profile.id}"><i>I</i></button>
            <button class="sunriseMiniBtn" type="button" data-owner-signature-command="underline" data-owner-signature-target="${profile.id}"><u>U</u></button>
            <button class="sunriseMiniBtn" type="button" data-owner-signature-command="title" data-owner-signature-target="${profile.id}">Title</button>
            <button class="sunriseMiniBtn" type="button" data-owner-signature-command="body" data-owner-signature-target="${profile.id}">Body</button>
            <button class="sunriseMiniBtn" type="button" data-owner-signature-command="divider" data-owner-signature-target="${profile.id}">Divider</button>
            <button class="sunriseMiniBtn" type="button" data-owner-signature-command="website" data-owner-signature-target="${profile.id}">Website</button>
            <button class="sunriseMiniBtn" type="button" data-owner-signature-command="email" data-owner-signature-target="${profile.id}">Email</button>
            <button class="sunriseMiniBtn" type="button" data-owner-signature-command="phone" data-owner-signature-target="${profile.id}">Phone</button>
          </div>
          <div class="sunriseOwnerSignatureEditorWrap">
            <div class="sunriseOwnerSignatureEditorPane">
              <div class="sunriseOwnerSignaturePanelHead">
                <span>Editor</span>
              </div>
              <div class="sunriseOwnerSignatureEditor" contenteditable="true" spellcheck="true" data-owner-signature-editor="${profile.id}">${profile.signatureHtml || ""}</div>
            </div>
            <div class="sunriseOwnerSignaturePreviewPane">
              <div class="sunriseOwnerSignaturePanelHead">
                <span>Preview</span>
              </div>
              <div class="sunriseOwnerSignaturePreview" data-owner-signature-preview="${profile.id}">${profile.signatureHtml || "<p class='profileNote'>No owner signature configured.</p>"}</div>
            </div>
          </div>
          <p class="sunriseOwnerSignatureHint">Gmail-style rich editing inside Sunrise. Changes sync to compose immediately and stay tied to this owner preset.</p>
        </article>`;
      }).join("")}</section>`
      : "<p class='profileNote'>No Gmail send-as signatures available yet.</p>";
    const signatureInfo = document.getElementById("inbox-signature-manager-info");
    if (signatureInfo) signatureInfo.textContent = "Aleks and Mikhail signature presets are available here and apply to Sunrise compose immediately.";
    return;
  }
  const inbox = sunriseControlState.inbox || {};
  const signatures = Array.isArray(inbox.signatures) ? inbox.signatures : [];
  const defaultId = String(inbox.defaultSignatureId || "");
  const rows = signatures.map((sig, idx) => {
    const id = String(sig.id || "");
    const checked = id === defaultId ? "checked" : "";
    return `<article class="sunriseInboxSignatureItem"><div class="sunriseInboxSignatureHead"><input class="input" data-inbox-signature-name="${idx}" value="${sig.name || ""}" placeholder="Signature name"><label class="choice"><input type="radio" name="inbox-default-signature" data-inbox-signature-default="${id}" ${checked}/> Default</label><button class="sunriseMiniBtn" type="button" data-inbox-signature-del="${idx}">Delete</button></div><textarea class="input sunriseInboxSignatureArea" data-inbox-signature-text="${idx}" placeholder="Signature text">${sig.text || ""}</textarea><div class="sunriseControlActions"><input class="input" data-inbox-signature-image="${idx}" value="${sig.imageName || ""}" placeholder="Signature image name (optional)"><input class="input" type="file" accept="image/*" data-inbox-signature-image-file="${idx}"></div></article>`;
  }).join("");
  wrap.innerHTML = `${rows || "<p class='profileNote'>No signatures yet.</p>"}<div class="sunriseControlActions"><input class="input" id="inbox-new-signature-name" placeholder="Signature name"><button class="sunriseMiniBtn" type="button" data-inbox-signature-add>Add Signature</button></div>`;
  enhanceFilePickers(wrap);
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
  ensureSunriseSaveButtons();
  renderSunriseControlSummary();
  const route = currentVisibleRoute();
  if (!(route === "sunrise" || sunriseModuleRoutes.includes(route))) return;

  if (route === "sunrise-dts") {
    renderDTSPage();
    initDtsSignaturePad();
    enhanceFilePickers(document.getElementById("sunrise-dts-grid"));
    return;
  }
  if (route === "sunrise-eam") {
    renderMoneyPage("sunrise-eam-grid", "eamExpenses", "Expenses Adjustment");
    return;
  }
  if (route === "sunrise-ifs") {
    renderMoneyPage("sunrise-ifs-grid", "ifsIncome", "Income Flow Allocation");
    return;
  }
  if (route === "sunrise-ecs") {
    syncEcsWithStaffAccounts();
    renderECSPage();
    return;
  }
  if (route === "sunrise-smca") {
    renderSMCAPage();
    return;
  }
  if (route === "sunrise-rta") {
    renderRTAPage();
    return;
  }
  if (route === "sunrise-rim") {
    renderRIMPage();
    return;
  }
  if (route === "sunrise-soc") {
    renderSOCPage();
    return;
  }
  if (route === "sunrise-soc-details") {
    renderSOCDetailsPage();
    return;
  }
  if (route === "sunrise-inbox") {
    renderSunriseInboxPage();
    enhanceFilePickers(document.getElementById("sunrise-inbox-grid"));
    return;
  }
  if (route === "sunrise-lcs") {
    renderLCSPage();
    return;
  }
  if (route === "sunrise-monarch") {
    renderMonarchArchangelPage();
    return;
  }
  if (route === "sunrise-amp" || route === "sunrise-alp" || route === "sunrise-mcc") {
    scheduleSunriseAdminRenders();
    return;
  }
}

function bindSunriseControlInteractions() {
  if (document.body.dataset.sunriseControlBound === "1") return;
  document.body.dataset.sunriseControlBound = "1";
  const sunriseEmailOverlay = document.getElementById("sunrise-email-overlay");
  const sunriseMailTo = document.getElementById("sunrise-mail-to");
  const sunriseMailCc = document.getElementById("sunrise-mail-cc");
  const sunriseMailBcc = document.getElementById("sunrise-mail-bcc");
  const sunriseMailSubject = document.getElementById("sunrise-mail-subject");
  const sunriseMailFrom = document.getElementById("sunrise-mail-from");
  const sunriseMailSignature = document.getElementById("sunrise-mail-signature");
  const sunriseMailBody = document.getElementById("sunrise-mail-body");
  const sunriseMailFont = document.getElementById("sunrise-mail-font");
  const sunriseMailFontSize = document.getElementById("sunrise-mail-font-size");
  const sunriseMailPriority = document.getElementById("sunrise-mail-priority");
  const sunriseMailSchedule = document.getElementById("sunrise-mail-schedule");
  const sunriseMailAttach = document.getElementById("sunrise-mail-attach");
  const sunriseMailInfo = document.getElementById("sunrise-mail-info");
  const signatureOverlay = document.getElementById("inbox-signature-overlay");
  const signatureClose = document.getElementById("inbox-signature-close");
  const signatureInfo = document.getElementById("inbox-signature-manager-info");
  const notosPathOverlay = document.getElementById("notos-path-overlay");
  const notosPathClose = document.getElementById("notos-path-close");
  const rtaAuditOverlay = document.getElementById("sunrise-rta-audit-overlay");
  const rtaAuditClose = document.getElementById("sunrise-rta-audit-close");
  const vacationOverlay = document.getElementById("sunrise-vacation-overlay");
  const vacationClose = document.getElementById("sunrise-vacation-close");
  const vacationSave = document.getElementById("sunrise-vacation-save");
  const vacationInfo = document.getElementById("sunrise-vacation-info");
  const inboxMessageOverlay = document.getElementById("sunrise-inbox-message-overlay");
  const inboxMessageClose = document.getElementById("sunrise-inbox-message-close");
  const monarchRecordOverlay = document.getElementById("monarch-record-overlay");
  const monarchRecordClose = document.getElementById("monarch-record-close");
  const monarchRecordSave = document.getElementById("monarch-record-save");
  const monarchRecordRestore = document.getElementById("monarch-record-restore");
  const monarchRecordDelete = document.getElementById("monarch-record-delete");
  const monarchRecordInfo = document.getElementById("monarch-record-info");
  const monarchCredentialOverlay = document.getElementById("monarch-credential-overlay");
  const monarchCredentialClose = document.getElementById("monarch-credential-close");
  const monarchCredentialSave = document.getElementById("monarch-credential-save");
  if (notosPathClose && notosPathClose.dataset.boundNotosClose !== "1") {
    notosPathClose.addEventListener("click", () => {
      if (notosPathOverlay) notosPathOverlay.hidden = true;
    });
    notosPathClose.dataset.boundNotosClose = "1";
  }
  if (rtaAuditClose && rtaAuditClose.dataset.boundRtaAuditClose !== "1") {
    rtaAuditClose.addEventListener("click", () => {
      closeRtaAuditOverlay();
    });
    rtaAuditClose.dataset.boundRtaAuditClose = "1";
  }
  if (rtaAuditOverlay && rtaAuditOverlay.dataset.boundRtaAuditBackdrop !== "1") {
    rtaAuditOverlay.addEventListener("click", (event) => {
      if (event.target === rtaAuditOverlay) closeRtaAuditOverlay();
    });
    rtaAuditOverlay.dataset.boundRtaAuditBackdrop = "1";
  }
  if (vacationClose && vacationClose.dataset.boundVacationClose !== "1") {
    vacationClose.addEventListener("click", () => {
      closeOwnerVacationOverlay();
    });
    vacationClose.dataset.boundVacationClose = "1";
  }
  if (vacationOverlay && vacationOverlay.dataset.boundVacationBackdrop !== "1") {
    vacationOverlay.addEventListener("click", (event) => {
      if (event.target === vacationOverlay) closeOwnerVacationOverlay();
    });
    vacationOverlay.dataset.boundVacationBackdrop = "1";
  }
  if (inboxMessageClose && inboxMessageClose.dataset.boundInboxMessageClose !== "1") {
    inboxMessageClose.addEventListener("click", () => {
      closeSunriseInboxMessageOverlay();
    });
    inboxMessageClose.dataset.boundInboxMessageClose = "1";
  }
  if (inboxMessageOverlay && inboxMessageOverlay.dataset.boundInboxMessageBackdrop !== "1") {
    inboxMessageOverlay.addEventListener("click", (event) => {
      if (event.target === inboxMessageOverlay) closeSunriseInboxMessageOverlay();
    });
    inboxMessageOverlay.dataset.boundInboxMessageBackdrop = "1";
  }
  if (monarchRecordClose && monarchRecordClose.dataset.boundMonarchRecordClose !== "1") {
    monarchRecordClose.addEventListener("click", () => {
      closeMonarchRecordOverlay();
    });
    monarchRecordClose.dataset.boundMonarchRecordClose = "1";
  }
  if (monarchRecordOverlay && monarchRecordOverlay.dataset.boundMonarchRecordBackdrop !== "1") {
    monarchRecordOverlay.addEventListener("click", (event) => {
      if (event.target === monarchRecordOverlay) closeMonarchRecordOverlay();
    });
    monarchRecordOverlay.dataset.boundMonarchRecordBackdrop = "1";
  }
  if (monarchCredentialClose && monarchCredentialClose.dataset.boundMonarchCredentialClose !== "1") {
    monarchCredentialClose.addEventListener("click", () => {
      closeMonarchCredentialOverlay();
    });
    monarchCredentialClose.dataset.boundMonarchCredentialClose = "1";
  }
  if (monarchCredentialOverlay && monarchCredentialOverlay.dataset.boundMonarchCredentialBackdrop !== "1") {
    monarchCredentialOverlay.addEventListener("click", (event) => {
      if (event.target === monarchCredentialOverlay) closeMonarchCredentialOverlay();
    });
    monarchCredentialOverlay.dataset.boundMonarchCredentialBackdrop = "1";
  }
  if (monarchCredentialSave && monarchCredentialSave.dataset.boundMonarchCredentialSave !== "1") {
    monarchCredentialSave.addEventListener("click", () => {
      const operator = getCurrentSunriseOperator() || activeAccount || null;
      const info = document.getElementById("monarch-credential-info");
      if (!isMikhailOwnerAccount(operator)) {
        if (info) info.textContent = "Only Mikhail can update Aleks MONARCH ARCHANGEL credentials.";
        return;
      }
      const codeInput = document.getElementById("monarch-credential-code");
      const passwordInput = document.getElementById("monarch-credential-password");
      const notosInput = document.getElementById("monarch-credential-notos");
      const result = saveMonarchOwnerCredentials("AO1", {
        code: String(codeInput?.value || "").trim(),
        password: String(passwordInput?.value || "").trim(),
        notosId: String(notosInput?.value || "").trim()
      });
      if (info) info.textContent = result.message;
    });
    monarchCredentialSave.dataset.boundMonarchCredentialSave = "1";
  }
  if (vacationSave && vacationSave.dataset.boundVacationSave !== "1") {
    vacationSave.addEventListener("click", async () => {
      const enable = document.getElementById("sunrise-vacation-enable");
      const start = document.getElementById("sunrise-vacation-start");
      const end = document.getElementById("sunrise-vacation-end");
      const subject = document.getElementById("sunrise-vacation-subject");
      const body = document.getElementById("sunrise-vacation-body");
      const contacts = document.getElementById("sunrise-vacation-restrict-contacts");
      const domain = document.getElementById("sunrise-vacation-restrict-domain");
      const response = await requestOwnerGmailInbox("/api/gmail-inbox", {
        action: "vacation-update",
        enableAutoReply: !!(enable instanceof HTMLInputElement && enable.checked),
        startTime: localDateTimeToMs(start instanceof HTMLInputElement ? start.value : ""),
        endTime: localDateTimeToMs(end instanceof HTMLInputElement ? end.value : ""),
        responseSubject: subject instanceof HTMLInputElement ? subject.value : "",
        responseBodyPlainText: body instanceof HTMLTextAreaElement ? body.value : "",
        responseBodyHtml: body instanceof HTMLTextAreaElement ? `<p>${body.value.replace(/\n/g, "<br>")}</p>` : "",
        restrictToContacts: !!(contacts instanceof HTMLInputElement && contacts.checked),
        restrictToDomain: !!(domain instanceof HTMLInputElement && domain.checked)
      });
      if (vacationInfo) {
        vacationInfo.textContent = response.ok
          ? "Vacation reply saved."
          : String(response.message || "Unable to save vacation reply.").trim();
      }
      if (response.ok) {
        await syncOwnerGmailInbox({
          folder: ownerInboxActiveFolder(),
          selectedMessageId: ownerInboxSelectedMessageId()
        });
        window.setTimeout(() => {
          closeOwnerVacationOverlay();
        }, 400);
      }
    });
    vacationSave.dataset.boundVacationSave = "1";
  }
  if (signatureClose && signatureClose.dataset.boundSigClose !== "1") {
    signatureClose.addEventListener("click", () => {
      if (signatureOverlay) signatureOverlay.hidden = true;
      if (signatureInfo) signatureInfo.textContent = "";
    });
    signatureClose.dataset.boundSigClose = "1";
  }
  if (monarchRecordSave && monarchRecordSave.dataset.boundMonarchRecordSave !== "1") {
    monarchRecordSave.addEventListener("click", () => {
      const record = resolveMonarchRecordForOperator(monarchArchangelRuntime.detailsRecordId, { setRestrictedMessage: true });
      if (!record) {
        if (monarchRecordInfo) monarchRecordInfo.textContent = "Access Restricted.";
        return;
      }
      const payloadResult = readMonarchRecordPayloadFromForm(record);
      if (!payloadResult.ok) {
        if (monarchRecordInfo) monarchRecordInfo.textContent = payloadResult.message;
        return;
      }
      const result = saveMonarchArchiveRecord(
        monarchArchangelRuntime.detailsRecordId,
        payloadResult.payload
      );
      if (monarchRecordInfo) monarchRecordInfo.textContent = result.message;
      if (result.ok) {
        openMonarchRecordOverlay(monarchArchangelRuntime.detailsRecordId);
        renderMonarchArchangelPage();
      }
    });
    monarchRecordSave.dataset.boundMonarchRecordSave = "1";
  }
  if (monarchRecordRestore && monarchRecordRestore.dataset.boundMonarchRecordRestore !== "1") {
    monarchRecordRestore.addEventListener("click", () => {
      const record = resolveMonarchRecordForOperator(monarchArchangelRuntime.detailsRecordId, { setRestrictedMessage: true });
      if (!record) {
        if (monarchRecordInfo) monarchRecordInfo.textContent = "Access Restricted.";
        return;
      }
      const mode = String(monarchRecordRestore.dataset.monarchSourceMode || "").trim().toLowerCase();
      const result = mode === "erase"
        ? eraseMonarchArchiveRecordFromSource(monarchArchangelRuntime.detailsRecordId)
        : restoreMonarchArchiveRecord(monarchArchangelRuntime.detailsRecordId);
      if (monarchRecordInfo) monarchRecordInfo.textContent = result.message;
      if (result.ok) {
        syncMonarchArchangelArchive({ immediate: true });
        openMonarchRecordOverlay(monarchArchangelRuntime.detailsRecordId);
        renderMonarchArchangelPage();
      }
    });
    monarchRecordRestore.dataset.boundMonarchRecordRestore = "1";
  }
  if (monarchRecordDelete && monarchRecordDelete.dataset.boundMonarchRecordDelete !== "1") {
    monarchRecordDelete.addEventListener("click", () => {
      const record = resolveMonarchRecordForOperator(monarchArchangelRuntime.detailsRecordId, { setRestrictedMessage: true });
      if (!record) {
        if (monarchRecordInfo) monarchRecordInfo.textContent = "Access Restricted.";
        return;
      }
      const result = deleteMonarchArchiveRecord(monarchArchangelRuntime.detailsRecordId);
      if (monarchRecordInfo) monarchRecordInfo.textContent = result.message;
      if (result.ok) {
        closeMonarchRecordOverlay();
        renderMonarchArchangelPage();
      }
    });
    monarchRecordDelete.dataset.boundMonarchRecordDelete = "1";
  }

  const resetSunriseComposerViewport = () => {
    if (!sunriseEmailOverlay) return;
    const windowEl = sunriseEmailOverlay.querySelector(".sunriseMailWindow");
    const formEl = sunriseEmailOverlay.querySelector(".mailFormGrid");
    const resetNode = (node) => {
      if (!(node instanceof HTMLElement)) return;
      node.scrollTop = 0;
      node.scrollLeft = 0;
    };
    resetNode(sunriseEmailOverlay);
    resetNode(windowEl);
    resetNode(formEl);
    window.requestAnimationFrame(() => {
      resetNode(sunriseEmailOverlay);
      resetNode(windowEl);
      resetNode(formEl);
      window.requestAnimationFrame(() => {
        resetNode(sunriseEmailOverlay);
        resetNode(windowEl);
        resetNode(formEl);
      });
    });
  };

  const forceSunriseComposeTop = () => {
    if (!sunriseEmailOverlay) return;
    const windowEl = sunriseEmailOverlay.querySelector(".sunriseMailWindow");
    const formEl = sunriseEmailOverlay.querySelector(".mailFormGrid");
    const toLabel = sunriseEmailOverlay.querySelector('label[for="sunrise-mail-to"]');
    const run = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      if (sunriseEmailOverlay instanceof HTMLElement) {
        sunriseEmailOverlay.scrollTop = 0;
        sunriseEmailOverlay.scrollLeft = 0;
        sunriseEmailOverlay.style.overflowAnchor = "none";
      }
      if (windowEl instanceof HTMLElement) {
        windowEl.scrollTop = 0;
        windowEl.scrollLeft = 0;
        windowEl.style.overflowAnchor = "none";
      }
      if (formEl instanceof HTMLElement) {
        formEl.scrollTop = 0;
        formEl.scrollLeft = 0;
      }
      if (toLabel instanceof HTMLElement) {
        toLabel.scrollIntoView({ block: "start", inline: "nearest" });
      }
      if (sunriseMailTo instanceof HTMLElement) {
        sunriseMailTo.focus({ preventScroll: true });
        sunriseMailTo.scrollIntoView({ block: "start", inline: "nearest" });
      }
    };
    run();
    window.requestAnimationFrame(run);
    window.setTimeout(run, 30);
    window.setTimeout(run, 120);
  };

  const openSunriseComposeOverlay = () => {
    if (!sunriseEmailOverlay) return;
    const windowEl = sunriseEmailOverlay.querySelector(".sunriseMailWindow");
    const formEl = sunriseEmailOverlay.querySelector(".mailFormGrid");
    enhanceFilePickers(sunriseEmailOverlay);
    syncOwnerComposeIdentityControls({ forceDefault: true });
    sunriseEmailOverlay.hidden = false;
    if (sunriseEmailOverlay instanceof HTMLElement) {
      sunriseEmailOverlay.style.placeItems = "start center";
    }
    if (sunriseEmailOverlay instanceof HTMLElement) {
      sunriseEmailOverlay.scrollTop = 0;
      sunriseEmailOverlay.scrollLeft = 0;
    }
    if (windowEl instanceof HTMLElement) {
      windowEl.scrollTop = 0;
      windowEl.scrollLeft = 0;
    }
    if (formEl instanceof HTMLElement) {
      formEl.scrollTop = 0;
      formEl.scrollLeft = 0;
    }
    resetSunriseComposerViewport();
    forceSunriseComposeTop();
    window.setTimeout(() => {
      resetSunriseComposerViewport();
      forceSunriseComposeTop();
      setSunriseComposeDraftBaseline();
    }, 60);
    setSunriseComposeDraftBaseline();
  };

  const openSunriseEmailComposer = (user) => {
    if (!sunriseEmailOverlay) return;
    const userName = String(user?.name || "Employee").trim();
    if (sunriseMailTo) sunriseMailTo.value = String(user?.email || "").trim();
    if (sunriseMailCc) sunriseMailCc.value = "";
    if (sunriseMailBcc) sunriseMailBcc.value = "";
    if (sunriseMailSubject) sunriseMailSubject.value = `VVS Operations Notice - ${userName}`;
    syncOwnerComposeIdentityControls({ forceDefault: true });
    if (sunriseMailBody) sunriseMailBody.value = `Dear ${userName},\n\nPlease review the latest operational update.\n\nRegards,\nVVS Command`;
    if (sunriseMailFont) sunriseMailFont.value = "Arial, sans-serif";
    if (sunriseMailFontSize) sunriseMailFontSize.value = "14";
    if (sunriseMailPriority) sunriseMailPriority.value = "Normal";
    if (sunriseMailSchedule) sunriseMailSchedule.value = "";
    if (sunriseMailAttach) sunriseMailAttach.value = "";
    if (sunriseMailInfo) sunriseMailInfo.textContent = "";
    openSunriseComposeOverlay();
  };

  const resetSunriseEmailComposer = () => {
    if (sunriseMailTo) sunriseMailTo.value = "";
    if (sunriseMailCc) sunriseMailCc.value = "";
    if (sunriseMailBcc) sunriseMailBcc.value = "";
    if (sunriseMailSubject) sunriseMailSubject.value = "";
    syncOwnerComposeIdentityControls({ forceDefault: true });
    if (sunriseMailBody) {
      sunriseMailBody.value = "";
      sunriseMailBody.style.fontWeight = "400";
      sunriseMailBody.style.fontStyle = "normal";
      sunriseMailBody.style.textDecoration = "none";
    }
    if (sunriseMailFont) sunriseMailFont.value = "Arial, sans-serif";
    if (sunriseMailFontSize) sunriseMailFontSize.value = "14";
    if (sunriseMailPriority) sunriseMailPriority.value = "Normal";
    if (sunriseMailSchedule) sunriseMailSchedule.value = "";
    if (sunriseMailAttach) sunriseMailAttach.value = "";
    clearSunriseComposeDraftBaseline();
  };

  const closeSunriseEmailComposer = () => {
    resetSunriseComposerViewport();
    if (sunriseEmailOverlay) sunriseEmailOverlay.hidden = true;
    clearSunriseComposeDraftBaseline();
  };

  const parseKey = (value) => {
    const [a, b] = String(value || "").split(":");
    return { key: a, idx: Number(b) };
  };

  const readRtaSelection = (clientKey) => {
    const key = String(clientKey || "").trim().toLowerCase();
    const domKey = key.replace(/[^a-z0-9]+/gi, "-");
    return {
      fleetStaffKey: String(document.getElementById(`rta-fleet-${domKey}`)?.value || "").trim().toLowerCase(),
      driverStaffKey: String(document.getElementById(`rta-driver-${domKey}`)?.value || "").trim().toLowerCase(),
      conciergeStaffKey: String(document.getElementById(`rta-concierge-${domKey}`)?.value || "").trim().toLowerCase(),
      securityStaffKey: String(document.getElementById(`rta-security-${domKey}`)?.value || "").trim().toLowerCase()
    };
  };

  const setRtaInfo = (message) => {
    const el = document.getElementById("rta-info");
    if (el) el.textContent = String(message || "");
  };

  function encodeAuditValue(value) {
    return String(value || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function closeRtaAuditOverlay() {
    if (sunriseRtaAuditOverlay) sunriseRtaAuditOverlay.hidden = true;
    if (sunriseRtaAuditInfo) sunriseRtaAuditInfo.textContent = "";
  }

  function openRtaAuditOverlay(assignment) {
    if (!assignment || !sunriseRtaAuditOverlay || !sunriseRtaAuditBody) return;
    const titleName = String(assignment.clientName || "Voyager Red Member").trim() || "Voyager Red Member";
    const auditEntries = buildRtaAuditEntries(assignment);
    sunriseRtaAuditBody.innerHTML = auditEntries.length
      ? auditEntries.map((entry, idx) => `<div class="field"><label>Entry ${idx + 1}</label><input class="input" value="${encodeAuditValue(entry)}" readonly></div>`).join("")
      : `<p class="profileNote">No activity recorded yet for this assignment.</p>`;
    if (sunriseRtaAuditTitle) sunriseRtaAuditTitle.textContent = `${titleName} Assignment Audit`;
    if (sunriseRtaAuditInfo) sunriseRtaAuditInfo.textContent = `${auditEntries.length} change${auditEntries.length === 1 ? "" : "s"} logged with operator and UTC timestamp data.`;
    sunriseRtaAuditOverlay.hidden = false;
  }

  document.addEventListener("click", async (event) => {
    const clickTarget = event.target instanceof Element ? event.target : null;
    if (!clickTarget) return;

    const saveBtn = clickTarget.closest("[data-sunrise-save-changes]");
    if (saveBtn) {
      commitSunriseChanges();
      return;
    }

    const ownerSignatureCommand = clickTarget.closest("[data-owner-signature-command]");
    if (ownerSignatureCommand) {
      const command = String(ownerSignatureCommand.getAttribute("data-owner-signature-command") || "").trim();
      const profileId = String(ownerSignatureCommand.getAttribute("data-owner-signature-target") || "").trim();
      runOwnerSignatureEditorCommand(profileId, command);
      return;
    }

    const monarchLockBtn = clickTarget.closest("#monarch-lock-btn");
    if (monarchLockBtn) {
      resetMonarchArchangelAccess();
      renderMonarchArchangelPage();
      return;
    }

    const monarchSaveBtn = clickTarget.closest("#monarch-save-btn, #monarch-save-top-btn");
    if (monarchSaveBtn) {
      commitMonarchArchangelChanges();
      renderMonarchArchangelPage();
      return;
    }

    const monarchVaultBtn = clickTarget.closest("#monarch-open-aleks-vault");
    if (monarchVaultBtn) {
      openMonarchCredentialOverlay();
      return;
    }

    const monarchCategoryBtn = clickTarget.closest("[data-monarch-category]");
    if (monarchCategoryBtn) {
      monarchArchangelRuntime.filterCategory = String(monarchCategoryBtn.getAttribute("data-monarch-category") || "all").trim().toLowerCase() || "all";
      renderMonarchArchangelPage();
      return;
    }

    const monarchSearchBtn = clickTarget.closest("[data-monarch-search]");
    if (monarchSearchBtn) {
      const searchInput = document.getElementById("monarch-search");
      monarchArchangelRuntime.filterQuery = String(searchInput?.value || "").trim();
      renderMonarchArchangelPage();
      return;
    }

    const monarchDetailsBtn = clickTarget.closest("[data-monarch-details]");
    if (monarchDetailsBtn) {
      const recordId = String(monarchDetailsBtn.getAttribute("data-monarch-details") || "").trim();
      const record = resolveMonarchRecordForOperator(recordId, { setRestrictedMessage: true });
      if (!record) {
        renderMonarchArchangelPage();
        return;
      }
      openMonarchRecordOverlay(recordId);
      return;
    }

    const monarchSourceActionBtn = clickTarget.closest("[data-monarch-source-action]");
    if (monarchSourceActionBtn) {
      const recordId = String(monarchSourceActionBtn.getAttribute("data-monarch-source-action") || "").trim();
      const record = resolveMonarchRecordForOperator(recordId, { setRestrictedMessage: true });
      if (!record) {
        renderMonarchArchangelPage();
        return;
      }
      const mode = String(monarchSourceActionBtn.getAttribute("data-monarch-source-mode") || "").trim().toLowerCase();
      const result = mode === "erase"
        ? eraseMonarchArchiveRecordFromSource(recordId)
        : restoreMonarchArchiveRecord(recordId);
      monarchArchangelRuntime.info = result.message;
      syncMonarchArchangelArchive({ immediate: true });
      renderMonarchArchangelPage();
      return;
    }

    const monarchDeleteBtn = clickTarget.closest("[data-monarch-delete]");
    if (monarchDeleteBtn) {
      const recordId = String(monarchDeleteBtn.getAttribute("data-monarch-delete") || "").trim();
      const record = resolveMonarchRecordForOperator(recordId, { setRestrictedMessage: true });
      if (!record) {
        renderMonarchArchangelPage();
        return;
      }
      const result = deleteMonarchArchiveRecord(recordId);
      monarchArchangelRuntime.info = result.message;
      renderMonarchArchangelPage();
      return;
    }

    const deleteClick = clickTarget.closest("[data-amp-del],[data-alp-del],[data-code-del],[data-dts-del],[data-money-del],[data-ecs-del],[data-rim-del],[data-smca-del],[data-soc-delete],[data-soc-restore],[data-lcs-del]");
    if (deleteClick) {
      event.preventDefault();
      event.stopPropagation();
    }

    const actionBtn = clickTarget.closest("[data-shortcut-action]");
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

    const moneyAdd = clickTarget.closest("[data-money-add]");
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

    const moneyDel = clickTarget.closest("[data-money-del]");
    if (moneyDel && sunriseControlState) {
      const { key, idx } = parseKey(moneyDel.getAttribute("data-money-del"));
      const list = sunriseControlState[key];
      if (Array.isArray(list)) list.splice(idx, 1);
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      return;
    }

    const dtsDel = clickTarget.closest("[data-dts-del]");
    if (dtsDel && sunriseControlState) {
      sunriseControlState.dtsDocs.splice(Number(dtsDel.getAttribute("data-dts-del")), 1);
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      return;
    }

    const dtsCmd = clickTarget.closest("[data-dts-editor-cmd]");
    if (dtsCmd) {
      const cmd = String(dtsCmd.getAttribute("data-dts-editor-cmd") || "");
      const editor = document.getElementById("dts-editor");
      if (editor) editor.focus();
      if (cmd) document.execCommand(cmd, false);
      return;
    }

    const dtsStyle = clickTarget.closest("[data-dts-editor-style]");
    if (dtsStyle) {
      const style = String(dtsStyle.getAttribute("data-dts-editor-style") || "body");
      const editor = document.getElementById("dts-editor");
      if (!editor) return;
      editor.focus();
      if (style === "title") document.execCommand("formatBlock", false, "h2");
      else if (style === "subtitle") document.execCommand("formatBlock", false, "h3");
      else document.execCommand("formatBlock", false, "p");
      return;
    }

    const dtsSave = clickTarget.closest("[data-dts-editor-save]");
    if (dtsSave && sunriseControlState) {
      const editor = document.getElementById("dts-editor");
      const text = String(editor?.innerHTML || "").trim();
      if (sunriseControlState.dtsDocs && sunriseControlState.dtsDocs[0]) {
        sunriseControlState.dtsDocs[0].note = text ? "Edited in Sunrise redactor" : sunriseControlState.dtsDocs[0].note;
      }
      saveSunriseControlState();
      return;
    }

    const dtsSignClear = clickTarget.closest("[data-dts-sign-clear]");
    if (dtsSignClear) {
      const canvas = document.getElementById("dts-signature-pad");
      if (canvas instanceof HTMLCanvasElement) {
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const ecsAdd = clickTarget.closest("[data-ecs-add]");
    if (ecsAdd && sunriseControlState) {
      sunriseControlState.ecsEmployees.push({ id: `EMP-${Math.floor(Math.random() * 900 + 100)}`, name: "New Employee", role: "Concierge", position: "Concierge Associate", division: "Office", rtaRoles: ["concierge"], salary: 0, hours: 0, bonus: 0, commission: 0, status: "Active", email: "", login: "", permission: "Tier-1" });
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      return;
    }

    const ecsDel = clickTarget.closest("[data-ecs-del]");
    if (ecsDel && sunriseControlState) {
      sunriseControlState.ecsEmployees.splice(Number(ecsDel.getAttribute("data-ecs-del")), 1);
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      return;
    }

    const ecsMail = clickTarget.closest("[data-ecs-mail]");
    if (ecsMail && sunriseControlState) {
      const idx = Number(ecsMail.getAttribute("data-ecs-mail"));
      const user = sunriseControlState.ecsEmployees[idx];
      if (user) openSunriseEmailComposer(user);
      return;
    }

    const sunriseMailBack = clickTarget.closest("[data-sunrise-mail-back]");
    if (sunriseMailBack) {
      closeSunriseEmailComposer();
      return;
    }

    const sunriseMailClose = clickTarget.closest("[data-sunrise-mail-close]");
    if (sunriseMailClose) {
      resetSunriseEmailComposer();
      if (sunriseMailInfo) sunriseMailInfo.textContent = "Composition canceled.";
      closeSunriseEmailComposer();
      return;
    }

    const sunriseMailSend = clickTarget.closest("[data-sunrise-mail-send]");
    if (sunriseMailSend) {
      const to = String(sunriseMailTo?.value || "").trim();
      const cc = String(sunriseMailCc?.value || "").trim();
      const bcc = String(sunriseMailBcc?.value || "").trim();
      const subject = String(sunriseMailSubject?.value || "").trim();
      const body = String(sunriseMailBody?.value || "").trim();
      const font = String(sunriseMailFont?.value || "Arial, sans-serif");
      const fontSize = String(sunriseMailFontSize?.value || "14");
      const priority = String(sunriseMailPriority?.value || "Normal");
      const scheduleRaw = String(sunriseMailSchedule?.value || "");
      const scheduleParsed = parseSunriseScheduleInput(scheduleRaw);
      if (!scheduleParsed.ok) {
        if (sunriseMailInfo) sunriseMailInfo.textContent = "Schedule format must be dd/mm/yyyy hr/min/sec.";
        return;
      }
      const scheduledAt = scheduleParsed.formatted;
      const attachments = (sunriseMailAttach instanceof HTMLInputElement && sunriseMailAttach.files)
        ? Array.from(sunriseMailAttach.files).map((file) => file.name)
        : [];
      if (!to || !subject || !body) {
        if (sunriseMailInfo) sunriseMailInfo.textContent = "Complete To, Subject and Message before sending.";
        return;
      }
      const recipients = [to, cc, bcc].filter(Boolean).join(", ");
      const sender = sunriseState.email || (activeAccount?.email || "concierge@venture-voyagers.com");
      const senderMailbox = activeSunriseMailbox();
      const folder = scheduledAt ? "sending" : "sent";
      const ownerFromProfile = shouldUseOwnerGmailInbox() ? selectedOwnerComposeSenderProfile() : null;
      const ownerSignatureProfile = shouldUseOwnerGmailInbox() ? selectedOwnerComposeSignatureProfile() : null;
      const baseHtml = `<p style="font-family:${font};font-size:${fontSize}px;">${body.replace(/\n/g, "<br>")}</p>`;
      const html = shouldUseOwnerGmailInbox()
        ? appendOwnerSignatureHtml(baseHtml, ownerSignatureProfile)
        : baseHtml;
      const textBody = shouldUseOwnerGmailInbox()
        ? appendOwnerSignatureText(body, ownerSignatureProfile)
        : body;
      const attachmentPayload = await readEmailAttachments(sunriseMailAttach);
      if (shouldUseOwnerGmailInbox()) {
        const synced = await performOwnerGmailInboxAction("send", {
          to,
          cc,
          bcc,
          subject,
          html,
          text: textBody,
          from: ownerInboxSenderAddress(ownerFromProfile),
          replyTo: ownerFromProfile?.replyTo || ownerFromProfile?.email || sender,
          attachments: attachmentPayload,
          scheduledAt
        }, {
          refreshFolder: folder,
          infoMessage: folder === "sending"
            ? "Scheduled draft synced to Gmail."
            : `Message sent from ${ownerFromProfile?.email || "concierge@venture-voyagers.com"} to ${recipients || to}.`
        });
        if (sunriseMailInfo) {
          sunriseMailInfo.textContent = synced
            ? (folder === "sending" ? "Scheduled draft saved in Gmail." : `Message sent to ${recipients || to}.`)
            : String(sunriseOwnerInboxState.error || "Unable to sync Gmail send.").trim();
        }
        if (synced) {
          clearSunriseComposeDraftBaseline();
          window.setTimeout(() => {
            closeSunriseEmailComposer();
          }, 650);
        }
        return;
      }
      pushInboxMessage({ mailbox: senderMailbox, folder, from: sender, to, cc, bcc, subject, bodyHtml: html, priority, scheduledAt, attachments });
      routeSunriseInboundCopies({ senderMailbox, from: sender, to, cc, bcc, subject, bodyHtml: html, priority, attachments });
      const delivery = await deliverSunriseEmail({
        to,
        cc,
        bcc,
        subject,
        html,
        text: body,
        from: sender,
        replyTo: sender,
        attachments: attachmentPayload
      });
      if (sunriseMailInfo) {
        sunriseMailInfo.textContent = delivery.ok
          ? `Message sent to ${recipients || to}.`
          : (delivery.skipped
            ? `Message stored locally for ${recipients || to}. External delivery will work in Cloudflare Pages runtime.`
            : `Message stored locally, but external delivery failed: ${delivery.message}`);
      }
      clearSunriseComposeDraftBaseline();
      window.setTimeout(() => {
        closeSunriseEmailComposer();
      }, 650);
      return;
    }

    const sunriseMailDraft = clickTarget.closest("[data-sunrise-mail-draft]");
    if (sunriseMailDraft) {
      const to = String(sunriseMailTo?.value || "").trim();
      const cc = String(sunriseMailCc?.value || "").trim();
      const bcc = String(sunriseMailBcc?.value || "").trim();
      const subject = String(sunriseMailSubject?.value || "").trim() || "Draft";
      const body = String(sunriseMailBody?.value || "").trim();
      const font = String(sunriseMailFont?.value || "Arial, sans-serif");
      const fontSize = String(sunriseMailFontSize?.value || "14");
      const priority = String(sunriseMailPriority?.value || "Normal");
      const scheduleRaw = String(sunriseMailSchedule?.value || "");
      const scheduleParsed = parseSunriseScheduleInput(scheduleRaw);
      if (!scheduleParsed.ok) {
        if (sunriseMailInfo) sunriseMailInfo.textContent = "Schedule format must be dd/mm/yyyy hr/min/sec.";
        return;
      }
      const scheduledAt = scheduleParsed.formatted;
      const attachments = (sunriseMailAttach instanceof HTMLInputElement && sunriseMailAttach.files)
        ? Array.from(sunriseMailAttach.files).map((file) => file.name)
        : [];
      if (!to && !cc && !bcc && !body) {
        if (sunriseMailInfo) sunriseMailInfo.textContent = "Add at least recipient or message content before saving draft.";
        return;
      }
      const sender = sunriseState.email || (activeAccount?.email || "concierge@venture-voyagers.com");
      const ownerFromProfile = shouldUseOwnerGmailInbox() ? selectedOwnerComposeSenderProfile() : null;
      const ownerSignatureProfile = shouldUseOwnerGmailInbox() ? selectedOwnerComposeSignatureProfile() : null;
      const baseHtml = `<p style="font-family:${font};font-size:${fontSize}px;">${body.replace(/\n/g, "<br>")}</p>`;
      const html = shouldUseOwnerGmailInbox()
        ? appendOwnerSignatureHtml(baseHtml, ownerSignatureProfile)
        : baseHtml;
      const textBody = shouldUseOwnerGmailInbox()
        ? appendOwnerSignatureText(body, ownerSignatureProfile)
        : body;
      if (shouldUseOwnerGmailInbox()) {
        const attachmentPayload = await readEmailAttachments(sunriseMailAttach);
        const targetFolder = scheduledAt ? "sending" : "drafts";
        const synced = await performOwnerGmailInboxAction("draft-save", {
          to,
          cc,
          bcc,
          subject,
          html,
          text: textBody,
          from: ownerInboxSenderAddress(ownerFromProfile),
          replyTo: ownerFromProfile?.replyTo || ownerFromProfile?.email || sender,
          attachments: attachmentPayload,
          scheduledAt
        }, {
          refreshFolder: targetFolder,
          infoMessage: targetFolder === "sending" ? "Scheduled draft saved in Gmail." : "Draft saved in Gmail."
        });
        if (sunriseMailInfo) {
          sunriseMailInfo.textContent = synced
            ? (targetFolder === "sending" ? "Scheduled draft saved." : "Draft saved.")
            : String(sunriseOwnerInboxState.error || "Unable to save Gmail draft.").trim();
        }
        if (synced) {
          clearSunriseComposeDraftBaseline();
          window.setTimeout(() => {
            closeSunriseEmailComposer();
          }, 350);
        }
        return;
      }
      pushInboxMessage({ mailbox: activeSunriseMailbox(), folder: "drafts", from: sender, to, cc, bcc, subject, bodyHtml: html, priority, scheduledAt, attachments });
      if (sunriseControlState && sunriseControlState.inbox) {
        sunriseControlState.inbox.activeFolder = "drafts";
        sunriseControlState.inbox.lastInfo = "Draft saved.";
        saveSunriseControlState();
        renderSunriseInboxPage();
      }
      if (sunriseMailInfo) sunriseMailInfo.textContent = "Draft saved.";
      clearSunriseComposeDraftBaseline();
      window.setTimeout(() => {
        closeSunriseEmailComposer();
      }, 350);
      return;
    }

    const sunriseMailStyle = clickTarget.closest("[data-sunrise-mail-style]");
    if (sunriseMailStyle && sunriseMailBody) {
      const style = String(sunriseMailStyle.getAttribute("data-sunrise-mail-style") || "body");
      if (style === "title") sunriseMailBody.style.fontWeight = "700";
      else if (style === "subtitle") sunriseMailBody.style.fontWeight = "600";
      else sunriseMailBody.style.fontWeight = "400";
      return;
    }

    const sunriseMailCmd = clickTarget.closest("[data-sunrise-mail-cmd]");
    if (sunriseMailCmd && sunriseMailBody) {
      const cmd = String(sunriseMailCmd.getAttribute("data-sunrise-mail-cmd") || "");
      if (cmd === "bold") sunriseMailBody.style.fontWeight = sunriseMailBody.style.fontWeight === "700" ? "400" : "700";
      if (cmd === "italic") sunriseMailBody.style.fontStyle = sunriseMailBody.style.fontStyle === "italic" ? "normal" : "italic";
      if (cmd === "underline") sunriseMailBody.style.textDecoration = sunriseMailBody.style.textDecoration === "underline" ? "none" : "underline";
      return;
    }

    const rtaSave = clickTarget.closest("[data-rta-save]");
    if (rtaSave && sunriseControlState) {
      ensureRtaAssignmentsStore();
      const clientKey = String(rtaSave.getAttribute("data-rta-save") || "").trim().toLowerCase();
      const assignment = findRtaAssignmentByClientKey(clientKey);
      const client = accounts[clientKey] || null;
      if (!assignment || !client) return;
      const selection = readRtaSelection(clientKey);
      if (!hasCompleteRtaSelection(selection)) {
        setRtaInfo("Select Fleet, Driver, Concierge, and Head of Security before saving.");
        return;
      }
      hydrateRtaAssignmentClientFields(assignment, clientKey, client);
      let infoMessage = "";
      if (canApproveRtaAssignment()) {
        applyRtaSelectionToAssignment(assignment, selection);
        assignment.requestedBy = buildRtaOperatorLabel();
        assignment.requestedAt = formatUtcTimestamp(new Date());
        confirmRtaSelection(assignment);
        appendRtaAuditEntry(assignment, `Team assigned and confirmed by ${buildRtaOperatorLabel()} on ${assignment.confirmedAt}`);
        infoMessage = "Red team assigned and confirmed.";
      } else {
        setRtaPendingSubmission(assignment, selection, "assign");
        appendRtaAuditEntry(assignment, `Assignment submitted for confirmation by ${assignment.requestedBy} on ${assignment.requestedAt}`);
        infoMessage = "Red team submitted for executive confirmation.";
      }
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      setRtaInfo(infoMessage);
      return;
    }

    const rtaAudit = clickTarget.closest("[data-rta-audit]");
    if (rtaAudit && sunriseControlState) {
      ensureRtaAssignmentsStore();
      const clientKey = String(rtaAudit.getAttribute("data-rta-audit") || "").trim().toLowerCase();
      const assignment = findRtaAssignmentByClientKey(clientKey);
      if (!assignment) return;
      openRtaAuditOverlay(assignment);
      return;
    }

    const rtaSwitch = clickTarget.closest("[data-rta-switch]");
    if (rtaSwitch && sunriseControlState) {
      if (!canManageRtaSwitch()) {
        setRtaInfo("Only DA, CA, or Owner can initiate a Red Team switch.");
        return;
      }
      ensureRtaAssignmentsStore();
      const clientKey = String(rtaSwitch.getAttribute("data-rta-switch") || "").trim().toLowerCase();
      const assignment = findRtaAssignmentByClientKey(clientKey);
      const client = accounts[clientKey] || null;
      if (!assignment || !client) return;
      const selection = readRtaSelection(clientKey);
      if (!hasCompleteRtaSelection(selection)) {
        setRtaInfo("Complete all four Red Team roles before initiating a team switch.");
        return;
      }
      const currentSelection = rtaSelectionFromAssignment(assignment);
      if (rtaSelectionsMatch(selection, currentSelection)) {
        setRtaInfo("Select at least one different team member before initiating a switch.");
        return;
      }
      hydrateRtaAssignmentClientFields(assignment, clientKey, client);
      setRtaPendingSubmission(assignment, selection, "switch");
      appendRtaAuditEntry(assignment, `Team switch initiated by ${assignment.requestedBy} on ${assignment.requestedAt}`);
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      setRtaInfo("Team switch submitted for executive confirmation.");
      return;
    }

    const rtaConfirm = clickTarget.closest("[data-rta-confirm]");
    if (rtaConfirm && sunriseControlState) {
      if (!canApproveRtaAssignment()) {
        setRtaInfo("Only DA, CA, or Owner can confirm Red Team assignments.");
        return;
      }
      ensureRtaAssignmentsStore();
      const clientKey = String(rtaConfirm.getAttribute("data-rta-confirm") || "").trim().toLowerCase();
      const assignment = findRtaAssignmentByClientKey(clientKey);
      if (!assignment) return;
      const selection = readRtaSelection(clientKey);
      if (assignment.pendingAction === "clear") {
        if (!canEmptyRtaTeam()) {
          setRtaInfo("Only CA or Owner can confirm Red Team removal.");
          return;
        }
        clearRtaAssignmentState(assignment);
        appendRtaAuditEntry(assignment, `Team cleared by ${buildRtaOperatorLabel()} on ${formatUtcTimestamp(new Date())}`);
        saveSunriseControlState();
        renderCustomSunriseControlPages();
        setRtaInfo("Pending team removal confirmed.");
        return;
      }
      if (!hasCompleteRtaSelection(selection)) {
        setRtaInfo("Complete all four Red Team roles before confirming.");
        return;
      }
      applyRtaSelectionToAssignment(assignment, selection);
      confirmRtaSelection(assignment);
      appendRtaAuditEntry(assignment, `Pending Red Team assignment confirmed by ${assignment.confirmedBy} on ${assignment.confirmedAt}`);
      const infoMessage = "Pending Red Team assignment confirmed.";
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      setRtaInfo(infoMessage);
      return;
    }

    const rtaRevoke = clickTarget.closest("[data-rta-revoke]");
    if (rtaRevoke && sunriseControlState) {
      if (!canManageRtaSwitch()) {
        setRtaInfo("Only DA, CA, or Owner can revoke Red Team confirmation.");
        return;
      }
      ensureRtaAssignmentsStore();
      const clientKey = String(rtaRevoke.getAttribute("data-rta-revoke") || "").trim().toLowerCase();
      const assignment = findRtaAssignmentByClientKey(clientKey);
      if (!assignment) return;
      assignment.status = "Pending Confirmation";
      assignment.pendingAction = "assign";
      assignment.requestedBy = buildRtaOperatorLabel();
      assignment.requestedAt = formatUtcTimestamp(new Date());
      assignment.confirmedBy = "";
      assignment.confirmedAt = "";
      clearPublishedRtaSelection(assignment);
      appendRtaAuditEntry(assignment, `Confirmation revoked by ${assignment.requestedBy} on ${assignment.requestedAt}`);
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      setRtaInfo("Team confirmation revoked. The assignment now requires executive confirmation again.");
      return;
    }

    const rtaEmpty = clickTarget.closest("[data-rta-empty]");
    if (rtaEmpty && sunriseControlState) {
      if (!canEmptyRtaTeam()) {
        setRtaInfo("Only CA or Owner can empty a Red Team assignment.");
        return;
      }
      ensureRtaAssignmentsStore();
      const clientKey = String(rtaEmpty.getAttribute("data-rta-empty") || "").trim().toLowerCase();
      const assignment = findRtaAssignmentByClientKey(clientKey);
      if (!assignment) return;
      const currentSelection = rtaSelectionFromAssignment(assignment);
      const publishedSelection = rtaPublishedSelectionFromAssignment(assignment);
      if (!hasAnyRtaSelection(currentSelection) && !hasAnyRtaSelection(publishedSelection)) {
        setRtaInfo("Team is already empty.");
        return;
      }
      clearRtaAssignmentState(assignment);
      appendRtaAuditEntry(assignment, `Team cleared by ${buildRtaOperatorLabel()} on ${formatUtcTimestamp(new Date())}`);
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      setRtaInfo("Team emptied and removed from the client account view.");
      return;
    }

    const rimAdd = clickTarget.closest("[data-rim-add]");
    if (rimAdd && sunriseControlState) {
      sunriseControlState.rimInvites.push({ id: `RIM-${Math.floor(Math.random() * 900 + 100)}`, name: "New Invite", email: "", country: "", status: "Draft" });
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      return;
    }

    const rimDel = clickTarget.closest("[data-rim-del]");
    if (rimDel && sunriseControlState) {
      sunriseControlState.rimInvites.splice(Number(rimDel.getAttribute("data-rim-del")), 1);
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      return;
    }

    const smcaAdd = clickTarget.closest("[data-smca-add]");
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

    const smcaDel = clickTarget.closest("[data-smca-del]");
    if (smcaDel && sunriseControlState) {
      sunriseControlState.smca.splice(Number(smcaDel.getAttribute("data-smca-del")), 1);
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      return;
    }

    const addService = clickTarget.closest("#soc-add-service");
    if (addService && sunriseControlState) {
      const title = (document.getElementById("soc-new-title")?.value || "").trim();
      const client = (document.getElementById("soc-new-client")?.value || "").trim();
      const tier = (document.getElementById("soc-new-tier")?.value || "Non-Member").trim();
      const desiredExecutionTime = (document.getElementById("soc-new-desired")?.value || "24h").trim();
      if (!title || !client) return;
      sunriseControlState.socServices.current.push(createSocServiceRecord({
        serviceType: title,
        clientName: client,
        tier,
        desiredExecutionTime,
        status: "Assigned"
      }));
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      return;
    }

    const socDelete = clickTarget.closest("[data-soc-delete]");
    if (socDelete && sunriseControlState) {
      const { key, idx } = parseKey(socDelete.getAttribute("data-soc-delete"));
      const list = sunriseControlState.socServices[key] || [];
      const [removed] = list.splice(idx, 1);
      if (removed) sunriseControlState.socServices.deleted.unshift(removed);
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      return;
    }

    const socRestore = clickTarget.closest("[data-soc-restore]");
    if (socRestore && sunriseControlState) {
      const idx = Number(socRestore.getAttribute("data-soc-restore"));
      const [restored] = sunriseControlState.socServices.deleted.splice(idx, 1);
      if (restored) sunriseControlState.socServices.past.unshift(restored);
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      return;
    }

    const socOpen = clickTarget.closest("[data-soc-open]");
    if (socOpen && sunriseControlState) {
      sunriseControlState.socSelectedServiceId = String(socOpen.getAttribute("data-soc-open") || "").toUpperCase();
      saveSunriseControlState();
      renderSOCDetailsPage();
      showRoute("sunrise-soc-details");
      return;
    }

    const socdAddStep = clickTarget.closest("[data-socd-add-step]");
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

    const socdDelStep = clickTarget.closest("[data-socd-del]");
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

    const inboxFolderBtn = clickTarget.closest("[data-inbox-folder]");
    if (inboxFolderBtn && sunriseControlState) {
      const nextFolder = String(inboxFolderBtn.getAttribute("data-inbox-folder") || "inbox");
      closeSunriseInboxMessageOverlay();
      if (shouldUseOwnerGmailInbox()) {
        sunriseOwnerInboxState.info = "";
        if (sunriseControlState?.inbox) {
          sunriseControlState.inbox.selectedMessageId = "";
        }
        await syncOwnerGmailInbox({
          folder: nextFolder,
          clearSelectedMessage: true
        });
        return;
      }
      const applyFolderChange = () => {
        const inbox = sunriseControlState.inbox || {};
        inbox.activeFolder = nextFolder;
        inbox.composeOpen = false;
        inbox.selectedMessageId = "";
        inbox.lastInfo = "";
        sunriseControlState.inbox = inbox;
        saveSunriseControlState({ markDirty: false });
        renderSunriseInboxPage();
      };
      if (hasPendingInboxChanges()) {
        openSunriseUnsavedModal((action) => {
          if (action === "save") {
            commitSunriseChanges();
            applyFolderChange();
          } else if (action === "discard") {
            sunriseHasUnsavedChanges = false;
            updateSunriseSaveButtonsState();
            applyFolderChange();
          }
        });
      } else {
        applyFolderChange();
      }
      return;
    }

    const inboxFolderAdd = clickTarget.closest("[data-inbox-folder-add]");
    if (inboxFolderAdd && sunriseControlState) {
      if (shouldUseOwnerGmailInbox()) {
        const input = document.getElementById("inbox-new-folder");
        const folder = String(input?.value || "").trim();
        if (!folder) return;
        await performOwnerGmailInboxAction("create-folder", {
          name: folder
        }, {
          refreshFolder: folder,
          infoMessage: `Gmail folder "${folder}" created.`
        });
        return;
      }
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

    const inboxSignatureAdd = clickTarget.closest("[data-inbox-signature-add]");
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
      renderSignatureManager();
      return;
    }

    const inboxSignatureDel = clickTarget.closest("[data-inbox-signature-del]");
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
      renderSignatureManager();
      return;
    }

    const inboxSignatureManagerOpen = clickTarget.closest("[data-inbox-signature-manager-open]");
    if (inboxSignatureManagerOpen) {
      renderSignatureManager();
      if (signatureOverlay) signatureOverlay.hidden = false;
      if (signatureInfo && !shouldUseOwnerGmailInbox()) signatureInfo.textContent = "";
      return;
    }

    const inboxComposeNew = clickTarget.closest("[data-inbox-new-compose]");
    if (inboxComposeNew && sunriseControlState) {
      if (sunriseMailTo) sunriseMailTo.value = "";
      if (sunriseMailCc) sunriseMailCc.value = "";
      if (sunriseMailBcc) sunriseMailBcc.value = "";
      if (sunriseMailSubject) sunriseMailSubject.value = "";
      syncOwnerComposeIdentityControls({ forceDefault: true });
      if (sunriseMailBody) sunriseMailBody.value = "";
      if (sunriseMailFont) sunriseMailFont.value = "Arial, sans-serif";
      if (sunriseMailFontSize) sunriseMailFontSize.value = "14";
      if (sunriseMailPriority) sunriseMailPriority.value = "Normal";
      if (sunriseMailSchedule) sunriseMailSchedule.value = "";
      if (sunriseMailAttach) sunriseMailAttach.value = "";
      if (sunriseMailInfo) sunriseMailInfo.textContent = "";
      openSunriseComposeOverlay();
      return;
    }

    const inboxMiniToggle = clickTarget.closest("[data-inbox-toggle-mini]");
    if (inboxMiniToggle) {
      const panel = String(inboxMiniToggle.getAttribute("data-inbox-toggle-mini") || "");
      document.querySelectorAll(".sunriseInboxMiniPanel").forEach((node) => {
        node.classList.toggle("isActive", node.getAttribute("data-mini-panel") === panel);
      });
      return;
    }

    const inboxOpen = clickTarget.closest("[data-inbox-open]");
    if (inboxOpen && sunriseControlState) {
      const id = String(inboxOpen.getAttribute("data-inbox-open") || "");
      if (shouldUseOwnerGmailInbox()) {
        const loaded = await fetchOwnerGmailMessage(id);
        if (loaded && sunriseOwnerInboxState.selectedMessage) {
          openSunriseInboxMessageOverlay(sunriseOwnerInboxState.selectedMessage);
        }
        return;
      }
      const inbox = sunriseControlState.inbox || {};
      const msg = (Array.isArray(inbox.messages) ? inbox.messages : []).find((m) => String(m.id) === id);
      if (!msg) return;
      inbox.selectedMessageId = id;
      sunriseControlState.inbox = inbox;
      saveSunriseControlState();
      renderSunriseInboxPage();
      openSunriseInboxMessageOverlay(msg);
      return;
    }

    const inboxArchive = clickTarget.closest("[data-inbox-archive]");
    if (inboxArchive && sunriseControlState) {
      if (shouldUseOwnerGmailInbox()) {
        const id = String(inboxArchive.getAttribute("data-inbox-archive") || "");
        const currentFolder = ownerInboxActiveFolder();
        const completed = await performOwnerGmailInboxAction("archive", { id }, {
          refreshFolder: currentFolder,
          clearSelectedMessage: true,
          infoMessage: "Email archived."
        });
        if (completed) closeSunriseInboxMessageOverlay();
        return;
      }
      const inbox = sunriseControlState.inbox || {};
      const id = String(inboxArchive.getAttribute("data-inbox-archive") || "");
      const msg = (Array.isArray(inbox.messages) ? inbox.messages : []).find((m) => String(m.id) === id);
      if (!msg) return;
      const currentFolder = String(inbox.activeFolder || "inbox");
      msg.folder = "archive";
      inbox.selectedMessageId = "";
      inbox.activeFolder = currentFolder;
      inbox.lastInfo = "Email archived.";
      sunriseControlState.inbox = inbox;
      saveSunriseControlState();
      renderSunriseInboxPage();
      closeSunriseInboxMessageOverlay();
      return;
    }

    const inboxMove = clickTarget.closest("[data-inbox-move]");
    if (inboxMove && sunriseControlState) {
      if (shouldUseOwnerGmailInbox()) {
        const id = String(inboxMove.getAttribute("data-inbox-move") || "");
        const target = String(document.getElementById("inbox-move-target")?.value || "").trim();
        if (!target) return;
        const currentFolder = ownerInboxActiveFolder();
        const completed = await performOwnerGmailInboxAction("move", {
          id,
          targetFolder: target
        }, {
          refreshFolder: currentFolder,
          clearSelectedMessage: true,
          infoMessage: `Email moved to ${target}.`
        });
        if (completed) closeSunriseInboxMessageOverlay();
        return;
      }
      const inbox = sunriseControlState.inbox || {};
      const id = String(inboxMove.getAttribute("data-inbox-move") || "");
      const target = String(document.getElementById("inbox-move-target")?.value || "").trim();
      if (!target) return;
      const msg = (Array.isArray(inbox.messages) ? inbox.messages : []).find((m) => String(m.id) === id);
      if (!msg) return;
      const currentFolder = String(inbox.activeFolder || "inbox");
      msg.folder = target;
      inbox.activeFolder = currentFolder;
      inbox.selectedMessageId = "";
      inbox.lastInfo = `Email moved to ${target}.`;
      sunriseControlState.inbox = inbox;
      saveSunriseControlState();
      renderSunriseInboxPage();
      closeSunriseInboxMessageOverlay();
      return;
    }

    const inboxDelete = clickTarget.closest("[data-inbox-delete]");
    if (inboxDelete && sunriseControlState) {
      if (shouldUseOwnerGmailInbox()) {
        const id = String(inboxDelete.getAttribute("data-inbox-delete") || "");
        const currentFolder = ownerInboxActiveFolder();
        const completed = await performOwnerGmailInboxAction("trash", { id }, {
          refreshFolder: currentFolder,
          clearSelectedMessage: true,
          infoMessage: "Email moved to trash."
        });
        if (completed) closeSunriseInboxMessageOverlay();
        return;
      }
      const inbox = sunriseControlState.inbox || {};
      const id = String(inboxDelete.getAttribute("data-inbox-delete") || "");
      const msg = (Array.isArray(inbox.messages) ? inbox.messages : []).find((m) => String(m.id) === id);
      if (!msg) return;
      const currentFolder = String(inbox.activeFolder || "inbox");
      msg.folder = "trash";
      inbox.activeFolder = currentFolder;
      inbox.selectedMessageId = "";
      inbox.lastInfo = "Email moved to trash.";
      sunriseControlState.inbox = inbox;
      saveSunriseControlState();
      renderSunriseInboxPage();
      closeSunriseInboxMessageOverlay();
      return;
    }

    const inboxClearTrash = clickTarget.closest("[data-inbox-clear-trash]");
    if (inboxClearTrash && sunriseControlState) {
      if (shouldUseOwnerGmailInbox()) {
        const completed = await performOwnerGmailInboxAction("clear-trash", {}, {
          refreshFolder: "trash",
          clearSelectedMessage: true,
          infoMessage: "Trash cleared permanently."
        });
        if (completed) closeSunriseInboxMessageOverlay();
        return;
      }
      const inbox = sunriseControlState.inbox || {};
      const allMessages = Array.isArray(inbox.messages) ? inbox.messages : [];
      inbox.messages = allMessages.filter((msg) => String(msg.folder || "inbox") !== "trash");
      const selectedId = String(inbox.selectedMessageId || "");
      if (selectedId) {
        const stillExists = inbox.messages.some((m) => String(m.id || "") === selectedId);
        if (!stillExists) inbox.selectedMessageId = "";
      }
      inbox.activeFolder = "trash";
      inbox.lastInfo = "Trash cleared permanently.";
      sunriseControlState.inbox = inbox;
      saveSunriseControlState();
      renderSunriseInboxPage();
      closeSunriseInboxMessageOverlay();
      return;
    }

    const inboxRefresh = clickTarget.closest("[data-inbox-refresh]");
    if (inboxRefresh) {
      if (shouldUseOwnerGmailInbox()) {
        sunriseOwnerInboxState.info = "Refreshing Gmail mirror...";
        await syncOwnerGmailInbox({
          folder: ownerInboxActiveFolder(),
          selectedMessageId: ownerInboxSelectedMessageId()
        });
        return;
      }
      if (sunriseControlState?.inbox) {
        sunriseControlState.inbox.lastInfo = "Inbox refreshed.";
        saveSunriseControlState({ markDirty: false });
      }
      renderSunriseInboxPage();
      return;
    }

    const inboxVacationOpen = clickTarget.closest("[data-inbox-vacation-open]");
    if (inboxVacationOpen) {
      if (shouldUseOwnerGmailInbox()) {
        openOwnerVacationOverlay();
      }
      return;
    }

    const inboxEditorCmd = clickTarget.closest("[data-inbox-editor-cmd]");
    if (inboxEditorCmd) {
      const cmd = String(inboxEditorCmd.getAttribute("data-inbox-editor-cmd") || "");
      const editor = document.getElementById("inbox-editor");
      if (editor) editor.focus();
      if (cmd) document.execCommand(cmd, false);
      return;
    }

    const inboxStylePreset = clickTarget.closest("[data-inbox-style-preset]");
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

    const inboxApplySignature = clickTarget.closest("[data-inbox-apply-signature]");
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

    const inboxSend = clickTarget.closest("[data-inbox-send]");
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
      const sender = sunriseState.email || (activeAccount?.email || "concierge@venture-voyagers.com");
      const senderMailbox = activeSunriseMailbox();
      pushInboxMessage({
        mailbox: senderMailbox,
        folder,
        from: sender,
        to,
        cc,
        bcc,
        subject,
        bodyHtml,
        priority,
        scheduledAt,
        attachments
      });
      routeSunriseInboundCopies({
        senderMailbox,
        from: sender,
        to,
        cc,
        bcc,
        subject,
        bodyHtml,
        priority,
        attachments
      });
      inbox.activeFolder = folder;
      inbox.lastInfo = folder === "sending" ? "Email scheduled and placed in Sending." : "Email sent and moved to Sent.";
      sunriseControlState.inbox = inbox;
      saveSunriseControlState();
      renderSunriseInboxPage();
      return;
    }

    const lcsAdd = clickTarget.closest("[data-lcs-add]");
    if (lcsAdd && sunriseControlState) {
      sunriseControlState.lcsSessions.push({ id: generateGenericNotosSessionId(), code: "OPS1", employee: "New User", loginAt: "", logoutAt: "", loginTs: 0, logoutTs: 0, session: "00hr:00min:00sec", path: "", pathTimeline: [], permission: "Tier-1" });
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      return;
    }

    const lcsSearch = clickTarget.closest("[data-lcs-search]");
    if (lcsSearch) {
      const query = String(document.getElementById("lcs-search")?.value || "").trim();
      renderLCSPage(query);
      return;
    }

    const lcsPathOpen = clickTarget.closest("[data-lcs-path-open]");
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

    const lcsDel = clickTarget.closest("[data-lcs-del]");
    if (lcsDel && sunriseControlState) {
      sunriseControlState.lcsSessions.splice(Number(lcsDel.getAttribute("data-lcs-del")), 1);
      saveSunriseControlState();
      renderCustomSunriseControlPages();
      return;
    }

    const ampSearchBtn = clickTarget.closest("[data-amp-search]");
    if (ampSearchBtn) {
      const query = String(document.getElementById("amp-search")?.value || "").trim();
      renderAMPPage(query);
      return;
    }

    const ampSectionBtn = clickTarget.closest("[data-amp-section]");
    if (ampSectionBtn) {
      sunriseAdminViewState.ampSection = normalizeAdminSection(ampSectionBtn.getAttribute("data-amp-section"));
      const query = String(document.getElementById("amp-search")?.value || "").trim();
      renderAMPPage(query);
      return;
    }

    const ampAdd = clickTarget.closest("[data-amp-add]");
    if (ampAdd) {
      const section = normalizeAdminSection(sunriseAdminViewState.ampSection);
      let seed = Date.now();
      let attempt = 0;
      let key = `manual.${seed}@vvs.com`;
      while (accounts[key]) {
        attempt += 1;
        key = `manual.${seed}.${attempt}@vvs.com`;
      }
      const isStaffSection = section === "staff";
      accounts[key] = {
        email: key,
        password: "",
        secretPhrase: "",
        prefix: "Mr.",
        firstName: "",
        lastName: "",
        country: "",
        phone: "",
        membership: isStaffSection ? "Staff" : "Non-Member",
        sunriseAccessLevel: isStaffSection ? "STA" : "",
        notosId: "",
        servicesCompleted: 0,
        pastService: { title: "No completed service yet", details: "No previous service records available.", endedAt: "N/A" },
        upcomingService: { title: "No upcoming service yet", details: "Book your first VVS service to start your schedule.", startsAt: "N/A" },
        tips: []
      };
      const ampSearch = document.getElementById("amp-search");
      if (ampSearch) ampSearch.value = "";
      saveSunriseControlState();
      renderAMPPage("");
      return;
    }

    const ampDel = clickTarget.closest("[data-amp-del]");
    if (ampDel) {
      const targetKey = String(ampDel.getAttribute("data-amp-del") || "");
      if (isAleksAmpRestrictedKey(targetKey)) {
        if (sunriseInfo) sunriseInfo.textContent = "Access restricted: Mikhail credentials are protected for Aleks Sunrise access.";
        renderAMPPage(String(document.getElementById("amp-search")?.value || "").trim());
        return;
      }
      moveAccountsToDeletedBucket(targetKey);
      saveSunriseControlState();
      renderAMPPage(String(document.getElementById("amp-search")?.value || "").trim());
      return;
    }

    const ampStaffDetails = clickTarget.closest("[data-amp-staff-details]");
    if (ampStaffDetails) {
      openAmpAccountDetails(String(ampStaffDetails.getAttribute("data-amp-staff-details") || ""));
      return;
    }

    const ampCustomerDetails = clickTarget.closest("[data-amp-customer-details]");
    if (ampCustomerDetails) {
      openAmpCustomerDetails(String(ampCustomerDetails.getAttribute("data-amp-customer-details") || ""));
      return;
    }

    const ampRestore = clickTarget.closest("[data-amp-restore]");
    if (ampRestore && sunriseControlState) {
      ensureAmpDeletedAccountsStore();
      const idx = Number(ampRestore.getAttribute("data-amp-restore"));
      if (!Number.isInteger(idx) || idx < 0 || idx >= sunriseControlState.deletedAccounts.length) return;
      const previewRow = sunriseControlState.deletedAccounts[idx];
      if (isAleksAmpRestrictedDeletedRow(previewRow)) {
        if (sunriseInfo) sunriseInfo.textContent = "Access restricted: Mikhail credentials are protected for Aleks Sunrise access.";
        renderAMPPage(String(document.getElementById("amp-search")?.value || "").trim());
        return;
      }
      const [row] = sunriseControlState.deletedAccounts.splice(idx, 1);
      if (!row || !row.account || typeof row.account !== "object") return;
      const key = String(row.email || row.key || "").trim().toLowerCase();
      if (!key) return;
      const restoreKey = accounts[key] ? `${key.split("@")[0]}+restored${Date.now()}@${key.split("@")[1] || "vvs.com"}` : key;
      accounts[restoreKey] = { ...row.account, email: restoreKey };
      saveSunriseControlState();
      renderAMPPage(String(document.getElementById("amp-search")?.value || "").trim());
      return;
    }

    const ampPurge = clickTarget.closest("[data-amp-purge]");
    if (ampPurge && sunriseControlState) {
      ensureAmpDeletedAccountsStore();
      const idx = Number(ampPurge.getAttribute("data-amp-purge"));
      if (!Number.isInteger(idx) || idx < 0 || idx >= sunriseControlState.deletedAccounts.length) return;
      const previewRow = sunriseControlState.deletedAccounts[idx];
      if (isAleksAmpRestrictedDeletedRow(previewRow)) {
        if (sunriseInfo) sunriseInfo.textContent = "Access restricted: Mikhail credentials are protected for Aleks Sunrise access.";
        renderAMPPage(String(document.getElementById("amp-search")?.value || "").trim());
        return;
      }
      sunriseControlState.deletedAccounts.splice(idx, 1);
      saveSunriseControlState();
      renderAMPPage(String(document.getElementById("amp-search")?.value || "").trim());
      return;
    }

    const alpSearchBtn = clickTarget.closest("[data-alp-search]");
    if (alpSearchBtn) {
      const query = String(document.getElementById("alp-search")?.value || "").trim();
      renderALPPage(query);
      return;
    }

    const alpSectionBtn = clickTarget.closest("[data-alp-section]");
    if (alpSectionBtn) {
      sunriseAdminViewState.alpSection = normalizeAdminSection(alpSectionBtn.getAttribute("data-alp-section"));
      const query = String(document.getElementById("alp-search")?.value || "").trim();
      renderALPPage(query);
      return;
    }

    const alpAdd = clickTarget.closest("[data-alp-add]");
    if (alpAdd && sunriseControlState) {
      sunriseControlState.accessLevels.push({ code: "NEW", title: "New Level", access: "Define access rights" });
      saveSunriseControlState();
      scheduleSunriseAdminRenders();
      return;
    }

    const alpDel = clickTarget.closest("[data-alp-del]");
    if (alpDel && sunriseControlState) {
      const idx = Number(alpDel.getAttribute("data-alp-del"));
      if (!Number.isInteger(idx) || idx < 0 || idx >= sunriseControlState.accessLevels.length) return;
      const row = sunriseControlState.accessLevels[idx];
      if (isAleksAlpRestrictedAccessRow(row)) {
        if (sunriseInfo) sunriseInfo.textContent = "Access restricted: Mikhail credentials are protected for Aleks Sunrise access.";
        renderALPPage(String(document.getElementById("alp-search")?.value || "").trim());
        return;
      }
      sunriseControlState.accessLevels.splice(idx, 1);
      saveSunriseControlState();
      scheduleSunriseAdminRenders();
      return;
    }

    const mccSearchBtn = clickTarget.closest("[data-mcc-search]");
    if (mccSearchBtn) {
      const query = String(document.getElementById("mcc-search")?.value || "").trim();
      renderMCCPage(query);
      return;
    }

    const ampCodeSearchBtn = clickTarget.closest("[data-amp-code-search]");
    if (ampCodeSearchBtn) {
      const query = String(document.getElementById("amp-code-search")?.value || "").trim();
      renderAMPPage(query);
      return;
    }

    const alpCodeSearchBtn = clickTarget.closest("[data-alp-code-search]");
    if (alpCodeSearchBtn) {
      const query = String(document.getElementById("alp-code-search")?.value || "").trim();
      renderALPPage(query);
      return;
    }

    const addCodeBtn = clickTarget.closest("[data-mcc-add], [data-amp-code-add], [data-alp-code-add]");
    if (addCodeBtn && sunriseControlState) {
      ensureShortcutCodeRegistry();
      sunriseControlState.shortcutCodes.unshift({
        code: `NEW${Math.floor(Math.random() * 900 + 100)}`,
        title: "New Shortcut",
        route: "sunrise",
        access: "SM,DA,CA,OW"
      });
      syncSunriseDockCodesPreview(sunriseControlState.shortcutCodes);
      saveSunriseControlState();
      scheduleSunriseAdminRenders();
      return;
    }

    const delCodeBtn = clickTarget.closest("[data-code-del]");
    if (delCodeBtn && sunriseControlState) {
      ensureShortcutCodeRegistry();
      const idx = Number(delCodeBtn.getAttribute("data-code-del"));
      if (!Number.isInteger(idx) || idx < 0 || idx >= sunriseControlState.shortcutCodes.length) return;
      sunriseControlState.shortcutCodes.splice(idx, 1);
      syncSunriseDockCodesPreview(sunriseControlState.shortcutCodes);
      saveSunriseControlState();
      scheduleSunriseAdminRenders();
      return;
    }
  });

  document.addEventListener("submit", (event) => {
    const form = event.target instanceof HTMLFormElement ? event.target : null;
    if (!form) return;

    if (form.id === "monarch-auth-form") {
      event.preventDefault();
      const operator = getCurrentSunriseOperator() || activeAccount || null;
      const ownerProfile = currentMonarchOwnerProfile(operator);
      const codeInput = document.getElementById("monarch-owner-code");
      const passwordInput = document.getElementById("monarch-owner-password");
      const notosInput = document.getElementById("monarch-owner-notos");
      const infoEl = document.getElementById("monarch-auth-info");
      if (!ownerProfile) return;
      const code = String(codeInput?.value || "").trim();
      const password = String(passwordInput?.value || "").trim();
      const notosId = String(notosInput?.value || "").trim();
      const expectedNotos = String(ownerProfile.notosId || "").trim();
      const authorized = code === ownerProfile.code
        && password === ownerProfile.password
        && notosId === expectedNotos;
      if (!authorized) {
        monarchArchangelRuntime.unlocked = false;
        monarchArchangelRuntime.ownerOperatorCode = "";
        monarchArchangelRuntime.info = "Access denied. Use the owner-specific MA code, password, and linked NOTOS ID.";
        if (infoEl) infoEl.textContent = monarchArchangelRuntime.info;
        return;
      }
      monarchArchangelRuntime.unlocked = true;
      monarchArchangelRuntime.ownerOperatorCode = ownerProfile.operatorCode;
      monarchArchangelRuntime.info = "";
      renderMonarchArchangelPage();
    }
  });

  document.addEventListener("input", (event) => {
    const target = event.target instanceof HTMLElement ? event.target : null;
    if (!target) return;

    if (target.hasAttribute("data-owner-signature-editor")) {
      syncOwnerSignatureEditorValue(String(target.getAttribute("data-owner-signature-editor") || "").trim());
      return;
    }

    if (target.id === "monarch-search") {
      monarchArchangelRuntime.filterQuery = String(target instanceof HTMLInputElement ? target.value : "").trim();
      return;
    }
  });

  document.addEventListener("change", (event) => {
    const t = event.target;
    if (!(t instanceof HTMLElement) || !sunriseControlState) return;

    if (t.id === "sunrise-mail-font" && sunriseMailBody) {
      sunriseMailBody.style.fontFamily = String((t instanceof HTMLSelectElement ? t.value : "Arial, sans-serif") || "Arial, sans-serif");
      return;
    }
    if (t.id === "sunrise-mail-from" && t instanceof HTMLSelectElement) {
      const signatureSelect = document.getElementById("sunrise-mail-signature");
      const profiles = ownerInboxSignatureProfiles();
      if (signatureSelect instanceof HTMLSelectElement && !profiles.some((profile) => profile.id === signatureSelect.value)) {
        signatureSelect.value = String(ownerInboxDefaultSignatureProfile()?.id || "");
      }
      return;
    }
    if (t.id === "sunrise-mail-font-size" && sunriseMailBody) {
      sunriseMailBody.style.fontSize = `${String((t instanceof HTMLSelectElement ? t.value : "14") || "14")}px`;
      return;
    }

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
      renderSignatureManager();
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
    if (updateField("data-ecs-division", (raw) => { sunriseControlState.ecsEmployees[Number(raw)].division = normalizeStaffDivision(t.value, sunriseControlState.ecsEmployees[Number(raw)]?.position || ""); })) return;
    if (updateField("data-ecs-rta", (raw) => { sunriseControlState.ecsEmployees[Number(raw)].rtaRoles = normalizeRtaRoles(t.value, sunriseControlState.ecsEmployees[Number(raw)]?.position || ""); })) return;
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

    if (updateField("data-owner-signature-name", (raw) => {
      const profiles = ownerInboxSignatureProfiles();
      const idx = profiles.findIndex((profile) => profile.id === String(raw || "").trim());
      if (idx < 0) return;
      profiles[idx].name = String(t.value || "").trim() || profiles[idx].name;
      saveOwnerSignatureProfiles(profiles, String(sunriseControlState?.inbox?.ownerDefaultSignatureId || defaultOwnerSignaturePresetId()).trim());
      syncOwnerComposeIdentityControls();
    })) return;
    if (updateField("data-owner-signature-html", (raw) => {
      const profiles = ownerInboxSignatureProfiles();
      const idx = profiles.findIndex((profile) => profile.id === String(raw || "").trim());
      if (idx < 0) return;
      profiles[idx].signatureHtml = String(t.value || "");
      saveOwnerSignatureProfiles(profiles, String(sunriseControlState?.inbox?.ownerDefaultSignatureId || defaultOwnerSignaturePresetId()).trim());
      const preview = t.closest(".sunriseInboxSignatureItem")?.querySelector(".sunriseInboxMessageBody");
      if (preview instanceof HTMLElement) {
        preview.innerHTML = profiles[idx].signatureHtml || "<p class='profileNote'>No owner signature configured.</p>";
      }
      syncOwnerComposeIdentityControls();
    })) return;
    if (updateField("data-owner-signature-default", (raw) => {
      const profiles = ownerInboxSignatureProfiles();
      saveOwnerSignatureProfiles(profiles, String(raw || "").trim() || defaultOwnerSignaturePresetId());
      syncOwnerComposeIdentityControls({ forceDefault: true });
      renderSignatureManager();
    })) return;

    if (updateField("data-inbox-signature-name", (raw) => {
      const inbox = sunriseControlState.inbox || {};
      const idx = Number(raw);
      if (!Array.isArray(inbox.signatures)) inbox.signatures = [];
      if (inbox.signatures[idx]) inbox.signatures[idx].name = t.value;
      sunriseControlState.inbox = inbox;
      renderSignatureManager();
    })) return;
    if (updateField("data-inbox-signature-text", (raw) => {
      const inbox = sunriseControlState.inbox || {};
      const idx = Number(raw);
      if (!Array.isArray(inbox.signatures)) inbox.signatures = [];
      if (inbox.signatures[idx]) inbox.signatures[idx].text = t.value;
      sunriseControlState.inbox = inbox;
      renderSignatureManager();
    })) return;
    if (updateField("data-inbox-signature-image", (raw) => {
      const inbox = sunriseControlState.inbox || {};
      const idx = Number(raw);
      if (!Array.isArray(inbox.signatures)) inbox.signatures = [];
      if (inbox.signatures[idx]) inbox.signatures[idx].imageName = t.value;
      sunriseControlState.inbox = inbox;
      renderSignatureManager();
    })) return;
    if (updateField("data-inbox-signature-default", (raw) => {
      const inbox = sunriseControlState.inbox || {};
      inbox.defaultSignatureId = String(raw || "");
      inbox.lastInfo = "Default signature preset updated.";
      sunriseControlState.inbox = inbox;
      renderSunriseInboxPage();
      renderSignatureManager();
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
    if (updateField("data-socd-client-title", () => {
      const meta = findServiceMetaById(sunriseControlState.socSelectedServiceId);
      if (meta) meta.service.clientTitle = t.value.trim();
    })) return;
    if (updateField("data-socd-client-email", () => {
      const meta = findServiceMetaById(sunriseControlState.socSelectedServiceId);
      if (meta) {
        meta.service.clientEmail = t.value.trim();
        meta.service.clientAccountEmail = normalizeEmailAddress(t.value);
      }
    })) return;
    if (updateField("data-socd-client-phone", () => {
      const meta = findServiceMetaById(sunriseControlState.socSelectedServiceId);
      if (meta) meta.service.clientPhone = t.value.trim();
    })) return;
    if (updateField("data-socd-client-country", () => {
      const meta = findServiceMetaById(sunriseControlState.socSelectedServiceId);
      if (meta) {
        const nextCountry = t.value.trim();
        meta.service.clientCountry = nextCountry ? countryDisplayName(nextCountry) : "";
      }
    })) return;
    if (updateField("data-socd-client-contact", () => {
      const meta = findServiceMetaById(sunriseControlState.socSelectedServiceId);
      if (meta) meta.service.preferredContactMethod = t.value.trim().toLowerCase();
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
    if (updateField("data-lcs-path", (raw) => { sunriseControlState.lcsSessions[Number(raw)].path = t.value; })) return;
    if (updateField("data-lcs-permission", (raw) => { sunriseControlState.lcsSessions[Number(raw)].permission = t.value; })) return;

    const syncUpdatedAccount = (updatedKey) => syncChangedAccountState(updatedKey);

    const updateAccountField = (attr, handler) => {
      const raw = t.getAttribute(attr);
      if (raw == null) return false;
      const key = String(raw).trim().toLowerCase();
      if (!accounts[key]) return false;
      if (attr.startsWith("data-amp-") && isOwnerAccount(accounts[key]) && !canEditAmpOwnerAccount(key)) {
        if (sunriseInfo) sunriseInfo.textContent = "Access restricted: owner credentials are not editable from this Sunrise session.";
        scheduleSunriseAdminRenders();
        return true;
      }
      if (attr.startsWith("data-amp-") && isAleksAmpRestrictedKey(key)) {
        if (sunriseInfo) sunriseInfo.textContent = "Access restricted: Mikhail credentials are protected for Aleks Sunrise access.";
        scheduleSunriseAdminRenders();
        return true;
      }
      const updatedKey = handler(key) || key;
      syncUpdatedAccount(updatedKey);
      saveSunriseControlState();
      return true;
    };
    if (updateAccountField("data-amp-key", (key) => {
      const nextKey = String(t.value || "").trim().toLowerCase();
      if (!nextKey || nextKey === key) return key;
      return renameBaseAccountKey(key, nextKey);
    })) return;
    if (updateAccountField("data-amp-email", (key) => {
      const nextEmail = String(t.value || "").trim().toLowerCase();
      if (!nextEmail) return key;
      return renameBaseAccountKey(key, nextEmail);
    })) return;
    if (updateAccountField("data-amp-sunrise-email", (key) => {
      const nextEmail = String(t.value || "").trim().toLowerCase();
      if (!nextEmail) return key;
      renameLinkedSunriseCredentialKey(key, nextEmail);
      return key;
    })) return;
    if (updateAccountField("data-amp-phone", (key) => {
      accounts[key].phone = String(t.value || "").trim();
    })) return;
    if (updateAccountField("data-amp-country", (key) => {
      const nextCountry = String(t.value || "").trim();
      accounts[key].country = nextCountry ? countryDisplayName(nextCountry) : "";
      accounts[key].countryCode = nextCountry ? String(resolveCountryCode(nextCountry) || nextCountry).trim().toUpperCase() : "";
    })) return;
    if (updateAccountField("data-amp-contact", (key) => {
      const nextMethod = String(t.value || "").trim().toLowerCase();
      accounts[key].preferredContactMethod = nextMethod;
      accounts[key].lastContactMethod = nextMethod;
    })) return;
    if (updateAccountField("data-amp-title", (key) => {
      accounts[key].prefix = String(t.value || "").trim();
    })) return;
    if (updateAccountField("data-amp-role", (key) => {
      accounts[key].roleTitle = String(t.value || "").trim();
    })) return;
    if (updateAccountField("data-amp-password", (key) => {
      if (isOwnerAccount(accounts[key]) && !canEditAmpOwnerAccount(key)) return key;
      syncCredentialFieldAcrossLinkedAccounts(key, "password", t.value);
      return key;
    })) return;
    if (updateAccountField("data-amp-secret", (key) => {
      if (isOwnerAccount(accounts[key]) && !canEditAmpOwnerAccount(key)) return key;
      syncCredentialFieldAcrossLinkedAccounts(key, "secretPhrase", t.value);
      return key;
    })) return;
    if (updateAccountField("data-amp-name", (key) => {
      const [first = "", ...rest] = String(t.value || "").trim().split(/\s+/);
      accounts[key].firstName = first;
      accounts[key].lastName = rest.join(" ");
    })) return;
    if (updateAccountField("data-amp-tier", (key) => { accounts[key].membership = String(t.value || "").trim() || "Non-Member"; })) return;
    if (updateAccountField("data-amp-access", (key) => { accounts[key].sunriseAccessLevel = t.value.trim().toUpperCase(); })) return;
    if (updateAccountField("data-amp-notos", (key) => { accounts[key].notosId = t.value.trim().toUpperCase(); })) return;

    const handleAlpFieldUpdate = (attr, mutator) => {
      const raw = t.getAttribute(attr);
      if (raw == null || !sunriseControlState) return false;
      const idx = Number(raw);
      if (!Number.isInteger(idx) || idx < 0 || idx >= sunriseControlState.accessLevels.length) return true;
      const row = sunriseControlState.accessLevels[idx];
      if (isAleksAlpRestrictedAccessRow(row)) {
        if (sunriseInfo) sunriseInfo.textContent = "Access restricted: Mikhail credentials are protected for Aleks Sunrise access.";
        renderALPPage(String(document.getElementById("alp-search")?.value || "").trim());
        return true;
      }
      mutator(row);
      saveSunriseControlState();
      scheduleSunriseAdminRenders();
      return true;
    };

    if (handleAlpFieldUpdate("data-alp-code", (row) => {
      row.code = String(t.value || "").trim().toUpperCase();
    })) return;
    if (handleAlpFieldUpdate("data-alp-title", (row) => {
      row.title = t.value;
    })) return;
    if (handleAlpFieldUpdate("data-alp-access", (row) => {
      row.access = t.value;
    })) return;

    if (updateField("data-code-key", (raw) => {
      ensureShortcutCodeRegistry();
      const idx = Number(raw);
      if (!sunriseControlState.shortcutCodes[idx]) return;
      sunriseControlState.shortcutCodes[idx].code = String(t.value || "").trim().toUpperCase();
      syncSunriseDockCodesPreview(sunriseControlState.shortcutCodes);
      scheduleSunriseAdminRenders();
    })) return;
    if (updateField("data-code-title", (raw) => {
      ensureShortcutCodeRegistry();
      const idx = Number(raw);
      if (!sunriseControlState.shortcutCodes[idx]) return;
      sunriseControlState.shortcutCodes[idx].title = String(t.value || "").trim();
      syncSunriseDockCodesPreview(sunriseControlState.shortcutCodes);
      scheduleSunriseAdminRenders();
    })) return;
    if (updateField("data-code-route", (raw) => {
      ensureShortcutCodeRegistry();
      const idx = Number(raw);
      if (!sunriseControlState.shortcutCodes[idx]) return;
      sunriseControlState.shortcutCodes[idx].route = String(t.value || "").trim();
      syncSunriseDockCodesPreview(sunriseControlState.shortcutCodes);
      scheduleSunriseAdminRenders();
    })) return;
    if (updateField("data-code-access", (raw) => {
      ensureShortcutCodeRegistry();
      const idx = Number(raw);
      if (!sunriseControlState.shortcutCodes[idx]) return;
      if (t instanceof HTMLSelectElement) {
        const values = Array.from(t.selectedOptions || []).map((opt) => String(opt.value || "").trim().toUpperCase()).filter(Boolean);
        sunriseControlState.shortcutCodes[idx].access = values.join(",");
      } else {
        sunriseControlState.shortcutCodes[idx].access = String(t.value || "").trim().toUpperCase();
      }
      syncSunriseDockCodesPreview(sunriseControlState.shortcutCodes);
      scheduleSunriseAdminRenders();
    })) return;
  });

  if (document.body.dataset.filePickerBound !== "1") {
    document.body.dataset.filePickerBound = "1";
    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const trigger = target.closest("[data-file-trigger]");
      if (!trigger) return;
      const targetId = String(trigger.getAttribute("data-file-trigger") || "").trim();
      if (!targetId) return;
      const input = document.getElementById(targetId);
      if (!(input instanceof HTMLInputElement) || input.type !== "file") return;
      try {
        if (typeof input.showPicker === "function") input.showPicker();
        else input.click();
      } catch (_) {
        try { input.click(); } catch (_) {}
      }
    });
  }
}

function syncEcsWithStaffAccounts() {
  if (!sunriseControlState) return;
  if (!Array.isArray(sunriseControlState.ecsEmployees)) sunriseControlState.ecsEmployees = [];
  const existingByEmail = new Map(
    sunriseControlState.ecsEmployees
      .map((row, idx) => [String(row?.email || "").trim().toLowerCase(), idx])
      .filter(([email]) => !!email)
  );
  let changed = false;
  Object.entries(accounts).forEach(([key, account]) => {
    if (!account || typeof account !== "object") return;
    if (account.sunriseCredential) return;
    const membership = String(account.membership || "").trim().toLowerCase();
    if (membership !== "staff") return;
    const email = String(account.email || key || "").trim().toLowerCase();
    if (!email) return;
    const fullName = `${String(account.firstName || "").trim()} ${String(account.lastName || "").trim()}`.trim() || "Staff Member";
    const position = String(account.roleTitle || "Staff").trim();
    const division = normalizeStaffDivision(account.staffDivision, position);
    const rtaRoles = normalizeRtaRoles(account.rtaRoles, position);
    if (existingByEmail.has(email)) {
      const row = sunriseControlState.ecsEmployees[existingByEmail.get(email)];
      if (!row) return;
      const nextPermission = String(account.sunriseAccessLevel || row.permission || "STA").trim().toUpperCase();
      if (row.name !== fullName) { row.name = fullName; changed = true; }
      if (row.position !== position) { row.position = position; changed = true; }
      if (row.role !== position) { row.role = position; changed = true; }
      if (row.division !== division) { row.division = division; changed = true; }
      if (JSON.stringify(normalizeRtaRoles(row.rtaRoles, row.position)) !== JSON.stringify(rtaRoles)) { row.rtaRoles = rtaRoles; changed = true; }
      if (row.login !== email) { row.login = email; changed = true; }
      if (row.permission !== nextPermission) { row.permission = nextPermission; changed = true; }
      if (!row.status) { row.status = "Active"; changed = true; }
      if (!row.id) row.id = `EMP-${Math.floor(Math.random() * 900 + 100)}`;
      return;
    }
    sunriseControlState.ecsEmployees.push({
      id: `EMP-${Math.floor(Math.random() * 900 + 100)}`,
      name: fullName,
      role: position,
      position,
      division,
      rtaRoles,
      salary: 0,
      hours: 0,
      bonus: 0,
      commission: 0,
      status: "Active",
      email,
      login: email,
      permission: String(account.sunriseAccessLevel || "STA").trim().toUpperCase()
    });
    changed = true;
  });
  if (changed) saveSunriseControlState({ markDirty: false });
}

function enhanceFilePickers(root = document) {
  const scope = (root && typeof root.querySelectorAll === "function") ? root : document;
  const fileInputs = scope.querySelectorAll("input[type=\"file\"]");
  fileInputs.forEach((input, idx) => {
    if (!(input instanceof HTMLInputElement)) return;
    if (input.dataset.fileEnhanced === "1") return;
    if (!input.id) input.id = `vvs-file-${Date.now()}-${idx}`;
    const wrap = document.createElement("div");
    wrap.className = "filePickerWrap";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "filePickerBtn";
    btn.setAttribute("data-file-trigger", input.id);
    btn.textContent = "Choose File";
    const name = document.createElement("span");
    name.className = "filePickerName";
    name.id = `${input.id}-name`;
    name.textContent = "No file selected";
    const parent = input.parentElement;
    if (!parent) return;
    parent.insertBefore(wrap, input);
    wrap.appendChild(input);
    wrap.appendChild(btn);
    wrap.appendChild(name);
    input.classList.add("filePickerNative");
    input.dataset.fileEnhanced = "1";
    input.addEventListener("change", () => {
      const files = input.files ? Array.from(input.files).map((f) => f.name) : [];
      name.textContent = files.length ? files.join(", ") : "No file selected";
    });
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
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const email = form.querySelector(".sunrise-client-email");
      const info = form.parentElement ? form.parentElement.querySelector(".sunrise-reply-info") : null;
      const address = email ? email.value.trim() : "client";
      const bodyText = String(form.querySelector(".sunrise-client-reply")?.value || "");
      pushInboxMessage({
        mailbox: activeSunriseMailbox(),
        folder: "sent",
        from: sunriseState.email || "concierge@venture-voyagers.com",
        to: address,
        subject: "VVS Survey Response",
        bodyHtml: `<p>${bodyText.replace(/\n/g, "<br>")}</p>`,
        priority: "Normal"
      });
      const delivery = await deliverSunriseEmail({
        to: address,
        subject: "VVS Survey Response",
        html: `<p>${bodyText.replace(/\n/g, "<br>")}</p>`,
        text: bodyText,
        from: sunriseState.email || "concierge@venture-voyagers.com",
        replyTo: sunriseState.email || "concierge@venture-voyagers.com"
      });
      if (info) {
        info.textContent = delivery.ok
          ? `Reply sent to ${address}.`
          : (delivery.skipped
            ? `Reply stored locally for ${address}. External delivery will work in Cloudflare Pages runtime.`
            : `Reply stored locally, but external delivery failed: ${delivery.message}`);
      }
      form.reset();
    });
    form.dataset.boundReply = "1";
  });
}

initializeAccountsData();
removeAutoGeneratedAmpNoise();
hydrateManagedStaffDirectory();
normalizeAllAccountRecords();
ensureSunriseCredentials();
restoreProtectedOwnerCredentials();
pruneDuplicateSunriseCredentials();
normalizeAllAccountRecords();
persistAccountsData();

sunriseControlState = loadSunriseControlState();
syncEcsWithStaffAccounts();
ensureRtaAssignmentsStore();
ensureSocServicesStore();
syncRedTeamAssignmentsToClientAccounts();
syncSocServicesToClientAccounts();
try {
  localStorage.setItem(SUNRISE_CONTROL_DATA_KEY, JSON.stringify(sunriseControlState));
} catch (_) {}
sunriseCommittedStateHash = snapshotSunriseControlState();
sunriseHasUnsavedChanges = false;
ensureShortcutCodeRegistry();
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
  sunriseCommittedStateHash = snapshotSunriseControlState();
  sunriseHasUnsavedChanges = false;
  try { bindSunriseControlInteractions(); } catch (_) {}
}
refreshSharedAccountRegistry({ mergeIntoAccounts: true, persistLocal: true }).finally(() => {
  queueSharedRegistryBackfill();
  applyUpgradeInviteFromUrl();
});
if (document.body.dataset.sunrisePersistFlushBound !== "1") {
  document.body.dataset.sunrisePersistFlushBound = "1";
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flushSunriseControlState();
  });
  window.addEventListener("pagehide", () => {
    flushSunriseControlState();
  });
}
if (!sunriseSessionTicker) {
  sunriseSessionTicker = window.setInterval(() => {
    updateSunriseSessionBar();
  }, 1000);
}
if (sameConciergeBtn) {
  sameConciergeBtn.addEventListener("click", () => {
    if (!activeAccount) return;
    const assigned = currentAssignedConcierge;
    const label = assigned ? `${assigned.name} (${assigned.role})` : "assigned concierge";
    if (sameConciergeResult) sameConciergeResult.textContent = `Availability check submitted for ${label}. Concierge desk will confirm assignment shortly.`;
  });
}

if (profileSubmitServiceBtn) {
  profileSubmitServiceBtn.addEventListener("click", () => {
    showRoute("contact");
  });
}

if (profileSubmitServiceTopBtn) {
  profileSubmitServiceTopBtn.addEventListener("click", () => {
    showRoute("contact");
  });
}

if (sunriseStep1) {
  sunriseStep1.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!hasSunriseAccess(activeAccount)) {
      if (sunriseInfo) sunriseInfo.textContent = "Sunrise-enabled account required.";
      return;
    }

    const emailEl = document.getElementById("sunrise-email");
    const passwordEl = document.getElementById("sunrise-password");
    const email = emailEl ? emailEl.value.trim() : "";
    const password = passwordEl ? passwordEl.value.trim() : "";
    if (!email || !password) {
      if (sunriseInfo) sunriseInfo.textContent = "Enter Sunrise email and password.";
      return;
    }
    const account = findAccountByEmail(email);
    if (isAleksRestrictedFromMikhailSunrise(account)) {
      if (sunriseInfo) sunriseInfo.textContent = "Access restricted: Aleks Sunrise profile cannot open Mikhail Sunrise credentials.";
      return;
    }
    if (account && isSunriseCredentialAccount(account)) {
      const activeOwner = !!(activeAccount && isOwnerAccount(activeAccount));
      const ownerTarget = isOwnerAccount(account);
      if (!activeOwner && ownerTarget) {
        resetSunriseState({ clearStoredSession: false });
        blockSunriseOwnerBreachAttempt();
        return;
      }
    }
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
    if (shouldBypassOwnerEmailVerification(account)) {
      if (sunriseStep2) {
        sunriseStep2.hidden = true;
        sunriseStep2.reset();
      }
      if (sunriseInfo) sunriseInfo.textContent = "Owner Sunrise verification confirmed. Unlocking control.";
      finalizeSunriseUnlock(account);
      return;
    }
    sunriseState.code = issueTestEmailCode(sunriseState.email);
    const delivery = await sendVerificationCodeEmail({
      email: sunriseState.email,
      code: sunriseState.code,
      context: "sunrise",
      name: verificationRecipientName(account)
    });

    sunriseStep1.hidden = false;
    if (sunriseStep2) sunriseStep2.hidden = false;
    if (sunriseInfo) {
      sunriseInfo.textContent = buildVerificationDispatchMessage({
        email: sunriseState.email,
        code: sunriseState.code,
        context: "sunrise",
        delivery
      });
    }
  });
}

if (sunriseStep2) {
  sunriseStep2.addEventListener("submit", (event) => {
    event.preventDefault();
    const phraseEl = document.getElementById("sunrise-phrase");
    const codeEl = document.getElementById("sunrise-code");
    const phrase = phraseEl ? phraseEl.value.trim().toLowerCase() : "";
    const code = codeEl ? codeEl.value.trim() : "";
    if (!phrase || !code) {
      if (sunriseInfo) sunriseInfo.textContent = "Enter secret phrase and email confirmation code.";
      return;
    }
    const account = sunriseState.account || findAccountByEmail(sunriseState.email);
    if (isAleksRestrictedFromMikhailSunrise(account)) {
      if (sunriseInfo) sunriseInfo.textContent = "Access restricted: Aleks Sunrise profile cannot open Mikhail Sunrise credentials.";
      sunriseState.pendingAccount = null;
      return;
    }

    const phraseOk = !!(account && phrase && phrase === String(account.secretPhrase || "").toLowerCase());
    const codeOk = !!(code && code === sunriseState.code);
    const owner = isOwnerAccount(account);
    const actingOwner = isOwnerAccount(activeAccount);
    if (!phraseOk || !codeOk) {
      if (sunriseInfo) sunriseInfo.textContent = "Sunrise verification failed. Confirm secret phrase and code.";
      return;
    }

    if (owner || actingOwner) {
      finalizeSunriseUnlock(account);
      return;
    }

    sunriseState.pendingAccount = account;
    if (sunriseNotosOverlay) sunriseNotosOverlay.hidden = false;
    if (sunriseNotosInput) sunriseNotosInput.value = "";
    if (sunriseNotosInfo) sunriseNotosInfo.textContent = "NOTOS Employee ID is required to continue.";
  });
}

const verifySunriseNotosPopup = () => {
  const account = sunriseState.pendingAccount || sunriseState.account || findAccountByEmail(sunriseState.email);
  if (!account) {
    if (sunriseNotosInfo) sunriseNotosInfo.textContent = "Session expired. Restart Sunrise login.";
    return;
  }
  if (isOwnerAccount(account)) {
    finalizeSunriseUnlock(account);
    return;
  }
  const enteredId = String(sunriseNotosInput?.value || "").trim().toUpperCase();
  if (!enteredId) {
    if (sunriseNotosInfo) sunriseNotosInfo.textContent = "NOTOS Employee ID is required.";
    return;
  }
  let expected = String(account.notosId || "").trim().toUpperCase();
  if (!expected) {
    if (!/^NTS-[A-Z0-9]{5,8}$/.test(enteredId)) {
      if (sunriseNotosInfo) sunriseNotosInfo.textContent = "Invalid NOTOS ID format. Use NTS-XXXXX format.";
      return;
    }
    expected = enteredId;
    account.notosId = expected;
    const accountKey = String(account.email || "").trim().toLowerCase();
    if (accountKey) accounts[accountKey] = account;
    if (activeAccount && String(activeAccount.email || "").trim().toLowerCase() === accountKey) {
      activeAccount.notosId = expected;
      persistActiveSession(activeAccount);
    }
    persistAccountsData();
  }
  if (enteredId !== expected) {
    if (sunriseNotosInfo) sunriseNotosInfo.textContent = "Incorrect NOTOS Employee ID.";
    return;
  }
  if (sunriseNotosInfo) sunriseNotosInfo.textContent = "";
  finalizeSunriseUnlock(account);
};

if (sunriseNotosSubmit && sunriseNotosSubmit.dataset.boundNotosVerify !== "1") {
  sunriseNotosSubmit.addEventListener("click", verifySunriseNotosPopup);
  sunriseNotosSubmit.dataset.boundNotosVerify = "1";
}

if (sunriseNotosInput && sunriseNotosInput.dataset.boundNotosEnter !== "1") {
  sunriseNotosInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      verifySunriseNotosPopup();
    }
  });
  sunriseNotosInput.dataset.boundNotosEnter = "1";
}

if (sunriseOwnerAlertBtn && sunriseOwnerAlertBtn.dataset.boundOwnerAlert !== "1") {
  sunriseOwnerAlertBtn.addEventListener("click", () => {
    const requester = activeAccount
      ? `${String(activeAccount.prefix || "Mr.").trim()} ${String(activeAccount.firstName || "").trim()} ${String(activeAccount.lastName || "").trim()}`.replace(/\s+/g, " ").trim()
      : "Unknown user";
    if (sunriseControlState) {
      ownerSunriseMailboxes().forEach((mailbox) => {
        pushInboxMessage({
          mailbox,
          folder: "inbox",
          from: "notos.alert@venture-voyagers.com",
          to: "owner@venture-voyagers.com",
          cc: "",
          bcc: "",
          subject: "NOTOS Critical Warning - Sunrise Owner Access Attempt",
          bodyHtml: `<p>Unauthorized Sunrise owner-access attempt detected from VVS account: ${requester}.</p><p>Action requested: credential breach review.</p>`,
          priority: "High",
          scheduledAt: "",
          attachments: []
        });
      });
      const inbox = sunriseControlState.inbox || {};
      inbox.lastInfo = "NOTOS critical alert sent to owner inbox.";
      sunriseControlState.inbox = inbox;
      saveSunriseControlState({ markDirty: false });
    }
    resetSunriseState({ clearStoredSession: false });
    if (sunriseOwnerAlertOverlay) sunriseOwnerAlertOverlay.hidden = true;
    showRoute("sunrise");
    if (sunriseInfo) {
      sunriseInfo.textContent = "NOTOS critical alert sent. Returned to Sunrise log in.";
    }
  });
  sunriseOwnerAlertBtn.dataset.boundOwnerAlert = "1";
}

if (sunriseUnsavedSaveBtn && sunriseUnsavedSaveBtn.dataset.boundUnsavedSave !== "1") {
  sunriseUnsavedSaveBtn.addEventListener("click", () => resolveSunriseUnsavedModal("save"));
  sunriseUnsavedSaveBtn.dataset.boundUnsavedSave = "1";
}
if (sunriseUnsavedDiscardBtn && sunriseUnsavedDiscardBtn.dataset.boundUnsavedDiscard !== "1") {
  sunriseUnsavedDiscardBtn.addEventListener("click", () => resolveSunriseUnsavedModal("discard"));
  sunriseUnsavedDiscardBtn.dataset.boundUnsavedDiscard = "1";
}
if (sunriseUnsavedStayBtn && sunriseUnsavedStayBtn.dataset.boundUnsavedStay !== "1") {
  sunriseUnsavedStayBtn.addEventListener("click", () => resolveSunriseUnsavedModal("cancel"));
  sunriseUnsavedStayBtn.dataset.boundUnsavedStay = "1";
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    closeAccountSettingsOverlay();
    activeAccount = null;
    resetSunriseState();
    clearActiveSession();
    updateAuthCta();
    forceShowRoute("account");
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

const forceSubmitOnClick = (formId) => {
  const form = document.getElementById(formId);
  if (!form) return;
  const submitBtn = form.querySelector('button[type="submit"]');
  if (!submitBtn || submitBtn.dataset.forceSubmitBound === "1") return;
  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  });
  submitBtn.dataset.forceSubmitBound = "1";
};

forceSubmitOnClick("login-step1");
forceSubmitOnClick("login-step2");
forceSubmitOnClick("signup-step1");
forceSubmitOnClick("signup-step2");
forceSubmitOnClick("sunrise-step1");
forceSubmitOnClick("sunrise-step2");
setupSunriseShortcutMenu();
