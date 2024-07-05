<script setup>
import { ref } from "vue";
import { save_token_local, get_auth_info } from "@/stores/auth";
import { auth_login_api } from "@/services/auth"
import { useRouter } from "vue-router";

const router = useRouter();

const dataLogin = ref({
    email: "",
    password: ""
})

const login = async () => {
    try {
        const data = await auth_login_api(dataLogin.value)
        save_token_local(data.token)
        await get_auth_info()

        router.push("/")
    } catch (error) {
        console.log('on login error ', error)
    }
}

</script>

<template>
    <div>
        <h1>Login</h1>
        <div class="dev_page_content">
            <div class="form_wrap">
                <form @submit.prevent="login">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" class="form-control" v-model="dataLogin.email" placeholder="Enter email">
                    </div>
                   
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control" v-model="dataLogin.password" placeholder="Enter password">
                    </div>

                    <div class="support_submit">
                        <button type="submit" class="btn btn-primary">Login</button>
                    </div>
                </form>

                <div class="help-block">
                    Not have account
                    <RouterLink to="/register">Register</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>