<template>
    <v-layout>
        <v-btn color="info" class="ml-0" @click="fetchData">
            Reload <v-icon class="ml-2" small>fas fa-sync</v-icon>
        </v-btn>

        <v-btn color="info" @click="clearFilters">
            Clear <v-icon class="ml-2" small>fas fa-eraser</v-icon>
        </v-btn>

        <v-btn color="info" @click="openView">
            Columns <v-icon class="ml-2" small>fas fa-columns</v-icon>
        </v-btn>

        <v-btn color="info" :disabled="selected.length < 2" @click="openUpdateMultiple">
            Update <v-icon class="ml-2" small>fas fa-edit</v-icon>
        </v-btn>
    </v-layout>
</template>

<script>
    import { mapMutations } from 'vuex'
    import { mapActions } from 'vuex'
    import { mapGetters } from 'vuex'

	export default{
		computed: {
            ...mapGetters("datatable", {
                selected: 'GET_SELECTED',
            })
        },
        methods: {
            ...mapMutations('ui', {
                openUpdateMultiple: 'OPEN_UPDATE_MULTIPLE_DIALOG',
                openView: 'OPEN_VIEW_DIALOG'
            }),
            ...mapActions('datatable', {
                clearFilters: 'CLEAR_FILTERS',
                fetchData: 'FETCH_DATA'
            })
        }
	}
</script>