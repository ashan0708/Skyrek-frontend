import { useEffect, useState } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import LoadingScreen from "./LoadingScreen";
import OrderDataModal from "../../components/orderDataModal";


export default function AdminOrdersPage() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPages, setTotalPages] = useState(1);


  // Get Orders
  const getOrders = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await api.get(
        `/orders/${pageNumber}/${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("API RESPONSE:", res.data);
      console.log("PAGE:", pageNumber);
      console.log("SIZE:", pageSize);
      console.log("TOTAL ORDERS:", res.data.totalOrders);
      console.log("TOTAL PAGES:", res.data.totalPages);

      setOrders(res.data.orders || []);
      setTotalOrders(res.data.totalOrders || 0);
      setTotalPages(res.data.totalPages || 1);

    } catch (error) {

      console.log("ORDER ERROR:", error);
      console.log("BACKEND ERROR:", error.response?.data);

      toast.error(
        error.response?.data?.message ||
        "Failed to load orders"
      );

      setOrders([]);

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    getOrders();

  }, [pageNumber, pageSize]);


  const nextPage = () => {

    console.log("NEXT BUTTON CLICKED");

    if (pageNumber < totalPages) {

      setPageNumber(pageNumber + 1);

    }

  };


  const previousPage = () => {

    console.log("PREVIOUS BUTTON CLICKED");

    if (pageNumber > 1) {

      setPageNumber(pageNumber - 1);

    }

  };


  return (

    <div className="w-full h-full flex flex-col items-center">

      {loading && <LoadingScreen />}


      {/* Header */}

      <div className="w-full bg-white rounded-lg shadow-md p-4 mb-4">

        <h1 className="text-2xl font-bold text-gray-800">
          All Orders
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your orders
        </p>

        <div className="flex items-center justify-end">
          {totalOrders} Orders
        </div>

      </div>


      {/* Table */}

      <div className="w-full bg-white rounded-lg shadow-md overflow-x-auto">

        <table className="w-full border-collapse">

          <thead className="bg-blue-500 text-black">

            <tr>

              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">City</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Qty</th>
              <th className="p-3 text-left">Total Amount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Action</th>

            </tr>

          </thead>


          <tbody>

            {orders.length > 0 ? (

              orders.map((order, index) => (

                <tr
                  key={order.orderId || index}
                  className="odd:bg-gray-300 even:bg-white border-b"
                >

                  <td className="p-3 font-medium">
                    {order.orderId}
                  </td>


                  <td className="p-3">
                    {order.email}
                  </td>


                  <td className="p-3">
                    {order.firstName} {order.lastName}
                  </td>


                  <td className="p-3">

                    {order.addressLine1}

                    <br />

                    {order.addressLine2}

                  </td>


                  <td className="p-3">
                    {order.city || order.City || "-"}
                  </td>


                  <td className="p-3">
                    {order.phone}
                  </td>


                  <td className="p-3">

                    {order.items?.map((item, itemIndex) => (

                      <div key={itemIndex}>
                        {item.product?.name || "Product"}
                      </div>

                    ))}

                  </td>


                  <td className="p-3">

                    {order.items?.map((item, itemIndex) => (

                      <div key={itemIndex}>
                        {item.qty}
                      </div>

                    ))}

                  </td>


                  <td className="p-3 font-semibold">

                    LKR.{" "}

                    {Number(
                      order.totalAmount || 0
                    ).toLocaleString()}

                  </td>

<td className="p-3">

  <span
    className={
      order.status === "pending"
        ? "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full"
        : order.status === "shipped"
        ? "bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
        : order.status === "delivered"
        ? "bg-green-100 text-green-700 px-3 py-1 rounded-full"
        : "bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
    }
  >

    {(order.status || "pending").charAt(0).toUpperCase() +
      (order.status || "pending").slice(1)}

  </span>

</td>


                  <td className="p-3">

                    {order.date
                      ? new Date(
                          order.date
                        ).toLocaleDateString()
                      : "-"
                    }

                  </td>


                  <td className="p-3">

                    <div className="flex gap-2">

                      <OrderDataModal isAdmin={true}
                        order={order}
                        refersh={()=>setLoading(true)}
                      />

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="12"
                  className="p-10 text-center text-gray-500"
                >
                  No orders found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>


      {/* Pagination */}

      <div className="p-3 mt-4 mb-4 bg-white shadow-2xl flex items-center justify-center gap-4">


        <select
          value={pageSize}
          onChange={(e) => {

            setPageSize(Number(e.target.value));

            setPageNumber(1);

          }}
          className="px-4 py-2 border-2 rounded"
        >

          <option value={1}>
            1 per page
          </option>

          <option value={5}>
            5 per page
          </option>

          <option value={10}>
            10 per page
          </option>

          <option value={20}>
            20 per page
          </option>

        </select>


        <button
          type="button"
          onClick={previousPage}
          disabled={pageNumber === 1}
          className="px-4 py-2 bg-blue-500 rounded disabled:opacity-50"
        >
          Previous
        </button>


        <span className="font-semibold">
          Page {pageNumber} of {totalPages}
        </span>


        <button
          type="button"
          onClick={nextPage}
          disabled={pageNumber === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>


      </div>

    </div>

  );

}