<script setup>
import { onBeforeMount, ref } from "vue";
import { getUserInfo } from "@/stores/user";

const props = defineProps(["profile_id"])

const user = ref(null)
onBeforeMount(async ()=>{
    user.value = await getUserInfo(props.profile_id)
})

</script>

<template>
    <div v-if="user">
        <RouterLink :to="'/profile/' + user.id">
            <b>{{ user.name }}</b>
        </RouterLink>
        
    </div>
</template>

<style scoped>

</style>