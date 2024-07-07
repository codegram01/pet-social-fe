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
</script>

<template>
    <div>
        <div v-for="pet of pets">
            <RouterLink :to="`/profile/pet/${pet.id}`"><b>{{ pet.name }}</b></RouterLink>
            <p v-if="!hideDesc">{{ pet.description }}</p>
        </div>
    </div>
</template>

