<script setup>
import { ref } from "vue"
import { post_create_api } from "@/services/post"
const emits = defineEmits(["close", "createPost"]);

const post = ref({
    title: "",
    content: ""
})
const closeCreate = () => {
    emits("close")
}

const createPost = async () => {
    try {
        await post_create_api(post.value).then(res => {
            emits("createPost", res)
        })
    } catch (error) {
        console.log(error)
    }
}
</script>

<template>
    <div class="overlay" @click="closeCreate">
        <div class="container" @click.stop="">
            <h1>Create Post</h1>

            <form class="form" @submit.prevent="createPost">
                <label> Title</label>
                <input type="text" v-model="post.title" placeholder="Enter title">
                <div class="error"></div>

                <label> Content</label>
                <input type="text" v-model="post.content" placeholder="Enter content">
                <div class="error"></div>

                <button type="submit">Create Post</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
.overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #00000080;
    z-index: 4;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn-7ce9fa01 .5s ease;
}

.container {
    background-color: white;
}
</style>