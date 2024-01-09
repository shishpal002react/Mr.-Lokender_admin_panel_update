/** @format */

import { Routes, Route } from "react-router-dom";
import Login from "./E-CommerceAdmin/forms/Login";
import Dashboard from "./E-CommerceAdmin/pages/Dashboard/Dashboard";
import ECategory from "./E-CommerceAdmin/pages/Category/ECategory";
import EProduct from "./E-CommerceAdmin/pages/Products/EProduct";
import EVendorList from "./E-CommerceAdmin/pages/Seller/EVendorList";
import EAdminOrders from "./E-CommerceAdmin/pages/Orders/EAdminOrders";
import EAdminDelivery from "./E-CommerceAdmin/pages/Support/EAdminDelivery";
import EAdminCustomer from "./E-CommerceAdmin/pages/Customer/EAdminCustomer";
import ESubCategory from "./E-CommerceAdmin/pages/SubCategory/ESubCategory";
import PushNotification from "./E-CommerceAdmin/pages/Notification/PushNotification";
import Banners from "./E-CommerceAdmin/pages/Banner/Banners";
import Coupon from "./E-CommerceAdmin/pages/Coupon/Coupon";
import PrivacyPolicy from "./E-CommerceAdmin/pages/PrivacyPolicy/PrivacyPolicy";
import Terms from "./E-CommerceAdmin/pages/Terms/Terms";
import ViewProduct from "./E-CommerceAdmin/pages/Products/ViewProduct";
import SellerProducts from "./E-CommerceAdmin/pages/Seller/SellerProducts";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import SellerLogin from "./SellerPanel/forms/SellerLogin";
import SellerDashboard from "./SellerPanel/pages/Dashboard/SellerDashboard";
import SellerCategory from "./SellerPanel/pages/Category/SellerCategory";
import SellerPanelProducts from "./SellerPanel/pages/Products/SellerPanelProducts";
import SellerViewProduct from "./SellerPanel/pages/Products/SellerViewProduct";
import SellerSubCategory from "./SellerPanel/pages/SubCategory/SellerSubCategory";
import SellerOrders from "./SellerPanel/pages/Orders/sellerOrders";
import CustomerQuery from "./E-CommerceAdmin/pages/CustomerQueary/CustomerQuery";
import ProductSingleView from "./E-CommerceAdmin/pages/Seller/ProductSingleView";
import Footer_Data from "./E-CommerceAdmin/pages/Footer_data/Footer_Data";
import SalesAnlysis from "./E-CommerceAdmin/pages/SalesAnalyis/SalesAnlysis";
import SingleOrder from "./E-CommerceAdmin/pages/Orders/SingleOrder";

function App() {
  return (
    <>
      <ReactNotifications />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Customer" element={<EAdminCustomer />} />
        <Route path="/VendorList" element={<EVendorList />} />
        <Route path="/Product" element={<EProduct />} />
        <Route path="/single_product/:id" element={<ViewProduct />} />
        <Route path="/Category" element={<ECategory />} />
        <Route path="/SubCategory" element={<ESubCategory />} />
        <Route path="/pushNotification" element={<PushNotification />} />
        <Route path="/banner" element={<Banners />} />
        <Route path="/coupon" element={<Coupon />} />
        <Route path="/Support" element={<EAdminDelivery />} />
        <Route path="/Orders" element={<EAdminOrders />} />
        <Route path="/Orders/single/:id" element={<SingleOrder />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/sales_detail" element={<SalesAnlysis />} />
        <Route path="/seller/product/:id" element={<SellerProducts />} />
        <Route
          path="/seller/single/product/:id"
          element={<ProductSingleView />}
        />
        <Route path="/customerquery" element={<CustomerQuery />} />
        <Route path="/footer/data" element={<Footer_Data />} />

        {/* Selller */}
        <Route path="/sellerLogin" element={<SellerLogin />} />
        <Route path="/sellerDashboard" element={<SellerDashboard />} />
        <Route path="/sellerCategory" element={<SellerCategory />} />
        <Route path="/SellerProducts" element={<SellerPanelProducts />} />
        <Route
          path="/SellerProducts/product/:name"
          element={<SellerViewProduct />}
        />
        <Route path="/seller/subCategory" element={<SellerSubCategory />} />
        <Route path="/seller/orders" element={<SellerOrders />} />
      </Routes>
    </>
  );
}

export default App;
