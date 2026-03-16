import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import Accessories from "./pages/Accessories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/product/:id",
    Component: ProductPage,
  },
  {
    path: "/category/:category",
    Component: CategoryPage,
  },
  {
    path: "/accessories",
    Component: Accessories,
  },
  {
    path: "/about",
    Component: About,
  },
  {
    path: "/contact",
    Component: Contact,
  },
  {
    path: "/cart",
    Component: Cart,
  },
  {
    path: "/checkout",
    Component: Checkout,
  },
  {
    path: "/terms",
    Component: Terms,
  },
  {
    path: "/privacy",
    Component: Privacy,
  },
  {
    path: "/refund-policy",
    Component: RefundPolicy,
  },
  {
    path: "/shipping-policy",
    Component: ShippingPolicy,
  },
]);