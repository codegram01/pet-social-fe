<script setup>
</script>

<template>
  <div>
    <div class="navbar">
      <RouterLink class="logo" to="/">Pet Social</RouterLink>
     
      <div class="navbar-action">
        <RouterLink to="/login">Login</RouterLink>
        |
        <RouterLink to="/register">Register</RouterLink>
      </div>
    </div>
    <RouterView />
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  background: rgb(199, 199, 242);
}

.navbar-action {
  margin-left: auto;
}
</style>
