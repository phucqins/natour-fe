import React from "react";
import { BrowserRouter } from "react-router-dom";

import Paths from "../routes/Paths";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <BrowserRouter>
      <Header />
      <Paths />
      <Footer />
    </BrowserRouter>
  );
};

export default Layout;
