<script setup>
import { auth_user, logout } from "@/stores/auth";

</script>

<template>
    <div class="navbar">
        <RouterLink class="logo" to="/">Pet Social</RouterLink> -
        <RouterLink to="/posts">Posts</RouterLink>
     
        <div class="navbar-action">
            <span v-if="auth_user">
                <span>{{ auth_user.email }}</span>
                <button @click="logout">logout</button>
                <RouterLink to="/profile/update">update profile</RouterLink>
            </span>
            <span v-else>
                <RouterLink to="/login">Login</RouterLink>
                |
                <RouterLink to="/register">Register</RouterLink>
            </span>
        </div>
    </div>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  background: rgb(199, 199, 242);
  position: absolute;
  width: 100%;
  height: 100%;
}

.navbar-action {
  margin-left: auto;
}
</style>