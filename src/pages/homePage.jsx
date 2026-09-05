import { Route, Routes } from 'react-router-dom'
import Header from '../components/header'
import ProductsPage from './productsPage'
import ProductOverview from './admin/productOverview'
import CartPage from './cartPage'
import CheckoutPage from "./checkout";
import MyOrders from "./myOrders";
import Settings from "./settings";
import Landing from "./landingComponents"
import CustomerReviews from "../components/CustomerReviews";
import ContactUs from "./contactUs";
import AboutUs from "./aboutUs";

export default function HomePage() {
  return (
    <div className="w-full h-full bg-primary text-secondary overflow-y-auto">

      <Header />

      <Routes>
         <Route
          index
          element={
            <>
              <Landing />
              <CustomerReviews />
            </>
          }
        />
        <Route index element={<Landing/>} />

        <Route path="products" element={<ProductsPage />} />
       

        <Route path="contact-us" element={<ContactUs />} />

       <Route path="about-us" element={<AboutUs />} />

        <Route path="overview/:productId" element={<ProductOverview />} />

        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />

        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="my-orders" element={<MyOrders />} />
        <Route path="/settings" element={<Settings/>}/>
      </Routes>

    </div>
  )
}