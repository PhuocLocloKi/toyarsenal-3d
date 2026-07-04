# ToyArsenal 3D 🔫

<p align="center">
  <!-- Animated SVG Banner using native SMIL animations (100% safe for Markdown/GitHub/VSCode) -->
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300" width="100%" style="background:#06080c; border-radius:16px; border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 20px 50px rgba(0,0,0,0.8);">
    <defs>
      <linearGradient id="cyberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#00f2fe" />
        <stop offset="50%" stop-color="#6f2cfc" />
        <stop offset="100%" stop-color="#ff0055" />
      </linearGradient>
      <linearGradient id="gridGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(111, 44, 252, 0.05)" />
        <stop offset="100%" stop-color="rgba(0, 242, 254, 0.02)" />
      </linearGradient>
      <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <!-- Blueprint Grid -->
    <rect width="100%" height="100%" fill="url(#gridGrad)" />
    <g stroke="rgba(255, 255, 255, 0.02)" stroke-width="1">
      <path d="M 0,25 L 800,25 M 0,50 L 800,50 M 0,75 L 800,75 M 0,100 L 800,100 M 0,125 L 800,125 M 0,150 L 800,150 M 0,175 L 800,175 M 0,200 L 800,200 M 0,225 L 800,225 M 0,250 L 800,250 M 0,275 L 800,275" />
      <path d="M 50,0 L 50,300 M 100,0 L 100,300 M 150,0 L 150,300 M 200,0 L 200,300 M 250,0 L 250,300 M 300,0 L 300,300 M 350,0 L 350,300 M 400,0 L 400,300 M 450,0 L 450,300 M 500,0 L 500,300 M 550,0 L 550,300 M 600,0 L 600,300 M 650,0 L 650,300 M 700,0 L 700,300 M 750,0 L 750,300" />
    </g>

    <!-- Radar Sweep Ring (Left side) -->
    <circle cx="150" cy="150" r="100" fill="none" stroke="rgba(0, 242, 254, 0.08)" stroke-width="1" />
    <circle cx="150" cy="150" r="70" fill="none" stroke="rgba(0, 242, 254, 0.05)" stroke-width="1" />
    <circle cx="150" cy="150" r="40" fill="none" stroke="rgba(111, 44, 252, 0.05)" stroke-width="1" />
    <line x1="150" y1="30" x2="150" y2="270" stroke="rgba(255, 255, 255, 0.03)" stroke-width="1" />
    <line x1="30" y1="150" x2="270" y2="150" stroke="rgba(255, 255, 255, 0.03)" stroke-width="1" />

    <!-- Interactive Gun Blueprint Wireframe (Center) with SMIL Opacity Pulse -->
    <g fill="none" stroke="url(#cyberGrad)" stroke-width="1.5" filter="url(#neonGlow)">
      <animate attributeName="opacity" values="0.3;0.85;0.3" dur="3s" repeatCount="indefinite" />
      <!-- Barrel -->
      <rect x="260" y="135" width="220" height="25" rx="3" />
      <line x1="300" y1="135" x2="300" y2="160" />
      <line x1="340" y1="135" x2="340" y2="160" />
      <line x1="380" y1="135" x2="380" y2="160" />
      <!-- Coil Ring Accents -->
      <rect x="280" y="130" width="10" height="35" rx="2" fill="rgba(111, 44, 252, 0.1)" />
      <rect x="320" y="130" width="10" height="35" rx="2" fill="rgba(111, 44, 252, 0.1)" />
      <rect x="360" y="130" width="10" height="35" rx="2" fill="rgba(111, 44, 252, 0.1)" />
      <!-- Body & Scope -->
      <rect x="440" y="115" width="100" height="45" rx="5" />
      <rect x="460" y="95" width="60" height="20" rx="2" />
      <line x1="490" y1="95" x2="490" y2="115" />
      <!-- Stock & Grip -->
      <path d="M 520,160 L 550,220 L 520,230 L 490,160 Z" />
      <path d="M 440,160 L 450,195 L 430,200 L 420,160 Z" />
      <!-- Trigger loop -->
      <path d="M 450,160 Q 470,180 480,160" />
    </g>

    <!-- High-Tech HUD Interface rings (Right side) with SMIL Rotation -->
    <g stroke="#00f2fe" fill="none" stroke-width="1.5">
      <circle cx="650" cy="150" r="85" stroke-dasharray="10 15 50 10" opacity="0.6">
        <animateTransform attributeName="transform" type="rotate" from="0 650 150" to="360 650 150" dur="22s" repeatCount="indefinite" />
      </circle>
      <circle cx="650" cy="150" r="70" stroke-dasharray="30 10 10 30" opacity="0.5" stroke="#ff0055">
        <animateTransform attributeName="transform" type="rotate" from="360 650 150" to="0 650 150" dur="14s" repeatCount="indefinite" />
      </circle>
      <circle cx="650" cy="150" r="50" stroke-dasharray="5 5 15 5" opacity="0.3">
        <animateTransform attributeName="transform" type="rotate" from="0 650 150" to="360 650 150" dur="8s" repeatCount="indefinite" />
      </circle>
      <circle cx="650" cy="150" r="5" fill="#00f2fe" stroke="none" />
    </g>

    <!-- Telemetry Readout Text -->
    <text x="35" y="50" fill="#00f2fe" font-family="'Space Grotesk', Courier, monospace" font-size="12" opacity="0.8" letter-spacing="1">SYS: ONLINE</text>
    <text x="35" y="70" fill="#ff0055" font-family="'Space Grotesk', Courier, monospace" font-size="12" opacity="0.8" letter-spacing="1">WEAPONS: LCK_ON</text>
    <text x="35" y="90" fill="rgba(255,255,255,0.4)" font-family="'Space Grotesk', Courier, monospace" font-size="10">FPS: 60.00 / MS: 16.6</text>

    <!-- Main Glitch Heading with SMIL Opacity Pulse -->
    <text x="400" y="70" fill="#ffffff" font-family="'Space Grotesk', sans-serif" font-size="34" font-weight="900" text-anchor="middle" letter-spacing="6" filter="url(#neonGlow)">
      TOY ARSENAL 3D
      <animate attributeName="opacity" values="0.8;1;0.5;1;0.9" dur="3s" repeatCount="indefinite" />
    </text>

    <!-- Laser Scanning line effect using SMIL Animation -->
    <line x1="0" y1="20" x2="800" y2="20" stroke="rgba(0, 242, 254, 0.4)" stroke-width="2" filter="url(#neonGlow)">
      <animate attributeName="y1" values="20;280;20" dur="4s" repeatCount="indefinite" />
      <animate attributeName="y2" values="20;280;20" dur="4s" repeatCount="indefinite" />
    </line>
  </svg>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/ModelViewer-00B2FF?style=for-the-badge&logo=google&logoColor=white" alt="ModelViewer" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License MIT" />
</p>

---

## 🌌 Project Overview

**ToyArsenal 3D** is an interactive, premium web-based 3D weapon showcase designed for low-poly tactical toy designs. Featuring a high-tech **Gaming HUD** interface and a **Battlefield Mode** canvas environment, this application delivers a highly engaging, ambient, and modern 3D model viewing experience directly in your browser.

---

## ✨ Key Features

### 🔫 1. Fully Interactive 3D Model Viewer
- Uses Google's `<model-viewer>` library for smooth, low-latency 3D GLB model rendering.
- Supports **360-degree rotation** and interactive **camera zoom controls** with wide boundaries to prevent model clipping.

### ⚡ 2. Muzzle Flash & Shell Casing Ejection System
- Automatically fires glowing **laser energy projectiles** from the barrel muzzle.
- Simulates realistic **casing ejection** with golden bullet shells spinning and dropping from the chamber.
- Triggers a pulsing **Muzzle Flash Flare** at the tip of the barrel with every shot.
- Emits an expanding concentric **Energy Shockwave** from the core of the gun every 3 shots.

### 🎯 3. High-Tech Tactical HUD Overlay
- A holographic **Laser Scan Line** sweeping vertically down the weapon chassis.
- A floating **Targeting Reticle (Crosshair)** that scales and rotates dynamically around the gun.
- Floating glowing tech telemetry stats labels (`SYS: LCK_ON` & `PWR: 100%`).

### 🌀 4. Ambient Battlefield Canvas Environment
- The page carousel is completely transparent to overlay a **dynamic HTML5 Canvas particle system**:
  - Mysterious rising fog and smoke clouds.
  - Floating glowing fire embers and sparks drifting upwards.
  - Quick flying sniper bullet tracers x-crossing the backdrop.
  - Adaptive ambient backlight glows matching the active slide's LED color.

### 🗂️ 5. Futuristic Selection Menu (Models Modal)
- An animated overlay modal featuring a color-shifting **pulsing energy border-glow aura** (`modalEnergyPulse`).
- Individual gun grid cards styled with moving LED light borders, glow shadows, and a reflective **glass sweep shine animation** on hover.

---

## 🛠️ Technology Stack

- **HTML5 & CSS3:** For page structure, glassmorphic HUD frames, grid layouts, and advanced keyframe animations.
- **JavaScript (ES6):** Handles slide translations, particle loop physics (embers, smoke, tracers), firing calculations, and adaptative color controls.
- **Google Model Viewer:** Direct rendering and lighting calculations of 3D GLB/GLTF assets.

---

## 🚀 Setup & Local Execution

### 1. Clone the repository:
```bash
git clone https://github.com/PhuocLocLoKi/toyarsenal-3d.git
cd toyarsenal-3d