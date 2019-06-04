<template>
    <v-layout>
        <v-btn class="ml-0" @click="fetchData">
            Reload <v-icon small>fas fa-sync</v-icon>
        </v-btn>

        <v-btn @click="clearFilters">
            Clear <v-icon small>fas fa-eraser</v-icon>
        </v-btn>

        <v-btn @click="openView">
            Columns <v-icon small>fas fa-columns</v-icon>
        </v-btn>

        <v-btn :disabled="selected.length < 2" @click="openUpdate">
            Update <v-icon small>fas fa-edit</v-icon>
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
                openUpdate: 'OPEN_UPDATE_DIALOG',
                openView: 'OPEN_VIEW_DIALOG'
            }),
            ...mapActions('datatable', {
                clearFilters: 'CLEAR_FILTERS',
                fetchData: 'FETCH_DATA'
            })
        }
	}
</script>