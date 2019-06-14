<template>
    <v-layout>
        <v-btn 
            color="indigo" 
            dark
            class="ml-0" 
            @click="fetchData">
            RELOAD
            <v-icon class="ml-2" small>fas fa-sync</v-icon>
        </v-btn>

        <v-btn 
            color="indigo" 
            dark
            class="ml-0" 
            @click="clearFilters">
            CLEAR FILTERS
            <v-icon class="ml-2" small>fas fa-sync</v-icon>
        </v-btn>

        <columns></columns>

        <update></update>
        <update-multiple></update-multiple>
    </v-layout>
</template>

<script>
    import { mapMutations } from 'vuex'
    import { mapActions } from 'vuex'
    import { mapGetters } from 'vuex'

	export default {
        methods: {
            ...mapActions('datatable', {
                clearFilters: 'CLEAR_FILTERS',
                fetchData: 'FETCH_DATA'
            }),
        }
	}
</script>