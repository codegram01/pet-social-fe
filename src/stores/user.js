import { ref } from "vue"
import { user_info_get_api } from "@/services/profile";

const users = ref([])

// Những API đang được gọi
const usersCache = ref([])
/*
    userCache = {
        id: user_id
        api: api
    }
*/


// return user
export const getUserInfo = async (id) => {
    const idf = users.value.findIndex(user => user.id == id)
    if(idf >= 0){
        return users.value[idf]
    }

    const idCachef = usersCache.value.findIndex(userCache => userCache.id == id)
    if(idCachef >= 0){
        return usersCache.value[idCachef].api
    }


    try {
        const api = user_info_get_api(id).then(res => {
            const idf = users.value.findIndex(user => res.id == user.id)
            if(idf < 0) {
                users.value.push(res)
            }
            
            const idCachex = usersCache.value.findIndex(userCache => userCache.id == res.id)
            if(idCachex >= 0) {
                usersCache.value.splice(idCachex, 1)
            }

            console.log("usersCache ", usersCache.value)

            return res
        })

        usersCache.value.push({
            id: id,
            api: api
        })

        return api 
    } catch (error) {
        console.log(error)
    }
}