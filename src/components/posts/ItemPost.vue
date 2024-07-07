<script setup>
import CardUser from "@/components/profile/CardUser.vue";
import ListPet from "@/components/profile/ListPet.vue";

const props = defineProps(["post"])
</script>

<template>
    <div>
        <RouterLink :to="'/posts/' + post.id">
            <h2>{{ post.title }}</h2>
        </RouterLink>
        <CardUser :profile_id="post.profile_id" />
        <div class="post-content">
            {{ post.content }}
        </div>
        <div v-if="post.pets && post.pets.length > 0">
            <div><b>Pets:</b></div>
            <ListPet :pet_ids="post.pets" :hideDesc="true"/>
        </div>
        <img class="post-img" v-for="file of post.files" :key="file.id" :src="$loadFile(file.link)" alt="">
        <hr>
    </div>
</template>

<style scoped>
.post-img {
    max-width: 400px;
    max-height: 250px;
}

.post-content {
    margin-top: 12px;
    margin-bottom: 12px;
}
</style>