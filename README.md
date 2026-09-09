# Portfolio

A personal developer portfolio built to showcase my projects and technical skills, with a fully custom theming system and smooth animated interactions.

🔗 **Live Demo:** [your-live-url-here](https://your-live-url-here.vercel.app)

---

## ✨ Features

- **Dual-theme system** — light/dark mode and accent color are handled independently, so any accent color can be paired with either light or dark mode
- **Smooth animations** powered by GSAP, with proper cleanup to avoid memory leaks
- **Persistent theme preferences** via `localStorage`
- **Fully responsive** design across desktop, tablet, and mobile
- **Hydration-safe rendering** for theme-dependent content

## 🛠️ Tech Stack

| Category | Tech |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) |
| Animation | [GSAP](https://gsap.com/) |
| Theme Management | `next-themes` (light/dark), custom `ColorThemeProvider` (accent color) |
| Deployment | [Vercel](https://vercel.com/) |

## 📸 Screenshots

<!-- Add screenshots or a GIF walkthrough here -->
| Light Mode | Dark Mode |
|---|---|
| ![Light mode screenshot](./screenshots/light.png) | ![Dark mode screenshot](./screenshots/dark.png) |

## 🚀 Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view it.

## 📦 Deployment

This project is deployed on **Vercel** with continuous deployment enabled — every push to `main` automatically triggers a new production build.

To deploy your own version:

1. Push this repo to your own GitHub account
2. Import it into [Vercel](https://portfolio-ten-gilt-26.vercel.app/)
3. Vercel will auto-detect the Next.js framework and deploy it — no extra configuration needed

## 📁 Project Structure

```
├── app/                # Next.js app router pages and layouts
├── components/         # Reusable UI components
├── lib/                 # Utilities and helper functions
├── providers/           # Theme and context providers
├── public/              # Static assets
└── styles/              # Global styles (Tailwind v4 config)
```

## 🙋 Feedback

If you take a look and have feedback — on the UI, performance, animations, or anything else — I'd love to hear it. Feel free to open an issue or reach out directly.

## 📬 Contact

- **LinkedIn:** [https://www.linkedin.com/in/emmanuel-ajobo/]
- **Email:** [ajoboemmanuel04@gmail.com]
- **Portfolio:** [your-live-url-here](https://portfolio-ten-gilt-26.vercel.app/)

---

⭐ If you found this useful or interesting, consider giving it a star!
