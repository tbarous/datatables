<template>
    <tr v-for="(data, datakey) in tableData" :key="data.id" v-else>
        <td>{{serial(datakey)}}</td>
        <td>
            <v-checkbox v-model="selectBoxes[data.id]" @change="select(item)"></v-checkbox>
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
</template>
<script>
export default {
    computed: {
        tableData() {
            return this.$store.state.getters['datatable/tableData']
        },
        serial(datakey) {
            return this.$store.state.getters['datatable/serialNumber'](datakey)
        }
    },
    methods: {
        select(item) {
            this.$store.dispatch('datatable/select', item)
        }
    }
}

</script>
