import React from "react";
import { Dropdown } from "../../../shared/Dropdown/Dropdown";
import { FilterResponse } from "../../../../api/search";
import "./Filter.css";

interface FilterProps extends FilterResponse {
  handleValueChange: (id: string, value: string) => void;
}

export const Filter: React.FC<FilterProps> = ({
  filterId,
  filterName,
  filterValues,
  handleValueChange,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = (id: string, value: string): void => {
    handleValueChange(id, value);
    setIsOpen(false);
  };

  return (
    <Dropdown
      buttonContent={filterName}
      openState={isOpen}
      setIsDropdownOpen={setIsOpen}
    >
      {filterValues.map((value) => {
        return (
          <button
            className="filterOption"
            key={`${filterId}-${value}`}
            onClick={(): void => handleClick(filterId, value)}
          >
            {value}
          </button>
        );
      })}
    </Dropdown>
  );
};
