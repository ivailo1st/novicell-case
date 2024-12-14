import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./FeaturedProducts.css";
import {
  ProductResultResponse,
  search,
  SearchQuery,
  SortingType,
} from "../../api/search";
import { ProductCard } from "../ProductCard/ProductCard";
import { Link } from "react-router";
import { Image } from "../shared/Image/Image";

export const FeaturedProducts: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [featuredProducts, setFeaturedProducts] = React.useState<
    ProductResultResponse[]
  >([]);

  const [query] = React.useState<SearchQuery>({
    sort: SortingType.descending,
    limit: "8",
  });

  const carouselResponsive = {
    allSizes: {
      breakpoint: { min: 0, max: 3000 },
      items: 1,
    },
  };

  React.useEffect(() => {
    setIsLoading(true);
    search(query).then((data) => {
      setFeaturedProducts(data);
      setIsLoading(false);
    });
  }, [query]);

  if (isLoading) {
    return (
      <section className="featureProductsLoading">
        Fetching featured products...
      </section>
    );
  }

  return (
    <section className="featuredProductsContainer">
      <Carousel
        responsive={carouselResponsive}
        infinite
        showDots
        itemClass="carouselItem"
      >
        {featuredProducts.slice(0, 3).map((product) => {
          return (
            <Link
              to={`/productDetail/${product.id}`}
              className="featuredProductImageWrapper"
            >
              <Image
                key={`featuredImage-${product.id}`}
                className="featuredProductImage"
                src={product.image}
                altText={product.title}
                isLazy
              />
            </Link>
          );
        })}
      </Carousel>
      <div className="featuredProductList">
        {featuredProducts.slice(3).map((product) => {
          return <ProductCard key={product.id} {...product} />;
        })}
      </div>
    </section>
  );
};
