import React from "react";
import "./Header.css";
import { Link } from "react-router";
import logo from "../../assets/logo.svg";

const Header: React.FC = () => {
  return (
    <header className="headerContainer">
      <Link to="/" title="Go to front page">
        <img className="logo" src={logo} alt="Main Logo" />
      </Link>
      <nav className="navigation">
        <Link to="/productList" title="Go to product list page">
          Product list
        </Link>
        <Link to="/shoppingCart" title="Go to shopping cart page">
          Shopping Cart
        </Link>
      </nav>
    </header>
  );
};

export const MemorizedHeader = React.memo(Header);
