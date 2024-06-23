import { isCreatedProfile } from "@/stores/auth" 

export const requireProfileCreated = () => {
    if(!isCreatedProfile.value) {
        alert("You must create profile first")

        return false
    }

    return true;
}