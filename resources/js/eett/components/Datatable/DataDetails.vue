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
	export default{
		computed: {
			loading(){
				return this.$store.getters['datatable/getLoading']
			},
			pagination(){
				return this.$store.getters['datatable/getPagination']
			},
			getItemsCount(){
				return this.$store.getters['datatable/getItemsCount']
			},
			selected(){
				return this.$store.getters['datatable/getSelected']
			}
		}
	}
</script>