import { InboxIcon } from "@heroicons/react/24/solid";
import "./NoItems.css";

export const NoItems = () => {
  return (
    <div className="no-items-container">
      <InboxIcon className="no-items-icon" />
      <p className="no-items-message">No items available</p>
    </div>
  );
};
