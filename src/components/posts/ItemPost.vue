<script setup>
import { computed, ref } from "vue";
import CardUser from "@/components/profile/CardUser.vue";
import ListPet from "@/components/profile/ListPet.vue";
import ListHashtag from "./ListHashtag.vue";
import PostDetail from "./PostDetail.vue";
import { myProfileId } from "@/stores/auth";
import { post_like_api, post_comment_api, post_delete_comment_api } from "@/services/post";

const props = defineProps(["post"])
const emits = defineEmits(["deletePost"])

const showDetailPost = ref(false)
const openDetailPost = () => {
    showDetailPost.value = true
}
const closeDetailPost = () => {
    showDetailPost.value = false
}

const postLikesLength = computed(()=> {
    if(props.post.post_likes && props.post.post_likes.length > 0) {
        return props.post.post_likes.length
    }
})
const postCommentsLength = computed(()=> {
    if(props.post.post_comments && props.post.post_comments.length > 0) {
        return props.post.post_comments.length
    }
})

const isLiked = computed(()=> {
    const indexLike = props.post.post_likes.findIndex(item => item.profile_id == myProfileId.value)

    if(indexLike >= 0) {
        return true
    }
    return false
})

const likePost = async () => {
    try {
        await post_like_api(props.post.id).then(res => {
            props.post.post_likes = res;
        })
    } catch (error) {
        console.log(error)
    }
}

const deletePost = () => {
    emits("deletePost")
}
</script>

<template>
    <div class="card" @click="openDetailPost">
        <CardUser :profile_id="post.profile_id" />
        <h2 style="text-align: start;">{{ post.title }}</h2>
        <div class="post-content">
            {{ post.content }}
        </div>
        <div v-if="post.pets && post.pets.length > 0">
            <ListPet :pet_ids="post.pets" :hideDesc="true"/>
        </div>
        <div v-if="post.hashtags">
            <ListHashtag :hashtags="post.hashtags"/>
        </div>
        <img class="post-img" v-for="file of post.files" :key="file.id" :src="$loadFile(file.link)" alt="">
        <hr>
        <div class="btn-group tab-list-col">
            <span @click.stop="likePost" class="tab btn btn-action" :class="{'btn-primary': isLiked, 'btn--light': !isLiked}"><i class="bi bi-hand-thumbs-up"></i> <span class="tab-text">Like {{ postLikesLength }}</span></span>
            <span class="tab btn-action"><i class="bi bi-chat"></i> <span class="tab-text">Comment {{ postCommentsLength }}</span></span>
            <span class="tab btn-action"><i class="bi bi-share"></i> <span class="tab-text">Share</span></span>
        </div>
        <PostDetail 
            @click.stop="" 
            v-if="showDetailPost" 
            :post="post" 
            @close="closeDetailPost"
            @deletePost="deletePost"
        ></PostDetail>
    </div>
</template>

<style scoped>
.post-img {
    width: 100%;
    height: auto;
    margin-top: 12px;
    margin-bottom: 12px;
}

.post-content {
    margin-top: 12px;
    margin-bottom: 12px;
}
.btn-group {
    justify-content: space-between;
}

.reaction-container {
  display: flex;
  gap: 10px;
}

.emoji {
  font-size: 28px;
  cursor: pointer; 
  transition: transform 0.2s;
}

.emoji:hover {
  transform: scale(1.2);
}

</style>