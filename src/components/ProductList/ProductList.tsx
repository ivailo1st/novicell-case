import React from "react";
import "./ProductList.css";
import { ProductCard } from "../ProductCard/ProductCard";
import { InfiniteScroll } from "../shared/infiniteScroll/InfiniteScroll";
import { Filters } from "./Filters/Filters";
import { FilterResponse, ProductResultResponse } from "../../api/search";
import { Link } from "react-router";

interface ProductListProps {
  filters: FilterResponse[];
  products: ProductResultResponse[];
  canFetchMore: boolean;
  isLoading: boolean;
  categories: string[];
  handleGetNextPage: () => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  filters,
  products,
  canFetchMore,
  isLoading,
  categories,
  handleGetNextPage,
}) => {
  return (
    <section className="productListContainer">
      <h1>Product list page</h1>

      <Filters filters={filters} />
      <div className="productListWrapper">
        <div className="productListCategories">
          {categories.map((category) => {
            return (
              <Link key={category} to={`/productList/category/${category}`}>
                {category}
              </Link>
            );
          })}
        </div>
        <div className="productListInfo">
          <div className="productList">
            {products.map((product) => {
              return (
                <ProductCard
                  key={`${product.id}-${Math.random()}`}
                  {...product}
                />
              );
            })}
          </div>

          {canFetchMore && (
            <InfiniteScroll
              fetchMore={handleGetNextPage}
              canFetchMore={canFetchMore}
            />
          )}

          {isLoading && (
            <div className="productListLoadingState">
              <p>Fetching More Products...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
