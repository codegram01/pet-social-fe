<script setup>
import {ref, onBeforeMount, computed, watch } from "vue";
import { post_list_api, post_list_follow_api } from "@/services/post";
import ItemPost from "@/components/posts/ItemPost.vue"

const props = defineProps(["type"])

const posts = ref([])
onBeforeMount(async()=> {
    await getPosts()
})

const getPosts = async () => {
    if(props.type == "ALL") {
        await post_list_api().then(res => {
            posts.value = res;
        });
    }else {
        await post_list_follow_api().then(res => {
            posts.value = res;
        });
    }
}

watch(() => props.type , async () => {
    await getPosts()
})

const typePostMess = computed(() => {
    if(props.type == "ALL") {
        return "All Posts"
    }
    if(props.type == "FOLLOWING") {
        return "Posts Following"
    }
})
</script>

<template>
    <div>
        <h1 v-if="type == 'ALL'">
            All -
            <RouterLink to="/posts/following">Following</RouterLink>
        </h1>
        <h1 v-else>
            <RouterLink to="/posts">All</RouterLink> -
            Following
        </h1>
        <div class="dev_page_content">
            <form class="form_search" action="/products" method="get">
                <input placeholder="Search Posts" id="search" class="form-control" type="search" name="q" />
                <button type="submit" class="btn btn-primary btn-sm">Search</button>

                <RouterLink to="/posts/create" class="btn btn-primary btn-create">Create</RouterLink>
            </form>
            <div v-for="post of posts" :key="post.id">
                <ItemPost :post="post"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.btn-create {
    margin-left: auto;
    border-radius: 4px;
}
</style>