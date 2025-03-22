import { Product } from "./product";
export interface QuantityPerProductType {
  type: Product["type"];
  quantity: number;
}

export interface ProductsSummaryResponse {
  quantities: QuantityPerProductType[];
}
