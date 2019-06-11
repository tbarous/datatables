<template>
	<div>
		<div v-for="filter in Object.keys(selectFilters)">
			<v-radio-group v-model="columns[3].query" row>
		      	<v-radio
		        	v-for="option in selectFilters[filter].options"
			        :key="option"
			        :label="`${option}`"
			        :value="option"
			        @change="change"
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
			},
			columns(){
				return this.$store.getters['datatable/GET_COLUMNS']
			}
		},

		methods: {
			change(){
				this.$store.dispatch('datatable/FETCH_DATA')
			}
		}
	}
</script>	