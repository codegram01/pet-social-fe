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
import ProfileUpdate from '@/components/profile/ProfileUpdate.vue';

const props = defineProps(["type"])

const route = useRoute()
const router = useRouter()

const idProfile = computed(() => {
    return route.params.idUser
})


watch(() => [idProfile.value, props.type], async () => {
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
const updateProfileType = ref('');

const showUpdateProfile = ref(false)
const openUpdateProfile = (type) => {
    updateProfileType.value = type
    showUpdateProfile.value = true
}
const closeUpdateProfile= () => {
    showUpdateProfile.value = false
}

const updateProfile = (p) => {
    profile.value.name = p.name
    profile.value.description = p.description
    profile.value.phone = p.phone
    profile.value.address = p.address
    profile.value.gender = p.gender
    profile.value.birthday = p.birthday
}

const updateProfilePet = (pet) => {
    profile.value.name = pet.name
    profile.value.description = pet.description
    profile.value.specie_type = pet.specie_type
    profile.value.birthday = pet.birthday
    profile.value.gender = pet.gender
}

</script>

<template>

    <div class="main">

        <div class="main-center" v-if="isDoneLoad && profile">
            <div class="profile-top">
				<img v-if="type == 'PROFILE'" class="cover-photo" src="https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/306280037_493862252607886_2979074565757683905_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=y1nDMGnyQd0Q7kNvgEIpD8d&_nc_ht=scontent.fdad3-1.fna&oh=00_AYBRcVQ8ZrDQ0_wIQltV2BtK4bFEZX86ORStIIh8_XxxEg&oe=66CB1C3D"/>
                <img v-else src="https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733_640.jpg" alt="Cover Photo" class="cover-photo">
                <div class="profile-top-desc">
                    <img v-if="type == 'PROFILE'" src="@/public/images/avatar.png" alt="Profile Photo" class="profile-photo">
                    <img v-else src="/public/icons/pet-avatar.png" alt="Profile Photo" class="profile-photo">
                    <div class="profile-top-action">
                        <div class="profile-name">
                            {{ profile.name }}
                        </div>
                        <div class="profile-top-action-right">
                            <div class="action-buttons">
                                <div v-if="isMyPet">
                                    <button class="btn btn-primary btn-create" @click="openUpdateProfile('PET_UPDATE')">Update</button>
                                </div>
                                <div v-if="!isMyProfile">
                                <button @click="follow" :class="{ 'btn-follow--highlight': isFollowing }">
                                    <span v-if="!isFollowing">Follow</span>
                                    <span v-else>Following</span>
                                </button>
                                <RouterLink class="btn btn-primary" style="margin-left: 12px;" v-if="type == 'PROFILE'" :to="`/chats/${profile.id}`">Chats</RouterLink>
                            </div>
                            </div>
                        
                            <div v-if="isMyProfile" class="action-buttons">
                                <button class="btn btn-primary btn-create" @click="openUpdateProfile('PROFILE')">Update</button>
                                <button class="btn btn-primary btn-create" @click="openUpdateProfile('PET')">Create Pet</button>
                            </div>
                        </div>
                    </div>
                </div>
                <ProfileUpdate 
                    v-if="showUpdateProfile" 
                    :type="updateProfileType" 
                    @close="closeUpdateProfile"
                    @updateProfile="updateProfile"
                    @updateProfilePet="updateProfilePet"
                />
                
            </div>
            <div class="profile-main">
                <div class="profile-left">
                    <div class="card" v-if="type == 'PROFILE'">
                        <div class="profile-desc">
                            {{ profile.description }}
                        </div>
                        <div class="profile-follow">
                            <i class="bi bi-person-lines-fill follow-icn"></i>
                            <div class="follow-div" v-if="followCount.followers" @click="openListFollowers">
                                <span class="follow-length">
                                    {{followCount.followers.length }}
                                </span>
                                <span class="follow-text">followers</span>
                            </div>
                            -
                            <div class="follow-div" v-if="type == 'PROFILE'" @click="openListFollowings">
                                <span class="follow-length">{{followCount.followings.length }}</span>
                                <span class="follow-text">followings</span>
                            </div>
                        </div>

                        <div class="tab-list-row profile-link">
                            <div class="tab">
                                <b>Phone: </b><span> {{ profile.phone }}</span>
                            </div>
                            <div class="tab">
                                <b>Email: </b><span> abc@gmail.com</span>
                            </div>
                            <div class="tab">
                                <b>Website: </b><span> example.com</span>
                            </div>
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
					<ListPost :post_ids="profile.posts" v-if="profile.posts && profile.posts.length > 0"/>
					<div v-if="profile.posts.length == 0" class="card">
						<div>There are no posts yet</div>
						<br>
						<RouterLink v-if="isMyProfile || isMyPet" class="btn" to="/">Create new post</RouterLink>
					</div>
                    <ListCardUser v-if="showListUser" :profile_ids="showListUserProfileIds" @close="closeListUser" />
                </div>
				<div class="profile-right">
					<div class="card">
						<div class="popular-hashtags-title">Follow to see more posts</div>
					</div>
					<div class="card">
						<img style="width: 100%;" src="https://static.vecteezy.com/system/resources/previews/001/261/012/non_2x/connecting-people-avatars-vector.jpg" alt="">
					</div>
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

.profile-right {
    width: 250px;
    margin-left: 24px;
}

.profile-desc {
    font-size: 15px;
    margin-bottom: 12px;
}

.profile-follow {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 12px;
}

.follow-icn {

}

.follow-div {
    font-size: 15px;
    font-weight: 500;
    color: rgb(22, 22, 22);
}

.follow-length {
    
    margin-right: 6px;
}

.follow-text {

}

.profile-link {
    padding-top: 12px;
    border-top: 1px solid var(--c-border);
}
</style>
