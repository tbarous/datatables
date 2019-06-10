<template>
    <tr class="bg-dark text-white" style="height: 50px;">
        <th :width="smallColumnWidth"></th>
        <th v-if="activeColumns[column.title]" v-for="column in columns" :key="column.title" class="table-header">
            <div class="position-relative">
                <!-- <column-filter></column-filter> -->
                <span v-if="!column.sortable" class="d-inline-block">
                    {{ column.title | columnHead }}
                </span>
                <span v-else class="d-inline-block" @click="sortByColumn(column)">
                    {{ column.title | columnHead }}
                </span>

                <span v-if="column.title === sortedColumn">
                    <i v-if="order === 'asc'" class="fas fa-chevron-up"></i>
                    <i v-else class="fas fa-chevron-down"></i>
                </span>
            </div>
        </th>
        <th></th>
    </tr>
</template>

<script>
import ColumnFilter from './ColumnFilter'

import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
    components: {ColumnFilter},
    computed: {
        ...mapGetters("datatable", {
            columns: 'GET_COLUMNS',
            sortedColumn: 'GET_SORTED_COLUMN',
            order: 'GET_ORDER',
            activeColumns: 'GET_ACTIVE_COLUMNS',
            smallColumnWidth: 'GET_SMALL_COLUMN_WIDTH'
        }),
    },
    methods: {
        sortByColumn(column) {
            this.$store.dispatch('datatable/SORT_BY_COLUMN', column)
        }
    }
}
</script>
