<template>
    <div style="display: contents;">
        <tr v-for="(data, datakey) in tableData" :key="data.id" v-if="!noData">
            <td>{{serial(datakey)}}</td>
            <td>
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
            tableData: 'getTableData',
            noData: 'noData',
            selectBoxes: 'getSelectBoxes',
            activeColumns: 'getActiveColumns'
        }),
        options() {
            return this.$store.getters['daterangepicker/getOptions']
        }
    },

    mounted(){
        $('.double-scroll').doubleScroll()
        $('input[name="datefilter"]').daterangepicker(this.options)
        this.$store.dispatch('daterangepicker/setPicker')
    },

    methods: {
        select(item) {
            this.$store.commit('datatable/select', item)
        },

        serial(datakey) {
            // return this.$store.state.getters['datatable/getSerialNumber'](datakey)
            return 1
        },

        setEditingRow(editingRow){
            this.$store.commit('datatable/setEditingRow', editingRow)
            this.$store.commit('ui/openUpdateDialog')
        },

        destroy(data){
           
        }
    }
}
</script>
