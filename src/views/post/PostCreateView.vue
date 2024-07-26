<script setup>
import { onBeforeMount, ref } from "vue"
import { post_create_api } from "@/services/post"
import { files_upload_api } from "@/services/file"
import { my_pet_api } from "@/services/pet"
import { useRouter } from "vue-router";
import { g_validation } from "@/modules/validation";
const emits = defineEmits(["close", "createPost"]);

const pets = ref([])
onBeforeMount(async ()=>{
    await my_pet_api().then(res => {
        pets.value = res
    })
})

const post = ref({
    title: "",
    content: "",
    files: [],
    pets: []
})
const router = useRouter()

const errTitle = ref("");
const checkTitle = () => {
	errTitle.value = g_validation({
        data: post.value.title,
		label: "Title",
        max: 200
	});
	if(errTitle.value){
		return false;
	}else{
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
	if(errContent.value){
		return false;
	}else{
		return true;
	}
}


const createPost = async () => {
    if(!checkTitle() || !checkContent()) {
        return
    }

    for(const pet of pets.value) {
        if(pet._chose) {
            post.value.pets.push({
                id: pet.id
            })
        }
    }
    try {
        await post_create_api(post.value).then(res => {
            router.push("/posts")
        })
    } catch (error) {
        console.log(error)
    }
}

const filesInp = ref(null)
const handleUploadFiles = async () => {
    const files = filesInp.value.files

    const formData = new FormData();

    for(const file of files) {
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

</script>

<template>
    <div>
        <h1>Create Post</h1>

        <div class="dev_page_content form_wrap">
            <form @submit.prevent="createPost">
                <div class="form-group">
                    <label> Title</label>
                    <input class="form-control" type="text" v-model="post.title" placeholder="Enter title" @input="checkTitle">
                    <div>{{ errTitle }}</div>
                </div>
                
                <div class="form-group">
                    <label> Content</label>
                   <input class="form-control" type="text" v-model="post.content" placeholder="Enter content" @input="checkContent">
                   <div>{{ errContent }}</div>
                </div>

                <div class="form-group">
                    <label>Files</label>
                    <input style="display: none;" type="file" id="filesInp" ref="filesInp" multiple @input="handleUploadFiles">
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
                </div>

                <div class="form-group">
                    <label>Pets</label>
                    <div v-for="pet of pets" :key="pet.name">
                        <label>
                            <input type="checkbox" v-model="pet._chose"> {{ pet.name }}
                        </label>
                    </div>
                </div>
                
                <hr>
                <div class="support_submit">
                    <button type="submit" class="btn btn-primary btn-lg">Create Post</button>
                    <RouterLink to="/posts" class="btn">Cancel</RouterLink>
                </div>
            </form>
        </div>
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