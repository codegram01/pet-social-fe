<script setup>
import { ref, computed, onBeforeMount } from "vue";
import ActionPost from "@/components/posts/ActionPost.vue";
import CardUser from "@/components/profile/CardUser.vue";
import Popup from "@/components/common/Popup.vue";
import PostCreate from "@/components/posts/PostCreate.vue";
import MenuDropdown from "../common/MenuDropdown.vue";
import { auth_user } from "@/stores/auth";
import ListPet from "@/components/profile/ListPet.vue";
import ListHashtag from "./ListHashtag.vue";

const emits = defineEmits(["close", "createPost", "deletePost"]);
const props = defineProps(["post"])

console.log(props.post)

const updateLikes = (likes) => {
    props.post.post_likes = likes
}

const addNewComment = (comment) => {
    props.post.post_comments.unshift(comment);
};

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

const close = () => {
    emits("close")
}

const deletePost = () => {
    emits("deletePost")
}

const isMyPost = computed(() => {
    if (auth_user.value.profile_id == props.post.profile_id) {
        return true;
    }

    return false
})
</script>

<template>
    <div class="main-center">
        <Popup @close="close" container-popup-max-width="500px">
            <template v-slot:header>
                <div class="post-header">
                    <span>{{ "Bài viết" }}</span>
                    <MenuDropdown :icon="`bi bi-three-dots`" v-if="isMyPost">
                        <template #options>
                            <span class="tab popup-tab" @click="openUpdatePost"><i class="bi bi-pencil"></i><span class="tab-text">Update</span></span>
                            <span class="tab popup-tab" @click="deletePost"><i class="bi bi-trash3"></i><span class="tab-text">Delete</span></span>
                        </template>
                    </MenuDropdown>
                    <PostCreate 
                        v-if="showUpdatePost" 
                        :data-post="props.post" 
                        @updatePost="updatePost" 
                        @close="closeUpdatePost"
                    />
                </div>
            </template>
            <template v-slot:body>
                <div v-if="post">
                    <CardUser :profile_id="post.profile_id" />
                    <h1>{{ post.title }}</h1>
                    <div class="dev_page_content">
                        <p>{{ post.content }}</p>

                        <div v-if="post.pets && post.pets.length > 0">
                            <ListPet :pet_ids="post.pets" :hideDesc="true"/>
                        </div>
                        <div v-if="post.hashtags" style="margin: 12px 0px;">
                            <ListHashtag :hashtags="post.hashtags"/>
                        </div>

                        <img class="post-img" v-for="file of post.files" :key="file.id" :src="$loadFile(file.link)" alt="">
                    </div>
                    
                    <hr />
                    <div class="comments">
                        <div v-if="post.post_comments.length > 0">
                            <div v-for="comment of post.post_comments" :key="comment.id">
                                <CardUser :profile_id="comment.profile_id" ></CardUser>
                                <div class="comment-content">
                                    <p class="comment-text">{{ comment.content }}</p>
                                    <!--span class="comment-time">{{ comment.created_at }}</span-->
                                </div>
                                <br />
                            </div>
                        </div>
                        <div v-else class="no-comments">
                            <p>Không có bình luận để hiển thị </p>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <h1>Not Found Post</h1>
                </div>
            </template>
            <template v-slot:bottom>
                <ActionPost 
                    :idPost="post.id"
                    :likes="post.post_likes"
                    :comments="post.post_comments"
                    @updateLikes="updateLikes"
                    @newComment="addNewComment"
                />
            </template>
        </Popup>
    </div>

</template>

<style scoped>
.post-img {
    max-width: 100%;
}

.main-center {
    background-color: white;;
}

.comments {
    margin-top: 20px;
}

.no-comments {
    color: #888;
    font-style: italic;
}

.comment {
    display: flex;
    align-items: flex-start;
    margin-bottom: 15px;
}

.comment-content {
    background-color: #f0f2f5;
    border-radius: 18px;
    padding: 10px;
    margin-left: 32px;
    max-width: 80%;
}

.comment-text {
    margin: 0;
    font-size: 14px;
}

.comment-time {
    display: block;
    font-size: 12px;
    color: #888;
    margin-top: 5px;
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
