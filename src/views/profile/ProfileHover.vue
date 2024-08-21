<script setup>
import ProfileUpdate from '@/components/profile/ProfileUpdate.vue';

const props = defineProps(["type"]);

</script>

<template>
	<div>
		<ProfileUpdate 
			v-if="type == 'CREATE_PROFILE'" 
			type="PROFILE" 
		/>
	</div>
</template>
