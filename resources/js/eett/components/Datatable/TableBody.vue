<template>
    <div style="display: contents;">
        <tr v-for="(data, datakey) in tableData" :key="data.id" v-if="!noData">
            <td :width="smallColumnWidth">{{serial(datakey)}}</td>
            <td :width="smallColumnWidth">
                <v-checkbox v-model="selectBoxes[data.id]" @change="select(data)"></v-checkbox>
            </td>
            <td width="10%" v-if="activeColumns[key]" v-for="(value, key) in data">{{value}}</td>
            <td style="white-space: nowrap">
                <v-btn flat fab dark small color="info" @click="setEditingRow(data)">
                    <v-icon dark>edit</v-icon>
                </v-btn>
                <v-btn flat fab dark small color="red" @click="destroy(data)">
                    <v-icon dark>delete</v-icon>
                </v-btn>
            </td>
        </tr>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters("datatable", {
            tableData: 'GET_TABLE_DATA',
            noData: 'NO_DATA',
            selectBoxes: 'GET_SELECT_BOXES',
            activeColumns: 'GET_ACTIVE_COLUMNS',
            smallColumnWidth: 'GET_SMALL_COLUMN_WIDTH'
        }),
        options() {
            return this.$store.getters['daterangepicker/GET_OPTIONS']
        }
    },
    mounted(){
        $('.double-scroll').doubleScroll()
        $('input[name="datefilter"]').daterangepicker(this.options)
        let columns = this.$store.getters['datatable/GET_COLUMNS']
        let queries = this.$store.getters['datatable/GET_QUERIES']
        this.$store.commit('daterangepicker/SET_PICKER', columns, queries)
    },

    methods: {
        select(item) {
            this.$store.commit('datatable/SELECT', item)
        },
        serial(datakey) {
            // return this.$store.state.getters['datatable/getSerialNumber'](datakey)
            return 1
        },
        setEditingRow(editingRow){
            this.$store.commit('datatable/SET_EDITING_ROW', editingRow)
            this.$store.commit('ui/OPEN_UPDATE_DIALOG')
        },
        destroy(data){}
    }
}
</script>
