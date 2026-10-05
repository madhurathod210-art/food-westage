/**
 * ==============================================================================
 * Food Bridge - Master Application Layer (js/app.js)
 * Pure Vanilla JavaScript (ES6+), Vanilla-Tilt.js, QRCode.js (CDN)
 * ==============================================================================
 * Modules:
 * 1. Dynamic Live Date & Time Clock Engine
 * 2. Bilingual (EN / TE) i18n Translation Dictionary & UI Engine
 * 3. Web Speech API Voice Accessibility Engine
 * 4. Data Schema & LocalStorage Multi-Key Persistence
 * 5. SPA Hash Router & Glassmorphic Navigation
 * 6. Community Impact Leaderboard (Top Donors & Volunteer Drivers)
 * 7. Real-Time Expiry Countdown Engine & Urgency Badges
 * 8. Environmental Impact Calculator Slider & Milestone Badges
 * 9. Find Food Controller, Speech Readout & Safe Handling Reservation Modal
 * 10. Donate Food Form, Image Upload & Dynamic QR Code Safety Passport
 * 11. IoT Smart Hardware Telemetry Layer, Dual Streams & Telegram Alert Log
 * 12. Volunteer Multi-Stop Route Optimizer & Google Maps Waypoints Generator
 * 13. Corporate CSR & Tax Exemption Audit Certificate Generator
 * 14. Contact & Emergency Rescue Support Desk Controller
 * 15. Admin Portal (CRUD, Add Freezer & CSV Data Export)
 * ==============================================================================
 */

(function () {
  'use strict';

  // ============================================================================
  // 1. DYNAMIC LIVE DATE & TIME CLOCK ENGINE
  // ============================================================================
    function updateLiveDateClock() {
    const now = new Date();
    const isTelugu = (typeof currentLang !== 'undefined' && currentLang === 'te');
    const locale = isTelugu ? 'te-IN' : 'en-US';

    const dayName = now.toLocaleDateString(locale, { weekday: 'long' });
    const fullDate = now.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' });
    const timeStr = now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

    const dateDisplayEl = document.getElementById('currentDateDisplay');
    if (dateDisplayEl) {
      dateDisplayEl.innerHTML = '<span class="date-day">' + dayName + '</span>, <span class="date-full">' + fullDate + '</span> <span class="date-time-sep">•</span> <span class="date-time-val">' + timeStr + '</span>';
    }

    const heroDateEl = document.getElementById('heroLiveDate');
    if (heroDateEl) {
      heroDateEl.textContent = dayName + ', ' + fullDate + ' • ' + timeStr;
    }

    const footerDateTimeEl = document.getElementById('footerDateTimeDisplay');
    if (footerDateTimeEl) {
      footerDateTimeEl.textContent = dayName + ', ' + fullDate + ' • ' + timeStr;
    }

    const auditDateEl = document.getElementById('csrAuditTimestamp');
    if (auditDateEl) {
      auditDateEl.textContent = now.toISOString().slice(0, 10);
    }
  }

  function startLiveDateTimer() {
    updateLiveDateClock();
    setInterval(updateLiveDateClock, 1000);
  }

  // ============================================================================
  // 2. I18N BILINGUAL DICTIONARY (ENGLISH & TELUGU)
  // ============================================================================
    const TRANSLATIONS = {
    en: {
      brandName: 'Food Bridge',
      navHome: 'Home',
      navFindFood: 'Find Food',
      navDonate: 'Donate',
      navFridges: 'Fridges, Freezers & IoT',
      navVolunteer: 'Volunteer Dispatch',
      navContact: 'Contact & Support',
      navAdmin: 'Admin Portal',
      heroTag: 'IoT-Connected Smart Food Rescue Network',
      heroTitle1: 'Share Food.',
      heroTitle2: 'Spread Hope.',
      heroSubtitle: 'Wholesome surplus food belongs on neighborhood tables, not in landfills. Connect restaurants, grocers, volunteer drivers, and 24/7 public community refrigerators equipped with live IoT telemetry in real time.',
      btnFindFood: 'Find Available Food',
      btnDonateFood: 'Donate Surplus Food',
      btnHotline: '24/7 Rescue Desk',
      heroLiveNetwork: 'Live IoT Telemetry Stream Active',
      heroCardTitle: 'Smart Community Fridges & Freezers',
      heroCardDesc: 'Public chillers with real-time temperature telemetry, load-cell capacity monitoring, and digital QR safety passports.',
      statFreeAccess: 'Free Access',
      statAvgTemp: 'Avg Chiller Temp',
      statDispatch: 'Avg Dispatch',
      metricRescued: 'Total Rescued Food',
      metricRescuedSub: 'Edible surplus diverted from local landfills directly to neighborhood pantries.',
      metricMeals: 'Nutritious Meals Provided',
      metricMealsSub: 'Wholesome food portions delivered based on standard 0.4 kg / meal benchmarks.',
      metricCarbon: 'CO₂e Emissions Prevented',
      metricCarbonSub: 'Greenhouse gases mitigated by preventing anaerobic decomposition (2.5 kg CO₂e / kg).',
      metricWater: 'Water Footprint Saved',
      metricWaterSub: 'Embedded agricultural freshwater conserved by preventing food disposal (1,000 L / kg).',
      badgeHallOfFame: 'Hall of Fame',
      titleLeaderboard: 'Community Impact Leaderboard',
      descLeaderboard: 'Recognizing our top corporate food donors and volunteer rescue drivers creating extraordinary climate and social impact.',
      lblTopDonors: 'Top Food Donors & Kitchens',
      lblMonthlyRank: 'Monthly Ranking',
      lblTopVolunteers: 'Top Rescue Drivers',
      lblVerifiedTrips: 'Verified Trips',
      badgeCalculator: 'Interactive Tool',
      titleCalculator: 'Environmental & Social Impact Calculator',
      descCalculator: 'Move the slider to estimate weekly carbon, water, and meal equivalents prevented from landfill disposal.',
      lblSurplusPerWeek: 'Estimated Weekly Surplus Rescued (Kilograms):',
      calcMealsTitle: 'Meals Provided / Wk',
      calcCo2Title: 'CO₂e Mitigated / Wk',
      calcWaterTitle: 'Water Conserved / Wk',
      calcTreesTitle: 'Yearly Tree Equivalent',
      titleMilestones: 'Community Impact Milestone Badges',
      badgeLiveDirectory: 'Live Directory',
      titleFindFood: 'Available Food Listings',
      descFindFood: 'Browse wholesome surplus meals with real-time countdown timers, voice read-aloud assistance, and verified food safety compliance.',
      optAllCategories: 'All Categories',
      optCookedMeals: '🍲 Cooked Meals',
      optRawProduce: '🥦 Raw Produce',
      optBakery: '🥖 Bakery',
      optPackaged: '📦 Packaged',
      optAllFridges: 'All Locations / Fridges',
      optAllStatuses: 'All Statuses',
      optAvailableOnly: '🟢 Available Only',
      optInTransit: '🚗 In Transit',
      optReserved: '🟡 Reserved',
      optCollected: '⚪ Collected',
      optExpired: '🔴 Expired',
      btnNearestFridge: 'Nearest Fridge (GPS)',
      btnPostDonation: 'Post Donation',
      lblVerifiedActive: 'Verified Surplus Listings:',
      badgeFoodSharing: 'Food Sharing',
      titleDonateFood: 'Donate Surplus Food',
      descDonateFood: 'List edible surplus from your kitchen, grocery, or catering service. Instant QR Code Food Safety Passport generated automatically upon submission.',
      lblDonorName: 'Donor / Business Name:',
      lblFoodItemName: 'Food Item Title:',
      lblCategory: 'Category:',
      lblQuantityDesc: 'Quantity & Packaging Description:',
      lblWeightKg: 'Estimated Total Weight (kg):',
      lblTargetFridge: 'Designated Community Refrigerator:',
      lblPrepTime: 'Preparation / Packaging Timestamp:',
      lblDeadline: 'Safe Expiry Deadline:',
      lblPhotoUpload: 'Food Photo (Optional):',
      lblContactPhone: 'Contact Phone Number:',
      lblAllergens: 'Allergen Information & Handling Notes:',
      chkSafetyTemp: 'I certify this food was prepared hygienically and maintained at safe temperatures (≤ 4°C for chilled or ≥ 60°C for hot foods).',
      chkSafetyPack: 'Containers and packaging are clean, intact, food-grade, and securely sealed.',
      chkSafetyFresh: 'No spoiled, contaminated, or past-use ingredients were included in this donation.',
      btnPublishDonation: 'Publish Donation & Generate QR Passport',
      badgeIotHardware: 'IoT Smart Hardware',
      titleFridges: 'Community Refrigerator & Deep Freezer Network (IoT Telemetry)',
      descFridges: 'Live monitoring of temperature sensors, door security readouts, load-cell capacities, and simulated Telegram emergency dispatch notifications.',
      btnFindFridgesNearMe: 'Find Nearest Freezer / Fridge',
      btnStockFridge: 'Stock a Location',
      badgeMultiStop: 'Multi-Stop Rescue Engine',
      titleVolunteer: 'Volunteer Dispatch & Delivery Coordinator',
      descVolunteer: 'Compile single or multiple donor pickups into a waypoint route mapped into Google Maps navigation ending at local community refrigerators.',
      badgeGetInTouch: 'Get in Touch',
      titleContact: '24/7 Community Rescue & Support Hotline',
      descContact: 'Have surplus food to report, need community pantry assistance, or want to host a Smart Community Fridge in your neighborhood? Our team is available 24/7.',
            badgeEcoCalc: 'Interactive Calculator',
      titleEcoCalc: 'Environmental & Social Impact Calculator',
      descEcoCalc: 'Move the slider to estimate weekly carbon, water, and meal equivalents prevented from landfill disposal.',
      lblSafetyHeading: 'Food Safety Inspection & Verification',
      lblSafetySub: 'Ensure compliance with public health standards before publishing.',
      titleVolunteerReg: 'Volunteer Driver Registration',
      modalSafeTitle: 'Safe Handling Verification Checklist',
      badgeAdmin: 'Operations Hub',
      titleAdmin: 'Platform Administration & Telemetry Console',
      descAdmin: 'Comprehensive operational controls for food donations, community refrigerators, volunteer dispatches, and CSV audit reports.'
    },
    te: {
      brandName: 'ఫుడ్ వేస్టేజ్',
      navHome: 'హోమ్',
      navFindFood: 'ఆహారం కనుగొనండి',
      navDonate: 'దానం చేయండి',
      navFridges: 'ఫ్రిజ్‌లు, ఫ్రీజర్‌లు & IoT',
      navVolunteer: 'వాలంటీర్ డిస్పాచ్',
      navContact: 'సంప్రదించండి',
      navAdmin: 'అడ్మిన్ పోర్టల్',
      heroTag: 'IoT అనుసంధానిత స్మార్ట్ ఫుడ్ రెస్క్యూ నెట్‌వర్క్',
      heroTitle1: 'ఆహారాన్ని పంచుకోండి.',
      heroTitle2: 'ఆశను పంచండి.',
      heroSubtitle: 'మిగిలిన నాణ్యమైన ఆహారం చెత్తకుండీల్లో కాకుండా సమాజ ప్రజల కంచాలలో చేరాలి. రెస్టారెంట్లు, వాలంటీర్లు మరియు కమ్యూనిటీ ఫ్రిజ్‌లను రియల్ టైమ్‌లో అనుసంధానించండి.',
      btnFindFood: 'లభ్యమయ్యే ఆహారాన్ని చూడండి',
      btnDonateFood: 'ఆహారాన్ని దానం చేయండి',
      btnHotline: '24/7 హెల్ప్‌లైన్',
      heroLiveNetwork: 'లైవ్ IoT టెలిమెట్రీ సక్రియంగా ఉంది',
      heroCardTitle: 'స్మార్ట్ కమ్యూనిటీ ఫ్రిజ్‌లు & ఫ్రీజర్‌లు',
      heroCardDesc: 'రియల్-టైమ్ ఉష్ణోగ్రత టెలిమెట్రీ, కెపాసిటీ పర్యవేక్షణ మరియు డిజిటల్ QR భద్రతా పాస్‌పోర్ట్‌లతో కూడిన పబ్లిక్ చిల్లర్లు.',
      statFreeAccess: 'ఉచిత ప్రవేశం',
      statAvgTemp: 'సగటు ఉష్ణోగ్రత',
      statDispatch: 'సగటు డిస్పాచ్',
      metricRescued: 'మొత్తం రక్షించిన ఆహారం',
      metricRescuedSub: 'ల్యాండ్‌ఫిల్‌ల నుండి రక్షించబడి కమ్యూనిటీ ప్యాంట్రీలకు చేరిన ఆహారం.',
      metricMeals: 'అందించిన పోషక భోజనాలు',
      metricMealsSub: '0.4 కిలోల ప్రమాణం ఆధారంగా అందించిన పోషక భోజనాలు.',
      metricCarbon: 'నివారించిన CO₂e ఉద్గారాలు',
      metricCarbonSub: 'ఆహార వ్యర్థాలు కుళ్ళకుండా నివారించడం ద్వారా తగ్గిన కాలుష్యం.',
      metricWater: 'ఆదా చేసిన సాగునీరు',
      metricWaterSub: 'ఆహారాన్ని కాపాడటం ద్వారా ఆదా అయిన వ్యవసాయ తాగునీరు.',
      badgeHallOfFame: 'హాల్ ఆఫ్ ఫేమ్',
      titleLeaderboard: 'కమ్యూనిటీ ఇంపాక్ట్ లీడర్‌బోర్డ్',
      descLeaderboard: 'అత్యుత్తమ ఆహార దాతలు మరియు వాలంటీర్ డ్రైవర్ల గుర్తింపు.',
      lblTopDonors: 'అగ్రశ్రేణి ఆహార దాతలు',
      lblMonthlyRank: 'నెలవారీ ర్యాంకింగ్',
      lblTopVolunteers: 'అగ్రశ్రేణి రెస్క్యూ డ్రైవర్లు',
      lblVerifiedTrips: 'ధృవీకరించిన ట్రిప్‌లు',
      badgeCalculator: 'ఇంటరాక్టివ్ కాలిక్యులేటర్',
      titleCalculator: 'పర్యావరణ & సామాజిక ప్రభావ కాలిక్యులేటర్',
      descCalculator: 'మీరు రక్షించిన ఆహారంతో పర్యావరణానికి కలిగే లాభాలను లెక్కించండి.',
      lblSurplusPerWeek: 'వారపు అంచనా రక్షించిన ఆహారం (కిలోలలో):',
      calcMealsTitle: 'అందించే భోజనాలు / వారం',
      calcCo2Title: 'తగ్గిన CO₂e / వారం',
      calcWaterTitle: 'ఆదా చేసిన నీరు / వారం',
      calcTreesTitle: 'చెట్లకు సమానం',
      titleMilestones: 'కమ్యూనిటీ మైలురాళ్ల బ్యాడ్జ్‌లు',
      badgeLiveDirectory: 'ప్రత్యక్ష డైరెక్టరీ',
      titleFindFood: 'లభ్యమయ్యే ఆహార జాబితా',
      descFindFood: 'రియల్-టైమ్ కౌంట్‌డౌన్ టైమర్‌లు మరియు వాయిస్ సహాయంతో ఆహారాన్ని బ్రౌజ్ చేయండి.',
      optAllCategories: 'అన్ని రకాలు',
      optCookedMeals: '🍲 వండిన భోజనం',
      optRawProduce: '🥦 కూరగాయలు & పండ్లు',
      optBakery: '🥖 బేకరీ ఆహారం',
      optPackaged: '📦 ప్యాకేజ్డ్ ఆహారం',
      optAllFridges: 'అన్ని ప్రాంతాల ఫ్రిజ్‌లు',
      optAllStatuses: 'అన్ని స్థితులు',
      optAvailableOnly: '🟢 లభ్యమయ్యేవి మాత్రమే',
      optInTransit: '🚗 రవాణాలో ఉన్నవి',
      optReserved: '🟡 రిజర్వ్ అయినవి',
      optCollected: '⚪ తీసుకున్నవి',
      optExpired: '🔴 గడువు ముగిసినవి',
      btnNearestFridge: 'సమీప ఫ్రిజ్ (GPS)',
      btnPostDonation: 'దానం నమోదు చేయండి',
      lblVerifiedActive: 'ధృవీకరించిన మిగులు ఆహారం:',
      badgeFoodSharing: 'ఆహార భాగస్వామ్యం',
      titleDonateFood: 'మిగులు ఆహారాన్ని దానం చేయండి',
      descDonateFood: 'మీ హోటల్, ఫంక్షన్ హాల్ లేదా దుకాణం నుండి మిగిలిన మంచి ఆహారాన్ని నమోదు చేయండి.',
      lblDonorName: 'దాత / సంస్థ పేరు:',
      lblFoodItemName: 'ఆహార పదార్థం పేరు:',
      lblCategory: 'వర్గం:',
      lblQuantityDesc: 'పరిమాణం & ప్యాకేజింగ్ వివరాలు:',
      lblWeightKg: 'మొత్తం బరువు (కిలోలలో):',
      lblTargetFridge: 'లక్ష్య కమ్యూనిటీ ఫ్రిజ్:',
      lblPrepTime: 'తయారీ సమయం:',
      lblDeadline: 'సురక్షిత గడువు తేదీ:',
      lblPhotoUpload: 'ఆహార ఫోటో (ఐచ్ఛికం):',
      lblContactPhone: 'సంప్రదింపు ఫోన్ నంబర్:',
      lblAllergens: 'అలెర్జీ & భద్రతా వివరాలు:',
      chkSafetyTemp: 'ఆహారం పరిశుభ్రమైన వాతావరణంలో సురక్షిత ఉష్ణోగ్రత వద్ద నిల్వ చేయబడిందని ధృవీకరిస్తున్నాను.',
      chkSafetyPack: 'ప్యాకింగ్ శుభ్రంగా, పటిష్టంగా మరియు మూసివేయబడి ఉంది.',
      chkSafetyFresh: 'ఎటువంటి పాడైన లేదా కలుషితమైన పదార్థాలు ఇందులో లేవు.',
      btnPublishDonation: 'దానాన్ని ప్రచురించండి & QR పాస్‌పోర్ట్ పొందండి',
      badgeIotHardware: 'IoT స్మార్ట్ హార్డ్‌వేర్',
      titleFridges: 'కమ్యూనిటీ రిఫ్రిజిరేటర్ & డీప్ ఫ్రీజర్ నెట్‌వర్క్',
      descFridges: 'ఉష్ణోగ్రత సెన్సార్లు మరియు డోర్ సెక్యూరిటీని ప్రత్యక్షంగా పర్యవేక్షించండి.',
      btnFindFridgesNearMe: 'సమీప ఫ్రిజ్ లేదా ఫ్రీజర్‌ను కనుగొనండి',
      btnStockFridge: 'ఫ్రిజ్‌లో ఆహారాన్ని ఉంచండి',
      badgeMultiStop: 'మల్టీ-స్టాప్ రెస్క్యూ ఇంజిన్',
      titleVolunteer: 'వాలంటీర్ డిస్పాచ్ & డెలివరీ సమన్వయం',
      descVolunteer: 'ఆహార సేకరణ కోసం గూగుల్ మ్యాప్స్ ద్వారా మార్గాలను సిద్ధం చేయండి.',
      badgeGetInTouch: 'మమ్మల్ని సంప్రదించండి',
      titleContact: '24/7 కమ్యూనిటీ రెస్క్యూ హెల్ప్‌లైన్',
      descContact: 'ఆహార సహాయం లేదా కమ్యూనిటీ ఫ్రిజ్ ఏర్పాటు కోసం మా బృందాన్ని సంప్రదించండి.',
            badgeEcoCalc: 'ఇంటరాక్టివ్ కాలిక్యులేటర్',
      titleEcoCalc: 'పర్యావరణ & సామాజిక ప్రభావ కాలిక్యులేటర్',
      descEcoCalc: 'మీరు రక్షించిన ఆహారంతో పర్యావరణానికి కలిగే లాభాలను లెక్కించండి.',
      lblSafetyHeading: 'ఆహార భద్రతా తనిఖీ & ధృవీకరణ',
      lblSafetySub: 'ఆహార నాణ్యతా ప్రమాణాల పాటించడాన్ని నిర్ధారించండి.',
      titleVolunteerReg: 'వాలంటీర్ డ్రైవర్ నమోదు',
      modalSafeTitle: 'సురక్షిత ఆహార తనిఖీ జాబితా',
      badgeAdmin: 'నిర్వహణ కేంద్రం',
      titleAdmin: 'ప్లాట్‌ఫామ్ అడ్మినిస్ట్రేషన్ & టెలిమెట్రీ కన్సోల్',
      descAdmin: 'ఆహార దానాలు, కమ్యూనిటీ ఫ్రిజ్‌లు మరియు నివేదికల పూర్తి నియంత్రణ.'
    }
  };

  let currentLang = 'en';

  function applyTranslations(lang) {
    currentLang = lang;
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    const langSelect = document.getElementById('langSelect');
    if (langSelect && langSelect.value !== lang) {
      langSelect.value = lang;
    }

    updateLiveDateClock();
  }

  function setupLanguageSwitcher() {
    const select = document.getElementById('langSelect');
    if (!select || select.getAttribute('data-wired') === 'true') return;
    select.setAttribute('data-wired', 'true');

    select.addEventListener('change', (e) => {
      applyTranslations(e.target.value);
      showToast(e.target.value === 'te' ? '🌐 భాష తెలుగుకు మార్చబడింది' : '🌐 Language switched to English', 'info');
    });
  }

  // ============================================================================
  // 3. WEB SPEECH API VOICE ACCESSIBILITY
  // ============================================================================
  function speakText(text) {
    if (!('speechSynthesis' in window)) {
      showToast('Text-to-speech is not supported in this browser.', 'error');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLang === 'te' ? 'te-IN' : 'en-US';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }

  // ============================================================================
  // 4. DATA SCHEMA & LOCALSTORAGE INITIALIZATION
  // ============================================================================
  const STORAGE_KEYS = {
    FRIDGES: 'communityFridges',
    DONATIONS: 'foodDonations',
    VOLUNTEERS: 'volunteers',
    COLLECTIONS: 'foodCollections',
    CONTACTS: 'contactInquiries'
  };

  const getOffsetIso = (hoursFromNow) => {
    const d = new Date(Date.now() + hoursFromNow * 3600 * 1000);
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

    const INITIAL_FRIDGES = [
    {
      id: 'fridge_1',
      name: 'Downtown Civic Dual Chiller & Deep Freezer Hub',
      address: '42 Market Square, Downtown Civic Plaza',
      landmark: 'Opposite Central Public Library, Ground Floor Ramp',
      city: 'Downtown Metro',
      operatingHours: '24/7 Open Access',
      unitType: 'Dual Refrigerator & Deep Freezer',
      hasFreezer: true,
      freezerType: 'Sub-Zero Compartment (-18°C)',
      capacityStatus: '70% Full',
      maxSlots: 20,
      usedSlots: 14,
      freezerMaxSlots: 10,
      freezerUsedSlots: 6,
      temperature: '3.2°C',
      freezerTemperature: '-18.6°C',
      doorStatus: 'Closed',
      lastCleaned: 'Today, 08:30 AM',
      lat: 40.7128,
      lng: -74.0060,
      contactPerson: 'Sarah Jenkins (+1 555-0192)',
      suitableFor: 'Cooked meals, dairy, fresh greens & frozen prepared meal trays'
    },
    {
      id: 'fridge_2',
      name: 'Green Park Dedicated Commercial Deep Freezer',
      address: '15 Green Park Boulevard, West Pavilion',
      landmark: 'Adjacent to Community Center West Gate (Solar Canopy)',
      city: 'Green Park District',
      operatingHours: '6:00 AM – 10:00 PM',
      unitType: 'Dedicated Deep Chest Freezer (-18°C)',
      hasFreezer: true,
      freezerType: 'Commercial Deep Chest Freezer',
      capacityStatus: '50% Full',
      maxSlots: 16,
      usedSlots: 8,
      freezerMaxSlots: 16,
      freezerUsedSlots: 8,
      temperature: '-18.4°C',
      freezerTemperature: '-18.4°C',
      doorStatus: 'Closed',
      lastCleaned: 'Today, 07:15 AM',
      lat: 40.7282,
      lng: -73.9942,
      contactPerson: 'David Ross (+1 555-0144)',
      suitableFor: 'Bulk frozen meats, frozen vegetable soups, ice-cream, frozen baked goods'
    },
    {
      id: 'fridge_3',
      name: 'Metro West Transit Hub Cold-Chain Vault',
      address: '88 West Transit Concourse, Lower Level',
      landmark: 'Ground Concourse near Subway Platform 2 Entry',
      city: 'Westside Transit Hub',
      operatingHours: '24/7 Open Access',
      unitType: 'Dual Pantry, Chiller & Freezer Vault',
      hasFreezer: true,
      freezerType: 'Integrated Sub-Zero Locker',
      capacityStatus: '35% Full',
      maxSlots: 24,
      usedSlots: 8,
      freezerMaxSlots: 12,
      freezerUsedSlots: 3,
      temperature: '2.9°C',
      freezerTemperature: '-19.1°C',
      doorStatus: 'Closed',
      lastCleaned: 'Yesterday, 09:00 PM',
      lat: 40.7505,
      lng: -73.9934,
      contactPerson: 'Amira Patel (+1 555-0188)',
      suitableFor: 'Commuter packaged meals, fresh sandwiches, frozen box lunches'
    },
    {
      id: 'fridge_4',
      name: 'Riverside Commons Solar Smart Refrigerator',
      address: '201 River Road, Civic Pavilion',
      landmark: 'Next to Riverside Community Garden Greenhouse',
      city: 'Riverside District',
      operatingHours: '7:00 AM – 11:00 PM',
      unitType: 'Smart Monitored Refrigerator & Pantry',
      hasFreezer: false,
      freezerType: 'Standard Chiller Only',
      capacityStatus: '65% Full',
      maxSlots: 18,
      usedSlots: 12,
      freezerMaxSlots: 0,
      freezerUsedSlots: 0,
      temperature: '3.5°C',
      freezerTemperature: 'N/A',
      doorStatus: 'Closed',
      lastCleaned: 'Today, 06:45 AM',
      lat: 40.7831,
      lng: -73.9712,
      contactPerson: 'Carlos Mendez (+1 555-0176)',
      suitableFor: 'Harvested garden greens, fresh fruit, chilled beverages & bakery items'
    },
    {
      id: 'fridge_5',
      name: 'Eastside University Student Food Rescue Freezer',
      address: '500 Campus Walk, Student Union North Plaza',
      landmark: 'Ground Floor, North Entry near Campus Dining Hall',
      city: 'University Heights',
      operatingHours: '24/7 Open Access',
      unitType: 'Dedicated Deep Chest Freezer (-18°C)',
      hasFreezer: true,
      freezerType: 'High-Capacity Campus Deep Freezer',
      capacityStatus: '45% Full',
      maxSlots: 20,
      usedSlots: 9,
      freezerMaxSlots: 20,
      freezerUsedSlots: 9,
      temperature: '-19.2°C',
      freezerTemperature: '-19.2°C',
      doorStatus: 'Closed',
      lastCleaned: 'Today, 09:00 AM',
      lat: 40.8075,
      lng: -73.9626,
      contactPerson: 'Elena Rostova (+1 555-0219)',
      suitableFor: 'Student cafeteria frozen surplus, batch-cooked meals, frozen bread'
    },
    {
      id: 'fridge_6',
      name: 'Harbor Community Center Walk-in Cold Hub',
      address: '310 Harbor Boulevard, Dockside Pavilion',
      landmark: 'Inside Community Center Lobby, Bay 4',
      city: 'Harbor District',
      operatingHours: '8:00 AM – 9:00 PM',
      unitType: 'Dual Refrigerator & Deep Freezer',
      hasFreezer: true,
      freezerType: 'Commercial Reach-in Freezer (-18°C)',
      capacityStatus: '80% Full',
      maxSlots: 30,
      usedSlots: 24,
      freezerMaxSlots: 15,
      freezerUsedSlots: 12,
      temperature: '3.0°C',
      freezerTemperature: '-18.0°C',
      doorStatus: 'Closed',
      lastCleaned: 'Today, 08:00 AM',
      lat: 40.7012,
      lng: -74.0150,
      contactPerson: 'Marcus Vance (+1 555-0233)',
      suitableFor: 'Fishery & maritime market surplus, restaurant prep batches, chilled produce'
    }
  ];

  const INITIAL_DONATIONS = [
    {
      id: 'don_101',
      donorName: 'Green Olive Bistro',
      foodName: 'Mediterranean Vegetable Pasta',
      category: 'Cooked Meals',
      quantity: '12 meal boxes',
      weightKg: 6.0,
      prepTime: getOffsetIso(-2),
      expiryDeadline: getOffsetIso(18),
      fridgeId: 'fridge_1',
      allergens: 'Contains wheat/gluten. Vegetarian. Packaged in sealed compostable boxes.',
      contactNumber: '+1 555-0192',
      status: 'Available',
      safetyVerified: true,
      pickupPin: '4821',
      createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
    },
    {
      id: 'don_102',
      donorName: 'Sunny Orchard Co-op',
      foodName: 'Organic Crisp Apples & Pears',
      category: 'Raw Produce',
      quantity: '15 kg fresh crate',
      weightKg: 15.0,
      prepTime: getOffsetIso(-5),
      expiryDeadline: getOffsetIso(72),
      fridgeId: 'fridge_2',
      allergens: 'None. Freshly washed whole fruit.',
      contactNumber: '+1 555-0144',
      status: 'Available',
      safetyVerified: true,
      pickupPin: '6319',
      createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString()
    },
    {
      id: 'don_103',
      donorName: 'Artisan Crust Bakery',
      foodName: 'Artisan Sourdough & Seeded Rye',
      category: 'Bakery',
      quantity: '18 loaves',
      weightKg: 9.0,
      prepTime: getOffsetIso(-4),
      expiryDeadline: getOffsetIso(3.5),
      fridgeId: 'fridge_1',
      allergens: 'May contain sesame seeds. Dairy-free.',
      contactNumber: '+1 555-0192',
      status: 'Available',
      safetyVerified: true,
      pickupPin: '2940',
      createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString()
    },
    {
      id: 'don_104',
      donorName: 'Daily Harvest Supermarket',
      foodName: 'Greek Yogurt & Fortified Oat Milk',
      category: 'Packaged',
      quantity: '24 sealed cartons',
      weightKg: 12.0,
      prepTime: getOffsetIso(-10),
      expiryDeadline: getOffsetIso(0.75),
      fridgeId: 'fridge_3',
      allergens: 'Contains dairy (yogurt) and gluten/oats (milk).',
      contactNumber: '+1 555-0188',
      status: 'Available',
      safetyVerified: true,
      pickupPin: '8172',
      createdAt: new Date(Date.now() - 10 * 3600 * 1000).toISOString()
    },
    {
      id: 'don_105',
      donorName: 'Civic Banquet Caterers',
      foodName: 'Roasted Herb Potatoes & Steamed Veggies',
      category: 'Cooked Meals',
      quantity: '8 catering trays',
      weightKg: 10.5,
      prepTime: getOffsetIso(-3),
      expiryDeadline: getOffsetIso(12),
      fridgeId: 'fridge_4',
      allergens: 'Vegan. Gluten-free.',
      contactNumber: '+1 555-0176',
      status: 'In Transit',
      claimedBy: 'Jordan Miller (Volunteer)',
      pickupPin: '5538',
      safetyVerified: true,
      createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString()
    }
  ];

  function initStorage(forceReset = false) {
    if (forceReset || !localStorage.getItem(STORAGE_KEYS.FRIDGES)) {
      localStorage.setItem(STORAGE_KEYS.FRIDGES, JSON.stringify(INITIAL_FRIDGES));
    }
    if (forceReset || !localStorage.getItem(STORAGE_KEYS.DONATIONS)) {
      localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(INITIAL_DONATIONS));
    }
    if (forceReset || !localStorage.getItem(STORAGE_KEYS.VOLUNTEERS)) {
      localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify([
        { id: 'vol_01', name: 'Jordan Miller', phone: '(555) 019-2834', email: 'jordan@example.com', location: 'Downtown', tasks: ['pickup', 'maintenance'], registeredAt: new Date().toISOString() },
        { id: 'vol_02', name: 'Elena Rostova', phone: '(555) 014-9921', email: 'elena@example.com', location: 'West End', tasks: ['pickup', 'distribution'], registeredAt: new Date().toISOString() }
      ]));
    }
    if (forceReset || !localStorage.getItem(STORAGE_KEYS.COLLECTIONS)) {
      localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify([]));
    }
    if (forceReset || !localStorage.getItem(STORAGE_KEYS.CONTACTS)) {
      localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify([]));
    }
  }

  function getFridges() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FRIDGES);
      return data ? JSON.parse(data) : INITIAL_FRIDGES;
    } catch (e) {
      return INITIAL_FRIDGES;
    }
  }

  function saveFridges(fridges) {
    localStorage.setItem(STORAGE_KEYS.FRIDGES, JSON.stringify(fridges));
  }

  function getDonations() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DONATIONS);
      return data ? JSON.parse(data) : INITIAL_DONATIONS;
    } catch (e) {
      return INITIAL_DONATIONS;
    }
  }

  function saveDonations(donations) {
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(donations));
  }

  function getCollections() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COLLECTIONS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCollections(collections) {
    localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(collections));
  }

  function getVolunteers() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.VOLUNTEERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveVolunteers(volunteers) {
    localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify(volunteers));
  }

  function getContactInquiries() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CONTACTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveContactInquiries(list) {
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(list));
  }

  // Global State
  let userCoords = null;
  let sortByProximity = false;
  let pendingCollectDonation = null;
  let pendingTransportDonation = null;
  let selectedBatchIds = [];
  let iotStreamMode = 'live';
  let uploadedImageBase64 = null;
  // Leaflet.js Live Food Surplus Map State
  let foodMap = null;
  let foodMarkersLayer = null;
  let userLocationMarker = null;
  let userAccuracyCircle = null;
  let foodMapMarkers = {};
  let activeMapRadius = 'all';
  let currentMapViewMode = 'split';

  // ============================================================================
  // 5. PARALLAX & TOAST NOTIFICATIONS
  // ============================================================================
  function refreshTilt() {}

  function showToast(message, type = 'success') {
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toastContainer';
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = `toast-message toast-${type}`;
    const icon = type === 'success' ? '✅' : type === 'error' ? '⚠️' : 'ℹ️';

    toast.innerHTML = `
      <span class="toast-icon" aria-hidden="true">${icon}</span>
      <div class="toast-text">${message}</div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => toast.classList.add('toast-show'), 10);
    setTimeout(() => {
      toast.classList.remove('toast-show');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 4200);
  }

  function showConfirmModal(title, message, onConfirm) {
    let modalOverlay = document.getElementById('confirmModalOverlay');
    if (!modalOverlay) {
      modalOverlay = document.createElement('div');
      modalOverlay.id = 'confirmModalOverlay';
      modalOverlay.className = 'modal-overlay';
      modalOverlay.innerHTML = `
        <div class="modal-content-box" role="dialog" aria-modal="true">
          <h3 id="modalTitle">Confirm Action</h3>
          <p id="modalMessage" style="margin: 0.8rem 0 1.5rem 0; color: var(--text-muted);"></p>
          <div class="modal-btn-group">
            <button type="button" class="btn btn-outline btn-sm" id="modalCancelBtn">Cancel</button>
            <button type="button" class="btn btn-danger btn-sm" id="modalConfirmBtn">Proceed</button>
          </div>
        </div>
      `;
      document.body.appendChild(modalOverlay);
    }

    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').textContent = message;
    modalOverlay.classList.add('modal-active');

    const closeModal = () => modalOverlay.classList.remove('modal-active');
    document.getElementById('modalCancelBtn').onclick = closeModal;
    modalOverlay.onclick = (e) => { if (e.target === modalOverlay) closeModal(); };

    document.getElementById('modalConfirmBtn').onclick = () => {
      closeModal();
      if (typeof onConfirm === 'function') onConfirm();
    };
  }

  // ============================================================================
  // 6. SPA HASH ROUTER & NAVIGATION
  // ============================================================================
  const VALID_ROUTES = ['home', 'find-food', 'donate', 'fridges', 'volunteer', 'contact', 'admin'];
  const DEFAULT_ROUTE = 'home';

  function navigateTo(route) {
    const cleanRoute = (route || '').replace(/^#/, '').trim();
    const targetRoute = VALID_ROUTES.includes(cleanRoute) ? cleanRoute : DEFAULT_ROUTE;
    if (window.location.hash !== '#' + targetRoute) {
      window.location.hash = '#' + targetRoute;
    }
    handleRoute();
  }

  function handleRoute() {
    const rawHash = window.location.hash.replace(/^#/, '').trim();
    const activeRoute = VALID_ROUTES.includes(rawHash) ? rawHash : DEFAULT_ROUTE;

    // 1. Toggle SPA Views
    const views = document.querySelectorAll('.app-view');
    views.forEach(view => {
      const isMatch = view.id === `view-${activeRoute}` || view.id === activeRoute;
      if (isMatch) {
        view.classList.add('active-view');
        view.style.display = 'block';
      } else {
        view.classList.remove('active-view');
        view.style.display = 'none';
      }
    });

    // 2. Update Nav links active state
    const navLinks = document.querySelectorAll('.nav-link, nav a, .footer-links a');
    navLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      const targetHash = href.replace(/^#/, '').trim();
      const dataView = link.getAttribute('data-view') || link.getAttribute('data-route');
      if (targetHash === activeRoute || dataView === activeRoute) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });

    // 3. Close mobile drawer if open
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    if (navMenu && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('is-active');
      }
    }

    // 4. Safe route-specific initializer dispatches
    try {
      if (activeRoute === 'home') {
        if (typeof updateHomeMetrics === 'function') updateHomeMetrics();
        if (typeof renderLeaderboard === 'function') renderLeaderboard();
        if (typeof initImpactCalculator === 'function') initImpactCalculator();
      } else if (activeRoute === 'find-food') {
        if (!foodMap && typeof initFoodListingsMap === 'function') {
          initFoodListingsMap();
        }
        if (typeof populateFindFoodFilters === 'function') populateFindFoodFilters();
        if (typeof renderFoodListings === 'function') renderFoodListings();
        setTimeout(() => {
          if (foodMap && typeof foodMap.invalidateSize === 'function') {
            foodMap.invalidateSize();
          }
        }, 150);
        setTimeout(() => {
          if (foodMap && typeof foodMap.invalidateSize === 'function') {
            foodMap.invalidateSize();
          }
        }, 400);
      } else if (activeRoute === 'donate') {
        if (typeof populateDonateFridgeDropdown === 'function') populateDonateFridgeDropdown();
        if (typeof setDefaultDonationDates === 'function') setDefaultDonationDates();
        if (typeof setupImageUpload === 'function') setupImageUpload();
        if (typeof setupCsrModal === 'function') setupCsrModal();
      } else if (activeRoute === 'fridges') {
        if (typeof renderFridgesListings === 'function') renderFridgesListings();
        if (typeof setupIotTelemetry === 'function') setupIotTelemetry();
      } else if (activeRoute === 'volunteer') {
        if (typeof setupVolunteerRegistration === 'function') setupVolunteerRegistration();
        if (typeof renderVolunteerDispatchBoard === 'function') renderVolunteerDispatchBoard();
        if (typeof setupVolunteerDispatchBatch === 'function') setupVolunteerDispatchBatch();
        if (typeof populateDropoffPinSelect === 'function') populateDropoffPinSelect();
      } else if (activeRoute === 'contact') {
        if (typeof setupContactForm === 'function') setupContactForm();
      } else if (activeRoute === 'admin') {
        if (typeof renderAdminPortal === 'function') renderAdminPortal();
      }
    } catch (err) {
      console.error('Error switching to route ' + activeRoute + ':', err);
    }

    try {
      if (typeof refreshTilt === 'function') refreshTilt();
    } catch (e) {}

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function setupMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = navMenu.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        navToggle.classList.toggle('is-active', isOpen);
      });
    }
  }

  function setupGlobalNavigation() {
    document.addEventListener('click', function (e) {
      const targetLink = e.target.closest('a[href^="#"], [data-view], [data-route]');
      if (!targetLink) return;

      const href = targetLink.getAttribute('href') || '';
      const dataView = targetLink.getAttribute('data-view') || targetLink.getAttribute('data-route') || '';
      const target = (dataView || href).replace(/^#/, '').trim();

      if (VALID_ROUTES.includes(target)) {
        e.preventDefault();
        navigateTo(target);
      }
    });

    // Redundant direct click listeners on all navigation links
    document.querySelectorAll('.nav-link, nav a, .brand-logo').forEach(link => {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href') || '';
        const dataView = this.getAttribute('data-view') || '';
        const target = (dataView || href).replace(/^#/, '').trim();
        if (VALID_ROUTES.includes(target)) {
          e.preventDefault();
          navigateTo(target);
        }
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
      const navMenu = document.getElementById('navMenu');
      const navToggle = document.getElementById('navToggle');
      if (navMenu && navMenu.classList.contains('open')) {
        if (!navMenu.contains(e.target) && (!navToggle || !navToggle.contains(e.target))) {
          navMenu.classList.remove('open');
          if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.classList.remove('is-active');
          }
        }
      }
    });
  }

  function calculateDistanceKm(lat1, lon1, lat2, lon2) {
    if (!lat1 || !lon1 || !lat2 || !lon2) return null;
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return parseFloat((R * c).toFixed(1));
  }

  function requestUserGeolocation(callback) {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          userCoords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
          showToast('📍 Geolocation detected. Showing closest community fridges.', 'success');
          if (typeof callback === 'function') callback(userCoords);
        },
        () => {
          userCoords = { lat: 40.7128, lng: -74.0060 };
          showToast('📍 Using default Metro City coordinates for distance calculation.', 'info');
          if (typeof callback === 'function') callback(userCoords);
        }
      );
    } else {
      userCoords = { lat: 40.7128, lng: -74.0060 };
      if (typeof callback === 'function') callback(userCoords);
    }
  }

  // ============================================================================
  // 7. REAL-TIME EXPIRY COUNTDOWN ENGINE
  // ============================================================================
  function calculateTimeRemaining(expiryIso) {
    if (!expiryIso) return { text: 'No Deadline', status: 'normal', ms: 999999999 };
    const diffMs = new Date(expiryIso).getTime() - Date.now();

    if (diffMs <= 0) {
      return { text: 'Expired', status: 'expired', ms: 0 };
    }

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diffMs % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, '0');
    const text = `${pad(hours)}h ${pad(mins)}m ${pad(secs)}s`;

    if (hours < 1) {
      return { text: `Critical: ${text}`, status: 'urgent', ms: diffMs };
    } else if (hours < 6) {
      return { text: `Expiring: ${text}`, status: 'warning', ms: diffMs };
    } else {
      return { text: `Fresh: ${text}`, status: 'normal', ms: diffMs };
    }
  }

  function startGlobalExpiryTimer() {
    setInterval(() => {
      const countdownBadges = document.querySelectorAll('[data-expiry-target]');
      let stateChanged = false;

      countdownBadges.forEach(badge => {
        const targetIso = badge.getAttribute('data-expiry-target');
        const cardId = badge.getAttribute('data-card-id');
        const currentStatus = badge.getAttribute('data-current-status');

        if (!targetIso || currentStatus === 'Collected' || currentStatus === 'Expired') return;

        const info = calculateTimeRemaining(targetIso);

        badge.className = `badge-urgency badge-${info.status}`;
        const icon = info.status === 'urgent' ? '🔴' : info.status === 'warning' ? '🟡' : '🟢';

        if (info.status === 'expired') {
          badge.textContent = '⚠️ Expired';
          badge.className = 'badge-urgency text-danger';

          if (currentStatus !== 'Expired') {
            const donations = getDonations();
            const item = donations.find(d => d.id === cardId);
            if (item && item.status !== 'Expired') {
              item.status = 'Expired';
              saveDonations(donations);
              stateChanged = true;
            }
          }
        } else {
          badge.textContent = `${icon} ${info.text}`;
        }
      });

      if (stateChanged) {
        renderFoodListings();
      }
    }, 1000);
  }

  // ============================================================================
  // 8. COMMUNITY IMPACT LEADERBOARD
  // ============================================================================
  function renderLeaderboard() {
    const donorsTbody = document.getElementById('topDonorsTableBody');
    const volunteersTbody = document.getElementById('topVolunteersTableBody');

    if (donorsTbody) {
      const topDonors = [
        { rank: 1, name: 'Grand Horizon Hotel & Banquets', type: 'Corporate Hotel', rescuedKg: 1420, co2Saved: '3,550 kg' },
        { rank: 2, name: 'GreenLeaf Organic Grocers', type: 'Supermarket', rescuedKg: 980, co2Saved: '2,450 kg' },
        { rank: 3, name: 'Metro Bakers Guild', type: 'Bakery Co-op', rescuedKg: 740, co2Saved: '1,850 kg' },
        { rank: 4, name: 'Artisan Pasta Kitchen', type: 'Restaurant', rescuedKg: 510, co2Saved: '1,275 kg' },
        { rank: 5, name: 'Civic Caterers Collective', type: 'Event Catering', rescuedKg: 390, co2Saved: '975 kg' }
      ];

      donorsTbody.innerHTML = topDonors.map(d => {
        const rankClass = d.rank === 1 ? 'top-rank-1' : d.rank === 2 ? 'top-rank-2' : d.rank === 3 ? 'top-rank-3' : '';
        const medal = d.rank === 1 ? '🥇' : d.rank === 2 ? '🥈' : d.rank === 3 ? '🥉' : `${d.rank}`;
        return `
          <tr>
            <td><span class="${rankClass}">${medal}</span></td>
            <td>
              <div class="donor-name-cell">
                <span>${escapeHtml(d.name)}</span>
                <span class="donor-tag">${d.type}</span>
              </div>
            </td>
            <td><strong>${d.rescuedKg} kg</strong></td>
            <td><span style="color: var(--primary-green); font-weight: 600;">${d.co2Saved}</span></td>
          </tr>
        `;
      }).join('');
    }

    if (volunteersTbody) {
      const topDrivers = [
        { rank: 1, name: 'Jordan Miller', area: 'Downtown Metro', runs: 42, meals: 2450 },
        { rank: 2, name: 'Elena Rostova', area: 'West End Hub', runs: 38, meals: 2120 },
        { rank: 3, name: 'Marcus Chen', area: 'Riverside Garden', runs: 29, meals: 1680 },
        { rank: 4, name: 'Priya Sharma', area: 'Green Park Sector', runs: 24, meals: 1350 },
        { rank: 5, name: 'David Kim', area: 'Civic Commons', runs: 19, meals: 980 }
      ];

      volunteersTbody.innerHTML = topDrivers.map(v => {
        const rankClass = v.rank === 1 ? 'top-rank-1' : v.rank === 2 ? 'top-rank-2' : v.rank === 3 ? 'top-rank-3' : '';
        const medal = v.rank === 1 ? '🥇' : v.rank === 2 ? '🥈' : v.rank === 3 ? '🥉' : `${v.rank}`;
        return `
          <tr>
            <td><span class="${rankClass}">${medal}</span></td>
            <td>
              <div class="donor-name-cell">
                <span>${escapeHtml(v.name)}</span>
                <span class="donor-tag">📍 ${v.area}</span>
              </div>
            </td>
            <td><strong>${v.runs} pickups</strong></td>
            <td><span style="color: var(--primary-green); font-weight: 600;">${v.meals.toLocaleString()} meals</span></td>
          </tr>
        `;
      }).join('');
    }
  }

  // ============================================================================
  // 9. ENVIRONMENTAL IMPACT CALCULATOR & METRICS
  // ============================================================================
  function calculateTotalImpact() {
    const donations = getDonations();
    let totalKg = 0;
    donations.forEach(d => {
      totalKg += (parseFloat(d.weightKg) || 2.5);
    });

    const meals = Math.round(totalKg / 0.4);
    const co2Kg = parseFloat((totalKg * 2.5).toFixed(1));
    const waterLiters = Math.round(totalKg * 1000);

    return { totalKg: Math.round(totalKg), meals, co2Kg, waterLiters };
  }

  function updateHomeMetrics() {
    const impact = calculateTotalImpact();
    const elRescued = document.getElementById('homeMetricRescued');
    const elMeals = document.getElementById('homeMetricMeals');
    const elCarbon = document.getElementById('homeMetricCarbon');
    const elWater = document.getElementById('homeMetricWater');

    const totalRescued = 52450 + impact.totalKg;
    const totalMeals = Math.round(totalRescued / 0.4);
    const totalCo2 = Math.round(totalRescued * 2.5);
    const totalWater = Math.round(totalRescued * 1000);

    if (elRescued) elRescued.textContent = `${totalRescued.toLocaleString()} kg`;
    if (elMeals) elMeals.textContent = totalMeals.toLocaleString();
    if (elCarbon) elCarbon.textContent = `${totalCo2.toLocaleString()} kg`;
    if (elWater) elWater.textContent = `${totalWater.toLocaleString()} L`;
  }

  function initImpactCalculator() {
    const slider = document.getElementById('homeImpactSlider');
    const sliderVal = document.getElementById('homeImpactSliderVal');
    const valMeals = document.getElementById('calcMealsVal');
    const valCo2 = document.getElementById('calcCo2Val');
    const valWater = document.getElementById('calcWaterVal');
    const valTrees = document.getElementById('calcTreesVal');

    if (!slider || slider.getAttribute('data-wired') === 'true') return;
    slider.setAttribute('data-wired', 'true');

    const updateCalc = (kg) => {
      if (sliderVal) sliderVal.textContent = `${kg} kg / week`;
      const meals = Math.round(kg / 0.4);
      const co2 = (kg * 2.5).toFixed(1);
      const water = (kg * 1000).toLocaleString();
      const trees = ((kg * 2.5 * 52) / 21.77).toFixed(1);

      if (valMeals) valMeals.textContent = meals;
      if (valCo2) valCo2.textContent = `${co2} kg`;
      if (valWater) valWater.textContent = `${water} L`;
      if (valTrees) valTrees.textContent = `${trees} Trees`;

      const badgeGuardian = document.getElementById('badgeGuardian');
      const badgeCentury = document.getElementById('badgeCentury');
      const badgeChampion = document.getElementById('badgeChampion');

      if (badgeGuardian) badgeGuardian.classList.toggle('unlocked', kg >= 25);
      if (badgeCentury) badgeCentury.classList.toggle('unlocked', kg >= 50);
      if (badgeChampion) badgeChampion.classList.toggle('unlocked', kg >= 100);
    };

    slider.addEventListener('input', (e) => updateCalc(parseInt(e.target.value, 10)));
    updateCalc(parseInt(slider.value, 10));
  }

  // ============================================================================
  // 9b. SMART AI FOOD SHELF-LIFE & SAFETY ESTIMATOR
  // ============================================================================
  function initShelfLifeEstimator() {
    const categorySelect = document.getElementById('estimatorCategory');
    const storageSelect = document.getElementById('estimatorStorage');
    const hoursSlider = document.getElementById('estimatorHours');
    const hoursVal = document.getElementById('estimatorHoursVal');
    const btnCalculate = document.getElementById('btnCalculateShelfLife');
    const gradePill = document.getElementById('safetyGradePill');
    const gradeIcon = document.getElementById('safetyGradeIcon');
    const safeWindowVal = document.getElementById('safeWindowVal');
    const dangerZoneVal = document.getElementById('dangerZoneVal');
    const adviceText = document.getElementById('safetyAdviceText');

    if (!btnCalculate || btnCalculate.getAttribute('data-wired') === 'true') return;
    btnCalculate.setAttribute('data-wired', 'true');

    const updateEstimate = () => {
      const cat = categorySelect ? categorySelect.value : 'cooked-rice';
      const storage = storageSelect ? storageSelect.value : 'chilled-4';
      const hours = hoursSlider ? parseInt(hoursSlider.value, 10) : 2;

      if (hoursVal) hoursVal.textContent = `${hours} hrs ago`;

      let baseSafeHours = 24;
      if (cat === 'cooked-rice' || cat === 'cooked-pasta') baseSafeHours = 24;
      else if (cat === 'cooked-meat') baseSafeHours = 18;
      else if (cat === 'raw-produce') baseSafeHours = 48;
      else if (cat === 'bakery-bread') baseSafeHours = 72;
      else if (cat === 'dairy-milk') baseSafeHours = 20;

      let storageFactor = 1.0;
      let dangerZoneStr = 'SAFE (Below 4°C)';
      if (storage === 'frozen-18') {
        storageFactor = 4.0;
        dangerZoneStr = 'SUB-ZERO (Safe -18°C)';
      } else if (storage === 'room-temp') {
        storageFactor = 0.25;
        dangerZoneStr = '⚠️ DANGER ZONE (20°C - 25°C)';
      } else if (storage === 'hot-hold') {
        storageFactor = 0.5;
        dangerZoneStr = 'HOT HOLD (≥ 60°C Safe)';
      }

      const totalAllowedHours = Math.round(baseSafeHours * storageFactor);
      const remainingHours = Math.max(0, totalAllowedHours - hours);

      if (safeWindowVal) safeWindowVal.textContent = `${remainingHours} Hours Remaining`;
      if (dangerZoneVal) dangerZoneVal.textContent = dangerZoneStr;

      if (remainingHours >= totalAllowedHours * 0.6) {
        if (gradePill) {
          gradePill.textContent = 'GRADE A+ (OPTIMUM FRESHNESS)';
          gradePill.className = 'grade-pill grade-optimum';
        }
        if (gradeIcon) gradeIcon.textContent = '✅';
        if (adviceText) adviceText.textContent = 'Excellent condition for immediate community distribution. Suitable for transfer to any public community refrigerator hub.';
      } else if (remainingHours > 0) {
        if (gradePill) {
          gradePill.textContent = 'GRADE B (URGENT CONSUMPTION REQUIRED)';
          gradePill.className = 'grade-pill grade-warning';
        }
        if (gradeIcon) gradeIcon.textContent = '⚡';
        if (adviceText) adviceText.textContent = 'Safe to consume but must be distributed within the next few hours. Priority dispatch recommended.';
      } else {
        if (gradePill) {
          gradePill.textContent = 'GRADE F (EXPIRED / DO NOT DISTRIBUTE)';
          gradePill.className = 'grade-pill grade-danger';
        }
        if (gradeIcon) gradeIcon.textContent = '⛔';
        if (adviceText) adviceText.textContent = 'Exceeded safe holding timeframe. Do not distribute for direct consumption. Divert to organic compost bio-recycling.';
      }
    };

    if (hoursSlider) hoursSlider.addEventListener('input', updateEstimate);
    if (categorySelect) categorySelect.addEventListener('change', updateEstimate);
    if (storageSelect) storageSelect.addEventListener('change', updateEstimate);
    btnCalculate.addEventListener('click', updateEstimate);

    updateEstimate();
  }

  function startWastageTicker() {
    setInterval(() => {
      const tickerEl = document.getElementById('heroWastageCounter');
      if (tickerEl) {
        const curr = parseFloat(tickerEl.getAttribute('data-count') || '1420.5');
        const next = (curr + 0.04).toFixed(2);
        tickerEl.setAttribute('data-count', next);
        tickerEl.textContent = `${next} kg`;
      }
    }, 1500);
  }

  // ============================================================================
  // 10. FIND FOOD VIEW & COLLECTION MODAL
  // ============================================================================
  function populateFindFoodFilters() {
    const fridgeFilter = document.getElementById('fridgeLocationFilter');
    if (!fridgeFilter) return;

    const fridges = getFridges();
    const currVal = fridgeFilter.value;
    
    fridgeFilter.innerHTML = '<option value="all">All Locations / Fridges</option>';
    fridges.forEach(fridge => {
      const opt = document.createElement('option');
      opt.value = fridge.id;
      opt.textContent = `${fridge.name} (${fridge.landmark})`;
      if (fridge.id === currVal) opt.selected = true;
      fridgeFilter.appendChild(opt);
    });
  }

  
  // ============================================================================
  // LEAFLET.JS LIVE FOOD SURPLUS MAP & PROXIMITY ENGINE
  // ============================================================================

  function initFoodListingsMap() {
    if (typeof L === 'undefined') {
      console.warn('Leaflet.js library not detected. Map features disabled.');
      return;
    }

    const mapContainer = document.getElementById('foodListingsMap');
    if (!mapContainer || foodMap) return;

    try {
      const defaultCenter = (userCoords && userCoords.lat && userCoords.lng) 
        ? [userCoords.lat, userCoords.lng] 
        : [40.730610, -73.935242];

      foodMap = L.map('foodListingsMap', {
        center: defaultCenter,
        zoom: 12,
        zoomControl: true,
        scrollWheelZoom: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(foodMap);

      foodMarkersLayer = L.layerGroup().addTo(foodMap);

      // Invalidate map size after DOM renders
      setTimeout(() => {
        if (foodMap) foodMap.invalidateSize();
      }, 300);

    } catch (err) {
      console.error('Error initializing Leaflet map:', err);
    }
  }

  function getCategoryEmoji(category) {
    switch (category) {
      case 'Cooked Meals': return '🍲';
      case 'Raw Produce': return '🥦';
      case 'Bakery': return '🥖';
      case 'Packaged': return '📦';
      default: return '🥗';
    }
  }

  function updateFoodMapMarkers(filteredDonations, fridges) {
    if (!foodMap || !foodMarkersLayer) return;

    foodMarkersLayer.clearLayers();
    foodMapMarkers = {};

    const fridgeMap = {};
    fridges.forEach(f => {
      fridgeMap[f.id] = f;
    });

    const markerBounds = [];

    // 1. Render User GPS Marker if available
    if (userCoords && userCoords.lat && userCoords.lng) {
      const userLat = userCoords.lat;
      const userLng = userCoords.lng;

      const userIcon = L.divIcon({
        className: 'user-location-radar-wrap',
        html: `
          <div class="user-location-radar-marker" title="Your Current Location">
            <div class="user-marker-radar-wave"></div>
            <div class="user-marker-core"></div>
          </div>
        `,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });

      userLocationMarker = L.marker([userLat, userLng], { 
        icon: userIcon, 
        zIndexOffset: 1000 
      }).addTo(foodMarkersLayer);

      userLocationMarker.bindPopup(`
        <div class="map-popup-card" style="text-align: center;">
          <h4 style="color: #1976d2; margin-bottom: 0.25rem;">📍 Your Current Location</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">GPS Location Active. Food listings are sorted by proximity to you.</p>
        </div>
      `);

      markerBounds.push([userLat, userLng]);

      // If active radius filter is set, draw radius circle around user
      if (activeMapRadius && activeMapRadius !== 'all') {
        const radiusMeters = parseFloat(activeMapRadius) * 1000;
        L.circle([userLat, userLng], {
          radius: radiusMeters,
          color: '#1976d2',
          fillColor: '#bbdefb',
          fillOpacity: 0.15,
          weight: 1.5,
          dashArray: '4, 4'
        }).addTo(foodMarkersLayer);
      }
    }

    // 2. Render Community Fridge / Freezer Base Hub Markers
    fridges.forEach(fridge => {
      if (!fridge.lat || !fridge.lng) return;
      
      const isFreezer = fridge.hasFreezer || (fridge.unitType && fridge.unitType.includes('Freezer'));
      const hubIcon = L.divIcon({
        className: 'fridge-hub-marker-wrap',
        html: `
          <div class="food-marker-pin marker-freezer" title="${escapeHtml(fridge.name)}">
            <span class="marker-emoji-icon">${isFreezer ? '❄️' : '🧊'}</span>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -32]
      });

      const hubMarker = L.marker([fridge.lat, fridge.lng], { icon: hubIcon }).addTo(foodMarkersLayer);
      
      const hubPopupContent = `
        <div class="map-popup-card">
          <div class="map-popup-header">
            <span class="fridge-badge">${escapeHtml(fridge.unitType || 'Community Hub')}</span>
            <span style="font-size: 0.8rem; font-weight: bold; color: #0277bd;">${escapeHtml(fridge.temperature || '3.2°C')}</span>
          </div>
          <div class="map-popup-title">${escapeHtml(fridge.name)}</div>
          <div class="map-popup-donor">📍 ${escapeHtml(fridge.landmark || fridge.address)}</div>
          <div class="map-popup-meta-row">
            <span>⏰ ${escapeHtml(fridge.operatingHours)}</span>
            <span>Capacity: ${escapeHtml(fridge.capacityStatus || 'Active')}</span>
          </div>
          <div class="map-popup-actions">
            <a href="https://www.google.com/maps/dir/?api=1&destination=${fridge.lat},${fridge.lng}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-xs w-full">
              <span>🧭</span> Navigate Here
            </a>
            <a href="#donate" class="btn btn-primary btn-xs w-full">
              <span>🍲</span> Stock Hub
            </a>
          </div>
        </div>
      `;
      hubMarker.bindPopup(hubPopupContent);
      markerBounds.push([fridge.lat, fridge.lng]);
    });

    // 3. Render Food Surplus Donation Markers
    const jitterMap = {};

    filteredDonations.forEach(item => {
      const fridge = fridgeMap[item.fridgeId];
      if (!fridge || !fridge.lat || !fridge.lng) return;

      // Add slight jitter if multiple donations share the same fridge coordinates
      const key = `${fridge.lat}_${fridge.lng}`;
      jitterMap[key] = (jitterMap[key] || 0) + 1;
      const count = jitterMap[key];
      const angle = (count * 60) * (Math.PI / 180);
      const jitterDist = (count > 1) ? 0.0018 : 0; // ~150 meters offset for visual distinction
      
      const itemLat = fridge.lat + (Math.sin(angle) * jitterDist);
      const itemLng = fridge.lng + (Math.cos(angle) * jitterDist);

      const timeInfo = calculateTimeRemaining(item.expiryDeadline);
      let urgencyClass = 'marker-fresh';
      if (item.status === 'Expired') urgencyClass = 'marker-critical';
      else if (timeInfo.status === 'urgent') urgencyClass = 'marker-critical';
      else if (timeInfo.status === 'warning') urgencyClass = 'marker-warning';

      const catEmoji = getCategoryEmoji(item.category);
      const distStr = item.distanceKm ? `📍 ${item.distanceKm} km away` : '📍 Available at Hub';

      const foodIcon = L.divIcon({
        className: 'custom-food-marker-wrap',
        html: `
          <div class="food-marker-pin ${urgencyClass}" title="${escapeHtml(item.foodName)}">
            <span class="marker-emoji-icon">${catEmoji}</span>
          </div>
        `,
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -34]
      });

      const marker = L.marker([itemLat, itemLng], { icon: foodIcon }).addTo(foodMarkersLayer);
      foodMapMarkers[item.id] = marker;
      markerBounds.push([itemLat, itemLng]);

      const popupHtml = `
        <div class="map-popup-card">
          <div class="map-popup-header">
            <span class="category-overlay-tag">${catEmoji} ${escapeHtml(item.category)}</span>
            <span class="badge-tag badge-${timeInfo.status}">${timeInfo.badgeText}</span>
          </div>
          <div class="map-popup-title">${escapeHtml(item.foodName)}</div>
          <div class="map-popup-donor">Donated by <strong>${escapeHtml(item.donorName)}</strong> • ${escapeHtml(item.quantity)}</div>
          <div class="map-popup-meta-row">
            <span>${distStr}</span>
            <span>⏱️ ${timeInfo.countdownText}</span>
          </div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem;">
            📍 Stored at: <strong>${escapeHtml(fridge.name)}</strong>
          </div>
          <div class="map-popup-actions">
            ${item.status === 'Available' ? `
              <button type="button" class="btn btn-primary btn-xs w-full btn-popup-claim" data-id="${item.id}">
                <span>🍲</span> Claim Food
              </button>
            ` : `
              <span class="badge-status-${item.status.toLowerCase().replace(/\s+/g, '-')} w-full text-center" style="display:block; padding: 0.25rem;">${escapeHtml(item.status)}</span>
            `}
            <button type="button" class="btn btn-outline btn-xs btn-popup-voice" data-speech="${escapeHtml(item.foodName + ', quantity ' + item.quantity + ', located at ' + fridge.name)}">
              <span>🔊</span>
            </button>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${fridge.lat},${fridge.lng}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-xs" title="Google Maps Navigation">
              <span>🧭</span>
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      // Marker click synchronizes with the list card
      marker.on('click', () => {
        highlightFoodCard(item.id);
      });
    });

    // Auto-fit bounds if we have markers
    if (markerBounds.length > 0 && !activeMapRadius) {
      try {
        foodMap.fitBounds(markerBounds, { padding: [40, 40], maxZoom: 14 });
      } catch (e) {
        console.warn('Could not auto-fit map bounds:', e);
      }
    }
  }

  function highlightFoodCard(itemId) {
    const card = document.querySelector(`.food-listing-card[data-id="${itemId}"]`);
    if (card) {
      document.querySelectorAll('.food-listing-card').forEach(c => c.classList.remove('card-map-highlighted'));
      card.classList.add('card-map-highlighted');
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        card.classList.remove('card-map-highlighted');
      }, 3500);
    }
  }

  function locateItemOnMap(itemId) {
    const donations = getDonations();
    const item = donations.find(d => d.id === itemId);
    const fridges = getFridges();
    if (!item) return;

    const fridge = fridges.find(f => f.id === item.fridgeId);
    if (!fridge || !fridge.lat || !fridge.lng) {
      showToast('Location coordinates not available for this item.', 'warning');
      return;
    }

    // Switch to split or map view if currently in grid-only view
    const layout = document.getElementById('foodExplorerLayout');
    if (layout && layout.classList.contains('layout-grid-only')) {
      layout.classList.remove('layout-grid-only');
      layout.classList.add('layout-split');
      const btnSplit = document.getElementById('btnViewSplit');
      document.querySelectorAll('.view-mode-btn').forEach(b => b.classList.remove('active'));
      if (btnSplit) btnSplit.classList.add('active');
    }

    if (foodMap) {
      foodMap.invalidateSize();
      foodMap.flyTo([fridge.lat, fridge.lng], 15, { duration: 1.2 });
      setTimeout(() => {
        const marker = foodMapMarkers[item.id];
        if (marker) {
          marker.openPopup();
        }
      }, 1300);
    }
  }


  function renderFoodListings() {
    const container = document.getElementById('foodListingsContainer');
    if (!container) return;

    const searchInput = document.getElementById('foodSearchInput');
    const categoryFilter = document.getElementById('foodCategoryFilter');
    const fridgeFilter = document.getElementById('fridgeLocationFilter');
    const statusFilter = document.getElementById('foodStatusFilter');

    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
    const selectedFridge = fridgeFilter ? fridgeFilter.value : 'all';
    const selectedStatus = statusFilter ? statusFilter.value : 'all';

    const donations = getDonations();
    const fridges = getFridges();

    const fridgeMap = {};
    fridges.forEach(f => {
      if (userCoords && f.lat && f.lng) {
        f.distanceKm = calculateDistanceKm(userCoords.lat, userCoords.lng, f.lat, f.lng);
      }
      fridgeMap[f.id] = f;
    });

    // Calculate distance for all donations
    donations.forEach(item => {
      const f = fridgeMap[item.fridgeId];
      if (userCoords && f && f.lat && f.lng) {
        item.distanceKm = calculateDistanceKm(userCoords.lat, userCoords.lng, f.lat, f.lng);
      } else {
        item.distanceKm = null;
      }
    });

    let filtered = donations.filter(item => {
      const f = fridgeMap[item.fridgeId];
      const fridgeName = f ? f.name.toLowerCase() : '';
      const fridgeLandmark = f ? f.landmark.toLowerCase() : '';

      const matchesSearch = 
        !query ||
        (item.foodName && item.foodName.toLowerCase().includes(query)) ||
        (item.donorName && item.donorName.toLowerCase().includes(query)) ||
        (item.allergens && item.allergens.toLowerCase().includes(query)) ||
        fridgeName.includes(query) ||
        fridgeLandmark.includes(query);

      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesFridge = selectedFridge === 'all' || item.fridgeId === selectedFridge;
      const matchesStatus = selectedStatus === 'all' || item.status.toLowerCase() === selectedStatus.toLowerCase();

      // Radius filter
      let matchesRadius = true;
      if (activeMapRadius && activeMapRadius !== 'all' && item.distanceKm !== null) {
        matchesRadius = item.distanceKm <= parseFloat(activeMapRadius);
      }

      return matchesSearch && matchesCategory && matchesFridge && matchesStatus && matchesRadius;
    });

    if (sortByProximity && userCoords) {
      filtered.sort((a, b) => {
        const distA = a.distanceKm ?? 9999;
        const distB = b.distanceKm ?? 9999;
        return distA - distB;
      });
    }

    const countBadge = document.getElementById('foodResultsCount');
    if (countBadge) {
      countBadge.textContent = `${filtered.length} item${filtered.length === 1 ? '' : 's'} found`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-results-state" style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--surface-white); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;" aria-hidden="true">🥗</div>
          <h3>No Food Listings Match Your Filter</h3>
          <p style="color: var(--text-muted); margin: 0.5rem 0 1.25rem 0;">Try adjusting your search terms, radius distance, or location filters.</p>
          <button type="button" class="btn btn-outline btn-sm" id="resetFindFoodFiltersBtn">Reset All Filters</button>
        </div>
      `;
      const rBtn = document.getElementById('resetFindFoodFiltersBtn');
      if (rBtn) {
        rBtn.onclick = () => {
          if (searchInput) searchInput.value = '';
          if (categoryFilter) categoryFilter.value = 'all';
          if (fridgeFilter) fridgeFilter.value = 'all';
          if (statusFilter) statusFilter.value = 'all';
          activeMapRadius = 'all';
          const rSelect = document.getElementById('mapRadiusFilter');
          if (rSelect) rSelect.value = 'all';
          sortByProximity = false;
          renderFoodListings();
        };
      }
      updateFoodMapMarkers([], fridges);
      return;
    }

    const formatTime = (iso) => {
      if (!iso) return '-';
      try {
        const d = new Date(iso);
        return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      } catch (e) {
        return iso;
      }
    };

    const getCategoryIcon = (cat) => {
      switch (cat) {
        case 'Cooked Meals': return '🍲';
        case 'Raw Produce': return '🥦';
        case 'Bakery': return '🥖';
        case 'Packaged': return '📦';
        default: return '🥗';
      }
    };

    container.innerHTML = filtered.map(item => {
      const fridge = fridgeMap[item.fridgeId] || {
        name: 'Community Fridge',
        address: 'Downtown Hub',
        landmark: 'Central Station'
      };

      const isAvailable = item.status === 'Available';
      const isCollected = item.status === 'Collected';
      const isExpired = item.status === 'Expired';
      const isInTransit = item.status === 'In Transit';

      const statusBadgeClass = isAvailable 
        ? 'badge-status-available' 
        : isInTransit
          ? 'badge-status-in-transit'
          : isCollected 
            ? 'badge-status-collected' 
            : isExpired 
              ? 'badge-status-expired' 
              : 'badge-status-reserved';

      const timeInfo = calculateTimeRemaining(item.expiryDeadline);
      const urgencyClass = isExpired ? 'text-danger' : `badge-${timeInfo.status}`;
      const urgencyIcon = timeInfo.status === 'urgent' ? '🔴' : timeInfo.status === 'warning' ? '🟡' : '🟢';

      const directionsUrl = (fridge.lat && fridge.lng)
        ? `https://www.google.com/maps/dir/?api=1&destination=${fridge.lat},${fridge.lng}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fridge.name + ' ' + fridge.address)}`;

      const speechText = `${item.foodName}. Category: ${item.category}. Quantity: ${item.quantity}. Located at ${fridge.name}. Donor: ${item.donorName}.`;

      return `
        <article class="food-listing-card ${isCollected || isExpired ? 'card-collected' : ''}" data-id="${item.id}" >
          
          ${item.imageBase64 ? `
            <div class="food-card-img-wrap">
              <img src="${item.imageBase64}" alt="${escapeHtml(item.foodName)}">
              <span class="category-overlay-tag">${getCategoryIcon(item.category)} ${escapeHtml(item.category)}</span>
            </div>
          ` : ''}

          <div class="food-card-header">
            <div style="flex: 1;">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.3rem;">
                <span class="category-pill">${getCategoryIcon(item.category)} ${escapeHtml(item.category)}</span>
                <span class="badge-status ${statusBadgeClass}">${escapeHtml(item.status)}</span>
              </div>
              <h3 class="food-card-title">${escapeHtml(item.foodName)}</h3>
              <div class="food-donor-meta">
                <span>👤 Donated by: <strong>${escapeHtml(item.donorName)}</strong></span>
              </div>
            </div>
          </div>

          <!-- Real-Time Expiry Countdown Display -->
          <div class="countdown-badge-wrapper ${urgencyClass}">
            <div class="countdown-label">
              <span>${urgencyIcon} ${timeInfo.badgeText}</span>
              <strong class="countdown-timer" data-expiry="${item.expiryDeadline}">${timeInfo.countdownText}</strong>
            </div>
            <div class="expiry-deadline-sub">
              Collect before: ${formatTime(item.expiryDeadline)}
            </div>
          </div>

          <div class="food-card-specs">
            <div class="spec-row">
              <span class="spec-label">📦 Quantity:</span>
              <span class="spec-value"><strong>${escapeHtml(item.quantity)}</strong> (${item.weightKg || 1} kg)</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">📍 Hub Location:</span>
              <span class="spec-value">
                <strong>${escapeHtml(fridge.name)}</strong>
                <div style="font-size: 0.8rem; color: var(--text-muted);">${escapeHtml(fridge.landmark || fridge.address)}</div>
                ${item.distanceKm !== null ? `<div class="card-distance-pill">📍 ${item.distanceKm} km away from you</div>` : ''}
              </span>
            </div>
            <div class="spec-row">
              <span class="spec-label">🕒 Cooked / Packed:</span>
              <span class="spec-value">${formatTime(item.prepTime)}</span>
            </div>
            ${item.allergens ? `
              <div class="spec-row allergens-row">
                <span class="spec-label">⚠️ Allergens &amp; Notes:</span>
                <span class="spec-value">${escapeHtml(item.allergens)}</span>
              </div>
            ` : ''}
          </div>

          <div class="food-card-actions">
            ${isAvailable ? `
              <button type="button" class="btn btn-primary btn-sm btn-collect" data-id="${item.id}" style="flex: 1.2;">
                <span>🍲</span> Claim &amp; Collect
              </button>
            ` : isCollected ? `
              <button type="button" class="btn btn-secondary btn-sm" disabled style="flex: 1.2; opacity: 0.65;">
                <span>✓</span> Collected
              </button>
            ` : isExpired ? `
              <button type="button" class="btn btn-danger btn-sm" disabled style="flex: 1.2; opacity: 0.65;">
                <span>⚠️</span> Expired
              </button>
            ` : `
              <button type="button" class="btn btn-warning btn-sm" disabled style="flex: 1.2; opacity: 0.8;">
                <span>🔒</span> ${escapeHtml(item.status)}
              </button>
            `}

            <button type="button" class="btn btn-outline btn-sm btn-locate-map" data-id="${item.id}" title="Locate this item on the live map">
              <span>📍</span> Map
            </button>

            <button type="button" class="btn btn-outline btn-sm btn-voice-read voice-audio-btn" data-speech="${escapeHtml(speechText)}" aria-label="Read listing aloud" title="Read listing aloud (Speech Synthesis)">
              <span>🔊</span>
            </button>

            <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" title="Open Google Maps Navigation">
              <span>🧭</span>
            </a>
          </div>

        </article>
      `;
    }).join('');

    // Attach card action listeners
    container.querySelectorAll('.btn-collect').forEach(btn => {
      btn.onclick = function () {
        const id = this.getAttribute('data-id');
        if (id) openSafeCollectionModal(id);
      };
    });

    container.querySelectorAll('.btn-locate-map').forEach(btn => {
      btn.onclick = function () {
        const id = this.getAttribute('data-id');
        if (id) locateItemOnMap(id);
      };
    });

    container.querySelectorAll('.btn-voice-read').forEach(btn => {
      btn.onclick = function () {
        const speech = this.getAttribute('data-speech');
        if (speech) speakText(speech);
      };
    });

    // Update Live Leaflet Map Markers
    updateFoodMapMarkers(filtered, fridges);
  }

  function setupFindFoodFilters() {
    const searchInput = document.getElementById('foodSearchInput');
    const categoryFilter = document.getElementById('foodCategoryFilter');
    const fridgeFilter = document.getElementById('fridgeLocationFilter');
    const statusFilter = document.getElementById('foodStatusFilter');
    const gpsBtn = document.getElementById('findFoodGpsBtn');

    if (searchInput) {
      searchInput.addEventListener('input', debounce(() => renderFoodListings(), 200));
    }

    if (categoryFilter) {
      categoryFilter.addEventListener('change', () => renderFoodListings());
    }

    if (fridgeFilter) {
      fridgeFilter.addEventListener('change', () => renderFoodListings());
    }

    if (statusFilter) {
      statusFilter.addEventListener('change', () => renderFoodListings());
    }

    // Geolocation trigger & Proximity sorting
    if (gpsBtn) {
      gpsBtn.onclick = () => {
        const notice = document.getElementById('gpsStatusNotice');
        const activeBadge = document.getElementById('gpsActiveIndicator');
        if (notice) {
          notice.style.display = 'block';
          notice.innerHTML = '<span>📡 Locating your GPS position...</span>';
        }

        requestUserGeolocation((coords) => {
          sortByProximity = true;
          if (notice) {
            notice.innerHTML = '<span>✅ Showing nearest food surplus listings & fridges to your GPS location.</span>';
          }
          if (activeBadge) activeBadge.style.display = 'inline-block';
          showToast('Listings sorted by proximity to you!', 'success');
          renderFoodListings();
          if (foodMap && coords) {
            foodMap.flyTo([coords.lat, coords.lng], 13);
          }
        });
      };
    }

    // Map View Mode Switchers
    const layout = document.getElementById('foodExplorerLayout');
    const btnSplit = document.getElementById('btnViewSplit');
    const btnMap = document.getElementById('btnViewMap');
    const btnGrid = document.getElementById('btnViewGrid');

    function setViewMode(mode) {
      if (!layout) return;
      layout.classList.remove('layout-split', 'layout-map-only', 'layout-grid-only');
      document.querySelectorAll('.view-mode-btn').forEach(b => b.classList.remove('active'));

      if (mode === 'split') {
        layout.classList.add('layout-split');
        if (btnSplit) btnSplit.classList.add('active');
      } else if (mode === 'map') {
        layout.classList.add('layout-map-only');
        if (btnMap) btnMap.classList.add('active');
      } else if (mode === 'grid') {
        layout.classList.add('layout-grid-only');
        if (btnGrid) btnGrid.classList.add('active');
      }
      currentMapViewMode = mode;

      setTimeout(() => {
        if (foodMap) foodMap.invalidateSize();
      }, 200);
    }

    if (btnSplit) btnSplit.onclick = () => setViewMode('split');
    if (btnMap) btnMap.onclick = () => setViewMode('map');
    if (btnGrid) btnGrid.onclick = () => setViewMode('grid');

    // Map Inline Actions: Center on User
    const btnMapCenterUser = document.getElementById('btnMapCenterUser');
    if (btnMapCenterUser) {
      btnMapCenterUser.onclick = () => {
        if (userCoords && foodMap) {
          foodMap.flyTo([userCoords.lat, userCoords.lng], 14);
          showToast('Centered on your GPS location', 'info');
        } else {
          requestUserGeolocation((coords) => {
            if (foodMap && coords) {
              foodMap.flyTo([coords.lat, coords.lng], 14);
            }
            renderFoodListings();
          });
        }
      };
    }

    // Map Inline Actions: Fit All
    const btnMapFitAll = document.getElementById('btnMapFitAll');
    if (btnMapFitAll) {
      btnMapFitAll.onclick = () => {
        if (foodMap && foodMarkersLayer) {
          const fridges = getFridges();
          const bounds = fridges.filter(f => f.lat && f.lng).map(f => [f.lat, f.lng]);
          if (bounds.length > 0) {
            foodMap.fitBounds(bounds, { padding: [30, 30] });
          }
        }
      };
    }

    // Map Radius Filter
    const radiusFilter = document.getElementById('mapRadiusFilter');
    if (radiusFilter) {
      radiusFilter.onchange = () => {
        activeMapRadius = radiusFilter.value;
        if (activeMapRadius !== 'all' && !userCoords) {
          requestUserGeolocation(() => {
            renderFoodListings();
          });
        } else {
          renderFoodListings();
        }
      };
    }

    // Global popup event delegation for Leaflet popup buttons
    document.addEventListener('click', (e) => {
      const claimBtn = e.target.closest('.btn-popup-claim');
      if (claimBtn) {
        const id = claimBtn.getAttribute('data-id');
        if (id) openSafeCollectionModal(id);
      }

      const voiceBtn = e.target.closest('.btn-popup-voice');
      if (voiceBtn) {
        const speech = voiceBtn.getAttribute('data-speech');
        if (speech) speakText(speech);
      }
    });
  }

  function openSafeCollectionModal(donationId) {
    const donations = getDonations();
    const item = donations.find(d => d.id === donationId);
    if (!item) return;

    pendingCollectDonation = item;
    const fridges = getFridges();
    const fridge = fridges.find(f => f.id === item.fridgeId) || { name: 'Community Fridge', address: 'Downtown' };

    const modal = document.getElementById('safeCollectionModal');
    const body = document.getElementById('safeModalBody');

    if (modal && body) {
      body.innerHTML = `
        <div style="background: var(--bg-cream); padding: 1.25rem; border-radius: var(--radius-sm); margin-bottom: 1.25rem;">
          <h4 style="color: var(--primary-dark); font-size: 1.15rem; margin-bottom: 0.25rem;">${escapeHtml(item.foodName)}</h4>
          <p style="font-size: 0.9rem; color: var(--text-muted);">
            Donated by <strong>${escapeHtml(item.donorName)}</strong> • Quantity: <strong>${escapeHtml(item.quantity)}</strong>
          </p>
          <div style="margin-top: 0.5rem; font-size: 0.88rem;">
            <span>📍 Pickup Location: <strong>${escapeHtml(fridge.name)}</strong> (${escapeHtml(fridge.address)})</span>
          </div>
        </div>

        <h4 style="font-size: 0.95rem; margin-bottom: 0.5rem; color: var(--text-charcoal);">Safe Handling Inspection Checklist</h4>
        <div class="safety-checkboxes-list" style="margin-bottom: 1rem;">
          <label class="safety-checkbox-item">
            <input type="checkbox" id="modalCheckTemp" checked>
            <span>I will verify packaging temperature (cold to the touch &le; 4&deg;C or hot &ge; 60&deg;C) upon pickup.</span>
          </label>
          <label class="safety-checkbox-item">
            <input type="checkbox" id="modalCheckSeal" checked>
            <span>I will inspect all seals and ensure no odor, discoloration, or seal damage exists.</span>
          </label>
          <label class="safety-checkbox-item">
            <input type="checkbox" id="modalCheckHygiene" checked>
            <span>I will consume or refrigerate this item within 2 hours of pickup.</span>
          </label>
        </div>
      `;

      modal.classList.add('modal-active');
    }
  }

  function setupSafeCollectionModal() {
    const modal = document.getElementById('safeCollectionModal');
    const closeBtn = document.getElementById('closeSafeModalBtn');
    const cancelBtn = document.getElementById('cancelSafeModalBtn');
    const confirmBtn = document.getElementById('confirmSafeCollectBtn');

    const closeModal = () => {
      if (modal) modal.classList.remove('modal-active');
      pendingCollectDonation = null;
    };

    if (closeBtn) closeBtn.onclick = closeModal;
    if (cancelBtn) cancelBtn.onclick = closeModal;
    if (modal) {
      modal.onclick = (e) => { if (e.target === modal) closeModal(); };
    }

    if (confirmBtn) {
      confirmBtn.onclick = () => {
        if (!pendingCollectDonation) return;

        const checkTemp = document.getElementById('modalCheckTemp')?.checked;
        const checkSeal = document.getElementById('modalCheckSeal')?.checked;
        const checkHygiene = document.getElementById('modalCheckHygiene')?.checked;

        if (!checkTemp || !checkSeal || !checkHygiene) {
          showToast('Please check all safe handling criteria to proceed with collection.', 'error');
          return;
        }

        const donations = getDonations();
        const item = donations.find(d => d.id === pendingCollectDonation.id);
        if (item) {
          item.status = 'Collected';
          item.collectedAt = new Date().toISOString();
          saveDonations(donations);

          const collections = getCollections();
          collections.push({
            donationId: item.id,
            foodName: item.foodName,
            collectedAt: new Date().toISOString()
          });
          saveCollections(collections);

          showToast(`🎉 "${item.foodName}" successfully reserved for pickup!`, 'success');
          closeModal();
          renderFoodListings();
          updateHomeMetrics();
        }
      };
    }
  }

  // ============================================================================
  // 11. DONATE FOOD CONTROLLER & DYNAMIC QR PASSPORT GENERATION
  // ============================================================================
  function populateDonateFridgeDropdown() {
    const select = document.getElementById('targetFridge');
    if (!select) return;

    const fridges = getFridges();
    select.innerHTML = '<option value="">-- Choose Refrigerator Location --</option>';
    fridges.forEach(fridge => {
      const opt = document.createElement('option');
      opt.value = fridge.id;
      opt.textContent = `${fridge.name} (${fridge.landmark}) - ${fridge.capacityStatus}`;
      select.appendChild(opt);
    });
  }

  function setDefaultDonationDates() {
    const prepInput = document.getElementById('prepTime');
    const expiryInput = document.getElementById('expiryDeadline');

    if (prepInput) {
      prepInput.value = getOffsetIso(-1);
    }
    if (expiryInput) {
      expiryInput.value = getOffsetIso(12);
    }
  }

  function setupImageUpload() {
    const dropzone = document.getElementById('imgDropzone');
    const fileInput = document.getElementById('foodPhotoInput');
    const previewWrap = document.getElementById('imgPreviewWrap');
    const previewImg = document.getElementById('imgPreview');
    const removeBtn = document.getElementById('btnRemoveImg');
    const promptBox = document.getElementById('imgUploadPrompt');

    if (!dropzone || !fileInput || dropzone.getAttribute('data-wired') === 'true') return;
    dropzone.setAttribute('data-wired', 'true');

    dropzone.addEventListener('click', (e) => {
      if (e.target !== removeBtn) fileInput.click();
    });

    fileInput.addEventListener('change', function () {
      const file = this.files[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        showToast('Please select a valid image file (JPG, PNG, WebP).', 'error');
        return;
      }

      if (file.size > 4 * 1024 * 1024) {
        showToast('Image exceeds 4MB size limit. Please upload a smaller image.', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        uploadedImageBase64 = e.target.result;
        if (previewImg && previewWrap && promptBox) {
          previewImg.src = uploadedImageBase64;
          previewWrap.style.display = 'block';
          promptBox.style.display = 'none';
        }
      };
      reader.readAsDataURL(file);
    });

    if (removeBtn) {
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        uploadedImageBase64 = null;
        fileInput.value = '';
        if (previewWrap && promptBox) {
          previewWrap.style.display = 'none';
          promptBox.style.display = 'flex';
        }
      });
    }
  }

  function setupDonationForm() {
    const form = document.getElementById('donationForm');
    if (!form || form.getAttribute('data-wired') === 'true') return;
    form.setAttribute('data-wired', 'true');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const donorName = (document.getElementById('donorName') || {}).value?.trim() || '';
      const foodName = (document.getElementById('foodName') || {}).value?.trim() || '';
      const category = (document.getElementById('category') || {}).value || '';
      const quantity = (document.getElementById('quantity') || {}).value?.trim() || '';
      const weightKg = parseFloat((document.getElementById('weightKg') || {}).value) || 2.5;
      const prepTime = (document.getElementById('prepTime') || {}).value || '';
      const expiryDeadline = (document.getElementById('expiryDeadline') || {}).value || '';
      const fridgeId = (document.getElementById('targetFridge') || {}).value || '';
      const allergens = (document.getElementById('allergens') || {}).value?.trim() || '';
      const contactNumber = (document.getElementById('contactNumber') || {}).value?.trim() || '';

      const checkTemp = document.getElementById('safetyTempCheck')?.checked;
      const checkPackaging = document.getElementById('safetyPackagingCheck')?.checked;
      const checkFreshness = document.getElementById('safetyFreshnessCheck')?.checked;

      if (!donorName || !foodName || !category || !quantity || !prepTime || !expiryDeadline || !fridgeId) {
        showToast('Please fill in all required fields marked with an asterisk (*).', 'error');
        return;
      }

      if (!checkTemp || !checkPackaging || !checkFreshness) {
        showToast('Please accept all mandatory food safety declarations.', 'error');
        return;
      }

      const deadlineDate = new Date(expiryDeadline);
      const prepDate = new Date(prepTime);
      const nowDate = new Date();

      if (deadlineDate <= prepDate) {
        showToast('Collection deadline must be after preparation date & time.', 'error');
        return;
      }

      if (deadlineDate <= nowDate) {
        showToast('Collection deadline must be a future date & time.', 'error');
        return;
      }

      const randomPin = String(Math.floor(1000 + Math.random() * 9000));

      const newDonation = {
        id: 'don_' + Date.now(),
        donorName,
        foodName,
        category,
        quantity,
        weightKg,
        prepTime,
        expiryDeadline,
        fridgeId,
        allergens: allergens || 'None declared. Follow standard hygiene protocols.',
        contactNumber: contactNumber || 'Provided during pickup',
        status: 'Available',
        safetyVerified: true,
        pickupPin: randomPin,
        imageBase64: uploadedImageBase64 || null,
        createdAt: new Date().toISOString()
      };

      const donations = getDonations();
      donations.unshift(newDonation);
      saveDonations(donations);

      showToast(`🎉 "${foodName}" registered! QR Safety Passport generated.`, 'success');

      form.reset();
      uploadedImageBase64 = null;
      const previewWrap = document.getElementById('imgPreviewWrap');
      const promptBox = document.getElementById('imgUploadPrompt');
      if (previewWrap && promptBox) {
        previewWrap.style.display = 'none';
        promptBox.style.display = 'flex';
      }

      setDefaultDonationDates();
      updateHomeMetrics();

      openQrPassportModal(newDonation);
    });

    setupQrPassportModalControls();
  }

  function openQrPassportModal(donation) {
    const modal = document.getElementById('qrPassportModal');
    if (!modal) return;

    const fridges = getFridges();
    const fridge = fridges.find(f => f.id === donation.fridgeId) || { name: 'Community Fridge' };

    const tagEl = document.getElementById('qrDonationIdTag');
    if (tagEl) tagEl.textContent = `#${donation.id.toUpperCase()}`;

    const storageNote = document.getElementById('qrStorageNote');
    if (storageNote) {
      storageNote.textContent = donation.category === 'Cooked Meals' ? 'Keep Chilled ≤ 4°C' : 'Standard Ambient / Dry Storage';
    }

    const expiryNote = document.getElementById('qrExpiryNote');
    if (expiryNote) {
      try {
        expiryNote.textContent = new Date(donation.expiryDeadline).toLocaleString();
      } catch (e) {
        expiryNote.textContent = donation.expiryDeadline;
      }
    }

    const metaList = document.getElementById('qrPassportMetaList');
    if (metaList) {
      metaList.innerHTML = `
        <div class="passport-meta-item"><span>Item Name</span><strong>${escapeHtml(donation.foodName)}</strong></div>
        <div class="passport-meta-item"><span>Category</span><strong>${escapeHtml(donation.category)}</strong></div>
        <div class="passport-meta-item"><span>Net Mass</span><strong>${donation.weightKg || 2.5} kg (${escapeHtml(donation.quantity)})</strong></div>
        <div class="passport-meta-item"><span>Donor</span><strong>${escapeHtml(donation.donorName)}</strong></div>
        <div class="passport-meta-item"><span>Drop-off Hub</span><strong>${escapeHtml(fridge.name)}</strong></div>
        <div class="passport-meta-item"><span>Prep Time</span><strong>${new Date(donation.prepTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</strong></div>
      `;
    }

    const qrCanvas = document.getElementById('qrcodeCanvas');
    if (qrCanvas) {
      qrCanvas.innerHTML = '';
      const payload = {
        id: donation.id,
        item: donation.foodName,
        category: donation.category,
        weightKg: donation.weightKg,
        donor: donation.donorName,
        dropoff: fridge.name,
        deadline: donation.expiryDeadline,
        safetyCertified: true,
        standard: 'ColdChain-FoodSafety-v2'
      };

      if (typeof QRCode !== 'undefined') {
        new QRCode(qrCanvas, {
          text: JSON.stringify(payload),
          width: 140,
          height: 140,
          colorDark: '#1e293b',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.M
        });
      }
    }

    modal.classList.add('modal-active');
  }

  function setupQrPassportModalControls() {
    const modal = document.getElementById('qrPassportModal');
    const closeBtn = document.getElementById('closeQrModalBtn');
    const closePassportBtn = document.getElementById('closeQrPassportBtn');
    const printBtn = document.getElementById('btnPrintQrLabel');

    const closeModal = () => { if (modal) modal.classList.remove('modal-active'); };

    if (closeBtn) closeBtn.onclick = closeModal;
    if (closePassportBtn) closePassportBtn.onclick = closeModal;
    if (modal) {
      modal.onclick = (e) => { if (e.target === modal) closeModal(); };
    }

    if (printBtn) {
      printBtn.onclick = () => {
        window.print();
      };
    }
  }

  // ============================================================================
  // 12. IOT SMART HARDWARE TELEMETRY LAYER & TELEGRAM ALERT LOG
  // ============================================================================
  function setupIotTelemetry() {
    const toggleBtn = document.getElementById('btnToggleIotStream');
    const spikeBtn = document.getElementById('btnSimulateTempSpike');
    const streamIndicator = document.getElementById('iotStreamIndicator');
    const toggleText = document.getElementById('btnToggleIotText');

    if (toggleBtn && toggleBtn.getAttribute('data-wired') !== 'true') {
      toggleBtn.setAttribute('data-wired', 'true');
      toggleBtn.onclick = () => {
        iotStreamMode = iotStreamMode === 'live' ? 'sim' : 'live';
        if (iotStreamMode === 'live') {
          if (streamIndicator) streamIndicator.innerHTML = '<span class="stream-beacon live"></span><span id="iotStreamModeText">🔴 Live ESP8266 Stream (IP: 192.168.1.142)</span>';
          if (toggleText) toggleText.textContent = 'Switch to Simulated Stream';
          showToast('Connected to ESP8266 Live Telemetry Stream.', 'success');
        } else {
          if (streamIndicator) streamIndicator.innerHTML = '<span class="stream-beacon sim"></span><span id="iotStreamModeText">🔵 Simulated Telemetry Stream</span>';
          if (toggleText) toggleText.textContent = 'Switch to Live ESP8266 Stream';
          showToast('Switched to simulated local telemetry stream.', 'info');
        }
      };
    }

    if (spikeBtn && spikeBtn.getAttribute('data-wired') !== 'true') {
      spikeBtn.setAttribute('data-wired', 'true');
      spikeBtn.onclick = () => {
        const fridges = getFridges();
        if (fridges.length > 0) {
          fridges[0].temperature = '8.9°C';
          fridges[0].doorStatus = 'Open (2m 14s)';
          saveFridges(fridges);
          renderFridgesListings();

          const telegramLogs = document.getElementById('telegramLogEntries');
          if (telegramLogs) {
            const timeStr = new Date().toTimeString().slice(0, 8);
            telegramLogs.insertAdjacentHTML('afterbegin', `
              <div class="telegram-entry spike">
                <span class="telegram-time">[${timeStr}]</span>
                <span class="telegram-msg">🚨 <strong>CRITICAL SPIKE ALERT:</strong> City Center Chiller reached 8.9°C (>7.0°C threshold)! Door held open >2 mins. Urgent dispatch alert sent to @FoodRescueAlertBot technician!</span>
              </div>
            `);
          }

          showToast('🚨 CRITICAL TEMP SPIKE: Alert logged and dispatched to Telegram bot.', 'error');

          setTimeout(() => {
            const updated = getFridges();
            if (updated.length > 0) {
              updated[0].temperature = '3.3°C';
              updated[0].doorStatus = 'Closed';
              saveFridges(updated);
              renderFridgesListings();

              const logs = document.getElementById('telegramLogEntries');
              if (logs) {
                const nowTime = new Date().toTimeString().slice(0, 8);
                logs.insertAdjacentHTML('afterbegin', `
                  <div class="telegram-entry">
                    <span class="telegram-time">[${nowTime}]</span>
                    <span class="telegram-msg">🟢 <strong>RESOLVED:</strong> City Center Chiller compressor normalized to 3.3°C. Cold-chain integrity re-secured.</span>
                  </div>
                `);
              }
            }
          }, 9000);
        }
      };
    }
  }

  function startIotJitterLoop() {
    setInterval(() => {
      const activeSection = document.querySelector('.app-view.active-view');
      if (activeSection && activeSection.id === 'view-fridges') {
        const fridges = getFridges();
        fridges.forEach(f => {
          if (!f.unitType.includes('Freezer')) {
            const base = 3.2;
            const jitter = (Math.random() * 0.8 - 0.4).toFixed(1);
            f.temperature = `${(base + parseFloat(jitter)).toFixed(1)}°C`;
          }
        });
        saveFridges(fridges);
        renderFridgesListings();
      }
    }, 4500);
  }

    let currentFridgeFilter = 'all';

  function renderFridgesListings() {
    const container = document.getElementById('fridgesListingsContainer');
    if (!container) return;

    const searchInput = document.getElementById('fridgeSearchInput');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const fridges = getFridges();
    fridges.forEach(f => {
      if (userCoords && f.lat && f.lng) {
        f.distanceKm = calculateDistanceKm(userCoords.lat, userCoords.lng, f.lat, f.lng);
      }
    });

    let filtered = fridges.filter(f => {
      // Type pill filter
      if (currentFridgeFilter === 'freezer-only') {
        if (!f.hasFreezer || !f.unitType.includes('Dedicated')) return false;
      } else if (currentFridgeFilter === 'has-freezer') {
        if (!f.hasFreezer) return false;
      } else if (currentFridgeFilter === 'chiller-only') {
        if (f.unitType.includes('Dedicated Deep Chest Freezer')) return false;
      } else if (currentFridgeFilter === '24-7') {
        if (!f.operatingHours.includes('24/7')) return false;
      }

      // Search query filter
      if (!query) return true;
      return (
        f.name.toLowerCase().includes(query) ||
        f.address.toLowerCase().includes(query) ||
        f.landmark.toLowerCase().includes(query) ||
        f.city.toLowerCase().includes(query) ||
        (f.unitType && f.unitType.toLowerCase().includes(query)) ||
        (f.freezerType && f.freezerType.toLowerCase().includes(query)) ||
        (f.suitableFor && f.suitableFor.toLowerCase().includes(query))
      );
    });

    if (sortByProximity && userCoords) {
      filtered.sort((a, b) => (a.distanceKm ?? 999) - (b.distanceKm ?? 999));
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-results-state" style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--surface-white); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;" aria-hidden="true">❄️</div>
          <h3>No Freezers or Fridges Found</h3>
          <p style="color: var(--text-muted);">Try clearing your search query or selecting "All Hubs".</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(fridge => {
      const mapsUrl = (fridge.lat && fridge.lng)
        ? `https://www.google.com/maps/dir/?api=1&destination=${fridge.lat},${fridge.lng}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fridge.name + ' ' + fridge.address)}`;

      const maxSlots = fridge.maxSlots || 20;
      const usedSlots = fridge.usedSlots || 10;
      const pct = Math.min(100, Math.round((usedSlots / maxSlots) * 100));
      const barColorClass = pct > 80 ? 'capacity-bar-red' : pct > 45 ? 'capacity-bar-amber' : 'capacity-bar-green';

      const tempVal = parseFloat(fridge.temperature) || 3.2;
      const isFreezerOnly = fridge.unitType && fridge.unitType.includes('Dedicated');
      const isCriticalTemp = !isFreezerOnly && tempVal > 7.0;

      const hasFreezerBadge = fridge.hasFreezer ? `
        <span class="freezer-badge-pill">
          <span>❄️</span> Deep Freezer (${fridge.freezerTemperature || '-18°C'})
        </span>
      ` : '';

      return `
        <article class="fridge-card ${fridge.hasFreezer ? 'card-has-freezer' : ''}">
          <div class="fridge-card-header">
            <div class="fridge-icon" aria-hidden="true">${fridge.hasFreezer ? '❄️' : '🧊'}</div>
            <div style="flex: 1;">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.35rem;">
                <span class="fridge-badge">${escapeHtml(fridge.unitType || 'Community Fridge')}</span>
                ${fridge.distanceKm ? `<span class="distance-badge">📍 ${fridge.distanceKm} km away</span>` : ''}
              </div>
              <h3 class="fridge-name">${escapeHtml(fridge.name)}</h3>
            </div>
          </div>

          <!-- Freezer & Telemetry Highlights -->
          <div class="fridge-iot-box">
            <div class="iot-row">
              <span>🌡️ ${isFreezerOnly ? 'Freezer Temp' : 'Chiller Temp'}: <strong style="color: ${isCriticalTemp ? 'var(--accent-red)' : 'var(--primary-green)'};">${escapeHtml(fridge.temperature || '3.2°C')}</strong></span>
              ${fridge.hasFreezer && !isFreezerOnly ? `<span>❄️ Freezer: <strong>${escapeHtml(fridge.freezerTemperature || '-18.5°C')}</strong></span>` : ''}
              <span>🚪 Door: <span class="iot-tag door-closed">${escapeHtml(fridge.doorStatus || 'Closed')}</span></span>
            </div>
            
            <div class="iot-row" style="margin-top: 0.35rem;">
              ${hasFreezerBadge}
              <span style="font-size: 0.8rem; color: var(--text-muted);">🧼 Sanitized: <strong>${escapeHtml(fridge.lastCleaned || 'Today')}</strong></span>
            </div>

            <!-- Capacity Progress -->
            <div class="capacity-progress-wrap" style="margin-top: 0.75rem;">
              <div class="capacity-labels">
                <span>Overall Storage Occupancy</span>
                <strong>${usedSlots} / ${maxSlots} slots (${pct}%)</strong>
              </div>
              <div class="capacity-progress-track">
                <div class="capacity-progress-bar ${barColorClass}" style="width: ${pct}%;"></div>
              </div>
            </div>

            ${fridge.hasFreezer && fridge.freezerMaxSlots ? `
              <div class="freezer-capacity-mini">
                <span class="freezer-mini-label">❄️ Deep Freezer Slots Available:</span>
                <strong>${fridge.freezerMaxSlots - (fridge.freezerUsedSlots || 0)} / ${fridge.freezerMaxSlots} Free</strong>
              </div>
            ` : ''}
          </div>

          <!-- Location & Access Details -->
          <div class="fridge-details">
            <div class="fridge-detail-item">
              <span class="detail-icon">📍</span> 
              <div>
                <strong>Location Address:</strong> ${escapeHtml(fridge.address)}
                <div class="landmark-text">
                  🧭 <strong>Directions / Landmark:</strong> ${escapeHtml(fridge.landmark)}
                </div>
              </div>
            </div>

            <div class="fridge-detail-item">
              <span class="detail-icon">⏰</span> 
              <div><strong>Operating Access:</strong> ${escapeHtml(fridge.operatingHours)}</div>
            </div>

            ${fridge.suitableFor ? `
              <div class="fridge-detail-item">
                <span class="detail-icon">📦</span> 
                <div><strong>Suitable Items:</strong> ${escapeHtml(fridge.suitableFor)}</div>
              </div>
            ` : ''}

            <div class="fridge-detail-item">
              <span class="detail-icon">👤</span> 
              <div><strong>Site Lead / Contact:</strong> ${escapeHtml(fridge.contactPerson)}</div>
            </div>
          </div>

          <div class="fridge-actions">
            <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="flex: 1;">
              <span>📍</span> View on Google Maps
            </a>
            <a href="#donate" class="btn btn-secondary btn-sm" style="flex: 1;">
              <span>🍲</span> Stock Hub
            </a>
          </div>
        </article>
      `;
    }).join('');
  }

  function setupFridgeInteractions() {
    const searchInput = document.getElementById('fridgeSearchInput');
    const sortGpsBtn = document.getElementById('btnSortFridgesGps');
    const filterBtns = document.querySelectorAll('.fridge-filter-pill');

    if (searchInput) {
      searchInput.addEventListener('input', debounce(() => renderFridgesListings(), 200));
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFridgeFilter = btn.getAttribute('data-filter') || 'all';
        renderFridgesListings();
      });
    });

    if (sortGpsBtn) {
      sortGpsBtn.addEventListener('click', () => {
        const alertEl = document.getElementById('fridgesGpsAlert');
        if (!navigator.geolocation) {
          showToast('Geolocation is not supported by your browser.', 'error');
          return;
        }

        if (alertEl) {
          alertEl.style.display = 'block';
          alertEl.innerHTML = '<span>📡 Locating nearest freezers & community fridges...</span>';
        }

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            userCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            sortByProximity = true;
            if (alertEl) {
              alertEl.innerHTML = '<span>✅ Showing closest community refrigerators & deep freezers to your location.</span>';
            }
            showToast('Sorted by proximity to your location!', 'success');
            renderFridgesListings();
          },
          (err) => {
            console.warn('Geolocation failed:', err);
            // Fallback default coordinates for demonstration
            userCoords = { lat: 40.7128, lng: -74.0060 };
            sortByProximity = true;
            if (alertEl) {
              alertEl.innerHTML = '<span>📍 Demo Location Enabled (Downtown Metro) — Freezers sorted by distance.</span>';
            }
            showToast('Sorted by nearest freezers and hubs (Downtown Area)!', 'info');
            renderFridgesListings();
          },
          { timeout: 8000 }
        );
      });
    }
  }

  // ============================================================================
  // 13. VOLUNTEER MULTI-STOP ROUTE OPTIMIZER & DISPATCH
  // ============================================================================
  function setupVolunteerRegistration() {
    const form = document.getElementById('volunteerForm');
    if (!form || form.getAttribute('data-wired') === 'true') return;
    form.setAttribute('data-wired', 'true');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = (document.getElementById('volunteerName') || {}).value?.trim() || '';
      const phone = (document.getElementById('volunteerPhone') || {}).value?.trim() || '';
      const email = (document.getElementById('volunteerEmail') || {}).value?.trim() || '';
      const location = (document.getElementById('volunteerLocation') || {}).value?.trim() || '';

      const taskCheckboxes = form.querySelectorAll('input[name="volunteerTasks"]:checked');
      const selectedTasks = Array.from(taskCheckboxes).map(cb => cb.value);

      if (!name || !phone || !email || !location) {
        showToast('Please fill in your name, phone, email, and preferred area.', 'error');
        return;
      }

      if (selectedTasks.length === 0) {
        showToast('Please select at least one volunteer activity.', 'error');
        return;
      }

      const newVol = {
        id: 'vol_' + Date.now(),
        name,
        phone,
        email,
        location,
        tasks: selectedTasks,
        registeredAt: new Date().toISOString()
      };

      const volunteers = getVolunteers();
      volunteers.unshift(newVol);
      saveVolunteers(volunteers);

      showToast(`🌟 Welcome ${name}! You are registered in our volunteer network.`, 'success');
      form.reset();

      const feedback = document.getElementById('volunteerFeedback');
      if (feedback) {
        feedback.innerHTML = `
          <div class="alert alert-success">
            <strong>Registration Confirmed!</strong> Thank you for volunteering. A local coordinator will reach out to ${escapeHtml(phone)} for food rescue dispatch runs in ${escapeHtml(location)}.
          </div>
        `;
      }
    });
  }

  function renderVolunteerDispatchBoard() {
    const container = document.getElementById('volunteerDispatchBoardContainer');
    if (!container) return;

    const donations = getDonations();
    const fridges = getFridges();
    const fridgeMap = {};
    fridges.forEach(f => { fridgeMap[f.id] = f; });

    const dispatchItems = donations.filter(d => d.status === 'Available' || d.status === 'In Transit');

    if (dispatchItems.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem; background: var(--surface-white); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎉</div>
          <h3>All Rescue Runs Dispatched!</h3>
          <p style="color: var(--text-muted);">No surplus listings currently waiting for transport.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = dispatchItems.map(item => {
      const fridge = fridgeMap[item.fridgeId] || { name: 'Community Fridge', address: 'Downtown' };
      const isInTransit = item.status === 'In Transit';
      const isChecked = selectedBatchIds.includes(item.id);

      return `
        <article class="dispatch-card" >
          <div class="dispatch-header">
            <span class="badge-status ${isInTransit ? 'badge-status-in-transit' : 'badge-status-available'}">
              ${isInTransit ? '🚗 In Transit' : '🟢 Ready for Pickup'}
            </span>
            <span style="font-size: 0.8rem; color: var(--text-muted);">#${item.id.slice(-6)}</span>
          </div>

          ${!isInTransit ? `
            <label class="batch-checkbox-wrap">
              <input type="checkbox" class="batch-dispatch-checkbox" data-id="${item.id}" ${isChecked ? 'checked' : ''}>
              <span>Include in Multi-Stop Route</span>
            </label>
          ` : ''}

          <h4 style="font-size: 1.15rem; color: var(--text-charcoal);">${escapeHtml(item.foodName)}</h4>
          
          <div style="font-size: 0.88rem; color: var(--text-muted); margin: 0.5rem 0;">
            <div><strong>Donor:</strong> ${escapeHtml(item.donorName)} (📞 ${escapeHtml(item.contactNumber || 'Available')})</div>
            <div style="margin-top: 0.2rem;"><strong>Payload:</strong> ${escapeHtml(item.quantity)} (${item.weightKg || 2.5} kg)</div>
            <div style="margin-top: 0.2rem;"><strong>Deliver To:</strong> ${escapeHtml(fridge.name)}</div>
          </div>

          <div style="margin-top: auto; padding-top: 0.5rem;">
            ${!isInTransit ? `
              <button type="button" class="btn btn-secondary btn-sm w-full btn-claim-dispatch" data-id="${item.id}">
                <span>🚗</span> Claim Individual Pickup
              </button>
            ` : `
              <div style="background: #e3f2fd; padding: 0.5rem 0.75rem; border-radius: var(--radius-xs); font-size: 0.82rem; text-align: center; color: #0d47a1;">
                Assigned: <strong>${escapeHtml(item.claimedBy || 'Volunteer')}</strong> • PIN: <strong>${item.pickupPin || '4821'}</strong>
              </div>
            `}
          </div>
        </article>
      `;
    }).join('');

    container.querySelectorAll('.batch-dispatch-checkbox').forEach(cb => {
      cb.onchange = function () {
        const id = this.getAttribute('data-id');
        if (this.checked) {
          if (!selectedBatchIds.includes(id)) selectedBatchIds.push(id);
        } else {
          selectedBatchIds = selectedBatchIds.filter(x => x !== id);
        }
        updateBatchBar();
      };
    });

    container.querySelectorAll('.btn-claim-dispatch').forEach(btn => {
      btn.onclick = function () {
        const id = this.getAttribute('data-id');
        openTransportClaimModal(id);
      };
    });

    refreshTilt();
  }

  function updateBatchBar() {
    const countEl = document.getElementById('selectedBatchCount');
    const optimizeBtn = document.getElementById('btnOptimizeMultiStopRoute');

    if (countEl) {
      countEl.textContent = `${selectedBatchIds.length} Selected for Batch Route`;
    }

    if (optimizeBtn) {
      optimizeBtn.disabled = selectedBatchIds.length < 1;
    }
  }

  function setupVolunteerDispatchBatch() {
    const selectAllBtn = document.getElementById('btnSelectAllBatches');
    const optimizeBtn = document.getElementById('btnOptimizeMultiStopRoute');

    if (selectAllBtn && selectAllBtn.getAttribute('data-wired') !== 'true') {
      selectAllBtn.setAttribute('data-wired', 'true');
      selectAllBtn.onclick = () => {
        const donations = getDonations();
        const available = donations.filter(d => d.status === 'Available');
        if (selectedBatchIds.length === available.length) {
          selectedBatchIds = [];
        } else {
          selectedBatchIds = available.map(d => d.id);
        }
        renderVolunteerDispatchBoard();
        updateBatchBar();
      };
    }

    if (optimizeBtn && optimizeBtn.getAttribute('data-wired') !== 'true') {
      optimizeBtn.setAttribute('data-wired', 'true');
      optimizeBtn.onclick = () => {
        openMultiStopRouteModal();
      };
    }

    setupMultiStopRouteModalControls();
  }

  function openMultiStopRouteModal() {
    const modal = document.getElementById('multiStopRouteModal');
    const body = document.getElementById('multiStopRouteBody');
    const mapBtn = document.getElementById('btnLaunchGoogleMapsRoute');
    if (!modal || !body) return;

    const donations = getDonations();
    const fridges = getFridges();
    const fridgeMap = {};
    fridges.forEach(f => { fridgeMap[f.id] = f; });

    const selectedItems = donations.filter(d => selectedBatchIds.includes(d.id));
    if (selectedItems.length === 0) return;

    let totalWeight = 0;
    selectedItems.forEach(i => totalWeight += (i.weightKg || 2.5));

    const targetFridge = fridges[0] || { name: 'City Center Fridge', lat: 40.7128, lng: -74.0060, address: '42 Market Square' };
    const userLat = userCoords ? userCoords.lat : 40.7128;
    const userLng = userCoords ? userCoords.lng : -74.0060;

    const donorWaypoints = [
      { lat: 40.7200, lng: -74.0000, name: 'Donor Stop 1: Green Olive Bistro' },
      { lat: 40.7300, lng: -73.9900, name: 'Donor Stop 2: Artisan Crust Bakery' }
    ];

    const waypointQuery = donorWaypoints.map(w => `${w.lat},${w.lng}`).join('|');
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${targetFridge.lat},${targetFridge.lng}&waypoints=${waypointQuery}`;

    if (mapBtn) mapBtn.href = mapsUrl;

    body.innerHTML = `
      <div class="multi-stop-route-summary">
        <div class="route-stat-card">
          <div>
            <strong>${selectedItems.length} Pickups</strong>
            <small>Surplus Stops</small>
          </div>
          <div>
            <strong>${totalWeight.toFixed(1)} kg</strong>
            <small>Total Food Cargo</small>
          </div>
          <div>
            <strong>~24 Mins</strong>
            <small>Est. Total Run Time</small>
          </div>
        </div>

        <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.75rem;">
          <div class="route-waypoint-step">
            <div class="waypoint-icon">A</div>
            <div class="waypoint-content">
              <h4>Current Volunteer Driver Location</h4>
              <p>GPS Origin Start Point (${userLat.toFixed(4)}, ${userLng.toFixed(4)})</p>
            </div>
          </div>

          ${selectedItems.map((item, idx) => `
            <div class="route-waypoint-step">
              <div class="waypoint-icon">${String.fromCharCode(66 + idx)}</div>
              <div class="waypoint-content">
                <h4>Pickup #${idx + 1}: ${escapeHtml(item.donorName)}</h4>
                <p>📦 Collect: <strong>${escapeHtml(item.foodName)}</strong> (${escapeHtml(item.quantity)}) • 📞 ${escapeHtml(item.contactNumber || 'Available')}</p>
              </div>
            </div>
          `).join('')}

          <div class="route-waypoint-step">
            <div class="waypoint-icon" style="background: var(--primary-green); color: #fff;">🏁</div>
            <div class="waypoint-content">
              <h4>Final Drop-off: ${escapeHtml(targetFridge.name)}</h4>
              <p>📍 ${escapeHtml(targetFridge.address)} • Temperature Monitored Chiller Hub</p>
            </div>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('modal-active');
  }

  function setupMultiStopRouteModalControls() {
    const modal = document.getElementById('multiStopRouteModal');
    const closeBtn = document.getElementById('closeRouteModalBtn');
    const closeMultiBtn = document.getElementById('closeMultiStopBtn');

    const closeModal = () => { if (modal) modal.classList.remove('modal-active'); };
    if (closeBtn) closeBtn.onclick = closeModal;
    if (closeMultiBtn) closeMultiBtn.onclick = closeModal;
    if (modal) {
      modal.onclick = (e) => { if (e.target === modal) closeModal(); };
    }
  }

  function openTransportClaimModal(donationId) {
    const donations = getDonations();
    const item = donations.find(d => d.id === donationId);
    if (!item) return;

    pendingTransportDonation = item;
    const fridges = getFridges();
    const fridge = fridges.find(f => f.id === item.fridgeId) || { name: 'Community Fridge', address: 'Downtown' };

    const modal = document.getElementById('transportClaimModal');
    const body = document.getElementById('transportModalBody');

    if (modal && body) {
      body.innerHTML = `
        <div style="background: var(--bg-cream); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1rem;">
          <h4 style="color: var(--primary-dark);">${escapeHtml(item.foodName)}</h4>
          <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.2rem;">
            Donor: <strong>${escapeHtml(item.donorName)}</strong> • Phone: <strong>${escapeHtml(item.contactNumber || 'Available')}</strong>
          </p>
          <p style="font-size: 0.88rem; color: var(--text-charcoal); margin-top: 0.3rem;">
            Destination Fridge: <strong>${escapeHtml(fridge.name)}</strong> (${escapeHtml(fridge.address)})
          </p>
        </div>

        <div style="background: #e3f2fd; border: 1px solid #bbdefb; border-radius: var(--radius-sm); padding: 1rem; text-align: center;">
          <div style="font-size: 0.84rem; color: #1565c0; font-weight: 700;">SECURE 4-DIGIT DROP-OFF PIN:</div>
          <div class="pin-input-box" style="color: #0d47a1; background: transparent; border: none; font-size: 1.8rem; font-weight: bold; letter-spacing: 4px;">${item.pickupPin || '4821'}</div>
          <small style="color: #555;">Enter this PIN at the community fridge drop-off terminal to complete delivery.</small>
        </div>
      `;

      modal.classList.add('modal-active');
    }
  }

  function setupTransportClaimModal() {
    const modal = document.getElementById('transportClaimModal');
    const closeBtn = document.getElementById('closeTransportModalBtn');
    const cancelBtn = document.getElementById('cancelTransportModalBtn');
    const confirmBtn = document.getElementById('confirmTransportClaimBtn');

    const closeModal = () => {
      if (modal) modal.classList.remove('modal-active');
      pendingTransportDonation = null;
    };

    if (closeBtn) closeBtn.onclick = closeModal;
    if (cancelBtn) cancelBtn.onclick = closeModal;
    if (modal) {
      modal.onclick = (e) => { if (e.target === modal) closeModal(); };
    }

    if (confirmBtn) {
      confirmBtn.onclick = () => {
        if (!pendingTransportDonation) return;

        const donations = getDonations();
        const item = donations.find(d => d.id === pendingTransportDonation.id);
        if (item) {
          item.status = 'In Transit';
          item.claimedBy = 'Assigned Driver (You)';
          saveDonations(donations);

          showToast(`🚗 You have claimed pickup for "${item.foodName}". PIN is ${item.pickupPin || '4821'}.`, 'success');
          closeModal();
          renderVolunteerDispatchBoard();
          populateDropoffPinSelect();
        }
      };
    }

    const dropoffForm = document.getElementById('volunteerDropoffPinForm');
    if (dropoffForm && dropoffForm.getAttribute('data-wired') !== 'true') {
      dropoffForm.setAttribute('data-wired', 'true');
      dropoffForm.onsubmit = function (e) {
        e.preventDefault();
        const select = document.getElementById('dropoffDonationSelect');
        const pinInput = document.getElementById('dropoffPinInput');

        if (!select || !pinInput) return;
        const donationId = select.value;
        const enteredPin = pinInput.value.trim();

        if (!donationId) {
          showToast('Please select a donation item to complete drop-off.', 'error');
          return;
        }

        const donations = getDonations();
        const item = donations.find(d => d.id === donationId);

        if (!item) {
          showToast('Donation record not found.', 'error');
          return;
        }

        if (item.pickupPin && enteredPin !== item.pickupPin) {
          showToast('Invalid 4-digit PIN. Please check the code provided on your dispatch ticket.', 'error');
          return;
        }

        item.status = 'Collected';
        item.completedAt = new Date().toISOString();
        saveDonations(donations);

        showToast(`🎉 Drop-off verified! "${item.foodName}" successfully stocked into fridge.`, 'success');
        pinInput.value = '';
        renderVolunteerDispatchBoard();
        populateDropoffPinSelect();
        updateHomeMetrics();
      };
    }
  }

  function populateDropoffPinSelect() {
    const select = document.getElementById('dropoffDonationSelect');
    if (!select) return;

    const donations = getDonations();
    const inTransitItems = donations.filter(d => d.status === 'In Transit');

    select.innerHTML = '<option value="">-- Choose Claimed Delivery --</option>';
    inTransitItems.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item.id;
      opt.textContent = `${item.foodName} (${item.quantity}) - ${item.donorName}`;
      select.appendChild(opt);
    });
  }

  // ============================================================================
  // 14. CORPORATE CSR & TAX EXEMPTION AUDIT MODAL
  // ============================================================================
  function setupCsrModal() {
    const openBtn = document.getElementById('btnOpenCsrModal');
    const modal = document.getElementById('csrReportModal');
    const closeBtn = document.getElementById('closeCsrModalBtn');
    const closeCsrBtn = document.getElementById('closeCsrBtn');
    const printBtn = document.getElementById('btnPrintCsrCertificate');

    if (openBtn && openBtn.getAttribute('data-wired') !== 'true') {
      openBtn.setAttribute('data-wired', 'true');
      openBtn.onclick = () => {
        const donations = getDonations();
        const totalCount = donations.length;
        let totalKg = 0;
        donations.forEach(d => totalKg += (d.weightKg || 2.5));
        const totalMeals = Math.round(totalKg / 0.4);
        const totalCo2 = (totalKg * 2.5).toFixed(1);

        const countEl = document.getElementById('csrTotalDonationsCount');
        const kgEl = document.getElementById('csrGrossWeightKg');
        const mealsEl = document.getElementById('csrMealsProvidedCount');
        const co2El = document.getElementById('csrCarbonOffsetKg');
        const timeEl = document.getElementById('csrAuditTimestamp');

        if (countEl) countEl.textContent = totalCount;
        if (kgEl) kgEl.textContent = `${totalKg.toFixed(1)} kg`;
        if (mealsEl) mealsEl.textContent = totalMeals.toLocaleString();
        if (co2El) co2El.textContent = `${totalCo2} kg`;
        if (timeEl) timeEl.textContent = new Date().toISOString().slice(0, 10);

        if (modal) modal.classList.add('modal-active');
      };
    }

    const closeModal = () => { if (modal) modal.classList.remove('modal-active'); };
    if (closeBtn) closeBtn.onclick = closeModal;
    if (closeCsrBtn) closeCsrBtn.onclick = closeModal;
    if (modal) {
      modal.onclick = (e) => { if (e.target === modal) closeModal(); };
    }

    if (printBtn && printBtn.getAttribute('data-wired') !== 'true') {
      printBtn.setAttribute('data-wired', 'true');
      printBtn.onclick = () => {
        window.print();
      };
    }
  }

  // ============================================================================
  // 15. CONTACT & EMERGENCY RESCUE DESK CONTROLLER
  // ============================================================================
  function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form || form.getAttribute('data-wired') === 'true') return;
    form.setAttribute('data-wired', 'true');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = (document.getElementById('contactFullName') || {}).value?.trim() || '';
      const email = (document.getElementById('contactEmail') || {}).value?.trim() || '';
      const phone = (document.getElementById('contactPhone') || {}).value?.trim() || '';
      const topic = (document.getElementById('contactInquiryType') || {}).value || '';
      const message = (document.getElementById('contactMessage') || {}).value?.trim() || '';

      if (!name || !email || !topic || !message) {
        showToast('Please complete all contact inquiry fields.', 'error');
        return;
      }

      const inquiry = {
        id: 'inq_' + Date.now(),
        name,
        email,
        phone,
        topic,
        message,
        timestamp: new Date().toISOString()
      };

      const list = getContactInquiries();
      list.unshift(inquiry);
      saveContactInquiries(list);

      showToast(`📬 Thank you ${name}. Your message was routed to the dispatch coordination team.`, 'success');
      form.reset();
    });
  }

  // ============================================================================
  // 16. ADMIN PORTAL, FREEZER ADDITION & CSV EXPORT
  // ============================================================================
  function renderAdminPortal() {
    updateAdminMetrics();
    renderAdminDonationsTable();
    setupAddFridgeForm();
    setupAdminActionButtons();
  }

  function updateAdminMetrics() {
    const donations = getDonations();
    const volunteers = getVolunteers();

    const totalDonations = donations.length;
    const activeDonations = donations.filter(d => d.status === 'Available').length;
    const collectedDonations = donations.filter(d => d.status === 'Collected').length;
    const totalVolunteers = volunteers.length;

    const elTotalDon = document.getElementById('adminMetricTotal');
    const elActiveDon = document.getElementById('adminMetricActive');
    const elCollectedDon = document.getElementById('adminMetricCompleted');
    const elVolunteers = document.getElementById('adminMetricVolunteers');

    if (elTotalDon) elTotalDon.textContent = totalDonations;
    if (elActiveDon) elActiveDon.textContent = activeDonations;
    if (elCollectedDon) elCollectedDon.textContent = collectedDonations;
    if (elVolunteers) elVolunteers.textContent = totalVolunteers;
  }

  function renderAdminDonationsTable() {
    const tbody = document.getElementById('adminDonationsTableBody');
    if (!tbody) return;

    const donations = getDonations();
    const fridges = getFridges();
    const fridgeMap = {};
    fridges.forEach(f => { fridgeMap[f.id] = f.name; });

    if (donations.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">No donation records present.</td></tr>';
      return;
    }

    tbody.innerHTML = donations.map(d => `
      <tr>
        <td><strong>#${d.id.slice(-6)}</strong></td>
        <td>${escapeHtml(d.foodName)} (${d.weightKg || 2.5} kg)</td>
        <td>${escapeHtml(d.category)}</td>
        <td>${escapeHtml(d.donorName)}</td>
        <td>${escapeHtml(fridgeMap[d.fridgeId] || 'Fridge')}</td>
        <td><span class="badge-status badge-status-${d.status.toLowerCase().replace(/\\s+/g, '-')}">${d.status}</span></td>
        <td>
          <div style="display: flex; gap: 0.35rem;">
            ${d.status !== 'Expired' && d.status !== 'Collected' ? `
              <button type="button" class="btn btn-outline btn-sm btn-admin-expire" data-id="${d.id}" title="Mark Expired">Expire</button>
            ` : ''}
            <button type="button" class="btn btn-outline btn-sm btn-admin-del" data-id="${d.id}" style="color: var(--accent-red);" title="Delete Record">✕</button>
          </div>
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('.btn-admin-expire').forEach(btn => {
      btn.onclick = function () {
        const id = this.getAttribute('data-id');
        const list = getDonations();
        const item = list.find(d => d.id === id);
        if (item) {
          item.status = 'Expired';
          saveDonations(list);
          showToast(`"${item.foodName}" marked as expired.`, 'info');
          renderAdminPortal();
        }
      };
    });

    tbody.querySelectorAll('.btn-admin-del').forEach(btn => {
      btn.onclick = function () {
        const id = this.getAttribute('data-id');
        showConfirmModal('Delete Food Listing', 'Are you sure you want to delete this listing record?', () => {
          let list = getDonations();
          list = list.filter(d => d.id !== id);
          saveDonations(list);
          showToast('Donation listing deleted.', 'success');
          renderAdminPortal();
          updateHomeMetrics();
        });
      };
    });
  }

  function setupAddFridgeForm() {
    const form = document.getElementById('addFridgeForm');
    if (!form || form.getAttribute('data-wired') === 'true') return;
    form.setAttribute('data-wired', 'true');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = (document.getElementById('newFridgeName') || {}).value?.trim() || '';
      const address = (document.getElementById('newFridgeAddress') || {}).value?.trim() || '';
      const landmark = (document.getElementById('newFridgeLandmark') || {}).value?.trim() || '';
      const unitType = (document.getElementById('newFridgeType') || {}).value || 'Commercial Refrigerator';
      const hours = (document.getElementById('newFridgeHours') || {}).value?.trim() || '24/7 Open Access';
      const contact = (document.getElementById('newFridgeContact') || {}).value?.trim() || '';
      const lat = parseFloat((document.getElementById('newFridgeLat') || {}).value) || 40.7128;
      const lng = parseFloat((document.getElementById('newFridgeLng') || {}).value) || -74.0060;

      if (!name || !address || !landmark || !contact) {
        showToast('Please fill all required refrigerator fields.', 'error');
        return;
      }

      const newFridge = {
        id: 'fridge_' + Date.now(),
        name,
        address,
        landmark,
        city: 'Metro City',
        operatingHours: hours,
        unitType,
        capacityStatus: '0% Full',
        maxSlots: 20,
        usedSlots: 0,
        temperature: unitType.includes('Freezer') ? '-18.0°C' : '3.5°C',
        doorStatus: 'Closed',
        lastCleaned: 'Just now',
        lat,
        lng,
        contactPerson: contact
      };

      const fridges = getFridges();
      fridges.push(newFridge);
      saveFridges(fridges);

      showToast(`🎉 "${name}" added to community refrigerator network!`, 'success');
      form.reset();
      renderAdminPortal();
    });
  }

  function setupAdminActionButtons() {
    const exportBtn = document.getElementById('exportDonationsCsvBtn');
    if (exportBtn && exportBtn.getAttribute('data-wired') !== 'true') {
      exportBtn.setAttribute('data-wired', 'true');
      exportBtn.onclick = () => exportDonationsToCsv();
    }

    const purgeBtn = document.getElementById('purgeExpiredBtn');
    if (purgeBtn && purgeBtn.getAttribute('data-wired') !== 'true') {
      purgeBtn.setAttribute('data-wired', 'true');
      purgeBtn.onclick = () => {
        showConfirmModal(
          'Purge Expired Listings',
          'Are you sure you want to delete all expired listings permanently?',
          () => {
            let list = getDonations();
            const initialCount = list.length;
            list = list.filter(d => d.status !== 'Expired');
            saveDonations(list);
            const purged = initialCount - list.length;
            showToast(`Purged ${purged} expired listings.`, 'success');
            renderAdminPortal();
          }
        );
      };
    }

    const resetBtn = document.getElementById('resetDemoDataBtn');
    if (resetBtn && resetBtn.getAttribute('data-wired') !== 'true') {
      resetBtn.setAttribute('data-wired', 'true');
      resetBtn.onclick = () => {
        showConfirmModal(
          'Reset Demonstration Data',
          'This will reset all food donations, community refrigerators, and volunteers back to initial demo records. Proceed?',
          () => {
            initStorage(true);
            showToast('Demonstration dataset restored!', 'success');
            renderAdminPortal();
            updateHomeMetrics();
          }
        );
      };
    }
  }

  function exportDonationsToCsv() {
    const donations = getDonations();
    const fridges = getFridges();
    const fridgeMap = {};
    fridges.forEach(f => { fridgeMap[f.id] = f.name; });

    if (donations.length === 0) {
      showToast('No donation records available for export.', 'error');
      return;
    }

    const headers = ['Donation ID', 'Food Name', 'Category', 'Quantity', 'Weight (kg)', 'Donor Name', 'Target Refrigerator', 'Status', 'Preparation Time', 'Expiry Deadline', 'Created At'];
    
    const rows = donations.map(d => [
      d.id,
      `"${(d.foodName || '').replace(/"/g, '""')}"`,
      `"${(d.category || '').replace(/"/g, '""')}"`,
      `"${(d.quantity || '').replace(/"/g, '""')}"`,
      d.weightKg || 2.5,
      `"${(d.donorName || '').replace(/"/g, '""')}"`,
      `"${(fridgeMap[d.fridgeId] || 'Fridge').replace(/"/g, '""')}"`,
      d.status,
      d.prepTime || '',
      d.expiryDeadline || '',
      d.createdAt || ''
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `food_wastage_donations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('📥 CSV data export downloaded successfully.', 'success');
  }

  // ============================================================================
  // 17. UTILITIES
  // ============================================================================
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }

  // ============================================================================
  // 18. APPLICATION INITIALIZATION
  // ============================================================================
  document.addEventListener('DOMContentLoaded', () => {
    try { initStorage(false); } catch (e) { console.error('initStorage error:', e); }
    try { startLiveDateTimer(); } catch (e) { console.error('startLiveDateTimer error:', e); }
    try { setupMobileMenu(); } catch (e) { console.error('setupMobileMenu error:', e); }
    try { setupGlobalNavigation(); } catch (e) { console.error('setupGlobalNavigation error:', e); }
    try { setupLanguageSwitcher(); } catch (e) { console.error('setupLanguageSwitcher error:', e); }
    try { initFoodListingsMap(); } catch (e) { console.error('initFoodListingsMap error:', e); }
    try { initShelfLifeEstimator(); } catch (e) { console.error('initShelfLifeEstimator error:', e); }
    try { startWastageTicker(); } catch (e) { console.error('startWastageTicker error:', e); }
    try { setupSafeCollectionModal(); } catch (e) { console.error('setupSafeCollectionModal error:', e); }
    try { setupTransportClaimModal(); } catch (e) { console.error('setupTransportClaimModal error:', e); }
    try { setupCsrModal(); } catch (e) { console.error('setupCsrModal error:', e); }

    try { setupDonationForm(); } catch (e) { console.error('setupDonationForm error:', e); }
    try { setupFindFoodFilters(); } catch (e) { console.error('setupFindFoodFilters error:', e); }
    try { setupFridgeInteractions(); } catch (e) { console.error('setupFridgeInteractions error:', e); }
    try { setupVolunteerRegistration(); } catch (e) { console.error('setupVolunteerRegistration error:', e); }
    try { setupContactForm(); } catch (e) { console.error('setupContactForm error:', e); }

    try { startGlobalExpiryTimer(); } catch (e) { console.error('startGlobalExpiryTimer error:', e); }
    try { startIotJitterLoop(); } catch (e) { console.error('startIotJitterLoop error:', e); }
    try { refreshTilt(); } catch (e) {}

    window.addEventListener('hashchange', handleRoute);
    
    if (!window.location.hash) {
      window.location.hash = '#' + DEFAULT_ROUTE;
    }
    handleRoute();
  });

})();
