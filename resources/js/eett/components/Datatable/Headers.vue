<template>
    <tr class="bg-dark text-white" style="height: 50px;">
        <th :width="smallColumnWidth"></th>
        <th v-if="activeColumns[column.title]" v-for="column in columns" :key="column.title" class="table-header">
            <div class="position-relative">
                <!-- <v-menu offset-y class="d-inline-block" style="position: absolute;top: 0;left: 5px;margin: 0">
                    <template v-slot:activator="{ on }">
                        <v-btn style="width: 5px;height: 5px;color:#fff" class="d-inline-block" icon small flat fab v-on="on">
                            <v-icon  small flat>fa fa-filter</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-tile v-for="(item, index) in [1,2,3]" :key="index" @click="">
                            <v-list-tile-title>{{ item }}</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu> -->

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
