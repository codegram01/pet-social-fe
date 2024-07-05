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
    <div>
        <h1>Register</h1>
        <div class="dev_page_content">
            <div class="form_wrap">
                <form @submit.prevent="register">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" class="form-control" v-model="dataRegister.email" placeholder="Enter email">
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control" v-model="dataRegister.password"
                            placeholder="Enter password">
                    </div>


                    <div class="form-group">
                        <label>Confirm Password</label>
                        <input type="password" class="form-control" v-model="dataRegister.confirm_password"
                            placeholder="Enter confirm password">
                    </div>

                    <!-- <div class="error">{{ err_register }}</div> -->
                    <div class="support_submit">
                        <button type="submit" class="btn btn-primary">Register</button>
                    </div>

                    <div class="help-block">
                        Have account
                        <RouterLink to="/login">Login</RouterLink>
                    </div>
                </form>
            </div>

        </div>
    </div>
</template>

<style scoped></style>