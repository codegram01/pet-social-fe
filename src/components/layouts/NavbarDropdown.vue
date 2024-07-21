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
    <li class="dropdown" v-if="!isLoggedIn">
        <RouterLink to="/login">Login</RouterLink>
    </li>
    <li v-else class="dropdown">
        <a href="#" @click="switchDropdown">
            <i class="bi bi-person-fill"></i>
        </a>
        <div class="hover-popup" v-if="showDropdown">
            <!-- <div class="overlay"></div> -->
            <div class="popup" @click="closeDropdown">
                <span class="popup-tab">{{ auth_user.email }}</span>
                <RouterLink v-if="!isCreatedProfile" class="popup-tab" to="/profile/update">Create Profile</RouterLink>
                <RouterLink v-else class="popup-tab" :to="'/profile/' + auth_user.profile_id">MyProfile</RouterLink>
                <span class="popup-tab" @click="logout">Logout</span>
            </div>
        </div>
    </li>
</template>

<style scoped>
.hover-email {
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
}
</style>