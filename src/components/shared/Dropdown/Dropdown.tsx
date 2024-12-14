import React from "react";
import "./Dropdown.css";

interface DropdownProps {
  openState: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  buttonContent?: React.ReactNode | string;
  children?: React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({
  openState,
  setIsDropdownOpen,
  children,
  buttonContent,
}) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleToggleState = (): void => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="dropdownWrapper">
      <button
        ref={buttonRef}
        className="dropdown button"
        onClick={handleToggleState}
      >
        {buttonContent}
      </button>

      {openState && (
        <div
          className={"dropdown"}
          style={
            {
              "--top-offset": `${buttonRef.current?.clientHeight}px`,
            } as React.CSSProperties
          }
        >
          {children}
        </div>
      )}
    </div>
  );
};
