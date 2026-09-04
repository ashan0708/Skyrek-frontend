import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import uploadmedia from "../../utils/mediaUpload";
import toast from "react-hot-toast";
import api from "../../utils/api";

export default function AdminAddProductForm() {
    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [altName, setAltName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [labelledPrice, setLabelledPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState();
    const [isAvailable, setIsAvailable] = useState(true);
    const [stock, setStock] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const navigate = useNavigate();

    async function addProduct() {

        const token = localStorage.getItem("token");

        if (token == null) {
            toast.error("you must be logged in to add a product");
            navigate("/signin");
            return;
        }

        try {
            const imageUploadPromises = [];

            if (image && image.length) {
                for (let i = 0; i < image.length; i++) {
                    imageUploadPromises.push(uploadmedia(image[i]));
                }
            }

            const imageurls = await Promise.all(imageUploadPromises);

            const altNameArray = altName.split(",");

            console.log(altNameArray);

            const requestBody = {
                productId: productId,
                name: name,
                altNames: altNameArray,
                price: price,
                description: description,
                labelledprice: labelledPrice,
                images: imageurls,
                isAvailable: isAvailable,
                category: category,
                stock: stock,
                brand: brand,
                model: model,
            };

            await api.post("/products", requestBody, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });

            toast.success("Product added successfully");
            navigate("/admin/products");

        } catch (error) {
            console.error("Error in creating product:", error);
            console.error("Backend Error:", error.response?.data);
            console.error("Status:", error.response?.status);

            toast.error(
                error.response?.data?.message || "Error in creating product"
            );
        }
    }

    return (
        <div className="w-full h-full flex items-center flex-col">

            {/* Header */}
            <div className="w-full h-[100px] bg-white shadow-2xl rounded-lg flex px-5 items-center justify-between">

                <h1 className="text-2xl font-semibold">
                    Add New Product
                </h1>

                <div className="flex items-center gap-4">

                    <Link
                        to="/admin/products"
                        className="bg-red-600 text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-red-700 transition"
                    >
                        Cancel
                    </Link>

                    <button
                        onClick={addProduct}
                        className="bg-green-600 text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-green-700 transition"
                    >
                        Save
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
                        onChange={(e) => setProductId(e.target.value)}
                        className="w-full h-[40px] border border-gray-400 rounded-lg px-2"
                        placeholder="ID-0001"
                    />
                </div>

                {/* Product Name */}
                <div className="w-[25%] flex flex-col px-2 mb-2">
                    <label className="font-semibold mb-1">
                        Product Name
                    </label>

                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        onChange={(e) => setAltName(e.target.value)}
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
                        onChange={(e) => setPrice(e.target.value)}
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
                        onChange={(e) => setLabelledPrice(e.target.value)}
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
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full h-[120px] border border-gray-400 rounded-lg px-2 py-2 resize-none"
                        placeholder="Enter product description"
                    />
                </div>

                <div className="w-[25%] h-[70px] flex flex-col px-2 mb-2">
                    <label className="font-semibold mb-1">
                        Images
                    </label>

                    <input
                        multiple
                        onChange={(e) => setImage(e.target.files)}
                        type="file"
                        className="w-full h-[40px] border border-gray-400 rounded-lg px-2"
                    />
                </div>

                <div className="w-[25%] h-[70px] flex flex-col px-2 mb-2">
                    <label className="font-semibold mb-1">
                        Availability
                    </label>

                    <select
                        value={String(isAvailable)}
                        onChange={(e) => setIsAvailable(e.target.value === "true")}
                        className="w-full h-[40px] border rounded-lg px-2"
                    >
                        <option value="true">Available</option>
                        <option value="false">Unavailable</option>
                    </select>
                </div>

                <div className="w-[25%] flex flex-col px-2 mb-2">
                    <label className="font-semibold mb-1">
                        Category
                    </label>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full h-[40px] border border-gray-400 rounded-lg px-2"
                    >
                        <option value="">Select category</option>
                        <option value="graphics-card">Graphics Card</option>
                        <option value="monitor">Monitor</option>
                        <option value="motherboard">Motherboard</option>
                        <option value="processor">Processor</option>
                    </select>
                </div>

                <div className="w-[25%] flex flex-col px-2 mb-2">
                    <label className="font-semibold mb-1">
                        Stock
                    </label>

                    <input
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="w-full h-[40px] border border-gray-400 rounded-lg px-2"
                        placeholder="0"
                    />
                </div>

                <div className="w-[25%] flex flex-col px-2 mb-2">
                    <label className="font-semibold mb-1">
                        Brand
                    </label>

                    <input
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="w-full h-[40px] border border-gray-400 rounded-lg px-2"
                        placeholder="NVIDIA"
                    />
                </div>

                <div className="w-[25%] flex flex-col px-2 mb-2">
                    <label className="font-semibold mb-1">
                        Model
                    </label>

                    <input
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="w-full h-[40px] border border-gray-400 rounded-lg px-2"
                        placeholder="RTX 4070"
                    />
                </div>

            </div>
        </div>
    );
}