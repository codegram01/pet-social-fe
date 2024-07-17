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
  <v-div>

    <!-- <v-row> -->
      <v-toolbar color="light-blue-lighten-5">
        <!-- <v-col cols="12" sm="6" md="4"> -->
          <a  href="/">
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
        <!-- </v-col> -->
       

        <v-btn>
          <RouterLink class="logo" to="/">Pet Social</RouterLink>
        </v-btn>

        <v-btn>
          <RouterLink to="/posts">Posts</RouterLink>
        </v-btn>

        <v-btn>
          <RouterLink to="/chats">Chats</RouterLink>
        </v-btn>

        <v-col cols="12" sm="6" md="4">
         
        </v-col>
        
        <v-col cols="12" sm="6" md="4" class="d-flex justify-end">
          <div class="d-flex justify-end">
            <v-btn>
              <NavbarDropdown />
            </v-btn>
          </div>
        
        </v-col>
      
      </v-toolbar>
    <!-- </v-row> -->

   
   
  </v-div>

  <!-- <div class="tl_page_head navbar navbar-static-top navbar navbar-tg">
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
        <input class="hello" type="text"  @keyup.enter="search" v-model="keySearch">
      </div>
    </div>
  </div> -->
</template>

<style scoped></style>