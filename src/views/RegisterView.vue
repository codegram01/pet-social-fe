<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { token } from "@/stores/auth";
import { auth_register_api } from "@/services/auth";

const router = useRouter()

const dataRegister = ref({
    email: "",
    password: "",
    confirm_password: ""
})

const err_register = ref("");

const register = async () => {
    console.log(token.value)
    try {
        await auth_register_api(dataRegister.value)

        alert("Register success")

        router.push("/login")
    } catch (error) {
        err_register.value = error
    }
}
</script>

<template>
    <div class="page">
        <form class="form" @submit.prevent="register">
            <h2>Register</h2>

            <label>Email</label>
            <input type="email" v-model="dataRegister.email">
            <div class="error">{{ err_register }}</div>

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
.page {
    padding-top: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>