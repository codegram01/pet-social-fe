<script setup>
import { message_send_api, message_update_api } from "@/services/chat"
import { computed, nextTick, onBeforeMount, onMounted, ref, watch } from "vue";
import AvatarMessage from "./AvatarMessage.vue";
import { messageSocket } from "@/stores/socket";
import ActionMess from "./ActionMess.vue"

onBeforeMount(()=> {
    console.log("--------------> onbeforemount chat detail")
})



watch(() => messageSocket.value, ()=> {
    console.log("------> on chat receive ", messageSocket.value)

    switch(messageSocket.value.action) {
        case "CONVERSATION_SEND_MESS":
            if(messageSocket.value.data.conversation_id == props.conversation.id){
                pushMessage(messageSocket.value.data)

                if(isNearBottom()) {
                    console.log("on scrollll")
                    nextTick(()=> {
                        scrollMess()
                    })
                }
            }
            break;
        case "CONVERSATION_DELETE_MESS":
            const conversationId = messageSocket.value.data.conversation_id
            const messageId = messageSocket.value.data.message_id;

            if(props.conversation.id == conversationId) {
                deleteMess(messageId)
            }
            break;
    }
})

const isNearBottom = () => {
    const nearBottom = chatMessageElm.value.scrollTopMax - chatMessageElm.value.scrollTop

    console.log("-------> is Near Bottom ", nearBottom)
    if(nearBottom < 200) {
        return true
    }

    return false
}

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
            pushMessage(res)

            nextTick(()=> {
                scrollMess()
            })
        })
    } catch (error) {
        console.log(error)
    }
}

const pushMessage = (message) => {
    const idf = props.conversation.messages.findIndex(item => item.id == message.id)

    if(idf < 0) {
        props.conversation.messages.push(message)
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

const deleteMess = (id) => {
    const idf = props.conversation.messages.findIndex(item => item.id == id)
    if(idf >= 0) {
        props.conversation.messages.splice(idf, 1)
    }
}

const messageNeedEdit = ref(null)
const openEditMess = (messageEdit) => {
    messageNeedEdit.value = JSON.parse(JSON.stringify(messageEdit))
}

const cancelEditMess = () => {
    messageNeedEdit.value = null;
}

const saveEditMess = async () => { 
    const indexMess = props.conversation.messages.findIndex(mess => mess.id == messageNeedEdit.value.id)
    const messOrg = props.conversation.messages[indexMess]

    try {
        await message_update_api(messOrg.id, {
            content: messageNeedEdit.value.content
        }).then(res => {
            messOrg.content = res.content
            cancelEditMess()
        })
    } catch (error) {
        console.log(error)
    }
    
}
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
                
                <ActionMess :message="message" 
                    @deleteMess="deleteMess"
                    @openEditMess="openEditMess"
                />
            </div>
        </div>
        <div class="chat-send">
            <textarea 
                class="input-send" 
                placeholder="Enter message..." 
                v-model="contentMessage"
                v-on:keyup.enter="sendMessage"
                v-if="!messageNeedEdit"
            ></textarea>
            <textarea 
                class="input-send" 
                placeholder="Enter message..." 
                v-model="messageNeedEdit.content"
                v-on:keyup.enter="saveEditMess"
                v-else
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
    position: relative;
}

.message-div + .message-div {
    margin-top: 12px;
}
</style>