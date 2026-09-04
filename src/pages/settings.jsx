import {useEffect,useState} from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import LoadingScreen from "./admin/LoadingScreen";
import uploadMedia from "../utils/mediaUpload";


export default function Settings(){

     const [user, setUser] = useState(null);
     const [firstName, setFirstName] = useState("");
     const [lastName, setLastName] = useState("");
     const [image, setImage] = useState(null);
     const [password, setPassword] = useState("");
     const [confirmPassword, setConfirmPassword] = useState("");
     const [loading, setLoading] = useState(false);
     useEffect(() => {
        const token = localStorage.getItem("token");
        

        if (token!=null) {
            

        api.get("/users/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            setUser(res.data);
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            
            
        })
        .catch((err) => {
            console.log("User fetch error:", err);
            setUser(null);
        });
      }else{
         window.location.href ="/login";
      }
      }
      , []
    )
    async function handleUpdateProfile(){
        setLoading(true);
       
        try{
             let imageUrl = user.image;
             if(image !=null){
            imageUrl=await uploadMedia(image);
        }
        const token=localStorage.getItem("token");
        await api.put("/users/",{
           firstName : firstName,
           lastName : lastName,
           image :imageUrl, 
        },{
            headers :{
                "Authorization": `Bearer ${token}`
            }
        })
        setLoading(false);
        window.location.reload();
        }catch(err){
            console.log(err);
            setLoading(false);
            toast.error("Profile update failed");
        }
    }
    async function handleChangePassword(){
        if(password != confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        setLoading(true);
        try{
            const token=localStorage.getItem("token");
            await api.post("/users/password",{
                password : password,
            },{
                headers :{
                    "Authorization": `Bearer ${token}`
                }
            })
            setLoading(false);
            toast.success("Password changed successfully");
        }catch(err){
            console.log(err);
            setLoading(false);
            toast.error("Password change failed");
        }
    }

    return(
<div
  className="w-full h-full overflow-y-scroll pb-20 flex flex-col lg:flex-row justify-center items-center gap-4 bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/background.jpg')" }}
>            <div className="w-[400px] p-4 h-[400px] bg-white/40 backdrop-blur-sm shadow-2xl rounded-lg flex flex-col">
            <h1 className="text-2xl font-semibold mb-4"> Profile Information</h1>
            <label className="text-sm font-medium">First Name</label>
            <input type="text" value={firstName} className="w-full h-[40px] border border-gray-300 rounded-md px-2 mb-4"onChange={
                (e)=>{
                    setFirstName(e.target.value);
                }
            }/>
            <label className="text-sm font-medium">Last Name</label>
            <input type="text" value={lastName} className="w-full h-[40px] border border-gray-300 rounded-md px-2 mb-4"onChange={
                (e)=>{
                    setLastName(e.target.value);
                }
            }/>
            <label className="text-sm font-medium">Profile Image</label>
            <input type="file" accept="image/*" className="w-full h-[40px] border border-gray-300 rounded-md px-2 mb-4 "onChange={
                (e)=>{
                    setImage(e.target.files[0]);
                }
            }/>
            <button onClick={handleUpdateProfile} className="w-full h-[40px] bg-blue-500 text-white rounded-md hover:bg-blue-700">
                Update Profile
            </button>
            </div>

            
             <div className="w-[400px] p-4 h-[400px] bg-white/40 backdrop-blur-sm shadow-2xl rounded-lg flex flex-col">
            <h1 className="text-2xl font-semibold mb-4">Change Password</h1>
            <label className="text-sm font-medium">New Password</label>
            <input type="password" value={password} className="w-full h-[40px] border border-gray-300 rounded-md px-2 mb-4"onChange={
                (e)=>{
                    setPassword(e.target.value);
                }
            }/>
             <label className="text-sm font-medium">Confirm New Password</label>
            <input type="password" value={confirmPassword} className="w-full h-[40px] border border-gray-300 rounded-md px-2 mb-4"onChange={
                (e)=>{
                    setConfirmPassword(e.target.value);
                }
            }/>
            <button onClick={handleChangePassword} className="w-full h-[40px] bg-blue-500 text-white rounded-md hover:bg-blue-700">
                Change Password
            </button>
            </div>
            {
                loading && <LoadingScreen/>
            }

        </div>
    )
}