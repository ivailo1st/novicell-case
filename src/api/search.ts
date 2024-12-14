export enum SortingType {
  ascending = "asc",
  descending = "desc",
}

export interface SearchQuery {
  sort: SortingType;
  limit?: string;
  page?: number;
  category?: string;
}

interface RatingResponse {
  rate: number;
  count: number;
}

export interface ProductResultResponse {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: RatingResponse;
  title: string;
}

export interface FilterResponse {
  filterId: string;
  filterName: string;
  filterValues: string[];
}

export const getCategories = () => {
  return fetch("https://fakestoreapi.com/products/categories").then((res) =>
    res.json()
  );
};

export const search = (query: SearchQuery) => {
  const urlParams = new URLSearchParams();
  urlParams.append("sort", query.sort);
  urlParams.append("limit", query.limit ?? "30");

  if (query.category) {
    return fetch(
      `https://fakestoreapi.com/products/category/${query.category}?${urlParams}`
    ).then((res) => res.json());
  }

  return fetch(`https://fakestoreapi.com/products?${urlParams}`).then((res) =>
    res.json()
  );
};
