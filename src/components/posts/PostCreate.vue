<script setup>
import { onBeforeMount, ref } from "vue"
import { post_create_api } from "@/services/post"
import { files_upload_api } from "@/services/file"
import { my_pet_api } from "@/services/pet"
import { useRouter } from "vue-router";
import { g_validation } from "@/modules/validation";
import Popup from "@/components/common/Popup.vue";
import HashtagChose from "./HashtagChose.vue";
const emits = defineEmits(["close", "createPost"]);


const pets = ref([])
onBeforeMount(async () => {
    await my_pet_api().then(res => {
        pets.value = res
    })
})

const post = ref({
    title: "",
    content: "",
    files: [],
    pets: [],
    hashtags: []
})
const router = useRouter()

const errTitle = ref("");
const checkTitle = () => {
    errTitle.value = g_validation({
        data: post.value.title,
        label: "Title",
        max: 200
    });
    if (errTitle.value) {
        return false;
    } else {
        return true;
    }
}

const errContent = ref("");
const checkContent = () => {
    errContent.value = g_validation({
        data: post.value.content,
        label: "Content",
        max: 1000,
    });
    if (errContent.value) {
        return false;
    } else {
        return true;
    }
}


const createPost = async () => {
    if (!checkTitle() || !checkContent()) {
        return
    }

    for (const pet of pets.value) {
        if (pet._chose) {
            post.value.pets.push({
                id: pet.id
            })
        }
    }
    try {
        await post_create_api(post.value).then(res => {
            // router.push("/posts")
        })
    } catch (error) {
        console.log(error)
    }
}

const filesInp = ref(null)
const handleUploadFiles = async () => {
    const files = filesInp.value.files

    const formData = new FormData();

    for (const file of files) {
        formData.append("files", file)
    }

    try {
        await files_upload_api(formData).then(res => {
            post.value.files = res.map(item => {
                return {
                    link: item.id
                }
            })
        })
    } catch (error) {
        console.log(error)
    }
}

const handleClickUploadFile = () => {
    filesInp.value.click()
}

const removeFile = (index) => {
    post.value.files.splice(index, 1)
}

const close = () => {
    emits("close")
}
</script>

<template>
    <div>
        <form class="form" @submit.prevent="createPost">
            <Popup @close="close" container-popup-max-width="500px">
                <template v-slot:header>
                    Create Post
                </template>
                <template v-slot:body>
                    <label>Title</label>
                    <input class="form-control" type="text" v-model="post.title" placeholder="Enter title"
                        @input="checkTitle">
                    <div class="error">{{ errTitle }}</div>

                    <label> Content</label>
                    <input class="form-control" type="text" v-model="post.content" placeholder="Enter content"
                        @input="checkContent">
                    <div class="error">{{ errContent }}</div>

                    <label>Files</label>
                    <input style="display: none;" type="file" id="filesInp" ref="filesInp" multiple
                        @input="handleUploadFiles">
                    <div>
                        <button type="button" class="btn" @click="handleClickUploadFile">Upload files</button>
                    </div>
                    <div>
                        <div v-for="(file, index) of post.files" :key="file.link" class="post-img-hover">
                            <div class="btn-img-rm" @click="removeFile(index)">
                                <i class="bi bi-dash-circle-fill"></i>
                            </div>
                            <img :src="$loadFile(file.link)" class="post-img">
                        </div>
                    </div>
                    <div class="error"></div>

                    <label>Pets</label>
                    <div class="tab-list-row">
                        <div class="tab" v-for="pet of pets" :key="pet.name">
                            <input type="checkbox" v-model="pet._chose">
                            <label class="tab-text">
                                {{ pet.name }}
                            </label>
                        </div>
                    </div>
                    <div class="error"></div>

                    <HashtagChose :hashtags="post.hashtags"/>

                </template>
                <template v-slot:bottom>
                    <button type="submit" style="margin-left: auto;">Create Post</button>
                    <button type="button" @click="close" class="btn--light">Cancel</button>
                </template>
            </Popup>
        </form>

    </div>
</template>

<style scoped>
.post-img-hover {
    position: relative;
    display: inline-flex;
}

.post-img {
    max-width: 400px;
}

.btn-img-rm {
    position: absolute;
    right: 12px;
    top: 12px;
    background-color: white;
    cursor: pointer;
    border-radius: 50%;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
}
</style>