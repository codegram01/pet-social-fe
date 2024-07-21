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
    if(props.type == 'PROFILE') {
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
    if(props.type == 'PROFILE') {
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
        if(props.type == 'PROFILE') {
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
    if(followCount.value.followers) {
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
    <div v-if="isDoneLoad">
        <v-container v-if="profile" class="pa-0">
            <v-row>
                <v-col cols="12">
                    <v-card class="mx-auto" tile>
                        <v-img src="/src/public/images/bia.jpg"  height="240" cover />
                        <v-row no-gutters>
                            <v-col cols="2" class="pa-0 d-flex justify-center">
                                <v-avatar
                                    size="160"
                                    color="grey-darken-3"
                                    image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                                />
                            </v-col>
                            <v-col cols="5" class="pa-0 d-flex align-start justify-center flex-column">
                                <div>
                                    <strong>{{ profile.name }}</strong>
                                </div>
                                <div>
                                    <v-btn flat @click="follow" :class="{ 'btn-follow--highlight': isFollowing }">
                                        <span v-if="!isFollowing">Follow</span>
                                        <span v-else>Following</span>
                                    </v-btn>
                                    <RouterLink v-if="type == 'PROFILE'" :to="`/chats/${profile.id}`">Chats</RouterLink>
                                </div>
                                <div>
                                    <span v-if="type == 'PROFILE'" @click="openListFollowings">{{ followCount.followings.length }} Following</span>
                                    -
                                    <span v-if="followCount.followers" @click="openListFollowers">{{ followCount.followers.length }} Followers</span>
                                </div>
                            </v-col>
                            <v-col cols="5" class="mt-6 pa-0 d-flex align-start justify-end">
                                <div class="mx-6" v-if="isMyProfile">
                                    <v-btn class="mr-6">
                                        <RouterLink to="/profile/update">Update</RouterLink>
                                    </v-btn>
                                    <v-btn> 
                                        <RouterLink to="/profile/pet/create">Create Pet</RouterLink>
                                    </v-btn>
                                    <v-btn v-if="isMyPet">
                                        <RouterLink :to="`/profile/pet/${profile.id}/update`">Update</RouterLink>
                                    </v-btn>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card>   
                </v-col>

                <v-col cols="6">
                    <v-card>
                        <h1>Giới Thiệu</h1>
                        <p>
                        {{ profile.description }}
                        </p>
                        <div v-if="type == 'PROFILE'">
                            <b>Phone: </b><span>{{ profile.phone }}</span>
                        </div>
                        <div v-else>
                            <div>
                                <b>Specie: </b><span>{{ profile.specie_type }}</span>
                            </div>
                            <br>
                            <div>
                                <b>Owner: </b> <CardUser :profile_id="profile.profile_id" />
                            </div>
                        </div>
                        <div v-if="type == 'PROFILE' && profile.pets && profile.pets.length > 0">
                            <h3>Pets</h3>
                            <ListPet :pet_ids="profile.pets" />
                            <hr>
                        </div>
                    </v-card>
                </v-col>
                <v-col cols="6">
                    <v-card>
                        <h3>Posts</h3>
                        <ListPost :post_ids="profile.posts" />
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <div v-else>
            <h1>Not found profile</h1>
        </div>
    </div>

    <div v-else>

    </div>
    <ListCardUser v-if="showListUser" :profile_ids="showListUserProfileIds" @close="closeListUser" />
</template>

<style scoped></style>