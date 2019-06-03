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
            <table id="table" class="mt-0 pt-0 table table-bordered elevation-3" data-tableName="Test Table 2" v-scroll>
                <thead>
                    <headers></headers>
                    <column-search></column-search>
                </thead>
                <tbody>
                    <no-data></no-data>
                    <table-body></table-body>
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
import Headers from './Headers'
import TableBody from './TableBody'

export default {
    computed: {
        options() {
            return this.$store.getters['daterangepicker/getOptions']
        }
    },

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
        NoData,
        Headers,
        TableBody
    }
}
</script>