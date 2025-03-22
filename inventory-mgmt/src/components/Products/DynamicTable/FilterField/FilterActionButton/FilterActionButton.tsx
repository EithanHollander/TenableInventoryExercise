import { MouseEventHandler } from "react";
import classNames from "classnames";
import "./FilterActionButton.css";

interface FilterActionButtonProps {
  variant?: "filled" | "outline";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export const FilterActionButton: React.FC<
  React.PropsWithChildren<FilterActionButtonProps>
> = ({ variant = "filled", onClick, children }) => {
  return (
    <button
      className={classNames("filter-action-button", variant)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
