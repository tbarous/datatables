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

    computed: {
        url(){
            return this.$store.getters['api/getResourceURL']
        },
        columns(){
            return this.$store.getters['datatable/getResourceURL']
        },
        loading(){
            return this.$store.getters['datatable/getLoading']
        },
        pagination(){
            return this.$store.getters['datatable/getPagination']
        },
        offset(){
            return this.$store.getters['datatable/offset']
        },
        currentPage(){
            return this.$store.getters['datatable/currentPage']
        },
        perPage(){
            return this.$store.getters['datatable/perPage']
        },
        getItemsCount() {
            return this.$store.getters['datatable/getItemsCount']
        },
        noData(){
            return this.$store.getters['datatable/noData']
        },
        pagesNumber() {
            return this.$store.getters['datatable/pagesNumber']
        },
        totalData() {
            return this.$store.getters['datatable/totalData']
        },
        options(){
            return this.$store.getters['daterangepicker/getOptions']
        },
        sortedColumn(){
            return this.$store.getters['datatable/sortedColumn']
        }
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