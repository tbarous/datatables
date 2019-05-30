<template>
    <div>
        <v-layout class="table-tools">
            <v-flex xs2>
                <v-btn color="green" dark href="/storage/invoices.xlsx">
                    Excel 
                    <v-icon small>far fa-file-excel</v-icon>
                </v-btn>
            </v-flex>

            <v-flex xs2>
                <v-btn color="red" dark href="/storage/invoices.pdf" download>
                    PDF 
                    <v-icon small>far fa-file-pdf</v-icon>
                </v-btn>
            </v-flex>

            <v-flex xs2>
                <v-btn id="export-btn" data-clipboard-target="#resultsTable">
                    Export
                    <v-icon small>fas fa-file-export</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
        
        <v-divider color="white"></v-divider>

        <datatable :url="url" :columns="columns"></datatable>
    </div>
</template>

<script>
import Datatable from '../components/Table/Datatable'

export default {
    computed: {
        url(){
            return this.$store.getters['user/getURL']
        },
        columns(){
            return this.$store.getters['user/getColumns']
        }
    },

    components: {
        Datatable
    }
}
</script>
