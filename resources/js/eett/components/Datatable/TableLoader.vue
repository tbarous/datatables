<template>
    <div :class="{nopacity: !loading}">
        <v-progress-linear :indeterminate="true" class="m-0"></v-progress-linear>
    </div>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		computed: {
			...mapGetters("datatable", {
                loading: 'GET_LOADING',
            })
		}
	}
</script>
