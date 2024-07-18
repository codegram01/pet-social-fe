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
    <div>
        <h1 class="text-center headline py-5">
            Pet Social
        </h1>

        <v-card
            class="text-center mx-auto"
            max-width="500px"
        >
            <v-icon
                size="120px"
                class="my-5"
            >
                mdi-account-circle
            </v-icon>
            <v-col
                cols="11"
                class="mx-auto"
            >
                <v-form
                    ref="formLogin"
                    class="text-left"
                >
                    <v-text-field
                        v-model="dataLogin.email"
                        label="Email"
                        type="email"
                        append-inner-icon="mdi-email"
                        color="primary"
                        variant="solo"             
                        autofocus
                        validate-on-blur
                        @input="checkEmail"
                    />
                    <!-- <input type="text" v-model="dataLogin.email" @input="checkEmail"> -->
                    <div>{{ errEmail }}</div>
                    <v-text-field
                        v-model="dataLogin.password"
                        label="Password"
                        type="password"
                        append-inner-icon="mdi-lock"
                        color="primary"
                        variant="solo"
                        class="mb-3"
                        hide-details="auto"              
                        validate-on-blur
                        @keyup.enter="login(dataLogin)"

                    />
                    <div class="error">{{ errPass }}</div>

                    <div class="text-right">
                        <v-btn
                            @click="login(dataLogin)"
                            color="primary"
                            class="text-white mt-3"
                        >
                            Login
                        </v-btn>
                        <div class="help-block">
                            Not have account
                            <RouterLink to="/register">Register</RouterLink>
                        </div>
                    </div>
                </v-form>
            </v-col>
        </v-card>
    </div>
</template>

<style scoped>
</style>