# Contributing to Vishnupuram UK

Thank you for helping build the Vishnupuram UK literary forum. There are **two ways** to add or edit content, depending on how comfortable you are with code. Both end up in the same place — Markdown files in this repository — so you can mix and match.

---

## Option A — The admin editor (no code needed)

Best for editors who just want to write.

1. Go to **https://vishnupuram.uk/admin** (or the deploy preview URL).
2. Log in with your GitHub account. (Ask a maintainer to be added to the repository first.)
3. Pick a collection in the sidebar: **Weekly Discussions**, **Events**, **Book Reviews**, or **Articles**.
4. Click **New**, fill in the fields (both the Tamil and English boxes where shown), and add images by dragging them in.
5. Click **Publish**. This automatically saves your work to the repository and the site rebuilds within a minute or two.

You never touch code or Git directly — the admin does it for you.

---

## Option B — Editing Markdown directly (for contributors comfortable with Git)

Best for people who know their way around GitHub and want to review changes as pull requests.

### One-time setup

```bash
git clone https://github.com/<org-or-user>/vishnupuram.git
cd vishnupuram
npm install
npm run dev        # preview locally at http://localhost:4321
```

### Adding content

1. Create a branch: `git checkout -b review/silappatikaram`
2. Add a new `.md` file in the right folder under `src/content/`:
   - Weekly discussions → `src/content/discussions/`
   - Events → `src/content/events/`
   - Book reviews → `src/content/reviews/`
   - Articles → `src/content/blog/`
   - Videos → `src/content/videos/` (a link to a YouTube/Vimeo video, not a page of its own — shown as a card on the home page)
3. Copy an existing entry as a template — the fields at the top (the "frontmatter", between the `---` lines) are required. See the samples in each folder.
4. Preview locally with `npm run dev`.
5. Commit, push, and open a **pull request**. A maintainer will review and merge.

---

## Writing bilingual content (Tamil + English)

Every content type has paired fields — one for Tamil, one for English. Fill in **both** whenever possible.

- Fields ending in `_ta` hold **Tamil**; fields ending in `_en` hold **English**.
- Type Tamil directly in Unicode (any standard Tamil keyboard/IME). Do not use legacy TSCII/Bamini encodings.
- If a piece only exists in one language for now, fill that one and leave the other blank — the site will fall back gracefully.

---

## Images

- Put images in `src/assets/images/` (or drag them into the admin, which files them automatically).
- Use descriptive filenames: `silappatikaram-cover.jpg`, not `IMG_2831.jpg`.
- Keep book covers and event photos under ~1 MB where you can. Prefer `.webp` or `.jpg`.

---

## Style notes

- Dates use the format `YYYY-MM-DD` in frontmatter (e.g. `2027-09-18`).
- Slugs (the filename) should be lowercase with hyphens: `litfest-london-2027.md`.
- Keep one book review per file, one event per file, and so on.

---

## Questions

Open an issue on GitHub or email **Vishnupuramlitcircle@gmail.com**.

*To promote art and artists, beyond the boundaries of language.*
