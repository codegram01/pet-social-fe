<script setup>
import { ref, computed, onBeforeMount } from "vue";
import {useRoute} from "vue-router";
import { post_detail_api } from "@/services/post";
import ActionPost from "@/components/posts/ActionPost.vue";
import CardUser from "@/components/profile/CardUser.vue";
import Popup from "@/components/common/Popup.vue";
const emits = defineEmits(["close", "createPost"]);

const props = defineProps(["idPost"])

const idPost = computed(()=> {
    return props.idPost
})

const post = ref(null)
const getDetailPost = async () => {
    try {
        await post_detail_api(idPost.value).then(res => {
            post.value = res
            console.log(res)
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

const addNewComment = (comment) => {
    post.value.post_comments.unshift(comment);
};

const close = () => {
    emits("close")
}

</script>

<template>
    <div v-if="isDoneLoad" class="main-center">
        <Popup @close="close" container-popup-max-width="500px">
            <template v-slot:header>
                {{ "Bài viết" }}
            </template>
            <template v-slot:body>
                <div v-if="post">
                    <CardUser :profile_id="post.profile_id" />
                    <h1>{{ post.title }}</h1>
                    <br>
                    <div class="dev_page_content">
                        <p>{{ post.content }}</p>
                        <img class="post-img" v-for="file of post.files" :key="file.id" :src="$loadFile(file.link)" alt="">
                    </div>
                    
                    <hr />
                    <div class="comments">
                        <div v-if="post.post_comments.length > 0">
                            <div v-for="comment of post.post_comments" :key="comment.id">
                                <CardUser :profile_id="comment.profile_id" />
                                <div class="comment-content">
                                    <p class="comment-text">{{ comment.content }}</p>
                                    <span class="comment-time">{{ comment.created_at }}</span>
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

</style>