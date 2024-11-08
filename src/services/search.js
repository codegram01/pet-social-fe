
import { process_error } from "."
import { api } from "@/modules/api"


/*
    service: 
        - articles
        - pets
        - posts
        - profiles
*/

export const search_api = async (service, key) => {
    try {
        let url = `/${service}/search?key=${key}`
        return await api("GET", url)
    } catch (error) {
        process_error(error)
        throw error
    }
}