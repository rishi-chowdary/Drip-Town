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
import CloudinaryUpload from "./components/CloudinaryUpload";
import AuthPage from "./pages/AuthPage";
import TrackOrders from "./pages/TrackOrders";
import Wishlist from "./pages/Wishlist";
import Coupons from "./pages/Coupons";
import HelpCentre from "./pages/HelpCentre";
import SavedAddresses from "./pages/SavedAddresses";
import SavedCards from "./pages/SavedCards";
import AdminDashboard from "./pages/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/auth",
    Component: AuthPage,
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
  {
    path: "/admin/upload",
    Component: CloudinaryUpload,
  },
  {
    path: "/admin/dashboard",
    Component: AdminDashboard,
  },
  {
    path: "/profile/orders",
    Component: TrackOrders,
  },
  {
    path: "/profile/wishlist",
    Component: Wishlist,
  },
  {
    path: "/profile/coupons",
    Component: Coupons,
  },
  {
    path: "/profile/addresses",
    Component: SavedAddresses,
  },
  {
    path: "/profile/cards",
    Component: SavedCards,
  },
  {
    path: "/help",
    Component: HelpCentre,
  },
]);