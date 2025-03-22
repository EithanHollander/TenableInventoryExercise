export const convertValue = (value: string): string | number | boolean => {
  // Try to convert to number
  const numberValue = Number(value);
  if (!isNaN(numberValue)) return numberValue;

  // Try to convert to boolean
  if (value === "true") return true;
  if (value === "false") return false;

  // Return as string if no conversion is possible
  return value;
};
