interface IProduct {
  type: string;
  name: string;
  description: string;
  price: number;
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

type Product = Bike | Book | Smartphone | Watch | Shirt;
type AllPossibleProductFields =
  | keyof Bike
  | keyof Book
  | keyof Smartphone
  | keyof Watch
  | keyof Shirt;

export type {
  IProduct,
  Bike,
  Book,
  Smartphone,
  Watch,
  Shirt,
  Product,
  AllPossibleProductFields,
};
