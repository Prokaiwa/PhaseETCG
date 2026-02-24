export type Condition = 'Mint' | 'Near Mint' | 'Excellent' | 'Great' | 'Played' | 'Heavily Played' | 'Damaged' | 'Graded';
export type GradingCompany = 'PSA' | 'BGS' | 'CGC' | 'Other';
export type CardCategory = 'Pokémon' | 'Trainer' | 'Energy';
export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Holo' | 'Reverse Holo' | 'Ultra Rare' | 'Secret Rare';

export interface Product {
  id: string;
  title: string;
  slug: string;
  images: string[];
  description: string;
  price: number;
  currency: string;
  condition: Condition;
  category: CardCategory;
  subcategory: string;
  rarity: Rarity;
  set: string;
  cardNumber: string;
  graded: boolean;
  gradingCompany?: GradingCompany;
  gradeScore?: string;
  population?: number;
  certNumber?: string;
  quantity: number;
  featured: boolean;
  sold: boolean;
  createdAt: string;
  views: number;
  // Checkout options (both optional — use one or both per card)
  ebayUrl?: string;      // Links "Buy on eBay" button to the eBay listing
  paypalSell?: boolean;  // Set true to show PayPal Add to Cart for this card
}
