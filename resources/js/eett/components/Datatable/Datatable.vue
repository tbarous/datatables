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
            <table v-scroll class="elevation-3 table table-bordered bg-white mb-0" id="resultsTable" data-tableName="Test Table 2">
                <thead>
                    <headers></headers>
                    <column-search></column-search>

                    

                <tbody>
                    <no-data></no-data>

                    <tr 
                        v-for="(data, key1) in tableData" 
                        :key="data.id" 
                        class="m-datatable__row" 
                        v-else
                    >
                        <td width="5%">{{serialNumber(key1)}}</td>
                        <td width="5%">
                            <v-checkbox 
                                v-model="selectBoxes[data.id]" 
                                color="black" 
                                @change="select(data)"
                            >
                            </v-checkbox>
                        </td>
                        <td 
                            v-if="activeColumns[key]" 
                            v-for="(value, key) in data"
                        >
                            {{value}}
                        </td>
                        <td width="10%" style="white-space: nowrap">
                            <v-btn 
                                flat 
                                @click="setEditDialog(key1, data)" 
                                fab 
                                dark 
                                small 
                                color="info"
                            >
                                <v-icon dark>
                                    edit
                                </v-icon>
                            </v-btn>

                            <v-btn
                                @click="destroy(editingRow, data)"
                                flat 
                                fab 
                                dark 
                                small 
                                color="red"
                            >
                                <v-icon dark>delete</v-icon>
                            </v-btn>
                        </td>
                    </tr>
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

export default {
    data() {
        return {
            tableData: [],
            selectAll: false,
            sortedColumn: this.columns[3].title,
            // order: 'desc',
            // itemsShow: [15, 50, 100],
            generalSearch: '',
            queries: {},
            editingIndex: 0,
            editingRow: {},
            viewColumns: false,
            activeColumns: {},
            selected: [],
            selectBoxes: {},
            editMultipleDialog: false,
            editingMultipleRow: {},
            dialog: {
                editMultiple: false,
                edit: false,
                viewColumns: false
            },
            errors: {
                update: ''
            }
        }
    },

    mounted(){
        $('.double-scroll').doubleScroll()
        $('input[name="datefilter"]').daterangepicker(this.options)
        this.$store.dispatch('daterangepicker/setPicker')
    },

    created() {
        this.$store.dispatch('datatable/setActiveColumnsAndQueries')
        return this.fetchData()
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
        }
    },

    methods: {
        setEditDialog(key1, data){
             this.openDialog('edit'); 
             this.editingIndex = key1; 
             Object.assign(this.editingRow, data);
        },
        
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