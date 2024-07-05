<script setup>
import Navbar from "@/components/layouts/Navbar.vue";

</script>

<template>
  <div class="app">
    <Navbar />
    <div class="container clearfix tl_page_container">
      <div class="tl_page">
        <div id="dev_page_content_wrap" class=" ">
          <RouterView />
        </div>
      </div>
      
    </div>
  </div>
</template>

<style scoped>

</style>
