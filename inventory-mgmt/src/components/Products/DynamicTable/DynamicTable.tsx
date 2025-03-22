import { JSX, useRef } from "react";
import _ from "lodash";
import { AllPossibleProductFields, Product } from "@/types/product";
import { SortBy } from "@/types/product_details";
import { Filters } from "@/types/filters";
import { useElementReached } from "@/hooks/useElementReached";
import { SortField } from "./SortField/SortField";
import { FilterField } from "./FilterField/FilterField";
import "./DynamicTable.css";

export type ColumnRenderes = Partial<
  Record<AllPossibleProductFields, (value: unknown) => JSX.Element | string>
>;
interface DynamicTableProps {
  data: Product[];
  sortBy: SortBy | null;
  filters?: Filters;
  appliedFilters?: Filters | null;
  columnsToFilterOut?: AllPossibleProductFields[];
  renderers?: ColumnRenderes;
  onReachEndOfTable?: () => void;
  onSortChange?: (sortBy: SortBy) => void;
  onApplyFilterValues?: (
    field: AllPossibleProductFields
  ) => (chosenValues: string[]) => void;
}

export function DynamicTable({
  data,
  sortBy,
  filters,
  appliedFilters,
  columnsToFilterOut,
  renderers = {},
  onSortChange,
  onApplyFilterValues,
  onReachEndOfTable,
}: DynamicTableProps) {
  const lastRowRef = useRef<HTMLTableRowElement | null>(null);

  const handleEndOfTableReached = () => {
    if (!onReachEndOfTable || data.length === 0) return;
    onReachEndOfTable();
  };
  useElementReached(lastRowRef, handleEndOfTableReached);

  const handleSort = (field: AllPossibleProductFields) => {
    const newOrder =
      sortBy?.field === field && sortBy.order === "ASC" ? "DESC" : "ASC";
    onSortChange?.({ field, order: newOrder });
  };

  const columns: AllPossibleProductFields[] = (
    Object.keys(data[0]) as AllPossibleProductFields[]
  ).filter((key) => !columnsToFilterOut?.includes(key));

  const shouldShowFilter = !_.isEmpty(filters);

  return (
    <div className="dynamic-table-container">
      <table className="dynamic-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>
                <div className="column-header-content">
                  <p>{_.startCase(col)}</p>
                  <div className="column-actions">
                    <SortField
                      order={sortBy?.field === col ? sortBy.order : null}
                      onClick={() => handleSort(col)}
                    />
                    {shouldShowFilter && (
                      <FilterField
                        values={filters[col]}
                        appliedValues={appliedFilters?.[col]}
                        onApplyFilterValues={onApplyFilterValues?.(col)}
                      />
                    )}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} ref={index === data.length - 1 ? lastRowRef : null}>
              {columns.map((col) => (
                <td key={col}>
                  {renderers[col]
                    ? renderers[col](row[col as keyof Product])
                    : row[col as keyof Product]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
