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
    <div>
        <h1 class="text-center headline py-5">
            Register
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
                        v-model="dataRegister.email"
                        label="Email"
                        type="email"
                        append-inner-icon="mdi-email"
                        color="primary"
                        variant="solo"             
                        autofocus
                        validate-on-blur
                    />
                    <v-text-field
                        v-model="dataRegister.password"
                        label="Password"
                        type="password"
                        append-inner-icon="mdi-lock"
                        color="primary"
                        variant="solo"
                        class="mb-3"
                        hide-details="auto"              
                        validate-on-blur
                    />

                    <v-text-field
                        v-model="dataRegister.confirm_password"
                        label="Confirm Password"
                        type="password"
                        append-inner-icon="mdi-lock"
                        color="primary"
                        variant="solo"
                        class="mb-3"
                        hide-details="auto"              
                        validate-on-blur
                        @keyup.enter="confirmRegister"
                    />

                    <div class="text-right">
                        <v-btn
                            @click="confirmRegister"
                            color="primary"
                            class="text-white mt-3"
                        >
                            Register
                        </v-btn>
                        <div class="help-block">
                            Not have account
                            <RouterLink to="/login">Login</RouterLink>
                        </div>
                    </div>
                </v-form>
            </v-col>
        </v-card>
    </div>
</template>

<style scoped></style>