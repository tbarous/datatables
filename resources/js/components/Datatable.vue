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
                color="secondary" 
                dark 
                @click="reload"
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
                <v-icon small>fas fa-bolt</v-icon>
            </v-btn>

            <v-btn 
                :disabled="!selected.length"
                color="secondary" 
                dark 
                @click="openDialog('editMultiple')"
            >
                Update 
                <v-icon small>fas fa-edit</v-icon>
            </v-btn>

            <v-btn 
                color="secondary" 
                dark
                @click="downloadWithAxios"
            >
                Excel 
                <v-icon small>far fa-file-excel</v-icon>
            </v-btn>

            <v-btn 
                color="secondary" 
                dark
                @click="downloadWithAxios"
            >
                PDF 
                <v-icon small>far fa-file-pdf</v-icon>
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
        <table class="table table-bordered">
            <thead>
                <tr class="bg-dark text-white">
                    <th></th>
                    <th></th>
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
                    <th></th>
                </tr>

                <tr class="bg-dark text-white">
                    <th></th>
                    <th></th>
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
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <tr v-if="dataExists">
                    <td 
                        class="text-center p-3 text-white bg-danger" 
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
                    <td class="p-3">{{serialNumber(key1)}}</td>
                    <td>
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
                    <td style="white-space: nowrap">
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

        <v-dialog v-model="viewColumns" width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Columns
                </v-card-title>
                <v-card-text>
                    <v-checkbox 
                        class="d-inline-block ml-3" 
                        v-for="(column,key) in columns" 
                        :key="column.title" 
                        v-model="activeColumns[column.title]" 
                        :label="column.title | columnLow" 
                        color="black"
                    >
                    </v-checkbox>
                    <v-icon @click="viewColumns=false;">fa fa-close</v-icon>
                </v-card-text>
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

        <v-dialog v-model="dialog['editMultiple']" persistent width="500">
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
            sortedColumn: this.columns[0].title,
            order: 'asc',
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
                editMultiple: false
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

        reload(){},

        fetchData(reset=false){
            this.loading = true
            this.fetch(reset)
        },

        fetch: _.debounce(function(reset){
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
                    this.loading = false
                }).catch(error => {
                    this.tableData = []
                    this.loading = false
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

        update(index, row) {
            this.$store.dispatch('loading/setLoading', true);
            axios.post(this.url + '/update', {
                row: JSON.stringify(row)
            }).then(response => {
                this.tableData[index] = row;
                this.$notify({
                    group: 'foo',
                    title: 'Important message',
                    type: 'success',
                    text: 'Item has been updated'
                });
                this.$store.dispatch('loading/setLoading', false);
            }).catch(error => {
                console.log(error);
            })
        },

        destroy(index, row){
            this.isLoading = true;
            axios.post(this.url + '/destroy', {
                id: row.id
            }).then(response => {
                this.tableData.splice(index, 1);
                this.$notify({
                    group: 'foo',
                    title: 'Important message',
                    type: 'success',
                    text: 'Item has been deleted'
                });
                this.isLoading = false;
            }).catch(error => {
                console.log(error);
            })
        },

        select(item){
            console.log(this.selected)
            if(!this.selected.includes(item.id)){
                this.selected.push(item.id)
                this.selectBoxes[item.id] = true
            } else {
                this.selected.splice(this.selected.indexOf(item.id), 1)
                this.selectBoxes[item.id] = false
            }
        },

        mergeById(arr) {
          return {
            with: function(arr2) {
              return _.map(arr, item => {
                return _.find(arr2, obj => obj.id === item.id) || item
              })
            }
          }
        },

        updateMultiple(row) {
            this.$store.dispatch('loading/setLoading', true);
            console.log(row)
            axios.post(this.url + '/update-many', {
                selected: JSON.stringify(this.selected),
                row: JSON.stringify(row)
            }).then(response => {
                console.log(response.data)
                this.tableData = this.mergeById(this.tableData).with(response.data.data)
                this.editingMultipleRow = {}

                this.$notify({
                    group: 'foo',
                    title: 'Important message',
                    type: 'success',
                    text: 'Item has been updated'
                });
                this.$store.dispatch('loading/setLoading', false);
            }).catch(error => {
                console.log(error);
            })
        },

        forceFileDownload(response){
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'file2.png') //or any other extension
          document.body.appendChild(link)
          link.click()
        },

        downloadWithAxios(){
          axios({
            method: 'get',
            url: 'http://project.local/images/screenshot.png',
            responseType: 'arraybuffer'
          })
          .then(response => {
            this.forceFileDownload(response)
          })
          .catch(() => console.log('error occured'))
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
    mixins: [PaginationMixin],
    components: {
        TableLoader,
        PaginationNav
    }
}
</script>
