<script setup>
import { ref, onBeforeMount } from "vue";
import { profile_update_api, profile_get_api } from "@/services/profile"
import { isCreatedProfile, auth_user } from "@/stores/auth"
import { useRouter } from "vue-router";

const router = useRouter();

onBeforeMount(async ()=> {
    console.log("is created profile ", isCreatedProfile.value);

    if(isCreatedProfile.value){
        try {
            await profile_get_api(auth_user.value.profile_id).then(res => {
                dataProfile.value = res
            })
        } catch (error) {
            console.log(error)
        }
    }
})

const dataProfile = ref({
    name: "",
    description: "",
    phone: "",
    address: "",
    birthday: "",
    gender: true
})

const updateProfile = async () => {
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
             
       
                <div class="form-group">
                    <label>Phone</label>
                    <input class="form-control"  type="text" v-model="dataProfile.phone">
                </div>
              
        
                <div class="form-group">
                    <label>Address</label>
                    <input class="form-control"  type="text" v-model="dataProfile.address">
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