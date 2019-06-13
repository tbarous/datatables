<template>
    <div class="table-body">
        <tr v-for="(item, index) in data" :key="index" v-if="!noData">
            <td>
                <v-checkbox :value="selected(item)" @change="select(item)"></v-checkbox>
            </td>
            <td v-if="column.active" v-for="(column, key) in columns" :key="key">
                {{item[column.title]}}
            </td>
            <td>
                <crud :data="item"></crud>
            </td>
        </tr>
    </div>
</template>

<script>
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
            selected(item){
                return this.$store.getters['datatable/IN_SELECTED'](item)
            }
        }
    }
</script>
