import { process_error } from "."
import { api } from "@/modules/api"

export const profile_update_api = async (data) => {
    try {
        return await api("POST", "/profiles", data)
    } catch (error) {
        process_error(error)
        throw error
    }
}

export const profile_get_api = async (id) => {
    try {
        return await api("GET", `/profiles/${id}`)
    } catch (error) {
        process_error(error)
        throw error
    }
}

export const user_info_get_api = async (id) => {
    try {
        return await api("GET", `/profiles/info/${id}`)
    } catch (error) {
        process_error(error)
        throw error
    }
}