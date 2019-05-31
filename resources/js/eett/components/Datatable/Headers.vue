<template>
	<tr class="bg-dark text-white">
        <th></th>
        <th></th>
        <th v-if="activeColumns[column.title]" v-for="column in columns" 
            :key="column.title" @click="sortByColumn(column)"
            class="table-header">
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
	export default {
        computed:{
            activeColumns: () => this.$store.getters['getActiveColumns'],
            columns: () => this.$store.getters['getColumns']
        },

        methods: {
            sortByColumn: (column) => this.$store.dispatch('sortByColumn', column)
        }
    }
</script>