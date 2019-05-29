<template>
    <div>
        <v-layout class="table-tools">
            <v-flex xs1>
                <v-btn 
                    color="green" 
                    dark
                    href="/storage/invoices.xlsx"
                >
                    Excel 
                    <v-icon small>far fa-file-excel</v-icon>
                </v-btn>
            </v-flex>

            <v-flex xs1>
                <v-btn 
                    color="red" 
                    dark
                    href="/storage/invoices.pdf"
                    download
                >
                    PDF 
                    <v-icon small>far fa-file-pdf</v-icon>
                </v-btn>
            </v-flex>

            <v-flex xs1>
                <v-btn
                    id="export-btn" 
                    data-clipboard-target="#resultsTable"
                >
                    Export
                    <v-icon small>fas fa-file-export</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
        <v-divider color="white"></v-divider>
        <datatable :fetch-url="url" :columns="columns"></datatable>
    </div>
</template>

<script>
import Datatable from '../components/Datatable'

export default {
    data() {
        return {
            url: data.users.url,
            columns: data.users.headers
        }
    },

    components: {
        Datatable
    }
}
</script>
