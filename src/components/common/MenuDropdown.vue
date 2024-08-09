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
</template>
<style scoped>
.ellipsis {
  cursor: pointer;
  margin-left: auto;
}

.popup {
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3)
}
</style>