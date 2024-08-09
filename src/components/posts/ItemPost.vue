<script setup>
import { computed, ref } from "vue";
import CardUser from "@/components/profile/CardUser.vue";
import ListPet from "@/components/profile/ListPet.vue";
import ListHashtag from "./ListHashtag.vue";
import PostDetail from "./PostDetail.vue";
import { auth_user, myProfileId } from "@/stores/auth";
import { post_like_api, post_comment_api, post_delete_comment_api, post_delete_api } from "@/services/post";
import MenuDropdown from "../common/MenuDropdown.vue";
import PostCreate from "@/components/posts/PostCreate.vue";
import { openPopup } from "@/stores/popup";

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

const showUpdatePost = ref(false)
const openUpdatePost = () => {
    showUpdatePost.value = true
}
const closeUpdatePost = () => {
    showUpdatePost.value = false
}

const updatePost = (post) => {
    props.post.content = post.content,
    props.post.title = post.title,
    props.post.files = post.files,
    props.post.pets = post.pets,
    props.post.hashtags = post.hashtags
}

const handleDeletePost = () => {
    openPopup({
        title: "Confirm",
        content: "Are you sure want to delete this post",
        confirm: async ()=> {
            try {
                await post_delete_api(props.post.id).then(res => {
                    emits("deletePost")
                })
            } catch (error) {
                console.log(error)
            }
        }
    })
}

const isMyPost = computed(() => {
    if (auth_user.value.profile_id == props.post.profile_id) {
        return true;
    }

    return false
})
</script>

<template>
    <div class="card">
        <div> 
            <div class="post-header">
                <CardUser :profile_id="post.profile_id" />
                    <MenuDropdown :icon="`bi bi-three-dots`" v-if="isMyPost">
                        <template #options>
                            <span class="popup-tab" @click="openUpdatePost"><i class="bi bi-pencil"></i>Update</span>
                            <span class="popup-tab" @click="handleDeletePost"><i class="bi bi-trash3"></i>Delete</span>
                        </template>
                    </MenuDropdown>
                    <PostCreate 
                        v-if="showUpdatePost" 
                        :data-post="props.post" 
                        @updatePost="updatePost" 
                        @close="closeUpdatePost"
                    />
                </div>
            </div>
        <div @click="openDetailPost"> 
            <h2 style="text-align: start;">{{ post.title }}</h2>
            <div class="post-content">
                {{ post.content }}
            </div>
            <div v-if="post.pets && post.pets.length > 0">
                <ListPet :pet_ids="post.pets" :hideDesc="true"/>
            </div>
            <div v-if="post.hashtags" style="margin-top: 12px;">
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
                @deletePost="handleDeletePost" 
                @close="closeDetailPost"
            ></PostDetail>
        </div>
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

.popup-tab {
    font-size: 14px;
    cursor: pointer;
}

.popup-tab:hover {
    background-color: #f0f0f0;
}

.post-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

</style>