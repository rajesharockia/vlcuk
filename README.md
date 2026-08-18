# Vishnupuram UK

Website for **Vishnupuram UK**, a Tamil literary forum organised by the writer Jeyamohan.

> *To promote art and artists, beyond the boundaries of language.*

The site publishes weekly reading discussions, events (including LitFest London 2027), reviews of books written and translated by Tamil authors, and articles from readers. All content is bilingual — Tamil and English.

---

## Tech stack

- **[Astro](https://astro.build)** with TypeScript — static site generation, content collections
- **[Tailwind CSS](https://tailwindcss.com)** — styling
- **[Decap CMS](https://decapcms.org)** — Git-based content editor at `/admin`, no database
- **[Netlify](https://www.netlify.com)** — hosting, forms, and Identity/Git Gateway for the CMS

Content lives as Markdown in `src/content/`. Two ways to edit it — a friendly admin UI and direct Markdown pull requests — both commit to the same files. See **[CONTRIBUTING.md](./CONTRIBUTING.md)**.

---

## Local setup

Requires **Node.js 20+** and **Git**.

```bash
git clone https://github.com/<org-or-user>/vishnupuram.git
cd vishnupuram
npm install
npm run dev
```

Open the printed URL (usually **http://localhost:4321**). Check that Tamil text renders cleanly and the language toggle works.

### Editing the CMS locally (optional)

To use the `/admin` editor without deploying, uncomment `local_backend: true` in `public/admin/config.yml`, then in a second terminal:

```bash
npx decap-server
```

Visit **http://localhost:4321/admin**.

---

## Common commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the local dev server |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Preview the production build locally |

---

## Project structure

```
src/
  assets/            Logo and images (CMS uploads land in assets/images)
  content/
    discussions/     Weekly reading discussions (Markdown)
    events/          Events, incl. featured LitFest London 2027
    reviews/         Book reviews
    blog/            Articles
  layouts/           Shared page shells
  pages/             Routes (home, events, reviews, etc.)
  components/        Header, footer, language toggle, cards
public/
  admin/             Decap CMS (index.html + config.yml)
netlify.toml         Build + deploy config
```

Each collection's frontmatter uses paired language fields: `_en` (English) and `_ta` (Tamil).

---

## Deployment (Netlify)

1. Push the repo to GitHub.
2. In Netlify: **Add new site → Import from Git**, select the repo. Build settings come from `netlify.toml`.
3. Enable the CMS editor: **Site settings → Identity** → enable Identity, then enable **Git Gateway**. Set registration to *Invite only* and invite editors by email.
4. Add the custom domain **vishnupuram.uk** under **Domain settings** and follow the DNS steps.

Editors then log in at **https://vishnupuram.uk/admin**.

---

## Content editing

- **Non-technical editors:** use the admin UI at `/admin`. No code or Git knowledge needed.
- **Technical contributors:** edit Markdown in `src/content/` and open a pull request.

Full instructions, including the bilingual field convention and image guidelines, are in **[CONTRIBUTING.md](./CONTRIBUTING.md)**.

---

## Notes

- Social media links in the footer are placeholders (`#`) — replace with real Vishnupuram accounts.
- Contact form uses Netlify Forms; submissions appear in the Netlify dashboard.

## Contact

**Vishnupuramlitcircle@gmail.com**
