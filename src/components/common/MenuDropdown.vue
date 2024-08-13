<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  options: Array,
  icon: String,
  label: String
});

const showDropdown = ref(false)
const closeDropdown = () => {
    showDropdown.value = false;
}
const switchDropdown = () => {
    showDropdown.value = !showDropdown.value
}
</script>

<template>
    <div>
        <div class="overlay" v-if="showDropdown" @click="closeDropdown"></div>
        <div class="main-popup">
            <span class="ellipsis" @click="switchDropdown">
                <i :class="icon"></i>
                <span v-if="label">{{ label }}</span>
            </span>
            <div class="hover-popup" v-if="showDropdown">
                <div class="popup" @click="closeDropdown">
                    <slot name="options"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.ellipsis {
  cursor: pointer;
  margin-left: auto;
}

.popup {
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3)
}

.overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #00000080;
}

.main-popup {
    z-index: 11;
}
</style>