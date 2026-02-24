# Phase-E TCG

Marketplace for authentic Japanese Pokémon cards. Built with React + Vite + TailwindCSS + TinaCMS.

---

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

---

## Adding / Editing Cards

### Option A — TinaCMS Visual Editor (Recommended)

1. Run the dev server and TinaCMS together:
   ```bash
   npx tinacms dev -c "npm run dev"
   ```
2. Open http://localhost:3000/admin
3. Click **Cards → New Card** to add a listing, or click an existing card to edit it
4. Fill in the form, upload an image, and save — the card appears on the site instantly

### Option B — Edit directly in code

Open `src/data/products.ts` and add a new object to the array.
Each card field is documented with comments at the top of that file.

**To mark a card as sold:** set `"sold": true` in its entry. It moves from the Shop to the Sold Archive automatically.

---

## Deployment (Vercel)

1. Push this repo to GitHub
2. Import the repo at vercel.com
3. Add environment variables in the Vercel dashboard:
   ```
   TINA_CLIENT_ID=...
   TINA_TOKEN=...
   ```
4. Deploy — `vercel.json` handles SPA routing automatically

---

## TinaCMS Cloud Setup

1. Go to [app.tina.io](https://app.tina.io) and connect your GitHub repo
2. Copy the **Client ID** and **Token**
3. Add them to Vercel environment variables (see above)
4. Your friend can log in at `https://your-site.vercel.app/admin` to manage cards

---

## Project Structure

```
src/
  components/
    layout/        Header, Footer
    shop/          ProductCard
    ui/            Shadcn components (only used ones)
  context/         CartContext
  data/            products.ts  ← edit this to add cards
  pages/           Index, Shop, ProductDetail, About, Contact, FAQ, Shipping, SoldArchive
  types/           product.ts

content/
  cards/           JSON files (one per card, managed by TinaCMS)
  settings/        site.json  (site name, tagline, contact info)

tina/
  config.ts        TinaCMS schema definition

public/
  og-image.png     Social share preview image
  favicon.ico
```

---

## Social Sharing

The OG image at `/public/og-image.png` is what shows when someone shares the site link on Instagram, Facebook, iMessage, etc.

To replace it with a custom image: swap out `public/og-image.png` with your own 1200×630px PNG.
