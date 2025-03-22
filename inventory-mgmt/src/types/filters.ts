import { AllPossibleProductFields } from "./product";

export type Filters = Partial<Record<AllPossibleProductFields, string[]>>;

export interface FilterResponse {
  filters: Filters;
}
