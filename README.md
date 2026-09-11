# red or green — iOS-Inspired Behavioral Assessment Platform

A sleek, minimalist web platform designed in Apple/iOS aesthetic (clean white and gray palette, SF Pro typography, frosted glass, and tactile micro-interactions). It features an innovative 20-question psychological and social assessment calculating Green Flag vs. Red Flag percentages, an inspiring tribute to Maryam Mirzakhani, and a modular architecture ready for additional tests.

---

## 🚀 Live Deployment on Vercel

This project is 100% static and zero-dependency, optimized for instant, free deployment on Vercel.

### Method 1: Using the Vercel CLI (Fastest)

1. Open your terminal in this directory:
   ```bash
   cd /Users/niknam/.gemini/antigravity/scratch/personal-portfolio
   ```
2. Run:
   ```bash
   npx vercel
   ```
3. Follow the quick prompts (accept defaults). Vercel will immediately output your live URL (e.g. `https://red-or-green.vercel.app`)!

---

### Method 2: Via GitHub & Vercel Dashboard (Recommended for Continuous Updates)

1. Initialize a git repository and push your project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial red or green iOS assessment platform"
   # Create a repo on GitHub, then link and push:
   git remote add origin https://github.com/YOUR_USERNAME/red-or-green.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New Project"** and select your `red-or-green` repository.
4. Keep the default settings (Framework Preset: *Other*) and click **Deploy**.
5. Every time you push updates to GitHub, Vercel will automatically re-deploy your site in seconds!

---

## 💻 Local Testing & Preview

To preview the website locally on your machine:

```bash
# Option A: using python's built-in server
python3 -m http.server 3000

# Option B: using npx serve
npx serve . -l 3000
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎨 Design & Features

- **Apple / iOS SF Pro Typography & Minimalism**: Pure white (`#FFFFFF`) and Apple system gray (`#F5F5F7`, `#FBFBFD`) color palette with Apple System Red (`#FF3B30`) and System Green (`#34C759`).
- **Maryam Mirzakhani Tribute Card**: Elegant quote widget celebrating Maryam Mirzakhani's patient problem-solving philosophy.
- **Modular Test Architecture**: The homepage acts as a clean portal. The 20-question test opens smoothly on click, leaving room to add future tests (e.g. Social Battery, Conflict Styles).
- **20 Calibrated Behavioral Questions**: Multi-layered real-world social scenarios covering:
  - Accountability & Ownership
  - Empathy & Generosity
  - Boundaries & Communication
  - Integrity & Social Ethics
- **Dynamic Dual Ring Gauge & Archetypes**: Instant percentage calculation and personalized behavioral profile.
- **Haptic & Audio Feedback**: Lightweight synthesized iOS click sounds using the Web Audio API (zero external sound files needed).
- **Keyboard Shortcuts**: Select choices using keys `1`, `2`, `3`, `4` or `A`, `B`, `C`, `D`, and navigate with Arrow keys.

---

## 🛠 Project Structure

```
personal-portfolio/
├── index.html        # Main semantic markup (Home, Test Runner, Results Views)
├── style.css         # Apple SF Pro styling, glassmorphism, animations
├── script.js         # 20 questions, score calculation engine, archetype logic
├── vercel.json       # Vercel security headers and clean routing configuration
├── package.json      # Scripts and project metadata
└── README.md         # Documentation & deployment guide
```
