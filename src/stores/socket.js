import { computed, ref } from "vue";
import { token } from "./auth";

const messageSocket_ = ref(null)
export const messageSocket = computed(() => {
    return messageSocket_.value
})

export const init_socket = () => {
    const socket = new WebSocket("ws://localhost:8001");

    socket.addEventListener("open", (event) => {
        socket.send(JSON.stringify({
            action: 'CONNECT_SOCKET',
              data: token.value
          }))
    });

    socket.addEventListener("message", (event) => {
        messageSocket_.value = JSON.parse(event.data)
    }); 
}