import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FilterResponse } from "@/types/filters";
import { Product } from "@/types/product";

const FETCH_FILTERS_KEY = "filters";
const FETCH_FILTERS_URL = `${process.env.NEXT_PUBLIC_PRODUCTS_API_URL}/products/filters`;

export const fetchFilters = async (
  productType?: Product["type"]
): Promise<FilterResponse> => {
  if (!productType) return { filters: {} };

  const response = await axios.get<FilterResponse>(FETCH_FILTERS_URL, {
    params: { product_type: productType },
  });
  return response.data;
};

export const useFilters = ({
  productType,
}: {
  productType?: Product["type"];
}) => {
  return useQuery<FilterResponse, Error>({
    queryKey: [FETCH_FILTERS_KEY, productType],
    queryFn: () => fetchFilters(productType),
    retry: 3,
    refetchOnWindowFocus: false,
  });
};
