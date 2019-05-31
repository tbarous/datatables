<template>
    <div :class="{nopacity: !loading}">
        <v-progress-linear :indeterminate="true"></v-progress-linear>
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
