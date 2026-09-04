import { createClient } from "@supabase/supabase-js";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2cW93Z2FjZXZqbWJub3dteXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwNjAyOTQsImV4cCI6MjEwMjYzNjI5NH0.azQBmgW3n8miEh5GL0biTFE2UWaSZn_koiPAbXbfYYI";
const url = "https://kvqowgacevjmbnowmyse.supabase.co";

const supbase = createClient(url, key);


export default function uploadMedia(file){
    return new Promise((resolve, reject)=>{
        if(file==null){
            reject("No file provided")
        }else{
            const timestamp = new Date().getTime()
            const fileName = timestamp + "_" + file.name

            supbase.storage.from("images").upload(fileName, file)
                .then(()=>{
                    const publicUrl = supbase.storage.from("images").getPublicUrl(fileName);
                    resolve(publicUrl.data.publicUrl)
                })
                .catch((error)=>{
                    reject(error)
                })
        }
    })
}