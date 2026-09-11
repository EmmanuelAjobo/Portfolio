# Portfolio

A personal developer portfolio built to showcase my projects and technical skills, with a fully custom theming system and smooth animated interactions.

🔗 **Live Demo:** [portfolio-ten-gilt-26.vercel.app](https://portfolio-ten-gilt-26.vercel.app/)

---

## ✨ Features

- **Dual-theme system** — light/dark mode and accent color are handled independently, so any accent color can be paired with either light or dark mode
- **Smooth animations** powered by GSAP, with proper cleanup to avoid memory leaks
- **Persistent theme preferences** via `localStorage`
- **Fully responsive** design across desktop, tablet, and mobile
- **Hydration-safe rendering** for theme-dependent content

## 🛠️ Tech Stack

| Category         | Tech                                                                             |
| ---------------- | -------------------------------------------------------------------------------- |
| Framework        | [Next.js 15](https://nextjs.org/)                                                |
| Styling          | [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) |
| Animation        | [GSAP](https://gsap.com/)                                                        |
| Theme Management | `next-themes` (light/dark), custom `ColorThemeProvider` (accent color)           |
| Deployment       | [Vercel](https://vercel.com/)                                                    |

## 📸 Screenshots

| Light Mode                                                                                                                                    | Dark Mode                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [![Light mode screenshot](https://github.com/EmmanuelAjobo/Portfolio/raw/main/screenshots/light.png)](/EmmanuelAjobo/Portfolio/blob/main/screenshots/light.png) | [![Dark mode screenshot](https://github.com/EmmanuelAjobo/Portfolio/raw/main/screenshots/dark.png)](/EmmanuelAjobo/Portfolio/blob/main/screenshots/dark.png) |

## 🚀 Getting Started

Clone the repository and install dependencies:

```
git clone https://github.com/EmmanuelAjobo/Portfolio.git
cd Portfolio
npm install
```

Run the development server:

```
npm run dev
```

Open <http://localhost:3000> in your browser to view it.

## 📦 Deployment

This project is deployed on **Vercel** with continuous deployment enabled — every push to `main` automatically triggers a new production build.

To deploy your own version:

1. Fork this repo to your own GitHub account
2. Import it into [Vercel](https://vercel.com/)
3. Vercel will auto-detect the Next.js framework and deploy it — no extra configuration needed

## 📁 Project Structure

```
├── app/                # Next.js app router pages and layouts
├── components/         # Reusable UI components
├── lib/                # Utilities and helper functions
├── public/             # Static assets
└── tools/              # Project tooling/scripts
```

## 🙋 Feedback

If you take a look and have feedback — on the UI, performance, animations, or anything else — I'd love to hear it. Feel free to open an issue or reach out directly.

## 📬 Contact

- **LinkedIn:** [linkedin.com/in/emmanuel-ajobo](https://www.linkedin.com/in/emmanuel-ajobo/)
- **Email:** [ajoboemmanuel04@gmail.com](mailto:ajoboemmanuel04@gmail.com)
- **Portfolio:** [portfolio-ten-gilt-26.vercel.app](https://portfolio-ten-gilt-26.vercel.app/)

---

⭐ If you found this useful or interesting, consider giving it a star!
