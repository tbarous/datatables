<template>
	<div>
		<p class="text-danger mt-3" v-for="error in findError(item)">
	        {{error}}
	    </p>
	</div>
</template>

<script>
	export default {
		props: {
			item: {
				type: String,
				required: true
			}
		},
		methods: {
            findError(title) {
                return this.$store.getters['datatable/GET_ERROR'](title)
            },
		}
	}
</script>