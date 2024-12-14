import React from "react";
import "./Filters.css";
import { FilterResponse } from "../../../api/search";
import { Filter } from "./Filter/Filter";
import { useSearchParams } from "react-router";

interface FiltersProps {
  filters: FilterResponse[];
}

export const Filters: React.FC<FiltersProps> = ({ filters }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleValueChange = (id: string, value: string) => {
    const updatedParams = new URLSearchParams(searchParams.toString());

    updatedParams.set(id, value);

    setSearchParams(updatedParams);
  };

  return (
    <div>
      {filters.map((filter) => {
        return (
          <Filter
            key={filter.filterId}
            {...filter}
            handleValueChange={handleValueChange}
          />
        );
      })}
    </div>
  );
};
