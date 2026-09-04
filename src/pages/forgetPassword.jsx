
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../utils/api";
import LoadingScreen from "./admin/LoadingScreen";

export default function ForgetPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // 2 minutes = 120 seconds
    const [timeLeft, setTimeLeft] = useState(120);

    // OTP countdown
    useEffect(() => {

        if (!otpSent || timeLeft <= 0) {
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => {

                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);

    }, [otpSent, timeLeft]);


    // Send OTP
    function sendOtp() {

        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        setLoading(true);

        api.post("/users/send-otp", {
            email: email
        })
            .then((res) => {

                console.log(res.data);

                toast.success("OTP sent to your email");

                setOtpSent(true);

                // Start / restart 2 minute timer
                setTimeLeft(120);

                // Clear old OTP
                setOtp("");

            })
            .catch((err) => {

                console.log(err);

                toast.error(
                    err?.response?.data?.message ||
                    "Failed to send OTP"
                );

            })
            .finally(() => {

                setLoading(false);

            });
    }


    // Verify OTP
    function verifyOtp() {

        if (timeLeft <= 0) {
            toast.error("OTP has expired");
            return;
        }

        if (!otp) {
            toast.error("Please enter OTP");
            return;
        }

        setLoading(true);

        api.post("/users/verify-otp", {
            email: email,
            otp: otp
        })
            .then((res) => {

                console.log(res.data);

                toast.success("OTP verified successfully");

                setLoading(false);

            })
            .catch((err) => {

                console.log(err);

                toast.error(
                    err?.response?.data?.message ||
                    "Invalid OTP"
                );

                setLoading(false);
            });
    }


    // Reset Password
    function resetPassword() {

        if (timeLeft <= 0) {
            toast.error("OTP has expired");
            return;
        }

        if (!newPassword || !confirmPassword) {
            toast.error("Please enter password");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        api.post("/users/reset-password", {
            email: email,
            otp: otp,
            Password: newPassword
        })
            .then((res) => {

                console.log(res.data);

                toast.success("Password reset successfully");

                setLoading(false);

                navigate("/login");

            })
            .catch((err) => {

                console.log(err);

                toast.error(
                    err?.response?.data?.message ||
                    "Failed to reset password"
                );

                setLoading(false);
            });
    }


    // Convert seconds to MM:SS
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;


    return (

        <div className="w-full h-full bg-[url('/register.jpg')] bg-cover bg-center flex items-center justify-center relative z-10">

            {loading && <LoadingScreen />}

            <div className="absolute inset-0 bg-blue-900/20"></div>


            {otpSent ? (

                <div className="w-[400px] backdrop-blur-md shadow-2xl shadow-white rounded-xl flex flex-col p-8 relative z-20">

                    <h1 className="text-2xl text-center font-bold mb-4 text-white">
                        Enter OTP
                    </h1>


                    <input
                        type="email"
                        value={email}
                        disabled={true}
                        className="text-white bg-transparent border border-gray-300 rounded-md py-2 px-4 mb-3 focus:outline-none"
                    />


                    {/* OTP Timer */}
                    <div className="text-center mb-3">

                        {timeLeft > 0 ? (

                            <p className="text-white font-semibold">

                                OTP expires in{" "}

                                <span className="text-red-400">
                                    {minutes}:{String(seconds).padStart(2, "0")}
                                </span>

                            </p>

                        ) : (

                            <p className="text-red-500 font-bold">
                                OTP Expired
                            </p>

                        )}

                    </div>


                    {/* OTP Input */}
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        maxLength="6"
                        disabled={timeLeft <= 0}
                        className="text-white bg-transparent border border-gray-300 rounded-md py-2 px-4 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />


                    {/* Verify OTP */}
                    <button
                        disabled={loading || timeLeft <= 0}
                        onClick={verifyOtp}
                        className="bg-blue-500 text-white py-2 px-8 mt-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        {timeLeft <= 0 ? "OTP Expired" : "Verify OTP"}
                    </button>


                    {/* New Password */}
                    <input
                        type="password"
                        placeholder="Enter new password"
                        disabled={timeLeft <= 0}
                        className="text-white bg-transparent border border-gray-300 rounded-md py-2 px-4 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />


                    {/* Confirm Password */}
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        disabled={timeLeft <= 0}
                        className="text-white bg-transparent border border-gray-300 rounded-md py-2 px-4 mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />


                    {/* Reset Password */}
                    <button
                        disabled={loading || timeLeft <= 0}
                        onClick={resetPassword}
                        className="bg-blue-500 text-white py-2 px-8 mt-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        Reset Password
                    </button>

                </div>

            ) : (

                <div className="w-[400px] h-[300px] backdrop-blur-md shadow-2xl shadow-white rounded-xl flex flex-col p-8 relative z-20">

                    <h1 className="text-2xl text-center font-bold mb-4 text-white">
                        Enter Your Email
                    </h1>


                    <input
                        type="email"
                        placeholder="john@example.com"
                        className="text-white bg-transparent border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />


                    <button
                        disabled={loading}
                        onClick={sendOtp}
                        className="bg-blue-500 text-white py-2 px-8 mt-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>

                </div>

            )}

        </div>
    );
}

