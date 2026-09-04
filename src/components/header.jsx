import { Link } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import UserData from "./userData";
import { IoHome } from "react-icons/io5";
import { LuBox } from "react-icons/lu";
import { MdLocalPhone } from "react-icons/md";


export default function Header() {
    return (
        <>
        <header className="w-full h-[100px] bg-blue-500 flex justify-center lg:justify-between p-6">

            <Link to="/">
                <img src="/white.png" className="h-full" />
            </Link>

            <div className="h-full hidden lg:flex justify-center items-center gap-4">

                <Link
                    to="/"
                    className="h-full flex justify-center items-center text-white hover:text-gray-300"
                >
                    Home
                </Link>

                <Link
                    to="/products"
                    className="h-full flex justify-center items-center text-white hover:text-gray-300"
                >
                    Products
                </Link>

                <Link
                    to="/contact-us"
                    className="h-full flex justify-center items-center text-white hover:text-gray-300"
                >
                    Contact Us
                </Link>

                <Link
                    to="/about-us"
                    className="h-full flex justify-center items-center text-white hover:text-gray-300"
                >
                    About Us
                </Link>

            </div>

            <div className="justify-center items-center gap-4 hidden lg:flex">
                <Link
                    to="/cart"
                    className="h-full flex justify-center items-center text-white hover:text-gray-900 px-4"
                >
                    <BiCart size={24} />
                </Link>
                <UserData/>
            </div>

        </header>
        <div className="fixed bottom-0 left-0 w-full h-[80px] bg-white shadow-2xl flex lg:hidden justify-evenly items-center">
            <Link
            to="/"
            className="h-full flex flex-col justify-center items-center text-blue-600 text-3xl"
            >
            <IoHome size={24} />
             <span className="text-sm text-blue-800">Home</span>
            </Link>
             <Link
            to="/products"
            className="h-full flex flex-col justify-center items-center text-blue-600 text-3xl"
            >
            <LuBox />
            <span className="text-sm text-blue-800">Products</span>
            </Link>
            
            <Link
            to="/contact-us"
            className="h-full flex flex-col justify-center items-center text-blue-600 text-3xl"
            >
            <MdLocalPhone />
            <span className="text-sm text-blue-800">Contact us</span>
            </Link>
            <UserData/>

        </div>
        </>
    );
}