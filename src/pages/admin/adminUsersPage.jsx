
import { useEffect, useState } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import LoadingScreen from "./LoadingScreen";
import { IoMdRefresh } from "react-icons/io";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    // =========================
    // Get Users
    // =========================
    const getUsers = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const res = await api.get(
                `/users/all/${pageNumber}/${pageSize}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("API RESPONSE:", res.data);
            console.log("PAGE:", pageNumber);
            console.log("SIZE:", pageSize);
            console.log("TOTAL USERS:", res.data.totalUsers);
            console.log("TOTAL PAGES:", res.data.totalPages);

            setUsers(res.data.users || []);
            setTotalUsers(res.data.totalUsers || 0);
            setTotalPages(res.data.totalPages || 1);
        } catch (error) {
            console.log("USER ERROR:", error);
            console.log("BACKEND ERROR:", error.response?.data);

            toast.error(
                error.response?.data?.message ||
                "Failed to load users"
            );

            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // Load Users
    // =========================
    useEffect(() => {
        getUsers();
    }, [pageNumber, pageSize]);

    // =========================
    // Next Page
    // =========================
    const nextPage = () => {
        console.log("NEXT BUTTON CLICKED");

        if (pageNumber < totalPages) {
            setPageNumber(pageNumber + 1);
        }
    };

    // =========================
    // Previous Page
    // =========================
    const previousPage = () => {
        console.log("PREVIOUS BUTTON CLICKED");

        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };

    // =========================
    // Block / Unblock User
    // =========================
    const handleBlockToggle = async (email) => {
        try {
            const token = localStorage.getItem("token");

            const res = await api.put(
                "/users/state/" + email,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("STATE UPDATE:", res.data);

            toast.success(
                res.data?.message || "User status updated successfully"
            );

            
            getUsers();
        } catch (error) {
            console.log("STATE ERROR:", error);
            console.log(
                "BACKEND ERROR:",
                error.response?.data
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to update user status"
            );
        }
    };

   
    const handleRoleToggle = async (email) => {
        try {
            const token = localStorage.getItem("token");

            const res = await api.put(
                "/users/role/" + email,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("ROLE UPDATE:", res.data);

            toast.success(
                res.data?.message || "User role updated successfully"
            );

            
            getUsers();
        } catch (error) {
            console.log("ROLE ERROR:", error);
            console.log(
                "BACKEND ERROR:",
                error.response?.data
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to update user role"
            );
        }
    };

    return (
        <div className="w-full h-full overflow-y-scroll flex flex-col items-center">

            
            {loading && <LoadingScreen />}

           
            <div className="w-full min-h-[100px] bg-white rounded-lg shadow-md p-4 mb-4">

                <h1 className="text-2xl font-bold text-gray-800">
                    All Users
                </h1>

                <p className="text-gray-500 mt-1">
                    Manage your users
                </p>

                <div className="flex items-center justify-end font-semibold">
                    {totalUsers} Users
                </div>
            </div>

            
            <div className="w-full bg-white rounded-lg shadow-md overflow-x-auto">

                <table className="w-full border-collapse">

                    <thead className="bg-blue-500 text-black">
                        <tr>
                            <th className="p-3 text-left">
                                Profile
                            </th>

                            <th className="p-3 text-left">
                                Email
                            </th>

                            <th className="p-3 text-left">
                                First Name
                            </th>

                            <th className="p-3 text-left">
                                Last Name
                            </th>

                            <th className="p-3 text-left">
                                Role
                            </th>

                            <th className="p-3 text-left">
                                Email Verified
                            </th>

                            <th className="p-3 text-left">
                                Status
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        {users.length > 0 ? (

                            users.map((user) => (

                                <tr
                                    key={user._id}
                                    className="odd:bg-gray-300 even:bg-white border-b"
                                >

                                    {/* Profile */}
                                    <td className="p-3">
                                        <img
                                            src={
                                                user.image ||
                                                "/default-profile.png"
                                            }
                                            alt="Profile"
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                    </td>

                                    {/* Email */}
                                    <td className="p-3">
                                        {user.email}
                                    </td>

                                    {/* First Name */}
                                    <td className="p-3">
                                        {user.firstName}
                                    </td>

                                    {/* Last Name */}
                                    <td className="p-3">
                                        {user.lastName}
                                    </td>

                                    {/* Role */}
                                    <td className="p-3">
                                        <div className="flex items-center gap-2">

                                            <span>
                                                {user.isAdmin
                                                    ? "Admin"
                                                    : "Customer"}
                                            </span>

                                            <IoMdRefresh
                                                onClick={() =>
                                                    handleRoleToggle(
                                                        user.email
                                                    )
                                                }
                                                className="cursor-pointer text-blue-600 hover:text-blue-800 text-xl"
                                                title="Change Role"
                                            />

                                        </div>
                                    </td>

                                    
                                    <td className="p-3">
                                        {user.emailVerified
                                            ? "Yes"
                                            : "No"}
                                    </td>

                                    
                                    <td className="p-3">
                                        <div className="flex items-center gap-2">

                                            <span>
                                                {user.isActive
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>

                                            <IoMdRefresh
                                                onClick={() =>
                                                    handleBlockToggle(
                                                        user.email
                                                    )
                                                }
                                                className="cursor-pointer text-blue-600 hover:text-blue-800 text-xl"
                                                title="Change Status"
                                            />

                                        </div>
                                    </td>

                                </tr>
                            ))

                        ) : (

                            <tr>
                                <td
                                    colSpan="7"
                                    className="p-10 text-center text-gray-500"
                                >
                                    No users found
                                </td>
                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

            
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
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
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

