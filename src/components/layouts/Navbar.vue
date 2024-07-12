<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import NavbarDropdown from "./NavbarDropdown.vue";
import { computed, onBeforeMount, onMounted, ref, watch } from "vue";

const router = useRouter()
const route = useRoute()

const keySearch = ref("")

const search = () => {
  let service = 'all'
  if(serviceSearch.value) {
    service = serviceSearch.value
  }
  router.push(`/search?key=${keySearch.value}&service=${service}`)
}

const keySearchRoute = computed(()=> {
  return route.query.key
})

const serviceSearch = computed(() => {
    return route.query.service
})

watch(()=> keySearchRoute.value, ()=> {
  keySearch.value = keySearchRoute.value
})

onMounted(()=> {
})
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
        <input type="text"  @keyup.enter="search" v-model="keySearch">
      </div>
    </div>
  </div>
</template>

<style scoped></style>