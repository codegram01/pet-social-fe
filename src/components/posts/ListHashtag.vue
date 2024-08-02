<script setup>
const props = defineProps(["hashtags"])
</script>

<template>
    <div class="hashtag-chose-ctn">
        <RouterLink 
            class="hashtag-chose" 
            v-for="tag of hashtags" 
            :key="tag"
            :to="`/search?service=tags&key=${tag.tag}`"
        >
            #{{ tag.tag }}
        </RouterLink>
    </div>
</template>

<style scoped>
.hashtag-chose-ctn {
    gap: 6px;
    display: flex;
    flex-wrap: wrap;
}

.hashtag-chose {
    clear: both;
    display: inline-block;
    padding: 6px;
    background-color: #cbe3fd;
    border-radius: 6px;
    position: relative;
}
</style>