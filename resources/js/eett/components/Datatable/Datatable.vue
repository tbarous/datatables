<template>
    <div>
        <per-page></per-page>
        <data-details></data-details>
        <v-divider></v-divider>
        <tools></tools>
        <search></search>
        <table-loader></table-loader>
        <table-section></table-section>    
        <table-loader></table-loader>
        <navigation></navigation>
    </div>
</template>

<script>
import TableLoader from './TableLoader'
import Navigation from './Navigation'
import PerPage from './PerPage'
import DataDetails from './DataDetails'
import Tools from './Tools'
import Search from './Search'
import TableSection from './TableSection'

export default {
    created() {
        this.$store.dispatch('datatable/INITIALIZE')
            .then(() => this.$store.dispatch('datatable/FETCH_DATA'))
    },

    components: {
        TableLoader, Navigation, PerPage, DataDetails, Tools, Search, TableSection
    }
}
</script>