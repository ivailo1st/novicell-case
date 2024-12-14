import React from "react";
import { MemorizedHeader } from "../components/Header/Header";
import { MemorizedFooter } from "../components/Footer/Footer";

interface PageProps {
  children?: React.ReactNode;
}

export const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <>
      <MemorizedHeader />
      <main>{children}</main>
      <MemorizedFooter />
    </>
  );
};
