<script setup>
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { search_api } from "@/services/search";
import ItemPost from '@/components/posts/ItemPost.vue';
import CardUser from "@/components/profile/CardUser.vue";
import HashtagsPopular from "@/components/posts/HashtagsPopular.vue";

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
    try {
        await search_api(serviceSearch.value, keySearch.value).then(res => {
            searchData.value = res
        })
    } catch (error) {
        console.log(error)
    }
}

const searchServices = ref([ 
    {
        name: 'Posts',
        service: 'posts'
    },
    {
        name: 'Pets',
        service: 'pets'
    }, {
        name: 'Profiles',
        service: 'profiles'
    }, {
        name: 'Tags',
        service: 'tags'
    }
])

</script>

<template>
    <div class="main">
        <div class="main-left">
            <div class="card search-filter">
                <div class="search-title">Search: </div>
                <ul>
                    <li v-for="searchService of searchServices" :key="searchService.service">
                        <RouterLink :to="`/search?key=${keySearch}&service=${searchService.service}`">{{ searchService.name }}
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
        <div class="main-center">
            <div v-if="serviceSearch == 'posts'">
                <ItemPost  v-for="item of searchData" :key="item.id" :post="item" />
            </div>

            <div v-if="serviceSearch == 'pets'">
                <!-- <div v-for="item of searchData" :key="item.id">
                    <RouterLink v-html="displayText(item.name)"></RouterLink>
                    <p v-html="displayText(item.description)"></p>
                </div> -->
            </div>
            <div v-if="serviceSearch == 'profiles'">
                <div class="card" v-for="item of searchData" :key="item.id">
                    <CardUser :profile_id="item.id" />
                </div>
             
                <!-- <div v-for="item of searchData" :key="item.id">
                    <RouterLink v-html="displayText(item.name)"></RouterLink>
                    <p  v-html=displayText(item.description) ></p>
                </div> -->
            </div>
            
        </div>
        <div class="main-right">
            <div class="card">
                <div class="popular-hashtags-title">Popular Hashtags</div>
                <HashtagsPopular/>
            </div>
            <div class="card">
                <img style="width: 100%;" src="https://fly.io/phx/ui/images/fly-globe-cb332f77ddb429aa3ef4e0a2c6c592ba.png?vsn=d" alt="">
            </div>
        </div>
    </div>
</template>

<style scoped>
.search-title {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 12px;
}

.search-filter ul {
    padding-left: 24px;
}

.search-filter li {
    padding: 6px 0px;
    font-size: 16px;
}

.popular-hashtags-title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 12px;
}
</style>