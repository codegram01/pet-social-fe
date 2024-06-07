<script setup>
import Navbar from "@/components/layouts/Navbar.vue";

</script>

<template>
  <div class="app">
    <div class="navbar">
      <Navbar />
    </div>
    <div class="page-ctn">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.app {
  position: absolute;
  width: 100%;
  height: 100%;
}

.navbar {
  height: 72px;
  width: 100%;
  position: absolute;
  top: 0px;
}

.page-ctn {
  position: absolute;
  width: 100%;
  height: calc(100% - 72px);
  bottom: 0px;
}

</style>
