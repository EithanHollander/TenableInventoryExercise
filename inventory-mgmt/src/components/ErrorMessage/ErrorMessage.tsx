import React from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import "./ErrorMessage.css";

interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage = ({
  message = "Error loading products, please try again",
}: ErrorMessageProps) => {
  return (
    <div className="error-container">
      <XCircleIcon className="size-15 text-red-700" />
      <p>{message}</p>
    </div>
  );
};
