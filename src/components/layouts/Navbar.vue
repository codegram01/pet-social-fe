<script setup>
import { RouterLink } from "vue-router";
import NavbarDropdown from "./NavbarDropdown.vue";

</script>

<template>
  <div class="tl_page_head navbar navbar-static-top navbar navbar-tg">
    <div class="navbar-inner">
      <div class="container clearfix">
        <ul class="nav navbar-nav navbar-right">
          <NavbarDropdown />
        </ul>
        <ul class="nav navbar-nav">
          <li class="">
            <RouterLink class="logo" to="/">Pet Social</RouterLink>
          </li>
          <li class="">
            <RouterLink to="/posts">Posts</RouterLink>
          </li>
          <li class="">
            <RouterLink to="/chats">Chats</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped></style>