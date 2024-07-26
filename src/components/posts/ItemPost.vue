<script setup>
import CardUser from "@/components/profile/CardUser.vue";
import ListPet from "@/components/profile/ListPet.vue";

const props = defineProps(["post"])
</script>

<template>
    <div class="card">
        <CardUser :profile_id="post.profile_id" />
        <RouterLink :to="'/posts/' + post.id">
            <h2 style="text-align: start;">{{ post.title }}</h2>
        </RouterLink>
           <div class="post-content">
            {{ post.content }}
        </div>
        <div v-if="post.pets && post.pets.length > 0">
            <ListPet :pet_ids="post.pets" :hideDesc="true"/>
        </div>
        <img class="post-img" v-for="file of post.files" :key="file.id" :src="$loadFile(file.link)" alt="">
        <div class="reaction-container">
            <span class="emoji">😀</span>
            <span class="emoji">😍</span>
            <span class="emoji">😢</span>
            <span class="emoji">👍</span>
            <span class="emoji">👎</span>
        </div>
        <hr>
        <div class="btn-group tab-list-col">
            <span class="tab btn-action"><i class="bi bi-hand-thumbs-up"></i> <span class="tab-text">Like</span></span>
            <span class="tab btn-action"><i class="bi bi-chat"></i> <span class="tab-text">Comment</span></span>
            <span class="tab btn-action"><i class="bi bi-share"></i> <span class="tab-text">Share</span></span>
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


.btn-group .btn-action:hover {
  background-color: #e4e6eb;
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