<script setup>
import Popup from './Popup.vue';
import { dataPopup, closePopup } from '@/stores/popup';


const cancel = () => {
    if(dataPopup.value.close) {
        dataPopup.value.close()
    }

    closePopup();
}

const confirm = () => {
    if(dataPopup.value.confirm) {
        dataPopup.value.confirm()
    }

    closePopup()
}

</script>

<template>
    <div>
        <Popup @close="cancel" v-if="dataPopup.show">
            <template v-slot:header>
                {{ dataPopup.title }}
            </template>

            <template v-slot:body>
                <div>{{ dataPopup.content }}</div>

                <div v-if="dataPopup.confirm">
                    <button @click="cancel">Cancel</button>
                    <button @click="confirm">Confirm</button>
                </div>
            </template>
        </Popup>
    </div>
</template>