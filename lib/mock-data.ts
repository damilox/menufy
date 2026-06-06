// src/lib/mock-data.ts
import { Restaurant, MenuCategory, MenuItem } from '../types';

export const mockRestaurant: Restaurant = {
  id: "rest_123",
  name: "The Rustic Plate",
  slug: "rustic-plate",
  coverImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
  logo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&q=80",
  description: "Farm-to-table comfort food in the heart of the city."
};

export const mockCategories: MenuCategory[] = [
  { id: "cat_1", name: "Starters", order: 1 },
  { id: "cat_2", name: "Mains", order: 2 },
  { id: "cat_3", name: "Drinks", order: 3 },
];

export const mockMenuItems: MenuItem[] = [
  {
    id: "item_1",
    categoryId: "cat_1",
    name: "Truffle Fries",
    description: "Crispy shoestring fries tossed in white truffle oil and parmesan.",
    price: 8.50,
    imageUrl: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=500&q=80",
    isAvailable: true,
    dietaryTags: ['vegetarian']
  },
  {
    id: "item_2",
    categoryId: "cat_2",
    name: "Spicy Honey Chicken Sandwich",
    description: "Buttermilk fried chicken, house slaw, and hot honey on a brioche bun.",
    price: 16.00,
    imageUrl: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500&q=80",
    isAvailable: true,
    dietaryTags: ['spicy']
  }
];