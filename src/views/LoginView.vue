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
                    />
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