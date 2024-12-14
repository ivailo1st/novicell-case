import React from "react";
import "./Footer.css";
import { Link } from "react-router";

const Footer: React.FC = () => {
  return (
    <footer className="footerContainer">
      <ul className="pageLinks">
        <li>
          <Link to="/aboutUs">About us</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/privacyPolicy">Privacy Policy</Link>
        </li>
      </ul>
      <ul className="socialMediaLinks">
        <li>Twitter link</li>
        <li>Facebook link</li>
        <li>Instagram link</li>
      </ul>
    </footer>
  );
};

export const MemorizedFooter = React.memo(Footer);
