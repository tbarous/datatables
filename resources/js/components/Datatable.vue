<template>
    <div>
        <div class="d-inline mb-5">
            <span class="d-inline-block mr-3">Show</span>
            <v-select class="d-inline-block mr-3" 
                style="width: 100px;" 
                :items="itemsShow" 
                label="Show" 
                solo 
                v-model="perPage" 
                @change="loading=true;fetchData(true)">
            </v-select>
            <span class="d-inline-block mr-3">entries</span>
        </div>

        <div class="float-right mb-3">
            
        </div>

        <div class="mt-3">
            <i v-if="perPage < pagination.meta.total">{{perPage}} of {{pagination.meta.total}} entries</i>
            <i v-if="perPage >= pagination.meta.total">{{pagination.meta.total}} of {{pagination.meta.total}} entries</i>
            <br><br>
            <u>Selected: {{selected.length}}</u>
        </div>

        <div class="button-line">
            <v-btn 
                class="ml-0 mr-0 mt-3" 
                color="secondary" 
                dark 
                @click="reload">
                Reload 
                <v-icon small class="ml-3">fas fa-sync</v-icon>
            </v-btn>

            <v-btn 
                class="ml-0 mr-0 mt-3" 
                color="secondary" 
                dark 
                @click="viewColumns=true">
                Columns 
                <v-icon small class="ml-3">fas fa-bolt</v-icon>
            </v-btn>

            <v-btn 
                class="mr-0 ml-0 mt-3" 
                color="secondary" 
                dark 
                @click="updateMultiple">
                Update 
                <v-icon small class="ml-3">fas fa-edit</v-icon>
            </v-btn>

            <v-btn color="secondary" class="mr-0 ml-0 mt-3" @click="downloadWithAxios">
               Excel <v-icon small class="ml-3">far fa-file-excel</v-icon>
            </v-btn>

            <v-btn color="secondary" class="mr-0 ml-0 mt-3" @click="downloadWithAxios">
               PDF <v-icon small class="ml-3">far fa-file-pdf</v-icon>
            </v-btn>

            <v-text-field 
                @input="loading=true;fetchData(true)" 
                v-model="generalSearch" 
                style="width: 300px;" 
                solo 
                class="d-inline-block ml-3 float-right mb-2"
                prepend-inner-icon="search" 
                autocomplete="off" 
                clearable label="Search">
            </v-text-field>
        </div>

        <table-loader :loading="loading"></table-loader>
        <table class="table table-bordered mb-0">
            <thead>
                <tr class="bg-dark text-white">
                    <th class="table-head border-0"></th>
                    <th class="table-head border-0"></th>
                    <th 
                        v-if="activeColumns[column.title]" 
                        v-for="column in columns" 
                        :key="column.title" 
                        @click="sortByColumn(column)" 
                        style="cursor: pointer;" 
                        class="table-head text-center border-0">
                        {{ column.title | columnHead }}
                        <span v-if="column.title === sortedColumn">
                            <i v-if="order === 'asc'" class="fas fa-chevron-up"></i>
                            <i v-else class="fas fa-chevron-down"></i>
                        </span>
                    </th>
                    <th class="table-head text-center border-0"></th>
                </tr>
                <tr class="bg-dark text-white">
                    <th class="table-head border-0 pt-0 pb-0"></th>
                    <th class="table-head border-0"></th>
                    <th class="border-0 pt-0 pb-0" 
                        v-if="activeColumns[column.title]" 
                        v-for="column in columns" 
                        :key="column.title">
                        <v-text-field 
                            clearable 
                            @input="loading=true;fetchData(true)" 
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
                            @input="loading=true;fetchData(true)" />
                    </th>
                    <th class="border-0 pt-0 pb-0"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="tableData.length === 0 && !loading">
                    <td class="text-center p-3 text-white bg-danger" :colspan="columns.length + 3">
                        No data was found
                    </td>
                </tr>
                <tr 
                    v-for="(data, key1) in tableData" 
                    :key="data.id" 
                    class="m-datatable__row" 
                    v-else>
                    <td class="p-3">{{serialNumber(key1)}}</td>
                    <td>
                        <v-checkbox 
                            v-model="selectBoxes[data.id]" 
                            color="black" 
                            class="p-3" 
                            @change="select(data)">
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
                            color="info">
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
                            color="red">
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
                @changePage="changePage">
            </pagination-nav>
        </v-card>

        <notifications animation-name="fadeIn" group="foo" position="bottom right" />
        <loading 
            :active.sync="isLoading" 
            :is-full-page="fullPage">
        </loading>

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
                        color="black">
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
                            v-model="editingRow[column.title]" class="mt-3">
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
    </div>
</template>

<script>
import PaginationMixin from '../mixins/PaginationMixin'
import TableLoader from './TableLoader'
import PaginationNav from './PaginationNav'
import _ from 'lodash'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

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
            isLoading: false,
            fullPage: true,
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
        this.loading = true;
        this.columns.map(column => {
            this.activeColumns[column.title] = true;
            this.queries[column.title] = '';
        });

        return this.fetchData();
    },

    methods: {
        reload(){},

        fetchData: _.debounce(function(reset=false){
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
            this.isLoading = true;
            axios.post('api/users/update', {
                row: JSON.stringify(row)
            }).then(response => {
                this.tableData[index] = row;
                this.$notify({
                    group: 'foo',
                    title: 'Important message',
                    type: 'success',
                    text: 'Item has been updated'
                });
                this.isLoading = false;
            }).catch(error => {
                console.log(error);
            })
        },

        destroy(index, row){
            this.isLoading = true;
            axios.post('api/users/destroy', {
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

        updateMultiple() {},

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
        PaginationNav,
        Loading
    }
}
</script>
