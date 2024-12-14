import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { FrontPage } from "./pages/FrontPage.tsx";
import { ProductListPage } from "./pages/ProductListPage.tsx";
import { ProductDetailPage } from "./pages/ProductDetailPage.tsx";
import { ShoppingCartPage } from "./pages/ShoppingCartPage.tsx";
import { AboutUsPage } from "./pages/AboutUsPage.tsx";
import { ContactPage } from "./pages/ContactPage.tsx";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="productList" element={<ProductListPage />} />
      <Route
        path="productList/category/:categoryId"
        element={<ProductListPage />}
      />
      <Route path="productDetail/:id" element={<ProductDetailPage />} />
      <Route path="shoppingCart" element={<ShoppingCartPage />} />
      <Route path="aboutUs" element={<AboutUsPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="privacyPolicy" element={<PrivacyPolicyPage />} />
    </Routes>
  </BrowserRouter>
);
