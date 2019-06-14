<template>
    <div>
        <excel title="Excel Title" url="#"></excel>
        <PDF title="PDF Title" url="#"></PDF>
        <v-divider></v-divider>
        <add></add>
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
