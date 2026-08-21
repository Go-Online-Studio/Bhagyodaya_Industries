import { Product, Campaign } from "@/types";
import productsJson from "@/data/products.json";
import campaignsJson from "@/data/campaigns.json";

export const DEFAULT_PRODUCTS: Product[] = productsJson as Product[];
export const DEFAULT_CAMPAIGNS: Campaign[] = campaignsJson as Campaign[];

