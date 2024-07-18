<script setup>
import { isLoggedIn, isCreatedProfile, logout, auth_user } from "@/stores/auth";
import { ref } from "vue";

const showDropdown = ref(false)
const openDropdown = () => {
    showDropdown.value = true;
}
const closeDropdown = () => {
    showDropdown.value = false;
}
const switchDropdown = () => {
    showDropdown.value = !showDropdown.value
}
</script>

<template>
    <div v-if="!isLoggedIn">
        <v-btn variant="text" rounded>
            <RouterLink to="/login">Login</RouterLink>
        </v-btn>
    </div>
    <div v-else>
        <v-menu
            min-width="200px"
            rounded
        >
            <template v-slot:activator="{ props }">
                <v-btn
                    icon
                    v-bind="props"
                >
                    <v-avatar
                        size="large"
                    >
                        <v-icon icon="mdi-account-circle"></v-icon>
                    </v-avatar>
                </v-btn>
            </template>
            <v-card>
                <v-card-text>
                    <div class="mx-auto text-center">
                        <v-avatar
                            color="brown"
                        >
                            <v-icon icon="mdi-account-circle"></v-icon>
                        </v-avatar>
                        <p class="text-caption mt-1">
                            {{ auth_user.email }}
                        </p>
                        <v-divider class="my-2"></v-divider>
                        <v-btn variant="text" rounded>
                            <RouterLink v-if="!isCreatedProfile" to="/profile/update">Create Profile</RouterLink>
                            <RouterLink v-else :to="'/profile/' + auth_user.profile_id">MyProfile</RouterLink>
                        </v-btn>
                        <v-divider class="my-2"></v-divider>
                        <v-btn
                            variant="text"
                            rounded
                            @click="logout"
                        >
                            Logout
                        </v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </v-menu>
    </div>
</template>

<style scoped>
/* .hover-email {
    cursor: pointer;
}

.hover-popup {
    position: relative;
}

.popup {
    position: absolute;
    width: 200px;
    background-color: white;
    z-index: 11;
    display: flex;
    flex-flow: column;
    border-radius: 6px;
    border: 1px solid #eee;
    right: 0px;
}

.popup-tab {
    padding: 12px;
}

.overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    z-index: 10;
} */
</style>