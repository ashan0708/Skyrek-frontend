import { MdEmail, MdLock } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsGoogle } from "react-icons/bs";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useGoogleLogin } from "@react-oauth/google";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading]=useState(false)

 const googleLogin = useGoogleLogin({
  onSuccess: (response) => {

    console.log(response);

    api.post("/users/google-login", {
      accessToken: response.access_token
    }).then((res) => {

      console.log(res.data);

      localStorage.setItem("token", res.data.token);

      toast.success("Google login successful!");

      if (res.data.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }

    }).catch((err) => {

      console.log(err);
      toast.error("Google login failed");

    });
  },

  onError: (error) => {
    console.log(error);
  }
});
        
  const navigate = useNavigate();

 async function handleLogin() {
  setLoading(true)
  try {
    const res = await api.post("/users/login", {
      email: email,
      password: password
    });

    localStorage.setItem("token", res.data.token);

    toast.success("Login successful!");

    if (res.data.isAdmin) {
      navigate("/admin");
    } else {
      navigate( "/");
    }

  } catch (err) {
    toast.error(err?.response?.data?.message || "Login failed");
  }
   setLoading(false)
}

  return (
    <div className="w-full h-full bg-[url('/login.jpg')] bg-cover bg-center flex items-center justify-center">

      <div className="w-[400px] h-[600px] backdrop-blur-md shadow-2xl shadow-white rounded-xl flex flex-col p-8">

        <h1 className="text-white text-3xl font-bold text-center mb-10">
          Login
        </h1>

        <div className="w-full mb-6">
          <label className="text-white text-lg flex items-center gap-2 mb-2">
            <MdEmail />
            Email
          </label>

          <input
            className="w-full h-10 rounded-md px-2 border border-white outline-none text-white placeholder-white"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => {
              
              setEmail(e.target.value);
            }}value={email}
          />
        </div>
        
        <div className="w-full">
          <label className="text-white text-lg flex items-center gap-2 mb-2">
            <MdLock />
            Password
          </label>

          <input
            className="w-full h-10 rounded-md px-2 border border-white outline-none text-white placeholder-white"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => {
              
              setPassword(e.target.value);
            }}value={password}
          />
        </div>

        <p className="w-full mt-4 text-white text-center italic">
          Forgot your password? click here{" "}
          <Link to="/forget-password" className="font-bold text-accent">
            Here
          </Link>
        </p>

        <button className="w-full h-[50px] bg-blue-500 mt-10 text-white rounded-lg" onClick={handleLogin}>
          {loading ?"Loading.." : "Login"}
        </button>

        <p className="w-full mt-4 text-white text-center italic">
          Don't have an account? click here{" "}
         <Link to="/signup" className="font-bold text-accent">
          Here
         </Link>
        </p>
        <button onClick={googleLogin} className="w-full h-[50px] bg-blue-500 mt-10 text-white rounded-lg flex items-center justify-center gap-2">
          <BsGoogle />
          Sign In With Google
        </button>

      </div>
    </div>
  );
}