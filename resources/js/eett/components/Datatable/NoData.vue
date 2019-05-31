<template>
	<tr v-if="noData">
                        <td class="no-data bg-info text-dark" dark :colspan="columns.length + 3">
                            No data was found
                        </td>
                    </tr>
</template>

<script>
	export default {
		
	}
</script>