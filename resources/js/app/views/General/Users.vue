<template>
    <div>
     <!--    <file title="File" url="/storage/invoices.xlsx"></file>
        <excel title="Excel" url="/storage/invoices.xlsx"></excel>
        <PDF></PDF> -->

        <v-btn :class="{'ml-0' : key==0}" :href="file.url" :color="file.color" v-for="(file, key) in files" :key="key">
            {{file.name}}
        </v-btn>



        <v-divider></v-divider>
        <!-- <add></add> -->
        

        <div v-for="(form, index) in forms" :key="index">
            <simple-dialog :form="form"></simple-dialog>
        </div>

        <v-divider></v-divider>
        <datatable></datatable>
    </div>
</template>

<script>
    export default {
        created(){
            this.setDatatable('user')
        },

        computed: {
            forms(){
                return this.$store.getters['user/GET_FORMS']
            },
            files(){
                return this.$store.getters['user/GET_FILES']
            }
        }
    }
</script>
