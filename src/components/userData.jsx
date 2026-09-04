import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { IoLogIn } from "react-icons/io5";

export default function UserData() {
    const [user, setUser] = useState(null);
    const [selectedOption, setSelectedOption] = useState("me");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        

        if (!token) {
            setUser(null);
            return;
        }

        api.get("/users/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            setUser(res.data);
        })
        .catch((err) => {
            console.log("User fetch error:", err);
            setUser(null);
        });
    }, []);

    return (
        <>
            {user === null ?(
                <div className="lg:flex">
                    <Link
                        to="/signin"
                        className="text-white hidden lg:block hover:text-black"
                    >
                        Login
                    </Link>

                    <span className="text-white mx-2 hidden lg:block">/</span>

                    <Link
                        to="/register"
                        className="text-white hidden lg:block hover:text-black"
                    >
                        Register
                    </Link>
                    <Link
                        to="/signin"
                        className="text-blue-700 block lg:hidden hover:text-gray-400"
                    >   <IoLogIn size={35} />
                        <span className="text-sm text-blue-800">Login</span>
                    </Link>
                   
                </div>
            ) : (
                <div className="text-white flex flex-col lg:flex-row justify-center gap-2 lg:gap-4">
                    <img
                        src={user.image || "/default-profile.png"}
                        alt="Profile"
                        className="w-6 h-6 lg:w-6 lg:h-6 rounded-full inline-block mr-2"/>
                        {/*<span className="block lg:hidden text-blue-600 text-sm">{user.firstName}</span>*/}
                        <select className="bg-transparent text-sm text-blue-800 lg:text-white text-center" value ={selectedOption} onChange={
                            (e)=>{setSelectedOption(e.target.value);
                                if(e.target.value === "settings"){
                                    navigate("/settings");
                                }
                                if(e.target.value === "my-orders"){
                                    navigate("/my-orders");
                                }
                                if(e.target.value === "logout"){
                                    localStorage.removeItem("token");
                                    setUser(null);
                                    navigate("/")
                                }
                                setSelectedOption("");
                               }
                            }>
                            <option className ="hidden"value="me">{user.firstName}</option>
                            <option className ="bg-blue-500 text-white" value="settings">Settings</option>
                            <option className ="bg-blue-500 text-white" value="my-orders">My Orders</option>
                            <option className ="bg-blue-500 text-white" value="logout">Log Out</option>
                        </select>
                    

                   
                </div>
            )}
        </>
    );
}