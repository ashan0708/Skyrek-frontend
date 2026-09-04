import { Routes, Route, Link } from "react-router-dom";
import { FaShoppingCart, FaBox, FaUsers } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utils/api";
import LoadingScreen from "./admin/LoadingScreen";


import AdminOrdersPage from "./admin/adminOrdersPage";
import AdminProductPage from "./admin/AdminProductPage";
import AdminAddProductForm from "./admin/adminAddProductForm";
import AdminEditProductForm from "./admin/adminEditProductForm";
import AdminUsersPage from "./admin/adminUsersPage";

export default function AdminPage() {
   const [user, setUser] = useState(null);
   const navigate = useNavigate();
      
      useEffect(() => {
          const token = localStorage.getItem("token");
          
  
          if (!token) {
              setUser(null);
              toast.error("You are not authorized to access this page");
              navigate("/signin");
              return;
          }
  
          api.get("/users/me", {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          })
          .then((res) => {
              if(res.data.isAdmin){
                setUser(res.data);
              }else{
                toast.error("You are not authorized to access this page");
                navigate("/signin");
              }
          })
          .catch((err) => {
              console.log("User fetch error:", err);
              setUser(null);
              toast.error("You are not authorized to access this page");
              navigate("/signin");
          });
      }, [])

  return (

    <div className="w-full h-screen flex bg-gray-100">

      {/* Sidebar */}

      <div className="w-[300px] h-full bg-white flex flex-col shadow-2xl">

        {/* Logo */}

        <div className="w-full h-[100px] py-4 px-2">

          <img
            src="/image.png"
            className="h-full object-contain"
          />

        </div>


        {/* Orders */}

        <Link
          to="/admin"
          className="w-full p-4 text-xl text-gray-500 flex items-center gap-4 hover:bg-gray-100"
        >

          <FaShoppingCart />

          <span>
            Orders
          </span>

        </Link>


        {/* Products */}

        <Link
          to="/admin/products"
          className="w-full p-4 text-xl text-gray-500 flex items-center gap-4 hover:bg-gray-100"
        >

          <FaBox />

          <span>
            Products
          </span>

        </Link>


        {/* Users */}

        <Link
          to="/admin/users"
          className="w-full p-4 text-xl text-gray-500 flex items-center gap-4 hover:bg-gray-100"
        >

          <FaUsers />

          <span>
            Users
          </span>

        </Link>

      </div>


      {/* Content */}

      <div className="flex-1 h-full p-6">

        {user == null?<LoadingScreen/>:
        <Routes>

          {/* Orders */}

          <Route
            path="/"
            element={<AdminOrdersPage />}
          />


          {/* Products */}

          <Route
            path="products"
            element={<AdminProductPage />}
          />


          {/* Add Product */}

          <Route
            path="add-product"
            element={<AdminAddProductForm />}
          />


          {/* Edit Product */}

          <Route
            path="edit-product/:productId"
            element={<AdminEditProductForm />}
          />


          {/* Users */}

          <Route
            path="users"
            element={<AdminUsersPage />}
          />
          </Routes>}

      </div>

    </div>
  );
}