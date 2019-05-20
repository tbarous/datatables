<template>
    <div>
        <Chart></Chart>
        <v-divider></v-divider>
        <DatatableComponent :fetch-url="url" :columns="columns"></DatatableComponent>
    </div>
</template>

<script>
import DatatableComponent from './DatatableComponent'
import Chart from './Chart'

export default {
    data() {
        return {
            url: 'api/users/data-table',
            columns: [{
                    title: 'username',
                    sortable: true,
                    searchable: true,
                    type: 'text'
                },
                {
                    title: 'email',
                    sortable: true,
                    searchable: true,
                    type: 'text'
                },
                {
                    title: 'created_at',
                    sortable: true,
                    searchable: true,
                    type: 'date'
                },
                {
                    title: 'updated_at',
                    sortable: true,
                    searchable: true,
                    type: 'date'
                }
            ]
        }
    },

    components: {
        DatatableComponent,
        Chart
    }
}
</script>
