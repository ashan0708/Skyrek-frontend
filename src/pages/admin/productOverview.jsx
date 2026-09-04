import { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import api from "../../utils/api";

import LoadingScreen from "./LoadingScreen";

import ProductImageSlideShow from "../../components/productImageSlideShow";
import toast from "react-hot-toast";
import { addToCart } from "../../utils/cart";

function getFormattedPrice(price) {
    return "Rs. " + Number(price).toLocaleString("en-US");
}

export default function ProductOverview() {

    const parameters = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    useEffect(() => {

        if (parameters.productId == null) {

            navigate("/products");

            return;
        }

        api.get("/products/" + parameters.productId)

            .then((response) => {

                console.log("Product:", response.data);

                setProduct(response.data.product);

            })

            .catch((error) => {

                console.error("Error fetching product details:", error);

                navigate("/products");

            });

    }, [parameters.productId, navigate]);

    return (

        <div className="w-full h-auto lg:h-full pt-10 lg:pt-0 bg-primary flex flex-col lg:flex-row justify-center items-center">

            {product == null && <LoadingScreen />}

            {product != null && (

                <>

                    <div className="w-full lg:w-1/2 h-full flex justify-center items-center">
                        <ProductImageSlideShow images={product.images} />
                    </div>

                    <div className="w-full lg:w-1/2 flex flex-col p-6 h-full">

                        <span className="text-gray-500 text-sm italic mb-4">
                            {product.productId}
                        </span>

                        <p className="text-gray-500 text-sm italic mb-4">
                            {product.brand + " " + product.model}
                        </p>

                        <h1 className="text-3xl font-semibold mb-6">
                            {product.name}

                            {
                                product.altNames?.map(
                                    (altName, index) => {
                                        return (
                                            <span
                                                key={index}
                                                className="text-sm text-gray-500 italic"
                                            >
                                                {" | " + altName}
                                            </span>
                                        );
                                    }
                                )
                            }

                        </h1>

                        {
                            product.price < product.labelledprice && (
                                <p className="text-gray-500 text-lg line-through mb-2">
                                    {getFormattedPrice(product.labelledprice)}
                                </p>
                            )
                        }

                        <p className="text-lg text-blue-500 font-semibold">
                            {getFormattedPrice(product.price)}
                        </p>

                        <p className="text-gray-700 mt-6">
                            {product.description}
                        </p>

                        <div className="flex gap-4">

                            <button
                                onClick={() => {
                                    addToCart(product, 1);
                                    toast.success("Product added to cart");
                                }}
                                className="w-[220px] p-2 text-white bg-green-600 rounded-sm hover:bg-green-500/90 mt-6"
                            >
                                Add To Cart
                            </button>

                            <Link
                                className="w-[220px] p-2 text-white bg-blue-500 rounded-sm hover:bg-blue-500/90 mt-6 text-center"
                                to="/checkout"
                                state={[
                                    {
                                        product: {
                                            productId: product.productId,
                                            name: product.name,
                                            image: product.images?.[0] || "",
                                            price: product.price,
                                            labelledPrice: product.labelledprice
                                        },
                                        qty: 1
                                    }
                                ]}
                            >
                                Buy Now
                            </Link>
                            

                        </div>

                    </div>

                </>

            )}

        </div>
    );
}