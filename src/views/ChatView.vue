<script setup>
import { conversations_get_api, conversation_mount_api} from "@/services/chat"
import { computed, nextTick, onBeforeMount, ref, watch } from "vue";
import { useRoute } from "vue-router";
import ChatDetail from "@/components/chats/ChatDetail.vue"

const route = useRoute();
const idConversation = computed(() => {
    return route.params.idChat
})

const conversationDetail = ref(null)
const idConversationDetail = computed(()=> {
    if(conversationDetail.value){
        return conversationDetail.value.id
    }
})
const mountConversation = async () => {
    if(!idConversation.value) {
        conversationDetail.value = null;
        return;
    }
    try {
        await conversation_mount_api(idConversation.value).then(res => {
            conversationDetail.value = null
            nextTick(()=> {
                conversationDetail.value = res;

                const idf = conversations.value.findIndex(item => item.id == conversationDetail.value.id)
                if(idf < 0) {
                    conversations.value.unshift(conversationDetail.value)
                }
            })
            
        })        
    } catch (error) {
        console.log(error)
    }
}

onBeforeMount(async () => {
    await getConversations();

    await mountConversation();
})

const conversations = ref([])
const getConversations = async () => {
    try {
        await conversations_get_api().then(res => {
            conversations.value = res;
        })
    } catch (error) {
        console.log(error)
    }
}

watch(()=> idConversation.value, async () => {
    await mountConversation();
})



</script>

<template>
    <div class="page">
       <div class="tableft">
            <div class="tableft-nav">
                Chats
            </div>
            <RouterLink 
                v-for="con of conversations" 
                :key="con.id"
                :to="`/chats/${con.id_guest}`"
                class="conversation"
                :class="{'conversation--active': con.id == idConversationDetail }"
            >
                {{ con.name }}
            </RouterLink>
       </div>
       <div class="main">
            <ChatDetail v-if="conversationDetail" :conversation="conversationDetail" />
       </div>
    </div>
</template>

<style scoped>
.page {

}

.tableft {
    position: absolute;
    left: 0;
    top: 0;
    width: 272px;
    height: 100%;
    background: white;
    border-right: 1px solid black;
}

.tableft-nav {
    width: 100%;
    height: 52px;
    border-bottom: 1px solid black;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
    padding: 0px 12px;
    background: #faebd7;
}

.main {
    position: absolute;
    right: 0;
    top: 0;
    width: calc(100% - 272px);
    height: 100%;
}

.conversation {
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid black;
    padding: 0px 12px;
}

.conversation:hover {
    background-color: rgb(215, 244, 234);
}

.conversation--active {
    background-color: aquamarine;
}

.conversation--active:hover {
    background-color: aquamarine;
}
</style>