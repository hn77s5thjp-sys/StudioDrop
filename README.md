# getstudiodrop.com

Static marketing site for **StudioDrop** (Mac) and **StudioDrop Go** (iPhone/iPad).
No build step — plain files. Edit, commit, push, live in about 60 seconds.

## Files

| File | What it is |
|---|---|
| `index.html` | Home page — both apps, interactive backdrop picker |
| `mac.html` | StudioDrop for Mac, with a Go-vs-Mac comparison |
| `photo-guide.html` | How to photograph items — your best SEO asset |
| `background-remover-no-subscription.html` | SEO comparison piece |
| `press.html` | Press kit |
| `support.html` | Support / troubleshooting |
| `privacy.html` | Privacy policy (Apple requires this URL) |
| `404.html` | Not-found page |
| `style.css` | Shared styles — change a colour here, it changes everywhere |
| `demo-backdrop.js` | The interactive backdrop + aspect ratio picker |
| `CNAME` | Tells GitHub Pages this repo serves getstudiodrop.com |
| `sitemap.xml`, `robots.txt` | For Google |

## Things you must add

Drop these in and the pages pick them up automatically:

- `favicon.png` — 32×32 or 180×180
- `shots/guide.png`, `shots/shot-1.png`, `shots/shot-2.png`, `shots/shot-3.png`
- `shots/mac-hero.png`, `shots/mac-batch.png`
- `press/icon-studiodrop.png`, `press/icon-studiodrop-go.png` (1024×1024)
- `press/og-studiodrop.png`, `press/og-studiodrop-mac.png` (1200×630)

Missing screenshots degrade gracefully: a neutral placeholder shows instead of a
broken image icon.

**Highest-value addition:** a real before/after pair of one of your own items.
Nothing sells this app faster than a genuine "phone snap in, listing photo out".

## Full setup instructions

See `DEPLOY.md` in the parent folder.
