<template>
    <div>
        <div>
            <div class="d-inline mb-5">
                <span class="d-inline-block mr-3">Show</span>
                <v-select class="d-inline-block mr-3" style="width: 100px;" :items="itemsShow" label="Show" solo v-model="perPage" @change="fetchData(true)">
                </v-select>
                <span class="d-inline-block mr-3">entries</span>
            </div>

            <div class="float-right mb-3">
                <v-text-field @input="fetchData(true)" v-model="generalSearch" style="width: 300px;" solo prepend-inner-icon="search" autocomplete="off" clearable label="Search">
                </v-text-field>
            </div>
            
            <div class="viewColumns">
                <v-btn class="ml-0 mb-0 mt-5" color="secondary" dark @click="viewColumns=true">
                    Active Columns <v-icon class="ml-3">fas fa-bolt</v-icon>
                </v-btn>
                <v-btn class="ml-0 mb-0 mt-5" color="secondary" dark @click="updateMultiple">
                    Edit all
                </v-btn>
                <br><br>
                <span>
                    <i>Total: {{ pagination.meta.total }} entries.</i>
                </span>
            </div>

            <v-btn class="ml-0 mt-3" @click="downloadWithAxios">
               Excel <v-icon class="ml-3">far fa-file-excel</v-icon>
            </v-btn>

            <v-btn class="ml-0 mt-3" @click="downloadWithAxios">
               PDF <v-icon class="ml-3">far fa-file-pdf</v-icon>
            </v-btn>

            <table-loader :loading="loading"></table-loader>
            <table class="table table-bordered mb-0">
                <thead>
                    <tr class="bg-dark text-white">
                        <th class="table-head border-0"></th>
                        <th class="table-head border-0">Select</th>
                        <th v-if="activeColumns[column.title]" v-for="column in columns" :key="column.title" @click="sortByColumn(column)" style="cursor: pointer;" class="table-head text-center border-0">
                            {{ column.title | columnHead }}
                            <span v-if="column.title === sortedColumn">
                                <i v-if="order === 'asc'" class="fas fa-chevron-up"></i>
                                <i v-else class="fas fa-chevron-down"></i>
                            </span>
                        </th>
                        <th class="table-head text-center border-0">ACTIONS</th>
                    </tr>
                    <tr class="bg-dark text-white">
                        <th class="table-head border-0 pt-0 pb-0"></th>
                        <th class="table-head border-0"></th>
                        <th class="border-0 pt-0 pb-0" v-if="activeColumns[column.title]" v-for="column in columns" :key="column.title">
                            <v-text-field clearable @input="fetchData(true)" v-model="queries[column.title]" v-if="column.type=='text'" solo autocomplete="off" name="name" label="" prepend-inner-icon="search">
                            </v-text-field>
                            <date-range-picker v-if="column.type=='date'" v-model="queries[column.title]" class="date-range-picker elevation-2" :options="options" @input="fetchData(true)" />
                        </th>
                        <th class="border-0 pt-0 pb-0"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="tableData.length === 0 && !loading">
                        <td class="text-center p-3 text-white bg-danger" :colspan="columns.length + 3">
                            No was data found
                        </td>
                    </tr>
                    <tr v-for="(data, key1) in tableData" :key="data.id" class="m-datatable__row" v-else>
                        <td>{{serialNumber(key1)}}</td>
                        <td>
                            <v-checkbox v-model="selected[data.id]"></v-checkbox>
                        </td>
                        <td v-if="activeColumns[key]" v-for="(value, key) in data">
                            {{value}}
                        </td>
                        <td style="white-space: nowrap">
                            <v-btn flat @click="editDialog=true; editingIndex=key1; editingRow=data" fab dark small color="info">
                                <v-icon dark>
                                    edit
                                </v-icon>
                            </v-btn>
                            <v-btn flat fab dark small color="red">
                                <v-icon dark>delete</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <table-loader :loading="loading"></table-loader>
        <pagination-nav :pagination="pagination" :tableData="tableData" :currentPage="currentPage" :pagesNumber="pagesNumber" @changePage="changePage">
        </pagination-nav>
        <v-dialog v-model="viewColumns" width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Active Columns
                </v-card-title>
                <v-card-text>
                    <v-checkbox class="d-inline-block ml-3" v-for="(column,key) in columns" :key="column.title" v-model="activeColumns[column.title]" :label="column.title | columnLow" color="black">
                    </v-checkbox>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat @click="viewColumns = false">
                        Done
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="editDialog" width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Edit
                </v-card-title>
                <v-card-text>
                    <v-form method="post" @submit.prevent="update(editingIndex, editingRow)">
                        <v-text-field :label="column.title" solo v-for="(column, key) in columns" :key="column.title" v-if="column.type == 'text'" type="text" v-model="editingRow[column.title]">
                        </v-text-field>
                        <br><br>
                        <v-btn color="primary" type="submit">edit</v-btn>
                    </v-form>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat @click="editDialog = false">
                        I accept
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import PaginationMixin from '../mixins/PaginationMixin'
import TableLoader from './TableLoader'
import PaginationNav from './PaginationNav'

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
            selected: {},
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

    watch: {
        fetchUrl: {
            handler: function(fetchUrl) {
                this.url = fetchUrl
            },
            immediate: true
        }
    },

    created() {
        this.columns.map(column => {
            this.activeColumns[column.title] = true;
            this.queries[column.title] = '';
        });

        return this.fetchData();
    },

    methods: {
        fetchData(reset = false) {
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
                    this.tableData.map(item => {
                        if(!this.selected.hasOwnProperty(item.id)){
                            this.selected[item.id] = false
                        }
                    });
                    this.loading = false
                }).catch(error => {
                    this.tableData = []
                    this.loading = false
                })
        },

        serialNumber(key) {
            return (this.currentPage - 1) * this.perPage + 1 + key
        },

        changePage(pageNumber) {
            this.currentPage = pageNumber
            this.fetchData()
        },

        sortByColumn(column) {
            if (column.title === this.sortedColumn) {
                this.order = (this.order === 'asc') ? 'desc' : 'asc'
            } else {
                this.sortedColumn = column.title
                this.order = 'asc'
            }
            this.fetchData()
        },

        update(index, row) {
            axios.post('api/users/update', {
                row: JSON.stringify(row)
            }).then(response => {
                this.tableData[index] = response.data;
            }).catch(error => {
                console.log(error);
            })
        },

        updateMultiple() {
            Object.keys(this.selected).map(item => {
                if (this.selected[item] == true) {
                    console.log(item)
                }
            })
        },

        forceFileDownload(response){
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'file.png') //or any other extension
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
    name: 'DataTable',
    mixins: [PaginationMixin],
    components: {
        TableLoader,
        PaginationNav
    }
}
</script>
