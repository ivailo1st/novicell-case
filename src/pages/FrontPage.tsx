import React from "react";
import { Page } from "./_page.partial";
import { FeaturedProducts } from "../components/FeaturedProducts/FeaturedProducts";

export const FrontPage: React.FC = () => {
  return (
    <Page>
      <FeaturedProducts />
    </Page>
  );
};
