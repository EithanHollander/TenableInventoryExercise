// import mongoose, { Document, Schema } from "mongoose";

// export interface IProduct extends Document {
//   id: string;
//   type: string;
//   name: string;
//   description: string;
//   price: number;
//   [key: string]: any;
// }

// const productSchema = new Schema<IProduct>({
//   id: { type: String, required: true },
//   type: { type: String, required: true },
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
// });

// const Product = mongoose.model<IProduct>("Product", productSchema);

// export default Product;

import mongoose, { Schema, Document } from "mongoose";

// Define the base product interface
interface IProduct extends Document {
  id: string;
  type: string;
  name: string;
  description: string;
  price: number;
  [key: string]: any;
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
const ProductSchema = new Schema<IProduct>(
  {
    type: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { strict: false } // `strict: false` allows additional fields
);

export const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);
