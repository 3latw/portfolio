# Alaa Ziad Tawalbeh — Portfolio

React, TypeScript, Vite and Tailwind CSS. No extra UI or animation dependencies.

## Run locally

```sh
npm ci
npm run dev
```

`npm run build` runs strict TypeScript checks and creates the static site in `dist/`. `npm run preview` previews that build. The output works on any static host.

## Personal content

Edit `src/data.ts` for profile links, skills, media, CV and project records.

- The replacement video `IMG_673ppppp2.MP4` is included in `public/media/`.
- The supplied CV is available at `public/files/Alaa-Ziad-Tawalbeh-CV.pdf`; both download buttons point to it.
- The name, phone, email, GitHub and LinkedIn appear prominently in the hero. Contact details, skills and training were verified against the supplied CV.
- The LinkedIn URL uses the updated address from the CV. The previously approved professional headline is preserved.
- Phone and email links use `tel:` and `mailto:`. No contact form or backend is required.

## Completed projects

Add records to `projects` in `src/data.ts`. Only `status: 'published'` appears. Drafts are hidden. When no project is published, three Coming Soon cards appear automatically.

```ts
{
  id: 'unique-project-id',
  title: 'Your completed project',
  description: 'A factual summary.',
  category: 'Web application',
  technologies: ['Actual technologies'],
  image: '/projects/screenshot.webp', // optional
  github: 'https://github.com/3latw/your-repo', // optional
  live: 'https://your-project.example', // optional
  status: 'published',
}
```

## Hero behavior

`VideoBackground.tsx` listens to horizontal mouse deltas, with sensitivity 0.8. It clamps target time, pauses playback, and waits for `seeked` before seeking again. A slider allows keyboard and touch control. Background tab work stops; mouse control stops after scrolling beyond the hero. Reduced-motion preferences disable mouse scrubbing and typing animation while keeping intentional slider control.

The replacement video is portrait (720 × 1280, ~7 seconds). On desktop it sits on the right against a matching orange background with blended edges, keeping the person visible. Mobile uses full-screen cover with a readability overlay. The original supplied file is preserved unchanged.

`useTypewriter` follows the provided 38 ms speed and 600 ms start delay. Pills animate after 400 ms independently of typing. Mobile navigation supports Escape, focus cycling and scroll locking.

The requested Helvetica Now stylesheet URLs are loaded from `index.html`, with Helvetica Neue / Arial fallbacks when the external service is unavailable. Ensure appropriate font licensing for public production use.

## Hosting

`.openai/hosting.json` identifies the private Sites preview. Publishing elsewhere only requires the contents of `dist/`; no server or environment variables are needed.
