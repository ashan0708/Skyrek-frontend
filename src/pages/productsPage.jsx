import { useEffect, useState } from "react";
import api from "../utils/api";
import LoadingScreen from "./admin/LoadingScreen";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [searching, setSearching] = useState(false);

    function getAllProducts() {
        setLoading(true);

        const token = localStorage.getItem("token");

        api.get("/products", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log("API RESPONSE:", response.data);

                const productData = Array.isArray(response.data)
                    ? response.data
                    : response.data.products || [];

                setProducts(productData);
                setLoading(false);
            })
            .catch((error) => {
                console.log("PRODUCT ERROR:", error);
                setProducts([]);
                setLoading(false);
            });
    }

    useEffect(() => {
        getAllProducts();
    }, []);

    function searchProducts() {

        const token = localStorage.getItem("token");

        if (token == null) {
            toast.error("You must be logged in to search products");
            return;
        }

        if (!query.trim()) {
            setSearching(false);
            getAllProducts();
            return;
        }

        setSearching(true);
        setLoading(true);

        api.get(`/products/search/${encodeURIComponent(query)}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log("SEARCH RESPONSE:", response.data);

                setProducts(response.data.products || []);
            })
            .catch((error) => {
                console.log("SEARCH ERROR:", error);
                setProducts([]);
            })
            .finally(() => {
                setLoading(false);
                setSearching(false);
            });
    }

    return (
        <div className="w-full bg-primary flex justify-center items-center gap-6 flex-wrap p-20">

            {loading && <LoadingScreen />}

            <div className="w-full h-[70px] flex justify-center items-center">

                <input
                    type="text"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-[400px] h-[40px] rounded-lg p-2"
                />

                <button
                    onClick={searchProducts}
                    disabled={searching}
                    className="w-[120px] h-[40px] bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 px-4 py-2 ml-2"
                >
                    {searching ? "Searching..." : "Search"}
                </button>

                <button
                    onClick={() => {

                        const token = localStorage.getItem("token");

                        if (token == null) {
                            toast.error("You must be logged in to view all products");
                            return;
                        }

                        setQuery("");
                        getAllProducts();
                    }}
                    className="w-[120px] h-[40px] bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300 px-4 py-2 ml-2"
                >
                    All Products
                </button>

            </div>

            {!loading && products.length === 0 && (
                <p className="text-white text-xl">
                    No products available
                </p>
            )}

            {!loading &&
                products.map((product) => (
                    <ProductCard
                        key={product.productId}
                        product={product}
                    />
                ))
            }

        </div>
    );
}