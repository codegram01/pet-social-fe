<script setup>
import { ref, onBeforeMount} from "vue"
import { post_detail_api } from "@/services/post"
import ItemPost from "./ItemPost.vue"

const props = defineProps(["post_ids"])

onBeforeMount(async () => {
    await getPosts()
})

const posts = ref([])

const getPosts = async () => {
    props.post_ids.forEach(async item => {
        await post_detail_api(item.id).then(res => {
            posts.value.push(res)
        })
    });
}

</script>

<template>
    <div>
        <div v-for="post of posts" :key="post.id">
            <ItemPost :post="post"/>
        </div>
    </div>
</template>