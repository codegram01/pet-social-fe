import { ref } from "vue";

export const dataPopup = ref({
    title: "",
    content: "",
    show: false,
    close: null, // function
    confirm: null // function
})

export const openPopup = (data) => {
    dataPopup.value = data;

    dataPopup.value.show = true;
}

export const closePopup = () => {
    dataPopup.value = {
        title: "",
        content: "",
        show: false,
        close: null,
        confirm: null
    }
}