<script setup>
import { ref, computed } from "vue"
import { post_like_api } from "@/services/post";
import { myProfileId } from "@/stores/auth";

const props = defineProps(["idPost", "likes", "comments"])
const emits = defineEmits(["updateLikes"])

const likesLength = computed(()=> {
    return props.likes.length
})

const likePost = async () => {
    try {
        await post_like_api(props.idPost).then(res => {
            emits("updateLikes", res)
        })
    } catch (error) {
        console.log(error)
    }
}

const isLiked = computed(()=> {
    const indexLike = props.likes.findIndex(item => item.profile_id == myProfileId.value)

    if(indexLike >= 0) {
        return true
    }
    return false
})
</script>

<template>
    <div>
        <button @click="likePost" 
            class="btn-like"
            :class="{'btn-like--highlight': isLiked}"
        >
            <span v-if="!isLiked">Like</span>
            <span v-else>Liked</span>
            | {{ likesLength }}</button>
    </div>
</template>

<style scoped>
.btn-like {
    background-color: white;
}

.btn-like--highlight {
    background-color: red;
}
</style>