import { CiTrash } from "react-icons/ci";
import { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import api from "../../utils/api";
import toast from "react-hot-toast";

export default function ProductDeleteButton(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const refresh = props.refresh;
    const productId = props.productId;

    return (
        <>
            <CiTrash
                className="text-red-600 hover:border cursor-pointer"
                onClick={() => setIsModalVisible(true)}
            />

            {
                isModalVisible && (
                    <div className="w-screen h-screen bg-black/70 fixed left-0 top-0 z-50 flex justify-center items-center">

                        <div className="w-[400px] bg-white rounded-lg flex flex-col overflow-hidden">

                            <div className="w-full h-[40px] bg-accent-500 flex justify-between items-center px-4">

                                <h1 className="text-white text-lg font-semibold">
                                    Confirm Deletion
                                </h1>

                                <IoCloseCircleSharp
                                    className="text-white hover:bg-red-600 cursor-pointer"
                                    onClick={() => setIsModalVisible(false)}
                                />

                            </div>

                            <p className="p-4 text-center text-gray-700">
                                Are you sure delete this product with ID {productId}?
                            </p>

                            <div className="w-full flex gap-2 p-4">

                                <button
                                    className="flex-1 h-10 bg-red-600 text-white hover:bg-red-700 rounded"
                                    onClick={async () => {

                                        try {

                                            const token = localStorage.getItem("token");

                                            await api.delete(
                                                "/products/" + productId,
                                                {
                                                    headers: {
                                                        Authorization: `Bearer ${token}`,
                                                    }
                                                }
                                            );

                                            refresh();

                                            setIsModalVisible(false);

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
                                                "Error deleting product"
                                            );

                                        }

                                    }}
                                >
                                    Delete
                                </button>

                                <button
                                    className="flex-1 h-10 bg-gray-400 text-white hover:bg-gray-500 rounded"
                                    onClick={() => setIsModalVisible(false)}
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>

                    </div>
                )
            }
        </>
    );
}