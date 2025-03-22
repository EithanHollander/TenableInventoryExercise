import _ from "lodash";
import pluralize from "pluralize";
import classNames from "classnames";
import { QuantityPerProductType } from "@/types/products_summary";
import "./QuantityPerProduct.css";

interface QuantityPerProductProps {
  item: QuantityPerProductType;
  isSelected: boolean;
  onClick: () => void;
}

export const QuantityPerProduct = ({
  item,
  isSelected,
  onClick,
}: QuantityPerProductProps) => {
  const typeToDisplay: string = _.capitalize(pluralize(item.type));

  return (
    <li
      className={classNames("quantity-per-product", { selected: isSelected })}
      onClick={onClick}
    >
      <span className="product-type">{typeToDisplay}</span>
      <span className="product-amount">{item.quantity}</span>
    </li>
  );
};
