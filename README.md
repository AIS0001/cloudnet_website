# CloudNet Softwares - Official Website

A modern, responsive website built with React, Vite, and Tailwind CSS showcasing CloudNet Softwares' services and portfolio.

## Features

- 🎨 Modern UI with orange and white color scheme
- 📱 Fully responsive design
- 🎭 Creative full-screen hero slider
- 🚀 Fast performance with Vite
- 💅 Styled with Tailwind CSS
- 🧭 Multi-page navigation with React Router
- ✨ Smooth animations and transitions
- 📧 Contact form with validation

## Pages

- **Home**: Hero slider, about section, services overview, and CTA
- **About**: Company story, mission, vision, values, and team
- **Services**: Comprehensive list of all services offered
- **Portfolio**: Project showcase with filtering options
- **Contact**: Contact form, location map, and FAQ section

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- React Router DOM 6
- Lucide React (icons)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and visit `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
cloudnet-website/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── HeroSlider.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Portfolio.jsx
│   │   └── Contact.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Customization

### Colors

The color scheme can be customized in `tailwind.config.js`:
- Primary color: Orange (#f97316)
- Secondary color: Green (#10b981)

### Content

Update the content in the respective page files under `src/pages/`

## License

© 2026 CloudNet Softwares. All rights reserved.
