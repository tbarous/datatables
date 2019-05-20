<template>
    <div>
        <div>
            <div class="mb-5 d-inline">
                <span class="d-inline-block mr-3">Show</span>
                <v-select 
                    class="d-inline-block mr-3" 
                    style="width: 100px;" 
                    :items="itemsShow" 
                    label="Show" 
                    solo 
                    v-model="perPage" 
                    @change="fetchData">
                </v-select>
                <span class="d-inline-block mr-3">entries</span>
            </div>

            <div class="general-search float-right mb-3">
                <v-text-field 
                    @input="reset(); fetchData()" 
                    v-model="generalSearch" 
                    style="width: 300px;" 
                    solo 
                    name="name" 
                    prepend-inner-icon="search" 
                    autocomplete="off" 
                    label="Search" 
                    id="id">    
                </v-text-field>
            </div>

            <div class="viewColumns">
                <v-btn 
                    class="ml-0 mb-0 mt-5" 
                    color="secondary" 
                    dark 
                    @click="viewColumns=true">
                    Active Columns
                </v-btn>

                <br><br>

                <span> 
                    <i>Total: {{ pagination.meta.total }} entries.</i>
                </span>
            </div>

            <div 
                class="loader" 
                :class="{nopacity: !loading}">
                <v-progress-linear 
                    class="mb-0" 
                    :indeterminate="true">
                </v-progress-linear>
            </div>

            <table class="table table-bordered">
                <thead>
                    <tr class="bg-dark text-white">
                        <th class="table-head border-0">#</th>
                        <th 
                            v-if="activeColumns[column.title]" 
                            v-for="column in columns" 
                            :key="column.title" 
                            @click="sortByColumn(column)"  
                            style="cursor: pointer;"
                            class="table-head text-center border-0">
                            {{ column.title | columnHead }}
                            <span v-if="column.title === sortedColumn">
                                <i v-if="order === 'asc'" class="fas fa-arrow-up"></i>
                                <i v-else class="fas fa-arrow-down"></i>
                            </span>
                        </th>
                        <th class="table-head text-center border-0">ACTIONS</th>
                    </tr>

                    <tr class="bg-dark text-white">
                        <th class="table-head border-0 pt-0 pb-0"></th>
                        <th 
                            class="border-0 pt-0 pb-0"
                            v-if="activeColumns[column.title]" 
                            v-for="column in columns" 
                            :key="column.title">
                            <v-text-field 
                                @input="reset(); fetchData();" 
                                v-model="queries[column.title]"
                                v-if="column.type=='text'"
                                solo 
                                autocomplete="off" 
                                name="name" 
                                label="" 
                                id="id" 
                                prepend-inner-icon="search">
                            </v-text-field>

                            <date-range-picker 
                                v-if="column.type=='date'"
                                v-model="queries[column.title]"
                                @update="fetchData"
                                :locale-data="locale"
                                :opens="opens">
                            </date-range-picker>
                        </th>
                        <th class="border-0 pt-0 pb-0"></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-if="tableData.length === 0">
                        <td 
                            class="lead text-center p-5" 
                            :colspan="columns.length + 1">
                            No was data found
                        </td>
                    </tr>

                    <tr 
                        v-for="(data, key1) in tableData" 
                        :key="data.id" 
                        class="m-datatable__row" 
                        v-else>
                        <td>{{ serialNumber(key1) }}</td>
                        <td 
                            v-if="activeColumns[key]" 
                            v-for="(value, key) in data">
                            {{ value }}
                        </td>
                        <td 
                            style="white-space: nowrap">
                            <v-btn 
                                flat 
                                @click="editDialog=true; editingIndex=key1; editingRow=data" 
                                fab 
                                dark 
                                small 
                                color="info">
                                <v-icon dark>
                                    edit
                                </v-icon>
                            </v-btn>
                            <v-btn 
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
        </div>

        <nav 
            v-if="pagination && tableData.length > 0" 
            class="text-center ml-auto mr-auto d-flex align-center justify-content-center mt-3">
            <ul class="pagination justify-content-center m-0">
                <li 
                    class="" 
                    :class="{'disabled' : currentPage === 1}">
                    <v-btn 
                        :disabled="currentPage === 1"
                        dark
                        fab 
                        small
                        class="page-link d-flex" 
                        href="#" 
                        @click.prevent="changePage(currentPage - 1)">
                        <v-icon>chevron_left</v-icon>
                    </v-btn>
                </li>

                <li 
                    v-for="page in pagesNumber" 
                    class="page-item" 
                    :class="{'active': page == pagination.meta.current_page}">
                    <v-btn fab small
                        href="javascript:void(0)" 
                        @click.prevent="changePage(page)" 
                        class="page-link d-flex">
                        {{ page }}
                    </v-btn>
                </li>

                <li 
                    class="" 
                    :class="{'disabled': currentPage === pagination.meta.last_page }">
                    <v-btn
                        :disabled="currentPage === pagination.meta.last_page"
                        dark
                        fab
                        small
                        class="page-link d-flex" 
                        href="#" 
                        @click.prevent="changePage(currentPage + 1)">
                        <v-icon>chevron_right</v-icon>
                    </v-btn>
                </li>
            </ul>
        </nav>

        <v-dialog 
            v-model="viewColumns" 
            width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Active Columns
                </v-card-title>
                <v-card-text>
                    <v-checkbox 
                        v-for="(column,key) in columns" 
                        :key="column.title" 
                        v-model="activeColumns[column.title]" 
                        :label="column.title | columnLow" 
                        color="black">
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

        <v-dialog 
            v-model="editDialog" 
            width="500">
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
                            v-model="editingRow[column.title]">
                        </v-text-field>
                        <br><br>
                        <v-btn color="primary" type="submit">edit</v-btn>
                    </v-form>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                        color="primary" 
                        flat 
                        @click="editDialog = false">
                        I accept
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import moment from 'moment'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/lib/vue-daterange-picker.min.css'

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
            dateRange: { // used for v-model prop
                startDate: '2017-09-05',
                endDate: '2017-09-15',
            },
            opens: "center",//which way the picker opens, default "center", can be "left"/"right"
            locale: {
                direction: 'ltr', //direction of text
                format: 'DD/MM/YYYY', //fomart of the dates displayed
                separator: ' - ', //separator between the two ranges
                applyLabel: 'Apply',
                cancelLabel: 'Cancel',
                weekLabel: 'W',
                customRangeLabel: 'Custom Range',
                daysOfWeek: moment.weekdaysMin(), //array of days - see moment documenations for details
                monthNames: moment.monthsShort(), //array of month names - see moment documenations for details
                firstDay: 1, //ISO first day of week - see moment documenations for details
                showWeekNumbers: true //show week numbers on each row of the calendar
            },
            ranges: { //default value for ranges object (if you set this to false ranges will no be rendered)
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'This month': [moment().startOf('month'), moment().endOf('month')],
                'This year': [moment().startOf('year'), moment().endOf('year')],
                'Last week': [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')],
                'Last month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            },

            tableData: [],
            url: '',
            pagination: {
                meta: { to: 1, from: 1 }
            },
            offset: 4,
            currentPage: 1,
            perPage: 15,
            sortedColumn: this.columns[0].title,
            order: 'asc',
            itemsShow: [5, 10, 15, 50, 100, 500],
            loading: false,
            generalSearch: '',
            queries: {},
            editDialog: false,
            editingIndex: 0,
            editingRow: {},
            viewColumns: false,
            activeColumns: {},
            oldCurrentPage: 1
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
            if(column.type == 'date'){
                this.queries[column.title] = { // used for v-model prop
                    startDate: '2017-09-05',
                    endDate: '2017-09-15',
                }
            }
        });

        return this.fetchData();
    },

    computed: {
        pagesNumber() {
            if (!this.pagination.meta.to) {
                return []
            }
            let from = this.pagination.meta.current_page - this.offset
            if (from < 1) {
                from = 1
            }
            let to = from + (this.offset * 2)
            if (to >= this.pagination.meta.last_page) {
                to = this.pagination.meta.last_page
            }
            let pagesArray = []
            for (let page = from; page <= to; page++) {
                pagesArray.push(page)
            }
            return pagesArray
        },

        totalData() {
            return (this.pagination.meta.to - this.pagination.meta.from) + 1
        }
    },

    methods: {
        fetchData() {
            this.loading = true;

            let queries = JSON.stringify(this.queries);

            let dataFetchUrl = `${this.url}?page=${this.currentPage}&column=${this.sortedColumn}&order=${this.order}&per_page=${this.perPage}&search=${this.generalSearch}&queries=${queries}`
            axios.get(dataFetchUrl)
                .then(({ data }) => {
                    this.pagination = data
                    this.tableData = data.data
                    this.loading = false;
                }).catch(error => this.tableData = [])
        },

        serialNumber(key) {
            return (this.currentPage - 1) * this.perPage + 1 + key
        },

        changePage(pageNumber) {
            this.oldCurrentPage = pageNumber
            this.currentPage = pageNumber
            this.fetchData()
        },

        reset(){
            if(this.oldCurrentPage != 1){
                let empty = true;

                this.columns.map(item => {
                    if(this.queries[item.title] != '' && item.type=='text'){
                        empty = false;
                    }
                });

                if(this.generalSearch != '' || !empty){
                    this.currentPage = 1
                } else {
                    this.currentPage = this.oldCurrentPage
                }
            }
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
                //
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
    name: 'DataTable',
    components: {
        DateRangePicker
    }
}
</script>
