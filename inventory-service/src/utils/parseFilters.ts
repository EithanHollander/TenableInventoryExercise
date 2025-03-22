import { convertValue } from "./convertValue";

export const parseFilters = (filtersStr: string) => {
  /* filters string structure is such:
    ?filters=field1:value1,value2,value3|field2:value4,value5,value6|field3:...
    */
  return filtersStr.split("|").reduce((acc, filter) => {
    const [key, values] = filter.split(":");
    if (key && values) {
      const parsedValues = values
        .split(",")
        .map((value) => convertValue(decodeURIComponent(value)));
      acc[key] = parsedValues;
    }
    return acc;
  }, {} as Record<string, (string | number | boolean)[]>);
};
