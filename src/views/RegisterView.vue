<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { token } from "@/stores/auth";

const router = useRouter()

const dataRegister = ref({
    email: "",
    password: "",
    confirm_password: ""
})

const register = async () => {
    console.log(token.value)
    // try {
    //     await fetch("http://localhost:8000/api/auth/register", {
    //         method: "POST",
    //         mode: "cors",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(dataRegister.value),
    //     }).then(async res => {
    //         const data = await res.json()
        
    //         alert("Register success")
    //         router.push("/login")
    //     })
    // } catch (error) {
    //     console.log(error)
    // }
}
</script>

<template>
    <div class="page">
        <form class="form" @submit.prevent="register">
            <h2>Register</h2>

            <label>Email</label>
            <input type="email" v-model="dataRegister.email">
            <div class="error"></div>

            <label>Password</label>
            <input type="password" v-model="dataRegister.password">
            <div class="error"></div>

            <label>Confirm Password</label>
            <input type="password" v-model="dataRegister.confirm_password">
            <div class="error"></div>

            <button type="submit">Register</button>
        </form>
    </div>
</template>

<style scoped>
@import url("@/assets/form.css");

.page {
    padding-top: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>