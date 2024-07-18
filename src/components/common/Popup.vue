<script setup>

const emits = defineEmits(["close"])

const close = () => {
    emits("close")
}

</script>

<template>
    <div class="overlay" @click="close">
        <div class="container-popup" @click.stop="">
            <div class="header">
                <slot name="header"></slot>
            </div>
            <hr>
            <slot name="body">
    
            </slot>
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
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container-popup {
    background-color: white;
    padding: 24px;
    min-width: 400px;
}

.header {
    font-size: 20px;
    font-weight: 500;
}
</style>