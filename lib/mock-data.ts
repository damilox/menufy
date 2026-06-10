// src/lib/mock-data.ts
import { Restaurant, MenuCategory, MenuItem } from '../types';

export const mockRestaurant: Restaurant = {
  id: "rest_naija_01",
  name: "Naija Bites",
  slug: "naija-bites",
  coverImage: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
  logo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&q=80",
  description: "Authentic Nigerian flavors, prepared with love."
};

export const mockCategories: MenuCategory[] = [
  { id: "cat_1", name: "Starters & Small Chops", order: 1 },
  { id: "cat_2", name: "Main Dishes", order: 2 },
  { id: "cat_3", name: "Refreshments", order: 3 },
];

export const mockMenuItems: MenuItem[] = [
  // CAT 1: STARTERS
  {
    id: "item_1",
    categoryId: "cat_1",
    name: "Spicy Beef Suya",
    description: "Tender flank steak marinated in our secret Yaji spice blend, fire-grilled.",
    price: 3500,
    imageUrl: "https://images.unsplash.com/photo-1628294895950-9805252327bc?w=500&q=80",
    isAvailable: true,
    dietaryTags: ['spicy']
  },
  {
    id: "item_2",
    categoryId: "cat_1",
    name: "Crispy Spring Rolls",
    description: "Crunchy wrapper stuffed with seasoned minced beef and diced vegetables.",
    price: 2200,
    imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80",
    isAvailable: true,
    dietaryTags: ['vegetarian']
  },
  {
    id: "item_3",
    categoryId: "cat_1",
    name: "Peppered Gizzard",
    description: "Tender gizzards tossed in a fiery, aromatic habanero pepper sauce.",
    price: 2800,
    imageUrl: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=500&q=80",
    isAvailable: true,
    dietaryTags: ['spicy']
  },

  // CAT 2: MAINS
  {
    id: "item_4",
    categoryId: "cat_2",
    name: "Fried Rice & Prawns",
    description: "Wok-fried rice with assorted vegetables and jumbo tiger prawns.",
    price: 5500,
    imageUrl: "https://images.unsplash.com/photo-1603133872878-684f2089d4b6?w=500&q=80",
    isAvailable: true,
    dietaryTags: []
  },
  {
    id: "item_5",
    categoryId: "cat_2",
    name: "Grilled Tilapia & Chips",
    description: "Whole fresh tilapia rubbed with herbs, grilled and served with seasoned chips.",
    price: 7500,
    imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&q=80",
    isAvailable: true,
    dietaryTags: ['spicy']
  },
  {
    id: "item_6",
    categoryId: "cat_2",
    name: "Asun (Spicy Goat Meat)",
    description: "Smoked, succulent goat meat chopped and tossed in a spicy pepper sauce.",
    price: 4800,
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80",
    isAvailable: true,
    dietaryTags: ['spicy']
  },

  // CAT 3: DRINKS
  {
    id: "item_7",
    categoryId: "cat_3",
    name: "Chapman Cocktail",
    description: "Refreshing mix of fruity syrups, bitters, and citrus sodas.",
    price: 2500,
    imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80",
    isAvailable: true,
    dietaryTags: ['vegetarian']
  },
  {
    id: "item_8",
    categoryId: "cat_3",
    name: "Pineapple Ginger Juice",
    description: "Freshly squeezed pineapple juice with a bold kick of organic ginger.",
    price: 1800,
    imageUrl: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&q=80",
    isAvailable: true,
    dietaryTags: ['vegetarian']
  },
  {
    id: "item_9",
    categoryId: "cat_3",
    name: "Sparkling Mint Lemonade",
    description: "Chilled sparkling water infused with fresh mint leaves and zesty lemon.",
    price: 1500,
    imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80",
    isAvailable: true,
    dietaryTags: ['vegetarian']
  }
];