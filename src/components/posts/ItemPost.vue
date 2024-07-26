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
        <div class="btn-group">
            <button class="btn-action"><i class="bi bi-hand-thumbs-up"></i> Thích</button>
            <button class="btn-action"><i class="bi bi-chat"></i> Bình luận</button>
            <button class="btn-action"><i class="bi bi-share"></i> Chia Sẻ</button>
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
    display: flex;
    justify-content: space-between;
}

 .btn-action {
    background-color: white;
    border: none;
    color: black;
    padding: 12px 32px;
    font-size: 16px;
    cursor: pointer;
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