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
    <div class="main">
        
       <div class="main-left">
            <div class="tableft-nav">
                Chats
            </div>
            <div class="tableft-tabs">
                <RouterLink 
                    v-for="con of conversations" 
                    :key="con.id"
                    :to="`/chats/${con.id_guest}`"
                    class="conversation"
                    :class="{'conversation--active': con.id == idConversationDetail }"
                >
                    <i class="bi bi-person-fill"></i>
                    <span style="margin-left: 12px;">{{ con.name }}</span>
                </RouterLink>
            </div>
       </div>
       <div class="main-center">
            <ChatDetail v-if="conversationDetail" :conversation="conversationDetail" />
       </div>
    </div>
</template>

<style scoped>
.page {

}

.main-left {
    padding: unset;
    position: relative;
    z-index: 3;
    box-shadow: 2px 0 5px -2px rgba(0, 0, 0, 0.2);
}

.tableft-nav {
    position: absolute;
    width: 100%;
    height: 52px;
    border-bottom: 1px solid var(--c-border);
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
    padding: 0px 12px;
    z-index: 2;
    box-shadow: 0 1px 2px var(--c-shadow);
}

.tableft-tabs {
    position: absolute;
    width: 100%;
    height: calc(100% - 52px);
    top: 52px;
}

.conversation {
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--c-border);
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

.main-center {
    max-width: unset;
    padding: unset;
}

.main {
    background-color: var(--c-white);
}
</style>