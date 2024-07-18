<script setup>
import { ref } from "vue"
import { post_create_api } from "@/services/post"
const emits = defineEmits(["close", "createPost"]);
// import Confirm

const post = ref({
    title: "",
    content: ""
})
const closeCreate = () => {
    emits("close")
}

const createPost = async () => {
    // 
    try {
        await post_create_api(post.value).then(res => {
            emits("createPost", res)
        })
    } catch (error) {
        console.log(error)
    }
}

// showConfirm
// openConfirm 
// closeConfirm
</script>

<template>
    <div>
        <Popup @close="closeCreate">
            <template v-slot:header>
                Create Post
            </template>

            <template v-slot="body">
                <form class="form" @submit.prevent="createPost">
                    <label> Title</label>
                    <input type="text" v-model="post.title" placeholder="Enter title">
                    <div class="error"></div>

                    <label> Content</label>
                    <input type="text" v-model="post.content" placeholder="Enter content">
                    <div class="error"></div>

                    <button type="submit">Create Post</button>
                </form>
            </template>
        </Popup>

        <!-- v-if  -->
    </div>
</template>

<style scoped>

</style>