<script setup>
import {ref, onBeforeMount, computed, watch } from "vue";
import { post_list_api, post_list_follow_api } from "@/services/post";
import ItemPost from "@/components/posts/ItemPost.vue"

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
</script>

<template>
    <div class="main">
        <div class="main-left">
            <div class="tab">
                <svg clip="tab-icn" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-suitcase-lg-fill" viewBox="0 0 16 16">
                <path d="M7 0a2 2 0 0 0-2 2H1.5A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14H2a.5.5 0 0 0 1 0h10a.5.5 0 0 0 1 0h.5a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2H11a2 2 0 0 0-2-2zM6 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1zM3 13V3h1v10zm9 0V3h1v10z"/>
                </svg>
                <span class="tab-text">Game</span>
            </div>
            <div class="tab">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-table" viewBox="0 0 16 16">
  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zm-5 3v-3H6v3zm-5 0v-3H1v2a1 1 0 0 0 1 1zm-4-4h4V8H1zm0-4h4V4H1zm5-3v3h4V4zm4 4H6v3h4z"/>
</svg>
                <span class="tab-text">Memory</span>
            </div>
            <div class="tab">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-taxi-front-fill" viewBox="0 0 16 16">
  <path d="M6 1a1 1 0 0 0-1 1v1h-.181A2.5 2.5 0 0 0 2.52 4.515l-.792 1.848a.8.8 0 0 1-.38.404c-.5.25-.855.715-.965 1.262L.05 9.708a2.5 2.5 0 0 0-.049.49v.413c0 .814.39 1.543 1 1.997V14.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1.338c1.292.048 2.745.088 4 .088s2.708-.04 4-.088V14.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1.892c.61-.454 1-1.183 1-1.997v-.413q0-.248-.049-.49l-.335-1.68a1.8 1.8 0 0 0-.964-1.261.8.8 0 0 1-.381-.404l-.792-1.848A2.5 2.5 0 0 0 11.181 3H11V2a1 1 0 0 0-1-1zM4.309 4h7.382a.5.5 0 0 1 .447.276l.956 1.913a.51.51 0 0 1-.497.731c-.91-.073-3.35-.17-4.597-.17s-3.688.097-4.597.17a.51.51 0 0 1-.497-.731l.956-1.913A.5.5 0 0 1 4.309 4M4 10a1 1 0 1 1-2 0 1 1 0 0 1 2 0m10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-9 0a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1"/>
</svg>
                <span class="tab-text">Find friend</span>
            </div>
            <div class="tab">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-threads-fill" viewBox="0 0 16 16">
  <path d="M6.81 9.204c0-.41.197-1.062 1.727-1.062.469 0 .758.034 1.146.121-.124 1.606-.91 1.818-1.674 1.818-.418 0-1.2-.218-1.2-.877Z"/>
  <path d="M2.59 16h10.82A2.59 2.59 0 0 0 16 13.41V2.59A2.59 2.59 0 0 0 13.41 0H2.59A2.59 2.59 0 0 0 0 2.59v10.82A2.59 2.59 0 0 0 2.59 16M5.866 5.91c.567-.81 1.315-1.126 2.35-1.126.73 0 1.351.246 1.795.711.443.466.696 1.132.754 1.983q.368.154.678.363c.832.559 1.29 1.395 1.29 2.353 0 2.037-1.67 3.806-4.692 3.806-2.595 0-5.291-1.51-5.291-6.004C2.75 3.526 5.361 2 8.033 2c1.234 0 4.129.182 5.217 3.777l-1.02.264c-.842-2.56-2.607-2.968-4.224-2.968-2.675 0-4.187 1.628-4.187 5.093 0 3.107 1.69 4.757 4.222 4.757 2.083 0 3.636-1.082 3.636-2.667 0-1.079-.906-1.595-.953-1.595-.177.925-.651 2.482-2.733 2.482-1.213 0-2.26-.838-2.26-1.936 0-1.568 1.488-2.136 2.663-2.136.44 0 .97.03 1.247.086 0-.478-.404-1.296-1.426-1.296-.911 0-1.16.288-1.45.624l-.024.027c-.202-.135-.875-.601-.875-.601Z"/>
</svg>
                <span class="tab-text">Saved</span>
            </div>
        </div>
        <div class="main-center">
            <!-- <div>
                <RouterLink class="tab" to="/posts">All</RouterLink>
                <RouterLink class="tab" to="/posts/following">Following</RouterLink>
            </div> -->

          
                <!-- <form class="form_search" action="/products" method="get">
                    <input placeholder="Search Posts" id="search" class="form-control" type="search" name="q" />
                    <button type="submit" class="btn btn-primary btn-sm">Search</button>

                    <RouterLink to="/posts/create" class="btn btn-primary btn-create">Create</RouterLink>
                </form> -->
            <div class="card" style="display: flex;">
                <span>Say something to the world</span>
                <button style="margin-left: auto;"> Create Post</button>
            </div>
            <div class="card form">
                <label for="">Create Story</label>
                <input class="inp--light" type="text" placeholder="What's on your mind">
            </div>
            <ItemPost v-for="post of posts" :key="post.id" :post="post"/>
          
   
        </div>
        <div class="main-right">
            <div>
                <ul>
                    <li>
                        <a href="">Becgie</a>
                    </li>
                    <li>
                        <a href="">Tom</a>
                    </li>
                    <li>
                        <a href="">Jerry</a>
                    </li>
                </ul>
            </div>
            <img style="width: 100%;" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F3.bp.blogspot.com%2F-JMF4_j-st5I%2FUylltR6ABbI%2FAAAAAAAAKX0%2FbAJ0uZVLqj8%2Fs1600%2FCat%2BAnimation.gif&f=1&nofb=1&ipt=c4bed5ab41fcf8be77a0994737be858a43d6b3282a0f3ac19899332696bbe0db&ipo=images" alt="">
        </div>
        
    </div>
</template>

<style scoped>
.btn-create {
    margin-left: auto;
    border-radius: 4px;
}

.tab { 
    padding: 18px 12px;
}
</style>