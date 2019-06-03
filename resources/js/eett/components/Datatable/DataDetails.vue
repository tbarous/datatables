<template>
	<v-flex xs6 class="text-right">
        <div v-if="!loading" style="height: 80px">
            <p class="text-dark">Last Update @ {{pagination.meta.last_update}}</p>
            <p class="text-dark">
                 <i class="text-dark">Displaying {{getItemsCount}}</i>
            </p>
        </div>
        <div v-else style="height: 80px;">
            <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
        </div>
        <p class="text-dark">
            <u class="text-dark">Selected: {{selected.length}}</u>
        </p>
    </v-flex>
</template>

<script>
    import { mapGetters } from 'vuex'
	export default{
		computed: {
			...mapGetters("datatable", {
	            loading: 'getLoading',
	            pagination: 'getPagination',
	            getItemsCount: 'getItemsCount',
	            selected: 'getSelected',
	        })
		}
	}
</script>