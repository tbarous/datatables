<template>
	<v-flex xs6 class="text-right">
        <div class="items-count">
            <div v-if="!loading">
                <p class="text-white">
                    Last Update @ {{pagination.meta.last_update}}
                </p>
                <i>{{getItemsCount}}</i>
            </div>
            <div v-else style="height: 50px;">
                <img src="/images/ajax-loader.gif" alt="">
            </div>
            <br>
            <u>Selected: {{selected.length}}</u>
        </div>
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