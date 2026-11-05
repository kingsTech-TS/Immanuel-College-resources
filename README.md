<p align="center">
  <img src="src/app/icon.png" alt="Immanuel College of Theology seal" width="110" />
</p>

<h1 align="center">Immanuel College of Theology — Library E-Resources</h1>

<p align="center">
  A searchable directory of the academic databases, journals and digital libraries<br />
  available to students and staff of Immanuel College of Theology, Ibadan.
</p>

<p align="center">
  <a href="https://www.immanuelcollege.edu.ng/">College Website</a>
</p>

---

## Features

- **Database directory:** 33 e-resources (JSTOR, EBSCO, ScienceDirect, DOAJ, HINARI and more), each with a description, key features, subject areas and quick stats.
- **Search:** filters by database name, description or subject as you type.
- **Programme filter:** one-tap chips for Accounting, Sharia Law, Nutrition, Cybersecurity and other programmes.
- **On-site access page:** `/restricted` explains resources that only open from inside the Library, with contact details and a map link.
- **Responsive:** one, two or three columns depending on screen width.

## Tech Stack

| Tool                                          | Purpose                         |
| --------------------------------------------- | ------------------------------- |
| [Next.js 15](https://nextjs.org) (App Router) | Framework and routing           |
| [React 19](https://react.dev)                 | UI                              |
| [Tailwind CSS 4](https://tailwindcss.com)     | Styling and brand colour tokens |
| [Framer Motion](https://motion.dev)           | Animations                      |
| [Lucide](https://lucide.dev)                  | Icons                           |
| TypeScript                                    | Type checking                   |

## Getting Started

**Requirements:** Node.js 18.18 or newer.

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Available Scripts

| Command         | Description                                  |
| --------------- | -------------------------------------------- |
| `npm run dev`   | Start the development server with hot reload |
| `npm run build` | Create a production build                    |
| `npm run start` | Serve the production build                   |
| `npm run lint`  | Run the linter                               |

> **Note:** stop `npm run dev` before running `npm run build`. Both write to the `.next` folder, and running them together breaks the dev server (pages load without styles or scripts). If that happens, delete `.next` and restart the dev server.

## Project Structure

```text
├── public/
│   ├── hero/hero.jpg          # Hero background photo
│   ├── logo/logo.png          # Header and footer logo (white text, for dark backgrounds)
│   └── *.png                  # Database logos
├── src/
│   ├── app/
│   │   ├── e-resources/       # Main directory page and database list
│   │   ├── restricted/        # "Visit the Library" page
│   │   ├── globals.css        # Brand colours and global styles
│   │   ├── layout.tsx         # Site title, description and fonts
│   │   ├── page.tsx           # Home route (renders the directory)
│   │   ├── favicon.ico        # Browser tab icon
│   │   ├── icon.png           # High-resolution icon
│   │   └── apple-icon.png     # iOS home-screen icon
│   └── components/            # Footer, scroll-to-top button, UI primitives
└── lib/utils.ts               # Class name helper
```

## Adding or Editing a Database

All databases live in the `databases` array at the top of [`src/app/e-resources/page.tsx`](src/app/e-resources/page.tsx).

1. Put the database's logo in `public/`, for example `public/newdb.png`.
2. Add an entry to the array:

   ```ts
   {
     id: 35,
     name: "New Database",
     category: "Accounting, Marketing",   // programmes this database appears under
     description: "One or two sentences about the database.",
     features: ["Full-text articles", "Open access"],
     subjects: ["Economics", "Business"],
     logo: "newdb.png",                    // file name inside public/
     url: "https://example.com",
     color: "",                            // not used by the current design
     stats: { articles: "1M+", journals: "500+", books: "10k+" }, // exactly three
   },
   ```

3. To send users to the on-site access page instead of an external site, set `url: "/restricted"`.

A database shows up under a programme filter when the programme name appears in its `category` or `subjects`. To add a new filter chip, add the programme name to the `categories` array in the same file.

## Brand Colours

The colours are defined once in [`src/app/globals.css`](src/app/globals.css) under `@theme` and used as Tailwind classes such as `bg-navy`, `text-gold` and `bg-surface`.

| Colour         | Hex       | Role                                    | Tailwind class                   |
| -------------- | --------- | --------------------------------------- | -------------------------------- |
| Deep Navy Blue | `#142B50` | Primary: header, hero, buttons, text    | `navy` (`navy-50` to `navy-950`) |
| Gold           | `#C49A45` | Accent: highlights, icons, hover states | `gold` (`gold-50` to `gold-900`) |
| White          | `#FFFFFF` | Background: cards and panels            | `white`                          |
| Light Grey     | `#F3F4F6` | Section backgrounds                     | `surface`                        |

For small gold text on white, use `text-gold-700`; the base gold is too light to read at small sizes.

## Deployment

The site builds to static pages, so it can be hosted on [Vercel](https://vercel.com/new) or any host that supports Next.js:

```bash
npm run build
npm run start
```

---

<p align="center">
  © Immanuel College of Theology, Ibadan · Library E-Resources
</p>
