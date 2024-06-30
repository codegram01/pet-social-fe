<script setup>
import { auth_user } from '@/stores/auth';
import { computed } from 'vue';
import { message_delete_api } from '@/services/chat';

const props = defineProps(["message"])
const emits = defineEmits(["deleteMess"])

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
</script>

<template>
    <div class="action">
        <button v-if="isMyMess" @click="deleteMess">Delete</button>
    </div>
</template>

<style scoped>
.action {
    position: absolute;
    right: 0;
    top: 0;
    display: none;
}

.message-div:hover .action{
    display: block;
}
</style>