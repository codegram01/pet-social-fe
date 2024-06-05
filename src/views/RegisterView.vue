<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const dataRegister = ref({
    email: "",
    password: "",
    confirm_password: ""
})

const register = async () => {
    try {
        await fetch("http://localhost:8000/api/auth/register", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataRegister.value),
        }).then(async res => {
            const data = await res.json()
        
            alert("Register success")
            router.push("/login")
        })
    } catch (error) {
        console.log(error)
    }
}
</script>

<template>
    <div>
        <h1>Register</h1>

        <div>
            <div>
                <label>Email</label>
                <input type="text" v-model="dataRegister.email">
            </div>
            <div>
                <label>Password</label>
                <input type="password" v-model="dataRegister.password">
            </div>
            <div>
                <label>Confirm Password</label>
                <input type="password" v-model="dataRegister.confirm_password">
            </div>
        </div>
        <button @click="register">Register</button>
    </div>
</template>