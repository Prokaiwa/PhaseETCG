# Phase-E TCG 🎴

> Authentic Japanese Pokémon Cards — Direct From Japan.

A professional e-commerce site for selling Japanese Pokémon cards. Built with React, TinaCMS, PayPal cart integration, and eBay listing links. Deployed on Vercel with automatic updates via GitHub.

---

## Table of Contents

- [Quick Start](#quick-start)
- [How the Site Works](#how-the-site-works)
- [File Structure](#file-structure)
- [Managing Your Store with TinaCMS](#managing-your-store-with-tinacms)
- [Making Code Changes](#making-code-changes)
- [Taking Over Ownership](#taking-over-ownership)
- [Future Improvements](#future-improvements)
- [Using Claude AI for Help](#using-claude-ai-for-help)

---

## Quick Start

### Running the site locally

```bash
# Install dependencies (first time only)
npm install

# Run with TinaCMS admin panel enabled
npx tinacms dev -c "npm run dev"

# Site: http://localhost:5173
# Admin: http://localhost:5173/admin/index.html
```

### Deploying changes

Any time you push to GitHub, Vercel automatically rebuilds and redeploys the site. No manual deploy steps needed.

```bash
git add .
git commit -m "describe what you changed"
git push
```

---

## How the Site Works

### The big picture

```
Your Card Photos & Info
        ↓
   TinaCMS Admin         ← your friend edits cards here
        ↓
  GitHub Repository      ← stores all content as JSON files
        ↓
  Vercel (auto-deploy)   ← rebuilds site on every push
        ↓
    Live Website         ← customers browse and buy
```

### Checkout flow

- **PayPal cards** — customer clicks "Add to Cart" → items collect in the site cart → clicks "Checkout with PayPal" → sent to PayPal with all items pre-filled
- **eBay cards** — customer clicks "Buy on eBay" → goes directly to your eBay listing
- **Both** — you can enable both options on the same card

### Content flow

When you edit a card in TinaCMS and click Save:
1. TinaCMS commits the change to GitHub
2. Vercel detects the new commit and rebuilds the site
3. Live site updates within ~2 minutes

---

## File Structure

```
phase-e-tcg/
│
├── content/                    ← ALL your card data lives here
│   ├── cards/                  ← one JSON file per card
│   │   ├── charizard-vstar.json
│   │   └── ...
│   └── settings/
│       └── site.json           ← PayPal email, contact info, Instagram
│
├── public/
│   ├── uploads/                ← card photos go here (via TinaCMS media)
│   ├── favicon.ico             ← browser tab icon
│   └── og-image.png            ← social share preview image
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx      ← navigation + cart icon
│   │   │   └── Footer.tsx      ← footer links + Instagram
│   │   ├── shop/
│   │   │   └── ProductCard.tsx ← individual card tile in the grid
│   │   └── ui/                 ← buttons, badges, inputs etc.
│   │
│   ├── pages/
│   │   ├── Index.tsx           ← homepage
│   │   ├── Shop.tsx            ← shop with filters
│   │   ├── ProductDetail.tsx   ← individual card page
│   │   ├── About.tsx           ← about page
│   │   ├── Contact.tsx         ← contact form
│   │   ├── FAQ.tsx             ← FAQ page
│   │   ├── Shipping.tsx        ← shipping & returns page
│   │   ├── SoldArchive.tsx     ← sold cards archive
│   │   └── NotFound.tsx        ← 404 page
│   │
│   ├── config/
│   │   └── site.ts             ← reads PayPal email from site.json
│   │
│   ├── context/
│   │   └── CartContext.tsx     ← manages the shopping cart state
│   │
│   ├── data/
│   │   └── products.ts         ← loads all card JSON files automatically
│   │
│   └── types/
│       └── product.ts          ← defines what fields a card has
│
├── tina/
│   └── config.ts               ← TinaCMS schema (card fields, settings)
│
├── package.json                ← project dependencies and build commands
├── vercel.json                 ← Vercel routing config
└── .env.example                ← template for environment variables
```

### Key files explained

| File | What it does | When to edit it |
|------|-------------|-----------------|
| `content/cards/*.json` | Card listings | Use TinaCMS instead |
| `content/settings/site.json` | PayPal email, contact, Instagram | Use TinaCMS Site Settings |
| `src/index.css` | All colours, fonts, spacing | Changing the look/feel |
| `tina/config.ts` | TinaCMS field definitions | Adding new card fields |
| `src/pages/About.tsx` | About page content | Updating your story |
| `src/pages/FAQ.tsx` | FAQ content | Adding/editing questions |
| `src/pages/Shipping.tsx` | Shipping policy | Updating shipping info |

---

## Managing Your Store with TinaCMS

TinaCMS is your store's control panel. No code needed.

### Accessing the admin

- **Live site:** `https://your-site.vercel.app/admin/index.html`
- **Local:** `http://localhost:5173/admin/index.html` (run `npx tinacms dev -c "npm run dev"` first)

### Adding a new card

1. Open the admin panel
2. Click **Cards** in the left sidebar
3. Click **Create new**
4. Fill in all the fields (title, price, condition, etc.)
5. Upload your card photo via the image field
6. Set checkout options:
   - Toggle **Enable PayPal Cart** → shows "Add to Cart" button
   - Paste an eBay URL → shows "Buy on eBay" button
   - You can enable both on the same card
7. Click **Save** — the site updates automatically within 2 minutes

### Marking a card as sold

1. Open the card in TinaCMS
2. Toggle **Sold** to ON
3. Save — the card moves to the Sold Archive automatically

### Uploading card photos

1. In the admin panel, click the **Media** icon (usually bottom left)
2. Click **Upload** and select your photo
3. When editing a card, click the image field and select your uploaded photo

**Tip:** Name your photos clearly before uploading e.g. `charizard-vstar-psa10.jpg`

### Updating site settings

1. Click **Site Settings** in the left sidebar
2. Update your **PayPal Business Email** — this is where payments go
3. Update your **Contact Email**
4. Add your **Instagram URL**
5. Save

---

## Making Code Changes

For anything beyond adding cards, you'll need to edit the code directly. Here's a practical guide.

### Prerequisites

- A code editor — [VS Code](https://code.visualstudio.com/) is free and excellent
- Node.js installed — [nodejs.org](https://nodejs.org)
- Basic terminal comfort

### Changing colours

Open `src/index.css` and find the `:root` section at the top. The main colours are:

```css
--primary: 222 72% 42%;      /* main blue */
--accent: 47 100% 51%;       /* yellow highlight */
--destructive: 11 91% 47%;   /* red (sold badges etc.) */
```

Colours use HSL format (Hue, Saturation, Lightness). Use a tool like [hslpicker.com](https://hslpicker.com) to find the values you want.

### Editing page text

Most static text (About, FAQ, Shipping, Contact) lives directly in the page files under `src/pages/`. Open the relevant file in VS Code, find the text, change it, save, and push to GitHub.

### Adding a new card field

1. Add the field to `src/types/product.ts` (TypeScript type definition)
2. Add the field to `tina/config.ts` (so it appears in TinaCMS)
3. Display it in `src/pages/ProductDetail.tsx` or `src/components/shop/ProductCard.tsx`

### Changing the logo

The "P-E" logo is text-based. To change it, search for `P-E` in `src/components/layout/Header.tsx` and `src/components/layout/Footer.tsx` and update the text. To use an actual image logo, replace the div with an `<img>` tag pointing to your logo file in `public/`.

### Environment variables

Never commit secret keys to GitHub. Store them in:
- **Local development:** `.env` file (already in `.gitignore`)
- **Production:** Vercel Dashboard → Settings → Environment Variables

Required variables:
```
TINA_CLIENT_ID=your_tina_client_id
TINA_TOKEN=your_tina_token
TINA_BRANCH=main
```

---

## Taking Over Ownership

When you're ready to fully own this site, follow these steps in order.

### Step 1 — Transfer the GitHub repository

1. Go to the current repo on GitHub
2. Settings → Danger Zone → **Transfer ownership**
3. Enter your GitHub username as the new owner
4. Confirm — the repo now lives under your account

### Step 2 — Connect Vercel to your account

1. Sign up at [vercel.com](https://vercel.com) with your GitHub account
2. Click **Add New Project** → Import the transferred repo
3. Add your environment variables (TINA_CLIENT_ID, TINA_TOKEN, TINA_BRANCH=main)
4. Deploy — your site is now under your Vercel account
5. Add your custom domain if you have one (Vercel Dashboard → Domains)

### Step 3 — Set up your own TinaCMS project

1. Go to [app.tina.io](https://app.tina.io)
2. Sign up with your GitHub account
3. Click **New Project** → connect your transferred repo
4. In Configuration → GitHub Authoring → select **Act as bot**
   - This means CMS edits show as "tinabot" in GitHub, keeping your commit history clean
5. Copy your new **Client ID** and **Token**
6. Update Vercel environment variables with your new credentials
7. Trigger a redeploy on Vercel

### Step 4 — Set up PayPal Business

1. Create or upgrade to a [PayPal Business account](https://paypal.com/business) (free)
2. Go to TinaCMS admin → Site Settings
3. Update **PayPal Business Email** with your PayPal email
4. Test a checkout to confirm payments go to your account

### Step 5 — Update contact details

In TinaCMS → Site Settings, update:
- Contact email
- Instagram URL
- Site name and tagline if desired

---

## Future Improvements

The site is fully functional but here are worthwhile upgrades to consider as your store grows:

### High priority

**Real email newsletter** — The subscribe form currently just shows a thank you message. To actually collect and use emails, look into [Mailchimp](https://mailchimp.com) or [ConvertKit](https://convertkit.com). Both have free tiers and let you send new card announcements to subscribers automatically. This is one of the best ways to build a loyal customer base.

**Shipping calculator** — Currently shipping is handled manually. As volume grows, look into integrating a shipping API like [Shippo](https://goshippo.com) or [EasyPost](https://easypost.com) to show real-time rates at checkout.

**Custom domain** — Replace the `.vercel.app` URL with your own domain like `phase-etcg.com`. Costs ~$15/year from [Namecheap](https://namecheap.com) or [Google Domains](https://domains.google). Set it up in Vercel → Project → Domains.

### Medium priority

**Google Analytics** — Add GA4 to understand where your customers come from, which cards get the most views, and how people find your site. Free, and very useful for growing the business.

**Multiple card images** — The card schema supports multiple images but the UI only shows the first one. Adding an image carousel on the product detail page would let you show front, back, and condition photos — great for building buyer confidence.

**Wishlist / notify me** — Let customers sign up to be notified when a specific card is back in stock or when a similar card is listed.

**Instagram feed** — Embed your Instagram feed on the homepage so customers can see your latest posts without leaving the site.

### Longer term

**Stripe payments** — PayPal is great to start but Stripe offers a more customisable checkout experience, lower fees, and better analytics. Worth exploring once order volume picks up.

**Search engine optimisation (SEO)** — Each card page could have richer meta descriptions and structured data (Schema.org) to help Google understand what you're selling. This helps your cards show up when people search for specific cards on Google.

**Inventory management** — As stock grows, consider a simple spreadsheet-to-site pipeline or a proper inventory system to avoid overselling.

---

## Using Claude AI for Help

This entire site was built with the help of [Claude](https://claude.ai) — an AI assistant made by Anthropic. Claude is genuinely excellent at helping with web development tasks, even if you have no coding experience.

### What Claude can help you with

**Making changes to the site:**
> *"I want to add a 'Buy it Now' price field to each card alongside the regular price. How do I do that?"*

**Fixing errors:**
> *"I'm getting this error in my terminal: [paste the error]. What does it mean and how do I fix it?"*

**Understanding the code:**
> *"Can you explain what this file does and what I'd need to change if I wanted to add a dark mode toggle?"*

**Writing content:**
> *"Can you write a compelling About page for a Japanese Pokémon card shop that ships internationally from Japan?"*

**Adding new features:**
> *"I want to add a section on the homepage that shows the 3 most recently added cards. How would I do that?"*

**Debugging TinaCMS:**
> *"My TinaCMS build is failing with this error: [paste error]. How do I fix it?"*

### Tips for getting the best results from Claude

1. **Be specific** — Instead of "fix my site", say "the Add to Cart button on mobile is overlapping the price, here's the relevant code: [paste code]"

2. **Paste the actual error** — Always paste the full error message from your terminal. Claude can diagnose most errors immediately if you give it the exact text.

3. **Give context** — Mention that your site is built with React, Vite, TailwindCSS, and TinaCMS. This helps Claude give you accurate, compatible solutions.

4. **Ask for terminal commands** — Claude can give you exact terminal commands to run rather than making you edit files manually. Just ask: *"Can you give me the terminal command to do this?"*

5. **Ask follow-up questions** — If something doesn't make sense, just ask Claude to explain it differently or more simply.

6. **Use it to learn** — Ask Claude to explain *why* something works the way it does, not just *how* to fix it. Over time you'll build real understanding of your own site.

### Getting started with Claude

Go to [claude.ai](https://claude.ai) and sign up for a free account. The free tier is very capable. For heavier usage (longer conversations, more complex projects), Claude Pro is available for a monthly fee.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [React](https://react.dev) | UI framework |
| [Vite](https://vitejs.dev) | Build tool |
| [TypeScript](https://typescriptlang.org) | Type-safe JavaScript |
| [Tailwind CSS](https://tailwindcss.com) | Styling |
| [TinaCMS](https://tina.io) | Content management |
| [React Router](https://reactrouter.com) | Page navigation |
| [Radix UI](https://radix-ui.com) | Accessible UI components |
| [Lucide](https://lucide.dev) | Icons |
| [Vercel](https://vercel.com) | Hosting & deployment |
| [GitHub](https://github.com) | Code storage & version control |
| [PayPal](https://paypal.com) | Payment processing |

---

*Built with ❤️ and Claude AI*
