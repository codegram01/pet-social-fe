<script setup>
import { auth_user } from '@/stores/auth';
import { computed } from 'vue';
import { message_delete_api } from '@/services/chat';

const props = defineProps(["message"])
const emits = defineEmits(["deleteMess", "openEditMess"])

const isMyMess = computed(() => {
    if (auth_user.value.profile_id == props.message.profile_id) {
        return true;
    }

    return false
})

const deleteMess = async () => {
    try {
        await message_delete_api(props.message.id)

        emits("deleteMess", props.message.id)
    } catch (error) {
        console.log(error)
    }
}

const openEditMess = () => {
    emits("openEditMess", props.message)
}
</script>

<template>
    <div class="tab-list-col  action">
        <span v-if="isMyMess" class="tab" @click="openEditMess"><i class="bi bi-pencil"></i></span>
        <span v-if="isMyMess" class="tab"  @click="deleteMess"><i class="bi bi-trash3"></i></span>
    </div>
</template>

<style scoped>
.action {
    position: absolute;
    right: 0;
    top: 0;
    display: none;
    background-color: white;
    border: 1px solid var(--c-border);
    top: -24px;
    border-radius: 6px;
}

.message-div:hover .action{
    display: flex;
}

.tab:hover {
    background-color: rgb(208, 221, 222);
}
</style>