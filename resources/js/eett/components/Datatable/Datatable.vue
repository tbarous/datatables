<template>
    <div>
        <v-layout>
            <per-page></per-page>
            <data-details></data-details>
        </v-layout>
        <v-divider></v-divider>
        <tools></tools>
        <search></search>
        <table-loader></table-loader>
        <div class="wrapper double-scroll">
            <table v-scroll id="table" data-tableName="Test Table 2">
                <thead>
                    <headers></headers>
                    <column-search></column-search>
                </thead>
                <tbody>
                    <no-data></no-data>
                    <body></body>
                </tbody>
            </table>
        </div>
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
import ColumnSearch from './ColumnSearch'
import NoData from './NoData'

export default {
    mounted(){
        $('.double-scroll').doubleScroll()
        $('input[name="datefilter"]').daterangepicker(this.options)
        this.$store.dispatch('daterangepicker/setPicker')
    },

    created() {
        this.$store.dispatch('datatable/setActiveColumnsAndQueries')
        return this.$store.dispatch('datatable/fetchData')
    },

    components: {
        TableLoader,
        Navigation,
        PerPage,
        DataDetails,
        Tools,
        Search,
        ColumnSearch,
        NoData
    }
}
</script>