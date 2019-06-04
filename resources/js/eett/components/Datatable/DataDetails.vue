<template>
	<div>
        <br>
        <div v-if="!loading" style="height: 80px">
            <p class="text-dark">Last Update @ {{pagination.meta.last_update}}</p>
            <p class="text-dark">
                 <i class="text-dark">Displaying {{getItemsCount}}</i>
            </p>
        </div>
        <div v-else style="height: 80px;">
            <v-progress-circular small v-if="loading" indeterminate color="primary"></v-progress-circular>
        </div>
        <p class="text-dark">
            <u class="text-dark">Selected: {{selected.length}}</u>
        </p>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
	export default{
		computed: {
			...mapGetters("datatable", {
	            loading: 'GET_LOADING',
	            pagination: 'GET_PAGINATION',
	            getItemsCount: 'GET_ITEMS_COUNT',
	            selected: 'GET_SELECTED',
	        })
		}
	}
</script>