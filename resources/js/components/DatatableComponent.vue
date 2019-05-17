<template>
    <div class="data-table">
        <div class="main-table">

            <div class="entries mb-5">
              <span class="d-inline-block mr-3">Show</span> 
              <v-select class="d-inline-block mr-3" style="width: 100px;" :items="itemsShow" label="Show" solo v-model="perPage" @change="fetchData"></v-select>
              <span class="d-inline-block mr-3">entries</span>
            </div>

            <div class="general-search float-right mb-3">
              <v-text-field @input="fetchData" v-model="generalSearch" style="width: 300px;" solo name="name" label="Search" id="id"></v-text-field>
            </div>
            
            <div class="loader" style="height: 20px;">
              <v-progress-linear class="mb-0" v-show="loading" :indeterminate="true"></v-progress-linear>
            </div>

            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th class="table-head">#</th>
                        <th v-for="column in columns" :key="column.title" @click="sortByColumn(column.title)" class="table-head text-center" style="cursor: pointer;">
                            {{ column.title | columnHead }}
                            <span v-if="column.title === sortedColumn">
                                <i v-if="order === 'asc' " class="fas fa-arrow-up"></i>
                                <i v-else class="fas fa-arrow-down"></i>
                            </span>
                        </th>
                    </tr>

                    <tr>
                        <th class="table-head">#</th>
                        <th v-for="column in columns" :key="column.title">
                            <v-text-field @input="fetchData" v-model="queries[column.title]" solo name="name" :label="column.title | columnLow" id="id"></v-text-field>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr class="" v-if="tableData.length === 0">
                        <td class="lead text-center" :colspan="columns.length + 1">No data found.</td>
                    </tr>
                    <tr v-for="(data, key1) in tableData" :key="data.id" class="m-datatable__row" v-else>
                        <td>{{ serialNumber(key1) }}</td>
                        <td v-for="(value, key) in data">{{ value }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <nav v-if="pagination && tableData.length > 0" class="text-center ml-auto mr-auto d-flex align-center justify-content-center mt-5">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{'disabled' : currentPage === 1}">
                    <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
                </li>
                <li v-for="page in pagesNumber" class="page-item" :class="{'active': page == pagination.meta.current_page}">
                    <a href="javascript:void(0)" @click.prevent="changePage(page)" class="page-link">{{ page }}</a>
                </li>
                <li class="page-item" :class="{'disabled': currentPage === pagination.meta.last_page }">
                    <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
                </li>
                <!-- <span style="margin-top: 8px;"> &nbsp; <i>Displaying {{ pagination.data.length }} of {{ pagination.meta.total }} entries.</i></span> -->
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    props: {
        fetchUrl: { type: String, required: true },
        columns: { type: Array, required: true },
    },

    data() {
        return {
            tableData: [],
            url: '',
            pagination: {
                meta: { to: 1, from: 1 }
            },
            offset: 4,
            currentPage: 1,
            perPage: 5,
            sortedColumn: this.columns[0].title,
            order: 'asc',
            itemsShow: [5, 10, 15],
            loading: false,
            generalSearch: '',
            queries: {}
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
      this.columns.map(column=>{
        this.queries[column.title] = '';
      });

      return this.fetchData()
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
    name: 'DataTable'
}
</script>
