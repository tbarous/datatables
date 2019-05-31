<template>
	<tr v-if="noData">
        <td :colspan="columns.length + 3">
            No data was found
        </td>
    </tr>
</template>

<script>
	export default {
		computed:{
			noData: () => this.$store.getters['datatable/noData']
		}
	}
</script>