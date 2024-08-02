<script setup>
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { search_api } from "@/services/search";
import ItemPost from '@/components/posts/ItemPost.vue';

const route = useRoute()

const keySearch = computed(() => {
    return route.query.key
})

const serviceSearch = computed(() => {
    return route.query.service
})

onBeforeMount(() => {
    search();
})

watch(()=> serviceSearch.value, ()=> {
    searchData.value = [];

    search()
})

watch(()=> keySearch.value, () => {
    searchData.value = [];

    search()
})

const searchData = ref([])
const search = async () => {
    if (serviceSearch.value == "all") {
        return
    }
    try {
        await search_api(serviceSearch.value, keySearch.value).then(res => {
            searchData.value = res
        })
    } catch (error) {
        console.log(error)
    }
}

/*
 - articles
        - pets
        - posts
        - profiles
*/
const searchServices = ref([
    {
        name: 'All',
        service: 'all'
    }, {
        name: 'Pets',
        service: 'pets'
    }, {
        name: 'Profiles',
        service: 'profiles'
    }, {
        name: 'Posts',
        service: 'posts'
    }, {
        name: 'Articles',
        service: 'articles'
    }, {
        name: 'Tags',
        service: 'tags'
    }
])

function replaceText(str, fromValue, toValue) {
  // Create a case-insensitive regular expression with the global flag (g)
  const regex = new RegExp(fromValue, 'gi');
  return str.replace(regex, toValue);
}

const displayText = (text) => {
    // text = text.replace(/keySearch.value/gi, `<b>${keySearch.value}</b>`)

    text = replaceText(text, keySearch.value, `<b style='background: yellow'>${keySearch.value}</b>`)

    return text
}

</script>

<template>
    <div>
        <h1>Search {{ keySearch }}</h1>

        <ul>
            <li v-for="searchService of searchServices" :key="searchService.service">
                <RouterLink :to="`/search?key=${keySearch}&service=${searchService.service}`">{{ searchService.name }}
                </RouterLink>
            </li>
        </ul>
        <hr>
        <div>
            <div v-if="serviceSearch == 'all'">

            </div>
            <div v-if="serviceSearch == 'pets'">
                <div v-for="item of searchData" :key="item.id">
                    <RouterLink v-html="displayText(item.name)"></RouterLink>
                    <p v-html="displayText(item.description)"></p>
                </div>
            </div>
            <div v-if="serviceSearch == 'profiles'">
                <div v-for="item of searchData" :key="item.id">
                    <RouterLink v-html="displayText(item.name)"></RouterLink>
                    <p  v-html=displayText(item.description) ></p>
                </div>
            </div>
            <div v-if="serviceSearch == 'posts'">
                <div v-for="item of searchData" :key="item.id">
                    <ItemPost :post="item" />
                </div>
            </div>


        </div>
    </div>
</template>

<style scoped></style>