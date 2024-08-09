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
    <div class="dropdown" v-if="!isLoggedIn">
        <RouterLink to="/login">Login</RouterLink>
    </div>
    <div v-else class="dropdown">
        <div class="tab-list-col">
            <RouterLink class="tab" to="/chats">
                <i class="bi bi-chat-fill"></i>
                <span class="tab-text">Chats</span>
            </RouterLink>
            <span class="link tab" @click="switchDropdown">
                <i class="bi bi-person-fill"></i>
                <span class="tab-text">Account</span>
            </span>
        </div>
        <div class="hover-popup" v-if="showDropdown">
            <!-- <div class="overlay"></div> -->
            <div class="popup" @click="closeDropdown">
                <span class="popup-tab">{{ auth_user.email }}</span>
                <RouterLink v-if="!isCreatedProfile" class="popup-tab" to="/profile/update">Create Profile</RouterLink>
                <RouterLink v-else class="popup-tab" :to="'/profile/' + auth_user.profile_id">MyProfile</RouterLink>
                <span class="popup-tab" @click="logout">Logout</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.hover-email {
    cursor: pointer;
}

.overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    z-index: 10;
}

.tab + .tab {
    margin-left: 24px;
}
</style>