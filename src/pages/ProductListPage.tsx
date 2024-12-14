import React from "react";
import { Page } from "./_page.partial";
import { ProductList } from "../components/ProductList/ProductList";
import { useParams, useSearchParams } from "react-router";
import {
  SearchQuery,
  ProductResultResponse,
  FilterResponse,
  search,
  SortingType,
  getCategories,
} from "../api/search";

export const ProductListPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const { categoryId } = useParams();
  const [categories, setCategories] = React.useState<string[]>([]);
  const [query, setQuery] = React.useState<SearchQuery>({
    sort: (searchParams.get("sort") as SortingType) || "desc",
    limit: "30",
    page: 1,
    category: categoryId,
  });
  const [products, setProducts] = React.useState<ProductResultResponse[]>([]);
  const [dummyIsDisabledState, setDummyIsDisabledState] = React.useState(false);

  const dummyFilters: FilterResponse[] = React.useMemo(
    () => [
      {
        filterId: "sort",
        filterName: "sorting",
        filterValues: ["asc", "desc"],
      },
    ],
    []
  );

  const canFetchMore =
    !isLoading && !dummyIsDisabledState && products?.length > 0;

  React.useEffect(() => {
    setIsLoading(true);
    search(query).then((data) => {
      if (query.page && query.page > 1) {
        setProducts((prev) => [...prev, ...data]);
      } else {
        setProducts(data);
      }

      setIsLoading(false);

      //SetDummyDisabledState after page 3
      if (query.page && query.page > 3) {
        setDummyIsDisabledState(true);
      }
    });
  }, [query]);

  React.useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  React.useEffect(() => {
    if (query.category === categoryId) return;

    setQuery((prev) => {
      return { ...prev, category: categoryId, page: 1 };
    });
  }, [categoryId, query.category]);

  React.useEffect(() => {
    if (!canFetchMore) return;

    const filtersToUpdate: object[] = [];
    searchParams.forEach((paramValue, paramKey) => {
      const index = dummyFilters.findIndex(
        (filter) => filter.filterId === paramKey
      );
      if (index === -1) return;

      filtersToUpdate.push({ [paramKey]: paramValue });
    });

    if (!filtersToUpdate.length) return;

    //Due to mockup data this will only setup the sorting instead of having it setup the whole array
    const sorting = filtersToUpdate[0];

    setQuery((prev) => {
      return { ...prev, ...sorting, page: 1 };
    });
    // Eslint disabled due to mock up data missing disabled state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dummyFilters, searchParams]);

  const handleGetNextPage = () => {
    if (!canFetchMore) return;
    setQuery((prev) => {
      return { ...prev, page: (prev.page ?? 1) + 1 };
    });
  };

  return (
    <Page>
      <ProductList
        filters={dummyFilters}
        canFetchMore={canFetchMore}
        handleGetNextPage={handleGetNextPage}
        isLoading={isLoading}
        products={products}
        categories={categories}
      />
    </Page>
  );
};
