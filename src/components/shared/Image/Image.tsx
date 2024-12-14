import React from "react";

interface ImageProps {
  src: string;
  altText: string;
  isLazy?: boolean;
  className?: string;
  widthInRem?: `${number}rem`;
  heightInRem?: `${number}rem`;
}

export const Image: React.FC<ImageProps> = ({
  src,
  altText,
  className,
  isLazy,
  widthInRem,
  heightInRem,
}) => {
  return (
    <picture className={className}>
      <img
        src={src}
        loading={isLazy ? "lazy" : undefined}
        alt={altText}
        width={widthInRem}
        height={heightInRem}
      />
    </picture>
  );
};
