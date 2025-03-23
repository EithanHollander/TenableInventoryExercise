import { useEffect, useState } from "react";
import _ from "lodash";
import { AllPossibleProductFields, Product } from "@/types/product";
import { Filters } from "@/types/filters";
import { SortBy } from "@/types/product_details";
import { Loader } from "@/components/Loader/Loader";
import { ErrorMessage } from "@/components/ErrorMessage/ErrorMessage";
import { useProductDetails } from "@/hooks/useProductDetails";
import { useFilters } from "@/hooks/useFilters";
import { ColumnRenderes, DynamicTable } from "./DynamicTable/DynamicTable";
import { TryAgain } from "./TryAgain/TryAgain";
import { NoItems } from "./NoItems/NoItems";
import "./Products.css";

interface ProductsTableProps {
  productType?: Product["type"];
}

// Feel Free to add a new renderer based on the existing fields of the different products!
const columnRenderers: ColumnRenderes = {
  name: (value: unknown) => <strong>{value as string}</strong>,
  price: (value: unknown) => `$${value as string}`,
  cameraMegapixels: (value: unknown) => `${value as number}MP`,
};
const columnsToFilterOut: AllPossibleProductFields[] = ["type"];

export function Products({ productType }: ProductsTableProps) {
  const [sortBy, setSortBy] = useState<SortBy | null>(null);
  const [appliedFilters, setAppliedFilters] = useState<Filters | null>(null);
  const {
    isLoading: isLoadingProductDetails,
    isError: isErrorProductDetails,
    data: productDetails,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProductDetails({
    productType,
    sortByField: sortBy?.field,
    sortByOrder: sortBy?.order,
    filters: appliedFilters,
  });
  const { data: productFilters } = useFilters({
    productType,
  });

  const allProducts =
    productDetails?.pages.flatMap((page) => page.products) ?? [];

  const handleSortChanged = (newSortBy: SortBy) => {
    setSortBy(newSortBy);
  };
  const handleFilterValuesApplied =
    (fieldName: AllPossibleProductFields) => (chosenValues: string[]) => {
      setAppliedFilters((prev) => ({ ...prev, [fieldName]: chosenValues }));
    };
  const handleReachEnd = () => {
    if (hasNextPage) fetchNextPage();
  };

  useEffect(() => {
    setSortBy(null);
    setAppliedFilters(null);
  }, [productType]);

  if (!productType) return null;
  if (isErrorProductDetails && _.isEmpty(allProducts)) {
    return (
      <div className="products-no-elements">
        <ErrorMessage />
      </div>
    );
  }

  if (isLoadingProductDetails) {
    return (
      <div className="products-no-elements">
        <Loader />
      </div>
    );
  }

  if (_.isEmpty(allProducts)) {
    return (
      <div className="products-no-elements">
        <NoItems />
      </div>
    );
  }

  return (
    <div className="products">
      <DynamicTable
        data={allProducts || []}
        sortBy={sortBy}
        filters={productFilters?.filters}
        appliedFilters={appliedFilters}
        columnsToFilterOut={columnsToFilterOut}
        renderers={columnRenderers}
        onReachEndOfTable={handleReachEnd}
        onSortChange={handleSortChanged}
        onApplyFilterValues={handleFilterValuesApplied}
      />
      {isErrorProductDetails && !isFetchingNextPage && (
        <TryAgain onButtonClick={() => fetchNextPage()} />
      )}
      {isFetchingNextPage && (
        <div>
          <Loader size={20} />
        </div>
      )}
    </div>
  );
}
