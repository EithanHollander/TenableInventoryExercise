import _ from "lodash";
import {
  ArrowsUpDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";
import { SortBy } from "@/types/product_details";
import "./SortField.css";

interface SortFieldProps {
  order: SortBy["order"] | null;
  onClick?: () => void;
}
export const SortField = ({ order, onClick }: SortFieldProps) => {
  return (
    <button className="sort-by-container" onClick={onClick}>
      {_.isEmpty(order) ? (
        <ArrowsUpDownIcon className="w-4 h-4 opacity-50" />
      ) : order === "ASC" ? (
        <ChevronUpIcon className="w-4 h-4" />
      ) : (
        <ChevronDownIcon className="w-4 h-4" />
      )}
    </button>
  );
};
