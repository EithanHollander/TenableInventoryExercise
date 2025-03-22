import { QuantityPerProductType } from "@/types/products_summary";
import { Loader } from "@/components/Loader/Loader";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { QuantityPerProduct } from "./QuantityPerProduct/QuantityPerProduct";
import "./ProductsSummary.css";

interface ProductsSummaryProps {
  items?: QuantityPerProductType[];
  selectedItem: QuantityPerProductType | null;
  onItemClick: (product: QuantityPerProductType) => void;
  isLoading: boolean;
  isError: boolean;
}

export const ProductsSummary = ({
  items,
  selectedItem,
  onItemClick,
  isLoading,
  isError,
}: ProductsSummaryProps) => {
  if (isLoading) {
    return (
      <div className="products-summary-no-elements">
        <Loader size={20} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="products-summary-no-elements">
        <ErrorMessage />
      </div>
    );
  }

  return (
    <div className="products-summary">
      <ul>
        {items?.map((currentItem) => (
          <QuantityPerProduct
            onClick={() => onItemClick(currentItem)}
            key={currentItem.type}
            isSelected={currentItem.type === selectedItem?.type}
            item={currentItem}
          />
        ))}
      </ul>
    </div>
  );
};
