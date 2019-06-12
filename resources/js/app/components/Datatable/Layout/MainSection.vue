<template>
    <div>
        <per-page></per-page>
        <data-details></data-details>
        <v-divider></v-divider>
        <tools></tools>
        <search></search>
        <select-filters></select-filters>
        <table-loader></table-loader>
        <table-section></table-section>    
        <table-loader></table-loader>
        <navigation></navigation>
    </div>
</template>

<script>
import TableLoader from './../../UI/TableLoader'
import Navigation from './../Pagination/Navigation'
import PerPage from './../Utilities/PerPage'
import DataDetails from './../Info/DataDetails'
import Tools from './../Utilities/Tools'
import Search from './../Filters/Search'
import TableSection from './TableSection'
import SelectFilters from './../Filters/SelectFilters'

export default {
    created() {
        this.$store.dispatch('datatable/FETCH_DATA')
    },

    mounted(){
        // var $table = $('table');
        // $table.floatThead();
    },

    components: {
        TableLoader,
        Navigation,
        PerPage,
        DataDetails,
        Tools,
        Search,
        TableSection,
        SelectFilters
    }
}
</script>