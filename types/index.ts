// src/types/index.ts

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  coverImage: string;
  logo: string;
  description: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  order: number; // To sort categories (e.g., Starters first)
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  dietaryTags: ('vegan' | 'vegetarian' | 'gluten-free' | 'spicy')[];
}