# Project notes for Claude

## Golden rule (read this first)

- The USER actively edits this codebase. Their changes are the source of truth.
- ALWAYS `Read` the current file immediately before editing it, and build on top of
  what is there. Never revert, remove, or "regenerate" the user's work.

## Known environment caveat (important)

- The repo lives in a OneDrive-synced folder. Writes through the editing tools have
  occasionally been mangled by an external save/sync watcher: long lines get truncated,
  or a file comes back padded with NUL bytes / re-encoded.
- After any write, verify: check NUL count (`tr -cd '\000' < file | wc -c` should be 0)
  and run `npx vue-tsc --build`.
- Prefer small targeted edits. If a file must be rewritten, do it via the shell heredoc
  and re-verify — but only as a last resort, and never if it would drop user edits.

## Stack

- Vue 3 (`<script setup lang="ts">`) + Vite + Tailwind CSS v4 + vue-router + vue-i18n + Pinia.
- Swiper (`swiper/vue`) for sliders. Spinner: `src/components/icons/Spinner.vue`.
- i18n: locale JSON loaded at runtime from `public/locales/{en,ru}.json`
  (NOT bundled). Keep these valid JSON; they have long strings — easy to corrupt.
- `.container` (in `src/assets/main.css`): max-width 1382px, 60px padding (35px <=768px).
- Breakpoints used on About: base = mobile, `md` (768) = tablet, `lg` (1024) = desktop.
- Verify builds with `npx vue-tsc --build` (the full `vite build` fails in the Linux
  sandbox because node_modules holds Windows binaries — that's expected, not a code bug).

## About page (the focus of recent work)

`src/views/AboutView.vue` composes:

- Hero (title `about.title`, desc `about.desc`) — left-aligned on mobile, centered md+.
- `AboutFounders.vue` — founders are a Swiper slider on ALL breakpoints
  (1 card + peek on mobile, 2 on tablet, 3 on desktop), full-bleed (section
  `overflow-x-clip`, swiper `overflow-visible!`). Uses `AboutFounderCard.vue`.
- `AboutFounderCard.vue` — photo front; dark bio panel fades in on the `+` button click;
  plus icon rotates 45deg on hover. Images: marat.png, dima.png + founder-placeholder.svg.
- White section: `AboutAdvantages.vue` (3-col grid md+, Swiper slider on mobile) and
  `AboutPartners.vue` (static logo row md+, centered Swiper starting from middle logo on
  mobile). Logos: `public/images/partners/*.svg`.
- `AboutEvents.vue` — accordion of past/featured events:
  - Data: `src/data/events.json` (id, date, image, thumbnails, tag ids).
  - Translations: i18n `about.events.<id>` (title, location, description with \n\n),
    `about.eventTags.<id>`, `about.eventsTitle/eventsBtn/eventsBtnLess/partnersCaption/...`.
  - Row turns black on hover and while open; arrow points down, flips up when open.
  - Expanded panel: description + tag chips, main image + thumbnail strip.
  - Thumbnails are clickable to swap the main image (active = full opacity, others 60%,
    hover = full). Thumbnails are flex-1 on mobile, fixed 70px md+.
  - Mobile row header stacks date above title with arrow centered right; inline md+.
  - "Show all events" button: shows a Spinner ~1s then reveals all events and disappears
    (matches the home page `SingersArchive.vue` load-more pattern).
- Header bg: `TheHeader.vue` uses `isAboutPage = computed(() => route.path === '/about')`
  to swap bg to `#f8f8f5` on the About route.

## Still TODO (per user's plan)

- Animations pass (scroll/entrance animations) is the final phase, to be done last.
