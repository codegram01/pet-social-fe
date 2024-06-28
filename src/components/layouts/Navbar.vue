<script setup>
import NavbarDropdown from "./NavbarDropdown.vue";

</script>

<template>
    <div class="navbar">
        <RouterLink class="logo" to="/">Pet Social</RouterLink> -
        <RouterLink to="/posts">Posts</RouterLink> -
        <RouterLink to="/chats">Chats</RouterLink>
     
        <div class="navbar-action">
            <NavbarDropdown />
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