<script setup>
import {ref, onBeforeMount, computed, watch } from "vue";
import { post_list_api, post_list_follow_api } from "@/services/post";
import CreatePost from "@/components/posts/CreatePost.vue";
import CardUser from "@/components/profile/CardUser.vue";

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

const showPopupCreate = ref(false)
const openPopupCreate = () => {
    showPopupCreate.value = true
}
const closePopupCreate = () => {
    showPopupCreate.value = false
}

const createNewPost = (post) => {
    posts.value.unshift(post)

    closePopupCreate();

    alert("Create Post success")
}

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
    <div class="page">
        <div class="post-nav">
            <h1>{{ typePostMess }}</h1>
            <button class="post-create-btn" @click="openPopupCreate">Create Post</button>
        </div>
        <div>
            <RouterLink to="/posts">All</RouterLink> -
            <RouterLink to="/posts/following">Following</RouterLink>
        </div>
        <hr>
        <div v-for="post of posts" :key="post.id">
            <RouterLink :to="'/posts/' + post.id">
                <h2>{{ post.title }}</h2>
            </RouterLink>
            <div>
                {{ post.content }}
            </div>
            <CardUser :profile_id="post.profile_id" />
            <hr>
        </div>

        <CreatePost 
            v-if="showPopupCreate" 
            @close="closePopupCreate"
            @createPost="createNewPost"
            />
    </div>
</template>

<style scoped>
.post-nav {
    display: flex;
    align-items: center;
    background-color: aqua;
}

.post-create-btn {
    margin-left: auto;
    height: 32px;
}
</style>