import { Request, Response } from "express";
import { ProductModel } from "../models/Product";
import { parseFilters } from "../utils/parseFilters";
import { buildAvailableFilters } from "../utils/buildAvailableFilters";

export const getProductFilters = async (
  req: Request<{}, {}, {}, { product_type: string }>,
  res: Response
) => {
  const { product_type: productType } = req.query;

  try {
    const products = await ProductModel.find({
      type: productType,
    }).lean();

    const availableFilters = buildAvailableFilters(products);
    res.json({ filters: availableFilters });
  } catch (error) {
    console.error(`Error reading data for ${productType}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProductsSummary = async (req: Request, res: Response) => {
  try {
    const quantities = await ProductModel.aggregate([
      {
        $group: {
          _id: "$type",
          quantity: { $sum: 1 },
        },
      },
      {
        $project: {
          type: "$_id",
          quantity: 1,
          _id: 0,
        },
      },
      {
        $sort: { type: 1 },
      },
    ]);
    res.json({ quantities });
  } catch (error) {
    console.error("Error summarizing products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProducts = async (
  req: Request<
    {},
    {},
    {},
    {
      product_type: string;
      limit?: string;
      page?: string;
      sortby_field?: string;
      sortby_order?: "ASC" | "DESC";
      filters?: string;
    }
  >,
  res: Response
) => {
  const {
    product_type: productType,
    limit = "20",
    page = "1",
    sortby_field: sortByField = "",
    sortby_order: sortByOrder = "ASC",
    filters = "",
  } = req.query;

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);

  try {
    // Build the base MongoDB query for filtering
    let relevantProductsQuery: Record<string, any> = { type: productType };

    if (filters) {
      // Parse the filters and add them to the query
      const filtersObj = parseFilters(filters);
      for (const [key, values] of Object.entries(filtersObj)) {
        relevantProductsQuery[key] = { $in: values };
      }
    }

    // MongoDB query to find the products with all requirements
    let productsMongoQuery = ProductModel.find(relevantProductsQuery).select(
      "-_id -__v"
    );

    // Sorting if the sort field is provided
    if (sortByField) {
      const sortOrder = sortByOrder === "ASC" ? 1 : -1; // 1 for ascending, -1 for descending
      productsMongoQuery = productsMongoQuery.sort({
        [sortByField]: sortOrder,
      });
    }

    // Pagination (skip + limit)
    productsMongoQuery = productsMongoQuery
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    // Execute the query and get the products
    const productsResult = await productsMongoQuery;

    // Get the total count of products to calculate the next page
    const totalRelevantProductsCount = await ProductModel.countDocuments(
      relevantProductsQuery
    );
    const processedRelevantProductsCount =
      (pageNum - 1) * limitNum + productsResult.length;

    const nextPage =
      processedRelevantProductsCount < totalRelevantProductsCount
        ? pageNum + 1
        : null;

    // Return paginated response
    res.json({
      products: productsResult,
      nextPage,
    });
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
