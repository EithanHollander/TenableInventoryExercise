import { AllPossibleProductFields } from "./product";

export type SortByOrder = "ASC" | "DESC";
export interface SortBy {
  field: AllPossibleProductFields;
  order: SortByOrder;
}
