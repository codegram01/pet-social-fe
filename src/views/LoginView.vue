<script setup>
import { ref } from "vue";
import { save_token_local, get_auth_info } from "@/stores/auth";
import { auth_login_api } from "@/services/auth"

const dataLogin = ref({
    email: "",
    password: ""
})

const login = async () => {
    try {
        const data = await auth_login_api(dataLogin.value)
        save_token_local(data.token)
        await get_auth_info()
    } catch (error) {
        console.log('on login error ', error)
    }
}

</script>

<template>
    <div class="page">
        <form class="form" @submit.prevent="login">
            <h2>Login</h2>

            <label>Email</label>
            <input type="email" v-model="dataLogin.email">
            <div class="error"></div>

            <label>Password</label>
            <input type="password" v-model="dataLogin.password">
            <div class="error"></div>

            <button type="submit">Login</button>
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