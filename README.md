# 🍲 Food Bridge — Smart IoT-Connected Food Rescue Platform

A modern, responsive web application connecting restaurants, grocers, caterers, volunteer drivers, and neighborhood community refrigerators/freezers equipped with live IoT telemetry to eliminate food waste and fight hunger.

---

## 🌟 Key Features

- **🎨 3D WebGL Multi-Scene Hero & Ambient Background (Three.js)**:
  - Full-page floating fruits & vegetables particle background with interactive click sparkle bursts.
  - 4 Switchable 3D interactive hero scenes (*"Don't Waste Food"* interactive plate, *Global Zero-Waste Eco Planet*, *IoT Community Chiller*, and *Volunteer Dispatch Van*).
- **🗺️ Live Surplus Food Map (Leaflet.js)**:
  - Dynamic map markers with GPS proximity calculation, sorting listings by distance.
  - Real-time countdown urgency badges and Web Speech API voice read-aloud assistance.
- **📦 QR Code Food Safety Passport (QRCode.js)**:
  - Instant scannable digital safety passport generated upon surplus food donation.
- **❄️ Smart Community Refrigerators & Deep Freezers**:
  - Live IoT telemetry monitoring: chiller & freezer temperature sensors, load capacity %, door lock state, and automated Telegram alert dispatch simulation.
- **🚚 Volunteer Multi-Stop Route Optimizer**:
  - Batch waypoint compiler linking donor pickups with community chillers mapped into Google Maps navigation.
- **🔬 Smart AI Food Shelf-Life & Safety Estimator**:
  - Real-time bacterial danger zone calculations and safety quality grading (Grade A+, B, F).
- **📊 Environmental & Social Impact Dashboard**:
  - Live calculation of total food rescued, meals provided, CO₂e emissions mitigated, and water footprint conserved.
- **🌐 Bilingual i18n Engine**:
  - Seamless English (EN) and Telugu (TE) localization.
- **⚙️ Operations Admin Portal**:
  - Full donation status management, add new chiller/freezer hub, and CSV audit data export.

---

## 🚀 Quick Start

1. Clone or download this repository:
   ```bash
   git clone https://github.com/madhurathod210-art/food-westage.git
   ```
2. Open `index.html` directly in any modern web browser (Chrome, Edge, Firefox, Safari).
3. No build step or backend server required — 100% vanilla HTML5, CSS3, JavaScript, Three.js, and Leaflet.js with browser `localStorage` persistence.

---

## 📁 Project Structure

```
├── index.html              # Main Single Page Application (SPA)
├── assets/                 # Brand logos and visual assets
├── css/
│   └── style.css           # Glassmorphism, animations, and responsive layout
├── js/
│   ├── app.js              # Application logic, router, state, and event engine
│   └── hero-3d.js          # Three.js 3D WebGL scenes and ambient particle engine
└── README.md               # Project documentation
```

---

## 📜 License
MIT License. Free to use and distribute for community mutual aid and food rescue initiatives.
