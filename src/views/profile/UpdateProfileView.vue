<script setup>
import { ref, onBeforeMount } from "vue";
import { profile_update_api, profile_get_api } from "@/services/profile"
import { isCreatedProfile, auth_user } from "@/stores/auth"


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
        })
    } catch (error) {
        console.log(error)
    }
}
</script>

<template>
    <div class="page">
        <form class="form" @submit.prevent="updateProfile">
            <h1 v-if="isCreatedProfile">Update profile</h1>
            <h1 v-else>Create profile</h1>

            <label>Name</label>
            <input type="text" v-model="dataProfile.name">
            <div class="error"></div>

            <label>Description</label>
            <input type="text" v-model="dataProfile.description">
            <div class="error"></div>

            <label>Phone</label>
            <input type="text" v-model="dataProfile.phone">
            <div class="error"></div>

            <label>Address</label>
            <input type="text" v-model="dataProfile.address">
            <div class="error"></div>

            <label>Birthday</label>
            <input type="date" v-model="dataProfile.birthday">
            <div class="error"></div>

            <label>Gender</label>
            <input type="checkbox" v-model="dataProfile.gender">
            <div class="error"></div>

            <button type="submit">Update</button>
        </form>
    </div>
</template>

<style scoped>
.page {
    display: flex;
    justify-content: center;
}
</style>