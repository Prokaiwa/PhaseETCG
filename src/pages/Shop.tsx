import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '@/data/products';
import ProductCard from '@/components/shop/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const conditions = ['Mint', 'Near Mint', 'Excellent', 'Great', 'Played', 'Heavily Played', 'Damaged', 'Graded'];
const rarities = ['Common', 'Uncommon', 'Rare', 'Holo', 'Reverse Holo', 'Ultra Rare', 'Secret Rare'];
const categories = ['Pokémon', 'Trainer', 'Energy'];

type SortOption = 'newest' | 'oldest' | 'price-asc' | 'price-desc' | 'views';

import usePageTitle from "@/hooks/usePageTitle";

const Shop = () => {
  usePageTitle("Shop Cards");
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedRarities, setSelectedRarities] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [inStockOnly, setInStockOnly] = useState(true);
  const [gradedOnly, setGradedOnly] = useState(searchParams.get('graded') === 'true');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const toggleFilter = (arr: string[], val: string, setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
  };

  const filtered = useMemo(() => {
    let result = products.filter(p => !p.sold);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.set.toLowerCase().includes(q) ||
        p.cardNumber.toLowerCase().includes(q)
      );
    }
    if (selectedConditions.length) result = result.filter(p => selectedConditions.includes(p.condition));
    if (selectedRarities.length) result = result.filter(p => selectedRarities.includes(p.rarity));
    if (selectedCategories.length) result = result.filter(p => selectedCategories.includes(p.category));
    if (inStockOnly) result = result.filter(p => p.quantity > 0);
    if (gradedOnly) result = result.filter(p => p.graded);
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'oldest': result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()); break;
      case 'views': result.sort((a, b) => b.views - a.views); break;
      default: result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [searchQuery, selectedConditions, selectedRarities, selectedCategories, priceRange, inStockOnly, gradedOnly, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedConditions([]);
    setSelectedRarities([]);
    setSelectedCategories([]);
    setPriceRange([0, 500]);
    setInStockOnly(true);
    setGradedOnly(false);
  };

  const hasActiveFilters = selectedConditions.length > 0 || selectedRarities.length > 0 || selectedCategories.length > 0 || gradedOnly || priceRange[0] > 0 || priceRange[1] < 500;

  const FilterPanel = () => (
    <div className="flex flex-col gap-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search cards..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Price Range */}
      <div>
        <h4 className="mb-3 text-sm font-semibold">Price Range</h4>
        <Slider value={priceRange} onValueChange={setPriceRange} max={500} step={5} className="mb-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <Checkbox checked={inStockOnly} onCheckedChange={(c) => setInStockOnly(c === true)} />
          <span className="text-sm">In Stock Only</span>
        </label>
        <label className="flex items-center gap-2">
          <Checkbox checked={gradedOnly} onCheckedChange={(c) => setGradedOnly(c === true)} />
          <span className="text-sm">Graded Only</span>
        </label>
      </div>

      {/* Condition */}
      <div>
        <h4 className="mb-2 text-sm font-semibold">Condition</h4>
        <div className="flex flex-col gap-2">
          {conditions.map(c => (
            <label key={c} className="flex items-center gap-2">
              <Checkbox checked={selectedConditions.includes(c)} onCheckedChange={() => toggleFilter(selectedConditions, c, setSelectedConditions)} />
              <span className="text-sm">{c}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <h4 className="mb-2 text-sm font-semibold">Category</h4>
        <div className="flex flex-col gap-2">
          {categories.map(c => (
            <label key={c} className="flex items-center gap-2">
              <Checkbox checked={selectedCategories.includes(c)} onCheckedChange={() => toggleFilter(selectedCategories, c, setSelectedCategories)} />
              <span className="text-sm">{c}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rarity */}
      <div>
        <h4 className="mb-2 text-sm font-semibold">Rarity</h4>
        <div className="flex flex-col gap-2">
          {rarities.map(r => (
            <label key={r} className="flex items-center gap-2">
              <Checkbox checked={selectedRarities.includes(r)} onCheckedChange={() => toggleFilter(selectedRarities, r, setSelectedRarities)} />
              <span className="text-sm">{r}</span>
            </label>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="mt-2">
          <X className="mr-1 h-3 w-3" /> Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Shop Cards</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} cards found</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Mobile filter toggle */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden">
                <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6 overflow-y-auto">
                <FilterPanel />
              </div>
            </SheetContent>
          </Sheet>

          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="price-asc">Price: Low → High</SelectItem>
              <SelectItem value="price-desc">Price: High → Low</SelectItem>
              <SelectItem value="views">Most Viewed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <FilterPanel />
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">No cards match your filters.</p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Shop;
