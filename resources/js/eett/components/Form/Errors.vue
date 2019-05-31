<template>
	<div v-if="errors.update" class="mt-3">
        <div v-for="(error, index) in errors.update" :key="index">
            <p class="text-danger lead" v-for="thing in error">
                {{thing}}
            </p>
        </div>
    </div>
</template>

<script>
	export default {
		
	}
</script>