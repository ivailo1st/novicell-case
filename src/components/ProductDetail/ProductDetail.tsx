import React from "react";
import "./ProductDetail.css";
import { ProductResultResponse } from "../../api/search";
import { addToCart, UpdateCartRequest } from "../../api/cart";
import { useSearchParams } from "react-router";
import { Variant, Variants } from "./ActiveVariant/Variants";
import { Image } from "../shared/Image/Image";

export const ProductDetail: React.FC<ProductResultResponse> = ({
  image,
  title,
  description,
  id,
}) => {
  const [message, setMessage] = React.useState({
    text: "",
    isSuccesful: false,
  });

  const testVariantData: Variant[] = [
    {
      id: "1",
      src: "https://picsum.photos/200",
    },
    {
      id: "2",
      src: "https://picsum.photos/200",
    },
    {
      id: "3",
      src: "https://picsum.photos/200",
    },
  ];

  const [searchParams] = useSearchParams();
  const initialVariant = searchParams.get("activeVariantId") ?? "";

  const handleAddToCart = () => {
    const addToCartQuery: UpdateCartRequest = {
      userId: 1,
      date: new Date(),
      products: [{ productId: id, quantity: 1 }],
    };
    addToCart(addToCartQuery)
      .then(() => {
        setMessage({
          text: "Successfully added product to cart",
          isSuccesful: true,
        });
        setTimeout(() => setMessage({ text: "", isSuccesful: false }), 1500);
      })
      .catch(() => {
        setMessage({
          text: "Couldnt successfully add product to cart",
          isSuccesful: false,
        });
      });
  };

  return (
    <section className="productDetailPage">
      <Image className="productDetailImage" src={image} altText={title} />
      <div className="productInfoWrapper">
        <div className="productInfo">
          <span>{title}</span>
          <span>{description}</span>
        </div>
        <Variants
          variants={testVariantData}
          initalActiveVariantId={initialVariant}
        />
        <div className="addToCartButtonWrapper">
          <button onClick={handleAddToCart} className="addToCartButton">
            Add to cart
          </button>
          {message.text && (
            <span
              className={
                message.isSuccesful ? "successMessage" : "errorMessage"
              }
            >
              {message.text}
            </span>
          )}
        </div>
      </div>
    </section>
  );
};
