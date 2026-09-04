import { MdEmail, MdLock } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsGoogle } from "react-icons/bs";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useGoogleLogin } from "@react-oauth/google";
import { BiKey } from "react-icons/bi";


export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [password, setPassword] = useState("");
  const [loading,setLoading]=useState(false)
  const navigate = useNavigate();
   

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

 async function handleRegister() {
  if(password !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }
  setLoading(true)
  try {
    const res = await api.post("/users/", {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    });

    navigate("/signin");

  } catch (err) {
    toast.error(err?.response?.data?.message || "Registration failed");
  }
   setLoading(false)
}

  return (
    <div className="w-full h-full bg-[url('/register.jpg')] bg-cover bg-center flex items-center justify-center">

      <div className="w-[400px] min-h-[600px] backdrop-blur-md shadow-2xl shadow-white rounded-xl flex flex-col p-8">

        <h1 className="text-white text-3xl font-bold text-center mb-10">
          Registeration
        </h1>

        <div className="w-full mb-2">
          <label className="text-white text-lg flex items-center gap-2 mb-4">
            <MdEmail />
            Email
          </label>

          <input
            className="w-full h-10 text-white rounded-md px-2 border border-white outline-none"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => {
              
              setEmail(e.target.value);
            }}value={email}
          />
        </div>
        <div className="w-full mt-2 flex flex-row gap-2">
          <div className="w-1/2">
          <label className="text-white text-lg flex items-center gap-2 mb-4">
            <MdEmail />
            First Name
          </label>
          <input
            className="w-full h-10 text-white rounded-md px-2 border border-white outline-none"
            type="text"
            placeholder="Enter your first name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}value={firstName}
          />
          </div>
          <div className="w-1/2">
          <label className="text-white text-lg flex items-center gap-2 mb-4">
            <MdEmail />
            Last Name
          </label>
          <input
            className="w-full h-10 text-white rounded-md px-2 border border-white outline-none"
            type="text"
            placeholder="Enter your last name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}value={lastName}
          />
          </div>
        </div>

        <div className="w-full mt-3">
          <label className="text-white text-lg flex items-center gap-2 mb-4">
            <MdLock />
            Password
          </label>

          <input
            className="w-full h-10 text-white rounded-md px-2 border border-white outline-none"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => {
              
              setPassword(e.target.value);
            }}value={password}
          />
        </div>
         <div className="w-full mt-3">
          <label className="text-white text-lg flex items-center gap-2 mb-4"><BiKey />
            
            Confirm Password
          </label>

          <input
            className="w-full h-10 text-white rounded-md px-2 border border-white outline-none"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => {
              
              setConfirmPassword(e.target.value);
            }}value={confirmPassword}
          />
        </div>
        

        

        <button className="w-full h-[45px] bg-blue-500 mt-3 text-white rounded-lg" onClick={handleRegister}>
          {loading ?"Loading.." : "Sign Up"}
        </button>

        <p className="w-full mt-3 text-white text-center italic">
          All ready have account click here{" "}
         <Link to="/signin" className="font-bold text-accent">
          Here
         </Link>
        </p>
        <button onClick={googleLogin} className="w-full h-[45px] bg-blue-500 mt-3 text-white rounded-lg flex items-center justify-center gap-2">
          <BsGoogle />
          Sign In With Google
        </button>

      </div>
    </div>
  );
}