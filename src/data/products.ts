import { Product } from '@/types/product';

const modules = import.meta.glob('../../content/cards/*.json', { eager: true });

export const products: Product[] = Object.values(modules).map((m: any) => m.default || m) as Product[];
