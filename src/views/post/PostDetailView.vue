<script setup>
import { ref, computed, onBeforeMount } from "vue";
import {useRoute} from "vue-router";
import { post_detail_api } from "@/services/post";
import ActionPost from "@/components/posts/ActionPost.vue";
import CardUser from "@/components/profile/CardUser.vue";

const route = useRoute()

const idPost = computed(()=> {
    return route.params.idPost
})

const post = ref(null)
const getDetailPost = async () => {
    try {
        await post_detail_api(idPost.value).then(res => {
            post.value = res
        })


    } catch (error) {
        console.log(error)
    }
}

onBeforeMount(async() => {
    await getDetailPost();

    isDoneLoad.value = true
})

const isDoneLoad = ref(false)

const updateLikes = (likes) => {
    post.value.post_likes = likes
}

</script>

<template>
    <div class="main">
        <div v-if="isDoneLoad" class="main-center">
            <div v-if="post">
                <h1>{{ post.title }}</h1>
                <CardUser :profile_id="post.profile_id" />
                <br>
                <div class="dev_page_content">
                    <p>{{ post.content }}</p>
                    <img class="post-img" v-for="file of post.files" :key="file.id" :src="$loadFile(file.link)" alt="">
                </div>
                
                <hr>
                <ActionPost 
                    :idPost="post.id"
                    :likes="post.post_likes"
                    :comments="post.post_comments"
                    @updateLikes="updateLikes"
                />
            </div>
            <div v-else>
                <h1>Not Found Post</h1>
            </div>
        </div>
    </div>
</template>

<style scoped>
.post-img {
    max-width: 100%;
}

.main-center {
    background-color: white;;
}
</style>