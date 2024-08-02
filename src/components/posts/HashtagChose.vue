<script setup>
import { onMounted, ref } from 'vue';
import { search_hash_tag_by_tag_api } from "@/services/post"
 
const props = defineProps(["hashtags"])
const inpHashtag = ref("")

onMounted(()=>{
})

const timeOutCallSearch = ref(null);
const searchHashtag = () => {
    console.log(inpHashtag.value)
    if(inpHashtag.value) {
        if (timeOutCallSearch.value) {
            clearTimeout(timeOutCallSearch.value);
        }
        timeOutCallSearch.value = setTimeout(async () => {
            await callApiSearchHashtag();
        }, 500);
    } else {
        hashtagsSearch.value = []
    }
}

const callApiSearchHashtag = async () => {
    if(!inpHashtag.value){
        hashtagsSearch.value = []
        return
    }
    try {
        await search_hash_tag_by_tag_api(inpHashtag.value).then(res => {
            const resFilter = []
            for(const tag of res) {
                const idf = props.hashtags.findIndex(item => item.tag == tag.tag)

                if(idf < 0) {
                    resFilter.push(tag)
                }
            }
            hashtagsSearch.value = resFilter;
        })
    } catch (error) {
        console.log(error)
    }
}

const hashtagsSearch = ref([])

const choseHashtag = (tag) => {
    props.hashtags.push({
        tag: tag
    })

    removeHashtag(hashtagsSearch.value,tag)
}

const removeHashtag = (arrTag, tag) => {
    const idx = arrTag.findIndex(item => item.tag == tag)
    if(idx >= 0) {
        arrTag.splice(idx, 1)
    }
}


const enterHashtag = () => {
    choseHashtag(inpHashtag.value)

    inpHashtag.value = ""
}
</script>

<template>
    <div>
        <label>Hashtags</label>
        <div class="tag-suggest-hover" v-if="hashtagsSearch.length > 0">
            <div class="tag-suggest-popup">
                <div class="tag-suggest" v-for="tag of hashtagsSearch" :key="tag" @click="choseHashtag(tag.tag)">
                    #{{ tag.tag }}
                </div>
            </div>
        </div>
        <input @input="searchHashtag" v-model="inpHashtag" type="text" placeholder="Enter hashtag"  v-on:keydown.enter.prevent="enterHashtag">
        <div class="hashtag-chose-ctn">
            <div class="hashtag-chose" v-for="tag of hashtags" :key="tag">
                #{{ tag.tag }}
                <div class="hashtag-chose-rm" @click="removeHashtag(hashtags, tag.tag)">
                    <i style="font-size: 14px;" class="bi bi-x-circle-fill"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tag-suggest-hover {
    position: relative;
}

.tag-suggest-popup {
    position: absolute;
    bottom: 0;
    display: flex;
    flex-flow: column;
    background-color: white;
    padding: 12px;
    border-radius: 12px;
    width: 100%;
    box-shadow: 0 1px 5px #00000026;
}

.tag-suggest {
    width: 100%;
    padding: 6px;
    font-size: 14px;
    cursor: pointer;
    font-weight: 500;
}

.tag-suggest:hover {
    background-color: #cbe3fd;
}

.tag-suggest + .tag-suggest {
    border-top: 1px solid var(--c-border);
}

.hashtag-chose-ctn {
    margin: 12px 0px;
    gap: 6px;
    display: flex;
    flex-wrap: wrap;
}

.hashtag-chose {
    clear: both;
    display: inline-block;
    padding: 6px;
    background-color: #cbe3fd;
    border-radius: 6px;
    position: relative;
}

.hashtag-chose-rm {
    position: absolute;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    cursor: pointer;
    top: -7px;
    right: -7px;
    display: none;
}

.hashtag-chose:hover .hashtag-chose-rm {
    display:  block;
}
</style>