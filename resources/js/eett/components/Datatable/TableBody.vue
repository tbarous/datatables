<template>
    <div style="display: contents;">
        <tr v-for="(data, datakey) in tableData" :key="data.id" v-if="!noData">
            <td>{{serial(datakey)}}</td>
            <td>
                <v-checkbox :value="selectBoxes[data.id]" @change="select(item)"></v-checkbox>
            </td>
            <td v-if="activeColumns[key]" v-for="(value, key) in data">{{value}}</td>
            <td width="10%" style="white-space: nowrap">
                <v-btn flat fab dark small color="info" @click="setEditDialog(key1, data)">
                    <v-icon dark>edit</v-icon>
                </v-btn>
                <v-btn flat fab dark small color="red" @click="destroy(editingRow, data)">
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
        })
    },

    methods: {
        select(item) {
            this.$store.dispatch('datatable/select', item)
        },

        serial(datakey) {
            // return this.$store.state.getters['datatable/getSerialNumber'](datakey)
            return 1
        },
    }
}
</script>
