<template>
    <div class="table-body">
        <tr v-for="(item, index) in data" :key="item.id" v-if="!noData">
            <td>
                <v-checkbox :value="selected(item)" @change="select(item)"></v-checkbox>
            </td>
            <td v-if="column.active" v-for="(column, key) in columns">
                {{item[column.title]}}
            </td>
            <td>
                <crud :data="item"></crud>
            </td>
        </tr>
    </div>
</template>

<script>
    import _ from 'lodash'
    import { mapGetters } from 'vuex'
    import Crud from './../CRUD/Crud'

    export default {
        components: {
            Crud
        },
        computed: {
            ...mapGetters("datatable", {
                data: 'GET_TABLE_DATA',
                noData: 'NO_DATA',
                selectBoxes: 'GET_SELECT_BOXES',
                activeColumns: 'GET_ACTIVE_COLUMNS',
                smallColumnWidth: 'GET_SMALL_COLUMN_WIDTH',
                columns: 'GET_COLUMNS'
            }),
            options() {
                return this.$store.getters['daterangepicker/GET_OPTIONS']
            },
        },

        methods: {
            select(item) {
                this.$store.commit('datatable/SELECT', item)
            },
            getValue(data, value){
                return _.get(data, value)
            },
            selected(item){
                return this.$store.getters['datatable/IN_SELECTED'](item)
            }
        }
    }
</script>
