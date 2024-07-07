<script setup>
import CardUser from "./CardUser.vue"
const props = defineProps(["profile_ids"])
const emits = defineEmits(["close"])
</script>

<template>
    <div class="overlay" @click="emits('close')">
        <div class="container" @click.stop="">
            <div v-for="profile_id of profile_ids" :key="profile_id">
                <CardUser :profile_id="profile_id" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #00000080;
    z-index: 4;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn-f413701c .5s ease;
}

.container {
    position: absolute;
    z-index: 99;
    border: 1px solid var(--Neutral-200, #EAEDF0);
    background: var(--Neutral-25, #FCFCFD);
    border-radius: 16px;
    width: 565px;
    text-align: center;
    padding: 24px 36px;
}
</style>