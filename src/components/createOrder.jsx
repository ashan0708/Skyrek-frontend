import { useState } from "react"   
import { useNavigate } from "react-router-dom"
import api from "../utils/api"
import toast from "react-hot-toast"
   
export default function CreateOrder(props){   
    const [isModalOpen , setIsModalOpen] = useState(false)   
    const [firstName , setFirstName] = useState("")   
    const [lastName , setLastName] = useState("")   
    const [addressLine1 , setaddressLine1] = useState("")   
    const [addressLine2 , setaddressLine2] = useState("")   
    const [City , setCity] = useState("")   
    const [phone,setPhone] = useState("")   
    const navigate = useNavigate() 
    const cart = props.cart   
 
    async function placeorder(){ 
        try{ 
 
            const body = { 
                firstName : firstName, 
                lastName : lastName, 
                addressLine1 : addressLine1, 
                addressLine2 : addressLine2, 
                City : City,  
                phone : phone, 
                items : [] 
            } 

            for(let i = 0; i < cart.length; i++){ 
                const item = cart[i] 

                body.items.push({ 
                    productId : item.product.productId, 
                    qty : item.qty 
                }) 
            } 
           

            const token = localStorage.getItem("token") 

            await api.post("/orders", body,{ 
                headers : { 
                    Authorization : `Bearer ${token}` 
                } 
            }) 

            toast.success("order placed successfully") 
            setIsModalOpen(false) 
            navigate("/") 
 
        }catch(error){ 
            toast.error(error?.response?.data?.message || "An error Occurred") 
        } 
    } 
   
    return (   
        <>   
        {isModalOpen &&  
        <div className="w-screen h-screen fixed left-0 top-0 bg-black/70 flex justify-center items-center z-50"> 
 
            <div className="w-[320px] h-[350px] bg-white rounded-lg flex flex-col items-center justify-center gap-4 p-4 relative">   
                <button onClick={()=>  
                    setIsModalOpen(false)}  
                    className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"> 
                    x 
                </button>   
 
                <h2 className="text-2xl font-bold">Enter Shipping Details</h2>   
 
                <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full border p-1 rounded"/>   
 
                <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full border p-1 rounded"/>   
 
                <input type="text" placeholder="Address Line 1" value={addressLine1} onChange={(e) => setaddressLine1(e.target.value)} className="w-full border p-1 rounded"/>   
 
                <input type="text" placeholder="Address Line 2" value={addressLine2} onChange={(e) => setaddressLine2(e.target.value)} className="w-full border p-1 rounded"/>   
 
                <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border p-1 rounded"/>   
 
                
                <button onClick={placeorder} className="w-full p-2 text-white bg-blue-700 rounded-sm">  
                    Confirm Order  
                </button>              
            </div> 
 
        </div> 
        }   
   
        <button onClick={()=> setIsModalOpen(true)} className="w-[220px] p-2 text-white bg-blue-700 rounded-sm hover:bg-green-600">   
            Order Now   
        </button>   
   
        </>   
    )   
}