<script setup>
import { ref } from "vue";
const dataLogin = ref({
    email: "",
    password: ""
})

const login = async () => {
    try {
        await fetch("http://localhost:8000/api/auth/login", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataLogin.value),
        }).then(async res => {
            const data = await res.json()
            console.log(data)
        })
    } catch (error) {
        console.log(error)
    }
}
</script>

<template>
    <div>
        <h1>Login</h1>

        <div>
            <div>
                <label>Email</label>
                <input type="text" v-model="dataLogin.email">
            </div>
            <div>
                <label>Password</label>
                <input type="password" v-model="dataLogin.password">
            </div>
        </div>
        <button @click="login">Login</button>
    </div>
</template>