import React from "react";
import { ProductResultResponse } from "../../api/search";
import "./ProductCard.css";
import { Link } from "react-router";
import { Image } from "../shared/Image/Image";

export const ProductCard: React.FC<ProductResultResponse> = ({
  category,
  image,
  title,
  id,
}) => {
  return (
    <div className="productCard">
      <Link to={`/productDetail/${id}`} className="productCardImageWrapper">
        <Image
          className="productCardImage"
          src={image}
          altText={title}
          isLazy
        />
      </Link>
      <div className="productCardInfo">
        <Link to={`/productDetail/${id}`}>
          <span>{title}</span>
        </Link>
        <span>{category}</span>
      </div>
    </div>
  );
};
