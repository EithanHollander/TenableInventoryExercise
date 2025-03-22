import { useEffect, useState } from "react";
import _ from "lodash";
import { AllPossibleProductFields, Product } from "@/types/product";
import { SortBy } from "@/types/product_details";
import { Loader } from "@/components/Loader/Loader";
import { ErrorMessage } from "@/components/ErrorMessage/ErrorMessage";
import { useProductDetails } from "@/hooks/useProductDetails";
import { useFilters } from "@/hooks/useFilters";
import { ColumnRenderes, DynamicTable } from "./DynamicTable/DynamicTable";
import { TryAgain } from "./TryAgain/TryAgain";
import "./Products.css";
import { Filters } from "@/types/filters";
import { NoItems } from "./NoItems/NoItems";

interface ProductsTableProps {
  productType?: Product["type"];
}

const columnRenderers: ColumnRenderes = {
  price: (value: unknown) => `$${value as string}`,
  name: (value: unknown) => <strong>{value as string}</strong>,
};

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
        columnsToFilterOut={["type"]}
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
