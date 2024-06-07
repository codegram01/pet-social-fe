<script setup>
import {ref, onBeforeMount } from "vue";
import { api } from "@/modules/api";

const posts = ref([])
onBeforeMount(async()=> {
    await api("GET", "/posts").then(res => {
        posts.value = res
    })
})
</script>

<template>
    <div>
        <h1>Posts</h1>
        <div v-for="post of posts">

            <h2>{{ post.title }}</h2>
            <div>
                {{ post.content }}
            </div>
            <hr>
        </div>
    </div>
</template>

<style scoped>

</style>