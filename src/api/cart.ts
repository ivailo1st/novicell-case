export interface CartProductResponse {
  productId: number;
  quantity: number;
}

export interface CartResponse {
  id: number;
  userId: number;
  date: Date;
  products: CartProductResponse[];
}

export interface UpdateCartRequest {
  userId: number;
  date: Date;
  products: CartProductResponse[];
}

export const getCurrentCart = () => {
  return fetch("https://fakestoreapi.com/carts/user/1").then((res) =>
    res.json()
  );
};

export const addToCart = (query: UpdateCartRequest) => {
  return fetch("https://fakestoreapi.com/carts", {
    method: "POST",
    body: JSON.stringify(query),
  }).then((res) => res.json());
};
