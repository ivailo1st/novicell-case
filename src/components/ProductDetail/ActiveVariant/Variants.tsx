import React from "react";
import "./Variants.css";
import { useSearchParams } from "react-router";
import { Image } from "../../shared/Image/Image";

export interface Variant {
  id: string;
  src: string;
}

interface VariantsProps {
  variants: Variant[];
  initalActiveVariantId?: string;
}

export const Variants: React.FC<VariantsProps> = ({
  variants,
  initalActiveVariantId,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeVariant, setActiveVariant] = React.useState(
    initalActiveVariantId || variants[0].id
  );

  const handleClick = (id: string): void => {
    if (activeVariant === id) return;

    const updatedParams = new URLSearchParams(searchParams.toString());

    updatedParams.set("activeVariantId", id);

    setSearchParams(updatedParams);

    setActiveVariant(id);
  };

  return (
    <div className="variantList">
      {variants.map((variant) => {
        return (
          <button
            key={variant.id}
            onClick={(): void => handleClick(variant.id)}
            className={
              activeVariant === variant.id ? "activeVariant variant" : "variant"
            }
          >
            <Image
              className="variantImage"
              src={variant.src}
              altText={variant.id}
            />
          </button>
        );
      })}
    </div>
  );
};
