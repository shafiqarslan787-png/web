# Zama Zargi — Self-Hosting Guide

Ye website TanStack Start (React + Vite) par bani hai. Isko apne computer par
chalanay aur online host karnay ka tareeqa neeche hai.

## Apne computer par chalana

1. Node.js install karo (version 20 ya newer): https://nodejs.org
2. Is folder mein terminal kholo aur chalao:

   ```sh
   npm install
   npm run dev
   ```

3. Browser mein kholo: http://localhost:3000

## Online host karna (free)

**Important:** Ye website GitHub Pages par directly nahi chalegi, kyunke
GitHub Pages sirf static files serve karta hai aur ye site ek chota sa server
bhi use karti hai. In free services par easily host ho jayegi:

### Cloudflare Pages / Netlify / Vercel (recommended)

1. Is pooray folder ko apne GitHub repository mein upload karo
   (GitHub par "New repository" → "uploading an existing file" → saari files drag karo).
2. Cloudflare Pages (pages.cloudflare.com), Netlify (netlify.com) ya
   Vercel (vercel.com) par free account banao.
3. "Import from Git" → apni repository select karo.
4. Build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Deploy par click karo — 1-2 minute mein live link mil jayega.

## Saari editing ek jagah

`src/config.ts` file mein Amy ka naam, birthday letter, 24 wishes, meme captions
aur baqi text sab ek jagah hai — wahan se easily badal saktay ho.

## Folder structure

- `src/routes/` — 5 pages (index, universe, cats, twins, letter)
- `src/components/` — memes, cat wall, navigation
- `src/assets/` — saari meme images aur videos
- `src/config.ts` — editable text/content
- `public/` — favicon waghera
