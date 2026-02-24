# Phase-E TCG 🎴

> Authentic Japanese Pokémon Cards — Direct From Japan.

Welcome! This is your store's complete guide. Whether you want to add a new card, update your PayPal email, or eventually make code changes — everything you need to know is in here. Read it top to bottom once and you'll have a solid understanding of how everything works.

**You don't need to know how to code to run this store.** TinaCMS handles everything day-to-day. The code sections are here for when you're ready to go deeper.

---

## Table of Contents

- [How the Site Works](#how-the-site-works)
- [Setting Up Your Computer](#setting-up-your-computer)
- [Managing Your Store with TinaCMS](#managing-your-store-with-tinacms)
- [File Structure](#file-structure)
- [Making Code Changes](#making-code-changes)
- [Taking Over Full Ownership](#taking-over-full-ownership)
- [Future Improvements](#future-improvements)
- [Using Claude AI for Help](#using-claude-ai-for-help)

---

## How the Site Works

### The big picture

```
Your Card Photos & Info
        ↓
   TinaCMS Admin         ← you edit cards here (no code needed)
        ↓
  GitHub Repository      ← stores all your content as files
        ↓
  Vercel (auto-deploy)   ← rebuilds the site automatically
        ↓
    Live Website         ← customers browse and buy
```

Every time you save a change in TinaCMS, it automatically updates GitHub, which triggers Vercel to rebuild your site. The whole process takes about 2 minutes and happens completely on its own.

### Checkout flow

- **PayPal cards** — customer clicks "Add to Cart" → items collect in the site cart → clicks "Checkout with PayPal" → sent to PayPal with all items ready to pay
- **eBay cards** — customer clicks "Buy on eBay" → goes directly to your eBay listing
- You can enable both options on the same card

---

## Setting Up Your Computer

You'll need this if you ever want to preview the site locally or make code changes. If you just want to manage cards via TinaCMS on the live site, you can skip this section entirely.

### Step 1 — Install the tools

**Install Node.js** (the engine that runs the site):
1. Go to [nodejs.org](https://nodejs.org)
2. Download the **LTS** version
3. Open the downloaded file and follow the installer

**Install VS Code** (a free code editor — highly recommended):
1. Go to [code.visualstudio.com](https://code.visualstudio.com)
2. Download and install it

### Step 2 — Open Terminal

Terminal is a text-based way to talk to your computer. Don't be intimidated — you'll mostly be copy-pasting commands.

- **On Mac:** Press `Cmd + Space`, type `Terminal`, press Enter
- **On Windows:** Press the Windows key, type `cmd`, press Enter

### Step 3 — Navigate to the project folder

In Terminal, type this and press Enter:

```bash
cd ~/Desktop/phase-e-tcg
```

This tells Terminal to "go into" the project folder. You need to do this every time you open a new Terminal window before running any commands.

### Step 4 — Install dependencies

Run this once when you first set up the project:

```bash
npm install
```

This downloads all the code libraries the site needs. It takes a minute or two. You'll see a lot of text scroll by — that's normal.

### Step 5 — Run the site locally

```bash
npx tinacms dev -c "npm run dev"
```

After it starts up, open your browser and go to:
- **Your site:** http://localhost:5173
- **Admin panel:** http://localhost:5173/admin/index.html

To stop it, go back to Terminal and press `Ctrl + C`.

### Understanding Terminal basics

| What you want to do | Command |
|---------------------|---------|
| Go into a folder | `cd folder-name` |
| Go back one folder | `cd ..` |
| See what's in the current folder | `ls` |
| Run the site locally | `npx tinacms dev -c "npm run dev"` |
| Save changes to GitHub | `git add . && git commit -m "your message" && git push` |
| Get latest changes from GitHub | `git pull` |

---

## Managing Your Store with TinaCMS

This is where you'll spend most of your time. No coding required.

### Accessing the admin panel

- **On the live site:** `https://your-site.vercel.app/admin/index.html`
- **On your computer:** `http://localhost:5173/admin/index.html` (only works when running locally)

### Adding a new card

1. Open the admin panel
2. Click **Cards** in the left sidebar
3. Click **Create new**
4. Fill in the fields:
   - **Title** — the full card name e.g. "Charizard VSTAR"
   - **Slug** — the URL-friendly version e.g. "charizard-vstar" (use hyphens, no spaces)
   - **Price** — in USD, numbers only e.g. `45`
   - **Condition** — pick from the dropdown
   - **Set** — the Japanese set name
   - **Card Number** — e.g. `118/100`
   - **Quantity** — how many you have in stock
   - **Featured** — toggle ON to show it on the homepage
5. Upload your card photo (see below)
6. Set checkout options:
   - Toggle **Enable PayPal Cart** ON → shows "Add to Cart" button
   - Paste an eBay listing URL → shows "Buy on eBay" button
   - You can enable both
7. Click **Save** — live site updates within ~2 minutes

### Uploading card photos

1. In the admin panel, look for the **Media** icon in the sidebar
2. Click **Upload** and choose your photo from your computer
3. When editing a card, click the image field and select your uploaded photo

**Tips for card photos:**
- Photograph cards in good natural light
- Use a plain white or dark background
- Name files clearly before uploading e.g. `charizard-vstar-nm.jpg`
- Both JPG and PNG formats work fine

### Marking a card as sold

1. Open the card in TinaCMS
2. Toggle the **Sold** switch to ON
3. Click Save

The card automatically moves from the Shop to the Sold Archive. Customers can still see it there, which helps build trust by showing your sales history.

### Updating site settings

1. Click **Site Settings** in the left sidebar
2. Update:
   - **PayPal Business Email** — where all PayPal payments go. Double-check this is correct!
   - **Contact Email** — shown on the contact page
   - **Instagram URL** — your full Instagram URL e.g. `https://www.instagram.com/yourhandle`
3. Click Save

---

## File Structure

Here's a map of the project so you know where everything lives:

```
phase-e-tcg/
│
├── content/                    ← all your card data lives here
│   ├── cards/                  ← one file per card (edit via TinaCMS)
│   │   ├── charizard-vstar.json
│   │   └── ...
│   └── settings/
│       └── site.json           ← PayPal email, contact info, Instagram
│
├── public/
│   ├── uploads/                ← card photos (uploaded via TinaCMS media)
│   ├── favicon.ico             ← the icon in the browser tab
│   └── og-image.png            ← image shown when sharing on social media
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx      ← navigation bar at the top
│   │   │   └── Footer.tsx      ← footer at the bottom
│   │   └── shop/
│   │       └── ProductCard.tsx ← card tiles in the shop grid
│   │
│   ├── pages/
│   │   ├── Index.tsx           ← homepage
│   │   ├── Shop.tsx            ← shop page with filters
│   │   ├── ProductDetail.tsx   ← individual card page
│   │   ├── About.tsx           ← about page
│   │   ├── Contact.tsx         ← contact form
│   │   ├── FAQ.tsx             ← FAQ page
│   │   ├── Shipping.tsx        ← shipping & returns info
│   │   └── SoldArchive.tsx     ← sold cards archive
│   │
│   └── config/
│       └── site.ts             ← reads your PayPal email from site.json
│
├── tina/
│   └── config.ts               ← defines what fields appear in TinaCMS
│
└── package.json                ← project settings and build commands
```

### Key files at a glance

| File | What it controls | How to edit it |
|------|-----------------|----------------|
| `content/cards/*.json` | All card listings | Use TinaCMS — don't edit directly |
| `content/settings/site.json` | PayPal email, contact, Instagram | Use TinaCMS Site Settings |
| `src/pages/About.tsx` | Your About page text | Open in VS Code and edit |
| `src/pages/FAQ.tsx` | FAQ questions and answers | Open in VS Code and edit |
| `src/pages/Shipping.tsx` | Shipping policy text | Open in VS Code and edit |
| `src/index.css` | Colours, fonts, spacing | Open in VS Code and edit |

---

## Making Code Changes

This section is for when you want to go beyond TinaCMS and customise the site itself. You don't need to tackle this right away — the site is fully functional as-is.

### How to save changes to GitHub

After editing any file, you need to push it to GitHub so Vercel rebuilds the live site. Here's how:

Open Terminal, make sure you're in the project folder (`cd ~/Desktop/phase-e-tcg`), then run:

```bash
git add .
git commit -m "describe what you changed"
git push
```

The three commands do the following:
- `git add .` — tells git to include all your changes
- `git commit -m "..."` — saves a snapshot with a description (write anything that makes sense to you)
- `git push` — sends everything up to GitHub

Vercel detects the new commit and automatically rebuilds your site within a few minutes.

**Example:**
```bash
git add .
git commit -m "Updated FAQ with new shipping question"
git push
```

### Editing page text (About, FAQ, Shipping)

1. Open VS Code
2. Go to File → Open Folder → select the `phase-e-tcg` folder on your Desktop
3. In the left sidebar, go to `src/pages/`
4. Open the page you want to edit e.g. `About.tsx`
5. Find the text and change it
6. Save the file (`Cmd + S` on Mac, `Ctrl + S` on Windows)
7. Push to GitHub (see above)

**Important:** Only change plain text. Don't touch anything inside `< >` angle brackets unless you know what you're doing. For example:

```
<h1>About Phase-E TCG</h1>
```

You can safely change `About Phase-E TCG` but leave `<h1>` and `</h1>` alone.

### Changing colours

Open `src/index.css` in VS Code. Near the top you'll see:

```css
--primary: 222 72% 42%;      /* main blue */
--accent: 47 100% 51%;       /* yellow highlight */
```

Use [hslpicker.com](https://hslpicker.com) to find the values for any colour, paste them in, save, and push to GitHub.

---

## Taking Over Full Ownership

Currently the site is connected to accounts set up during development. Here's how to fully take over so everything is in your name.

### Step 1 — Create your accounts

Sign up for free accounts on:
- [GitHub](https://github.com) — stores your site's code
- [Vercel](https://vercel.com) — hosts your live site
- [TinaCloud](https://app.tina.io) — your content management system
- [PayPal Business](https://paypal.com/business) — receives payments

### Step 2 — Transfer the GitHub repository

The current owner needs to:
1. Go to the GitHub repo
2. Settings → Danger Zone → **Transfer ownership**
3. Enter your GitHub username

You'll receive an email — accept it and the repo is yours.

### Step 3 — Set up Vercel

1. Log into [vercel.com](https://vercel.com) with your GitHub account
2. Click **Add New Project** → import the transferred repo
3. Add these Environment Variables (Vercel will ask for them):
   - `TINA_CLIENT_ID` — from TinaCloud (Step 4)
   - `TINA_TOKEN` — from TinaCloud (Step 4)
   - `TINA_BRANCH` — type `main`
4. Click **Deploy**

### Step 4 — Set up TinaCloud

1. Go to [app.tina.io](https://app.tina.io)
2. Sign in with your GitHub account
3. Click **New Project** → select your transferred repo
4. In **Configuration → GitHub Authoring** → select **Act as bot**
   - This means TinaCMS edits show up in GitHub as "tinabot" — keeps your history clean
5. Copy your **Client ID** and **Token**
6. Go back to Vercel → Settings → Environment Variables and update `TINA_CLIENT_ID` and `TINA_TOKEN` with your new values
7. In Vercel → Deployments → click **Redeploy**

### Step 5 — Add a custom domain (recommended)

A domain like `phase-etcg.com` looks much more professional than the default Vercel URL.

1. Buy a domain from [Namecheap](https://namecheap.com) (~$15/year)
2. In Vercel → your project → **Domains** → add your domain
3. Follow Vercel's instructions to connect it

### Step 6 — Update your PayPal email

1. Log into your TinaCMS admin
2. Site Settings → **PayPal Business Email** → enter your email
3. Save, then do a test checkout to confirm payments go to you

---

## Future Improvements

The site is fully functional for day-to-day selling. Here are the most worthwhile upgrades as your business grows:

### Do these soon

**Connect a real email newsletter**
The subscribe form on the homepage currently shows a thank you message but doesn't store emails. Sign up for [Mailchimp](https://mailchimp.com) (free for small lists) and connect it so you can actually email subscribers when new cards drop. This is one of the best ways to build repeat customers. Ask Claude to help you add the integration.

**Add your real card photos**
Upload proper photos of your actual inventory via the TinaCMS media manager. Good photos are one of the most important factors in getting sales — especially for high-value cards. Show the front, back, and any condition details clearly.

**Set up Google Analytics**
Free tool that shows you how many people visit your site, where they come from, and which cards get the most views. Go to [analytics.google.com](https://analytics.google.com), create an account, and ask Claude to help you add the tracking code.

### Grow with these

**Custom domain** — Replace the `.vercel.app` URL with your own domain. Looks professional and helps with Google rankings.

**Multiple card photos** — The site supports multiple images per card but currently shows only one. Adding a photo carousel on the card detail page would let buyers see front, back, and close-up condition shots. Great for high-value cards.

**Instagram feed** — Embed your latest Instagram posts on the homepage. Services like [Behold](https://behold.so) make this easy.

**Stripe payments** — PayPal is a solid start. Stripe is the other major payment processor with a slightly more seamless checkout (customers don't need a PayPal account). Worth considering once order volume picks up.

### Longer term

**SEO improvements** — Help Google understand your cards better so they show up in search results when people look for specific cards. Ask Claude to walk you through beginner SEO improvements for your site.

**Inventory tracking** — Keep a Google Sheet alongside TinaCMS to track purchase prices, sale prices, and profit per card. Ask Claude to help you design a simple template.

**Back in stock alerts** — Let customers sign up to be notified when a specific card is relisted. Helps convert browsers into buyers even when something is sold out.

---

## Using Claude AI for Help

This entire site was built using [Claude](https://claude.ai) — an AI assistant made by Anthropic. Claude is exceptionally good at helping with web development tasks, explaining code in plain English, and solving technical problems — even if you have zero coding experience.

Think of Claude as a patient expert who explains anything clearly, never makes you feel stupid for asking, and gives you exact steps to follow.

### Getting started

Go to [claude.ai](https://claude.ai) and create a free account. The free tier handles most tasks well. Claude Pro (paid monthly) is worth it if you find yourself using it a lot.

### What to ask Claude

**When something breaks:**
> "I'm getting this error when I run the site. What does it mean and how do I fix it?"
> *(paste the full error message)*

**When you want to change something:**
> "I want to change the blue colour on my site to a darker navy. The site uses Tailwind CSS and the colour is in src/index.css. Can you tell me exactly what to change?"

**When you want a new feature:**
> "I want to add a banner at the top of the shop page that says 'New cards just added!'. How do I do this?"

**When you don't understand the code:**
> "Can you explain what this file does in plain English?" *(paste the code)*

**When you need terminal help:**
> "I edited a file. Can you give me the exact terminal commands to save it to GitHub and make it go live?"

**When you want to learn:**
> "What is a JSON file? Can you explain it like I've never coded before?"

### Tips for the best results

1. **Always mention your tech stack** — Tell Claude your site is built with React, Vite, TailwindCSS, and TinaCMS, deployed on Vercel. This one sentence helps Claude give you advice that actually works with your setup.

2. **Paste the full error** — Copy the entire error message from your terminal or browser and paste it directly. The more info you give, the better the answer.

3. **Ask for terminal commands** — Say *"can you give me the exact terminal commands?"* and Claude will give you something you can copy and paste directly.

4. **Ask follow-up questions** — If something doesn't make sense just say *"can you explain that more simply?"* Claude never gets impatient.

5. **Use it to learn** — Once something is working, ask *"can you explain why that worked?"* Over time you'll build real understanding of your own site.

### Example opening message for Claude

> "I have a Pokémon card e-commerce site built with React, Vite, TailwindCSS, and TinaCMS. It's deployed on Vercel and the code is on GitHub. I want to [describe what you want]. Can you help me step by step?"

That gives Claude everything it needs to help you straight away.

---

## Tech Stack

| Tool | What it does |
|------|-------------|
| [React](https://react.dev) | Builds the user interface |
| [Vite](https://vitejs.dev) | Runs and builds the site |
| [TypeScript](https://typescriptlang.org) | Adds type safety to JavaScript |
| [Tailwind CSS](https://tailwindcss.com) | Handles all the styling |
| [TinaCMS](https://tina.io) | Content management (adding/editing cards) |
| [React Router](https://reactrouter.com) | Handles navigation between pages |
| [Radix UI](https://radix-ui.com) | Accessible UI components |
| [Lucide](https://lucide.dev) | Icons |
| [Vercel](https://vercel.com) | Hosts and deploys the site |
| [GitHub](https://github.com) | Stores the code and content |
| [PayPal](https://paypal.com) | Processes payments |

---

*Built with love and [Claude AI](https://claude.ai)*
