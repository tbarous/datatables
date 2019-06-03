<template>
    <div :class="{nopacity: !loading}">
        <v-progress-linear :indeterminate="true" class="m-0"></v-progress-linear>
    </div>
</template>

<script>
export default {
	computed: {
		loading() {
			return this.$store.getters['datatable/getLoading']
		}
	}
}
</script>
