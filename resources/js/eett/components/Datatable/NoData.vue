<template>
	<tr v-if="noData">
        <td :colspan="columns.length + 3">
            No data was found
        </td>
    </tr>
</template>

<script>
 	import { mapGetters } from 'vuex'
	export default {
		computed: {
			...mapGetters("datatable", {
	            noData: 'noData',
	            columns: 'getColumns'
	        })
		}
	}
</script>