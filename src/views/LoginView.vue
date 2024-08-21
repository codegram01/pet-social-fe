<script setup>
import { ref } from "vue";
import { save_token_local, get_auth_info } from "@/stores/auth";
import { auth_login_api } from "@/services/auth"
import { useRouter } from "vue-router";
import { g_validation } from "@/modules/validation";
import { setNotiMess } from "@/stores/noti";

const router = useRouter();

const dataLogin = ref({
    email: "",
    password: ""
})

const errEmail = ref("");
const checkEmail = () => {
	errEmail.value = g_validation({
        data: dataLogin.value.email,
		label: "Email",
		type: "EMAIL"
	});
	if(errEmail.value){
		return false;
	}else{
		return true;
	}
}

const errPass = ref("")
const checkPass = () => {
    errPass.value = g_validation({
        data: dataLogin.value.password,
		label: "Password",
		type: "PASSWORD"
	});
	if(errPass.value){
		return false;
	}else{
		return true;
	}
}


const login = async () => {
    if(checkEmail() && checkPass()){
        try {
            const data = await auth_login_api(dataLogin.value)
            save_token_local(data.token)
            await get_auth_info()

            setNotiMess({
                mess: "Login success",
            })

            router.push("/")
        } catch (error) {
            console.log('on login error ', error)
        }
    }
}

</script>

<template>
    <div class="main">
        <div class="main-center">
			<div class="card" style="display:flex">
				<form class="form half" @submit.prevent="login">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="dataLogin.email" placeholder="Enter email">
                    <div class="error">{{ errEmail }}</div>

                    <label>Password</label>
                    <input type="password" class="form-control" v-model="dataLogin.password" placeholder="Enter password">
                    <div class="error">{{ errPass }}</div>

                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
				<img class="half" src="/public/icons/login-thumbnail.png"/>
			</div>
			<div class="help-block">
				Not have account
				<RouterLink to="/register">Register</RouterLink>
			</div>
        </div>
    </div>
</template>

<style scoped>
.help-block {
    margin-top: 24px;
}

.form {
	margin-top: 24px;
}

.form input {
	width: 100%;
}

.half {
	width: 50%;
}
</style>
