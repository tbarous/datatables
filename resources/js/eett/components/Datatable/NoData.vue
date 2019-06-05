<template>
	<tr v-if="noData">
        <td class="p-3" :colspan="columns.length + 2">No data was found</td>
    </tr>
</template>

<script>
 	import { mapGetters } from 'vuex'
	export default {
		computed: {
			...mapGetters("datatable", {
	            noData: 'NO_DATA',
	            columns: 'GET_COLUMNS'
	        })
		}
	}
</script>