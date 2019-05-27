<template>
    <div>
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

        <div class="items-count">
            <i :class="{nopacity:loading}">{{getItemsCount}}</i>
            <br><br>
            <u>Selected: {{selected.length}}</u>
            <hr>
        </div>
        
        <div class="table-tools">
            <v-btn 
                color="blue" 
                dark 
                @click="fetchData(true)"
            >
                Reload 
                <v-icon small>fas fa-sync</v-icon>
            </v-btn>

            <v-btn 
                color="secondary" 
                dark 
                @click="openDialog('viewColumns')"
            >
                Columns 
                <v-icon small>fas fa-columns</v-icon>
            </v-btn>

            <v-btn 
                :disabled="selected.length<2"
                color="secondary" 
                dark 
                @click="openDialog('editMultiple')"
            >
                Update 
                <v-icon small>fas fa-edit</v-icon>
            </v-btn>

            <v-btn 
                color="green" 
                dark
                @click="downloadWithAxios"
            >
                Excel 
                <v-icon small>far fa-file-excel</v-icon>
            </v-btn>

            <v-btn 
                color="red" 
                dark
                @click="downloadWithAxios"
            >
                PDF 
                <v-icon small>far fa-file-pdf</v-icon>
            </v-btn>

            <v-btn
                id="export-btn" 
                data-clipboard-target="#resultsTable"
            >
                Export
                <v-icon small>fas fa-file-export</v-icon>
            </v-btn>

            <v-text-field 
                @input="fetchData(true)" 
                v-model="generalSearch"
                solo 
                prepend-inner-icon="search" 
                autocomplete="off" 
                clearable 
                label="Search"
            >
            </v-text-field>
        </div>

        <table-loader :loading="loading"></table-loader>
        <table class="table table-bordered bg-white mb-0" id="resultsTable" data-tableName="Test Table 2">
            <thead>
                <tr class="bg-dark text-white">
                    <th width="5%"></th>
                    <th width="5%"></th>
                    <th 
                        v-if="activeColumns[column.title]" 
                        v-for="column in columns" 
                        :key="column.title" 
                        @click="sortByColumn(column)" 
                        style="cursor: pointer;" 
                        class="text-center border-0">
                        {{ column.title | columnHead }}
                        <span v-if="column.title === sortedColumn">
                            <i v-if="order === 'asc'" class="fas fa-chevron-up"></i>
                            <i v-else class="fas fa-chevron-down"></i>
                        </span>
                    </th>
                    <th width="10%"></th>
                </tr>

                <tr class="bg-dark text-white">
                    <th width="5%"></th>
                    <th width="5%"></th>
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
                        <date-range-picker 
                            v-if="column.type=='date'" 
                            v-model="queries[column.title]" 
                            class="date-range-picker elevation-2" 
                            :options="options" 
                            @input="fetchData(true)" 
                        />
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
                    <td width="5%" class="">{{serialNumber(key1)}}</td>
                    <td width="5%">
                        <v-checkbox 
                            v-model="selectBoxes[data.id]" 
                            color="black" 
                            class="p-3" 
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
                            @click="editDialog=true; editingIndex=key1; Object.assign(editingRow, data);" 
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
        <table-loader :loading="loading"></table-loader>

        <v-card class="p-3">
            <pagination-nav 
                :pagination="pagination"
                :tableData="tableData" 
                :currentPage="currentPage" 
                :pagesNumber="pagesNumber" 
                @changePage="changePage"
            >
            </pagination-nav>
        </v-card>

        <v-dialog v-model="dialog.viewColumns" width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Columns
                </v-card-title>
                <v-card-text class="d-flex">
                    <v-checkbox 
                        class="d-inline-block ml-3" 
                        v-for="(column,key) in columns" 
                        :key="column.title" 
                        v-model="activeColumns[column.title]" 
                        :label="column.title | columnLow" 
                        color="black"
                    >
                    </v-checkbox>
                    <v-icon @click="closeDialog('viewColumns')">fa fa-close</v-icon>
                </v-card-text>

                <v-btn 
                    @click="closeDialog('viewColumns')" 
                    class="close-window" 
                    flat 
                    icon>
                    <v-icon small>fa fa-times</v-icon>
                </v-btn>
            </v-card>
        </v-dialog>

        <v-dialog v-model="editDialog" persistent width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
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
                    
                    <v-btn @click="editDialog = false;" class="close-window" flat icon>
                        <v-icon small>fa fa-times</v-icon>
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog.editMultiple" persistent width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Edit Multiple fields
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
                            v-model="editingMultipleRow[column.title]" class="mt-3">
                        </v-text-field>
                        <br>
                        <v-btn class="ml-0 w-100" color="primary" type="submit">edit</v-btn>
                    </v-form>
                    
                    <v-btn 
                        @click="closeDialog('editMultiple')" 
                        class="close-window" 
                        flat 
                        icon>
                        <v-icon small>fa fa-times</v-icon>
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import PaginationMixin from '../mixins/PaginationMixin'
import FileMixin from '../mixins/FileMixin'
import TableLoader from './TableLoader'
import PaginationNav from './PaginationNav'
import _ from 'lodash'

export default {
    props: {
        fetchUrl: {
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
            url: '',
            sortedColumn: this.columns[3].title,
            order: 'desc',
            itemsShow: [15, 50, 100],
            loading: false,
            generalSearch: '',
            queries: {},
            editDialog: false,
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
                viewColumns: false
            },

            options: {
                timePicker: true,
                startDate: moment().startOf('hour'),
                endDate: moment().startOf('hour').add(32, 'hour'),
                locale: {
                    format: 'DD/MM/YY hh:mm'
                },
            }
        }
    },

    mounted(){
        var clipboard = new Clipboard('#export-btn');
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
                    this.$store.dispatch('loading/setLoading', false);
                })
        }, 500),

        serialNumber(key) {
            return (this.currentPage - 1) * this.perPage + 1 + key
        },

        changePage(pageNumber) {
            this.loading = true;
            this.currentPage = pageNumber
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
                console.log(error);
            })
        },

        destroy(index, row){
            this.$store.dispatch('loading/setLoading', true);
            axios.post(this.url + '/destroy', {
                id: row.id
            }).then(response => {
                this.fetchData(false, {type: 'success', text: '<i class="fa fa-check" aria-hidden="true"></i> &nbsp;Item has been deleted'})
            }).catch(error => {
                console.log(error);
            })
        },

        updateMultiple(row) {
            this.$store.dispatch('loading/setLoading', true)
            axios.post(this.url + '/update-many', {
                selected: JSON.stringify(this.selected),
                row: JSON.stringify(row)
            }).then(response => {
                this.fetchData(false, {title: 'Success', type: 'success', text: 'Items have been updated'})
            }).catch(error => {
                console.log(error);
            })
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

    watch: {
        fetchUrl: {
            handler: function(fetchUrl) {
                this.url = fetchUrl
            },
            immediate: true
        }
    },

    name: 'DataTable',
    mixins: [PaginationMixin, FileMixin],
    components: {
        TableLoader,
        PaginationNav
    }
}
</script>
