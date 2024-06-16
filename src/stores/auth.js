import { ref, computed } from "vue";
import { auth_info_api } from "@/services/auth";

export const token = ref("")

export const auth_user = ref(null)

export const isLoggedIn = computed(()=> {
    return auth_user.value
})

export const isCreatedProfile = computed(()=> {
    if(!isLoggedIn.value){
        return false
    }else {
        if(auth_user.value.profile_id){
            return true
        }
    }
    return false;
})

export const myProfileId = computed(()=> {
    if(auth_user.value){
        return auth_user.value.profile_id
    }
})
/*
"id": 6,
"email": "nguyenpro@gmail.com",
"created_at": "2024-06-09T13:48:22.478Z",
"profile_id": 10,  // co khi nguoi dung da tao profile
"role": "USER"
*/


export const save_token_local = (tk) => {
    token.value = "Bearer " + tk
    localStorage.setItem("TOKEN", token.value)
}

export const get_auth_info = async () => {
    try {
        const data = await auth_info_api()
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
        // user chưa đăng nhập 
        await get_auth_info();
        // user đã đăng nhập 
    }
}

export const logout = () => {
    token.value = null;
    auth_user.value = null;

    localStorage.clear()
}