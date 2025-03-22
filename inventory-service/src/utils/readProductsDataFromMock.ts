import fs from "fs";
import path from "path";

export const readProductsDataFromMock = async (productType: string) => {
  const filePath = path.join(__dirname, "..", "data", `${productType}.json`);
  try {
    const data = await fs.promises.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(
      `ERROR: Couldn't read products from mock file of product ${productType}`
    );
    throw new Error(
      `ERROR: Couldn't read products from mock file of product ${productType}`
    );
  }
};
