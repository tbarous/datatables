<template>
	<div>
		<div v-for="filter in filters">
			<v-radio-group v-model="columns[filter.index].query" row class="justify-content-start">
		      	<v-radio
		        	v-for="option in filter.options"
			        :key="option"
			        :label="`${option}` ? option : 'All'"
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
			filters(){
				return this.$store.getters['datatable/GET_FILTERS']
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