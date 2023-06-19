import React from "react";
import { Header } from "../common/Header/Header.component";
import { Footer } from "../common/Footer/Footer.component";

import "./Layouts.scss";

export const Layouts: React.FC<any> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};
