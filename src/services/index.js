import { setNotiMess } from "@/stores/noti"

export const process_error = (e) => {
    setNotiMess({
        mess: e,
        error: true
    })
}