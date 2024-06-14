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
</script>

<template>
    <div>
        <div v-if="!isLoggedIn">
            <RouterLink to="/login">Login</RouterLink>
                |
            <RouterLink to="/register">Register</RouterLink>
        </div>
        <div v-else>
            <span @click="openDropdown" class="hover-email">{{ auth_user.email }}</span>
            <div class="hover-popup" v-if="showDropdown">
                <div class="overlay" @click="closeDropdown"></div>
                <div class="popup" @click="closeDropdown">
                    <span class="popup-tab">{{ auth_user.email }}</span>
                    <RouterLink v-if="!isCreatedProfile" class="popup-tab" to="/profile/update">Create Profile</RouterLink>
                    <RouterLink v-else class="popup-tab" :to="'/profile/' + auth_user.profile_id">MyProfile</RouterLink>
                    <span class="popup-tab" @click="logout">Logout</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.hover-email {
    cursor: pointer;
    background-color: rgb(212, 252, 93);
    padding: 6px;
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
}
</style>