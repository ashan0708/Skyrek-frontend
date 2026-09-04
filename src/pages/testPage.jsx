import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaTwitter } from "react-icons/fa6";
import { createClient } from "@supabase/supabase-js";

export default function TestPage(){
  return(
    <div className="w-full h-full bg-green-400 md:bg-red-600 lg:bg-blue-500">
      
    </div>
  );
}



































//const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2cW93Z2FjZXZqbWJub3dteXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwNjAyOTQsImV4cCI6MjEwMjYzNjI5NH0.azQBmgW3n8miEh5GL0biTFE2UWaSZn_koiPAbXbfYYI";
//const url = "https://kvqowgacevjmbnowmyse.supabase.co";

//const supbase = createClient(url, key);




// export default function TestPage() {
//   const [file, setFile] = useState(null);
//   function uploadFile() {
//     console.log(file);
//     supbase.storage.from("images").upload(file.name, file)
//     .then(()=>{
//       const publicUrl = supbase.storage.from("images").getPublicUrl(file.name);
//       console.log(publicUrl)
//     })
//   }
//   return (
//     <div className="w-full h-full flex justify-center items-center">
//       <input type="file" onChange={
//         (e)=>{
//           setFile(e.target.files[0]);
//         }
//       }/>

//       <button
//         onClick={uploadFile}
//         className="bg-blue-600 p-4 rounded-lg text-white">
//         upload
//       </button>
//     </div>
//   );
// }




// export default function TestPage() {
//   const [score, setScore] = useState(10);
//   const [mood, setMood] = useState("😍");
//   const [isFollowed, setIsFollowed] = useState(false);

//   return (
//     <div className="w-full h-screen bg-green-400 flex justify-center items-center">

      
//       <Toaster position="top-right" />

//       <div className="w-[450px] h-[450px] bg-white flex justify-center items-center flex-col">

//         <h1 className="font-bold text-7xl">{score}</h1>

//         <div className="w-full h-[100px] flex justify-center items-center" />

//         <div className="flex">
//           <button
//             className="w-[100px] bg-red-600 h-[40px] mx-5"
//             onClick={() => setScore(score - 1)}
//           >
//             Decrease
//           </button>

//           <button
//             className="w-[100px] bg-green-600 h-[40px] mx-5"
//             onClick={() => setScore(score + 1)}
//           >
//             Increase
//           </button>
//         </div>

//         <h1 className="w-full flex justify-center items-center text-5xl">
//           {mood}
//         </h1>

//         <div className="w-full h-[50px] flex justify-center items-center" />

//         <div className="flex flex-col items-center gap-4">

//           <button
//             className="w-[100px] bg-red-600 h-[40px]"
//             onClick={() => {
//               toast.error("You are sad now!");
//               setMood("😢");
//             }}
//           >
//             Sad
//           </button>

//           <button
//             className="w-[100px] bg-green-600 h-[40px]"
//             onClick={() => {
//               toast.success("You are happy now!");
//               setMood("😊");
//             }}
//           >
//             Happy
//           </button>

//         </div>
// <FaTwitter
//   onClick={() => {
//     toast("Follow us on Twitter!", {
//       icon: <FaTwitter className="text-blue-500" />,
//     });
//     setIsFollowed(true);
//   }}
//   className={`text-5xl cursor-pointer ${
//     isFollowed ? "text-blue-500" : "text-gray-500"
//   }`}
// />

//       </div>
//     </div>
//   );
// }