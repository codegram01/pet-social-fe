<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { profile_update_api, profile_get_api } from "@/services/profile"
import { pet_create_api, detail_pet_api, pet_update_api } from "@/services/pet"
import { isCreatedProfile, auth_user } from "@/stores/auth"
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const props = defineProps(["type"])

const idPet = computed(()=> {
    return route.params.idPet
})

onBeforeMount(async ()=> {
    console.log(props.type)
    if(props.type == "PROFILE") {
        if(isCreatedProfile.value){
            try {
                await profile_get_api(auth_user.value.profile_id).then(res => {
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
                    
                    router.push(`/profile/${res.id}`)
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
                    router.push(`/profile/pet/${res.id}`)
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

</script>

<template>
    <div>
        <h1 v-if="isCreatedProfile">Update profile</h1>
        <h1 v-else>Create profile</h1>
        <div class="dev_page_content form_wrap">
            <form @submit.prevent="updateProfile">
                <div class="form-group">
                    <label>Name</label>
                <input class="form-control"  type="text" v-model="dataProfile.name">
           
                </div>

                <div class="form-group">
                    <label>Description</label>
                    <input class="form-control"  type="text" v-model="dataProfile.description">
                </div>
             
       
                <div v-if="type == 'PROFILE'">
                    <div class="form-group">
                        <label>Phone</label>
                        <input class="form-control"  type="text" v-model="dataProfile.phone">
                    </div>
                
            
                    <div class="form-group">
                        <label>Address</label>
                        <input class="form-control"  type="text" v-model="dataProfile.address">
                    </div>
                </div>
                <div v-else>
                    <div class="form-group">
                        <label>Specie type</label>
                        <input class="form-control"  type="text" v-model="dataProfile.specie_type">
                    </div>
                </div>
              
            
                <div class="form-group">
                    <label>Birthday</label>
                    <input class="form-control"  type="date" v-model="dataProfile.birthday">
                </div>
             
           
                <div class="checkbox">
                    <label>
                        <input v-model="dataProfile.gender" type="checkbox" name="remember" value="1"> Male
                    </label>
                </div>
    
                <br>
                <div class="support_submit">
                    <button type="submit" class="btn btn-primary">Update</button>
                    <RouterLink to="/" class="btn">Cancel</RouterLink>
                </div>
            </form>
        </div>
        
    </div>
</template>

<style scoped>
.page {
    display: flex;
    justify-content: center;
}
</style>