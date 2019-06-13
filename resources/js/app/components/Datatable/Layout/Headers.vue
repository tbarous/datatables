<template>
    <tr>
        <th></th>
        <th v-if="column.active" v-for="column in columns" :key="column.title" class="table-header">
            <div class="position-relative">
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

import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters("datatable", {
            columns: 'GET_COLUMNS',
            sortedColumn: 'GET_SORTED_COLUMN',
            order: 'GET_ORDER',
        }),
    },
    methods: {
        sortByColumn(column) {
            this.$store.dispatch('datatable/SORT_BY_COLUMN', column)
        }
    }
}
</script>
