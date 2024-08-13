<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import NavbarDropdown from "./NavbarDropdown.vue";
import { computed, onBeforeMount, onMounted, ref, watch } from "vue";

const router = useRouter()
const route = useRoute()

const keySearch = ref("")

const search = () => {
  let service = 'posts'
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
  <div class="full nav-ctn">
    <RouterLink class="tab" to="/"> 
      <i class="bi bi-twitter"></i> 
      <span class="tab-text">Pet Social</span>
    </RouterLink>
    <input v-model="keySearch" @keydown.enter="search" type="text" class="inp--light nav-search" placeholder="Find something">
    <div class="action-ctn">
      <NavbarDropdown />
    </div>
  </div>
</template>

<style scoped>
.nav-ctn {
  display: flex;
  align-items: center;
  padding: 0px 24px;
}

.action-ctn {
  margin-left: auto;
}

.nav-search {
  margin-left: 24px;
  width: 272px;
}
</style>