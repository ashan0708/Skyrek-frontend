import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { getCart} from "../utils/cart"
import CreateOrder from "../components/createOrder.jsx"

function getFormattedPrice(price) {
    return "LKR. " + Number(price).toLocaleString("en-US")
}

export default function CheckoutPage() {
    const location = useLocation()
    const data = location.state
    const [cart, setCart] = useState(data)

    return (
        <div className="w-full h-full overflow-y-scroll flex items-center flex-col">
            {cart.map((cartItem, index) => (
                <div key={index} className="w-[400px] lg:w-[600px] h-[250px] lg:h-[250px] shadow-2xl bg-white my-4 flex flex-row relative">
                    <img src={cartItem.product.image} className="h-full w-[150px] object-contain p-2"/>
                    <div className="h-full w-[450px] flex flex-col p-4">
                        <h3 className="text-lg font-bold">{cartItem.product.name}</h3>
                        <p className="text-gray-500 text-sm line-through">{getFormattedPrice(cartItem.product.labelledPrice)}</p>
                        <p className="text-blue-700 lg:text-2xl font-semibold">{getFormattedPrice(cartItem.product.price)}</p>

                        <div className="h-[30px] w-[100px] mt-2 border border-blue-400 rounded-4xl flex flex-row items-center justify-center overflow-hidden">
                            <button 
                                className="w-[30px] h-full hover:bg-blue-600 hover:text-white" 
                                onClick={() => { 
                                    const newCart = [...cart];

                                    if (newCart[index].qty > 1) {
                                        newCart[index].qty = newCart[index].qty - 1;
                                        setCart(newCart);
                                    }
                                }}
                            >
                                -
                            </button>

                            <span className="w-[40px] h-full flex justify-center items-center">
                                {cartItem.qty}
                            </span>

                            <button
                                className="w-[30px] h-full hover:bg-blue-600 hover:text-white"
                                onClick={
                                    ()=>{
                                        const newCart = [...cart]
                                        newCart[index].qty = newCart[index].qty + 1
                                        setCart(newCart)
                                    }
                                }
                            >
                                +
                            </button>
                        </div>

                        

                        <span className="absolute bottom-2 text-xl right-2 text-blue-700 font-semibold">
                            {getFormattedPrice(cartItem.product.price * cartItem.qty)}
                        </span>

                    </div>
                </div>
            ))}

            <div className="w-[600px] h-[150px] sticky bottom-0 shadow-2xl bg-white my-4 flex flex-row items-center justify-between p-4">
               <CreateOrder cart={cart}/>

                <div className="flex justify-end items-center"/>

                <span className="text-black-600 text-lg mr-4">
                    Total:
                </span>

                <span className="text-red-700 text-2xl font-bold">
                    {getFormattedPrice(
                        cart.reduce(
                            (total, cartItem) =>
                                total + (cartItem.product.price * cartItem.qty),
                            0
                        )
                    )}
                </span>
            </div>
        </div>
    )
}