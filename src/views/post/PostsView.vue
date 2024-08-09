<script setup>
import {ref, onBeforeMount, computed, watch } from "vue";
import { post_list_api, post_list_follow_api } from "@/services/post";
import ItemPost from "@/components/posts/ItemPost.vue"
import PostCreate from "@/components/posts/PostCreate.vue";
import HashtagsPopular from "@/components/posts/HashtagsPopular.vue";

const props = defineProps(["type"])

const posts = ref([])
onBeforeMount(async()=> {
    await getPosts()
})

const getPosts = async () => {
    if(props.type == "ALL") {
        await post_list_api().then(res => {
            posts.value = res;
        });
    }else {
        await post_list_follow_api().then(res => {
            posts.value = res;
        });
    }
}

watch(() => props.type , async () => {
    await getPosts()
})

const typePostMess = computed(() => {
    if(props.type == "ALL") {
        return "All Posts"
    }
    if(props.type == "FOLLOWING") {
        return "Posts Following"
    }
})

const showCreatePost = ref(false)
const openCreatePost = () => {
    showCreatePost.value = true
}
const closeCreatePost = () => {
    showCreatePost.value = false
}

const deletePost = (index) => {
    posts.value.splice(index, 1)
}

const createPost = (post) => {
    posts.value.unshift(post)  
}
</script>

<template>
    <div class="main">
        <div class="main-left">
            <div class="card tab-list-row">
                <RouterLink class="tab" to="/posts">
                    <span class="tab-text">All Posts</span>
                </RouterLink>
                <RouterLink class="tab" to="/posts/following">
                    <span class="tab-text">Following Posts</span>
                </RouterLink>
            </div>
            <div class="card tab-list-row">
                <div class="tab">
                    <i class="bi bi-threads-fill"></i>
                    <span class="tab-text">Game</span>
                </div>
                <div class="tab">
                    <i class="bi bi-twitch"></i>
                    <span class="tab-text">Memory</span>
                </div>
                <div class="tab">
                    <i class="bi bi-twitter"></i>
                    <span class="tab-text">Find friend</span>
                </div>
                <div class="tab">
                    <i class="bi bi-umbrella-fill"></i>
                    <span class="tab-text">Saved</span>
                </div>
            </div>
        </div>
        <div class="main-center">
            <!-- <div>
                <RouterLink class="tab" to="/posts">All</RouterLink>
                <RouterLink class="tab" to="/posts/following">Following</RouterLink>
            </div>

          
                <form class="form_search" action="/products" method="get">
                    <input placeholder="Search Posts" id="search" class="form-control" type="search" name="q" />
                    <button type="submit" class="btn btn-primary btn-sm">Search</button>

                </form> -->
            <div class="card" style="display: flex;">
                <span>Say something to the world</span>

                <button class="btn btn-primary btn-create" @click="openCreatePost">Create Post</button>

            </div>
            <div class="card form">
                <label for="">Create Posts</label>
                <div @click="openCreatePost">
                    <input class="inp--light" type="text" placeholder="What's on your mind">
                </div>
              
            </div>
            <ItemPost 
                v-for="(post, index) of posts" 
                :key="post.id" 
                :post="post"
                @deletePost="deletePost(index)"
            />
          
   
        </div>
        <div class="main-right">
            <div class="card">
                <div class="popular-hashtags-title">Popular Hashtags</div>
                <HashtagsPopular/>
            </div>
            <div class="card">
                <img style="width: 100%;" src="https://fly.io/phx/ui/images/fly-globe-cb332f77ddb429aa3ef4e0a2c6c592ba.png?vsn=d" alt="">
            </div>
        </div>
        <PostCreate v-if="showCreatePost" @close="closeCreatePost" @createPost="createPost"/>
    </div>
</template>

<style scoped>
.btn-create {
    margin-left: auto;
    border-radius: 4px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.popular-hashtags-title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 12px;
}
</style>