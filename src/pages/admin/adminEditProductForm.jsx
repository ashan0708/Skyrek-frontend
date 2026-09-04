import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import uploadmedia from "../../utils/mediaUpload";
import toast from "react-hot-toast";
import api from "../../utils/api";

export default function AdminEditProductForm() {
    const { productId } = useParams();
    console.log("EDIT PRODUCT ID:", productId);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [altName, setAltName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [labelledPrice, setLabelledPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState();
    const [existingImages, setExistingImages] = useState([]);
    const [isAvailable, setIsAvailable] = useState(true);
    const [stock, setStock] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const token = localStorage.getItem("token");

                if (token == null) {
                    toast.error("You must be logged in");
                    navigate("/signin");
                    return;
                }

                const res = await api.get(`/products/${productId}`, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });

                const product = res.data.product || res.data;

                setName(product.name || "");

                setAltName(
                    Array.isArray(product.altNames)
                        ? product.altNames.join(", ")
                        : ""
                );

                setDescription(product.description || "");
                setPrice(product.price || "");
                setLabelledPrice(product.labelledprice || "");
                setCategory(product.category || "");
                setIsAvailable(
                    product.isAvailable !== undefined
                        ? product.isAvailable
                        : true
                );
                setStock(product.stock || "");
                setBrand(product.brand || "");
                setModel(product.model || "");
                setExistingImages(
                    Array.isArray(product.images)
                        ? product.images
                        : []
                );

            } catch (error) {
                console.error(
                    "Error loading product:",
                    error
                );

                console.error(
                    "Backend Error:",
                    error.response?.data
                );

                toast.error(
                    error.response?.data?.message ||
                    "Failed to load product"
                );

                navigate("/admin/products");

            } finally {
                setLoading(false);
            }
        };

        getProduct();
    }, [productId, navigate]);


    async function updateProduct() {

        const token = localStorage.getItem("token");

        if (token == null) {
            toast.error("You must be logged in to edit a product");
            navigate("/signin");
            return;
        }

        try {

            const imageUploadPromises = [];

            if (image && image.length) {

                for (let i = 0; i < image.length; i++) {
                    imageUploadPromises.push(
                        uploadmedia(image[i])
                    );
                }
            }
            const newImageUrls = await Promise.all(imageUploadPromises);

const finalImages =
    newImageUrls.length > 0
        ? newImageUrls
        : existingImages;

        
            const altNameArray = altName
                .split(",")
                .map((item) => item.trim())
                .filter((item) => item !== "");

            const requestBody = {
                name: name,
                altNames: altNameArray,
                price: price,
                description: description,
                labelledprice: labelledPrice,
                images: finalImages,
                isAvailable: isAvailable,
                category: category,
                stock: stock,
                brand: brand,
                model: model
            };

            await api.put(
                `/products/${productId}`,
                requestBody,
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            );

            toast.success(
                "Product updated successfully"
            );

            navigate("/admin/products");

        } catch (error) {

            console.error(
                "Error updating product:",
                error
            );

            console.error(
                "Backend Error:",
                error.response?.data
            );

            console.error(
                "Status:",
                error.response?.status
            );

            toast.error(
                error.response?.data?.message ||
                "Error updating product"
            );
        }
    }


    if (loading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <div className="w-[60px] h-[60px] border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }


    return (
        <div className="w-full h-full flex items-center flex-col">

            {/* Header */}

            <div className="w-full h-[100px] bg-white shadow-2xl rounded-lg flex px-5 items-center justify-between">

                <h1 className="text-2xl font-semibold">
                    Edit Product
                </h1>

                <div className="flex items-center gap-4">

                    <Link
                        to="/admin/products"
                        className="bg-red-600 text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-red-700 transition"
                    >
                        Cancel
                    </Link>

                    <button
                        onClick={updateProduct}
                        className="bg-green-600 text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-green-700 transition"
                    >
                        Update
                    </button>

                </div>

            </div>


            {/* Form */}

            <div className="w-full flex px-5 pt-4 flex-wrap">


                {/* Product ID */}

                <div className="w-[25%] flex flex-col px-2 mb-2">

                    <label className="font-semibold mb-1">
                        Product ID
                    </label>

                    <input
                        value={productId}
                        disabled
                        className="w-full h-[40px] border border-gray-400 rounded-lg px-2 bg-gray-100"
                    />

                </div>


                {/* Product Name */}

                <div className="w-[25%] flex flex-col px-2 mb-2">

                    <label className="font-semibold mb-1">
                        Product Name
                    </label>

                    <input
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        className="w-full h-[40px] border border-gray-400 rounded-lg px-2"
                        placeholder="Navida G Fox"
                    />

                </div>


                {/* Alternative Name */}

                <div className="w-[50%] flex flex-col px-2 mb-2">

                    <label className="font-semibold mb-1">

                        Alternative Name

                        <span className="italic text-sm text-gray-400 ml-1">
                            (comma-separated)
                        </span>

                    </label>

                    <input
                        value={altName}
                        onChange={(e) =>
                            setAltName(e.target.value)
                        }
                        className="w-full h-[40px] border border-gray-400 rounded-lg px-2"
                        placeholder="VGA, Graphic Card, GPU"
                    />

                </div>


                {/* Price */}

                <div className="w-[25%] flex flex-col px-2 mb-2">

                    <label className="font-semibold mb-1">
                        Price
                    </label>

                    <input
                        value={price}
                        onChange={(e) =>
                            setPrice(e.target.value)
                        }
                        className="w-full h-[40px] border border-gray-400 rounded-lg px-2"
                        placeholder="0.00"
                    />

                </div>


                {/* Labelled Price */}

                <div className="w-[25%] flex flex-col px-2 mb-2">

                    <label className="font-semibold mb-1">
                        Labelled Price
                    </label>

                    <input
                        value={labelledPrice}
                        onChange={(e) =>
                            setLabelledPrice(e.target.value)
                        }
                        className="w-full h-[40px] border border-gray-400 rounded-lg px-2"
                        placeholder="0.00"
                    />

                </div>


                {/* Description */}

                <div className="w-full flex flex-col px-2 mt-1">

                    <label className="font-semibold mb-1">
                        Description
                    </label>

                    <textarea
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        className="w-full h-[120px] border border-gray-400 rounded-lg px-2 py-2 resize-none"
                        placeholder="Enter product description"
                    />

                </div>


                {/* Images */}

                <div className="w-[25%] h-[70px] flex flex-col px-2 mb-2">

                    <label className="font-semibold mb-1">
                        Images
                    </label>

                    <input
                        multiple
                        onChange={(e) =>
                            setImage(e.target.files)
                        }
                        type="file"
                        className="w-full h-[40px] border border-gray-400 rounded-lg px-2"
                    />

                </div>


                {/* Availability */}

                <div className="w-[25%] h-[70px] flex flex-col px-2 mb-2">

                    <label className="font-semibold mb-1">
                        Availability
                    </label>

                    <select
                        value={String(isAvailable)}
                        onChange={(e) =>
                            setIsAvailable(
                                e.target.value === "true"
                            )
                        }
                        className="w-full h-[40px] border rounded-lg px-2"
                    >

                        <option value="true">
                            Available
                        </option>

                        <option value="false">
                            Unavailable
                        </option>

                    </select>

                </div>


                {/* Category */}

                <div className="w-[25%] flex flex-col px-2 mb-2">

                    <label className="font-semibold mb-1">
                        Category
                    </label>

                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                        className="w-full h-[40px] border border-gray-400 rounded-lg px-2"
                    >

                        <option value="">
                            Select category
                        </option>

                        <option value="graphics-card">
                            Graphics Card
                        </option>

                        <option value="monitor">
                            Monitor
                        </option>

                        <option value="motherboard">
                            Motherboard
                        </option>

                        <option value="processor">
                            Processor
                        </option>

                    </select>

                </div>


                {/* Stock */}

                <div className="w-[25%] flex flex-col px-2 mb-2">

                    <label className="font-semibold mb-1">
                        Stock
                    </label>

                    <input
                        value={stock}
                        onChange={(e) =>
                            setStock(e.target.value)
                        }
                        className="w-full h-[40px] border border-gray-400 rounded-lg px-2"
                        placeholder="0"
                    />

                </div>


                {/* Brand */}

                <div className="w-[25%] flex flex-col px-2 mb-2">

                    <label className="font-semibold mb-1">
                        Brand
                    </label>

                    <input
                        value={brand}
                        onChange={(e) =>
                            setBrand(e.target.value)
                        }
                        className="w-full h-[40px] border border-gray-400 rounded-lg px-2"
                        placeholder="NVIDIA"
                    />

                </div>


                {/* Model */}

                <div className="w-[25%] flex flex-col px-2 mb-2">

                    <label className="font-semibold mb-1">
                        Model
                    </label>

                    <input
                        value={model}
                        onChange={(e) =>
                            setModel(e.target.value)
                        }
                        className="w-full h-[40px] border border-gray-400 rounded-lg px-2"
                        placeholder="RTX 4070"
                    />

                </div>

            </div>

        </div>
    );
}