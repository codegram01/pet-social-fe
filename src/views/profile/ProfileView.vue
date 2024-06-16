<script setup>
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { profile_update_api, profile_get_api } from "@/services/profile"
import { auth_user } from '@/stores/auth';

const route = useRoute()
const router = useRouter()

const idProfile = computed(() => {
    return route.params.idUser
})

watch(()=> idProfile.value,async ()=> {
    await getProfile();
})

const profile = ref(null)
const isDoneLoad = ref(false)

onBeforeMount(async () => {
    await getProfile();

    isDoneLoad.value = true;
})

const getProfile = async () => {
    try {
        await profile_get_api(idProfile.value).then(res => {
            profile.value = res;
        })
    } catch (error) {
        console.log(error)
    }
}

const isMyProfile = computed(() => {
    if (auth_user.value.id == profile.value.user_id) {
        return true;
    }

    return false
})

const toUpdate = ()=> {
    router.push("/profile/update")
}

</script>

<template>
    <div class="page">
        <div v-if="isDoneLoad">
            <div class="profile" v-if="profile">
                <h1>
                    {{ profile.name }}
                </h1>
                <button v-if="isMyProfile" @click="toUpdate">Update profile</button>
                <hr>
                <div class="info">
                    <div>
                        <b>Description:</b><span>{{ profile.description }}</span>
                    </div>
                    <br>
                    <div v-if="isMyProfile">
                        <b>Phone:</b><span>{{ profile.phone }}</span>
                    </div>
                </div>
            </div>
            <div v-else>
                <h1>Not found profile</h1>
            </div>
        </div>
        <div v-else>

        </div>
    </div>
</template>

<style scoped></style>