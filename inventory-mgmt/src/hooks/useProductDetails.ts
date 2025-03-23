import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Filters } from "@/types/filters";
import { Product } from "@/types/product";

const PAGE_SIZE = 20;
const FETCH_PRODUCT_DETAILS_URL = `${process.env.NEXT_PUBLIC_PRODUCTS_API_URL}/products`;

const encodeFilters = (filters: Filters | null): string => {
  if (!filters) return "";
  return Object.entries(filters)
    .map(
      ([key, values]) =>
        `${encodeURIComponent(key)}:${values.map(encodeURIComponent).join(",")}`
    )
    .join("|");
};

interface ProductDetailsResponse {
  products: Product[];
  nextPage: number | null;
}
const fetchProductDetails = async ({
  productType,
  pageParam = 1,
  sortByField = "",
  sortByOrder = "ASC",
  filters = {},
}: {
  productType: Product["type"] | undefined;
  pageParam: number | null;
  sortByField?: string;
  sortByOrder?: "ASC" | "DESC";
  filters?: Filters | null;
}): Promise<ProductDetailsResponse> => {
  if (!productType || !pageParam) return { products: [], nextPage: null };

  const filtersEncoded = encodeFilters(filters);
  const response = await axios.get<ProductDetailsResponse>(
    FETCH_PRODUCT_DETAILS_URL,
    {
      params: {
        product_type: productType,
        limit: PAGE_SIZE,
        page: pageParam,
        ...(sortByField
          ? { sortby_field: sortByField, sortby_order: sortByOrder }
          : {}),
        ...(filtersEncoded ? { filters: filtersEncoded } : {}),
      },
    }
  );

  if (response.status !== 200) throw new Error("Failed to fetch products");

  return response.data;
};

export const useProductDetails = ({
  productType,
  sortByField,
  sortByOrder,
  filters,
}: {
  productType: Product["type"] | undefined;
  sortByField?: string;
  sortByOrder?: "ASC" | "DESC";
  filters?: Filters | null;
}) => {
  return useInfiniteQuery({
    queryKey: [
      `product_details`,
      productType,
      sortByField,
      sortByOrder,
      JSON.stringify(filters),
    ],
    queryFn: ({ pageParam = 1 }) =>
      fetchProductDetails({
        pageParam,
        productType,
        sortByField,
        sortByOrder,
        filters,
      }),
    getNextPageParam: (lastPage: ProductDetailsResponse) =>
      lastPage.nextPage ?? null,
    initialPageParam: 1,
    retry: 3,
    enabled: !!productType,
  });
};
