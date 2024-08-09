<script setup>
import { computed, onBeforeMount, ref } from "vue";
import { getUserInfo } from "@/stores/user";
import { auth_user } from "@/stores/auth";

const props = defineProps(["profile_id"])

const isMyMess = computed(() => {
    if (auth_user.value.profile_id == props.profile_id) {
        return true;
    }

    return false
})

const user = ref(null)
onBeforeMount(async ()=>{
    user.value = await getUserInfo(props.profile_id)
})

</script>

<template>
    <div v-if="user && !isMyMess">
        <RouterLink class="avatar-div" :to="'/profile/' + user.id">
            <i class="bi bi-person-fill avatar"></i>
            <span class="name">{{ user.name }}</span>
        </RouterLink>
    </div>
</template>

<style scoped>
.avatar-div {
    display: flex;
    flex-flow: row;
}
.avatar {
    background-color: white;
    border: var(--c-border);
    width: 32px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.name {
    font-weight: 600;
}

.my-name {
    margin-left: auto;
}
</style>