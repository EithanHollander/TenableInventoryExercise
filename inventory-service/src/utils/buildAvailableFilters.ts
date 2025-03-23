import { LeanDocument } from "mongoose";
import { Product } from "../models/Product";
import { convertValue } from "./convertValue";

export const buildAvailableFilters = (products: LeanDocument<Product>[]) => {
  const filters: Record<string, any[]> = {};

  // Iterate over all products and gather unique values for each field
  products.forEach((product) => {
    Object.keys(product).forEach((field) => {
      // Skip fields like _id, __v, and productType that shouldn't be part of filters
      if (field === "_id" || field === "__v" || field === "type") return;

      // Initialize filter array if not already present
      if (!filters[field]) {
        filters[field] = [];
      }

      // Add unique values for each field
      const value = product[field];
      if (!filters[field].includes(value)) {
        filters[field].push(value);
      }
    });
  });

  // Sort each list of values
  for (const field in filters) {
    filters[field] = filters[field].sort((a, b) =>
      convertValue(a) < convertValue(b) ? -1 : 1
    );
  }

  return filters;
};
