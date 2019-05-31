<template>
	<tr v-if="noData">
        <td :colspan="columns.length + 3">
            No data was found
        </td>
    </tr>
</template>

<script>
	export default {
		computed: {
			noData() {
				return this.$store.getters['datatable/noData']
			},
			columns() {
                return this.$store.getters['datatable/getColumns']
            }
		}
	}
</script>