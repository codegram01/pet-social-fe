import { ref } from "vue";
import { api } from "@/modules/api";

export const token = ref("")

export const auth_user = ref(null)

export const save_token_local = (tk) => {
    token.value = "Bearer " + tk
    localStorage.setItem("TOKEN", token.value)
}

export const get_auth_info = async () => {
    try {
        const data = await api("GET", "/auth/info")
        auth_user.value = data;
    } catch (error) {
        console.log(error)
    }
}

export const load_token_local = () => {
    const tokenLocal = localStorage.getItem("TOKEN");

    if(tokenLocal) {
        token.value = tokenLocal;
    }
}

export const init_auth = async () => {
    load_token_local();

    if(token.value){
        await get_auth_info();
    }
}

export const logout = () => {
    token.value = null;
    auth_user.value = null;

    localStorage.clear()
}