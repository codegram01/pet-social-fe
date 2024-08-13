<script setup>
import { onBeforeMount, ref } from "vue";
import { detail_pet_api } from "@/services/pet"
const props = defineProps(["pet_ids", "hideDesc"])

onBeforeMount(async () => {
    await getPets();
})

const pets = ref([])
const getPets = async () => {
    props.pet_ids.forEach(async item => {
        await detail_pet_api(item.id).then(res => {
            pets.value.push(res)
        })
    });
}
console.log(pets.value)
</script>

<template>
    <div class="list-pets">
        <RouterLink v-for="pet of pets" 
            :key="pet.id" 
            :to="`/profile/pet/${pet.id}`"
            class="pet"
        >
            <i class="bi bi-twitter pet-avatar"></i> 
            <span class="pet-name">{{ pet.name }}</span>
            <!-- <p v-if="!hideDesc">{{ pet.description }}</p> -->
        </RouterLink>
    
    </div>
</template>

<style scoped>
.list-pets {

}

.pet {
    background: #ffe8bb;
    color: #ff440a;
    padding: 6px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 2px solid #faaa65;
    border-radius: 6px;
}

.pet + .pet {
    margin-left: 12px;
}

.pet-avatar {
    width: 24px;
    height: 24px;
}

.pet-name {

}
</style>

