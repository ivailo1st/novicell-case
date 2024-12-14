import React from "react";
import { Page } from "./_page.partial";
import { ProductDetail } from "../components/ProductDetail/ProductDetail";
import { getProduct } from "../api/product";
import { ProductResultResponse } from "../api/search";
import { Link, useParams } from "react-router";

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [productData, setProductData] = React.useState<ProductResultResponse>();

  React.useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    getProduct(id).then((data) => {
      setProductData(data);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) {
    return (
      <Page>
        <section>
          <h1>Fetching product...</h1>
        </section>
      </Page>
    );
  }

  if (!productData) {
    return (
      <Page>
        <section>
          <h1>Couldnt find specified product</h1>
          <Link to="/">Go back to FrontPage</Link>
        </section>
      </Page>
    );
  }

  return (
    <Page>
      <ProductDetail {...productData} />
    </Page>
  );
};
