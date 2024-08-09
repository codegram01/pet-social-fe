<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { profile_update_api, profile_get_api } from "@/services/profile"
import { pet_create_api, detail_pet_api, pet_update_api } from "@/services/pet"
import { isCreatedProfile, auth_user } from "@/stores/auth"
import { useRoute, useRouter } from "vue-router";
import Popup from "../common/Popup.vue";
const emits = defineEmits(["close", "updateProfile", "createProfilePet"]);

const router = useRouter();
const route = useRoute();
const props = defineProps(["type"])

const idPet = computed(()=> {
    return route.params.idUser
})

// avatar 

onBeforeMount(async ()=> {
    if(props.type == "PROFILE") {
        if(isCreatedProfile.value){
            try {
                await profile_get_api(auth_user.value.profile_id).then(res => {
                    res.birthday = res.birthday.split("T")[0]
                    dataProfile.value = res
                })
            } catch (error) {
                console.log(error)
            }
        }
    } else {
        if(props.type == "PET_UPDATE") {
            try {
                await detail_pet_api(idPet.value).then(res => {
                    dataProfile.value = res
                })
            } catch (error) {
                console.log(error);
            }
        }
    }
})

const dataProfile = ref({
    name: "",
    description: "",
    phone: "", // PROFILE
    address: "", // PROFILE
    birthday: "",
    gender: true,
    specie_type: "" // PET
})

const updateProfile = async () => {
    switch(props.type) {
        case "PROFILE":
            try {
                await profile_update_api({
                    name: dataProfile.value.name,
                    description: dataProfile.value.description,
                    phone: dataProfile.value.phone,
                    address: dataProfile.value.address,
                    birthday: new Date(dataProfile.value.birthday),
                    gender: dataProfile.value.gender
                }).then(res => {
                    auth_user.value.profile_id = res.id;
                    close();
                    emits("updateProfile", res)
                })
            } catch (error) {
                console.log(error)
            }
            break;
        case "PET":
        case "PET_UPDATE":
            try {
                const funcPet = updateOrCreatePet(props.type)
                await funcPet(idPet.value, {
                    name: dataProfile.value.name,
                    description: dataProfile.value.description,
                    birthday: new Date(dataProfile.value.birthday),
                    gender: dataProfile.value.gender,
                    specie_type: dataProfile.value.specie_type
                }).then(res => {
                    if(route.path.includes('/pet/')){
                        emits("createProfilePet", res)
                    } else {
                        router.push(`/profile/pet/${res.id}`)
                    }
                    
                    close();
                })
            } catch (error) {
                console.log(error)
            }
            break;
    }
}

const updateOrCreatePet = (type) => {
    if(type == "PET"){
        return pet_create_api
    }else{
        return pet_update_api
    }
}

const close = () => {
    emits("close")
}

const labelTitle = computed(()=> {
    switch(props.type){
        case "PROFILE":
            if(isCreatedProfile.value) {
                return "Update Profile"
            } else {
                return "Create Profile"
            }
            break;
        case "PET":
            return "Create Pet"
        case "PET_UPDATE":
            return "Update Pet"
    }
})

const disableDate = computed(()=> {
    let now = new Date(Date.now())

    const nowISO = now.toISOString()
    const nowYMD = nowISO.split("T")[0]
    return nowYMD
})

</script>

<template>
    <div>
        <h1 v-if="isCreatedProfile">Update profile</h1>
        <h1 v-else>Create profile</h1>
        <form class="form" @submit.prevent="updateProfile">
            <Popup @close="close">
                <template v-slot:header>
                    {{ labelTitle }}
                </template>
                <template v-slot:body>
                    <label>Name</label>
                    <input class="form-control"  type="text" v-model="dataProfile.name">
                    <div class="error"></div>
            
                    <label>Description</label>
                    <input class="form-control"  type="text" v-model="dataProfile.description">
                    <div class="error"></div>

                    <div v-if="type == 'PROFILE'">
                        <label>Phone</label>
                        <input class="form-control"  type="text" v-model="dataProfile.phone">
                        <div class="error"></div>

                        <label>Address</label>
                        <input class="form-control"  type="text" v-model="dataProfile.address">
                        <div class="error"></div>
                    </div>
                    <div v-else>
                        <div class="form-group">
                            <label>Specie type</label>
                            <input class="form-control"  type="text" v-model="dataProfile.specie_type">
                            <div class="error"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Birthday</label>
                        <input class="form-control" id="birthdayElm"  type="date" :max="disableDate" v-model="dataProfile.birthday">
                        <div class="error"></div>
                    </div>
                    <div class="checkbox">
                        <label>
                            <input v-model="dataProfile.gender" type="checkbox" name="remember" value="1"> Male
                        </label>
                        <div class="error"></div>
                    </div>
                </template>
                <template v-slot:bottom>
                    <button type="submit" class="btn btn-primary">Update</button>
                    <button type="button" @click="close" class="btn--light">Cancel</button>
                </template>
            </Popup>
        </form>
    </div>
</template>

<style scoped>
.page {
    display: flex;
    justify-content: center;
}
</style>