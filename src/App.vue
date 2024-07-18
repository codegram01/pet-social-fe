<script setup>
import Navbar from "@/components/layouts/Navbar.vue";

</script>

<template>
   <v-app class="bg-background">
    <Navbar />
    <div class="container clearfix tl_page_container">
      <div class="tl_page">
        <div id="dev_page_content_wrap" class=" ">
          <RouterView />
        </div>
      </div>
      
    </div>
  </v-app>
</template>

<style scoped>

</style>
