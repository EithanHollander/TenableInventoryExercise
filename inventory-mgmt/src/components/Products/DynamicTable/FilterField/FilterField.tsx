import { useState } from "react";
import classNames from "classnames";
import { useDismiss, useFloating, useInteractions } from "@floating-ui/react";
import { FunnelIcon } from "@heroicons/react/24/solid";
import { FilterPopup } from "./FilterPopup/FilterPopup";
import "./FilterField.css";

interface FilterFieldProps {
  values?: string[];
  appliedValues?: string[];
  onApplyFilterValues?: (chosenValues: string[]) => void;
}

export const FilterField = ({
  values,
  appliedValues,
  onApplyFilterValues,
}: FilterFieldProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-end",
    open: isPopupOpen,
    onOpenChange: setIsPopupOpen,
  });
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  const handleApplyFilterValues = (selectedValues: string[]) => {
    onApplyFilterValues?.(selectedValues);
    setIsPopupOpen(false);
  };

  if (!values) return null;

  return (
    <div className="show-filter-container">
      <div
        className="show-filter-button"
        ref={refs.setReference}
        onClick={() => setIsPopupOpen(!isPopupOpen)}
        {...getReferenceProps()}
      >
        <FunnelIcon
          className={classNames("w-4", "h-4", {
            "opacity-50": !appliedValues || appliedValues?.length === 0,
          })}
        />
      </div>
      {isPopupOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="filter-popup"
          {...getFloatingProps()}
        >
          <FilterPopup
            values={values}
            appliedValues={appliedValues}
            onApply={handleApplyFilterValues}
          />
        </div>
      )}
    </div>
  );
};
