import React from "react";
import "./ShoppingCart.css";
import { CartResponse, getCurrentCart } from "../../api/cart";
import { Link } from "react-router";

export const ShoppingCart: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [cartInfo, setCartInfo] = React.useState<CartResponse>();

  React.useEffect(() => {
    setIsLoading(true);
    getCurrentCart().then((data) => {
      setCartInfo(data[0]);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <section className="cartLoading">
        <h1>Fetching cart...</h1>
      </section>
    );
  }

  if (!cartInfo) {
    return (
      <section className="cartPage">
        <div>
          <h1>Your cart is currently empty</h1>
          <Link to="/productList">
            Go to the product list to add some products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cartPage">
      <h1>Your cart</h1>
      <div className="cartProducts">
        {cartInfo?.products?.map((product) => {
          return (
            <div className="cartProduct">
              <span>Product Id: {product.productId}</span>
              <span>Product Quantity: {product.quantity}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
