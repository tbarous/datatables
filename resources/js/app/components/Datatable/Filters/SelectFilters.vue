<template>
	<div>
		<div v-for="filter in selectFilters">
			<v-radio-group v-model="filter.value" row>
		      	<v-radio
			        v-for="option in filter.options"
			        :key="option"
			        :label="`${option}`"
			        :value="option"
		      	></v-radio>
			</v-radio-group>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			selectFilters(){
				return this.$store.getters['datatable/GET_SELECT_FILTERS']
			}
		}
	}
</script>	