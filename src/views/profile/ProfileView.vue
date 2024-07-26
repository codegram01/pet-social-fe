<script setup>
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
    profile_get_api,
    profile_follow_api,
    profile_follow_count_api
} from "@/services/profile"
import { detail_pet_api, pet_follow_count_api, pet_follow_api } from "@/services/pet";
import { auth_user } from '@/stores/auth';
import { requireProfileCreated } from "@/modules/profile"
import { myProfileId } from "@/stores/auth";
import ListCardUser from "@/components/profile/ListCardUser.vue";
import CardUser from "@/components/profile/CardUser.vue";
import ListPet from "@/components/profile/ListPet.vue";
import ListPost from "@/components/posts/ListPost.vue"

const props = defineProps(["type"])

const route = useRoute()
const router = useRouter()

const idProfile = computed(() => {
    return route.params.idUser
})

watch(() => idProfile.value, async () => {
    isDoneLoad.value = false;
    try {
        await getProfile();
        await getFollowCount();

        isDoneLoad.value = true;
    } catch (error) {
        console.log(error)
    }
})

const profile = ref(null)
const isDoneLoad = ref(false)

onBeforeMount(async () => {
    isDoneLoad.value = false;
    try {
        await getProfile();
        await getFollowCount();

        isDoneLoad.value = true;
    } catch (error) {
        console.log(error)
    }
})

const getProfile = async () => {
    if (props.type == 'PROFILE') {
        try {
            await profile_get_api(idProfile.value).then(res => {
                profile.value = res;
            })
        } catch (error) {
            throw error
        }
    } else {
        try {
            await detail_pet_api(idProfile.value).then(res => {
                profile.value = res;
            })
        } catch (error) {
            throw error
        }
    }

}

const followCount = ref({})

const getFollowCount = async () => {
    if (props.type == 'PROFILE') {
        try {
            await profile_follow_count_api(idProfile.value).then(res => {
                followCount.value = res
            })
        } catch (error) {
            console.log(error)
        }
    } else {
        try {
            await pet_follow_count_api(idProfile.value).then(res => {
                followCount.value = res
            })
        } catch (error) {
            console.log(error)
        }
    }

}

const isMyProfile = computed(() => {
    if (auth_user.value.id == profile.value.user_id) {
        return true;
    }

    return false
})

const isMyPet = computed(() => {
    if (auth_user.value.profile_id == profile.value.profile_id) {
        return true;
    }

    return false
})

const follow = async () => {
    if (requireProfileCreated()) {
        if (props.type == 'PROFILE') {
            try {
                await profile_follow_api(idProfile.value).then(res => {
                    followCount.value.followers = res
                })
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                await pet_follow_api(idProfile.value).then(res => {
                    followCount.value.followers = res
                })
            } catch (error) {
                console.log(error)
            }
        }

    }
}

const isFollowing = computed(() => {
    if (followCount.value.followers) {
        const indexFollow = followCount.value.followers.findIndex(item => item.follow_id == myProfileId.value)

        if (indexFollow >= 0) {
            return true
        }
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

    <div class="main">

        <div class="main-center" v-if="isDoneLoad && profile">
            <div class="profile-top">
                <img src="https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733_640.jpg" alt="Cover Photo" class="cover-photo">
                <div class="profile-top-desc">
                    <img src="@/public/images/avatar.png" alt="Profile Photo" class="profile-photo">
                    <div class="profile-top-action">
                        <div class="profile-name">
                            {{ profile.name }}
                        </div>
                        <div class="profile-top-action-right">
                            <div v-if="!isMyProfile">
                                <button @click="follow" :class="{ 'btn-follow--highlight': isFollowing }">
                                    <span v-if="!isFollowing">Follow</span>
                                    <span v-else>Following</span>
                                </button>
                                
                                <RouterLink class="btn btn-primary" style="margin-left: 12px;" v-if="type == 'PROFILE'" :to="`/chats/${profile.id}`">Chats</RouterLink>
                            </div>
                            <div class="action-buttons" v-if="isMyProfile">
                                <RouterLink to="/profile/update" class="btn btn-primary">Update</RouterLink>
                                <RouterLink to="/profile/pet/create" class="btn btn-primary">Create Pet</RouterLink>
                            </div>
                            <div class="action-buttons" v-if="isMyPet">
                                <RouterLink :to="`/profile/pet/${profile.id}/update`">Update</RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="profile-main">
                <div class="profile-left">
                    <div class="card">
                        {{ profile.description }}
                    </div>
                    <div class="card" v-if="type == 'PROFILE'">
                        <div>
                            <b>Phone: </b><span>{{ profile.phone }}</span>
                        </div>
                        <div>
                            <b v-if="followCount.followers" @click="openListFollowers">Followers: </b><span>{{
                            followCount.followings.length }}</span>
                        </div>
                        <div>
                            <b v-if="type == 'PROFILE'" @click="openListFollowings">Followings: </b><span>{{
                            followCount.followings.length }}</span>
                        </div>
                    </div>
                    <div class="card" v-else>
                        <div>
                            <b>Specie: </b><span>{{ profile.specie_type }}</span>
                        </div>
                        <br>
                        <div>
                            <b>Owner: </b>
                            <CardUser :profile_id="profile.profile_id" />
                        </div>
                    </div>
                    <div class="card" v-if="type == 'PROFILE' && profile.pets && profile.pets.length > 0">
                        <h3>Pets</h3>
                        <ListPet :pet_ids="profile.pets" />
                    </div>
                </div>
                <div class="profile-detail">
                    <ListPost :post_ids="profile.posts" />
                    <ListCardUser v-if="showListUser" :profile_ids="showListUserProfileIds" @close="closeListUser" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* .main {
    background-color: unset;
} */

/* .main-center {
    overflow-y: unset;
} */

.main-center {
    max-width: 1200px;
}

.cover-photo {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.profile-top {
    background: white;
    margin-bottom: 24px;
}

.profile-top-desc {
    margin-top: -48px;
    padding: 0px 24px;
    display: flex;
    align-items: end;
    padding-bottom: 24px;
}

.profile-top-action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    display: flex;
    margin-bottom: 24px;
    padding-left: 24px;
    width: 100%;
}

.profile-top-action-right {
    margin-left: auto;
}

.profile-name {
    font-size: 24px;
    font-weight: 600;
}

.profile-photo {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 5px solid white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}



.action-buttons {
    display: flex;
    gap: 10px;
}

.profile-main {
    display: flex;
}

.profile-left {
    width: 250px;
    margin-right: 24px;
}

.profile-detail {
    width: 100%;
    flex: 1;
}
</style>