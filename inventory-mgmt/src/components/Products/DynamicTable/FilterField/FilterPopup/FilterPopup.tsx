import { useState } from "react";
import { FilterActionButton } from "../FilterActionButton/FilterActionButton";
import "./FilterPopup.css";

const SHOW_ALL_THRESHOLD = 5;

interface FilterPopupProps {
  values?: string[];
  appliedValues?: string[];
  showAllValuesThreshold?: number;
  onApply?: (selectedValues: string[]) => void;
}
export const FilterPopup = ({
  values,
  appliedValues,
  showAllValuesThreshold = SHOW_ALL_THRESHOLD,
  onApply,
}: FilterPopupProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(
    appliedValues || []
  );

  const [showAll, setShowAll] = useState(false);

  const toggleValue = (value: string) => {
    setSelectedValues((prevSelectedValues) =>
      prevSelectedValues.includes(value)
        ? prevSelectedValues.filter((item) => item !== value)
        : [...prevSelectedValues, value]
    );
  };

  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleClear = () => {
    setSelectedValues([]);
  };

  const handleApply = () => {
    onApply?.(selectedValues);
  };

  if (!values) return null;

  const shouldRenderShowAllButton =
    !showAll && values.length > showAllValuesThreshold;
  const valuesToShow = showAll
    ? values
    : values?.slice(0, showAllValuesThreshold);

  return (
    <div className="filter-popup-content">
      <ul className="filter-list">
        {valuesToShow?.map((value) => (
          <li key={value} className="filter-option">
            <label className="filter-option-content">
              <input
                type="checkbox"
                checked={selectedValues.includes(value)}
                onChange={() => toggleValue(value)}
              />
              <p>{value}</p>
            </label>
          </li>
        ))}
      </ul>

      {shouldRenderShowAllButton && (
        <FilterActionButton variant="outline" onClick={handleShowAll}>
          Show All
        </FilterActionButton>
      )}

      <FilterActionButton variant="outline" onClick={handleClear}>
        Clear All
      </FilterActionButton>

      <FilterActionButton onClick={handleApply}>Apply</FilterActionButton>
    </div>
  );
};
