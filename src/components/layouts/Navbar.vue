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
  <!-- <div>
    <v-toolbar color="light-blue-lighten-5">
      <v-container>
        <v-row>
          <v-col cols="12" sm="4" class="d-flex align-center">
            <a href="/">
              <img
                src="@/assets/pet_logo.svg"
                alt="logo"
                height="50px"
              />
            </a>

            <v-text-field
              v-model="keySearch"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="solo"
              hide-details
              single-line
              density="compact"
              @keyup.enter="search"
            />
          </v-col>

          <v-col cols="12" sm="4" class="d-flex align-center justify-center">
            <v-btn>
              <RouterLink class="logo" to="/">Pet Social</RouterLink>
            </v-btn>

            <v-btn>
              <RouterLink to="/posts">Posts</RouterLink>
            </v-btn>

            <v-btn>
              <RouterLink to="/chats">Chats</RouterLink>
            </v-btn>
          </v-col>

          <v-col cols="12" sm="4" class="d-flex align-center justify-end">
            <NavbarDropdown />
          </v-col>
        </v-row>
      </v-container>
    </v-toolbar>
  </div> -->
  <div class="full nav-ctn">
    <RouterLink class="tab" to="/"> 
      <i class="bi bi-twitter"></i> 
      <span class="tab-text">Pet Social</span>
    </RouterLink>
    <input type="text" class="inp--light nav-search" placeholder="Find something">
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