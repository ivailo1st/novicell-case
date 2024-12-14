import React from "react";
import { ShoppingCart } from "../components/ShoppingCart/ShoppingCart";
import { Page } from "./_page.partial";

export const ShoppingCartPage: React.FC = () => {
  return (
    <Page>
      <ShoppingCart />
    </Page>
  );
};
