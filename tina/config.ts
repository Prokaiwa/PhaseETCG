import { defineConfig } from "tinacms";

export default defineConfig({
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  branch: process.env.TINA_BRANCH || "main",
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "uploads", publicFolder: "public" } },
  schema: {
    collections: [
      {
        name: "card",
        label: "Cards",
        path: "content/cards",
        format: "json",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) =>
              values?.title?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "card",
          },
        },
        fields: [
          { type: "string", name: "title", label: "Card Title", required: true, isTitle: true },
          { type: "string", name: "slug", label: "Slug (URL)", required: true, description: "e.g. charizard-vstar-star-birth" },
          { type: "image", name: "images", label: "Images", list: true },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
          { type: "number", name: "price", label: "Price (USD)", required: true },
          { type: "string", name: "currency", label: "Currency", options: ["USD", "JPY", "AUD", "GBP"] },
          {
            type: "string", name: "condition", label: "Condition", required: true,
            options: ["Mint", "Near Mint", "Excellent", "Great", "Played", "Heavily Played", "Damaged", "Graded"],
          },
          { type: "string", name: "category", label: "Category", options: ["Pokémon", "Trainer", "Energy"] },
          { type: "string", name: "subcategory", label: "Subcategory" },
          {
            type: "string", name: "rarity", label: "Rarity",
            options: ["Common", "Uncommon", "Rare", "Holo", "Reverse Holo", "Ultra Rare", "Secret Rare"],
          },
          { type: "string", name: "set", label: "Set Name", required: true },
          { type: "string", name: "cardNumber", label: "Card Number" },
          { type: "boolean", name: "graded", label: "Professionally Graded?" },
          { type: "string", name: "gradingCompany", label: "Grading Company", options: ["PSA", "BGS", "CGC", "Other"] },
          { type: "string", name: "gradeScore", label: "Grade Score" },
          { type: "number", name: "population", label: "Population" },
          { type: "string", name: "certNumber", label: "Cert / Slab Number" },
          { type: "number", name: "quantity", label: "Quantity in Stock", required: true },
          { type: "boolean", name: "featured", label: "Featured on Homepage?" },
          { type: "boolean", name: "sold", label: "Sold? (moves to archive)" },
          { type: "string", name: "createdAt", label: "Date Added (YYYY-MM-DD)" },
          { type: "number", name: "views", label: "View Count" },
          { type: "boolean", name: "paypalSell", label: "Enable PayPal Cart" },
          { type: "string", name: "ebayUrl", label: "eBay Listing URL" },
        ],
      },
      {
        name: "settings",
        label: "Site Settings",
        path: "content/settings",
        format: "json",
        match: { include: "site" },
        fields: [
          { type: "string", name: "siteName", label: "Site Name" },
          { type: "string", name: "tagline", label: "Tagline" },
          { type: "string", name: "heroHeading", label: "Hero Heading" },
          { type: "string", name: "heroSubtext", label: "Hero Subtext" },
          { type: "string", name: "contactEmail", label: "Contact Email" },
          { type: "string", name: "paypalEmail", label: "PayPal Business Email" },
          { type: "string", name: "instagramUrl", label: "Instagram URL" },
        ],
      },
    ],
  },
});
