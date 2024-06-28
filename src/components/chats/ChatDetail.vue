<script setup>
import { message_send_api } from "@/services/chat"
import { nextTick, onMounted, ref } from "vue";
import AvatarMessage from "./AvatarMessage.vue";

const props = defineProps(["conversation"])

onMounted(() => {
    scrollMess()
})

const contentMessage = ref("")
const sendMessage = async () => {
    if(!contentMessage.value){
        return;
    }
    let content = contentMessage.value
    contentMessage.value = ""

    try {
        await message_send_api(props.conversation.id_guest, {
            content: content
        }).then(res => {
            props.conversation.messages.push(res)

            nextTick(()=> {
                scrollMess()
            })
        })
    } catch (error) {
        console.log(error)
    }
}

const chatMessageElm = ref(null)
const scrollMess = async () => {
    await delay(200)
    chatMessageElm.value.scroll({
        top: chatMessageElm.value.scrollHeight + 500,
        behavior: "smooth",
    });
}

const delay = ms => new Promise(res => setTimeout(res, ms));
</script>

<template>
    <div class="chat-detail">
        <div class="chat-nav">
            <div class="chat-nav-name">{{ conversation.name }}</div>
        </div>
        <div class="chat-message" ref="chatMessageElm" id="chatMessageElm">
            <div class="message-div" v-for="message of conversation.messages" :key="message.id">
                <AvatarMessage :profile_id="message.profile_id" />
                <div>
                    {{ message.content }}
                </div>
            </div>
        </div>
        <div class="chat-send">
            <textarea 
                class="input-send" 
                placeholder="Enter message..." 
                v-model="contentMessage"
                v-on:keyup.enter="sendMessage"
            ></textarea>
        </div>
    </div>
</template>

<style scoped>
.chat-detail {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-flow: column;
}

.chat-nav {
    height: 52px;
    width: 100%;
    background: #faebd7;
    display: flex;
    align-items: center;
    padding: 0px 24px;
    border-bottom: 1px solid black;
}

.chat-nav-name {
    font-size: 18px;
    font-weight: 600;
}

.chat-message {
    width: 100%;
    height: 100%;
    flex: 1;
    background-color: white;
    overflow-y: scroll;
    max-height: 100%;
    padding: 24px;
}

.chat-send {
    width: 100%;
    height: 120px;
    background-color: #faebd7;
    border-top: 1px solid black;
    padding: 24px;
}

.input-send {
    width: 100%;
    height: 100%;
}

.message-div {

}

.message-div + .message-div {
    margin-top: 12px;
}
</style>