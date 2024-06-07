import { ref } from "vue";
import { token } from "@/stores/auth";

export const api = async (method, url, data) => {
    const urlApi = "http://localhost:8000/api" + url;
    let body;
    if(data){
        body = JSON.stringify(data)
    }

    try {
        return await fetch(urlApi, {
            method: method,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token.value
            },
            body: body,
        }).then(async res => {
            const data = await res.json()
            
            return data;
    })
    } catch (error) {
        console.log(error)
    }
}