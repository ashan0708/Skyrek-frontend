import { useState } from "react";
import { FaEye } from "react-icons/fa6";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function OrderdataModal(props) {
    const [isopen, setIsOpen] = useState(false);

    const order = props.order;
    const refreshr = props.refersh;

   function updateOrderStatus(newStatus) {
    const token = localStorage.getItem("token");

    console.log("ORDER ID:", order.orderId);
    console.log("NEW STATUS:", newStatus);

    api.put(
        "/orders/" + order.orderId,
        {
            status: newStatus,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
        .then((res) => {
            console.log("UPDATE SUCCESS:", res.data);

            toast.success("Order status updated successfully");

            setIsOpen(false);

            // Refresh orders
            if (refreshr) {
                refreshr();
            }
        })
        .catch((err) => {
            console.log("UPDATE ERROR:", err);
            console.log("ERROR RESPONSE:", err.response?.data);
            console.log("ERROR STATUS:", err.response?.status);

            toast.error(
                err.response?.data?.message ||
                    "Failed to update order status"
            );
        });
}

    return (
        <>
            {/* View Button */}
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                title="View Order"
                className="w-9 h-9 flex items-center justify-center rounded-full
                bg-blue-300 text-blue-600 hover:bg-blue-600 hover:text-white
                transition duration-200 cursor-pointer"
            >
                <FaEye />
            </button>

            {/* Modal */}
            {isopen && (
                <div
                    className="fixed inset-0 w-screen h-screen bg-black/70
                    flex justify-center items-center z-50 p-4"
                >
                    <div
                        className="w-[400px] max-h-[70vh] bg-primary rounded-xl
                        shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div
                            className="w-full bg-white flex-shrink-0
                            flex items-center justify-between px-6 py-5 border-b"
                        >
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Order Details
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Order ID : {order.orderId}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Name : {order.firstName} {order.lastName}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Email : {order.email}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Phone : {order.phone}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Address : {order.addressLine1}{" "}
                                    {order.addressLine2}
                                </p>

                                {/* Status */}
                                <div className="flex items-center mt-2">
                                    <p className="text-sm text-gray-500 mr-3">
                                        Status :
                                    </p>

                                    {props.isAdmin ? <select
                                        className="border border-gray-300 rounded
                                        px-2 py-1 text-sm bg-white outline-none"
                                        value={order.status || "Pending"}
                                        onChange={(e) =>
                                            updateOrderStatus(e.target.value)
                                        }
                                    >
                                        <option value="pending">
                                            Pending
                                        </option>
                                        <option value="processing">
                                            Processing
                                        </option>

                                        <option value="shipped">
                                            Shipped
                                        </option>

                                        <option value="delivered">
                                            Delivered
                                        </option>
                                    </select> : (
                                        <span
                                            className={`px-3 py-1 rounded-full
                                            text-xs font-semibold ${
                                                order.status === "delivered"
                                                    ? "bg-green-100 text-green-700"
                                                    : order.status === "shipped"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : order.status ===
                                                      "processing"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-gray-100 text-gray-700"
                                            }`}
                                        >
                                            {order.status
                                                ? order.status
                                                      .charAt(0)
                                                      .toUpperCase() +
                                                  order.status.slice(1)
                                                : "Pending"}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Close Button */}
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="w-9 h-9 rounded-full bg-gray-200
                                hover:bg-red-500 hover:text-white
                                transition duration-200 flex-shrink-0 ml-3"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Items */}
                        <div
                            className="w-full p-4 flex flex-col gap-3
                            overflow-y-auto flex-1 min-h-0 bg-gray-100"
                        >
                            {order.items?.map((item, index) => {
                                const price = Number(
                                    item.product?.price ??
                                        item.price ??
                                        0
                                );

                                const qty = Number(item.qty ?? 0);

                                const labelledPrice = Number(
                                    item.product?.labelledprice ??
                                        item.product?.labelledPrice ??
                                        item.labelledprice ??
                                        item.labelledPrice ??
                                        0
                                );

                                return (
                                    <div
                                        key={index}
                                        className="w-full min-h-[100px] bg-white
                                        rounded-lg flex items-center gap-4 p-4
                                        shadow-sm border border-gray-200"
                                    >
                                        {/* Product Image */}
                                        <div
                                            className="w-[80px] h-[70px]
                                            flex-shrink-0 flex items-center
                                            justify-center"
                                        >
                                            <img
                                                src={
                                                    item.product?.images?.[0] ||
                                                    ""
                                                }
                                                alt={
                                                    item.product?.name ||
                                                    item.name ||
                                                    "Product"
                                                }
                                                className="w-[70px] h-[65px]
                                                object-contain rounded"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div
                                            className="flex-1 flex flex-col
                                            gap-1"
                                        >
                                            {/* Product Name */}
                                            <span
                                                className="text-sm font-semibold
                                                text-gray-800"
                                            >
                                                {item.product?.name ||
                                                    item.name ||
                                                    "Product"}
                                            </span>

                                            {/* Labelled Price */}
                                            {labelledPrice > 0 && (
                                                <span
                                                    className="text-xs text-gray-500
                                                    line-through"
                                                >
                                                    LKR{" "}
                                                    {labelledPrice.toLocaleString()}
                                                </span>
                                            )}

                                            {/* Unit Price */}
                                            <span
                                                className="text-xs text-gray-500"
                                            >
                                                LKR{" "}
                                                {price.toLocaleString()}
                                            </span>

                                            {/* Quantity */}
                                            <span
                                                className="text-xs text-gray-500"
                                            >
                                                Qty : {qty}
                                            </span>
                                        </div>

                                        {/* Item Total */}
                                        <div
                                            className="text-right
                                            flex-shrink-0"
                                        >
                                            <span
                                                className="text-sm font-bold
                                                text-gray-800"
                                            >
                                                LKR{" "}
                                                {(price * qty).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        <div
                            className="w-full bg-white p-4 border-t
                            flex justify-between items-center flex-shrink-0"
                        >
                            <span
                                className="text-lg font-semibold
                                text-blue-600"
                            >
                                Total
                            </span>

                            <span
                                className="text-xl font-bold
                                text-blue-600"
                            >
                                LKR{" "}
                                {Number(
                                    order.totalAmount ?? 0
                                ).toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}