<template>
    <div>
        <v-layout>
            <v-flex xs6 class="d-flex align-center">
                <div class="items-show">
                    <span>Show</span>
                    <v-select 
                        :items="itemsShow" 
                        label="Show" 
                        solo 
                        v-model="perPage" 
                        @change="fetchData(true)"
                    >
                    </v-select>
                    <span>entries</span>
                </div>
            </v-flex>

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
        </v-layout>
        
        <v-divider color="white"></v-divider>
        
        <v-layout class="table-tools">
            <v-flex xs1>
                <v-btn color="blue" dark @click="fetchData(true)">
                    Reload 
                    <v-icon small>fas fa-sync</v-icon>
                </v-btn>
            </v-flex>

            <v-flex xs1>
                <v-btn color="yellow" @click="clearFilters">
                    Clear 
                    <v-icon small>fas fa-eraser</v-icon>
                </v-btn>
            </v-flex>

            <v-flex xs1>
                <v-btn color="secondary" dark @click="openDialog('viewColumns')">
                    Columns 
                    <v-icon small>fas fa-columns</v-icon>
                </v-btn>
            </v-flex>

            <v-flex xs1>
                <v-btn 
                    :disabled="selected.length<2"
                    color="secondary" 
                    dark 
                    @click="openDialog('editMultiple')"
                >
                    Update 
                    <v-icon small>fas fa-edit</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>

        <v-layout>
            <v-flex xs3 offset-xs9>
                <v-text-field 
                    class="generalSearch"
                    @input="fetchData(true)" 
                    v-model="generalSearch"
                    solo 
                    prepend-inner-icon="search" 
                    autocomplete="off" 
                    clearable 
                    label="Search"
                >
                </v-text-field>
            </v-flex>
        </v-layout>

        <table-loader :loading="loading"></table-loader>
        <div class="wrapper double-scroll">
            <table v-scroll class="elevation-3 table table-bordered bg-white mb-0" id="resultsTable" data-tableName="Test Table 2">
                <thead>
                    <tr class="bg-dark text-white">
                        <th width="5%" class="pt-3"></th>
                        <th width="5%" class="pt-3"></th>
                        <th 
                            v-if="activeColumns[column.title]" 
                            v-for="column in columns" 
                            :key="column.title" 
                            @click="sortByColumn(column)"
                            class="table-header">
                            {{ column.title | columnHead }}
                            <span v-if="column.title === sortedColumn">
                                <i v-if="order === 'asc'" class="fas fa-chevron-up"></i>
                                <i v-else class="fas fa-chevron-down"></i>
                            </span>
                        </th>
                        <th width="10%" class="pt-3"></th>
                    </tr>

                    <tr class="bg-dark text-white">
                        <th width="5%"></th>
                        <th width="5%">
                            <v-checkbox class="toggleAll mt-0" color="white" @click.self="toggleAll" v-model="selectAll"></v-checkbox>
                        </th>
                        <th 
                            class="pt-0 pb-0" 
                            v-if="activeColumns[column.title]" 
                            v-for="column in columns" 
                            :key="column.title">
                            <v-text-field 
                                clearable 
                                style="min-width: 100px;"
                                @input="fetchData(true)" 
                                v-model="queries[column.title]" 
                                v-if="column.type=='text'" 
                                solo 
                                autocomplete="off" 
                                name="name" 
                                label="" 
                                prepend-inner-icon="search">
                            </v-text-field>
                           <!--  <date-range-picker 
                                :id="column.title"
                                v-if="column.type=='date'" 
                                v-model="queries[column.title]" 
                                class="date-range-picker elevation-2" 
                                :options="options" 
                                @input="fetchData(true)" 
                            /> -->

                            <input type="text" 
                                name="datefilter"
                                autocomplete="off" 
                                :id="column.title"
                                v-if="column.type=='date'" 
                                v-model="queries[column.title]" 
                                class="date-range-picker elevation-2"
                            >
                        </th>
                        <th width="10%"></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-if="dataExists">
                        <td 
                            class="no-data bg-info" 
                            :colspan="columns.length + 3"
                        >
                            No data was found
                        </td>
                    </tr>

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
                            v-for="(value, key) in data">
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
        <table-loader :loading="loading"></table-loader>

        <pagination 
            class="pagination"
            v-if="tableData.length"
            :pagination="pagination"
            :tableData="tableData" 
            :currentPage="currentPage" 
            :pagesNumber="pagesNumber" 
            @changePage="changePage"
        >
        </pagination>

        <v-dialog v-model="dialog.viewColumns" width="500">
            <v-card>
                <v-card-title 
                    class="headline grey lighten-2" 
                    primary-title
                >
                    Columns
                </v-card-title>
                <v-card-text class="d-flex" style="flex-flow: wrap;">
                    <v-checkbox 
                        class="d-inline-block ml-3" 
                        v-for="(column,key) in columns" 
                        :key="column.title" 
                        v-model="activeColumns[column.title]" 
                        :label="column.title | columnLow" 
                        color="black"
                    >
                    </v-checkbox>
                    <v-btn dark class="w-100 ml-0 mr-0" @click="closeDialog('viewColumns')">Ok</v-btn>
                </v-card-text>
                
                <v-btn 
                    @click="closeDialog('viewColumns')" 
                    class="close-window" 
                    flat 
                    icon
                >
                    <v-icon small>fa fa-times</v-icon>
                </v-btn>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog.edit" persistent width="500">
            <v-card>
                <v-card-title 
                    class="headline grey lighten-2" 
                    primary-title
                >
                    Edit
                </v-card-title>
                <v-card-text>
                    <v-form 
                        method="post" 
                        @submit.prevent="update(editingIndex, editingRow)">
                        <v-text-field 
                            :label="column.title" 
                            solo 
                            v-for="(column, key) in columns" 
                            :key="column.title" 
                            v-if="column.type == 'text'" 
                            type="text" 
                            v-model="editingRow[column.title]" class="mt-3"
                        >
                        </v-text-field>
                        <br>
                        <v-btn class="ml-0 w-100" color="primary" type="submit">edit</v-btn>
                    </v-form>
                    
                    <v-btn 
                        class="close-window" 
                        @click="closeDialog('edit')" 
                        flat 
                        icon
                    >
                        <v-icon small>fa fa-times</v-icon>
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog 
            v-model="dialog.editMultiple" 
            persistent 
            width="500"
        >
            <v-card>
                <v-card-title 
                    class="headline grey lighten-2" 
                    primary-title
                >
                    Edit fields
                </v-card-title>
                <v-card-text>
                    <v-form 
                        method="post" 
                        @submit.prevent="updateMultiple(editingMultipleRow)">
                        <v-text-field 
                            :label="column.title" 
                            solo 
                            v-for="(column, key) in columns" 
                            :key="column.title" 
                            v-if="column.type == 'text'" 
                            type="text" 
                            v-model="editingMultipleRow[column.title]" 
                            class="mt-3">
                        </v-text-field>
                        <br>
                        <v-btn 
                            class="ml-0 w-100" 
                            color="primary" 
                            type="submit"
                        >
                            edit
                        </v-btn>
                    </v-form>
                    
                    <v-btn 
                        @click="closeDialog('editMultiple')" 
                        class="close-window" 
                        flat 
                        icon
                    >
                        <v-icon small>fa fa-times</v-icon>
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import PaginationMixin from './../../mixins/Table/PaginationMixin'
// import FileMixin from '../mixins/FileMixin'
import TableLoader from './TableLoader'
import Pagination from './Pagination'
import _ from 'lodash'

export default {
    props: {
        url: {
            type: String,
            required: true
        },
        columns: {
            type: Array,
            required: true
        },
    },

    data() {
        return {
            tableData: [],
            // url: '',
            selectAll: false,
            sortedColumn: this.columns[3].title,
            order: 'desc',
            itemsShow: [15, 50, 100],
            loading: false,
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
            options: {
                timePicker: true,
                startDate: moment().startOf('hour'),
                endDate: moment().startOf('hour').add(32, 'hour'),
                locale: {
                    // format: 'DD/MM/YY hh:mm'
                },
                autoUpdateInput: false
            }
        }
    },

    mounted(){
        var clipboard = new Clipboard('#export-btn');
        $('.double-scroll').doubleScroll();
        $('input[name="datefilter"]').daterangepicker({
            autoUpdateInput: false,
            locale: {
                cancelLabel: 'Clear'
            },
            timePicker: true
        });

        let dateInputs = this.columns.filter(item=>{
            return item.type == 'date'    
        })

        dateInputs.map(item=>{
            $('#' + item.title).on('apply.daterangepicker', (ev, picker) => {
                let value = picker.startDate.format('DD/MM/YYYY hh:mm') + ' - ' + picker.endDate.format('DD/MM/YYYY hh:mm')
                this.queries[item.title] = value
                $('#' + item.title).val(value)
                this.fetchData(true)
            });

            $('#' + item.title).on('cancel.daterangepicker', (ev, picker) => {
                this.queries[item.title] = ''
                $('#' + item.title).val('')
                this.fetchData(true)
            });
        })
        
    },

    created() {
        this.loading = true
        this.setActiveColumnsAndQueries()
        return this.fetchData()
    },

    computed: {
        getItemsCount() {
            if(this.perPage < this.pagination.meta.total) {
                return `${this.perPage} of ${this.pagination.meta.total} entries`
            }

            return `${this.pagination.meta.total} of ${this.pagination.meta.total} entries`
        },

        dataExists(){
            if(this.tableData.length === 0 && !this.loading)
                return true

            return false
        }
    },

    methods: {
        openDialog(name){
            this.dialog[name] = true;
        },

        closeDialog(name){
            this.dialog[name] = false;
        },

        setActiveColumnsAndQueries(){
            this.columns.map(column => {
                this.activeColumns[column.title] = true;
                this.queries[column.title] = '';
            });
        },

        fetchData(reset = false, msg = null){
            this.loading = true
            this.fetch(reset, msg)
        },

        fetch: _.debounce(function(reset, msg){
            if (reset) this.currentPage = 1
            if (this.generalSearch == null) this.generalSearch = ''

            let dataFetchUrl = `${this.url}?page=${this.currentPage}&column=${this.sortedColumn}&order=${this.order}&per_page=${this.perPage}&search=${this.generalSearch}`

            Object.keys(this.queries).map(item => {
                let queryItem = this.queries[item];
                if (queryItem == null) queryItem = ''
                dataFetchUrl += '&' + item + '=' + queryItem;
            })

            this.loading = true;
            axios.get(dataFetchUrl)
                .then(({ data }) => {
                    this.pagination = data
                    this.tableData = data.data
                    if(msg) setTimeout(() => this.$notify(msg), 200)
                    this.loading = false
                    this.$store.dispatch('loading/setLoading', false);
                }).catch(error => {
                    this.tableData = []
                    this.handleFailure()
                })
        }, 500),

        serialNumber(key) {
            return (this.currentPage - 1) * this.perPage + 1 + key
        },

        changePage(pageNumber) {
            this.loading = true
            this.currentPage = pageNumber
            this.selectAll = false
            this.fetchData()
        },

        sortByColumn(column) {
            this.loading = true;
            if (column.title === this.sortedColumn) {
                this.order = (this.order === 'asc') ? 'desc' : 'asc'
            } else {
                this.sortedColumn = column.title
                this.order = 'asc'
            }
            this.fetchData()
        },

        select(item){
            if(!this.selected.includes(item.id)){
                this.selected.push(item.id)
                this.selectBoxes[item.id] = true
            } else {
                this.selected.splice(this.selected.indexOf(item.id), 1)
                this.selectBoxes[item.id] = false
            }
        },

        update(index, row) {
            this.$store.dispatch('loading/setLoading', true);
            axios.post(this.url + '/update', {
                row: JSON.stringify(row)
            }).then(response => {
                this.fetchData(false, {type: 'success', text: '<i class="fa fa-check" aria-hidden="true"></i> &nbsp;Item has been updated'})
            }).catch(error => {
                this.handleFailure
            })
        },

        setEditDialog(key1, data){
             this.openDialog('edit'); 
             this.editingIndex = key1; 
             Object.assign(this.editingRow, data);
        },

        destroy(index, row){
            this.$store.dispatch('loading/setLoading', true);
            axios.post(this.url + '/destroy', {
                id: row.id
            }).then(response => {
                this.fetchData(false, {type: 'success', text: '<i class="fa fa-check" aria-hidden="true"></i> &nbsp;Item has been deleted'})
            }).catch(error => {
                this.handleFailure
            })
        },

        updateMultiple(row) {
            this.$store.dispatch('loading/setLoading', true)
            axios.post(this.url + '/update-many', {
                selected: JSON.stringify(this.selected),
                row: JSON.stringify(row)
            }).then(response => {
                this.fetchData(false, {type: 'success', text: '<i class="fa fa-check" aria-hidden="true"></i> &nbsp;Items has been updated'})
            }).catch(error => {
                this.handleFailure
            })
        },

        toggleAll(){
            if(!this.selectAll){
                this.selectAll = true
                this.tableData.map(item=>{
                    this.selectBoxes[item.id] = true
                    if(this.selected.indexOf(item.id) == -1) this.selected.push(item.id)
                })
            } else {
                this.selectAll = false
                this.tableData.map(item=>{
                    this.selectBoxes[item.id] = false
                    if(this.selected.indexOf(item.id) != -1)
                        this.selected.splice(this.selected.indexOf(item.id), 1)
                })
            }
        },

        handleFailure(){
            this.loading = false
            this.$store.dispatch('loading/setLoading', false)
            this.fetchData(false, {type: 'danger', text: '<i class="fa fa-times" aria-hidden="true"></i> &nbsp;An error occured'})
        },

        clearFilters(){
            this.queries = {}
            this.generalSearch = ''
            this.columns.map(column => {
                this.queries[column.title] = '';
            });
            this.fetchData()
        }
    },

    filters: {
        columnHead(value) {
            return value.split('_').join(' ').toUpperCase()
        },
        columnLow(value) {
            return value.split('_').join(' ').toLowerCase()
        }
    },

    // watch: {
    //     fetchUrl: {
    //         handler: function(fetchUrl) {
    //             this.url = fetchUrl
    //         },
    //         immediate: true
    //     }
    // },

    name: 'DataTable',
    mixins: [PaginationMixin],
    components: {
        TableLoader,
        Pagination
    }
}
</script>