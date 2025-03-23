import mongoose, { Schema, Document } from "mongoose";

// Define the base product interface
interface IProduct extends Document {
  id: string;
  type: string;
  name: string;
  description: string;
  price: number;
  [key: string]: any; //gives up flexibility for Mongo Model
}

interface Bike extends IProduct {
  type: "bike";
  wheelSize: number;
  color: string;
  frameMaterial: string;
}

interface Book extends IProduct {
  type: "book";
  author: string;
  genre: string;
  pageCount: number;
}

interface Smartphone extends IProduct {
  type: "smartphone";
  brand: string;
  screenSize: number;
  batteryCapacity: number;
  cameraMegapixels: number;
}

interface Watch extends IProduct {
  type: "watch";
  brand: string;
  watchType: "Analog" | "Digital" | "Smart";
}

interface Shirt extends IProduct {
  type: "shirt";
  size: "XS" | "S" | "M" | "L" | "XL" | "2XL" | "3XL";
  material: string;
  gender: "Men" | "Women" | "Unisex";
}

export type Product = Bike | Book | Smartphone | Watch | Shirt;

// Define a generic Product schema
const ProductSchema = new Schema<Product>(
  {
    type: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { strict: false } // `strict: false` allows additional fields
);

export const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);
