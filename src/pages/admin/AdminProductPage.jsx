import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import toast from "react-hot-toast";
import LoadingScreen from "./LoadingScreen";
import ProductDeleteButton from "./ProductDeleteButton";
import { CiEdit } from "react-icons/ci";
import getFormattedPrice from "../../utils/price-formatter";
import OrderDataModal from "../../components/orderDataModal";

const sampleProducts = [
  {
    productId: "PRD001",
    name: "Logitech G102 Lightsync Gaming Mouse",
    price: 8500,
    labelledprice: 9900,
    brand: "Logitech",
    model: "G102",
    category: "Mouse",
    isAvailable: true,
    stock: 25,
    images: []
  },
  {
    productId: "PRD002",
    name: "Corsair Vengeance LPX 16GB DDR4 RAM",
    price: 16500,
    labelledprice: 18500,
    brand: "Corsair",
    model: "Vengeance LPX",
    category: "RAM",
    isAvailable: true,
    stock: 18,
    images: []
  },
  {
    productId: "PRD003",
    name: "Samsung 980 500GB NVMe SSD",
    price: 14500,
    labelledprice: 16000,
    brand: "Samsung",
    model: "980 500GB",
    category: "Storage",
    isAvailable: true,
    stock: 12,
    images: []
  },
  {
    productId: "PRD004",
    name: "ASUS TUF Gaming B550M-PLUS Motherboard",
    price: 13850,
    labelledprice: 14200,
    brand: "ASUS",
    model: "B550M-PLUS",
    category: "Motherboard",
    isAvailable: true,
    stock: 7,
    images: []
  },
  {
    productId: "PRD0011",
    name: "NVIDIA GeForce RTX 4060 8GB",
    price: 145000,
    labelledprice: 155000,
    brand: "NVIDIA",
    model: "RTX 4060",
    category: "Graphics Card",
    isAvailable: true,
    stock: 10,
    images: []
  }
];

export default function AdminProductPage() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/products", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("API RESPONSE:", res.data);

        const data = res.data?.products || res.data || [];

        console.log("PRODUCTS:", data);
        console.log("PRODUCT COUNT:", data.length);

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }

      } catch (error) {
        console.log("Product loading error:", error);
        console.log("Backend error:", error.response?.data);

        toast.error(
          error.response?.data?.message ||
          "Failed to load products"
        );

        setProducts([]);

      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const deleteProduct = async (productId) => {

    try {

      const token = localStorage.getItem("token");

      await api.delete(
        `/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) =>
            product.productId !== productId
        )
      );

      toast.success(
        "Product deleted successfully"
      );

    } catch (error) {

      console.log(
        "Delete error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to delete product"
      );
    }
  };

  return (

    <div className="w-full h-full relative">

      {loading && <LoadingScreen />}

      <div className="w-full bg-white rounded-lg shadow-md p-4 mb-4">

        <h1 className="text-2xl font-bold text-gray-800">
          All Products
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your products
        </p>

      </div>

      <div className="w-full bg-white rounded-lg shadow-md overflow-x-auto">

        <table className="w-full border-collapse">

          <thead className="bg-accent text-black h-[40px]">

            <tr className="bg-blue-500 border-b">

              <th className="p-3 text-left">
                Image
              </th>

              <th className="p-3 text-left">
                Product ID
              </th>

              <th className="p-3 text-left">
                Name
              </th>

              <th className="p-3 text-left">
                Price
              </th>

              <th className="p-3 text-left">
                Labelled Price
              </th>

              <th className="p-3 text-left">
                Brand
              </th>

              <th className="p-3 text-left">
                Model
              </th>

              <th className="p-3 text-left">
                Category
              </th>

              <th className="p-3 text-left">
                Availability
              </th>

              <th className="p-3 text-left">
                Stock
              </th>

              <th className="p-3 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {products.length > 0 ? (

              products.map((product, index) => (

                <tr
                  className="odd:bg-gray-300 even:bg-white h-[60px] border-b hover:bg-gray-50"
                  key={
                    product.productId ||
                    index
                  }
                >

                  <td className="p-3">

                    {Array.isArray(product.images) &&
                    product.images.length > 0 ? (

                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />

                    ) : (

                      <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                        -
                      </div>

                    )}

                  </td>

                  <td className="p-3 font-medium">
                    {product.productId}
                  </td>

                  <td className="p-3">
                    {product.name}
                  </td>

                  {/* PRICE */}

                  <td className="p-3">
                    {getFormattedPrice(product.price)}
                  </td>

                  {/* LABELLED PRICE */}

                  <td className="p-3">
                    {getFormattedPrice(product.labelledprice)}
                  </td>

                  <td className="p-3">
                    {product.brand || "-"}
                  </td>

                  <td className="p-3">
                    {product.model || "-"}
                  </td>

                  <td className="p-3">
                    {product.category}
                  </td>

                  <td className="p-3">

                    {product.isAvailable ? (

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        Available
                      </span>

                    ) : (

                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                        Out of Stock
                      </span>

                    )}

                  </td>

                  <td className="p-3">
                    {product.stock}
                  </td>

                  <td className="p-3">

                    <div className="flex items-center gap-3">

                      <Link
                        to={`/admin/edit-product/${product.productId}`}
                      >

                        <CiEdit
                          className="text-blue-600 text-xl rounded-full hover:border cursor-pointer"
                        />

                      </Link>

                      <ProductDeleteButton
                        productId={product.productId}
                        refresh={() =>
                          window.location.reload()
                        }
                      />

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="11"
                  className="p-10 text-center text-gray-500"
                >
                  No products found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      <Link
        to="../add-product"
        title="Add Product"
        className="group bg-blue-500 text-white w-[70px] h-[70px] rounded-full flex justify-center items-center fixed bottom-4 right-4 shadow-md hover:bg-blue-600 hover:shadow-2xl transition-all duration-300"
      >

        <FaPlus
          className="text-2xl text-white group-hover:text-black transition-all duration-300"
        />

      </Link>

    </div>
  );
}