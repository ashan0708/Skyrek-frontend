import { Route, Routes } from 'react-router-dom'
import Header from '../components/header'
import ProductsPage from './productsPage'
import ProductOverview from './admin/productOverview'
import CartPage from './cartPage'
import CheckoutPage from "./checkout";
import MyOrders from "./myOrders";
import Settings from "./settings";

export default function HomePage() {
  return (
    <div className="w-full h-full bg-primary text-secondary">

      <Header />

      <Routes>
        <Route index element={<></>} />

        <Route path="products" element={<ProductsPage />} />

        <Route path="contact-us" element={<h1>Contact Us Page</h1>} />

        <Route path="about-us" element={<h1>About-Us</h1>} />

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