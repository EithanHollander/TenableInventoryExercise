import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ProductsSummaryResponse } from "@/types/products_summary";

const FETCH_PRODUCTS_SUMMARY_KEY = "products_summary";
const FETCH_PRODUCTS_AMOUNT_URL = `${process.env.NEXT_PUBLIC_PRODUCTS_API_URL}/products/summary`;

const fetchProductsSummary = async (): Promise<ProductsSummaryResponse> => {
  const response = await axios.get<ProductsSummaryResponse>(
    FETCH_PRODUCTS_AMOUNT_URL
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch products");
  }
  return response.data;
};

export const useProductsSummary = () => {
  return useQuery<ProductsSummaryResponse, Error>({
    queryKey: [FETCH_PRODUCTS_SUMMARY_KEY],
    queryFn: fetchProductsSummary,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};
