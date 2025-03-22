"use client";
import { useEffect, useState } from "react";
import _ from "lodash";
import { QuantityPerProductType } from "@/types/products_summary";
import { Header } from "@/components/Header/Header";
import { ProductsSummary } from "@/components/ProductsSummary/ProductsSummary";
import { Products } from "@/components/Products/Products";
import { useProductsSummary } from "@/hooks/useProductsSummary";
import "./Inventory.css";

export const Inventory = () => {
  const {
    data: productsSummary,
    isLoading: isLoadingProductsSummary,
    isError: isErrorProductsSummary,
  } = useProductsSummary();

  const [selectedProduct, setSelectedProduct] =
    useState<QuantityPerProductType | null>(null);

  // Init the selected product to the first item once the data is loaded
  useEffect(() => {
    if (productsSummary?.quantities.length && _.isEmpty(selectedProduct)) {
      setSelectedProduct(productsSummary.quantities[0]);
    }
  }, [productsSummary, selectedProduct, setSelectedProduct]);

  const handleProductClicked = (product: QuantityPerProductType) =>
    setSelectedProduct(product);

  return (
    <div className="inventory-container">
      <Header />
      <div className="inventory-content">
        <div className="left-side">
          <ProductsSummary
            items={productsSummary?.quantities}
            selectedItem={selectedProduct}
            onItemClick={handleProductClicked}
            isLoading={isLoadingProductsSummary}
            isError={isErrorProductsSummary}
          />
        </div>
        <div className="right-side">
          <Products productType={selectedProduct?.type} />
        </div>
      </div>
    </div>
  );
};
