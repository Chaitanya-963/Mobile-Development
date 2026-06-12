import { ImageSourcePropType } from "react-native";

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  priceRange: string;
  image: ImageSourcePropType | any;
  tag: string;
  tagColor: string;
  minOrder: number;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  emoji: string;
}

export interface Order {
  id: string;
  restaurantName: string;
  emoji: string;
  items: string[];
  total: number;
  date: string;
  status: string;
}

export interface Category {
  id: string;
  label: string;
  emoji: string;
}
