<script setup>
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
    profile_update_api,
    profile_get_api,
    profile_follow_api,
    profile_follow_count_api
} from "@/services/profile"
import { auth_user } from '@/stores/auth';
import { requireProfileCreated } from "@/modules/profile"
import { myProfileId } from "@/stores/auth";
import ListCardUser from "@/components/profile/ListCardUser.vue";

const route = useRoute()
const router = useRouter()

const idProfile = computed(() => {
    return route.params.idUser
})

watch(() => idProfile.value, async () => {
    await getProfile();
})

const profile = ref(null)
const isDoneLoad = ref(false)

onBeforeMount(async () => {
    try {
        await getProfile();
        await getFollowCount();

        isDoneLoad.value = true;
    } catch (error) {
        console.log(error)
    }
})

const getProfile = async () => {
    try {
        // error
        await profile_get_api(idProfile.value).then(res => {
            profile.value = res;

        })

    } catch (error) {
        throw error
    }
}

const followCount = ref({})

const getFollowCount = async () => {
    try {
        await profile_follow_count_api(idProfile.value).then(res => {
            followCount.value = res
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

const follow = async () => {
    if (requireProfileCreated()) {
        try {
            await profile_follow_api(idProfile.value).then(res => {
                followCount.value.followers = res
            })
        } catch (error) {
            console.log(error)
        }
    }
}

const isFollowing = computed(() => {
    const indexFollow = followCount.value.followers.findIndex(item => item.follow_id == myProfileId.value)

    if (indexFollow >= 0) {
        return true
    }
    return false
})

const showListUser = ref(false)
const showListUserProfileIds = ref([])

const openListUser = (profile_ids) => {
    showListUserProfileIds.value = profile_ids
    showListUser.value = true
}

const closeListUser = () => {
    showListUserProfileIds.value = []
    showListUser.value = false
}

const openListFollowers = () => {
    const profile_ids = followCount.value.followers.map(item => {
        return item.follow_id
    })
    openListUser(profile_ids)
}

const openListFollowings = () => {
    const profile_ids = followCount.value.followings.map(item => {
        return item.follow_id
    })
    openListUser(profile_ids)
}

</script>

<template>
    <div>

        <div v-if="isDoneLoad">
            <div v-if="profile">
                <h1>
                    {{ profile.name }}

                    <small v-if="isMyProfile">
                        <RouterLink to="/profile/update">Update</RouterLink>
                    </small>
                </h1>
                <div class="dev_page_content">
                    <p>
                        {{ profile.description }}
                    </p>
                    <b>Phone: </b><span>{{ profile.phone }}</span>
                    <hr>
                    <div>
                        <button @click="follow" :class="{ 'btn-follow--highlight': isFollowing }">
                            <span v-if="!isFollowing">Follow</span>
                            <span v-else>Following</span>
                        </button>
                        -

                        <RouterLink :to="`/chats/${profile.id}`">Chats</RouterLink>
                    </div>
                    <br>
                    <div>
                        <span @click="openListFollowings">{{ followCount.followings.length }} Following</span>
                        -
                        <span @click="openListFollowers">{{ followCount.followers.length }} Followers</span>
                    </div>
                    
                </div>
            </div>
            <div v-else>
                <h1>Not found profile</h1>
            </div>
        </div>
        <div v-else>

        </div>
        <ListCardUser v-if="showListUser" :profile_ids="showListUserProfileIds" @close="closeListUser" />
    </div>
</template>

<style scoped></style>