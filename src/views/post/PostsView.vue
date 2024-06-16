<script setup>
import {ref, onBeforeMount } from "vue";
import { post_list_api } from "@/services/post";
import CreatePost from "@/components/posts/CreatePost.vue";

const posts = ref([])
onBeforeMount(async()=> {
    await post_list_api().then(res => {
        posts.value = res;
    });
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
</script>

<template>
    <div class="page">
        <div class="post-nav">
            <h1>Posts</h1>
            <button class="post-create-btn" @click="openPopupCreate">Create Post</button>

        </div>
        <div v-for="post of posts">
            <RouterLink :to="'/posts/' + post.id">
                <h2>{{ post.title }}</h2>
            </RouterLink>
            <div>
                {{ post.content }}
            </div>
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