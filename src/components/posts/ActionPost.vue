<script setup>
import { ref, computed, onBeforeMount } from "vue"
import { post_like_api, post_comment_api, post_delete_comment_api } from "@/services/post";
import { myProfileId } from "@/stores/auth";
import CardUser from "@/components/profile/CardUser.vue";

const props = defineProps(["idPost", "likes", "comments"])
const emits = defineEmits(["updateLikes"])



const likesLength = computed(()=> {
    return props.likes.length
})

const likePost = async () => {
    try {
        await post_like_api(props.idPost).then(res => {
            emits("updateLikes", res)
        })
    } catch (error) {
        console.log(error)
    }
}

const isLiked = computed(()=> {
    const indexLike = props.likes.findIndex(item => item.profile_id == myProfileId.value)

    if(indexLike >= 0) {
        return true
    }
    return false
})

const inpComment = ref("")

const postComment = async () => {
    if(inpComment.value && inpComment.value.length < 2000){
        try {
            await post_comment_api(props.idPost, {
                content: inpComment.value
            }).then(res => {
                inpComment.value = ""

                props.comments.unshift(res)
            })
        } catch (error) {
            console.log(error)
        }
    }else {

    }
}
</script>

<template>
    <div>
        <div class="action-nav">
            <button @click="likePost" 
                class="btn"
                :class="{'btn-primary': isLiked}"
            >
                <i v-if="!isLiked" class="bi bi-hand-thumbs-up"></i>
                <i v-else class="bi bi-hand-thumbs-up-fill"></i>
                {{ likesLength }}
            </button>

           <form class="form_search" @submit.prevent="postComment">
                <input v-model="inpComment" type="text" placeholder="Enter comment" class="form-control input-comment">
                <button type="submit" class="btn btn-primary btn-sm">Comment</button>
           </form>
        </div>
        <br>
        <div class="comments">
            <div v-for="comment of comments" :key="comment.id">
                <CardUser :profile_id="comment.profile_id"/>
                <p>{{ comment.content }}</p>
                <br>
            </div>
        </div>
    </div>
</template>

<style scoped>

.action-nav {
    display: flex;
    align-items: center;
}

.input-comment {
    margin-left: 12px;
}
</style>