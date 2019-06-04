<template>
    <tr class="bg-dark text-white">
        <th></th>
        <th></th>
        <th v-if="activeColumns[column.title]" v-for="column in columns" :key="column.title" @click="sortByColumn(column)" class="table-header">
            {{ column.title | columnHead }}
            <span v-if="column.title === sortedColumn">
                <i v-if="order === 'asc'" class="fas fa-chevron-up"></i>
                <i v-else class="fas fa-chevron-down"></i>
            </span>
        </th>
        <th></th>
    </tr>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters("datatable", {
            columns: 'GET_COLUMNS',
            sortedColumn: 'GET_SORTED_COLUMN',
            order: 'GET_ORDER',
            activeColumns: 'GET_ACTIVE_COLUMNS'
        }),
    },

    methods: {
        sortByColumn(column) {
            this.$store.dispatch('datatable/SORT_BY_COLUMN', column)
        }
    }
}
</script>
