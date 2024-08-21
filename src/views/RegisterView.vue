<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { token } from "@/stores/auth";
import { auth_register_api } from "@/services/auth";
import { openPopup } from "@/stores/popup";

const router = useRouter()

const dataRegister = ref({
    email: "",
    password: "",
    confirm_password: ""
})

const err_register = ref("");

const register = async () => {
    try {
        await auth_register_api(dataRegister.value)

        openPopup({
            title: "Register success",
            content: "Go to login page and login",
            close: ()=> {
                router.push("/login")
            },
            
        })
    } catch (error) {
        err_register.value = error
    }
}

const confirmRegister = () => {
    openPopup({
        title: "Confirm",
        content: "Are you sure want to create account",
        confirm: ()=> {
            register();
        }
    })
}
</script>

<template>
    <div class="main">
        <div class="main-center">
			<div class="card">
				<div class="title">Register new account</div>
				<div style="display: flex">
					<form class="form" @submit.prevent="confirmRegister">
						<label>Email</label>
						<input 
							type="email" 
							class="form-control" 
							v-model="dataRegister.email" 
							placeholder="Enter email"
						>
						<div class="error">{{ errRegister }}</div>

						<label>Password</label>
						<input 
							type="password" 
							class="form-control" 
							v-model="dataRegister.password" 
							placeholder="Enter password"
						>
						<div class="error"></div>

						<label>Confirm Password</label>
						<input 
							type="password" 
							class="form-control" 
							v-model="dataRegister.confirm_password" 
							placeholder="Enter confirm password"
						>
						<div class="error"></div>

						<button type="submit" class="btn btn-primary">Register</button>
					</form>
					<img style="width: 100%" src="/public/icons/login-thumbnail-2.png"/>

				</div>
			</div>
			<div class="help-block">
				Have account
				<RouterLink to="/login">Login</RouterLink>
			</div>
        </div>
    </div>
</template>

<style scoped>
.help-block {
    margin-top: 24px;
}
.half {
	width: 50%;
}
.form {
	width: 70%;
	margin-top: 24px;
}

.form input {
	width: 100%;
}

.title {
	font-size: 20px;
	color: var(--c-primary);
	border-bottom: 1px solid var(--c-border);
	padding-bottom: 18px;
	padding-top: 12px;
}
</style>
